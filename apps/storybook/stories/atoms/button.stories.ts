import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  variant: 'default' | 'primary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  label?: string;
  holdToConfirmMs: number;
};

const meta: Meta<Args> = {
  title: 'Atoms/Button',
  component: 'ind-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Operator action button. `variant="danger"` should always be paired with ' +
          '`holdToConfirmMs > 0` for actions like Stop, Trip, or Reset — the button must be held ' +
          'for that many milliseconds before firing `indActivate`. Standard NAMUR-style safety pattern. ' +
          'A `console.log` listener is attached in stories so you can verify activation in the browser console.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'danger', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    holdToConfirmMs: { control: { type: 'number', min: 0, max: 5000, step: 100 } },
  },
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    label: 'Start pump',
    holdToConfirmMs: 0,
  },
  render: (args) => html`
    <ind-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      .holdToConfirmMs=${args.holdToConfirmMs}
      label=${args.label ?? ''}
      @indActivate=${() => console.log('[ind-button] indActivate fired')}
    >${args.label}</ind-button>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Primary: Story = { args: { variant: 'primary', label: 'Acknowledge' } };
export const Danger: Story = { args: { variant: 'danger', label: 'Emergency stop' } };
export const Ghost: Story = { args: { variant: 'ghost', label: 'Cancel' } };
export const Disabled: Story = { args: { disabled: true, label: 'Start pump (interlock)' } };

export const HoldToConfirm: Story = {
  name: 'Hold-to-confirm (1500 ms)',
  args: {
    variant: 'danger',
    holdToConfirmMs: 1500,
    label: 'Trip — hold 1.5 s',
  },
};

export const Variants: Story = {
  name: 'Gallery — variants',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex; gap: 12px; flex-wrap: wrap; align-items: center; padding: 12px;">
      <ind-button variant="default">Default</ind-button>
      <ind-button variant="primary">Primary</ind-button>
      <ind-button variant="danger">Danger</ind-button>
      <ind-button variant="ghost">Ghost</ind-button>
      <ind-button disabled>Disabled</ind-button>
    </div>
  `,
};

export const OperatorPanel: Story = {
  name: 'Realistic — operator action bar',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="
      display:flex; gap: 8px; padding: 12px;
      background: var(--ind-surface-panel);
      border: 1px solid var(--ind-surface-border-default);
      border-radius: var(--ind-radius-md);
    ">
      <ind-button variant="primary">Start</ind-button>
      <ind-button>Stop</ind-button>
      <ind-button>Acknowledge</ind-button>
      <ind-button variant="ghost">Auto / Manual</ind-button>
      <span style="flex:1"></span>
      <ind-button variant="danger" .holdToConfirmMs=${1500}>Trip — hold 1.5 s</ind-button>
    </div>
  `,
};
