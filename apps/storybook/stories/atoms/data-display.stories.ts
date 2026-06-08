import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Atoms/Data Display',
  parameters: {
    docs: {
      description: {
        component: 'Text primitives for HMI data: label, unit label, timestamp, tag name and alarm count.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const wrap = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:24px; flex-wrap:wrap; align-items:center; padding:16px;">${content}</div>
`;

export const Labels: Story = {
  render: () =>
    wrap(html`
      <ind-label tone="primary">Primary</ind-label>
      <ind-label tone="secondary">Secondary</ind-label>
      <ind-label tone="muted">Muted</ind-label>
      <ind-label uppercase>Section title</ind-label>
      <ind-label tone="primary" required html-for="x">Required</ind-label>
    `),
};

export const UnitsAndTags: Story = {
  render: () =>
    wrap(html`
      <span><ind-tag-name tag="PT-101"></ind-tag-name> 4.05 <ind-unit-label unit="bar"></ind-unit-label></span>
      <ind-tag-name tag="FIC-220" boxed></ind-tag-name>
      <span>180 <ind-unit-label unit="°C"></ind-unit-label></span>
    `),
};

export const Timestamps: Story = {
  render: () =>
    wrap(html`
      <ind-timestamp format="datetime"></ind-timestamp>
      <ind-timestamp format="time"></ind-timestamp>
      <ind-timestamp format="date"></ind-timestamp>
      <ind-timestamp format="relative" .value=${Date.now() - 90000}></ind-timestamp>
    `),
};

export const AlarmCounts: Story = {
  render: () =>
    wrap(html`
      <ind-alarm-count .highHigh=${1} .high=${3} .low=${2} .lowLow=${0}></ind-alarm-count>
      <ind-alarm-count .highHigh=${0} .high=${0} .low=${5} .lowLow=${1} hide-zero></ind-alarm-count>
      <ind-alarm-count .highHigh=${2} .high=${4} .low=${1} .lowLow=${3} size="lg"></ind-alarm-count>
    `),
};
