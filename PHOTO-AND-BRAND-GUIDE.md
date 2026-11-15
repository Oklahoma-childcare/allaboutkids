# Photos, official logo, social media — change everything in three files

## Photos: `src/lib/photos.json`

Eight image keys: `hero`, `intro`, `infants`, `toddlers`, `preschool`, `schoolAge`, `about`, `materials`.

Each has `src`, `alt`, `position`, `credit`, and `source`. For an authorized local photo, place the file under `public/photos/` and set `src` to `/photos/filename.webp`. Keep the source/credit fields accurate when changing photos. All initial photos are sourced from **Pexels** and should be treated as illustrative, not as photos of this particular center.

Do not download or republish Google Maps, Facebook, directory, or property-listing photos merely by altering or cropping them. Obtain the copyright holder's explicit permission or other appropriate reuse rights first, especially for photos containing children.

## Logo: `src/lib/site.json`

The searched public sources did not provide a verified official logo for this particular location/license. The current type mark is temporary. Place the exact authorized logo at `public/branding/official-logo.png`; then set `logoUrl` to `/branding/official-logo.png`, then run `npm run generate` and deploy. For a different file name, change the path accordingly. The original proportions will be preserved by `object-fit:contain`.

## Social media: `src/lib/social-links.json`

Paste verified account URLs for `facebook`, `instagram`, `youtube`, `tiktok`, or `pinterest`; blank values are automatically hidden. The `facebookCommunityPost` field holds the spreadsheet-provided external post and is visibly labeled as a *community post*, not an official Facebook profile. Remove this field's URL if the organization doesn't want it linked.

## SEO & publication

See `README.md` for the authorization/domain gate. Do not enable public indexing on preview URLs.
