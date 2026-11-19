<?php
/**
 * Sends index.html with the correct tags for the requested URL, so crawlers
 * that do not run JS still see them. Routed from .htaccess for every website
 * page. The API decides the values (admin SEO section first, then page
 * defaults) and whether the URL is a real page; a fake URL gets a 404 status.
 *
 * Same HTML for people and bots. If the API is down the last good answer is
 * used, then plain index.html, so a failure never takes a page down.
 */

$API_BASE  = getenv('SEO_API_BASE') ?: 'https://lbef-server.lbef.org/api';
$CACHE_TTL = 60; // Seconds before an admin edit shows up.

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$path = rtrim($path, '/') ?: '/';

$html = file_get_contents(__DIR__ . '/index.html');

function fetch_seo($url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 1,
        CURLOPT_TIMEOUT        => 2,
        CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($body === false || $code !== 200) return null;
    $json = json_decode($body, true);
    return isset($json['data']['found']) ? $json['data'] : null;
}

function load_seo($path, $apiBase, $ttl) {
    $dir  = __DIR__ . '/.seo-cache';
    $file = $dir . '/' . sha1($path) . '.json';

    if (is_file($file) && time() - filemtime($file) < $ttl) {
        $cached = json_decode((string) file_get_contents($file), true);
        if ($cached) return $cached;
    }

    $seo = fetch_seo($apiBase . '/page-seo/lookup?path=' . rawurlencode($path));

    if ($seo === null) {
        $stale = is_file($file) ? json_decode((string) file_get_contents($file), true) : null;
        return $stale ?: null;
    }

    // Fake URLs are not cached, or a crawl of bad links would fill the disk.
    if ($seo['found']) {
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
        @file_put_contents($file, json_encode($seo), LOCK_EX);
    }
    return $seo;
}

$seo = load_seo($path, $API_BASE, $CACHE_TTL);

if ($seo && !$seo['found']) {
    http_response_code(404);
    header('Cache-Control: no-store');
} else {
    header('Cache-Control: public, max-age=60');
}

if ($seo && $seo['found']) {
    $e = function ($value) { return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8'); };
    $tag = function ($attr, $name, $value) use ($e) {
        return '<meta data-server-seo ' . $attr . '="' . $name . '" content="' . $e($value) . '" />';
    };

    // Replace the defaults from index.html rather than adding a second copy.
    $html = preg_replace('/<title\b[^>]*>.*?<\/title>\s*/is', '', $html, 1);
    $html = preg_replace('/<meta\b[^>]*\bname=["\']description["\'][^>]*>\s*/is', '', $html, 1);

    $inject = '<title data-server-seo>' . $e($seo['title']) . '</title>'
        . $tag('name', 'description', $seo['description'])
        . '<link data-server-seo rel="canonical" href="' . $e($seo['canonical']) . '" />'
        . $tag('property', 'og:site_name', 'LBEF: The First IT College of Nepal')
        . $tag('property', 'og:type', $seo['ogType'])
        . $tag('property', 'og:locale', 'en_US')
        . $tag('property', 'og:title', $seo['title'])
        . $tag('property', 'og:description', $seo['description'])
        . $tag('property', 'og:url', $seo['canonical'])
        . $tag('property', 'og:image', $seo['image'])
        . $tag('name', 'twitter:card', 'summary_large_image')
        . $tag('name', 'twitter:title', $seo['title'])
        . $tag('name', 'twitter:description', $seo['description'])
        . $tag('name', 'twitter:image', $seo['image'])
        // Lets React use these values without calling the API again.
        . '<script data-server-seo>window.__SEO__='
        . json_encode($seo, JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_SLASHES)
        . ';</script>';

    $html = str_ireplace('</head>', $inject . '</head>', $html);
}

header('Content-Type: text/html; charset=utf-8');
echo $html;
