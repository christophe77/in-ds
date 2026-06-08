import { Component, Prop, h, Host } from '@stencil/core';

export type EquipmentCardState =
  | 'running'
  | 'stopped'
  | 'fault'
  | 'warning'
  | 'maintenance'
  | 'unknown';

const DEFAULT_LABEL: Record<EquipmentCardState, string> = {
  running: 'Running',
  stopped: 'Stopped',
  fault: 'Fault',
  warning: 'Warning',
  maintenance: 'Maintenance',
  unknown: '—',
};

/**
 * Generic equipment status card. Slot a process symbol (`<ind-pump>`,
 * `<ind-motor>`, …) into the default slot; the card supplies the heading,
 * a state badge and an optional detail line.
 */
@Component({
  tag: 'ind-equipment-status-card',
  styleUrls: ['../_shared/card.css', 'equipment-status-card.css'],
  shadow: true,
})
export class IndEquipmentStatusCard {
  /** Equipment name (e.g. "Feed pump"). */
  @Prop() heading!: string;
  /** Equipment tag (e.g. "P-101"). */
  @Prop() tag?: string;
  /** Process state — drives the badge color and fault chrome. */
  @Prop({ reflect: true }) state: EquipmentCardState = 'unknown';
  /** Override the default state label. */
  @Prop() stateLabel?: string;
  /** Sub-line for context (runtime, last fault, …). */
  @Prop() detail?: string;

  render() {
    const label = this.stateLabel ?? DEFAULT_LABEL[this.state];
    const dot = this.state === 'unknown' ? 'neutral' : this.state;
    return (
      <Host
        role="group"
        aria-label={`${this.heading}: ${label}`}
        aria-live={this.state === 'fault' ? 'assertive' : 'polite'}
      >
        <div class="card-head">
          <span class="card-title" part="heading">{this.heading}</span>
          {this.tag && <span class="card-tag" part="tag">{this.tag}</span>}
        </div>
        <div class="body" part="body">
          <span class="symbol" part="symbol"><slot /></span>
          <div class="status" part="status">
            <ind-status-dot state={dot as any} size="md" />
            <span class="state-label" part="state-label">{label}</span>
          </div>
        </div>
        {this.detail && <div class="card-detail" part="detail">{this.detail}</div>}
      </Host>
    );
  }
}
