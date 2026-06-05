import { Component, Prop, h, Host } from '@stencil/core';

export type StatusBarState =
  | 'neutral' | 'running' | 'stopped' | 'fault' | 'warning' | 'maintenance' | 'success' | 'info' | 'error';

/**
 * Global footer bar: status dot + message on the left, slotted content on the right.
 *
 * Sized to be unobtrusive (~24 px). Drop additional `<span>` / `<ind-button size="sm">`
 * children for right-aligned context (timestamps, server identifiers, action buttons).
 */
@Component({
  tag: 'ind-status-bar',
  styleUrl: 'status-bar.css',
  shadow: true,
})
export class IndStatusBar {
  @Prop({ reflect: true }) state: StatusBarState = 'neutral';
  @Prop() message?: string;

  render() {
    return (
      <Host role="status" aria-live="polite">
        <ind-status-dot state={this.state} size="sm" />
        {this.message && <span class="message" part="message">{this.message}</span>}
        <span class="spacer" />
        <span class="end" part="end"><slot /></span>
      </Host>
    );
  }
}
