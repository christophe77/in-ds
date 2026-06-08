import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

@Component({
  tag: 'ind-compressor',
  styleUrls: ['../_equipment/equipment.css', 'compressor.css'],
  shadow: true,
})
export class IndCompressor {
  /** Process state. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "K-401"). */
  @Prop() tag?: string;
  /** Human label. */
  @Prop() label?: string;

  render() {
    const name = this.label ?? this.tag ?? 'compressor';
    return (
      <Host role="img" aria-label={`${name} — ${this.state}`}>
        {/* Centrifugal compressor: trapezoid casing (wide inlet → narrow outlet). */}
        <svg class="symbol" viewBox="0 0 48 36" aria-hidden="true">
          <circle class="body" cx="20" cy="18" r="16" />
          <polygon class="accent" points="10,8 30,14 30,22 10,28" />
          <g class="spin" style={{ transformOrigin: '20px 18px' }}>
            <line class="stroke" x1="20" y1="6" x2="20" y2="30" />
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
