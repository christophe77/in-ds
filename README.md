# ind-ds

**Repository:** [github.com/christophe77/ind-ds](https://github.com/christophe77/ind-ds) · **Storybook:** [christophe77.github.io/ind-ds](https://christophe77.github.io/ind-ds/)

Industrial design system for HMI/SCADA interfaces. Web Components at the core, typed wrappers for React and Vue, ISA-18.2-aware tokens, MQTT binding for live process data.

## Why another design system

Generic web design systems target marketing sites and SaaS dashboards. They don't ship `state="fault"`, ISA-18.2 alarm priorities, tabular figures by default, dense 2px-stepped spacing, or runtime high-contrast mode for control rooms. **ind-ds does**, and it stays framework-agnostic so the same components run in a Vue Nuxt portal, a React engineering app, and an embedded panel built with Lit.

## Stack

- **Monorepo** — pnpm workspaces + Turborepo
- **Core** — [Stencil 4](https://stenciljs.com) → web components + auto-generated React/Vue wrappers
- **Tokens** — [Style Dictionary 4](https://styledictionary.com) → CSS vars, ES modules, JSON, Dart (for Flutter HMIs)
- **Playground** — [Storybook 9](https://storybook.js.org) (`@storybook/web-components-vite`) + a11y addon + HMI viewports — [live preview on GitHub Pages](https://christophe77.github.io/ind-ds/)
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
│   │       ├── atoms/          # LED, value, valve, inputs, canvases…
│   │       ├── molecules/      # health card, fill row, nav item…
│   │       ├── organisms/      # app header, sidebar, status bar…
│   │       └── templates/      # Storybook screen compositions (not published)
│   ├── react/                  # generated React wrappers
│   ├── vue/                    # generated Vue 3 wrappers
│   └── mqtt/                   # MQTT → DOM binding
└── apps/
    └── storybook/              # playground (dark/light/HC, HMI viewports)
```

## Install from npm

Published packages live under the [`@ind-ds`](https://www.npmjs.com/org/ind-ds) scope on npm.

| Package | What it ships |
|---|---|
| [`@ind-ds/tokens`](https://www.npmjs.com/package/@ind-ds/tokens) | CSS variables, ESM/TS tokens, JSON, Dart |
| [`@ind-ds/core`](https://www.npmjs.com/package/@ind-ds/core) | [61 web components](#components) (`<ind-led>`, `<ind-valve>`, …) + loader |
| [`@ind-ds/react`](https://www.npmjs.com/package/@ind-ds/react) | Typed React 18+ wrappers (auto-registers elements) |
| [`@ind-ds/vue`](https://www.npmjs.com/package/@ind-ds/vue) | Typed Vue 3 wrappers with `v-model` support |
| [`@ind-ds/mqtt`](https://www.npmjs.com/package/@ind-ds/mqtt) | MQTT → DOM attribute binding helpers |

```bash
# Tokens only (CSS vars + themes)
npm install @ind-ds/tokens

# Web components (includes tokens as a dependency)
npm install @ind-ds/core

# Framework wrappers (pull in core automatically)
npm install @ind-ds/react    # or @ind-ds/vue

# Live process data
npm install @ind-ds/mqtt
```

> **Peer deps:** `@ind-ds/react` needs `react` + `react-dom` ≥ 18. `@ind-ds/vue` needs `vue` ≥ 3.3.

### Theming

Import the token CSS once at app boot, then flip `data-theme` on `<html>` (or any ancestor):

| `data-theme` | Use case |
|---|---|
| *(omit)* or `"dark"` | Control-room default |
| `"light"` | Daylight / office |
| `"high-contrast"` | WCAG AAA operator stations |

```css
@import "@ind-ds/tokens/css";
@import "@ind-ds/tokens/css/light";
@import "@ind-ds/tokens/css/high-contrast";
```

```html
<html data-theme="dark">
```

No rebuild required — switching theme is a single attribute change.

---

## Integration examples

### React (Vite, Next.js, CRA…)

Wrappers register custom elements on first mount — no manual `defineCustomElements` call.

```tsx
// main.tsx — load tokens + optional layout utilities
import '@ind-ds/tokens/css';
import '@ind-ds/tokens/css/light';
import '@ind-ds/tokens/css/high-contrast';
import '@ind-ds/core/css/utilities';

// App.tsx
import { IndLed, IndValue, IndAlarm, IndFillRow } from '@ind-ds/react';

export function TankRow({ level, alarm }: { level: number; alarm: 'none' | 'high' | 'high-high' }) {
  return (
    <div className="ind-stack" data-theme="dark" style={{ background: 'var(--ind-surface-background)', padding: 16 }}>
      <IndFillRow label="Tank T-204" value={level} unit="%" severity={alarm !== 'none'} />
      <IndValue value={level} unit="%" trend={level > 80 ? 'up' : 'flat'} alarm={alarm} />
      {alarm !== 'none' && <IndAlarm priority={alarm} label="Level high" />}
      <IndLed state={level > 90 ? 'warning' : 'running'} label="T-204" />
    </div>
  );
}
```

Custom events use React-style prop names (`onIndChange`, `onIndInput`, …). See [Storybook](https://github.com/christophe77/ind-ds/tree/main/apps/storybook) for every component.

### Vue 3 (Vite, Nuxt…)

```vue
<!-- main.ts -->
import '@ind-ds/tokens/css'
import '@ind-ds/tokens/css/light'
import '@ind-ds/tokens/css/high-contrast'
import '@ind-ds/core/css/utilities'
```

```vue
<script setup lang="ts">
import { IndLed, IndInput, IndButton } from '@ind-ds/vue';
import { ref } from 'vue';

const tag = ref('');
</script>

<template>
  <div class="ind-stack" data-theme="dark">
    <IndInput v-model:value="tag" label="Tag name" placeholder="P-101" />
    <IndButton variant="primary" @ind-activate="() => {}">Apply</IndButton>
    <IndLed state="running" :label="tag || 'P-101'" />
  </div>
</template>
```

Elements register lazily on mount, so Nuxt SSR won't choke during render.

### Web components (vanilla, Lit, Angular, Svelte…)

Register once, then use tags directly in HTML or any template language:

```ts
// app.ts
import '@ind-ds/tokens/css';
import '@ind-ds/tokens/css/light';
import '@ind-ds/tokens/css/high-contrast';
import '@ind-ds/core/css/utilities';
import { defineCustomElements } from '@ind-ds/core/loader';

defineCustomElements();
```

```html
<div class="ind-stack" data-theme="dark">
  <ind-value value="42.6" unit="bar" trend="up" alarm="high"></ind-value>
  <ind-valve state="open" orientation="horizontal" label="XV-101"></ind-valve>
  <ind-led state="fault" blinking label="P-101"></ind-led>
</div>
```

Per-component lazy loading (smaller initial bundle):

```ts
import { defineCustomElement as defineIndLed } from '@ind-ds/core/dist/components/ind-led.js';
defineIndLed();
```

### Tokens only (any stack)

Use the design tokens without web components — Flutter HMIs, legacy SCADA shells, or a custom React chart library:

```css
/* global.css */
@import "@ind-ds/tokens/css";
```

```ts
import { colorStateFaultBg, spacing4, fontSizeBase } from '@ind-ds/tokens';
// or: import tokens from '@ind-ds/tokens/json' with assert { type: 'json' }
```

```dart
// Flutter — vendor dist/dart/tokens.dart from the npm package
import 'tokens.dart';
Color fault = Color(IndTokens.IndColorPaletteRed500);
```

### MQTT live binding

Wire a broker topic to component attributes without framework-specific glue:

```ts
import { IndMqttClient, bindLed, bindBlink } from '@ind-ds/mqtt';
import { defineCustomElements } from '@ind-ds/core/loader';

defineCustomElements();

const client = new IndMqttClient({ url: 'wss://broker.example:8083/mqtt' });
await client.connect();

const pump = document.querySelector('#pump-101')!;
bindLed(client, 'plant/area1/pump-101/state', pump, (raw) =>
  raw === 'RUN' ? 'running' : raw === 'FAULT' ? 'fault' : 'stopped',
);
bindBlink(client, 'plant/area1/pump-101/alarm/unack', pump);
```

### Beyond the browser — native, desktop, embedded

`@ind-ds/core` ships **Stencil web components**. They are Custom Elements: they need a **DOM** (`document`, `HTMLElement`, Shadow DOM). There is no official Qt, WPF, SwiftUI, or Android View binding today.

You have two realistic strategies:

| Strategy | When to use | What you install |
|---|---|---|
| **WebView shell** | Desktop (Electron, Tauri), mobile (Capacitor, Flutter `WebView`), embedded panel (Chromium kiosk) | `@ind-ds/core` + `@ind-ds/tokens` — same code as a web app |
| **Native UI + tokens** | Flutter HMIs, Qt/QML, .NET MAUI, pure native SCADA clients | `@ind-ds/tokens` only — rebuild widgets in your toolkit, keep the same **vocabulary** |

In both cases the **component contract** stays the same: process states (`running`, `stopped`, `fault`, `warning`, `maintenance`), ISA-18.2 alarm priorities (`high-high`, `high`, `low`, `low-low`), dense spacing, tabular figures. [Storybook](https://github.com/christophe77/ind-ds/tree/main/apps/storybook) is the visual reference for behaviour and props.

#### Option A — embed the real components (WebView)

If your app already hosts HTML (or can), use the Stencil components as-is inside a WebView:

```
┌─────────────────────────────────────┐
│  Native shell (Electron / Tauri /   │
│  Capacitor / Qt WebEngine / WKWebView)│
│  ┌───────────────────────────────┐  │
│  │  Your HMI page (HTML/JS)      │  │
│  │  defineCustomElements()       │  │
│  │  <ind-led> <ind-value> …      │  │
│  └───────────────────────────────┘  │
│         ↕ bridge (optional)          │
│  OS APIs — serial, filesystem, …    │
└─────────────────────────────────────┘
```

**Electron / Tauri renderer**

```ts
// renderer.ts
import '@ind-ds/tokens/css';
import '@ind-ds/core/css/utilities';
import { defineCustomElements } from '@ind-ds/core/loader';

defineCustomElements();
// render your HMI HTML — identical to the vanilla web example above
```

**Capacitor (iOS / Android)** — same imports in the WebView bundle; use Capacitor plugins for device APIs alongside the web UI.

**Flutter `webview_flutter`** — load a local HTML asset or remote URL that bundles `@ind-ds/core`; communicate with Dart via `JavaScriptChannel` when you need native navigation around the web panel.

> `@ind-ds/mqtt` targets DOM nodes (`element.setAttribute`). In a WebView HMI it works unchanged. In a fully native UI, subscribe with your platform MQTT client and map payloads to widget state yourself (same transforms as `bindLed`).

#### Option B — native widgets, shared tokens

Install only the token package and mirror component semantics in your UI toolkit:

```bash
npm install @ind-ds/tokens
# or in pubspec / Gradle / CocoaPods: vendor the generated files below
```

**Available cross-platform exports**

| Export path | Format | Typical consumer |
|---|---|---|
| `@ind-ds/tokens` | ESM + `.d.ts` | Node tooling, bundlers |
| `@ind-ds/tokens/json` | flat JSON | codegen → Kotlin, Swift, C#, QML |
| `@ind-ds/tokens/dart` | `IndTokens` class | Flutter / Dart HMIs |
| `@ind-ds/tokens/css` | CSS variables | WebView pages, hybrid shells |

**Flutter — native LED using Dart tokens**

Copy or generate from the published Dart file (`node_modules/@ind-ds/tokens/dist/dart/tokens.dart` or import via build script):

```dart
import 'package:flutter/material.dart';
import 'tokens.dart'; // IndTokens from @ind-ds/tokens/dart

enum ProcessState { running, stopped, fault, warning, maintenance }

Color _ledBg(ProcessState state) => switch (state) {
  ProcessState.running     => Color(IndTokens.IndColorPaletteGreen500),
  ProcessState.stopped     => Color(IndTokens.IndColorPaletteNeutral500),
  ProcessState.fault       => Color(IndTokens.IndColorPaletteRed500),
  ProcessState.warning     => Color(IndTokens.IndColorPaletteAmber500),
  ProcessState.maintenance => Color(IndTokens.IndColorPaletteBlue500),
};

/// Mirrors <ind-led state="…" label="…"> — same prop vocabulary as the Stencil component.
class IndLed extends StatelessWidget {
  const IndLed({super.key, required this.state, this.label});
  final ProcessState state;
  final String? label;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: _ledBg(state),
            shape: BoxShape.circle,
            boxShadow: [BoxShadow(color: _ledBg(state).withValues(alpha: 0.6), blurRadius: 6)],
          ),
        ),
        if (label != null) ...[const SizedBox(width: 6), Text(label!, style: const TextStyle(fontFeatures: [FontFeature.tabularFigures()]))],
      ],
    );
  }
}
```

**JSON → your platform (Qt, .NET, Rust…)**

```bash
# vendor the flat map once per release
cp node_modules/@ind-ds/tokens/dist/json/tokens.json tooling/tokens.json
```

Feed it to [Style Dictionary](https://styledictionary.com/), [Tokens Studio](https://tokens.studio/), or an in-house codegen script to emit `Theme.kt`, `Colors.swift`, QML singletons, etc. Re-run when `@ind-ds/tokens` bumps.

**Native alarm chip — same ISA-18.2 priority enum as `<ind-alarm>`**

```dart
// priority: 'high-high' | 'high' | 'low' | 'low-low'  (identical to the web component)
Color alarmBg(String priority) => switch (priority) {
  'high-high' => Color(IndTokens.IndAlarmHighHighBg),
  'high'      => Color(IndTokens.IndAlarmHighBg),
  'low'       => Color(IndTokens.IndAlarmLowBg),
  'low-low'   => Color(IndTokens.IndAlarmLowLowBg),
  _           => Color(IndTokens.IndColorPaletteNeutral500),
};
```

#### Choosing a path

- **Need pixel-perfect parity with Storybook fast?** → WebView + `@ind-ds/core`.
- **Need offline native performance, platform widgets, or store compliance?** → `@ind-ds/tokens` + hand-rolled widgets that follow the same props/states.
- **Mixed fleet** (portal in React, rounds app in Flutter, panel in Qt)? → tokens are the shared source of truth; each shell implements UI once, all speak `running` / `high-high` / `--ind-spacing-*`.

---

## Develop locally (monorepo)

Clone and hack on the design system itself:

```bash
git clone https://github.com/christophe77/ind-ds.git
cd ind-ds
pnpm install
pnpm build                      # tokens → core → wrappers, via turbo
pnpm storybook                  # http://localhost:6006
```

Requires Node 20+ and pnpm 9+.

## Components

**61 web components** ship in `@ind-ds/core` (53 atoms, 4 molecules, 4 organisms). Each tag has a matching React wrapper (`IndLed`, `IndValue`, …) and Vue wrapper regenerated on every Stencil build.

### Atoms — indicators

| Tag | Role |
|---|---|
| `<ind-led>` | Process-state indicator (`running`, `stopped`, `fault`, `warning`, `maintenance`) with optional blink |
| `<ind-status-dot>` | Compact status dot for dense panels |
| `<ind-alarm>` | ISA-18.2 alarm chip (`high-high`, `high`, `low`, `low-low`) |
| `<ind-badge>` | Semantic pill / state badge |
| `<ind-counter>` | Numeric count chip with `max` clamp and zero-dot mode |
| `<ind-signal-quality>` | Bar-style signal/quality meter |
| `<ind-connection-indicator>` | Connected / connecting / disconnected / error dot + label |
| `<ind-heartbeat>` | Liveness pulse, stops when `alive=false` |
| `<ind-sparkline>` | Lightweight trend/mini-trend polyline (no chart lib) |
| `<ind-progress>` | Determinate / indeterminate progress bar |
| `<ind-progress-ring>` | Circular progress / spinner with optional center value |

### Atoms — process equipment

| Tag | Role |
|---|---|
| `<ind-valve>` | Valve symbol — `open` / `closed` / `transit` / `fault` |
| `<ind-pump>` | Centrifugal pump (impeller spins when running) |
| `<ind-motor>` | Motor with shaft + running ring |
| `<ind-fan>` | Fan / blower with spinning blades |
| `<ind-compressor>` | Centrifugal compressor |
| `<ind-conveyor>` | Belt conveyor with forward/reverse flow |
| `<ind-heater>` | Heating element (glows when running) |
| `<ind-cooler>` | Cooler / chiller |
| `<ind-tank>` | Liquid tank with `level` fill + alarm tint |
| `<ind-silo>` | Hopper-bottom silo with `level` fill |
| `<ind-pipe>` | Pipe segment with animated flow direction |

### Atoms — inputs

| Tag | Role |
|---|---|
| `<ind-button>` | Dense HMI button (`primary`, `secondary`, `ghost`, `danger`) |
| `<ind-input>` | Text / numeric field with label, validation, sizes |
| `<ind-checkbox>` | Checkbox with indeterminate state |
| `<ind-select>` | Dropdown with typed options |
| `<ind-textarea>` | Multiline input |
| `<ind-toggle>` | On/off switch with optional in-track text |
| `<ind-selector-switch>` | Multi-position selector (OFF / HAND / AUTO) |
| `<ind-estop>` | Latching emergency-stop mushroom button |
| `<ind-setpoint>` | Setpoint editor with PV compare + step buttons |
| `<ind-slider>` | Range slider with value/unit readout |
| `<ind-knob>` | Rotary knob (drag + keyboard) |
| `<ind-datetime-picker>` | Date / time / datetime field |

### Atoms — navigation

| Tag | Role |
|---|---|
| `<ind-icon>` | Built-in HMI icon set + custom-SVG slot |
| `<ind-nav-item>` | Sidebar / rail navigation entry (also a molecule export) |
| `<ind-breadcrumb-item>` | Breadcrumb crumb with separator + current state |
| `<ind-tab>` | Tab with icon/badge slots |
| `<ind-tree-node>` | Expandable tree node with indent + selection |

### Atoms — data display

| Tag | Role |
|---|---|
| `<ind-value>` | Tabular numeric readout — value, unit, trend, ISA alarm severity |
| `<ind-label>` | Text label / caption with tone + required marker |
| `<ind-unit-label>` | Engineering-unit text |
| `<ind-timestamp>` | Formatted time (`datetime` / `date` / `time` / `relative` / `iso`) |
| `<ind-tag-name>` | Monospace equipment/instrument tag, optional boxed |
| `<ind-alarm-count>` | ISA-priority alarm-count chips (HH / H / L / LL) |

### Atoms — charts & visualization

| Tag | Role |
|---|---|
| `<ind-gauge>` | Radial gauge with colored zones + needle |
| `<ind-linear-gauge>` | Horizontal/vertical gauge with zones + setpoint marker |
| `<ind-xy-point>` | XY operating point with optional trail |
| `<ind-process-symbol>` | ISA-5.1 instrument balloon (circle / square / diamond / hexagon) |
| `<ind-canvas-layer>` | Absolute-positioned layer for composing mimic diagrams |
| `<ind-scara-canvas>` | 2D top-down SCARA arm — joint angles → SVG forward kinematics |
| `<ind-shelf-canvas>` | Rack of resupplyable slots with per-slot fill level |
| `<ind-divider>` | Horizontal or vertical rule |
| `<ind-dialog>` | Modal dialog shell |

### Molecules (4)

| Tag | Role |
|---|---|
| `<ind-health-card>` | Equipment health summary — state, metrics, optional sparkline slot |
| `<ind-fill-row>` | Label + horizontal fill bar (tank level, capacity, severity tint) |
| `<ind-nav-item>` | Sidebar / rail navigation entry with icon and active state |
| `<ind-toolbar-action>` | Toolbar action cluster with optional message counter |

### Organisms (4)

| Tag | Role |
|---|---|
| `<ind-app-header>` | Top chrome — title, connection state, user slot |
| `<ind-sidebar-nav>` | Collapsible sidebar with grouped `ind-nav-item` children |
| `<ind-status-bar>` | Bottom status strip — alarms, clock, connection, custom slots |
| `<ind-mqtt-monitor>` | Live MQTT panel — broker status, topic list, message stream |

### Planned

| Tag | Status |
|---|---|
| `<ind-trend>` | Full time-series trend ([uPlot](https://github.com/leeoniya/uPlot)) — not shipped yet. For lightweight inline trends use `<ind-sparkline>`. |

Storybook **templates** (`connection`, `connected-app`) compose the above into full-screen mocks — they are documentation-only, not npm exports.

Per-component lazy import:

```ts
import { defineCustomElement as defineIndLed } from '@ind-ds/core/dist/components/ind-led.js';
defineIndLed();
```

---

## Packages

- **`@ind-ds/tokens`** — process states, ISA-18.2 alarm priorities, dense spacing, tabular figures, dark / light / high-contrast themes. CSS variables, ESM, JSON, Dart.
- **`@ind-ds/core`** — Stencil web components listed above + `defineCustomElements` loader and layout utilities CSS.
- **`@ind-ds/react`** — auto-generated typed `forwardRef` wrappers (`IndLed`, `IndValue`, `IndAlarm`, …) for every tag.
- **`@ind-ds/vue`** — `defineComponent` wrappers with full `v-model` and event forwarding.
- **`@ind-ds/mqtt`** — `IndMqttClient`, `bindLed`, `bindBlink`, and generic `bind()` / `TopicBinding` for any attribute.
- **`@ind-ds/storybook`** — component playground with HMI viewports and theme toolbar (not published).

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
