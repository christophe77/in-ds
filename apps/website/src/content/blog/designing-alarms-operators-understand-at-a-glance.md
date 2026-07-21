---
title: Designing alarms operators can understand at a glance
description: Good alarm design separates alarms from events and status, ranks priority, tracks acknowledgement, and gives operators the context to act. Here is how.
publishDate: 2026-07-07
author: Christophe Bellec
tags: [hmi, alarm-design, isa-18-2, scada, ux]
---

An alarm's whole job is to get a person to do something before a situation gets worse. That sounds simple, but poorly designed alarm displays are one of the most common failures in control-room software. They flood operators with noise, hide the one condition that matters under a hundred that do not, and force people to decode color and layout under time pressure. This article walks through the properties that make an alarm display readable at a glance, and shows how the alarm components in ind-ds model them. It assumes no prior knowledge of ind-ds.

## Alarm, event, and status are three different things

The first design decision is a vocabulary decision. Three concepts get muddled constantly, and separating them clears up most of the rest.

- A **status** is a current condition that is simply true right now: pump P-101 is running, valve XV-204 is open. Status is not inherently good or bad; it is just the state of things.
- An **event** is something that happened at a point in time: an operator changed a setpoint, a motor started, a batch completed. Events belong in a log. They are history.
- An **alarm** is an abnormal condition that requires an operator response. It has a lifecycle: it becomes active, it may be acknowledged, and it eventually clears.

Displaying all three in one undifferentiated stream is a classic mistake. Status belongs on the process graphic. Events belong in an event log. Alarms belong in a dedicated, prioritized, acknowledgeable list. ind-ds reflects this split: `ind-value` and `ind-led` show status inline on a mimic, while `ind-alarm`, `ind-alarm-row`, and `ind-alarm-panel` handle the alarm lifecycle specifically.

## Priority, ranked and visible

Not all alarms are equal, and an operator handling several at once needs to know which to address first. ind-ds uses an ISA-18.2-aware priority scheme with four levels: high-high (HH, priority 1), high (H, priority 2), low (L, priority 3), and low-low (LL, priority 4). HH and LL represent the extremes of a measured range and typically carry the most urgency; H and L are the intermediate deviations.

Priority has to be encoded so it survives a glance. That means it should be sortable and it should be visible through more than color alone, so that priority is not lost to a color-vision difference or a badly calibrated monitor. The `ind-alarm-panel` sorts by priority for exactly this reason: the ranking is structural, not just decorative.

## Acknowledgement

Acknowledgement is the operator saying "I have seen this." It is not the same as the alarm clearing, and treating the two as one thing is a serious error. An alarm can be acknowledged while the underlying condition is still active, and an alarm can clear while still unacknowledged, which is exactly the case you must not let disappear silently.

Every alarm in ind-ds carries an `acknowledged` state. The panel uses it to sort unacknowledged alarms first, above acknowledged ones, so an operator's attention is drawn to conditions no one has yet taken responsibility for. This ordering is the single most useful behavior in a busy panel.

## Active versus cleared

An alarm has an active/cleared dimension that is independent of acknowledgement. Combining the two axes gives you the states operators actually care about:

- **Active and unacknowledged** — the loudest case; something is wrong and no one has looked.
- **Active and acknowledged** — someone is on it, but the condition persists.
- **Cleared but unacknowledged** — the condition came and went; the operator still needs to know it happened.

A display that only shows currently-active alarms loses that third case, which is often where the diagnostic story lives.

## Timestamps

Every alarm carries a timestamp, because when a condition began is part of its meaning. A high-high level in tank T-301 that has been active for two seconds is a developing situation; the same alarm active for forty minutes is a different problem, possibly one that has been acknowledged and is being worked, or one that has been ignored. Timestamps also let operators reconstruct sequence during an upset, when several alarms arrive close together and the order tells you which was cause and which was effect.

## Context: what, where, and what to do

An alarm that just says "HIGH" is nearly useless. A readable alarm answers, in the operator's line of sight:

- **What equipment** is affected (tank T-301)
- **What the current value is** (the level reading now)
- **What the expected state is** (the limit that was crossed)
- **What action is required**, where that can be expressed concisely

The more of this the row itself carries, the less the operator has to navigate elsewhere while a situation develops. The components accept these as properties so the context travels with the alarm rather than living in a separate lookup.

## Avoiding color overload

If everything is colored, nothing stands out. A frequent anti-pattern is a screen where healthy equipment is already green, amber, and red for other reasons, so a genuine alarm color has to compete with a rainbow. The more effective approach is restraint: keep the normal, healthy state visually calm and low-saturation, and reserve strong, saturated color for genuine deviation. Then an alarm is noticeable because it is the exception, not one voice in a choir. ind-ds themes, applied through a `data-theme` attribute, are built around this idea of a quiet baseline.

## Keyboard and touch

Control rooms are not all mice. Some are keyboard-driven consoles where an operator acknowledges alarms without leaving the home row; others are touch panels on the plant floor where gloves and vibration are facts of life. Alarm interactions such as acknowledgement need to work with both, with targets large enough for touch and focus behavior sensible enough for keyboard. Designing the interaction for only one input model tends to make the other painful.

## A small example

Here is an alarm panel with two rows, expressed with the React wrapper. The props carry priority, acknowledgement, timestamp, and context directly:

```tsx
import { IndAlarmPanel, IndAlarmRow } from '@ind-ds/react';

export function LineOneAlarms() {
  return (
    <IndAlarmPanel label="Line 1 Alarms">
      <IndAlarmRow
        tag="T-301"
        message="Level high-high"
        priority="HH"
        value="98%"
        expected="< 90%"
        acknowledged={false}
        timestamp="2026-07-07T09:14:22Z"
      />
      <IndAlarmRow
        tag="P-101"
        message="Discharge pressure low"
        priority="L"
        value="1.2 bar"
        expected="> 1.5 bar"
        acknowledged={true}
        timestamp="2026-07-07T08:41:05Z"
      />
    </IndAlarmPanel>
  );
}
```

The same thing works as plain custom elements if you are not on React:

```html
<ind-alarm-panel label="Line 1 Alarms">
  <ind-alarm-row
    tag="T-301"
    message="Level high-high"
    priority="HH"
    value="98%"
    expected="&lt; 90%"
    timestamp="2026-07-07T09:14:22Z">
  </ind-alarm-row>
</ind-alarm-panel>
```

Because the panel sorts unacknowledged-first by priority, the unacknowledged HH row for T-301 sits above the acknowledged L row for P-101 regardless of the order you write them in.

## A note on standards

These components are ISA-18.2-aware: the priority model and the acknowledgement lifecycle are informed by that standard's approach to alarm management. That is a deliberately careful phrasing. Aware is not certified. A UI toolkit cannot make an application standards-compliant on its own, and ind-ds does not claim to.

More importantly, the hard part of alarm management is not the display. It is alarm rationalization: the engineering process of deciding which conditions deserve to be alarms at all, what their priorities should be, and what response each one demands. That work happens with process engineers and operators, not in a component library. ind-ds gives you a display that faithfully presents the results of that process; it does not perform the process for you, and no tool should claim to.

To see the alarm components rendered with live states, browse the [Storybook](https://christophe77.github.io/ind-ds/), or follow the [getting started guide](/getting-started) to add them to a screen.
