import React from 'react';
import { Palette, Globe, Smartphone, Cpu, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import './ServicesBento.css';

interface ServicesBentoProps {
  onOpenContact: () => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onOpenContact }) => {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} className="eyebrow-icon" />
            <span>MY SERVICES · 全栈服务矩阵</span>
          </div>
          <h2 className="section-title">我能为你做什么</h2>
          <p className="section-subtitle">
            从创意概念、商业视觉到端到端研发与企业级 AI 赋能，提供真正的全流程一站式数字化交付。
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: AI作图与IP设计 */}
          <div className="bento-card card-design">
            <img 
              src="/assets/personas/designer.jpg" 
              alt="Designer Persona" 
              className="card-watermark-avatar" 
              loading="lazy"
            />
            <div className="card-top">
              <div className="card-icon-wrapper" style={{ borderColor: 'rgba(234, 88, 12, 0.3)' }}>
                <Palette size={26} style={{ color: '#ea580c' }} />
              </div>
              <span className="card-tag" style={{ background: 'rgba(234, 88, 12, 0.08)', color: '#ea580c' }}>
                AI视觉与IP设计
              </span>
            </div>

            <div className="card-body">
              <h3 className="card-title">AI 商业作图 & IP 形象设计</h3>
              <p className="card-desc">
                告别千篇一律的通用模板。通过 ComfyUI、Midjourney 深度工作流定制独一无二的品牌吉祥物与商业视觉。
              </p>

              <ul className="card-features">
                <li>
                  <CheckCircle2 size={16} style={{ color: '#ea580c' }} />
                  <span>原创品牌吉祥物 & 3D萌系极客/盲盒风 IP 形象设定</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#ea580c' }} />
                  <span>精准角色一致性三视图（正/侧/背）与业务表情包</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#ea580c' }} />
                  <span>商业宣传海报、电商KV设计与高分辨率无损透明图交付</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-card-action" onClick={onOpenContact}>
                <span>咨询 IP 设计方案</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2: 网站设计制作 */}
          <div className="bento-card card-web">
            <img 
              src="/assets/personas/coder.jpg" 
              alt="Coder Persona" 
              className="card-watermark-avatar" 
              loading="lazy"
            />
            <div className="card-top">
              <div className="card-icon-wrapper" style={{ borderColor: 'rgba(37, 99, 235, 0.3)' }}>
                <Globe size={26} style={{ color: '#2563eb' }} />
              </div>
              <span className="card-tag" style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#2563eb' }}>
                WEB ENGINEERING
              </span>
            </div>

            <div className="card-body">
              <h3 className="card-title">高端响应式网站设计与制作</h3>
              <p className="card-desc">
                兼顾视觉震撼与工程性能。打造支持手机、平板与 4K 大屏的多端适配高端官网与营销落地页。
              </p>

              <ul className="card-features">
                <li>
                  <CheckCircle2 size={16} style={{ color: '#2563eb' }} />
                  <span>极具视觉冲击力的现代科技感官网与产品 Landing Page</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#2563eb' }} />
                  <span>60fps 丝滑微动效，毫秒级首屏加载与无缝交互</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#2563eb' }} />
                  <span>深度 SEO 优化配置与主流云平台（Cloudflare/云服务器）部署</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-card-action" onClick={onOpenContact}>
                <span>定制专属高端官网</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 3: 小程序与 APP 制作 */}
          <div className="bento-card card-app">
            <img 
              src="/assets/personas/coder.jpg" 
              alt="Coder Persona" 
              className="card-watermark-avatar" 
              loading="lazy"
            />
            <div className="card-top">
              <div className="card-icon-wrapper" style={{ borderColor: 'rgba(2, 132, 199, 0.3)' }}>
                <Smartphone size={26} style={{ color: '#0284c7' }} />
              </div>
              <span className="card-tag" style={{ background: 'rgba(2, 132, 199, 0.08)', color: '#0284c7' }}>
                MINI-APP & MOBILE
              </span>
            </div>

            <div className="card-body">
              <h3 className="card-title">微信小程序 & 移动 APP 制作</h3>
              <p className="card-desc">
                深度契合移动端使用习惯。从交互原型设计到前后端开发，助力业务在移动互联网快速铺开。
              </p>

              <ul className="card-features">
                <li>
                  <CheckCircle2 size={16} style={{ color: '#0284c7' }} />
                  <span>微信原生高性能小程序（商城、预约、展示与工具）</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#0284c7' }} />
                  <span>支持微信支付、授权登录、消息订阅等全套生态功能</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#0284c7' }} />
                  <span>Flutter / React Native 跨平台移动端 App 原型与开发</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-card-action" onClick={onOpenContact}>
                <span>评估小程序/App开发</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 4: AI应用落地与私有化部署 */}
          <div className="bento-card card-ai">
            <img 
              src="/assets/personas/architect.jpg" 
              alt="Architect Persona" 
              className="card-watermark-avatar" 
              loading="lazy"
            />
            <div className="card-top">
              <div className="card-icon-wrapper" style={{ borderColor: 'rgba(124, 58, 237, 0.3)' }}>
                <Cpu size={26} style={{ color: '#7c3aed' }} />
              </div>
              <span className="card-tag" style={{ background: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed' }}>
                AI ENTERPRISE & INFRA
              </span>
            </div>

            <div className="card-body">
              <h3 className="card-title">企业级 AI 应用落地 & 本地私有化部署</h3>
              <p className="card-desc">
                不谈虚无概念，只做真正能带来降本增效的 AI 生产力落地。帮企业建立自主可控的专属智能大脑。
              </p>

              <ul className="card-features">
                <li>
                  <CheckCircle2 size={16} style={{ color: '#7c3aed' }} />
                  <span><strong>企业级私有 RAG 知识库</strong>：切片清洗内部文档，精准问答零幻觉</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#7c3aed' }} />
                  <span><strong>7×24h 智能业务客服</strong>：自动接待咨询，智能挖掘高价值销售线索</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#7c3aed' }} />
                  <span><strong>Dify / LangChain 自动化工作流</strong>：打通企微、飞书与业务数据库</span>
                </li>
                <li>
                  <CheckCircle2 size={16} style={{ color: '#7c3aed' }} />
                  <span><strong>DeepSeek / 开源大模型私有化部署</strong>：局域网物理离线运行，数据绝不外泄</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-card-action" onClick={onOpenContact}>
                <span>获取 AI 私有化部署清单</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
