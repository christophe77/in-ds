import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentCardState } from '../../molecules/equipment-status-card/equipment-status-card';

export interface AssetItem {
  tag: string;
  name: string;
  state: EquipmentCardState;
  /** Health score 0–100. */
  health?: number;
  detail?: string;
}

/**
 * Tabular overview of plant assets with state dot, health bar and detail.
 * Suits an asset register or a fleet health page.
 */
@Component({
  tag: 'ind-asset-overview',
  styleUrls: ['../_shared/panel.css', 'asset-overview.css'],
  shadow: true,
})
export class IndAssetOverview {
  @Prop() heading: string = 'Assets';
  @Prop() assets: AssetItem[] = [];

  private healthVariant(h?: number): 'default' | 'success' | 'warning' | 'error' {
    if (h === undefined) return 'default';
    if (h < 40) return 'error';
    if (h < 70) return 'warning';
    return 'success';
  }

  render() {
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
          <span class="panel-subtitle">{this.assets.length} assets</span>
        </div>
        <div class="panel-list" part="list">
          {this.assets.length === 0 ? (
            <div class="panel-empty">No assets</div>
          ) : (
            this.assets.map((a) => (
              <div class="row" part="row" key={a.tag}>
                <ind-status-dot state={(a.state === 'unknown' ? 'neutral' : a.state) as any} size="sm" />
                <span class="tag" part="tag">{a.tag}</span>
                <span class="name" part="name">{a.name}</span>
                {a.health !== undefined && (
                  <ind-progress class="health" value={a.health} max={100} variant={this.healthVariant(a.health)} size="sm"></ind-progress>
                )}
                {a.detail && <span class="detail" part="detail">{a.detail}</span>}
              </div>
            ))
          )}
        </div>
      </Host>
    );
  }
}
