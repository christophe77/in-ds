import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Molecules/Communication',
  parameters: {
    docs: {
      description: {
        component:
          'Communication molecules: MQTT / OPC UA tag bindings, device connection card and ' +
          'network status card.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const grid = (content: ReturnType<typeof html>) => html`
  <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start; padding:16px;">${content}</div>
`;

export const MqttBinding: Story = {
  render: () =>
    grid(html`
      <ind-mqtt-tag-binding label="Tank level" topic="plant/line2/tank/level" .value=${62.4} unit="%" .qos=${1} retained state="connected"></ind-mqtt-tag-binding>
      <ind-mqtt-tag-binding label="Pump cmd" topic="plant/line2/pump/cmd" value="START" .qos=${2} state="connecting"></ind-mqtt-tag-binding>
    `),
};

export const OpcUaBinding: Story = {
  render: () =>
    grid(html`
      <ind-opcua-tag-binding label="Discharge pressure" node-id="ns=2;s=Channel1.Device1.PT101" .value=${4.21} unit="bar" quality="good" state="connected"></ind-opcua-tag-binding>
      <ind-opcua-tag-binding label="Feed flow" node-id="ns=2;s=Channel1.Device1.FT310" .value=${0} unit="m³/h" quality="bad" state="error"></ind-opcua-tag-binding>
    `),
};

export const DeviceConnectionCard: Story = {
  render: () =>
    grid(html`
      <ind-device-connection-card name="Line 2 PLC" protocol="Modbus TCP" endpoint="192.168.10.20:502" state="connected" .latency=${8}></ind-device-connection-card>
      <ind-device-connection-card name="Drive VFD-3" protocol="EtherNet/IP" endpoint="192.168.10.33" state="error" .latency=${0}></ind-device-connection-card>
    `),
};

export const NetworkStatusCard: Story = {
  render: () =>
    grid(html`
      <ind-network-status-card label="Cellular WAN" .level=${4} address="10.8.0.2" .rxKbps=${2400} .txKbps=${640} state="connected"></ind-network-status-card>
      <ind-network-status-card label="Wi-Fi AP" .level=${2} address="192.168.4.12" .rxKbps=${150} .txKbps=${48} state="connecting"></ind-network-status-card>
    `),
};
