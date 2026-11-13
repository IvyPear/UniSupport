import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../common/LanguageToggle';
import {
  GraduationCap,
  Eye,
  EyeOff,
  AlertTriangle,
  Info,
  Shield,
  User,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, quickLoginAs, users, loginAttempts } = useApp();
  const { t } = useLanguage();

  const [code, setCode] = useState('20260101');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockCountdown, setLockCountdown] = useState<number>(0);
  const [showAdminResetModal, setShowAdminResetModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminResetSuccess, setAdminResetSuccess] = useState(false);

  // Synchronize lock countdown
  useEffect(() => {
    if (!loginAttempts.lockUntil) {
      setLockCountdown(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.ceil((loginAttempts.lockUntil! - now) / 1000);
      if (diff <= 0) {
        setLockCountdown(0);
      } else {
        setLockCountdown(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [loginAttempts.lockUntil]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = login(code, password);
    if (!result.success) {
      setErrorMessage(result.message || 'Đăng nhập không thành công.');
    }
  };

  const isLockedOut = lockCountdown > 0;

  return (
    <div className="grow bg-radial from-[#9ec7e3]/15 via-[#f0f6fa] to-[#f0f6fa] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Top Language Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-10">
        <LanguageToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6ebbd9] to-[#2b84ab] flex items-center justify-center text-white shadow-lg shadow-[#6ebbd9]/30 ring-8 ring-blue-50">
          <GraduationCap size={32} className="stroke-[2.2]" />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
          {t('login_heading')}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {t('login_subheading')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-200">
          {/* Lockout Warning Banner */}
          {isLockedOut && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900 animate-in fade-in">
              <AlertTriangle size={20} className="text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold">{t('login_lockout_title')}</h4>
                <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                  {t('login_lockout_desc')}
                </p>
                <div className="mt-2 text-sm font-bold font-mono text-rose-800">
                  {t('login_lockout_time')} {Math.floor(lockCountdown / 60)} {t('login_lockout_minutes')} {lockCountdown % 60} {t('login_lockout_seconds')}
                </div>
              </div>
            </div>
          )}

          {/* Standard Error Message */}
          {errorMessage && !isLockedOut && (
            <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5 text-xs animate-in fade-in">
              <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t('login_code_label')}
              </label>
              <div className="mt-1.5 relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={17} />
                </div>
                <input
                  type="text"
                  required
                  disabled={isLockedOut}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={t('login_code_placeholder')}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t('login_pass_label')}
              </label>
              <div className="mt-1.5 relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLockedOut}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login_pass_placeholder')}
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLockedOut}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6ebbd9] to-[#2b84ab] hover:from-[#5eabc9] hover:to-[#247396] shadow-md shadow-[#6ebbd9]/25 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <span>{t('btn_login')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          {/* Quy định về Đăng ký & Quên mật khẩu theo đặc tả UX */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed flex items-start gap-2">
              <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>{t('login_notice_title')}</strong> {t('login_notice_desc')}
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowAdminResetModal(true)}
                className="text-[11px] text-slate-500 hover:text-blue-600 underline font-medium transition-colors cursor-pointer"
              >
                {t('login_recover_admin')}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Demo Personas - For Seamless Multi-Role Testing */}
        <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2.5">
            <Sparkles size={14} className="text-blue-600" />
            <span>{t('login_quick_roles_title')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {users
              .filter((u) => u.status === 'active')
              .slice(0, 4)
              .map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    setCode(u.code);
                    setPassword('123456');
                    quickLoginAs(u);
                  }}
                  className="p-2 text-left rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-xs cursor-pointer"
                >
                  <div className="font-semibold text-slate-900 truncate">{u.name}</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                    {u.role === 'student'
                      ? t('role_student')
                      : u.role === 'staff'
                      ? t('role_staff')
                      : u.role === 'manager'
                      ? t('role_manager')
                      : t('role_admin')}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Admin Password Recovery Modal */}
      {showAdminResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-2">
              <Shield size={18} />
              <span>{t('login_admin_modal_title')}</span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {t('login_admin_modal_desc')}
            </p>

            {adminResetSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs">
                {t('login_admin_code_sent')} <strong>{adminEmail}</strong>. {t('login_admin_check_inbox')}
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin.support@university.edu.vn"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setAdminResetSuccess(true)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 cursor-pointer"
                >
                  {t('login_btn_send_code')}
                </button>
              </div>
            )}

            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => {
                  setShowAdminResetModal(false);
                  setAdminResetSuccess(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1 cursor-pointer"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
