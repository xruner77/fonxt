/**
 * 安全双保险剪贴板复制工具
 * 优先使用现代化 navigator.clipboard API，若在微信内置浏览器或非安全环境抛出异常，
 * 则自动无缝降级为 document.execCommand('copy') 方案。
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // 1. 尝试现代 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('navigator.clipboard.writeText 失败，尝试降级兼容方案:', err);
    }
  }

  // 2. 降级兼容方案：动态创建不可见 textarea + execCommand
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('所有剪贴板复制方案均失败:', err);
    return false;
  }
}
