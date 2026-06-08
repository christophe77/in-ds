import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

@Component({
  tag: 'ind-cooler',
  styleUrls: ['../_equipment/equipment.css', 'cooler.css'],
  shadow: true,
})
export class IndCooler {
  /** Process state. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "CL-701"). */
  @Prop() tag?: string;
  /** Human label. */
  @Prop() label?: string;

  render() {
    const name = this.label ?? this.tag ?? 'cooler';
    return (
      <Host role="img" aria-label={`${name} — ${this.state}`}>
        {/* Cooler: circle with a snowflake. */}
        <svg class="symbol" viewBox="0 0 48 48" aria-hidden="true">
          <circle class="body" cx="24" cy="24" r="16" />
          <g class="flake">
            <line class="coil" x1="24" y1="12" x2="24" y2="36" />
            <line class="coil" x1="13.6" y1="18" x2="34.4" y2="30" />
            <line class="coil" x1="13.6" y1="30" x2="34.4" y2="18" />
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
