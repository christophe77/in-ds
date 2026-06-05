import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const SAMPLE = Array.from({ length: 60 }).map((_, i) => {
  const t = new Date(Date.now() - (60 - i) * 1000).toISOString().slice(11, 23);
  const topics = [
    'plant/area1/plc/state',
    'plant/area1/dispense/state',
    'plant/area1/return/state',
    'plant/area1/washer/state',
    'plant/area1/tank/A/level',
    'plant/area1/tank/B/level',
    'plant/area1/alarm/PT-101/state',
  ];
  const topic = topics[i % topics.length];
  const payload = i % 7 === 0 ? '{"priority":"high","ack":false}' : `{"value":${(Math.random() * 100).toFixed(1)}}`;
  return `[${t}] ${topic} ${payload}`;
}).join('\n');

type Args = {
  log: string;
  filterValue: string;
  paused: boolean;
  rows: number;
};

const meta: Meta<Args> = {
  title: 'Organisms/MqttMonitor',
  component: 'ind-mqtt-monitor',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Live MQTT stream with filter + pause + counter + clear. Pass `log` as a newline-' +
          'separated string; the component filters and renders in a monospace log area. ' +
          'Auto-scrolls to the bottom when new content arrives unless `paused`.',
      },
    },
  },
  argTypes: {
    log: { control: 'text' },
    filterValue: { control: 'text' },
    paused: { control: 'boolean' },
    rows: { control: { type: 'number', min: 5, max: 40 } },
  },
  args: {
    log: SAMPLE,
    filterValue: '',
    paused: false,
    rows: 18,
  },
  render: (args) => html`
    <ind-mqtt-monitor
      .log=${args.log}
      filter-value=${args.filterValue}
      ?paused=${args.paused}
      .rows=${args.rows}
      style="width: 720px;"
      @indFilterChange=${(e: CustomEvent<string>) => console.log('[mqtt] filter', e.detail)}
      @indPauseChange=${(e: CustomEvent<boolean>) => console.log('[mqtt] pause', e.detail)}
      @indClear=${() => console.log('[mqtt] clear')}
    ></ind-mqtt-monitor>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Filtered: Story = { args: { filterValue: 'tank' } };
export const Paused: Story = { args: { paused: true } };
