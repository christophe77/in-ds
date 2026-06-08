# ind-energy-dashboard



<!-- Auto Generated Below -->


## Overview

Energy dashboard. A headline total in the header and a grid of slotted
`<ind-energy-card>` / KPI molecules below.

## Properties

| Property     | Attribute     | Description                               | Type                  | Default     |
| ------------ | ------------- | ----------------------------------------- | --------------------- | ----------- |
| `columns`    | `columns`     | Number of grid columns.                   | `number`              | `3`         |
| `heading`    | `heading`     |                                           | `string`              | `'Energy'`  |
| `totalLabel` | `total-label` | Headline total label (e.g. "Site total"). | `string \| undefined` | `undefined` |
| `totalUnit`  | `total-unit`  | Headline total unit.                      | `string`              | `'kW'`      |
| `totalValue` | `total-value` | Headline total value.                     | `number \| undefined` | `undefined` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"grid"`    |             |
| `"heading"` |             |
| `"total"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
