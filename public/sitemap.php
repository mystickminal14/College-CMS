<?php
/**
 * Serves /sitemap.xml from the API, so new blogs, courses and other pages are
 * listed automatically. If the API is down it uses the last good copy, then
 * the static sitemap.xml that ships with the build.
 */

$API_BASE  = getenv('SEO_API_BASE') ?: 'https://lbef-server.lbef.org/api';
$CACHE_TTL = 3600;

$cacheDir  = __DIR__ . '/.seo-cache';
$cacheFile = $cacheDir . '/sitemap.xml';

function build_sitemap($apiBase) {
    $ch = curl_init($apiBase . '/page-seo/sitemap');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 2,
        CURLOPT_TIMEOUT        => 5,
        CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($body === false || $code !== 200) return null;

    $json = json_decode($body, true);
    if (empty($json['data']) || !is_array($json['data'])) return null;

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n"
         . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    foreach ($json['data'] as $entry) {
        $xml .= '  <url><loc>' . htmlspecialchars($entry['url'], ENT_XML1 | ENT_QUOTES, 'UTF-8') . '</loc>';
        if (!empty($entry['lastmod'])) {
            $xml .= '<lastmod>' . gmdate('c', strtotime($entry['lastmod'])) . '</lastmod>';
        }
        $xml .= "</url>\n";
    }
    return $xml . "</urlset>\n";
}

$xml = null;

if (is_file($cacheFile) && time() - filemtime($cacheFile) < $CACHE_TTL) {
    $xml = file_get_contents($cacheFile);
}

if (!$xml) {
    $xml = build_sitemap($API_BASE);
    if ($xml) {
        if (!is_dir($cacheDir)) @mkdir($cacheDir, 0755, true);
        @file_put_contents($cacheFile, $xml, LOCK_EX);
    }
}

if (!$xml && is_file($cacheFile)) $xml = file_get_contents($cacheFile);
if (!$xml) $xml = file_get_contents(__DIR__ . '/sitemap.xml');

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=3600');
echo $xml;
