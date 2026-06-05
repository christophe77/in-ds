# ind-dialog



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                      | Type                   | Default     |
| ----------------- | ------------------- | ---------------------------------------------------------------- | ---------------------- | ----------- |
| `closeOnBackdrop` | `close-on-backdrop` | Close when the operator clicks outside the dialog content.       | `boolean`              | `true`      |
| `heading`         | `heading`           | Heading rendered in the header bar. Becomes the accessible name. | `string \| undefined`  | `undefined` |
| `open`            | `open`              | Open state. Two-way reflectable.                                 | `boolean`              | `false`     |
| `size`            | `size`              | Size of the dialog content.                                      | `"lg" \| "md" \| "sm"` | `'md'`      |


## Events

| Event      | Description                                                                            | Type                |
| ---------- | -------------------------------------------------------------------------------------- | ------------------- |
| `indClose` | Fires when the dialog closes — for any reason (ESC, backdrop, close button, .close()). | `CustomEvent<void>` |
| `indOpen`  |                                                                                        | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Programmatically close.

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Programmatically open.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"body"`    |             |
| `"close"`   |             |
| `"content"` |             |
| `"dialog"`  |             |
| `"footer"`  |             |
| `"header"`  |             |
| `"heading"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
