# Web Rehab STL

This Next.js App Router application is the canonical source for the public Web
Rehab STL studio site (`webrehabstl.pages.dev`). The older static implementation
under `local-outreach/sites/site-rehab-stl/` is retained as a migration
reference; do not add new public-site features there.

The homepage content and estimator inputs live in `src/lib/studio-data.ts`.
The estimator is deliberately client-side only: it stores no answers, submits
no data, and quotes project scope rather than speculative revenue. Portfolio
screenshots are local assets in `public/shots/` with AVIF/WebP sources.
The public work gallery separates live projects from illustrative, clearly
identified design concepts. Jake's About section uses a locally sourced
portrait and describes the direct, owner-to-developer working relationship.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run start
```

`npm run build` creates a static Next.js export in `out/`. Deploy that output
to the existing Cloudflare Pages project after reviewing it:

```bash
npx wrangler pages deploy out --project-name webrehabstl --branch main
```

The Cloudflare CLI must be authenticated for the account that owns the Pages
project. Cloudflare Pages uses `main` as this project's production branch,
independent of this repository's `master` branch; omitting `--branch main`
creates a preview deployment instead of updating the live site. `npm run
deploy` builds and deploys to production.
