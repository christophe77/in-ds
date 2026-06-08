import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

@Component({
  tag: 'ind-motor',
  styleUrls: ['../_equipment/equipment.css', 'motor.css'],
  shadow: true,
})
export class IndMotor {
  /** Process state. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "M-201"). */
  @Prop() tag?: string;
  /** Human label. */
  @Prop() label?: string;

  render() {
    const name = this.label ?? this.tag ?? 'motor';
    return (
      <Host role="img" aria-label={`${name} — ${this.state}`}>
        {/* ISA motor: circle with shaft and "M". */}
        <svg class="symbol" viewBox="0 0 48 48" aria-hidden="true">
          <circle class="body" cx="22" cy="24" r="14" />
          <line class="stroke" x1="36" y1="24" x2="44" y2="24" />
          <text class="glyph" x="22" y="24" text-anchor="middle" dominant-baseline="central">M</text>
          <circle class="run-ring" cx="22" cy="24" r="14" />
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
