import { Component, Prop, h, Host } from '@stencil/core';

/**
 * OEE dashboard: the headline OEE figure plus its three factors
 * (Availability × Performance × Quality) as radial gauges.
 */
@Component({
  tag: 'ind-oee-dashboard',
  styleUrls: ['../_shared/panel.css', 'oee-dashboard.css'],
  shadow: true,
})
export class IndOeeDashboard {
  @Prop() heading: string = 'OEE';
  /** Availability % (0–100). */
  @Prop() availability: number = 0;
  /** Performance % (0–100). */
  @Prop() performance: number = 0;
  /** Quality % (0–100). */
  @Prop() quality: number = 0;
  /** Override the computed OEE (A×P×Q). */
  @Prop() oee?: number;
  /** Context subtitle. */
  @Prop() subtitle?: string;

  private computedOee(): number {
    if (this.oee !== undefined) return this.oee;
    return (this.availability * this.performance * this.quality) / 10000;
  }

  render() {
    const oee = this.computedOee();
    const zones = [
      { from: 0, to: 60, color: 'var(--ind-state-fault-bg, #dc2626)' },
      { from: 60, to: 85, color: 'var(--ind-state-warning-bg, #f59e0b)' },
      { from: 85, to: 100, color: 'var(--ind-state-running-bg, #16a34a)' },
    ];
    return (
      <Host>
        <div class="panel-head">
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            {this.subtitle && <span class="panel-subtitle">{this.subtitle}</span>}
          </div>
          <div class="headline" part="headline">
            <span class="headline-value">{oee.toFixed(1)}</span>
            <span class="headline-unit">% OEE</span>
          </div>
        </div>
        <div class="gauges" part="gauges">
          <ind-gauge value={this.availability} min={0} max={100} unit="%" label="Availability" precision={0} zones={zones} size="md"></ind-gauge>
          <ind-gauge value={this.performance} min={0} max={100} unit="%" label="Performance" precision={0} zones={zones} size="md"></ind-gauge>
          <ind-gauge value={this.quality} min={0} max={100} unit="%" label="Quality" precision={0} zones={zones} size="md"></ind-gauge>
        </div>
      </Host>
    );
  }
}
