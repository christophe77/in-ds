import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Molecules/Process Monitoring',
  parameters: {
    docs: {
      description: {
        component:
          'Monitoring molecules assembled from atoms: tag cards, equipment faceplates ' +
          '(motor / pump / valve / tank), the alarm badge group and KPI / energy cards.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const grid = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start; padding:16px;">${content}</div>
`;

export const TagCards: Story = {
  render: () =>
    grid(html`
      <ind-tag-card tag="PT-101" label="Discharge pressure" .value=${4.2} unit="bar" .precision=${2} trend="up"></ind-tag-card>
      <ind-tag-card tag="TT-204" label="Reactor temp" .value=${187.4} unit="°C" .precision=${1} alarm="high" state="warning"></ind-tag-card>
      <ind-tag-card tag="FT-310" label="Feed flow" .value=${0} unit="m³/h" .precision=${1} state="stopped"></ind-tag-card>
    `),
};

export const EquipmentStatusCards: Story = {
  render: () =>
    grid(html`
      <ind-equipment-status-card heading="Feed pump" tag="P-101" state="running" state-label="Running" detail="Runtime 124 h">
        <ind-pump state="running" size="md"></ind-pump>
      </ind-equipment-status-card>
      <ind-equipment-status-card heading="Exhaust fan" tag="F-220" state="fault" state-label="Fault" detail="Overcurrent trip">
        <ind-fan state="fault" size="md"></ind-fan>
      </ind-equipment-status-card>
    `),
};

export const MotorCard: Story = {
  render: () =>
    grid(html`
      <ind-motor-card tag="M-204" label="Agitator" state="running" .speed=${1480} .current=${12.4} .load=${68}></ind-motor-card>
      <ind-motor-card tag="M-118" label="Conveyor drive" state="stopped" .speed=${0} .current=${0}></ind-motor-card>
    `),
};

export const PumpCard: Story = {
  render: () =>
    grid(html`
      <ind-pump-card tag="P-101" label="Feed pump" state="running" .flow=${42.7} .pressure=${4.2}></ind-pump-card>
      <ind-pump-card tag="P-102" label="Standby pump" state="fault" .flow=${0} .pressure=${0.1}></ind-pump-card>
    `),
};

export const ValveCard: Story = {
  render: () =>
    grid(html`
      <ind-valve-card tag="FV-12" label="Feed valve" state="open" .position=${100}></ind-valve-card>
      <ind-valve-card tag="FV-13" label="Recycle valve" state="transit" .position=${45}></ind-valve-card>
      <ind-valve-card tag="FV-14" label="Drain valve" state="closed"></ind-valve-card>
    `),
};

export const TankLevelCard: Story = {
  render: () =>
    grid(html`
      <ind-tank-level-card tag="T-204" label="Buffer tank" state="running" .level=${62} .capacity=${5000} unit="L"></ind-tank-level-card>
      <ind-tank-level-card tag="T-205" label="Day tank" state="warning" .level=${88} alarm="high" .capacity=${2000} unit="L"></ind-tank-level-card>
    `),
};

export const AlarmBadgeGroup: Story = {
  render: () =>
    grid(html`
      <ind-alarm-badge-group .highHigh=${1} .high=${3} .low=${2} .lowLow=${0} show-total></ind-alarm-badge-group>
      <ind-alarm-badge-group .highHigh=${0} .high=${0} .low=${4} .lowLow=${1} hide-zero></ind-alarm-badge-group>
    `),
};

export const KpiCards: Story = {
  render: () =>
    grid(html`
      <ind-kpi-card label="OEE" .value=${86.4} unit="%" .precision=${1} trend="up" delta="+2.1 % vs target" variant="good"></ind-kpi-card>
      <ind-kpi-card label="Throughput" .value=${1240} unit="u/h" trend="down" delta="-3.4 % vs last shift" variant="bad"></ind-kpi-card>
      <ind-kpi-card label="Scrap" .value=${1.8} unit="%" .precision=${1} trend="flat" delta="On plan"></ind-kpi-card>
    `),
};

export const EnergyCard: Story = {
  render: () =>
    grid(html`
      <ind-energy-card
        label="Active power"
        .value=${312.5}
        unit="kW"
        trend="up"
        .total=${4820}
        total-unit="kWh"
        .points=${[280, 295, 288, 305, 312, 308, 318, 312]}
      ></ind-energy-card>
    `),
};

export const Dashboard: Story = {
  name: 'Realistic — Line overview',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; padding:16px; max-width:760px;">
      <ind-kpi-card label="OEE" .value=${86.4} unit="%" .precision=${1} trend="up" delta="+2.1 %" variant="good"></ind-kpi-card>
      <ind-tag-card tag="PT-101" label="Header pressure" .value=${4.2} unit="bar" .precision=${2} trend="stable"></ind-tag-card>
      <ind-alarm-badge-group .highHigh=${1} .high=${2} .low=${3} .lowLow=${0} show-total></ind-alarm-badge-group>
      <ind-pump-card tag="P-101" label="Feed pump" state="running" .flow=${42.7} .pressure=${4.2}></ind-pump-card>
      <ind-motor-card tag="M-204" label="Agitator" state="running" .speed=${1480} .current=${12.4} .load=${68}></ind-motor-card>
      <ind-tank-level-card tag="T-204" label="Buffer tank" state="running" .level=${62} .capacity=${5000} unit="L"></ind-tank-level-card>
    </div>
  `,
};
