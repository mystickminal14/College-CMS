<?php
/**
 * Texts a visitor their pass code and the guest WiFi login.
 *
 * Lives here, in public/, for the same reason blog-seo.php does: everything in
 * public/ is copied verbatim into dist/, so uploading the build to public_html
 * puts this file at /api/send-pass-sms.php with no extra deploy step and no
 * Node runtime.
 *
 * It has to be server-side on two counts:
 *   1. sms.sociair.com answers a CORS preflight with no CORS headers at all,
 *      so a fetch from the kiosk page is blocked before it is ever sent.
 *   2. The Sociair token is billable. Anything the JS bundle can read is
 *      readable by anyone who opens the kiosk page in devtools.
 *
 * The request body carries a qrToken and nothing else. The number and the
 * message are both derived here from the visitor record, so whoever finds this
 * endpoint cannot use it to text arbitrary words to arbitrary numbers - the
 * worst they can do is re-send one visitor their own pass.
 *
 * Credentials come from sms-config.php beside this file (copy
 * sms-config.sample.php and fill it in on the server). That file is gitignored
 * and .htaccess blocks it from being fetched directly.
 */
header('Content-Type: application/json');

$configFile = __DIR__ . '/sms-config.php';
if (is_file($configFile)) {
    require_once $configFile;
}

/** Environment first so `npm run dev` can inject from .env; then the config file. */
function sms_setting($name, $default = '')
{
    $fromEnv = getenv($name);
    if (is_string($fromEnv) && trim($fromEnv) !== '') return trim($fromEnv);
    if (defined($name) && trim((string) constant($name)) !== '') return trim((string) constant($name));
    return $default;
}

$SMS_TOKEN   = sms_setting('SMS_TOKEN');
$API_BASE    = rtrim(sms_setting('VISITOR_API_BASE_URL', 'https://edusysapi.lbef.info/api'), '/');
$ORG_NAME    = sms_setting('SMS_ORG_NAME', 'LBEF');

// Guest WiFi handed to the visitor in the same text. One shared demo login for
// now, because per-visitor credentials do not exist yet — when the network can
// issue a login per visit, that is the only thing that changes here.
$WIFI_SSID     = sms_setting('WIFI_SSID', 'LBEF-Guest');
$WIFI_USERNAME = sms_setting('WIFI_USERNAME', 'demo');
$WIFI_PASSWORD = sms_setting('WIFI_PASSWORD', 'demo1234');

const SOCIAIR_ENDPOINT = 'https://sms.sociair.com/api/sms';

// A visitor is standing at the kiosk waiting for the next screen, so neither
// hop gets a long leash.
const LOOKUP_TIMEOUT = 6;
const SEND_TIMEOUT   = 8;

/** Writes the reply and stops. */
function reply($status, array $body)
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

/** A reply the kiosk can act on: the visit is registered either way. */
function not_sent($reason, $status = 200)
{
    reply($status, array('sent' => false, 'reason' => $reason));
}

/**
 * Sociair addresses handsets by their bare ten-digit national number, but the
 * register stores what the kiosk captured — "+9779488857411".
 *
 * Returns null for anything that is not a Nepali mobile: landlines and foreign
 * numbers are on the register too, and sending them nothing beats paying for a
 * message the gateway will reject.
 */
function normalize_mobile($raw)
{
    $digits = preg_replace('/\D+/', '', (string) $raw);
    if ($digits === '') return null;

    // +977 9488857411 / 00977 9488857411
    if (strlen($digits) > 10 && strpos($digits, '977') === 0) {
        $digits = substr($digits, 3);
    }
    // A local 0-prefix, as it is written on a business card.
    if (strlen($digits) === 11 && $digits[0] === '0') {
        $digits = substr($digits, 1);
    }

    // Every Nepali mobile prefix — NTC, Ncell and Smart Cell alike — is ten
    // digits starting with 9. Nothing else can receive an SMS.
    return preg_match('/^9\d{9}$/', $digits) ? $digits : null;
}

/** "21 Sep 2026", or "" if the API sent nothing usable. */
function format_visit_date($value)
{
    if (!$value) return '';
    // The API returns "2026-09-21 04:09:55" — no zone. Read literally, because
    // treating it as UTC would shift an early-morning visit onto the day before.
    $ts = strtotime($value);
    return $ts ? date('j M Y', $ts) : '';
}

/** GET/POST JSON over cURL. Returns array(status, decoded body). */
function http_json($url, $timeout, array $headers, $postBody = null)
{
    $ch = curl_init($url);
    $opts = array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_CONNECTTIMEOUT => 4,
        CURLOPT_HTTPHEADER => $headers,
    );
    if ($postBody !== null) {
        $opts[CURLOPT_POST] = true;
        $opts[CURLOPT_POSTFIELDS] = $postBody;
    }
    curl_setopt_array($ch, $opts);

    $raw = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($raw === false) {
        error_log('send-pass-sms: ' . $url . ' failed - ' . $error);
        return array(0, null);
    }
    return array($status, json_decode($raw, true));
}

