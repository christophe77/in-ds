# Changesets

This folder is managed by [changesets](https://github.com/changesets/changesets) — the versioning + changelog tool for the monorepo.

## Day-to-day

Whenever you make a change worth releasing:

```bash
pnpm changeset
```

Pick the affected packages, pick the bump kind (patch / minor / major), type a one-line summary. A markdown file lands here. Commit it with your PR.

When that PR (or a later one containing the changeset) merges to `main`, the GitHub Action opens a follow-up "Version Packages" PR that:
- bumps the package versions
- updates each package's `CHANGELOG.md`
- removes the consumed changeset files

Merging that PR triggers the publish step.

## Manual publish (escape hatch)

```bash
pnpm changeset version   # bump versions + write changelogs
pnpm build               # rebuild dists
pnpm changeset publish   # publish to npm (in dep order)
```

See [PUBLISHING.md](../PUBLISHING.md) at the repo root for one-time setup and tokens.
