<?php
/**
 * Case Comments API
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/resend.php';

setupCORS();

$pdo = getDB();
$ip = getClientIP();

// 1. GET Request: Fetch comments for a specific case
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $slug = trim($_GET['slug'] ?? '');
    if (empty($slug)) {
        jsonResponse(['success' => false, 'message' => 'Missing slug parameter'], 400);
    }

    $stmt = $pdo->prepare("
        SELECT `id`, `slug`, `author`, `email_hash`, `content`, `badge`, `created_at`
        FROM `fonxt_comments`
        WHERE `slug` = ? AND `is_approved` = 1
        ORDER BY `id` DESC
        LIMIT 100
    ");
    $stmt->execute([$slug]);
    $comments = $stmt->fetchAll();

    jsonResponse([
        'success'  => true,
        'slug'     => $slug,
        'count'    => count($comments),
        'comments' => $comments,
    ]);
}

// 2. POST Request: Post a new comment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    // Honeypot anti-spam check (bots will fill this hidden input)
    if (!empty($input['website_hp'] ?? '')) {
        // Silently discard spam without error
        jsonResponse([
            'success' => true,
            'message' => '留言已提交。',
        ]);
    }

    $slug      = trim($input['slug'] ?? '');
    $author    = trim($input['author'] ?? '');
    $email     = trim($input['email'] ?? '');
    $content   = trim($input['content'] ?? '');
    $badge     = trim($input['badge'] ?? '');
    $caseTitle = trim($input['caseTitle'] ?? $slug);

    // Validation
    if (empty($slug)) {
        jsonResponse(['success' => false, 'message' => '缺少关联案例标识'], 400);
    }

    if (mb_strlen($author, 'UTF-8') < 1 || mb_strlen($author, 'UTF-8') > 40) {
        jsonResponse(['success' => false, 'message' => '请填写 1-40 字的称呼或昵称'], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => '请填写正确的邮箱地址，以便接收回复提醒'], 400);
    }

    if (mb_strlen($content, 'UTF-8') < 2 || mb_strlen($content, 'UTF-8') > 1000) {
        jsonResponse(['success' => false, 'message' => '留言内容请保持在 2-1000 字之间'], 400);
    }

    // Rate limiting: 1 comment per 60 seconds per IP
    $oneMinuteAgo = date('Y-m-d H:i:s', time() - 60);
    $rateStmt = $pdo->prepare("
        SELECT `id` FROM `fonxt_comments` 
        WHERE `ip` = ? AND `created_at` > ? 
        LIMIT 1
    ");
    $rateStmt->execute([$ip, $oneMinuteAgo]);
    if ($rateStmt->fetch()) {
        jsonResponse(['success' => false, 'message' => '留言太频繁啦，请休息一分钟后再试！'], 429);
    }

    // Hash email for gravatar / avatar generation (privacy protection)
    $emailHash = md5(strtolower(trim($email)));
    $userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255);

    // Safe badge values
    $allowedBadges = ['🔥 惊艳落地', '💡 极具启发', '🚀 想要类似方案', '👍 优秀案例'];
    if (!in_array($badge, $allowedBadges, true)) {
        $badge = null;
    }

    // Insert comment
    $stmt = $pdo->prepare("
        INSERT INTO `fonxt_comments` 
        (`slug`, `author`, `email`, `email_hash`, `content`, `badge`, `ip`, `user_agent`, `is_approved`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    ");
    $stmt->execute([$slug, $author, $email, $emailHash, $content, $badge, $ip, $userAgent]);
    $newId = $pdo->lastInsertId();

    // Trigger Resend email notification
    sendNewCommentNotification($caseTitle, $slug, $author, $email, $content);

    jsonResponse([
        'success' => true,
        'message' => '留言发布成功！',
        'comment' => [
            'id'         => (int)$newId,
            'slug'       => $slug,
            'author'     => $author,
            'email_hash' => $emailHash,
            'content'    => $content,
            'badge'      => $badge,
            'created_at' => date('Y-m-d H:i:s'),
        ]
    ]);
}

jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
