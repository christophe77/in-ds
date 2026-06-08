import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Production overview dashboard. Slot KPI / tag / trend molecules into the
 * grid; an optional `shift` subtitle and `actions` slot sit in the header.
 */
@Component({
  tag: 'ind-production-dashboard',
  styleUrls: ['../_shared/panel.css', 'production-dashboard.css'],
  shadow: true,
})
export class IndProductionDashboard {
  @Prop() heading: string = 'Production';
  /** Context subtitle (e.g. "Line 2 · Shift A"). */
  @Prop() subtitle?: string;
  /** Number of grid columns. */
  @Prop() columns: number = 4;

  render() {
    return (
      <Host>
        <div class="panel-head">
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            {this.subtitle && <span class="panel-subtitle">{this.subtitle}</span>}
          </div>
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
