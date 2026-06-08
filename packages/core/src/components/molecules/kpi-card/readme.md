# ind-kpi-card



<!-- Auto Generated Below -->


## Overview

Headline KPI: a large value with an optional delta and trend arrow. The
`variant` colors the delta (good = green, bad = red) independently of the
arrow direction, since "down" is not always bad.

## Properties

| Property             | Attribute   | Description                                  | Type                                 | Default     |
| -------------------- | ----------- | -------------------------------------------- | ------------------------------------ | ----------- |
| `delta`              | `delta`     | Delta caption (e.g. "+2.3 % vs last shift"). | `string \| undefined`                | `undefined` |
| `label` _(required)_ | `label`     | KPI name (e.g. "OEE", "Throughput").         | `string`                             | `undefined` |
| `precision`          | `precision` | Decimal places when numeric.                 | `number \| undefined`                | `undefined` |
| `trend`              | `trend`     | Trend direction shown as an arrow.           | `"down" \| "flat" \| "none" \| "up"` | `'none'`    |
| `unit`               | `unit`      | Engineering unit (e.g. "%", "u/h").          | `string \| undefined`                | `undefined` |
| `value` _(required)_ | `value`     | Primary value.                               | `number \| string`                   | `undefined` |
| `variant`            | `variant`   | Semantic color of the delta.                 | `"bad" \| "good" \| "neutral"`       | `'neutral'` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"arrow"`   |             |
| `"delta"`   |             |
| `"label"`   |             |
| `"number"`  |             |
| `"readout"` |             |
| `"unit"`    |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
