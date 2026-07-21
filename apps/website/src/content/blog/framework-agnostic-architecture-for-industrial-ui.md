---
title: A practical architecture for framework-agnostic industrial UI components
description: Industrial products span React apps, Vue portals, and embedded panels. Web Components plus shared tokens give them one UI contract across every stack.
publishDate: 2026-07-14
author: Christophe Bellec
tags: [web-components, stencil, react, vue, design-tokens]
---

Industrial software rarely lives in one place. A single product line often has a React operations application, a Vue-based configuration portal maintained by a different team, and an embedded panel that ships on the machine itself. Each was chosen for good reasons at the time, and none of them is going to be rewritten to match the others. The practical question is not "which framework should we standardize on," but "how do we get a consistent industrial UI across all of them without maintaining the same pump three times." This article describes the architecture ind-ds uses to answer that, and where its limits are.

## The core contract: Web Components

The foundation is a set of framework-agnostic Web Components, built with Stencil and distributed as `@ind-ds/core`. There are 115 components covering the industrial vocabulary: `ind-pump`, `ind-valve`, `ind-tank`, `ind-gauge`, `ind-led`, `ind-value`, `ind-sparkline`, the alarm family, and controls like `ind-mode-selector`, `ind-start-stop-control`, and `ind-setpoint`.

The reason to make Web Components the core rather than, say, a React component set is that custom elements are a browser standard. A `<ind-pump>` is understood by the browser itself, so it renders the same in a React tree, a Vue template, or a plain HTML file. That makes the component the shared contract: the behavior of a pump indicator, the meaning of its `running` and `fault` states, the way it draws, all live in one place and one implementation. Everything else is an adapter over that contract.

## Typed wrappers for React and Vue

Raw custom elements are usable from any framework, but the developer experience is uneven. React historically passes everything as attributes and has awkward handling for custom events; Vue needs to know which custom elements to leave alone. More importantly, without wrappers you lose type checking on props.

So ind-ds generates typed wrappers from the same core components. `@ind-ds/react` provides React 18+ wrappers with typed props and proper event handling; `@ind-ds/vue` provides Vue 3.3+ wrappers with typed props and `v-model` support. Because they are generated from the core rather than reimplemented, they cannot drift from it. A new state added to `ind-valve` shows up in both wrappers with the same name and the same type.

```bash
npm install @ind-ds/core     # the Web Components
npm install @ind-ds/react    # typed React wrappers
npm install @ind-ds/vue      # typed Vue wrappers
```

The React team writes `<IndValve state="transit" />` with autocompletion; the Vue team writes `<ind-valve :state="state" />` with `v-model`; both render the identical element underneath.

## Shared tokens: one vocabulary

Underneath the components sits `@ind-ds/tokens`, the design tokens that define colors, spacing, and the semantic mapping of states. The tokens are the vocabulary; the components are one way to speak it.

Tokens matter here because they export to multiple formats: CSS custom properties, JS/TS, JSON, and Dart. That last point is the interesting one. A native application that does not render Web Components at all can still consume the same token set and paint a `fault` state the exact same red as the web HMI. Theming rides on this too: a `data-theme` attribute on an ancestor element selects the default dark, light, or high-contrast theme, and all of it is token-driven. So even a part of your product that shares no rendering code with the web components can still share a visual language with them.

## Live data with MQTT bindings

Components render state, but the state has to come from somewhere. In many plants that transport is MQTT. `@ind-ds/mqtt` is a small binding helper that connects an MQTT topic to a DOM attribute or property:

```ts
import { IndMqttClient, bindLed } from '@ind-ds/mqtt';

const client = new IndMqttClient({ url: 'wss://broker.plant.local:8083' });
await client.connect();

// Drive an LED from a boolean-ish topic
const led = document.querySelector('ind-led')!;
bindLed(client, 'plant/line-1/pump-101/state', led, (payload) =>
  payload === 'running' ? 'on' : 'off'
);

// Generic binding: set an attribute from a topic, with a transform
client.bind({
  topic: 'plant/line-1/pump-101/state',
  element: document.querySelector('ind-pump')!,
  attribute: 'state',
  transform: (payload) => payload.toString(),
  asProperty: false,
});
```

There is also `bindBlink(...)` for attention-drawing blink behavior. The important thing to understand is what this library is and is not. It sets DOM attributes and properties from topic messages, and that is all. It is not a SCADA server, not a historian, not a broker, and not a PLC gateway. It is the last few centimeters of wire between your existing data infrastructure and the DOM. You bring the broker and the tags; ind-ds moves the values onto the elements.

## Embedded and native strategies

For desktop and embedded deployments, the Web Components run in a browser engine, so the natural hosts are Electron, Tauri, or a plain WebView embedded in a larger application. In all of those the components behave exactly as they do in a browser, because there is a real DOM.

For genuinely native toolkits, the story is honest and narrower. If your panel is written in Qt, .NET, or Flutter, there is no official native binding that renders ind-ds components today. What you can share is the tokens: pull the exported values (JSON or Dart, for instance) into the native app so its `running`, `stopped`, and `fault` colors match the web HMI exactly. You reimplement the widgets natively, but they speak the same visual vocabulary. That is a real, useful integration path, and it is important not to oversell it as more than tokens.

## Trade-offs to go in with eyes open

This architecture is not free of cost, and it is worth naming the trade-offs:

- **Shadow DOM.** The components encapsulate their styles, which is what keeps them consistent across host apps, but it also means global CSS does not reach inside them. You theme through tokens and documented parts, not by overriding arbitrary selectors.
- **A DOM is required.** These are DOM components. Where there is no DOM, only the tokens travel, as described above.
- **SSR.** Server-side rendering of custom elements needs care; hydration and the timing of custom-element definitions are things to plan for rather than assume. For control-room applications this is often a non-issue, but a public-facing SSR site should validate the approach early.

## An example architecture

Described in prose: the tokens sit at the bottom as the shared source of truth. The Web Components sit on top of the tokens. The React and Vue wrappers sit on top of the components. Your applications sit on top of whichever adapter they need, and native panels reach past the components straight to the tokens.

```
            React app        Vue portal        Native panel (Qt/.NET/Flutter)
                |                |                        |
         @ind-ds/react   @ind-ds/vue                     |
                \\               /                        |
                 \\             /                         |
                @ind-ds/core (115 Web Components)         |
                          |                               |
                @ind-ds/tokens  <-- shared tokens --------+
              (CSS / JS-TS / JSON / Dart)

   live data:  MQTT broker --> @ind-ds/mqtt --> DOM attributes/properties
```

## Migrating incrementally

You do not adopt this all at once. Because the core is standard custom elements, the smallest possible step is to render one component, say an `ind-alarm-panel`, inside a screen you already have, in whatever framework it is written in. From there you replace hand-built indicators with ind-ds equivalents where it pays off, and you start pulling the tokens into any native surfaces so the colors converge. Each step stands on its own; there is no flag day.

## Current limitations

Two things worth stating plainly. First, native rendering is tokens-only today; there is no official Qt, .NET, or Flutter binding that draws the components. Second, a full time-series trend component (`ind-trend`) is planned but not yet shipped. For inline trends right now, use `ind-sparkline`, which is compact and well-suited to sitting next to a value on a mimic, though it is not a replacement for a full historical trend view.

If this maps onto a product you are building, the [getting started guide](/getting-started) walks through installation, and the [Storybook](https://christophe77.github.io/ind-ds/) shows every component with its states so you can see the contract before you commit to it.
