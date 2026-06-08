# ind-gauge



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                   | Type                   | Default     |
| ----------- | ----------- | ----------------------------------------------------------------------------- | ---------------------- | ----------- |
| `label`     | `label`     | Label / tag rendered under the value.                                         | `string \| undefined`  | `undefined` |
| `max`       | `max`       | Scale maximum.                                                                | `number`               | `100`       |
| `min`       | `min`       | Scale minimum.                                                                | `number`               | `0`         |
| `precision` | `precision` | Decimal places for the value.                                                 | `number \| undefined`  | `undefined` |
| `size`      | `size`      | Size.                                                                         | `"lg" \| "md" \| "sm"` | `'md'`      |
| `unit`      | `unit`      | Engineering unit.                                                             | `string \| undefined`  | `undefined` |
| `value`     | `value`     | Current value.                                                                | `number`               | `0`         |
| `zones`     | --          | Colored zones along the arc (e.g. green/amber/red bands). Pass as a property. | `GaugeZone[]`          | `[]`        |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"gauge"`   |             |
| `"label"`   |             |
| `"needle"`  |             |
| `"number"`  |             |
| `"readout"` |             |
| `"track"`   |             |
| `"unit"`    |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
