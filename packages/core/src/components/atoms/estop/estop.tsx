import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type EstopSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-estop',
  styleUrl: 'estop.css',
  shadow: true,
})
export class IndEstop {
  /** Whether the mushroom button is latched (pressed/engaged). */
  @Prop({ mutable: true, reflect: true }) engaged: boolean = false;
  /** Disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Size. */
  @Prop({ reflect: true }) size: EstopSize = 'md';
  /** Visible caption. Defaults to "EMERGENCY STOP". */
  @Prop() label?: string;

  /** Fires when pressed to engage the stop. */
  @Event() indActivate!: EventEmitter<void>;
  /** Fires when reset (twist-release) from an engaged state. */
  @Event() indReset!: EventEmitter<void>;

  private press = () => {
    if (this.disabled) return;
    if (this.engaged) {
      this.engaged = false;
      this.indReset.emit();
    } else {
      this.engaged = true;
      this.indActivate.emit();
    }
  };

  render() {
    const caption = this.label ?? 'EMERGENCY STOP';
    return (
      <Host>
        <button
          type="button"
          class="btn"
          part="button"
          aria-pressed={this.engaged ? 'true' : 'false'}
          aria-label={`${caption}${this.engaged ? ' — engaged' : ''}`}
          disabled={this.disabled}
          onClick={this.press}
        >
          <span class="ring" part="ring">
            <span class="mushroom" part="mushroom" />
          </span>
        </button>
        <span class="caption" part="caption">{caption}</span>
      </Host>
    );
  }
}
