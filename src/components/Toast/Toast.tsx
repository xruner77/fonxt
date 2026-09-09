import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Toast.css';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-message">
        <CheckCircle2 size={18} style={{ color: 'var(--color-cyan)' }} />
        <span>{message}</span>
      </div>
    </div>
  );
};
