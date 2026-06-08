import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type ToggleSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-toggle',
  styleUrl: 'toggle.css',
  shadow: true,
})
export class IndToggle {
  /** On/off state. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  /** Disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Size. */
  @Prop({ reflect: true }) size: ToggleSize = 'md';
  /** Visible label. Also the accessible name. */
  @Prop() label?: string;
  /** Text shown for the on state (in-track). */
  @Prop() textOn?: string;
  /** Text shown for the off state (in-track). */
  @Prop() textOff?: string;

  /** Fires when the state changes. */
  @Event() indChange!: EventEmitter<boolean>;

  private toggle = () => {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indChange.emit(this.checked);
  };

  private onKey = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.toggle();
    }
  };

  render() {
    return (
      <Host>
        <button
          type="button"
          class="control"
          part="control"
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          aria-label={this.label}
          disabled={this.disabled}
          onClick={this.toggle}
          onKeyDown={this.onKey}
        >
          <span class="track" part="track">
            {(this.textOn || this.textOff) && (
              <span class="text" part="text" aria-hidden="true">
                {this.checked ? this.textOn : this.textOff}
              </span>
            )}
            <span class="thumb" part="thumb" />
          </span>
          {this.label && <span class="label" part="label">{this.label}</span>}
        </button>
      </Host>
    );
  }
}
