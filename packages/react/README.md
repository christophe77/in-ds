# @ind-ds/react

React 18+ wrappers around `@ind-ds/core` web components. Auto-generated — never hand-edit `src/generated/`.

## Usage

```tsx
import { IndLed } from '@ind-ds/react';

export function PumpStatus({ running, fault }: { running: boolean; fault: boolean }) {
  const state = fault ? 'fault' : running ? 'running' : 'stopped';
  return <IndLed state={state} blinking={fault} label="Pump P-101" />;
}
```

The wrappers call `defineCustomElements(window)` once on first mount, so you don't have to register anything at app bootstrap.

## How the wrappers are generated

`packages/core/stencil.config.ts` runs `@stencil/react-output-target` on every Stencil build, writing typed `forwardRef` components into `packages/react/src/generated/`. They route every Stencil `@Prop` to the underlying custom element and forward `ref`.

To regenerate after adding a component to `@ind-ds/core`:

```bash
pnpm --filter @ind-ds/core build
pnpm --filter @ind-ds/react build
```

Turborepo handles the order via `dependsOn: ["^build"]`.
