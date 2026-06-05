import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = { orientation: 'horizontal' | 'vertical' };

const meta: Meta<Args> = {
  title: 'Atoms/Divider',
  component: 'ind-divider',
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
  args: { orientation: 'horizontal' },
  render: (args) => html`
    <div style="width: 320px; height: 60px; display: flex; align-items: stretch; gap: 12px;">
      <span>before</span>
      <ind-divider orientation=${args.orientation}></ind-divider>
      <span>after</span>
    </div>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
