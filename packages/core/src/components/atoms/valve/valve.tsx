import { Component, Prop, h, Host } from '@stencil/core';

export type ValveState = 'open' | 'closed' | 'transit' | 'fault';
export type ValveOrientation = 'horizontal' | 'vertical';
export type ValveSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-valve',
  styleUrl: 'valve.css',
  shadow: true,
})
export class IndValve {
  /** Valve state. `transit` is mid-stroke (transitioning between open and closed). */
  @Prop({ reflect: true }) state: ValveState = 'closed';

  /** Render the symbol along the flow direction. */
  @Prop({ reflect: true }) orientation: ValveOrientation = 'horizontal';

  /** Visual size. */
  @Prop({ reflect: true }) size: ValveSize = 'md';

  /** Human label rendered as caption (e.g. "Discharge valve"). */
  @Prop() label?: string;

  /** Equipment tag rendered as caption (e.g. "V-12"). */
  @Prop() tag?: string;

  render() {
    const name = this.label ?? this.tag ?? 'valve';
    return (
      <Host
        role="img"
        aria-label={`${name} — ${this.state}`}
      >
        {/* ISA-5.1 bowtie symbol. ViewBox is 32×16 so the natural ratio is 2:1. */}
        <svg class="symbol" part="symbol" viewBox="0 0 32 16" aria-hidden="true">
          <polygon class="left"  part="left"  points="2,2 2,14 16,8" />
          <polygon class="right" part="right" points="30,2 30,14 16,8" />
          <line    class="stem"  part="stem"  x1="16" y1="2" x2="16" y2="14" />
        </svg>
        {(this.tag || this.label) && (
          <div class="caption" part="caption">
            {this.tag && <span class="tag" part="tag">{this.tag}</span>}
            {this.label && <span class="label" part="label">{this.label}</span>}
          </div>
        )}
      </Host>
    );
  }
}
