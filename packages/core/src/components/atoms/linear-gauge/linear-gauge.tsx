import { Component, Prop, h, Host } from '@stencil/core';

export interface LinearGaugeZone {
  from: number;
  to: number;
  color: string;
}

export type LinearGaugeOrientation = 'horizontal' | 'vertical';
export type LinearGaugeSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-linear-gauge',
  styleUrl: 'linear-gauge.css',
  shadow: true,
})
export class IndLinearGauge {
  /** Current value. */
  @Prop() value: number = 0;
  /** Scale minimum. */
  @Prop() min: number = 0;
  /** Scale maximum. */
  @Prop() max: number = 100;
  /** Optional setpoint marker. */
  @Prop() setpoint?: number;
  /** Colored zones along the scale. Pass as a property. */
  @Prop() zones: LinearGaugeZone[] = [];
  /** Orientation. */
  @Prop({ reflect: true }) orientation: LinearGaugeOrientation = 'horizontal';
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Label. */
  @Prop() label?: string;
  /** Decimal places. */
  @Prop() precision?: number;
  /** Size. */
  @Prop({ reflect: true }) size: LinearGaugeSize = 'md';
  /** Show the numeric value. */
  @Prop() showValue: boolean = true;

  private pct(v: number): number {
    const span = this.max - this.min || 1;
    return Math.min(100, Math.max(0, ((v - this.min) / span) * 100));
  }

  private formatted(): string {
    if (!Number.isFinite(this.value)) return '--';
    return this.precision !== undefined ? this.value.toFixed(this.precision) : String(this.value);
  }

  render() {
    const fill = this.pct(this.value);
    const sp = this.setpoint !== undefined ? this.pct(this.setpoint) : undefined;
    const name = this.label ?? 'gauge';
    return (
      <Host
        role="meter"
        aria-valuenow={this.value}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        aria-label={`${name}: ${this.formatted()}${this.unit ? ' ' + this.unit : ''}`}
      >
        {(this.label || this.showValue) && (
          <div class="header" part="header">
            {this.label && <span class="label" part="label">{this.label}</span>}
            {this.showValue && (
              <span class="value" part="value">{this.formatted()}{this.unit ? ` ${this.unit}` : ''}</span>
            )}
          </div>
        )}
        <div class="track" part="track">
          {(this.zones ?? []).map((z) => {
            const a = this.pct(z.from);
            const b = this.pct(z.to);
            return (
              <span
                class="zone"
                style={{
                  background: z.color,
                  insetInlineStart: this.orientation === 'horizontal' ? `${a}%` : undefined,
                  inlineSize: this.orientation === 'horizontal' ? `${b - a}%` : undefined,
                  insetBlockEnd: this.orientation === 'vertical' ? `${a}%` : undefined,
                  blockSize: this.orientation === 'vertical' ? `${b - a}%` : undefined,
                }}
              />
            );
          })}
          <span class="fill" part="fill" style={this.orientation === 'horizontal' ? { width: `${fill}%` } : { height: `${fill}%` }} />
          {sp !== undefined && (
            <span
              class="setpoint"
              part="setpoint"
              style={this.orientation === 'horizontal' ? { left: `${sp}%` } : { bottom: `${sp}%` }}
            />
          )}
        </div>
      </Host>
    );
  }
}
