import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|js|mdx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    // GitHub Pages project sites are served under /{repo}/ — set STORYBOOK_BASE_PATH=/ind-ds/ in CI.
    const base = process.env.STORYBOOK_BASE_PATH;
    if (base) {
      config.base = base.endsWith('/') ? base : `${base}/`;
    }
    return config;
  },
};

export default config;
