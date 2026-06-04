# @ind-ds/tokens

Design tokens for the industrial HMI/SCADA design system. Single source of truth, built with [Style Dictionary](https://styledictionary.com/) v4 into CSS variables, ES modules, JSON, and Dart constants.

## Outputs

After `pnpm build`:

```
dist/
  css/
    tokens.css                 # all tokens at :root (dark default)
    themes/
      light.css                # surface overrides under [data-theme="light"]
      high-contrast.css        # WCAG AAA overrides under [data-theme="high-contrast"]
  js/
    tokens.js                  # ESM named exports
    tokens.d.ts                # TS declarations
  json/tokens.json             # flat key→value map
  dart/tokens.dart             # IndTokens class — for Flutter-based HMIs
```

## Token layers

```
tokens/
  core/         # raw values — palette, spacing, type, motion
  semantic/     # role-based — state.*, alarm.*, surface.*
  themes/       # overlay overrides applied via [data-theme="..."]
```

Components should consume **semantic** tokens (`--ind-state-fault-bg`), never core palette tokens directly. That's how runtime theming and high-contrast mode keep working without rewriting every component.

## Industrial specifics

- **Process states** — `state.running`, `state.stopped`, `state.fault`, `state.warning`, `state.maintenance`. Each has `fg`, `bg`, `border`, `glow` (used for halo effects on LEDs and pumps).
- **ISA-18.2 alarm priorities** — `alarm.high-high` (P1), `alarm.high` (P2), `alarm.low` (P3), `alarm.low-low` (P4). Each carries its own `bg`, `fg`, `priority` number, and short `label` ("HH", "H", "L", "LL").
- **Tabular figures** — `font.feature.tabular` is the value to pass to `font-feature-settings` so digit columns stay aligned on process values.
- **Dense spacing** — 2px-stepped scale below 12px because operator stations need to fit dozens of values without scrolling.

## Runtime theming

```html
<html data-theme="light">          <!-- or "high-contrast", or omit for dark -->
```

```css
@import "@ind-ds/tokens/css";
@import "@ind-ds/tokens/css/light";
@import "@ind-ds/tokens/css/high-contrast";
```

Switching is a single attribute change — no rebuild, no JS.

## Adding a token

1. Decide the layer: a new palette color → `core/color.json`; a new role → `semantic/<group>.json`.
2. Run `pnpm build`.
3. The new CSS var, JS export, JSON entry, and Dart constant are emitted in one pass.

If the new token needs to differ per theme, add the override to `themes/light.json` and `themes/high-contrast.json` as well.
