import { Component, Prop, h, Host } from '@stencil/core';

export type StatusDotState =
  | 'neutral'
  | 'running'
  | 'stopped'
  | 'fault'
  | 'warning'
  | 'maintenance'
  | 'success'
  | 'info'
  | 'error';

export type StatusDotSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-status-dot',
  styleUrl: 'status-dot.css',
  shadow: true,
})
export class IndStatusDot {
  @Prop({ reflect: true }) state: StatusDotState = 'neutral';
  @Prop({ reflect: true }) size: StatusDotSize = 'md';
  @Prop({ reflect: true }) blinking: boolean = false;

  /**
   * Optional accessible name. Set when the dot stands alone; leave undefined
   * when it's paired with adjacent text that already names the status.
   */
  @Prop() label?: string;

  render() {
    if (this.label) {
      return <Host role="status" aria-label={this.label} />;
    }
    return <Host aria-hidden="true" />;
  }
}