// ---------------------------------------------------------------------------

// getenv covers the CLI, where `npm run dev` runs this file through the php
// binary and there is no Apache to fill $_SERVER.
$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : (getenv('REQUEST_METHOD') ?: 'POST');
if ($method !== 'POST') {
    not_sent('Method not allowed.', 405);
}

if ($SMS_TOKEN === '') {
    error_log('send-pass-sms: SMS_TOKEN is not set (sms-config.php missing?).');
    not_sent('SMS is not configured.');
}

$rawBody = file_get_contents('php://input');
if ($rawBody === '' || $rawBody === false) {
    // php://input is empty under the CLI SAPI, which is how the dev server runs
    // this file; the body arrives on stdin there instead.
    $rawBody = file_get_contents('php://stdin');
}

$payload = json_decode($rawBody, true);
if (!is_array($payload)) {
    reply(400, array('sent' => false, 'reason' => 'Invalid JSON body.'));
}

$qrToken = isset($payload['qrToken']) ? $payload['qrToken'] : null;
// Matches the UUID shape the visitor API issues and validates on its side.
if (!is_string($qrToken) || !preg_match('/^[0-9a-fA-F-]{36}$/', $qrToken)) {
    reply(400, array('sent' => false, 'reason' => 'Invalid visitor token.'));
}

// The visitor's number is read from the record, never taken from the caller.
// The PHP entry point on the API side only routes to JSON when Accept is
// exactly "application/json"; anything else gets its HTML landing page.
list($lookupStatus, $pass) = http_json(
    $API_BASE . '/visitor/pass/' . $qrToken,
    LOOKUP_TIMEOUT,
    array('Accept: application/json')
);

if ($lookupStatus === 404) {
    not_sent('Visitor pass not found.', 404);
}
if ($lookupStatus !== 200 || !is_array($pass)) {
    not_sent('Could not read the visitor pass.', 502);
}
if (empty($pass['phone']) || empty($pass['code']) || empty($pass['name'])) {
    not_sent('Visitor pass is missing the details needed to text it.', 502);
}

$mobile = normalize_mobile($pass['phone']);
if ($mobile === null) {
    not_sent('Not a mobile number Sociair can deliver to.');
}

// The name is HTML-escaped by the API on the way in, which is right for a web
// page and wrong for a text message — "O&#039;Brien" would go out verbatim.
$name = html_entity_decode($pass['name'], ENT_QUOTES, 'UTF-8');
$visitedOn = format_visit_date(isset($pass['visitedDate']) ? $pass['visitedDate'] : null);

/**
 * Deliberately carries no link. The first version texted the pass URL and
 * Sociair refused it — "matches a known scam pattern". A personal name beside a
 * bare link ending in a long random token is the shape of a phishing SMS, and a
 * shared short code blocks that unless the domain is pre-approved.
 *
 * Nothing is lost: the kiosk QR already carries the URL, and what the visitor
 * needs is the code and the WiFi login.
 *
 * One item per line, labelled, because a visitor reads this standing in a
 * doorway and then types the password into a phone — a run-on sentence with
 * the credentials buried in it is the wrong shape for that.
 *
 * Sociair charges per 160-character segment, and the demo values leave this at
 * 110. A longer SSID or key spills into a second segment and doubles the cost
 * of every visit, so keep real credentials short.
 */
$message = $ORG_NAME . ' visitor pass ' . $pass['code'] . ' for ' . $name
    . ($visitedOn ? ', ' . $visitedOn : '') . "\n"
    . 'WiFi: ' . $WIFI_SSID . "\n"
    . 'username: ' . $WIFI_USERNAME . "\n"
    . 'password: ' . $WIFI_PASSWORD;

list($sendStatus, $result) = http_json(
    SOCIAIR_ENDPOINT,
    SEND_TIMEOUT,
    array(
        'Authorization: Bearer ' . $SMS_TOKEN,
        'Content-Type: application/json',
        'Accept: application/json',
    ),
    json_encode(array('message' => $message, 'mobile' => $mobile))
);

if ($sendStatus === 0) {
    not_sent('Could not reach the SMS gateway.', 502);
}

$gatewayMessage = is_array($result) && isset($result['message'])
    ? (string) $result['message']
    : 'Unexpected response from the SMS gateway.';

// Sociair reports a rejected number with a 200 and an invalid_number list, so
// the status code alone does not mean it was delivered.
$rejected = is_array($result) && !empty($result['invalid_number']);

if ($sendStatus !== 200 || $rejected) {
    error_log('send-pass-sms: ' . $mobile . ' not sent (HTTP ' . $sendStatus . ') - ' . $gatewayMessage);
    not_sent($gatewayMessage);
}

reply(200, array('sent' => true, 'reason' => $gatewayMessage));
