import { Component, Prop, h, Host } from '@stencil/core';
import type { ConnectionState } from '../../atoms/connection-indicator/connection-indicator';

export interface DiagnosticMetric {
  label: string;
  value: string | number;
  unit?: string;
  status?: 'ok' | 'warn' | 'fault';
}

/**
 * Device diagnostics panel: nameplate / connection via `<ind-device-info-card>`
 * plus a list of live diagnostic metrics (CPU, memory, temperature, errors).
 */
@Component({
  tag: 'ind-device-diagnostics-panel',
  styleUrls: ['../_shared/panel.css', '../_shared/control-panel.css', 'device-diagnostics-panel.css'],
  shadow: true,
})
export class IndDeviceDiagnosticsPanel {
  @Prop() heading: string = 'Diagnostics';
  @Prop() name!: string;
  @Prop() vendor?: string;
  @Prop() model?: string;
  @Prop() firmware?: string;
  @Prop() serial?: string;
  @Prop() address?: string;
  @Prop({ reflect: true }) state: ConnectionState = 'disconnected';
  /** Diagnostic metrics. */
  @Prop() metrics: DiagnosticMetric[] = [];

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
        </div>
        <div class="panel-body">
          <ind-device-info-card
            name={this.name}
            vendor={this.vendor}
            model={this.model}
            firmware={this.firmware}
            serial={this.serial}
            address={this.address}
            state={this.state}
          ></ind-device-info-card>
          {this.metrics.length > 0 && (
            <div class="metrics" part="metrics">
              {this.metrics.map((m, i) => (
                <div class={`metric metric-${m.status ?? 'ok'}`} part="metric" key={i}>
                  <span class="metric-label">{m.label}</span>
                  <span class="metric-value">
                    {m.value}{m.unit ? ` ${m.unit}` : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
