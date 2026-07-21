/**
 * Central site facts. Everything here is verified against the repository
 * (package manifests, README, LICENSE). No metrics, testimonials, logos or
 * star counts are invented — if it isn't provable from the repo, it isn't here.
 */
import { COMPONENT_COUNT } from './components';

export const SITE = {
  name: 'ind-ds',
  /** Expanded descriptive name (not a rename — used only where a full title reads better). */
  longName: 'Industrial Design System',
  tagline: 'The open-source design system for industrial software.',
  description:
    'Framework-agnostic industrial Web Components, typed React and Vue wrappers, semantic design tokens, and MQTT bindings for modern HMI and SCADA interfaces.',
  author: {
    name: 'Christophe Bellec',
    github: 'https://github.com/christophe77',
  },
  license: 'MIT',
  repo: 'https://github.com/christophe77/ind-ds',
  issues: 'https://github.com/christophe77/ind-ds/issues',
  contributing: 'https://github.com/christophe77/ind-ds/blob/main/README.md#contributing',
  releases: 'https://github.com/christophe77/ind-ds/releases',
  storybook: 'https://christophe77.github.io/ind-ds/',
  npmOrg: 'https://www.npmjs.com/org/ind-ds',
  componentCount: COMPONENT_COUNT,
} as const;

export interface PackageInfo {
  name: string;
  version: string;
  summary: string;
  install: string;
  npm: string;
}

/** Verified from each package manifest on the current branch. */
export const PACKAGES: PackageInfo[] = [
  {
    name: '@ind-ds/tokens',
    version: '0.2.1',
    summary: 'Design tokens — ISA-18.2 alarm priorities, process states, dense spacing. CSS, JS/TS, JSON and Dart exports.',
    install: 'npm install @ind-ds/tokens',
    npm: 'https://www.npmjs.com/package/@ind-ds/tokens',
  },
  {
    name: '@ind-ds/core',
    version: '0.2.2',
    summary: 'Framework-agnostic Web Components, built with Stencil. Includes the tokens as a dependency.',
    install: 'npm install @ind-ds/core',
    npm: 'https://www.npmjs.com/package/@ind-ds/core',
  },
  {
    name: '@ind-ds/react',
    version: '0.2.2',
    summary: 'Typed React 18+ wrappers (forwardRef) for the core components.',
    install: 'npm install @ind-ds/react',
    npm: 'https://www.npmjs.com/package/@ind-ds/react',
  },
  {
    name: '@ind-ds/vue',
    version: '0.3.0',
    summary: 'Typed Vue 3 wrappers with v-model support for the core components.',
    install: 'npm install @ind-ds/vue',
    npm: 'https://www.npmjs.com/package/@ind-ds/vue',
  },
  {
    name: '@ind-ds/mqtt',
    version: '0.2.1',
    summary: 'MQTT-to-DOM binding helpers that map broker topics to component attributes.',
    install: 'npm install @ind-ds/mqtt',
    npm: 'https://www.npmjs.com/package/@ind-ds/mqtt',
  },
];

/** Verified capability claims for the hero proof strip. */
export const PROOF_POINTS: string[] = [
  `${SITE.componentCount} industrial Web Components`,
  'React · Vue · Web Components',
  'CSS · JS · JSON · Dart tokens',
  'Dark · Light · High-contrast',
  'MQTT bindings',
  'MIT licensed',
];
