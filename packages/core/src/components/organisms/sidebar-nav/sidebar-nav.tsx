import { Component, h, Host } from '@stencil/core';

/**
 * Sidebar shell: a brand area on top, a scrollable nav list, and a footer area.
 *
 * State management is left to the consumer — drive `active` on each <ind-nav-item>
 * from your router. The component is intentionally thin so it works with any
 * routing approach (React Router, Vue Router, hash-based, none).
 */
@Component({
  tag: 'ind-sidebar-nav',
  styleUrl: 'sidebar-nav.css',
  shadow: true,
})
export class IndSidebarNav {
  render() {
    return (
      <Host role="navigation">
        <div class="brand" part="brand">
          <slot name="brand" />
        </div>
        <div class="items" part="items">
          <slot />
        </div>
        <div class="footer" part="footer">
          <slot name="footer" />
        </div>
      </Host>
    );
  }
}
