import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Organisms/Navigation',
  parameters: {
    docs: {
      description: {
        component: 'Navigation organisms: the contextual toolbar and the command center palette.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const ContextToolbar: Story = {
  render: () => html`
    <div style="padding:16px;">
      <ind-context-toolbar heading="Reactor R-201" subtitle="Line 2 · Batch B-2271">
        <ind-breadcrumb-item slot="breadcrumb" label="Plant"></ind-breadcrumb-item>
        <ind-breadcrumb-item slot="breadcrumb" label="Line 2"></ind-breadcrumb-item>
        <ind-breadcrumb-item slot="breadcrumb" label="Reactor" last></ind-breadcrumb-item>
        <ind-button slot="actions" variant="ghost" size="sm" label="Trends"></ind-button>
        <ind-button slot="actions" variant="primary" size="sm" label="Acknowledge"></ind-button>
      </ind-context-toolbar>
    </div>
  `,
};

export const CommandCenter: Story = {
  render: () => html`
    <div style="padding:16px;">
      <ind-command-center heading="Quick commands" .columns=${3}>
        <ind-button variant="primary" size="md" label="Start line"></ind-button>
        <ind-button variant="danger" size="md" label="Stop line"></ind-button>
        <ind-button variant="default" size="md" label="Hold"></ind-button>
        <ind-button variant="default" size="md" label="Acknowledge"></ind-button>
        <ind-button variant="default" size="md" label="Reset"></ind-button>
        <ind-button variant="ghost" size="md" label="Reports"></ind-button>
      </ind-command-center>
    </div>
  `,
};
