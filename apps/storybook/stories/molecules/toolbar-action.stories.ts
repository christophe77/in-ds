import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Molecules/ToolbarAction',
  component: 'ind-toolbar-action',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Composite toolbar with filter / flag / counter / action slots. Use above tables ' +
          'or logs for filter+pause+counter+clear patterns.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <ind-toolbar-action counter="1 248 messages" style="width: 720px;">
      <ind-input slot="filter" placeholder="Filter topic..." size="sm"></ind-input>
      <ind-checkbox slot="flags" label="Pause"></ind-checkbox>
      <ind-button slot="actions" size="sm">Clear</ind-button>
    </ind-toolbar-action>
  `,
};

export const MultiFlag: Story = {
  name: 'Multiple flags',
  render: () => html`
    <ind-toolbar-action counter="42 events" style="width: 720px;">
      <ind-input slot="filter" placeholder="Filter tag..." size="sm"></ind-input>
      <ind-checkbox slot="flags" label="Show acknowledged"></ind-checkbox>
      <ind-checkbox slot="flags" label="Auto-scroll"></ind-checkbox>
      <ind-button slot="actions" size="sm" variant="ghost">Export</ind-button>
      <ind-button slot="actions" size="sm">Clear</ind-button>
    </ind-toolbar-action>
  `,
};
