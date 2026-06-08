import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Atoms/Process Equipment',
  parameters: {
    docs: {
      description: {
        component:
          'Process-equipment symbols sharing one process state (running / stopped / fault / warning / maintenance). ' +
          'Running states animate; motion respects prefers-reduced-motion.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const wrap = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:28px; flex-wrap:wrap; align-items:flex-end; padding:20px;">${content}</div>
`;

export const Rotating: Story = {
  name: 'Pump · Motor · Fan · Compressor',
  render: () =>
    wrap(html`
      <ind-pump state="running" tag="P-101" label="Feed"></ind-pump>
      <ind-motor state="running" tag="M-201" label="Drive"></ind-motor>
      <ind-fan state="running" tag="FN-301" label="Exhaust"></ind-fan>
      <ind-compressor state="running" tag="K-401" label="Air"></ind-compressor>
    `),
};

export const ThermalAndTransport: Story = {
  name: 'Heater · Cooler · Conveyor',
  render: () =>
    wrap(html`
      <ind-heater state="running" tag="EH-601"></ind-heater>
      <ind-cooler state="running" tag="CL-701"></ind-cooler>
      <ind-conveyor state="running" tag="CV-501"></ind-conveyor>
      <ind-conveyor state="running" direction="reverse" tag="CV-502"></ind-conveyor>
    `),
};

export const Vessels: Story = {
  name: 'Tank · Silo (level)',
  render: () =>
    wrap(html`
      <ind-tank .level=${72} tag="T-204" show-value></ind-tank>
      <ind-tank .level=${91} alarm="high" tag="T-205" show-value></ind-tank>
      <ind-silo .level=${40} tag="SL-12" show-value></ind-silo>
      <ind-silo .level=${8} alarm="low" tag="SL-13" show-value></ind-silo>
    `),
};

export const Piping: Story = {
  render: () =>
    wrap(html`
      <ind-pipe orientation="horizontal" flow="forward" tone="running" .length=${120}></ind-pipe>
      <ind-pipe orientation="horizontal" flow="reverse" tone="warning" .length=${120}></ind-pipe>
      <ind-pipe orientation="vertical" flow="forward" tone="fault" .length=${64}></ind-pipe>
    `),
};

export const States: Story = {
  name: 'Gallery — all states (pump)',
  render: () =>
    wrap(html`
      <ind-pump state="running" label="Running"></ind-pump>
      <ind-pump state="stopped" label="Stopped"></ind-pump>
      <ind-pump state="fault" label="Fault"></ind-pump>
      <ind-pump state="warning" label="Warning"></ind-pump>
      <ind-pump state="maintenance" label="Maint."></ind-pump>
    `),
};
