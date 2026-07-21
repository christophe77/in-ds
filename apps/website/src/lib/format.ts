/** Derive a human display name from a custom-element tag: "ind-alarm-panel" → "Alarm Panel". */
export function tagToName(tag: string): string {
  return tag
    .replace(/^ind-/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** PascalCase wrapper name: "ind-alarm-panel" → "IndAlarmPanel". */
export function tagToPascal(tag: string): string {
  return tag
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}
