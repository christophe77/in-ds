# ind-virtual-keyboard



<!-- Auto Generated Below -->


## Overview

Touchscreen on-screen keyboard, docked at the bottom of the viewport.

Mount ONE instance at the app root. A global focus listener detects the focused
editable field — including the inner `<input>` inside another web component's shadow
DOM (via `composedPath`) — and drives it by mutating its value and dispatching native
`input`/`change` events, so any framework's controlled input picks the change up
through its usual handler. No per-field wiring.

Activation is a CONTROLLED prop: the host app owns the `enabled` boolean (and any
persistence) and toggles it — e.g. from a header button. When disabled the listener
no-ops and any open keyboard closes.

## Properties

| Property  | Attribute | Description                                                                | Type                   | Default    |
| --------- | --------- | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| `enabled` | `enabled` | Master switch. Controlled by the app; when false the keyboard never shows. | `boolean`              | `false`    |
| `locale`  | `locale`  | Alpha layout for the text keyboard. Numeric keypad is locale-independent.  | `"azerty" \| "qwerty"` | `'azerty'` |


## Events

| Event             | Description                                           | Type                |
| ----------------- | ----------------------------------------------------- | ------------------- |
| `indKeyboardHide` | Fires when the keyboard closes.                       | `CustomEvent<void>` |
| `indKeyboardShow` | Fires when the keyboard opens (a field gained focus). | `CustomEvent<void>` |


## Methods

### `hide() => Promise<void>`

Programmatically close the keyboard (e.g. on navigation).

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"bar"`  |             |
| `"keys"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
