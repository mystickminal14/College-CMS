<?php
/**
 * Per-blog SEO meta injector for static (Apache/cPanel) hosting.
 *
 * Crawlers (Google, Bing, Facebook, WhatsApp, LinkedIn, Twitter) read the raw
 * HTML and do NOT run JS, so a pure SPA serves them the homepage tags from
 * index.html. This script (routed by .htaccess for /blogs/:slug) fetches the
 * blog from the API and rewrites <title> + description + OG/Twitter tags into
 * index.html BEFORE sending it. The SPA's JS still boots normally afterward.
 *
 * Same tags for humans and bots (no cloaking). No Node runtime required.
 */

$API_BASE  = 'https://lbef-server.lbef.org/api';
$APP_URL   = 'https://www.lbef.org';
$IMAGE_URL = 'https://lbef-server.lbef.org';

$slug    = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$indexFile = __DIR__ . '/index.html';
$html    = file_get_contents($indexFile);

/** Fetch the blog JSON. Prefer cURL; fall back to file_get_contents. */
function fetch_blog($url) {
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 5,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTPHEADER     => ['Accept: application/json'],
        ]);
        $body = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($body !== false && $code >= 200 && $code < 300) return $body;
        return null;
    }
    $ctx  = stream_context_create(['http' => ['timeout' => 5, 'header' => "Accept: application/json\r\n"]]);
    $body = @file_get_contents($url, false, $ctx);
    return $body !== false ? $body : null;
}

$blog = null;
if ($slug !== '') {
    $raw = fetch_blog($API_BASE . '/blogs/slug/' . rawurlencode($slug));
    if ($raw) {
        $json = json_decode($raw, true);
        if (isset($json['data'])) $blog = $json['data'];
    }
}

if ($blog) {
    $e = function ($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); };

    $title = !empty($blog['metaTitle']) ? $blog['metaTitle']
           : (!empty($blog['title']) ? $blog['title'] : 'LBEF');
    $desc  = isset($blog['metaDescription']) ? $blog['metaDescription'] : '';
    $url   = $APP_URL . '/blogs/' . (isset($blog['slug']) ? $blog['slug'] : $slug);
    $image = !empty($blog['featuredImage'])
           ? $IMAGE_URL . $blog['featuredImage']
           : $APP_URL . '/assets/lbefhd.webp';

    // Replace the static description meta (homepage default in index.html).
    $html = preg_replace(
        '/<meta\s+name=["\']description["\'][^>]*>/i',
        '<meta name="description" content="' . $e($desc) . '" />',
        $html, 1
    );

    // Inject <title> + canonical + Open Graph + Twitter right before </head>.
    $inject = '<title>' . $e($title) . '</title>'
        . '<link rel="canonical" href="' . $e($url) . '" />'
        . '<meta property="og:site_name" content="LBEF: The First IT College of Nepal" />'
        . '<meta property="og:type" content="article" />'
        . '<meta property="og:locale" content="en_US" />'
        . '<meta property="og:title" content="' . $e($title) . '" />'
        . '<meta property="og:description" content="' . $e($desc) . '" />'
        . '<meta property="og:url" content="' . $e($url) . '" />'
        . '<meta property="og:image" content="' . $e($image) . '" />'
        . '<meta name="twitter:card" content="summary_large_image" />'
        . '<meta name="twitter:title" content="' . $e($title) . '" />'
        . '<meta name="twitter:description" content="' . $e($desc) . '" />'
        . '<meta name="twitter:image" content="' . $e($image) . '" />'
        . '</head>';
    $html = preg_replace('/<\/head>/i', $inject, $html, 1);
}

header('Content-Type: text/html; charset=utf-8');
// Short cache so repeated crawler hits are cheap; tune as needed.
header('Cache-Control: public, max-age=60');
echo $html;
