import { Component, Prop, h, Host } from '@stencil/core';
import type { ConnectionState } from '../../atoms/connection-indicator/connection-indicator';
import type { DataQuality } from '../historical-value-row/historical-value-row';

const QUALITY_LABEL: Record<DataQuality, string> = {
  good: 'Good',
  uncertain: 'Uncertain',
  bad: 'Bad',
};

/**
 * Visualises the binding to an OPC UA node: node id, last value, data quality
 * and the session connection state.
 */
@Component({
  tag: 'ind-opcua-tag-binding',
  styleUrls: ['../_shared/card.css', '../_shared/binding.css', 'opcua-tag-binding.css'],
  shadow: true,
})
export class IndOpcuaTagBinding {
  /** Friendly label. */
  @Prop() label?: string;
  /** OPC UA node id (e.g. "ns=2;s=Channel1.Device1.Tag1"). */
  @Prop() nodeId!: string;
  /** Last value. */
  @Prop() value?: number | string;
  /** Engineering unit. */
  @Prop() unit?: string;
  /** OPC UA data quality. */
  @Prop({ reflect: true }) quality: DataQuality = 'good';
  /** Session connection state. */
  @Prop({ reflect: true }) state: ConnectionState = 'disconnected';

  render() {
    const v = this.value !== undefined ? String(this.value) : '—';
    return (
      <Host role="group" aria-label={`OPC UA ${this.nodeId}`}>
        <div class="card-head">
          <span class="card-title" part="label">{this.label ?? 'OPC UA'}</span>
          <ind-connection-indicator state={this.state} size="sm" />
        </div>
        <code class="address" part="node-id">{this.nodeId}</code>
        <div class="readout" part="readout">
          <span class="value" part="value">{v}{this.unit ? ` ${this.unit}` : ''}</span>
          <span class={`flag quality quality-${this.quality}`} part="quality">{QUALITY_LABEL[this.quality]}</span>
        </div>
      </Host>
    );
  }
}
