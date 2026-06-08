import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Molecules/Data',
  parameters: {
    docs: {
      description: {
        component:
          'Data molecules: trend widget plus log-style rows (alarm, event, audit, historical) ' +
          'and the device information card.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const panel = (content: ReturnType<typeof html>) => html`
  <div style="max-width:560px; padding:16px;">
    <div style="border:1px solid var(--ind-surface-border-default); border-radius:3px; background:var(--ind-surface-panel); overflow:hidden;">
      ${content}
    </div>
  </div>
`;

export const TrendWidget: Story = {
  render: () => html`
    <div style="display:flex; gap:16px; flex-wrap:wrap; padding:16px;">
      <ind-trend-widget
        label="Discharge pressure"
        tag="PT-101"
        unit="bar"
        .precision=${2}
        .points=${[3.9, 4.0, 4.1, 4.0, 4.2, 4.3, 4.2, 4.4, 4.2]}
      ></ind-trend-widget>
      <ind-trend-widget
        label="Motor current"
        tag="M-204"
        unit="A"
        .precision=${1}
        variant="warning"
        .points=${[10, 11, 12, 13, 12, 14, 15, 16, 18]}
      ></ind-trend-widget>
    </div>
  `,
};

export const AlarmLog: Story = {
  render: () =>
    panel(html`
      <ind-alarm-row priority="high-high" tag="PT-101" message="Pressure very high" time="08:42:11"></ind-alarm-row>
      <ind-alarm-row priority="high" tag="TT-204" message="Reactor temperature high" time="08:41:55"></ind-alarm-row>
      <ind-alarm-row priority="low" tag="LT-310" message="Tank level low" time="08:39:02" acknowledged></ind-alarm-row>
      <ind-alarm-row priority="low-low" tag="FT-118" message="Feed flow very low" time="08:37:48" acknowledged></ind-alarm-row>
    `),
};

export const EventLog: Story = {
  render: () =>
    panel(html`
      <ind-event-row time="08:42:11" severity="error" source="P-101" message="Pump tripped on overcurrent"></ind-event-row>
      <ind-event-row time="08:40:03" severity="warning" source="TIC-301" message="Setpoint deviation > 5 °C"></ind-event-row>
      <ind-event-row time="08:38:20" severity="success" source="Batch" message="Phase 'Mix' completed"></ind-event-row>
      <ind-event-row time="08:35:00" severity="info" source="System" message="Operator logged in: a.martin"></ind-event-row>
    `),
};

export const AuditTrail: Story = {
  render: () =>
    panel(html`
      <ind-audit-row time="08:42:11" user="a.martin" action="Setpoint change" detail="PIC-101: 3.2 → 4.0 bar"></ind-audit-row>
      <ind-audit-row time="08:40:51" user="a.martin" action="Mode change" detail="P-101: Auto → Manual"></ind-audit-row>
      <ind-audit-row time="08:30:00" user="supervisor" action="Recipe loaded" detail="Recipe B — High yield"></ind-audit-row>
    `),
};

export const HistoricalTable: Story = {
  render: () =>
    panel(html`
      <ind-historical-value-row time="08:42:00" .value=${4.21} unit="bar" .precision=${2} quality="good"></ind-historical-value-row>
      <ind-historical-value-row time="08:41:00" .value=${4.18} unit="bar" .precision=${2} quality="good"></ind-historical-value-row>
      <ind-historical-value-row time="08:40:00" .value=${4.05} unit="bar" .precision=${2} quality="uncertain"></ind-historical-value-row>
      <ind-historical-value-row time="08:39:00" .value=${0} unit="bar" .precision=${2} quality="bad"></ind-historical-value-row>
    `),
};

export const DeviceInfoCard: Story = {
  render: () => html`
    <div style="padding:16px;">
      <ind-device-info-card
        name="Line 2 PLC"
        vendor="Siemens"
        model="S7-1515-2 PN"
        firmware="V2.9.4"
        serial="SN-4471190"
        address="192.168.10.20"
        state="connected"
      ></ind-device-info-card>
    </div>
  `,
};
