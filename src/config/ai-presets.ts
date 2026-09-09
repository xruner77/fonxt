export interface AIPreset {
  id: string;
  question: string;
  category: string;
  answer: string;
  suggestedAction?: {
    label: string;
    actionType: 'contact' | 'portfolio' | 'services';
  };
}

export const aiPresets: AIPreset[] = [
  {
    id: 'price-timeline',
    question: '开发一个定制官网或小程序需要多久？预算大约多少？',
    category: '周期与报价',
    answer: '通常标准企业官网或敏捷小程序在 3~10 个工作日内即可完成高保真设计并上线。因为我采用“一人全栈 + AI工作流”，没有中间层层汇报与沟通损耗，开发效率提升 60% 以上，费用通常仅为传统外包团队的 40%~60%。具体会根据功能复杂度、是否需要后台系统定制灵活报价。',
    suggestedAction: {
      label: '获取精准需求评估表 ➔',
      actionType: 'contact',
    },
  },
  {
    id: 'ai-knowledge-base',
    question: '企业知识库和智能客服是如何落地的？需要自备昂贵的 GPU 显卡吗？',
    category: 'AI应用落地',
    answer: '不需要必须自备显卡！落地通常有两种方案：\n1. 【轻量敏捷方案】：基于商用高性价比大模型 API（如 DeepSeek、通义千问）搭建企业私有 RAG 向量知识库与智能客服，按 token 计费，每月云端成本低至几十元；\n2. 【内网离线私有化方案】：若企业数据有极严苛保密要求，可采购单张或双张专业卡（如单卡 RTX 4090 或 A100），我协助完成本地模型部署、知识切片与内网隔离，数据不出机房，永久自主掌控。',
    suggestedAction: {
      label: '咨询私有化部署方案 ➔',
      actionType: 'contact',
    },
  },
  {
    id: 'ip-design',
    question: 'IP形象设计包含哪些交付内容？能否保证多角度姿态的一致性？',
    category: 'IP形象设计',
    answer: '交付包含：① 专属 IP 原创角色概念稿；② 标准正侧背三视图（支持 3D 萌系极客/盲盒风/扁平潮玩风）；③ 4~8 款核心业务动作及常用表情包延展；④ 高清无损透明背景 PNG + 矢量源文件。借助先进的 ComfyUI 角色特征锁定工作流，能稳定保证角色脸型、发型、配饰在任意复杂场景下的高度一致！',
    suggestedAction: {
      label: '查看 IP 案例实拍 ➔',
      actionType: 'portfolio',
    },
  },
  {
    id: 'source-code',
    question: '项目交付后是否提供全部源代码？后续如何维护？',
    category: '交付与保障',
    answer: '100% 交付！所有前端代码、后端脚本、数据库结构、Docker 部署配置和 UI 设计稿，在项目验收后全部交接给您，绝无任何恶意代码捆绑。提供 1~3 个月免费技术质保期（修复偶发 Bug 与环境兼容），并附赠详尽的操作录屏与部署文档。',
    suggestedAction: {
      label: '微信直聊主理人 ➔',
      actionType: 'contact',
    },
  },
];
