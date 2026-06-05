import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  value: number;
  max: number;
  variant: 'default' | 'success' | 'warning' | 'error';
  size: 'sm' | 'md' | 'lg';
  label?: string;
  showValue: boolean;
  unit?: string;
  indeterminate: boolean;
};

const meta: Meta<Args> = {
  title: 'Atoms/Progress',
  component: 'ind-progress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Linear progress bar. Use `variant="warning"` / `"error"` to highlight low / critical levels ' +
          '(reservoirs, fill levels, buffer capacity). Set `indeterminate` for in-flight async ' +
          'operations (firmware update, restart).',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    unit: { control: 'text' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    value: 78,
    max: 100,
    variant: 'default',
    size: 'md',
    label: 'Fill level',
    showValue: true,
    unit: '%',
    indeterminate: false,
  },
  render: (args) => html`
    <ind-progress
      .value=${args.value}
      .max=${args.max}
      variant=${args.variant}
      size=${args.size}
      label=${args.label ?? ''}
      ?show-value=${args.showValue}
      unit=${args.unit ?? ''}
      ?indeterminate=${args.indeterminate}
      style="min-width: 320px;"
    ></ind-progress>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Low: Story = {
  name: 'Low (warning)',
  args: { value: 22, variant: 'warning', label: 'Buffer tank level' },
};
export const Critical: Story = {
  name: 'Critical (error)',
  args: { value: 6, variant: 'error', label: 'Reservoir level' },
};
export const Success: Story = {
  args: { value: 95, variant: 'success', label: 'Calibration progress' },
};
export const Indeterminate: Story = {
  name: 'Indeterminate (software update)',
  args: { indeterminate: true, label: 'Installing update…', showValue: false },
};

export const Sizes: Story = {
  name: 'Gallery — sizes',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex; flex-direction:column; gap: 16px; min-width: 320px;">
      <ind-progress size="sm" .value=${64} label="sm" show-value unit="%"></ind-progress>
      <ind-progress size="md" .value=${64} label="md" show-value unit="%"></ind-progress>
      <ind-progress size="lg" .value=${64} label="lg" show-value unit="%"></ind-progress>
    </div>
  `,
};

export const FillLevels: Story = {
  name: 'Realistic — multi-tank level panel',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      padding: 12px;
      max-width: 720px;
    ">
      <ind-progress label="Tank A" .value=${82} show-value unit="%"></ind-progress>
      <ind-progress label="Tank B" .value=${24} variant="warning" show-value unit="%"></ind-progress>
      <ind-progress label="Tank C" .value=${6}  variant="error"   show-value unit="%"></ind-progress>
      <ind-progress label="Tank D" .value=${67} show-value unit="%"></ind-progress>
    </div>
  `,
};
