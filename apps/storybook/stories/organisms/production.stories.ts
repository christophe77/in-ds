import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Organisms/Production',
  parameters: {
    docs: {
      description: {
        component:
          'Production organisms: line overview, machine overview, production cell, workstation ' +
          'monitor and the OEE dashboard.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const pad = (content: ReturnType<typeof html>) => html`<div style="padding:16px;">${content}</div>`;

export const ProductionLineOverview: Story = {
  render: () =>
    pad(html`
      <ind-production-line-overview
        heading="Line 2"
        .stations=${[
          { name: 'Infeed', tag: 'ST-1', state: 'running', rate: 1240, unit: 'u/h' },
          { name: 'Fill', tag: 'ST-2', state: 'running', rate: 1235, unit: 'u/h' },
          { name: 'Cap', tag: 'ST-3', state: 'warning', rate: 1180, unit: 'u/h' },
          { name: 'Label', tag: 'ST-4', state: 'running', rate: 1175, unit: 'u/h' },
          { name: 'Pack', tag: 'ST-5', state: 'fault', rate: 0, unit: 'u/h' },
        ]}
      ></ind-production-line-overview>
    `),
};

export const MachineOverview: Story = {
  render: () => html`
    <div style="padding:16px;">
      <ind-machine-overview heading="Filler FL-2" machine-id="FL-2" state="running" .oee=${86} .columns=${3}>
        <ind-pump-card tag="P-101" label="Product pump" state="running" .flow=${42.7} .pressure=${4.2}></ind-pump-card>
        <ind-motor-card tag="M-204" label="Carousel" state="running" .speed=${1480} .current=${12.4}></ind-motor-card>
        <ind-tank-level-card tag="T-204" label="Product tank" state="running" .level=${62}></ind-tank-level-card>
      </ind-machine-overview>
    </div>
  `,
};

export const ProductionCell: Story = {
  render: () => html`
    <div style="padding:16px;">
      <ind-production-cell heading="Packaging cell" cell-id="CELL-A" state="warning" .columns=${2}>
        <ind-equipment-status-card heading="Case packer" tag="CP-1" state="running" state-label="Running">
          <ind-conveyor state="running" size="md"></ind-conveyor>
        </ind-equipment-status-card>
        <ind-equipment-status-card heading="Palletizer" tag="PL-1" state="warning" state-label="Warning" detail="Vacuum low">
          <ind-motor state="warning" size="md"></ind-motor>
        </ind-equipment-status-card>
      </ind-production-cell>
    </div>
  `,
};

export const WorkstationMonitor: Story = {
  render: () =>
    pad(html`
      <ind-workstation-monitor
        heading="Assembly"
        station="WS-07"
        operator="a.martin"
        job="WO-99812"
        state="running"
        .produced=${342}
        .rejected=${6}
        .target=${500}
      ></ind-workstation-monitor>
    `),
};

export const OeeDashboard: Story = {
  render: () =>
    pad(html`
      <ind-oee-dashboard subtitle="Line 2 · Shift A" .availability=${92} .performance=${95} .quality=${98.5}></ind-oee-dashboard>
    `),
};
