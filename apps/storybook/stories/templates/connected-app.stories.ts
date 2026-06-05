import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const TANKS = [
  { id: 'a', label: 'A', level: 82 },
  { id: 'b', label: 'B', level: 24 },
  { id: 'c', label: 'C', level: 6 },
  { id: 'd', label: 'D', level: 67 },
];

const meta: Meta = {
  title: 'Templates/T2 — Connected app',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full app shell: `<ind-app-header>` on top, `<ind-sidebar-nav>` + scrollable content in the middle, ' +
          '`<ind-status-bar>` at the bottom. Multiple page variants show how the same shell hosts ' +
          'Dashboard, MQTT Monitor, and Robots screens.',
      },
    },
    controls: { disable: true },
  },
};
export default meta;
type Story = StoryObj;

const shell = (active: string, content: ReturnType<typeof html>, statusMsg = 'Connected to broker.example:1883', statusState = 'running') => html`
  <div style="display: flex; flex-direction: column; min-height: 100vh; font-family: var(--ind-font-family-sans);">

    <ind-app-header
      brand="INDUSTRIAL"
      sub-brand="Maintenance Console"
      machine-id="MAC-204"
      mqtt-state="running"
      mqtt-label="Connected"
      version="v1.4.2"
      docs-url="#"
    ></ind-app-header>

    <div style="flex: 1; display: flex; min-height: 0;">

      <ind-sidebar-nav>
        <ind-nav-item label="Dashboard"      ?active=${active === 'dashboard'}></ind-nav-item>
        <ind-nav-item label="PLC Reset"      ?active=${active === 'plc'}></ind-nav-item>
        <ind-nav-item label="Doors"          ?active=${active === 'doors'}></ind-nav-item>
        <ind-nav-item label="Robots"         ?active=${active === 'robots'}></ind-nav-item>
        <ind-nav-item label="Move Sequencer" ?active=${active === 'seq'}></ind-nav-item>
        <ind-nav-item label="Valves"         ?active=${active === 'valves'}></ind-nav-item>
        <ind-nav-item label="Dispense"       ?active=${active === 'dispense'}></ind-nav-item>
        <ind-nav-item label="Shelves"        ?active=${active === 'shelves'}></ind-nav-item>
        <ind-nav-item label="Washer"         ?active=${active === 'washer'}></ind-nav-item>
        <ind-nav-item label="Tanks"          badge="1" ?active=${active === 'tanks'}></ind-nav-item>
        <ind-nav-item label="Software"       ?active=${active === 'software'}></ind-nav-item>
        <ind-divider></ind-divider>
        <ind-nav-item label="MQTT Monitor"   ?active=${active === 'mqtt'}></ind-nav-item>
      </ind-sidebar-nav>

      <main class="ind-scroll-area" style="
        flex: 1;
        padding: 16px;
        background: var(--ind-surface-background);
        min-width: 0;
      ">
        ${content}
      </main>
    </div>

    <ind-status-bar state=${statusState} message=${statusMsg}>
      <span class="ind-text-mono">14:32:07</span>
    </ind-status-bar>
  </div>
`;

