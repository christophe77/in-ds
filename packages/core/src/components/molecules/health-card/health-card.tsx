import { Component, Prop, h, Host } from '@stencil/core';

export type HealthState =
  | 'running'
  | 'stopped'
  | 'fault'
  | 'warning'
  | 'maintenance'
  | 'unknown';

const DEFAULT_LABEL: Record<HealthState, string> = {
  running: 'OK',
  stopped: 'Stopped',
  fault: 'Fault',
  warning: 'Warning',
  maintenance: 'Maintenance',
  unknown: '—',
};

@Component({
  tag: 'ind-health-card',
  styleUrl: 'health-card.css',
  shadow: true,
})
export class IndHealthCard {
  /** Subsystem name (e.g. "PLC", "Dispense robot", "Washer"). */
  @Prop() heading!: string;
  /** Process state — drives the dot color and the prominent text color. */
  @Prop({ reflect: true }) state: HealthState = 'unknown';
  /** Override the default label (e.g. show "RUN 24 h" instead of "OK"). */
  @Prop() stateLabel?: string;
  /** Optional sub-line for context (timestamp, last error, etc.). */
  @Prop() detail?: string;

  render() {
    const label = this.stateLabel ?? DEFAULT_LABEL[this.state];
    const dotState = this.state === 'unknown' ? 'neutral' : this.state;
    return (
      <Host
        role="group"
        aria-label={`${this.heading}: ${label}`}
        aria-live={this.state === 'fault' ? 'assertive' : 'polite'}
      >
        <div class="title" part="title">{this.heading}</div>
        <div class="status" part="status">
          <ind-status-dot state={dotState as 'running' | 'stopped' | 'fault' | 'warning' | 'maintenance' | 'neutral'} size="md" />
          <span class="state-label" part="state-label">{label}</span>
        </div>
        {this.detail && <div class="detail" part="detail">{this.detail}</div>}
      </Host>
    );
  }
}
