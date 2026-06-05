import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  state: 'open' | 'closed' | 'transit' | 'fault';
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'md' | 'lg';
  label?: string;
  tag?: string;
};

const meta: Meta<Args> = {
  title: 'Atoms/Valve',
  component: 'ind-valve',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ISA-5.1 P&ID valve (bowtie) symbol. State drives color via the process-state tokens, ' +
          '`transit` renders marching ants on the stroke. `prefers-reduced-motion` freezes the dash.',
      },
    },
  },
  argTypes: {
    state: { control: 'radio', options: ['open', 'closed', 'transit', 'fault'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    tag: { control: 'text' },
  },
  args: {
    state: 'open',
    orientation: 'horizontal',
    size: 'md',
    label: 'Discharge valve',
    tag: 'V-12',
  },
  render: (args) => html`
    <ind-valve
      state=${args.state}
      orientation=${args.orientation}
      size=${args.size}
      label=${args.label ?? ''}
      tag=${args.tag ?? ''}
    ></ind-valve>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Open: Story = {};
export const Closed: Story = { args: { state: 'closed' } };
export const Transit: Story = {
  name: 'Transit (animated)',
  args: { state: 'transit', label: 'Opening...' },
};
export const Fault: Story = { args: { state: 'fault', label: 'Position feedback lost' } };

export const StateGallery: Story = {
  name: 'Gallery — all states',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex; gap:32px; align-items:center; padding: 12px;">
      <ind-valve state="open"    tag="V-12" label="Open"></ind-valve>
      <ind-valve state="closed"  tag="V-13" label="Closed"></ind-valve>
      <ind-valve state="transit" tag="V-14" label="Transit"></ind-valve>
      <ind-valve state="fault"   tag="V-15" label="Fault"></ind-valve>
    </div>
  `,
};

export const Orientations: Story = {
  name: 'Gallery — orientations & sizes',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex; gap:48px; align-items:center; padding: 16px;">
      <ind-valve state="open" size="sm" tag="V-1"></ind-valve>
      <ind-valve state="open" size="md" tag="V-2"></ind-valve>
      <ind-valve state="open" size="lg" tag="V-3"></ind-valve>
      <ind-valve state="open" size="md" orientation="vertical" tag="V-4"></ind-valve>
    </div>
  `,
};
