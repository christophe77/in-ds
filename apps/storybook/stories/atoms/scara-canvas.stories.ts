import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  j1: number;
  j2: number;
  j3: number;
  state: 'idle' | 'moving' | 'fault';
};

const meta: Meta<Args> = {
  title: 'Atoms/Canvas — SCARA',
  component: 'ind-scara-canvas',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Top-down 2D SCARA arm. Forward kinematics computed from joint angles. ' +
          'Pure SVG → crisp at any DPI, theme-aware, no Canvas2D plumbing.',
      },
    },
  },
  argTypes: {
    j1: { control: { type: 'range', min: -180, max: 180, step: 1 } },
    j2: { control: { type: 'range', min: -180, max: 180, step: 1 } },
    j3: { control: { type: 'range', min: -180, max: 180, step: 1 } },
    state: { control: 'radio', options: ['idle', 'moving', 'fault'] },
  },
  args: { j1: 30, j2: 45, j3: 15, state: 'idle' },
  render: (args) => html`
    <ind-scara-canvas
      .joints=${[args.j1, args.j2, args.j3]}
      state=${args.state}
    ></ind-scara-canvas>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Idle: Story = {};
export const Moving: Story = { args: { state: 'moving' } };
export const Fault: Story = { args: { state: 'fault', j1: -45, j2: 90 } };

export const Folded: Story = { args: { j1: 0, j2: 170, j3: 0 } };
export const Extended: Story = { args: { j1: 0, j2: 0, j3: 0 } };

export const DualArm: Story = {
  name: 'Realistic — paired robots',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <div>
        <h4 class="ind-section-label">Dispense robot</h4>
        <ind-scara-canvas .joints=${[30, 45, 10]} state="moving"></ind-scara-canvas>
      </div>
      <div>
        <h4 class="ind-section-label">Return robot</h4>
        <ind-scara-canvas .joints=${[-60, 30, -20]} state="idle"></ind-scara-canvas>
      </div>
    </div>
  `,
};
