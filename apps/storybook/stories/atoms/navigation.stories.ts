import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Atoms/Navigation',
  parameters: {
    docs: {
      description: {
        component: 'Navigation primitives: icon, breadcrumb item, tab and tree node.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const wrap = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:24px; flex-wrap:wrap; align-items:flex-start; padding:16px;">${content}</div>
`;

export const Icons: Story = {
  render: () =>
    wrap(html`
      <ind-icon name="alarm" label="Alarm"></ind-icon>
      <ind-icon name="gear" label="Settings"></ind-icon>
      <ind-icon name="home"></ind-icon>
      <ind-icon name="warning"></ind-icon>
      <ind-icon name="power"></ind-icon>
      <ind-icon name="refresh"></ind-icon>
      <ind-icon name="play"></ind-icon>
      <ind-icon name="pause"></ind-icon>
      <ind-icon name="stop"></ind-icon>
      <ind-icon name="wrench" size="lg"></ind-icon>
    `),
};

export const Breadcrumbs: Story = {
  render: () => html`
    <nav style="padding:16px;" aria-label="Breadcrumb">
      <div role="list" style="display:flex; align-items:center; gap:6px;">
        <ind-breadcrumb-item href="#">Plant</ind-breadcrumb-item>
        <ind-breadcrumb-item href="#">Area 1</ind-breadcrumb-item>
        <ind-breadcrumb-item href="#">Pumping</ind-breadcrumb-item>
        <ind-breadcrumb-item current last>P-101</ind-breadcrumb-item>
      </div>
    </nav>
  `,
};

export const Tabs: Story = {
  render: () => html`
    <div role="tablist" style="display:flex; border-bottom:1px solid var(--ind-surface-border-default); padding:0 16px;">
      <ind-tab selected>Overview</ind-tab>
      <ind-tab>Trends</ind-tab>
      <ind-tab>Alarms</ind-tab>
      <ind-tab disabled>Maintenance</ind-tab>
    </div>
  `,
};

export const Tree: Story = {
  render: () => html`
    <div role="tree" style="padding:16px; width:240px;">
      <ind-tree-node .level=${0} expanded label="Plant"></ind-tree-node>
      <ind-tree-node .level=${1} expanded label="Area 1"></ind-tree-node>
      <ind-tree-node .level=${2} leaf selected label="P-101"></ind-tree-node>
      <ind-tree-node .level=${2} leaf label="P-102"></ind-tree-node>
      <ind-tree-node .level=${1} label="Area 2"></ind-tree-node>
    </div>
  `,
};
