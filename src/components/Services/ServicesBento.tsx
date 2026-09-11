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
            从商业视觉、端到端全端研发到企业级 AI 落地，提供高水准一站式数字化交付。
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: AI作图与IP设计 */}
          <div className="bento-card card-design">
            <div className="card-header">
              <div className="card-icon-wrapper theme-orange">
                <Palette size={34} strokeWidth={2.2} />
              </div>
              <div className="card-header-text">
                <h3 className="card-title">AI 商业作图 & IP 形象设计</h3>
                <p className="card-desc">
                  基于 ComfyUI 与特征锁定工作流，定制独一无二、角色高度一致的品牌吉祥物与商业级视觉。
                </p>
              </div>
            </div>

            <div className="card-body">
              <ul className="card-features">
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-orange" />
                  <span>3D 极客潮玩 / 盲盒风专属吉祥物设定</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-orange" />
                  <span>多姿态角色一致性三视图与业务表情包</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-orange" />
                  <span>4K 高清电商 KV 海报与商用透明图集</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-card-action btn-action-orange" onClick={onOpenContact}>
                <span>咨询 IP 设计方案</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2: 网站设计制作 */}
          <div className="bento-card card-web">
            <div className="card-header">
              <div className="card-icon-wrapper theme-blue">
                <Globe size={34} strokeWidth={2.2} />
              </div>
              <div className="card-header-text">
                <h3 className="card-title">高端响应式网站设计与制作</h3>
                <p className="card-desc">
                  兼顾视觉震撼与工程级性能。打造 60fps 顺滑交互、秒开的高端科技官网与营销落地页。
                </p>
              </div>
            </div>

            <div className="card-body">
              <ul className="card-features">
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-blue" />
                  <span>极具冲击力的现代科技感官网与产品落地页</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-blue" />
                  <span>Lighthouse 98+ 跑分与毫秒级首屏加载</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-blue" />
                  <span>全端断点自适应（手机 / iPad / 4K大屏）</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-card-action btn-action-blue" onClick={onOpenContact}>
                <span>定制专属高端官网</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 3: 小程序与 APP 制作 */}
          <div className="bento-card card-app">
            <div className="card-header">
              <div className="card-icon-wrapper theme-cyan">
                <Smartphone size={34} strokeWidth={2.2} />
              </div>
              <div className="card-header-text">
                <h3 className="card-title">微信小程序 & 移动 APP 制作</h3>
                <p className="card-desc">
                  深度契合移动端手势习惯。从交互原型到端到端研发，打造媲美原生的极致顺滑体验。
                </p>
              </div>
            </div>

            <div className="card-body">
              <ul className="card-features">
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-cyan" />
                  <span>微信原生高性能小程序（商城 / 预约 / 工具）</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-cyan" />
                  <span>微信支付、授权登录与消息订阅全链路闭环</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-cyan" />
                  <span>Flutter / React Native 双端跨平台移动 App</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-card-action btn-action-cyan" onClick={onOpenContact}>
                <span>评估小程序 / App 开发</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 4: AI应用落地与私有化部署 */}
          <div className="bento-card card-ai">
            <div className="card-header">
              <div className="card-icon-wrapper theme-purple">
                <Cpu size={34} strokeWidth={2.2} />
              </div>
              <div className="card-header-text">
                <h3 className="card-title">企业级 AI 应用落地 & 本地私有化</h3>
                <p className="card-desc">
                  不谈虚无概念，专注真实生产力。100% 局域网离线运行，帮企业建立自主可控的智能大脑。
                </p>
              </div>
            </div>

            <div className="card-body">
              <ul className="card-features">
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-purple" />
                  <span>企业私有 RAG 知识库（原页码精准溯源零幻觉）</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-purple" />
                  <span>7×24h 智能业务客服与企微/飞书工作流打通</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="feature-check icon-purple" />
                  <span>DeepSeek / 开源大模型机房私有化离线部署</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button className="btn-card-action btn-action-purple" onClick={onOpenContact}>
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

