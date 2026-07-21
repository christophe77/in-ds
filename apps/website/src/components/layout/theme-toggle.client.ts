/**
 * Theme switcher behavior. External .ts module (not inline) so esbuild handles
 * the TypeScript — the Astro template compiler mis-parses some TS syntax inside
 * inline <script> blocks.
 */
const KEY = 'ind-ds-theme';
const root = document.documentElement;
const buttons = Array.from(
  document.querySelectorAll('.theme-toggle__btn'),
) as HTMLButtonElement[];

function sync(theme: string): void {
  for (const b of buttons) {
    b.setAttribute('aria-pressed', String(b.dataset.themeValue === theme));
  }
}

function current(): string {
  return root.getAttribute('data-theme') || 'dark';
}

for (const b of buttons) {
  b.addEventListener('click', () => {
    const theme = b.dataset.themeValue || 'dark';
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage may be blocked; theme still applies for the session */
    }
    sync(theme);
  });
}

sync(current());
