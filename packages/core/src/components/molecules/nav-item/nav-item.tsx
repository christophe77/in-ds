import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'ind-nav-item',
  styleUrl: 'nav-item.css',
  shadow: true,
})
export class IndNavItem {
  /** Current page indicator — gets the ▶ prefix and active styling. */
  @Prop({ reflect: true }) active: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  /** Label text. Falls back to slotted content. */
  @Prop() label?: string;
  /** Optional href. When set, renders as `<a>` so middle-click / right-click open in new tab. */
  @Prop() href?: string;
  /** Optional badge — alarm count, unread messages, etc. */
  @Prop() badge?: string | number;

  /** Fires on click (or Enter / Space). Use this to drive client-side routers. */
  @Event() indSelect!: EventEmitter<void>;

  private onClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    if (!this.href) e.preventDefault();
    this.indSelect.emit();
  };

  render() {
    const ariaCurrent = this.active ? 'page' : undefined;
    const showBadge = this.badge !== undefined && this.badge !== '' && this.badge !== null;

    const inner = [
      <span class="indicator" part="indicator" aria-hidden="true">▶</span>,
      <span class="content" part="content"><slot>{this.label}</slot></span>,
      showBadge ? <span class="badge" part="badge">{this.badge}</span> : null,
    ];

    return (
      <Host>
        {this.href ? (
          <a
            class="item"
            part="item"
            href={this.href}
            aria-current={ariaCurrent}
            aria-disabled={this.disabled ? 'true' : undefined}
            onClick={this.onClick}
          >
            {inner}
          </a>
        ) : (
          <button
            type="button"
            class="item"
            part="item"
            disabled={this.disabled}
            aria-current={ariaCurrent}
            onClick={this.onClick}
          >
            {inner}
          </button>
        )}
      </Host>
    );
  }
}
