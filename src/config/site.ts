export interface NavItem {
  label: string;
  href: string;
  isAction?: boolean;
}

export const siteConfig = {
  name: 'FONXT',
  domain: 'fonxt.com',
  tagline: 'AI · DESIGN · DEV',
  slogan: '用创意和技术，让想法变成现实',
  subSlogan: '为企业与个人提供一站式数字化解决方案',
  wechatId: 'xane75',
  wechatQrCode: '/assets/personas/qrcode_wx.jpg',
  email: 'contact@fonxt.com',
  location: '中国 · 远程全栈交付',
  status: '🟢 正在承接 2026 数字化定制需求',

  // 导航项
  navItems: [
    { label: '首页', href: '#hero' },
    { label: '服务内容', href: '#services' },
    { label: 'AI体验', href: '#ai-demo' },
    { label: '作品案例', href: '#portfolio' },
    { label: '交付流程', href: '#workflow' },
    { label: '常见问题', href: '#faq' },
  ] as NavItem[],

  // 统计指标
  stats: [
    { label: '交付周期缩短', value: '60%+' },
    { label: '客户满意度', value: '99.6%' },
    { label: '商业级源码/资产', value: '100%交付' },
    { label: '在线智能响应', value: '7×24h' },
  ],
};
