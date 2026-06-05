import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Foundations/Layout utilities',
  parameters: {
    docs: {
      description: {
        component:
          'Framework-agnostic CSS classes from `@ind-ds/core/css/utilities`. ' +
          'Compose vertical/horizontal stacks, group boxes, section headers, info rows, ' +
          'warn notes and themed scrollbars without dragging in a runtime.',
      },
    },
    controls: { disable: true },
  },
};
export default meta;
type Story = StoryObj;

export const Stacks: Story = {
  render: () => html`
    <div class="ind-row ind-row--lg" style="padding: 12px;">
      <div class="ind-stack ind-stack--xs"><b>xs (4)</b><span>a</span><span>b</span><span>c</span></div>
      <div class="ind-stack ind-stack--sm"><b>sm (6)</b><span>a</span><span>b</span><span>c</span></div>
      <div class="ind-stack ind-stack--md"><b>md (8)</b><span>a</span><span>b</span><span>c</span></div>
      <div class="ind-stack ind-stack--lg"><b>lg (16)</b><span>a</span><span>b</span><span>c</span></div>
      <div class="ind-stack ind-stack--xl"><b>xl (24)</b><span>a</span><span>b</span><span>c</span></div>
    </div>
  `,
};

export const GroupBox: Story = {
  render: () => html`
    <div class="ind-group" style="max-width: 360px;">
      <h3 class="ind-group__title">PLC Maintenance</h3>
      <div class="ind-group__body">
        <div class="ind-info-row">
          <span class="ind-info-row__label">PLC state</span>
          <span class="ind-info-row__value">RUN</span>
        </div>
        <div class="ind-info-row">
          <span class="ind-info-row__label">Maintenance mode</span>
          <span class="ind-info-row__value">OFF</span>
        </div>
        <div class="ind-info-row">
          <span class="ind-info-row__label">Cycle counter</span>
          <span class="ind-info-row__value">1 482 037</span>
        </div>
      </div>
    </div>
  `,
};

export const SectionHeaders: Story = {
  render: () => html`
    <div class="ind-stack ind-stack--sm">
      <div class="ind-section-header">PLC reset</div>
      <div class="ind-section-header ind-section-header--info">MQTT monitor</div>
      <div class="ind-section-header ind-section-header--warning">Software updates</div>
      <div class="ind-section-header ind-section-header--danger">Emergency stop</div>
      <div class="ind-section-header ind-section-header--success">All systems nominal</div>
      <div class="ind-section-header ind-section-header--neutral">HMI Maintenance</div>
    </div>
  `,
};

export const SectionLabel: Story = {
  render: () => html`
    <div class="ind-stack ind-stack--md" style="max-width: 480px;">
      <h4 class="ind-section-label">System status</h4>
      <p>4 health cards go here.</p>
      <h4 class="ind-section-label">Machine metrics</h4>
      <p>2 columns of metric rows go here.</p>
      <h4 class="ind-section-label">Active issues</h4>
      <p>Alarm list goes here.</p>
    </div>
  `,
};

export const WarnNote: Story = {
  render: () => html`
    <div style="max-width: 480px;">
      <p class="ind-warn-note">
        This action will restart the dispense agent and interrupt active orders.
        Confirm only if no operator is currently using the machine.
      </p>
    </div>
  `,
};

export const InfoRows: Story = {
  render: () => html`
    <div class="ind-group" style="max-width: 400px;">
      <h3 class="ind-group__title">Washer status</h3>
      <div class="ind-group__body">
        <div class="ind-info-row"><span class="ind-info-row__label">Cycle</span>             <span class="ind-info-row__value">RINSE</span></div>
        <div class="ind-info-row"><span class="ind-info-row__label">Temperature</span>       <span class="ind-info-row__value">62.4 °C</span></div>
        <div class="ind-info-row"><span class="ind-info-row__label">Flow rate</span>         <span class="ind-info-row__value">14.2 L/min</span></div>
        <div class="ind-info-row"><span class="ind-info-row__label">Pressure</span>          <span class="ind-info-row__value">3.1 bar</span></div>
        <div class="ind-info-row"><span class="ind-info-row__label">Cycles completed</span>  <span class="ind-info-row__value">8 304</span></div>
      </div>
    </div>
  `,
};

