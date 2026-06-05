import { Component, Prop, h, Host } from '@stencil/core';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-progress',
  styleUrl: 'progress.css',
  shadow: true,
})
export class IndProgress {
  /** Current value (0–`max`). */
  @Prop() value: number = 0;
  /** Max value. */
  @Prop() max: number = 100;
  /** Visual variant. Use `warning` / `error` for low / critical fill levels. */
  @Prop({ reflect: true }) variant: ProgressVariant = 'default';
  /** Size. */
  @Prop({ reflect: true }) size: ProgressSize = 'md';
  /** Optional label rendered above the bar. */
  @Prop() label?: string;
  /** Show numeric value next to the label. */
  @Prop() showValue: boolean = false;
  /** Unit suffix for the displayed value. */
  @Prop() unit?: string;
  /** Indeterminate (animated bar, no value). */
  @Prop({ reflect: true }) indeterminate: boolean = false;

  private percent(): number {
    if (this.max <= 0) return 0;
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  private valueLabel(): string {
    if (this.unit === '%' || (this.max === 100 && !this.unit)) {
      return `${Math.round(this.percent())} %`;
    }
    return `${this.value}${this.unit ? ' ' + this.unit : ''} / ${this.max}`;
  }

  render() {
    const pct = this.percent();
    return (
      <Host
        role="progressbar"
        aria-valuenow={this.indeterminate ? undefined : this.value}
        aria-valuemin={0}
        aria-valuemax={this.max}
        aria-label={this.label}
      >
        {(this.label || this.showValue) && (
          <div class="header" part="header">
            {this.label && <span class="label" part="label">{this.label}</span>}
            {this.showValue && !this.indeterminate && (
              <span class="value" part="value">{this.valueLabel()}</span>
            )}
          </div>
        )}
        <div class="track" part="track">
          <div
            class="fill"
            part="fill"
            style={this.indeterminate ? undefined : { width: `${pct}%` }}
          />
        </div>
      </Host>
    );
  }
}
