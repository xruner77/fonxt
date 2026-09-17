export type PageType = 
  | 'home'
  | 'services'
  | 'ai-demo'
  | 'portfolio'
  | 'workflow'
  | 'faq'
  | 'case'
  | '404';

export interface RouteInfo {
  type: PageType;
  caseId?: string;
  isSubdir: boolean;
  rawPath: string;
}

/**
 * 规范化并解析 URL 路径或 pathname
 */
export function parseRoute(pathOrUrl: string = '/'): RouteInfo {
  let pathname = pathOrUrl;
  
  // 提取 pathname 部分（去除协议、域名、查询参数与 hash）
  try {
    if (pathname.includes('://')) {
      const u = new URL(pathname);
      pathname = u.pathname;
    } else {
      pathname = pathname.split('?')[0].split('#')[0];
    }
  } catch {
    pathname = pathname.split('?')[0].split('#')[0];
  }

  // 统一转小写并去除多余首尾斜杠
  let clean = pathname.trim();
  // 统一转为 Unix 风格正斜杠（兼容 Windows file:/// 路径）
  clean = clean.replace(/\\/g, '/');

  // 1. 案例页面匹配：/case/xxx.html, /case/xxx/index.html, /case/xxx
  const caseMatch = clean.match(/(?:^|\/)case\/([a-zA-Z0-9_-]+?)(?:\.html|\/index\.html|\/)?$/);
  if (caseMatch) {
    return {
      type: 'case',
      caseId: caseMatch[1],
      isSubdir: true,
      rawPath: clean,
    };
  }

  // 去除可能的前置路径，只取末尾文件名或段落
  const segments = clean.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';

  // 2. 根目录板块页面匹配
  if (lastSegment === '' || lastSegment === 'index.html' || lastSegment === 'index') {
    return { type: 'home', isSubdir: false, rawPath: clean };
  }
  if (lastSegment === 'services.html' || lastSegment === 'services') {
    return { type: 'services', isSubdir: false, rawPath: clean };
  }
  if (lastSegment === 'ai-demo.html' || lastSegment === 'ai-demo') {
    return { type: 'ai-demo', isSubdir: false, rawPath: clean };
  }
  if (lastSegment === 'portfolio.html' || lastSegment === 'portfolio') {
    return { type: 'portfolio', isSubdir: false, rawPath: clean };
  }
  if (lastSegment === 'workflow.html' || lastSegment === 'workflow') {
    return { type: 'workflow', isSubdir: false, rawPath: clean };
  }
  if (lastSegment === 'faq.html' || lastSegment === 'faq') {
    return { type: 'faq', isSubdir: false, rawPath: clean };
  }
  if (lastSegment === '404.html' || lastSegment === '404') {
    return { type: '404', isSubdir: false, rawPath: clean };
  }

  // 默认识别
  return { type: 'home', isSubdir: false, rawPath: clean };
}

/**
 * 获取浏览器当前环境下的初始路由（含旧版 Hash 兼容识别）
 */
export function getInitialClientRoute(): RouteInfo {
  if (typeof window === 'undefined') {
    return { type: 'home', isSubdir: false, rawPath: '/' };
  }

  // 1. 优先解析旧版 Hash 兼容：例如 #/case/phicomm-t1-hack
  const hash = window.location.hash;
  const legacyCaseMatch = hash.match(/^#\/case\/([a-zA-Z0-9_-]+)/);
  if (legacyCaseMatch) {
    return {
      type: 'case',
      caseId: legacyCaseMatch[1],
      isSubdir: false,
      rawPath: window.location.pathname,
    };
  }

  // 2. 解析标准 pathname
  return parseRoute(window.location.pathname);
}

/**
 * 生成安全的相对页面链接
 */
export function getPageUrl(targetPage: PageType, isCurrentSubdir: boolean): string {
  const prefix = isCurrentSubdir ? '../' : './';
  switch (targetPage) {
    case 'home':
      return `${prefix}index.html`;
    case 'services':
      return `${prefix}services.html`;
    case 'ai-demo':
      return `${prefix}ai-demo.html`;
    case 'portfolio':
      return `${prefix}portfolio.html`;
    case 'workflow':
      return `${prefix}workflow.html`;
    case 'faq':
      return `${prefix}faq.html`;
    case '404':
      return `${prefix}404.html`;
    default:
      return `${prefix}index.html`;
  }
}

/**
 * 生成安全的案例页面链接
 */
export function getCaseUrl(caseId: string, isCurrentSubdir: boolean): string {
  if (isCurrentSubdir) {
    return `./${caseId}.html`;
  }
  return `./case/${caseId}.html`;
}

/**
 * 获取静态资源安全相对前缀
 */
export function getAssetPrefix(isCurrentSubdir: boolean): string {
  return isCurrentSubdir ? '../' : './';
}
