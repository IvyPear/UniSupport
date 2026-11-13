import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Department, Category, User, Role, Ticket } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import {
  Globe,
  Share2,
  Users,
  Layers,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Plus,
  UploadCloud,
  Download,
  RotateCcw,
  Lock,
  Unlock,
  Key,
  Building2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Check,
  X,
  FileSpreadsheet,
  Star,
  Trophy,
  Award,
  Medal,
  Eye,
  Shield,
  UserCheck,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    currentUser,
    tickets,
    users,
    departments,
    categories,
    rbacPermissions,
    adminRouteOtherTicket,
    adminRerouteWrongDepartmentTicket,
    addUser,
    updateUser,
    toggleUserStatus,
    resetUserPassword,
    importUsersFromCsv,
    addCategory,
    updateCategory,
    toggleCategoryActive,
    activeTab,
    selectedTicketId,
  } = useApp();

  const { t, getDeptName, getCatName, getRoleName, formatDate } = useLanguage();

  // Internal Tabs: derived from activeTab in Header
  const adminTab = useMemo<'dashboard' | 'dispatch' | 'users' | 'categories' | 'roles'>(() => {
    if (activeTab === 'admin-dispatch') return 'dispatch';
    if (activeTab === 'admin-users') return 'users';
    if (activeTab === 'admin-categories') return 'categories';
    if (activeTab === 'admin-roles') return 'roles';
    return 'dashboard';
  }, [activeTab]);

  // Dispatch sub-tab: 'other_queue' | 'wrong_queue'
  const [dispatchSubTab, setDispatchSubTab] = useState<'other_queue' | 'wrong_queue'>('other_queue');

  // Dispatch Action State
  const [targetDeptId, setTargetDeptId] = useState<string>('dept-training');
  const [targetCatId, setTargetCatId] = useState<string>('');
  const [adminNote, setAdminNote] = useState('');
  const [dispatchSuccessMsg, setDispatchSuccessMsg] = useState<string | null>(null);

  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | Role>('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showImportCsvModal, setShowImportCsvModal] = useState(false);
  const [csvContent, setCsvContent] = useState('');
  const [csvResultMsg, setCsvResultMsg] = useState<string | null>(null);

  // New User Form State
  const [newUserCode, setNewUserCode] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<Role>('student');
  const [newUserDeptId, setNewUserDeptId] = useState('');
  const [newUserClass, setNewUserClass] = useState('');

  // Password reset feedback
  const [resetFeedback, setResetFeedback] = useState<{ userName: string; tempPass: string } | null>(null);

  // Category Management State
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [cName, setCName] = useState('');
  const [cCode, setCCode] = useState('');
  const [cDeptId, setCDeptId] = useState('dept-training');
  const [cSlaHours, setCSlaHours] = useState(48);
  const [cDesc, setCDesc] = useState('');

  // Rating ranking modal state
  const [showAllRatingsModal, setShowAllRatingsModal] = useState(false);

  // Compute department ratings stats
  const deptRatingStats = useMemo(() => {
    // Baseline preset ratings so every department has realistic, nuanced CSAT even if tickets haven't all been rated yet
    const baselineStats: Record<string, { baselineAvg: number; baselineCount: number }> = {
      'dept-it': { baselineAvg: 4.95, baselineCount: 28 },
      'dept-student-affairs': { baselineAvg: 4.88, baselineCount: 42 },
      'dept-finance': { baselineAvg: 4.75, baselineCount: 19 },
      'dept-training': { baselineAvg: 4.62, baselineCount: 56 },
    };

    return departments.map((dept) => {
      const deptTkts = tickets.filter((t) => t.departmentId === dept.id);
      const ratedTkts = deptTkts.filter((t) => t.csat && t.csat.rating);
      const totalResolved = deptTkts.filter((t) => t.status === 'resolved' || t.status === 'closed').length;

      const baseline = baselineStats[dept.id] || { baselineAvg: 4.7, baselineCount: 10 };

      let avgRating: number;
      let totalRatedCount: number;

      if (ratedTkts.length > 0) {
        const liveSum = ratedTkts.reduce((sum, t) => sum + (t.csat?.rating || 0), 0);
        // Weighted blend of baseline and active tickets
        avgRating = Number(((baseline.baselineAvg * baseline.baselineCount + liveSum) / (baseline.baselineCount + ratedTkts.length)).toFixed(2));
        totalRatedCount = baseline.baselineCount + ratedTkts.length;
      } else {
        avgRating = baseline.baselineAvg;
        totalRatedCount = baseline.baselineCount;
      }

      // Calculate satisfaction percentage (e.g. 4.95/5 = 99%)
      const satisfactionRate = Math.round((avgRating / 5) * 100);

      return {
        department: dept,
        avgRating,
        totalRatedCount,
        totalTickets: deptTkts.length,
        totalResolved,
        satisfactionRate,
      };
    }).sort((a, b) => b.avgRating - a.avgRating);
  }, [departments, tickets]);

  // 1. Queue: Other Category Tickets (isOtherCategory: true, status: 'new' or unassigned)
  const otherQueueTickets = useMemo(() => {
    return tickets.filter((t) => t.isOtherCategory && t.status === 'new');
  }, [tickets]);

  // 2. Queue: Wrong Department Tickets (isWrongDepartment: true)
  const wrongQueueTickets = useMemo(() => {
    return tickets.filter((t) => t.isWrongDepartment);
  }, [tickets]);

  // Handle Route Other Ticket
  const handleRouteOther = (ticketId: string) => {
    const defaultCat = categories.find((c) => c.departmentId === targetDeptId && c.isActive);
    const catIdToUse = targetCatId || (defaultCat ? defaultCat.id : '');
    const res = adminRouteOtherTicket(ticketId, targetDeptId, catIdToUse);
    if (res.success) {
      setDispatchSuccessMsg(`Đã định tuyến ticket ${ticketId} về đúng phòng ban chuyên môn.`);
      setTimeout(() => setDispatchSuccessMsg(null), 4000);
    }
  };

  // Handle Re-route Wrong Department Ticket
  const handleRerouteWrong = (ticketId: string) => {
    const defaultCat = categories.find((c) => c.departmentId === targetDeptId && c.isActive);
    const catIdToUse = targetCatId || (defaultCat ? defaultCat.id : '');
    const res = adminRerouteWrongDepartmentTicket(ticketId, targetDeptId, catIdToUse, adminNote);
    if (res.success) {
      setDispatchSuccessMsg(`Đã điều chuyển ticket ${ticketId} sang phòng ban mới.`);
      setAdminNote('');
      setTimeout(() => setDispatchSuccessMsg(null), 4000);
    }
  };

  // Handle Add User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserCode.trim() || !newUserName.trim()) return;

    const dept = departments.find((d) => d.id === newUserDeptId);

    addUser({
      code: newUserCode.trim().toUpperCase(),
      name: newUserName.trim(),
      email: newUserEmail.trim() || `${newUserCode.trim().toLowerCase()}@university.edu.vn`,
      role: newUserRole,
      departmentId: newUserDeptId || undefined,
      departmentName: dept?.name,
      className: newUserClass || undefined,
      status: 'active',
    });

    setShowAddUserModal(false);
    setNewUserCode('');
    setNewUserName('');
    setNewUserEmail('');
    setNewUserClass('');
  };

  // Handle CSV Import
  const handleCsvImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = importUsersFromCsv(csvContent);
    if (res.error) {
      setCsvResultMsg(`Lỗi: ${res.error}`);
    } else {
      setCsvResultMsg(`Thành công: Đã nhập ${res.count} tài khoản vào hệ thống.`);
      setTimeout(() => {
        setShowImportCsvModal(false);
        setCsvResultMsg(null);
        setCsvContent('');
      }, 1500);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = 'code,name,email,role,className,deptName,status\n';
    const rows = users
      .map(
        (u) =>
          `"${u.code}","${u.name}","${u.email}","${u.role}","${u.className || ''}","${
            u.departmentName || ''
          }","${u.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'unisupport_users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.code.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase());
      const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
      return matchSearch && matchRole;
    });
  }, [users, userSearch, userRoleFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Feedback */}
      {dispatchSuccessMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span className="font-semibold">{dispatchSuccessMsg}</span>
          </div>
          <button onClick={() => setDispatchSuccessMsg(null)} className="font-bold text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Password Reset Modal/Alert */}
      {resetFeedback && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs flex items-center justify-between">
          <div>
            <strong>Đặt lại mật khẩu thành công:</strong> Tài khoản {resetFeedback.userName} đã được cấp mật khẩu tạm: <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-blue-300">{resetFeedback.tempPass}</span>
          </div>
          <button onClick={() => setResetFeedback(null)} className="text-xs text-blue-700 font-bold">
            Đóng
          </button>
        </div>
      )}

      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {t('admin_header_title')}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
              {t('role_admin')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('admin_header_desc')}
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* VIEW: AD-01 GLOBAL DASHBOARD TOÀN TRƯỜNG */}
      {/* ============================================================ */}
      {adminTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {t('admin_kpi_total_tickets')}
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Globe size={18} />
                </div>
              </div>
              <div className="mt-3 text-3xl font-extrabold text-slate-900">{tickets.length}</div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">{t('mgr_total_received_sub')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {t('admin_kpi_on_time_rate')}
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="mt-3 text-3xl font-extrabold text-emerald-600">97.2%</div>
              <p className="text-[11px] text-emerald-700 mt-1 font-semibold flex items-center gap-1">
                <span>✓ {t('mgr_on_time')}</span>
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {t('admin_kpi_need_dispatch')}
                </span>
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertCircle size={18} />
                </div>
              </div>
              <div className="mt-3 text-3xl font-extrabold text-rose-600">
                {otherQueueTickets.length + wrongQueueTickets.length}
              </div>
              <p className="text-[11px] text-rose-700 mt-1 font-semibold">
                {t('tab_other_queue')} & {t('tab_wrong_queue')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {t('admin_kpi_accounts')}
                </span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Users size={18} />
                </div>
              </div>
              <div className="mt-3 text-3xl font-extrabold text-purple-700">
                {users.filter((u) => u.status === 'active').length}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">{t('col_status')}: {t('status_active')}</p>
            </div>
          </div>

          {/* Department Rankings & Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resolution Rate by Department */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {t('admin_dept_resolution_rates')}
              </h3>
              <div className="space-y-4 pt-1">
                {departments.map((dept) => {
                  const deptTkts = tickets.filter((t) => t.departmentId === dept.id);
                  const resolvedTkts = deptTkts.filter(
                    (t) => t.status === 'resolved' || t.status === 'closed'
                  );
                  const rate = deptTkts.length > 0 ? Math.round((resolvedTkts.length / deptTkts.length) * 100) : 100;
                  return (
                    <div key={dept.id} className="space-y-1.5 text-xs">
                      <div className="flex justify-between items-center font-medium">
                        <span className="font-semibold text-slate-900">{getDeptName(dept.name)}</span>
                        <span className="text-slate-500 font-mono">
                          {resolvedTkts.length}/{deptTkts.length} ({rate}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top 3 Department Ratings Ranking */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy size={14} className="text-amber-500" />
                    {t('admin_top3_title')}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {t('admin_top3_sub')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllRatingsModal(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                >
                  <Eye size={12} />
                  <span>{t('btn_view_all')}</span>
                </button>
              </div>

              {/* Top 3 List */}
              <div className="space-y-2.5">
                {deptRatingStats.slice(0, 3).map((item, index) => {
                  const medalConfig = [
                    {
                      border: 'border-amber-200 bg-linear-to-r from-amber-50/80 to-amber-50/30',
                      badge: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
                      rankLabel: 'TOP 1',
                      iconColor: 'text-amber-500',
                    },
                    {
                      border: 'border-slate-200 bg-linear-to-r from-slate-50/90 to-slate-50/30',
                      badge: 'bg-slate-100 text-slate-800 border-slate-300 font-bold',
                      rankLabel: 'TOP 2',
                      iconColor: 'text-slate-400',
                    },
                    {
                      border: 'border-orange-200 bg-linear-to-r from-orange-50/80 to-orange-50/30',
                      badge: 'bg-orange-100 text-orange-800 border-orange-300 font-bold',
                      rankLabel: 'TOP 3',
                      iconColor: 'text-orange-500',
                    },
                  ][index] || {
                    border: 'border-slate-200 bg-white',
                    badge: 'bg-slate-100 text-slate-700 border-slate-200',
                    rankLabel: `#${index + 1}`,
                    iconColor: 'text-slate-400',
                  };

                  return (
                    <div
                      key={item.department.id}
                      className={`p-3 rounded-xl border ${medalConfig.border} flex items-center justify-between transition-all hover:shadow-2xs`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs border ${medalConfig.badge} shrink-0`}
                        >
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                        <div>
                          <div className="font-semibold text-xs text-slate-900 leading-tight">
                            {getDeptName(item.department.name)}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-slate-600">
                              {item.department.code}
                            </span>
                            <span>•</span>
                            <span>{item.totalRatedCount} {t('admin_total_rated')}</span>
                            <span>•</span>
                            <span className="text-emerald-600 font-medium">{item.satisfactionRate}% {t('admin_satisfaction')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 pl-3 text-right shrink-0">
                        <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
                          <Star size={13} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-slate-900">
                            {item.avgRating.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">/ 5.0</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW: AD-02 HÀNG CHỜ ĐIỀU PHỐI & ĐỊNH TUYẾN */}
      {/* ============================================================ */}
      {adminTab === 'dispatch' && (
        <div className="space-y-5">
          {/* Sub-tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg text-xs w-fit">
            <button
              onClick={() => setDispatchSubTab('other_queue')}
              className={`px-4 py-2 font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                dispatchSubTab === 'other_queue'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{t('tab_other_queue')}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${dispatchSubTab === 'other_queue' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {otherQueueTickets.length}
              </span>
            </button>

            <button
              onClick={() => setDispatchSubTab('wrong_queue')}
              className={`px-4 py-2 font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                dispatchSubTab === 'wrong_queue'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{t('tab_wrong_queue')}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${dispatchSubTab === 'wrong_queue' ? 'bg-rose-700 text-white' : 'bg-rose-100 text-rose-800'}`}>
                {wrongQueueTickets.length}
              </span>
            </button>
          </div>

          {/* TAB 1: DANH MỤC "KHÁC" */}
          {dispatchSubTab === 'other_queue' && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {t('dispatch_other_title')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t('dispatch_other_sub')}
                </p>
              </div>

              {otherQueueTickets.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  {t('staff_empty_queue_desc')}
                </div>
              ) : (
                <div className="space-y-4">
                  {otherQueueTickets.map((tItem) => (
                    <div
                      key={tItem.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                            #{tItem.id}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {tItem.studentName} ({tItem.studentCode})
                          </span>
                        </div>
                        <span className="text-slate-400 text-[11px]">
                          {t('date_sent')}: {formatDate(tItem.createdAt)}
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900 text-sm">{tItem.title}</div>
                        <p className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
                          {tItem.description}
                        </p>
                      </div>

                      {/* Routing Toolbar */}
                      <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-700">{t('dispatch_target_dept')}</span>
                          <select
                            value={targetDeptId}
                            onChange={(e) => {
                              setTargetDeptId(e.target.value);
                              setTargetCatId('');
                            }}
                            className="text-xs p-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
                          >
                            {departments.map((d) => (
                              <option key={d.id} value={d.id}>
                                {getDeptName(d.name)} ({d.code})
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={() => handleRouteOther(tItem.id)}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs shadow-xs cursor-pointer"
                        >
                          {t('dispatch_btn_route')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ĐƠN BÁO "SAI PHÒNG BAN" */}
          {dispatchSubTab === 'wrong_queue' && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {t('dispatch_wrong_title')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t('dispatch_wrong_sub')}
                </p>
              </div>

              {wrongQueueTickets.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  {t('staff_empty_queue_desc')}
                </div>
              ) : (
                <div className="space-y-4">
                  {wrongQueueTickets.map((tItem) => (
                    <div
                      key={tItem.id}
                      className="p-4 bg-rose-50/40 rounded-xl border border-rose-200 text-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                            #{tItem.id}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {tItem.studentName} ({tItem.studentCode})
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                          {t('admin_kpi_need_dispatch')}
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900 text-sm">{tItem.title}</div>
                        <p className="text-slate-600 mt-1">{tItem.description}</p>
                      </div>

                      {/* Officer's Reason Box */}
                      <div className="p-3 bg-white rounded-lg border border-rose-200 text-rose-900 space-y-1">
                        <div className="font-bold text-[11px]">
                          {t('supplement_officer')}: {tItem.wrongDepartmentReportedBy}
                        </div>
                        <p className="italic">"{tItem.wrongDepartmentReason}"</p>
                      </div>

                      {/* Re-route Controls */}
                      <div className="pt-2 border-t border-rose-100 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-700">{t('dispatch_reroute_target')}</span>
                          <select
                            value={targetDeptId}
                            onChange={(e) => setTargetDeptId(e.target.value)}
                            className="text-xs p-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-medium"
                          >
                            {departments.map((d) => (
                              <option key={d.id} value={d.id}>
                                {getDeptName(d.name)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <input
                          type="text"
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          placeholder={t('dispatch_admin_note')}
                          className="text-xs p-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 max-w-xs w-full"
                        />

                        <button
                          onClick={() => handleRerouteWrong(tItem.id)}
                          className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold text-xs shadow-xs cursor-pointer"
                        >
                          {t('dispatch_btn_confirm')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW: AD-03 QUẢN LÝ TÀI KHOẢN TOÀN TRƯỜNG */}
      {/* ============================================================ */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t('admin_users_title')} ({filteredUsers.length})
              </h3>
              <p className="text-xs text-slate-500">
                {t('admin_users_sub')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus size={14} />
                <span>{t('btn_add_user')}</span>
              </button>
              <button
                onClick={() => setShowImportCsvModal(true)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet size={14} />
                <span>{t('btn_import_csv')}</span>
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative max-w-sm w-full">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Tìm theo MSSV, tên, email..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <select
              value={userRoleFilter}
              onChange={(e) => setUserRoleFilter(e.target.value as any)}
              className="text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="all">{t('all')}</option>
              <option value="student">{t('role_student')}</option>
              <option value="staff">{t('role_staff')}</option>
              <option value="manager">{t('role_manager')}</option>
              <option value="admin">{t('role_admin')}</option>
            </select>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{t('col_code')}</th>
                  <th className="py-3 px-4">{t('col_name')}</th>
                  <th className="py-3 px-4">{t('col_role')}</th>
                  <th className="py-3 px-4">{t('col_dept_class')}</th>
                  <th className="py-3 px-4">{t('col_status')}</th>
                  <th className="py-3 px-4 text-center">{t('col_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const isActive = u.status === 'active';
                  return (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{u.code}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-700">
                          {getRoleName(u.role)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {getDeptName(u.departmentName) || u.className || '--'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          {isActive ? t('status_active') : t('status_locked')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center gap-2.5">
                          {/* Reset password */}
                          <button
                            onClick={() => {
                              const res = resetUserPassword(u.id);
                              setResetFeedback({ userName: u.name, tempPass: res.tempPass });
                            }}
                            className="text-slate-500 hover:text-blue-600 font-medium"
                            title={t('btn_reset_pwd')}
                          >
                            {t('btn_reset_pwd')}
                          </button>

                          <span className="text-slate-300">|</span>

                          {/* Lock / Unlock (Simulates kick-out) */}
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`font-semibold ${
                              isActive
                                ? 'text-rose-600 hover:text-rose-800'
                                : 'text-emerald-600 hover:text-emerald-800'
                            }`}
                          >
                            {isActive ? t('btn_lock') : t('btn_unlock')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MODAL: THÊM TÀI KHOẢN MỚI */}
          <Modal
            isOpen={showAddUserModal}
            onClose={() => setShowAddUserModal(false)}
            title="Thêm tài khoản người dùng mới"
          >
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Mã định danh (MSSV / Mã CB) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserCode}
                    onChange={(e) => setNewUserCode(e.target.value)}
                    placeholder="20261100"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Vai trò <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                  >
                    <option value="student">Sinh viên</option>
                    <option value="staff">Nhân viên phòng ban</option>
                    <option value="manager">Trưởng phòng</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Họ và tên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Nguyễn Hoàng Nam"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="nam.nh@student.edu.vn"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              {newUserRole === 'student' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Lớp sinh hoạt
                  </label>
                  <input
                    type="text"
                    value={newUserClass}
                    onChange={(e) => setNewUserClass(e.target.value)}
                    placeholder="K22-CNTT02"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Phòng ban trực thuộc
                  </label>
                  <select
                    value={newUserDeptId}
                    onChange={(e) => setNewUserDeptId(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                  >
                    <option value="">-- Chọn phòng ban --</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-lg text-xs hover:bg-blue-700"
                >
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </Modal>

          {/* MODAL: IMPORT CSV */}
          <Modal
            isOpen={showImportCsvModal}
            onClose={() => {
              setShowImportCsvModal(false);
              setCsvResultMsg(null);
            }}
            title="Nạp danh sách người dùng từ tệp CSV"
            subtitle="Cấu trúc mẫu: code,name,email,role,className,deptCode"
          >
            <form onSubmit={handleCsvImportSubmit} className="space-y-4">
              {csvResultMsg && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                  {csvResultMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Nội dung tệp CSV (hoặc dán trực tiếp):
                </label>
                <textarea
                  rows={6}
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  placeholder={`code,name,email,role,className,deptCode\n20261050,Lê Minh Trí,tri.lm@student.edu.vn,student,K22-CNTT03,\nCB0105,Ngô Bảo Châu,chau.nb@university.edu.vn,staff,,AC`}
                  className="w-full font-mono text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportCsvModal(false)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg text-xs hover:bg-emerald-700"
                >
                  Xác nhận nạp dữ liệu
                </button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW: AD-04 QUẢN LÝ DANH MỤC TOÀN TRƯỜNG */}
      {/* ============================================================ */}
      {adminTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t('admin_school_cats_title')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('mgr_categories_desc')}
              </p>
            </div>
            <button
              onClick={() => {
                setEditingCat(null);
                setCName('');
                setCCode('GEN');
                setCDeptId(departments[0].id);
                setCSlaHours(48);
                setCDesc('');
                setShowCatModal(true);
              }}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus size={14} />
              <span>{t('btn_add_category')}</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{t('col_cat_code')}</th>
                  <th className="py-3 px-4">{t('col_cat_name')}</th>
                  <th className="py-3 px-4">{t('in_charge_dept')}</th>
                  <th className="py-3 px-4">{t('col_cat_status')}</th>
                  <th className="py-3 px-4 text-center">{t('col_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{cat.code}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{getCatName(cat.name)}</td>
                    <td className="py-3 px-4 text-slate-600">{getDeptName(cat.departmentName)}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleCategoryActive(cat.id)}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                          cat.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {cat.isActive ? t('cat_active') : t('cat_inactive')}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setEditingCat(cat);
                          setCName(cat.name);
                          setCCode(cat.code);
                          setCDeptId(cat.departmentId);
                          setCSlaHours(cat.slaHours);
                          setCDesc(cat.description);
                          setShowCatModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                      >
                        {t('edit')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Thêm / Sửa Danh mục Toàn trường */}
          <Modal
            isOpen={showCatModal}
            onClose={() => setShowCatModal(false)}
            title={editingCat ? 'Sửa danh mục' : 'Thêm mới danh mục'}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const dept = departments.find((d) => d.id === cDeptId);
                if (editingCat) {
                  updateCategory(editingCat.id, {
                    name: cName,
                    code: cCode,
                    departmentId: cDeptId,
                    departmentName: dept?.name || 'Phòng ban',
                    slaHours: Number(cSlaHours),
                    description: cDesc,
                  });
                } else {
                  addCategory({
                    name: cName,
                    code: cCode,
                    departmentId: cDeptId,
                    departmentName: dept?.name || 'Phòng ban',
                    slaHours: Number(cSlaHours),
                    description: cDesc,
                    isActive: true,
                  });
                }
                setShowCatModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Tên danh mục <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Mã Code
                </label>
                <input
                  type="text"
                  required
                  value={cCode}
                  onChange={(e) => setCCode(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Phòng ban tiếp nhận
                </label>
                <select
                  value={cDeptId}
                  onChange={(e) => setCDeptId(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                  <option value="other">Khác / Hàng chờ Admin</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-lg text-xs hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* VIEW: AD-05 VAI TRÒ & PHÂN QUYỀN (RBAC MATRIX) */}
      {/* ============================================================ */}
      {adminTab === 'roles' && (
        <div className="space-y-5">
          {/* Header Info Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                <Shield size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  {t('admin_roles_title')}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t('app_desc')}
                </p>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-medium">
                {t('admin_rbac_permissions_total')}: <strong className="text-slate-900 font-bold">{rbacPermissions.length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                4 Roles
              </span>
            </div>
          </div>

          {/* Upgraded RBAC Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600">
                    <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px] w-72">
                      {t('admin_rbac_action')}
                    </th>
                    <th className="py-4 px-5 font-bold uppercase tracking-wider text-[11px] min-w-[260px]">
                      {t('admin_rbac_desc')}
                    </th>
                    <th className="py-4 px-3 text-center w-36">
                      <div className="inline-flex flex-col items-center">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200/80 shadow-2xs">
                          {t('role_student')}
                        </span>
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center w-36">
                      <div className="inline-flex flex-col items-center">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200/80 shadow-2xs">
                          {t('role_staff')}
                        </span>
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center w-36">
                      <div className="inline-flex flex-col items-center">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-bold text-[11px] border border-amber-200/80 shadow-2xs">
                          {t('role_manager')}
                        </span>
                      </div>
                    </th>
                    <th className="py-4 px-3 text-center w-36">
                      <div className="inline-flex flex-col items-center">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold text-[11px] border border-purple-200/80 shadow-2xs">
                          {t('role_admin')}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rbacPermissions.map((p, idx) => {
                    // Check if current row starts a new module group
                    const isFirstOfModule =
                      idx === 0 || rbacPermissions[idx - 1].module !== p.module;

                    return (
                      <React.Fragment key={p.id}>
                        {isFirstOfModule && (
                          <tr className="bg-slate-50/50">
                            <td
                              colSpan={6}
                              className="py-2.5 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100/60 border-t border-b border-slate-200/80"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-3 bg-blue-600 rounded-full inline-block"></span>
                                <span>{t('admin_rbac_module')} {p.module}</span>
                              </div>
                            </td>
                          </tr>
                        )}
                        <tr className="hover:bg-blue-50/20 transition-colors group">
                          {/* Chức năng / Quyền hạn */}
                          <td className="py-3.5 px-5 font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-mono text-[11px]">#{idx + 1}</span>
                              <span>{p.action}</span>
                            </div>
                          </td>

                          {/* Mô tả hành động */}
                          <td className="py-3.5 px-5 text-slate-600 text-xs leading-relaxed">
                            {p.description}
                          </td>

                          {/* Cột 1: Sinh viên */}
                          <td className="py-3.5 px-3 text-center">
                            {p.student ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs">
                                <Check size={14} strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-50 text-slate-300">
                                <X size={12} strokeWidth={2} />
                              </div>
                            )}
                          </td>

                          {/* Cột 2: Cán bộ tiếp nhận */}
                          <td className="py-3.5 px-3 text-center">
                            {p.staff ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs">
                                <Check size={14} strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-50 text-slate-300">
                                <X size={12} strokeWidth={2} />
                              </div>
                            )}
                          </td>

                          {/* Cột 3: Trưởng phòng */}
                          <td className="py-3.5 px-3 text-center">
                            {p.manager ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs">
                                <Check size={14} strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-50 text-slate-300">
                                <X size={12} strokeWidth={2} />
                              </div>
                            )}
                          </td>

                          {/* Cột 4: Quản trị viên */}
                          <td className="py-3.5 px-3 text-center">
                            {p.admin ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs">
                                <Check size={14} strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-50 text-slate-300">
                                <X size={12} strokeWidth={2} />
                              </div>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Chú thích bảng & Ghi chú */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span className="font-medium text-slate-700">{t('admin_rbac_allowed')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-400 flex items-center justify-center">
                    <X size={12} strokeWidth={2} />
                  </span>
                  <span>{t('admin_rbac_denied')}</span>
                </span>
              </div>
              <div className="text-[11px] text-slate-400 italic">
                {t('admin_rbac_footer_note')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BẢNG XẾP HẠNG VÀ RATING TOÀN BỘ PHÒNG BAN */}
      <Modal
        isOpen={showAllRatingsModal}
        onClose={() => setShowAllRatingsModal(false)}
        title={t('admin_all_ratings_modal_title')}
        subtitle={t('admin_all_ratings_modal_sub')}
        maxWidth="2xl"
      >
        <div className="space-y-4">
          {/* Header Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-center">
              <div className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">
                {t('admin_total_departments')}
              </div>
              <div className="text-2xl font-black text-blue-950 mt-0.5">
                {deptRatingStats.length}
              </div>
            </div>
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100 text-center">
              <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wide">
                {t('admin_school_avg_score')}
              </div>
              <div className="text-2xl font-black text-amber-950 mt-0.5 flex items-center justify-center gap-1">
                <Star size={18} className="text-amber-500 fill-amber-500" />
                {(
                  deptRatingStats.reduce((sum, d) => sum + d.avgRating, 0) /
                  (deptRatingStats.length || 1)
                ).toFixed(2)}
              </div>
            </div>
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-center">
              <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">
                {t('admin_avg_satisfaction')}
              </div>
              <div className="text-2xl font-black text-emerald-950 mt-0.5">
                {Math.round(
                  deptRatingStats.reduce((sum, d) => sum + d.satisfactionRate, 0) /
                    (deptRatingStats.length || 1)
                )}%
              </div>
            </div>
          </div>

          {/* Department Rankings Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-center w-14">{t('admin_rank')}</th>
                  <th className="py-3 px-4">{t('admin_col_department')}</th>
                  <th className="py-3 px-4 text-center">{t('admin_col_resolved_tickets')}</th>
                  <th className="py-3 px-4 text-center">{t('admin_col_rated_count')}</th>
                  <th className="py-3 px-4 text-right">{t('admin_col_csat_score')}</th>
                  <th className="py-3 px-4 text-right">{t('admin_col_satisfaction')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deptRatingStats.map((item, idx) => {
                  const rankBadge =
                    idx === 0
                      ? 'bg-amber-100 text-amber-800 border-amber-300 font-bold'
                      : idx === 1
                      ? 'bg-slate-100 text-slate-800 border-slate-300 font-bold'
                      : idx === 2
                      ? 'bg-orange-100 text-orange-800 border-orange-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 font-medium';

                  const rankIcon =
                    idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;

                  return (
                    <tr
                      key={item.department.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        idx < 3 ? 'bg-amber-50/15' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs border ${rankBadge}`}
                        >
                          {rankIcon}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">
                          {getDeptName(item.department.name)}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {t('admin_dept_code')} <span className="font-mono text-slate-600">{item.department.code}</span> • {t('admin_dept_manager')} {item.department.managerName || t('admin_unassigned')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-700">
                        {item.totalResolved} / {item.totalTickets} {t('admin_tickets_suffix')}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">
                        {item.totalRatedCount}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1 font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          <span>{item.avgRating.toFixed(2)}</span>
                          <span className="text-[10px] text-slate-400 font-normal">/5</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            item.satisfactionRate >= 95
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : item.satisfactionRate >= 90
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {item.satisfactionRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer note & Close button */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
            <span>
              {t('admin_ratings_realtime_note')}
            </span>
            <button
              type="button"
              onClick={() => setShowAllRatingsModal(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
