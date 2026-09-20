<?php
/**
 * Page View Counter API
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

setupCORS();

$pdo = getDB();
$ip = getClientIP();

// 1. GET/HEAD Request: Query view count
if ($_SERVER['REQUEST_METHOD'] === 'GET' || $_SERVER['REQUEST_METHOD'] === 'HEAD') {
    $slug = trim($_GET['slug'] ?? '');
    if (empty($slug)) {
        jsonResponse(['success' => false, 'message' => 'Missing slug parameter'], 400);
    }

    $stmt = $pdo->prepare("SELECT `count` FROM `fonxt_views` WHERE `slug` = ? LIMIT 1");
    $stmt->execute([$slug]);
    $row = $stmt->fetch();

    $count = $row ? (int)$row['count'] : 0;
    jsonResponse([
        'success' => true,
        'slug'    => $slug,
        'count'   => $count,
    ]);
}

// 2. POST Request: Increment view count
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $slug = trim($input['slug'] ?? '');

    if (empty($slug)) {
        jsonResponse(['success' => false, 'message' => 'Missing slug parameter'], 400);
    }

    // Rate limiting: check if this IP visited this slug within 5 minutes
    $fiveMinutesAgo = date('Y-m-d H:i:s', time() - 300);
    $checkStmt = $pdo->prepare("
        SELECT `id` FROM `fonxt_view_logs` 
        WHERE `slug` = ? AND `ip` = ? AND `created_at` > ? 
        LIMIT 1
    ");
    $checkStmt->execute([$slug, $ip, $fiveMinutesAgo]);
    $recentlyViewed = $checkStmt->fetch();

    if (!$recentlyViewed) {
        // Record visit log
        $logStmt = $pdo->prepare("INSERT INTO `fonxt_view_logs` (`slug`, `ip`) VALUES (?, ?)");
        $logStmt->execute([$slug, $ip]);

        // Upsert view count
        $upsertStmt = $pdo->prepare("
            INSERT INTO `fonxt_views` (`slug`, `count`) 
            VALUES (?, 1) 
            ON DUPLICATE KEY UPDATE `count` = `count` + 1
        ");
        $upsertStmt->execute([$slug]);
    }

    // Return the latest count
    $stmt = $pdo->prepare("SELECT `count` FROM `fonxt_views` WHERE `slug` = ? LIMIT 1");
    $stmt->execute([$slug]);
    $row = $stmt->fetch();
    $count = $row ? (int)$row['count'] : 1;

    jsonResponse([
        'success'   => true,
        'slug'      => $slug,
        'count'     => $count,
        'increment' => !$recentlyViewed,
    ]);
}

jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
