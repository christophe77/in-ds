import { Component, Prop, h, Host } from '@stencil/core';

export type ProgressRingVariant = 'default' | 'success' | 'warning' | 'error';
export type ProgressRingSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-progress-ring',
  styleUrl: 'progress-ring.css',
  shadow: true,
})
export class IndProgressRing {
  /** Current value (0–`max`). */
  @Prop() value: number = 0;
  /** Max value. */
  @Prop() max: number = 100;
  /** Color intent. */
  @Prop({ reflect: true }) variant: ProgressRingVariant = 'default';
  /** Size. */
  @Prop({ reflect: true }) size: ProgressRingSize = 'md';
  /** Indeterminate spinner (no value). */
  @Prop({ reflect: true }) indeterminate: boolean = false;
  /** Show the percentage in the center. */
  @Prop() showValue: boolean = false;
  /** Optional unit/suffix when showing the value (defaults to %). */
  @Prop() unit?: string;
  /** Accessible label. */
  @Prop() label?: string;

  private readonly r = 16;
  private readonly cx = 20;

  private percent(): number {
    if (this.max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  render() {
    const circumference = 2 * Math.PI * this.r;
    const pct = this.percent();
    const offset = circumference * (1 - pct / 100);
    const centerText = this.unit ? `${Math.round(pct)}${this.unit}` : `${Math.round(pct)}%`;
    return (
      <Host
        role="progressbar"
        aria-valuenow={this.indeterminate ? undefined : Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={this.label}
      >
        <svg class="ring" part="ring" viewBox="0 0 40 40" aria-hidden="true">
          <circle class="track" part="track" cx={this.cx} cy={this.cx} r={this.r} />
          <circle
            class="bar"
            part="bar"
            cx={this.cx}
            cy={this.cx}
            r={this.r}
            stroke-dasharray={circumference}
            stroke-dashoffset={this.indeterminate ? circumference * 0.7 : offset}
            transform={`rotate(-90 ${this.cx} ${this.cx})`}
          />
        </svg>
        {this.showValue && !this.indeterminate && (
          <span class="value" part="value">{centerText}</span>
        )}
      </Host>
    );
  }
}
