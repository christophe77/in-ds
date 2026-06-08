import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { RunState } from '../../molecules/start-stop-control/start-stop-control';

/**
 * Generic single-loop control panel: run command, setpoint vs PV and an
 * operating-mode selector. Re-emits the child commands so a parent can drive
 * the controller.
 */
@Component({
  tag: 'ind-process-control-panel',
  styleUrls: ['../_shared/panel.css', 'process-control-panel.css'],
  shadow: true,
})
export class IndProcessControlPanel {
  @Prop() heading!: string;
  /** Loop tag (e.g. "PIC-101"). */
  @Prop() tag?: string;
  /** Run state. */
  @Prop({ reflect: true }) state: RunState = 'stopped';
  /** Operating mode value. */
  @Prop() mode?: string;
  /** Setpoint (two-way). */
  @Prop({ mutable: true }) setpoint: number = 0;
  /** Process value. */
  @Prop() pv?: number;
  @Prop() min: number = 0;
  @Prop() max: number = 100;
  @Prop() step: number = 0.1;
  @Prop() precision: number = 1;
  @Prop() unit?: string;

  @Event() indStart!: EventEmitter<void>;
  @Event() indStop!: EventEmitter<void>;
  /** Fires with the committed setpoint. */
  @Event() indSetpoint!: EventEmitter<number>;
  /** Fires with the selected mode. */
  @Event() indMode!: EventEmitter<string>;

  private onSetpoint = (e: CustomEvent<number>) => {
    e.stopPropagation();
    this.setpoint = e.detail;
    this.indSetpoint.emit(e.detail);
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
          <ind-start-stop-control
            label={this.heading}
            state={this.state}
            onIndStart={() => this.indStart.emit()}
            onIndStop={() => this.indStop.emit()}
          />
          <ind-setpoint-control
            label="Setpoint"
            tag={this.tag}
            value={this.setpoint}
            pv={this.pv}
            min={this.min}
            max={this.max}
            step={this.step}
            precision={this.precision}
            unit={this.unit}
            onIndChange={this.onSetpoint}
          />
          <ind-mode-selector value={this.mode} onIndChange={this.onMode} />
          <slot />
        </div>
      </Host>
    );
  }
}
