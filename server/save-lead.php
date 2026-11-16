<?php
/**
 * NDR EdTech — receives enquiry-form submissions and stores them in MySQL.
 * Upload to GoDaddy (e.g. public_html/api/save-lead.php) next to config.php.
 * Database credentials live ONLY in config.php (never in the website's JavaScript).
 */

declare(strict_types=1);

/* Never print PHP errors to visitors (they can reveal server paths); they go to the error log instead. */
ini_set("display_errors", "0");
error_reporting(E_ALL);

$config = require __DIR__ . '/config.php';

/* ---------- CORS: only our own sites may call this ---------- */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $config['allowed_origins'], true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST')    { http_response_code(405); echo json_encode(['ok' => false, 'error' => 'POST only']); exit; }

function fail(int $code, string $msg): void { http_response_code($code); echo json_encode(['ok' => false, 'error' => $msg]); exit; }
function field(string $k, int $max): string {
    $v = isset($_POST[$k]) ? trim((string)$_POST[$k]) : '';
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}

/* ---------- Honeypot (bots fill hidden fields) ---------- */
if (field('website', 100) !== '') { echo json_encode(['ok' => true]); exit; }

$name    = field('name', 60);
$phone   = preg_replace('/\D/', '', field('phone', 20)) ?? '';
$phone   = substr($phone, -10);
$email   = field('email', 120);
$qual    = field('qualification', 80);
$course  = field('course', 120);
$mode    = field('mode', 40);
$message = field('message', 1000);
$source  = field('source', 40);
$page    = field('page', 255);

/* ---------- Validation (same rules as the website) ---------- */
$linkRe = '~(https?://|ftp://|www\.|<\s*a\b|href\s*=|\b[a-z0-9-]{3,}\.(com|in|net|org|io|co|me|ly|info|biz|xyz|app|dev|link|site|online|store|tech|shop|live|page|gl|be|to)\b)~i';

if (!preg_match("/^[a-zA-Z\s.'-]{2,60}$/", $name))                 fail(422, 'Invalid name');
if (!preg_match('/^[6-9]\d{9}$/', $phone))                         fail(422, 'Invalid phone');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))                    fail(422, 'Invalid email');
if ($qual === '' || $course === '')                                fail(422, 'Qualification and course are required');
if ($message === '' || preg_match($linkRe, $message))              fail(422, 'Message is required and must not contain links');

/* ---------- Store ---------- */
mysqli_report(MYSQLI_REPORT_OFF);
$db = @new mysqli($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name']);
if ($db->connect_errno) { error_log('NDR leads DB connect: ' . $db->connect_error); fail(500, 'Server error'); }
$db->set_charset('utf8mb4');

$ip = substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
$ua = substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);

/* Basic rate limit: max 5 submissions per IP per 10 minutes */
$stmt = $db->prepare('SELECT COUNT(*) FROM leads WHERE ip = ? AND created_at > (NOW() - INTERVAL 10 MINUTE)');
$stmt->bind_param('s', $ip);
$stmt->execute();
$stmt->bind_result($recent);
$stmt->fetch();
$stmt->close();
if ($recent >= 5) fail(429, 'Too many requests');

$stmt = $db->prepare('INSERT INTO leads (name, phone, email, qualification, course, mode, message, source, page, ip, user_agent) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
$stmt->bind_param('sssssssssss', $name, $phone, $email, $qual, $course, $mode, $message, $source, $page, $ip, $ua);
if (!$stmt->execute()) { error_log('NDR leads insert: ' . $stmt->error); fail(500, 'Server error'); }
$stmt->close();
$db->close();

echo json_encode(['ok' => true]);
