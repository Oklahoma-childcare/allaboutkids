# All About Kids Discovery Learning Academy — Moore, Oklahoma

Complete editable React 18 / TypeScript / Vite 8 / TanStack Router / Tailwind CSS 3 marketing website. Five SEO-pre-rendered routes. No `static-preview/` folder.

## Run locally in VS Code

1. Open this project directory in VS Code (the directory containing `package.json`).
2. Install Node.js 22+.
3. `npm install`
4. `npm run dev` — use the terminal URL to view the site.
5. `npm run build` — compiles the production multi-page site into `dist/`.

If you change page content or images, run `npm run generate` (automatically performed before development and build).

## Cloudflare Pages / Vercel

Build command: `npm run build`.
Output folder: `dist`.
Use the project root as the Root Directory. Do not deploy a nested folder. No server runtime is needed.
All five pages are generated with content, meta descriptions, schema, and navigation links in their initial HTML (no empty SPA SEO pages). A custom domain is needed before making the site indexable.

## Pages

- `/` — Home
- `/programs/` — Age groups
- `/about/` — Our center
- `/faq/` — Frequently asked questions
- `/contact/` — Contact, hours and directions

## Editable content

- `src/lib/site.json` — all business facts, **and the logo URL**.
- `src/lib/photos.json` — each photograph's URL, description, position and original source.
- `src/lib/social-links.json` — Facebook, Instagram, YouTube, TikTok, Pinterest, and community Facebook mention.
- `src/lib/render-page.mjs` — SEO metadata and exact page copy/structure.
- `src/index.css` — all site styling and responsive layouts.

For actual organization photos, save approved files in `public/photos/` and set their respective `src` entries in `src/lib/photos.json` to `/photos/your-file.webp`. Keep descriptive `alt` text. The stock photographs in the initial project are licensed illustrative photos and **do not show this specific Moore facility**. Permission is necessary for using real facility photos or identifiable children.

### Exact original logo

**Not verified or available from the searched public sources.** The temporary geometric text wordmark is not an official logo. Do not mistake the logo for another business named "All About Kids" as this company's logo. Once you obtain the authorized original logo:

1. Put it in `public/branding/official-logo.png`.
2. Edit `src/lib/site.json` and set `"logoUrl": "/branding/official-logo.png"`.
3. Run `npm run generate` / `npm run build`.

The header and footer will then use the exact image. See `public/branding/README.md`.

### Social accounts

The spreadsheet provided a link to an **individual's Facebook post about the center**, not a verified organization-managed page. It is included as a **Facebook community post**, never incorrectly called an official account. As of this preparation, no authentic official social profile for this exact license/address was verified. To add the verified links later, paste them into the corresponding keys in `src/lib/social-links.json`. They will appear in the footer and Contact page automatically.

### Photos and licensing

Pexels illustration image sources are recorded within `src/lib/photos.json`, including each photographer and source photo page. See `PHOTO-AND-BRAND-GUIDE.md` for details. Images are remote and need an internet connection to display. Colored fallback graphics display if an external image cannot load. Validate each photo's current license and any subject permissions before public launch.

## SEO publication gate

The review/demo build is intentionally marked `noindex,nofollow`. There are no canonical tags or public sitemap until authorization is confirmed. This avoids letting an unauthorized preview compete with an official organization's site in search results.

When you have authorization to publish, own the destination domain, and have verified business identity and photo usage rights:

1. Create `.env.local` in the project root:
   ```
   VITE_SITE_URL=https://www.your-authorized-domain.com
   VITE_PUBLICATION_APPROVED=true
   ```
2. Replace the URL with the genuine domain you control.
3. Run `npm run build`. The prebuild script will create canonical links, OG URL and image, sitemap.xml, robots.txt, structured business data, and meta robots index flags.
4. Deploy `dist/`, check domain SSL, and test live SEO with Google Search Console and Google's Rich Results Test.

A build with `VITE_PUBLICATION_APPROVED=true` and a temporary provider domain will intentionally fail. Do not make false claims about domain ownership, existing social profiles, image rights, reviews, special curriculum, or enrollment availability.

## Verification limits

- Program facts were verified from official Oklahoma Human Services public provider record `K830058386`.
- Social profile/official logo searches were inconclusive, hence the editable slots.
- Page generation and static layout QA can be run here; a full Node dependency/TypeScript production build requires npm registry access on your machine.

See `SOURCES-AND-REVIEW.md` and `QA-REPORT.md`.
