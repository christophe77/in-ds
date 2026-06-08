import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Atoms/Inputs — Controls',
  parameters: {
    docs: {
      description: {
        component:
          'Operator controls: toggle, selector switch, emergency stop, setpoint, slider, knob and date/time picker.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const wrap = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:32px; flex-wrap:wrap; align-items:flex-start; padding:20px;">${content}</div>
`;

export const Toggles: Story = {
  render: () =>
    wrap(html`
      <ind-toggle label="Auto" checked></ind-toggle>
      <ind-toggle label="Bypass"></ind-toggle>
      <ind-toggle label="Run" text-on="ON" text-off="OFF" size="lg" checked></ind-toggle>
    `),
};

export const SelectorSwitch: Story = {
  render: () =>
    wrap(html`
      <ind-selector-switch
        label="Pump mode"
        value="auto"
        .positions=${[
          { value: 'off', label: 'Off' },
          { value: 'hand', label: 'Hand' },
          { value: 'auto', label: 'Auto' },
        ]}
      ></ind-selector-switch>
    `),
};

export const EmergencyStop: Story = {
  render: () =>
    wrap(html`
      <ind-estop></ind-estop>
      <ind-estop engaged label="LINE 2 E-STOP"></ind-estop>
      <ind-estop size="lg" label="MASTER STOP"></ind-estop>
    `),
};

export const Setpoint: Story = {
  render: () =>
    wrap(html`
      <ind-setpoint label="Discharge pressure" .value=${4.2} .pv=${4.05} .step=${0.1} .precision=${2} unit="bar"></ind-setpoint>
      <ind-setpoint label="Temperature" .value=${180} .pv=${176} .step=${5} unit="°C" .min=${0} .max=${300}></ind-setpoint>
    `),
};

export const Slider: Story = {
  render: () =>
    wrap(html`
      <div style="width:220px;"><ind-slider label="Speed" .value=${60} unit="%"></ind-slider></div>
      <div style="width:220px;"><ind-slider label="Flow" .value=${30} .min=${0} .max=${200} unit="m³/h" size="lg"></ind-slider></div>
    `),
};

export const Knobs: Story = {
  render: () =>
    wrap(html`
      <ind-knob label="Gain" .value=${35} unit="%"></ind-knob>
      <ind-knob label="Bias" .value=${50} size="lg"></ind-knob>
      <ind-knob label="Trim" .value=${12} size="sm"></ind-knob>
    `),
};

export const DateTime: Story = {
  render: () =>
    wrap(html`
      <ind-datetime-picker label="From" mode="datetime-local"></ind-datetime-picker>
      <ind-datetime-picker label="Shift date" mode="date"></ind-datetime-picker>
      <ind-datetime-picker label="At" mode="time"></ind-datetime-picker>
    `),
};
