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
    ";

    try {
        $pdo->exec($schema);
        $initialized = true;
    } catch (PDOException $e) {
        error_log('[DB Schema Init Error] ' . $e->getMessage());
    }
}
