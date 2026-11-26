# Human Health Circle - website

Next.js (App Router) redesign of humanhealthcircle.org. Start with the docs:

| Doc | What it is |
|---|---|
| [`docs/website-audit.md`](docs/website-audit.md) | Page-by-page audit of the previous WordPress site, incl. what could *not* be inspected |
| [`docs/content-review-needed.md`](docs/content-review-needed.md) | Claims and data HHC must confirm before launch |
| [`docs/route-migration-map.md`](docs/route-migration-map.md) | Old → new URLs |
| [`docs/functionality-inventory.md`](docs/functionality-inventory.md) | Every old feature and its status |
| [`docs/implementation-summary.md`](docs/implementation-summary.md) | What was built, design decisions, open items |
| [`docs/qa-report.md`](docs/qa-report.md) | Real test results (and what wasn't tested) |
| [`outdated-link.txt`](outdated-link.txt) | Register of 404 / dead / outdated links (list only; append new findings) |
| [`docs/deployment-guide.md`](docs/deployment-guide.md) | Env vars, checkout strategy, launch checklist |

## Run
```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
npm run build && npm start
npx playwright install chromium   # first time only
npx playwright test               # needs a prior build
```

## Structure
```
src/app/            routes (19 pages), api/enquiry, sitemap.ts, robots.ts, not-found.tsx
src/components/     ui/ (shadcn-style primitives) · layout/ · navigation/ · sections/ · cards/ · forms/ · animations/
src/content/        site.ts (all facts: contacts, nav, centres, documents…) · images.ts (image registry; placeholders flagged)
src/lib/            redirects.ts · seo.ts · enquiry.ts (Zod schema shared by form + API)
public/             images/brand (original logo + derived PNGs) · images/resources · documents/*.pdf
tests/              e2e/ · accessibility/ · mock-webhook.mjs
scripts/            check-external-links.mjs
_assets-original/   untouched originals downloaded from the old site (logo etc.)
```

## Editing content
Facts live in `src/content/site.ts` - change addresses, packages, videos or documents there. **Do not add facts HHC has not confirmed**; log doubts in `docs/content-review-needed.md`.
The Next.js version in use has changes from older releases; see `AGENTS.md` and `node_modules/next/dist/docs/` before changing framework-level code.

## Languages
The site is bilingual (English / ગુજરાતી). Write text as `<T>English text</T>` and add the Gujarati to `src/content/gu.ts`.
`BASE=http://localhost:3101 node scripts/harvest-missing-translations.mjs` lists anything still untranslated (the test suite fails if any string is missing). A native Gujarati speaker should review `gu.ts` before launch.
