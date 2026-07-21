import { SITE } from './site';

export interface NavLink {
  label: string;
  href: string;
  /** External links open in a new tab and get rel=noopener. */
  external?: boolean;
}

/** Primary header navigation. */
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Components', href: '/components' },
  { label: 'Use cases', href: '/use-cases' },
  { label: 'Principles', href: '/principles' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Docs', href: '/getting-started' },
  { label: 'Blog', href: '/blog' },
];

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const FOOTER_NAV: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Use cases', href: '/use-cases' },
      { label: 'Principles', href: '/principles' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    heading: 'Documentation',
    links: [
      { label: 'Getting started', href: '/getting-started' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Storybook', href: SITE.storybook, external: true },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'GitHub', href: SITE.repo, external: true },
      { label: 'npm', href: SITE.npmOrg, external: true },
      { label: 'Issues', href: SITE.issues, external: true },
      { label: 'Contributing', href: '/contributing' },
    ],
  },
  {
    heading: 'Project',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'License (MIT)', href: '/license' },
      { label: 'Releases', href: SITE.releases, external: true },
    ],
  },
];
