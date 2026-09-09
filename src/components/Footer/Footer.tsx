import React from 'react';
import { siteConfig } from '../../config/site';
import { ArrowUp, ArrowRight } from 'lucide-react';
import './Footer.css';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const techArsenal = [
    { name: 'Midjourney v6', category: 'AI Visual' },
    { name: 'ComfyUI / SD', category: 'AI Visual' },
    { name: 'DeepSeek / Qwen', category: 'LLM Model' },
    { name: 'Dify & Flowise', category: 'AI Agent' },
    { name: 'LangChain & RAG', category: 'AI Infra' },
    { name: 'React 19 & Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'CSS System' },
    { name: '微信原生小程序', category: 'Mini-App' },
    { name: 'Flutter & React Native', category: 'Mobile App' },
    { name: 'Node.js & Python', category: 'Backend' },
    { name: 'Docker & vLLM', category: 'DevOps' },
  ];

  return (
    <footer className="site-footer">
      {/* 1. Large Brand CTA Ribbon */}
      <div className="footer-cta-banner">
        <div className="container footer-cta-inner">
          <div className="footer-brand-side">
            <img 
              src="/logo.png" 
              alt="FONXT" 
              style={{ height: '40px', width: 'fit-content' }}
            />
            <h2 className="footer-cta-title">
              有想法？<span className="text-gradient">一起聊聊吧！</span>
            </h2>
            <p className="footer-cta-desc">
              无论是品牌 IP 设计、网站/小程序定制，还是企业私有化 AI 知识库与智能客服，我都乐意与你深度探讨。
            </p>
          </div>

          <button className="footer-cta-btn" onClick={onOpenContact}>
            <span>立即加微信交流</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* 2. Tech Arsenal Section */}
      <div className="tech-arsenal-section">
        <div className="container">
          <div className="tech-arsenal-title">
            ✦ MASTER TECH ARSENAL · 工具与技术栈军火库 ✦
          </div>
          <div className="tech-badges-wrap">
            {techArsenal.map((tech) => (
              <span key={tech.name} className="tech-badge">
                <span style={{ color: 'var(--color-cyan)' }}>•</span>
                <span>{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal Bar */}
      <div className="container footer-bottom-bar">
        <div className="footer-bottom-left">
          <strong style={{ color: 'var(--text-primary)' }}>{siteConfig.domain}</strong>
          <span>© {new Date().getFullYear()} FONXT. All rights reserved.</span>
        </div>

        <div style={{ color: 'var(--color-cyan)', fontWeight: '600' }}>
          {siteConfig.tagline} · 让创意更有价值
        </div>

        <div className="footer-bottom-right">
          <button className="btn-back-to-top" onClick={scrollToTop}>
            <span>返回顶部</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};
