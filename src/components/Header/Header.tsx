import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig } from '../../config/site';
import { MessageSquare, ArrowRight, Menu, X, ChevronRight } from 'lucide-react';
import { PageType, getPageUrl, getAssetPrefix } from '../../utils/router';
import './Header.css';

interface HeaderProps {
  onOpenContact: () => void;
  currentPage?: PageType;
  isSubdir?: boolean;
}

interface NavConfigItem {
  key: PageType;
  label: string;
}

const NAV_PAGES: NavConfigItem[] = [
  { key: 'home', label: '首页' },
  { key: 'services', label: '服务内容' },
  { key: 'ai-demo', label: 'AI体验' },
  { key: 'portfolio', label: '作品案例' },
  { key: 'workflow', label: '交付流程' },
  { key: 'faq', label: '常见问题' },
];

export const Header: React.FC<HeaderProps> = ({ 
  onOpenContact, 
  currentPage = 'home',
  isSubdir = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const logoSrc = `${getAssetPrefix(isSubdir)}logo.png`;
  const homeHref = getPageUrl('home', isSubdir);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Brand Logo */}
          <a href={homeHref} className="header-brand" aria-label="返回 FONXT 首页">
            <img 
              src={logoSrc} 
              alt="FONXT" 
              className="brand-logo-img"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Main Navigation">
            {NAV_PAGES.map((item) => {
              const href = getPageUrl(item.key, isSubdir);
              const isActive = currentPage === item.key;
              return (
                <a
                  key={item.key}
                  href={href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="header-actions">
            <button 
              className="btn-header-wechat"
              onClick={onOpenContact}
              aria-label="微信咨询"
            >
              <MessageSquare size={16} />
              <span>微信咨询</span>
            </button>
            <button 
              className="btn-header-cta"
              onClick={onOpenContact}
            >
              <span>立即合作</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer using Portal */}
      {typeof document !== 'undefined' && createPortal(
        <div 
          className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <a href={homeHref} onClick={() => setMobileMenuOpen(false)}>
                <img src={logoSrc} alt="FONXT" className="drawer-logo" />
              </a>
              <button 
                className="btn-close-drawer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="关闭菜单"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-nav">
              {NAV_PAGES.map((item) => {
                const href = getPageUrl(item.key, isSubdir);
                const isActive = currentPage === item.key;
                return (
                  <a
                    key={item.key}
                    href={href}
                    className={`drawer-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} className="drawer-chevron" />
                  </a>
                );
              })}
            </div>

            <div className="drawer-actions">
              <button 
                className="btn-header-wechat drawer-action-btn" 
                onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
              >
                <MessageSquare size={16} />
                <span>微信咨询 ({siteConfig.wechatId})</span>
              </button>
              <button 
                className="btn-header-cta drawer-action-btn" 
                onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
              >
                <span>立即合作咨询</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
