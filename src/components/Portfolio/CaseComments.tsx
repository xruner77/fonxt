import React, { useState, useEffect } from 'react';
import { 
  Send, 
  User, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Sparkles,
  Lock
} from 'lucide-react';
import './CaseComments.css';

/**
 * Public Comment Entity Contract
 */
export interface CommentItem {
  id: number;
  slug: string;
  author: string;
  email_hash?: string;
  content: string;
  badge?: string | null;
  created_at: string;
}

/**
 * Component Interface Contract
 */
export interface CaseCommentsProps {
  slug: string;
  caseTitle: string;
}

const ATTITUDE_OPTIONS = [
  '🔥 惊艳落地',
  '💡 极具启发',
  '🚀 想要类似方案',
  '👍 优秀案例'
];

const AVATAR_PALETTES = [
  'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
  'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
  'linear-gradient(135deg, #ea580c 0%, #e11d48 100%)',
  'linear-gradient(135deg, #059669 0%, #10b981 100%)',
];

function getAvatarBackground(str: string): { background: string } {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTES.length;
  return { background: AVATAR_PALETTES[index] };
}

function formatRelativeTime(dateStr: string): string {
  try {
    const timestamp = new Date(dateStr.replace(/-/g, '/')).getTime();
    if (isNaN(timestamp)) return dateStr;
    const now = Date.now();
    const diffSec = Math.floor((now - timestamp) / 1000);

    if (diffSec < 60) return '刚刚';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} 分钟前`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} 小时前`;
    if (diffSec < 86400 * 30) return `${Math.floor(diffSec / 86400)} 天前`;

    return dateStr.split(' ')[0] || dateStr;
  } catch {
    return dateStr;
  }
}

