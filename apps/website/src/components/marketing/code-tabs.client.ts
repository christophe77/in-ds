/**
 * Tab switching (with roving-tabindex keyboard support) + copy-to-clipboard for
 * every <CodeTabs> instance on the page. External .ts by project convention.
 */
function initTabs(root: Element): void {
  const tabs = Array.from(root.querySelectorAll('[role="tab"]')) as HTMLButtonElement[];
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]')) as HTMLElement[];

  function select(index: number, focus = true): void {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i, false));
    tab.addEventListener('keydown', (e) => {
      let next = -1;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next >= 0) {
        e.preventDefault();
        select(next);
      }
    });
  });
}

function initCopy(root: Element): void {
  const status = root.querySelector('[data-copy-status]');
  root.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const panel = btn.closest('[role="tabpanel"]');
      const code = panel?.querySelector('code')?.textContent ?? '';
      try {
        await navigator.clipboard.writeText(code);
        (btn as HTMLElement).dataset.copied = 'true';
        btn.textContent = 'Copied';
        if (status) status.textContent = 'Copied to clipboard';
        window.setTimeout(() => {
          (btn as HTMLElement).dataset.copied = 'false';
          btn.textContent = 'Copy';
          if (status) status.textContent = '';
        }, 2000);
      } catch {
        if (status) status.textContent = 'Copy failed — select and copy manually';
      }
    });
  });
}

for (const root of document.querySelectorAll('[data-code-tabs]')) {
  initTabs(root);
  initCopy(root);
}
