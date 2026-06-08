import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Molecules/Navigation',
  parameters: {
    docs: {
      description: {
        component: 'Navigation molecules: collapsible sidebar groups and attached command groups.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const SidebarGroups: Story = {
  render: () => html`
    <div style="width:200px; padding:8px; background:var(--ind-surface-panel); border:1px solid var(--ind-surface-border-default); border-radius:3px;">
      <ind-sidebar-group label="Overview">
        <ind-nav-item label="Dashboard" active></ind-nav-item>
        <ind-nav-item label="Trends"></ind-nav-item>
      </ind-sidebar-group>
      <ind-sidebar-group label="Alarms" .badge=${4}>
        <ind-nav-item label="Active" .badge=${4}></ind-nav-item>
        <ind-nav-item label="History"></ind-nav-item>
      </ind-sidebar-group>
      <ind-sidebar-group label="Settings" collapsed>
        <ind-nav-item label="Users"></ind-nav-item>
        <ind-nav-item label="Network"></ind-nav-item>
      </ind-sidebar-group>
    </div>
  `,
};

export const CommandGroups: Story = {
  render: () => html`
    <div style="display:flex; flex-direction:column; gap:16px; padding:16px; align-items:flex-start;">
      <ind-command-group label="Playback">
        <ind-button variant="default" size="sm" label="Start"></ind-button>
        <ind-button variant="default" size="sm" label="Pause"></ind-button>
        <ind-button variant="danger" size="sm" label="Stop"></ind-button>
      </ind-command-group>

      <ind-command-group label="Zoom" attached>
        <ind-button variant="ghost" size="sm" label="−"></ind-button>
        <ind-button variant="ghost" size="sm" label="100%"></ind-button>
        <ind-button variant="ghost" size="sm" label="+"></ind-button>
      </ind-command-group>
    </div>
  `,
};
