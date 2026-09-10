import React, { useState, useEffect } from 'react';
import { personas, Persona } from '../../config/personas';
import { 
  Sparkles, 
  Palette, 
  Code2, 
  Cpu, 
  ArrowRight, 
  Bot, 
  Zap, 
  CheckCircle 
} from 'lucide-react';
import './Hero.css';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [activePersonaId, setActivePersonaId] = useState<Persona['id']>('master');
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const activePersona = personas.find((p) => p.id === activePersonaId) || personas[0];

  // Auto-switch persona every 4 seconds (resets timer when user manually clicks or persona changes)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActivePersonaId((currentId) => {
        const currentIndex = personas.findIndex((p) => p.id === currentId);
        const nextIndex = (currentIndex + 1) % personas.length;
        return personas[nextIndex].id;
      });
      setProgressKey((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, activePersonaId]);

  const handleSelectPersona = (id: Persona['id']) => {
    setActivePersonaId(id);
    setProgressKey((prev) => prev + 1);
  };

  const getPersonaIcon = (id: Persona['id']) => {
    switch (id) {
      case 'master':
        return <Sparkles size={16} />;
      case 'designer':
        return <Palette size={16} />;
      case 'coder':
        return <Code2 size={16} />;
      case 'architect':
        return <Cpu size={16} />;
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background Glows mapped to persona's accent color */}
      <div 
        className="hero-glow-1" 
        style={{ 
          background: `radial-gradient(circle, ${activePersona.accentColor}25 0%, transparent 70%)` 
        }} 
      />
      <div className="hero-glow-2" />

      <div className="container hero-inner">
        {/* Left: Dynamic Content */}
        <div className="hero-content">
          {/* Persona Switcher Tabs */}
          <div 
            className={`persona-switcher ${isPaused ? 'paused' : ''}`} 
            role="tablist" 
            aria-label="切换业务角色分身"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {personas.map((persona) => {
              const isActive = persona.id === activePersonaId;
              return (
                <button
                  key={persona.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`persona-tab ${isActive ? 'active' : ''}`}
                  style={{
                    ['--active-gradient' as string]: persona.gradient,
                  }}
                  onClick={() => handleSelectPersona(persona.id)}
                >
                  {getPersonaIcon(persona.id)}
                  <span>{persona.name.replace('fonxt · ', '')}</span>
                  {isActive && (
                    <span 
                      key={`progress-${persona.id}-${progressKey}`} 
                      className={`persona-tab-progress ${isPaused ? 'paused' : ''}`} 
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Role Eyebrow & Tagline (Unified with Section Eyebrow standard) */}
          <div 
            key={`eyebrow-${activePersona.id}`}
            className="section-eyebrow hero-role-eyebrow" 
            style={{ color: activePersona.accentColor }}
          >
            <span className="eyebrow-icon" style={{ color: activePersona.accentColor }}>
              {getPersonaIcon(activePersona.id)}
            </span>
            <span>{activePersona.badge}</span>
            <span>·</span>
            <span>{activePersona.tagline}</span>
          </div>

          {/* Headline (Dynamically morphs per persona) */}
          <h1 key={`title-${activePersona.id}`} className="hero-title">
            <span className="hero-title-content">
              {activePersona.id === 'designer' && (
                <>
                  商业级 AI 绘图 <br />
                  打造专属辨识度{' '}
                  <span 
                    className="hero-title-highlight"
                    style={{ ['--active-gradient' as string]: activePersona.gradient }}
                  >
                    IP 视觉形象
                  </span>
                </>
              )}
              {activePersona.id === 'coder' && (
                <>
                  精益全端代码工程 <br />
                  打造极速响应{' '}
                  <span 
                    className="hero-title-highlight"
                    style={{ ['--active-gradient' as string]: activePersona.gradient }}
                  >
                    数字产品
                  </span>
                </>
              )}
              {activePersona.id === 'architect' && (
                <>
                  企业私有化大模型 <br />
                  构建自主可控{' '}
                  <span 
                    className="hero-title-highlight"
                    style={{ ['--active-gradient' as string]: activePersona.gradient }}
                  >
                    智能大脑
                  </span>
                </>
              )}
              {activePersona.id === 'master' && (
                <>
                  用创意与工程技术 <br />
                  将想法落地为{' '}
                  <span 
                    className="hero-title-highlight"
                    style={{ ['--active-gradient' as string]: activePersona.gradient }}
                  >
                    商业现实
                  </span>
                </>
              )}
            </span>
          </h1>

          {/* Subtitle Description */}
          <p key={`desc-${activePersona.id}`} className="hero-desc">{activePersona.description}</p>

          {/* Capability Tags */}
          <div key={`tags-${activePersona.id}`} className="hero-tags">
            {activePersona.tags.map((tag) => (
              <span key={tag} className="hero-tag-chip">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hero-ctas">
            <button className="btn-primary" onClick={onOpenContact}>
              <span>预约需求与报价评估</span>
              <ArrowRight size={17} />
            </button>
            <a 
              href="#ai-demo" 
              className="btn-secondary"
              onClick={(e) => handleScrollTo(e, '#ai-demo')}
            >
              <Bot size={17} style={{ color: 'var(--color-cyan)' }} />
              <span>现场试用 AI 助手</span>
            </a>
          </div>

          {/* 3 Core Highlights */}
          <div key={`caps-${activePersona.id}`} className="hero-capabilities">
            {activePersona.capabilities.map((cap) => (
              <div key={cap.title} className="cap-item">
                <div className="cap-title">
                  <span style={{ color: activePersona.accentColor, marginRight: '4px' }}>✦</span>
                  {cap.title}
                </div>
                <div className="cap-desc">{cap.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Visual Stage */}
        <div className="hero-stage">
          <div className="stage-card">
            <img
              key={activePersona.id}
              src={activePersona.avatar}
              alt={activePersona.name}
              className="stage-character-img"
              loading="eager"
            />

            {/* Floating Badges */}
            <div className="floating-badge badge-top-left">
              <Zap size={16} />
              <span>全栈闭环 · 60%提效</span>
            </div>

            <div className="floating-badge badge-bottom-right">
              <CheckCircle size={16} />
              <span>100% 商业源码交付</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
