import { Component, Prop, h, Host } from '@stencil/core';
import type { TrendVariant } from '../../molecules/trend-widget/trend-widget';

export interface TrendSeries {
  label: string;
  points: number[];
  unit?: string;
  variant?: TrendVariant;
  precision?: number;
}

/**
 * Multi-series trend viewer. Stacks one labelled `<ind-sparkline>` per series
 * with the current value, for comparing several tags without a full charting
 * library.
 */
@Component({
  tag: 'ind-trend-viewer',
  styleUrls: ['../_shared/panel.css', 'trend-viewer.css'],
  shadow: true,
})
export class IndTrendViewer {
  @Prop() heading: string = 'Trends';
  /** Series to plot. */
  @Prop() series: TrendSeries[] = [];

  private last(s: TrendSeries): string {
    if (!s.points.length) return '--';
    const v = s.points[s.points.length - 1];
    return s.precision !== undefined ? v.toFixed(s.precision) : String(v);
  }

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
        </div>
        <div class="panel-body">
          {this.series.length === 0 ? (
            <div class="panel-empty">No series</div>
          ) : (
            this.series.map((s, i) => (
              <div class="series" part="series" key={i}>
                <div class="series-head">
                  <span class={`legend legend-${s.variant ?? 'default'}`} aria-hidden="true"></span>
                  <span class="series-label">{s.label}</span>
                  <span class="series-value">
                    {this.last(s)}{s.unit ? ` ${s.unit}` : ''}
                  </span>
                </div>
                <ind-sparkline class="series-spark" points={s.points} variant={s.variant ?? 'default'} area></ind-sparkline>
              </div>
            ))
          )}
        </div>
      </Host>
    );
  }
}
