import { Component, Prop, h, Host } from '@stencil/core';
import type { ConnectionState } from '../../atoms/connection-indicator/connection-indicator';

/**
 * Connection summary for a field device / driver: protocol, endpoint, live
 * connection state and round-trip latency.
 */
@Component({
  tag: 'ind-device-connection-card',
  styleUrls: ['../_shared/card.css', 'device-connection-card.css'],
  shadow: true,
})
export class IndDeviceConnectionCard {
  /** Device / driver name. */
  @Prop() name!: string;
  /** Protocol (e.g. "Modbus TCP", "EtherNet/IP"). */
  @Prop() protocol?: string;
  /** Endpoint (host:port / URL). */
  @Prop() endpoint?: string;
  /** Connection state — drives the indicator and fault chrome. */
  @Prop({ reflect: true }) state: ConnectionState = 'disconnected';
  /** Round-trip latency in ms. */
  @Prop() latency?: number;

  render() {
    return (
      <Host role="group" aria-label={`${this.name} connection ${this.state}`}>
        <div class="card-head">
          <span class="card-title" part="name">{this.name}</span>
          {this.protocol && <span class="card-tag" part="protocol">{this.protocol}</span>}
        </div>
        <ind-connection-indicator state={this.state} size="md" />
        {this.endpoint && <code class="endpoint" part="endpoint">{this.endpoint}</code>}
        {this.latency !== undefined && (
          <div class="card-detail" part="latency">Latency {Math.round(this.latency)} ms</div>
        )}
      </Host>
    );
  }
}
