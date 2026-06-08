import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type FirmwareState =
  | 'idle'
  | 'checking'
  | 'available'
  | 'downloading'
  | 'installing'
  | 'up-to-date'
  | 'error';

const STATE_LABEL: Record<FirmwareState, string> = {
  idle: 'Idle',
  checking: 'Checking…',
  available: 'Update available',
  downloading: 'Downloading…',
  installing: 'Installing…',
  'up-to-date': 'Up to date',
  error: 'Update failed',
};

/**
 * Firmware update panel: current vs target version, update progress and the
 * Check / Install commands. Emits `indCheck` and `indInstall`.
 */
@Component({
  tag: 'ind-firmware-update-panel',
  styleUrls: ['../_shared/panel.css', 'firmware-update-panel.css'],
  shadow: true,
})
export class IndFirmwareUpdatePanel {
  @Prop() heading: string = 'Firmware';
  /** Device name. */
  @Prop() device?: string;
  /** Installed version. */
  @Prop() currentVersion!: string;
  /** Available / target version. */
  @Prop() targetVersion?: string;
  /** Update state. */
  @Prop({ reflect: true }) state: FirmwareState = 'idle';
  /** Progress 0–100 % while downloading / installing. */
  @Prop() progress: number = 0;

  @Event() indCheck!: EventEmitter<void>;
  @Event() indInstall!: EventEmitter<void>;

  render() {
    const busy = this.state === 'downloading' || this.state === 'installing' || this.state === 'checking';
    const canInstall = this.state === 'available';
    const progressVariant = this.state === 'error' ? 'error' : 'default';
    return (
      <Host>
        <div class="panel-head">
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            {this.device && <span class="panel-subtitle">{this.device}</span>}
          </div>
          <span class={`state state-${this.state}`} part="state">{STATE_LABEL[this.state]}</span>
        </div>
        <div class="panel-body">
          <div class="versions" part="versions">
            <div class="ver">
              <span class="ver-label">Installed</span>
              <span class="ver-value">{this.currentVersion}</span>
            </div>
            <span class="arrow" aria-hidden="true">→</span>
            <div class="ver">
              <span class="ver-label">Target</span>
              <span class="ver-value">{this.targetVersion ?? '—'}</span>
            </div>
          </div>
          {busy && (
            <ind-progress value={this.progress} max={100} variant={progressVariant} size="md" show-value indeterminate={this.state === 'checking'}></ind-progress>
          )}
          <ind-command-group label="Firmware commands">
            <ind-button variant="default" size="sm" label="Check" disabled={busy} onIndActivate={() => this.indCheck.emit()} />
            <ind-button variant="primary" size="sm" label="Install" disabled={!canInstall} onIndActivate={() => this.indInstall.emit()} />
          </ind-command-group>
        </div>
      </Host>
    );
  }
}
