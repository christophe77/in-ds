import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Organisms/SidebarNav',
  component: 'ind-sidebar-nav',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Sidebar shell. Slot `brand` for a lockup, default slot for the nav items, ' +
          '`footer` for footer content. State is owned by the consumer — drive `active` on ' +
          'each `<ind-nav-item>` from your router.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="height: 600px;">
      <ind-sidebar-nav>
        <ind-nav-item label="Dashboard" active></ind-nav-item>
        <ind-nav-item label="PLC Reset"></ind-nav-item>
        <ind-nav-item label="Doors"></ind-nav-item>
        <ind-nav-item label="Robots"></ind-nav-item>
        <ind-nav-item label="Move Sequencer"></ind-nav-item>
        <ind-nav-item label="Robot View"></ind-nav-item>
        <ind-nav-item label="Valves"></ind-nav-item>
        <ind-nav-item label="Dispense"></ind-nav-item>
        <ind-nav-item label="Shelves"></ind-nav-item>
        <ind-nav-item label="Washer"></ind-nav-item>
        <ind-nav-item label="Tanks" badge="1"></ind-nav-item>
        <ind-nav-item label="Software"></ind-nav-item>
        <ind-nav-item label="HMI" disabled></ind-nav-item>
        <ind-divider></ind-divider>
        <ind-nav-item label="MQTT Monitor"></ind-nav-item>
      </ind-sidebar-nav>
    </div>
  `,
};

export const WithBrandAndFooter: Story = {
  render: () => html`
    <div style="height: 600px;">
      <ind-sidebar-nav>
        <div slot="brand" style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 20px; color: var(--ind-button-primary-bg);">⬢</span>
          <span style="font-weight: 700; font-size: 12px; letter-spacing: 0.05em;">CONSOLE</span>
        </div>

        <ind-nav-item label="Dashboard" active></ind-nav-item>
        <ind-nav-item label="PLC Reset"></ind-nav-item>
        <ind-nav-item label="Robots"></ind-nav-item>
        <ind-nav-item label="Valves"></ind-nav-item>
        <ind-nav-item label="Tanks" badge="1"></ind-nav-item>

        <span slot="footer">v1.4.2 — <a class="ind-text-link" href="#">Docs</a></span>
      </ind-sidebar-nav>
    </div>
  `,
};
