import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

@Component({
  tag: 'ind-heater',
  styleUrls: ['../_equipment/equipment.css', 'heater.css'],
  shadow: true,
})
export class IndHeater {
  /** Process state. `running` glows the element. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "EH-601"). */
  @Prop() tag?: string;
  /** Human label. */
  @Prop() label?: string;

  render() {
    const name = this.label ?? this.tag ?? 'heater';
    return (
      <Host role="img" aria-label={`${name} — ${this.state}`}>
        {/* Heating element: circle with a resistive serpentine. */}
        <svg class="symbol" viewBox="0 0 48 48" aria-hidden="true">
          <circle class="body" cx="24" cy="24" r="16" />
          <path class="coil" d="M14 18 q5 -6 10 0 t10 0 M14 24 q5 -6 10 0 t10 0 M14 30 q5 -6 10 0 t10 0" />
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
