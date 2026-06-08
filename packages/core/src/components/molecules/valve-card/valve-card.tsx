import { Component, Prop, h, Host } from '@stencil/core';
import type { ValveState } from '../../atoms/valve/valve';

const STATE_LABEL: Record<ValveState, string> = {
  open: 'Open',
  closed: 'Closed',
  transit: 'In transit',
  fault: 'Fault',
};

/**
 * Valve faceplate: ISA `<ind-valve>` symbol plus open/closed state and an
 * optional position (%) for modulating valves.
 */
@Component({
  tag: 'ind-valve-card',
  styleUrls: ['../_shared/card.css', '../_shared/equipment-card.css', 'valve-card.css'],
  shadow: true,
})
export class IndValveCard {
  /** Equipment tag (e.g. "FV-12"). */
  @Prop() tag?: string;
  /** Human label (e.g. "Discharge valve"). */
  @Prop() label?: string;
  /** Valve state — drives the symbol and fault chrome. */
  @Prop({ reflect: true }) state: ValveState = 'closed';
  /** Modulating position 0–100 %. Omit for on/off valves. */
  @Prop() position?: number;

  render() {
    const name = this.label ?? this.tag ?? 'Valve';
    const stateLabel = STATE_LABEL[this.state];
    return (
      <Host role="group" aria-label={`${name} — ${stateLabel}`}>
        <div class="card-head">
          <span class="card-title" part="label">{name}</span>
          {this.tag && <span class="card-tag" part="tag">{this.tag}</span>}
        </div>
        <div class="body" part="body">
          <ind-valve class="symbol" state={this.state} size="md" />
          <div class="metrics" part="metrics">
            <span class={`state-label state-${this.state}`} part="state-label">{stateLabel}</span>
            {this.position !== undefined && (
              <ind-value value={this.position} unit="%" precision={0} label="Position" size="sm" />
            )}
          </div>
        </div>
      </Host>
    );
  }
}
