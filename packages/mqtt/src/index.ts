import mqtt, { type MqttClient, type IClientOptions } from 'mqtt';

export interface IndMqttConfig {
  url: string;
  options?: IClientOptions;
}

export type TopicTransform = (payload: string) => string | boolean | number | null | undefined;

export interface TopicBinding {
  topic: string;
  element: Element;
  /** Attribute or property to update on the element. */
  attribute: string;
  /** Transform raw payload into the attribute value. Default: pass-through string. */
  transform?: TopicTransform;
  /**
   * When true, sets a JS property instead of an HTML attribute. Use for non-string values
   * (numbers on a gauge, arrays on a trend).
   */
  asProperty?: boolean;
}

/**
 * Thin MQTT-to-DOM binder. One client → many topic bindings → many elements.
 *
 *   const client = new IndMqttClient({ url: 'wss://broker.example:8083' });
 *   await client.connect();
 *   client.bind({
 *     topic: 'plant/area1/pump-101/state',
 *     element: document.querySelector('ind-led')!,
 *     attribute: 'state',
 *   });
 */
export class IndMqttClient {
  private client?: MqttClient;
  private bindings = new Map<string, Set<TopicBinding>>();

  constructor(private readonly config: IndMqttConfig) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client = mqtt.connect(this.config.url, this.config.options);
      this.client.once('connect', () => resolve());
      this.client.once('error', reject);
      this.client.on('message', (topic, payload) => this.dispatch(topic, payload.toString('utf8')));
    });
  }

  bind(binding: TopicBinding): () => void {
    if (!this.client) throw new Error('IndMqttClient: call connect() before bind()');
    let set = this.bindings.get(binding.topic);
    if (!set) {
      set = new Set();
      this.bindings.set(binding.topic, set);
      this.client.subscribe(binding.topic);
    }
    set.add(binding);
    return () => this.unbind(binding);
  }

  unbind(binding: TopicBinding): void {
    const set = this.bindings.get(binding.topic);
    if (!set) return;
    set.delete(binding);
    if (set.size === 0) {
      this.bindings.delete(binding.topic);
      this.client?.unsubscribe(binding.topic);
    }
  }

  async disconnect(): Promise<void> {
    return new Promise((resolve) => {
      const c = this.client;
      if (!c) return resolve();
      c.end(false, {}, () => resolve());
    });
  }

  private dispatch(topic: string, payload: string): void {
    const set = this.bindings.get(topic);
    if (!set) return;
    for (const b of set) this.apply(b, payload);
  }

  private apply(b: TopicBinding, payload: string): void {
    const value = b.transform ? b.transform(payload) : payload;
    if (b.asProperty) {
      (b.element as unknown as Record<string, unknown>)[b.attribute] = value;
      return;
    }
    if (value === null || value === undefined) {
      b.element.removeAttribute(b.attribute);
    } else if (typeof value === 'boolean') {
      if (value) b.element.setAttribute(b.attribute, '');
      else b.element.removeAttribute(b.attribute);
    } else {
      b.element.setAttribute(b.attribute, String(value));
    }
  }
}

/** Convenience: bind a topic to an ind-led's `state` attribute. */
export function bindLed(
  client: IndMqttClient,
  topic: string,
  element: Element,
  transform: TopicTransform = (p) => p,
): () => void {
  return client.bind({ topic, element, attribute: 'state', transform });
}

/** Convenience: bind a topic to a `blinking` boolean flag (e.g. ack state). */
export function bindBlink(
  client: IndMqttClient,
  topic: string,
  element: Element,
  transform: TopicTransform = (p) => p === '1' || p === 'true',
): () => void {
  return client.bind({ topic, element, attribute: 'blinking', transform });
}
