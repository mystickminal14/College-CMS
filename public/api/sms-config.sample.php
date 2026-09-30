<?php
// Copy to sms-config.php on the server and fill in. sms-config.php is
// gitignored and .htaccess refuses to serve either file.

define('SMS_TOKEN', '');                     // Sociair bearer token
// define('VISITOR_API_BASE_URL', 'https://edusysapi.lbef.info');   // no /api
// define('SMS_ORG_NAME', 'LBEF');
// define('WIFI_SSID', 'LBEF');

// Guest WiFi voucher database (table layout: sql/wifi_vouchers.sql)
define('DB_HOST', 'localhost');
define('DB_NAME', '');
define('DB_USER', '');
define('DB_PASS', '');
define('VOUCHER_TABLE', 'wifi_vouchers');
