import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ServicesBento } from './components/Services/ServicesBento';
import { AIDemo } from './components/AIDemo/AIDemo';
import { Portfolio } from './components/Portfolio/Portfolio';
import { CaseDetail } from './components/Portfolio/CaseDetail';
import { Workflow } from './components/Workflow/Workflow';
import { Comparison } from './components/Comparison/Comparison';
import { FAQ } from './components/FAQ/FAQ';
import { Footer } from './components/Footer/Footer';
import { ContactModal } from './components/ContactModal/ContactModal';
import { Toast } from './components/Toast/Toast';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentCaseId, setCurrentCaseId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const match = hash.match(/^#\/case\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    }
    return null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/case\/([a-zA-Z0-9_-]+)/);
      setCurrentCaseId(match ? match[1] : null);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleOpenCase = (caseId: string) => {
    window.location.hash = `#/case/${caseId}`;
    setCurrentCaseId(caseId);
  };

  const handleBackToPortfolio = () => {
    window.location.hash = '#portfolio';
    setCurrentCaseId(null);
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleNavClick = (href: string) => {
    if (currentCaseId) {
      setCurrentCaseId(null);
      window.location.hash = href;
      setTimeout(() => {
        if (href.startsWith('#')) {
          const el = document.querySelector(href);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 60);
    } else {
      if (href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* 顶部导航 */}
      <Header 
        onOpenContact={() => setIsContactOpen(true)} 
        onNavigate={handleNavClick}
      />

      <main>
        {currentCaseId ? (
          /* 作品案例独立详情页 */
          <CaseDetail
            caseId={currentCaseId}
            onBack={handleBackToPortfolio}
            onSelectCase={handleOpenCase}
            onOpenContact={() => setIsContactOpen(true)}
          />
        ) : (
          /* 首页单页内容 */
          <>
            {/* 首屏与多角色切片 */}
            <Hero onOpenContact={() => setIsContactOpen(true)} />

            {/* Bento Grid 服务能力矩阵 */}
            <ServicesBento onOpenContact={() => setIsContactOpen(true)} />

            {/* 现场可交互 AI 业务助手体验区 */}
            <AIDemo onOpenContact={() => setIsContactOpen(true)} />

            {/* 精选案例画廊 */}
            <Portfolio 
              onOpenContact={() => setIsContactOpen(true)} 
              onSelectCase={handleOpenCase}
            />

            {/* 标准化交付流程 */}
            <Workflow />

            {/* 超级个体优势对比 */}
            <Comparison />

            {/* 常见问题解答 */}
            <FAQ />
          </>
        )}
      </main>

      {/* 底部与技术军火库 */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* 全局多渠道联系弹窗 */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onShowToast={showToast}
      />

      {/* 全局反馈 Toast */}
      <Toast message={toastMessage} />
    </>
  );
};

export default App;
