import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageToggleProps {
  compact?: boolean;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-0.5 sm:p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 text-xs shadow-2xs font-semibold select-none ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLanguage('vi')}
        className={`px-2.5 py-1 rounded-lg text-xs tracking-wider transition-all cursor-pointer font-bold ${
          language === 'vi'
            ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200/60'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/40'
        }`}
        title="Tiếng Việt (VN)"
      >
        VN
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg text-xs tracking-wider transition-all cursor-pointer font-bold ${
          language === 'en'
            ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200/60'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/40'
        }`}
        title="English (EN)"
      >
        EN
      </button>
    </div>
  );
};
