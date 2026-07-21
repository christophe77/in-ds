/**
 * Header mobile-menu behavior. External .ts module (see theme-toggle.client.ts
 * for why inline TS scripts are avoided).
 */
const toggle = document.querySelector('.site-nav__toggle') as HTMLButtonElement | null;
const menu = document.getElementById('primary-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.getAttribute('data-open') === 'true';
    menu.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });
  // Close menu on Escape for keyboard users.
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}
