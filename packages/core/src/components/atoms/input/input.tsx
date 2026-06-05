import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Element,
  Method,
  h,
  Host,
} from '@stencil/core';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputMode = 'text' | 'numeric' | 'decimal' | 'tel' | 'url' | 'email' | 'search' | 'none';

@Component({
  tag: 'ind-input',
  styleUrl: 'input.css',
  shadow: true,
})
export class IndInput {
  @Element() host!: HTMLElement;

  @Prop({ reflect: true }) type: InputType = 'text';
  @Prop({ reflect: true }) size: InputSize = 'md';
  @Prop({ mutable: true }) value: string = '';
  @Prop() placeholder?: string;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop({ reflect: true }) invalid: boolean = false;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() min?: number | string;
  @Prop() max?: number | string;
  @Prop() step?: number | string;
  @Prop() pattern?: string;
  @Prop() autocomplete?: string;
  @Prop({ attribute: 'inputmode' }) inputMode?: InputMode;

  @State() private hasFocus = false;

  /** Fires on every keystroke. */
  @Event() indInput!: EventEmitter<string>;
  /** Fires on change (blur or Enter). */
  @Event() indChange!: EventEmitter<string>;

  /** Programmatically focus the underlying input. */
  @Method()
  async setFocus(): Promise<void> {
    this.host.shadowRoot?.querySelector('input')?.focus();
  }

  private onInput = (e: Event) => {
    const v = (e.target as HTMLInputElement).value;
    this.value = v;
    this.indInput.emit(v);
  };

  private onChange = (e: Event) => {
    const v = (e.target as HTMLInputElement).value;
    this.indChange.emit(v);
  };

  render() {
    return (
      <Host>
        <label class="wrap" part="wrap">
          {this.label && <span class="label" part="label">{this.label}</span>}
          <span class={{ field: true, 'is-focus': this.hasFocus }} part="field">
            <slot name="prefix" />
            <input
              part="input"
              class="input"
              type={this.type}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readonly={this.readonly}
              name={this.name}
              min={this.min as unknown as string}
              max={this.max as unknown as string}
              step={this.step as unknown as string}
              pattern={this.pattern}
              autocomplete={this.autocomplete as unknown as 'on' | 'off'}
              inputMode={this.inputMode as unknown as undefined}
              aria-invalid={this.invalid ? 'true' : 'false'}
              onFocus={() => (this.hasFocus = true)}
              onBlur={() => (this.hasFocus = false)}
              onInput={this.onInput}
              onChange={this.onChange}
            />
            <slot name="suffix" />
          </span>
        </label>
      </Host>
    );
  }
}
