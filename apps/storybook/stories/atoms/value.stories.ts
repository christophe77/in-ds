import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  value: number | string;
  unit?: string;
  precision?: number;
  alarm: 'none' | 'low-low' | 'low' | 'high' | 'high-high';
  trend: 'none' | 'up' | 'down' | 'stable';
  size: 'sm' | 'md' | 'lg';
  label?: string;
  tag?: string;
};

const meta: Meta<Args> = {
  title: 'Atoms/Value',
  component: 'ind-value',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Process value readout — tabular figures, optional alarm highlight using the ISA-18.2 ' +
          'token palette, optional trend arrow. Use `size="lg"` for primary KPIs on a HMI screen.',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    unit: { control: 'text' },
    precision: { control: { type: 'number', min: 0, max: 6 } },
    alarm: { control: 'select', options: ['none', 'low-low', 'low', 'high', 'high-high'] },
    trend: { control: 'radio', options: ['none', 'up', 'down', 'stable'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    tag: { control: 'text' },
  },
  args: {
    value: 12.43,
    unit: 'bar',
    precision: 2,
    alarm: 'none',
    trend: 'stable',
    size: 'md',
    label: 'Discharge pressure',
    tag: 'PT-101',
  },
  render: (args) => html`
    <ind-value
      .value=${args.value}
      unit=${args.unit ?? ''}
      .precision=${args.precision}
      alarm=${args.alarm}
      trend=${args.trend}
      size=${args.size}
      label=${args.label ?? ''}
      tag=${args.tag ?? ''}
    ></ind-value>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Normal: Story = {};
export const HighAlarm: Story = { args: { value: 18.7, alarm: 'high', trend: 'up' } };
export const HighHighAlarm: Story = { args: { value: 22.1, alarm: 'high-high', trend: 'up' } };
export const LowAlarm: Story = { args: { value: 2.1, alarm: 'low', trend: 'down' } };
export const PrimaryKPI: Story = {
  args: { size: 'lg', value: 1450.6, unit: 'm³/h', precision: 1, label: 'Total flow', tag: 'FT-001' },
};

export const AlarmGallery: Story = {
  name: 'Gallery — alarm priorities',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid; grid-template-columns: repeat(5, max-content); gap: 12px;">
      <ind-value tag="PT-101" label="Normal"   .value=${12.43} unit="bar" .precision=${2} alarm="none"></ind-value>
      <ind-value tag="PT-102" label="Low"      .value=${2.10}  unit="bar" .precision=${2} alarm="low"  trend="down"></ind-value>
      <ind-value tag="PT-103" label="Low-low"  .value=${0.85}  unit="bar" .precision=${2} alarm="low-low" trend="down"></ind-value>
      <ind-value tag="PT-104" label="High"     .value=${18.70} unit="bar" .precision=${2} alarm="high" trend="up"></ind-value>
      <ind-value tag="PT-105" label="High-high" .value=${22.10} unit="bar" .precision=${2} alarm="high-high" trend="up"></ind-value>
    </div>
  `,
};

export const KPIWall: Story = {
  name: 'Realistic — KPI wall',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="
      display:grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      padding: 12px;
      background: var(--ind-surface-panel);
      max-width: 720px;
    ">
      <ind-value size="lg" tag="FT-001" label="Total flow"        .value=${1450.6} unit="m³/h" .precision=${1} trend="stable"></ind-value>
      <ind-value size="lg" tag="PT-101" label="Discharge"         .value=${12.43} unit="bar" .precision=${2} trend="stable"></ind-value>
      <ind-value size="lg" tag="TT-204" label="Reactor temp"      .value=${187.3} unit="°C" .precision=${1} trend="up" alarm="high"></ind-value>
      <ind-value size="lg" tag="LT-330" label="Tank level"        .value=${78.1}  unit="%" .precision=${1} trend="down"></ind-value>
    </div>
  `,
};
