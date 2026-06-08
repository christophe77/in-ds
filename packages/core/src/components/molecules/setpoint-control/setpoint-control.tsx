import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

/**
 * Labelled setpoint faceplate. Wraps `<ind-setpoint>` (SP vs PV) with a title
 * and re-emits the committed value so a parent can write it to the controller.
 */
@Component({
  tag: 'ind-setpoint-control',
  styleUrls: ['../_shared/card.css', 'setpoint-control.css'],
  shadow: true,
})
export class IndSetpointControl {
  /** Control name (e.g. "Discharge pressure SP"). */
  @Prop() label!: string;
  /** Tag of the loop (e.g. "PIC-101"). */
  @Prop() tag?: string;
  /** Target setpoint (two-way). */
  @Prop({ mutable: true }) value: number = 0;
  /** Live process value for comparison. */
  @Prop() pv?: number;
  @Prop() min: number = 0;
  @Prop() max: number = 100;
  @Prop() step: number = 1;
  @Prop() precision: number = 1;
  /** Engineering unit. */
  @Prop() unit?: string;
  @Prop() disabled: boolean = false;

  /** Fires with the new setpoint when the operator commits a change. */
  @Event() indChange!: EventEmitter<number>;

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
          {this.tag && <span class="card-tag" part="tag">{this.tag}</span>}
        </div>
        <ind-setpoint
          part="setpoint"
          value={this.value}
          pv={this.pv}
          min={this.min}
          max={this.max}
          step={this.step}
          precision={this.precision}
          unit={this.unit}
          disabled={this.disabled}
          size="md"
          onIndChange={this.onChange}
        />
      </Host>
    );
  }
}
