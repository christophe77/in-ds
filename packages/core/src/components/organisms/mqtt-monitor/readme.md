# ind-mqtt-monitor



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                     | Type      | Default |
| ------------- | -------------- | --------------------------------------------------------------- | --------- | ------- |
| `filterValue` | `filter-value` | Active filter — substring match on each line, case-insensitive. | `string`  | `''`    |
| `log`         | `log`          | Full log content. Newline-separated lines.                      | `string`  | `''`    |
| `paused`      | `paused`       | When true, the log doesn't auto-scroll on new content.          | `boolean` | `false` |
| `rows`        | `rows`         | Visible rows of the log textarea.                               | `number`  | `18`    |


## Events

| Event             | Description | Type                   |
| ----------------- | ----------- | ---------------------- |
| `indClear`        |             | `CustomEvent<void>`    |
| `indFilterChange` |             | `CustomEvent<string>`  |
| `indPauseChange`  |             | `CustomEvent<boolean>` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"clear"`   |             |
| `"counter"` |             |
| `"filter"`  |             |
| `"log"`     |             |
| `"toolbar"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
