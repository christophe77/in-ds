import { Component, Prop, h, Host } from '@stencil/core';

export type TrendVariant = 'default' | 'running' | 'warning' | 'fault';

/**
 * Compact trend widget: current value, an `<ind-sparkline>` of the recent
 * window, and min/max bounds. For dense dashboards where a full trend chart is
 * too heavy.
 */
@Component({
  tag: 'ind-trend-widget',
  styleUrls: ['../_shared/card.css', 'trend-widget.css'],
  shadow: true,
})
export class IndTrendWidget {
  /** Series label (e.g. "Discharge pressure"). */
  @Prop() label!: string;
  /** Process tag. */
  @Prop() tag?: string;
  /** Current value (defaults to the last point). */
  @Prop() value?: number;
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Decimal places. */
  @Prop() precision: number = 1;
  /** Recent samples. */
  @Prop() points: number[] = [];
  /** Sparkline lower bound (auto if omitted). */
  @Prop() min?: number;
  /** Sparkline upper bound (auto if omitted). */
  @Prop() max?: number;
  /** Sparkline color variant. */
  @Prop() variant: TrendVariant = 'default';

  private current(): number | undefined {
    if (this.value !== undefined) return this.value;
    return this.points.length ? this.points[this.points.length - 1] : undefined;
  }

  render() {
    const cur = this.current();
    const lo = this.min ?? (this.points.length ? Math.min(...this.points) : undefined);
    const hi = this.max ?? (this.points.length ? Math.max(...this.points) : undefined);
    return (
      <Host role="group" aria-label={this.label}>
        <div class="card-head">
          <span class="card-title" part="label">{this.label}</span>
          {this.tag && <span class="card-tag" part="tag">{this.tag}</span>}
        </div>
        {cur !== undefined && (
          <ind-value part="value" value={cur} unit={this.unit} precision={this.precision} size="lg" />
        )}
        {this.points.length > 1 && (
          <ind-sparkline
            class="spark"
            part="spark"
            points={this.points}
            min={this.min}
            max={this.max}
            variant={this.variant}
            area
          />
        )}
        {lo !== undefined && hi !== undefined && (
          <div class="bounds" part="bounds">
            <span>min {lo.toFixed(this.precision)}</span>
            <span>max {hi.toFixed(this.precision)}</span>
          </div>
        )}
      </Host>
    );
  }
}
