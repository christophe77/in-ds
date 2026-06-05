import { Component, Prop, h, Host } from '@stencil/core';

export type ValueAlarm = 'none' | 'low-low' | 'low' | 'high' | 'high-high';
export type ValueTrend = 'none' | 'up' | 'down' | 'stable';
export type ValueSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-value',
  styleUrl: 'value.css',
  shadow: true,
})
export class IndValue {
  /** Raw value to display. Numeric values are formatted with `precision`. */
  @Prop() value!: number | string;

  /** Engineering unit shown after the number (e.g. "bar", "°C", "m³/h"). */
  @Prop() unit?: string;

  /** Decimal places when `value` is numeric. Default: as-is. */
  @Prop() precision?: number;

  /** Active alarm priority. Highlights the readout with the ISA-18.2 color. */
  @Prop({ reflect: true }) alarm: ValueAlarm = 'none';

  /** Process trend direction. Renders a small arrow next to the unit. */
  @Prop({ reflect: true }) trend: ValueTrend = 'none';

  /** Readout size — `lg` is appropriate for primary KPIs (uses the 3xl font). */
  @Prop({ reflect: true }) size: ValueSize = 'md';

  /** Human label shown above the number (e.g. "Discharge pressure"). */
  @Prop() label?: string;

  /** Equipment tag shown above the number (e.g. "PT-101"). */
  @Prop() tag?: string;

  private formatted(): string {
    if (typeof this.value === 'string') return this.value;
    if (!Number.isFinite(this.value)) return '--';
    if (this.precision !== undefined) return this.value.toFixed(this.precision);
    return String(this.value);
  }

  render() {
    const accessibleName = this.label ?? this.tag ?? 'process value';
    const alarmSuffix = this.alarm !== 'none' ? `, alarm ${this.alarm}` : '';
    return (
      <Host
        role="group"
        aria-label={`${accessibleName}: ${this.formatted()}${this.unit ? ' ' + this.unit : ''}${alarmSuffix}`}
        aria-live={this.alarm === 'high-high' ? 'assertive' : 'polite'}
      >
        {(this.tag || this.label) && (
          <div class="header" part="header">
            {this.tag && <span class="tag" part="tag">{this.tag}</span>}
            {this.label && <span class="label" part="label">{this.label}</span>}
          </div>
        )}
        <div class="readout" part="readout">
          <span class="number" part="number">{this.formatted()}</span>
          {this.unit && <span class="unit" part="unit">{this.unit}</span>}
          {this.trend !== 'none' && (
            <span class="trend" part="trend" aria-hidden="true">
              {this.trend === 'up' ? '▲' : this.trend === 'down' ? '▼' : '◆'}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
