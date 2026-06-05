# ind-shelf-canvas



<!-- Auto Generated Below -->


## Overview

Grid of bottle/container slots showing their fill level. Generic — represents
any rack of resupplyable containers (bottles, cartridges, kegs, etc.).

  <ind-shelf-canvas
    .slots=${[{id:'a', label:'A', level:78}, {id:'b', label:'B', level:12}]}
    cols="2"></ind-shelf-canvas>

## Properties

| Property  | Attribute | Description | Type                    | Default     |
| --------- | --------- | ----------- | ----------------------- | ----------- |
| `cols`    | `cols`    |             | `number`                | `4`         |
| `heading` | `heading` |             | `string \| undefined`   | `undefined` |
| `rows`    | `rows`    |             | `number`                | `1`         |
| `slots`   | `slots`   |             | `ShelfSlot[] \| string` | `[]`        |


## Shadow Parts

| Part    | Description |
| ------- | ----------- |
| `"svg"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