export const MetricRows: Story = {
  render: () => html`
    <div class="ind-group" style="max-width: 400px;">
      <h3 class="ind-group__title">Machine metrics</h3>
      <div class="ind-group__body">
        <div class="ind-metric-row"><span class="ind-metric-row__key">Total drinks served</span> <span class="ind-metric-row__value">142 308</span></div>
        <div class="ind-metric-row"><span class="ind-metric-row__key">Uptime (24h)</span>        <span class="ind-metric-row__value">98.4 %</span></div>
        <div class="ind-metric-row"><span class="ind-metric-row__key">MTBF</span>                 <span class="ind-metric-row__value">142 h</span></div>
        <div class="ind-metric-row"><span class="ind-metric-row__key">Last alarm</span>           <span class="ind-metric-row__value">14:32:07</span></div>
      </div>
    </div>
  `,
};

export const Table: Story = {
  name: 'Table (.ind-table)',
  render: () => html`
    <table class="ind-table ind-table--striped" style="max-width: 720px;">
      <thead>
        <tr>
          <th>Process</th>
          <th>Status</th>
          <th class="num">PID</th>
          <th class="num">CPU %</th>
          <th class="num">RSS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>dispense-agent</td>
          <td><span class="ind-status-line"><ind-status-dot state="running" size="sm"></ind-status-dot>running</span></td>
          <td class="num">2 184</td>
          <td class="num">2.4</td>
          <td class="num">142 MB</td>
        </tr>
        <tr>
          <td>return-agent</td>
          <td><span class="ind-status-line"><ind-status-dot state="running" size="sm"></ind-status-dot>running</span></td>
          <td class="num">2 185</td>
          <td class="num">1.8</td>
          <td class="num">98 MB</td>
        </tr>
        <tr class="is-alarm--high">
          <td>washer-agent</td>
          <td><span class="ind-status-line"><ind-status-dot state="warning" size="sm"></ind-status-dot>degraded</span></td>
          <td class="num">2 186</td>
          <td class="num">12.7</td>
          <td class="num">312 MB</td>
        </tr>
        <tr class="is-alarm--high-high">
          <td>mqtt-bridge</td>
          <td><span class="ind-status-line"><ind-status-dot state="fault" size="sm" blinking></ind-status-dot>crashed</span></td>
          <td class="num">—</td>
          <td class="num">—</td>
          <td class="num">—</td>
        </tr>
        <tr>
          <td>health-reporter</td>
          <td><span class="ind-status-line"><ind-status-dot state="running" size="sm"></ind-status-dot>running</span></td>
          <td class="num">2 188</td>
          <td class="num">0.3</td>
          <td class="num">41 MB</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const Toolbar: Story = {
  name: 'Toolbar (.ind-toolbar)',
  render: () => html`
    <div class="ind-toolbar" style="max-width: 720px;">
      <ind-input placeholder="Filter topic..." size="sm" style="min-width: 260px;"></ind-input>
      <ind-checkbox label="Pause stream"></ind-checkbox>
      <span class="ind-toolbar__end">
        <span class="ind-text-muted ind-text-mono">1 248 msg</span>
        <ind-button size="sm">Clear</ind-button>
      </span>
    </div>
  `,
};

export const StatusLines: Story = {
  render: () => html`
    <div class="ind-stack ind-stack--xs" style="padding: 12px;">
      <span class="ind-status-line"><ind-status-dot state="running"></ind-status-dot> Connected to broker.kadeya.local:1883</span>
      <span class="ind-status-line"><ind-status-dot state="info"></ind-status-dot> Subscribed to 14 topics</span>
      <span class="ind-status-line"><ind-status-dot state="warning"></ind-status-dot> 3 messages dropped (queue full)</span>
      <span class="ind-status-line"><ind-status-dot state="fault" blinking></ind-status-dot> Connection lost — reconnecting</span>
    </div>
  `,
};
