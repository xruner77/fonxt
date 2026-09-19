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

  // 针对 downloads
  res = res.replace(/(src|href)="(\.\/|\/)?downloads\/([^"]*)"/g, `$1="${prefix}downloads/$3"`);

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

  if (meta.jsonLd) {
    const jsonLdStr = JSON.stringify(meta.jsonLd, null, 2);
    res = res.replace(
      /<\/head>/i,
      `    <!-- Page Specific Structured Data (JSON-LD) -->\n    <script type="application/ld+json">\n${jsonLdStr}\n    </script>\n  </head>`
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

  // 0. 清理历史案例目录，确保删除的模拟案例不遗留
  const caseDistDir = path.resolve(distDir, 'case');
  if (fs.existsSync(caseDistDir)) {
    fs.rmSync(caseDistDir, { recursive: true, force: true });
  }

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
        keywords: 'FONXT,fonxt.com,个人全栈开发者,AI作图,IP形象设计,高端网站制作,微信小程序开发,跨平台APP制作,企业级AI应用落地,企业私有化知识库,AI智能客服,本地大模型部署,独立开发者',
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
        keywords: '全栈数字化服务,IP形象设计定制,高端企业官网制作,微信小程序定制开发,跨平台App制作,企业大模型落地,RAG企业知识库,AI智能客服,本地私有化部署,全案交钥匙交付',
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
        keywords: 'AI智能客服体验,企业级AI知识库演示,现场大模型交互体验,RAG知识检索增强,本地私有化算力部署,数据安全隔离,企业微信飞书AI集成',
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
        title: '商业实战作品与交付案例库 | FONXT',
        description: '每一个案例均来自于真实商业实战交付。涵盖全模态 AI 生图生视频工作室、商业级微信原生小程序全栈开发与嵌入式 Linux 底层逆向调优实战。',
        keywords: '商业实战案例,数字化交付案例库,MagicGemini,AI生图生视频,文生图4K,图生视频,斐讯T1底层逆向,BBT影楼管理系统,微信小程序开发',
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
        keywords: '数字化交付流程,全栈项目交付标准,敏捷研发流程,源码100%交割,超级个体高效直通,透明阶梯式付款,终身维护保障',
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
        keywords: '全栈开发合作问答,网站小程序外包报价,交付周期预估,源码交割知识产权,服务器运维保障,AI大模型私有化常见问题',
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
        keywords: '404,页面未找到,FONXT',
        canonical: 'https://fonxt.com/404.html',
        ogImage: 'https://fonxt.com/logo.png',
      },
    },
  ];

  // 2. 动态扫描加入所有真实案例独立页面
  if (Array.isArray(casesData)) {
    for (const c of casesData) {
      const caseCanonical = `https://fonxt.com/case/${c.id}.html`;
      const caseCover = c.coverImage ? (c.coverImage.startsWith('http') ? c.coverImage : `https://fonxt.com${c.coverImage}`) : 'https://fonxt.com/logo.png';
      
      // 深度搜索关键词：优先使用专属优化的 seoKeywords，兼顾标签与技术栈
      const caseKeywords = c.seoKeywords && c.seoKeywords.length > 0
        ? c.seoKeywords.join(',')
        : `${(c.tags || []).join(',')},${c.techStack.join(',')},FONXT案例`;

      let caseTitle = `${c.title} | FONXT 精选案例`;
      let caseDesc = `${c.subtitle} - ${c.description.replace(/\n+/g, ' ').slice(0, 160)}`;

      // 针对 magic-gemini 定制高点击搜索标题与摘要
      if (c.id === 'magic-gemini') {
        caseTitle = 'MagicGemini 影视级全模态 AI 创作中枢 | 文生图/图生视频/一键剧本转分镜/3D角度编辑器 | 注册送1000积分 | FONXT 精选案例';
        caseDesc = '打通文生图、图生图、文生视频、图生视频、一键从创意到分镜视频(Auto Studio)、角色一致性三视图、3D空间机位角度编辑器与可视化节点工作流。注册即送1000积分，可做100张无水印4K超清大图及20个1080p高清视频。';
      }

      // 针对 phicomm-t1-hack 定制高点击搜索标题与摘要
      if (c.id === 'phicomm-t1-hack') {
        caseTitle = '斐讯 T1 (S912) 4K 60Hz 10bit 闪存固化与底层逆向实战 | T1ZoomHelper.apk下载 | FONXT 精选案例';
        caseDesc = '深入晶晨S912芯片驱动与Linux内核：攻克明基TK700投影仪EDID 8bit降级、改写U-Boot ENV物理闪存永久锁死4K 60Hz 10bit HDR，551481物理扇区微创热补根治Kodi调参硬解死机，0%算力直通晶晨VPP硬件125%变焦消除2.35:1黑边。附T1ZoomHelper.apk自启微服务免费下载。';
      }

      // 构建针对搜索引擎结构化数据的 JSON-LD
      const caseJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            'headline': c.title,
            'description': caseDesc,
            'url': caseCanonical,
            'image': caseCover,
            'inLanguage': 'zh-CN',
            'datePublished': `${c.year}-01-01`,
            'author': {
              '@type': 'Person',
              'name': 'FONXT'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'FONXT',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://fonxt.com/logo.png'
              }
            },
            'keywords': c.seoKeywords || (c.tags || [])
          }
        ]
      };

      if (c.downloadItem) {
        caseJsonLd['@graph'].push({
          '@type': 'SoftwareApplication',
          'name': c.downloadItem.fileName.replace(/\.apk$/i, ''),
          'operatingSystem': 'Android 7.1+',
          'applicationCategory': 'MultimediaApplication',
          'downloadUrl': `https://fonxt.com${c.downloadItem.downloadUrl}`,
          'softwareVersion': c.downloadItem.version,
          'fileSize': c.downloadItem.fileSize,
          'description': c.downloadItem.description
        });
      }

      if (c.id === 'magic-gemini') {
        caseJsonLd['@graph'].push({
          '@type': 'WebApplication',
          'name': 'MagicGemini AI Storyboard Studio',
          'applicationCategory': 'MultimediaApplication',
          'operatingSystem': 'Web Browser',
          'url': 'https://mg.fonxt.com',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'CNY',
            'description': '注册即送 1000 初始算力积分，可随心制作 100 张无水印 4K 超清大图及 20 个 1080p 视频'
          },
          'description': caseDesc
        });
      }

      // 生成 case/${c.id}.html (depth 1)
      pages.push({
        name: `案例: ${c.title}`,
        route: `/case/${c.id}`,
        outFile: path.resolve(distDir, `case/${c.id}.html`),
        depth: 1,
        meta: {
          title: caseTitle,
          description: caseDesc,
          keywords: caseKeywords,
          canonical: caseCanonical,
          ogImage: caseCover,
          jsonLd: caseJsonLd,
        },
      });

      // 兼顾目录型访问生成 case/${c.id}/index.html (depth 2)
      pages.push({
        name: `案例目录索引: ${c.title}`,
        route: `/case/${c.id}`,
        outFile: path.resolve(distDir, `case/${c.id}/index.html`),
        depth: 2,
        meta: {
          title: caseTitle,
          description: caseDesc,
          keywords: caseKeywords,
          canonical: caseCanonical,
          ogImage: caseCover,
          jsonLd: caseJsonLd,
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
