import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const SAMPLE_4 = [
  { id: 'a', label: 'A', level: 82 },
  { id: 'b', label: 'B', level: 24 },
  { id: 'c', label: 'C', level: 6 },
  { id: 'd', label: 'D', level: 67 },
];

const SAMPLE_8 = [
  { id: '1', label: 'A1', level: 82 },
  { id: '2', label: 'A2', level: 75 },
  { id: '3', label: 'A3', level: 14 },
  { id: '4', label: 'A4', level: 30 },
  { id: '5', label: 'B1', level: 88 },
  { id: '6', label: 'B2', level: 6 },
  { id: '7', label: 'B3', state: 'missing' as const },
  { id: '8', label: 'B4', level: 50 },
];

const meta: Meta = {
  title: 'Atoms/Canvas — Shelf',
  component: 'ind-shelf-canvas',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Grid of container slots. Each slot renders a bottle silhouette with its fill level. ' +
          'Generic — represents any rack of resupplyable containers (bottles, cartridges, kegs). ' +
          'Pass `slots` as a JS array (property binding) or a JSON-stringified attribute.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const FourBay: Story = {
  name: '4-bay shelf',
  render: () => html`
    <ind-shelf-canvas
      .slots=${SAMPLE_4}
      heading="Shelf 1 — Bay A"
      cols="4"
      rows="1"
    ></ind-shelf-canvas>
  `,
};

export const EightBay: Story = {
  name: '8-bay shelf (4×2)',
  render: () => html`
    <ind-shelf-canvas
      .slots=${SAMPLE_8}
      heading="Shelf 2 — Bays A & B"
      cols="4"
      rows="2"
    ></ind-shelf-canvas>
  `,
};

export const Pair: Story = {
  name: 'Realistic — multiple shelves',
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <ind-shelf-canvas .slots=${SAMPLE_4} heading="Shelf 1" cols="4"></ind-shelf-canvas>
      <ind-shelf-canvas .slots=${SAMPLE_4.slice().reverse()} heading="Shelf 2" cols="4"></ind-shelf-canvas>
    </div>
  `,
};
