import type { Preview } from '@storybook/web-components';
import { html } from 'lit-html';

// Tokens — base + theme overrides. The decorator below flips data-theme at runtime.
import '@ind-ds/tokens/css';
import '@ind-ds/tokens/css/light';
import '@ind-ds/tokens/css/high-contrast';

// Layout utility classes (.ind-stack, .ind-group, .ind-section-header, etc.).
import '@ind-ds/core/css/utilities';

// Register all custom elements once. Use the eager custom-elements bundle
// (not the lazy `loader`): it inlines every component so there is no runtime
// chunk fetching, which would 404 in a static Storybook served from a
// sub-path like GitHub Pages' /ind-ds/.
import '@ind-ds/core/dist/components';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'panel',
      values: [
        { name: 'background', value: 'var(--ind-surface-background)' },
        { name: 'panel',      value: 'var(--ind-surface-panel)' },
        { name: 'raised',     value: 'var(--ind-surface-raised)' },
      ],
    },
    viewport: {
      viewports: {
        hmiOperatorStation: {
          name: 'HMI operator station (1920×1080)',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
        industrialPanel15: {
          name: 'Industrial 15" panel (1024×768)',
          styles: { width: '1024px', height: '768px' },
          type: 'tablet',
        },
        industrialPanel10: {
          name: 'Industrial 10" panel (1280×800)',
          styles: { width: '1280px', height: '800px' },
          type: 'tablet',
        },
        handheld: {
          name: 'Handheld HMI (480×800)',
          styles: { width: '480px', height: '800px' },
          type: 'mobile',
        },
      },
      defaultViewport: 'hmiOperatorStation',
    },
    a11y: { test: 'todo' },
  },
  globalTypes: {
    theme: {
      description: 'Runtime theme — switches via [data-theme] on <html>.',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'dark',          title: 'Dark (default HMI)' },
          { value: 'light',         title: 'Light' },
          { value: 'high-contrast', title: 'High contrast (WCAG AAA)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = (context.globals.theme as string) || 'dark';
      // Set on <html> so global tokens.css and theme overrides apply.
      document.documentElement.dataset.theme = theme;
      // Wrap each story in a theme-scoped surface. This is critical for the
      // autodocs pages: Storybook 9 forces a white container around every
      // doc-rendered story, which on dark themes makes any text using
      // --ind-surface-text-* unreadable. The wrapper opens a fresh
      // [data-theme=...] scope with the matching background and text color,
      // so contrast is correct regardless of where the story is rendered.
      return html`
        <div
          data-theme=${theme}
          style="
            background: var(--ind-surface-background);
            color: var(--ind-surface-text-primary);
            padding: 16px;
            border-radius: 4px;
            min-height: 80px;
          "
        >${story()}</div>
      `;
    },
  ],
};

export default preview;
