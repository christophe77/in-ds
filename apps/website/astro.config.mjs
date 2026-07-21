// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

/**
 * Canonical origin + base path are environment-driven so the same build can
 * target the GitHub Pages project site today and a custom domain (e.g.
 * https://ind-ds.dev with BASE_PATH="/") later — a one-line change, no code edits.
 *
 * Defaults deploy to the separate `ind-ds-site` Pages repo, leaving the existing
 * Storybook deployment at christophe77.github.io/ind-ds/ untouched.
 */
const SITE = process.env.SITE_URL ?? 'https://christophe77.github.io';
const BASE = process.env.BASE_PATH ?? '/ind-ds-site';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/404') })],
  vite: {
    // The ind-ds packages ship ESM that Vite should bundle rather than externalize.
    ssr: { noExternal: ['@ind-ds/core', '@ind-ds/tokens'] },
  },
});
