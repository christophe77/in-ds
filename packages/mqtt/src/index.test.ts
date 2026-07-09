import { afterEach, describe, expect, it, vi } from 'vitest';

/* -------------------------------------------------------------------------- */
/* Fake mqtt client + module mock                                             */
/* -------------------------------------------------------------------------- */

type Handler = (...args: unknown[]) => void;

class FakeClient {
  handlers = new Map<string, Handler[]>();
  subscribed: string[] = [];
  unsubscribed: string[] = [];
  ended = false;

  on(event: string, cb: Handler) {
    const list = this.handlers.get(event) ?? [];
    list.push(cb);
    this.handlers.set(event, list);
    return this;
  }
  once(event: string, cb: Handler) {
    return this.on(event, cb);
  }
  subscribe(topic: string) {
    this.subscribed.push(topic);
  }
  unsubscribe(topic: string) {
    this.unsubscribed.push(topic);
  }
  end(_force: boolean, _opts: unknown, cb: () => void) {
    this.ended = true;
    cb();
  }
  emit(event: string, ...args: unknown[]) {
    for (const cb of this.handlers.get(event) ?? []) cb(...args);
  }
}

let lastClient: FakeClient;

vi.mock('mqtt', () => ({
  default: {
    connect: () => {
      lastClient = new FakeClient();
      return lastClient;
    },
  },
}));

import { IndMqttClient } from './index';

/* -------------------------------------------------------------------------- */
/* Fake DOM element                                                           */
/* -------------------------------------------------------------------------- */

function fakeElement() {
  const attrs = new Map<string, string>();
  return {
    attrs,
    setAttribute(name: string, value: string) {
      attrs.set(name, value);
    },
    removeAttribute(name: string) {
      attrs.delete(name);
    },
  } as unknown as Element & { attrs: Map<string, string>; [key: string]: unknown };
}

async function connectedClient() {
  const client = new IndMqttClient({ url: 'wss://broker.test:8083' });
  const promise = client.connect();
  lastClient.emit('connect');
  await promise;
  return client;
}

afterEach(() => vi.clearAllMocks());

/* -------------------------------------------------------------------------- */

describe('IndMqttClient.connect', () => {
  it('resolves when the broker emits "connect"', async () => {
    await expect(connectedClient()).resolves.toBeInstanceOf(IndMqttClient);
  });

  it('rejects when the broker emits "error" first', async () => {
    const client = new IndMqttClient({ url: 'wss://broker.test:8083' });
    const promise = client.connect();
    lastClient.emit('error', new Error('refused'));
    await expect(promise).rejects.toThrow('refused');
  });
});

describe('IndMqttClient.bind', () => {
  it('throws if called before connect()', () => {
    const client = new IndMqttClient({ url: 'wss://broker.test:8083' });
    expect(() => client.bind({ topic: 't', element: fakeElement(), attribute: 'state' })).toThrow(
      /connect\(\) before bind\(\)/,
    );
  });

  it('subscribes only once per topic across multiple bindings', async () => {
    const client = await connectedClient();
    client.bind({ topic: 'plant/led', element: fakeElement(), attribute: 'state' });
    client.bind({ topic: 'plant/led', element: fakeElement(), attribute: 'blinking' });
    expect(lastClient.subscribed).toEqual(['plant/led']);
  });

  it('unsubscribes when the last binding for a topic is removed', async () => {
    const client = await connectedClient();
    const off1 = client.bind({ topic: 'plant/led', element: fakeElement(), attribute: 'state' });
    const off2 = client.bind({ topic: 'plant/led', element: fakeElement(), attribute: 'blinking' });
    off1();
    expect(lastClient.unsubscribed).toEqual([]);
    off2();
    expect(lastClient.unsubscribed).toEqual(['plant/led']);
  });
});

describe('message dispatch → element updates', () => {
  it('sets a string attribute from the raw payload', async () => {
    const client = await connectedClient();
    const el = fakeElement();
    client.bind({ topic: 'plant/led', element: el, attribute: 'state' });
    lastClient.emit('message', 'plant/led', Buffer.from('fault'));
    expect(el.attrs.get('state')).toBe('fault');
  });

  it('toggles a boolean attribute (present when true, absent when false)', async () => {
    const client = await connectedClient();
    const el = fakeElement();
    client.bind({
      topic: 'plant/led/ack',
      element: el,
      attribute: 'blinking',
      transform: (p) => p === '1',
    });
    lastClient.emit('message', 'plant/led/ack', Buffer.from('1'));
    expect(el.attrs.has('blinking')).toBe(true);
    lastClient.emit('message', 'plant/led/ack', Buffer.from('0'));
    expect(el.attrs.has('blinking')).toBe(false);
  });

  it('removes the attribute when the transform returns null', async () => {
    const client = await connectedClient();
    const el = fakeElement();
    el.setAttribute('value', '42');
    client.bind({ topic: 'plant/gauge', element: el, attribute: 'value', transform: () => null });
    lastClient.emit('message', 'plant/gauge', Buffer.from('nan'));
    expect(el.attrs.has('value')).toBe(false);
  });

  it('sets a JS property (not an attribute) when asProperty is true', async () => {
    const client = await connectedClient();
    const el = fakeElement();
    client.bind({
      topic: 'plant/trend',
      element: el,
      attribute: 'data',
      asProperty: true,
      transform: (p) => Number(p),
    });
    lastClient.emit('message', 'plant/trend', Buffer.from('3.14'));
    expect(el.data).toBe(3.14);
    expect(el.attrs.has('data')).toBe(false);
  });

  it('does not dispatch to unbound topics', async () => {
    const client = await connectedClient();
    const el = fakeElement();
    client.bind({ topic: 'plant/led', element: el, attribute: 'state' });
    lastClient.emit('message', 'other/topic', Buffer.from('x'));
    expect(el.attrs.has('state')).toBe(false);
  });
});
