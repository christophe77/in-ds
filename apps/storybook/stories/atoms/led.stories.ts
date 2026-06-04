import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  state: 'running' | 'stopped' | 'fault' | 'warning' | 'maintenance';
  size: 'sm' | 'md' | 'lg';
  blinking: boolean;
  label?: string;
};

const meta: Meta<Args> = {
  title: 'Atoms/LED',
  component: 'ind-led',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Process indicator LED. Maps SCADA process states to a single, accessible visual primitive. ' +
          'Fast blink with `state="fault"` follows the ISA-18.2 convention for unacknowledged HH alarms ' +
          '— stops respecting `prefers-reduced-motion` (a static outline ring replaces the animation).',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['running', 'stopped', 'fault', 'warning', 'maintenance'],
      description: 'Process state. Drives color and ARIA live politeness (`fault` → assertive).',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Visual size. sm = 8px, md = 12px (default), lg = 18px.',
    },
    blinking: {
      control: 'boolean',
      description: 'Blink. For SCADA, fast blink = unacknowledged condition. Stops on acknowledge.',
    },
    label: {
      control: 'text',
      description: 'Visible label rendered next to the LED. Also becomes the accessible name.',
    },
  },
  args: {
    state: 'running',
    size: 'md',
    blinking: false,
    label: 'Pump P-101',
  },
  render: (args) => html`
    <ind-led
      state=${args.state}
      size=${args.size}
      ?blinking=${args.blinking}
      label=${args.label ?? ''}
    ></ind-led>
  `,
};
export default meta;

type Story = StoryObj<Args>;

export const Running: Story = {};
export const Stopped: Story = { args: { state: 'stopped', label: 'Pump P-101' } };
export const FaultBlinking: Story = {
  name: 'Fault (unacknowledged)',
  args: { state: 'fault', blinking: true, label: 'Pump P-101' },
};
export const Warning: Story = { args: { state: 'warning', label: 'Tank T-204 level' } };
export const Maintenance: Story = { args: { state: 'maintenance', label: 'Valve V-12' } };

export const AllStates: Story = {
  name: 'Gallery — all states',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex; gap:24px; flex-wrap:wrap; align-items:center; padding:16px;">
      <ind-led state="running" label="Running"></ind-led>
      <ind-led state="stopped" label="Stopped"></ind-led>
      <ind-led state="fault" blinking label="Fault (unack)"></ind-led>
      <ind-led state="warning" label="Warning"></ind-led>
      <ind-led state="maintenance" label="Maintenance"></ind-led>
    </div>
  `,
};

export const Sizes: Story = {
  name: 'Gallery — sizes',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex; gap:24px; align-items:center; padding:16px;">
      <ind-led state="running" size="sm" label="Small"></ind-led>
      <ind-led state="running" size="md" label="Medium"></ind-led>
      <ind-led state="running" size="lg" label="Large"></ind-led>
    </div>
  `,
};

export const DensePanel: Story = {
  name: 'Realistic — dense operator panel',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div
      style="
        display:grid;
        grid-template-columns: repeat(4, max-content);
        gap: 4px 24px;
        padding: 12px;
        background: var(--ind-surface-panel);
        border: 1px solid var(--ind-surface-border-default);
        border-radius: var(--ind-radius-md, 3px);
        font-family: var(--ind-font-family-sans);
      "
    >
      <ind-led state="running" size="sm" label="P-101"></ind-led>
      <ind-led state="running" size="sm" label="P-102"></ind-led>
      <ind-led state="stopped" size="sm" label="P-103"></ind-led>
      <ind-led state="maintenance" size="sm" label="P-104"></ind-led>
      <ind-led state="running" size="sm" label="V-12"></ind-led>
      <ind-led state="warning" size="sm" label="V-13"></ind-led>
      <ind-led state="running" size="sm" label="V-14"></ind-led>
      <ind-led state="fault" size="sm" blinking label="V-15"></ind-led>
    </div>
  `,
};
