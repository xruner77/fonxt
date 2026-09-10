import React, { useState, useEffect, useRef } from 'react';
import { aiPresets, AIPreset } from '../../config/ai-presets';
import { Send, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import './AIDemo.css';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  isTyping?: boolean;
  suggestedAction?: AIPreset['suggestedAction'];
}

interface AIDemoProps {
  onOpenContact: () => void;
}

export const AIDemo: React.FC<AIDemoProps> = ({ onOpenContact }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '你好！我是 FONXT 智能业务助手。你可以向我咨询任何关于「IP形象设计、网站/小程序开发、企业知识库与私有化大模型落地」的技术方案与周期报价。请选择下方常见问题，或直接输入你的构想！',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  // 严格的生命周期定时器防泄漏引用
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 销毁时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 打字机流式输出模拟
  const streamResponse = (fullText: string, suggestedAction?: AIPreset['suggestedAction']) => {
    const msgId = 'bot-' + Date.now();
    setIsAnswering(true);

    // 先插入空消息
    setMessages((prev) => [
      ...prev,
      {
        id: msgId,
        sender: 'assistant',
        text: '',
        isTyping: true,
      },
    ]);

    let currentIndex = 0;
    const chunkSize = 2; // 每次输出2个字，加速体感
    const speed = 25; // 25ms 间隔

    const typeNext = () => {
      currentIndex += chunkSize;
      const currentText = fullText.slice(0, currentIndex);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId ? { ...m, text: currentText } : m
        )
      );

      if (currentIndex < fullText.length) {
        timerRef.current = setTimeout(typeNext, speed);
      } else {
        // 完成输出
        setIsAnswering(false);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? { ...m, isTyping: false, text: fullText, suggestedAction }
              : m
          )
        );
      }
    };

    timerRef.current = setTimeout(typeNext, speed);
  };

  const handleSelectPreset = (preset: AIPreset) => {
    if (isAnswering) return;

    // 清理可能遗留的定时器
    if (timerRef.current) clearTimeout(timerRef.current);

    // 添加用户提问
    setMessages((prev) => [
      ...prev,
      {
        id: 'user-' + Date.now(),
        sender: 'user',
        text: preset.question,
      },
    ]);

    // 延迟 300ms 后由 AI 回答
    setTimeout(() => {
      streamResponse(preset.answer, preset.suggestedAction);
    }, 300);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isAnswering) return;

    const userText = inputValue.trim();
    setInputValue('');

    // 清理可能遗留的定时器
    if (timerRef.current) clearTimeout(timerRef.current);

    setMessages((prev) => [
      ...prev,
      {
        id: 'user-' + Date.now(),
        sender: 'user',
        text: userText,
      },
    ]);

    // 模糊匹配预设或通用智能回复
    const matched = aiPresets.find((p) =>
      userText.toLowerCase().includes(p.category.toLowerCase()) ||
      p.question.toLowerCase().includes(userText.toLowerCase())
    );

    const replyText = matched
      ? matched.answer
      : `感谢关于「${userText}」的提问！对于此类高度定制化场景，我通常会先为你梳理最轻量可落地的架构原型方案，确保在控制成本的前提下达到最优商业效果。欢迎点击下方按钮，直接与我微信交流沟通细节与排期！`;

    setTimeout(() => {
      streamResponse(replyText, {
        label: '与主理人微信详谈方案 ➔',
        actionType: 'contact',
      });
    }, 400);
  };

  const handleResetChat = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAnswering(false);
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: '对话已重置。我是 FONXT 智能业务助手，请随时提出你的项目疑问！',
      },
    ]);
  };

  return (
    <section id="ai-demo" className="section ai-demo-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} className="eyebrow-icon" />
            <span>LIVE INTERACTION · 现场真实体验</span>
          </div>
          <h2 className="section-title">FONXT 智能业务助手</h2>
          <p className="section-subtitle">
            无需等待，立即现场测试我们的 AI 应用对话能力。向 AI 架构师提问，体验真实的专业回复与交付方案评估。
          </p>
        </div>

        {/* Interactive Chat Console */}
        <div className="ai-demo-wrapper">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-assistant-info">
              <div className="assistant-avatar-wrap">
                <img 
                  src="/assets/personas/architect.jpg" 
                  alt="FONXT AI Architect" 
                  className="assistant-avatar-img"
                />
                <span className="assistant-online-indicator" title="在线" />
              </div>
              <div>
                <div className="assistant-name">
                  <span>FONXT Copilot</span>
                  <span className="chat-tag-pill">AI架构态</span>
                </div>
                <div className="assistant-status">7×24h 智能业务与架构咨询中</div>
              </div>
            </div>

            <button 
              className="btn-secondary" 
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              onClick={handleResetChat}
              title="重置对话"
            >
              <RefreshCw size={14} />
              <span>清空重置</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="chat-messages-container" ref={scrollContainerRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.text}
                  {msg.isTyping && <span className="typing-cursor" />}

                  {/* Contextual Action Button */}
                  {msg.suggestedAction && !msg.isTyping && (
                    <div>
                      <button 
                        className="message-action-btn"
                        onClick={onOpenContact}
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Preset Prompts Chips */}
          <div className="preset-chips-section">
            <div className="preset-title">
              <Sparkles size={13} style={{ color: 'var(--color-cyan)' }} />
              <span>快捷提问推荐（点击立即体验）：</span>
            </div>
            <div className="preset-chips">
              {aiPresets.map((preset) => (
                <button
                  key={preset.id}
                  className="chip-btn"
                  disabled={isAnswering}
                  onClick={() => handleSelectPreset(preset)}
                >
                  {preset.question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <form className="chat-input-bar" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder="输入你的业务疑问或需求（例如：做个电商小程序多少钱？）..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isAnswering}
            />
            <button
              type="submit"
              className="btn-chat-send"
              disabled={!inputValue.trim() || isAnswering}
              aria-label="发送消息"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
