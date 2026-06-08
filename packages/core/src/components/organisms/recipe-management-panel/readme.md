# ind-recipe-management-panel



<!-- Auto Generated Below -->


## Overview

Recipe management panel: pick / load a recipe, review its parameter set and
save edits. Combines `<ind-recipe-selector>` with a parameter list.

## Properties

| Property     | Attribute  | Description                        | Type                  | Default               |
| ------------ | ---------- | ---------------------------------- | --------------------- | --------------------- |
| `editable`   | `editable` | Allow editing the parameters.      | `boolean`             | `false`               |
| `heading`    | `heading`  |                                    | `string`              | `'Recipe management'` |
| `parameters` | --         | Parameters of the selected recipe. | `BatchParam[]`        | `[]`                  |
| `recipes`    | --         | Available recipes.                 | `SelectOption[]`      | `[]`                  |
| `value`      | `value`    | Selected recipe (two-way).         | `string \| undefined` | `undefined`           |


## Events

| Event       | Description | Type                  |
| ----------- | ----------- | --------------------- |
| `indChange` |             | `CustomEvent<string>` |
| `indLoad`   |             | `CustomEvent<string>` |
| `indSave`   |             | `CustomEvent<void>`   |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"heading"` |             |
| `"params"`  |             |


## Dependencies

### Depends on

- [ind-button](../../atoms/button)
- [ind-recipe-selector](../../molecules/recipe-selector)
- [ind-batch-parameter-row](../../molecules/batch-parameter-row)

### Graph
```mermaid
graph TD;
  ind-recipe-management-panel --> ind-button
  ind-recipe-management-panel --> ind-recipe-selector
  ind-recipe-management-panel --> ind-batch-parameter-row
  ind-recipe-selector --> ind-select
  ind-recipe-selector --> ind-button
  ind-batch-parameter-row --> ind-input
  style ind-recipe-management-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
