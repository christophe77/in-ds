# ind-nav-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                              | Type                            | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| `active`   | `active`   | Current page indicator — gets the ▶ prefix and active styling.                           | `boolean`                       | `false`     |
| `badge`    | `badge`    | Optional badge — alarm count, unread messages, etc.                                      | `number \| string \| undefined` | `undefined` |
| `disabled` | `disabled` |                                                                                          | `boolean`                       | `false`     |
| `href`     | `href`     | Optional href. When set, renders as `<a>` so middle-click / right-click open in new tab. | `string \| undefined`           | `undefined` |
| `label`    | `label`    | Label text. Falls back to slotted content.                                               | `string \| undefined`           | `undefined` |


## Events

| Event       | Description                                                               | Type                |
| ----------- | ------------------------------------------------------------------------- | ------------------- |
| `indSelect` | Fires on click (or Enter / Space). Use this to drive client-side routers. | `CustomEvent<void>` |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"badge"`     |             |
| `"content"`   |             |
| `"indicator"` |             |
| `"item"`      |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
