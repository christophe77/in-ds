# @ind-ds/website

The marketing + documentation website for **ind-ds** — the open-source design
system for industrial software. Built with [Astro](https://astro.build), it uses
the real `@ind-ds/*` workspace packages so the site is styled and composed with
the very design system it documents.

It is intentionally separate from the [Storybook](https://christophe77.github.io/ind-ds/),
which remains the exhaustive component reference. The website is for positioning,
education, onboarding and SEO.

## Develop

From the repo root (requires Node 20+, pnpm 9+):

```bash
pnpm install
pnpm website:dev        # http://localhost:4321/ind-ds-site/
```

Or per-app:

```bash
pnpm --filter @ind-ds/website dev
pnpm --filter @ind-ds/website build
pnpm --filter @ind-ds/website preview
pnpm --filter @ind-ds/website test     # content integrity checks
pnpm --filter @ind-ds/website check     # astro type check
```

The dev server needs `@ind-ds/core` and `@ind-ds/tokens` to be built first (their
`dist/` is consumed directly). `pnpm build` at the root, or `pnpm website:build`
(which filters with `...` to build dependencies first), handles that.

## Architecture notes

- **Real components.** Live demos render actual ind-ds web components. They are
  registered client-side in `src/lib/ind-runtime.ts`, which imports each used
  component's `defineCustomElement` from `@ind-ds/core/dist/components/*` and calls
  it. We deliberately avoid the lazy `defineCustomElements()` loader — its dynamic
  imports 404 in a static Vite build. Only the components actually shown are
  registered, to keep JS small.
- **Tokens drive everything.** `BaseLayout.astro` imports the token CSS
  (`@ind-ds/tokens/css` + light + high-contrast) and the site chrome is written
  against `--ind-*` variables. Theme switching is the tokens' own `data-theme`
  attribute (default dark).
- **⚠️ No TypeScript logic in inline `<script>` blocks.** The Astro template
  compiler mis-parses TS generics/casts inside inline scripts. Put client logic in
  an external `.ts` module and import it: `<script>import './thing.client.ts'</script>`.
  Client `.ts` files must live **outside** `src/pages/` (files under `pages/` become
  routes and are server-rendered, breaking on `document`).
- **Component catalog** (`src/data/components.ts`) is validated against
  `@ind-ds/core/dist/docs.json` by `scripts/validate-content.mjs` (the `test`
  script), so the component list and count can never drift from the package.

## Authoring content

### Blog articles

Add a Markdown/MDX file under `src/content/blog/`. The filename is the slug. Required
frontmatter (schema in `src/content.config.ts`):

```yaml
---
title: Your article title
description: One or two sentences for SEO and the card (< 160 chars).
publishDate: 2026-07-20
author: Christophe Bellec
tags: [hmi, scada]
# optional: updatedDate, ogImage, draft
---
```

Start body headings at `##` (the `#` H1 comes from the title). Fenced code blocks
should have language identifiers. Keep claims factual — only document APIs that
exist in the packages.

### Components, use cases, navigation, install snippets

These are data-driven — edit the typed files in `src/data/`:

- `components.ts` — the component catalog + categories (validated against the package).
- `use-cases.ts` — use-case cards and which have detail pages.
- `integrations.ts` — install + usage snippets (keep verified against the packages).
- `navigation.ts`, `site.ts` — nav and central site facts (URLs, versions, counts).

### Social card

`public/og/og-default.png` (1200×630) is generated from `scripts/og-default.svg`.
Regenerate after editing the SVG with the project's `sharp`:

```bash
NODE_PATH="$(dirname "$(node -e "console.log(require.resolve('@ind-ds/core'))")")/../../.." \
  node -e "require('sharp')(require('fs').readFileSync('scripts/og-default.svg'),{density:150}).resize(1200,630).png().toFile('public/og/og-default.png')"
```

## Configuration

Canonical origin and base path are environment-driven (`astro.config.mjs`):

| Env var     | Default                          | Notes                                   |
| ----------- | -------------------------------- | --------------------------------------- |
| `SITE_URL`  | `https://christophe77.github.io` | Canonical origin for SEO/sitemap.       |
| `BASE_PATH` | `/ind-ds-site`                   | Sub-path. Set to `/` for a root domain. |

For a future custom domain (e.g. `ind-ds.dev`): `SITE_URL=https://ind-ds.dev`,
`BASE_PATH=/`.

## Deployment

The website deploys to a **separate** GitHub Pages repo, `christophe77/ind-ds-site`,
via `.github/workflows/website-pages.yml`. This keeps the existing Storybook Pages
deployment (`christophe77.github.io/ind-ds/`) untouched — the two never share a
Pages environment.

One-time setup:

1. Create a public repo `christophe77/ind-ds-site`.
2. Generate an SSH deploy key; add the **public** key to `ind-ds-site` as a deploy
   key with write access, and the **private** key to this repo's secrets as
   `WEBSITE_DEPLOY_KEY`.
3. In `ind-ds-site`: Settings → Pages → Deploy from branch → `gh-pages`.
4. Push to `main` (or run the workflow manually). The site publishes to
   `https://christophe77.github.io/ind-ds-site/`.

For a custom domain, set `SITE_URL`/`BASE_PATH` in the workflow and add a `cname:`
to the deploy step.
