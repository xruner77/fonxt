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
  desktopImages?: CaseScreenshotItem[];
  displayMode?: 'mobile' | 'desktop' | 'dual';
}

export interface StoryCodeSnippet {
  lang: string;
  code: string;
  note?: string;
}

export interface StoryChapter {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  summary: string;
  narrative: string[];
  keyTakeaway?: string;
  codeSnippet?: StoryCodeSnippet;
}

export interface TutorialStep {
  stepNumber: string;
  title: string;
  desc: string;
  command?: string;
  commandLang?: string;
  tip?: string;
  warning?: string;
  image?: string;
  imageCaption?: string;
}

export interface HardwareSpecItem {
  label: string;
  value: string;
  desc: string;
}

export interface SysfsParamItem {
  name: string;
  path: string;
  defaultValue?: string;
  recommendedValue?: string;
  category: 'pq' | 'scaler' | 'hdmi' | 'window';
  categoryLabel?: string;
  effect: string;
  command?: string;
}

export interface ParamExtractionInfo {
  intro: string;
  methodology: {
    title: string;
    desc: string;
    technique: string;
  }[];
  keyParameters: SysfsParamItem[];
  probeScriptCode?: StoryCodeSnippet;
}

export interface CaseDownloadItem {
  title: string;
  fileName: string;
  fileSize: string;
  version: string;
  releaseDate: string;
  downloadUrl: string;
  md5: string;
  sha256: string;
  description: string;
  features: string[];
  installCommands: {
    label: string;
    cmd: string;
  }[];
  secondaryDownloadUrl?: string;
  secondaryFileName?: string;
  secondaryFileSize?: string;
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

  // 硬核极客开发案例与实战教程扩展（可选 + 完整向下兼容）
  seoKeywords?: string[];
  storyIntro?: string;
  storyChapters?: StoryChapter[];
  tutorialSteps?: TutorialStep[];
  hardwareSpecs?: HardwareSpecItem[];
  paramExtraction?: ParamExtractionInfo;
  downloadItem?: CaseDownloadItem;
  sidebarContactTip?: string;
  // 商业营销与试用特权扩展（可选）
  trialOffer?: {
    badge: string;
    title: string;
    desc: string;
    linkText?: string;
    linkUrl?: string;
  };
}

export const caseCategories = [
  { id: 'all', label: '全部实战案例' },
  { id: 'ai', label: '🤖 AI 全模态生图与视频' },
  { id: 'dev', label: '💻 商业全栈与底层逆向' },
] as const;

