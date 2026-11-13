import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">{t('app_name')}</span>
          <span>·</span>
          <span>{t('app_desc')}</span>
        </div>
        <div className="text-slate-400">
          {t('app_footer').replace('{year}', String(new Date().getFullYear()))}
        </div>
      </div>
    </footer>
  );
};
