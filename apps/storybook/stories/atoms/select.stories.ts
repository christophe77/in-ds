import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const ROBOT_OPTIONS = [
  { value: 'dispense', label: 'Dispense robot' },
  { value: 'return',   label: 'Return robot' },
];

const JOINT_OPTIONS = [
  { value: 'j1', label: 'J1 — Shoulder rotation' },
  { value: 'j2', label: 'J2 — Shoulder lift' },
  { value: 'j3', label: 'J3 — Elbow' },
  { value: 'j4', label: 'J4 — Wrist rotation' },
  { value: 'z',  label: 'Z  — Vertical translation' },
];

type Args = {
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  invalid: boolean;
  placeholder?: string;
  label?: string;
  value: string;
};

const meta: Meta<Args> = {
  title: 'Atoms/Select',
  component: 'ind-select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Native `<select>` styled to match the design system — keeps native keyboard nav, ' +
          'screen-reader support and the OS picker on mobile. Pass options via the JS property ' +
          '`.options` (Lit binding) or a JSON-stringified attribute.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'select', options: JOINT_OPTIONS.map((o) => o.value) },
  },
  args: {
    size: 'md',
    disabled: false,
    invalid: false,
    placeholder: 'Pick a joint…',
    label: 'Joint',
    value: '',
  },
  render: (args) => html`
    <ind-select
      .options=${JOINT_OPTIONS}
      .value=${args.value}
      placeholder=${args.placeholder ?? ''}
      label=${args.label ?? ''}
      size=${args.size}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
      @indChange=${(e: CustomEvent<string>) => console.log('[ind-select]', e.detail)}
    ></ind-select>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const JointPicker: Story = {};
export const Preselected: Story = { args: { value: 'j2' } };
export const Invalid: Story = { args: { invalid: true, value: '' } };
export const Disabled: Story = { args: { disabled: true, value: 'j1' } };

export const RobotPicker: Story = {
  name: 'Realistic — robot picker',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ind-select
      .options=${ROBOT_OPTIONS}
      .value=${'dispense'}
      label="Robot"
    ></ind-select>
  `,
};
