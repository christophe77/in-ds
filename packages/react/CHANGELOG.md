# @ind-ds/react

## 0.2.2

### Patch Changes

- Updated dependencies
  - @ind-ds/core@0.2.2

## 0.1.1

### Patch Changes

- 57135c4: Ensure `dist/` TypeScript declarations are always built before npm publish via `prepack` scripts.
- Updated dependencies [57135c4]
  - @ind-ds/core@0.1.1

## 0.1.0

### Minor Changes

- b808c6f: Initial public release of the **ind-ds** industrial design system.

  **Packages**

  - `@ind-ds/tokens` — Style Dictionary-driven design tokens. CSS variables (`:root` + `[data-theme="light"]` + `[data-theme="high-contrast"]`), ESM exports, JSON dump, and Flutter `IndTokens` class. Industrial-specific layers: process states (running / stopped / fault / warning / maintenance), ISA-18.2 alarm priorities (HH / H / L / LL), feedback (success / warning / error / info), button / trend / surface semantic groups, dense 2px-stepped spacing, tabular figures.
  - `@ind-ds/core` — Stencil 4 web components, framework-agnostic. Atoms (LED, Value, Alarm, Valve, Button, Input, Checkbox, Divider, StatusDot, Progress, Select, Textarea, Dialog, SCARA canvas, Shelf canvas), molecules (NavItem, HealthCard, FillRow, ToolbarAction), organisms (AppHeader, SidebarNav, MqttMonitor, StatusBar). Plus a `/css/utilities` import shipping layout primitives (`.ind-stack`, `.ind-row`, `.ind-group`, `.ind-section-header`, `.ind-table`, `.ind-warn-note`, etc.).
  - `@ind-ds/react` — typed `forwardRef` wrappers around every custom element, with `useCustomEvent` wiring for Stencil events and array-property propagation for `IndSelect` / `IndScaraCanvas` / `IndShelfCanvas`.
  - `@ind-ds/vue` — `defineComponent` wrappers with full `v-model` support (`v-model:value`, `v-model:checked`, `v-model:open`, `v-model:filterValue`, `v-model:paused`) and Vue-style emit forwarding for all Stencil custom events.
  - `@ind-ds/mqtt` — lightweight `IndMqttClient` + `bindLed` / `bindBlink` helpers for streaming broker topics directly onto component attributes.

### Patch Changes

- Updated dependencies [b808c6f]
  - @ind-ds/core@0.1.0
