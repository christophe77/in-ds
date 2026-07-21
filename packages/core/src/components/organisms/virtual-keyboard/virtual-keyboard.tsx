import { Component, Prop, State, Event, EventEmitter, Method, Watch, h, Host } from '@stencil/core';

export type VirtualKeyboardLocale = 'azerty' | 'qwerty';

/**
 * Touchscreen on-screen keyboard, docked at the bottom of the viewport.
 *
 * Mount ONE instance at the app root. A global focus listener detects the focused
 * editable field — including the inner `<input>` inside another web component's shadow
 * DOM (via `composedPath`) — and drives it by mutating its value and dispatching native
 * `input`/`change` events, so any framework's controlled input picks the change up
 * through its usual handler. No per-field wiring.
 *
 * Activation is a CONTROLLED prop: the host app owns the `enabled` boolean (and any
 * persistence) and toggles it — e.g. from a header button. When disabled the listener
 * no-ops and any open keyboard closes.
 */
@Component({
  tag: 'ind-virtual-keyboard',
  styleUrl: 'virtual-keyboard.css',
  shadow: true,
})
export class IndVirtualKeyboard {
  /** Master switch. Controlled by the app; when false the keyboard never shows. */
  @Prop() enabled = false;
  /** Alpha layout for the text keyboard. Numeric keypad is locale-independent. */
  @Prop() locale: VirtualKeyboardLocale = 'azerty';

  @State() private target: Editable | null = null;
  @State() private layout: Layout = 'text';
  @State() private caps = false;

  /** Fires when the keyboard opens (a field gained focus). */
  @Event() indKeyboardShow!: EventEmitter<void>;
  /** Fires when the keyboard closes. */
  @Event() indKeyboardHide!: EventEmitter<void>;

  @Watch('enabled')
  onEnabledChange(v: boolean) {
    if (!v) this.setTarget(null);
  }

  connectedCallback() {
    document.addEventListener('focusin', this.onFocusIn);
    document.addEventListener('focusout', this.onFocusOut);
  }

  disconnectedCallback() {
    document.removeEventListener('focusin', this.onFocusIn);
    document.removeEventListener('focusout', this.onFocusOut);
  }

  /** Programmatically close the keyboard (e.g. on navigation). */
  @Method()
  async hide(): Promise<void> {
    this.setTarget(null);
  }

  private setTarget(el: Editable | null) {
    const was = this.target;
    if (el === was) return;
    this.target = el;
    if (el && !was) this.indKeyboardShow.emit();
    else if (!el && was) this.indKeyboardHide.emit();
  }

