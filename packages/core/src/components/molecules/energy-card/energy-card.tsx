import { Component, Prop, h, Host } from '@stencil/core';

export type EnergyTrend = 'none' | 'up' | 'down' | 'flat';

/**
 * Energy / power KPI card: a headline reading plus an `<ind-sparkline>` for the
 * recent profile and an optional cumulative figure for the period.
 */
@Component({
  tag: 'ind-energy-card',
  styleUrls: ['../_shared/card.css', 'energy-card.css'],
  shadow: true,
})
export class IndEnergyCard {
  /** Metric name (e.g. "Active power", "Energy today"). */
  @Prop() label!: string;
  /** Instantaneous value. */
  @Prop() value!: number;
  /** Unit (default kW). */
  @Prop() unit: string = 'kW';
  /** Decimal places. */
  @Prop() precision: number = 1;
  /** Recent samples for the sparkline. */
  @Prop() points: number[] = [];
  /** Trend arrow. */
  @Prop() trend: EnergyTrend = 'none';
  /** Cumulative value for the period (e.g. kWh today). */
  @Prop() total?: number;
  /** Cumulative unit (default kWh). */
  @Prop() totalUnit: string = 'kWh';

  render() {
    const arrow = this.trend === 'up' ? '▲' : this.trend === 'down' ? '▼' : this.trend === 'flat' ? '▬' : '';
    const valueTrend = this.trend === 'flat' ? 'stable' : this.trend === 'none' ? 'none' : this.trend;
    return (
      <Host role="group" aria-label={`${this.label}: ${this.value.toFixed(this.precision)} ${this.unit}`}>
        <div class="card-head">
          <span class="card-title" part="label">{this.label}</span>
          {arrow && <span class={`arrow trend-${this.trend}`} part="arrow" aria-hidden="true">{arrow}</span>}
        </div>
        <ind-value
          part="value"
          value={this.value}
          unit={this.unit}
          precision={this.precision}
          trend={valueTrend as 'none' | 'up' | 'down' | 'stable'}
          size="lg"
        />
        {this.points.length > 1 && (
          <ind-sparkline class="spark" part="spark" points={this.points} variant="default" area />
        )}
        {this.total !== undefined && (
          <div class="card-detail" part="total">
            {this.total.toLocaleString()} {this.totalUnit} this period
          </div>
        )}
      </Host>
    );
  }
}
