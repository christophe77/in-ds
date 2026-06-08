import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { EquipmentState } from '../../atoms/_equipment/types';
import type { RunState } from '../../molecules/start-stop-control/start-stop-control';

/**
 * Pump control panel: `<ind-pump-card>` faceplate plus start/stop and mode.
 */
@Component({
  tag: 'ind-pump-control-panel',
  styleUrls: ['../_shared/panel.css', '../_shared/control-panel.css', 'pump-control-panel.css'],
  shadow: true,
})
export class IndPumpControlPanel {
  @Prop() heading: string = 'Pump';
  @Prop() tag?: string;
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  @Prop() flow?: number;
  @Prop() pressure?: number;
  @Prop() mode?: string;

  @Event() indStart!: EventEmitter<void>;
  @Event() indStop!: EventEmitter<void>;
  @Event() indMode!: EventEmitter<string>;

  private runState(): RunState {
    if (this.state === 'running') return 'running';
    if (this.state === 'fault') return 'fault';
    return 'stopped';
  }

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
          <ind-pump-card
            tag={this.tag}
            label={this.heading}
            state={this.state}
            flow={this.flow}
            pressure={this.pressure}
          />
          <ind-start-stop-control
            label={this.heading}
            state={this.runState()}
            onIndStart={() => this.indStart.emit()}
            onIndStop={() => this.indStop.emit()}
          />
          <ind-mode-selector value={this.mode} onIndChange={this.onMode} />
        </div>
      </Host>
    );
  }
}
