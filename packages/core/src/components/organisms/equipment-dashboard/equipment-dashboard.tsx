import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Responsive grid host for equipment faceplate molecules (motor/pump/valve/
 * tank cards). Slot the cards in; the dashboard supplies the heading and the
 * column layout.
 */
@Component({
  tag: 'ind-equipment-dashboard',
  styleUrls: ['../_shared/panel.css', 'equipment-dashboard.css'],
  shadow: true,
})
export class IndEquipmentDashboard {
  @Prop() heading: string = 'Equipment';
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
