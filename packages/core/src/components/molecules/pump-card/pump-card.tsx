import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState } from '../../atoms/_equipment/types';

/**
 * Pump faceplate: animated `<ind-pump>` symbol plus flow / pressure readouts.
 */
@Component({
  tag: 'ind-pump-card',
  styleUrls: ['../_shared/card.css', '../_shared/equipment-card.css', 'pump-card.css'],
  shadow: true,
})
export class IndPumpCard {
  /** Equipment tag (e.g. "P-101"). */
  @Prop() tag?: string;
  /** Human label (e.g. "Feed pump"). */
  @Prop() label?: string;
  /** Process state — `running` animates the impeller, drives fault chrome. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Flow rate. */
  @Prop() flow?: number;
  /** Flow unit (default m³/h). */
  @Prop() flowUnit: string = 'm³/h';
  /** Discharge pressure. */
  @Prop() pressure?: number;
  /** Pressure unit (default bar). */
  @Prop() pressureUnit: string = 'bar';

  render() {
    const name = this.label ?? this.tag ?? 'Pump';
    return (
      <Host role="group" aria-label={`${name} — ${this.state}`}>
        <div class="card-head">
          <span class="card-title" part="label">{name}</span>
          {this.tag && <span class="card-tag" part="tag">{this.tag}</span>}
        </div>
        <div class="body" part="body">
          <ind-pump class="symbol" state={this.state} size="md" />
          <div class="metrics" part="metrics">
            {this.flow !== undefined && (
              <ind-value value={this.flow} unit={this.flowUnit} precision={1} label="Flow" size="md" />
            )}
            {this.pressure !== undefined && (
              <ind-value value={this.pressure} unit={this.pressureUnit} precision={2} label="Pressure" size="sm" />
            )}
          </div>
        </div>
      </Host>
    );
  }
}
