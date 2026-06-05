# ind-status-dot



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                 | Type                                                                                                             | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| `blinking` | `blinking` |                                                                                                                                             | `boolean`                                                                                                        | `false`     |
| `label`    | `label`    | Optional accessible name. Set when the dot stands alone; leave undefined when it's paired with adjacent text that already names the status. | `string \| undefined`                                                                                            | `undefined` |
| `size`     | `size`     |                                                                                                                                             | `"lg" \| "md" \| "sm"`                                                                                           | `'md'`      |
| `state`    | `state`    |                                                                                                                                             | `"error" \| "fault" \| "info" \| "maintenance" \| "neutral" \| "running" \| "stopped" \| "success" \| "warning"` | `'neutral'` |


## Dependencies

### Used by

 - [ind-health-card](../../molecules/health-card)

### Graph
```mermaid
graph TD;
  ind-health-card --> ind-status-dot
  style ind-status-dot fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
