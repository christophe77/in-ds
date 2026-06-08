import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState } from '../../atoms/_equipment/types';

export type TankAlarm = 'none' | 'low' | 'high';

/**
 * Tank level faceplate: `<ind-tank>` symbol with a level readout and a
 * `<ind-linear-gauge>` showing the fill against low/high alarm bands.
 */
@Component({
  tag: 'ind-tank-level-card',
  styleUrls: ['../_shared/card.css', '../_shared/equipment-card.css', 'tank-level-card.css'],
  shadow: true,
})
export class IndTankLevelCard {
  /** Equipment tag (e.g. "T-204"). */
  @Prop() tag?: string;
  /** Human label (e.g. "Buffer tank"). */
  @Prop() label?: string;
  /** Equipment state (drives fault chrome and tank outline). */
  @Prop({ reflect: true }) state: EquipmentState = 'running';
  /** Current level 0–100 %. */
  @Prop() level: number = 0;
  /** Alarm tint of the liquid. */
  @Prop({ reflect: true }) alarm: TankAlarm = 'none';
  /** Engineering capacity for the secondary readout (e.g. 5000). */
  @Prop() capacity?: number;
  /** Capacity unit (e.g. "L"). */
  @Prop() unit: string = 'L';

  render() {
    const pct = Math.min(100, Math.max(0, this.level));
    const name = this.label ?? this.tag ?? 'Tank';
    const valueAlarm = this.alarm === 'high' ? 'high' : this.alarm === 'low' ? 'low' : 'none';
    return (
      <Host role="group" aria-label={`${name} level ${Math.round(pct)} percent`}>
        <div class="card-head">
          <span class="card-title" part="label">{name}</span>
          {this.tag && <span class="card-tag" part="tag">{this.tag}</span>}
        </div>
        <div class="body" part="body">
          <ind-tank class="symbol" state={this.state} level={pct} alarm={this.alarm} size="md" />
          <div class="metrics" part="metrics">
            <ind-value value={pct} unit="%" precision={0} alarm={valueAlarm} label="Level" size="lg" />
            {this.capacity !== undefined && (
              <ind-value
                value={(this.capacity * pct) / 100}
                unit={this.unit}
                precision={0}
                label="Volume"
                size="sm"
              />
            )}
          </div>
        </div>
        <ind-linear-gauge
          part="gauge"
          value={pct}
          min={0}
          max={100}
          orientation="horizontal"
          unit="%"
          size="sm"
        />
      </Host>
    );
  }
}
