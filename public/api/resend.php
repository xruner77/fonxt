<?php
/**
 * Resend Email Notification Service
 */
require_once __DIR__ . '/config.php';

function sendResendEmail($subject, $htmlBody) {
    if (!defined('RESEND_API_KEY') || empty(RESEND_API_KEY)) {
        error_log('[Resend Error] RESEND_API_KEY is not configured');
        return false;
    }

    $payload = [
        'from'    => RESEND_FROM,
        'to'      => [ADMIN_EMAIL],
        'subject' => $subject,
        'html'    => $htmlBody,
    ];

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . RESEND_API_KEY,
            'Content-Type: application/json',
            'User-Agent: FONXT-Mailer/1.0',
        ],
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($curlErr) {
        error_log('[Resend cURL Error] ' . $curlErr);
        return false;
    }

    if ($httpCode >= 200 && $httpCode < 300) {
        return true;
    }

    error_log("[Resend API Error {$httpCode}] Response: " . $response);
    return false;
}

function sendNewCommentNotification($caseTitle, $slug, $author, $email, $content) {
    $safeAuthor = htmlspecialchars($author, ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safeContent = nl2br(htmlspecialchars($content, ENT_QUOTES, 'UTF-8'));
    $safeTitle = htmlspecialchars($caseTitle, ENT_QUOTES, 'UTF-8');
    $caseUrl = "https://fonxt.com/case/{$slug}.html#case-comments";
    $currentTime = date('Y-m-d H:i:s');

    $subject = "💬【FONXT 案例新留言】{$safeAuthor} 评论了《{$safeTitle}》";
    $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{$subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #111827; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          <!-- Header -->
          <tr>
            <td style="padding: 24px 30px; background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(147, 51, 234, 0.15)); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #06b6d4; text-transform: uppercase; margin-bottom: 6px;">FONXT · PORTFOLIO NOTIFICATION</div>
              <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">收到新的案例访客留言</h2>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-size: 14px; width: 90px;"><strong>关联案例：</strong></td>
                  <td style="padding: 6px 0; color: #38bdf8; font-size: 14px; font-weight: 600;">{$safeTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-size: 14px;"><strong>访客称呼：</strong></td>
                  <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">{$safeAuthor}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-size: 14px;"><strong>联系邮箱：</strong></td>
                  <td style="padding: 6px 0; color: #ffffff; font-size: 14px;"><a href="mailto:{$safeEmail}" style="color: #06b6d4; text-decoration: none;">{$safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-size: 14px;"><strong>提交时间：</strong></td>
                  <td style="padding: 6px 0; color: #94a3b8; font-size: 14px;">{$currentTime}</td>
                </tr>
              </table>

              <div style="background-color: #0f172a; border-left: 4px solid #06b6d4; border-radius: 6px; padding: 18px; margin: 20px 0; color: #f1f5f9; font-size: 15px; line-height: 1.7;">
                {$safeContent}
              </div>

              <div style="margin-top: 30px; text-align: center;">
                <a href="{$caseUrl}" target="_blank" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #06b6d4, #3b82f6); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);">
                  在前台查看此案例讨论 →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 30px; background-color: #0b0f17; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; font-size: 12px; color: #64748b;">
              本邮件由 fonxt.com 数字化工作台自动发送，回复可直接沟通访客。
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

    return sendResendEmail($subject, $html);
}

function sendNewInquiryNotification($name, $contact, $projectType, $budget, $desc) {
    $safeName = htmlspecialchars($name ?: '未提供', ENT_QUOTES, 'UTF-8');
    $safeContact = htmlspecialchars($contact, ENT_QUOTES, 'UTF-8');
    $safeType = htmlspecialchars($projectType ?: '全栈数字化产品定制', ENT_QUOTES, 'UTF-8');
    $safeBudget = htmlspecialchars($budget ?: '待评估', ENT_QUOTES, 'UTF-8');
    $safeDesc = nl2br(htmlspecialchars($desc ?: '（客户未填写附注，建议直接微信/电话联系）', ENT_QUOTES, 'UTF-8'));
    $currentTime = date('Y-m-d H:i:s');

    $subject = "🔥【FONXT 商业咨询】来自 {$safeContact} 的项目需求意向单";
    $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{$subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #111827; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          <!-- Header -->
          <tr>
            <td style="padding: 24px 30px; background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.25)); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #f472b6; text-transform: uppercase; margin-bottom: 6px;">NEW LEAD · CLIENT INQUIRY</div>
              <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">收到新的商业项目咨询意向单！</h2>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 100px;"><strong>客户称呼：</strong></td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">{$safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>联系方式：</strong></td>
                  <td style="padding: 8px 0; color: #38bdf8; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">{$safeContact}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>项目类型：</strong></td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">{$safeType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>预期预算：</strong></td>
                  <td style="padding: 8px 0; color: #34d399; font-size: 15px; font-weight: 600;">{$safeBudget}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>提交时间：</strong></td>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">{$currentTime}</td>
                </tr>
              </table>

              <div style="font-size: 13px; color: #94a3b8; font-weight: 600; margin-bottom: 8px;">需求详情与初步设想：</div>
              <div style="background-color: #0f172a; border-left: 4px solid #ec4899; border-radius: 6px; padding: 18px; color: #f1f5f9; font-size: 15px; line-height: 1.7;">
                {$safeDesc}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 30px; background-color: #0b0f17; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; font-size: 12px; color: #64748b;">
              请在 2 小时内跟进客户联系方式，把握商业合作最佳时机。
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

    return sendResendEmail($subject, $html);
}