export const CaseComments: React.FC<CaseCommentsProps> = ({ slug, caseTitle }) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [author, setAuthor] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [badge, setBadge] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');

  // Hydrate cached author/email from localStorage
  useEffect(() => {
    try {
      const savedAuthor = localStorage.getItem('fonxt_comment_author');
      const savedEmail = localStorage.getItem('fonxt_comment_email');
      if (savedAuthor) setAuthor(savedAuthor);
      if (savedEmail) setEmail(savedEmail);
    } catch {
      // Graceful fallback for non-storage environments
    }
  }, []);

  // Fetch comments
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/comments.php?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      })
      .catch((err) => {
        console.warn('[CaseComments] Fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedAuthor = author.trim();
    const trimmedEmail = email.trim();
    const trimmedContent = content.trim();

    if (!trimmedAuthor) {
      setFeedback({ type: 'error', text: '请填写您的称呼或昵称' });
      return;
    }
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setFeedback({ type: 'error', text: '请填写有效的联系邮箱，以便接收博主回复通知' });
      return;
    }
    if (!trimmedContent) {
      setFeedback({ type: 'error', text: '请填写留言内容' });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/comments.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          caseTitle,
          author: trimmedAuthor,
          email: trimmedEmail,
          content: trimmedContent,
          badge: badge || null,
          website_hp: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({ type: 'success', text: data.message || '留言发布成功！' });
        setContent('');
        setBadge('');

        try {
          localStorage.setItem('fonxt_comment_author', trimmedAuthor);
          localStorage.setItem('fonxt_comment_email', trimmedEmail);
        } catch {
          // Ignore
        }

        if (data.comment) {
          setComments((prev) => [data.comment, ...prev]);
        }
      } else {
        setFeedback({ type: 'error', text: data.message || '留言提交失败，请稍后重试' });
      }
    } catch {
      setFeedback({ type: 'error', text: '网络连接异常，请检查网络后重试' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="case-comments-section" id="case-comments" aria-label="案例访客讨论与留言">
      {/* Standard Section Title Bar (Exact match with other case sections) */}
      <div className="comments-header-bar">
        <div className="comments-header-left">
          <span className="section-bar-accent" />
          <h2 className="section-title-cn">访客讨论与留言</h2>
          <span className="section-title-en">COMMENTS & DISCUSSION</span>
        </div>

        <span className="comments-count-badge">
          {loading ? '同步中...' : `共 ${comments.length} 条讨论`}
        </span>
      </div>

      {/* Main Card Container */}
      <div className="comments-main-card">
        {/* Form Box */}
        <form className="comments-form-box" onSubmit={handleSubmit}>
          <div className="form-box-heading">
            <h3 className="form-box-title">发表您的见解与需求</h3>
            <p className="form-box-subtitle">探讨本案例的落地经验、技术方案或商业定制需求</p>
          </div>

          {/* Attitude Quick Selection */}
          <div className="attitude-picker-row">
            <span className="attitude-title">一键表态（可选）：</span>
            <div className="attitude-tags-group">
              {ATTITUDE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`attitude-tag-btn ${badge === opt ? 'active' : ''}`}
                  onClick={() => setBadge(badge === opt ? '' : opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="form-fields-grid">
            <div className="form-field-item">
              <label className="form-field-label">
                您的称呼 / 昵称 <span className="req-star">*</span>
              </label>
              <div className="field-input-wrapper">
                <User size={15} className="field-icon" />
                <input
                  type="text"
                  className="form-text-input"
                  placeholder="例如：张工 / 产品主理人"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  maxLength={40}
                  required
                />
              </div>
            </div>

            <div className="form-field-item">
              <label className="form-field-label">
                联系邮箱（用于接收回复通知） <span className="req-star">*</span>
              </label>
              <div className="field-input-wrapper">
                <Mail size={15} className="field-icon" />
                <input
                  type="email"
                  className="form-text-input"
                  placeholder="name@example.com（绝不对外公开）"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={100}
                  required
                />
              </div>
            </div>
          </div>

          {/* Honeypot Bot Trap */}
          <input
            type="text"
            name="website_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Content Field */}
          <div className="form-field-item">
            <label className="form-field-label">
              留言内容 <span className="req-star">*</span>
            </label>
            <textarea
              className="form-textarea-input"
              placeholder="对本案例的技术架构、视觉设计、实测调校有何看法？欢迎留言交流..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
              rows={3}
              required
            />
          </div>

          {/* Feedback Alert */}
          {feedback && (
            <div className={`comment-alert-box ${feedback.type}`}>
              {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="form-bottom-actions">
            <span className="form-security-note">
              <Lock size={13} />
              <span>邮箱地址严格保密，仅用于接收邮件提醒</span>
            </span>

            <button 
              type="submit" 
              className="btn-publish-comment"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>正在提交...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>发布留言</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Comments Stream */}
        <div className="comments-stream-container">
          {loading && comments.length === 0 ? (
            <div className="comments-status-empty">
              <Loader2 size={24} className="animate-spin empty-status-icon" style={{ margin: '0 auto 10px' }} />
              <p className="empty-status-subtitle">正在获取访客讨论列表...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="comments-status-empty">
              <Sparkles size={30} className="empty-status-icon" />
              <h4 className="empty-status-title">暂无留言</h4>
              <p className="empty-status-subtitle">快来抢沙发，留下你对本案例的第一条精彩见解 ✨</p>
            </div>
          ) : (
            comments.map((item) => {
              const firstChar = (item.author || 'F').slice(0, 1).toUpperCase();
              return (
                <div key={item.id} className="comment-card-item">
                  <div 
                    className="comment-user-avatar" 
                    style={getAvatarBackground(item.author || 'User')}
                  >
                    {firstChar}
                  </div>

                  <div className="comment-card-content">
                    <div className="comment-meta-row">
                      <span className="comment-author-title">{item.author}</span>
                      {item.badge && (
                        <span className="comment-attitude-badge">{item.badge}</span>
                      )}
                      <span className="comment-date-time">
                        {formatRelativeTime(item.created_at)}
                      </span>
                    </div>

                    <p className="comment-text-paragraph">{item.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseComments;
