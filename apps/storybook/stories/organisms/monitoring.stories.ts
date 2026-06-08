import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Organisms/Monitoring',
  parameters: {
    docs: {
      description: {
        component:
          'Monitoring organisms: alarm panel & summary, event journal, historian and trend ' +
          'viewers, and the equipment / production / energy dashboards.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const pad = (content: ReturnType<typeof html>) => html`<div style="padding:16px;">${content}</div>`;

export const AlarmPanel: Story = {
  render: () =>
    pad(html`
      <ind-alarm-panel
        heading="Active alarms"
        .alarms=${[
          { id: '1', priority: 'high-high', tag: 'PT-101', message: 'Pressure very high', time: '08:42:11' },
          { id: '2', priority: 'high', tag: 'TT-204', message: 'Reactor temperature high', time: '08:41:55' },
          { id: '3', priority: 'low', tag: 'LT-310', message: 'Tank level low', time: '08:39:02', acknowledged: true },
          { id: '4', priority: 'low-low', tag: 'FT-118', message: 'Feed flow very low', time: '08:37:48' },
        ]}
      ></ind-alarm-panel>
    `),
};

export const AlarmSummary: Story = {
  render: () =>
    pad(html`
      <ind-alarm-summary .highHigh=${1} .high=${3} .low=${2} .lowLow=${1} .unacknowledged=${4}></ind-alarm-summary>
    `),
};

export const EventJournal: Story = {
  render: () =>
    pad(html`
      <ind-event-journal
        .events=${[
          { time: '08:42:11', severity: 'error', source: 'P-101', message: 'Pump tripped on overcurrent' },
          { time: '08:40:03', severity: 'warning', source: 'TIC-301', message: 'Setpoint deviation > 5 °C' },
          { time: '08:38:20', severity: 'success', source: 'Batch', message: "Phase 'Mix' completed" },
          { time: '08:35:00', severity: 'info', source: 'System', message: 'Operator logged in: a.martin' },
        ]}
      ></ind-event-journal>
    `),
};

export const HistorianViewer: Story = {
  render: () =>
    pad(html`
      <ind-historian-viewer
        heading="Historian"
        tag="PT-101"
        unit="bar"
        .precision=${2}
        .samples=${[
          { time: '08:42:00', value: 4.21, quality: 'good' },
          { time: '08:41:00', value: 4.18, quality: 'good' },
          { time: '08:40:00', value: 4.05, quality: 'uncertain' },
          { time: '08:39:00', value: 3.98, quality: 'good' },
          { time: '08:38:00', value: 4.1, quality: 'good' },
        ]}
      ></ind-historian-viewer>
    `),
};

export const TrendViewer: Story = {
  render: () =>
    pad(html`
      <ind-trend-viewer
        .series=${[
          { label: 'Pressure', unit: 'bar', precision: 2, variant: 'running', points: [3.9, 4.0, 4.1, 4.0, 4.2, 4.3, 4.2] },
          { label: 'Temperature', unit: '°C', precision: 1, variant: 'warning', points: [180, 182, 185, 187, 186, 188, 190] },
          { label: 'Flow', unit: 'm³/h', precision: 1, variant: 'default', points: [40, 42, 41, 43, 42, 44, 42] },
        ]}
      ></ind-trend-viewer>
    `),
};

export const EquipmentDashboard: Story = {
  render: () => html`
    <div style="padding:16px;">
      <ind-equipment-dashboard heading="Line 2 equipment" .columns=${3}>
        <ind-pump-card tag="P-101" label="Feed pump" state="running" .flow=${42.7} .pressure=${4.2}></ind-pump-card>
        <ind-motor-card tag="M-204" label="Agitator" state="running" .speed=${1480} .current=${12.4}></ind-motor-card>
        <ind-valve-card tag="FV-12" label="Feed valve" state="open" .position=${100}></ind-valve-card>
        <ind-tank-level-card tag="T-204" label="Buffer tank" state="running" .level=${62}></ind-tank-level-card>
        <ind-pump-card tag="P-102" label="Standby pump" state="fault"></ind-pump-card>
      </ind-equipment-dashboard>
    </div>
  `,
};

export const ProductionDashboard: Story = {
  render: () => html`
    <div style="padding:16px;">
      <ind-production-dashboard heading="Production" subtitle="Line 2 · Shift A" .columns=${4}>
        <ind-kpi-card label="OEE" .value=${86.4} unit="%" .precision=${1} trend="up" delta="+2.1 %" variant="good"></ind-kpi-card>
        <ind-kpi-card label="Throughput" .value=${1240} unit="u/h" trend="down" delta="-3.4 %" variant="bad"></ind-kpi-card>
        <ind-kpi-card label="Good" .value=${1180} unit="u"></ind-kpi-card>
        <ind-kpi-card label="Scrap" .value=${1.8} unit="%" .precision=${1} trend="flat"></ind-kpi-card>
      </ind-production-dashboard>
    </div>
  `,
};

export const EnergyDashboard: Story = {
  render: () => html`
    <div style="padding:16px;">
      <ind-energy-dashboard heading="Energy" total-label="Site total" .totalValue=${312.5} total-unit="kW" .columns=${3}>
        <ind-energy-card label="Line 1" .value=${120.4} unit="kW" trend="up" .points=${[110, 115, 118, 120]}></ind-energy-card>
        <ind-energy-card label="Line 2" .value=${98.7} unit="kW" trend="flat" .points=${[95, 97, 99, 98]}></ind-energy-card>
        <ind-energy-card label="Utilities" .value=${93.4} unit="kW" trend="down" .points=${[100, 98, 95, 93]}></ind-energy-card>
      </ind-energy-dashboard>
    </div>
  `,
};
