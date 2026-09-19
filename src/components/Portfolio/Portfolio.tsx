import React, { useState } from 'react';
import { casesData, caseCategories } from '../../config/cases';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getCaseUrl } from '../../utils/router';
import './Portfolio.css';

interface PortfolioProps {
  onOpenContact?: () => void;
  onSelectCase?: (caseId: string) => void;
  isSubdir?: boolean;
}

export const Portfolio: React.FC<PortfolioProps> = ({ 
  onSelectCase,
  isSubdir = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const availableCategories = caseCategories.filter(
    (cat) => cat.id === 'all' || casesData.some((item) => item.category === cat.id)
  );

  const filteredCases = activeCategory === 'all'
    ? casesData
    : casesData.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} className="eyebrow-icon" />
            <span>FEATURED WORKS · 精选实战案例</span>
          </div>
          <h2 className="section-title">真实交付沉淀，见证硬核技术与商业闭环</h2>
          <p className="section-subtitle">
            涵盖 AI 全模态生图生视频工作室、商业级微信原生数字化系统全栈开发，以及嵌入式 Linux 底层逆向与硬件直通调优。
          </p>
        </div>

        {/* Category Filters (Only show when multiple distinct categories exist) */}
        {availableCategories.length > 2 && (
          <div className="portfolio-filter-container">
            <div className="portfolio-filters" role="tablist" aria-label="案例分类筛选">
              {availableCategories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cases Grid */}
        <div className="cases-grid">
          {filteredCases.map((item) => {
            const caseUrl = getCaseUrl(item.id, isSubdir);
            return (
              <a
                key={item.id}
                href={caseUrl}
                className="case-card"
                onClick={(e) => {
                  if (onSelectCase && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    // 如果传入了自定义路由处理函数，优先平滑跳转
                    // e.preventDefault();
                    // onSelectCase(item.id);
                  }
                }}
              >
                <div className="case-cover-wrap">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="case-cover-img"
                    loading="lazy"
                  />
                  <span className="case-category-badge">{item.categoryLabel}</span>
                  {item.trialOffer && (
                    <span className="case-trial-ribbon">
                      🎁 注册送1000积分
                    </span>
                  )}
                </div>

                <div className="case-card-body">
                  <h3 className="case-card-title">{item.title}</h3>
                  <p className="case-card-subtitle">{item.subtitle}</p>

                  {item.trialOffer && (
                    <div className="case-card-trial-callout">
                      <span className="trial-callout-badge">赠 1000 积分</span>
                      <span className="trial-callout-text">可制 100 张 4K 图 / 20 个高清视频</span>
                    </div>
                  )}

                  <div className="case-tech-tags">
                    {item.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-tag-mini">
                        {tech}
                      </span>
                    ))}
                    {item.techStack.length > 3 && (
                      <span className="tech-tag-mini">+{item.techStack.length - 3}</span>
                    )}
                  </div>

                  <div className="case-card-link">
                    <span>查看案例详情与交付物</span>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
