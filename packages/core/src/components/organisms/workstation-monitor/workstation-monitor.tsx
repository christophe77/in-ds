import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentCardState } from '../../molecules/equipment-status-card/equipment-status-card';

/**
 * Operator workstation monitor: station + operator, current job, produced /
 * rejected counts and progress to target.
 */
@Component({
  tag: 'ind-workstation-monitor',
  styleUrls: ['../_shared/panel.css', 'workstation-monitor.css'],
  shadow: true,
})
export class IndWorkstationMonitor {
  @Prop() heading: string = 'Workstation';
  /** Station identifier. */
  @Prop() station?: string;
  /** Operator name. */
  @Prop() operator?: string;
  /** Current job / order. */
  @Prop() job?: string;
  @Prop({ reflect: true }) state: EquipmentCardState = 'unknown';
  /** Produced count. */
  @Prop() produced: number = 0;
  /** Rejected count. */
  @Prop() rejected: number = 0;
  /** Target count for the job. */
  @Prop() target?: number;

  render() {
    const dot = this.state === 'unknown' ? 'neutral' : this.state;
    const pct = this.target ? Math.min(100, (this.produced / this.target) * 100) : undefined;
    return (
      <Host>
        <div class="panel-head">
          <ind-status-dot state={dot as any} size="md" />
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}{this.station ? ` · ${this.station}` : ''}</span>
            {this.operator && <span class="panel-subtitle">Operator: {this.operator}</span>}
          </div>
        </div>
        <div class="panel-body">
          {this.job && (
            <div class="job" part="job">
              <span class="job-label">Job</span>
              <span class="job-name">{this.job}</span>
            </div>
          )}
          <div class="figures" part="figures">
            <ind-value value={this.produced} label="Produced" size="lg"></ind-value>
            <ind-value value={this.rejected} label="Rejected" alarm={this.rejected > 0 ? 'high' : 'none'} size="md"></ind-value>
            {this.target !== undefined && (
              <ind-value value={this.target} label="Target" size="md"></ind-value>
            )}
          </div>
          {pct !== undefined && (
            <ind-progress value={pct} max={100} variant="success" size="md" show-value></ind-progress>
          )}
        </div>
      </Host>
    );
  }
}
