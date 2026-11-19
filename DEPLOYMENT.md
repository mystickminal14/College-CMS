# Deployment (cPanel, Apache and PHP)

The website is a Vite React SPA served from `public_html`. React sets page tags
only after JS runs, so Apache sends every website page through `page-seo.php`,
which adds the correct tags to `index.html` before responding.

## How SEO works

1. `.htaccess` routes website URLs to `page-seo.php`. `/admin`, `/app`,
   `/visitor` and `/visitor-pass` skip it and get plain `index.html`.
2. `page-seo.php` calls `GET /api/page-seo/lookup?path=...` on LBEF-Server.
3. The API returns admin-saved values (admin panel > Lbef Publication > Page SEO),
   then that page's default text, and says if the URL is not a real page.
4. PHP adds the tags and passes them to React as `window.__SEO__`. A URL that is
   not a real page gets a 404 status. The React app still loads on it.

`/sitemap.xml` is built the same way by `sitemap.php` from `GET /api/page-seo/sitemap`.

- An admin edit shows up within 60 seconds (cached in `.seo-cache/`). The sitemap
  refreshes hourly. Delete `.seo-cache/` in `public_html` to refresh immediately.
- If the API is down, pages use the last cached answer, then plain `index.html`
  with status 200. The sitemap falls back to the static `sitemap.xml`.
- Same HTML for people and bots.
- New fixed pages must be added to `LBEF-Server/src/api/page-seo/page-seo.pages.ts`,
  or they will return a 404 status. Keep it in step with `WebsiteRoutes.tsx`.

## .htaccess

`deploy/.htaccess` is the tracked copy of the production file. It is not in
`public/`, so `npm run build` does not put it in `dist/`. Upload it to
`public_html` by hand whenever it changes, and make any server-side edit here too.

## Deploy order

Deploy the API first, because the new `.htaccess` depends on it.

1. **Back up** the production database and the current `public_html/.htaccess`.
2. **API (LBEF-Server):** check `npx prisma migrate status` on production, then
   `npx prisma migrate deploy`, `npm run build`, and restart. Confirm:
   `curl "https://lbef-server.lbef.org/api/page-seo/lookup?path=/about"`
3. **Website:** build with the live API URLs, then upload all of `dist/` to
   `public_html`. These override the local `.env`, which points at localhost:

   ```bash
   VITE_API_BASE_URL=https://lbef-server.lbef.org/api \
   VITE_IMAGE_URL=https://lbef-server.lbef.org \
   VITE_APP_URL=https://www.lbef.org \
   npm run build
   ```

4. **Routing:** upload `deploy/.htaccess` to `public_html`.
5. Confirm PHP can write to `public_html/.seo-cache/`.

Optional API environment variables, whose defaults match production:

```
SITE_URL=https://www.lbef.org
PUBLIC_API_URL=https://lbef-server.lbef.org
```

## Checking after deploy

```bash
# Each should show that page's own title and description:
curl -s https://www.lbef.org/ | grep -iE "<title|name=\"description\""
curl -s https://www.lbef.org/about | grep -iE "<title|name=\"description\""
curl -s https://www.lbef.org/bscit | grep -iE "<title|name=\"description\""

# Should print 404:
curl -s -o /dev/null -w "%{http_code}\n" https://www.lbef.org/no-such-page

# Should list well over 37 URLs:
curl -s https://www.lbef.org/sitemap.xml | grep -c "<loc>"
```

Then resubmit the sitemap in Google Search Console, and re-scrape a page in the
Facebook Sharing Debugger.

## Rolling back

Put the backed-up `.htaccess` back. `blog-seo.php`, `category-seo.php` and
`referral-seo.php` are still shipped so that works. Delete those three from
`public/` once `page-seo.php` has been stable in production.
