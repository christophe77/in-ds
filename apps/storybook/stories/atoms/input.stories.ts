import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  type: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url';
  size: 'sm' | 'md' | 'lg';
  value: string;
  placeholder?: string;
  label?: string;
  disabled: boolean;
  readonly: boolean;
  invalid: boolean;
};

const meta: Meta<Args> = {
  title: 'Atoms/Input',
  component: 'ind-input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text input. Supports `prefix` and `suffix` slots (e.g. unit suffix, ":" port separator). ' +
          'Use `type="number"` to opt into the monospace tabular-figures display, ideal for IP/port/setpoints.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['text', 'number', 'email', 'password', 'search', 'tel', 'url'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  args: {
    type: 'text',
    size: 'md',
    value: '',
    placeholder: '192.168.1.10',
    label: 'Machine IP',
    disabled: false,
    readonly: false,
    invalid: false,
  },
  render: (args) => html`
    <ind-input
      type=${args.type}
      size=${args.size}
      .value=${args.value}
      placeholder=${args.placeholder ?? ''}
      label=${args.label ?? ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?invalid=${args.invalid}
    ></ind-input>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const NumberPort: Story = {
  name: 'Number — port',
  args: { type: 'number', label: 'Port', value: '1883', placeholder: '1883' },
};
export const Invalid: Story = {
  args: { value: 'not.an.ip', invalid: true, label: 'Machine IP' },
};
export const Disabled: Story = { args: { disabled: true, value: '192.168.1.10' } };
export const Readonly: Story = { args: { readonly: true, value: '192.168.1.10' } };

export const WithSuffix: Story = {
  name: 'With unit suffix',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ind-input type="number" label="Discharge setpoint" .value=${'12.5'} placeholder="0.0">
      <span slot="suffix">bar</span>
    </ind-input>
  `,
};

export const ConnectionForm: Story = {
  name: 'Realistic — connection form',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div class="ind-stack ind-stack--md" style="max-width: 320px; padding: 16px;">
      <ind-input label="Machine IP" placeholder="192.168.1.10"></ind-input>
      <ind-input type="number" label="Port" .value=${'1883'}></ind-input>
      <ind-input label="Machine ID" placeholder="KDY-001"></ind-input>
    </div>
  `,
};
