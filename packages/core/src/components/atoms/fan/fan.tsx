import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

@Component({
  tag: 'ind-fan',
  styleUrls: ['../_equipment/equipment.css', 'fan.css'],
  shadow: true,
})
export class IndFan {
  /** Process state. `running` spins the blades. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "FN-301"). */
  @Prop() tag?: string;
  /** Human label. */
  @Prop() label?: string;

  render() {
    const name = this.label ?? this.tag ?? 'fan';
    return (
      <Host role="img" aria-label={`${name} — ${this.state}`}>
        <svg class="symbol" viewBox="0 0 48 48" aria-hidden="true">
          <circle class="body" cx="24" cy="24" r="16" />
          <g class="spin" style={{ transformOrigin: '24px 24px' }}>
            <path class="accent" d="M24 24 C30 14, 34 18, 24 24 Z" />
            <path class="accent" d="M24 24 C34 30, 30 34, 24 24 Z" />
            <path class="accent" d="M24 24 C18 34, 14 30, 24 24 Z" />
            <path class="accent" d="M24 24 C14 18, 18 14, 24 24 Z" />
          </g>
          <circle class="hub" cx="24" cy="24" r="2.5" />
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
