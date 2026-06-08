import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

@Component({
  tag: 'ind-silo',
  styleUrls: ['../_equipment/equipment.css', 'silo.css'],
  shadow: true,
})
export class IndSilo {
  /** Process state (drives outline color). */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Fill level, 0–100 %. */
  @Prop() level: number = 0;
  /** Alarm tint of the contents. */
  @Prop({ reflect: true }) alarm: 'none' | 'low' | 'high' = 'none';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "SL-12"). */
  @Prop() tag?: string;
  /** Human label. */
  @Prop() label?: string;
  /** Show the numeric level under the symbol. */
  @Prop() showValue: boolean = false;

  render() {
    const pct = Math.min(100, Math.max(0, this.level));
    const top = 4;
    const height = 52;
    const fillH = (pct / 100) * height;
    const fillY = top + height - fillH;
    const name = this.label ?? this.tag ?? 'silo';
    return (
      <Host
        role="meter"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} level ${Math.round(pct)}%`}
      >
        {/* Cylindrical body with a conical hopper bottom. */}
        <svg class="symbol" viewBox="0 0 40 60" aria-hidden="true">
          <defs>
            <clipPath id="silo-clip">
              <path d="M6 4 H34 V44 L24 56 H16 L6 44 Z" />
            </clipPath>
          </defs>
          <rect class="liquid" x="0" y={fillY} width="40" height={fillH} clip-path="url(#silo-clip)" />
          <path class="body" d="M6 4 H34 V44 L24 56 H16 L6 44 Z" />
        </svg>
        {(this.tag || this.label || this.showValue) && (
          <div class="caption">
            {this.tag && <span class="tag">{this.tag}</span>}
            {this.showValue && <span class="tag">{Math.round(pct)}%</span>}
            {this.label && <span class="label">{this.label}</span>}
          </div>
        )}
      </Host>
    );
  }
}
