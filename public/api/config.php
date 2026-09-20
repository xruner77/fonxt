<?php
/**
 * FONXT API Configuration
 * Secrets are loaded from server-side secure file or environment variables.
 */

// 1. Attempt to load server-side secure config (outside webroot)
$serverSecretFile = '/www/fonxt_data/api_secrets.php';
$localSecretFile  = __DIR__ . '/config.local.php';

if (file_exists($serverSecretFile)) {
    require_once $serverSecretFile;
} elseif (file_exists($localSecretFile)) {
    require_once $localSecretFile;
}

// 2. Default Configuration & Fallbacks
if (!defined('DB_HOST')) define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
if (!defined('DB_PORT')) define('DB_PORT', getenv('DB_PORT') ?: '3306');
if (!defined('DB_NAME')) define('DB_NAME', getenv('DB_NAME') ?: 'fonxt');
if (!defined('DB_USER')) define('DB_USER', getenv('DB_USER') ?: 'fonxt');
if (!defined('DB_PASS')) define('DB_PASS', getenv('DB_PASS') ?: '');
if (!defined('DB_CHARSET')) define('DB_CHARSET', 'utf8mb4');

if (!defined('RESEND_API_KEY')) define('RESEND_API_KEY', getenv('RESEND_API_KEY') ?: '');
if (!defined('ADMIN_EMAIL'))    define('ADMIN_EMAIL', getenv('ADMIN_EMAIL') ?: '624878348@qq.com');
if (!defined('RESEND_FROM'))    define('RESEND_FROM', getenv('RESEND_FROM') ?: 'FONXT <notice@fonxt.com>');

// 3. CORS & Response Helpers
function setupCORS() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowedOrigins = [
        'https://fonxt.com',
        'https://www.fonxt.com',
        'http://localhost:5173',
        'http://localhost:4173',
        'http://127.0.0.1:5173',
    ];

    if (in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        header("Access-Control-Allow-Origin: https://fonxt.com");
    }

    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function getClientIP() {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return $_SERVER['HTTP_CF_CONNECTING_IP'];
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ips[0]);
    }
    if (!empty($_SERVER['HTTP_X_REAL_IP'])) {
        return $_SERVER['HTTP_X_REAL_IP'];
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}
