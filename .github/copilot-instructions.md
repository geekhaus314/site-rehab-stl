# Copilot instructions

## Commands

Run these from the repository root:

```bash
npm run dev
npm run build
npm run start
npm run lint
npx eslint src/app/page.tsx
```

The last command lints a single file. `npm run build` uses `next build --webpack`.
There is no test runner or test script configured in `package.json`.

## Architecture

This is a small Next.js App Router marketing site for Site Rehab STL. The
homepage in `src/app/page.tsx` owns the service, work, contact, and estimate
sections; `src/components/site-header.tsx` is the shared navigation, and
`src/app/layout.tsx` supplies global CSS and document metadata. The site is
currently a single page: navigation and calls to action use fragment links to
section IDs, rather than separate route pages.

Visual styling lives in `src/app/globals.css`. It combines Tailwind CSS v4 with
project-specific CSS custom properties for color, spacing, and content width.
Keep the existing class naming pattern (`block__element--modifier`) when
extending those page sections and components.

## Conventions

- Keep the section IDs in `src/app/page.tsx` aligned with the fragment links in
  `src/components/site-header.tsx` and the page's calls to action.
- Put document-wide metadata in the App Router layout; use semantic section
  headings and descriptive labels for page landmarks.
- Use the global CSS custom properties for shared design values so responsive
  sections remain visually consistent.
