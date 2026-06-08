# ind-audit-row



<!-- Auto Generated Below -->


## Overview

One line in an audit trail (21 CFR Part 11 style): timestamp, user, action
and an optional before/after detail. Read-only.

## Properties

| Property              | Attribute | Description                                            | Type                  | Default     |
| --------------------- | --------- | ------------------------------------------------------ | --------------------- | ----------- |
| `action` _(required)_ | `action`  | Action performed (e.g. "Setpoint change").             | `string`              | `undefined` |
| `detail`              | `detail`  | Detail / before→after (e.g. "PIC-101: 3.2 → 4.0 bar"). | `string \| undefined` | `undefined` |
| `time`                | `time`    | Pre-formatted timestamp.                               | `string \| undefined` | `undefined` |
| `user` _(required)_   | `user`    | Operator / account that performed the action.          | `string`              | `undefined` |


## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"action"` |             |
| `"detail"` |             |
| `"time"`   |             |
| `"user"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
