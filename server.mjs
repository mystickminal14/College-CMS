// Express server that serves the built SPA (dist/) and injects per-blog
// SEO meta tags into the HTML <head> BEFORE sending it to the client.
//
// Why: crawlers (Google, Bing, Facebook, WhatsApp, LinkedIn, Twitter) read the
// raw HTML response and mostly do NOT execute JS. A pure SPA only fixes the
// tags client-side via React Helmet, which those crawlers never see. This
// server rewrites <title> + meta description (+ OG/Twitter) for /blogs/:slug
// so every visitor — human or bot — gets the correct tags in the first response.

import express from "express";
import compression from "compression";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;
const API_BASE = process.env.API_BASE || "https://lbef-server.lbef.org/api";
const APP_URL = process.env.APP_URL || "https://www.lbef.org";
const IMAGE_URL = process.env.IMAGE_URL || "https://lbef-server.lbef.org";

const DIST = path.join(__dirname, "dist");
const INDEX_HTML = path.join(DIST, "index.html");

if (!fs.existsSync(INDEX_HTML)) {
  console.error(`[server] dist/index.html not found. Run "npm run build" first.`);
  process.exit(1);
}

// Read the built index.html once at startup (asset hashes are baked in).
const baseHtml = fs.readFileSync(INDEX_HTML, "utf-8");

const app = express();
app.use(compression());

// --- helpers ---------------------------------------------------------------

function escapeAttr(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Inject blog-specific tags into the base HTML head.
function buildBlogHtml(blog) {
  const title = blog.metaTitle || blog.title || "LBEF";
  const description = blog.metaDescription || "";
  const url = `${APP_URL}/blogs/${blog.slug}`;
  const image = blog.featuredImage
    ? `${IMAGE_URL}${blog.featuredImage}`
    : `${APP_URL}/assets/lbefhd.webp`;

  let html = baseHtml;

  // Replace the static <title>.
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(title)}</title>`);

  // Replace the static description meta (homepage default lives in index.html).
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeAttr(description)}" />`
  );

  // Inject canonical + Open Graph + Twitter tags right before </head>.
  const injected = `
    <link rel="canonical" href="${escapeAttr(url)}" />
    <meta property="og:site_name" content="LBEF: The First IT College of Nepal" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:url" content="${escapeAttr(url)}" />
    <meta property="og:image" content="${escapeAttr(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${escapeAttr(image)}" />
  </head>`;

  html = html.replace(/<\/head>/i, injected);
  return html;
}

// 60-second in-memory cache so repeated bot/user hits don't hammer the API.
const cache = new Map(); // slug -> { html, expires }
const CACHE_TTL = 60 * 1000;

async function getBlogHtml(slug) {
  const cached = cache.get(slug);
  if (cached && cached.expires > Date.now()) return cached.html;

  const res = await fetch(`${API_BASE}/blogs/slug/${encodeURIComponent(slug)}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) return null;

  const json = await res.json();
  const blog = json?.data;
  if (!blog) return null;

  const html = buildBlogHtml(blog);
  cache.set(slug, { html, expires: Date.now() + CACHE_TTL });
  return html;
}

// --- routes ----------------------------------------------------------------

// Blog detail: inject SEO tags. Single path segment only (won't catch /blogs list).
app.get("/blogs/:slug", async (req, res) => {
  try {
    const html = await getBlogHtml(req.params.slug);
    if (!html) {
      // Blog missing/unpublished — fall back to SPA so the client shows its
      // own "Blog not found" UI instead of a hard server error.
      return res.sendFile(INDEX_HTML);
    }
    res.set("Cache-Control", "public, max-age=60");
    res.type("html").send(html);
  } catch (err) {
    console.error("[server] blog inject failed:", err);
    res.sendFile(INDEX_HTML);
  }
});

// Static assets (/assets/*, favicon, etc.). index:false so "/" hits the fallback.
app.use(express.static(DIST, { index: false }));

// SPA fallback: every other route serves the unmodified index.html.
app.use((_req, res) => {
  res.sendFile(INDEX_HTML);
});

app.listen(PORT, () => {
  console.log(`[server] listening on :${PORT}`);
  console.log(`[server] API_BASE=${API_BASE} APP_URL=${APP_URL}`);
});
