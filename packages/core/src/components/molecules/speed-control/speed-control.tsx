import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type SpeedControlVariant = 'slider' | 'knob';

/**
 * Speed / rate control. Renders a slider (default) or knob for the operator to
 * set a percentage or engineering speed, and re-emits live + committed values.
 */
@Component({
  tag: 'ind-speed-control',
  styleUrls: ['../_shared/card.css', 'speed-control.css'],
  shadow: true,
})
export class IndSpeedControl {
  /** Control name (e.g. "Conveyor speed"). */
  @Prop() label!: string;
  /** Current value (two-way). */
  @Prop({ mutable: true }) value: number = 0;
  @Prop() min: number = 0;
  @Prop() max: number = 100;
  @Prop() step: number = 1;
  /** Unit (default %). */
  @Prop() unit: string = '%';
  @Prop() disabled: boolean = false;
  /** Input widget. */
  @Prop() variant: SpeedControlVariant = 'slider';

  /** Live value while dragging. */
  @Event() indInput!: EventEmitter<number>;
  /** Committed value. */
  @Event() indChange!: EventEmitter<number>;

  private onInput = (e: CustomEvent<number>) => {
    e.stopPropagation();
    this.value = e.detail;
    this.indInput.emit(e.detail);
  };
  private onChange = (e: CustomEvent<number>) => {
    e.stopPropagation();
    this.value = e.detail;
    this.indChange.emit(e.detail);
  };

  render() {
    return (
      <Host>
        <div class="card-head">
          <span class="card-title" part="label">{this.label}</span>
        </div>
        {this.variant === 'knob' ? (
          <ind-knob
            part="control"
            value={this.value}
            min={this.min}
            max={this.max}
            step={this.step}
            unit={this.unit}
            disabled={this.disabled}
            showValue
            size="md"
            onIndInput={this.onInput}
            onIndChange={this.onChange}
          />
        ) : (
          <ind-slider
            part="control"
            value={this.value}
            min={this.min}
            max={this.max}
            step={this.step}
            unit={this.unit}
            disabled={this.disabled}
            showValue
            size="md"
            onIndInput={this.onInput}
            onIndChange={this.onChange}
          />
        )}
      </Host>
    );
  }
}
