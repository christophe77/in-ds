import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type AppHeaderConnectionState =
  | 'running' | 'fault' | 'warning' | 'maintenance' | 'stopped' | 'neutral';

@Component({
  tag: 'ind-app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class IndAppHeader {
  /** Brand name (uppercase by convention). */
  @Prop() brand!: string;
  /** Sub-brand line (e.g. "Maintenance Console"). */
  @Prop() subBrand?: string;
  /** Machine identifier shown next to the brand. */
  @Prop() machineId?: string;
  /** Broker / realtime connection state — drives the dot. */
  @Prop() mqttState: AppHeaderConnectionState = 'neutral';
  /** Label rendered next to the dot (e.g. "Connected"). */
  @Prop() mqttLabel?: string;
  /** App version (e.g. "v1.4.2"). */
  @Prop() version?: string;
  /** Documentation URL. */
  @Prop() docsUrl?: string;
  /** Hide the built-in "Change machine" button. */
  @Prop() hideChangeMachine: boolean = false;
  /** Hide the built-in "Disconnect" button. */
  @Prop() hideDisconnect: boolean = false;

  @Event() indChangeMachine!: EventEmitter<void>;
  @Event() indDisconnect!: EventEmitter<void>;

  render() {
    return (
      <Host role="banner">
        <div class="brand" part="brand">
          <slot name="logo">
            <span class="brand-logo" aria-hidden="true">⬢</span>
          </slot>
          <div class="brand-text">
            <span class="brand-name">{this.brand}</span>
            {this.subBrand && <span class="brand-sub">{this.subBrand}</span>}
          </div>
        </div>

        {this.machineId && (
          <div class="machine" part="machine">
            <span class="machine-label">Machine</span>
            <span class="machine-id">{this.machineId}</span>
          </div>
        )}

        <div class="mqtt" part="mqtt">
          <ind-status-dot state={this.mqttState} size="md" />
          {this.mqttLabel && <span class="mqtt-label">{this.mqttLabel}</span>}
        </div>

        <span class="spacer" />

        <div class="meta" part="meta">
          {this.version && <span class="version">{this.version}</span>}
          {this.docsUrl && (
            <a class="docs" href={this.docsUrl} target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          )}
        </div>

        <div class="actions" part="actions">
          <slot name="actions">
            {!this.hideChangeMachine && (
              <button
                type="button"
                class="action"
                onClick={() => this.indChangeMachine.emit()}
              >Change machine</button>
            )}
            {!this.hideDisconnect && (
              <button
                type="button"
                class="action action--danger"
                onClick={() => this.indDisconnect.emit()}
              >Disconnect</button>
            )}
          </slot>
        </div>
      </Host>
    );
  }
}
