# ind-scara-canvas



<!-- Auto Generated Below -->


## Overview

2D top-down SCARA arm view. Pure presentational — pass joint angles and
link lengths, the component computes forward kinematics in SVG space.

  <ind-scara-canvas .joints=${[30, 45, 0]} state="moving"></ind-scara-canvas>

- `joints[0]` (J1) — shoulder rotation in degrees, 0 = +X axis
- `joints[1]` (J2) — elbow rotation in degrees, relative to link 1
- `joints[2]` (J3) — wrist (end effector) rotation, drives the small indicator

Z translation isn't represented — it would require a separate side view.

## Properties

| Property      | Attribute      | Description | Type                            | Default     |
| ------------- | -------------- | ----------- | ------------------------------- | ----------- |
| `joints`      | `joints`       |             | `number[] \| string`            | `[0, 0, 0]` |
| `linkLengths` | `link-lengths` |             | `number[] \| string`            | `[110, 90]` |
| `state`       | `state`        |             | `"fault" \| "idle" \| "moving"` | `'idle'`    |


## Shadow Parts

| Part    | Description |
| ------- | ----------- |
| `"svg"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
