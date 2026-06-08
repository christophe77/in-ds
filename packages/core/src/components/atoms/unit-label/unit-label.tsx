import { Component, Prop, h, Host } from '@stencil/core';

export type UnitLabelSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-unit-label',
  styleUrl: 'unit-label.css',
  shadow: true,
})
export class IndUnitLabel {
  /** Engineering unit text, e.g. "bar", "°C", "m³/h". Falls back to the slot. */
  @Prop() unit?: string;
  /** Size. */
  @Prop({ reflect: true }) size: UnitLabelSize = 'md';

  render() {
    return (
      <Host>
        <span class="unit" part="unit">
          {this.unit ?? <slot />}
        </span>
      </Host>
    );
  }
}
