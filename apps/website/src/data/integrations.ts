/**
 * Install + minimal-usage snippets. All code is verified against the README and
 * package manifests on the current branch. Do not add APIs that don't exist.
 */
export interface IntegrationSnippet {
  id: string;
  label: string;
  install: string;
  /** Minimal, runnable usage example. */
  usage: string;
  usageLang: string;
  href: string;
}

export const INSTALL_TABS: IntegrationSnippet[] = [
  {
    id: 'react',
    label: 'React',
    install: 'npm install @ind-ds/react',
    usageLang: 'tsx',
    href: '/integrations/react',
    usage: `// main.tsx — load tokens once
import '@ind-ds/tokens/css';
import '@ind-ds/tokens/css/light';
import '@ind-ds/tokens/css/high-contrast';
import '@ind-ds/core/css/utilities';

// App.tsx
import { IndLed, IndValue, IndAlarm } from '@ind-ds/react';

export function PumpStatus({ level }: { level: number }) {
  return (
    <div className="ind-stack" data-theme="dark">
      <IndValue value={level} unit="%" trend={level > 80 ? 'up' : 'stable'} />
      {level > 90 && <IndAlarm priority="high" label="Level high" />}
      <IndLed state={level > 90 ? 'warning' : 'running'} label="T-204" />
    </div>
  );
}`,
  },
  {
    id: 'vue',
    label: 'Vue',
    install: 'npm install @ind-ds/vue',
    usageLang: 'vue',
    href: '/integrations/vue',
    usage: `<script setup lang="ts">
// main.ts loads: @ind-ds/tokens/css (+ light, high-contrast) and
// @ind-ds/core/css/utilities
import { IndLed, IndInput, IndButton } from '@ind-ds/vue';
import { ref } from 'vue';

const tag = ref('');
</script>

<template>
  <div class="ind-stack" data-theme="dark">
    <IndInput v-model:value="tag" label="Tag name" placeholder="P-101" />
    <IndButton variant="primary">Apply</IndButton>
    <IndLed state="running" :label="tag || 'P-101'" />
  </div>
</template>`,
  },
  {
    id: 'web-components',
    label: 'Web Components',
    install: 'npm install @ind-ds/core',
    usageLang: 'ts',
    href: '/integrations/web-components',
    usage: `// app.ts — register once, then use the tags anywhere
import '@ind-ds/tokens/css';
import '@ind-ds/tokens/css/light';
import '@ind-ds/tokens/css/high-contrast';
import '@ind-ds/core/css/utilities';
import { defineCustomElements } from '@ind-ds/core/loader';

defineCustomElements();`,
  },
  {
    id: 'tokens',
    label: 'Tokens',
    install: 'npm install @ind-ds/tokens',
    usageLang: 'css',
    href: '/integrations/tokens',
    usage: `/* CSS variables, dark by default; switch with a data-theme attribute */
@import '@ind-ds/tokens/css';
@import '@ind-ds/tokens/css/light';
@import '@ind-ds/tokens/css/high-contrast';

.panel {
  background: var(--ind-surface-panel);
  color: var(--ind-surface-text-primary);
  border: 1px solid var(--ind-surface-border-subtle);
}
.fault { color: var(--ind-state-fault-fg); }`,
  },
  {
    id: 'mqtt',
    label: 'MQTT',
    install: 'npm install @ind-ds/mqtt',
    usageLang: 'ts',
    href: '/integrations/mqtt',
    usage: `import { IndMqttClient, bindLed } from '@ind-ds/mqtt';

// Use a secure WebSocket broker (wss://) in production.
const client = new IndMqttClient({ url: 'wss://broker.example:8083' });
await client.connect();

const led = document.querySelector('ind-led')!;
bindLed(client, 'plant/line-1/pump-101/state', led, (raw) =>
  raw === 'RUN' ? 'running' : 'fault',
);`,
  },
];
