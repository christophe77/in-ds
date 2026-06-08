import { Component, Prop, h, Host } from '@stencil/core';

export type ProcessSymbolShape = 'circle' | 'square' | 'diamond' | 'hexagon';
export type ProcessSymbolState = 'normal' | 'running' | 'fault' | 'warning' | 'maintenance';
export type ProcessSymbolSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-process-symbol',
  styleUrl: 'process-symbol.css',
  shadow: true,
})
export class IndProcessSymbol {
  /** ISA-5.1 instrument balloon shape. */
  @Prop({ reflect: true }) shape: ProcessSymbolShape = 'circle';
  /** Status coloring. */
  @Prop({ reflect: true }) state: ProcessSymbolState = 'normal';
  /** Tag text rendered inside (e.g. "PT 101"). */
  @Prop() tag?: string;
  /** Caption rendered below the symbol. */
  @Prop() label?: string;
  /** Size. */
  @Prop({ reflect: true }) size: ProcessSymbolSize = 'md';

  private shapeEl() {
    switch (this.shape) {
      case 'square':
        return <rect class="outline" part="outline" x="4" y="4" width="40" height="40" rx="2" />;
      case 'diamond':
        return <polygon class="outline" part="outline" points="24,3 45,24 24,45 3,24" />;
      case 'hexagon':
        return <polygon class="outline" part="outline" points="14,6 34,6 45,24 34,42 14,42 3,24" />;
      case 'circle':
      default:
        return <circle class="outline" part="outline" cx="24" cy="24" r="20" />;
    }
  }

  render() {
    const name = this.label ?? this.tag ?? 'instrument';
    return (
      <Host role="img" aria-label={`${name}${this.state !== 'normal' ? ' — ' + this.state : ''}`}>
        <svg class="symbol" part="symbol" viewBox="0 0 48 48" aria-hidden="true">
          {this.shapeEl()}
          {this.tag && (
            <text class="tag" x="24" y="24" text-anchor="middle" dominant-baseline="central">{this.tag}</text>
          )}
        </svg>
        {this.label && <span class="label" part="label">{this.label}</span>}
      </Host>
    );
  }
}
