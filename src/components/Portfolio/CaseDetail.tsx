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
  Building2,
  Copy,
  Check,
  Terminal,
  Cpu,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Wrench
} from 'lucide-react';
import './CaseDetail.css';

interface CaseDetailProps {
  caseId: string;
  onBack?: () => void;
  onSelectCase?: (caseId: string) => void;
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

  const [activeChapterId, setActiveChapterId] = React.useState<string>(() => {
    return currentCase.storyChapters && currentCase.storyChapters.length > 0
      ? currentCase.storyChapters[0].id
      : '';
  });
  const [copiedSnippet, setCopiedSnippet] = React.useState<string | null>(null);

  const handleCopySnippet = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedSnippet(text);
        setTimeout(() => {
          setCopiedSnippet((prev) => (prev === text ? null : prev));
        }, 2400);
      });
    }
  };

  // Sync active chapter when case changes
  useEffect(() => {
    if (currentCase.storyChapters && currentCase.storyChapters.length > 0) {
      setActiveChapterId(currentCase.storyChapters[0].id);
    }
  }, [currentCase]);

  const activeChapter = currentCase.storyChapters?.find((ch) => ch.id === activeChapterId) || currentCase.storyChapters?.[0];


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
            <a 
              href="../portfolio.html" 
              className="btn-back-portfolio" 
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              aria-label="返回精选案例列表"
            >
              <ArrowLeft size={16} />
              <span>返回精选案例列表</span>
            </a>

            <nav className="case-detail-breadcrumb" aria-label="Breadcrumb">
              <a href="../index.html">首页</a>
              <ChevronRight size={14} />
              <a href="../portfolio.html">作品案例</a>
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
              {overviewNarrative.split('\n\n').map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
              
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
            3.5 OPTIONAL: 硬件规格与芯片流水线矩阵 (HARDWARE ARCHITECTURE)
           ========================================================================= */}
        {currentCase.hardwareSpecs && currentCase.hardwareSpecs.length > 0 && (
          <section className="case-hardware-specs-section">
            <div className="section-title-bar">
              <span className="section-bar-accent" />
              <h2 className="section-title-cn">硬件架构与芯片流水线</h2>
              <span className="section-title-en">HARDWARE ARCHITECTURE</span>
            </div>

            <div className="hardware-specs-grid">
              {currentCase.hardwareSpecs.map((spec, sIdx) => (
                <div key={sIdx} className="hardware-spec-card">
                  <div className="spec-card-top">
                    <Cpu size={18} className="spec-chip-icon" />
                    <span className="spec-card-label">{spec.label}</span>
                  </div>
                  <div className="spec-card-value">{spec.value}</div>
                  <div className="spec-card-desc">{spec.desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            3.6 OPTIONAL: 极客侦破录五幕剧 (THE HACKING ODYSSEY)
           ========================================================================= */}
        {currentCase.storyChapters && currentCase.storyChapters.length > 0 && activeChapter && (
          <section className="case-geek-story-section">
            <div className="section-title-bar">
              <span className="section-bar-accent" />
              <h2 className="section-title-cn">硬核破局手记：五幕极客名侦探录</h2>
              <span className="section-title-en">THE HACKING ODYSSEY</span>
            </div>

            {currentCase.storyIntro && (
              <div className="story-intro-banner">
                <Sparkles size={20} className="story-intro-icon" />
                <p>{currentCase.storyIntro}</p>
              </div>
            )}

            {/* Chapter Tabs Navigation */}
            <div className="story-tabs-bar" role="tablist" aria-label="故事章节切换">
              {currentCase.storyChapters.map((ch, cIdx) => (
                <button
                  key={ch.id}
                  role="tab"
                  aria-selected={activeChapter.id === ch.id}
                  className={`story-tab-btn ${activeChapter.id === ch.id ? 'active' : ''}`}
                  onClick={() => setActiveChapterId(ch.id)}
                >
                  <span className="tab-number">ACT 0{cIdx + 1}</span>
                  <span className="tab-label">{ch.badge.split('·')[1]?.trim() || ch.title}</span>
                </button>
              ))}
            </div>

            {/* Active Chapter Showcase Card */}
            <div className="story-chapter-showcase">
              <div className="showcase-header">
                <div className="showcase-badge-row">
                  <span className="chapter-badge">{activeChapter.badge}</span>
                  <span className="chapter-tag-mini">
                    <BookOpen size={13} /> 逆向现场解密
                  </span>
                </div>
                <h3 className="chapter-showcase-title">{activeChapter.title}</h3>
                <p className="chapter-showcase-subtitle">{activeChapter.subtitle}</p>
              </div>

              <div className="showcase-body">
                {/* Narrative paragraphs */}
                <div className="chapter-narrative-flow">
                  {activeChapter.narrative.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Key Takeaway Callout */}
                {activeChapter.keyTakeaway && (
                  <div className="chapter-takeaway-callout">
                    <div className="takeaway-badge">
                      <Sparkles size={14} />
                      <span>极客破局心法</span>
                    </div>
                    <p className="takeaway-text">{activeChapter.keyTakeaway}</p>
                  </div>
                )}

                {/* Code Snippet Box with Copy Button */}
                {activeChapter.codeSnippet && (
                  <div className="chapter-terminal-card">
                    <div className="terminal-header">
                      <div className="terminal-dots">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <div className="terminal-lang-badge">
                        <Terminal size={13} />
                        <span>{activeChapter.codeSnippet.lang.toUpperCase()}</span>
                      </div>
                      <button
                        className="btn-copy-terminal"
                        onClick={() => handleCopySnippet(activeChapter.codeSnippet!.code)}
                        aria-label="复制代码"
                      >
                        {copiedSnippet === activeChapter.codeSnippet.code ? (
                          <>
                            <Check size={13} />
                            <span>已复制到剪贴板</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>复制代码</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="terminal-code-body">
                      <code>{activeChapter.codeSnippet.code}</code>
                    </pre>

                    {activeChapter.codeSnippet.note && (
                      <div className="terminal-footer-note">
                        <span># </span>
                        {activeChapter.codeSnippet.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            3.7 OPTIONAL: 保姆级实操教程 (STEP-BY-STEP TUTORIAL)
           ========================================================================= */}
        {currentCase.tutorialSteps && currentCase.tutorialSteps.length > 0 && (
          <section className="case-tutorial-section">
            <div className="section-title-bar">
              <span className="section-bar-accent" />
              <h2 className="section-title-cn">保姆级实操教程：一键固化与影院调校</h2>
              <span className="section-title-en">STEP-BY-STEP TUTORIAL</span>
            </div>

            <p className="tutorial-section-intro">
              无需漫长繁琐的刷机折腾，拿起电脑与手机，按照以下步骤即可完成原厂底层 4K 60Hz 10bit 闪存固化、硬解热修复与自启画质微服务部署。
            </p>

            <div className="tutorial-steps-timeline">
              {currentCase.tutorialSteps.map((step, sIndex) => (
                <div key={sIndex} className="tutorial-step-card">
                  <div className="step-card-header">
                    <div className="step-number-bubble">STEP {step.stepNumber}</div>
                    <h3 className="step-title">{step.title}</h3>
                  </div>

                  <p className="step-description">{step.desc}</p>

                  {step.command && (
                    <div className="step-command-box">
                      <div className="command-header">
                        <span className="command-lang-tag">
                          <Terminal size={12} />
                          {step.commandLang || 'shell'}
                        </span>
                        <button
                          className="btn-copy-command"
                          onClick={() => handleCopySnippet(step.command!)}
                          aria-label="复制此步骤命令"
                        >
                          {copiedSnippet === step.command ? (
                            <>
                              <Check size={12} />
                              <span>已复制</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>一键复制指令</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="command-pre">
                        <code>{step.command}</code>
                      </pre>
                    </div>
                  )}

                  {step.tip && (
                    <div className="step-tip-callout">
                      <Wrench size={15} className="tip-icon" />
                      <div className="tip-content">
                        <strong>极客提示：</strong>
                        {step.tip}
                      </div>
                    </div>
                  )}

                  {step.warning && (
                    <div className="step-warning-callout">
                      <AlertTriangle size={16} className="warning-icon" />
                      <div className="warning-content">
                        <strong>避坑高能预警：</strong>
                        {step.warning}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

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
          <a 
            href={`./${prevCase.id}.html`}
            className="nav-case-card prev"
            onClick={(e) => {
              if (onSelectCase) {
                e.preventDefault();
                onSelectCase(prevCase.id);
              }
            }}
            aria-label={`上一篇案例: ${prevCase.title}`}
          >
            <div className="nav-arrow-circle">
              <ArrowLeft size={18} />
            </div>
            <div className="nav-case-info">
              <span className="nav-case-sublabel">上一篇案例</span>
              <span className="nav-case-title">{prevCase.title}</span>
            </div>
          </a>

          <a 
            href={`./${nextCase.id}.html`}
            className="nav-case-card next"
            onClick={(e) => {
              if (onSelectCase) {
                e.preventDefault();
                onSelectCase(nextCase.id);
              }
            }}
            aria-label={`下一篇案例: ${nextCase.title}`}
          >
            <div className="nav-case-info">
              <span className="nav-case-sublabel">下一篇案例</span>
              <span className="nav-case-title">{nextCase.title}</span>
            </div>
            <div className="nav-arrow-circle">
              <ArrowRight size={18} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;

