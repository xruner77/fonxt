import React from 'react';
import { ServicesBento } from '../components/Services/ServicesBento';
import { Comparison } from '../components/Comparison/Comparison';
import { ChevronRight, Layers, MessageSquare } from 'lucide-react';
import './PageBanner.css';

interface ServicesPageProps {
  onOpenContact: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenContact }) => {
  return (
    <div className="services-page-wrap">
      {/* 独立页面头部与面包屑 */}
      <header className="standalone-page-header">
        <div className="container">
          <nav className="page-breadcrumbs" aria-label="Breadcrumb">
            <a href="./index.html">首页</a>
            <ChevronRight size={14} />
            <span className="page-breadcrumbs-current">服务内容</span>
          </nav>

          <div className="page-header-title-wrap">
            <h1 className="page-header-title">
              <Layers size={28} className="text-primary" />
              <span>全栈数字化服务矩阵</span>
            </h1>
            <p className="page-header-subtitle">
              打通“视觉创意设计 → 复杂工程全端研发 → 私有化 AI 大模型落地”全链路。支持按需模块化采购与交钥匙全案总包交付。
            </p>
          </div>
        </div>
      </header>

      {/* 服务能力 Bento 矩阵 */}
      <ServicesBento onOpenContact={onOpenContact} />

      {/* 超级个体优势对比 */}
      <Comparison />

      {/* 页面底部行动召唤卡片 */}
      <section className="section">
        <div className="container">
          <div className="case-conversion-banner" style={{ marginTop: 0 }}>
            <div className="conversion-left">
              <h3>需要定制数字化解决方案？</h3>
              <p>
                无论您是需要打造高品质 IP 形象、高性能多端应用，还是私有化部署企业级大模型，我们均提供免费工期与技术架构评估。
              </p>
            </div>
            <div className="conversion-actions">
              <button className="btn-contact-primary" onClick={onOpenContact}>
                <MessageSquare size={18} />
                <span>微信直接咨询主理人</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
