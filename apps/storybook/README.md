# @ind-ds/storybook

Playground and visual reference for ind-ds. Storybook 9 + `@storybook/web-components-vite`.

## Run

```bash
pnpm storybook                          # from repo root, runs across the workspace
# or
pnpm --filter @ind-ds/storybook storybook
```

Opens on [http://localhost:6006](http://localhost:6006).

## What's wired

- **Theme toolbar** — flip between dark, light, high-contrast at runtime; the decorator just sets `[data-theme]` on `<html>` and the token CSS does the rest.
- **HMI viewports** — 1920×1080 operator station, 15"/10" industrial panels, 480×800 handheld.
- **Controls** — expanded by default so operators of the design system can drive every prop without docs spelunking.
- **a11y addon** — runs axe on every story.

## Adding stories for a new component

1. Build `@ind-ds/core` so the new custom element is registered.
2. Drop a `stories/<layer>/<name>.stories.ts` file matching the LED story shape.
3. Use `tags: ['autodocs']` to get a generated docs page from JSDoc on the Stencil component.
