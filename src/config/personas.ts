export interface Persona {
  id: 'master' | 'designer' | 'coder' | 'architect';
  name: string;
  role: string;
  badge: string;
  tagline: string;
  headline: string;
  description: string;
  tags: string[];
  accentColor: string;
  gradient: string;
  avatar: string;
  iconName: string;
  capabilities: { title: string; desc: string }[];
}

export const personas: Persona[] = [
  {
    id: 'master',
    name: 'fonxt',
    role: '全栈主理人 / 超级个体',
    badge: 'ALL-IN-ONE 全栈统揽',
    tagline: '一人即团队 · 全链路闭环',
    headline: '用创意与技术，让想法变成商业现实',
    description: '打通从“品牌IP视觉”到“全端产品研发”再到“企业级AI工程”的完整闭环，无需沟通多方外包团队，交付更快、理解更透彻。',
    tags: ['创意设计', '网站开发', '小程序研发', 'App制作', 'AI全场景落地'],
    accentColor: '#00d2ff',
    gradient: 'linear-gradient(135deg, #00d2ff 0%, #2563eb 50%, #8b5cf6 100%)',
    avatar: '/assets/personas/master.jpg',
    iconName: 'Sparkles',
    capabilities: [
      { title: '零损耗沟通', desc: '设计与代码同一人实现，彻底避免“设计画得出、研发做不出”的行业顽疾。' },
      { title: '极致交付周期', desc: 'AI 工具流加持，敏捷迭代，平均交付周期较传统外包团队缩短 60% 以上。' },
      { title: '100% 资产交付', desc: '所有源码、设计稿与模型配置完全归客户所有，无任何恶意绑定与暗藏收费。' },
    ],
  },
  {
    id: 'designer',
    name: 'fonxt · 视觉设计官',
    role: 'AI作图 & 原创IP设计师',
    badge: 'VISUAL CREATIVE 视觉美学',
    tagline: '让品牌更有温度与辨识度',
    headline: '商业级 AI 绘图与专属 IP 形象打造',
    description: '熟练运用 ComfyUI、Midjourney、Stable Diffusion 深度工作流，定制高一致性品牌吉祥物、3D/2D IP三视图、商业海报与高端 UI 原型。',
    tags: ['原创IP设计', '商业AI插画', '品牌吉祥物', 'UI/UX高保真原型', 'ComfyUI工作流'],
    accentColor: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
    avatar: '/assets/personas/designer.jpg',
    iconName: 'Palette',
    capabilities: [
      { title: '高一致性 IP 矩阵', desc: '精准控制多姿态、多情绪与多场景三视图，满足表情包及实体周边印刷需求。' },
      { title: '商业级视觉冲击', desc: '告别廉价套版，为企业与个人定制独一无二的科技潮流与高端商业画风。' },
      { title: '全链路设计规范', desc: '交付完整的 Design System 与 Figma/切图资源，与前端研发无缝衔接。' },
    ],
  },
  {
    id: 'coder',
    name: 'fonxt · 全端工程师',
    role: '网站 / 小程序 / APP 开发者',
    badge: 'ENGINEERING 全端工程',
    tagline: '美学与高性能兼备的代码艺术',
    headline: '精益打磨的高性能全端数字产品',
    description: '深耕 Web 响应式开发、微信原生及跨端小程序、移动端 App 研发。关注首屏性能、60fps 动效、SEO 优化与安全架构。',
    tags: ['响应式官网', '微信小程序', '移动App开发', 'React/Next.js', '高并发接口'],
    accentColor: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #00d2ff 100%)',
    avatar: '/assets/personas/coder.jpg',
    iconName: 'Code2',
    capabilities: [
      { title: '极致多端响应', desc: '深度适配手机、平板、折叠屏与 4K 大屏，移动端触控体验丝滑自然。' },
      { title: 'SEO 与高转化架构', desc: '开箱即用的搜索引擎优化（TDK/SSR/静态化），助力业务获取精准有机流量。' },
      { title: '规范工程与可扩展性', desc: '严谨的模块化分层代码与详尽文档，后续二开与业务扩展毫不费力。' },
    ],
  },
  {
    id: 'architect',
    name: 'fonxt · AI 架构师',
    role: 'AI应用落地 & 私有化专家',
    badge: 'AI INFRA & AGENT 智能落地',
    tagline: '将 AI 真正转化为商业生产力',
    headline: '智能客服、企业知识库与私有化部署',
    description: '专注于 RAG 知识库问答、7×24h 智能业务接待、Dify/LangChain 自动化工作流，以及 DeepSeek/开源大模型本地化安全部署。',
    tags: ['智能客服系统', '企业RAG知识库', 'Agent工作流', 'DeepSeek私有化', '云端/本地算力部署'],
    accentColor: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #38bdf8 100%)',
    avatar: '/assets/personas/architect.jpg',
    iconName: 'Cpu',
    capabilities: [
      { title: '私有化离线部署', desc: '企业敏感数据完全保留在内部局域网，满足严苛保密要求，安全自主可控。' },
      { title: '精准知识库问答', desc: '针对专业文档进行切片清洗与向量微调，彻底消除大模型“幻觉”，答复准确率高。' },
      { title: '自动化协同工作流', desc: '连接业务数据库、飞书、企微与第三方系统，实现多智能体协同办公。' },
    ],
  },
];
