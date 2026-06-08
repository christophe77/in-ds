# ind-xy-point



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                          | Type                                             | Default     |
| --------- | --------- | ------------------------------------------------------------------------------------ | ------------------------------------------------ | ----------- |
| `label`   | `label`   | Accessible label.                                                                    | `string \| undefined`                            | `undefined` |
| `trail`   | --        | Optional trail of past points, oldest → newest, as [x, y] pairs. Pass as a property. | `[number, number][]`                             | `[]`        |
| `variant` | `variant` | Color intent of the point.                                                           | `"default" \| "fault" \| "running" \| "warning"` | `'default'` |
| `x`       | `x`       | X value of the operating point.                                                      | `number`                                         | `0`         |
| `xMax`    | `x-max`   |                                                                                      | `number`                                         | `100`       |
| `xMin`    | `x-min`   | X axis bounds.                                                                       | `number`                                         | `0`         |
| `y`       | `y`       | Y value of the operating point.                                                      | `number`                                         | `0`         |
| `yMax`    | `y-max`   |                                                                                      | `number`                                         | `100`       |
| `yMin`    | `y-min`   | Y axis bounds.                                                                       | `number`                                         | `0`         |


## Shadow Parts

| Part      | Description |
| --------- | ----------- |
| `"plot"`  |             |
| `"point"` |             |
| `"trail"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
