import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { AlertOctagon, LogIn } from 'lucide-react';

export const SessionInvalidModal: React.FC = () => {
  const { sessionInvalid, clearSessionInvalid } = useApp();
  const { t } = useLanguage();

  if (!sessionInvalid) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200 animate-in zoom-in-95">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertOctagon size={26} />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          {t('session_invalid_title')}
        </h3>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          {t('session_invalid_desc')}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {t('session_invalid_sub')}
        </p>

        <div className="mt-6">
          <button
            onClick={clearSessionInvalid}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <LogIn size={15} />
            <span>{t('btn_back_to_login')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
