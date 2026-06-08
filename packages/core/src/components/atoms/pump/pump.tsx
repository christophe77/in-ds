import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

@Component({
  tag: 'ind-pump',
  styleUrls: ['../_equipment/equipment.css', 'pump.css'],
  shadow: true,
})
export class IndPump {
  /** Process state. `running` animates the impeller. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "P-101"). */
  @Prop() tag?: string;
  /** Human label (e.g. "Feed pump"). */
  @Prop() label?: string;

  render() {
    const name = this.label ?? this.tag ?? 'pump';
    return (
      <Host role="img" aria-label={`${name} — ${this.state}`}>
        {/* ISA centrifugal pump: circle body + triangular discharge. */}
        <svg class="symbol" viewBox="0 0 48 48" aria-hidden="true">
          <circle class="body" cx="22" cy="24" r="14" />
          <polygon class="accent" points="22,24 38,16 38,32" />
          <g class="spin" style={{ transformOrigin: '22px 24px' }}>
            <line class="stroke" x1="22" y1="14" x2="22" y2="34" />
            <line class="stroke" x1="12" y1="24" x2="32" y2="24" />
          </g>
        </svg>
        {(this.tag || this.label) && (
          <div class="caption">
            {this.tag && <span class="tag">{this.tag}</span>}
            {this.label && <span class="label">{this.label}</span>}
          </div>
        )}
      </Host>
    );
  }
}
