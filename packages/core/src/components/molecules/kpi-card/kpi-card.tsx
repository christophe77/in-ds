import { Component, Prop, h, Host } from '@stencil/core';

export type KpiTrend = 'none' | 'up' | 'down' | 'flat';
export type KpiVariant = 'neutral' | 'good' | 'bad';

/**
 * Headline KPI: a large value with an optional delta and trend arrow. The
 * `variant` colors the delta (good = green, bad = red) independently of the
 * arrow direction, since "down" is not always bad.
 */
@Component({
  tag: 'ind-kpi-card',
  styleUrls: ['../_shared/card.css', 'kpi-card.css'],
  shadow: true,
})
export class IndKpiCard {
  /** KPI name (e.g. "OEE", "Throughput"). */
  @Prop() label!: string;
  /** Primary value. */
  @Prop() value!: number | string;
  /** Engineering unit (e.g. "%", "u/h"). */
  @Prop() unit?: string;
  /** Decimal places when numeric. */
  @Prop() precision?: number;
  /** Delta caption (e.g. "+2.3 % vs last shift"). */
  @Prop() delta?: string;
  /** Trend direction shown as an arrow. */
  @Prop() trend: KpiTrend = 'none';
  /** Semantic color of the delta. */
  @Prop({ reflect: true }) variant: KpiVariant = 'neutral';

  private formatted(): string {
    if (typeof this.value === 'string') return this.value;
    if (!Number.isFinite(this.value)) return '--';
    if (this.precision !== undefined) return this.value.toFixed(this.precision);
    return String(this.value);
  }

  render() {
    const arrow = this.trend === 'up' ? '▲' : this.trend === 'down' ? '▼' : this.trend === 'flat' ? '▬' : '';
    return (
      <Host role="group" aria-label={`${this.label}: ${this.formatted()}${this.unit ? ' ' + this.unit : ''}`}>
        <div class="card-title" part="label">{this.label}</div>
        <div class="readout" part="readout">
          <span class="number" part="number">{this.formatted()}</span>
          {this.unit && <span class="unit" part="unit">{this.unit}</span>}
        </div>
        {(this.delta || arrow) && (
          <div class="delta" part="delta">
            {arrow && <span class="arrow" part="arrow" aria-hidden="true">{arrow}</span>}
            {this.delta && <span class="delta-text">{this.delta}</span>}
          </div>
        )}
      </Host>
    );
  }
}
