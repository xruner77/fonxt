import React, { useEffect, useMemo, useState } from 'react';
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
  Wrench,
  Download,
  Sliders,
  ListFilter,
  ShieldCheck
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

  const [activeSectionId, setActiveSectionId] = useState<string>('case-overview');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

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

  // Dynamic TOC navigation items
  const tocItems = useMemo(() => {
    const items: Array<{
      id: string;
      label: string;
      isSub?: boolean;
    }> = [
      { id: 'case-overview', label: '01 项目概述' },
      { id: 'case-highlights', label: '02 核心亮点' },
    ];

    if (currentCase.hardwareSpecs && currentCase.hardwareSpecs.length > 0) {
      items.push({ id: 'case-specs', label: '03 芯片硬件架构' });
    }

    if (currentCase.paramExtraction) {
      items.push({ id: 'case-params-extraction', label: '04 S912 参数提取思路' });
    }

    if (currentCase.storyChapters && currentCase.storyChapters.length > 0) {
      items.push({ id: 'case-story', label: '05 硬核破局五幕纪实' });
      currentCase.storyChapters.forEach((ch, idx) => {
        items.push({
          id: ch.id,
          label: `ACT 0${idx + 1} · ${ch.badge.split('·')[1]?.trim() || ch.title}`,
          isSub: true,
        });
      });
    }

    if (currentCase.downloadItem) {
      items.push({ id: 'case-downloads', label: '06 APK 工具下载与部署' });
    }

    if (currentCase.tutorialSteps && currentCase.tutorialSteps.length > 0) {
      items.push({ id: 'case-tutorial', label: '07 保姆级实操调校教程' });
    }

    items.push({ id: 'case-screenshots', label: '08 界面与终端实测截图' });

    return items;
  }, [currentCase]);

  // Smooth scroll to target section
  const scrollToSection = (id: string) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSectionId(id);
    }
  };

  // ScrollSpy listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerOffset = 180;
      const currentScrollPos = scrollY + headerOffset;

      for (let i = tocItems.length - 1; i >= 0; i--) {
        const item = tocItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (currentScrollPos >= top) {
            setActiveSectionId(item.id);
            return;
          }
        }
      }
      if (tocItems.length > 0) {
        setActiveSectionId(tocItems[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

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
          BODY CONTENT WITH LEFT SIDEBAR NAVIGATION (双栏自适应目录架构)
         ========================================================================= */}
      <div className="container case-detail-body">
        <div className="case-detail-layout">
          {/* =========================================================================
              LEFT STICKY SIDEBAR / TABLE OF CONTENTS
             ========================================================================= */}
          <aside className="case-sidebar-toc" aria-label="文章内容导航目录">
            <div className="sidebar-toc-sticky-box">
              <div className="sidebar-toc-header">
                <div className="toc-title-row">
                  <ListFilter size={15} className="toc-title-icon" />
                  <span className="toc-title">章节导航</span>
                </div>
                <span className="toc-subtitle">NAVIGATION</span>
              </div>

              <nav className="sidebar-toc-nav" aria-label="大纲目录">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`toc-nav-link ${item.isSub ? 'is-sub' : ''} ${activeSectionId === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    <span className="toc-bullet" />
                    <span className="toc-link-text">{item.label}</span>
                  </a>
                ))}
              </nav>

              {currentCase.downloadItem && (
                <div className="sidebar-quick-download">
                  <a
                    href="#case-downloads"
                    className="btn-sidebar-download"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('case-downloads');
                    }}
                  >
                    <Download size={14} />
                    <span>直达 APK 下载</span>
                  </a>
                </div>
              )}

              <div className="sidebar-contact-box">
                <span className="contact-box-tip">影院底层调优技术定制</span>
                <button className="btn-sidebar-contact" onClick={onOpenContact}>
                  <MessageSquare size={13} />
                  <span>咨询项目主理人</span>
                </button>
              </div>
            </div>
          </aside>

          {/* =========================================================================
              RIGHT MAIN ARTICLE STREAM
             ========================================================================= */}
          <main className="case-main-content">
            {/* =========================================================================
                2. SECTION: | 项目概述 PROJECT OVERVIEW
               ========================================================================= */}
            <section id="case-overview" className="case-overview-section">
              <div className="section-title-bar">
                <span className="section-bar-accent" />
                <h2 className="section-title-cn">项目概述</h2>
                <span className="section-title-en">PROJECT OVERVIEW</span>
              </div>

              <div className="overview-content-grid">
                {/* Left Column: Direct narrative text */}
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
            <section id="case-highlights" className="case-highlights-section">
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
              <section id="case-specs" className="case-hardware-specs-section">
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
                3.55 OPTIONAL: 晶晨 S912 底层参数提取思路与硬件图谱 (PARAMETER EXTRACTION)
               ========================================================================= */}
            {currentCase.paramExtraction && (
              <section id="case-params-extraction" className="case-param-extraction-section">
                <div className="section-title-bar">
                  <span className="section-bar-accent" />
                  <h2 className="section-title-cn">晶晨 S912 底层参数提取思路与硬件图谱</h2>
                  <span className="section-title-en">HARDWARE PARAMETER EXTRACTION</span>
                </div>

                <div className="param-extraction-intro-card">
                  <p className="param-intro-text">{currentCase.paramExtraction.intro}</p>
                </div>

                {/* 三大方法论 */}
                <div className="extraction-methodology-grid">
                  {currentCase.paramExtraction.methodology.map((meth, mIdx) => (
                    <div key={mIdx} className="methodology-card">
                      <div className="methodology-badge-row">
                        <span className="methodology-number">0{mIdx + 1}</span>
                        <span className="methodology-technique">{meth.technique}</span>
                      </div>
                      <h3 className="methodology-title">{meth.title}</h3>
                      <p className="methodology-desc">{meth.desc}</p>
                    </div>
                  ))}
                </div>

                {/* 自动化探针 Python 脚本终端 */}
                {currentCase.paramExtraction.probeScriptCode && (
                  <div className="probe-script-box">
                    <div className="terminal-header">
                      <div className="terminal-dots">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <div className="terminal-lang-badge">
                        <Terminal size={13} />
                        <span>{currentCase.paramExtraction.probeScriptCode.lang.toUpperCase()} 探针框架</span>
                      </div>
                      <button
                        className="btn-copy-terminal"
                        onClick={() => handleCopySnippet(currentCase.paramExtraction!.probeScriptCode!.code)}
                        aria-label="复制代码"
                      >
                        {copiedSnippet === currentCase.paramExtraction.probeScriptCode.code ? (
                          <>
                            <Check size={13} />
                            <span>已复制到剪贴板</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>复制探针脚本</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="terminal-code-body">
                      <code>{currentCase.paramExtraction.probeScriptCode.code}</code>
                    </pre>

                    {currentCase.paramExtraction.probeScriptCode.note && (
                      <div className="terminal-footer-note">
                        <span># </span>
                        {currentCase.paramExtraction.probeScriptCode.note}
                      </div>
                    )}
                  </div>
                )}

                {/* 提取出的核心参数注册表 */}
                <div className="key-parameters-showcase">
                  <div className="parameters-showcase-header">
                    <Sliders size={18} className="showcase-icon" />
                    <h3 className="parameters-showcase-title">逆向提取的关键 Sysfs 硬件参数与调校效果</h3>
                  </div>

                  <div className="param-cards-grid">
                    {currentCase.paramExtraction.keyParameters.map((param, pIdx) => (
                      <div key={pIdx} className={`param-item-card param-cat-${param.category}`}>
                        <div className="param-card-header">
                          <span className="param-cat-tag">{param.categoryLabel || param.category.toUpperCase()}</span>
                          <span className="param-name">{param.name}</span>
                        </div>
                        <div className="param-path-code">
                          <code>{param.path}</code>
                        </div>
                        <div className="param-values-row">
                          <span className="param-val-pill default">默认值: {param.defaultValue}</span>
                          <span className="param-val-pill recommend">推荐值: {param.recommendedValue}</span>
                        </div>
                        <p className="param-effect">{param.effect}</p>
                        {param.command && (
                          <div className="param-cmd-row">
                            <span className="cmd-prefix">$</span>
                            <code className="cmd-text">{param.command}</code>
                            <button
                              className="btn-copy-mini"
                              onClick={() => handleCopySnippet(param.command!)}
                              title="复制测试命令"
                            >
                              {copiedSnippet === param.command ? <Check size={12} /> : <Copy size={12} />}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* =========================================================================
                3.6 OPTIONAL: 极客侦破录五幕剧 (THE HACKING ODYSSEY) - 线性平铺展开无折叠
               ========================================================================= */}
            {currentCase.storyChapters && currentCase.storyChapters.length > 0 && (
              <section id="case-story" className="case-geek-story-section">
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

                {/* 章节连续线性平铺渲染（不折叠为Tab，顺畅贯通） */}
                <div className="story-chapters-linear-flow">
                  {currentCase.storyChapters.map((chapter, cIdx) => (
                    <div key={chapter.id} id={chapter.id} className="story-chapter-showcase chapter-linear-card">
                      <div className="showcase-header">
                        <div className="showcase-badge-row">
                          <span className="chapter-act-pill">ACT 0{cIdx + 1}</span>
                          <span className="chapter-badge">{chapter.badge}</span>
                          <span className="chapter-tag-mini">
                            <BookOpen size={13} /> 逆向现场解密
                          </span>
                        </div>
                        <h3 className="chapter-showcase-title">{chapter.title}</h3>
                        <p className="chapter-showcase-subtitle">{chapter.subtitle}</p>
                      </div>

                      <div className="showcase-body">
                        {/* Narrative paragraphs */}
                        <div className="chapter-narrative-flow">
                          {chapter.narrative.map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>

                        {/* Key Takeaway Callout */}
                        {chapter.keyTakeaway && (
                          <div className="chapter-takeaway-callout">
                            <div className="takeaway-badge">
                              <Sparkles size={14} />
                              <span>极客破局心法</span>
                            </div>
                            <p className="takeaway-text">{chapter.keyTakeaway}</p>
                          </div>
                        )}

                        {/* Code Snippet Box with Copy Button */}
                        {chapter.codeSnippet && (
                          <div className="chapter-terminal-card">
                            <div className="terminal-header">
                              <div className="terminal-dots">
                                <span className="dot dot-red" />
                                <span className="dot dot-yellow" />
                                <span className="dot dot-green" />
                              </div>
                              <div className="terminal-lang-badge">
                                <Terminal size={13} />
                                <span>{chapter.codeSnippet.lang.toUpperCase()}</span>
                              </div>
                              <button
                                className="btn-copy-terminal"
                                onClick={() => handleCopySnippet(chapter.codeSnippet!.code)}
                                aria-label="复制代码"
                              >
                                {copiedSnippet === chapter.codeSnippet.code ? (
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
                              <code>{chapter.codeSnippet.code}</code>
                            </pre>

                            {chapter.codeSnippet.note && (
                              <div className="terminal-footer-note">
                                <span># </span>
                                {chapter.codeSnippet.note}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* =========================================================================
                3.65 OPTIONAL: APK 极客工具下载与部署 (APK DOWNLOAD & DEPLOYMENT)
               ========================================================================= */}
            {currentCase.downloadItem && (
              <section id="case-downloads" className="case-download-section">
                <div className="section-title-bar">
                  <span className="section-bar-accent" />
                  <h2 className="section-title-cn">极客自研工具下载：T1ZoomHelper (v3.0)</h2>
                  <span className="section-title-en">TOOL DOWNLOAD & DEPLOYMENT</span>
                </div>

                <div className="download-hero-card">
                  <div className="download-card-glow" />
                  <div className="download-card-body">
                    <div className="download-card-header">
                      <div className="apk-icon-badge">
                        <Smartphone size={32} />
                      </div>
                      <div className="apk-meta-header">
                        <div className="apk-tag-row">
                          <span className="apk-badge-version">{currentCase.downloadItem.version}</span>
                          <span className="apk-badge-size">{currentCase.downloadItem.fileSize}</span>
                          <span className="apk-badge-date">{currentCase.downloadItem.releaseDate}</span>
                        </div>
                        <h3 className="apk-file-name">{currentCase.downloadItem.fileName}</h3>
                        <p className="apk-title-desc">{currentCase.downloadItem.title}</p>
                      </div>
                    </div>

                    <p className="apk-summary-desc">{currentCase.downloadItem.description}</p>

                    <div className="apk-features-list">
                      <h4 className="features-headline">核心功能与黑科技特性：</h4>
                      <ul>
                        {currentCase.downloadItem.features.map((feat, fIdx) => (
                          <li key={fIdx}>
                            <Check size={16} className="feat-check-icon" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 校验和 */}
                    <div className="apk-checksum-box">
                      <div className="checksum-header-row" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#38bdf8', fontSize: '0.78rem', fontWeight: 700 }}>
                        <ShieldCheck size={14} />
                        <span>官方完整性与安全指纹校验</span>
                      </div>
                      <div className="checksum-row">
                        <span className="checksum-label">MD5:</span>
                        <code className="checksum-val">{currentCase.downloadItem.md5}</code>
                      </div>
                      <div className="checksum-row">
                        <span className="checksum-label">SHA256:</span>
                        <code className="checksum-val">{currentCase.downloadItem.sha256}</code>
                      </div>
                    </div>

                    {/* 下载与操作按钮 */}
                    <div className="download-action-buttons">
                      <a
                        href={currentCase.downloadItem.downloadUrl}
                        download={currentCase.downloadItem.fileName}
                        className="btn-download-primary"
                      >
                        <Download size={20} />
                        <span>立即下载 {currentCase.downloadItem.fileName}</span>
                        <span className="btn-size-tag">({currentCase.downloadItem.fileSize})</span>
                      </a>

                      <button
                        className="btn-copy-direct-link"
                        onClick={() => {
                          const fullUrl = typeof window !== 'undefined'
                            ? new URL(currentCase.downloadItem!.downloadUrl, window.location.href).href
                            : currentCase.downloadItem!.downloadUrl;
                          handleCopySnippet(fullUrl);
                        }}
                      >
                        {copiedSnippet && copiedSnippet.includes('T1ZoomHelper.apk') ? (
                          <>
                            <Check size={16} />
                            <span>直链已复制</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span>复制下载直链</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* 常用安装指令 */}
                    {currentCase.downloadItem.installCommands && (
                      <div className="download-quick-commands">
                        <h4 className="commands-headline">ADB 快速安装与拉起命令：</h4>
                        <div className="quick-cmds-grid">
                          {currentCase.downloadItem.installCommands.map((cmdItem, cIdx) => (
                            <div key={cIdx} className="cmd-snippet-item">
                              <div className="cmd-snippet-label">{cmdItem.label}</div>
                              <div className="cmd-snippet-code">
                                <code>{cmdItem.cmd}</code>
                                <button
                                  className="btn-copy-mini"
                                  onClick={() => handleCopySnippet(cmdItem.cmd)}
                                  title="复制命令"
                                >
                                  {copiedSnippet === cmdItem.cmd ? <Check size={13} /> : <Copy size={13} />}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
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
              <section id="case-tutorial" className="case-tutorial-section">
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
            <section id="case-screenshots" className="case-screenshots-section">
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
