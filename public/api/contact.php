<?php
/**
 * Commercial Contact / Inquiry Form API
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/resend.php';

setupCORS();

$pdo = getDB();
$ip = getClientIP();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    // Honeypot bot trap
    if (!empty($input['website_hp'] ?? '')) {
        jsonResponse([
            'success' => true,
            'message' => '咨询已提交。',
        ]);
    }

    $name        = trim($input['name'] ?? '');
    $contact     = trim($input['contact'] ?? '');
    $projectType = trim($input['projectType'] ?? '全栈数字化产品定制');
    $budget      = trim($input['budget'] ?? '待评估');
    $desc        = trim($input['desc'] ?? '');

    if (empty($contact)) {
        jsonResponse(['success' => false, 'message' => '请填写您的联系方式（微信或电话）'], 400);
    }

    // Rate limiting: 1 submission per 30 seconds per IP
    $thirtySecondsAgo = date('Y-m-d H:i:s', time() - 30);
    $rateStmt = $pdo->prepare("
        SELECT `id` FROM `fonxt_inquiries` 
        WHERE `ip` = ? AND `created_at` > ? 
        LIMIT 1
    ");
    $rateStmt->execute([$ip, $thirtySecondsAgo]);
    if ($rateStmt->fetch()) {
        jsonResponse(['success' => false, 'message' => '咨询提交太快啦，请稍候再试！'], 429);
    }

    // Insert inquiry into database
    $stmt = $pdo->prepare("
        INSERT INTO `fonxt_inquiries` 
        (`name`, `contact`, `project_type`, `budget`, `description`, `ip`) 
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$name, $contact, $projectType, $budget, $desc, $ip]);

    // Dispatch email notification via Resend
    sendNewInquiryNotification($name, $contact, $projectType, $budget, $desc);

    jsonResponse([
        'success' => true,
        'message' => '您的项目咨询已送达主理人邮箱，我们将在 2 小时内与您联系！',
    ]);
}

jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
