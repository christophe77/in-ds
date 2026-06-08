import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Molecules/Inputs — Controls',
  parameters: {
    docs: {
      description: {
        component:
          'Operator control faceplates assembled from input atoms: setpoint, start/stop, ' +
          'speed, temperature, mode and recipe selectors, and editable batch parameter rows.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const grid = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start; padding:16px;">${content}</div>
`;

export const SetpointControl: Story = {
  render: () =>
    grid(html`
      <ind-setpoint-control label="Discharge pressure SP" tag="PIC-101" .value=${4.0} .pv=${4.18} .min=${0} .max=${10} .step=${0.1} .precision=${2} unit="bar"></ind-setpoint-control>
    `),
};

export const StartStopControl: Story = {
  render: () =>
    grid(html`
      <ind-start-stop-control label="Feed pump P-101" state="running"></ind-start-stop-control>
      <ind-start-stop-control label="Agitator M-204" state="stopped" .holdToStartMs=${800}></ind-start-stop-control>
      <ind-start-stop-control label="Washer" state="fault"></ind-start-stop-control>
    `),
};

export const SpeedControl: Story = {
  render: () =>
    grid(html`
      <ind-speed-control label="Conveyor speed" .value=${65} unit="%"></ind-speed-control>
      <ind-speed-control label="Mixer RPM" .value=${1200} .min=${0} .max=${3000} .step=${10} unit="rpm" variant="knob"></ind-speed-control>
    `),
};

export const TemperatureControl: Story = {
  render: () =>
    grid(html`
      <ind-temperature-control label="Reactor jacket" tag="TIC-301" .value=${85} .pv=${82.4} .min=${0} .max=${150} mode="heating"></ind-temperature-control>
      <ind-temperature-control label="Chiller" tag="TIC-410" .value=${6} .pv=${7.1} .min=${-10} .max=${30} mode="cooling"></ind-temperature-control>
    `),
};

export const ModeSelector: Story = {
  render: () =>
    grid(html`
      <ind-mode-selector value="auto"></ind-mode-selector>
      <ind-mode-selector
        label="Pump mode"
        value="manual"
        .positions=${[
          { value: 'off', label: 'Off' },
          { value: 'hand', label: 'Hand' },
          { value: 'auto', label: 'Auto' },
        ]}
      ></ind-mode-selector>
    `),
};

export const RecipeSelector: Story = {
  render: () =>
    grid(html`
      <ind-recipe-selector
        label="Active recipe"
        value="r2"
        .options=${[
          { value: 'r1', label: 'Recipe A — Standard' },
          { value: 'r2', label: 'Recipe B — High yield' },
          { value: 'r3', label: 'Recipe C — Cleaning' },
        ]}
      ></ind-recipe-selector>
    `),
};

export const BatchParameters: Story = {
  render: () => html`
    <div style="max-width:420px; padding:16px; border:1px solid var(--ind-surface-border-default); border-radius:3px; background:var(--ind-surface-panel);">
      <ind-batch-parameter-row label="Dose volume" .value=${250} unit="mL" .min=${0} .max=${500} target="250"></ind-batch-parameter-row>
      <ind-batch-parameter-row label="Mix time" .value=${120} unit="s" .min=${0} .max=${600} target="120"></ind-batch-parameter-row>
      <ind-batch-parameter-row label="Temperature" .value=${85} unit="°C" .min=${0} .max=${150} target="80" invalid></ind-batch-parameter-row>
      <ind-batch-parameter-row label="Speed" .value=${1200} unit="rpm" .min=${0} .max=${3000} target="1200"></ind-batch-parameter-row>
    </div>
  `,
};
