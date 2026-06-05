# ind-alarm



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                  | Type                                          | Default     |
| -------------------- | -------------- | ------------------------------------------------------------ | --------------------------------------------- | ----------- |
| `acknowledged`       | `acknowledged` | When false, the chip blinks (per ISA-18.2 unack convention). | `boolean`                                     | `false`     |
| `label` _(required)_ | `label`        | Required human description of the alarm.                     | `string`                                      | `undefined` |
| `priority`           | `priority`     | ISA-18.2 alarm priority.                                     | `"high" \| "high-high" \| "low" \| "low-low"` | `'high'`    |
| `timestamp`          | `timestamp`    | Optional ISO-8601 timestamp. Rendered with `<time>`.         | `string \| undefined`                         | `undefined` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"badge"`     |             |
| `"label"`     |             |
| `"timestamp"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
