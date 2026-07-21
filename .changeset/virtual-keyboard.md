---
"@ind-ds/core": minor
"@ind-ds/react": minor
"@ind-ds/vue": minor
---

Add `ind-virtual-keyboard` organism — a touchscreen on-screen keyboard docked at the
bottom of the viewport for kiosks with no physical keyboard.

Mount one instance at the app root. A global focus listener detects the focused editable
field (including the inner `<input>` inside another component's shadow DOM) and drives it
via native `input`/`change` events, so any framework's controlled input updates through its
usual handler — no per-field wiring. Activation is a controlled `enabled` prop (the app owns
the on/off state and any persistence). Props: `enabled`, `locale` ('azerty' | 'qwerty').
Emits `indKeyboardShow` / `indKeyboardHide`; exposes a `hide()` method. Picks an alpha or
numeric layout from each field's `type` / `inputmode`.
