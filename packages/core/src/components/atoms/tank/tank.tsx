import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState, EquipmentSize } from '../_equipment/types';

@Component({
  tag: 'ind-tank',
  styleUrls: ['../_equipment/equipment.css', 'tank.css'],
  shadow: true,
})
export class IndTank {
  /** Process state (drives outline color). */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Fill level, 0–100 %. */
  @Prop() level: number = 0;
  /** Alarm tint of the liquid (overrides state-derived fill color). */
  @Prop({ reflect: true }) alarm: 'none' | 'low' | 'high' = 'none';
  /** Visual size. */
  @Prop({ reflect: true }) size: EquipmentSize = 'md';
  /** Equipment tag (e.g. "T-204"). */
  @Prop() tag?: string;
  /** Human label. */
  @Prop() label?: string;
  /** Show the numeric level under the symbol. */
  @Prop() showValue: boolean = false;

  render() {
    const pct = Math.min(100, Math.max(0, this.level));
    // Body spans y 4..56 (height 52); liquid fills from the bottom up.
    const top = 4;
    const height = 52;
    const fillH = (pct / 100) * height;
    const fillY = top + height - fillH;
    const name = this.label ?? this.tag ?? 'tank';
    return (
      <Host
        role="meter"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} level ${Math.round(pct)}%`}
      >
        <svg class="symbol" viewBox="0 0 40 60" aria-hidden="true">
          <defs>
            <clipPath id="tank-clip">
              <rect x="4" y={top} width="32" height={height} rx="4" />
            </clipPath>
          </defs>
          <rect class="liquid" x="4" y={fillY} width="32" height={fillH} clip-path="url(#tank-clip)" />
          <rect class="body" x="4" y={top} width="32" height={height} rx="4" />
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
