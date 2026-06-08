import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Atoms/Indicators',
  parameters: {
    docs: {
      description: {
        component:
          'Status and telemetry indicators: badge, counter, signal quality, connection, heartbeat, sparkline and progress ring.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const wrap = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:24px; flex-wrap:wrap; align-items:center; padding:16px;">${content}</div>
`;

export const Badges: Story = {
  render: () =>
    wrap(html`
      <ind-badge variant="running">RUN</ind-badge>
      <ind-badge variant="warning">WARN</ind-badge>
      <ind-badge variant="fault">FAULT</ind-badge>
      <ind-badge variant="maintenance">MAINT</ind-badge>
      <ind-badge variant="info" outline>AUTO</ind-badge>
      <ind-badge variant="neutral" size="sm">v1.2</ind-badge>
    `),
};

export const Counters: Story = {
  render: () =>
    wrap(html`
      <ind-counter label="Alarms" .value=${3} variant="error"></ind-counter>
      <ind-counter label="Warnings" .value=${12} variant="warning"></ind-counter>
      <ind-counter label="Messages" .value=${128} .max=${99} variant="info"></ind-counter>
      <ind-counter label="Queue" .value=${0} dot-when-zero variant="neutral"></ind-counter>
    `),
};

export const SignalQuality: Story = {
  render: () =>
    wrap(html`
      <ind-signal-quality .level=${1} label="Poor"></ind-signal-quality>
      <ind-signal-quality .level=${2} label="Fair"></ind-signal-quality>
      <ind-signal-quality .level=${4} label="Good"></ind-signal-quality>
      <ind-signal-quality .level=${5} .bars=${5} label="5-bar"></ind-signal-quality>
    `),
};

export const Connection: Story = {
  render: () =>
    wrap(html`
      <ind-connection-indicator state="connected"></ind-connection-indicator>
      <ind-connection-indicator state="connecting"></ind-connection-indicator>
      <ind-connection-indicator state="disconnected"></ind-connection-indicator>
      <ind-connection-indicator state="error"></ind-connection-indicator>
    `),
};

export const Heartbeat: Story = {
  render: () =>
    wrap(html`
      <ind-heartbeat alive label="PLC link"></ind-heartbeat>
      <ind-heartbeat alive .interval=${600} label="Fast"></ind-heartbeat>
      <ind-heartbeat label="Lost"></ind-heartbeat>
    `),
};

export const Sparklines: Story = {
  render: () =>
    wrap(html`
      <ind-sparkline .points=${[3, 5, 4, 6, 8, 7, 9, 8, 10]} variant="running" area></ind-sparkline>
      <ind-sparkline .points=${[10, 8, 9, 6, 7, 5, 4, 5, 3]} variant="warning"></ind-sparkline>
      <ind-sparkline .points=${[5, 9, 4, 11, 3, 12, 2, 13, 1]} variant="fault" area></ind-sparkline>
    `),
};

export const ProgressRings: Story = {
  render: () =>
    wrap(html`
      <ind-progress-ring .value=${72} show-value></ind-progress-ring>
      <ind-progress-ring .value=${45} variant="warning" show-value size="lg"></ind-progress-ring>
      <ind-progress-ring .value=${92} variant="error" show-value></ind-progress-ring>
      <ind-progress-ring indeterminate></ind-progress-ring>
    `),
};
