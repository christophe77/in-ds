import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  h,
  Host,
} from '@stencil/core';

export type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class IndButton {
  /** Visual variant. `danger` should be paired with `holdToConfirmMs` for critical actions. */
  @Prop({ reflect: true }) variant: ButtonVariant = 'default';

  /** Size. */
  @Prop({ reflect: true }) size: ButtonSize = 'md';

  /** Disabled state. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Optional accessible label (falls back to slotted text). */
  @Prop() label?: string;

  /**
   * If > 0, the button must be held this many milliseconds before activating.
   * Use for critical actions (Stop, Trip, Reset) to prevent accidental clicks —
   * standard NAMUR / safety-instrumented operating practice.
   */
  @Prop() holdToConfirmMs: number = 0;

  /** Fired on click (or after hold completes if `holdToConfirmMs > 0`). */
  @Event() indActivate!: EventEmitter<void>;

  @State() private progress: number = 0;

  private holdStart = 0;
  private rafHandle: number | null = null;

  private startHold = (e: Event) => {
    if (this.disabled) return;
    e.preventDefault();
    if (this.holdToConfirmMs <= 0) {
      this.indActivate.emit();
      return;
    }
    this.holdStart = performance.now();
    this.progress = 0;
    this.tick();
  };

  private tick = () => {
    const elapsed = performance.now() - this.holdStart;
    this.progress = Math.min(1, elapsed / this.holdToConfirmMs);
    if (this.progress >= 1) {
      this.cancelHold();
      this.indActivate.emit();
      return;
    }
    this.rafHandle = requestAnimationFrame(this.tick);
  };

  private cancelHold = () => {
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
    this.progress = 0;
  };

  private onKeyDown = (e: KeyboardEvent) => {
    // Ignore OS auto-repeat: without this, every repeat keydown resets `holdStart`
    // (so the hold never completes) and stacks a new requestAnimationFrame loop.
    if (e.repeat) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.startHold(e);
    }
  };

  disconnectedCallback() {
    this.cancelHold();
  }

  render() {
    const isHolding = this.progress > 0 && this.progress < 1;
    return (
      <Host>
        <button
          type="button"
          class={{ btn: true, 'is-holding': isHolding }}
          part="btn"
          disabled={this.disabled}
          aria-label={this.label}
          aria-describedby={this.holdToConfirmMs > 0 ? 'hold-hint' : undefined}
          onPointerDown={this.startHold}
          onPointerUp={this.cancelHold}
          onPointerLeave={this.cancelHold}
          onPointerCancel={this.cancelHold}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.cancelHold}
        >
          <span class="content" part="content">
            <slot>{this.label}</slot>
          </span>
          {this.holdToConfirmMs > 0 && (
            <span
              class="hold-progress"
              part="hold-progress"
              style={{ transform: `scaleX(${this.progress})` }}
              aria-hidden="true"
            />
          )}
        </button>
        {this.holdToConfirmMs > 0 && (
          <span id="hold-hint" class="sr-only">
            Hold to confirm ({this.holdToConfirmMs} ms)
          </span>
        )}
      </Host>
    );
  }
}
