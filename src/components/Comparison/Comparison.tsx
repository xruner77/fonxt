import React from 'react';
import { XCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import './Comparison.css';

export const Comparison: React.FC = () => {
  return (
    <section className="section comparison-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <ShieldCheck size={14} />
            <span>WHY FONXT · 为什么选择全栈超级个体</span>
          </div>
          <h2 className="section-title">告别传统外包痛点，享受极致交付</h2>
          <p className="section-subtitle">
            传统多层团队 vs FONXT 全链路数字化超级个体，体验从沟通到交付的跨越式飞跃。
          </p>
        </div>

        <div className="comparison-grid">
          {/* Traditional Agency */}
          <div className="comparison-card traditional">
            <div className="comp-header">
              <div className="comp-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                <XCircle size={24} />
              </div>
              <div>
                <h3 className="comp-title" style={{ color: '#fca5a5' }}>传统分工外包团队</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>层层流转 · 容易走样</span>
              </div>
            </div>

            <ul className="comp-list">
              <li className="comp-item">
                <XCircle size={18} style={{ color: '#ef4444' }} />
                <div className="comp-item-content">
                  <strong style={{ color: '#fca5a5' }}>沟通链条长、理解严重折损</strong>
                  <span>销售对客户、产品对设计、设计对前端、前端对后端，修改一个小需求反复开会。</span>
                </div>
              </li>
              <li className="comp-item">
                <XCircle size={18} style={{ color: '#ef4444' }} />
                <div className="comp-item-content">
                  <strong style={{ color: '#fca5a5' }}>周期拖延、费用层层加码</strong>
                  <span>多套人员闲置成本均摊在客户报价中，动辄数月周期且容易烂尾。</span>
                </div>
              </li>
              <li className="comp-item">
                <XCircle size={18} style={{ color: '#ef4444' }} />
                <div className="comp-item-content">
                  <strong style={{ color: '#fca5a5' }}>AI 能力停留在概念炒作</strong>
                  <span>缺乏真实大模型私有化部署、RAG 数据清洗与复杂工作流工程实战经验。</span>
                </div>
              </li>
              <li className="comp-item">
                <XCircle size={18} style={{ color: '#ef4444' }} />
                <div className="comp-item-content">
                  <strong style={{ color: '#fca5a5' }}>源码扣留与隐形消费</strong>
                  <span>不愿交付干净可读的源码，绑定高额按年维护费，客户失去掌控权。</span>
                </div>
              </li>
            </ul>
          </div>

          {/* FONXT Super Individual */}
          <div className="comparison-card fonxt">
            <div className="comp-header">
              <div className="comp-icon" style={{ background: 'rgba(0, 210, 255, 0.15)', color: 'var(--color-cyan)' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="comp-title" style={{ color: 'var(--color-cyan)' }}>FONXT 一人全链路</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-blue-light)' }}>三位一体 · 快速敏捷</span>
              </div>
            </div>

            <ul className="comp-list">
              <li className="comp-item">
                <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                <div className="comp-item-content">
                  <strong style={{ color: '#ffffff' }}>零损耗沟通，需求即刻落地</strong>
                  <span>设计与代码一人贯通。你说的每一个商业细节直接在指尖转化为精准像素与架构。</span>
                </div>
              </li>
              <li className="comp-item">
                <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                <div className="comp-item-content">
                  <strong style={{ color: '#ffffff' }}>周期缩短 60%，极高性价比</strong>
                  <span>AI 提效工具流无缝赋能，通常 3~10 天完成上线，没有繁杂管理损耗，费用更透明。</span>
                </div>
              </li>
              <li className="comp-item">
                <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                <div className="comp-item-content">
                  <strong style={{ color: '#ffffff' }}>深度工程化 AI 落地实力</strong>
                  <span>真正在内网私有化落地 DeepSeek、企业 RAG 知识库与智能客服闭环，安全可控。</span>
                </div>
              </li>
              <li className="comp-item">
                <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                <div className="comp-item-content">
                  <strong style={{ color: '#ffffff' }}>100% 完整资产交付与质保</strong>
                  <span>交付全部 Git 源码、Figma 设计稿与模型配置，客户拥有 100% 自主知识产权。</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
