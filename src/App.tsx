import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ServicesBento } from './components/Services/ServicesBento';
import { AIDemo } from './components/AIDemo/AIDemo';
import { Portfolio } from './components/Portfolio/Portfolio';
import { Workflow } from './components/Workflow/Workflow';
import { Comparison } from './components/Comparison/Comparison';
import { FAQ } from './components/FAQ/FAQ';
import { Footer } from './components/Footer/Footer';
import { ContactModal } from './components/ContactModal/ContactModal';
import { Toast } from './components/Toast/Toast';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  return (
    <>
      {/* 顶部导航 */}
      <Header onOpenContact={() => setIsContactOpen(true)} />

      <main>
        {/* 首屏与多角色切片 */}
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* Bento Grid 服务能力矩阵 */}
        <ServicesBento onOpenContact={() => setIsContactOpen(true)} />

        {/* 现场可交互 AI 业务助手体验区 */}
        <AIDemo onOpenContact={() => setIsContactOpen(true)} />

        {/* 精选案例画廊 */}
        <Portfolio onOpenContact={() => setIsContactOpen(true)} />

        {/* 标准化交付流程 */}
        <Workflow />

        {/* 超级个体优势对比 */}
        <Comparison />

        {/* 常见问题解答 */}
        <FAQ />
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
