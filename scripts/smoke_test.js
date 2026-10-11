/**
 * scripts/smoke_test.js
 * 
 * FONXT 自动化全站健康与可用性冒烟巡检脚本 (Post-Deployment Health Gate)
 * 
 * 用法：
 *   node scripts/smoke_test.js                         # 巡检线上正式环境 https://fonxt.com
 *   node scripts/smoke_test.js http://localhost:4173   # 巡检本地预览环境
 */

import { URL } from 'node:url';

const targetBase = process.argv[2] || 'https://fonxt.com';
const baseUrl = targetBase.replace(/\/+$/, '');

const isLocalStatic = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');

console.log('\n==================================================================');
console.log(`🩺 [Smoke Test] 正在对目标站点执行全站可用性与完整性冒烟巡检...`);
console.log(`🎯 目标基准地址: \x1b[36m${baseUrl}\x1b[0m`);
console.log('==================================================================\n');

// 巡检探测条目定义
const testSuite = [
  // 1. 核心专页
  { name: '官网首页', path: '/', expectStatus: 200, mustContain: '<title>' },
  { name: '服务内容专页', path: '/services.html', expectStatus: 200, mustContain: '数字化服务' },
  { name: '作品案例中心', path: '/portfolio.html', expectStatus: 200, mustContain: '商业实战' },
  { name: 'AI 体验专页', path: '/ai-demo.html', expectStatus: 200, mustContain: 'AI' },
  { name: '交付流程专页', path: '/workflow.html', expectStatus: 200, mustContain: '交付流程' },
  { name: '常见问题专页', path: '/faq.html', expectStatus: 200, mustContain: '常见技术问题' },
  { name: '404 友好缺省页', path: '/404.html', expectStatus: 200, mustContain: '404' },

  // 2. 核心独立案例页（SSG 编译产物）
  { name: '案例: MagicGemini', path: '/case/magic-gemini.html', expectStatus: 200, mustContain: 'MagicGemini' },
  { name: '案例: 斐讯 T1 逆向', path: '/case/phicomm-t1-hack.html', expectStatus: 200, mustContain: '斐讯' },
  { name: '案例目录索引: T1', path: '/case/phicomm-t1-hack/index.html', expectStatus: 200, mustContain: '斐讯' },

  // 3. 搜索引擎系统资源
  { name: '全站索引: sitemap.xml', path: '/sitemap.xml', expectStatus: 200, mustContain: '<urlset' },
  { name: '爬虫协议: robots.txt', path: '/robots.txt', expectStatus: 200, mustContain: 'Disallow: /go/' },
];

// 若非纯本地静态预览服务器（PHP 可用），追加后端动态网关测试
if (!isLocalStatic) {
  testSuite.push(
    { name: '数据接口: views.php', path: '/api/views.php?slug=magic-gemini', expectStatus: 200, isJson: true },
    { name: '外链网关: /go/?slug=magic-gemini', path: '/go/?slug=magic-gemini', expectStatus: 302, allowRedirect: false }
  );
}

async function runTestItem(item) {
  const separator = item.path.includes('?') ? '&' : '?';
  const url = `${baseUrl}${item.path}${separator}_t=${Date.now()}`;
  const startTime = Date.now();

  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: item.allowRedirect === false ? 'manual' : 'follow',
      headers: {
        'User-Agent': 'FONXT-SmokeTest-Runner/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml,application/json,*/*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });

    const duration = Date.now() - startTime;
    const status = res.status;

    // 状态码断言
    if (status !== item.expectStatus) {
      return {
        pass: false,
        name: item.name,
        path: item.path,
        duration,
        error: `状态码不匹配: 期望 ${item.expectStatus}, 实际返回 ${status}`,
      };
    }

    // 针对 302 重定向校验 Location
    if (item.expectStatus === 302) {
      const loc = res.headers.get('location');
      if (!loc || !loc.includes('mg.fonxt.com')) {
        return {
          pass: false,
          name: item.name,
          path: item.path,
          duration,
          error: `重定向目标不符: Location = ${loc}`,
        };
      }
      return { pass: true, name: item.name, path: item.path, duration, note: `-> 302 重定向至 ${loc}` };
    }

    // 针对内容关键词断言
    const text = await res.text();
    if (item.mustContain && !text.includes(item.mustContain)) {
      return {
        pass: false,
        name: item.name,
        path: item.path,
        duration,
        error: `响应体未包含关键指纹: "${item.mustContain}"`,
      };
    }

    if (item.isJson) {
      try {
        const json = JSON.parse(text);
        if (json.success !== true) {
          return { pass: false, name: item.name, path: item.path, duration, error: `JSON 响应中 success != true` };
        }
      } catch (e) {
        return { pass: false, name: item.name, path: item.path, duration, error: `响应非合规 JSON: ${e.message}` };
      }
    }

    return { pass: true, name: item.name, path: item.path, duration, size: (text.length / 1024).toFixed(1) + ' KB' };
  } catch (err) {
    const duration = Date.now() - startTime;
    return {
      pass: false,
      name: item.name,
      path: item.path,
      duration,
      error: `请求异常: ${err.message}`,
    };
  }
}

async function runAll() {
  let passedCount = 0;
  let failedCount = 0;

  for (const item of testSuite) {
    const result = await runTestItem(item);
    if (result.pass) {
      passedCount++;
      const extra = result.size ? `(\x1b[90m${result.size}\x1b[0m)` : result.note ? `(\x1b[33m${result.note}\x1b[0m)` : '';
      console.log(`  \x1b[32m✔ PASS\x1b[0m  [\x1b[36m${result.duration}ms\x1b[0m] ${result.name.padEnd(24)} \x1b[90m${result.path}\x1b[0m ${extra}`);
    } else {
      failedCount++;
      console.log(`  \x1b[31m✖ FAIL\x1b[0m  [\x1b[31m${result.duration}ms\x1b[0m] ${result.name.padEnd(24)} \x1b[31m${result.path}\x1b[0m`);
      console.log(`         \x1b[31m↳ 原因: ${result.error}\x1b[0m`);
    }
  }

  console.log('\n------------------------------------------------------------------');
  if (failedCount === 0) {
    console.log(`\x1b[32m🎉 [Smoke Test Passed] 全站 ${passedCount} 项巡检全部成功通过！站点状态处于健康就绪状态。\x1b[0m`);
    console.log('------------------------------------------------------------------\n');
    process.exit(0);
  } else {
    console.log(`\x1b[31m❌ [Smoke Test Failed] 巡检发现 ${failedCount} 项异常，请检查上述错误定位！\x1b[0m`);
    console.log('------------------------------------------------------------------\n');
    process.exit(1);
  }
}

runAll();