  private onFocusIn = (e: FocusEvent) => {
    if (!this.enabled) return;
    const el = e.composedPath()[0];
    if (isEditable(el)) {
      this.setTarget(el);
      this.layout = pickLayout(el);
      this.caps = false;
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  private onFocusOut = () => {
    // Key taps keep focus (pointerdown preventDefault), so this only fires when focus
    // genuinely leaves. Defer one tick to read where it landed.
    window.setTimeout(() => {
      if (!this.enabled) {
        this.setTarget(null);
        return;
      }
      const active = deepActive();
      if (isEditable(active)) {
        this.setTarget(active);
        this.layout = pickLayout(active);
      } else {
        this.setTarget(null);
      }
    }, 0);
  };

  private press = (key: Key) => {
    const el = this.target;
    if (!el || !el.isConnected) {
      this.setTarget(null);
      return;
    }
    if (key.t === 'char') {
      insertText(el, this.caps ? key.v.toUpperCase() : key.v);
      if (this.caps) this.caps = false; // one-shot shift
      return;
    }
    switch (key.a) {
      case 'backspace':
        backspace(el);
        break;
      case 'space':
        insertText(el, ' ');
        break;
      case 'enter':
        commit(el);
        this.setTarget(null);
        break;
      case 'shift':
        this.caps = !this.caps;
        break;
      case 'layout':
        this.layout = this.layout === 'numeric' ? 'text' : 'numeric';
        break;
      case 'hide':
        el.blur();
        this.setTarget(null);
        break;
    }
  };

  render() {
    const open = this.target != null;
    const rows = this.layout === 'numeric' ? NUM_ROWS : textRows(this.locale);
    return (
      <Host
        class={{ 'is-open': open, 'is-numeric': this.layout === 'numeric' }}
        role="group"
        aria-label="On-screen keyboard"
        aria-hidden={open ? 'false' : 'true'}
      >
        {open && (
          <div class="bar" part="bar">
            <span class="grip" aria-hidden="true" />
            <button
              type="button"
              class="hide"
              tabIndex={-1}
              aria-label="Hide keyboard"
              onPointerDown={(e) => {
                e.preventDefault();
                this.press({ t: 'act', a: 'hide', label: '⌄' });
              }}
            >
              ⌄
            </button>
          </div>
        )}
        {open && (
          <div class="keys" part="keys">
            {rows.map((row, ri) => (
              <div class="row" key={ri}>
                {row.map((key, ki) => {
                  const label = key.t === 'char' ? (this.caps ? key.v.toUpperCase() : key.v) : key.label;
                  const isAct = key.t === 'act';
                  const held = key.t === 'act' && key.a === 'shift' && this.caps;
                  return (
                    <button
                      key={ki}
                      type="button"
                      tabIndex={-1}
                      class={{
                        key: true,
                        'key--act': isAct,
                        'key--enter': key.t === 'act' && key.a === 'enter',
                        'key--held': held,
                      }}
                      style={key.w ? { flexGrow: String(key.w) } : undefined}
                      aria-label={key.t === 'act' ? key.a : label}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        this.press(key);
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </Host>
    );
  }
}

/* ── Types & key model ─────────────────────────────────────────────────────── */

type Editable = HTMLInputElement | HTMLTextAreaElement;
type Layout = 'text' | 'numeric';

/** `<input>` types treated as free-text entry; anything else (checkbox, button…) is ignored. */
const EDITABLE_INPUT_TYPES = new Set(['text', 'search', 'url', 'tel', 'password', 'email', 'number']);

type Key =
  | { t: 'char'; v: string; w?: number }
  | { t: 'act'; a: 'backspace' | 'enter' | 'shift' | 'space' | 'layout' | 'hide'; label: string; w?: number };

const bk: Key = { t: 'act', a: 'backspace', label: '⌫', w: 1.5 };
const enter: Key = { t: 'act', a: 'enter', label: '⏎', w: 2 };
const shift: Key = { t: 'act', a: 'shift', label: '⇧', w: 1.5 };
const space: Key = { t: 'act', a: 'space', label: 'space', w: 5 };
const toNum: Key = { t: 'act', a: 'layout', label: '123', w: 1.5 };
const toAbc: Key = { t: 'act', a: 'layout', label: 'ABC', w: 1.5 };

function chars(s: string): Key[] {
  return [...s].map((v) => ({ t: 'char', v }) as Key);
}

function textRows(locale: VirtualKeyboardLocale): Key[][] {
  const qwerty = locale === 'qwerty';
  const r2 = qwerty ? 'qwertyuiop' : 'azertyuiop';
  const r3 = qwerty ? 'asdfghjkl' : 'qsdfghjklm';
  const r4 = qwerty ? 'zxcvbnm' : 'wxcvbn';
  return [
    chars('1234567890').concat(bk),
    chars(r2),
    chars(r3),
    [shift, ...chars(r4), { t: 'char', v: "'" }, { t: 'char', v: '-' }],
    [toNum, ...chars('@._:/'), space, enter],
  ];
}

const NUM_ROWS: Key[][] = [
  [...chars('789'), bk],
  [...chars('456'), { t: 'char', v: '.' }],
  [...chars('123'), { t: 'char', v: '-' }],
  [toAbc, { t: 'char', v: '0', w: 2 }, enter],
];

/* ── Field detection & text mutation ───────────────────────────────────────── */

/** Resolve `document.activeElement` through nested shadow roots to the real focused node. */
function deepActive(): Element | null {
  let el: Element | null = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

function isEditable(el: EventTarget | null | undefined): el is Editable {
  if (el instanceof HTMLTextAreaElement) return !el.readOnly && !el.disabled;
  if (el instanceof HTMLInputElement) {
    return EDITABLE_INPUT_TYPES.has(el.type) && !el.readOnly && !el.disabled;
  }
  return false;
}

function pickLayout(el: Editable): Layout {
  if (el instanceof HTMLInputElement) {
    if (el.type === 'number' || el.type === 'tel') return 'numeric';
    const mode = el.inputMode;
    if (mode === 'numeric' || mode === 'decimal' || mode === 'tel') return 'numeric';
  }
  return 'text';
}

/** Set `.value` via the native prototype setter so framework-controlled inputs see it. */
function setNativeValue(el: Editable, value: string): void {
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value')?.set?.call(el, value);
}

/** `<input type=number>` has no selection API and silently rejects invalid strings. */
function isNumberInput(el: Editable): boolean {
  return el instanceof HTMLInputElement && el.type === 'number';
}

function fireInput(el: Editable): void {
  // `window.Event` (not `Event`) — the bare name is shadowed by Stencil's `@Event` import.
  el.dispatchEvent(new window.Event('input', { bubbles: true, composed: true }));
}

function insertText(el: Editable, text: string): void {
  if (isNumberInput(el)) {
    const prev = el.value;
    setNativeValue(el, prev + text);
    if (el.value === '' && prev !== '') {
      setNativeValue(el, prev); // assignment rejected → revert, emit nothing
      return;
    }
    fireInput(el);
    return;
  }
  const start = el.selectionStart;
  const end = el.selectionEnd;
  if (start == null || end == null) {
    setNativeValue(el, el.value + text);
  } else {
    setNativeValue(el, el.value.slice(0, start) + text + el.value.slice(end));
    const pos = start + text.length;
    el.setSelectionRange(pos, pos);
  }
  fireInput(el);
}

function backspace(el: Editable): void {
  if (isNumberInput(el)) {
    setNativeValue(el, el.value.slice(0, -1));
    fireInput(el);
    return;
  }
  const start = el.selectionStart;
  const end = el.selectionEnd;
  if (start == null || end == null) {
    setNativeValue(el, el.value.slice(0, -1));
  } else if (start !== end) {
    setNativeValue(el, el.value.slice(0, start) + el.value.slice(end));
    el.setSelectionRange(start, start);
  } else if (start > 0) {
    setNativeValue(el, el.value.slice(0, start - 1) + el.value.slice(end));
    el.setSelectionRange(start - 1, start - 1);
  } else {
    return;
  }
  fireInput(el);
}

function commit(el: Editable): void {
  el.dispatchEvent(new window.Event('change', { bubbles: true, composed: true }));
  el.blur();
}
