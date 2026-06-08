import { Component, Prop, h, Host } from '@stencil/core';

export type CounterVariant = 'neutral' | 'success' | 'info' | 'warning' | 'error';
export type CounterSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-counter',
  styleUrl: 'counter.css',
  shadow: true,
})
export class IndCounter {
  /** Numeric value. */
  @Prop() value: number = 0;

  /** Clamp the displayed value, rendering e.g. "99+" beyond this. */
  @Prop() max?: number;

  /** Semantic color. */
  @Prop({ reflect: true }) variant: CounterVariant = 'neutral';

  /** Size. */
  @Prop({ reflect: true }) size: CounterSize = 'md';

  /** Optional label rendered before the count. */
  @Prop() label?: string;

  /** Render as a small circular dot when the value is 0 (no number). */
  @Prop({ reflect: true }) dotWhenZero: boolean = false;

  private display(): string {
    if (this.max !== undefined && this.value > this.max) return `${this.max}+`;
    return String(this.value);
  }

  render() {
    const zeroDot = this.dotWhenZero && this.value === 0;
    return (
      <Host role="status" aria-label={`${this.label ? this.label + ': ' : ''}${this.value}`}>
        {this.label && <span class="label" part="label">{this.label}</span>}
        <span class={{ count: true, 'is-dot': zeroDot }} part="count">
          {!zeroDot && this.display()}
        </span>
      </Host>
    );
  }
}
