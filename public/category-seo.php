<?php
/**
 * Per-category SEO meta injector for static (Apache/cPanel) hosting.
 *
 * Mirrors blog-seo.php but for the program-category landing pages routed by
 * .htaccess for /camp/:slug (React: CategoryCoursesPage). Crawlers don't run
 * JS, so a pure SPA serves them the homepage tags from index.html. This script
 * fetches the category list, finds the one matching :slug, and rewrites
 * <title> + description + OG/Twitter tags into index.html BEFORE sending it.
 *
 * Tags match src/website/pages/programs/CategoryCoursesPage.tsx <Seo>.
 */

$API_BASE  = 'https://lbef-server.lbef.org/api';
$APP_URL   = 'https://www.lbef.org';
$IMAGE_URL = 'https://lbef-server.lbef.org';

$slug      = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$indexFile = __DIR__ . '/index.html';
$html      = file_get_contents($indexFile);

/** Fetch JSON. Prefer cURL; fall back to file_get_contents. */
function fetch_json($url) {
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

$category = null;
if ($slug !== '') {
    $raw = fetch_json($API_BASE . '/course-categories/with-courses');
    if ($raw) {
        $json = json_decode($raw, true);
        if (isset($json['data']) && is_array($json['data'])) {
            foreach ($json['data'] as $cat) {
                if (isset($cat['slug']) && $cat['slug'] === $slug) {
                    $category = $cat;
                    break;
                }
            }
        }
    }
}

if ($category) {
    $e = function ($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); };

    $name  = !empty($category['name']) ? $category['name'] : 'Programs';
    $title = $name . ' | LBEF College';
    $desc  = 'Explore ' . $name . ' programs at LBEF College Nepal. World-class courses designed for global careers.';
    $url   = $APP_URL . '/camp/' . $slug;
    $image = $APP_URL . '/assets/lbefhd.webp';

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
        . '<meta property="og:type" content="website" />'
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
header('Cache-Control: public, max-age=60');
echo $html;
