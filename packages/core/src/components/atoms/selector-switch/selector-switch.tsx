import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export interface SelectorPosition {
  value: string;
  label: string;
}

@Component({
  tag: 'ind-selector-switch',
  styleUrl: 'selector-switch.css',
  shadow: true,
})
export class IndSelectorSwitch {
  /** Discrete positions, e.g. OFF / HAND / AUTO. Pass as a property. */
  @Prop() positions: SelectorPosition[] = [];
  /** Selected position value. */
  @Prop({ mutable: true, reflect: true }) value?: string;
  /** Disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Group label. */
  @Prop() label?: string;

  /** Fires when a position is selected. */
  @Event() indChange!: EventEmitter<string>;

  private select(value: string) {
    if (this.disabled || value === this.value) return;
    this.value = value;
    this.indChange.emit(value);
  }

  private onKey = (e: KeyboardEvent) => {
    const pos = this.positions ?? [];
    if (pos.length === 0) return;
    const idx = pos.findIndex((p) => p.value === this.value);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.select(pos[Math.min(pos.length - 1, idx + 1)]?.value ?? pos[0].value);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.select(pos[Math.max(0, idx - 1)]?.value ?? pos[0].value);
    }
  };

  render() {
    const positions = this.positions ?? [];
    return (
      <Host>
        {this.label && <span class="group-label" part="group-label">{this.label}</span>}
        <div
          class="switch"
          part="switch"
          role="radiogroup"
          aria-label={this.label}
          aria-disabled={this.disabled ? 'true' : 'false'}
          tabindex={this.disabled ? undefined : '0'}
          onKeyDown={this.onKey}
        >
          {positions.map((p) => (
            <button
              type="button"
              class={{ pos: true, 'is-active': p.value === this.value }}
              part="position"
              role="radio"
              aria-checked={p.value === this.value ? 'true' : 'false'}
              disabled={this.disabled}
              tabindex="-1"
              onClick={() => this.select(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </Host>
    );
  }
}
