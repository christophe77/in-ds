import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
  label?: string;
};

const meta: Meta<Args> = {
  title: 'Atoms/Checkbox',
  component: 'ind-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: 'md',
    label: 'Pause MQTT messages',
  },
  render: (args) => html`
    <ind-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      size=${args.size}
      label=${args.label ?? ''}
      @indChange=${(e: CustomEvent<boolean>) => console.log('[ind-checkbox]', e.detail)}
    ></ind-checkbox>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Select all PLC flags' } };
export const Disabled: Story = { args: { disabled: true, checked: true } };

export const FlagsGrid: Story = {
  name: 'Realistic — PLC reset flags',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="
      display: grid;
      grid-template-columns: repeat(2, max-content);
      gap: 6px 32px;
      padding: 12px;
      background: var(--ind-surface-panel);
    ">
      <ind-checkbox label="reset_dispense_robot"></ind-checkbox>
      <ind-checkbox label="reset_return_robot"></ind-checkbox>
      <ind-checkbox checked label="reset_washer"></ind-checkbox>
      <ind-checkbox label="reset_dispense_door"></ind-checkbox>
      <ind-checkbox label="reset_return_door"></ind-checkbox>
      <ind-checkbox label="clear_dispense_stuck"></ind-checkbox>
      <ind-checkbox label="clear_return_stuck"></ind-checkbox>
      <ind-checkbox label="reset_co2"></ind-checkbox>
      <ind-checkbox label="reset_tanks"></ind-checkbox>
      <ind-checkbox label="reset_water"></ind-checkbox>
      <ind-checkbox label="reset_chiller"></ind-checkbox>
    </div>
  `,
};
