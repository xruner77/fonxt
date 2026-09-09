import React, { useEffect } from 'react';
import { CaseItem } from '../../config/cases';
import { X, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

interface CaseModalProps {
  item: CaseItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({ item, onClose, onOpenContact }) => {
  useEffect(() => {
    if (!item) return;

    // 锁定 body 滚动
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 监听 ESC 键关闭
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
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div 
      className="case-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-title"
    >
      <div 
        className="case-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="关闭案例详情"
        >
          <X size={20} />
        </button>

        {/* Cover */}
        <img 
          src={item.coverImage} 
          alt={item.title} 
          className="modal-hero-cover"
        />

        {/* Content */}
        <div className="modal-body-content">
          <div className="modal-badge-row">
            <span>{item.categoryLabel}</span>
            <span>·</span>
            <span>{item.year} 年作品</span>
            <span>·</span>
            <span>{item.client}</span>
          </div>

          <h2 id="modal-case-title" className="modal-title">{item.title}</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>{item.subtitle}</p>

          {/* Meta Info */}
          <div className="modal-meta-grid">
            <div>
              <div className="meta-col-label">项目类别</div>
              <div className="meta-col-val">{item.categoryLabel}</div>
            </div>
            <div>
              <div className="meta-col-label">客户主体</div>
              <div className="meta-col-val">{item.client}</div>
            </div>
            <div>
              <div className="meta-col-label">交付周期</div>
              <div className="meta-col-val">约 5~10 工作日</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="modal-section-title">
              <Sparkles size={16} style={{ color: 'var(--color-cyan)' }} />
              <span>方案概述与难点攻破</span>
            </div>
            <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)' }}>{item.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <div className="modal-section-title">
              <CheckCircle size={16} style={{ color: '#10b981' }} />
              <span>核心成效亮点</span>
            </div>
            <ul className="deliverables-list">
              {item.highlights.map((hl, idx) => (
                <li key={idx}>
                  <span style={{ color: '#10b981' }}>✦</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="modal-section-title">技术栈与工具军火库</div>
            <div className="case-tech-tags">
              {item.techStack.map((tech) => (
                <span key={tech} className="tech-tag-mini" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <div className="modal-section-title">最终交付资产包</div>
            <ul className="deliverables-list">
              {item.deliverables.map((deliv, idx) => (
                <li key={idx}>
                  <span style={{ color: 'var(--color-cyan)' }}>✔</span>
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Action */}
          <div className="modal-cta-row">
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              对该方案感兴趣？我们可根据你的业务进行定制微调。
            </span>
            <button 
              className="btn-primary"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
            >
              <span>咨询定制同类方案</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
