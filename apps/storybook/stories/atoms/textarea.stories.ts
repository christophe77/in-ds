import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

type Args = {
  value: string;
  placeholder?: string;
  label?: string;
  rows: number;
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'mono';
  disabled: boolean;
  readonly: boolean;
  invalid: boolean;
  autoScroll: boolean;
};

const MQTT_SAMPLE = `[14:32:07.012] plant/area1/plc/state {"value":"RUN"}
[14:32:07.045] plant/area1/dispense/state {"value":"IDLE"}
[14:32:07.112] plant/area1/return/state {"value":"IDLE"}
[14:32:07.183] plant/area1/washer/state {"value":"RINSE","temp":62.4}
[14:32:07.241] plant/area1/tank/A/level {"value":24}
[14:32:07.302] plant/area1/alarm/PT-101/state {"priority":"high","ack":false}`;

const meta: Meta<Args> = {
  title: 'Atoms/Textarea',
  component: 'ind-textarea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text. `variant="mono"` swaps to monospace + small + black background — for MQTT ' +
          'streams and sequencer logs. Pair with `readonly` and `autoScroll` to make a log tail.',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 30 } },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['default', 'mono'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    autoScroll: { control: 'boolean' },
  },
  args: {
    value: '',
    placeholder: 'Maintenance note…',
    label: 'Comment',
    rows: 4,
    size: 'md',
    variant: 'default',
    disabled: false,
    readonly: false,
    invalid: false,
    autoScroll: false,
  },
  render: (args) => html`
    <ind-textarea
      .value=${args.value}
      placeholder=${args.placeholder ?? ''}
      label=${args.label ?? ''}
      .rows=${args.rows}
      size=${args.size}
      variant=${args.variant}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?invalid=${args.invalid}
      ?auto-scroll=${args.autoScroll}
      style="width: 480px;"
    ></ind-textarea>
  `,
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const MqttLog: Story = {
  name: 'MQTT log (mono + readonly + auto-scroll)',
  args: {
    variant: 'mono',
    readonly: true,
    autoScroll: true,
    rows: 12,
    label: 'MQTT stream',
    value: MQTT_SAMPLE,
  },
};
export const Invalid: Story = { args: { invalid: true, value: 'short', label: 'Justification (min 50 chars)' } };
