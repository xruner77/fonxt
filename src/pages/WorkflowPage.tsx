import React from 'react';
import { Workflow } from '../components/Workflow/Workflow';
import { Comparison } from '../components/Comparison/Comparison';
import { ChevronRight, GitCommit, MessageSquare } from 'lucide-react';
import './PageBanner.css';

interface WorkflowPageProps {
  onOpenContact: () => void;
}

export const WorkflowPage: React.FC<WorkflowPageProps> = ({ onOpenContact }) => {
  return (
    <div className="workflow-page-wrap">
      {/* 独立页面头部与面包屑 */}
      <header className="standalone-page-header">
        <div className="container">
          <nav className="page-breadcrumbs" aria-label="Breadcrumb">
            <a href="./index.html">首页</a>
            <ChevronRight size={14} />
            <span className="page-breadcrumbs-current">交付流程</span>
          </nav>

          <div className="page-header-title-wrap">
            <h1 className="page-header-title">
              <GitCommit size={28} className="text-primary" />
              <span>标准化交付流程与保障机制</span>
            </h1>
            <p className="page-header-subtitle">
              告别传统外包“层层转包、信息衰减、进度失控”的顽疾。主理人直接负责全流程架构与编码，敏捷高效、源码 100% 交割。
            </p>
          </div>
        </div>
      </header>

      {/* 5步标准化交付流程 */}
      <Workflow />

      {/* 超级个体优势对比 */}
      <Comparison />

      {/* 页面底部行动召唤卡片 */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="case-conversion-banner" style={{ marginTop: 0 }}>
            <div className="conversion-left">
              <h3>已有初步想法？让我们聊聊排期与实现路径</h3>
              <p>
                免费提供架构选型咨询、排期评估及需求文档框架梳理，最快当天出具技术评估方案。
              </p>
            </div>
            <div className="conversion-actions">
              <button className="btn-contact-primary" onClick={onOpenContact}>
                <MessageSquare size={18} />
                <span>微信预约沟通</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
