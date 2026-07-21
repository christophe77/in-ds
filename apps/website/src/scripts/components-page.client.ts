/** Client-side search + category filtering for the components overview. No server calls. */
const controls = document.querySelector('[data-cmp-controls]');
const search = document.querySelector('[data-cmp-search]') as HTMLInputElement | null;
const countEl = document.querySelector('[data-cmp-count]');
const emptyEl = document.querySelector('[data-cmp-empty]') as HTMLElement | null;
const cards = Array.from(document.querySelectorAll('[data-cmp]')) as HTMLElement[];
const sections = Array.from(document.querySelectorAll('[data-cat-section]')) as HTMLElement[];
const filters = controls
  ? (Array.from(controls.querySelectorAll('.cmp-filter')) as HTMLButtonElement[])
  : [];

let activeCat = 'all';
const total = cards.length;

function apply(): void {
  const query = (search?.value ?? '').trim().toLowerCase();
  let visible = 0;

  for (const card of cards) {
    const matchesCat = activeCat === 'all' || card.dataset.category === activeCat;
    const matchesQuery = query === '' || (card.dataset.search ?? '').includes(query);
    const show = matchesCat && matchesQuery;
    card.hidden = !show;
    if (show) visible += 1;
  }

  // Hide category sections with no visible cards.
  for (const section of sections) {
    const anyVisible = section.querySelectorAll('[data-cmp]:not([hidden])').length > 0;
    section.hidden = !anyVisible;
  }

  if (emptyEl) emptyEl.hidden = visible !== 0;
  if (countEl) {
    countEl.textContent =
      visible === total ? `${total} components` : `${visible} of ${total} components`;
  }
}

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    activeCat = btn.dataset.cat ?? 'all';
    for (const b of filters) b.setAttribute('aria-pressed', String(b === btn));
    apply();
  });
});

search?.addEventListener('input', apply);
apply();
