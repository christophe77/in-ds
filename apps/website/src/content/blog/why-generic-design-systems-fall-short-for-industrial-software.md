---
title: Why generic web design systems fall short for industrial software
description: Generic UI kits solve real problems, but industrial HMI/SCADA software needs semantics they never model. Here is what a specialized industrial layer adds.
publishDate: 2026-06-30
author: Christophe Bellec
tags: [industrial-design-system, hmi, scada, ui-components]
---

Most teams building operator interfaces start from a familiar place: a general-purpose component library. Material UI, Ant Design, and shadcn/ui are mature, well-documented, and widely understood. They handle typography, spacing, form controls, dialogs, and accessibility conventions with a level of polish that would take years to reproduce. If you are building a dashboard, an admin panel, or a customer-facing web app, they are a reasonable default, and nothing below is an argument against them.

The problem is not that these libraries are weak. The problem is that industrial software carries meaning that a general-purpose kit was never designed to express. A pump is not a card. A valve is not a toggle. An alarm is not a toast notification. When you build a Human-Machine Interface (HMI) or a SCADA client on top of a generic kit, you spend most of your time re-encoding industrial semantics that the library has no vocabulary for. ind-ds exists to sit alongside those kits as the specialized industrial layer, not to replace them.

## Industrial applications add semantics generic kits lack

Consider the difference between "a button that is disabled" and "a pump that is in maintenance." In a generic kit, both might render as a greyed-out control. But those two conditions mean completely different things to an operator. A disabled button is an application concern: the software has decided you cannot click it right now. A pump in maintenance is a process concern: a physical asset has been deliberately taken out of service by a person, and that decision has consequences for the rest of the line.

Generic libraries model application state. Industrial interfaces must also model process state and equipment state, and those live in a different conceptual space. ind-ds encodes them directly. Equipment states such as `running`, `stopped`, `fault`, `warning`, and `maintenance` are first-class values on components like `ind-pump`. Valves carry `open`, `closed`, `transit`, and `fault`. Connection health is its own axis: `connected`, `connecting`, `disconnected`, `error`. These are not styling variants bolted on after the fact; they are the semantics operators reason about.

## Why success / warning / error is not enough

The typical design-system status palette is three or four tokens: success, warning, error, and maybe info. That vocabulary was shaped by web forms and CRUD apps, where "the operation succeeded" or "validation failed" covers almost everything you need to say.

An industrial deviation does not fit that scheme. Is a pump that stopped because an operator pressed stop a "success" or an "error"? Neither. It is a normal, expected `stopped` state. Is a communication timeout to a Programmable Logic Controller (PLC) an "error"? It is, but it is a different kind of error than a process `fault`, and conflating them hides critical information. When a screen shows a red indicator, the operator needs to know instantly whether they are looking at lost communications, a mechanical fault, or a protective trip. Collapsing all of those into a single "error" color throws away the distinction that matters most.

## Process state versus application state

This is worth stating plainly, because it is the single most common source of confusion when teams port a web mindset to the plant floor. The following are not interchangeable:

- A **disabled control** (the UI is preventing input)
- **Communication loss** (the client cannot reach the data source)
- **Maintenance** (an asset is deliberately out of service)
- A **process stop** (the equipment is not running, by design or command)
- A **warning** (a value is drifting toward a limit but no protection has acted)
- A **fault** (a protective function has tripped or a device reports a failure)

A screen for motor M-102 that renders all six as the same muted grey forces the operator to click, hover, or cross-reference to recover meaning that should have been visible at a glance. ind-ds keeps these axes separate so that the visual language can too.

## Alarm priority and acknowledgement

Generic notification systems have no concept of priority ranking or acknowledgement lifecycle. A toast appears, lingers, and disappears. That is the opposite of what an alarm system needs.

Alarms have priority, and the priority must be visible and sortable. ind-ds models an ISA-18.2-aware scheme: high-high (HH, priority 1), high (H, 2), low (L, 3), and low-low (LL, 4). Alarms also carry an acknowledged state and a timestamp, because an unacknowledged high-high alarm from three seconds ago is not the same as an acknowledged low alarm from an hour ago. The `ind-alarm-panel` component sorts unacknowledged alarms first, by priority, so the most urgent unhandled condition is always at the top. No generic toast stack does this, and retrofitting it is more work than it looks.

## Information density for 24/7 use

Consumer web design trends toward generous whitespace, large touch targets, and one primary action per screen. That is appropriate for occasional users on their phones. It is wrong for a control room where one operator supervises hundreds of tags on a wall of monitors for a twelve-hour shift.

Industrial screens need high, legible information density: many values, states, and trends visible simultaneously without scrolling. Components like `ind-value`, `ind-led`, `ind-gauge`, and `ind-sparkline` are built to be compact and readable at a glance rather than spacious and sequential. A generic kit's default spacing works against you here, and overriding it everywhere is a running cost.

## Continuous operation and operator fatigue

A screen that runs for eight hours in a dim control room has different requirements than one viewed for ninety seconds in daylight. Contrast, color choice, and the restraint to keep "normal" visually calm all matter for reducing fatigue and avoiding missed events. ind-ds ships themes through a `data-theme` attribute on an ancestor element: a default dark theme, plus light and high-contrast variants. The design intent is that a normal, healthy plant looks quiet, and deviation is what draws the eye.

## Framework longevity

Industrial software has a long service life. A plant HMI may run for a decade or more, well beyond the fashion cycle of any single JavaScript framework. Betting your entire component layer on one framework generation is a real risk.

ind-ds is built as framework-agnostic Web Components at its core, with typed React and Vue wrappers generated from them. Web Components rest on browser standards rather than a specific framework's runtime, so the core contract tends to outlive framework churn. If your team migrates from one framework to another in five years, the industrial components and their behavior come along.

## Adopting ind-ds incrementally

None of this requires a rewrite. Because the core is standard Web Components, you can drop a single `ind-alarm-panel` or `ind-pump` into an existing Material UI or Ant screen and keep everything else as it is. Install what you need:

```bash
npm install @ind-ds/core
npm install @ind-ds/react   # typed React 18+ wrappers
npm install @ind-ds/vue     # typed Vue 3.3+ wrappers
```

You keep your general-purpose kit for layout, navigation, forms, and the parts of the app that are ordinary web software. You reach for ind-ds where the screen represents a process. The two layers coexist.

## Honest limitations

ind-ds is a UI layer, and it is worth being clear about what that means. It renders states and values you give it; it does not decide what those states should be. It is not a SCADA server, a historian, a broker, or a PLC gateway, and it does not replace your alarm rationalization process. Standards-aware tokens and components help you build an interface aligned with good practice, but they do not by themselves make an application standards-compliant; that remains an engineering and validation responsibility on your side. And because the components need a browser DOM, they fit web and embedded-web deployments rather than fully native toolkits, though the design tokens can be shared more broadly.

If your product includes real process screens, a specialized industrial layer earns its place next to the generic kit you already trust. To see the components in context, browse the [Storybook](https://christophe77.github.io/ind-ds/), or start with the [getting started guide](/getting-started).
