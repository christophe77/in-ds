# ind-pump-control-panel



<!-- Auto Generated Below -->


## Overview

Pump control panel: `<ind-pump-card>` faceplate plus start/stop and mode.

## Properties

| Property   | Attribute  | Description | Type                                                              | Default     |
| ---------- | ---------- | ----------- | ----------------------------------------------------------------- | ----------- |
| `flow`     | `flow`     |             | `number \| undefined`                                             | `undefined` |
| `heading`  | `heading`  |             | `string`                                                          | `'Pump'`    |
| `mode`     | `mode`     |             | `string \| undefined`                                             | `undefined` |
| `pressure` | `pressure` |             | `number \| undefined`                                             | `undefined` |
| `state`    | `state`    |             | `"fault" \| "maintenance" \| "running" \| "stopped" \| "warning"` | `'stopped'` |
| `tag`      | `tag`      |             | `string \| undefined`                                             | `undefined` |


## Events

| Event      | Description | Type                  |
| ---------- | ----------- | --------------------- |
| `indMode`  |             | `CustomEvent<string>` |
| `indStart` |             | `CustomEvent<void>`   |
| `indStop`  |             | `CustomEvent<void>`   |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"heading"` |             |


## Dependencies

### Depends on

- [ind-pump-card](../../molecules/pump-card)
- [ind-start-stop-control](../../molecules/start-stop-control)
- [ind-mode-selector](../../molecules/mode-selector)

### Graph
```mermaid
graph TD;
  ind-pump-control-panel --> ind-pump-card
  ind-pump-control-panel --> ind-start-stop-control
  ind-pump-control-panel --> ind-mode-selector
  ind-pump-card --> ind-pump
  ind-pump-card --> ind-value
  ind-start-stop-control --> ind-led
  ind-start-stop-control --> ind-button
  ind-mode-selector --> ind-selector-switch
  style ind-pump-control-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
