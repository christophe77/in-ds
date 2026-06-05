import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  tag?: string;
  label: string;
  value: number;
  max: number;
  unit?: string;
  variant: 'default' | 'success' | 'warning' | 'error';
  severity: boolean;
};

const meta: Meta<Args> = {
  title: 'Molecules/FillRow',
  component: 'ind-fill-row',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A row showing the fill level of a labelled resource (tank, reservoir, cartridge). ' +
          'Pair with `<ind-button>` slotted children for adjust / replace / refill actions. ' +
          'Use `variant="warning"` / `"error"` + `severity` to flag low / critical levels.',
      },
    },
  },
  argTypes: {
    tag: { control: 'text' },
    label: { control: 'text' },
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    unit: { control: 'text' },
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error'] },
    severity: { control: 'boolean' },
  },
  args: {
    tag: 'TK-A',
    label: 'Buffer tank A',
    value: 78,
    max: 100,
    unit: '%',
    variant: 'default',
    severity: false,
  },
  render: (args) => html`
    <ind-fill-row
      tag=${args.tag ?? ''}
      label=${args.label}
      .value=${args.value}
      .max=${args.max}
      unit=${args.unit ?? ''}
      variant=${args.variant}
      ?severity=${args.severity}
      style="width: 720px;"
    >
      <ind-button size="sm">Adjust</ind-button>
      <ind-button size="sm" variant="ghost">Replace</ind-button>
    </ind-fill-row>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Normal: Story = {};
export const Low: Story = {
  args: { tag: 'TK-B', label: 'Buffer tank B', value: 22, variant: 'warning', severity: true },
};
export const Critical: Story = {
  args: { tag: 'TK-C', label: 'Buffer tank C', value: 6, variant: 'error', severity: true },
};

export const Panel: Story = {
  name: 'Realistic — multi-tank panel',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div class="ind-stack ind-stack--sm" style="width: 720px;">
      <ind-fill-row tag="TK-A" label="Buffer tank A" .value=${82}>
        <ind-button size="sm">Adjust</ind-button>
        <ind-button size="sm" variant="ghost">Replace</ind-button>
      </ind-fill-row>
      <ind-fill-row tag="TK-B" label="Buffer tank B" .value=${24} variant="warning" severity>
        <ind-button size="sm">Adjust</ind-button>
        <ind-button size="sm" variant="ghost">Replace</ind-button>
      </ind-fill-row>
      <ind-fill-row tag="TK-C" label="Buffer tank C" .value=${6} variant="error" severity>
        <ind-button size="sm">Adjust</ind-button>
        <ind-button size="sm" variant="primary">Replace</ind-button>
      </ind-fill-row>
      <ind-fill-row tag="TK-D" label="Buffer tank D" .value=${67}>
        <ind-button size="sm">Adjust</ind-button>
        <ind-button size="sm" variant="ghost">Replace</ind-button>
      </ind-fill-row>
    </div>
  `,
};
