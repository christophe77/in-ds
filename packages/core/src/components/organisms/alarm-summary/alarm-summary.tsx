import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Compact alarm KPI block: total + unacknowledged headline figures and the
 * ISA-18.2 priority breakdown via `<ind-alarm-badge-group>`. For a dashboard
 * tile or the top of an alarm page.
 */
@Component({
  tag: 'ind-alarm-summary',
  styleUrls: ['../_shared/panel.css', 'alarm-summary.css'],
  shadow: true,
})
export class IndAlarmSummary {
  @Prop() heading: string = 'Alarm summary';
  @Prop() highHigh: number = 0;
  @Prop() high: number = 0;
  @Prop() low: number = 0;
  @Prop() lowLow: number = 0;
  /** Number still requiring acknowledgement. */
  @Prop() unacknowledged: number = 0;

  private get total(): number {
    return this.highHigh + this.high + this.low + this.lowLow;
  }

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
        </div>
        <div class="panel-body">
          <div class="figures" part="figures">
            <div class="figure">
              <span class="figure-value" part="total">{this.total}</span>
              <span class="figure-label">Active</span>
            </div>
            <div class={`figure ${this.unacknowledged > 0 ? 'figure-alert' : ''}`}>
              <span class="figure-value" part="unacked">{this.unacknowledged}</span>
              <span class="figure-label">Unacked</span>
            </div>
          </div>
          <ind-alarm-badge-group
            part="badges"
            highHigh={this.highHigh}
            high={this.high}
            low={this.low}
            lowLow={this.lowLow}
          />
        </div>
      </Host>
    );
  }
}
