<?php
/**
 * Database connection and schema initializer
 */
require_once __DIR__ . '/config.php';

function getDB() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=%s',
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_CHARSET
    );

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        initTables($pdo);
        return $pdo;
    } catch (PDOException $e) {
        error_log('[DB Error] ' . $e->getMessage());
        jsonResponse([
            'success' => false,
            'message' => '数据库连接失败，请稍后重试。'
        ], 500);
    }
}

function initTables(PDO $pdo) {
    static $initialized = false;
    if ($initialized) return;

    $schema = "
    CREATE TABLE IF NOT EXISTS `fonxt_views` (
        `slug` VARCHAR(120) NOT NULL PRIMARY KEY,
        `count` INT UNSIGNED NOT NULL DEFAULT 0,
        `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `fonxt_view_logs` (
        `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `slug` VARCHAR(120) NOT NULL,
        `ip` VARCHAR(64) NOT NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX `idx_slug_ip_time` (`slug`, `ip`, `created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `fonxt_comments` (
        `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `slug` VARCHAR(120) NOT NULL,
        `author` VARCHAR(80) NOT NULL,
        `email` VARCHAR(120) NOT NULL,
        `email_hash` VARCHAR(64) NOT NULL,
        `content` TEXT NOT NULL,
        `badge` VARCHAR(40) NULL DEFAULT NULL,
        `ip` VARCHAR(64) NOT NULL,
        `user_agent` VARCHAR(255) NULL,
        `is_approved` TINYINT(1) NOT NULL DEFAULT 1,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX `idx_slug_approved` (`slug`, `is_approved`, `created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `fonxt_inquiries` (
        `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(80) NULL,
        `contact` VARCHAR(120) NOT NULL,
        `project_type` VARCHAR(120) NULL,
        `budget` VARCHAR(80) NULL,
        `description` TEXT NULL,
        `ip` VARCHAR(64) NOT NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `fonxt_redirect_links` (
        `slug` VARCHAR(80) NOT NULL PRIMARY KEY,
        `target_url` VARCHAR(500) NOT NULL,
        `title` VARCHAR(150) NOT NULL,
        `category` VARCHAR(60) NOT NULL DEFAULT 'external',
        `click_count` INT UNSIGNED NOT NULL DEFAULT 0,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS `fonxt_redirect_clicks` (
        `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `slug` VARCHAR(80) NOT NULL,
        `ip` VARCHAR(64) NOT NULL,
        `referer` VARCHAR(255) NULL,
        `user_agent` VARCHAR(255) NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX `idx_slug_created` (`slug`, `created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";

    try {
        $pdo->exec($schema);

        // 注入初始种子重定向 Slug (幂等写入)
        $seedSql = "
        INSERT IGNORE INTO `fonxt_redirect_links` (`slug`, `target_url`, `title`, `category`) VALUES
        ('magic-gemini', 'https://mg.fonxt.com', 'MagicGemini 影视级全模态 AI 创作中枢', 'product'),
        ('t1-zoom-helper', '/downloads/T1ZoomHelper.apk', 'T1ZoomHelper.apk (v3.1) 独立安装包', 'download'),
        ('t1-fix-zip', '/downloads/斐讯T1_全固件自适应硬解修复工具包.zip', '斐讯T1 全固件自适应硬解修复工具包', 'download'),
        ('t1-kodi-apk', 'https://mirrors.kodi.tv/releases/android/arm/kodi-21.0-Omega-armeabi-v7a.apk', 'Kodi v21.0 Omega 官方推荐稳定版 APK', 'download'),
        ('enshan-t1', 'https://www.right.com.cn/forum/thread-8418939-1-1.html', '恩山无线论坛 T1 深度技术原帖', 'community');
        ";
        $pdo->exec($seedSql);

        $initialized = true;
    } catch (PDOException $e) {
        error_log('[DB Schema Init Error] ' . $e->getMessage());
    }
}
