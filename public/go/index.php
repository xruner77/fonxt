<?php
/**
 * FONXT 集中式外链重定向网关与点击计量中继器
 * 
 * 核心特性：
 * 1. 严格白名单 / 数据库 Slug 校验，彻底杜绝 Open Redirect 钓鱼漏洞
 * 2. 自动透传 utm_* 推广归因参数
 * 3. 注入 X-Robots-Tag: noindex, nofollow 隔离爬虫，保护主站 SEO 权重
 * 4. 利用 fastcgi_finish_request() 异步持久化点击日志，保证客户端 0ms 瞬间跳转体验
 */

require_once __DIR__ . '/../api/config.php';
require_once __DIR__ . '/../api/db.php';

// 1. 提取并清洗 slug 参数
$slug = trim($_GET['slug'] ?? '');

// 默认兜底安全跳转目标
$fallbackUrl = 'https://fonxt.com/portfolio.html';

if (empty($slug) || !preg_match('/^[a-zA-Z0-9_-]+$/', $slug)) {
    header("Location: " . $fallbackUrl, true, 302);
    header("X-Robots-Tag: noindex, nofollow");
    exit;
}

$pdo = null;
$targetUrl = null;

try {
    $pdo = getDB();
    $stmt = $pdo->prepare("SELECT `target_url` FROM `fonxt_redirect_links` WHERE `slug` = :slug LIMIT 1");
    $stmt->execute([':slug' => $slug]);
    $row = $stmt->fetch();

    if ($row && !empty($row['target_url'])) {
        $targetUrl = $row['target_url'];
    }
} catch (Exception $e) {
    error_log('[Go Gateway DB Query Error] ' . $e->getMessage());
}

// 若数据库未查到，支持静态高优先级硬编码兜底（保证即使数据库故障亦可正常跳转）
if (!$targetUrl) {
    $hardcodedFallback = [
        'magic-gemini'    => 'https://mg.fonxt.com',
        't1-zoom-helper'  => '/downloads/T1ZoomHelper.apk',
        't1-fix-zip'      => '/downloads/斐讯T1_全固件自适应硬解修复工具包.zip',
        't1-kodi-apk'     => 'https://mirrors.kodi.tv/releases/android/arm/kodi-21.0-Omega-armeabi-v7a.apk',
        'enshan-t1'       => 'https://www.right.com.cn/forum/thread-8418939-1-1.html',
    ];
    if (isset($hardcodedFallback[$slug])) {
        $targetUrl = $hardcodedFallback[$slug];
    }
}

// 若仍无匹配，安全降级至案例中心
if (!$targetUrl) {
    header("Location: " . $fallbackUrl, true, 302);
    header("X-Robots-Tag: noindex, nofollow");
    exit;
}

// 2. 智能处理 UTM 参数拼接
$utmParams = [];
foreach ($_GET as $key => $val) {
    if (strpos($key, 'utm_') === 0 && is_string($val)) {
        $utmParams[$key] = $val;
    }
}

if (!empty($utmParams) && strpos($targetUrl, 'http') === 0) {
    $delimiter = (strpos($targetUrl, '?') === false) ? '?' : '&';
    $targetUrl .= $delimiter . http_build_query($utmParams);
}

// 3. 立即下发 HTTP 302 响应头并冲刷至客户端
header("Location: " . $targetUrl, true, 302);
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header("X-Robots-Tag: noindex, nofollow");
header("Connection: close");

// 4. 若为 FastCGI 环境，优先立即断开客户端连接，完成 0ms 秒级重定向
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
}

// 5. 后台静默执行原子计数与访问日志持久化（绝不阻断用户）
if ($pdo) {
    try {
        $updateStmt = $pdo->prepare("UPDATE `fonxt_redirect_links` SET `click_count` = `click_count` + 1 WHERE `slug` = :slug");
        $updateStmt->execute([':slug' => $slug]);

        $ip = substr($_SERVER['REMOTE_ADDR'] ?? '', 0, 64);
        $referer = substr($_SERVER['HTTP_REFERER'] ?? '', 0, 255);
        $ua = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255);

        $logStmt = $pdo->prepare("INSERT INTO `fonxt_redirect_clicks` (`slug`, `ip`, `referer`, `user_agent`) VALUES (:slug, :ip, :referer, :ua)");
        $logStmt->execute([
            ':slug'    => $slug,
            ':ip'      => $ip,
            ':referer' => $referer,
            ':ua'      => $ua
        ]);
    } catch (Exception $e) {
        error_log('[Go Gateway Log Write Error] ' . $e->getMessage());
    }
}

exit;
