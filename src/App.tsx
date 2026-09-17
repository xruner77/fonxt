import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ContactModal } from './components/ContactModal/ContactModal';
import { Toast } from './components/Toast/Toast';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AIDemoPage } from './pages/AIDemoPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { FAQPage } from './pages/FAQPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CaseDetail } from './components/Portfolio/CaseDetail';

import { RouteInfo, parseRoute, getInitialClientRoute } from './utils/router';

interface AppProps {
  initialRoute?: string;
}

export const App: React.FC<AppProps> = ({ initialRoute }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 路由状态管理：优先使用传入的 SSR initialRoute，客户端默认取当前 location
  const [currentRoute] = useState<RouteInfo>(() => {
    if (initialRoute) {
      return parseRoute(initialRoute);
    }
    return getInitialClientRoute();
  });

  // 向后兼容处理：旧版 Hash 路由平滑自动重定向到物理 HTML
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const match = hash.match(/^#\/case\/([a-zA-Z0-9_-]+)/);
      if (match) {
        window.location.replace(`./case/${match[1]}.html`);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const renderCurrentPage = () => {
    switch (currentRoute.type) {
      case 'home':
        return <HomePage onOpenContact={() => setIsContactOpen(true)} />;
      case 'services':
        return <ServicesPage onOpenContact={() => setIsContactOpen(true)} />;
      case 'ai-demo':
        return <AIDemoPage onOpenContact={() => setIsContactOpen(true)} />;
      case 'portfolio':
        return <PortfolioPage onOpenContact={() => setIsContactOpen(true)} />;
      case 'workflow':
        return <WorkflowPage onOpenContact={() => setIsContactOpen(true)} />;
      case 'faq':
        return <FAQPage onOpenContact={() => setIsContactOpen(true)} />;
      case 'case':
        return (
          <CaseDetail
            caseId={currentRoute.caseId || 'phicomm-t1-hack'}
            onOpenContact={() => setIsContactOpen(true)}
          />
        );
      case '404':
        return <NotFoundPage onOpenContact={() => setIsContactOpen(true)} />;
      default:
        return <HomePage onOpenContact={() => setIsContactOpen(true)} />;
    }
  };

  return (
    <>
      {/* 顶部导航：自适应当前页面激活状态与相对链接 */}
      <Header 
        onOpenContact={() => setIsContactOpen(true)}
        currentPage={currentRoute.type}
        isSubdir={currentRoute.isSubdir}
      />

      {/* 页面主干 */}
      <main>
        {renderCurrentPage()}
      </main>

      {/* 全局底部 */}
      <Footer 
        onOpenContact={() => setIsContactOpen(true)}
        isSubdir={currentRoute.isSubdir}
      />

      {/* 全局联系弹窗 */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onShowToast={showToast}
        isSubdir={currentRoute.isSubdir}
      />

      {/* 全局反馈 Toast */}
      <Toast message={toastMessage} />
    </>
  );
};

export default App;
