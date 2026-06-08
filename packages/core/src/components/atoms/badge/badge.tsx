import { Component, Prop, h, Host } from '@stencil/core';

export type BadgeVariant =
  | 'neutral'
  | 'running'
  | 'stopped'
  | 'fault'
  | 'warning'
  | 'maintenance'
  | 'success'
  | 'info'
  | 'error';
export type BadgeSize = 'sm' | 'md';

@Component({
  tag: 'ind-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class IndBadge {
  /** Semantic color. Maps to state / feedback tokens. */
  @Prop({ reflect: true }) variant: BadgeVariant = 'neutral';

  /** Size. */
  @Prop({ reflect: true }) size: BadgeSize = 'md';

  /** Outlined instead of filled. */
  @Prop({ reflect: true }) outline: boolean = false;

  render() {
    return (
      <Host>
        <span class="badge" part="badge">
          <slot />
        </span>
      </Host>
    );
  }
}
