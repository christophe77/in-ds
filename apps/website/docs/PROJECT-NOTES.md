# ind-ds website — project notes

Audit, decisions, launch checklist and follow-ups for `apps/website`.

## 1. Repository audit (source of truth)

Verified against the repo on branch `feat/virtual-keyboard`:

| Item | Finding |
| --- | --- |
| Monorepo | pnpm 9 + Turborepo; workspaces `packages/*` + `apps/*`; Node 20+ |
| Packages | `@ind-ds/tokens` 0.2.1 · `@ind-ds/core` 0.2.2 · `@ind-ds/react` 0.2.2 · `@ind-ds/vue` 0.3.0 · `@ind-ds/mqtt` 0.2.1 |
| Components | **115** (verified via `packages/core/dist/docs.json` and `@Component` tags). Atomic tiers: 53 atoms / 32 molecules / 30 organisms |
| Themes | `data-theme` attribute; default **dark** on `:root`, plus `[data-theme="light"]` and `[data-theme="high-contrast"]` |
| States | `running`/`stopped`/`fault`/`warning`/`maintenance`; valve `open`/`closed`/`transit`/`fault`; connection `connected`/`connecting`/`disconnected`/`error` |
| Alarms | ISA-18.2-aware `high-high`(1/HH), `high`(2/H), `low`(3/L), `low-low`(4/LL); acknowledge + timestamp |
| MQTT | `IndMqttClient({url})` → `connect()` → `bind({topic,element,attribute,transform,asProperty})`; `bindLed`, `bindBlink` |
| Storybook | `apps/storybook`, `@storybook/web-components-vite`, deployed to Pages at `/ind-ds/` via `storybook-pages.yml` |
| Tooling | No ESLint/Prettier; tests via Stencil/Jest (core) + Vitest (mqtt) |

### Corrections applied vs. the brief
- **Count is 115, not 114** — the brief/README predate `ind-virtual-keyboard`. The site derives the count from data, so it stays correct.
- Platform support (Electron/Tauri/Capacitor/Flutter/Qt/.NET) is described as **strategies**, not shipped official bindings — matching the README's care. `ind-trend` (full uPlot trend) is labeled **planned**.
- The site itself uses **raw custom elements** (not the React/Vue wrappers) to best demonstrate framework independence and minimise JS.

## 2. Key decisions
- **Stack:** Astro 7 + TypeScript, in the monorepo at `apps/website`, using `@ind-ds/core` + `@ind-ds/tokens` via `workspace:*`.
- **Deploy:** separate `christophe77/ind-ds-site` Pages repo (user-approved) so Storybook's `/ind-ds/` URL is untouched. `SITE_URL`/`BASE_PATH` are env-driven for a future `ind-ds.dev`.
- **Component registration:** explicit `defineCustomElement()` per used component (static-build safe); catalog validated against `docs.json` at test time.
- **No fake content:** no metrics, testimonials, logos, customers or star counts anywhere.

## 3. Launch checklist

- [x] Homepage explains the value in <10s, with a live component composition + scenario toggle
- [x] All primary pages statically rendered and indexable (24 HTML pages)
- [x] Real ind-ds tokens + components used throughout
- [x] Dark / light / high-contrast themes work (persisted, no-flash)
- [x] Keyboard: skip link, focus-visible, roving-tabindex tabs, accessible mobile menu
- [x] `prefers-reduced-motion` respected (live feeds pause)
- [x] Unique title + meta description + canonical per page
- [x] `sitemap-index.xml`, `sitemap-0.xml`, `robots.txt`, `rss.xml`
- [x] Open Graph + Twitter cards + JSON-LD (WebSite, SoftwareApplication, Article, BreadcrumbList, HowTo)
- [x] 1200×630 social card (`public/og/og-default.png`)
- [x] Custom 404
- [x] No broken internal links (649 checked)
- [x] `astro check` clean; production build green in CI (`pnpm build`/`pnpm test` include the site)
- [x] Deploy workflow that does not clobber Storybook
- [ ] Create `ind-ds-site` repo + `WEBSITE_DEPLOY_KEY` secret (one-time, see README)
- [ ] Optional: acquire `ind-ds.dev` and switch `SITE_URL`/`BASE_PATH`

## 4. Recommended follow-ups

**Website**
1. Per-component deep links into Storybook (stories are grouped/cross-referenced, so a curated tag→story map is needed; currently components link to the Storybook root).
2. Per-article generated OG images (template exists; wire a build step with `sharp`/`satori`).
3. Automated a11y in CI (`@axe-core/playwright`) and a couple of Playwright smoke tests (homepage CTA, mobile menu, theme persistence, component filter).
4. Add `/integrations/flutter-tokens` and the remaining use-case detail pages (`maintenance`, `engineering-config`, `cross-platform`) as they mature.
5. An opt-in live MQTT demo against a public test broker (clearly isolated), plus an alarm-lifecycle demo.
6. Privacy-friendly analytics behind an env flag (events: GitHub/Storybook/npm clicks, copy install, tab switches, component search).

**Repository (for conversion — propose before editing governance files)**
7. README: add the website URL + a value-prop banner + component gallery GIF.
8. Add GitHub topics (industrial, hmi, scada, design-system, web-components, stencil, react, vue, mqtt, …), a social preview image, and issue/PR templates.
9. Consider `CODE_OF_CONDUCT.md`, `SECURITY.md`, and a few "good first issues" to support a launch.
