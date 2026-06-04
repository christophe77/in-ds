# @ind-ds/core

Stencil-built web components for industrial HMI/SCADA interfaces. Framework-agnostic — consume directly as custom elements, or use the typed wrappers in `@ind-ds/react` and `@ind-ds/vue`.

## Atomic decomposition

```
src/components/
  atoms/         # primitives — LED, gauge, valve symbol, button, badge
  molecules/     # state cards, tag rows, mini trends
  organisms/     # alarm banners, P&ID frames, trend panels
  templates/     # full HMI screen layouts (operator station, mobile rounds)
```

The boundary rule: an **atom** never imports another component. A **molecule** only imports atoms. An **organism** can import molecules and atoms. A **template** assembles organisms into a screen.

## Adding a new component

1. Decide the atomic layer (atom/molecule/organism/template).
2. Create the folder: `src/components/<layer>/<name>/`.
3. Add three files:
   - `<name>.tsx` — the Stencil component (`@Component`, `tag: 'ind-<name>'`, `shadow: true`).
   - `<name>.css` — styles. Consume `--ind-*` CSS vars from tokens; never hard-code colors. Add a `@media (prefers-reduced-motion: reduce)` rule for any animation that conveys alarm state.
   - `<name>.spec.tsx` and/or `<name>.e2e.ts` for tests (optional but expected before promotion to stable).
4. Re-export the public types from `src/index.ts`.
5. `pnpm --filter @ind-ds/core build` regenerates `components.d.ts` and the `dist-custom-elements` bundle. The framework wrapper packages re-export the new element automatically.

## Component conventions

- Tag prefix `ind-` (e.g. `<ind-led>`, `<ind-valve>`).
- Shadow DOM on by default. Expose customization points through CSS Shadow Parts (`exportparts`/`::part(...)`), not via custom slots when the goal is just styling.
- Every interactive component must expose a public `focus()` method and respect `prefers-reduced-motion`.
- Process-bearing components (LED, gauge, valve, alarm chip) expose a `state` prop with the canonical ISA-18.2 / process-state vocabulary defined in `@ind-ds/tokens` — never invent a parallel vocabulary.
- Numeric displays must apply `font-feature-settings: var(--ind-font-feature-tabular)`.

## Build

```bash
pnpm --filter @ind-ds/core build       # production build
pnpm --filter @ind-ds/core dev         # watch + dev server on :3333
```
