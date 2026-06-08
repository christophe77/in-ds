import { Component, Prop, h, Host } from '@stencil/core';
import type { DataQuality } from '../../molecules/historical-value-row/historical-value-row';

export interface HistorianSample {
  time: string;
  value: number | string;
  quality?: DataQuality;
}

/**
 * Tabular history viewer for a single tag: header with tag/unit, an optional
 * sparkline overview, and a scrolling list of `<ind-historical-value-row>`s.
 */
@Component({
  tag: 'ind-historian-viewer',
  styleUrls: ['../_shared/panel.css', 'historian-viewer.css'],
  shadow: true,
})
export class IndHistorianViewer {
  @Prop() heading: string = 'Historian';
  /** Tag being viewed. */
  @Prop() tag?: string;
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Decimal places for the rows. */
  @Prop() precision?: number;
  /** Samples, most-recent first. */
  @Prop() samples: HistorianSample[] = [];

  private numericPoints(): number[] {
    return this.samples
      .map((s) => (typeof s.value === 'number' ? s.value : parseFloat(String(s.value))))
      .filter((n) => Number.isFinite(n))
      .reverse();
  }

  render() {
    const points = this.numericPoints();
    return (
      <Host>
        <div class="panel-head">
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            {this.tag && <span class="panel-subtitle">{this.tag}{this.unit ? ` · ${this.unit}` : ''}</span>}
          </div>
        </div>
        {points.length > 1 && (
          <div class="overview" part="overview">
            <ind-sparkline points={points} variant="default" area></ind-sparkline>
          </div>
        )}
        <div class="panel-list" part="list">
          {this.samples.length === 0 ? (
            <div class="panel-empty">No samples</div>
          ) : (
            this.samples.map((s, i) => (
              <ind-historical-value-row
                key={i}
                time={s.time}
                value={s.value}
                unit={this.unit}
                precision={this.precision}
                quality={s.quality ?? 'good'}
              />
            ))
          )}
        </div>
      </Host>
    );
  }
}
