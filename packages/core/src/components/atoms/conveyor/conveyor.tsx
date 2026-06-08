import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

export type ConveyorDirection = 'forward' | 'reverse';

@Component({
  tag: 'ind-conveyor',
  styleUrls: ['../_equipment/equipment.css', 'conveyor.css'],
  shadow: true,
})
export class IndConveyor {
  /** Process state. `running` animates the belt. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Belt travel direction. */
  @Prop({ reflect: true }) direction: ConveyorDirection = 'forward';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "CV-501"). */
  @Prop() tag?: string;
  /** Human label. */
  @Prop() label?: string;

  render() {
    const name = this.label ?? this.tag ?? 'conveyor';
    return (
      <Host role="img" aria-label={`${name} — ${this.state}`}>
        <svg class="symbol" viewBox="0 0 64 28" aria-hidden="true">
          <circle class="body" cx="12" cy="14" r="9" />
          <circle class="body" cx="52" cy="14" r="9" />
          <line class="stroke" x1="12" y1="5" x2="52" y2="5" />
          <line class="stroke" x1="12" y1="23" x2="52" y2="23" />
          <line class="belt" x1="12" y1="14" x2="52" y2="14" />
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
