import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  brand: string;
  subBrand?: string;
  machineId?: string;
  mqttState: 'running' | 'fault' | 'warning' | 'maintenance' | 'stopped' | 'neutral';
  mqttLabel?: string;
  version?: string;
  docsUrl?: string;
};

const meta: Meta<Args> = {
  title: 'Organisms/AppHeader',
  component: 'ind-app-header',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Top bar: brand, machine, MQTT health, version + docs, change-machine + disconnect. ' +
          'Built-in buttons emit `indChangeMachine` / `indDisconnect`. ' +
          'Slot `actions` to fully override the right-hand button cluster, or `logo` to drop a real image.',
      },
    },
  },
  argTypes: {
    brand: { control: 'text' },
    subBrand: { control: 'text' },
    machineId: { control: 'text' },
    mqttState: { control: 'select', options: ['running', 'fault', 'warning', 'maintenance', 'stopped', 'neutral'] },
    mqttLabel: { control: 'text' },
    version: { control: 'text' },
    docsUrl: { control: 'text' },
  },
  args: {
    brand: 'INDUSTRIAL',
    subBrand: 'Maintenance Console',
    machineId: 'MAC-204',
    mqttState: 'running',
    mqttLabel: 'Connected',
    version: 'v1.4.2',
    docsUrl: 'https://example.com/docs',
  },
  render: (args) => html`
    <ind-app-header
      brand=${args.brand}
      sub-brand=${args.subBrand ?? ''}
      machine-id=${args.machineId ?? ''}
      mqtt-state=${args.mqttState}
      mqtt-label=${args.mqttLabel ?? ''}
      version=${args.version ?? ''}
      docs-url=${args.docsUrl ?? ''}
      @indChangeMachine=${() => console.log('[app-header] change machine')}
      @indDisconnect=${() => console.log('[app-header] disconnect')}
    ></ind-app-header>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Connected: Story = {};
export const Reconnecting: Story = {
  args: { mqttState: 'warning', mqttLabel: 'Reconnecting…' },
};
export const Disconnected: Story = {
  args: { mqttState: 'fault', mqttLabel: 'Disconnected' },
};
