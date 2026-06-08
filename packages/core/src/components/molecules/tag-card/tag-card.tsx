import { Component, Prop, h, Host } from '@stencil/core';

export type TagCardState =
  | 'running'
  | 'stopped'
  | 'fault'
  | 'warning'
  | 'maintenance'
  | 'neutral';
export type TagCardAlarm = 'none' | 'low-low' | 'low' | 'high' | 'high-high';
export type TagCardTrend = 'none' | 'up' | 'down' | 'stable';

/**
 * Compact card for a single process tag: identifier + live value + status dot.
 * The atom of any tag wall / faceplate grid.
 */
@Component({
  tag: 'ind-tag-card',
  styleUrls: ['../_shared/card.css', 'tag-card.css'],
  shadow: true,
})
export class IndTagCard {
  /** Process tag (e.g. "PT-101"). */
  @Prop() tag!: string;
  /** Human description (e.g. "Discharge pressure"). */
  @Prop() label?: string;
  /** Current value. */
  @Prop() value!: number | string;
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Decimal places when numeric. */
  @Prop() precision?: number;
  /** Active alarm priority — tints the readout. */
  @Prop({ reflect: true }) alarm: TagCardAlarm = 'none';
  /** Process trend direction. */
  @Prop() trend: TagCardTrend = 'none';
  /** Equipment / comms status shown by the dot. */
  @Prop({ reflect: true }) state: TagCardState = 'running';

  render() {
    return (
      <Host>
        <div class="card-head">
          <span class="card-tag" part="tag">{this.tag}</span>
          <ind-status-dot state={this.state} size="sm" />
        </div>
        <ind-value
          part="value"
          value={this.value}
          unit={this.unit}
          precision={this.precision}
          alarm={this.alarm}
          trend={this.trend}
          label={this.label}
          size="lg"
        />
      </Host>
    );
  }
}
