# ind-datetime-picker



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                  | Type                                                        | Default            |
| ---------- | ---------- | -------------------------------------------- | ----------------------------------------------------------- | ------------------ |
| `disabled` | `disabled` | Disabled.                                    | `boolean`                                                   | `false`            |
| `invalid`  | `invalid`  | Invalid state.                               | `boolean`                                                   | `false`            |
| `label`    | `label`    | Visible label.                               | `string \| undefined`                                       | `undefined`        |
| `max`      | `max`      | Max bound (ISO).                             | `string \| undefined`                                       | `undefined`        |
| `min`      | `min`      | Min bound (ISO).                             | `string \| undefined`                                       | `undefined`        |
| `mode`     | `mode`     | Picker mode (maps to the native input type). | `"date" \| "datetime-local" \| "month" \| "time" \| "week"` | `'datetime-local'` |
| `name`     | `name`     | Field name (forms).                          | `string \| undefined`                                       | `undefined`        |
| `size`     | `size`     | Size.                                        | `"lg" \| "md" \| "sm"`                                      | `'md'`             |
| `step`     | `step`     | Step (seconds for time-based modes).         | `number \| string \| undefined`                             | `undefined`        |
| `value`    | `value`    | Current ISO value.                           | `string`                                                    | `''`               |


## Events

| Event       | Description      | Type                  |
| ----------- | ---------------- | --------------------- |
| `indChange` | Fires on commit. | `CustomEvent<string>` |


## Shadow Parts

| Part      | Description |
| --------- | ----------- |
| `"input"` |             |
| `"label"` |             |
| `"wrap"`  |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
