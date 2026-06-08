import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type DateTimeMode = 'datetime-local' | 'date' | 'time' | 'month' | 'week';
export type DateTimeSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-datetime-picker',
  styleUrl: 'datetime-picker.css',
  shadow: true,
})
export class IndDateTimePicker {
  /** Picker mode (maps to the native input type). */
  @Prop({ reflect: true }) mode: DateTimeMode = 'datetime-local';
  /** Current ISO value. */
  @Prop({ mutable: true }) value: string = '';
  /** Min bound (ISO). */
  @Prop() min?: string;
  /** Max bound (ISO). */
  @Prop() max?: string;
  /** Step (seconds for time-based modes). */
  @Prop() step?: number | string;
  /** Disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Invalid state. */
  @Prop({ reflect: true }) invalid: boolean = false;
  /** Size. */
  @Prop({ reflect: true }) size: DateTimeSize = 'md';
  /** Visible label. */
  @Prop() label?: string;
  /** Field name (forms). */
  @Prop() name?: string;

  /** Fires on commit. */
  @Event() indChange!: EventEmitter<string>;

  private onChange = (e: Event) => {
    const v = (e.target as HTMLInputElement).value;
    this.value = v;
    this.indChange.emit(v);
  };

  render() {
    return (
      <Host>
        <label class="wrap" part="wrap">
          {this.label && <span class="label" part="label">{this.label}</span>}
          <input
            class="input"
            part="input"
            type={this.mode}
            value={this.value}
            min={this.min}
            max={this.max}
            step={this.step as unknown as string}
            name={this.name}
            disabled={this.disabled}
            aria-invalid={this.invalid ? 'true' : 'false'}
            aria-label={this.label}
            onChange={this.onChange}
          />
        </label>
      </Host>
    );
  }
}
