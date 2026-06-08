import { Component, Prop, h, Host } from '@stencil/core';

export type HeartbeatSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-heartbeat',
  styleUrl: 'heartbeat.css',
  shadow: true,
})
export class IndHeartbeat {
  /** Whether the monitored source is alive. When false the pulse stops. */
  @Prop({ reflect: true }) alive: boolean = true;

  /** Beat interval in milliseconds (drives the pulse animation period). */
  @Prop() interval: number = 1000;

  /** Size. */
  @Prop({ reflect: true }) size: HeartbeatSize = 'md';

  /** Optional label rendered next to the pulse. */
  @Prop() label?: string;

  render() {
    return (
      <Host
        role="status"
        aria-live="polite"
        aria-label={this.label ?? (this.alive ? 'Heartbeat active' : 'Heartbeat lost')}
        style={{ '--_period': `${Math.max(200, this.interval)}ms` }}
      >
        <span class="pulse" part="pulse" aria-hidden="true">
          <span class="core" part="core" />
          <span class="ring" part="ring" />
        </span>
        {this.label && <span class="label" part="label">{this.label}</span>}
      </Host>
    );
  }
}
