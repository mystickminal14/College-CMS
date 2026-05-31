import { Handler } from "@netlify/functions";
import * as fs from "fs";

const API_BASE = "https://lbef-server.lbef.org/api";
const APP_URL = "https://lbef.org";

// Common bot user agents
const BOT_AGENTS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegram",
  "discord",
  "slackbot",
  "curl",
  "wget",
  "scraper",
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_AGENTS.some((bot) => ua.includes(bot));
}

async function fetchBlogData(slug: string) {
  try {
    const response = await fetch(`${API_BASE}/blogs/slug/${slug}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

function generateHTML(blog: any): string {
  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || "Read this blog on LBEF";
  const image = blog.featuredImage
    ? `https://lbef-server.lbef.org/api/files/${blog.featuredImage}`
    : `${APP_URL}/assets/lbefhd.webp`;
  const url = `${APP_URL}/blogs/${blog.slug}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="lbef.org" />
  <link rel="canonical" href="${escapeHtml(url)}" />

  <!-- Open Graph -->
  <meta property="og:site_name" content="LBEF: The First IT College of Nepal" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(url)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />

  <!-- Schema markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${escapeJson(title)}",
    "description": "${escapeJson(description)}",
    "image": "${escapeJson(image)}",
    "datePublished": "${blog.publishDate || new Date().toISOString()}",
    "author": {
      "@type": "Organization",
      "name": "LBEF"
    }
  }
  </script>

  <meta http-equiv="refresh" content="0;url=${escapeHtml(url)}" />
</head>
<body>
  <p>Redirecting to <a href="${escapeHtml(url)}">${escapeHtml(title)}</a>...</p>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function escapeJson(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
}

const handler: Handler = async (event) => {
  try {
    const userAgent = event.headers["user-agent"] || "";
    const path = event.path || "";

    // Only intercept /blogs/* requests
    const blogMatch = path.match(/^\/blogs\/([a-z0-9\-]+)\/?$/i);
    if (!blogMatch) {
      return {
        statusCode: 404,
        body: "Not found",
      };
    }

    const slug = blogMatch[1];

    // Fetch the blog data
    const blog = await fetchBlogData(slug);

    if (!blog) {
      // Return 404 which Netlify will interpret as "pass through to SPA"
      return {
        statusCode: 404,
        body: "Not found",
      };
    }

    // If it's a bot, return pre-rendered page with proper meta tags
    if (isBot(userAgent)) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
        body: generateHTML(blog),
      };
    }

    // For regular browsers, return 404 which allows Netlify to serve the SPA
    // The SPA will then fetch the blog data and React Helmet will set the meta tags
    return {
      statusCode: 404,
      body: "Not found",
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
};

export { handler };
