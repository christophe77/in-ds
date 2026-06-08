import { Component, Prop, h, Host } from '@stencil/core';

export type IconName =
  | 'alarm'
  | 'bell'
  | 'gear'
  | 'home'
  | 'chevron-right'
  | 'chevron-down'
  | 'check'
  | 'close'
  | 'warning'
  | 'info'
  | 'power'
  | 'refresh'
  | 'play'
  | 'pause'
  | 'stop'
  | 'wrench';

export type IconSize = 'sm' | 'md' | 'lg';

const PATHS: Record<IconName, string> = {
  alarm: 'M12 3a6 6 0 0 0-6 6v3l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 19a2 2 0 0 0 4 0',
  bell: 'M12 3a6 6 0 0 0-6 6v3l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 19a2 2 0 0 0 4 0',
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 12l-1.5-1 1-3 1.8.3a6.9 6.9 0 0 1 1.5-1.5L6.5 4l3-1L11 4.5a7 7 0 0 1 2 0L14.5 3l3 1-.3 1.8a7 7 0 0 1 1.5 1.5l1.8-.3 1 3-1.5 1a7 7 0 0 1 0 2l1.5 1-1 3-1.8-.3a7 7 0 0 1-1.5 1.5l.3 1.8-3 1-1.5-1.5a7 7 0 0 1-2 0L9.5 21l-3-1 .3-1.8A6.9 6.9 0 0 1 5.3 16.7L3.5 17l-1-3 1.5-1a7 7 0 0 1 0-2z',
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  'chevron-right': 'M9 5l7 7-7 7',
  'chevron-down': 'M5 9l7 7 7-7',
  check: 'M4 12l5 5 11-11',
  close: 'M5 5l14 14M19 5L5 19',
  warning: 'M12 3l10 18H2L12 3zM12 9v5M12 17.5v.5',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7.5v.5',
  power: 'M12 3v9M7 6a8 8 0 1 0 10 0',
  refresh: 'M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M18 3v4h-4M6 21v-4h4',
  play: 'M7 4l13 8-13 8z',
  pause: 'M8 4v16M16 4v16',
  stop: 'M5 5h14v14H5z',
  wrench: 'M21 5a4 4 0 0 1-5 5L7 19l-3-3 9-9a4 4 0 0 1 5-5l-3 3 1 1 3-3z',
};

@Component({
  tag: 'ind-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class IndIcon {
  /** Built-in icon name. Omit and use the default slot to pass a custom SVG. */
  @Prop({ reflect: true }) name?: IconName;
  /** Size. */
  @Prop({ reflect: true }) size: IconSize = 'md';
  /** Accessible label. When omitted the icon is decorative (aria-hidden). */
  @Prop() label?: string;

  render() {
    const decorative = !this.label;
    const d = this.name ? PATHS[this.name] : undefined;
    return (
      <Host role={decorative ? 'presentation' : 'img'} aria-label={this.label} aria-hidden={decorative ? 'true' : undefined}>
        {d ? (
          <svg class="icon" part="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d={d} />
          </svg>
        ) : (
          <slot />
        )}
      </Host>
    );
  }
}
