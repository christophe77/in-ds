# ind-estop



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                               | Type                   | Default     |
| ---------- | ---------- | --------------------------------------------------------- | ---------------------- | ----------- |
| `disabled` | `disabled` | Disabled.                                                 | `boolean`              | `false`     |
| `engaged`  | `engaged`  | Whether the mushroom button is latched (pressed/engaged). | `boolean`              | `false`     |
| `label`    | `label`    | Visible caption. Defaults to "EMERGENCY STOP".            | `string \| undefined`  | `undefined` |
| `size`     | `size`     | Size.                                                     | `"lg" \| "md" \| "sm"` | `'md'`      |


## Events

| Event         | Description                                             | Type                |
| ------------- | ------------------------------------------------------- | ------------------- |
| `indActivate` | Fires when pressed to engage the stop.                  | `CustomEvent<void>` |
| `indReset`    | Fires when reset (twist-release) from an engaged state. | `CustomEvent<void>` |


## Shadow Parts

| Part         | Description |
| ------------ | ----------- |
| `"button"`   |             |
| `"caption"`  |             |
| `"mushroom"` |             |
| `"ring"`     |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
