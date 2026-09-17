import React from 'react';
import { Home, FolderGit2, MessageSquare } from 'lucide-react';
import './PageBanner.css';

interface NotFoundPageProps {
  onOpenContact: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenContact }) => {
  return (
    <div className="not-found-container container">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">抱歉，您访问的页面不存在</h1>
      <p className="not-found-desc">
        您输入的链接可能有误，或者该页面已被重新规划迁移。您可以返回首页或直接浏览精选案例。
      </p>

      <div className="not-found-actions">
        <a href="./index.html" className="btn-not-found-home">
          <Home size={18} />
          <span>返回首页</span>
        </a>

        <a 
          href="./portfolio.html" 
          className="btn-not-found-home" 
          style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', boxShadow: 'none' }}
        >
          <FolderGit2 size={18} />
          <span>查看作品案例</span>
        </a>

        <button 
          className="btn-not-found-home" 
          style={{ background: '#10b981', color: '#fff', border: 'none' }}
          onClick={onOpenContact}
        >
          <MessageSquare size={18} />
          <span>微信联系主理人</span>
        </button>
      </div>
    </div>
  );
};
