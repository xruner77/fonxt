import React, { useMemo } from 'react';
import { marked } from 'marked';
import './CaseMarkdown.css';

export interface MarkdownHeadingItem {
  id: string;
  label: string;
  level: 2 | 3;
  isSub: boolean;
}

/**
 * 辅助函数：从 Markdown 原文中提取 H2 和 H3 标题，用于动态挂载至 CaseDetail 的 TOC 目录与 ScrollSpy
 */
export function extractMarkdownHeadings(content: string): MarkdownHeadingItem[] {
  if (!content) return [];
  const lines = content.split('\n');
  const headings: MarkdownHeadingItem[] = [];

  let idx = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const title = trimmed.replace(/^##\s+/, '').trim();
      const slugId = 'sec-' + (title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '') || `h2-${idx}`);
      headings.push({
        id: slugId,
        label: title,
        level: 2,
        isSub: false,
      });
      idx++;
    } else if (trimmed.startsWith('### ')) {
      const title = trimmed.replace(/^###\s+/, '').trim();
      const slugId = 'sec-' + (title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '') || `h3-${idx}`);
      headings.push({
        id: slugId,
        label: title,
        level: 3,
        isSub: true,
      });
      idx++;
    }
  }

  return headings;
}

interface CaseMarkdownProps {
  content: string;
}

export const CaseMarkdown: React.FC<CaseMarkdownProps> = ({ content }) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    const renderer = new marked.Renderer();

    // 1. 自定义标题渲染，注入带前缀的唯一 id，实现平滑锚点跳转与 ScrollSpy 高亮
    renderer.heading = ({ text, depth }) => {
      const rawText = text.replace(/<[^>]*>/g, '');
      const slugId = 'sec-' + (rawText.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '') || `h-${depth}`);
      return `<h${depth} id="${slugId}" class="md-heading md-heading-${depth}"><span class="md-heading-anchor" aria-hidden="true">#</span>${text}</h${depth}>`;
    };

    // 2. 自定义代码块渲染，继承全站终端高保真卡片规范
    renderer.code = ({ text, lang }) => {
      const safeLang = (lang || 'terminal').toLowerCase();
      // 转义 HTML 实体防止 XSS
      const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return `<div class="md-terminal-card">
        <div class="md-terminal-header">
          <div class="md-terminal-dots">
            <span class="md-dot md-dot-red"></span>
            <span class="md-dot md-dot-yellow"></span>
            <span class="md-dot md-dot-green"></span>
          </div>
          <span class="md-terminal-lang">${safeLang}</span>
        </div>
        <pre class="md-terminal-body"><code class="language-${safeLang}">${escaped}</code></pre>
      </div>`;
    };

    // 3. 增强引用块，支持 [!NOTE], [!TIP], [!WARNING], [!IMPORTANT] 提示盒
    renderer.blockquote = ({ text }) => {
      if (text.includes('[!WARNING]') || text.includes('[!CAUTION]')) {
        const clean = text.replace(/\[!(WARNING|CAUTION)\]/g, '').trim();
        return `<div class="md-callout md-callout-warning"><div class="md-callout-title">⚠️ 注意事项</div><div class="md-callout-content">${clean}</div></div>`;
      }
      if (text.includes('[!TIP]')) {
        const clean = text.replace(/\[!TIP\]/g, '').trim();
        return `<div class="md-callout md-callout-tip"><div class="md-callout-title">💡 实用技巧</div><div class="md-callout-content">${clean}</div></div>`;
      }
      if (text.includes('[!NOTE]') || text.includes('[!IMPORTANT]')) {
        const clean = text.replace(/\[!(NOTE|IMPORTANT)\]/g, '').trim();
        return `<div class="md-callout md-callout-note"><div class="md-callout-title">📌 关键说明</div><div class="md-callout-content">${clean}</div></div>`;
      }
      return `<blockquote class="md-quote">${text}</blockquote>`;
    };

    // 4. 外链自动补充 rel="nofollow sponsored noopener"
    renderer.link = ({ href, title, text }) => {
      const isExternal = href.startsWith('http') || href.startsWith('/go/');
      const relAttr = isExternal ? ' rel="nofollow sponsored noopener" target="_blank"' : '';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${href}" class="md-link"${relAttr}${titleAttr}>${text}</a>`;
    };

    return marked.parse(content, {
      renderer,
      gfm: true,
      breaks: true,
    }) as string;
  }, [content]);

  return (
    <div 
      className="case-markdown-content" 
      dangerouslySetInnerHTML={{ __html: renderedHtml }} 
    />
  );
};
