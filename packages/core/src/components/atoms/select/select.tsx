import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-select',
  styleUrl: 'select.css',
  shadow: true,
})
export class IndSelect {
  /**
   * Options. Pass an array via JS property (`.options = [...]`) OR a JSON-stringified
   * array via the HTML `options` attribute. The native picker handles keyboard nav and
   * mobile UI without us building a popover.
   */
  @Prop() options: SelectOption[] | string = [];
  @Prop({ mutable: true }) value: string = '';
  @Prop() placeholder?: string;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop({ reflect: true }) size: SelectSize = 'md';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) invalid: boolean = false;

  @Event() indChange!: EventEmitter<string>;

  private parseOptions(): SelectOption[] {
    if (Array.isArray(this.options)) return this.options;
    if (typeof this.options === 'string' && this.options.trim()) {
      try {
        const parsed = JSON.parse(this.options);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  private onChange = (e: Event) => {
    const v = (e.target as HTMLSelectElement).value;
    this.value = v;
    this.indChange.emit(v);
  };

  render() {
    const opts = this.parseOptions();
    return (
      <Host>
        <label class="wrap" part="wrap">
          {this.label && <span class="label" part="label">{this.label}</span>}
          <span class="field" part="field">
            <select
              class="native"
              part="native"
              disabled={this.disabled}
              name={this.name}
              aria-invalid={this.invalid ? 'true' : 'false'}
              onChange={this.onChange}
            >
              {this.placeholder && (
                <option value="" disabled selected={this.value === ''}>
                  {this.placeholder}
                </option>
              )}
              {opts.map((o) => (
                <option value={o.value} disabled={o.disabled} selected={o.value === this.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span class="caret" part="caret" aria-hidden="true">▾</span>
          </span>
        </label>
      </Host>
    );
  }
}
