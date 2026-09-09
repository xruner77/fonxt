export interface CaseItem {
  id: string;
  title: string;
  category: 'ip' | 'dev' | 'ai';
  categoryLabel: string;
  subtitle: string;
  description: string;
  client: string;
  year: string;
  coverImage: string;
  techStack: string[];
  highlights: string[];
  deliverables: string[];
}

export const caseCategories = [
  { id: 'all', label: '全部作品' },
  { id: 'ip', label: '🎨 IP形象与视觉设计' },
  { id: 'dev', label: '💻 网站 / 小程序 / App' },
  { id: 'ai', label: '⚡ AI应用与私有化落地' },
] as const;

export const casesData: CaseItem[] = [
  {
    id: 'tech-mascot-ip',
    title: 'FONXT 极客智友 3D IP 形象与矩阵延展',
    category: 'ip',
    categoryLabel: 'IP形象设计',
    subtitle: '潮玩极客风 · 3D盲盒质感 · 角色一致性闭环',
    description: '以科技蓝、幻彩紫为品牌主色，专为独立全栈数字工作室打造的标志性吉祥物。通过 ComfyUI 配合多层 ControlNet 与特征锁定工作流，生成了包含敲代码、绘图、架构演算等多套姿态的高一致性商业角色库。',
    client: '自研品牌 IP',
    year: '2026',
    coverImage: '/assets/cases/case-ip.png',
    techStack: ['ComfyUI', 'Midjourney v6', 'Photoshop', 'Blender', 'IP-Adapter'],
    highlights: ['多姿态角色一致性 100%', '4K 高清透明无损输出', '打通表情包及印刷物料规范'],
    deliverables: ['三视图设计规范手册', '8组高频业务表情包', '高精度商用透明图集', '源工程提示词与LoRA文件'],
  },
  {
    id: 'ai-saas-portal',
    title: 'NextGen 科技企业高端官网与响应式落地页',
    category: 'dev',
    categoryLabel: '网站设计制作',
    subtitle: '高转化率设计 · 60fps 动效 · 全端响应式',
    description: '面向海外与国内高净值企业客户的高端数字化官网。采用暗夜玻璃拟态设计语言，搭配动态数据看板与微光边框交互。Lighthouse 性能跑分 98，首屏秒开，转化率提升 45%。',
    client: '某智能硬件科技公司',
    year: '2026',
    coverImage: '/assets/cases/case-web.png',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare Pages'],
    highlights: ['全端断点自适应（移动/iPad/4K屏）', '首屏加载耗时 < 0.6s', 'SEO 友好与 OpenGraph 深度配置'],
    deliverables: ['全套高保真 Figma 设计源文件', '完整前端响应式工程源码', 'CI/CD 自动化部署流水线'],
  },
  {
    id: 'smart-retail-mini',
    title: '智慧零售与预约服务微信原生小程序',
    category: 'dev',
    categoryLabel: '小程序设计制作',
    subtitle: '极致流畅交互 · 微信生态无缝闭环',
    description: '集商品展示、在线预约、积分会员体系与微信支付于一体的高性能小程序。针对微信内置环境进行了深度性能优化，包体轻量，触控反馈顺滑如原生 App。',
    client: '精品生活连锁品牌',
    year: '2025',
    coverImage: '/assets/cases/case-mini.png',
    techStack: ['微信小程序原生开发', 'TypeScript', 'Node.js', '微信支付 API', '云函数'],
    highlights: ['零依赖极速首开', '微信原生组件极致美学改造', '日均万级请求稳定运行'],
    deliverables: ['小程序前端工程源码', '后端接口云函数与数据库脚本', '微信商户号配置与上线指导'],
  },
  {
    id: 'enterprise-rag-kb',
    title: '企业私有化智能知识库与 RAG 问答系统',
    category: 'ai',
    categoryLabel: 'AI企业知识库',
    subtitle: '精准无幻觉 · 局域网离线保密 · 毫秒级语义检索',
    description: '针对企业数十万字产品手册、合同规约与技术文档，构建的高精度私有知识库系统。基于先进的向量检索与重排算法（Reranker），大模型回答精确标注原文出处，彻底杜绝胡言乱语。',
    client: '某精密制造与法务咨询机构',
    year: '2026',
    coverImage: '/assets/cases/case-ai-rag.png',
    techStack: ['Dify', 'DeepSeek-V3 / Qwen', 'ChromaDB', 'Docker', 'Python FastAPI'],
    highlights: ['支持 PDF/Word/Markdown 批量切片清洗', '私有机房单卡 4090 离线稳跑', '问答精准定位原文件页码'],
    deliverables: ['完整 Docker Compose 离线部署包', '数据清洗切片脚本', '企业专属管理后台与操作手册'],
  },
  {
    id: 'ai-customer-service',
    title: '7×24h 智能业务客服机器人与线索分流工作流',
    category: 'ai',
    categoryLabel: '智能客服与工作流',
    subtitle: '多渠道接入 · 意图识别 · 自动转接企微销售',
    description: '部署于独立官网与小程序的智能前台接待。不仅能精准解答产品定价、规格参数，还能自动识别高意向客户，智能提取联系方式并实时推送到销售企微群。接待效率提升 80%，线索转化率翻倍。',
    client: 'B2B 数字化服务商',
    year: '2026',
    coverImage: '/assets/cases/case-ai-agent.png',
    techStack: ['LangChain', 'OpenAI/DeepSeek API', '企业微信 Webhook', 'Redis', 'Vue 3'],
    highlights: ['夜间无人值守 100% 自动响应', '精准意图多轮交互引导', '线索实时同步销售群'],
    deliverables: ['客服悬浮挂件 SDK', '企微机器人打通逻辑', '后台数据分析看板'],
  },
  {
    id: 'cross-platform-app',
    title: '全流程数字内容创作者移动端 App',
    category: 'dev',
    categoryLabel: '移动端 APP 制作',
    subtitle: '双端统一体验 · 现代暗黑极简 UI · 离线缓存',
    description: '专为数字游民与独立创作者打造的任务规划与 AI 灵感记录移动 App。采用统一设计系统，提供极其丝滑的手势操作、本地离线 SQLite 同步与云端备份。',
    client: '数字游民社群',
    year: '2025',
    coverImage: '/assets/cases/case-app.png',
    techStack: ['Flutter / React Native', 'Tailwind', 'Supabase', 'SQLite'],
    highlights: ['iOS 与 Android 双端像素级一致', '复杂手势 60fps 顺滑跟手', '离线数据优先架构'],
    deliverables: ['双端可编译源码', 'App Store / 应用商店上架包', 'UI 设计规范组件库'],
  },
];
