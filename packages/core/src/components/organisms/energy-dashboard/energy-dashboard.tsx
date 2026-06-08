import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Energy dashboard. A headline total in the header and a grid of slotted
 * `<ind-energy-card>` / KPI molecules below.
 */
@Component({
  tag: 'ind-energy-dashboard',
  styleUrls: ['../_shared/panel.css', 'energy-dashboard.css'],
  shadow: true,
})
export class IndEnergyDashboard {
  @Prop() heading: string = 'Energy';
  /** Headline total label (e.g. "Site total"). */
  @Prop() totalLabel?: string;
  /** Headline total value. */
  @Prop() totalValue?: number;
  /** Headline total unit. */
  @Prop() totalUnit: string = 'kW';
  /** Number of grid columns. */
  @Prop() columns: number = 3;

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
          {this.totalValue !== undefined && (
            <div class="total" part="total">
              {this.totalLabel && <span class="total-label">{this.totalLabel}</span>}
              <span class="total-value">{this.totalValue.toLocaleString()}</span>
              <span class="total-unit">{this.totalUnit}</span>
            </div>
          )}
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
