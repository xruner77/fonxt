# FONXT 静态架构现代化与工程融合实施任务清单 (Task Tracker)

> 本任务清单由 `/plan` 技能深度故障与风险审核后生成，严格恪守“零负面影响、向后兼容、全链路闭环”原则。

---

## 阶段一：集中式外链中继网关与 SEO 权重防护 (Phase 1) - [x] 已完成

- [x] **Task 1.1: 数据库外链与点击日志表结构初始化与安全加固**
  - **文件**: `public/api/db.php`
  - **核心动作**:
    - 在 `initTables` 中安全幂等新增 `fonxt_redirect_links` 与 `fonxt_redirect_clicks` 表。
    - 添加复合索引 `(slug, created_at)`，预置默认种子 Slug（如 `magic-gemini`, `t1-zoom-helper`, `t1-fix-zip`, `t1-kodi-apk`, `enshan-t1`）。
  - **安全审计要求**: PDO 参数绑定，Slug 字符集正则过滤 `^[a-zA-Z0-9_-]+$`。
  - **验证结果**: 表定义与种子注入脚本编写完成，具备容错机制。

- [x] **Task 1.2: 集中式 302 重定向网关实现与开放重定向防范**
  - **文件**: `public/go/index.php`
  - **核心动作**:
    - 接收 `?slug=` 参数，基于白名单/数据库查询目标 URL。
    - 原子更新 `click_count`，记录访问日志（IP、UA 截断至 255 字符、Referer）。
    - 透传原请求中的 `utm_*` 参数。
    - 携带安全响应头：`Cache-Control: no-cache, no-store, must-revalidate`，`X-Robots-Tag: noindex, nofollow`。
    - 引入 `fastcgi_finish_request()` 架构优化，先下发 302 重定向再异步持久化日志，实现 0ms 客户端体验。
  - **故障回退兜底**: 数据库异常或非法 Slug 时，静默降级重定向至主站首页或 `/portfolio.html`，绝不抛出 500 页面。
  - **验证结果**: 网关文件编写完成，编译时自动复制至 `dist/go/index.php`。

- [x] **Task 1.3: 爬虫隔离与前端外链收敛**
  - **文件**: `public/robots.txt`, `src/config/cases.ts`, `src/components/Portfolio/CaseDetail.tsx`
  - **核心动作**:
    - `robots.txt` 增加 `Disallow: /go/` 与 `Disallow: /api/`，阻隔蜘蛛抓取预算浪费。
    - 将案例详情中的外部下载/体验外链统一补充 `rel="nofollow sponsored noopener"` 属性。
  - **验证结果**: 静态产物 `dist/robots.txt` 规则生效，外链隔离属性已挂载。

---

## 阶段二：案例长文内容 Markdown 解耦驱动 (Phase 2) - [x] 已完成

- [x] **Task 2.1: 轻量 Markdown 渲染器集成与 CSS 命名空间沙箱**
  - **文件**: `package.json`, `src/components/Portfolio/CaseMarkdown.tsx`, `src/components/Portfolio/CaseMarkdown.css`, `src/vite-env.d.ts`
  - **核心动作**:
    - 引入极轻量纯同步解析器（`marked`，体积仅 ~8KB，零外部依赖）。
    - 创建独立的 `CaseMarkdown.tsx` 组件，自动解析标题锚点，支持 `[!TIP]`, `[!WARNING]`, `[!NOTE]` 提示盒、终端代码卡片与对比表格。
    - 所有样式声明严格限定在 `.case-markdown-content` 类选择器作用域内，严禁污染全局。
  - **验证结果**: 组件与样式隔离沙箱创建完毕，TypeScript 类型声明就绪。

