import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentCardState } from '../../molecules/equipment-status-card/equipment-status-card';

const STATE_LABEL: Record<EquipmentCardState, string> = {
  running: 'Running',
  stopped: 'Stopped',
  fault: 'Fault',
  warning: 'Warning',
  maintenance: 'Maintenance',
  unknown: '—',
};

/**
 * Machine overview header + content area. Shows machine identity and state in
 * the header; slot equipment / KPI molecules into the grid body.
 */
@Component({
  tag: 'ind-machine-overview',
  styleUrls: ['../_shared/panel.css', 'machine-overview.css'],
  shadow: true,
})
export class IndMachineOverview {
  @Prop() heading!: string;
  /** Machine identifier. */
  @Prop() machineId?: string;
  @Prop({ reflect: true }) state: EquipmentCardState = 'unknown';
  /** OEE headline percentage. */
  @Prop() oee?: number;
  /** Grid columns for the body. */
  @Prop() columns: number = 3;

  render() {
    const dot = this.state === 'unknown' ? 'neutral' : this.state;
    return (
      <Host>
        <div class="panel-head">
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            {this.machineId && <span class="panel-subtitle">{this.machineId}</span>}
          </div>
          <div class="panel-actions">
            {this.oee !== undefined && (
              <span class="oee" part="oee">OEE {this.oee.toFixed(0)}%</span>
            )}
            <ind-status-dot state={dot as any} size="md" />
            <span class={`state state-${this.state}`} part="state">{STATE_LABEL[this.state]}</span>
          </div>
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
