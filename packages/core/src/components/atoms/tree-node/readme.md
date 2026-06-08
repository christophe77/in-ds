# ind-tree-node



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                            | Type                  | Default     |
| ---------- | ---------- | ------------------------------------------------------ | --------------------- | ----------- |
| `expanded` | `expanded` | Expanded state (ignored for leaf nodes).               | `boolean`             | `false`     |
| `label`    | `label`    | Visible text. Use the default slot for richer content. | `string \| undefined` | `undefined` |
| `leaf`     | `leaf`     | Leaf node — no twisty, not expandable.                 | `boolean`             | `false`     |
| `level`    | `level`    | Nesting depth (0 = root) — drives the indent.          | `number`              | `0`         |
| `selected` | `selected` | Selected state.                                        | `boolean`             | `false`     |


## Events

| Event       | Description                              | Type                   |
| ----------- | ---------------------------------------- | ---------------------- |
| `indSelect` | Fires when the row is selected.          | `CustomEvent<void>`    |
| `indToggle` | Fires when the twisty toggles expansion. | `CustomEvent<boolean>` |


## Shadow Parts

| Part         | Description |
| ------------ | ----------- |
| `"children"` |             |
| `"icon"`     |             |
| `"label"`    |             |
| `"row"`      |             |
| `"twisty"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
