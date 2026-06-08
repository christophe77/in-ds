import { Component, Prop, h, Host } from '@stencil/core';

export type DataQuality = 'good' | 'uncertain' | 'bad';

const QUALITY_LABEL: Record<DataQuality, string> = {
  good: 'Good',
  uncertain: 'Uncertain',
  bad: 'Bad',
};

/**
 * One sample in a historical / trend table: timestamp, value with unit and an
 * OPC-style data quality flag. Read-only.
 */
@Component({
  tag: 'ind-historical-value-row',
  styleUrls: ['../_shared/row.css', 'historical-value-row.css'],
  shadow: true,
})
export class IndHistoricalValueRow {
  /** Pre-formatted timestamp. */
  @Prop() time!: string;
  /** Sample value. */
  @Prop() value!: number | string;
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Decimal places when numeric. */
  @Prop() precision?: number;
  /** Data quality flag. */
  @Prop({ reflect: true }) quality: DataQuality = 'good';

  private formatted(): string {
    if (typeof this.value === 'string') return this.value;
    if (!Number.isFinite(this.value)) return '--';
    if (this.precision !== undefined) return this.value.toFixed(this.precision);
    return String(this.value);
  }

  render() {
    return (
      <Host role="row" aria-label={`${this.time}: ${this.formatted()} ${this.unit ?? ''}, ${QUALITY_LABEL[this.quality]}`}>
        <span class="time" part="time">{this.time}</span>
        <span class="value" part="value">
          {this.formatted()}
          {this.unit && <span class="unit" part="unit"> {this.unit}</span>}
        </span>
        <span class={`quality quality-${this.quality}`} part="quality">{QUALITY_LABEL[this.quality]}</span>
      </Host>
    );
  }
}
