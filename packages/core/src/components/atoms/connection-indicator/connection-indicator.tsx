import { Component, Prop, h, Host } from '@stencil/core';

export type ConnectionState = 'connected' | 'connecting' | 'disconnected' | 'error';
export type ConnectionSize = 'sm' | 'md' | 'lg';

const DEFAULT_LABELS: Record<ConnectionState, string> = {
  connected: 'Connected',
  connecting: 'Connecting…',
  disconnected: 'Disconnected',
  error: 'Connection error',
};

@Component({
  tag: 'ind-connection-indicator',
  styleUrl: 'connection-indicator.css',
  shadow: true,
})
export class IndConnectionIndicator {
  /** Connection state. */
  @Prop({ reflect: true }) state: ConnectionState = 'disconnected';

  /** Size. */
  @Prop({ reflect: true }) size: ConnectionSize = 'md';

  /** Override the default text label. Pass an empty string to hide it. */
  @Prop() label?: string;

  render() {
    const text = this.label ?? DEFAULT_LABELS[this.state];
    return (
      <Host
        role="status"
        aria-live={this.state === 'error' ? 'assertive' : 'polite'}
        aria-label={text || DEFAULT_LABELS[this.state]}
      >
        <span class="dot" part="dot" aria-hidden="true" />
        {text && <span class="label" part="label">{text}</span>}
      </Host>
    );
  }
}
