import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Organisms/Control',
  parameters: {
    docs: {
      description: {
        component:
          'Control organisms: generic process loop, motor / pump / valve control panels, ' +
          'batch control and recipe management.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const grid = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start; padding:16px;">${content}</div>
`;

export const ProcessControlPanel: Story = {
  render: () =>
    grid(html`
      <ind-process-control-panel
        heading="Pressure loop"
        tag="PIC-101"
        state="running"
        mode="auto"
        .setpoint=${4.0}
        .pv=${4.18}
        .min=${0}
        .max=${10}
        .step=${0.1}
        .precision=${2}
        unit="bar"
      ></ind-process-control-panel>
    `),
};

export const MotorControlPanel: Story = {
  render: () =>
    grid(html`
      <ind-motor-control-panel
        heading="Agitator"
        tag="M-204"
        state="running"
        .speed=${1480}
        .current=${12.4}
        .load=${68}
        .speedSetpoint=${75}
        mode="auto"
      ></ind-motor-control-panel>
    `),
};

export const PumpControlPanel: Story = {
  render: () =>
    grid(html`
      <ind-pump-control-panel heading="Feed pump" tag="P-101" state="running" .flow=${42.7} .pressure=${4.2} mode="auto"></ind-pump-control-panel>
    `),
};

export const ValveControlPanel: Story = {
  render: () =>
    grid(html`
      <ind-valve-control-panel heading="Feed valve" tag="FV-12" state="open" .position=${100}></ind-valve-control-panel>
      <ind-valve-control-panel heading="Recycle valve" tag="FV-13" state="transit" .position=${45} modulating .positionSetpoint=${50}></ind-valve-control-panel>
    `),
};

export const BatchControlPanel: Story = {
  render: () =>
    grid(html`
      <ind-batch-control-panel
        heading="Reactor batch"
        batch-id="B-2271"
        phase="Mixing"
        state="running"
        .progress=${64}
        .parameters=${[
          { label: 'Dose volume', value: 250, unit: 'mL', target: '250' },
          { label: 'Mix time', value: 120, unit: 's', target: '120' },
          { label: 'Temperature', value: 85, unit: '°C', target: '80' },
        ]}
      ></ind-batch-control-panel>
    `),
};

export const RecipeManagementPanel: Story = {
  render: () =>
    grid(html`
      <ind-recipe-management-panel
        heading="Recipe management"
        value="r2"
        editable
        .recipes=${[
          { value: 'r1', label: 'Recipe A — Standard' },
          { value: 'r2', label: 'Recipe B — High yield' },
          { value: 'r3', label: 'Recipe C — Cleaning' },
        ]}
        .parameters=${[
          { label: 'Dose volume', value: 250, unit: 'mL' },
          { label: 'Mix time', value: 120, unit: 's' },
          { label: 'Temperature', value: 80, unit: '°C' },
        ]}
      ></ind-recipe-management-panel>
    `),
};
