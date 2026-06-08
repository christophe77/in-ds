import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentCardState } from '../../molecules/equipment-status-card/equipment-status-card';

export interface LineStation {
  name: string;
  tag?: string;
  state: EquipmentCardState;
  /** Optional throughput / rate readout. */
  rate?: number;
  unit?: string;
}

/**
 * Left-to-right production line overview: a sequence of station status tiles
 * connected by flow arrows. Each tile shows state, tag and an optional rate.
 */
@Component({
  tag: 'ind-production-line-overview',
  styleUrls: ['../_shared/panel.css', 'production-line-overview.css'],
  shadow: true,
})
export class IndProductionLineOverview {
  @Prop() heading: string = 'Production line';
  @Prop() stations: LineStation[] = [];

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
        </div>
        <div class="line" part="line">
          {this.stations.map((s, i) => [
            <div class={`station station-${s.state}`} part="station" key={`s${i}`}>
              <div class="station-head">
                <ind-status-dot state={(s.state === 'unknown' ? 'neutral' : s.state) as any} size="sm" />
                {s.tag && <span class="station-tag">{s.tag}</span>}
              </div>
              <span class="station-name">{s.name}</span>
              {s.rate !== undefined && (
                <span class="station-rate">{s.rate}{s.unit ? ` ${s.unit}` : ''}</span>
              )}
            </div>,
            i < this.stations.length - 1 ? (
              <span class="arrow" part="arrow" aria-hidden="true" key={`a${i}`}>→</span>
            ) : null,
          ])}
        </div>
      </Host>
    );
  }
}
