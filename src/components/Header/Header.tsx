import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig } from '../../config/site';
import { MessageSquare, ArrowRight, Menu, X, ChevronRight } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Brand Logo */}
          <a href="#hero" className="header-brand" onClick={(e) => handleNavClick(e, '#hero')}>
            <img 
              src="./logo.png" 
              alt="FONXT" 
              className="brand-logo-img"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Main Navigation">
            {siteConfig.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
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

      {/* Mobile Drawer using Portal to escape Header's backdrop-filter containing block */}
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
              <img src="./logo.png" alt="FONXT" className="drawer-logo" />
              <button 
                className="btn-close-drawer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="关闭菜单"
              >
                <X size={20} />
              </button>
            </div>

            <div className="drawer-nav">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="drawer-nav-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="drawer-chevron" />
                </a>
              ))}
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
