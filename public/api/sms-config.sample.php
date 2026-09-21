<?php
/**
 * Copy this to sms-config.php on the server and fill in the real values.
 *
 * sms-config.php is gitignored and never committed, so the Sociair token stays
 * out of the repository and out of the JS bundle. Apache executes .php rather
 * than serving it, and the .htaccess beside this file blocks a direct fetch of
 * it as well.
 *
 * Nothing here is read by the browser — send-pass-sms.php is the only consumer.
 */

// The non-recoverable token issued at sms.sociair.com. Same value as SMS_TOKEN
// in the project .env used for local development.
define('SMS_TOKEN', '');

// Where the visitor register lives, so the endpoint can look up the pass.
define('VISITOR_API_BASE_URL', 'https://edusysapi.lbef.info/api');

// Sociair sends from a shared short code, so the body has to say who it is from.
define('SMS_ORG_NAME', 'LBEF');

// Guest WiFi given to the visitor. Keep these short: the whole message has to
// fit 160 characters or every visit costs two SMS segments instead of one.
define('WIFI_SSID', 'LBEF-Guest');
define('WIFI_USERNAME', 'demo');
define('WIFI_PASSWORD', 'demo1234');
