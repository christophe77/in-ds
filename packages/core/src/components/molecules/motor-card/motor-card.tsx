import { Component, Prop, h, Host } from '@stencil/core';
import type { EquipmentState } from '../../atoms/_equipment/types';

/**
 * Motor faceplate: animated `<ind-motor>` symbol plus speed / current / load
 * readouts. Drop into an equipment overview grid.
 */
@Component({
  tag: 'ind-motor-card',
  styleUrls: ['../_shared/card.css', '../_shared/equipment-card.css', 'motor-card.css'],
  shadow: true,
})
export class IndMotorCard {
  /** Equipment tag (e.g. "M-204"). */
  @Prop() tag?: string;
  /** Human label (e.g. "Agitator motor"). */
  @Prop() label?: string;
  /** Process state — `running` animates the symbol, drives fault chrome. */
  @Prop({ reflect: true }) state: EquipmentState = 'stopped';
  /** Speed in rpm. */
  @Prop() speed?: number;
  /** Motor current in amps. */
  @Prop() current?: number;
  /** Load in percent. */
  @Prop() load?: number;

  render() {
    const name = this.label ?? this.tag ?? 'Motor';
    return (
      <Host role="group" aria-label={`${name} — ${this.state}`}>
        <div class="card-head">
          <span class="card-title" part="label">{name}</span>
          {this.tag && <span class="card-tag" part="tag">{this.tag}</span>}
        </div>
        <div class="body" part="body">
          <ind-motor class="symbol" state={this.state} size="md" />
          <div class="metrics" part="metrics">
            {this.speed !== undefined && (
              <ind-value value={this.speed} unit="rpm" precision={0} label="Speed" size="md" />
            )}
            {this.current !== undefined && (
              <ind-value value={this.current} unit="A" precision={1} label="Current" size="sm" />
            )}
            {this.load !== undefined && (
              <ind-value value={this.load} unit="%" precision={0} label="Load" size="sm" />
            )}
          </div>
        </div>
      </Host>
    );
  }
}
