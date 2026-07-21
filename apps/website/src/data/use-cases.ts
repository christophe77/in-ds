export interface UseCase {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** Whether a dedicated detail page exists. */
  hasPage: boolean;
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'machine-hmi',
    title: 'Machine HMI',
    tagline: 'Embedded panels & touch operation',
    summary:
      'Compact, touch-friendly screens for machine modes, start/stop, setpoints, alarms and equipment state — often on an embedded Chromium panel that must work offline.',
    hasPage: true,
  },
  {
    slug: 'scada',
    title: 'SCADA interface',
    tagline: 'Many assets, overview to detail',
    summary:
      'Navigate hierarchies of assets with alarm summaries, equipment faceplates, process values and trends — the UI layer over your own data acquisition.',
    hasPage: true,
  },
  {
    slug: 'control-room',
    title: 'Control-room dashboard',
    tagline: 'Situational awareness at scale',
    summary:
      'High-density, multi-screen displays with alarm prioritization, reduced visual noise, dark and high-contrast themes, and keyboard navigation.',
    hasPage: true,
  },
  {
    slug: 'industrial-iot',
    title: 'Industrial IoT',
    tagline: 'Remote fleets & live data',
    summary:
      'Web dashboards for remote equipment: device state, connection quality, fleet status and live MQTT data, adopted incrementally.',
    hasPage: true,
  },
  {
    slug: 'embedded-panels',
    title: 'Embedded panels',
    tagline: 'Kiosk, Electron, Tauri, WebView',
    summary:
      'Bundle the components into a Chromium kiosk, Electron or Tauri shell, or a WebView — with hardware constraints, offline bundles and local brokers in mind.',
    hasPage: true,
  },
  {
    slug: 'maintenance',
    title: 'Maintenance application',
    tagline: 'Work orders & diagnostics',
    summary:
      'Health cards, diagnostics panels, event journals and audit rows for maintenance and reliability workflows.',
    hasPage: false,
  },
  {
    slug: 'engineering-config',
    title: 'Engineering & config tools',
    tagline: 'Recipes, parameters, commissioning',
    summary:
      'Dense forms, recipe management, parameter rows and tag trees for engineering and commissioning tools.',
    hasPage: false,
  },
  {
    slug: 'cross-platform',
    title: 'Cross-platform product family',
    tagline: 'One vocabulary, many stacks',
    summary:
      'Share tokens and semantic states across a React app, a Vue portal and a native panel so a product family stays visually consistent.',
    hasPage: false,
  },
];
