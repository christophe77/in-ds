/**
 * Build-time content integrity checks. Run via `pnpm --filter @ind-ds/website test`.
 *
 * 1) The component catalog (src/data/components.ts) must match the built package
 *    metadata (@ind-ds/core/dist/docs.json) exactly — no invented or missing tags.
 * 2) Every catalog entry has a non-trivial description and a known category.
 * 3) Blog articles have the required frontmatter fields and unique slugs.
 *
 * Exits non-zero on any failure so CI fails loudly.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const errors = [];
const info = [];

// ── 1 + 2: component catalog vs docs.json ──────────────────────────────────
const docsPath = join(root, '..', '..', 'packages', 'core', 'dist', 'docs.json');
if (!existsSync(docsPath)) {
  errors.push(`docs.json not found at ${docsPath} — build @ind-ds/core first.`);
} else {
  const docs = JSON.parse(readFileSync(docsPath, 'utf8'));
  const builtTags = new Set(docs.components.map((c) => c.tag));

  const src = readFileSync(join(root, 'src', 'data', 'components.ts'), 'utf8');
  const catalogTags = [...src.matchAll(/tag:\s*'([^']+)'/g)].map((m) => m[1]);
  const categories = [...src.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);
  const knownCats = new Set(categories);

  const catalogSet = new Set(catalogTags);
  for (const tag of catalogTags) {
    if (!builtTags.has(tag)) errors.push(`Catalog lists '${tag}' but it is not in the built package.`);
  }
  for (const tag of builtTags) {
    if (!catalogSet.has(tag)) errors.push(`Built component '${tag}' is missing from the catalog.`);
  }
  if (catalogTags.length !== catalogSet.size) errors.push('Duplicate tag(s) in the catalog.');

  // Every entry has a category that exists + a description.
  for (const m of src.matchAll(/tag:\s*'([^']+)',\s*category:\s*'([^']+)',\s*tier:\s*'[^']+',\s*description:\s*'([^']*)'/g)) {
    const [, tag, cat, desc] = m;
    if (!knownCats.has(cat)) errors.push(`'${tag}' has unknown category '${cat}'.`);
    if (!desc || desc.length < 15) errors.push(`'${tag}' has a missing/too-short description.`);
  }

  if (catalogSet.size === builtTags.size && errors.length === 0) {
    info.push(`Component catalog matches the package: ${builtTags.size} components.`);
  }
}

// ── 3: blog frontmatter ─────────────────────────────────────────────────────
const blogDir = join(root, 'src', 'content', 'blog');
const slugs = new Set();
if (existsSync(blogDir)) {
  const files = readdirSync(blogDir).filter((f) => /\.mdx?$/.test(f));
  for (const file of files) {
    const raw = readFileSync(join(blogDir, file), 'utf8');
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) {
      errors.push(`${file}: missing frontmatter.`);
      continue;
    }
    for (const key of ['title', 'description', 'publishDate']) {
      if (!new RegExp(`^${key}:`, 'm').test(fm[1])) errors.push(`${file}: missing '${key}'.`);
    }
    const slug = file.replace(/\.mdx?$/, '');
    if (slugs.has(slug)) errors.push(`Duplicate blog slug '${slug}'.`);
    slugs.add(slug);
  }
  info.push(`Validated ${files.length} blog article(s).`);
}

// ── Report ──────────────────────────────────────────────────────────────────
for (const line of info) console.log(`  ✓ ${line}`);
if (errors.length > 0) {
  console.error('\nContent validation failed:');
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('\nContent validation passed.');
