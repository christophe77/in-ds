# ind-ds

**Repository:** [github.com/christophe77/in-ds](https://github.com/christophe77/in-ds)

Industrial design system for HMI/SCADA interfaces. Web Components at the core, typed wrappers for React and Vue, ISA-18.2-aware tokens, MQTT binding for live process data.

## Why another design system

Generic web design systems target marketing sites and SaaS dashboards. They don't ship `state="fault"`, ISA-18.2 alarm priorities, tabular figures by default, dense 2px-stepped spacing, or runtime high-contrast mode for control rooms. **ind-ds does**, and it stays framework-agnostic so the same components run in a Vue Nuxt portal, a React engineering app, and an embedded panel built with Lit.

## Stack

- **Monorepo** — pnpm workspaces + Turborepo
- **Core** — [Stencil 4](https://stenciljs.com) → web components + auto-generated React/Vue wrappers
- **Tokens** — [Style Dictionary 4](https://styledictionary.com) → CSS vars, ES modules, JSON, Dart (for Flutter HMIs)
- **Playground** — [Storybook 9](https://storybook.js.org) (`@storybook/web-components-vite`) + a11y addon + HMI viewports
- **Realtime** — `mqtt.js`, thin binding layer
- **Trends** — [uPlot](https://github.com/leeoniya/uPlot) (planned for `<ind-trend>`) — lightweight, no React/D3
- ESM-only, `sideEffects: false` (except CSS), tree-shakable, no heavy runtime deps

## Layout

```
ind-ds/
├── package.json                # workspace root, scripts
├── pnpm-workspace.yaml
├── turbo.json                  # build graph
├── tsconfig.base.json          # shared TS config
├── packages/
│   ├── tokens/                 # source of truth → CSS/JS/TS/JSON/Dart
│   ├── core/                   # Stencil web components
│   │   └── src/components/
│   │       ├── atoms/          # LED, gauge, valve, button, badge
│   │       ├── molecules/      # state cards, mini trends
│   │       ├── organisms/      # alarm banners, P&ID frames
│   │       └── templates/      # full screens
│   ├── react/                  # generated React wrappers
│   ├── vue/                    # generated Vue 3 wrappers
│   └── mqtt/                   # MQTT → DOM binding
└── apps/
    └── storybook/              # playground (dark/light/HC, HMI viewports)
```

## Get started

```bash
pnpm install
pnpm build                      # tokens → core → wrappers, via turbo
pnpm storybook                  # http://localhost:6006
```

Requires Node 20+ and pnpm 9+.

## What's in this first scaffold

- **`@ind-ds/tokens`** — full industrial token set (process states, ISA-18.2 alarm priorities, dense spacing, tabular figures, dark / light / high-contrast themes). Build emits CSS variables, ESM `tokens.js` + `.d.ts`, flat JSON, and a Dart class for Flutter HMIs.
- **`@ind-ds/core`** — one complete atom: `<ind-led>` with `state`, `size`, `blinking`, `label`. ARIA live politeness switches based on state, `prefers-reduced-motion` swaps the blink for a static outline.
- **`@ind-ds/react`** — typed React wrapper for `<ind-led>` with lazy custom-element registration.
- **`@ind-ds/vue`** — typed Vue 3 wrapper, same shape.
- **`@ind-ds/mqtt`** — `IndMqttClient` + `bindLed` / `bindBlink` helpers, ready to wire a broker to a DOM tree.
- **`@ind-ds/storybook`** — LED stories with controls, an "AllStates" gallery, a "DensePanel" realistic mock, and a theme toolbar.

## Adding a new component (end-to-end)

Walk-through for adding `<ind-valve>`:

1. **Tokens (only if a new role is needed).** If `valve` introduces colors or motion not covered by existing semantic tokens, add them to `packages/tokens/tokens/semantic/`. Rebuild: `pnpm --filter @ind-ds/tokens build`.

2. **Stencil component.** Create:
   ```
   packages/core/src/components/atoms/valve/
     valve.tsx
     valve.css
   ```
   Use the LED component as the template. Tag is `ind-valve`, shadow DOM on, `@Prop({ reflect: true })` for everything that participates in the CSS selectors, every animation guarded by `prefers-reduced-motion`.

3. **Re-export the types** from `packages/core/src/index.ts`.

4. **Build core.** `pnpm --filter @ind-ds/core build`. This:
   - generates `src/components.d.ts`
   - bundles the custom element
   - regenerates React and Vue wrappers (once `@stencil/react-output-target` and `@stencil/vue-output-target` are wired — see each wrapper README)

5. **Stories.** Add `apps/storybook/stories/atoms/valve.stories.ts`, mirroring `led.stories.ts`. Always include the "AllStates" gallery and at least one realistic dense-panel mock.

6. **MQTT (optional).** If the component has a canonical binding pattern, add a `bindValve` convenience to `packages/mqtt/src/index.ts`.

## Design principles

- **Semantic over decorative.** Components consume `--ind-state-*` and `--ind-alarm-*` tokens, never raw palette tokens. Theming is free.
- **HMI density first.** 12px base font, 2px-stepped spacing, no rounded-corner softness. Operators have 24-inch screens packed with values; whitespace is hostile.
- **ISA-18.2 throughout.** Alarm priorities are a token group with explicit priority numbers and labels — no ad-hoc severity scales.
- **Accessibility is non-negotiable.** Live regions, visible focus, `prefers-reduced-motion`, WCAG AAA via high-contrast theme. A control room ops 24/7; the design system must respect that.
- **Framework wrappers are derived.** Stencil is the single source of truth. React and Vue ship typed proxies regenerated on every build — no parallel maintenance.

## License

MIT — see [LICENSE](./LICENSE).
