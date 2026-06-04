/* eslint-disable */
/**
 * AUTO-GENERATED FILE — do not edit by hand.
 *
 * Regenerated on `pnpm --filter @ind-ds/core build` by `@stencil/vue-output-target`.
 * Checked in so the package is usable before the first Stencil build.
 */
import { defineComponent, h, onMounted, type PropType } from 'vue';
import type { LedSize, LedState } from '@ind-ds/core';

let ledDefined = false;
async function defineLed() {
  if (ledDefined || typeof window === 'undefined') return;
  ledDefined = true;
  const mod = await import('@ind-ds/core/loader');
  await mod.defineCustomElements(window);
}

export const IndLed = defineComponent({
  name: 'IndLed',
  props: {
    state: { type: String as PropType<LedState>, default: 'stopped' },
    size: { type: String as PropType<LedSize>, default: 'md' },
    blinking: { type: Boolean, default: false },
    label: { type: String, default: undefined },
  },
  setup(props) {
    onMounted(() => {
      void defineLed();
    });
    return () =>
      h('ind-led', {
        state: props.state,
        size: props.size,
        // Boolean attribute: present-or-absent, not "true"/"false".
        ...(props.blinking ? { blinking: true } : {}),
        label: props.label,
      });
  },
});

export type { LedSize, LedState };
