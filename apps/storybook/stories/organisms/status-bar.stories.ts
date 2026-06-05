import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  state: 'neutral' | 'running' | 'stopped' | 'fault' | 'warning' | 'maintenance' | 'success' | 'info' | 'error';
  message?: string;
};

const meta: Meta<Args> = {
  title: 'Organisms/StatusBar',
  component: 'ind-status-bar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Application footer. Dot + message on the left, slotted content on the right ' +
          '(timestamps, server identifiers, action buttons).',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['neutral', 'running', 'stopped', 'fault', 'warning', 'maintenance', 'success', 'info', 'error'],
    },
    message: { control: 'text' },
  },
  args: {
    state: 'running',
    message: 'Connected to broker.example:1883',
  },
  render: (args) => html`
    <ind-status-bar state=${args.state} message=${args.message ?? ''} style="width: 720px;">
      <span class="ind-text-mono">14:32:07</span>
    </ind-status-bar>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Connected: Story = {};
export const Warning: Story = {
  args: { state: 'warning', message: 'Reconnecting to broker — 3rd attempt' },
};
export const Fault: Story = {
  args: { state: 'fault', message: 'Disconnected from broker — last seen 14:30:12' },
};
