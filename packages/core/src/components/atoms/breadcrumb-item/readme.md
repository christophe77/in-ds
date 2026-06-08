# ind-breadcrumb-item



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                   | Type                  | Default     |
| --------- | --------- | ------------------------------------------------------------- | --------------------- | ----------- |
| `current` | `current` | Marks the current page (last crumb) — not interactive.        | `boolean`             | `false`     |
| `href`    | `href`    | Navigation target. When omitted the item renders as a button. | `string \| undefined` | `undefined` |
| `last`    | `last`    | Hide the trailing separator (set on the last item).           | `boolean`             | `false`     |


## Events

| Event         | Description                                 | Type                |
| ------------- | ------------------------------------------- | ------------------- |
| `indNavigate` | Fires when a non-current item is activated. | `CustomEvent<void>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"crumb"`     |             |
| `"separator"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
