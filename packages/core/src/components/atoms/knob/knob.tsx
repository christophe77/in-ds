import { Component, Prop, State, Event, EventEmitter, Element, h, Host } from '@stencil/core';

export type KnobSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-knob',
  styleUrl: 'knob.css',
  shadow: true,
})
export class IndKnob {
  @Element() host!: HTMLElement;

  /** Current value. */
  @Prop({ mutable: true }) value: number = 0;
  /** Minimum. */
  @Prop() min: number = 0;
  /** Maximum. */
  @Prop() max: number = 100;
  /** Step for keyboard / drag. */
  @Prop() step: number = 1;
  /** Disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Size. */
  @Prop({ reflect: true }) size: KnobSize = 'md';
  /** Label. */
  @Prop() label?: string;
  /** Unit suffix. */
  @Prop() unit?: string;
  /** Show the numeric value below the knob. */
  @Prop() showValue: boolean = true;

  @State() dragging = false;

  /** Fires continuously while turning. */
  @Event() indInput!: EventEmitter<number>;
  /** Fires on release. */
  @Event() indChange!: EventEmitter<number>;

  private startY = 0;
  private startVal = 0;

  private clamp(v: number): number {
    return Math.max(this.min, Math.min(this.max, v));
  }

  private angle(): number {
    const span = this.max - this.min || 1;
    const ratio = (this.value - this.min) / span;
    return -135 + ratio * 270;
  }

  private setValue(v: number, commit = false) {
    const next = this.clamp(Math.round(v / this.step) * this.step);
    if (next !== this.value) {
      this.value = next;
      this.indInput.emit(next);
    }
    if (commit) this.indChange.emit(this.value);
  }

  private onPointerDown = (e: PointerEvent) => {
    if (this.disabled) return;
    this.dragging = true;
    this.startY = e.clientY;
    this.startVal = this.value;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    const dy = this.startY - e.clientY;
    const span = this.max - this.min;
    this.setValue(this.startVal + (dy / 120) * span);
  };

  private onPointerUp = () => {
    if (!this.dragging) return;
    this.dragging = false;
    this.indChange.emit(this.value);
  };

  private onKey = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); this.setValue(this.value + this.step, true); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); this.setValue(this.value - this.step, true); }
    else if (e.key === 'Home') { e.preventDefault(); this.setValue(this.min, true); }
    else if (e.key === 'End') { e.preventDefault(); this.setValue(this.max, true); }
  };

  render() {
    return (
      <Host>
        <div
          class="knob"
          part="knob"
          role="slider"
          aria-valuenow={this.value}
          aria-valuemin={this.min}
          aria-valuemax={this.max}
          aria-label={this.label}
          aria-disabled={this.disabled ? 'true' : 'false'}
          tabindex={this.disabled ? undefined : '0'}
          onPointerDown={this.onPointerDown}
          onPointerMove={this.onPointerMove}
          onPointerUp={this.onPointerUp}
          onKeyDown={this.onKey}
        >
          <span class="dial" part="dial" style={{ transform: `rotate(${this.angle()}deg)` }}>
            <span class="pointer" part="pointer" />
          </span>
        </div>
        {(this.label || this.showValue) && (
          <div class="caption" part="caption">
            {this.label && <span class="label" part="label">{this.label}</span>}
            {this.showValue && (
              <span class="value" part="value">{this.value}{this.unit ? ` ${this.unit}` : ''}</span>
            )}
          </div>
        )}
      </Host>
    );
  }
}
