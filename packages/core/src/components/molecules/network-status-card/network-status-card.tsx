import { Component, Prop, h, Host } from '@stencil/core';
import type { ConnectionState } from '../../atoms/connection-indicator/connection-indicator';

/**
 * Network link summary: signal quality, address and throughput, with the
 * overall link state. Suits a wireless gateway or cellular modem panel.
 */
@Component({
  tag: 'ind-network-status-card',
  styleUrls: ['../_shared/card.css', 'network-status-card.css'],
  shadow: true,
})
export class IndNetworkStatusCard {
  /** Link label (e.g. "Cellular WAN"). */
  @Prop() label: string = 'Network';
  /** Signal level 0–4 for the bars. */
  @Prop() level: number = 0;
  /** IP / address. */
  @Prop() address?: string;
  /** Downlink throughput (kbit/s). */
  @Prop() rxKbps?: number;
  /** Uplink throughput (kbit/s). */
  @Prop() txKbps?: number;
  /** Overall link state. */
  @Prop({ reflect: true }) state: ConnectionState = 'disconnected';

  private fmt(kbps?: number): string {
    if (kbps === undefined) return '—';
    return kbps >= 1000 ? `${(kbps / 1000).toFixed(1)} Mb/s` : `${Math.round(kbps)} kb/s`;
  }

  render() {
    return (
      <Host role="group" aria-label={`${this.label} ${this.state}`}>
        <div class="card-head">
          <span class="card-title" part="label">{this.label}</span>
          <ind-connection-indicator state={this.state} size="sm" />
        </div>
        <div class="signal" part="signal">
          <ind-signal-quality level={this.level} size="md" />
          {this.address && <code class="address" part="address">{this.address}</code>}
        </div>
        <div class="throughput" part="throughput">
          <span class="tp"><span class="arrow" aria-hidden="true">↓</span> {this.fmt(this.rxKbps)}</span>
          <span class="tp"><span class="arrow" aria-hidden="true">↑</span> {this.fmt(this.txKbps)}</span>
        </div>
      </Host>
    );
  }
}
