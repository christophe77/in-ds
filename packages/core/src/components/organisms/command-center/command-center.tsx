import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Command center: a grid palette of command buttons / command groups for an
 * operator landing page or a quick-action overlay. Slot the commands in.
 */
@Component({
  tag: 'ind-command-center',
  styleUrls: ['../_shared/panel.css', 'command-center.css'],
  shadow: true,
})
export class IndCommandCenter {
  @Prop() heading: string = 'Commands';
  /** Number of grid columns. */
  @Prop() columns: number = 3;

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
          <div class="panel-actions"><slot name="actions" /></div>
        </div>
        <div
          class="panel-grid"
          part="grid"
          style={{ gridTemplateColumns: `repeat(${this.columns}, minmax(0, 1fr))` }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