- [x] **Task 2.2: 案例数据模型扩展与双模兼容**
  - **文件**: `src/config/cases.ts`, `src/components/Portfolio/CaseDetail.tsx`, `src/content/cases/phicomm-t1-notes.md`
  - **核心动作**:
    - 在 `CaseItem` 中扩充可选字段 `markdownContent?: string`。
    - 原有的 `storyChapters`, `tutorialSteps`, `highlights` 继续完全保留并生效。
    - 当案例含有 `markdownContent` 时，`CaseDetail.tsx` 平滑挂载 Markdown 区域，同时动态抽取各层级 H2/H3 标题，无缝融入右侧浮动 TOC 目录和 ScrollSpy 滚动监听。
    - 建立 `src/content/cases/` 目录，通过 Vite 原生 `?raw` 导入独立的 `.md` 文件，实现长文案例彻底解耦。
  - **验证结果**: 斐讯 T1 案例成功绑定独立的 Markdown 手记文件，浮动 TOC 自动生成各级子标题。

- [x] **Task 2.3: SSG 预渲染流水线验证与 Schema.org 兼容**
  - **文件**: `scripts/prerender.js`, `dist/case/phicomm-t1-hack.html`
  - **核心动作**:
    - 运行 `npm run build`，在 SSR 环境下 Markdown 完整同步渲染入物理静态 HTML。
    - 生成的 HTML 包含完整的文字 DOM，无白屏、无水合不匹配警告。
    - 15 个 HTML 目标文件 100% 构建成功，文件体积从 111.25KB 扩增至 115.39KB，包含完整 Markdown 静态 DOM。
  - **验证结果**: 编译产物验证通过。

---

## 阶段三：自动化冒烟巡检流水线与部署门禁 (Phase 3) - [x] 已完成

- [x] **Task 3.1: 编写全自动化冒烟巡检脚本**
  - **文件**: `scripts/smoke_test.js`
  - **核心动作**:
    - 参数化支持本地或生产域名（默认 `https://fonxt.com`）。
    - 巡检覆盖：
      - 核心专页（`/`, `/services.html`, `/portfolio.html`, `/ai-demo.html`, `/workflow.html`, `/faq.html`）HTTP 200。
      - 独立案例页（`/case/magic-gemini.html`, `/case/phicomm-t1-hack.html`）HTTP 200 与关键 DOM 关键词匹配。
      - 系统文件 `sitemap.xml` (200, 校验 XML 语法), `robots.txt` (200, 校验 Disallow: /go/)。
      - 后端接口 `/api/views.php` (200, JSON success=true), `/go/?slug=magic-gemini` (302 重定向)。
    - 彩色格式化终端输出（绿勾/红叉、耗时、数据包大小）。
  - **验证结果**: 脚本可直接运行，精准识别线上缺失规则。

- [x] **Task 3.2: 深度联动部署流水线**
  - **文件**: `scripts/deploy.js`
  - **核心动作**:
    - 增加远程 `/go` 目录权限设置。
    - 远程服务器解压与文件权限更新完成后，自动触发 `node scripts/smoke_test.js https://fonxt.com`。
    - 冒烟测试全通过方提示部署成功；若出现异常，抛出错误并报警。
  - **验证结果**: `deploy.js` 已成功集成该健康门禁。

---

## 全量功能回归清单 (Regression Checklist)

实施完成后必须通过的现有功能回归测试：
1. [ ] 首页视觉与各功能专页无样式跑偏、无全局字体/间距错位。
2. [ ] 作品案例列表页分类筛选（全部/IP/AI/DEV）与点击跳转正常。
3. [ ] 案例详情页全屏相册/灯箱（Lightbox）点击放大、键盘缩放与切换正常。
4. [ ] 案例详情页终端代码块一键复制按钮正常工作，浮动 TOC 目录随滚动精准高亮。
5. [ ] 斐讯 T1 工具包下载区域各项链接与说明展示正常。
6. [ ] 访客讨论区（评论读取、验证码、提交留言、点赞）与浏览量统计 API 正常。
7. [ ] 联系弹窗（ContactModal）表单验证与邮件发送 API 正常。
8. [ ] 生产环境部署后 `sitemap.xml` 与所有独立 HTML 文件物理路径均可正常访问。
