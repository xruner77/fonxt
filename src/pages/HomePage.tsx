import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { ServicesBento } from '../components/Services/ServicesBento';
import { AIDemo } from '../components/AIDemo/AIDemo';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Workflow } from '../components/Workflow/Workflow';
import { Comparison } from '../components/Comparison/Comparison';
import { FAQ } from '../components/FAQ/FAQ';

interface HomePageProps {
  onOpenContact: () => void;
  onSelectCase?: (caseId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContact, onSelectCase }) => {
  return (
    <>
      {/* 1. 首屏与多角色定制切片 */}
      <Hero onOpenContact={onOpenContact} />

      {/* 2. Bento Grid 商业级服务能力矩阵 */}
      <ServicesBento onOpenContact={onOpenContact} />

      {/* 3. 现场可交互 AI 业务助手体验区 */}
      <AIDemo onOpenContact={onOpenContact} />

      {/* 4. 精选案例画廊 */}
      <Portfolio onOpenContact={onOpenContact} onSelectCase={onSelectCase} />

      {/* 5. 5步标准化交付流程 */}
      <Workflow />

      {/* 6. 超级个体 vs 传统外包核心优势对比 */}
      <Comparison />

      {/* 7. 常见问题解答与客户答疑 */}
      <FAQ />
    </>
  );
};
