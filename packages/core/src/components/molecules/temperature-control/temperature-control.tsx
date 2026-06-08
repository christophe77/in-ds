import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type ThermalMode = 'idle' | 'heating' | 'cooling';

/**
 * Temperature loop faceplate: setpoint vs process value plus a heating/cooling
 * indicator. Re-emits the committed setpoint.
 */
@Component({
  tag: 'ind-temperature-control',
  styleUrls: ['../_shared/card.css', 'temperature-control.css'],
  shadow: true,
})
export class IndTemperatureControl {
  /** Loop label (e.g. "Reactor jacket"). */
  @Prop() label!: string;
  /** Loop tag (e.g. "TIC-301"). */
  @Prop() tag?: string;
  /** Target temperature (two-way). */
  @Prop({ mutable: true }) value: number = 20;
  /** Live process temperature. */
  @Prop() pv?: number;
  @Prop() min: number = 0;
  @Prop() max: number = 200;
  @Prop() step: number = 0.5;
  @Prop() precision: number = 1;
  /** Temperature unit (default °C). */
  @Prop() unit: string = '°C';
  @Prop() disabled: boolean = false;
  /** Current thermal action — drives the indicator. */
  @Prop({ reflect: true }) mode: ThermalMode = 'idle';

  /** Committed setpoint. */
  @Event() indChange!: EventEmitter<number>;

  private onChange = (e: CustomEvent<number>) => {
    e.stopPropagation();
    this.value = e.detail;
    this.indChange.emit(e.detail);
  };

  render() {
    const modeLabel = this.mode === 'heating' ? 'Heating' : this.mode === 'cooling' ? 'Cooling' : 'Idle';
    const glyph = this.mode === 'heating' ? '🔥' : this.mode === 'cooling' ? '❄' : '○';
    return (
      <Host>
        <div class="card-head">
          <span class="card-title" part="label">{this.label}</span>
          {this.tag && <span class="card-tag" part="tag">{this.tag}</span>}
        </div>
        <div class={`mode mode-${this.mode}`} part="mode">
          <span class="glyph" aria-hidden="true">{glyph}</span>
          <span>{modeLabel}</span>
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
