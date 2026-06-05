# ind-textarea



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                       | Type                   | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `autoScroll`  | `auto-scroll` | When true, auto-scrolls to bottom whenever `value` changes. Pair with `readonly` for log streams. | `boolean`              | `false`     |
| `disabled`    | `disabled`    |                                                                                                   | `boolean`              | `false`     |
| `invalid`     | `invalid`     |                                                                                                   | `boolean`              | `false`     |
| `label`       | `label`       |                                                                                                   | `string \| undefined`  | `undefined` |
| `name`        | `name`        |                                                                                                   | `string \| undefined`  | `undefined` |
| `placeholder` | `placeholder` |                                                                                                   | `string \| undefined`  | `undefined` |
| `readonly`    | `readonly`    |                                                                                                   | `boolean`              | `false`     |
| `rows`        | `rows`        |                                                                                                   | `number`               | `4`         |
| `size`        | `size`        |                                                                                                   | `"lg" \| "md" \| "sm"` | `'md'`      |
| `value`       | `value`       |                                                                                                   | `string`               | `''`        |
| `variant`     | `variant`     | `mono` swaps to JetBrains Mono and small font — for logs and MQTT streams.                        | `"default" \| "mono"`  | `'default'` |


## Events

| Event       | Description | Type                  |
| ----------- | ----------- | --------------------- |
| `indChange` |             | `CustomEvent<string>` |
| `indInput`  |             | `CustomEvent<string>` |


## Shadow Parts

| Part         | Description |
| ------------ | ----------- |
| `"label"`    |             |
| `"textarea"` |             |
| `"wrap"`     |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
