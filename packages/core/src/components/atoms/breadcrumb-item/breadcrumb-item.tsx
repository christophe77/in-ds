import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'ind-breadcrumb-item',
  styleUrl: 'breadcrumb-item.css',
  shadow: true,
})
export class IndBreadcrumbItem {
  /** Navigation target. When omitted the item renders as a button. */
  @Prop() href?: string;
  /** Marks the current page (last crumb) — not interactive. */
  @Prop({ reflect: true }) current: boolean = false;
  /** Hide the trailing separator (set on the last item). */
  @Prop({ reflect: true }) last: boolean = false;

  /** Fires when a non-current item is activated. */
  @Event() indNavigate!: EventEmitter<void>;

  private onClick = (e: MouseEvent) => {
    if (this.current) {
      e.preventDefault();
      return;
    }
    this.indNavigate.emit();
  };

  render() {
    const interactive = !this.current;
    return (
      <Host role="listitem">
        {interactive && this.href ? (
          <a class="crumb" part="crumb" href={this.href} onClick={this.onClick}>
            <slot />
          </a>
        ) : interactive ? (
          <button type="button" class="crumb" part="crumb" onClick={this.onClick}>
            <slot />
          </button>
        ) : (
          <span class="crumb" part="crumb" aria-current="page">
            <slot />
          </span>
        )}
        {!this.last && <span class="sep" part="separator" aria-hidden="true">/</span>}
      </Host>
    );
  }
}
