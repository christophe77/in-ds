# ind-sidebar-group



<!-- Auto Generated Below -->


## Overview

Collapsible heading for a section of the navigation sidebar. Slot
`<ind-nav-item>`s into the default slot; the group provides the section
title and an expand/collapse affordance.

## Properties

| Property             | Attribute   | Description                                               | Type                            | Default     |
| -------------------- | ----------- | --------------------------------------------------------- | ------------------------------- | ----------- |
| `badge`              | `badge`     | Optional count badge (e.g. active alarms in the section). | `number \| string \| undefined` | `undefined` |
| `collapsed`          | `collapsed` | Collapsed state (two-way).                                | `boolean`                       | `false`     |
| `label` _(required)_ | `label`     | Section title.                                            | `string`                        | `undefined` |


## Events

| Event       | Description                                   | Type                   |
| ----------- | --------------------------------------------- | ---------------------- |
| `indToggle` | Fires with the new collapsed state on toggle. | `CustomEvent<boolean>` |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"badge"`   |             |
| `"chevron"` |             |
| `"header"`  |             |
| `"items"`   |             |
| `"label"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
