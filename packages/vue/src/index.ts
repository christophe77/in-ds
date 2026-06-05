/* eslint-disable */
/**
 * AUTO-GENERATED FILE — do not edit by hand.
 *
 * Regenerated on `pnpm --filter @ind-ds/core build` by `@stencil/vue-output-target`.
 * Checked in so the package is usable before the first Stencil build.
 */
import {
  defineComponent,
  h,
  onMounted,
  onBeforeUnmount,
  ref,
  type PropType,
} from 'vue';
import type {
  LedSize,
  LedState,
  ValueAlarm,
  ValueTrend,
  ValueSize,
  AlarmPriority,
  ValveState,
  ValveOrientation,
  ValveSize,
  ButtonVariant,
  ButtonSize,
  InputType,
  InputSize,
  InputMode,
  CheckboxSize,
  DividerOrientation,
  StatusDotState,
  StatusDotSize,
  ProgressVariant,
  ProgressSize,
  SelectOption,
  SelectSize,
  TextareaSize,
  TextareaVariant,
  DialogSize,
  HealthState,
  FillRowVariant,
  AppHeaderConnectionState,
  StatusBarState,
  ScaraState,
  ShelfSlot,
} from '@ind-ds/core';

let elementsDefined = false;
function ensureDefined(): void {
  if (elementsDefined || typeof window === 'undefined') return;
  elementsDefined = true;
  void import('@ind-ds/core/loader').then((mod) => mod.defineCustomElements(window));
}

/* -------------------------------------------------------------------------- */
/* IndLed                                                                     */
/* -------------------------------------------------------------------------- */

