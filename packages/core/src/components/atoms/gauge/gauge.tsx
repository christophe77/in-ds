import { Component, Prop, h, Host } from '@stencil/core';

export interface GaugeZone {
  from: number;
  to: number;
  /** CSS color or a state keyword resolved to a token. */
  color: string;
}

export type GaugeSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-gauge',
  styleUrl: 'gauge.css',
  shadow: true,
})
export class IndGauge {
  /** Current value. */
  @Prop() value: number = 0;
  /** Scale minimum. */
  @Prop() min: number = 0;
  /** Scale maximum. */
  @Prop() max: number = 100;
  /** Colored zones along the arc (e.g. green/amber/red bands). Pass as a property. */
  @Prop() zones: GaugeZone[] = [];
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Label / tag rendered under the value. */
  @Prop() label?: string;
  /** Decimal places for the value. */
  @Prop() precision?: number;
  /** Size. */
  @Prop({ reflect: true }) size: GaugeSize = 'md';

  // 270° sweep from 135° (bottom-left) clockwise to 405°/45° (bottom-right).
  private readonly startAngle = 135;
  private readonly sweep = 270;
  private readonly cx = 50;
  private readonly cy = 50;
  private readonly r = 40;

  private valueToAngle(v: number): number {
    const span = this.max - this.min || 1;
    const ratio = Math.min(1, Math.max(0, (v - this.min) / span));
    return this.startAngle + ratio * this.sweep;
  }

  private polar(angleDeg: number, radius = this.r): { x: number; y: number } {
    const a = (angleDeg * Math.PI) / 180;
    return { x: this.cx + radius * Math.cos(a), y: this.cy + radius * Math.sin(a) };
  }

  private arc(fromV: number, toV: number, radius = this.r): string {
    const a0 = this.valueToAngle(fromV);
    const a1 = this.valueToAngle(toV);
    const p0 = this.polar(a0, radius);
    const p1 = this.polar(a1, radius);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
  }

  private formatted(): string {
    if (!Number.isFinite(this.value)) return '--';
    return this.precision !== undefined ? this.value.toFixed(this.precision) : String(this.value);
  }

  render() {
    const needleAngle = this.valueToAngle(this.value);
    const tip = this.polar(needleAngle, this.r - 6);
    const name = this.label ?? 'gauge';
    return (
      <Host
        role="meter"
        aria-valuenow={this.value}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        aria-label={`${name}: ${this.formatted()}${this.unit ? ' ' + this.unit : ''}`}
      >
        <svg class="gauge" part="gauge" viewBox="0 0 100 100" aria-hidden="true">
          <path class="track" part="track" d={this.arc(this.min, this.max)} />
          {(this.zones ?? []).map((z) => (
            <path class="zone" d={this.arc(z.from, z.to)} style={{ stroke: z.color }} />
          ))}
          <line class="needle" part="needle" x1={this.cx} y1={this.cy} x2={tip.x} y2={tip.y} />
          <circle class="hub" cx={this.cx} cy={this.cy} r="3.5" />
        </svg>
        <div class="readout" part="readout">
          <span class="number" part="number">{this.formatted()}</span>
          {this.unit && <span class="unit" part="unit">{this.unit}</span>}
        </div>
        {this.label && <span class="label" part="label">{this.label}</span>}
      </Host>
    );
  }
}
