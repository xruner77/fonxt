import React from 'react';
import { AIDemo } from '../components/AIDemo/AIDemo';
import { ChevronRight, Sparkles, MessageSquare, ShieldCheck, Cpu, Database } from 'lucide-react';
import './PageBanner.css';

interface AIDemoPageProps {
  onOpenContact: () => void;
}

export const AIDemoPage: React.FC<AIDemoPageProps> = ({ onOpenContact }) => {
  return (
    <div className="ai-demo-page-wrap">
      {/* 独立页面头部与面包屑 */}
      <header className="standalone-page-header">
        <div className="container">
          <nav className="page-breadcrumbs" aria-label="Breadcrumb">
            <a href="./index.html">首页</a>
            <ChevronRight size={14} />
            <span className="page-breadcrumbs-current">AI 交互体验</span>
          </nav>

          <div className="page-header-title-wrap">
            <h1 className="page-header-title">
              <Sparkles size={28} className="text-primary" />
              <span>现场可交互 AI 业务助手体验区</span>
            </h1>
            <p className="page-header-subtitle">
              现场体验基于真实业务知识库调优的大模型交互效果。支持本地私有化算力部署、多轮对话引导、数据安全隔离与企业微信/飞书双向集成。
            </p>
          </div>
        </div>
      </header>

      {/* 现场交互体验核心组件 */}
      <AIDemo onOpenContact={onOpenContact} />

      {/* 企业私有化三大保障看板 */}
      <section className="section" style={{ paddingTop: '16px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            <div className="bento-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '10px', borderRadius: '10px', color: '#2563eb' }}>
                  <ShieldCheck size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: 0 }}>商业级数据绝对安全</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                核心商业知识库与对话记录均落盘于企业自备服务器或局域网私有节点，绝无对外泄露与模型再训练风险。
              </p>
            </div>

            <div className="bento-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '10px', borderRadius: '10px', color: '#7c3aed' }}>
                  <Cpu size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: 0 }}>混合算力深度适配</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                支持 DeepSeek-R1 / V3、Qwen、Ollama 等开源架构无缝混合调度，根据响应要求自适应选择本地轻量或云端高算力。
              </p>
            </div>

            <div className="bento-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(5, 150, 105, 0.1)', padding: '10px', borderRadius: '10px', color: '#059669' }}>
                  <Database size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: 0 }}>高精度向量切片与混合检索</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                支持 PDF、Word、Excel 及接口实时同步，内置 BM25 + 向量重排序（Rerank），问答召回准确率超 98.5%。
              </p>
            </div>
          </div>

          {/* 转化卡片 */}
          <div className="case-conversion-banner">
            <div className="conversion-left">
              <h3>需要定制企业专属 AI 智能体？</h3>
              <p>
                我们提供从需求评估、知识库清洗切片、模型量化微调到最终私有化上线的全交钥匙落地服务。
              </p>
            </div>
            <div className="conversion-actions">
              <button className="btn-contact-primary" onClick={onOpenContact}>
                <MessageSquare size={18} />
                <span>立即预约技术演示</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
