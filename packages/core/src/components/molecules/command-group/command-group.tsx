import { Component, Prop, h, Host } from '@stencil/core';

export type CommandGroupOrientation = 'horizontal' | 'vertical';

/**
 * Groups related command buttons into a single segmented bar with a shared
 * border. Slot `<ind-button>`s into the default slot. Purely presentational —
 * each button keeps its own `indActivate` event.
 */
@Component({
  tag: 'ind-command-group',
  styleUrl: 'command-group.css',
  shadow: true,
})
export class IndCommandGroup {
  /** Accessible label for the toolbar group. */
  @Prop() label?: string;
  /** Layout direction. */
  @Prop({ reflect: true }) orientation: CommandGroupOrientation = 'horizontal';
  /** Render attached (shared borders, no gap) instead of spaced. */
  @Prop({ reflect: true }) attached: boolean = false;

  render() {
    return (
      <Host role="group" aria-label={this.label}>
        <slot />
      </Host>
    );
  }
}
