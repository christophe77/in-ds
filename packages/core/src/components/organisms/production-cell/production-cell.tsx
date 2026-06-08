import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentCardState } from '../../molecules/equipment-status-card/equipment-status-card';

/**
 * Production cell container: groups the machines / equipment of a work cell
 * under a single header with an aggregate state. Slot the machine overviews or
 * equipment cards into the body.
 */
@Component({
  tag: 'ind-production-cell',
  styleUrls: ['../_shared/panel.css', 'production-cell.css'],
  shadow: true,
})
export class IndProductionCell {
  @Prop() heading!: string;
  /** Cell identifier. */
  @Prop() cellId?: string;
  /** Aggregate cell state. */
  @Prop({ reflect: true }) state: EquipmentCardState = 'unknown';
  /** Grid columns for the body. */
  @Prop() columns: number = 2;

  render() {
    const dot = this.state === 'unknown' ? 'neutral' : this.state;
    return (
      <Host>
        <div class="panel-head">
          <ind-status-dot state={dot as any} size="md" />
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            {this.cellId && <span class="panel-subtitle">{this.cellId}</span>}
          </div>
          <div class="panel-actions"><slot name="actions" /></div>
        </div>
        <div
          class="panel-grid"
          part="grid"
          style={{ gridTemplateColumns: `repeat(${this.columns}, minmax(0, 1fr))` }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
