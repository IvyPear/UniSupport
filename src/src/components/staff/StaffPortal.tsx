import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Ticket, TicketAttachment } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { CountdownTimer } from '../common/CountdownTimer';
import { Modal } from '../common/Modal';
import {
  Inbox,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Star,
  FileText,
  AlertCircle,
  Search,
  UploadCloud,
  ArrowLeft,
} from 'lucide-react';

export const StaffPortal: React.FC = () => {
  const {
    currentUser,
    tickets,
    claimTicket,
    adjustProcessingDeadline,
    updateTicketProgress,
    requestSupplementaryInfo,
    reportWrongDepartment,
    resolveTicket,
    activeTab,
    selectedTicketId,
    navigate,
  } = useApp();

  const { t, getDeptName, getCatName, getRoleName, formatDate, formatDateTime, language } = useLanguage();

  // Internal active navigation in Staff Portal: derived from Header
  const staffTab = useMemo<'inbox' | 'history'>(() => {
    if (activeTab === 'staff-history') return 'history';
    return 'inbox';
  }, [activeTab]);
  const [inboxSubTab, setInboxSubTab] = useState<'unclaimed' | 'my_active' | 'pending'>('unclaimed');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');

  // Claim with Processing Time Modal state (Max 1 week)
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimingTicket, setClaimingTicket] = useState<Ticket | null>(null);
  const [claimHours, setClaimHours] = useState<number>(72);
  const [claimCustomDays, setClaimCustomDays] = useState<string>('3');
  const [isCustomClaimTime, setIsCustomClaimTime] = useState(false);
  const [claimNote, setClaimNote] = useState('');
  const [claimModalError, setClaimModalError] = useState<string | null>(null);

  // Adjust Deadline Modal state
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustTicket, setAdjustTicket] = useState<Ticket | null>(null);
  const [adjustHours, setAdjustHours] = useState<number>(72);
  const [adjustCustomDays, setAdjustCustomDays] = useState<string>('3');
  const [isCustomAdjustTime, setIsCustomAdjustTime] = useState(false);
  const [adjustNote, setAdjustNote] = useState('');
  const [adjustModalError, setAdjustModalError] = useState<string | null>(null);

  // Success Toast state
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);

  // Modals
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressNote, setProgressNote] = useState('');

  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [requestInfoReason, setRequestInfoReason] = useState('');

  const [showWrongDeptModal, setShowWrongDeptModal] = useState(false);
  const [wrongDeptReason, setWrongDeptReason] = useState('');

  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolutionFiles, setResolutionFiles] = useState<TicketAttachment[]>([]);
  const [resolutionError, setResolutionError] = useState<string | null>(null);

  // Concurrency Conflict Toast State
  const [concurrencyError, setConcurrencyError] = useState<string | null>(null);

  // Active Ticket
  const activeTicket = useMemo(() => {
    if (!selectedTicketId) return null;
    return tickets.find((t) => t.id === selectedTicketId) || null;
  }, [selectedTicketId, tickets]);

  // Tickets assigned to or relevant to this staff member's department
  const deptTickets = useMemo(() => {
    if (!currentUser || !currentUser.departmentId) return [];
    return tickets.filter((t) => t.departmentId === currentUser.departmentId);
  }, [tickets, currentUser]);

  // Unclaimed tickets in department (Status = 'new')
  const unclaimedTickets = useMemo(() => {
    return deptTickets.filter((t) => t.status === 'new' && !t.assigneeId);
  }, [deptTickets]);

  // Tickets currently being handled by THIS staff member (In Progress)
  const myActiveTickets = useMemo(() => {
    if (!currentUser) return [];
    return deptTickets.filter((t) => t.assigneeId === currentUser.id && t.status === 'in_progress');
  }, [deptTickets, currentUser]);

  // Pending tickets (Waiting for student)
  const pendingTickets = useMemo(() => {
    if (!currentUser) return [];
    return deptTickets.filter(
      (t) => (t.assigneeId === currentUser.id || !t.assigneeId) && t.status === 'pending'
    );
  }, [deptTickets, currentUser]);

  // History tickets (Resolved or Closed by this staff member)
  const myHistoryTickets = useMemo(() => {
    if (!currentUser) return [];
    return tickets.filter(
      (t) =>
        t.assigneeId === currentUser.id &&
        (t.status === 'resolved' || t.status === 'closed')
    );
  }, [tickets, currentUser]);

  // Open Claim Modal with default 3 days (72 hours, max 168 hours = 1 week)
  const handleOpenClaimModal = (ticket: Ticket) => {
    setClaimingTicket(ticket);
    setClaimHours(72);
    setClaimCustomDays('3');
    setIsCustomClaimTime(false);
    setClaimNote('');
    setClaimModalError(null);
    setShowClaimModal(true);
  };

  // Confirm Claim with self-set processing time (max 1 week)
  const handleConfirmClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimingTicket) return;

    if (claimHours > 168) {
      setClaimModalError(t('staff_claim_max_err'));
      return;
    }
    if (claimHours < 1) {
      setClaimModalError(t('staff_claim_min_err'));
      return;
    }

    setConcurrencyError(null);
    setClaimModalError(null);

    const res = claimTicket(claimingTicket.id, claimHours, claimNote.trim() || undefined);
    if (!res.success) {
      setConcurrencyError(res.error || t('staff_concurrency_error'));
      setTimeout(() => setConcurrencyError(null), 5000);
      setShowClaimModal(false);
    } else {
      setShowClaimModal(false);
      const daysText = claimHours % 24 === 0 ? `${claimHours / 24} ${t('staff_days_unit')}` : `${claimHours} ${t('staff_hours_unit')}`;
      const toastMsg = t('staff_toast_claimed_with_deadline')
        .replace('{id}', claimingTicket.id)
        .replace('{duration}', daysText);
      setActionSuccessToast(toastMsg);
      setTimeout(() => setActionSuccessToast(null), 4000);
      navigate('staff-inbox', claimingTicket.id);
    }
  };

  // Open Adjust Processing Deadline Modal
  const handleOpenAdjustModal = (ticket: Ticket) => {
    setAdjustTicket(ticket);
    const existingHours = ticket.processingHours || 72;
    setAdjustHours(existingHours);
    setAdjustCustomDays(String(Math.ceil(existingHours / 24)));
    setIsCustomAdjustTime(false);
    setAdjustNote('');
    setAdjustModalError(null);
    setShowAdjustModal(true);
  };

  // Confirm Adjust Processing Deadline
  const handleConfirmAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustTicket) return;

    if (adjustHours > 168) {
      setAdjustModalError(t('staff_claim_max_err'));
      return;
    }
    if (adjustHours < 1) {
      setAdjustModalError(t('staff_claim_min_err'));
      return;
    }

    const res = adjustProcessingDeadline(adjustTicket.id, adjustHours, adjustNote.trim() || undefined);
    if (res.success) {
      setShowAdjustModal(false);
      const toastMsg = t('staff_toast_adjusted_deadline').replace('{id}', adjustTicket.id);
      setActionSuccessToast(toastMsg);
      setTimeout(() => setActionSuccessToast(null), 4000);
    } else {
      setAdjustModalError(res.error || 'Có lỗi xảy ra');
    }
  };

  // Mock Upload for Resolution
  const handleSimulateResolutionFile = () => {
    const mockFiles = [
      'van_ban_chap_thuan_phuc_khao.pdf',
      'bien_ban_xac_nhan_ho_so.pdf',
      'giay_gioi_thieu_sinh_vien_co_dau.pdf',
    ];
    const chosen = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    const newFile: TicketAttachment = {
      id: `att-res-${Date.now()}`,
      name: chosen,
      size: '1.1 MB',
      type: 'application/pdf',
      uploadedAt: new Date().toISOString(),
    };
    setResolutionFiles((prev) => [...prev, newFile]);
  };

  // Submit Resolution
  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket) return;

    if (!resolutionNotes.trim()) {
      setResolutionError('Bắt buộc nhập nội dung giải trình kết quả trước khi hoàn tất đơn!');
      return;
    }

    setResolutionError(null);
    const res = resolveTicket(activeTicket.id, resolutionNotes.trim(), resolutionFiles);
    if (res.success) {
      setShowResolveModal(false);
      setResolutionNotes('');
      setResolutionFiles([]);
    } else if (res.error) {
      setResolutionError(res.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Action Success Toast */}
      {actionSuccessToast && (
        <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span className="font-semibold">{actionSuccessToast}</span>
          </div>
          <button
            onClick={() => setActionSuccessToast(null)}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-bold cursor-pointer"
          >
            {t('close')}
          </button>
        </div>
      )}

      {/* Concurrency Error Banner */}
      {concurrencyError && (
        <div className="mb-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center justify-between text-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <span className="font-semibold">{concurrencyError}</span>
          </div>
          <button
            onClick={() => setConcurrencyError(null)}
            className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
          >
            {t('close')}
          </button>
        </div>
      )}

      {/* Main Container */}
      {!selectedTicketId ? (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {t('staff_header_title')}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                  {getDeptName(currentUser?.departmentName) || t('role_staff')}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('staff_header_desc')}
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TAB: NV-01 HỘP THƯ CÔNG VIỆC PHÒNG BAN */}
          {/* ============================================================ */}
          {staffTab === 'inbox' && (
            <div className="space-y-4">
              {/* Sub-tabs: Chưa tiếp nhận, Đang xử lý, Chờ bổ sung*/}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
                  <button
                    onClick={() => setInboxSubTab('unclaimed')}
                    className={`px-3.5 py-1.5 font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                      inboxSubTab === 'unclaimed'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Clock size={14} />
                    <span>{t('staff_subtab_unclaimed')}</span>
                    {unclaimedTickets.length > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${inboxSubTab === 'unclaimed' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'}`}>
                        {unclaimedTickets.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setInboxSubTab('my_active')}
                    className={`px-3.5 py-1.5 font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                      inboxSubTab === 'my_active'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <UserCheck size={14} />
                    <span>{t('staff_subtab_active')}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-none ${inboxSubTab === 'my_active' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {myActiveTickets.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setInboxSubTab('pending')}
                    className={`px-3.5 py-1.5 font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                      inboxSubTab === 'pending'
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <AlertTriangle size={14} />
                    <span>{t('staff_subtab_pending')}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-none ${inboxSubTab === 'pending' ? 'bg-orange-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {pendingTickets.length}
                    </span>
                  </button>
                </div>

                {/* Search in inbox */}
                <div className="relative max-w-xs w-full">
                  <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('staff_search_placeholder')}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                {(() => {
                  let list =
                    inboxSubTab === 'unclaimed'
                      ? unclaimedTickets
                      : inboxSubTab === 'my_active'
                      ? myActiveTickets
                      : pendingTickets;

                  if (searchQuery) {
                    list = list.filter(
                      (t) =>
                        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.studentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                  }

                  if (list.length === 0) {
                    return (
                      <div className="p-12 text-center text-slate-400">
                        <Inbox size={36} className="mx-auto mb-2 opacity-40 text-slate-500" />
                        <h4 className="text-sm font-semibold text-slate-700">{t('staff_empty_queue')}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {t('staff_empty_queue_desc')}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4 font-semibold">{t('col_ticket_id')}</th>
                          <th className="py-3 px-4 font-semibold">{t('col_student')}</th>
                          <th className="py-3 px-4 font-semibold">{t('col_title_category')}</th>
                          <th className="py-3 px-4 font-semibold">{t('col_sla_due')}</th>
                          <th className="py-3 px-4 font-semibold">{t('col_status')}</th>
                          <th className="py-3 px-4 font-semibold text-center">{t('col_actions')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {list.map((ticket) => (
                          <tr
                            key={ticket.id}
                            className="hover:bg-slate-50/70 transition-colors"
                          >
                            <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                              {ticket.id}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{ticket.studentName}</div>
                              <div className="text-[11px] text-slate-400 font-mono">
                                {ticket.studentCode} {ticket.studentClass ? `· ${ticket.studentClass}` : ''}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 max-w-sm">
                              <div className="font-semibold text-slate-900 line-clamp-1">
                                {ticket.title}
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                {getCatName(ticket.categoryName)}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className={`font-mono ${ticket.isOverdue ? 'text-rose-600 font-bold' : 'text-slate-600'}`}>
                                {formatDate(ticket.slaDueAt)}
                              </div>
                              {ticket.isOverdue && (
                                <span className="text-[10px] text-rose-600 font-semibold uppercase">
                                  {t('mgr_overdue')}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <StatusBadge status={ticket.status} size="sm" />
                              {ticket.status === 'pending' && ticket.pendingUntil && (
                                <div className="mt-1">
                                  <CountdownTimer targetIsoDate={ticket.pendingUntil} />
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                              {inboxSubTab === 'unclaimed' ? (
                                <button
                                  onClick={() => handleOpenClaimModal(ticket)}
                                  className="px-3 py-1.5 bg-gradient-to-r from-[#6ebbd9] to-[#2b84ab] hover:from-[#5eabc9] hover:to-[#247396] text-white rounded-lg font-semibold text-xs shadow-xs active:translate-y-0.5 transition-all cursor-pointer"
                                >
                                  {t('btn_claim')}
                                </button>
                              ) : (
                                <button
                                  onClick={() => navigate('staff-inbox', ticket.id)}
                                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-md font-medium text-xs transition-colors cursor-pointer"
                                >
                                  {t('view_details')}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: NV-04 LỊCH SỬ XỬ LÝ CÁ NHÂN & RATINGS */}
          {/* ============================================================ */}
          {staffTab === 'history' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {t('staff_history_title')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('staff_history_desc')}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900">{myHistoryTickets.length}</div>
                    <div className="text-[11px] text-slate-400">{t('mgr_on_time')}</div>
                  </div>
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="text-right">
                    <div className="text-xl font-bold text-amber-500 flex items-center gap-1 justify-end">
                      <Star size={18} className="fill-amber-400" />
                      <span>4.9 / 5.0</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{t('col_staff_csat')}</div>
                  </div>
                </div>
              </div>

              {/* History Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                {myHistoryTickets.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    {t('staff_history_empty')}
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">{t('col_ticket_id')}</th>
                        <th className="py-3 px-4">{t('col_student')}</th>
                        <th className="py-3 px-4">{t('form_title_label')}</th>
                        <th className="py-3 px-4">{t('col_status')}</th>
                        <th className="py-3 px-4">{t('csat_modal_title')}</th>
                        <th className="py-3 px-4 text-center">{t('col_actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {myHistoryTickets.map((tItem) => (
                        <tr key={tItem.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-bold text-blue-700">{tItem.id}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-900">{tItem.studentName}</span>
                            <div className="text-[11px] text-slate-400">{tItem.studentCode}</div>
                          </td>
                          <td className="py-3 px-4 max-w-sm truncate">{tItem.title}</td>
                          <td className="py-3 px-4">
                            <StatusBadge status={tItem.status} size="sm" />
                          </td>
                          <td className="py-3 px-4">
                            {tItem.csat ? (
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-1 text-amber-500">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                      key={s}
                                      size={12}
                                      className={s <= tItem.csat!.rating ? 'fill-amber-400' : 'text-slate-200'}
                                    />
                                  ))}
                                  <span className="text-xs font-bold text-slate-800 ml-1">
                                    {tItem.csat.rating} {t('closed_stars')}
                                  </span>
                                </div>
                                {tItem.csat.comment && (
                                  <p className="text-[11px] text-slate-500 italic max-w-xs truncate">
                                    "{tItem.csat.comment}"
                                  </p>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">--</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => navigate('staff-inbox', tItem.id)}
                              className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                            >
                              {t('view_details')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ============================================================ */
        /* VIEW: NV-02 BÀN LÀM VIỆC & XỬ LÝ TICKET (WORKSPACE) */
        /* ============================================================ */
        activeTicket && (
          <div className="space-y-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <button
                onClick={() => navigate('staff-inbox', null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>{t('btn_back')}</span>
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-slate-500 font-mono">
                  {t('col_ticket_id')}: <strong className="text-slate-900">#{activeTicket.id}</strong>
                </span>
                <StatusBadge status={activeTicket.status} size="md" />
                {activeTicket.status !== 'new' && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                    <Clock size={13} className="text-blue-600 shrink-0" />
                    <span className="text-[11px] text-slate-600">{t('staff_committed_deadline_badge')}</span>
                    <strong className="font-mono text-xs">{formatDate(activeTicket.slaDueAt)}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Wrong department warning banner if flagged */}
            {activeTicket.isWrongDepartment && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-3">
                <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">{t('dispatch_wrong_title')}</h4>
                  <p className="mt-1 leading-relaxed">
                    "{activeTicket.wrongDepartmentReason}"
                  </p>
                  <p className="text-[11px] text-rose-700 mt-1">
                    {activeTicket.wrongDepartmentReportedBy}
                  </p>
                </div>
              </div>
            )}

            {/* ACTION TOOLBAR */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                <span>{t('in_charge_staff')} </span>
                <strong className="text-slate-900">
                  {activeTicket.assigneeName || t('waiting_assignment')}
                </strong>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* 1. Nút Tiếp nhận (Claim) nếu là New */}
                {activeTicket.status === 'new' && (
                  <button
                    onClick={() => handleOpenClaimModal(activeTicket)}
                    className="px-3.5 py-2 bg-gradient-to-r from-[#6ebbd9] to-[#2b84ab] hover:from-[#5eabc9] hover:to-[#247396] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer active:translate-y-0.5 transition-all"
                  >
                    {t('btn_claim')}
                  </button>
                )}

                {/* Điều chỉnh thời hạn xử lý (Tối đa 1 tuần) */}
                {activeTicket.status === 'in_progress' && (
                  <button
                    onClick={() => handleOpenAdjustModal(activeTicket)}
                    className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Clock size={14} className="text-blue-600" />
                    <span>{t('staff_adjust_time_btn')}</span>
                  </button>
                )}

                {/* 2. Cập nhật tiến độ */}
                {activeTicket.status === 'in_progress' && (
                  <button
                    onClick={() => setShowProgressModal(true)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    {t('btn_update_progress')}
                  </button>
                )}

                {/* 3. Yêu cầu bổ sung */}
                {activeTicket.status === 'in_progress' && (
                  <button
                    onClick={() => setShowRequestInfoModal(true)}
                    className="px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {t('btn_request_info')}
                  </button>
                )}

                {/* 4. Sai phòng ban */}
                {activeTicket.status === 'in_progress' && !activeTicket.isWrongDepartment && (
                  <button
                    onClick={() => setShowWrongDeptModal(true)}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {t('btn_wrong_dept')}
                  </button>
                )}

                {/* 5. Nút Trả kết quả */}
                {(activeTicket.status === 'in_progress' || activeTicket.status === 'pending') && (
                  <button
                    onClick={() => setShowResolveModal(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-500/20 active:translate-y-0.5 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <CheckCircle2 size={15} />
                    <span>{t('btn_resolve')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 3-Column Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cột 1: Thông tin sinh viên & Nội dung yêu cầu */}
              <div className="space-y-6">
                {/* Thẻ sinh viên */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                    {t('col_student')}
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400">{t('col_name')}:</span>{' '}
                      <strong className="text-slate-800">{activeTicket.studentName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">{t('login_code_label')}:</span>{' '}
                      <span className="font-mono font-bold text-slate-800">{activeTicket.studentCode}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">{t('col_dept_class')}:</span>{' '}
                      <span className="text-slate-700">{activeTicket.studentClass || '--'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Email:</span>{' '}
                      <span className="text-blue-600">{activeTicket.studentEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Chi tiết nội dung đơn */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                    {t('form_content_label')}
                  </h3>
                  <div className="text-xs font-semibold text-slate-900">
                    {activeTicket.title}
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 whitespace-pre-line leading-relaxed border border-slate-200/60">
                    {activeTicket.description}
                  </div>

                  {/* Tệp đính kèm sinh viên */}
                  {activeTicket.attachments.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="text-xs font-semibold text-slate-700">{t('ticket_attachments_label')}:</div>
                      {activeTicket.attachments.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-2 bg-slate-100 rounded text-xs"
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <FileText size={14} className="text-blue-600 shrink-0" />
                            <span className="truncate">{f.name}</span>
                          </div>
                          <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                            {t('download')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cột 2 & 3: Audit Trail & Lịch sử xử lý */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {t('timeline_title')}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {t('realtime')}
                    </span>
                  </div>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {activeTicket.timeline.map((item) => (
                      <div key={item.id} className="relative text-xs">
                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-slate-400 bg-white flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-900">{item.action}</span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {formatDateTime(item.timestamp)}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {item.actorName} ({getRoleName(item.actorRole)})
                          </div>
                          {item.note && (
                            <div className="mt-1.5 p-3 bg-slate-50 rounded-lg text-slate-700 border border-slate-200/70 whitespace-pre-line text-xs">
                              {item.note}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MODAL: CẬP NHẬT TIẾN ĐỘ */}
            <Modal
              isOpen={showProgressModal}
              onClose={() => setShowProgressModal(false)}
              title={t('btn_update_progress')}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (progressNote.trim()) {
                    updateTicketProgress(activeTicket.id, progressNote.trim());
                    setShowProgressModal(false);
                    setProgressNote('');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    {t('form_content_label')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={progressNote}
                    onChange={(e) => setProgressNote(e.target.value)}
                    placeholder="Nhập nội dung cập nhật tiến độ..."
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowProgressModal(false)}
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

            {/* MODAL: YÊU CẦU SINH VIÊN BỔ SUNG */}
            <Modal
              isOpen={showRequestInfoModal}
              onClose={() => setShowRequestInfoModal(false)}
              title={t('modal_request_info_title')}
              subtitle={`#${activeTicket.id}`}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (requestInfoReason.trim()) {
                    requestSupplementaryInfo(activeTicket.id, requestInfoReason.trim());
                    setShowRequestInfoModal(false);
                    setRequestInfoReason('');
                  }
                }}
                className="space-y-4"
              >
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-900">
                  {t('supplement_deadline_72h')}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    {t('modal_request_info_label')} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={requestInfoReason}
                    onChange={(e) => setRequestInfoReason(e.target.value)}
                    placeholder={t('modal_request_info_placeholder')}
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestInfoModal(false)}
                    className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-orange-600 text-white font-semibold rounded-lg text-xs hover:bg-orange-700 cursor-pointer"
                  >
                    {t('modal_request_info_submit')}
                  </button>
                </div>
              </form>
            </Modal>

            {/* MODAL: BÁO SAI PHÒNG BAN */}
            <Modal
              isOpen={showWrongDeptModal}
              onClose={() => setShowWrongDeptModal(false)}
              title={t('modal_wrong_dept_title')}
              subtitle={`#${activeTicket.id}`}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (wrongDeptReason.trim()) {
                    reportWrongDepartment(activeTicket.id, wrongDeptReason.trim());
                    setShowWrongDeptModal(false);
                    setWrongDeptReason('');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    {t('modal_wrong_dept_label')} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={wrongDeptReason}
                    onChange={(e) => setWrongDeptReason(e.target.value)}
                    placeholder={t('modal_wrong_dept_placeholder')}
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWrongDeptModal(false)}
                    className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-rose-600 text-white font-semibold rounded-lg text-xs hover:bg-rose-700 cursor-pointer"
                  >
                    {t('modal_wrong_dept_submit')}
                  </button>
                </div>
              </form>
            </Modal>

            {/* MODAL: NV-03 TRẢ KẾT QUẢ GIẢI QUYẾT */}
            <Modal
              isOpen={showResolveModal}
              onClose={() => {
                setShowResolveModal(false);
                setResolutionError(null);
              }}
              title={t('modal_resolve_title')}
              maxWidth="xl"
            >
              <form onSubmit={handleResolveSubmit} className="space-y-4">
                {resolutionError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-center gap-2">
                    <AlertCircle size={15} className="text-rose-600 shrink-0" />
                    <span>{resolutionError}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      {t('modal_resolve_notes_label')} <span className="text-rose-500">*</span>
                    </label>
                  </div>
                  <textarea
                    rows={5}
                    required
                    value={resolutionNotes}
                    onChange={(e) => {
                      setResolutionNotes(e.target.value);
                      if (resolutionError) setResolutionError(null);
                    }}
                    placeholder={t('modal_resolve_notes_placeholder')}
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    {t('modal_resolve_files_label')}
                  </label>
                  <div
                    onClick={handleSimulateResolutionFile}
                    className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50"
                  >
                    <UploadCloud size={20} className="mx-auto text-slate-400 mb-1" />
                    <span className="text-xs text-slate-700 font-medium">{t('form_files_dropzone')}</span>
                  </div>

                  {resolutionFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {resolutionFiles.map((f) => (
                        <div key={f.id} className="text-xs p-2 bg-emerald-50 text-emerald-900 rounded flex justify-between">
                          <span>{f.name}</span>
                          <span className="font-semibold">{f.size}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowResolveModal(false)}
                    className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-md shadow-emerald-500/20 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    {t('btn_resolve')}
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        )
      )}

      {/* ============================================================ */}
      {/* MODAL: TIẾP NHẬN YÊU CẦU & THIẾT LẬP THỜI HẠN XỬ LÝ (TỐI ĐA 1 TUẦN) */}
      {/* ============================================================ */}
      <Modal
        isOpen={showClaimModal}
        onClose={() => {
          setShowClaimModal(false);
          setClaimModalError(null);
        }}
        title={t('staff_claim_modal_title')}
        subtitle={claimingTicket ? `#${claimingTicket.id} · ${claimingTicket.title}` : undefined}
        maxWidth="lg"
      >
        {claimingTicket && (
          <form onSubmit={handleConfirmClaim} className="space-y-4">
            {/* Quick Context Card */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">{t('col_student')}:</span>
                <span className="font-semibold text-slate-800">
                  {claimingTicket.studentName} ({claimingTicket.studentCode})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">{t('in_charge_dept')}:</span>
                <span className="text-slate-700 font-medium">
                  {getDeptName(claimingTicket.departmentName)} · {getCatName(claimingTicket.categoryName)}
                </span>
              </div>
            </div>

            {/* Maximum 1-week Notice Badge */}
            <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
              <Clock size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{t('staff_claim_modal_sub')}</p>
                <p className="text-[11px] text-blue-700 mt-0.5">{t('staff_processing_max_notice')}</p>
              </div>
            </div>

            {/* Error banner if any */}
            {claimModalError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-center gap-2">
                <AlertCircle size={15} className="text-rose-600 shrink-0" />
                <span>{claimModalError}</span>
              </div>
            )}

            {/* Duration Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                {t('staff_processing_time_label')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { hours: 24, label: t('staff_preset_1d'), days: '1' },
                  { hours: 48, label: t('staff_preset_2d'), days: '2' },
                  { hours: 72, label: t('staff_preset_3d'), days: '3' },
                  { hours: 120, label: t('staff_preset_5d'), days: '5' },
                  { hours: 168, label: t('staff_preset_7d'), days: '7', highlight: true },
                ].map((preset) => {
                  const isSelected = !isCustomClaimTime && claimHours === preset.hours;
                  return (
                    <button
                      key={preset.hours}
                      type="button"
                      onClick={() => {
                        setIsCustomClaimTime(false);
                        setClaimHours(preset.hours);
                        setClaimCustomDays(preset.days);
                        setClaimModalError(null);
                      }}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div>{preset.label}</div>
                      {preset.highlight && (
                        <span className={`text-[9px] block font-normal mt-0.5 uppercase tracking-wide ${isSelected ? 'text-blue-100' : 'text-blue-600'}`}>
                          ({language === 'en' ? 'Max' : 'Tối đa'})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Mode Switch & Input */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">{t('staff_custom_time_label')}</span>
                <button
                  type="button"
                  onClick={() => setIsCustomClaimTime(!isCustomClaimTime)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {isCustomClaimTime
                    ? (language === 'en' ? 'Use presets' : 'Dùng mẫu định sẵn')
                    : (language === 'en' ? 'Custom days/hours' : 'Tùy chỉnh số ngày/giờ')}
                </button>
              </div>

              {isCustomClaimTime && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">
                      {t('staff_days_unit')} (1 - 7 {t('staff_days_unit')}):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={7}
                      value={claimCustomDays}
                      onChange={(e) => {
                        const days = Number(e.target.value);
                        setClaimCustomDays(e.target.value);
                        if (days >= 1 && days <= 7) {
                          setClaimHours(days * 24);
                          setClaimModalError(null);
                        } else if (days > 7) {
                          setClaimModalError(t('staff_claim_max_err'));
                        }
                      }}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">
                      {t('staff_hours_unit')} (1 - 168 {t('staff_hours_unit')}):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={168}
                      value={claimHours}
                      onChange={(e) => {
                        const h = Number(e.target.value);
                        setClaimHours(h);
                        setClaimCustomDays(String(Math.ceil(h / 24)));
                        if (h > 168) {
                          setClaimModalError(t('staff_claim_max_err'));
                        } else if (h < 1) {
                          setClaimModalError(t('staff_claim_min_err'));
                        } else {
                          setClaimModalError(null);
                        }
                      }}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Live Preview Deadline */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">{t('staff_estimated_deadline')}</span>
                <span className="font-bold text-blue-700 font-mono">
                  {formatDateTime(new Date(Date.now() + claimHours * 3600 * 1000).toISOString())}
                </span>
              </div>
            </div>

            {/* Optional Staff Initial Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                {t('staff_claim_note_label')}
              </label>
              <textarea
                rows={2}
                value={claimNote}
                onChange={(e) => setClaimNote(e.target.value)}
                placeholder={t('staff_claim_note_placeholder')}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowClaimModal(false);
                  setClaimModalError(null);
                }}
                className="px-3.5 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium cursor-pointer hover:bg-slate-50"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#6ebbd9] to-[#2b84ab] hover:from-[#5eabc9] hover:to-[#247396] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer active:translate-y-0.5 transition-all"
              >
                {t('staff_claim_confirm_btn')}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ============================================================ */}
      {/* MODAL: ĐIỀU CHỈNH THỜI HẠN XỬ LÝ (TỐI ĐA 1 TUẦN) */}
      {/* ============================================================ */}
      <Modal
        isOpen={showAdjustModal}
        onClose={() => {
          setShowAdjustModal(false);
          setAdjustModalError(null);
        }}
        title={t('staff_adjust_modal_title')}
        subtitle={adjustTicket ? `#${adjustTicket.id} · ${adjustTicket.title}` : undefined}
        maxWidth="lg"
      >
        {adjustTicket && (
          <form onSubmit={handleConfirmAdjust} className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2 text-xs text-blue-900">
              <Clock size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{t('staff_processing_max_notice')}</p>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  {language === 'en' ? 'Current deadline:' : 'Thời hạn hiện tại:'} {formatDateTime(adjustTicket.slaDueAt)}
                </p>
              </div>
            </div>

            {adjustModalError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-center gap-2">
                <AlertCircle size={15} className="text-rose-600 shrink-0" />
                <span>{adjustModalError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                {t('staff_processing_time_label')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { hours: 24, label: t('staff_preset_1d'), days: '1' },
                  { hours: 48, label: t('staff_preset_2d'), days: '2' },
                  { hours: 72, label: t('staff_preset_3d'), days: '3' },
                  { hours: 120, label: t('staff_preset_5d'), days: '5' },
                  { hours: 168, label: t('staff_preset_7d'), days: '7', highlight: true },
                ].map((preset) => {
                  const isSelected = !isCustomAdjustTime && adjustHours === preset.hours;
                  return (
                    <button
                      key={preset.hours}
                      type="button"
                      onClick={() => {
                        setIsCustomAdjustTime(false);
                        setAdjustHours(preset.hours);
                        setAdjustCustomDays(preset.days);
                        setAdjustModalError(null);
                      }}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div>{preset.label}</div>
                      {preset.highlight && (
                        <span className={`text-[9px] block font-normal mt-0.5 uppercase tracking-wide ${isSelected ? 'text-blue-100' : 'text-blue-600'}`}>
                          ({language === 'en' ? 'Max' : 'Tối đa'})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Mode Switch & Input */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">{t('staff_custom_time_label')}</span>
                <button
                  type="button"
                  onClick={() => setIsCustomAdjustTime(!isCustomAdjustTime)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {isCustomAdjustTime
                    ? (language === 'en' ? 'Use presets' : 'Dùng mẫu định sẵn')
                    : (language === 'en' ? 'Custom days/hours' : 'Tùy chỉnh số ngày/giờ')}
                </button>
              </div>

              {isCustomAdjustTime && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">
                      {t('staff_days_unit')} (1 - 7 {t('staff_days_unit')}):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={7}
                      value={adjustCustomDays}
                      onChange={(e) => {
                        const days = Number(e.target.value);
                        setAdjustCustomDays(e.target.value);
                        if (days >= 1 && days <= 7) {
                          setAdjustHours(days * 24);
                          setAdjustModalError(null);
                        } else if (days > 7) {
                          setAdjustModalError(t('staff_claim_max_err'));
                        }
                      }}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">
                      {t('staff_hours_unit')} (1 - 168 {t('staff_hours_unit')}):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={168}
                      value={adjustHours}
                      onChange={(e) => {
                        const h = Number(e.target.value);
                        setAdjustHours(h);
                        setAdjustCustomDays(String(Math.ceil(h / 24)));
                        if (h > 168) {
                          setAdjustModalError(t('staff_claim_max_err'));
                        } else if (h < 1) {
                          setAdjustModalError(t('staff_claim_min_err'));
                        } else {
                          setAdjustModalError(null);
                        }
                      }}
                      className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Live Preview Deadline */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">{t('staff_estimated_deadline')}</span>
                <span className="font-bold text-blue-700 font-mono">
                  {formatDateTime(new Date(Date.now() + adjustHours * 3600 * 1000).toISOString())}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Adjustment note (Optional):' : 'Lý do điều chỉnh (Không bắt buộc):'}
              </label>
              <textarea
                rows={2}
                value={adjustNote}
                onChange={(e) => setAdjustNote(e.target.value)}
                placeholder={language === 'en' ? 'E.g.: Need additional verification with related department...' : 'Ví dụ: Cần thêm thời gian xác minh hồ sơ với phòng ban liên quan...'}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowAdjustModal(false);
                  setAdjustModalError(null);
                }}
                className="px-3.5 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium cursor-pointer hover:bg-slate-50"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#6ebbd9] to-[#2b84ab] hover:from-[#5eabc9] hover:to-[#247396] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer active:translate-y-0.5 transition-all"
              >
                {t('staff_adjust_confirm_btn')}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
