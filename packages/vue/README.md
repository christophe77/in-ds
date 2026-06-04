# @ind-ds/vue

Vue 3.3+ wrappers around `@ind-ds/core` web components. Auto-generated — never hand-edit `src/index.ts` (until you replace this scaffold-only stub with the `@stencil/vue-output-target` proxy).

## Usage

```vue
<script setup lang="ts">
import { IndLed } from '@ind-ds/vue';
import { computed } from 'vue';

const props = defineProps<{ running: boolean; fault: boolean }>();
const state = computed(() => (props.fault ? 'fault' : props.running ? 'running' : 'stopped'));
</script>

<template>
  <IndLed :state="state" :blinking="fault" label="Pump P-101" />
</template>
```

Custom elements are registered lazily on first mount, so SSR (Nuxt) doesn't choke during render.

## Regenerating

```bash
pnpm --filter @ind-ds/core build
pnpm --filter @ind-ds/vue build
```