export const casesData: CaseItem[] = [
  {
    id: 'magic-gemini',
    title: 'MagicGemini 影视级全模态 AI 创作中枢：从创意灵感到分镜视频的一站式影视级工作台',
    category: 'ai',
    categoryLabel: 'AI 全模态生图生视频 · 影视预演中枢',
    subtitle: '文生图/图生图 · 文生视频/图生视频 · 剧本转分镜视效预演 · 角色一致性 · 3D 角度编辑器 · 可视化工作流',
    description: '基于 Google Gemini 与 Veo 深度打造的商业化 AI 视效预演工作台（AI Storyboard Studio）。一站式打通“剧本脑暴 → 资产一致性绑定 → 结构化分镜设计 → 首尾帧运镜约束 → 批量视频渲染”全链路影视工业级闭环。独创基于 3D 空间拖拽的相机机位角度编辑器与可视化节点式工作流编排，彻底告别跨工具割裂切换与换脸失真。注册即送 1000 算力积分，可随心创作 100 张无水印 4K 超清大图与 20 个 1080p 电影级高清视频。',
    client: '自研商业化 SaaS 平台 · 独立全栈作品',
    year: '2026',
    sidebarContactTip: 'AI 生图生视频与工作流系统定制',
    coverImage: '/assets/cases/mg/mg-cover.png',
    techStack: [
      'React 19 / Vite / TailwindCSS',
      'Three.js / @react-three/fiber (3D 相机机位控制)',
      'Framer Motion 影视级交互动画',
      'Gemini 1.5 / 2.0 / 3.1 多模态大模型矩阵',
      'Google Veo 3.1 影视级视频生成模型',
      'Node.js / Express / Prisma ORM',
      'BullMQ / Redis 分布式生成任务队列',
      'Sharp 高保真图像处理 & 媒体流式代理缓存',
    ],
    highlights: [
      '零门槛极速上手：注册即送 1000 初始算力积分，可免费制作 100 张无水印 4K 超清大图及 20 个 1080p 电影级高清视频',
      'Auto Studio 一键剧本转分镜：AI 导演助理对话脑暴，自动提取场景、景别、运镜轨迹、台词与音效，一键批量并发渲染分镜视频',
      '全模态创作闭环：无缝覆盖文生图、图生图、文生视频与图生视频，支持首尾帧双关键画面锚定与真实物理运镜约束',
      '3D 空间交互式角度编辑器：鼠标自由拖拽 3D 相机机位，俯仰、偏航与焦距实时同步，告别抽象提示词，批量精准输出多视角连贯图像',
      '资产库角色与环境一致性锁定：为角色生成三视图与材质特写锚定图，全局解耦绑定，彻底解决大模型跨分镜换脸崩坏痛点',
      '可视化节点式工作流流水线：自定义拖拽文本输入、图像生图、视频生成与输出节点，让复杂 AI 创作像流水线一样清晰可控',
    ],
    deliverables: [
      'MagicGemini Web 端全模态创作工作台源码 (React 19 + Three.js + TailwindCSS)',
      'Auto Studio 剧本智能结构化分镜提取与批量预演渲染流水线',
      'Camera Studio 3D 交互式机位角度编辑器与透视空间控制器',
      '分布式异步任务队列微服务 (BullMQ + Redis + Veo 3.1 / Gemini 3.1)',
      '自适应多端响应式架构、媒体本地代理缓存与自动化计费退款中枢',
    ],
    trialOffer: {
      badge: '🎁 新用户注册专属特权',
      title: '注册即送 1000 初始算力积分',
      desc: '零套路免绑卡，可随心制作 100 张无水印 4K 超清大图或 20 个 1080p 电影级高清视频，即开即用体验影视级预演全流程。',
      linkText: '立即前往体验 mg.fonxt.com',
      linkUrl: 'https://mg.fonxt.com',
    },
    tags: [
      'AI文生图',
      'AI生视频',
      '图生视频',
      '分镜预演',
      '工作流编排',
      '3D角度编辑器',
      '角色一致性',
      '注册送1000积分',
    ],
    seoKeywords: [
      'MagicGemini',
      'mg.fonxt.com',
      'AI生图生视频平台',
      '文生图4K无水印',
      '图生视频首尾帧',
      'AI剧本转分镜视频',
      'Auto Studio分镜预演',
      'AI相机机位角度编辑器',
      '3D机位控制器',
      '节点式AI工作流',
      '角色一致性三视图',
      'Google Veo视频生成',
      'Gemini生图',
      '注册送1000积分AI',
    ],
    projectTime: '2026.02',
    visitUrl: 'https://mg.fonxt.com',
    overview: {
      narrative: '在当前主流的 AI 影视与创意制作中，创作者长期受困于两大痛点：一是【工具链割裂】，从剧本写作（ChatGPT）、概念绘图（Midjourney）、视频生成（Runway/Luma）到非编剪辑，创作者需在多款软件之间频繁导入导出，流程极度繁琐耗时；二是【一致性与可控性黑盒】，大模型跨镜头生成极易出现“主角变脸、服装漂移、场景风格割裂”，且仅凭抽象的文字提示词根本无法精准控制摄影机的景别、机位角度与运镜轨迹。\n\n针对影视工业的前期视觉预演（Previz）标准，我们打造了【MagicGemini】全模态 AI 创作中枢。平台以“剧本脑暴 → 资产绑定 → 结构化分镜 → 一致性控制 → 视频生成”为核心闭环：在 Auto Studio 中，AI 导演助理可与创作者共同脑暴剧本并一键提取带景别、运镜、台词与音效的结构化分镜；资产库通过生成角色三视图（FRONT/SIDE/BACK）与材质特写锁定视觉特征向量，彻底杜绝换脸；更开创性地自研了【3D 空间机位角度编辑器 (Camera Studio)】，通过鼠标在 3D 空间拖拽即可精准定义俯仰角与偏航视角，批量生成多机位镜头；并提供【可视化节点式工作流 (Workflow)】，让复杂的全模态流水线清晰可复用。\n\n为了让每位创作者都能零门槛体验影视级预演的魅力，平台特设普惠机制：【新用户注册即赠 1000 初始算力积分】，无套路免绑卡，足以支持创作者随心生成 100 张无水印 4K 超清大图或 20 个 1080p 电影级高清视频，以极致流畅的端到端体验赋能个人创作者与专业影视团队。',
      target: '打通“剧本脑暴-资产锚定-分镜设计-3D机位调控-节点流水线-批量视频渲染”的影视级预演全闭环，攻克大模型换脸失真与跨工具割裂难题。',
      audience: '独立导演与编剧、短视频与广告策划团队、游戏与动画前期概念设计团队、以及高追求的 AI 影视与视效发烧友。',
      format: 'Web 端全模态创作工作台 (PC 桌面级高保真视窗) + 分布式异步高并发生成微服务集群',
    },
    designHighlights: [
      {
        title: '注册即送 1000 算力积分',
        desc: '零门槛极速上手，注册即领 1000 积分，可制 100 张无水印 4K 超清大图及 20 个 1080p 电影级高清视频，体验影视级生成全链路。',
        iconType: 'brand',
      },
      {
        title: 'Auto Studio 一键剧本转分镜',
        desc: 'AI 导演助理对话式剧本脑暴，秒级结构化提取场景、景别、运镜轨迹与台词音效，一键批量并发渲染首尾帧分镜视频。',
        iconType: 'layout',
      },
      {
        title: '3D 空间机位角度编辑器',
        desc: '内置 Three.js 交互式 3D 相机视窗，鼠标自由拖拽机位俯仰与偏航角，告别抽象文字提示词，批量精准输出多视角连贯图像。',
        iconType: 'visual',
      },
      {
        title: '可视化节点流与角色一致性',
        desc: '节点式编排输入、处理与渲染管线；配合角色三视图与材质特写锚定图，全局锁定特征向量，跨镜头绝不换脸。',
        iconType: 'responsive',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/mg/mg-cover.png',
      pcLabel: 'MagicGemini 创作总览仪表盘 · AI 创作成品画廊与敏捷创作中枢',
      displayMode: 'desktop',
      desktopImages: [
        {
          image: '/assets/cases/mg/01-text-to-image.png',
          label: 'AI 创作室 · 文生图与图生图（多模型切换 / 1:1~21:9 多画幅 / 1K~4K 超高清无水印渲染）',
        },
        {
          image: '/assets/cases/mg/02-video-generation.png',
          label: 'AI 创作室 · 文生视频与首尾帧图生视频（Google Veo 3.1 渲染引擎 / 720p~1080p 流畅流式回放）',
        },
        {
          image: '/assets/cases/mg/03-auto-studio-storyboard.png',
          label: 'Auto Studio · 一键从创意到分镜视频（AI 导演助理剧本脑暴 / 场景运镜与台词音效多维解析）',
        },
        {
          image: '/assets/cases/mg/04-character-consistency.png',
          label: '资产库 · 角色一致性锚定管理（三视图 FRONT/SIDE/BACK + 材质与道具特写，杜绝多分镜换脸）',
        },
        {
          image: '/assets/cases/mg/05-storyboard-flow.png',
          label: 'Auto Studio · 智能分镜序列流扩展（连接前后分镜无缝过渡 / 新建场景镜头自由插入）',
        },
        {
          image: '/assets/cases/mg/06-camera-angle-studio.png',
          label: '相机工作室 (角度编辑器) · 3D 空间交互式机位控制（俯仰/偏航/缩放实时联动，批量多视角生成）',
        },
        {
          image: '/assets/cases/mg/07-workflow-canvas.png',
          label: '工作流编排画布 · 可视化节点式 AI 流水线（文本输入-图像生图-视频生成-预设提示词编排）',
        },
      ],
    },
  },
  {
    "id": "phicomm-t1-hack",
    "title": "拯救沉睡神机：斐讯 T1 (S912) 底层逆向与 4K HDR 极客影院固化实战",
    "category": "dev",
    "categoryLabel": "底层逆向与固件调优",
    "subtitle": "物理闪存微创补丁 · 晶晨 VPP 硬件直通 · 环回 ADB 幽灵提权 · 局域网全功能画质中枢",
    "description": "深入 Linux 内核、Android MediaCodec 与晶晨芯片硬件视频管线，攻克特定投影仪开机 EDID 降级、底层沙箱策略遗漏与 2.35:1 宽银幕黑边视窗截断等核心技术难点。免刷机无损打造 4K 60Hz 10bit HDR 满屏极客家庭影院。",
    "client": "极客自研开源项目",
    "year": "2026",
    "sidebarContactTip": "影院底层调优技术定制",
    "coverImage": "/assets/cases/case-embedded-s912.png",
    "techStack": [
      "C / C++",
      "ARM64 汇编 / Capstone",
      "Linux Kernel & eMMC",
      "Ext4 物理块热补丁",
      "MediaCodec / Seccomp",
      "Amlogic VPP 硬件管线",
      "Java Socket ADB 协议",
      "RESTful API / Web UI"
    ],
    "highlights": [
      "开机永久锁死 4K 60Hz 10bit HDR 输出（阻断 BenQ TK700 投影仪 EDID 降级）",
      "物理闪存无损打入 Seccomp 热补丁，根除 MediaCodec 硬件加速沙箱崩溃",
      "0% 算力调用晶晨 VPP 硬件变焦，联动 Kodi 消除 2.35:1 宽银幕黑边",
      "环回本地 ADB 协议获取 UID 2000，免 Root 弹窗与免刷机系统控制"
    ],
    "deliverables": [
      "斐讯 T1 闪存固化与热补丁完整脚本集",
      "T1ZoomHelper.apk (v3.0) 电视端画质自启微服务",
      "PC 批处理工具 set_video_zoom.bat 与 lock_4k60hz_10bit.bat",
      "完整的底层崩溃诊断与物理扇区计算逆向手记"
    ],
    "tags": [
      "底层逆向",
      "Android系统",
      "硬件解码",
      "物理闪存补丁",
      "画质引擎",
      "家庭影院"
    ],
    "seoKeywords": [
      "斐讯T1",
      "斐讯T1 4K 60Hz 10bit",
      "晶晨S912底层参数",
      "明基TK700 8bit降级",
      "Kodi硬解失效卡顿",
      "Kodi调参卡顿",
      "T1ZoomHelper.apk下载",
      "Android底层参数提取",
      "disp_mode 2160p60hz42010bit",
      "晶晨芯片VPP画面缩放",
      "U-Boot环境变量固化",
      "Android沙箱Seccomp热补丁",
      "局域网ADB提权微服务"
    ],
    "projectTime": "2026.03",
    "visitUrl": "局域网微服务 · GitHub 开源",
    "overview": {
      "narrative": "本项目的探索源于一次真实的家庭影院画质升级：笔者手头的【明基 BenQ TK700 4K 投影仪】在送修升级官方 1.02 固件（以支持完整 3D 播放）后，斐讯 T1 盒子的信号输入意外从原本细腻的 10bit 420 强制跌落为泛白发灰的 8bit 444；更棘手的是，由于底层 EDID 异常，系统设置里的【显示】菜单无法正常进入（其他系统功能均正常），根本无法通过遥控器在盒子上改回色彩设置。\n\n既然在电视端无法进入显示设置，我们便通过电脑端网络 ADB 深入后台进行排查调研，深入反编译晶晨显示守护进程，终于找到了掌控自动重协商的关键底层参数（ubootenv.var.is.bestmode 等），一键向 U-Boot ENV 闪存固化 4K 60Hz 10bit，成功修正了这个错误。\n\n初战告捷后，我们发散思维、进一步探索其他有用参数：既然能直接与芯片底层对话，硬件流水线中是否还封印着其他高级影音能力？顺着内核驱动树地毯式探测，我们成功挖掘并实现了视频画面 Zoom 硬件缩放（去黑边）、色彩饱和度、亮度、对比度与晶晨 DNLP 硬件动态去灰等一系列高阶画质调节。\n\n然而在实现这些调节的过程中，我们踩中了底层硬件安全沙箱的致命暗坑——在播放视频动态微调画面参数时，驱动层通信意外触碰到了 Android 7.1 Seccomp 沙箱缺失 sendto 白名单的底层漏洞，导致 MediaCodec 硬解进程被 Linux 内核无情处决，硬件解码瞬间失效，4K 画面退回软解引发严重卡顿与掉帧。为了给只读系统分区中的 Seccomp 沙箱策略补齐缺失的 sendto 允许白名单，我们通过纯数学定位策略文件在 ext4 数据块与 eMMC 物理扇区的绝对落点，打造并精准写入了 859 字节等长无损的微创热补丁，从物理闪存层彻底治愈了调参导致硬解失效与卡顿的魔咒。\n\n最后，为了摆脱“看电影每次都要开电脑连 ADB 敲命令”的繁琐体验，我们独立设计开发了电视端常驻微服务【T1ZoomHelper.apk】：利用 127.0.0.1 本地环回 ADB 协议实现开机 1 秒免密静默自启，同一局域网手机扫码即开 Web 遥控调色盘，并在后台自动与 Kodi 本地 9090 端口双向协同，实现了 0% 算力 125% 满屏无损变焦与随心所欲的画质掌控。",
      "target": "攻克特定显示设备开机 EDID 降级、根除 MediaCodec 沙箱处决与硬解失效问题、释放 2.35:1 宽银幕视野，免刷机打造极致稳定的 4K 60Hz 10bit 极客影院。",
      "audience": "家庭影院与投影玩家、老旧硬件救赎极客、嵌入式 Linux / Android 底层逆向开发者。",
      "format": "底层物理闪存热补丁 + 电视端自启 APK (v3.0) + 手机 Web 遥控中枢"
    },
    "designHighlights": [
      {
        "title": "根治开机色深失忆",
        "desc": "穿透 BenQ TK700 升级 1.02 固件后的 EDID 降级迷局，修改 U-Boot ENV 闪存关闭自动重协商，永久焊死 4K 60Hz 10bit HDR。",
        "iconType": "layout"
      },
      {
        "title": "物理闪存扇区微创热补",
        "desc": "利用数学算法精准定位 ext4 块 327225 与 eMMC 551481 扇区，859 字节无损补丁写入物理存储，根治调参时 MediaCodec 硬解失效与画面严重卡顿。",
        "iconType": "visual"
      },
      {
        "title": "芯片级 VPP 硬件满屏直通",
        "desc": "突破 Android SurfaceView 负坐标视窗截断壁垒，直通晶晨 VPP 硬件后处理器，0% 算力开销消除 2.35:1 宽银幕黑边。",
        "iconType": "responsive"
      },
      {
        "title": "环回 ADB 幽灵提权自启",
        "desc": "利用固件 5555 本地调试端口环回握手免授权获取 UID 2000，开机 1 秒静默自启，打造局域网手机实时画质遥控中枢。",
        "iconType": "brand"
      }
    ],
    "screenshots": {
      "pcImage": "/assets/cases/case-embedded-s912.png",
      "pcLabel": "4K 60Hz 10bit HDR 满屏播放与终端实时状态",
      "mobileImages": [
        {
          "image": "/assets/cases/phicomm-t1-network-control.jpg",
          "label": "斐讯 T1 影音与画质微调控制面板（手机端局域网实测）"
        },
        {
          "image": "/assets/cases/case-embedded-s912.png",
          "label": "晶晨芯片 VPP 硬件直通与无损输出"
        }
      ]
    },
    "hardwareSpecs": [
      {
        "label": "主控芯片",
        "value": "Amlogic S912",
        "desc": "八核 64 位 ARM Cortex-A53 @ 1.5GHz / Mali-T820MP3 GPU"
      },
      {
        "label": "前置系统环境",
        "value": "DB1 官改 Root 固件",
        "desc": "基于 1.6T57 底包，内置 su (密码 31183118)，纯原厂无 Root 不可行"
      },
      {
        "label": "物理闪存介质",
        "value": "16GB eMMC 5.0",
        "desc": "精准定位 ext4 块 327225 / 物理 551481 号 4KB 扇区微创热补"
      },
      {
        "label": "视频硬件管线",
        "value": "Amlogic VPP 协处理器",
        "desc": "0% CPU 占用直通 /sys/class/video/zoom 影院变焦与 DNLP 去灰"
      },
      {
        "label": "实测联动显示设备",
        "value": "明基 BenQ TK700 4K",
        "desc": "专治售后升级 1.02 固件 (完整 3D 版) 后的 EDID 8bit 降级 Bug"
      }
    ],
    "storyIntro": "从 BenQ TK700 升级 1.02 固件后的开机色彩失忆与显示菜单无法进入，到 ADB 逆向闪存固化；从发散思维挖掘芯片级 Zoom 与色彩参数，到踩坑 Seccomp 沙箱白名单并施行物理扇区微创手术；再到最终自研 T1ZoomHelper.apk 打造免电脑自启与手机 Web 调色盘——这是一段真实、跌宕起伏且充满极客浪漫的软硬件底层探索全纪实：",
    "storyChapters": [
      {
        "id": "act-1",
        "badge": "第一幕 · 侦破篇",
        "title": "BenQ TK700 的“开机色彩失忆”与显示菜单异常",
        "subtitle": "升级 1.02 固件后信号跌入 8bit 444 且显示菜单无法进入：如何通过 ADB 深入底层逆向，将 10bit 焊死在物理闪存？",
        "summary": "BenQ TK700 升级官方 1.02 固件后，开机信号被强退为 8bit 444 且电视端设置的显示菜单无法进入。通过网络 ADB 深入后台反编译晶晨 systemcontrol 守护进程，抓出关键开关 is.bestmode，一键将 10bit 色深写入 U-Boot ENV 闪存修正错误。",
        "narrative": [
          "故事始于一场看似平常的家庭影院升级。笔者手头有一台明基 BenQ TK700 4K 投影仪，出厂搭载的 1.01 固件因缺少完整的 3D 播放能力，特意送去明基官方售后升级到了支持完整 3D 的 1.02 固件。然而，升级后接上斐讯 T1 盒子，意外的一幕发生了：信号输入强制从原本细腻的 10bit 420 变成了泛白发灰、色阶断层的 8bit 444！更麻烦的是，由于底层 EDID 握手异常触发了系统逻辑错误，电视端设置里的【显示】菜单无法正常进入（其他系统功能均完全正常），手里拿着遥控器根本无法在系统 UI 里手动把色彩改回去！",
          "既然在盒子上无法打开显示菜单，我们便通过电脑建立网络 ADB 连接，深入 Android 与 Linux 内核后台展开地毯式排查。在基于原厂 1.6T57 底包制作的 DB1 官改固件（内置 su 密码 31183118）环境下，常规通过脚本向 /sys 节点写入参数，断电重启后依然会被系统守护进程无情洗掉，无法根本解决问题。",
          "经过对晶晨核心显示守护进程 /system/bin/systemcontrol 的反编译逆向，我们终于揪出了关键参数：ubootenv.var.is.bestmode！当它为 true 时，系统会盲信 EDID 的自动重协商结果。只要将其置为 false，显示引擎便会彻底关闭自动重协商，无条件读取保存在底层 U-Boot ENV 闪存中的物理参数。借助晶晨特权指令 dumpsys system_control -b set，我们将 4K 60Hz 420 10bit 一劳永逸地写入物理闪存。冷启动断电再开，420,10bit 坚如磐石，开机失忆与设置菜单异常彻底解决！"
        ],
        "keyTakeaway": "不要在应用层的沙滩上修碉堡。找到底层状态机的控制总开关，直接向物理闪存下发既成事实。",
        "codeSnippet": {
          "lang": "bash",
          "code": "dumpsys system_control -b set ubootenv.var.is.bestmode false\ndumpsys system_control -b set ubootenv.var.outputmode 2160p60hz420\ndumpsys system_control -b set ubootenv.var.hdmimode 2160p60hz420\ndumpsys system_control -b set ubootenv.var.colorattribute 420,10bit\ndumpsys system_control -b set ubootenv.var.2160p60hz420_deepcolor 420,10bit",
          "note": "关闭自动重协商，在物理闪存 U-Boot ENV 中永久锁死 4K 60Hz 10-bit"
        }
      },
      {
        "id": "act-2",
        "badge": "第二幕 · 惊魂篇",
        "title": "发散思维探索底层宝藏，却踩入沙箱白名单暗坑",
        "subtitle": "顺藤摸瓜解锁芯片 VPP 画面 Zoom 与色彩亮度对比度调节，为何在动态调参的瞬间硬解会离奇崩溃失效？",
        "summary": "修正 10bit 错误后发散思维，顺藤摸瓜探测出视频画面 Zoom 变焦与亮度、对比度、饱和度及 DNLP 画质参数。但在播放测试动态调参时，意外踩入 Android 7.1 Seccomp 安全沙箱缺失 sendto 白名单的暗坑，硬解进程瞬间被内核处决，导致硬件解码失效、4K 画面严重卡顿。",
        "narrative": [
          "修正了开机 10bit 错误后，我们发散思维：既然通过 ADB 底层指令能直接掌控晶晨 S912 的显示流水线，那么芯片内部是否还沉睡着其他未被官方 UI 暴露的画质潜能？循着 Linux 内核 Sysfs 驱动树（/sys/module/am_vecm、/sys/class/video 等节点），我们展开了地毯式探索，成功找到了控制视频画面 Zoom 硬件等比缩放、色彩饱和度、亮度、对比度、色相以及晶晨 DNLP 硬件动态对比度（智能去灰）的核心参数！",
          "然而，就在我们兴致勃勃地在 Kodi 播放过程中实测这些调参功能时，一场猝不及防的技术灾难降临了：只要在播放电影时动态微调画面变焦或色彩参数，画面瞬间剧烈卡顿掉帧，系统抛出 OMX/mediaserver died，整个 MediaCodec 硬件解码管线轰然雪崩失效，弱小的 CPU 根本无力承受 4K 高码率实时软解，画面如同看幻灯片般严重丢帧卡顿！",
          "带着抓捕真凶的决心，我们翻开了 Linux 内核留下的致命崩溃转储日志——/data/tombstones/tombstone_05。调用栈赫然揭示了真相：signal 31 (SIGSYS), code 1 (SYS_SECCOMP)！原来在动态调参初始化时，驱动层 libOmxVideo.so 会调用 property_set 向系统 init 通信，底层 libc 依赖 sendto 发送本地 UNIX domain socket。然而 Android 7.1 系统安全沙箱配置 mediacodec-seccomp.policy 竟然漏掉了 sendto 的系统调用白名单！Linux 内核当场将其判定为越权入侵，以至高无上的 SIGSYS 信号，瞬间将硬解进程当场处决，导致硬件解码瞬间中断失效！"
        ],
        "keyTakeaway": "极客的探索总是在发散与收敛中交替前行。看似偶发的硬解失效与卡顿背后，往往是内核在严苛履行一条被遗漏了白名单的安全铁律。",
        "codeSnippet": {
          "lang": "text",
          "code": "pid: 4011, name: media.codec\nsignal 31 (SIGSYS), code 1 (SYS_SECCOMP)\n#07 libc.so (sendto+16)\n#09 libc.so (__system_property_set+206)\n#10 libOmxVideo.so (OMX_GetHandle+176)",
          "note": "Linux 内核 Tombstone 崩溃转储：Seccomp 沙箱无情处决硬解进程"
        }
      },
      {
        "id": "act-3",
        "badge": "第三幕 · 手术篇",
        "title": "给物理闪存做“微创心脏手术”——eMMC 扇区热补丁",
        "subtitle": "只读文件系统无法挂载修改？用纯数学穿透 Ext4 文件系统，在 551481 物理扇区精准动刀！",
        "summary": "编写 Python 计算器精准测算目标策略文件在 ext4 数据块 327225 与 eMMC 物理闪存 551481 扇区的位置，利用文件头注释区以 859B 严格等长无损写入 sendto: 1，彻底解除调参导致硬解失效卡顿的魔咒。",
        "narrative": [
          "找到了病灶，摆在面前的却是一堵高墙：由于 system 分区采用 ext4 只读镜像且无法通过 mount -o remount,rw 重新挂载，任何试图直接修改 /system/etc/seccomp_policy/ 的常规操作都会被系统无情拒绝。如果为此重新解包、修改固件、打包并全盘重刷，不仅耗时繁琐，更容易引入未知的稳定性隐患。",
          "真正的极客从不被文件系统表象束缚。既然逻辑文件层不让动，我们就直接去物理存储层动微创手术！我们编写了自动化 Python 脚本，通过解析 ext4 的 SuperBlock、Block Group 描述符与 Inode 表，如同 GPS 卫星定位般精准算出了 mediacodec-seccomp.policy 的物理落点：它正静静躺在 system 分区的第 327225 号数据块上。",
          "叠加 system 分区在整个 eMMC 芯片上的起始偏移（1794048 扇区），我们精确折算出了它在物理设备 /dev/block/mmcblk0 中的绝对位置：第 551481 号 4KB 扇区！为了绝不破坏文件系统的校验和与 Inode 结构，我们在原文件头部的无用注释区替换写入 sendto: 1，保持 859 字节等长无损，随后用 dd 笔直写入物理扇区并刷新内存缓存。修复后再进 Kodi 随意狂搓画面调参，MediaCodec 稳若泰山，硬件解码持续流畅生效，调参卡顿魔咒彻底化解！"
        ],
        "keyTakeaway": "当操作系统的逻辑门向你关闭时，块设备的物理扇区永远向你敞开。保持尺寸与校验的一致，是微创手术的生命线。",
        "codeSnippet": {
          "lang": "bash",
          "code": "dd if=/sdcard/block_327225_patched.bin of=/dev/block/mmcblk0 seek=551481 bs=4096 count=1 conv=notrunc\nsync && echo 3 > /proc/sys/vm/drop_caches",
          "note": "向物理闪存 551481 号扇区精准灌入 859 字节微创修补块"
        }
      },
      {
        "id": "act-4",
        "badge": "第四幕 · 破局篇",
        "title": "击穿黑边结界！芯片 VPP 视频后处理器降维打击",
        "subtitle": "软件视窗的死胡同：为何 Kodi 缩放一大于 1.0 就失灵？直通芯片硬件管线实现 0% 算力满屏！",
        "summary": "Kodi Surface 硬解下画面放大超出视窗会导致负坐标，被 Android SurfaceFlinger 暴力裁剪。跳过应用层，直接控制晶晨芯片底层 VPP 视频后处理器节点，联动 Kodi JSON-RPC 释放全屏黑边。",
        "narrative": [
          "调参导致硬解失效卡顿的暗雷排除了，下一个横亘在眼前的难题是宽银幕电影的上下黑边。在 16:9 的投影幕布上播放 2.35:1 比例的大片时，上下两条宽阔的黑边极其削弱沉浸感。我们尝试在 Kodi 的视频设置里将画面缩放调整为 125%，令人匪夷所思的现象出现了：画面可以随意缩小，但只要缩放比例大于 1.0，画面就纹丝不动！",
          "这并非 Kodi 的代码缺陷，而是 Android 渲染架构的宿命限制。在 MediaCodec Surface 硬件直通模式下，解码帧由底层 SurfaceFlinger 统筹渲染。一旦画面放大，视频图层的坐标就会溢出到屏幕之外变成负坐标，SurfaceFlinger 会在图层合成时无情地将溢出区域全部截断！若退回软解，弱小的 CPU 又会在 4K 巨浪面前瞬间熔化。",
          "解决困局的钥匙不在软件层，而在芯片硬件本身。晶晨 S912 内置了一颗极其强悍的专属协处理器——VPP（Video Post Processor 视频后处理器）。它坐落在解码引擎与 HDMI 发射芯片之间，拥有独立的硬件缩放与画质增强流水线。通过向内核节点 /sys/class/video/zoom 写入 125，并配合 Kodi 环回 9090 端口发送 JSON-RPC 展开底层视窗，我们以 0% 的 CPU 与 GPU 开销，让画面以丝滑无损的画质撑满了整个幕布！"
        ],
        "keyTakeaway": "在应用层绞尽脑汁的瓶颈，在芯片底层硬件工程师眼中往往只是一组早早预留好的寄存器。",
        "codeSnippet": {
          "lang": "bash",
          "code": "echo 125 > /sys/class/video/zoom\necho '{\"jsonrpc\":\"2.0\",\"method\":\"Player.SetViewMode\",\"params\":{\"viewmode\":\"zoom\"},\"id\":1}' | nc 127.0.0.1 9090",
          "note": "向晶晨 VPP 协处理器下发 125% 硬件变焦，并联动 Kodi 展开全屏视窗"
        }
      },
      {
        "id": "act-5",
        "badge": "第五幕 · 飞升篇",
        "title": "“无门之门”——环回本地 ADB 协议的幽灵提权",
        "subtitle": "告别看电影开电脑敲命令的尴尬：如何在电视端打造开机静默自启、手机一键遥控的画质中枢？",
        "summary": "官改固件内置 su 仅允许 UID 0 和 2000 执行，普通 App 无法提权。巧妙利用 5555 调试端口常开且免验证特性，自研 Java Socket 环回直通 ADB 秒获 shell 身份，打造出零弹窗、自启动的 T1ZoomHelper (v3.0)。",
        "narrative": [
          "一切底层能力都已齐备，但极客的产品思维要求我们必须完成从“实验验证”到“优雅日用”的最后闭环：我们绝不能容忍每次看电影前，都必须先打开电脑连上 ADB 敲几行命令。必须在电视盒子里运行一个常驻微服务，开机自启、静默监听，并提供手机遥控网页。",
          "然而，官改固件的 su 二进制程序极其刁钻：它被硬编码只信任 UID 0 (root) 和 UID 2000 (shell)，普通第三方 Android 应用在调用时会被瞬间拦截；同时系统只读，无法强行植入 Magisk 或 SuperSU 管理器。这扇看似紧闭的大门，实际上留有一道无形的“后门”——固件默认开启了 5555 网络调试端口，且 ro.adb.secure=0（无需任何秘钥弹窗确认）！",
          "我们在自研应用 T1ZoomHelper (v3.0) 中设计了一套惊艳的提权机制：应用启动时，直接在本地通过纯 Java Socket 环回连接 127.0.0.1:5555，自己作为 ADB 客户端向自己发起连接！瞬间便合法获得了 UID 2000（shell）的特权身份，随后顺理成章管道输入密码 31183118 调用 su 完成硬件控制。开机 1 秒内静默自启，电视屏幕无任何弹窗打扰；躺在沙发上拿起手机，扫码打开网页，无论是 125% 满屏变焦还是晶晨 DNLP 硬件画质增强，皆在指尖实时掌控。"
        ],
        "keyTakeaway": "真正的技术美学不仅在于攻克艰难的逆向关卡，更在于最后将繁杂的底层黑科技，封装成让普通人感受不到技术存在的极简体验。",
        "codeSnippet": {
          "lang": "java",
          "code": "Socket socket = new Socket(\"127.0.0.1\", 5555);\n// 环回本地 ADB 协议握手秒获 UID 2000，管道灌入密码 31183118 调用 su\nadbChannel.exec(\"echo 31183118 | su 0 echo 125 > /sys/class/video/zoom\");",
          "note": "纯 Java Socket 本地环回免 Root 提权核心控制逻辑"
        }
      }
    ],
    "tutorialSteps": [
      {
        "stepNumber": "00",
        "title": "【核心前提】确认刷入带 Root 的官改固件",
        "desc": "请务必在动手前确认系统环境：纯原厂官方固件由于没有内置 su 提权程序，系统处于完全锁定状态，是无法执行底层固化与寄存器控制的！必须刷入带有 Root 权限的固件。本教程经完整验证的推荐固件为：基于原厂 1.6T57 底包制作的【当贝/官改 Root 固件】（固件版本号：DB1_0000_7.1.2_1.6T57_0719_SH，内置 su 且 root 密码为 31183118，默认开启 5555 调试端口）。",
        "tip": "进入盒子的【设置】->【关于本机】即可查看系统版本。若系统满足前置条件，继续往下走一路畅通无阻。"
      },
      {
        "stepNumber": "01",
        "title": "局域网连接与环境准备",
        "desc": "将斐讯 T1 连上电视或投影仪（如明基 TK700）并接入家庭 Wi-Fi，在【设置】->【网络信息】中查看盒子分配到的局域网 IP（例如 192.168.123.98）。电脑端打开 PowerShell 并进入 ADB 工具目录，建立网络连接。",
        "command": ".\\adb.exe connect 192.168.123.98:5555",
        "commandLang": "powershell",
        "tip": "若连接成功，终端将返回 connected to 192.168.123.98:5555。如遇连接超时，请确认电脑与盒子处于同一局域网网段。"
      },
      {
        "stepNumber": "02",
        "title": "PowerShell 一键固化物理闪存参数",
        "desc": "针对明基 BenQ TK700 投影仪升级 1.02 固件后开机被 EDID 强制降级为 8bit 的 Bug，在电脑端 PowerShell 中执行以下命令。该命令会自动向底层 su 灌入密码 31183118，关闭 EDID 自动探测判定，并将 4K 60Hz 10bit 持久化刻入 U-Boot ENV 物理闪存。",
        "command": "powershell -Command \"echo '31183118`ndumpsys system_control -b set ubootenv.var.is.bestmode false`ndumpsys system_control -b set ubootenv.var.outputmode 2160p60hz420`ndumpsys system_control -b set ubootenv.var.hdmimode 2160p60hz420`ndumpsys system_control -b set ubootenv.var.colorattribute 420,10bit`ndumpsys system_control -b set ubootenv.var.2160p60hz420_deepcolor 420,10bit`nstop system_control`nstart system_control`nexit' | .\\adb.exe shell su\"",
        "commandLang": "powershell",
        "tip": "指令执行后电视屏幕可能会短暂闪烁 1 秒，这是 system_control 显示守护进程热重启生效的正常物理反应。"
      },
      {
        "stepNumber": "03",
        "title": "冷重启并核验硬件闪存状态",
        "desc": "执行重启命令，等待盒子彻底冷启动完成后，读取 HDMI 物理驱动节点与 eMMC 闪存 ENV 分区，确认 420,10bit 是否已在 BenQ TK700 上永久生效。",
        "command": ".\\adb.exe shell \"cat /sys/class/amhdmitx/amhdmitx0/attr && strings /dev/block/env | grep -E 'color|bestmode'\"",
        "commandLang": "bash",
        "tip": "期望返回包含 420,10bit 与 is.bestmode=false。此时无论投影仪开机、关机或插拔信号线，色深已 100% 永久焊死。"
      },
      {
        "stepNumber": "04",
        "title": "【关键防硬解失效】物理闪存微创注入 Seccomp 硬解热补丁",
        "desc": "在启动 APK 变焦或进入 Kodi 调整画面参数前，【必须首先打入此微创补丁】！因为 Android 7.1 沙箱策略遗漏了 sendto 系统调用白名单，播放 4K 原盘时一旦动态调参，驱动与 init 通信即刻触发 SIGSYS 致命信号，硬解进程 media.codec 会被当场处决导致硬件解码失效、4K 画面严重卡顿掉帧。本方案无需解包全盘重刷固件，直接向物理存储 ext4 第 327225 块（eMMC 551481 扇区）等长注入 859 字节微创修补块，彻底化解调参硬解失效魔咒。",
        "command": "# 1. 将微创补丁块推送到盒子临时目录\n.\\adb.exe push block_327225_patched.bin /data/local/tmp/patched_block.bin\n\n# 2. 物理块无损写入、刷新内核缓存并热重启解码器\npowershell -Command \"echo '31183118`ndd if=/data/local/tmp/patched_block.bin of=/dev/block/system bs=4096 seek=327225 count=1 conv=notrunc`nsync`necho 3 > /proc/sys/vm/drop_caches`nkill -9 `$(pidof media.codec)`nexit' | .\\adb.exe shell su\"\n\n# 3. 核验沙箱策略白名单（首行输出包含 sendto: 1 即表示微创手术成功）\n.\\adb.exe shell \"head -n 5 /system/etc/seccomp_policy/mediacodec-seccomp.policy\"",
        "commandLang": "powershell",
        "tip": "【双重极客保障与一键批处理】\n• 一键批处理工具：配套补丁镜像块 block_327225_patched.bin 与批处理 apply_seccomp_patch.bat 已提供本地下载；Windows 用户将两者放入同一目录双击即可一键全自动注入；\n• 预期返回核验：执行 head -n 5 后终端首行赫然显示 sendto: 1 与 recvfrom: 1，说明补丁已在物理存储与内核内存中生效！此后再在 Kodi 中狂搓画面变焦与调色，硬解管线亦稳如磐石。"
      },
      {
        "stepNumber": "05",
        "title": "安装 T1ZoomHelper (v3.0) 电视端画质自启服务",
        "desc": "通过 ADB 安装自研的电视端后台服务 APK，并首次拉起激活。该微服务开机 1 秒内通过本地环回 ADB 静默自启，采用 Notification.PRIORITY_MIN 极低优先级前台保活，屏幕 0 像素遮挡，功耗几乎为零。",
        "command": ".\\adb.exe install -r T1ZoomHelper.apk\n.\\adb.exe shell am start -n com.phicomm.t1zoom/.MainActivity",
        "commandLang": "powershell",
        "tip": "安装激活后即可彻底拔掉电脑！以后无论是遥控关机还是拔插头冷断电，服务都会在开机时全自动拉起就绪。"
      },
      {
        "stepNumber": "06",
        "title": "手机扫码访问 Web 调色盘与一键去黑边",
        "desc": "手机连上同一家庭 Wi-Fi，打开手机浏览器访问 http://盒机局域网IP:8989（例如 http://192.168.123.98:8989），即可进入极客自研的【斐讯 T1 影音画质控制】网页控制台。所有参数直连晶晨 S912 底层 VPP 硬件寄存器，免电脑、免弹窗，实现开机自动记忆与零算力损耗的实时微调。",
        "image": "/assets/cases/phicomm-t1-network-control.jpg",
        "imageCaption": "实机截图：斐讯 T1 影音与画质控制 Web 控制台（手机端浏览器访问 192.168.x.x:8989 实时交互界面）",
        "tip": "【控制台核心功能与操作指南】\n• 画面色彩与画质微调：支持实时无级微调【亮度 (-100~+100)】、【对比度 (-100~+100)】、【色彩饱和度 (-100~+100)】与【肤色冷暖微调 / 色相 (-50~+50)】，各项参数均提供一键复位按键；\n• 硬件画质引擎开关：一键开启【✨ 硬件动态对比度 (DNLP 智能去灰)】与【🎭 CM2 硬件色彩管理 (智能肤色保护)】，由芯片 VPP 硬件层直接渲染，在播放 Kodi、影视仓等视频时即刻生效且不影响安卓静态桌面，并自动记忆保存；\n• 硬件数字变焦（无损切黑边）：放映 2.35:1 宽银幕大片时，手机轻触【125% 铺满】，上下恼人黑边瞬间消失，画面无损等比铺满整面 16:9 幕布；亦可选择【115% 轻微变焦】或【133% 完全拉满】；\n• 画面拉伸模式与复位：支持【全屏强制拉伸】与【智能非线性拉伸（中间保真防人物变形）】，随时可点按【恢复 100% 原始比例】一键清空所有缩放与裁切。"
      },
      {
        "stepNumber": "07",
        "title": "【影院核心协同】Kodi 自动联动设置与避坑高能指南",
        "desc": "【T1ZoomHelper 与 Kodi 自动双向通信机制】：\n放映 2.35:1 宽银幕电影时，Kodi 默认会将底层视频图层（SurfaceView）限制在带有黑边的视窗内。为此，T1ZoomHelper 内置了 Kodi JSON-RPC 自动握手客户端！当你在手机端点击【125% 铺满】时，服务不仅会向芯片 VPP 硬件写入 125，更会在后台毫秒级通过 TCP 127.0.0.1:9090 向 Kodi 发送 Player.SetViewMode(viewmode='zoom') 指令，自动将 Kodi 的视窗物理延展为全屏，彻底破除黑边视窗结界；点击【恢复 100%】时亦会自动调用 viewmode='normal' 复位为标准视窗。全过程 100% 自动通信协同，完全无需在 Kodi 播放菜单中用遥控器手动切换！",
        "command": "# 开启 Kodi 远程控制服务（在电视端 Kodi 界面中完成，仅需设置一次）：\n1. 进入 Kodi【设置】->【服务设置】->【控制】(Settings -> Services -> Control)\n2. 开启【允许通过 HTTP 进行远程控制】(Allow remote control via HTTP，默认端口 8080)\n3. 开启【允许来自其他系统的应用程序远程控制】(Allow remote control by applications on other systems，开启 9090 TCP 端口)",
        "commandLang": "text",
        "tip": "【自动协同双重极客提示】\n• 零感联动体验：只要 Kodi 开启了上述 9090 控制选项，T1ZoomHelper 就会在后台全自动建立 Socket 握手，电视屏幕零弹窗打扰；\n• 全局视图默认保持 Normal：Kodi 播放普通的 16:9 片源时硬解原本完全稳定正常；得益于后台自动协同通信，在 Kodi 内部的“视频设置”中，全局默认视图模式请务必保持为【正常 (Normal)】，切勿手滑设置拉伸。",
        "warning": "千万切勿手滑将【拉伸 16:9】设为默认设置！否则以后打开任何标准的 16:9 电视剧或综艺时，画面都会被强行压扁变形！画面去黑边完全交给手机端与后台自动协同即可。"
      }
    ],
    "paramExtraction": {
      "intro": "晶晨 S912 八核 64 位芯片在 Linux 内核层内置了庞大而精密的 VPP（Video Post Processor 视频后处理器）与画质色彩引擎（amvecm / amvideo）。然而，斐讯 T1 的 Android 上层应用框架与原厂设置仅暴露了极其粗糙的分辨率开关，导致大量硬核画质潜能被封印、老旧投影仪 HDR 严重发灰、2.35:1 宽银幕黑边无法消除。为此，我们建立了一套涵盖【内核 Sysfs 树探测】、【系统二进制反编译逆向】与【自动化探针框架】的三维参数提取与调校方法论：",
      "methodology": [
        {
          "title": "1. 内核 Sysfs 命名空间地毯式枚举 (Sysfs Tree Probing)",
          "desc": "深入 Linux 内核驱动在 /sys/module/am_vecm/parameters/（晶晨画质与色彩增强模块）、/sys/module/amvideo/parameters/（视频缩放流水线）、/sys/class/amhdmitx/（HDMI 发射控制器）以及 /sys/class/video/（视窗与变焦）下的所有底层接口。通过 ADB Shell 编写批处理探测脚本，测试每个节点的只读/可写权限与数值边界，捕获参数实时注入后显示输出的电平与画质响应。",
          "technique": "Sysfs 枚举 · 权限测试 · 动态数值注入"
        },
        {
          "title": "2. 系统总控守护进程与驱动反汇编 (Binary Disassembly & Symbol Tracing)",
          "desc": "使用 Capstone 反汇编与字符串提取工具，深入逆向晶晨核心总控守护进程 /system/bin/systemcontrol 与硬件抽象层 libOmxVideo.so、hwcomposer.amlogic.so。通过逆向 JNI 映射与 IPC 通信，不仅理清了 dumpsys system_control -b set 是如何将参数持久化映射到 /dev/block/env（U-Boot ENV 分区），更挖掘出掌控 EDID 重协商的关键开关 is.bestmode，一举破解开机色深掉回 8bit 的底层根因。",
          "technique": "Capstone ARM64 反汇编 · 符号交叉引用 · U-Boot ENV 映射"
        },
        {
          "title": "3. 自动化探针体系与波形验证 (Automated Probing & Hardware Verification)",
          "desc": "编写专用的 Python 自动化测试脚本（probe_parameters.py、probe_pq.py 等），建立一套可重复执行的探针套件。脚本自动下发并回读测试数据，结合 HDMI 信号分析与投影仪实际画面，精确验证了 DNLP 动态直方图对比度、Color Management 色彩管理、Dithering 抖动平滑、Super Scaler 超分辨率滤波与 125% 硬件变焦的实际生效链路。",
          "technique": "Python 探针框架 · 自动化回读验证 · 零算力硬件直通"
        }
      ],
      "keyParameters": [
        {
          "name": "dnlp_en",
          "path": "/sys/module/am_vecm/parameters/dnlp_en",
          "defaultValue": "0 (关闭)",
          "recommendedValue": "1 (启用)",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "晶晨硬件级 DNLP（Dynamic Non-linear Peak 动态非线性峰值）对比度增强。实时分析直方图压制高光死白并大幅提亮暗部细节，彻底根治投影仪 HDR 画质泛白发灰！",
          "command": "echo 1 > /sys/module/am_vecm/parameters/dnlp_en"
        },
        {
          "name": "dnlp_adj_level",
          "path": "/sys/module/am_vecm/parameters/dnlp_adj_level",
          "defaultValue": "0",
          "recommendedValue": "12 ~ 16",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "DNLP 动态对比度调节烈度（范围 0~32）。设为 14 可在大幅增强电影通透感的同时，完美保留人物肤色与暗场质感。",
          "command": "echo 14 > /sys/module/am_vecm/parameters/dnlp_adj_level"
        },
        {
          "name": "cm_en & cm_level",
          "path": "/sys/module/am_vecm/parameters/cm_en",
          "defaultValue": "0 (关闭)",
          "recommendedValue": "1 (启用, level=2)",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "Color Management 芯片硬件色彩管理引擎。提供高精度色相矫正与广色域保护，防止电影色彩过饱和溢出或饱和度不足。",
          "command": "echo 1 > /sys/module/am_vecm/parameters/cm_en && echo 2 > /sys/module/am_vecm/parameters/cm_level"
        },
        {
          "name": "vpp_dith_en & mode",
          "path": "/sys/module/am_vecm/parameters/vpp_dith_en",
          "defaultValue": "0 (关闭)",
          "recommendedValue": "1 (模式 1/2)",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "VPP 空间与时间混色抖动（Dithering）硬件引擎。在 10bit HDR 输入时消除天空、阴影等平滑过渡区域的色彩断层与色阶色带。",
          "command": "echo 1 > /sys/module/am_vecm/parameters/vpp_dith_en && echo 1 > /sys/module/am_vecm/parameters/vpp_dith_mode"
        },
        {
          "name": "range_control",
          "path": "/sys/module/am_vecm/parameters/range_control",
          "defaultValue": "0 (自动)",
          "recommendedValue": "1 (Limited 16-235)",
          "category": "pq",
          "categoryLabel": "画质与色彩引擎 (amvecm)",
          "effect": "HDMI 色彩动态范围映射控制。针对家用影院投影仪标准输入，精准锁定 16-235 视频级黑阶，告别暗场死黑或发灰。",
          "command": "echo 1 > /sys/module/am_vecm/parameters/range_control"
        },
        {
          "name": "super_scaler",
          "path": "/sys/module/amvideo/parameters/super_scaler",
          "defaultValue": "0 (关闭)",
          "recommendedValue": "1 (启用)",
          "category": "scaler",
          "categoryLabel": "缩放与超分引擎 (amvideo)",
          "effect": "晶晨 Super Scaler 硬件超分辨率边缘锐化与插值滤波算法。将 1080p 高码流片源在 4K 巨幕放映时大幅提升线条锐度与细节凝聚力。",
          "command": "echo 1 > /sys/module/amvideo/parameters/super_scaler"
        },
        {
          "name": "vert_chroma_filter_en",
          "path": "/sys/module/amvideo/parameters/vert_chroma_filter_en",
          "defaultValue": "0",
          "recommendedValue": "1 (启用)",
          "category": "scaler",
          "categoryLabel": "缩放与超分引擎 (amvideo)",
          "effect": "垂直色度抗锯齿滤波。消除 YUV420 隔行重采样带来的红色/蓝色高频边缘色度锯齿，字幕与高对比物体边缘更加细腻平滑。",
          "command": "echo 1 > /sys/module/amvideo/parameters/vert_chroma_filter_en"
        },
        {
          "name": "frac_rate_policy",
          "path": "/sys/class/amhdmitx/amhdmitx0/frac_rate_policy",
          "defaultValue": "0 (整数帧优先)",
          "recommendedValue": "1 (分数帧优先)",
          "category": "hdmi",
          "categoryLabel": "HDMI 握手与输出 (amhdmitx)",
          "effect": "分数刷新率智能跟随策略。自动精准锁定 23.976Hz 与 59.94Hz，根治 24 帧电影每 41 秒因时钟不同步强制跳 1 帧的微顿挫。",
          "command": "echo 1 > /sys/class/amhdmitx/amhdmitx0/frac_rate_policy"
        },
        {
          "name": "zoom (硬件变焦)",
          "path": "/sys/class/video/zoom",
          "defaultValue": "100 (100% 原始)",
          "recommendedValue": "125 (放大 125%)",
          "category": "window",
          "categoryLabel": "VPP 视频视窗与变焦 (video)",
          "effect": "晶晨 VPP 硬件数字变焦。位于硬解之后、HDMI 输出之前的独立硬件管线，0% CPU/GPU 占用将 2.35:1 电影无损切除上下黑边铺满整面 16:9 幕布！",
          "command": "echo 125 > /sys/class/video/zoom"
        },
        {
          "name": "screen_mode",
          "path": "/sys/class/video/screen_mode",
          "defaultValue": "0 (normal)",
          "recommendedValue": "0 / 1 / 4",
          "category": "window",
          "categoryLabel": "VPP 视频视窗与变焦 (video)",
          "effect": "画面宽高比硬件拉伸模式。0: 原比例居中；1: 全屏强制拉伸；4: 智能非线性拉伸（中间保真防人物变形，平缓拉伸两侧填满全屏）。",
          "command": "echo 0 > /sys/class/video/screen_mode"
        }
      ],
      "probeScriptCode": {
        "lang": "python",
        "code": "import os, subprocess\n\ndef probe_sysfs(name, path, test_val=None):\n    cur = subprocess.getoutput(f\"adb shell cat {path} 2>/dev/null\").strip()\n    print(f\"[PROBE] {name:24s} | Path: {path}\\n        Current Value: {cur}\")\n    if test_val is not None:\n        subprocess.run(f\"adb shell 'echo {test_val} > {path}'\", shell=True)\n        after = subprocess.getoutput(f\"adb shell cat {path} 2>/dev/null\").strip()\n        print(f\"        -> Injected '{test_val}': {after}\")\n\n# 1. 探测画质色彩引擎 amvecm\nprobe_sysfs(\"DNLP 对比度增强\", \"/sys/module/am_vecm/parameters/dnlp_en\", 1)\nprobe_sysfs(\"DNLP 调节级别\", \"/sys/module/am_vecm/parameters/dnlp_adj_level\", 14)\nprobe_sysfs(\"Color Management\", \"/sys/module/am_vecm/parameters/cm_en\", 1)\nprobe_sysfs(\"VPP Dithering 抖动\", \"/sys/module/am_vecm/parameters/vpp_dith_en\", 1)\n\n# 2. 探测超分缩放引擎 amvideo\nprobe_sysfs(\"Super Scaler 超分\", \"/sys/module/amvideo/parameters/super_scaler\", 1)\nprobe_sysfs(\"Chroma 垂直色度滤波\", \"/sys/module/amvideo/parameters/vert_chroma_filter_en\", 1)\n\n# 3. 探测 HDMI 刷新率与色彩深度\nprobe_sysfs(\"分数帧率策略\", \"/sys/class/amhdmitx/amhdmitx0/frac_rate_policy\", 1)\nprobe_sysfs(\"当前 HDMI 色彩属性\", \"/sys/class/amhdmitx/amhdmitx0/attr\")",
        "note": "自研晶晨 S912 硬件底层寄存器与画质参数全自动探测套件核心逻辑"
      }
    },
    "downloadItem": {
      "title": "T1ZoomHelper 电视端画质自启微服务 & Seccomp 补丁",
      "fileName": "T1ZoomHelper.apk",
      "fileSize": "22.8 KB",
      "version": "v3.0 极客稳定版",
      "releaseDate": "2026.03",
      "downloadUrl": "/downloads/T1ZoomHelper.apk",
      "secondaryDownloadUrl": "/downloads/block_327225_patched.bin",
      "secondaryFileName": "block_327225_patched.bin",
      "secondaryFileSize": "4.0 KB",
      "md5": "F5E265842D83E83A1567BA7A2460EB9E",
      "sha256": "624E7DAAA0891956D939DCED521C9CA921B9F8217F54FAEAD570B6E3988D5682",
      "description": "专为斐讯 T1 盒子（晶晨 S912 芯片平台）量身打造的超轻量电视端常驻服务与防硬解失效热补丁。配套提供的 block_327225_patched.bin 物理扇区补丁彻底修复 Android 沙箱 Seccomp 漏洞，免疫调参崩溃；T1ZoomHelper (v3.0) 利用本地环回 ADB 协议实现开机 1 秒免 Root 弹窗静默自启，0% 算力调用晶晨 VPP 硬件实现 125% 影院等比变焦，消除 2.35:1 宽银幕上下黑边，同一局域网手机扫码即开 Web 遥控调色盘。",
      "features": [
        "免疫调参硬解失效：搭配 Seccomp 物理闪存微创热补丁，任意调整变焦与色彩均不触发 SIGSYS 沙箱崩溃，保证 4K 流畅硬解",
        "免电脑 · 开机 1 秒静默自启：通过 127.0.0.1:5555 本地环回 ADB 免密提权，电视无任何弹窗打扰",
        "0% 算力硬件等比变焦：直通晶晨 VPP 协处理器 /sys/class/video/zoom，125% 满屏无损去黑边",
        "晶晨 DNLP 画质去灰引擎：动态非线性对比度与直方图增强实时写入，告别投影泛白发灰",
        "手机 Web 实时遥控中枢：内置 8989 端口轻量 HTTP 服务，同一局域网手机扫码即开调色盘",
        "极致轻量零遮挡：安装包仅 23KB，纯原生 Java Socket，无任何多余依赖，内存占用仅 8MB"
      ],
      "installCommands": [
        {
          "label": "1. Seccomp 补丁写入（防硬解失效卡顿）",
          "cmd": "adb push block_327225_patched.bin /data/local/tmp/ && echo 31183118 | adb shell su 0 dd if=/data/local/tmp/block_327225_patched.bin of=/dev/block/system bs=4096 seek=327225 count=1 conv=notrunc"
        },
        {
          "label": "2. ADB 网络安装 APK",
          "cmd": "adb install -r T1ZoomHelper.apk"
        },
        {
          "label": "3. 首次静默拉起服务",
          "cmd": "adb shell am start -n com.phicomm.t1zoom/.MainActivity"
        },
        {
          "label": "4. 手机访问遥控面板地址",
          "cmd": "http://盒机局域网IP:8989"
        }
      ]
    }
  },
  {
    id: 'bbt-photo-studio',
    title: 'BBT 智能影楼管理系统：微信原生小程序预约与全栈数字化运营中枢',
    category: 'dev',
    categoryLabel: '微信小程序 · 商业全栈开发',
    subtitle: '全渠道在线分时预约 · 智能日历冲突排班 · 客户全周期资产沉淀 · 移动端运营工作台',
    description: '专为儿童摄影、婚纱影楼、写真工作室量身打造的一站式数字化运营解决方案。系统深度打通微信生态，涵盖面向消费者的原生小程序客户端（高清样片瀑布流、透明套餐选购、分时秒开预约、一键导航与微信直联）与面向影楼管理者的移动端全功能管理工作台（可视化日历排班中枢、时段并发冲突智能拦截、客户档案全生命周期沉淀、多维度经营数据看板）。彻底告别纸笔手工记账与漏单错单，助力实体摄影门店实现高质高效数字化转型。',
    client: '青青果儿童摄影美学馆 / 商业影楼',
    year: '2026',
    sidebarContactTip: '智能影楼与小程序定制',
    coverImage: '/assets/cases/bbt/bbt-cover.png',
    techStack: [
      '微信小程序原生开发',
      'Vant Weapp UI 组件库',
      'PHP 8 RESTful API',
      'MySQL 8 关系型数据库',
      '天气开放平台 API 实时联动',
      '增量热部署自动化工具链',
    ],
    highlights: [
      '100% 微信原生生态开发，0 安装门槛扫码即用，7×24 小时随心在线分时预约',
      '可视化智能日历排班中枢，实时展示预约负荷与动态天气预报，空闲时段一键登记',
      '分时并发冲突智能熔断引擎，支持常规营业时段与特殊节假日自定义时段规则',
      '全生命周期客户资产沉淀，新电话预约自动建档，多维经营图表实时掌控全局',
    ],
    deliverables: [
      '微信小程序双端一体化工程源码（客户端+移动端管理后台）',
      '高性能 PHP 8 RESTful 后端接口工程与 MySQL 数据库架构',
      '官方商业推广落地页（Promo 响应式营销官网）',
      'FTP 自动化增量代码热部署脚本及全套运维交付手记',
    ],
    tags: [
      '微信小程序',
      '影楼管理系统',
      '分时预约排班',
      '全栈开发',
      '客户管理',
      '日历调度',
    ],
    seoKeywords: [
      'BBT影楼管理系统',
      '摄影工作室预约小程序',
      '影楼微信小程序开发',
      '儿童摄影预约系统',
      '摄影排班日历系统',
      '婚纱影楼客户管理系统',
      '微信分时预约系统开发',
      '影楼数字化运营系统',
    ],
    projectTime: '2026.01',
    visitUrl: 'http://bbt-full.xruner.tk/promo/',
    overview: {
      narrative: '传统中小型摄影工作室与影楼在日常运营中长期受困于粗放的手工管理模式：前台使用纸笔或微信聊天记账，顾客预约时间频繁撞期甚至遗漏；通过微信群发送的样片常被严重压缩破坏画质，难以展现摄影水准；老客户的拍摄偏好、宝宝年龄与历史消费分散各处，无法形成复购驱动。\n\n针对这一痛点，我们设计研发了 BBT 影楼数字化管理系统。系统定位于“轻量、原生、闭环”，无需安装独立 App，顾客通过微信扫码即可浏览高清样片、挑选套餐并精准预约时段；管理人员在手机端微信内即可随时掌握日历排班负荷、一键录入电话预约并查阅经营数据，以极致流畅的数字化闭环赋能实体门店降本增效。',
      target: '打通“作品展示-透明选套-分时预约-日历排班-客户资产沉淀-经营看板”的线上线下一体化闭环，消除档期冲突，提升客资留存与复购率。',
      audience: '摄影工作室主理人、门市接待、全职摄影师，以及注重预约体验与成片品质的家庭和年轻客群。',
      format: '微信原生小程序（客户端+移动管理工作台）+ 官方推广落地页 (Promo Web)',
    },
    designHighlights: [
      {
        title: '双端合一极简闭环',
        desc: '顾客端 3 步极速分时预约，管理端掌上掌控全局，无需在多个后台切换，全链路触达微信生态。',
        iconType: 'layout',
      },
      {
        title: '智能日历排班中枢',
        desc: '月视图直观呈现预约负荷密度，结合天气预报，点击空闲时段即可直接为电话到店客户登记建档。',
        iconType: 'visual',
      },
      {
        title: '时段引擎与防重熔断',
        desc: '细粒度配置常规与节假日特殊时段，毫秒级检测时段冲突，彻底杜绝重单、撞单与档期混乱。',
        iconType: 'responsive',
      },
      {
        title: '全周期客户资产沉淀',
        desc: '新预约电话自动触发智能建档，记录拍摄历史、备注偏好，多维趋势图表全景把脉门店经营。',
        iconType: 'brand',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/bbt/bbt-pc-promo.png',
      pcLabel: 'BBT 官方商业推广营销落地页（Promo Web 响应式设计）',
      mobileImages: [
        {
          image: '/assets/cases/bbt/bbt-client-home.png',
          label: '小程序客户端首页 · 精美 Banner 与快捷入口',
        },
        {
          image: '/assets/cases/bbt/bbt-calendar.png',
          label: '管理工作台 · 智能预约日历调度中枢（天气联动）',
        },
        {
          image: '/assets/cases/bbt/bbt-dashboard.png',
          label: '管理工作台 · 可视化经营数据与业务趋势看板',
        },
        {
          image: '/assets/cases/bbt/bbt-booking-list.png',
          label: '管理工作台 · 预约综合管理列表与状态跟踪',
        },
        {
          image: '/assets/cases/bbt/bbt-customer-list.png',
          label: '管理工作台 · 客户资产全生命周期档案库',
        },
        {
          image: '/assets/cases/bbt/bbt-timeslot-config.png',
          label: '管理工作台 · 灵活分时排班时段配置引擎',
        },
        {
          image: '/assets/cases/bbt/bbt-gallery.png',
          label: '小程序客户端 · 样片作品画廊多分类展示',
        },
        {
          image: '/assets/cases/bbt/bbt-package-detail.png',
          label: '小程序客户端 · 服务套餐详情与透明明细报价',
        },
      ],
    },
  },
  {
    id: 'fhjy-tutoring-system',
    title: '补习班交流通：家校互联分权成绩中枢与微信专属防窥绑定系统',
    category: 'dev',
    categoryLabel: '全栈小程序与教育SaaS',
    subtitle: '微信原生双端闭环 · 专属 OpenID 强隐私防窥锁定 · Excel 智能解析导入 · 错题归纳与专属讲评推送',
    description: '面向中小辅导机构与课后补习班打造的一站式家校成绩交流平台。首创微信 OpenID 专属强绑定防窥机制，学号绑定后杜绝同窗冒名查分；教师端集成 3 步向导式 Excel 成绩智能批量解析与列映射入库，自动聚合班级学情看板、高频错题榜与查阅跟踪，支持公共试卷题解与学生 1 对 1 专属订正批注双轨分发。',
    client: '中小教培辅导机构 / 课后辅导中心',
    year: '2026',
    sidebarContactTip: '教培家校系统与小程序定制',
    coverImage: '/assets/cases/fhjy/fhjy-cover.png',
    techStack: [
      '微信小程序原生开发 (WXML / WXSS / JavaScript)',
      'PHP 8 / Slim Framework 4 RESTful API',
      'MySQL 8 关系型数据库 (InnoDB 事务隔离)',
      'PhpSpreadsheet 智能 Excel 解析与列映射引擎',
      'JWT 身份令牌鉴权 & 微信 OpenID 状态锁机制',
      '多校区多机构数据租户隔离架构',
    ],
    highlights: [
      '微信专属强绑定防窥锁定：学号初登查分后引导一键绑定，绑定后永久拦截公开学号姓名查分，根治同窗窥探隐私',
      '教师端 Excel 智能向导批量导入：集成 PhpSpreadsheet，自适应识别列头、分制范围校验与学生花名册自动建档',
      '全维学情分析与高频错题归纳：自动汇总参考人数、均分、极值与已读未读状态，高频错题排名一目了然',
      '公共题解 + 个人专属批注双轨分发：支持全班统一答案解析，更支持教师针对特定学生上传订正试卷附件 1 对 1 直达',
    ],
    deliverables: [
      '微信小程序双端一体化工程源码（教师移动工作台 + 学生端成绩错题中枢）',
      '高性能 PHP 8 Slim Framework RESTful API 后端工程与 MySQL 8 数据库架构',
      'Excel 模板智能解析中间件与多维度成绩批量导入工具链',
      '微信开放平台接口配置指南与全套多校区运维部署手册',
    ],
    tags: [
      '微信小程序',
      '教育SaaS',
      '家校互通',
      '成绩管理',
      '隐私安全',
      'Excel解析',
      '错题归纳',
    ],
    seoKeywords: [
      '补习班成绩管理小程序',
      '教培机构查分系统',
      '学生成绩防窥绑定',
      '微信小程序查分系统开发',
      '家校交流小程序制作',
      'Excel批量导入成绩小程序',
      '错题分析与推送系统',
      '辅导班数字化管理系统',
      '培训机构成绩分析中枢',
    ],
    projectTime: '2026.02',
    visitUrl: '微信小程序生态定制 · 私有化交付',
    overview: {
      narrative: '在传统中小课后辅导班和补习机构的日常教学反馈中，成绩发布与学情沟通长期面临两大严峻痛点：一是【隐私泄露风险】，多数第三方查分系统或传统公示仅凭公开的学号与姓名即可查询，同班学生或熟人极易随意窥探他人分数与排名，给学生带来严重的心理压力；二是【教学反馈断层】，教师手工录入成绩繁重低效，且成绩公布后往往只能在大群内发送一份通用的试卷答案，无法针对每个学生的具体错题进行一对一试卷讲评与订正跟踪。\n\n为此，我们基于微信原生生态全栈自研了【补习班交流通系统】。系统在架构层面确立了以“强隐私保护”为核心的安全闭环：学生首次使用学号登录后，系统通过醒目的提示条引导其一键完成微信 OpenID 专属强绑定；一旦绑定成功，后端 API 即刻建立防窥拦截锁，任何其他人后续若试图仅通过该学生的学号和姓名进行公开查分，都将被系统直接拦截并拒绝（HTTP 403），必须由该学生本人持绑定的微信号授权登录，彻底封死冒名窥探通道。\n\n在教师端，系统深度融合教学习惯，打造了极简的 3 步向导式 Excel 成绩批量解析导入引擎，支持自动识别列头与分制约束，秒级导入全班成绩并自动计算均分、最高分与已读/未读查阅状态；同时开创了【高频错题榜】与【公共题解+学生个人专属批注】双轨附件分发体系，教师不仅可一键向全班推送标准答案，还能针对特定学生的薄弱知识点上传手写批改试卷附件，实现真正精准高效的数字化因材施教。',
      target: '构建具备微信专属防窥锁定、Excel 智能极速导入、全维学情与高频错题归纳、个性化 1 对 1 讲评附件推送的一站式教培家校数字化中枢。',
      audience: '课后辅导班主理人、带班教师、助教团队，以及注重成绩防窥隐私与薄弱知识点复盘的学生与家长群体。',
      format: '原生微信小程序（教师管理端 + 学生移动端）+ 高性能 PHP 8 Slim API 中台 + MySQL 8 专属私有库',
    },
    designHighlights: [
      {
        title: '微信专属 OpenID 强隐私防窥',
        desc: '学号初次查询，一键绑定个人微信；一旦绑定，后端全局封锁学号公开查询通道，非本人微信不可查，彻底隔绝同学窥探。',
        iconType: 'brand',
      },
      {
        title: 'Excel 智能向导批量导入',
        desc: '支持列头容错与多字段动态映射，分制范围与缺考自动容灾校验，全班数十人成绩与错题秒级批量入库。',
        iconType: 'layout',
      },
      {
        title: '全维学情与高频错题看板',
        desc: '自动统计参考人数、班级平均分、极值分布与已读状态，直观生成高频错题榜单，助力教师针对性课堂复盘。',
        iconType: 'visual',
      },
      {
        title: '双轨分层附件与专属讲评',
        desc: '全班公共标准答案与个人试卷批注双轨推送，学生独享针对性辅导附件，打造 1 对 1 数字化辅导闭环。',
        iconType: 'responsive',
      },
    ],
    screenshots: {
      pcImage: '/assets/cases/fhjy/fhjy-pc-promo.png',
      pcLabel: '补习班交流通 · 机构管理看板与多端协同生态图',
      mobileImages: [
        {
          image: '/assets/cases/fhjy/01-login-query.png',
          label: '查分首屏 · 学生学号姓名查分与教师专属登录双入口',
        },
        {
          image: '/assets/cases/fhjy/02-teacher-exam-list.png',
          label: '教师端 · 考试列表全景展示与年级分类标签索引',
        },
        {
          image: '/assets/cases/fhjy/03-teacher-exam-detail-stats.png',
          label: '教师端 · 考试学情综合看板与高频错题排行榜',
        },
        {
          image: '/assets/cases/fhjy/04-teacher-exam-attachments.png',
          label: '教师端 · 试卷公共答案解析与分层附件管理',
        },
        {
          image: '/assets/cases/fhjy/05-teacher-student-roster.png',
          label: '教师端 · 学生花名册与微信专属绑定状态监管',
        },
        {
          image: '/assets/cases/fhjy/06-teacher-create-exam.png',
          label: '教师端 · 3步向导式考试创建与满分值智能设定',
        },
        {
          image: '/assets/cases/fhjy/07-teacher-excel-upload.png',
          label: '教师端 · 成绩单 Excel 智能批量解析与列映射导入',
        },
        {
          image: '/assets/cases/fhjy/08-teacher-batch-manage.png',
          label: '教师端 · 考试多选批量归档与回收站安全管理',
        },
        {
          image: '/assets/cases/fhjy/09-student-privacy-warning.png',
          label: '学生端 · 成绩查询看板与防窥强绑定警示（核心亮点）',
        },
        {
          image: '/assets/cases/fhjy/10-student-wechat-bound.png',
          label: '学生端 · 微信已绑定状态展示与解绑安全二次确认',
        },
        {
          image: '/assets/cases/fhjy/11-student-mistake-attachments.png',
          label: '学生端 · 错题归纳看板与专属试卷订正批注下载',
        },
      ],
    },
  },
];


