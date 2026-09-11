export interface CaseHighlightItem {
  title: string;
  desc: string;
  iconType?: 'layout' | 'visual' | 'responsive' | 'brand' | 'speed' | 'ai';
}

export interface CaseOverview {
  narrative?: string;
  target: string;
  audience: string;
  format: string;
}

export interface CaseScreenshotItem {
  image: string;
  label: string;
}

export interface CaseScreenshots {
  pcImage?: string;
  pcLabel?: string;
  mobileImages?: CaseScreenshotItem[];
}

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
  
  // 参考架构扩展字段（可选 + 完整向下兼容）
  tags?: string[];
  projectTime?: string;
  visitUrl?: string;
  overview?: CaseOverview;
  designHighlights?: CaseHighlightItem[];
  screenshots?: CaseScreenshots;
}

export const caseCategories = [
  { id: 'all', label: '全部作品' },
  { id: 'ip', label: '🎨 IP形象与视觉设计' },
  { id: 'dev', label: '💻 网站 / 小程序 / App' },
  { id: 'ai', label: '⚡ AI应用与私有化落地' },
] as const;

export const casesData: CaseItem[] = [
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
    tags: ['网页设计', '品牌官网', '响应式布局', '海外本地化'],
    projectTime: '2026.02',
    visitUrl: '线上官方门户',
    overview: {
      narrative: '本次项目为 NextGen 打造下一代国际化技术门户。围绕品牌科技感、产品矩阵演示、技术规格展示与销售线索获取等核心需求，采用现代极简与玻璃拟态设计语言，兼顾 PC 大屏与移动设备的顺滑交互。通过清晰的信息动线与 60fps 微动效，全面提升海外与国内企业客户的停留时长与转化率。',
      target: '提升国际化品牌科技感，强化销售线索获取，促成 B 端企业大客户签约。',
      audience: '企业技术采购决策者、行业合作伙伴、海外高净值客户。',
      format: 'PC 端 + 移动端（全端响应式设计）',
    },
    designHighlights: [
      {
        title: '清晰的信息架构',
        desc: '以简洁的视觉层级，突出产品核心优势与技术矩阵，提升客户阅读决策效率。',
        iconType: 'layout',
      },
      {
        title: '沉浸式视觉体验',
        desc: '运用微光边缘与动态数据流元素，营造生动、前沿的高端科技企业氛围。',
        iconType: 'visual',
      },
      {
        title: '响应式布局与适配',
        desc: '严谨适配 4K、笔记本、iPad 及各类手机屏幕，保障全设备零裁切体验。',
        iconType: 'responsive',
      },
      {
        title: '品牌视觉高度统一',
        desc: '延续科技蓝与曜石灰的核心调性，确立标准组件库，强化企业专业识别度。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-web.png',
      pcLabel: 'PC 端高保真页面效果',
      mobileImages: [
        { image: '/assets/cases/case-app.png', label: '移动端页面效果（首页）' },
        { image: '/assets/cases/case-mini.png', label: '移动端页面效果（功能列表）' },
      ],
    },
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
    tags: ['AI大模型', '私有知识库', 'RAG系统', '数据安全'],
    projectTime: '2026.01',
    visitUrl: '私有化局域网部署',
    overview: {
      narrative: '针对企业内部数十万字技术规格、法务合同与服务 SOP 文档查询效率低、数据敏感无法使用公有云等痛点，我们为其定制搭建了这套 100% 局域网私有运行的 RAG 知识检索工作流。系统实现秒级多文档聚合检索，精准定位原始段落与页码，为员工提供零数据外泄风险的业务助手。',
      target: '解决海量企业文档查找繁琐难题，实现高精度零幻觉问答，保障商业机密安全。',
      audience: '企业各部门员工、技术研发团队、法务合规审计人员。',
      format: 'Web 管理后台 + 飞书/企微机器人终端',
    },
    designHighlights: [
      {
        title: '双栏结构化交互',
        desc: '左侧多级知识分类树状视图，右侧对话流精准映射出处引用，逻辑层次分明。',
        iconType: 'layout',
      },
      {
        title: '溯源高亮直觉体验',
        desc: '点击 AI 生成答案中的引用角标，即刻平滑跳转并高亮原始 PDF 页面片段。',
        iconType: 'visual',
      },
      {
        title: '多终端无缝协同',
        desc: '支持桌面端浏览器管理后台，并无缝嵌入移动办公软件，随时随地调取知识。',
        iconType: 'responsive',
      },
      {
        title: '企业级安全基调',
        desc: '遵循金融级严谨界面规范，权限分级、水印保护与审计日志状态清晰一目了然。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-ai-rag.png',
      pcLabel: 'PC 端知识检索与溯源大屏',
      mobileImages: [
        { image: '/assets/cases/case-ai-agent.png', label: '移动端对话与线索卡片' },
        { image: '/assets/cases/case-app.png', label: '移动端文档切片管理' },
      ],
    },
  },
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
    tags: ['IP设计', '3D建模', 'AI工作流', '品牌衍生物料'],
    projectTime: '2026.03',
    visitUrl: '数字资产库',
    overview: {
      narrative: '为建立统一且极具亲和力的科技极客形象，项目采用现代 3D 潮玩风格设计吉祥物。结合最前沿的 ComfyUI 特征锁定与 LoRA 训练方案，攻克了传统 3D 建模周期长与 AI 生图角色不一致的技术难关，快速延展出涵盖运营活动、技术文档插画及社群表情包的完整生态。',
      target: '塑造年轻化极客品牌心智，大幅降低品牌多场景物料的延展制作成本。',
      audience: '开发者、创业者、数字产品爱好者及商业合作伙伴。',
      format: '多姿态 3D 资产库 + 矢量物料手册',
    },
    designHighlights: [
      {
        title: '骨骼姿态动态锁定',
        desc: '建立标准三视图与特征参数规范，确保在任何动作与角度下形象高度一致。',
        iconType: 'layout',
      },
      {
        title: '微光与透光材质',
        desc: '模拟磨砂亚克力与微光发光件质感，在深浅色背景上均呈现出众的立体光泽。',
        iconType: 'visual',
      },
      {
        title: '多分辨率自适应',
        desc: '提供 4K 超高清商用渲染图与极小尺寸下依然清晰的矢量图标级显示支持。',
        iconType: 'responsive',
      },
      {
        title: '统一品牌识别体系',
        desc: '融入品牌核心青蓝与亮紫色谱，使吉祥物成为跨端界面的天然信任锚点。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-ip.png',
      pcLabel: '3D 角色全场景延展渲染图',
      mobileImages: [
        { image: '/assets/cases/case-app.png', label: '移动端表情与交互组件' },
        { image: '/assets/cases/case-mini.png', label: '小程序场景融入示意' },
      ],
    },
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
    tags: ['小程序开发', '智慧零售', '微信支付', '预约系统'],
    projectTime: '2025.11',
    visitUrl: '微信小程序端',
    overview: {
      narrative: '针对传统线下门店核销繁琐、会员沉淀困难的问题，为品牌定制了从商品浏览、分时预约到微信支付一键闭环的原生小程序。通过轻量化架构与原生动画调优，带来媲美 iOS 原生 App 的丝滑手感，有效助力客户实现私域会员翻倍。',
      target: '打通线上预约与线下核销链路，提升到店率与微信私域会员复购。',
      audience: '城市青年消费群体、连锁门店店员及品牌运营者。',
      format: '微信原生小程序（手机移动端专用）',
    },
    designHighlights: [
      {
        title: '极简预约流程',
        desc: '3步完成分时选座与技师挑选，大幅降低用户认知负担与中途流失率。',
        iconType: 'layout',
      },
      {
        title: '轻盈通透视觉风格',
        desc: '大面积留白配合卡片式微悬浮阴影，让商品与服务列表一览无余。',
        iconType: 'visual',
      },
      {
        title: '手势跟手动效',
        desc: '深度优化微信端内滚动与横滑手势，保障千元低端安卓机型 60fps 丝滑运行。',
        iconType: 'responsive',
      },
      {
        title: '连锁品牌统一调性',
        desc: '规范会员卡等级图标与徽章体系，强化忠诚度计划的高级感与尊享感。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-mini.png',
      pcLabel: '管理后台与数据看板预览',
      mobileImages: [
        { image: '/assets/cases/case-mini.png', label: '小程序首页与服务宫格' },
        { image: '/assets/cases/case-app.png', label: '预约选时与会员中心' },
      ],
    },
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
    tags: ['智能客服', '意图识别', '企微自动化', '线索转化'],
    projectTime: '2026.01',
    visitUrl: '多渠道嵌入集成',
    overview: {
      narrative: '针对夜间与周末访客咨询流失严重的行业痛点，构建了这套具备自然语言意图引导能力的智能接待 Agent。机器人不仅能解答复杂产品矩阵参数，更能巧妙引导客户留下微信与电话，并在 1 秒内推送到值班销售手机，真正实现线索全天候无缝转化。',
      target: '实现 7×24 小时无人值守接待，高意向客户自动提取并秒级推送企微。',
      audience: '独立站访客、潜在意向采购客户、企业售前顾问团队。',
      format: '官网浮窗 SDK + 企微应用联动',
    },
    designHighlights: [
      {
        title: '对话引导式交互',
        desc: '根据用户问询动态推荐高频关联问题气泡，降低访客打字门槛。',
        iconType: 'layout',
      },
      {
        title: '拟人化呼吸反馈',
        desc: '思考中动态呼吸微波与打字机流式输出，给访客真实可靠的专家交流感。',
        iconType: 'visual',
      },
      {
        title: '轻量嵌入自适应',
        desc: '移动端下自动切换为全屏抽屉式对话，PC 端为精致右下角悬浮窗。',
        iconType: 'responsive',
      },
      {
        title: '企业微信通知规范',
        desc: '格式化 Markdown 卡片推送，销售在手机上可直接一键添加客户微信。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-ai-agent.png',
      pcLabel: '客服接待与意图分析控制台',
      mobileImages: [
        { image: '/assets/cases/case-ai-agent.png', label: '移动端访客对话界面' },
        { image: '/assets/cases/case-mini.png', label: '企微端销售线索推送卡片' },
      ],
    },
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
    tags: ['移动App', '跨端开发', '暗黑极简', '离线优先'],
    projectTime: '2025.12',
    visitUrl: 'iOS / Android 客户端',
    overview: {
      narrative: '专为数字游民与创作者打造的高效工具应用。采用跨端架构保证双端像素级统一，配合纯粹的暗黑极简设计语言，将灵感记录、番茄专注与任务流无缝打通。即使在飞行模式或弱网环境下，也能顺畅编辑并在联网后自动增量同步。',
      target: '打造极致沉浸的无干扰创作环境，保障全球任何网络环境下的流畅记录。',
      audience: '独立开发者、数字游民、自由职业设计师及内容创作者。',
      format: 'iOS + Android 双端原生级 App',
    },
    designHighlights: [
      {
        title: '沉浸专注无干扰',
        desc: '遵循极简主义层次，关键操作均在拇指热区内完成，最大化书写视野。',
        iconType: 'layout',
      },
      {
        title: '柔和暗黑美学',
        desc: '深色高对比度排版，配合微光色彩点缀，夜间长时间使用眼睛不易疲劳。',
        iconType: 'visual',
      },
      {
        title: '手势驱动交互',
        desc: '右滑归档、下拉新建、双击展开，60fps 弹簧物理引擎让触控无比愉悦。',
        iconType: 'responsive',
      },
      {
        title: '全端图标规范',
        desc: '自研一套定制点阵风与线性图标系，在双端商店均呈现出独特的先锋质感。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/case-app.png',
      pcLabel: '平板横屏与大屏模式展示',
      mobileImages: [
        { image: '/assets/cases/case-app.png', label: '移动端创作与任务主视图' },
        { image: '/assets/cases/case-web.png', label: '多设备云端同步管理' },
      ],
    },
  },
];

