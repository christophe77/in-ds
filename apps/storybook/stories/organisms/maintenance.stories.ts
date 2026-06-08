import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Organisms/Maintenance',
  parameters: {
    docs: {
      description: {
        component:
          'Maintenance organisms: asset overview, maintenance KPI dashboard, device diagnostics ' +
          'and firmware update.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const pad = (content: ReturnType<typeof html>) => html`<div style="padding:16px;">${content}</div>`;

export const AssetOverview: Story = {
  render: () =>
    pad(html`
      <ind-asset-overview
        .assets=${[
          { tag: 'P-101', name: 'Feed pump', state: 'running', health: 92, detail: 'Runtime 124 h' },
          { tag: 'M-204', name: 'Agitator motor', state: 'warning', health: 64, detail: 'Bearing temp rising' },
          { tag: 'P-102', name: 'Standby pump', state: 'fault', health: 28, detail: 'Seal leak' },
          { tag: 'T-204', name: 'Buffer tank', state: 'running', health: 99 },
        ]}
      ></ind-asset-overview>
    `),
};

export const MaintenanceDashboard: Story = {
  render: () =>
    pad(html`
      <ind-maintenance-dashboard
        .mtbf=${720}
        .mttr=${3.5}
        .openWorkOrders=${7}
        .overdue=${2}
        .dueItems=${[
          { asset: 'P-101', task: 'Seal inspection', due: 'Today 16:00', overdue: false },
          { asset: 'M-204', task: 'Bearing greasing', due: 'Yesterday', overdue: true },
          { asset: 'CV-3', task: 'Belt tension check', due: 'Tomorrow', overdue: false },
        ]}
      ></ind-maintenance-dashboard>
    `),
};

export const DeviceDiagnosticsPanel: Story = {
  render: () =>
    pad(html`
      <ind-device-diagnostics-panel
        name="Line 2 PLC"
        vendor="Siemens"
        model="S7-1515-2 PN"
        firmware="V2.9.4"
        serial="SN-4471190"
        address="192.168.10.20"
        state="connected"
        .metrics=${[
          { label: 'CPU load', value: 42, unit: '%', status: 'ok' },
          { label: 'Memory', value: 71, unit: '%', status: 'warn' },
          { label: 'Temperature', value: 58, unit: '°C', status: 'ok' },
          { label: 'Comm errors', value: 3, status: 'fault' },
        ]}
      ></ind-device-diagnostics-panel>
    `),
};

export const FirmwareUpdatePanel: Story = {
  render: () =>
    pad(html`
      <div style="display:flex; gap:16px; flex-wrap:wrap;">
        <ind-firmware-update-panel device="Line 2 PLC" current-version="V2.9.4" target-version="V2.9.6" state="available"></ind-firmware-update-panel>
        <ind-firmware-update-panel device="Drive VFD-3" current-version="3.1.0" target-version="3.1.0" state="up-to-date"></ind-firmware-update-panel>
        <ind-firmware-update-panel device="Gateway GW-1" current-version="1.4.2" target-version="1.5.0" state="downloading" .progress=${46}></ind-firmware-update-panel>
      </div>
    `),
};
