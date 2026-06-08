import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { ValveState } from '../../atoms/valve/valve';

/**
 * Valve control panel: `<ind-valve-card>` faceplate plus Open / Close / Stop
 * commands and an optional position setpoint for modulating valves.
 */
@Component({
  tag: 'ind-valve-control-panel',
  styleUrls: ['../_shared/panel.css', '../_shared/control-panel.css', 'valve-control-panel.css'],
  shadow: true,
})
export class IndValveControlPanel {
  @Prop() heading: string = 'Valve';
  @Prop() tag?: string;
  @Prop({ reflect: true }) state: ValveState = 'closed';
  /** Current position 0–100 %. Omit for on/off valves. */
  @Prop() position?: number;
  /** Allow position control (modulating valve). */
  @Prop() modulating: boolean = false;
  /** Position setpoint (two-way). */
  @Prop({ mutable: true }) positionSetpoint: number = 0;

  @Event() indOpen!: EventEmitter<void>;
  @Event() indClose!: EventEmitter<void>;
  @Event() indStop!: EventEmitter<void>;
  @Event() indPosition!: EventEmitter<number>;

  private onPosition = (e: CustomEvent<number>) => {
    e.stopPropagation();
    this.positionSetpoint = e.detail;
    this.indPosition.emit(e.detail);
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
          <ind-valve-card tag={this.tag} label={this.heading} state={this.state} position={this.position} />
          <ind-command-group label="Valve commands">
            <ind-button variant="primary" size="sm" label="Open" disabled={this.state === 'open'} onIndActivate={() => this.indOpen.emit()} />
            <ind-button variant="default" size="sm" label="Stop" onIndActivate={() => this.indStop.emit()} />
            <ind-button variant="danger" size="sm" label="Close" disabled={this.state === 'closed'} onIndActivate={() => this.indClose.emit()} />
          </ind-command-group>
          {this.modulating && (
            <ind-speed-control label="Position setpoint" value={this.positionSetpoint} unit="%" onIndChange={this.onPosition} />
          )}
        </div>
      </Host>
    );
  }
}
