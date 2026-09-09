import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import './Workflow.css';

export const Workflow: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: '深度需求诊断与边界确认',
      desc: '沟通核心目标、目标受众与功能边界。梳理原型脑图与技术栈方案，出具透明的排期与一口价报价单，杜绝后期扯皮。',
      deliverable: '《项目需求范围与排期清单》',
    },
    {
      num: '02',
      title: '视觉方案与高保真原型定稿',
      desc: '输出核心界面交互原型与视觉风格提案，或 IP 角色概念图/三视图。与您进行关键节点评审，确认满意后再启动研发。',
      deliverable: '高保真 UI 原型 / IP 三视图',
    },
    {
      num: '03',
      title: '全栈敏捷研发与 AI 调优',
      desc: '一人贯通前后端、数据库与 AI 提示词/模型微调。搭建实时在线测试环境，随时可查看最新进度与功能试用。',
      deliverable: '可交互体验的测试环境',
    },
    {
      num: '04',
      title: '私有化部署与资产终身交付',
      desc: '协助将系统正式部署到您的服务器或应用市场。100% 移交全套 Git 源码、设计源文件与知识库配置，并附赠质保与操作手册。',
      deliverable: '100% 源码资产 + 免费维保',
    },
  ];

  return (
    <section id="workflow" className="section workflow-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>PROCESS & METHODOLOGY · 标准交付流程</span>
          </div>
          <h2 className="section-title">规范透明的 4 步交付闭环</h2>
          <p className="section-subtitle">
            拒绝盲盒交付与烂尾风险。每个阶段均有可量化、可验证的明确里程碑成果。
          </p>
        </div>

        <div className="workflow-steps">
          {steps.map((step) => (
            <div key={step.num} className="step-card">
              <div className="step-number">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              <div className="step-deliverable">
                <CheckCircle2 size={15} />
                <span>产出: {step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
