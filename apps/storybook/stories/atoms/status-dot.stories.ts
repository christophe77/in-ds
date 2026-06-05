import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  state: 'neutral' | 'running' | 'stopped' | 'fault' | 'warning' | 'maintenance' | 'success' | 'info' | 'error';
  size: 'sm' | 'md' | 'lg';
  blinking: boolean;
  label?: string;
};

const meta: Meta<Args> = {
  title: 'Atoms/Status Dot',
  component: 'ind-status-dot',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Standalone colored dot. Smaller and simpler than `<ind-led>` — use for inline status indicators ' +
          '(MQTT connection, health cards, list rows). Pair with text via `.ind-status-line` utility.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['neutral', 'running', 'stopped', 'fault', 'warning', 'maintenance', 'success', 'info', 'error'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    blinking: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { state: 'running', size: 'md', blinking: false, label: undefined },
  render: (args) => html`
    <ind-status-dot
      state=${args.state}
      size=${args.size}
      ?blinking=${args.blinking}
      label=${args.label ?? ''}
    ></ind-status-dot>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Running: Story = {};
export const FaultBlinking: Story = { args: { state: 'fault', blinking: true } };

export const Gallery: Story = {
  name: 'Gallery — all states',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 6px; padding: 12px;">
      <span class="ind-status-line"><ind-status-dot state="running"></ind-status-dot> PLC connected</span>
      <span class="ind-status-line"><ind-status-dot state="warning"></ind-status-dot> Dispense robot warning</span>
      <span class="ind-status-line"><ind-status-dot state="fault" blinking></ind-status-dot> Washer fault (unack)</span>
      <span class="ind-status-line"><ind-status-dot state="maintenance"></ind-status-dot> CO₂ in maintenance</span>
      <span class="ind-status-line"><ind-status-dot state="info"></ind-status-dot> MQTT broker reachable</span>
      <span class="ind-status-line"><ind-status-dot state="success"></ind-status-dot> Software up to date</span>
      <span class="ind-status-line"><ind-status-dot state="neutral"></ind-status-dot> Return robot — no data</span>
    </div>
  `,
};
