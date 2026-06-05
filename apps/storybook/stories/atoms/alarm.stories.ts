import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  priority: 'high-high' | 'high' | 'low' | 'low-low';
  acknowledged: boolean;
  label: string;
  timestamp?: string;
};

const meta: Meta<Args> = {
  title: 'Atoms/Alarm',
  component: 'ind-alarm',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ISA-18.2 alarm chip. Unacknowledged alarms blink at a priority-dependent rate ' +
          '(HH = 200 ms, H = 400 ms, L/LL = 1000 ms). Acknowledged alarms mute. ' +
          '`prefers-reduced-motion` replaces blinking with a static outline ring.',
      },
    },
  },
  argTypes: {
    priority: { control: 'select', options: ['high-high', 'high', 'low', 'low-low'] },
    acknowledged: { control: 'boolean' },
    label: { control: 'text' },
    timestamp: { control: 'text' },
  },
  args: {
    priority: 'high',
    acknowledged: false,
    label: 'PT-101 discharge pressure exceeded operating limit',
    timestamp: '14:32:07',
  },
  render: (args) => html`
    <ind-alarm
      priority=${args.priority}
      ?acknowledged=${args.acknowledged}
      label=${args.label}
      timestamp=${args.timestamp ?? ''}
    ></ind-alarm>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const HighUnack: Story = { name: 'High — unacknowledged' };
export const HighHighUnack: Story = {
  name: 'High-high — unacknowledged',
  args: { priority: 'high-high', label: 'TT-204 reactor temperature critical' },
};
export const HighAck: Story = {
  name: 'High — acknowledged',
  args: { acknowledged: true },
};
export const LowUnack: Story = {
  name: 'Low — unacknowledged',
  args: { priority: 'low', label: 'LT-330 tank level approaching low setpoint' },
};

export const PriorityGallery: Story = {
  name: 'Gallery — all priorities',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex; flex-direction:column; gap:6px; max-width: 520px;">
      <ind-alarm priority="high-high" label="TT-204 reactor temperature critical"  timestamp="14:32:07"></ind-alarm>
      <ind-alarm priority="high"      label="PT-101 discharge pressure high"       timestamp="14:31:58"></ind-alarm>
      <ind-alarm priority="low"       label="LT-330 tank level low"                 timestamp="14:30:12"></ind-alarm>
      <ind-alarm priority="low-low"   label="FT-001 flow critically low"           timestamp="14:29:45"></ind-alarm>
    </div>
  `,
};

export const AlarmList: Story = {
  name: 'Realistic — alarm summary',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="
      display:flex; flex-direction:column; gap:4px;
      padding: 8px;
      background: var(--ind-surface-panel);
      border: 1px solid var(--ind-surface-border-default);
      max-width: 600px;
      font-family: var(--ind-font-family-sans);
    ">
      <div style="font-size: 11px; color: var(--ind-surface-text-muted); padding: 4px 8px; text-transform: uppercase; letter-spacing: 0.05em;">
        Active alarms — Area 1
      </div>
      <ind-alarm priority="high-high" label="TT-204 reactor temperature critical (187.3 °C)" timestamp="14:32:07"></ind-alarm>
      <ind-alarm priority="high"      label="PT-101 discharge pressure high (18.7 bar)"       timestamp="14:31:58"></ind-alarm>
      <ind-alarm priority="high"      acknowledged label="PT-104 second-stage pressure high"  timestamp="14:18:22"></ind-alarm>
      <ind-alarm priority="low"       label="LT-330 tank level low (28.1 %)"                  timestamp="14:30:12"></ind-alarm>
      <ind-alarm priority="low-low"   acknowledged label="FT-001 startup flow low"            timestamp="14:02:11"></ind-alarm>
    </div>
  `,
};
