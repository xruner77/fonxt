import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../config/site';
import { copyToClipboard } from '../../utils/clipboard';
import { X, Copy, Check, MessageSquare, Send, Loader2 } from 'lucide-react';
import './ContactModal.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  isSubdir?: boolean;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  isSubdir = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: '全栈数字化产品定制',
    budget: '0 ~ 1,000 元',
    desc: '',
  });

  const qrCodeSrc = isSubdir
    ? (siteConfig.wechatQrCode.startsWith('/') ? `..${siteConfig.wechatQrCode}` : `../${siteConfig.wechatQrCode}`)
    : (siteConfig.wechatQrCode.startsWith('/') ? `.${siteConfig.wechatQrCode}` : `./${siteConfig.wechatQrCode}`);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyWeChat = async () => {
    const success = await copyToClipboard(siteConfig.wechatId);
    if (success) {
      setCopied(true);
      onShowToast(`微信号「${siteConfig.wechatId}」已复制到剪贴板！`);
      setTimeout(() => setCopied(false), 3000);
    } else {
      onShowToast(`请手动添加微信号：${siteConfig.wechatId}`);
    }
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact.trim()) {
      onShowToast('请留下您的联系方式（微信或手机号），方便主理人联系您！');
      return;
    }

    const summaryText = `【FONXT 项目咨询单】\n姓名/称呼: ${formData.name || '未提供'}\n联系方式: ${formData.contact}\n项目类型: ${formData.projectType}\n预期预算: ${formData.budget}\n需求简述: ${formData.desc || '邮件进一步详聊'}`;

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          projectType: formData.projectType,
          budget: formData.budget,
          desc: formData.desc,
          website_hp: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onShowToast('🎉 ' + (data.message || '项目咨询已送达主理人邮箱，将在 2 小时内与您联系！'));
        copyToClipboard(summaryText);
        setTimeout(() => {
          onClose();
        }, 1800);
        return;
      }
    } catch {
      // If network fails, fallback to local mailto
    } finally {
      setSubmitting(false);
    }

    // 降级：复制需求文本到剪贴板并调起本地邮件客户端
    copyToClipboard(summaryText);
    onShowToast(`已调起邮件发送至 ${siteConfig.email}！内容已同时复制到剪贴板备用。`);
    const mailSubject = encodeURIComponent(`【项目咨询】${formData.projectType} - ${formData.name || formData.contact}`);
    const mailBody = encodeURIComponent(summaryText);
    const mailUrl = `mailto:${siteConfig.email}?subject=${mailSubject}&body=${mailBody}`;
    window.location.href = mailUrl;
  };

  return (
    <div 
      className="contact-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div 
        className="contact-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="关闭联系窗口"
        >
          <X size={20} />
        </button>

        <div className="contact-modal-grid">
          {/* Left: WeChat Direct QR */}
          <div className="contact-wechat-side">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-cyan)', fontWeight: '700' }}>
              <MessageSquare size={20} />
              <span>微信直接联系</span>
            </div>

            <div className="qr-card-wrap">
              {/* Native img for long-press recognition in WeChat */}
              <img
                src={qrCodeSrc}
                alt="FONXT 微信二维码"
                className="qr-code-img"
              />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              手机微信长按识别 / 扫一扫即刻沟通
            </span>

            <div className="wechat-id-box">
              <span>微信号: {siteConfig.wechatId}</span>
            </div>

            <button 
              className="btn-copy-wechat"
              onClick={handleCopyWeChat}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? '已复制微信号' : '一键复制微信号'}</span>
            </button>

            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              邮箱直达: <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--color-cyan)' }}>{siteConfig.email}</a>
            </span>
          </div>

          {/* Right: Project Inquiry Form */}
          <div className="contact-form-side">
            <div>
              <h3 id="contact-modal-title" className="form-title">预约项目评估与报价</h3>
              <p className="form-desc">
                填写基础信息，主理人通常会在 2 小时内亲自与您联系并提供专业架构建议。
              </p>
            </div>

            <form onSubmit={handleSubmitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div className="form-group">
                <label className="form-label">您的称呼 / 团队名称</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="例如：陈先生 / 某某科技有限公司"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">联系方式（微信或手机号）*</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="微信账号或手机号（必填）"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <div className="form-group">
                  <label className="form-label">项目类型</label>
                  <select
                    className="form-select"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    <option value="全栈数字化产品定制">全栈全包（设计+研发）</option>
                    <option value="AI作图与IP形象设计">AI作图与IP形象设计</option>
                    <option value="高端响应式网站制作">高端响应式网站制作</option>
                    <option value="微信小程序/App开发">微信小程序 / 移动App</option>
                    <option value="企业知识库与私有化部署">企业知识库与私有化部署</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">预期预算区间</label>
                  <select
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="0 ~ 1,000 元">0 ~ 1,000 元（轻量咨询/快速打样）</option>
                    <option value="1,000 ~ 10,000 元">1,000 ~ 10,000 元（常规模块/标准定制）</option>
                    <option value="10,000 元以上">10,000 元以上（商业全案/深度定制）</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">需求简要说明</label>
                <textarea
                  className="form-textarea"
                  placeholder="简述您的构想、参考案例或上线时间要求..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                />
              </div>

              {/* Honeypot for spam bots */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <button 
                type="submit" 
                className="btn-submit-inquiry" 
                id="btn-submit-email"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>正在投递咨询单...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>立即提交项目意向（直达主理人邮箱）</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
