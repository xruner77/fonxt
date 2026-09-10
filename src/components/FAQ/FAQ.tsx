import React, { useState } from 'react';
import { faqData } from '../../config/faq';
import { HelpCircle, ChevronDown } from 'lucide-react';
import './FAQ.css';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            <HelpCircle size={14} className="eyebrow-icon" />
            <span>FAQ · 常见问题解答</span>
          </div>
          <h2 className="section-title">解决你的每一个合作顾虑</h2>
          <p className="section-subtitle">
            关于源码归属、交付周期、付款模式与 AI 私有化安全保障，你想了解的都在这里。
          </p>
        </div>

        <div className="faq-container">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-left">
                    <span className="faq-category-pill">{item.category}</span>
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown size={18} className="faq-chevron" />
                </button>

                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
