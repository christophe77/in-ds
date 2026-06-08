import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type BatchState = 'idle' | 'running' | 'held' | 'complete' | 'fault';

export interface BatchParam {
  label: string;
  value: string | number;
  unit?: string;
  target?: string;
}

const STATE_LABEL: Record<BatchState, string> = {
  idle: 'Idle',
  running: 'Running',
  held: 'Held',
  complete: 'Complete',
  fault: 'Fault',
};

/**
 * Batch / phase control panel: current phase + progress, Start / Hold / Stop
 * commands and the active parameter set.
 */
@Component({
  tag: 'ind-batch-control-panel',
  styleUrls: ['../_shared/panel.css', 'batch-control-panel.css'],
  shadow: true,
})
export class IndBatchControlPanel {
  @Prop() heading: string = 'Batch control';
  /** Batch / lot identifier. */
  @Prop() batchId?: string;
  /** Current phase / step name. */
  @Prop() phase?: string;
  /** Batch state — drives the badge. */
  @Prop({ reflect: true }) state: BatchState = 'idle';
  /** Phase progress 0–100 %. */
  @Prop() progress: number = 0;
  /** Active parameters. */
  @Prop() parameters: BatchParam[] = [];

  @Event() indStart!: EventEmitter<void>;
  @Event() indHold!: EventEmitter<void>;
  @Event() indStop!: EventEmitter<void>;

  render() {
    const running = this.state === 'running';
    const progressVariant = this.state === 'fault' ? 'error' : this.state === 'held' ? 'warning' : 'default';
    return (
      <Host>
        <div class="panel-head">
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            {this.batchId && <span class="panel-subtitle">Batch {this.batchId}</span>}
          </div>
          <span class={`state state-${this.state}`} part="state">{STATE_LABEL[this.state]}</span>
        </div>
        <div class="panel-body">
          {this.phase && (
            <div class="phase" part="phase">
              <span class="phase-label">Phase</span>
              <span class="phase-name">{this.phase}</span>
            </div>
          )}
          <ind-progress value={this.progress} max={100} variant={progressVariant} size="md" show-value></ind-progress>
          <ind-command-group label="Batch commands">
            <ind-button variant="primary" size="sm" label="Start" disabled={running} onIndActivate={() => this.indStart.emit()} />
            <ind-button variant="default" size="sm" label="Hold" disabled={!running} onIndActivate={() => this.indHold.emit()} />
            <ind-button variant="danger" size="sm" label="Stop" disabled={this.state === 'idle'} onIndActivate={() => this.indStop.emit()} />
          </ind-command-group>
          {this.parameters.length > 0 && (
            <div class="params" part="params">
              {this.parameters.map((p, i) => (
                <ind-batch-parameter-row
                  key={i}
                  label={p.label}
                  value={p.value}
                  unit={p.unit}
                  target={p.target}
                  disabled
                />
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
