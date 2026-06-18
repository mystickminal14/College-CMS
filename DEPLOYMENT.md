# Deployment (cPanel Node.js) — with SEO meta injection

The site is a Vite React SPA **plus** a small Express server (`server.mjs`) whose
only job is to inject per-blog `<title>` / `meta description` / Open Graph tags
into the HTML **before** it reaches the browser or a crawler.

## Why the server exists

Crawlers (Google, Bing, Facebook, WhatsApp, LinkedIn, Twitter) read the raw HTML
response and mostly do **not** execute JavaScript. A pure SPA only fixes meta
tags client-side (React Helmet), which those crawlers never see — so every blog
inherited the homepage's title/description. `server.mjs` rewrites the `<head>`
for `/blogs/:slug` so the correct tags are in the **first** response.

- No rebuild needed when a blog is published — tags come live from the API.
- Same tags for humans and bots (no cloaking — Google requires this).
- 60-second in-memory cache per slug to limit API calls.

## What runs

```
npm run build      # produces dist/  (must exist before the server starts)
npm start          # node server.mjs  -> serves dist/ + injects blog meta
```

`server.mjs`:
- `GET /blogs/:slug` → fetch blog from API, inject metaTitle/metaDescription/OG, send HTML
- everything else → serve `dist/` static assets, with SPA fallback to `index.html`

## cPanel setup (Setup Node.js App / App Manager)

1. Push code to the repo and pull it onto the server (or upload the project).
2. cPanel → **Setup Node.js App** → **Create Application**
   - **Node version:** 18 or higher (server.mjs uses the global `fetch`)
   - **Application mode:** Production
   - **Application root:** the project folder
   - **Application startup file:** `server.mjs`
   - **Application URL / domain:** `www.lbef.org`
3. Click **Run NPM Install** (installs `express` + `compression` and the rest).
4. In the app's terminal (or via the "Run JS script" → use the build step):
   `npm run build`  — `dist/` is gitignored, so it must be built on the server
   (or upload a locally-built `dist/` into the app root).
5. **Restart** the application.

### Environment variables (set in the Node.js App panel)

```
API_BASE=https://lbef-server.lbef.org/api
APP_URL=https://www.lbef.org
IMAGE_URL=https://lbef-server.lbef.org
PORT=<assigned by cPanel; leave unset to use cPanel's value>
```

(Defaults baked into `server.mjs` match production, so these are optional but
recommended to make the config explicit.)

## Verifying the fix after deploy

```bash
# A crawler's view — title must be the blog's metaTitle, not the homepage title:
curl -s https://www.lbef.org/blogs/<some-slug> | grep -iE "<title>|description|og:title"
```

You should see the blog's `metaTitle` / `metaDescription`. Then:
- Google Search Console → URL Inspection → **Live test** → View rendered HTML.
- Facebook Sharing Debugger / LinkedIn Post Inspector → re-scrape the URL.

## Troubleshooting

- **Blog shows homepage tags** → app not restarted, or request didn't hit
  `server.mjs` (confirm startup file is `server.mjs`, not a static handler).
- **`dist/index.html not found`** → run `npm run build` on the server first.
- **Blog 404 / falls back to SPA** → blog `status` must be `PUBLISHED` and the
  slug must resolve at `API_BASE/blogs/slug/:slug`.
- **Wrong preview image** → check `IMAGE_URL` and `blog.featuredImage`.
- **`fetch is not defined`** → Node version < 18; bump it in the Node.js App panel.
