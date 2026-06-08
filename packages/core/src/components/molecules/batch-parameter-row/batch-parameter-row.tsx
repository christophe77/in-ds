import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

/**
 * One editable parameter in a batch / recipe parameter list: label, value
 * input, unit suffix and an optional target hint. Designed to stack inside a
 * scrolling parameter table.
 */
@Component({
  tag: 'ind-batch-parameter-row',
  styleUrl: 'batch-parameter-row.css',
  shadow: true,
})
export class IndBatchParameterRow {
  /** Parameter name (e.g. "Dose volume"). */
  @Prop() label!: string;
  /** Current value (two-way). */
  @Prop({ mutable: true }) value?: string | number;
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Input type. */
  @Prop() type: string = 'number';
  @Prop() min?: number;
  @Prop() max?: number;
  @Prop() step?: number;
  @Prop() placeholder?: string;
  @Prop() disabled: boolean = false;
  /** Read-only target / default hint shown after the unit. */
  @Prop() target?: string;
  /** Mark the row as out of range / invalid. */
  @Prop({ reflect: true }) invalid: boolean = false;

  /** Live value as the operator types. */
  @Event() indInput!: EventEmitter<string>;
  /** Committed value. */
  @Event() indChange!: EventEmitter<string>;

  private onInput = (e: CustomEvent<string>) => {
    e.stopPropagation();
    this.value = e.detail;
    this.indInput.emit(e.detail);
  };
  private onChange = (e: CustomEvent<string>) => {
    e.stopPropagation();
    this.value = e.detail;
    this.indChange.emit(e.detail);
  };

  render() {
    return (
      <Host>
        <span class="label" part="label">{this.label}</span>
        <ind-input
          class="field"
          part="field"
          type={this.type as any}
          value={this.value !== undefined ? String(this.value) : ''}
          min={this.min}
          max={this.max}
          step={this.step}
          placeholder={this.placeholder}
          disabled={this.disabled}
          invalid={this.invalid}
          size="sm"
          label={this.label}
          onIndInput={this.onInput}
          onIndChange={this.onChange}
        />
        {this.unit && <span class="unit" part="unit">{this.unit}</span>}
        {this.target && <span class="target" part="target">/ {this.target}</span>}
      </Host>
    );
  }
}
