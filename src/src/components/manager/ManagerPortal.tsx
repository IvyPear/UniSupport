import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Category, User } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  Star,
  Plus,
  Edit2,
  AlertTriangle,
} from 'lucide-react';

export const ManagerPortal: React.FC = () => {
  const {
    currentUser,
    tickets,
    users,
    departments,
    categories,
    assignTicket,
    addCategory,
    updateCategory,
    toggleCategoryActive,
    activeTab,
  } = useApp();

  const { t, getDeptName, getCatName, formatDate } = useLanguage();

  // Internal Navigation: derived from Header activeTab
  const managerTab = useMemo<'dashboard' | 'tickets' | 'performance' | 'categories'>(() => {
    if (activeTab === 'manager-tickets') return 'tickets';
    if (activeTab === 'manager-performance') return 'performance';
    if (activeTab === 'manager-categories') return 'categories';
    return 'dashboard';
  }, [activeTab]);

  // Performance Drawer for reviews
  const [selectedStaffForReviews, setSelectedStaffForReviews] = useState<User | null>(null);

  // Category Modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catName, setCatName] = useState('');
  const [catCode, setCatCode] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catSlaHours, setCatSlaHours] = useState(48);

  // Re-assign toast
  const [assignSuccessMsg, setAssignSuccessMsg] = useState<string | null>(null);

  // Current Department
  const myDept = useMemo(() => {
    return departments.find((d) => d.id === currentUser?.departmentId) || departments[1]; // default AC
  }, [departments, currentUser]);

  // Dept Tickets
  const deptTickets = useMemo(() => {
    return tickets.filter((t) => t.departmentId === myDept.id);
  }, [tickets, myDept]);

  // Dept Staff Members
  const deptStaff = useMemo(() => {
    return users.filter((u) => u.departmentId === myDept.id && u.role === 'staff');
  }, [users, myDept]);

  // Dept Categories
  const deptCategories = useMemo(() => {
    return categories.filter((c) => c.departmentId === myDept.id);
  }, [categories, myDept]);

  // KPIs
  const totalTickets = deptTickets.length;
  const inProgressCount = deptTickets.filter((t) => t.status === 'in_progress' || t.status === 'new').length;
  const completedCount = deptTickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length;
  const overdueTickets = deptTickets.filter((t) => t.isOverdue || t.status === 'pending');

  // Department average CSAT
  const deptCsatAvg = useMemo(() => {
    const rated = deptTickets.filter((t) => t.csat && t.csat.rating);
    if (rated.length === 0) return 4.8;
    const sum = rated.reduce((acc, curr) => acc + (curr.csat?.rating || 0), 0);
    return (sum / rated.length).toFixed(1);
  }, [deptTickets]);

  const handleAssign = (ticketId: string, staffId: string) => {
    const res = assignTicket(ticketId, staffId);
    if (res.success) {
      const staffObj = users.find((u) => u.id === staffId);
      const msg = t('toast_assigned_staff')
        .replace('{name}', staffObj?.name || '')
        .replace('{id}', ticketId);
      setAssignSuccessMsg(msg);
      setTimeout(() => setAssignSuccessMsg(null), 4000);
    }
  };

  // Open Edit Category
  const handleOpenEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatCode(cat.code);
    setCatDescription(cat.description);
    setCatSlaHours(cat.slaHours);
    setShowCategoryModal(true);
  };

  // Open New Category
  const handleOpenNewCategory = () => {
    setEditingCategory(null);
    setCatName('');
    setCatCode(myDept.code);
    setCatDescription('');
    setCatSlaHours(myDept.slaStandardHours);
    setShowCategoryModal(true);
  };

  // Save Category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: catName.trim(),
        code: catCode.trim(),
        description: catDescription.trim(),
        slaHours: Number(catSlaHours),
      });
    } else {
      addCategory({
        name: catName.trim(),
        code: catCode.trim(),
        departmentId: myDept.id,
        departmentName: myDept.name,
        slaHours: Number(catSlaHours),
        isActive: true,
        description: catDescription.trim(),
      });
    }

    setShowCategoryModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast */}
      {assignSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span className="font-semibold">{assignSuccessMsg}</span>
          </div>
          <button onClick={() => setAssignSuccessMsg(null)} className="font-bold text-xs cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {t('mgr_header_title')}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
              {getDeptName(myDept.name)}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('mgr_header_desc')}
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* VIEW: QL-01 DEPARTMENT DASHBOARD */}
      {/* ============================================================ */}
      {managerTab === 'dashboard' && (
        <div className="space-y-6">
          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Tổng tiếp nhận */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {t('mgr_total_received')}
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ClipboardList size={18} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{totalTickets}</span>
                <span className="text-xs font-bold text-emerald-600">+12%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">{t('mgr_total_received_sub')}</p>
            </div>

            {/* Card 2: Đang xử lý */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {t('mgr_in_progress')}
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock size={18} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-blue-700">{inProgressCount}</span>
                <span className="text-xs text-slate-500 font-semibold">{t('status_in_progress')}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">{t('mgr_in_progress_sub')}</p>
            </div>

            {/* Card 3: Hoàn thành đúng hạn */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {t('mgr_on_time')}
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-700">{completedCount}</span>
                <span className="text-xs font-bold text-emerald-600">96.4%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">{t('mgr_on_time_sub')}</p>
            </div>

            {/* Card 4: Cảnh báo trễ hạn xử lý */}
            <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-2xs hover:shadow-md transition-all ring-1 ring-rose-100">
              <div className="flex items-center justify-between text-rose-500">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                  {t('mgr_overdue')}
                </span>
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center animate-pulse">
                  <AlertTriangle size={18} />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-rose-600">{overdueTickets.length}</span>
                <span className="text-xs font-bold text-rose-600">{t('mgr_overdue')}</span>
              </div>
              <p className="text-[11px] text-rose-700 mt-1 font-semibold">{t('mgr_overdue_sub')}</p>
            </div>
          </div>

          {/* Biểu đồ cơ cấu & CSAT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CSAT Score Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  {t('csat_modal_title')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('admin_top3_sub')}
                </p>
              </div>

              <div className="my-6 text-center">
                <div className="text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
                  <span>{deptCsatAvg}</span>
                  <span className="text-xl font-normal text-slate-400">/ 5.0</span>
                </div>
                <div className="flex justify-center items-center gap-1 text-amber-400 mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={20} className="fill-amber-400" />
                  ))}
                </div>
                <span className="inline-block mt-3 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
                  CSAT: {deptCsatAvg} / 5.0
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>{getDeptName(myDept.name)}</span>
                <span className="text-blue-600 font-semibold">{t('status_active')}</span>
              </div>
            </div>

            {/* Lưu lượng theo danh mục hỗ trợ */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {t('mgr_categories_title')}
              </h3>
              <div className="space-y-3 pt-2">
                {deptCategories.map((cat) => {
                  const count = deptTickets.filter((t) => t.categoryId === cat.id).length;
                  const pct = totalTickets > 0 ? Math.round((count / totalTickets) * 100) : 25;
                  return (
                    <div key={cat.id} className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-700 font-medium">
                        <span className="truncate max-w-md">{getCatName(cat.name)}</span>
                        <span className="font-mono text-slate-500">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${Math.max(pct, 8)}%` }}
                        />
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
      {/* VIEW: QL-02 GIÁM SÁT TIẾN ĐỘ & ĐIỀU PHỐI NHANH */}
      {/* ============================================================ */}
      {managerTab === 'tickets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              {t('mgr_tickets_tab_title')} ({deptTickets.length})
            </h3>
            <span className="text-xs text-slate-500">
              {t('mgr_tickets_tab_desc')}
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{t('col_ticket_id')}</th>
                  <th className="py-3 px-4">{t('col_student')}</th>
                  <th className="py-3 px-4">{t('col_title_category')}</th>
                  <th className="py-3 px-4">{t('col_status')}</th>
                  <th className="py-3 px-4">{t('col_sla_due')}</th>
                  <th className="py-3 px-4">{t('col_staff_name')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deptTickets.map((tItem) => {
                  const isOverdue = tItem.isOverdue;
                  return (
                    <tr
                      key={tItem.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        isOverdue ? 'bg-rose-50/40' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">{tItem.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{tItem.studentName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{tItem.studentCode}</div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-semibold text-slate-800 truncate">{tItem.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">{getCatName(tItem.categoryName)}</div>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={tItem.status} size="sm" />
                      </td>
                      <td className="py-3 px-4">
                        <div
                          className={`font-mono text-xs ${
                            isOverdue ? 'text-rose-600 font-bold' : 'text-slate-600'
                          }`}
                        >
                          {formatDate(tItem.slaDueAt)}
                        </div>
                        {isOverdue && (
                          <span className="text-[10px] text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded font-semibold uppercase">
                            {t('mgr_overdue')}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={tItem.assigneeId || ''}
                          onChange={(e) => handleAssign(tItem.id, e.target.value)}
                          className="text-xs p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        >
                          <option value="">-- {t('waiting_assignment')} --</option>
                          {deptStaff.map((st) => (
                            <option key={st.id} value={st.id}>
                              {st.name} ({st.code})
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW: QL-03 BÁO CÁO HIỆU SUẤT & ĐÁNH GIÁ NHÂN SỰ */}
      {/* ============================================================ */}
      {managerTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {t('mgr_staff_perf_title')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t('mgr_staff_perf_desc')}
                </p>
              </div>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{t('col_staff_name')}</th>
                  <th className="py-3 px-4">{t('col_code')}</th>
                  <th className="py-3 px-4">{t('col_staff_active_tickets')}</th>
                  <th className="py-3 px-4">{t('col_staff_completed')}</th>
                  <th className="py-3 px-4">{t('mgr_overdue')}</th>
                  <th className="py-3 px-4">{t('col_staff_csat')}</th>
                  <th className="py-3 px-4 text-center">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deptStaff.map((staff) => {
                  const staffTickets = deptTickets.filter((tItem) => tItem.assigneeId === staff.id);
                  const staffResolved = staffTickets.filter(
                    (tItem) => tItem.status === 'resolved' || tItem.status === 'closed'
                  ).length;
                  const staffOverdue = staffTickets.filter((tItem) => tItem.isOverdue).length;

                  return (
                    <tr key={staff.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{staff.name}</div>
                        <div className="text-[11px] text-slate-400">{staff.email}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                        {staff.code}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {staffTickets.length}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-bold">
                        {staffResolved}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-semibold ${
                            staffOverdue > 0 ? 'text-rose-600' : 'text-slate-600'
                          }`}
                        >
                          {staffOverdue} ({staffTickets.length > 0 ? Math.round((staffOverdue / staffTickets.length) * 100) : 0}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star size={14} className="fill-amber-400" />
                          <span>4.9 / 5.0</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedStaffForReviews(staff)}
                          className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                        >
                          {t('view_details')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Drawer / Modal Chi tiết nhận xét của sinh viên */}
          {selectedStaffForReviews && (
            <Modal
              isOpen={Boolean(selectedStaffForReviews)}
              onClose={() => setSelectedStaffForReviews(null)}
              title={`${t('csat_modal_title')}: ${selectedStaffForReviews.name}`}
              subtitle={`${t('col_code')}: ${selectedStaffForReviews.code}`}
            >
              <div className="space-y-3">
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {deptTickets
                    .filter((tItem) => tItem.assigneeId === selectedStaffForReviews.id && tItem.csat?.comment)
                    .map((tItem) => (
                      <div key={tItem.id} className="p-3 bg-amber-50/40 rounded-lg border border-amber-200/60 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{tItem.studentName} ({tItem.studentCode})</span>
                          <span className="font-mono text-[11px] text-amber-600 font-bold">{tItem.csat?.rating} {t('closed_stars')}</span>
                        </div>
                        <p className="text-slate-700 italic">"{tItem.csat?.comment}"</p>
                        <div className="text-[10px] text-slate-400 font-mono">#{tItem.id}</div>
                      </div>
                    ))}
                  {deptTickets.filter((tItem) => tItem.assigneeId === selectedStaffForReviews.id && tItem.csat?.comment).length === 0 && (
                    <div className="text-center text-xs text-slate-400 py-6">
                      {t('staff_history_empty')}
                    </div>
                  )}
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW: QL-04 QUẢN LÝ DANH MỤC DỊCH VỤ PHÒNG BAN */}
      {/* ============================================================ */}
      {managerTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {t('mgr_categories_title')} ({getDeptName(myDept.name)})
              </h3>
              <p className="text-xs text-slate-500">
                {t('mgr_categories_desc')}
              </p>
            </div>
            <button
              onClick={handleOpenNewCategory}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Plus size={15} />
              <span>{t('btn_add_category')}</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">{t('col_cat_code')}</th>
                  <th className="py-3 px-4">{t('col_cat_name')}</th>
                  <th className="py-3 px-4">{t('col_cat_status')}</th>
                  <th className="py-3 px-4 text-center">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deptCategories.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{c.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{getCatName(c.name)}</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleCategoryActive(c.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                          c.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {c.isActive ? t('cat_active') : t('cat_inactive')}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleOpenEditCategory(c)}
                        className="text-slate-500 hover:text-blue-600 p-1 cursor-pointer"
                        title={t('edit')}
                      >
                        <Edit2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Thêm/Sửa Danh mục */}
          <Modal
            isOpen={showCategoryModal}
            onClose={() => setShowCategoryModal(false)}
            title={editingCategory ? t('edit') : t('btn_add_category')}
          >
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  {t('col_cat_name')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="E.g.: Request for exam grade..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  {t('col_cat_code')}
                </label>
                <input
                  type="text"
                  required
                  value={catCode}
                  onChange={(e) => setCatCode(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-lg text-xs hover:bg-blue-700 cursor-pointer"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
};
