import { Component, Prop, h, Host } from '@stencil/core';
import type { ConnectionState } from '../../atoms/connection-indicator/connection-indicator';

/**
 * Device nameplate card: identity metadata (vendor, model, firmware, serial,
 * address) plus a live connection indicator. For a device detail panel.
 */
@Component({
  tag: 'ind-device-info-card',
  styleUrls: ['../_shared/card.css', 'device-info-card.css'],
  shadow: true,
})
export class IndDeviceInfoCard {
  /** Device name (e.g. "Line 2 PLC"). */
  @Prop() name!: string;
  /** Manufacturer. */
  @Prop() vendor?: string;
  /** Model number. */
  @Prop() model?: string;
  /** Firmware / software version. */
  @Prop() firmware?: string;
  /** Serial number. */
  @Prop() serial?: string;
  /** Network address (IP / endpoint). */
  @Prop() address?: string;
  /** Connection state. */
  @Prop({ reflect: true }) state: ConnectionState = 'disconnected';

  private rows() {
    return [
      { label: 'Vendor', value: this.vendor },
      { label: 'Model', value: this.model },
      { label: 'Firmware', value: this.firmware },
      { label: 'Serial', value: this.serial },
      { label: 'Address', value: this.address },
    ].filter((r) => r.value !== undefined && r.value !== '');
  }

  render() {
    return (
      <Host role="group" aria-label={`${this.name} device information`}>
        <div class="card-head">
          <span class="card-title" part="name">{this.name}</span>
          <ind-connection-indicator state={this.state} size="sm" />
        </div>
        <dl class="meta" part="meta">
          {this.rows().map((r) => [
            <dt class="dt" part="dt">{r.label}</dt>,
            <dd class="dd" part="dd">{r.value}</dd>,
          ])}
        </dl>
      </Host>
    );
  }
}
