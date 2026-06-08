import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type SetpointSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-setpoint',
  styleUrl: 'setpoint.css',
  shadow: true,
})
export class IndSetpoint {
  /** Target setpoint value (editable). */
  @Prop({ mutable: true }) value: number = 0;
  /** Live process value, shown for comparison when provided. */
  @Prop() pv?: number;
  /** Minimum. */
  @Prop() min?: number;
  /** Maximum. */
  @Prop() max?: number;
  /** Step for the +/- buttons and keyboard. */
  @Prop() step: number = 1;
  /** Decimal places to display. */
  @Prop() precision?: number;
  /** Engineering unit. */
  @Prop() unit?: string;
  /** Label / tag. */
  @Prop() label?: string;
  /** Disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Size. */
  @Prop({ reflect: true }) size: SetpointSize = 'md';

  /** Fires when the setpoint is committed. */
  @Event() indChange!: EventEmitter<number>;

  private clamp(v: number): number {
    if (this.min !== undefined) v = Math.max(this.min, v);
    if (this.max !== undefined) v = Math.min(this.max, v);
    return v;
  }

  private commit(v: number) {
    const next = this.clamp(v);
    if (next === this.value) return;
    this.value = next;
    this.indChange.emit(next);
  }

  private fmt(v?: number): string {
    if (v === undefined || !Number.isFinite(v)) return '--';
    return this.precision !== undefined ? v.toFixed(this.precision) : String(v);
  }

  private onInput = (e: Event) => {
    const v = Number((e.target as HTMLInputElement).value);
    if (Number.isFinite(v)) this.commit(v);
  };

  render() {
    return (
      <Host>
        <div class="frame" part="frame">
          {this.label && <span class="label" part="label">{this.label}</span>}
          <div class="rows" part="rows">
            {this.pv !== undefined && (
              <div class="pv" part="pv">
                <span class="pv-tag">PV</span>
                <span class="pv-num">{this.fmt(this.pv)}</span>
                {this.unit && <span class="pv-unit">{this.unit}</span>}
              </div>
            )}
            <div class="sp" part="sp">
              <span class="sp-tag">SP</span>
              <button
                type="button"
                class="step"
                part="dec"
                aria-label="Decrease setpoint"
                disabled={this.disabled}
                onClick={() => this.commit(this.value - this.step)}
              >
                −
              </button>
              <input
                class="num"
                part="input"
                type="number"
                value={this.fmt(this.value)}
                min={this.min}
                max={this.max}
                step={this.step}
                disabled={this.disabled}
                aria-label={`${this.label ?? 'Setpoint'} value`}
                onChange={this.onInput}
              />
              {this.unit && <span class="sp-unit">{this.unit}</span>}
              <button
                type="button"
                class="step"
                part="inc"
                aria-label="Increase setpoint"
                disabled={this.disabled}
                onClick={() => this.commit(this.value + this.step)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
