import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { EquipmentState } from '../../atoms/_equipment/types';
import type { RunState } from '../../molecules/start-stop-control/start-stop-control';

/**
 * Motor control panel: live `<ind-motor-card>` faceplate plus start/stop,
 * speed setpoint and mode selection.
 */
@Component({
  tag: 'ind-motor-control-panel',
  styleUrls: ['../_shared/panel.css', '../_shared/control-panel.css', 'motor-control-panel.css'],
  shadow: true,
})
export class IndMotorControlPanel {
  @Prop() heading: string = 'Motor';
  @Prop() tag?: string;
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  @Prop() speed?: number;
  @Prop() current?: number;
  @Prop() load?: number;
  /** Speed setpoint (two-way), in percent. */
  @Prop({ mutable: true }) speedSetpoint: number = 0;
  @Prop() mode?: string;

  @Event() indStart!: EventEmitter<void>;
  @Event() indStop!: EventEmitter<void>;
  @Event() indSpeed!: EventEmitter<number>;
  @Event() indMode!: EventEmitter<string>;

  private runState(): RunState {
    if (this.state === 'running') return 'running';
    if (this.state === 'fault') return 'fault';
    return 'stopped';
  }

  private onSpeed = (e: CustomEvent<number>) => {
    e.stopPropagation();
    this.speedSetpoint = e.detail;
    this.indSpeed.emit(e.detail);
  };
  private onMode = (e: CustomEvent<string>) => {
    e.stopPropagation();
    this.indMode.emit(e.detail);
  };

  render() {
    return (
      <Host>
        <div class="panel-head">
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            {this.tag && <span class="panel-subtitle">{this.tag}</span>}
          </div>
        </div>
        <div class="panel-body">
          <ind-motor-card
            tag={this.tag}
            label={this.heading}
            state={this.state}
            speed={this.speed}
            current={this.current}
            load={this.load}
          />
          <ind-start-stop-control
            label={this.heading}
            state={this.runState()}
            onIndStart={() => this.indStart.emit()}
            onIndStop={() => this.indStop.emit()}
          />
          <ind-speed-control
            label="Speed setpoint"
            value={this.speedSetpoint}
            unit="%"
            onIndChange={this.onSpeed}
          />
          <ind-mode-selector value={this.mode} onIndChange={this.onMode} />
        </div>
      </Host>
    );
  }
}
