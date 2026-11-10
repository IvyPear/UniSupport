import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Role } from '../../types';
import {
  Bell,
  CheckCheck,
  ChevronDown,
  GraduationCap,
  LogOut,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Clock,
  Globe,
  Share2,
  Users,
  Layers,
  ShieldAlert,
  LayoutDashboard,
  ClipboardList,
  Settings,
  Inbox,
  History,
  FileText,
  Plus,
  Shield,
  UserCheck,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    users,
    quickLoginAs,
    logout,
    notifications,
    unreadNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    activeTab,
    navigate,
    resetAllData,
    tickets,
  } = useApp();

  const { t, language } = useLanguage();

  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifPopover(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowRoleSwitcher(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) return null;

  // Filter notifications for current user/role
  const userNotifications = notifications.filter((n) => {
    if (n.recipientUserId && n.recipientUserId === currentUser.id) return true;
    if (n.recipientRole && n.recipientRole === currentUser.role) {
      if (n.recipientDepartmentId) {
        return n.recipientDepartmentId === currentUser.departmentId;
      }
      return true;
    }
    return false;
  });

  const getRoleConfig = (role: Role) => {
    switch (role) {
      case 'student':
        return { label: t('role_student'), ring: 'ring-emerald-400', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'staff':
        return { label: t('role_staff'), ring: 'ring-blue-400', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'manager':
        return { label: t('role_manager'), ring: 'ring-indigo-400', badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'admin':
        return { label: t('role_admin'), ring: 'ring-purple-400', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' };
    }
  };

  const handleNotificationClick = (notifId: string, ticketId: string, targetScreen: string) => {
    markNotificationRead(notifId);
    setShowNotifPopover(false);

    if (currentUser.role === 'student') {
      navigate('student-tickets', ticketId);
    } else if (currentUser.role === 'staff') {
      navigate('staff-inbox', ticketId);
    } else if (currentUser.role === 'manager') {
      navigate('manager-tickets', ticketId);
    } else if (currentUser.role === 'admin') {
      navigate('admin-dispatch', ticketId);
    }
  };

  const roleConfig = getRoleConfig(currentUser.role);

  // Modern sleek navigation tabs
  const navTabs = useMemo(() => {
    if (!currentUser) return [];

    if (currentUser.role === 'admin') {
      const dispatchBadge = tickets.filter(
        (t) => (t.isOtherCategory && t.status === 'new') || t.isWrongDepartment
      ).length;

      return [
        { id: 'admin-dashboard', label: t('nav_overview'), icon: Globe },
        { id: 'admin-dispatch', label: t('nav_dispatch'), icon: Share2, badge: dispatchBadge },
        { id: 'admin-users', label: t('nav_users'), icon: Users },
        { id: 'admin-categories', label: t('nav_school_categories'), icon: Layers },
        { id: 'admin-roles', label: t('nav_roles_permissions'), icon: ShieldAlert },
      ];
    }

    if (currentUser.role === 'manager') {
      const myDeptTickets = tickets.filter((t) => t.departmentId === currentUser.departmentId);
      const overdueBadge = myDeptTickets.filter((t) => t.isOverdue).length;

      return [
        { id: 'manager-dashboard', label: t('nav_overview'), icon: LayoutDashboard },
        { id: 'manager-tickets', label: t('nav_processing_time'), icon: ClipboardList, badge: overdueBadge },
        { id: 'manager-performance', label: t('nav_staff_progress'), icon: Users },
        { id: 'manager-categories', label: t('nav_categories'), icon: Settings },
      ];
    }

    if (currentUser.role === 'staff') {
      const unclaimedBadge = tickets.filter(
        (t) => t.departmentId === currentUser.departmentId && t.status === 'new' && !t.assigneeId
      ).length;

      return [
        { id: 'staff-inbox', label: t('nav_inbox'), icon: Inbox, badge: unclaimedBadge },
        { id: 'staff-history', label: t('nav_history_reviews'), icon: History },
      ];
    }

    if (currentUser.role === 'student') {
      return [
        { id: 'student-tickets', label: t('nav_my_requests'), icon: FileText },
        { id: 'student-create', label: t('nav_create_request'), icon: Plus },
      ];
    }

    return [];
  }, [currentUser, tickets, language]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
      <div className="h-0.5 w-full bg-gradient-to-r from-[#9ec7e3] via-[#6ebbd9] to-[#2b84ab]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* 1. Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6ebbd9] to-[#2b84ab] flex items-center justify-center text-white shadow-sm shadow-[#6ebbd9]/30">
              <GraduationCap size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 tracking-tight">
                  {t('app_name')}
                </span>
                <span className="hidden sm:inline text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {t('app_subtitle')}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                {t('app_desc')}
              </p>
            </div>
          </div>

          {/* 2. Middle Navigation Tabs (Sleek Segmented Nav) */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/70 text-xs shadow-inner">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.id, null)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-rose-500 text-white shadow-2xs leading-none">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Right Actions: Language Switcher, Bell & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher (VI / EN) */}
            <LanguageToggle />

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifPopover(!showNotifPopover)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                title="Thông báo"
              >
                <div className="relative inline-flex items-center justify-center">
                  <Bell size={18} />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 bg-rose-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center ring-1.5 ring-white shadow-xs leading-none animate-in zoom-in-50">
                      {unreadNotifications.length > 99 ? '99+' : unreadNotifications.length}
                    </span>
                  )}
                </div>
              </button>

              {/* Notification Popover */}
              {showNotifPopover && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{t('notifications')}</span>
                      {unreadNotifications.length > 0 && (
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                          {unreadNotifications.length} {t('notifications_new')}
                        </span>
                      )}
                    </div>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-slate-500 hover:text-blue-600 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <CheckCheck size={14} />
                        <span>{t('notifications_mark_all')}</span>
                      </button>
                    )}
                  </div>

                  <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
                    {userNotifications.length === 0 ? (
                      <div className="p-10 text-center text-slate-400">
                        <Bell size={28} className="mx-auto mb-2 opacity-40 text-slate-500" />
                        <p className="text-xs font-medium">{t('notifications_empty')}</p>
                      </div>
                    ) : (
                      userNotifications.map((notif) => (
                        <button
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif.id, notif.ticketId, notif.targetScreen)}
                          className={`w-full text-left p-3.5 transition-colors flex gap-3 items-start hover:bg-slate-50 ${
                            !notif.isRead ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center mt-0.5 ${
                              notif.type === 'wrong_department'
                                ? 'bg-rose-100 text-rose-700'
                                : notif.type === 'sla_breached'
                                ? 'bg-amber-100 text-amber-700'
                                : notif.type === 'ticket_resolved'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {notif.type === 'wrong_department' ? (
                              <AlertCircle size={15} />
                            ) : notif.type === 'sla_breached' ? (
                              <Clock size={15} />
                            ) : notif.type === 'ticket_resolved' ? (
                              <Sparkles size={15} />
                            ) : (
                              <Bell size={15} />
                            )}
                          </div>
                          <div className="grow min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900 truncate">{notif.title}</span>
                              {!notif.isRead && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">{notif.message}</p>
                            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400 font-mono">
                              <span className="font-semibold text-slate-500">#{notif.ticketCode}</span>
                              <span>·</span>
                              <span>
                                {new Date(notif.createdAt).toLocaleTimeString('vi-VN', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Role Switcher */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-left shadow-2xs cursor-pointer"
                title="Đổi vai trò người dùng"
              >
                <div className={`w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 ring-2 ${roleConfig.ring}`}>
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[110px] leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <span className="font-mono text-slate-600 font-semibold">{currentUser.code}</span>
                    <span>·</span>
                    <span>{roleConfig.label}</span>
                  </div>
                </div>
                <ChevronDown size={14} className="text-slate-400 shrink-0" />
              </button>

              {/* Role Switcher Menu */}
              {showRoleSwitcher && (
                <div className="absolute right-0 mt-3 w-76 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {t('switch_role')}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {t('switch_role_desc')}
                    </div>
                  </div>

                  <div className="space-y-1">
                    {users.filter(u => u.status === 'active').map((u) => {
                      const isSelected = u.id === currentUser.id;
                      const uConf = getRoleConfig(u.role);
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            quickLoginAs(u);
                            setShowRoleSwitcher(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/80 text-blue-900 font-semibold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 border bg-slate-100 flex items-center justify-center font-bold text-xs ring-2 ${uConf.ring}`}>
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                            ) : (
                              u.name.charAt(0)
                            )}
                          </div>
                          <div className="grow min-w-0">
                            <div className="text-xs font-bold truncate flex items-center justify-between">
                              <span>{u.name}</span>
                              <span className="font-mono text-[10px] text-slate-400 font-normal">{u.code}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate mt-0.5">
                              {uConf.label} {u.departmentName ? `· ${u.departmentName}` : ''}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2.5 mt-1.5 border-t border-slate-100 flex items-center justify-between px-2">
                    <button
                      onClick={() => {
                        if (window.confirm('Khôi phục toàn bộ dữ liệu mẫu ban đầu?')) {
                          resetAllData();
                          setShowRoleSwitcher(false);
                        }
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 font-medium py-1 transition-colors"
                    >
                      <RotateCcw size={13} />
                      <span>{t('reset_data')}</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowRoleSwitcher(false);
                      }}
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 py-1 transition-colors"
                    >
                      <LogOut size={13} />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden py-2 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1.5 text-xs">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.id, null)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-rose-500 text-white leading-none">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
