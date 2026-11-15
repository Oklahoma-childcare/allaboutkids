# QA report — website #5

Date prepared: 2026-11-15

## Results

- **PASS**: Exact spreadsheet organization selected from visible filtered project list (license K830058386).
- **PASS**: Program facts cross-checked with official Oklahoma Human Services provider detail.
- **PASS**: Five populated HTML pages (Home, Age Groups, Our Center, FAQs, Contact).
- **PASS**: Desktop, tablet and mobile layout checked at viewport widths 1440px, 768px and 390px.
- **PASS**: No horizontal overflow at those viewports on any of the five pages.
- **PASS**: Exactly one H1 per page, unique title and description, and internal route targets present.
- **PASS**: Mobile navigation toggled open and closed in browser static-mode test.
- **PASS**: FAQ details expanded and collapsed in browser static-mode test.
- **PASS**: External Facebook community post included and identified accurately; no invented official profiles.
- **PASS**: SEO review mode: noindex/nofollow meta on all pages and no canonical/sitemap pointing to an unowned domain.
- **PASS**: SEO authorized-domain simulation: generated proper per-page canonical URLs, sitemap.xml, robots.txt, and appropriate JSON-LD.
- **PASS**: Test domain removed and noindex mode restored in packaged files.
- **PASS**: JavaScript and TypeScript/TSX syntax parsing checks passed (not an installation/build).
- **PASS**: No `static-preview/` folder included.

## Not yet verified / requires authorization

- **Not verified:** Full production npm install and `npm run build` could not run because the runtime cannot resolve the npm registry. Execute locally in VS Code or Cloudflare/Vercel.
- **Not verified:** Network loading of remotely hosted Pexels images and Google Fonts; the browser QA was performed offline with gracefully displayed photo fallbacks. Remote Pexels photo URLs are configured in `src/lib/photos.json`.
- **Not verified:** The exact original organization's logo; not published in available credible public sources for this address. Temporary wordmark is in place with an exact-logo replacement hook.
- **Not verified:** Official social media accounts for this exact center. The spreadsheet provides a third-party Facebook post only.
- **Requires approval:** Domain authorization, photo reuse rights for actual facility, and organizational publication approval.

## Source references

Official: https://ccl.dhs.ok.gov/providers/K830058386
Sheet: https://docs.google.com/spreadsheets/d/1YeTideVr3dw1LvuaeGFmufEsqwE5VB_k1NRu9PhwVMY/edit?gid=161994001
Photos: each photo's Pexels licensing/source page is recorded in `src/lib/photos.json`.
