import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type RunState = 'running' | 'stopped' | 'fault' | 'starting' | 'stopping';

/**
 * Start / stop command pair with a running LED. Emits discrete `indStart` /
 * `indStop` events; the parent owns the command logic and reflects state back.
 */
@Component({
  tag: 'ind-start-stop-control',
  styleUrls: ['../_shared/card.css', 'start-stop-control.css'],
  shadow: true,
})
export class IndStartStopControl {
  /** Equipment label. */
  @Prop() label?: string;
  /** Current run state — drives the LED and disables the redundant button. */
  @Prop({ reflect: true }) state: RunState = 'stopped';
  /** Disable both commands. */
  @Prop() disabled: boolean = false;
  /** Require a press-and-hold (ms) on Start to avoid accidental starts. */
  @Prop() holdToStartMs?: number;
  @Prop() startLabel: string = 'Start';
  @Prop() stopLabel: string = 'Stop';

  /** Fires when Start is activated. */
  @Event() indStart!: EventEmitter<void>;
  /** Fires when Stop is activated. */
  @Event() indStop!: EventEmitter<void>;

  private isRunning() {
    return this.state === 'running' || this.state === 'starting';
  }

  render() {
    const ledState =
      this.state === 'fault'
        ? 'fault'
        : this.state === 'running'
          ? 'running'
          : this.state === 'starting' || this.state === 'stopping'
            ? 'warning'
            : 'stopped';
    return (
      <Host role="group" aria-label={this.label ?? 'Start stop control'}>
        <div class="head" part="head">
          <ind-led state={ledState} size="md" blinking={this.state === 'starting' || this.state === 'stopping'} />
          {this.label && <span class="label" part="label">{this.label}</span>}
        </div>
        <div class="buttons" part="buttons">
          <ind-button
            variant="primary"
            size="md"
            label={this.startLabel}
            disabled={this.disabled || this.isRunning()}
            holdToConfirmMs={this.holdToStartMs}
            onIndActivate={() => this.indStart.emit()}
          />
          <ind-button
            variant="danger"
            size="md"
            label={this.stopLabel}
            disabled={this.disabled || this.state === 'stopped'}
            onIndActivate={() => this.indStop.emit()}
          />
        </div>
      </Host>
    );
  }
}
