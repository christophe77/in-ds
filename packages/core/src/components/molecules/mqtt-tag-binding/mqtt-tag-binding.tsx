import { Component, Prop, h, Host } from '@stencil/core';
import type { ConnectionState } from '../../atoms/connection-indicator/connection-indicator';

/**
 * Visualises the binding between an MQTT topic and a process value: topic,
 * last value, QoS, retain flag and the broker connection state.
 */
@Component({
  tag: 'ind-mqtt-tag-binding',
  styleUrls: ['../_shared/card.css', '../_shared/binding.css', 'mqtt-tag-binding.css'],
  shadow: true,
})
export class IndMqttTagBinding {
  /** Friendly label (e.g. "Tank level"). */
  @Prop() label?: string;
  /** MQTT topic (e.g. "plant/line2/tank/level"). */
  @Prop() topic!: string;
  /** Last received value. */
  @Prop() value?: number | string;
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Quality of Service level. */
  @Prop() qos: 0 | 1 | 2 = 0;
  /** Retained message flag. */
  @Prop() retained: boolean = false;
  /** Broker connection state. */
  @Prop({ reflect: true }) state: ConnectionState = 'disconnected';

  render() {
    const v = this.value !== undefined ? String(this.value) : '—';
    return (
      <Host role="group" aria-label={`MQTT ${this.topic}`}>
        <div class="card-head">
          <span class="card-title" part="label">{this.label ?? 'MQTT'}</span>
          <ind-connection-indicator state={this.state} size="sm" />
        </div>
        <code class="address" part="topic">{this.topic}</code>
        <div class="readout" part="readout">
          <span class="value" part="value">{v}{this.unit ? ` ${this.unit}` : ''}</span>
          <span class="flags" part="flags">
            <span class="flag" part="qos">QoS {this.qos}</span>
            {this.retained && <span class="flag" part="retain">retained</span>}
          </span>
        </div>
      </Host>
    );
  }
}
