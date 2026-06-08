import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'ind-tab',
  styleUrl: 'tab.css',
  shadow: true,
})
export class IndTab {
  /** Selected state. */
  @Prop({ reflect: true }) selected: boolean = false;
  /** Disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Stable id for the tab (emitted on select). */
  @Prop() tabId?: string;

  /** Fires when the tab is activated. */
  @Event() indSelect!: EventEmitter<string | undefined>;

  private activate = () => {
    if (this.disabled || this.selected) return;
    this.indSelect.emit(this.tabId);
  };

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.activate();
    }
  };

  render() {
    return (
      <Host>
        <button
          type="button"
          class="tab"
          part="tab"
          role="tab"
          aria-selected={this.selected ? 'true' : 'false'}
          disabled={this.disabled}
          tabindex={this.selected ? '0' : '-1'}
          onClick={this.activate}
          onKeyDown={this.onKey}
        >
          <span class="icon" part="icon"><slot name="icon" /></span>
          <span class="label" part="label"><slot /></span>
          <span class="badge" part="badge"><slot name="badge" /></span>
        </button>
      </Host>
    );
  }
}
