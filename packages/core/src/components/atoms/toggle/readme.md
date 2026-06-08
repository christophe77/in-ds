# ind-toggle



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                              | Type                   | Default     |
| ---------- | ---------- | ---------------------------------------- | ---------------------- | ----------- |
| `checked`  | `checked`  | On/off state.                            | `boolean`              | `false`     |
| `disabled` | `disabled` | Disabled.                                | `boolean`              | `false`     |
| `label`    | `label`    | Visible label. Also the accessible name. | `string \| undefined`  | `undefined` |
| `size`     | `size`     | Size.                                    | `"lg" \| "md" \| "sm"` | `'md'`      |
| `textOff`  | `text-off` | Text shown for the off state (in-track). | `string \| undefined`  | `undefined` |
| `textOn`   | `text-on`  | Text shown for the on state (in-track).  | `string \| undefined`  | `undefined` |


## Events

| Event       | Description                   | Type                   |
| ----------- | ----------------------------- | ---------------------- |
| `indChange` | Fires when the state changes. | `CustomEvent<boolean>` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"control"` |             |
| `"label"`   |             |
| `"text"`    |             |
| `"thumb"`   |             |
| `"track"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
