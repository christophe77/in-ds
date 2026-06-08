import { Component, Prop, h, Host } from '@stencil/core';

export interface MaintenanceDueItem {
  asset: string;
  task: string;
  due: string;
  overdue?: boolean;
}

/**
 * Maintenance KPIs (MTBF / MTTR / open & overdue work orders) plus an upcoming
 * / overdue task list.
 */
@Component({
  tag: 'ind-maintenance-dashboard',
  styleUrls: ['../_shared/panel.css', 'maintenance-dashboard.css'],
  shadow: true,
})
export class IndMaintenanceDashboard {
  @Prop() heading: string = 'Maintenance';
  /** Mean time between failures (hours). */
  @Prop() mtbf?: number;
  /** Mean time to repair (hours). */
  @Prop() mttr?: number;
  /** Open work orders. */
  @Prop() openWorkOrders: number = 0;
  /** Overdue work orders. */
  @Prop() overdue: number = 0;
  /** Upcoming / overdue tasks. */
  @Prop() dueItems: MaintenanceDueItem[] = [];

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
        </div>
        <div class="kpis" part="kpis">
          <ind-kpi-card label="MTBF" value={this.mtbf ?? '--'} unit="h" precision={0}></ind-kpi-card>
          <ind-kpi-card label="MTTR" value={this.mttr ?? '--'} unit="h" precision={1}></ind-kpi-card>
          <ind-kpi-card label="Open WOs" value={this.openWorkOrders}></ind-kpi-card>
          <ind-kpi-card label="Overdue" value={this.overdue} variant={this.overdue > 0 ? 'bad' : 'neutral'}></ind-kpi-card>
        </div>
        <div class="panel-list" part="list">
          {this.dueItems.length === 0 ? (
            <div class="panel-empty">No scheduled tasks</div>
          ) : (
            this.dueItems.map((d, i) => (
              <div class={`row ${d.overdue ? 'row-overdue' : ''}`} part="row" key={i}>
                <span class="tag" part="asset">{d.asset}</span>
                <span class="task" part="task">{d.task}</span>
                <span class="due" part="due">{d.due}</span>
              </div>
            ))
          )}
        </div>
      </Host>
    );
  }
}
