import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  heading: string;
  state: 'running' | 'stopped' | 'fault' | 'warning' | 'maintenance' | 'unknown';
  stateLabel?: string;
  detail?: string;
};

const meta: Meta<Args> = {
  title: 'Molecules/HealthCard',
  component: 'ind-health-card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Dashboard health card. One per subsystem in `SystemStatusGrid`. Pairs `<ind-status-dot>` ' +
          'with a prominent colored label so an operator can read state across a 4-up grid at a glance. ' +
          'Fault cards get a subtle red glow.',
      },
    },
  },
  argTypes: {
    heading: { control: 'text' },
    state: {
      control: 'select',
      options: ['running', 'stopped', 'fault', 'warning', 'maintenance', 'unknown'],
    },
    stateLabel: { control: 'text' },
    detail: { control: 'text' },
  },
  args: {
    heading: 'PLC',
    state: 'running',
    stateLabel: 'RUN',
    detail: 'Last heartbeat 12 s ago',
  },
  render: (args) => html`
    <ind-health-card
      heading=${args.heading}
      state=${args.state}
      state-label=${args.stateLabel ?? ''}
      detail=${args.detail ?? ''}
      style="width: 200px;"
    ></ind-health-card>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Running: Story = {};
export const Fault: Story = {
  args: { state: 'fault', stateLabel: 'FAULT', detail: 'Pump P-101 — current spike' },
};
export const Warning: Story = {
  args: { heading: 'Washer', state: 'warning', stateLabel: 'WARN', detail: 'Temperature drift +3.2°C' },
};
export const Maintenance: Story = {
  args: { heading: 'Dispense robot', state: 'maintenance', stateLabel: 'MAINT', detail: 'Operator on station' },
};

export const SystemStatusGrid: Story = {
  name: 'Realistic — Dashboard 4-up grid',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      padding: 12px;
      max-width: 880px;
    ">
      <ind-health-card heading="PLC"             state="running" state-label="RUN"   detail="Heartbeat 12 s ago"></ind-health-card>
      <ind-health-card heading="Dispense robot"  state="running" state-label="IDLE"  detail="42 cycles today"></ind-health-card>
      <ind-health-card heading="Return robot"    state="warning" state-label="WARN"  detail="J3 current rising"></ind-health-card>
      <ind-health-card heading="Washer"          state="fault"   state-label="FAULT" detail="Rinse pump amperage"></ind-health-card>
    </div>
  `,
};
