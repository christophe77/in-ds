import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  label: string;
  active: boolean;
  disabled: boolean;
  badge?: string;
  href?: string;
};

const meta: Meta<Args> = {
  title: 'Molecules/NavItem',
  component: 'ind-nav-item',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Sidebar entry. `active` adds the ▶ indicator and bold treatment. ' +
          'Renders as `<a>` when `href` is set (so middle-click works), otherwise `<button>`. ' +
          'Use `badge` for alarm counts.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    badge: { control: 'text' },
    href: { control: 'text' },
  },
  args: {
    label: 'PLC Reset',
    active: false,
    disabled: false,
    badge: undefined,
    href: undefined,
  },
  render: (args) => html`
    <div style="width: 178px; background: var(--ind-surface-panel); padding: 4px 0;">
      <ind-nav-item
        label=${args.label}
        ?active=${args.active}
        ?disabled=${args.disabled}
        badge=${args.badge ?? ''}
        href=${args.href ?? ''}
        @indSelect=${() => console.log('[ind-nav-item]', args.label)}
      ></ind-nav-item>
    </div>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Inactive: Story = {};
export const Active: Story = { args: { active: true } };
export const WithBadge: Story = { args: { label: 'Active alarms', badge: '3' } };
export const Disabled: Story = { args: { disabled: true, label: 'HMI fullscreen (waiting MQTT)' } };

export const Sidebar: Story = {
  name: 'Realistic — full sidebar',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="
      width: 178px;
      background: var(--ind-surface-panel);
      border: 1px solid var(--ind-surface-border-default);
      padding: 4px 0;
    ">
      <ind-nav-item label="Dashboard" active></ind-nav-item>
      <ind-nav-item label="PLC Reset"></ind-nav-item>
      <ind-nav-item label="Doors"></ind-nav-item>
      <ind-nav-item label="Robots"></ind-nav-item>
      <ind-nav-item label="Move Sequencer"></ind-nav-item>
      <ind-nav-item label="Robot View"></ind-nav-item>
      <ind-nav-item label="Valves"></ind-nav-item>
      <ind-nav-item label="Dispense"></ind-nav-item>
      <ind-nav-item label="Dispense Shelves"></ind-nav-item>
      <ind-nav-item label="Washer"></ind-nav-item>
      <ind-nav-item label="Tanks" badge="1"></ind-nav-item>
      <ind-nav-item label="Software"></ind-nav-item>
      <ind-nav-item label="HMI" disabled></ind-nav-item>
      <ind-divider></ind-divider>
      <ind-nav-item label="MQTT Monitor"></ind-nav-item>
    </div>
  `,
};
