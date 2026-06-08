import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Atoms/Charts & Visualization',
  parameters: {
    docs: {
      description: {
        component: 'Visualization primitives: radial gauge, linear gauge, XY operating point, process symbol and canvas layer.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const wrap = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:32px; flex-wrap:wrap; align-items:flex-start; padding:20px;">${content}</div>
`;

const zones = [
  { from: 0, to: 60, color: '#16a34a' },
  { from: 60, to: 85, color: '#f59e0b' },
  { from: 85, to: 100, color: '#dc2626' },
];

export const RadialGauge: Story = {
  render: () =>
    wrap(html`
      <ind-gauge .value=${42} unit="bar" label="Discharge" .zones=${zones}></ind-gauge>
      <ind-gauge .value=${78} unit="%" label="Load" size="lg" .zones=${zones}></ind-gauge>
      <ind-gauge .value=${93} unit="°C" label="Bearing" .zones=${zones}></ind-gauge>
    `),
};

export const LinearGauges: Story = {
  render: () =>
    wrap(html`
      <div style="width:220px;">
        <ind-linear-gauge label="Tank level" .value=${72} .setpoint=${80} unit="%" .zones=${zones}></ind-linear-gauge>
      </div>
      <ind-linear-gauge orientation="vertical" label="Lvl" .value=${55} unit="%" .zones=${zones}></ind-linear-gauge>
    `),
};

export const OperatingPoint: Story = {
  render: () =>
    wrap(html`
      <ind-xy-point .x=${60} .y=${40} variant="running" .trail=${[[10, 10], [25, 22], [40, 30], [60, 40]]}></ind-xy-point>
      <ind-xy-point .x=${85} .y=${88} variant="fault"></ind-xy-point>
    `),
};

export const ProcessSymbols: Story = {
  render: () =>
    wrap(html`
      <ind-process-symbol shape="circle" tag="PT" label="101"></ind-process-symbol>
      <ind-process-symbol shape="square" tag="FT" state="running" label="220"></ind-process-symbol>
      <ind-process-symbol shape="diamond" tag="LSH" state="fault" label="305"></ind-process-symbol>
      <ind-process-symbol shape="hexagon" tag="TIC" state="warning" label="410"></ind-process-symbol>
    `),
};

export const CanvasLayers: Story = {
  name: 'Canvas Layer — mimic composition',
  render: () => html`
    <div style="position:relative; width:320px; height:200px; background:var(--ind-surface-sunken); border:1px solid var(--ind-surface-border-default); border-radius:3px; margin:20px;">
      <ind-canvas-layer .x=${20} .y=${50}><ind-tank .level=${60} tag="T-1" show-value></ind-tank></ind-canvas-layer>
      <ind-canvas-layer .x=${50} .y=${50}><ind-pipe .length=${80} flow="forward" tone="running"></ind-pipe></ind-canvas-layer>
      <ind-canvas-layer .x=${78} .y=${50}><ind-pump state="running" tag="P-1"></ind-pump></ind-canvas-layer>
    </div>
  `,
};
