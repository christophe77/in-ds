import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

/**
 * Collapsible heading for a section of the navigation sidebar. Slot
 * `<ind-nav-item>`s into the default slot; the group provides the section
 * title and an expand/collapse affordance.
 */
@Component({
  tag: 'ind-sidebar-group',
  styleUrl: 'sidebar-group.css',
  shadow: true,
})
export class IndSidebarGroup {
  /** Section title. */
  @Prop() label!: string;
  /** Collapsed state (two-way). */
  @Prop({ reflect: true, mutable: true }) collapsed: boolean = false;
  /** Optional count badge (e.g. active alarms in the section). */
  @Prop() badge?: string | number;

  /** Fires with the new collapsed state on toggle. */
  @Event() indToggle!: EventEmitter<boolean>;

  private toggle = () => {
    this.collapsed = !this.collapsed;
    this.indToggle.emit(this.collapsed);
  };

  render() {
    const showBadge = this.badge !== undefined && this.badge !== '' && this.badge !== null;
    return (
      <Host>
        <button
          type="button"
          class="header"
          part="header"
          aria-expanded={this.collapsed ? 'false' : 'true'}
          onClick={this.toggle}
        >
          <span class="chevron" part="chevron" aria-hidden="true">▾</span>
          <span class="label" part="label">{this.label}</span>
          {showBadge && <span class="badge" part="badge">{this.badge}</span>}
        </button>
        <div class="items" part="items" hidden={this.collapsed}>
          <slot />
        </div>
      </Host>
    );
  }
}
