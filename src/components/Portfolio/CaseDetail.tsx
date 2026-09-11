import React, { useEffect } from 'react';
import { casesData, CaseItem, CaseHighlightItem } from '../../config/cases';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight,
  Calendar,
  Link2,
  Target,
  Users,
  Smartphone,
  LayoutGrid,
  Image as ImageIcon,
  Star,
  MessageSquare,
  Building2
} from 'lucide-react';
import './CaseDetail.css';

interface CaseDetailProps {
  caseId: string;
  onBack: () => void;
  onSelectCase: (caseId: string) => void;
  onOpenContact: () => void;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({
  caseId,
  onBack,
  onSelectCase,
  onOpenContact,
}) => {
  const currentCase = casesData.find((c) => c.id === caseId) || casesData[0];
  const currentIndex = casesData.findIndex((c) => c.id === currentCase.id);

  const prevCase: CaseItem = casesData[(currentIndex - 1 + casesData.length) % casesData.length];
  const nextCase: CaseItem = casesData[(currentIndex + 1) % casesData.length];

  // Dynamic document title update
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const originalTitle = document.title;
      document.title = `${currentCase.title} | FONXT 作品案例`;
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      return () => {
        document.title = originalTitle;
      };
    }
  }, [currentCase]);

  // Accent color glow per category
  const getGlowColor = (cat: string) => {
    switch (cat) {
      case 'ip': return 'rgba(234, 88, 12, 0.12)';
      case 'ai': return 'rgba(124, 58, 237, 0.12)';
      case 'dev': 
      default: return 'rgba(37, 99, 235, 0.12)';
    }
  };

  // Helper for rendering highlight icons
  const renderHighlightIcon = (iconType?: CaseHighlightItem['iconType'], index?: number) => {
    const defaultIcons = [LayoutGrid, ImageIcon, Smartphone, Star];
    const FallbackIcon = defaultIcons[(index || 0) % defaultIcons.length];

    switch (iconType) {
      case 'layout': return <LayoutGrid size={22} />;
      case 'visual': return <ImageIcon size={22} />;
      case 'responsive': return <Smartphone size={22} />;
      case 'brand': return <Star size={22} />;
      default: return <FallbackIcon size={22} />;
    }
  };

  // Fallbacks for data compatibility
  const tags = currentCase.tags || [currentCase.categoryLabel, '商业交付', '全案设计'];
  const projectTime = currentCase.projectTime || `${currentCase.year}.01`;
  const visitUrl = currentCase.visitUrl || '线上交付版本';
  const overviewNarrative = currentCase.overview?.narrative || currentCase.description;
  const overviewTarget = currentCase.overview?.target || currentCase.highlights[0] || '提升品牌曝光，增强用户互动与转化效率。';
  const overviewAudience = currentCase.overview?.audience || `${currentCase.client} 用户、合作伙伴及目标采购群体。`;
  const overviewFormat = currentCase.overview?.format || 'PC 端 + 移动端（全端响应式设计）';

  const highlightsList = currentCase.designHighlights && currentCase.designHighlights.length === 4
    ? currentCase.designHighlights
    : [
        {
          title: '清晰的信息架构',
          desc: currentCase.highlights[0] ? `以简洁视觉层级突出核心重点：${currentCase.highlights[0]}` : '以简洁的视觉层级，突出核心内容与业务主张，提升阅读效率。',
          iconType: 'layout' as const,
        },
        {
          title: '沉浸式视觉体验',
          desc: currentCase.highlights[1] ? `高标准交付品质：${currentCase.highlights[1]}` : '运用高质量设计与微动效元素，营造生动前沿的视觉氛围。',
          iconType: 'visual' as const,
        },
        {
          title: '响应式全端布局',
          desc: currentCase.highlights[2] ? `跨端无缝体验：${currentCase.highlights[2]}` : '深度适配多端设备，保证在不同屏幕尺寸下都有出色的浏览体验。',
          iconType: 'responsive' as const,
        },
        {
          title: '品牌视觉统一规范',
          desc: '延续品牌调性与组件设计语言，强化数字资产的专业识别度与信任感。',
          iconType: 'brand' as const,
        },
      ];

  const pcScreenshot = currentCase.screenshots?.pcImage || currentCase.coverImage;
  const pcLabel = currentCase.screenshots?.pcLabel || 'PC 端页面效果';
  const mobileScreenshots = currentCase.screenshots?.mobileImages || [
    { image: currentCase.coverImage, label: '移动端页面效果（首页）' },
    { image: currentCase.coverImage, label: '移动端页面效果（核心界面）' },
  ];

  return (
    <div 
      className="case-detail-page" 
      style={{ '--detail-glow': getGlowColor(currentCase.category) } as React.CSSProperties}
    >
      {/* =========================================================================
          1. FULL-BLEED 通栏 HERO BANNER (带背景氛围与 3D 双端展台)
         ========================================================================= */}
      <section className="case-hero-fullbleed">
        <div className="hero-ambient-atmosphere" />

        <div className="container">
          {/* Top Navigation & Breadcrumbs */}
          <div className="case-detail-topbar">
            <button 
              className="btn-back-portfolio" 
              onClick={onBack}
              aria-label="返回全部案例"
            >
              <ArrowLeft size={16} />
              <span>返回精选案例列表</span>
            </button>

            <nav className="case-detail-breadcrumb" aria-label="Breadcrumb">
              <button onClick={onBack}>首页</button>
              <ChevronRight size={14} />
              <button onClick={onBack}>作品案例</button>
              <ChevronRight size={14} />
              <span className="breadcrumb-current">{currentCase.title}</span>
            </nav>
          </div>

          <div className="hero-banner-grid">
            <div className="hero-meta-left">
              <span className="hero-eyebrow-tag">PROJECT DETAIL</span>

              <h1 className="hero-project-title">{currentCase.title}</h1>
              
              <p className="hero-project-subtitle">{currentCase.subtitle}</p>

              {/* Pill Tags Row */}
              <div className="hero-pills-row">
                {tags.map((tag, idx) => (
                  <span key={idx} className="hero-pill-badge">{tag}</span>
                ))}
              </div>

              {/* Meta Information Bar */}
              <div className="hero-specs-bar">
                <div className="hero-spec-item">
                  <Calendar size={15} className="spec-icon" />
                  <span className="spec-label">项目时间</span>
                  <span className="spec-val">{projectTime}</span>
                </div>
                <div className="hero-spec-item">
                  <Link2 size={15} className="spec-icon" />
                  <span className="spec-label">访问形式</span>
                  <span className="spec-val">{visitUrl}</span>
                </div>
                <div className="hero-spec-item">
                  <Building2 size={15} className="spec-icon" />
                  <span className="spec-label">客户主体</span>
                  <span className="spec-val">{currentCase.client}</span>
                </div>
              </div>
            </div>

            {/* Hero 3D Stage Right (Desktop Monitor + Mobile Phone On Podium) */}
            <div className="hero-stage-right">
              {/* 3D Circular Podium Glass Surface */}
              <div className="stage-podium-platform">
                <div className="podium-disc podium-disc-back" />
                <div className="podium-disc podium-disc-front" />
              </div>

              {/* Desktop Monitor Mockup */}
              <div className="mockup-monitor">
                <div className="monitor-bezel">
                  <div className="monitor-screen">
                    <img 
                      src={pcScreenshot} 
                      alt={`${currentCase.title} PC展示`}
                      loading="eager"
                    />
                    <div className="monitor-screen-gloss" />
                  </div>
                </div>
                <div className="monitor-stand-neck" />
                <div className="monitor-stand-base" />
              </div>

              {/* Foreground Mobile Phone Mockup */}
              <div className="mockup-phone-floating">
                <div className="phone-chassis">
                  <div className="phone-dynamic-island" />
                  <div className="phone-screen">
                    <img 
                      src={mobileScreenshots[0]?.image || pcScreenshot} 
                      alt={`${currentCase.title} 移动端展示`}
                      loading="eager"
                    />
                    <div className="phone-screen-gloss" />
                  </div>
                  <div className="phone-chin-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BODY CONTENT (自然呼吸排版，无过度嵌套包裹)
         ========================================================================= */}
      <div className="container case-detail-body">
        {/* =========================================================================
            2. SECTION: | 项目概述 PROJECT OVERVIEW
           ========================================================================= */}
        <section className="case-overview-section">
          <div className="section-title-bar">
            <span className="section-bar-accent" />
            <h2 className="section-title-cn">项目概述</h2>
            <span className="section-title-en">PROJECT OVERVIEW</span>
          </div>

          <div className="overview-content-grid">
            {/* Left Column: Direct narrative text (No heavy boxed frame) */}
            <div className="overview-narrative-flow">
              <p>{overviewNarrative}</p>
              
              <div className="overview-tech-pills">
                <span className="tech-label">交付技术栈：</span>
                {currentCase.techStack.map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>

            {/* Right Column: 3 Metric Cards */}
            <div className="overview-metrics-column">
              {/* Item 1: Target */}
              <div className="metric-info-card">
                <div className="metric-icon-bubble bubble-cyan">
                  <Target size={20} />
                </div>
                <div className="metric-info-body">
                  <h3 className="metric-title">项目目标</h3>
                  <p className="metric-desc">{overviewTarget}</p>
                </div>
              </div>

              {/* Item 2: Audience */}
              <div className="metric-info-card">
                <div className="metric-icon-bubble bubble-blue">
                  <Users size={20} />
                </div>
                <div className="metric-info-body">
                  <h3 className="metric-title">服务对象</h3>
                  <p className="metric-desc">{overviewAudience}</p>
                </div>
              </div>

              {/* Item 3: Format */}
              <div className="metric-info-card">
                <div className="metric-icon-bubble bubble-purple">
                  <Smartphone size={20} />
                </div>
                <div className="metric-info-body">
                  <h3 className="metric-title">设计形式</h3>
                  <p className="metric-desc">{overviewFormat}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SECTION: | 设计亮点 DESIGN HIGHLIGHTS
           ========================================================================= */}
        <section className="case-highlights-section">
          <div className="section-title-bar">
            <span className="section-bar-accent" />
            <h2 className="section-title-cn">设计亮点</h2>
            <span className="section-title-en">DESIGN HIGHLIGHTS</span>
          </div>

          <div className="highlights-quad-grid">
            {highlightsList.map((item, index) => (
              <div key={index} className="highlight-quad-card">
                <div className={`quad-icon-box icon-theme-${index % 4}`}>
                  {renderHighlightIcon(item.iconType, index)}
                </div>
                <h3 className="quad-card-title">{item.title}</h3>
                <p className="quad-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. SECTION: | 页面截图 PAGE SCREENSHOTS
           ========================================================================= */}
        <section className="case-screenshots-section">
          <div className="section-title-bar">
            <span className="section-bar-accent" />
            <h2 className="section-title-cn">页面截图</h2>
            <span className="section-title-en">PAGE SCREENSHOTS</span>
          </div>

          <div className="screenshots-showcase-grid">
            {/* Left: PC Desktop Browser Showcase */}
            <div className="pc-screenshot-container">
              <div className="pc-browser-mockup">
                <div className="browser-chrome-bar">
                  <div className="chrome-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <div className="chrome-address">
                    <span>https://fonxt.com/cases/{currentCase.id}</span>
                  </div>
                </div>
                <div className="browser-viewport">
                  <img 
                    src={pcScreenshot} 
                    alt={pcLabel}
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="screenshot-caption">{pcLabel}</p>
            </div>

            {/* Right: Dual Mobile Phones Showcase */}
            <div className="mobile-screenshots-container">
              {mobileScreenshots.slice(0, 2).map((mob, idx) => (
                <div key={idx} className="mobile-screenshot-item">
                  <div className="phone-device-mockup">
                    <div className="phone-device-inner">
                      <div className="phone-island-notch" />
                      <div className="phone-viewport">
                        <img 
                          src={mob.image} 
                          alt={mob.label}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="screenshot-caption">{mob.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. BOTTOM: 转化 Banner 与 上下篇切换
           ========================================================================= */}
        <div className="case-conversion-banner">
          <div className="conversion-left">
            <h3>对类似方案感兴趣？</h3>
            <p>
              无论你是需要设计专属 IP 形象、打造高转化品牌官网，还是私有化部署企业 AI 知识库，我们均提供免费技术方案梳理与工期评估。
            </p>
          </div>

          <div className="conversion-actions">
            <button 
              className="btn-contact-primary"
              onClick={onOpenContact}
            >
              <MessageSquare size={18} />
              <span>微信直接咨询主理人</span>
            </button>
          </div>
        </div>

        {/* Previous & Next Case Pagination */}
        <div className="case-pagination-grid">
          <button 
            className="nav-case-card prev"
            onClick={() => onSelectCase(prevCase.id)}
            aria-label={`上一篇案例: ${prevCase.title}`}
          >
            <div className="nav-arrow-circle">
              <ArrowLeft size={18} />
            </div>
            <div className="nav-case-info">
              <span className="nav-case-sublabel">上一篇案例</span>
              <span className="nav-case-title">{prevCase.title}</span>
            </div>
          </button>

          <button 
            className="nav-case-card next"
            onClick={() => onSelectCase(nextCase.id)}
            aria-label={`下一篇案例: ${nextCase.title}`}
          >
            <div className="nav-case-info">
              <span className="nav-case-sublabel">下一篇案例</span>
              <span className="nav-case-title">{nextCase.title}</span>
            </div>
            <div className="nav-arrow-circle">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;

