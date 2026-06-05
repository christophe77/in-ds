import { Component, Prop, h, Host } from '@stencil/core';

export type DividerOrientation = 'horizontal' | 'vertical';

@Component({
  tag: 'ind-divider',
  styleUrl: 'divider.css',
  shadow: true,
})
export class IndDivider {
  @Prop({ reflect: true }) orientation: DividerOrientation = 'horizontal';

  render() {
    return <Host role="separator" aria-orientation={this.orientation} />;
  }
}
