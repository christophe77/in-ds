# Publishing `@ind-ds/*` to npm

This repo publishes 5 public packages to npm via [Changesets](https://github.com/changesets/changesets) and a GitHub Action.

```
@ind-ds/tokens   ←  design tokens (CSS / JS / Dart)
@ind-ds/core     ←  web components (depends on tokens)
@ind-ds/react    ←  React wrappers (depends on core)
@ind-ds/vue      ←  Vue 3 wrappers (depends on core)
@ind-ds/mqtt     ←  MQTT adapter (standalone)
```

---

## One-time setup

### 1. Claim the `@ind-ds` org on npm

Sign in to [npmjs.com](https://www.npmjs.com/), then **Add Organization** → name it `ind-ds`. Free plan is fine (public packages only).

> **Already taken?** Rename the scope before the first publish:
> 1. Edit each `packages/*/package.json` — change `"name": "@ind-ds/*"` → `"@<your-scope>/*"`.
> 2. Edit `packages/core/package.json` `dependencies` → update the `@ind-ds/tokens` → `@<your-scope>/tokens` reference (same for `@ind-ds/react` and `@ind-ds/vue`).
> 3. Update imports across the codebase (find/replace `@ind-ds/` → `@<your-scope>/`).

### 2. Create an npm automation token

[npmjs.com → Access Tokens → Generate New Token](https://www.npmjs.com/settings/~/tokens)

Use either:

- **Granular Access Token** (recommended) — Permissions: **Read and write** → Organizations: **`@ind-ds`** → Packages: **All packages** (required while the org is still empty or when adding new package names).
- **Classic Automation token** — from the account that **owns** the `@ind-ds` org.

Copy the value (`npm_...`). **Test it locally before adding to GitHub:**

```bash
npm whoami --registry=https://registry.npmjs.org
# must print the npm username that owns @ind-ds

cd packages/tokens && pnpm build
npm publish --access public --provenance=false --dry-run
# must list dist/js/tokens.d.ts in the tarball, no E404
```

### 3. Add the token to GitHub

`github.com/christophe77/ind-ds` → **Settings → Secrets and variables → Actions → New repository secret**:

| Name | Value |
|---|---|
| `NPM_TOKEN` | the automation token from step 2 |

### 4. Verify permissions

The repo's GitHub Action needs:
- **Settings → Actions → General → Workflow permissions** → **Read and write permissions** ✓
- **Allow GitHub Actions to create and approve pull requests** ✓

### 5. Make sure `main` is the default branch

`.changeset/config.json` uses `baseBranch: "main"`. If your default branch is `master` or anything else, edit that file.

---

## Day-to-day flow

### Working on changes

```bash
git checkout -b feat/new-atom
# ... code changes ...
pnpm build                       # make sure everything still compiles
pnpm changeset                   # interactive: pick packages, bump kind, summary
git add .
git commit -m "feat: add <ind-foobar>"
git push origin feat/new-atom
```

Open a PR. The CI workflow (`.github/workflows/ci.yml`) verifies the build.

### When the PR merges into `main`

The Release workflow (`.github/workflows/release.yml`) runs and notices there are pending changesets. It opens a **"chore: version packages"** PR that:
- bumps the affected packages' versions
- generates / updates each package's `CHANGELOG.md`
- removes the consumed `.changeset/*.md` files

### When you merge the "Version Packages" PR

The Release workflow runs again — this time it sees no pending changesets, so it:
- runs `pnpm build`
- runs `pnpm changeset publish` (publishes each bumped package to npm in dep order)
- creates a git tag per package
- pushes the tags

Done. The new versions are live on `npmjs.com/package/@ind-ds/*` with npm provenance attestation (verified badge).

---

## Manual publish (escape hatch)

If you ever need to bypass the action (broken CI, hotfix, etc.):

```bash
# 1. Bump versions + write changelogs
pnpm changeset version

# 2. Rebuild dists with the new versions baked in
pnpm build

# 3. Login if you haven't (uses the npm token interactively)
npm login

# 4. Publish — in dep order (provenance only works in GitHub Actions, not locally)
pnpm changeset publish --provenance=false
```

`pnpm changeset publish` only publishes packages whose version changed since their last published version, in topological order — safe to re-run.

---

## Pre-releases (alpha / beta / rc)

For a `0.x.0-alpha.0` style channel:

```bash
pnpm changeset pre enter alpha
pnpm changeset           # author changesets normally
# ... commit, PR, merge ...
# The action publishes with the alpha tag.

# When you're ready to ship the final:
pnpm changeset pre exit
# Author one more changeset that promotes the version.
```

Tagged pre-releases land on `npm install @ind-ds/core@alpha` only — they don't replace `latest`.

---

## Checklist before the first publish

- [ ] `@ind-ds` org claimed on npm (or scope renamed everywhere)
- [ ] `NPM_TOKEN` secret added to the GitHub repo
- [ ] Workflow permissions set to **Read and write**
- [ ] `main` branch protected (optional but recommended) — require PR + CI green
- [ ] `pnpm build` passes locally
- [ ] `pnpm install --frozen-lockfile` passes locally (lockfile committed)
- [ ] `LICENSE` and `README.md` present at the repo root (they are)
- [ ] Each package has a `README.md` (tokens, core, react, vue, mqtt — all already in)
- [ ] Versions in `packages/*/package.json` are `0.0.1` or `0.1.0` — bumped from there

---

## Verifying after publish

```bash
# Check it's actually live
npm view @ind-ds/core
npm view @ind-ds/tokens

# Smoke-test in a clean project
mkdir /tmp/ind-ds-smoke && cd /tmp/ind-ds-smoke
npm init -y
npm install @ind-ds/core @ind-ds/tokens @ind-ds/react react react-dom
node -e "console.log(require.resolve('@ind-ds/core'))"
```

On [npmjs.com/package/@ind-ds/core](https://www.npmjs.com/package/@ind-ds/core) you should see a green **"Provenance"** badge linking back to the GitHub Action run that built it. That's npm's supply-chain attestation — it proves the package on the registry was built by this exact commit in this exact workflow.

---

## Troubleshooting

**`E403 You must verify your email`** — npm requires email verification before publishing. Check your inbox.

**`E401 Unauthorized`** — `NPM_TOKEN` is missing, expired, or not an "Automation" token. Regenerate.

**`E404 Not Found` on `PUT @ind-ds/...` (CI fails, but local `npm publish` works)** — npm returns 404 instead of 403 when the token **cannot publish** under the scope. The `NPM_TOKEN` GitHub secret is almost certainly **not the same token** that worked locally, or it is a **read-only** granular token.

Fix:

1. Create a new token from the npm account that **owns** `@ind-ds` (see step 2 above).
2. Update the repo secret: **Settings → Secrets → Actions → `NPM_TOKEN` → Update**.
3. Re-run the **Release** workflow (Actions → Release → Re-run all jobs).

The Release workflow now runs `npm whoami` before publish — if that step fails, the token is wrong before any package is attempted.

**Action ran but no PR was opened** — there are no changesets. Run `pnpm changeset` locally and push the result.

**Provenance generation failed** — make sure the workflow has `permissions.id-token: write` (it does in `release.yml`) and that you're publishing from a public repo (provenance requires it).

**Package published, but `npm install` says it doesn't exist** — npm's CDN takes 30–60 s to propagate. Retry.

**Want to unpublish** — `npm unpublish @ind-ds/core@0.0.1 --force` within 72 h. After that, npm blocks unpublishing (policy). Use `npm deprecate` to mark a version as do-not-use instead.
