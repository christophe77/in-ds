/**
 * Client logic for the homepage hero composition. Lives in a .ts module (not an
 * inline <script>) so it is compiled by esbuild with full TypeScript support —
 * the Astro template compiler mis-parses `<>` generics inside inline scripts.
 *
 * Registers the ind-ds elements it uses, then drives four simulated process
 * scenarios and a slow live-value feed (paused under prefers-reduced-motion).
 */
import '@/lib/ind-runtime';

type Scenario = 'normal' | 'warning' | 'fault' | 'commloss';

interface AlarmItem {
  id: string;
  priority: string;
  tag: string;
  message: string;
  time: string;
  acknowledged?: boolean;
}

interface Config {
  pumpState: string;
  tankState: string;
  tankAlarm: string;
  valveState: string;
  conn: string;
  headerMqtt: string;
  headerLabel: string;
  tempAlarm: string;
  startStop: string;
  statusState: string;
  statusMsg: string;
  alarms: AlarmItem[];
  live: boolean;
  dischargeBase: number;
  tempBase: number;
}

const q = (role: string): Element | null =>
  document.querySelector(`[data-role="${role}"]`);

const els = {
  header: q('header'),
  pump: q('pump'),
  tank: q('tank'),
  valve: q('valve'),
  conn: q('conn'),
  connDot: q('conn-dot') as HTMLElement | null,
  vSuction: q('v-suction'),
  vDisch: q('v-disch'),
  vTemp: q('v-temp'),
  spark: q('spark') as (HTMLElement & { points?: number[] }) | null,
  startstop: q('startstop'),
  alarms: q('alarms') as (HTMLElement & { alarms?: AlarmItem[] }) | null,
  statusbar: q('statusbar'),
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const now = (): string => new Date().toLocaleTimeString('en-GB', { hour12: false });

const scenarios: { [K in Scenario]: () => Config } = {
  normal: () => ({
    pumpState: 'running', tankState: 'running', tankAlarm: 'none', valveState: 'open',
    conn: 'connected', headerMqtt: 'running', headerLabel: 'Connected', tempAlarm: 'none',
    startStop: 'running', statusState: 'running', statusMsg: 'All systems nominal',
    alarms: [], live: true, dischargeBase: 4.2, tempBase: 58,
  }),
  warning: () => ({
    pumpState: 'warning', tankState: 'warning', tankAlarm: 'high', valveState: 'open',
    conn: 'connected', headerMqtt: 'warning', headerLabel: 'Connected', tempAlarm: 'high',
    startStop: 'running', statusState: 'warning', statusMsg: 'Motor temperature high — monitoring',
    alarms: [{ id: 'a1', priority: 'high', tag: 'M-101', message: 'Motor temperature high', time: now() }],
    live: true, dischargeBase: 5.1, tempBase: 82,
  }),
  fault: () => ({
    pumpState: 'fault', tankState: 'fault', tankAlarm: 'high', valveState: 'fault',
    conn: 'connected', headerMqtt: 'fault', headerLabel: 'Connected', tempAlarm: 'high-high',
    startStop: 'fault', statusState: 'fault', statusMsg: 'Pump P-101 tripped on overtemperature',
    alarms: [
      { id: 'a1', priority: 'high-high', tag: 'M-101', message: 'Motor overtemperature trip', time: now() },
      { id: 'a2', priority: 'high', tag: 'P-101', message: 'Discharge pressure high', time: now() },
    ],
    live: true, dischargeBase: 6.3, tempBase: 104,
  }),
  commloss: () => ({
    pumpState: 'maintenance', tankState: 'maintenance', tankAlarm: 'none', valveState: 'closed',
    conn: 'disconnected', headerMqtt: 'stopped', headerLabel: 'Disconnected', tempAlarm: 'none',
    startStop: 'stopped', statusState: 'neutral', statusMsg: 'PLC link lost — values stale',
    alarms: [{ id: 'c1', priority: 'high', tag: 'GW-1', message: 'Communication loss to PLC', time: now() }],
    live: false, dischargeBase: 4.2, tempBase: 58,
  }),
};

let timer: number | undefined;
const seriesData: number[] = Array.from({ length: 30 }, () => 4.2);

function attr(el: Element | null, name: string, value: string | number): void {
  if (el) el.setAttribute(name, String(value));
}

function apply(name: Scenario): void {
  const cfg = scenarios[name]();

  attr(els.pump, 'state', cfg.pumpState);
  attr(els.tank, 'state', cfg.tankState);
  attr(els.tank, 'alarm', cfg.tankAlarm);
  attr(els.valve, 'state', cfg.valveState);
  attr(els.conn, 'state', cfg.conn);
  attr(els.header, 'mqtt-state', cfg.headerMqtt);
  attr(els.header, 'mqtt-label', cfg.headerLabel);
  attr(els.vTemp, 'alarm', cfg.tempAlarm);
  attr(els.startstop, 'state', cfg.startStop);
  attr(els.statusbar, 'state', cfg.statusState);
  attr(els.statusbar, 'message', cfg.statusMsg);

  if (els.connDot) {
    els.connDot.style.background =
      cfg.conn === 'connected' ? 'var(--ind-state-running-bg)' : 'var(--ind-state-stopped-bg)';
    els.connDot.style.boxShadow = cfg.conn === 'connected' ? '0 0 6px var(--ind-state-running-glow)' : 'none';
  }
  if (els.alarms) els.alarms.alarms = cfg.alarms;

  if (timer) window.clearInterval(timer);
  if (!cfg.live) {
    attr(els.vDisch, 'value', '--');
    attr(els.vTemp, 'value', '--');
    attr(els.vSuction, 'value', '--');
    return;
  }

  const jitter = (base: number, amp: number): number => base + (Math.random() - 0.5) * amp;
  const tick = (): void => {
    const disch = jitter(cfg.dischargeBase, 0.3);
    seriesData.push(Number(disch.toFixed(2)));
    seriesData.shift();
    attr(els.vDisch, 'value', disch.toFixed(1));
    attr(els.vSuction, 'value', jitter(1.1, 0.1).toFixed(1));
    attr(els.vTemp, 'value', Math.round(jitter(cfg.tempBase, 2)));
    if (els.spark) els.spark.points = seriesData.slice();
  };
  tick();
  if (!reduceMotion) timer = window.setInterval(tick, 1600);
}

const buttons = Array.from(document.querySelectorAll('.hero-demo__scenario')) as HTMLButtonElement[];
for (const b of buttons) {
  b.addEventListener('click', () => {
    for (const other of buttons) other.setAttribute('aria-pressed', String(other === b));
    apply(b.dataset.scenario as Scenario);
  });
}

apply('normal');
