import React from 'react';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { ChevronRight, FolderGit2, MessageSquare } from 'lucide-react';
import './PageBanner.css';

interface PortfolioPageProps {
  onOpenContact: () => void;
  onSelectCase?: (caseId: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenContact, onSelectCase }) => {
  return (
    <div className="portfolio-page-wrap">
      {/* 独立页面头部与面包屑 */}
      <header className="standalone-page-header">
        <div className="container">
          <nav className="page-breadcrumbs" aria-label="Breadcrumb">
            <a href="./index.html">首页</a>
            <ChevronRight size={14} />
            <span className="page-breadcrumbs-current">作品案例</span>
          </nav>

          <div className="page-header-title-wrap">
            <h1 className="page-header-title">
              <FolderGit2 size={28} className="text-primary" />
              <span>商业精选作品与实战案例库</span>
            </h1>
            <p className="page-header-subtitle">
              每个案例均来自于真实商业实战交付。点击任意卡片即可查看完整的技术架构深度手记、交付源码规范与前后效果对比。
            </p>
          </div>
        </div>
      </header>

      {/* 案例展示画廊 */}
      <Portfolio onOpenContact={onOpenContact} onSelectCase={onSelectCase} />

      {/* 页面底部行动召唤卡片 */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="case-conversion-banner" style={{ marginTop: 0 }}>
            <div className="conversion-left">
              <h3>想了解更多定制落地案例或索取原型？</h3>
              <p>
                部分大型企业私有化项目受 NDA 保密协议限制未能公开展示，您可以直接联系我们获取同类行业案例脱敏演示。
              </p>
            </div>
            <div className="conversion-actions">
              <button className="btn-contact-primary" onClick={onOpenContact}>
                <MessageSquare size={18} />
                <span>微信直接索取案例</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
