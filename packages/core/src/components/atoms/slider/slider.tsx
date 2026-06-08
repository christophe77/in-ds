import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type SliderSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-slider',
  styleUrl: 'slider.css',
  shadow: true,
})
export class IndSlider {
  /** Current value. */
  @Prop({ mutable: true }) value: number = 0;
  /** Minimum. */
  @Prop() min: number = 0;
  /** Maximum. */
  @Prop() max: number = 100;
  /** Step. */
  @Prop() step: number = 1;
  /** Disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Size. */
  @Prop({ reflect: true }) size: SliderSize = 'md';
  /** Visible label. */
  @Prop() label?: string;
  /** Unit suffix shown with the value. */
  @Prop() unit?: string;
  /** Show the current value next to the label. */
  @Prop() showValue: boolean = true;

  /** Fires on every change while dragging. */
  @Event() indInput!: EventEmitter<number>;
  /** Fires on commit (mouse up / keyboard). */
  @Event() indChange!: EventEmitter<number>;

  private onInput = (e: Event) => {
    const v = Number((e.target as HTMLInputElement).value);
    this.value = v;
    this.indInput.emit(v);
  };
  private onChange = (e: Event) => {
    this.indChange.emit(Number((e.target as HTMLInputElement).value));
  };

  private percent(): number {
    const span = this.max - this.min || 1;
    return ((this.value - this.min) / span) * 100;
  }

  render() {
    return (
      <Host>
        {(this.label || this.showValue) && (
          <div class="header" part="header">
            {this.label && <span class="label" part="label">{this.label}</span>}
            {this.showValue && (
              <span class="value" part="value">
                {this.value}{this.unit ? ` ${this.unit}` : ''}
              </span>
            )}
          </div>
        )}
        <input
          class="range"
          part="range"
          type="range"
          min={this.min}
          max={this.max}
          step={this.step}
          value={this.value}
          disabled={this.disabled}
          aria-label={this.label}
          style={{ '--_pct': `${this.percent()}%` }}
          onInput={this.onInput}
          onChange={this.onChange}
        />
      </Host>
    );
  }
}
