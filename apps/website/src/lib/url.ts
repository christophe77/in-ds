/**
 * Base-path-aware URL helpers. Astro does not automatically prefix internal
 * links with `base`, so every internal href must go through `url()`.
 */
const BASE = import.meta.env.BASE_URL; // e.g. "/ind-ds-site/" or "/"

/** Build an internal href that respects the configured base path. */
export function url(path = '/'): string {
  const b = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}` || '/';
}

/** True when `path` matches the current pathname (ignoring base + trailing slash). */
export function isActive(currentPath: string, path: string): boolean {
  const norm = (s: string) => {
    let out = s;
    if (BASE !== '/' && out.startsWith(BASE.replace(/\/$/, ''))) {
      out = out.slice(BASE.replace(/\/$/, '').length);
    }
    out = out.replace(/\/+$/, '');
    return out || '/';
  };
  const a = norm(currentPath);
  const b = norm(path);
  if (b === '/') return a === '/';
  return a === b || a.startsWith(`${b}/`);
}
