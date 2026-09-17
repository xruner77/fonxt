import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const distHtmlPath = path.resolve(distDir, 'index.html');
const serverEntryPath = path.resolve(__dirname, '../dist-ssr/entry-server.js');
const distSsrDir = path.resolve(__dirname, '../dist-ssr');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function adjustAssetPaths(html, depth) {
  let res = html;

  // 1. Remove crossorigin from stylesheet link so Chrome does not block CSS under file:/// protocol
  res = res.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, '<link rel="stylesheet" href="$1">');

  const prefix = depth === 0 ? './' : depth === 1 ? '../' : '../../';

  // 统一调整静态资源相对路径
  // 针对 logo / 图标
  res = res.replace(/(src|href)="(\.\/|\/)?logo([^"]*)"/g, `$1="${prefix}logo$3"`);

  // 针对 assets
  res = res.replace(/(src|href)="(\.\/|\/)?assets\/([^"]*)"/g, `$1="${prefix}assets/$3"`);

  return res;
}

function injectMeta(html, meta) {
  let res = html;

  if (meta.title) {
    res = res.replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`);
  }

  if (meta.description) {
    res = res.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />`
    );
  }

  if (meta.keywords) {
    res = res.replace(
      /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i,
      `<meta name="keywords" content="${meta.keywords.replace(/"/g, '&quot;')}" />`
    );
  }

  if (meta.canonical) {
    res = res.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${meta.canonical}" />`
    );
  }

  if (meta.title) {
    res = res.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${meta.title.replace(/"/g, '&quot;')}" />`
    );
    res = res.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${meta.title.replace(/"/g, '&quot;')}" />`
    );
  }

  if (meta.description) {
    res = res.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${meta.description.replace(/"/g, '&quot;')}" />`
    );
    res = res.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${meta.description.replace(/"/g, '&quot;')}" />`
    );
  }

  if (meta.canonical) {
    res = res.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${meta.canonical}" />`
    );
  }

  if (meta.ogImage) {
    res = res.replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:image" content="${meta.ogImage}" />`
    );
    res = res.replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:image" content="${meta.ogImage}" />`
    );
  }

  return res;
}