export const Dashboard: Story = {
  render: () =>
    shell(
      'dashboard',
      html`
        <h4 class="ind-section-label" style="margin: 0 0 12px;">System status</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 24px;">
          <ind-health-card heading="PLC"            state="running" state-label="RUN"   detail="Heartbeat 12 s ago"></ind-health-card>
          <ind-health-card heading="Dispense robot" state="running" state-label="IDLE"  detail="42 cycles today"></ind-health-card>
          <ind-health-card heading="Return robot"   state="warning" state-label="WARN"  detail="J3 current rising"></ind-health-card>
          <ind-health-card heading="Washer"         state="fault"   state-label="FAULT" detail="Rinse pump amperage"></ind-health-card>
        </div>

        <h4 class="ind-section-label" style="margin: 0 0 12px;">Machine metrics</h4>
        <div class="ind-group" style="margin-bottom: 24px;">
          <div class="ind-group__body">
            <div class="ind-metric-row"><span class="ind-metric-row__key">Total drinks served</span> <span class="ind-metric-row__value">142 308</span></div>
            <div class="ind-metric-row"><span class="ind-metric-row__key">Uptime (24h)</span>        <span class="ind-metric-row__value">98.4 %</span></div>
            <div class="ind-metric-row"><span class="ind-metric-row__key">MTBF</span>                <span class="ind-metric-row__value">142 h</span></div>
            <div class="ind-metric-row"><span class="ind-metric-row__key">Last alarm</span>          <span class="ind-metric-row__value">14:32:07</span></div>
          </div>
        </div>

        <h4 class="ind-section-label" style="margin: 0 0 12px;">Active issues</h4>
        <div class="ind-stack ind-stack--xs">
          <ind-alarm priority="high-high" label="TT-204 reactor temperature critical (187.3 °C)" timestamp="14:32:07"></ind-alarm>
          <ind-alarm priority="high"      label="PT-101 discharge pressure high (18.7 bar)"       timestamp="14:31:58"></ind-alarm>
          <ind-alarm priority="low"       label="LT-330 tank level low (28.1 %)"                  timestamp="14:30:12"></ind-alarm>
        </div>
      `,
    ),
};

export const MqttMonitorPage: Story = {
  name: 'MQTT Monitor page',
  render: () =>
    shell(
      'mqtt',
      html`
        <h4 class="ind-section-label" style="margin: 0 0 12px;">MQTT Monitor</h4>
        <ind-mqtt-monitor
          .log=${Array.from({ length: 80 })
            .map((_, i) => {
              const t = new Date(Date.now() - (80 - i) * 1000).toISOString().slice(11, 23);
              const topics = ['plant/area1/plc/state', 'plant/area1/tank/A/level', 'plant/area1/washer/state'];
              return `[${t}] ${topics[i % topics.length]} {"v":${(Math.random() * 100).toFixed(1)}}`;
            })
            .join('\n')}
          .rows=${24}
        ></ind-mqtt-monitor>
      `,
    ),
};

export const RobotsPage: Story = {
  name: 'Robots page',
  render: () =>
    shell(
      'robots',
      html`
        <h4 class="ind-section-label" style="margin: 0 0 12px;">Robots</h4>
        <div style="display: grid; grid-template-columns: repeat(2, max-content); gap: 16px;">
          <div class="ind-group">
            <h3 class="ind-group__title">Dispense robot</h3>
            <ind-scara-canvas .joints=${[30, 45, 10]} state="moving"></ind-scara-canvas>
          </div>
          <div class="ind-group">
            <h3 class="ind-group__title">Return robot</h3>
            <ind-scara-canvas .joints=${[-60, 30, -20]} state="idle"></ind-scara-canvas>
          </div>
        </div>
      `,
    ),
};

export const TanksPage: Story = {
  name: 'Tanks page',
  render: () =>
    shell(
      'tanks',
      html`
        <h4 class="ind-section-label" style="margin: 0 0 12px;">Tanks</h4>
        <div class="ind-stack ind-stack--sm" style="max-width: 720px;">
          ${TANKS.map(
            (t) => html`
              <ind-fill-row
                tag=${`TK-${t.label}`}
                label=${`Buffer tank ${t.label}`}
                .value=${t.level}
                variant=${t.level < 10 ? 'error' : t.level < 30 ? 'warning' : 'default'}
                ?severity=${t.level < 30}
              >
                <ind-button size="sm">Adjust</ind-button>
                <ind-button size="sm" variant=${t.level < 10 ? 'primary' : 'ghost'}>Replace</ind-button>
              </ind-fill-row>
            `,
          )}
        </div>

        <h4 class="ind-section-label" style="margin: 24px 0 12px;">Shelves</h4>
        <ind-shelf-canvas .slots=${TANKS} cols="4" heading="Shelf 1"></ind-shelf-canvas>
      `,
      'Tank C critical — replace required',
      'fault',
    ),
};