export const IndLed = defineComponent({
  name: 'IndLed',
  props: {
    state: { type: String as PropType<LedState>, default: 'stopped' },
    size: { type: String as PropType<LedSize>, default: 'md' },
    blinking: { type: Boolean, default: false },
    label: { type: String, default: undefined },
  },
  setup(props) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-led', {
        state: props.state,
        size: props.size,
        ...(props.blinking ? { blinking: true } : {}),
        label: props.label,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndValue                                                                   */
/* -------------------------------------------------------------------------- */

export const IndValue = defineComponent({
  name: 'IndValue',
  props: {
    value: { type: [Number, String] as PropType<number | string>, required: true },
    unit: { type: String, default: undefined },
    precision: { type: Number, default: undefined },
    alarm: { type: String as PropType<ValueAlarm>, default: 'none' },
    trend: { type: String as PropType<ValueTrend>, default: 'none' },
    size: { type: String as PropType<ValueSize>, default: 'md' },
    label: { type: String, default: undefined },
    tag: { type: String, default: undefined },
  },
  setup(props) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-value', {
        value: props.value,
        unit: props.unit,
        precision: props.precision,
        alarm: props.alarm,
        trend: props.trend,
        size: props.size,
        label: props.label,
        tag: props.tag,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndAlarm                                                                   */
/* -------------------------------------------------------------------------- */

export const IndAlarm = defineComponent({
  name: 'IndAlarm',
  props: {
    priority: { type: String as PropType<AlarmPriority>, default: 'high' },
    acknowledged: { type: Boolean, default: false },
    label: { type: String, required: true },
    timestamp: { type: String, default: undefined },
  },
  setup(props) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-alarm', {
        priority: props.priority,
        ...(props.acknowledged ? { acknowledged: true } : {}),
        label: props.label,
        timestamp: props.timestamp,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndValve                                                                   */
/* -------------------------------------------------------------------------- */

export const IndValve = defineComponent({
  name: 'IndValve',
  props: {
    state: { type: String as PropType<ValveState>, default: 'closed' },
    orientation: { type: String as PropType<ValveOrientation>, default: 'horizontal' },
    size: { type: String as PropType<ValveSize>, default: 'md' },
    label: { type: String, default: undefined },
    tag: { type: String, default: undefined },
  },
  setup(props) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-valve', {
        state: props.state,
        orientation: props.orientation,
        size: props.size,
        label: props.label,
        tag: props.tag,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndButton                                                                  */
/* -------------------------------------------------------------------------- */

export const IndButton = defineComponent({
  name: 'IndButton',
  props: {
    variant: { type: String as PropType<ButtonVariant>, default: 'default' },
    size: { type: String as PropType<ButtonSize>, default: 'md' },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    holdToConfirmMs: { type: Number, default: 0 },
  },
  emits: ['ind-activate'],
  setup(props, { emit, slots }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value;
      if (!el) return;
      const handler = (e: Event) => emit('ind-activate', e as CustomEvent<void>);
      el.addEventListener('indActivate', handler);
      cleanup = () => el.removeEventListener('indActivate', handler);
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h(
        'ind-button',
        {
          ref: elRef,
          variant: props.variant,
          size: props.size,
          ...(props.disabled ? { disabled: true } : {}),
          label: props.label,
          'hold-to-confirm-ms': props.holdToConfirmMs,
        },
        slots.default?.(),
      );
  },
});

/* -------------------------------------------------------------------------- */
/* IndInput                                                                   */
/* -------------------------------------------------------------------------- */

export const IndInput = defineComponent({
  name: 'IndInput',
  props: {
    type: { type: String as PropType<InputType>, default: 'text' },
    size: { type: String as PropType<InputSize>, default: 'md' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    name: { type: String, default: undefined },
    min: { type: [Number, String], default: undefined },
    max: { type: [Number, String], default: undefined },
    step: { type: [Number, String], default: undefined },
    pattern: { type: String, default: undefined },
    autocomplete: { type: String, default: undefined },
    inputMode: { type: String as PropType<InputMode>, default: undefined },
  },
  emits: ['ind-input', 'ind-change', 'update:value'],
  setup(props, { emit, slots }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value;
      if (!el) return;
      const onInput = (e: Event) => {
        const detail = (e as CustomEvent<string>).detail;
        emit('ind-input', detail);
        emit('update:value', detail);
      };
      const onChange = (e: Event) => emit('ind-change', (e as CustomEvent<string>).detail);
      el.addEventListener('indInput', onInput);
      el.addEventListener('indChange', onChange);
      cleanup = () => {
        el.removeEventListener('indInput', onInput);
        el.removeEventListener('indChange', onChange);
      };
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h(
        'ind-input',
        {
          ref: elRef,
          type: props.type,
          size: props.size,
          value: props.value,
          placeholder: props.placeholder,
          ...(props.disabled ? { disabled: true } : {}),
          ...(props.readonly ? { readonly: true } : {}),
          ...(props.invalid ? { invalid: true } : {}),
          label: props.label,
          name: props.name,
          min: props.min,
          max: props.max,
          step: props.step,
          pattern: props.pattern,
          autocomplete: props.autocomplete,
          mode: props.inputMode,
        },
        [slots.prefix?.(), slots.suffix?.()],
      );
  },
});

/* -------------------------------------------------------------------------- */
/* IndCheckbox                                                                */
/* -------------------------------------------------------------------------- */

export const IndCheckbox = defineComponent({
  name: 'IndCheckbox',
  props: {
    checked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: { type: String as PropType<CheckboxSize>, default: 'md' },
    label: { type: String, default: undefined },
    name: { type: String, default: undefined },
    value: { type: String, default: undefined },
  },
  emits: ['ind-change', 'update:checked'],
  setup(props, { emit }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value;
      if (!el) return;
      const handler = (e: Event) => {
        const detail = (e as CustomEvent<boolean>).detail;
        emit('ind-change', detail);
        emit('update:checked', detail);
      };
      el.addEventListener('indChange', handler);
      cleanup = () => el.removeEventListener('indChange', handler);
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h('ind-checkbox', {
        ref: elRef,
        ...(props.checked ? { checked: true } : {}),
        ...(props.indeterminate ? { indeterminate: true } : {}),
        ...(props.disabled ? { disabled: true } : {}),
        size: props.size,
        label: props.label,
        name: props.name,
        value: props.value,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndDivider                                                                 */
/* -------------------------------------------------------------------------- */

export const IndDivider = defineComponent({
  name: 'IndDivider',
  props: {
    orientation: { type: String as PropType<DividerOrientation>, default: 'horizontal' },
  },
  setup(props) {
    onMounted(() => ensureDefined());
    return () => h('ind-divider', { orientation: props.orientation });
  },
});

/* -------------------------------------------------------------------------- */
/* IndStatusDot                                                               */
/* -------------------------------------------------------------------------- */

export const IndStatusDot = defineComponent({
  name: 'IndStatusDot',
  props: {
    state: { type: String as PropType<StatusDotState>, default: 'neutral' },
    size: { type: String as PropType<StatusDotSize>, default: 'md' },
    blinking: { type: Boolean, default: false },
    label: { type: String, default: undefined },
  },
  setup(props) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-status-dot', {
        state: props.state,
        size: props.size,
        ...(props.blinking ? { blinking: true } : {}),
        label: props.label,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndProgress                                                                */
/* -------------------------------------------------------------------------- */

export const IndProgress = defineComponent({
  name: 'IndProgress',
  props: {
    value: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    variant: { type: String as PropType<ProgressVariant>, default: 'default' },
    size: { type: String as PropType<ProgressSize>, default: 'md' },
    label: { type: String, default: undefined },
    showValue: { type: Boolean, default: false },
    unit: { type: String, default: undefined },
    indeterminate: { type: Boolean, default: false },
  },
  setup(props) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-progress', {
        value: props.value,
        max: props.max,
        variant: props.variant,
        size: props.size,
        label: props.label,
        'show-value': props.showValue,
        unit: props.unit,
        ...(props.indeterminate ? { indeterminate: true } : {}),
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndSelect                                                                  */
/* -------------------------------------------------------------------------- */

export const IndSelect = defineComponent({
  name: 'IndSelect',
  props: {
    options: { type: Array as PropType<SelectOption[]>, default: () => [] },
    value: { type: String, default: '' },
    placeholder: { type: String, default: undefined },
    label: { type: String, default: undefined },
    name: { type: String, default: undefined },
    size: { type: String as PropType<SelectSize>, default: 'md' },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
  },
  emits: ['ind-change', 'update:value'],
  setup(props, { emit }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value as (HTMLElement & { options?: SelectOption[] }) | null;
      if (!el) return;
      el.options = props.options;
      const handler = (e: Event) => {
        const detail = (e as CustomEvent<string>).detail;
        emit('ind-change', detail);
        emit('update:value', detail);
      };
      el.addEventListener('indChange', handler);
      cleanup = () => el.removeEventListener('indChange', handler);
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h('ind-select', {
        ref: elRef,
        value: props.value,
        placeholder: props.placeholder,
        label: props.label,
        name: props.name,
        size: props.size,
        ...(props.disabled ? { disabled: true } : {}),
        ...(props.invalid ? { invalid: true } : {}),
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndTextarea                                                                */
/* -------------------------------------------------------------------------- */

export const IndTextarea = defineComponent({
  name: 'IndTextarea',
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: undefined },
    label: { type: String, default: undefined },
    name: { type: String, default: undefined },
    rows: { type: Number, default: 4 },
    size: { type: String as PropType<TextareaSize>, default: 'md' },
    variant: { type: String as PropType<TextareaVariant>, default: 'default' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    autoScroll: { type: Boolean, default: false },
  },
  emits: ['ind-input', 'ind-change', 'update:value'],
  setup(props, { emit }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value;
      if (!el) return;
      const onInput = (e: Event) => {
        const detail = (e as CustomEvent<string>).detail;
        emit('ind-input', detail);
        emit('update:value', detail);
      };
      const onChange = (e: Event) => emit('ind-change', (e as CustomEvent<string>).detail);
      el.addEventListener('indInput', onInput);
      el.addEventListener('indChange', onChange);
      cleanup = () => {
        el.removeEventListener('indInput', onInput);
        el.removeEventListener('indChange', onChange);
      };
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h('ind-textarea', {
        ref: elRef,
        value: props.value,
        placeholder: props.placeholder,
        label: props.label,
        name: props.name,
        rows: props.rows,
        size: props.size,
        variant: props.variant,
        ...(props.disabled ? { disabled: true } : {}),
        ...(props.readonly ? { readonly: true } : {}),
        ...(props.invalid ? { invalid: true } : {}),
        'auto-scroll': props.autoScroll,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndDialog                                                                  */
/* -------------------------------------------------------------------------- */

export const IndDialog = defineComponent({
  name: 'IndDialog',
  props: {
    open: { type: Boolean, default: false },
    heading: { type: String, default: undefined },
    size: { type: String as PropType<DialogSize>, default: 'md' },
    closeOnBackdrop: { type: Boolean, default: true },
  },
  emits: ['ind-open', 'ind-close', 'update:open'],
  setup(props, { emit, slots }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value;
      if (!el) return;
      const onOpen = () => emit('ind-open');
      const onClose = () => {
        emit('ind-close');
        emit('update:open', false);
      };
      el.addEventListener('indOpen', onOpen);
      el.addEventListener('indClose', onClose);
      cleanup = () => {
        el.removeEventListener('indOpen', onOpen);
        el.removeEventListener('indClose', onClose);
      };
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h(
        'ind-dialog',
        {
          ref: elRef,
          heading: props.heading,
          size: props.size,
          ...(props.open ? { open: true } : {}),
          'close-on-backdrop': props.closeOnBackdrop,
        },
        [
          slots.default?.(),
          slots.footer ? h('div', { slot: 'footer' }, slots.footer()) : null,
        ],
      );
  },
});

/* -------------------------------------------------------------------------- */
/* IndNavItem                                                                 */
/* -------------------------------------------------------------------------- */

export const IndNavItem = defineComponent({
  name: 'IndNavItem',
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    href: { type: String, default: undefined },
    badge: { type: [String, Number], default: undefined },
  },
  emits: ['ind-select'],
  setup(props, { emit, slots }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value;
      if (!el) return;
      const handler = () => emit('ind-select');
      el.addEventListener('indSelect', handler);
      cleanup = () => el.removeEventListener('indSelect', handler);
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h(
        'ind-nav-item',
        {
          ref: elRef,
          label: props.label,
          href: props.href,
          badge: props.badge,
          ...(props.active ? { active: true } : {}),
          ...(props.disabled ? { disabled: true } : {}),
        },
        slots.default?.(),
      );
  },
});

/* -------------------------------------------------------------------------- */
/* IndHealthCard                                                              */
/* -------------------------------------------------------------------------- */

export const IndHealthCard = defineComponent({
  name: 'IndHealthCard',
  props: {
    heading: { type: String, required: true },
    state: { type: String as PropType<HealthState>, default: 'unknown' },
    stateLabel: { type: String, default: undefined },
    detail: { type: String, default: undefined },
  },
  setup(props) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-health-card', {
        heading: props.heading,
        state: props.state,
        'state-label': props.stateLabel,
        detail: props.detail,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndFillRow                                                                 */
/* -------------------------------------------------------------------------- */

export const IndFillRow = defineComponent({
  name: 'IndFillRow',
  props: {
    tag: { type: String, default: undefined },
    label: { type: String, required: true },
    value: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    unit: { type: String, default: '%' },
    variant: { type: String as PropType<FillRowVariant>, default: 'default' },
    severity: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    onMounted(() => ensureDefined());
    return () =>
      h(
        'ind-fill-row',
        {
          tag: props.tag,
          label: props.label,
          value: props.value,
          max: props.max,
          unit: props.unit,
          variant: props.variant,
          ...(props.severity ? { severity: true } : {}),
        },
        slots.default?.(),
      );
  },
});

/* -------------------------------------------------------------------------- */
/* IndToolbarAction                                                           */
/* -------------------------------------------------------------------------- */

export const IndToolbarAction = defineComponent({
  name: 'IndToolbarAction',
  props: {
    counter: { type: [String, Number], default: undefined },
  },
  setup(props, { slots }) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-toolbar-action', { counter: props.counter }, [
        slots.filter ? h('div', { slot: 'filter' }, slots.filter()) : null,
        slots.flags ? h('div', { slot: 'flags' }, slots.flags()) : null,
        slots.actions ? h('div', { slot: 'actions' }, slots.actions()) : null,
      ]);
  },
});

/* -------------------------------------------------------------------------- */
/* IndAppHeader                                                               */
/* -------------------------------------------------------------------------- */

export const IndAppHeader = defineComponent({
  name: 'IndAppHeader',
  props: {
    brand: { type: String, required: true },
    subBrand: { type: String, default: undefined },
    machineId: { type: String, default: undefined },
    mqttState: { type: String as PropType<AppHeaderConnectionState>, default: 'neutral' },
    mqttLabel: { type: String, default: undefined },
    version: { type: String, default: undefined },
    docsUrl: { type: String, default: undefined },
    hideChangeMachine: { type: Boolean, default: false },
    hideDisconnect: { type: Boolean, default: false },
  },
  emits: ['ind-change-machine', 'ind-disconnect'],
  setup(props, { emit, slots }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value;
      if (!el) return;
      const onChange = () => emit('ind-change-machine');
      const onDisc = () => emit('ind-disconnect');
      el.addEventListener('indChangeMachine', onChange);
      el.addEventListener('indDisconnect', onDisc);
      cleanup = () => {
        el.removeEventListener('indChangeMachine', onChange);
        el.removeEventListener('indDisconnect', onDisc);
      };
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h(
        'ind-app-header',
        {
          ref: elRef,
          brand: props.brand,
          'sub-brand': props.subBrand,
          'machine-id': props.machineId,
          'mqtt-state': props.mqttState,
          'mqtt-label': props.mqttLabel,
          version: props.version,
          'docs-url': props.docsUrl,
          ...(props.hideChangeMachine ? { 'hide-change-machine': true } : {}),
          ...(props.hideDisconnect ? { 'hide-disconnect': true } : {}),
        },
        [
          slots.logo ? h('div', { slot: 'logo' }, slots.logo()) : null,
          slots.actions ? h('div', { slot: 'actions' }, slots.actions()) : null,
        ],
      );
  },
});

/* -------------------------------------------------------------------------- */
/* IndSidebarNav                                                              */
/* -------------------------------------------------------------------------- */

export const IndSidebarNav = defineComponent({
  name: 'IndSidebarNav',
  setup(_, { slots }) {
    onMounted(() => ensureDefined());
    return () =>
      h('ind-sidebar-nav', null, [
        slots.brand ? h('div', { slot: 'brand' }, slots.brand()) : null,
        slots.default?.(),
        slots.footer ? h('div', { slot: 'footer' }, slots.footer()) : null,
      ]);
  },
});

/* -------------------------------------------------------------------------- */
/* IndMqttMonitor                                                             */
/* -------------------------------------------------------------------------- */

export const IndMqttMonitor = defineComponent({
  name: 'IndMqttMonitor',
  props: {
    log: { type: String, default: '' },
    filterValue: { type: String, default: '' },
    paused: { type: Boolean, default: false },
    rows: { type: Number, default: 18 },
  },
  emits: ['ind-filter-change', 'ind-pause-change', 'ind-clear', 'update:filterValue', 'update:paused'],
  setup(props, { emit }) {
    const elRef = ref<HTMLElement | null>(null);
    let cleanup: (() => void) | null = null;

    onMounted(() => {
      ensureDefined();
      const el = elRef.value;
      if (!el) return;
      const onFilter = (e: Event) => {
        const detail = (e as CustomEvent<string>).detail;
        emit('ind-filter-change', detail);
        emit('update:filterValue', detail);
      };
      const onPause = (e: Event) => {
        const detail = (e as CustomEvent<boolean>).detail;
        emit('ind-pause-change', detail);
        emit('update:paused', detail);
      };
      const onClear = () => emit('ind-clear');
      el.addEventListener('indFilterChange', onFilter);
      el.addEventListener('indPauseChange', onPause);
      el.addEventListener('indClear', onClear);
      cleanup = () => {
        el.removeEventListener('indFilterChange', onFilter);
        el.removeEventListener('indPauseChange', onPause);
        el.removeEventListener('indClear', onClear);
      };
    });

    onBeforeUnmount(() => cleanup?.());

    return () =>
      h('ind-mqtt-monitor', {
        ref: elRef,
        log: props.log,
        'filter-value': props.filterValue,
        ...(props.paused ? { paused: true } : {}),
        rows: props.rows,
      });
  },
});

/* -------------------------------------------------------------------------- */
/* IndStatusBar                                                               */
/* -------------------------------------------------------------------------- */

export const IndStatusBar = defineComponent({
  name: 'IndStatusBar',
  props: {
    state: { type: String as PropType<StatusBarState>, default: 'neutral' },
    message: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    onMounted(() => ensureDefined());
    return () =>
      h(
        'ind-status-bar',
        { state: props.state, message: props.message },
        slots.default?.(),
      );
  },
});

/* -------------------------------------------------------------------------- */
/* IndScaraCanvas                                                             */
/* -------------------------------------------------------------------------- */

export const IndScaraCanvas = defineComponent({
  name: 'IndScaraCanvas',
  props: {
    joints: { type: Array as PropType<number[]>, default: () => [0, 0, 0] },
    linkLengths: { type: Array as PropType<number[]>, default: () => [110, 90] },
    state: { type: String as PropType<ScaraState>, default: 'idle' },
  },
  setup(props) {
    const elRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      ensureDefined();
      const el = elRef.value as (HTMLElement & { joints?: number[]; linkLengths?: number[] }) | null;
      if (!el) return;
      el.joints = props.joints;
      el.linkLengths = props.linkLengths;
    });

    return () => h('ind-scara-canvas', { ref: elRef, state: props.state });
  },
});

/* -------------------------------------------------------------------------- */
/* IndShelfCanvas                                                             */
/* -------------------------------------------------------------------------- */

export const IndShelfCanvas = defineComponent({
  name: 'IndShelfCanvas',
  props: {
    slots: { type: Array as PropType<ShelfSlot[]>, default: () => [] },
    rows: { type: Number, default: 1 },
    cols: { type: Number, default: 4 },
    heading: { type: String, default: undefined },
  },
  setup(props) {
    const elRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      ensureDefined();
      const el = elRef.value as (HTMLElement & { slots?: ShelfSlot[] }) | null;
      if (!el) return;
      el.slots = props.slots;
    });

    return () =>
      h('ind-shelf-canvas', {
        ref: elRef,
        rows: props.rows,
        cols: props.cols,
        heading: props.heading,
      });
  },
});

export type {
  LedSize,
  LedState,
  ValueAlarm,
  ValueTrend,
  ValueSize,
  AlarmPriority,
  ValveState,
  ValveOrientation,
  ValveSize,
  ButtonVariant,
  ButtonSize,
  InputType,
  InputSize,
  InputMode,
  CheckboxSize,
  DividerOrientation,
  StatusDotState,
  StatusDotSize,
  ProgressVariant,
  ProgressSize,
  SelectOption,
  SelectSize,
  TextareaSize,
  TextareaVariant,
  DialogSize,
  HealthState,
  FillRowVariant,
  AppHeaderConnectionState,
  StatusBarState,
  ScaraState,
  ShelfSlot,
};