async function runPrerender() {
  console.log('🚀 Starting Multi-Page SSG Static Pre-render process...');

  if (!fs.existsSync(distHtmlPath)) {
    throw new Error(`Client build HTML not found at: ${distHtmlPath}. Please run 'vite build' first.`);
  }

  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`SSR bundle not found at: ${serverEntryPath}. Please build SSR bundle first.`);
  }

  const baseTemplate = fs.readFileSync(distHtmlPath, 'utf-8');
  const { render, casesData } = await import(pathToFileURL(serverEntryPath).href);

  // 1. 定义全站核心独立页面配置列表
  const pages = [
    {
      name: '首页',
      route: '/',
      outFile: path.resolve(distDir, 'index.html'),
      depth: 0,
      meta: {
        title: 'FONXT | AI · DESIGN · DEV - 用创意与技术让想法变成现实',
        description: 'FONXT (fonxt.com) - 个人全栈数字化创作者。专注于 AI 绘图、IP 形象设计、高端响应式网站制作、微信小程序开发、移动 App 制作与企业级 AI 应用（智能客服、知识库、工作流与本地私有化部署）一站式落地。',
        canonical: 'https://fonxt.com/',
        ogImage: 'https://fonxt.com/logo.png',
      },
    },
    {
      name: '服务内容专页',
      route: '/services',
      outFile: path.resolve(distDir, 'services.html'),
      depth: 0,
      meta: {
        title: '商业级全栈数字化服务矩阵 | FONXT - AI·Design·Dev',
        description: '打通“视觉创意设计 → 复杂工程全端研发 → 私有化 AI 大模型落地”全链路。支持按需模块化采购与交钥匙全案总包交付。',
        canonical: 'https://fonxt.com/services.html',
        ogImage: 'https://fonxt.com/logo.png',
      },
    },
    {
      name: 'AI 体验专页',
      route: '/ai-demo',
      outFile: path.resolve(distDir, 'ai-demo.html'),
      depth: 0,
      meta: {
        title: '现场可交互 AI 业务助手体验区 | FONXT',
        description: '现场体验基于真实业务知识库调优的大模型交互效果。支持本地私有化算力部署、多轮对话引导、数据安全隔离与企业微信/飞书双向集成。',
        canonical: 'https://fonxt.com/ai-demo.html',
        ogImage: 'https://fonxt.com/logo.png',
      },
    },
    {
      name: '作品案例中心',
      route: '/portfolio',
      outFile: path.resolve(distDir, 'portfolio.html'),
      depth: 0,
      meta: {
        title: '商业精选作品与交付案例库 | FONXT',
        description: '每个案例均来自于真实商业实战交付。涵盖底层嵌入式逆向、AI SaaS 门户、企业级 RAG 知识库、商业 IP 吉祥物、微信原生小程序与跨平台移动 App。',
        canonical: 'https://fonxt.com/portfolio.html',
        ogImage: 'https://fonxt.com/logo.png',
      },
    },
    {
      name: '交付流程专页',
      route: '/workflow',
      outFile: path.resolve(distDir, 'workflow.html'),
      depth: 0,
      meta: {
        title: '标准化交付流程与服务优势保障 | FONXT',
        description: '告别传统外包层层转包顽疾。5步标准化交付流程、源码100%交割、全栈超级个体高效直通。',
        canonical: 'https://fonxt.com/workflow.html',
        ogImage: 'https://fonxt.com/logo.png',
      },
    },
    {
      name: '常见问题专页',
      route: '/faq',
      outFile: path.resolve(distDir, 'faq.html'),
      depth: 0,
      meta: {
        title: '商务合作与常见技术问题解答 | FONXT',
        description: '关于商务流程、排期预估、付款节点、知识产权归属、源码交割标准及售后维保等核心问题的详细解答。',
        canonical: 'https://fonxt.com/faq.html',
        ogImage: 'https://fonxt.com/logo.png',
      },
    },
    {
      name: '404 缺省页',
      route: '/404',
      outFile: path.resolve(distDir, '404.html'),
      depth: 0,
      meta: {
        title: '页面未找到 (404) | FONXT',
        description: '您访问的页面不存在或已被移除，欢迎返回首页或浏览精选案例。',
        canonical: 'https://fonxt.com/404.html',
        ogImage: 'https://fonxt.com/logo.png',
      },
    },
  ];

  // 2. 动态扫描加入所有 7 个案例独立页面
  if (Array.isArray(casesData)) {
    for (const c of casesData) {
      const caseCanonical = `https://fonxt.com/case/${c.id}.html`;
      const caseCover = c.coverImage ? (c.coverImage.startsWith('http') ? c.coverImage : `https://fonxt.com${c.coverImage}`) : 'https://fonxt.com/logo.png';
      
      // 生成 case/${c.id}.html (depth 1)
      pages.push({
        name: `案例: ${c.title}`,
        route: `/case/${c.id}`,
        outFile: path.resolve(distDir, `case/${c.id}.html`),
        depth: 1,
        meta: {
          title: `${c.title} | FONXT 精选案例`,
          description: `${c.subtitle} - ${c.description.replace(/\n+/g, ' ').slice(0, 160)}`,
          keywords: `${(c.tags || []).join(',')},${c.techStack.join(',')},FONXT案例`,
          canonical: caseCanonical,
          ogImage: caseCover,
        },
      });

      // 兼顾目录型访问生成 case/${c.id}/index.html (depth 2)
      pages.push({
        name: `案例目录索引: ${c.title}`,
        route: `/case/${c.id}`,
        outFile: path.resolve(distDir, `case/${c.id}/index.html`),
        depth: 2,
        meta: {
          title: `${c.title} | FONXT 精选案例`,
          description: `${c.subtitle} - ${c.description.replace(/\n+/g, ' ').slice(0, 160)}`,
          keywords: `${(c.tags || []).join(',')},${c.techStack.join(',')},FONXT案例`,
          canonical: caseCanonical,
          ogImage: caseCover,
        },
      });
    }
  }

  console.log(`📑 Total ${pages.length} physical HTML targets to generate.`);

  let totalSizeKb = 0;

  for (const page of pages) {
    // 渲染服务端 DOM
    const appHtml = render(page.route);
    if (!appHtml) {
      throw new Error(`Render output empty for route: ${page.route}`);
    }

    // 注入 DOM
    let finalHtml = baseTemplate.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // 注入页面专有 SEO 元数据
    finalHtml = injectMeta(finalHtml, page.meta);

    // 针对当前页面目录深度调整静态资源相对路径（保证在 file:/// 和各类 Web 服务器均可正常加载）
    finalHtml = adjustAssetPaths(finalHtml, page.depth);

    ensureDir(page.outFile);
    fs.writeFileSync(page.outFile, finalHtml, 'utf-8');

    const fileSizeKb = finalHtml.length / 1024;
    totalSizeKb += fileSizeKb;
    console.log(`  ✓ [${page.depth}级目录] ${path.relative(distDir, page.outFile)} (${fileSizeKb.toFixed(2)} KB)`);
  }

  console.log(`✅ [SSG All Complete] All ${pages.length} HTML files generated successfully.`);
  console.log(`📦 Combined HTML Size: ${totalSizeKb.toFixed(2)} KB`);

  // 3. 自动生成全站 sitemap.xml
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls = [
    { loc: 'https://fonxt.com/', priority: '1.0', changefreq: 'daily' },
    { loc: 'https://fonxt.com/services.html', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://fonxt.com/ai-demo.html', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://fonxt.com/portfolio.html', priority: '0.9', changefreq: 'weekly' },
    { loc: 'https://fonxt.com/workflow.html', priority: '0.8', changefreq: 'monthly' },
    { loc: 'https://fonxt.com/faq.html', priority: '0.8', changefreq: 'monthly' },
  ];

  if (Array.isArray(casesData)) {
    for (const c of casesData) {
      sitemapUrls.push({
        loc: `https://fonxt.com/case/${c.id}.html`,
        priority: '0.8',
        changefreq: 'monthly',
      });
    }
  }

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapUrls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`),
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`🗺️ Updated dist/sitemap.xml with ${sitemapUrls.length} URLs.`);

  // 清理临时 dist-ssr 目录
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up temporary dist-ssr directory.');
  }
}

runPrerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
