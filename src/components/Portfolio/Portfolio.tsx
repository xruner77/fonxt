import React, { useState } from 'react';
import { casesData, caseCategories } from '../../config/cases';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Portfolio.css';

interface PortfolioProps {
  onOpenContact: () => void;
  onSelectCase: (caseId: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenContact: _onOpenContact, onSelectCase }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

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
            <span>FEATURED WORKS · 精选案例</span>
          </div>
          <h2 className="section-title">用实际作品，见证专业与创造力</h2>
          <p className="section-subtitle">
            涵盖 IP 角色形象、高端企业官网、微信原生小程序、跨平台移动 App 与企业私有化 AI 知识库系统。
          </p>
        </div>

        {/* Category Filters */}
        <div className="portfolio-filter-container">
          <div className="portfolio-filters" role="tablist" aria-label="案例分类筛选">
            {caseCategories.map((cat) => (
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

        {/* Cases Grid */}
        <div className="cases-grid">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="case-card"
              onClick={() => onSelectCase(item.id)}
            >
              <div className="case-cover-wrap">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="case-cover-img"
                  loading="lazy"
                />
                <span className="case-category-badge">{item.categoryLabel}</span>
              </div>

              <div className="case-card-body">
                <h3 className="case-card-title">{item.title}</h3>
                <p className="case-card-subtitle">{item.subtitle}</p>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
