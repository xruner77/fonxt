import React from 'react';
import { FAQ } from '../components/FAQ/FAQ';
import { ChevronRight, HelpCircle, MessageSquare } from 'lucide-react';
import './PageBanner.css';

interface FAQPageProps {
  onOpenContact: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenContact }) => {
  return (
    <div className="faq-page-wrap">
      {/* 独立页面头部与面包屑 */}
      <header className="standalone-page-header">
        <div className="container">
          <nav className="page-breadcrumbs" aria-label="Breadcrumb">
            <a href="./index.html">首页</a>
            <ChevronRight size={14} />
            <span className="page-breadcrumbs-current">常见问题</span>
          </nav>

          <div className="page-header-title-wrap">
            <h1 className="page-header-title">
              <HelpCircle size={28} className="text-primary" />
              <span>商务合作与常见技术问答</span>
            </h1>
            <p className="page-header-subtitle">
              整理了合作中最受关注的商务流程、付款节点、知识产权归属、源码交割与后期质保维护等核心疑问。
            </p>
          </div>
        </div>
      </header>

      {/* 常见问题核心组件 */}
      <FAQ />

      {/* 页面底部行动召唤卡片 */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="case-conversion-banner" style={{ marginTop: 0 }}>
            <div className="conversion-left">
              <h3>还有其他个性化疑问或特殊需求？</h3>
              <p>
                主理人在线即时解答，支持针对复杂业务场景提供定制化技术路线建议。
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
