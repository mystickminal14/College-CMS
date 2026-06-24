<?php
/**
 * Static SEO meta injector for the /referral page (Apache/cPanel hosting).
 *
 * The referral page has fixed content (no API data), but crawlers don't run JS
 * and would otherwise see the homepage tags from index.html. This script
 * rewrites <title> + description + OG/Twitter tags into index.html BEFORE
 * sending it, then the SPA boots normally.
 *
 * Tags match src/website/pages/referral/ReferralPage.tsx <Seo>.
 */

$APP_URL   = 'https://www.lbef.org';

$indexFile = __DIR__ . '/index.html';
$html      = file_get_contents($indexFile);

$e = function ($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); };

$title = 'Student Referral | LBEF College Nepal';
$desc  = 'Refer your friends and relatives to join the programmes offered at LBEF Campus and earn referral rewards.';
$url   = $APP_URL . '/referral';
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

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: public, max-age=300');
echo $html;
