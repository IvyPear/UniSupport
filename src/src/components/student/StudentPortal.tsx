import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Ticket, TicketAttachment, TicketStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { CountdownTimer } from '../common/CountdownTimer';
import { Modal } from '../common/Modal';
import {
  Plus,
  Search,
  FileText,
  CheckCircle2,
  Paperclip,
  UploadCloud,
  ChevronRight,
  ArrowLeft,
  Building2,
  Star,
  Lock,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const StudentPortal: React.FC = () => {
  const {
    currentUser,
    tickets,
    departments,
    categories,
    createTicket,
    submitSupplementaryInfo,
    submitCsatReview,
    activeTab,
    selectedTicketId,
    navigate,
  } = useApp();

  const { t, getDeptName, getCatName, getRoleName, formatDate } = useLanguage();

  // Navigation sub-view: 'list' | 'create' | 'detail'
  const currentView = useMemo(() => {
    if (selectedTicketId) return 'detail';
    if (activeTab === 'student-create') return 'create';
    return 'list';
  }, [activeTab, selectedTicketId]);

  // Selected Ticket
  const activeTicket = useMemo(() => {
    if (!selectedTicketId) return null;
    return tickets.find((t) => t.id === selectedTicketId) || null;
  }, [selectedTicketId, tickets]);

  // List Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | TicketStatus>('all');

  // Create Form State
  const [selectedDeptId, setSelectedDeptId] = useState<string>('dept-training');
  const [selectedCatId, setSelectedCatId] = useState<string>('cat-ac-01');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<TicketAttachment[]>([]);
  const [createdSuccessTicketId, setCreatedSuccessTicketId] = useState<string | null>(null);

  // Modals
  const [showSupplementaryModal, setShowSupplementaryModal] = useState(false);
  const [suppContent, setSuppContent] = useState('');
  const [suppFiles, setSuppFiles] = useState<TicketAttachment[]>([]);

  const [showCsatModal, setShowCsatModal] = useState(false);
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [csatComment, setCsatComment] = useState('');

  // Filter categories by selected department
  const filteredCategories = useMemo(() => {
    if (selectedDeptId === 'other') {
      return categories.filter((c) => c.departmentId === 'other');
    }
    return categories.filter((c) => c.departmentId === selectedDeptId && c.isActive);
  }, [categories, selectedDeptId]);

  // Student's tickets
  const myTickets = useMemo(() => {
    if (!currentUser) return [];
    return tickets.filter((t) => t.studentId === currentUser.id);
  }, [tickets, currentUser]);

  const displayedTickets = useMemo(() => {
    return myTickets.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.departmentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [myTickets, searchTerm, statusFilter]);

  // Mock File Upload
  const handleSimulateFileUpload = (isSupplementary = false) => {
    const mockFileNames = [
      'giay_xac_nhan_ho_ngheo.pdf',
      'anh_chup_the_sinh_vien.png',
      'don_de_nghi_xac_nhan.docx',
      'bang_diem_tam_thoi_k22.pdf',
    ];
    const randomName = mockFileNames[Math.floor(Math.random() * mockFileNames.length)];
    const newFile: TicketAttachment = {
      id: `att-${Date.now()}`,
      name: randomName,
      size: `${(Math.random() * 2 + 0.4).toFixed(1)} MB`,
      type: randomName.endsWith('.pdf') ? 'application/pdf' : 'image/png',
      uploadedAt: new Date().toISOString(),
    };

    if (isSupplementary) {
      setSuppFiles((prev) => [...prev, newFile]);
    } else {
      setUploadedFiles((prev) => [...prev, newFile]);
    }
  };

  // Submit Ticket Creation
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle.trim() || !ticketDesc.trim()) return;

    const isOther = selectedDeptId === 'other';
    const result = createTicket({
      title: ticketTitle.trim(),
      description: ticketDesc.trim(),
      departmentId: selectedDeptId,
      categoryId: selectedCatId,
      attachments: uploadedFiles,
      isOtherCategory: isOther,
    });

    if (result.success) {
      setCreatedSuccessTicketId(result.ticketId);
      setTicketTitle('');
      setTicketDesc('');
      setUploadedFiles([]);
    }
  };

  // Submit Supplementary Info
  const handleSupplementarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket) return;

    const res = submitSupplementaryInfo(activeTicket.id, suppContent, suppFiles);
    if (res.success) {
      setShowSupplementaryModal(false);
      setSuppContent('');
      setSuppFiles([]);
    } else if (res.error) {
      alert(res.error);
    }
  };

  // Submit CSAT
  const handleCsatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket) return;

    const res = submitCsatReview(activeTicket.id, ratingValue, csatComment);
    if (res.success) {
      setShowCsatModal(false);
      setCsatComment('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ============================================================ */}
      {/* VIEW: SV-01 DANH SÁCH "YÊU CẦU CỦA TÔI" */}
      {/* ============================================================ */}
      {currentView === 'list' && (
        <div className="space-y-5">
          {/* Header Row: Tiêu đề & Nút bấm chính */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {t('student_title')}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('student_desc')}
              </p>
            </div>

            {/* Nút bấm chính: [Tạo yêu cầu mới] */}
            <button
              onClick={() => navigate('student-create')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6ebbd9] to-[#2b84ab] hover:from-[#5eabc9] hover:to-[#247396] text-white font-semibold text-xs rounded-xl shadow-md shadow-[#6ebbd9]/20 transition-all cursor-pointer active:translate-y-0.5"
            >
              <Plus size={16} />
              <span>{t('btn_create_ticket')}</span>
            </button>
          </div>

          {/* Controls: Search & Tabs lọc trạng thái */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Thanh tìm kiếm theo Tiêu đề / Mã Ticket */}
            <div className="relative max-w-sm w-full">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('search_ticket_placeholder')}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs"
              />
            </div>

            {/* Tab lọc trạng thái */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: t('status_all') },
                { id: 'new', label: t('status_new') },
                { id: 'in_progress', label: t('status_in_progress') },
                { id: 'pending', label: t('status_pending'), isHighlight: true },
                { id: 'resolved', label: t('status_resolved') },
                { id: 'closed', label: t('status_closed') },
              ].map((tab) => {
                const isActive = statusFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as any)}
                    className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : tab.isHighlight
                        ? 'text-orange-700 hover:text-orange-900 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ticket Cards Grid / Modern Card List */}
          <div className="space-y-3">
            {displayedTickets.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-16 text-center shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <FileText size={32} />
                </div>
                <h3 className="text-base font-bold text-slate-800">{t('no_tickets_found')}</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchTerm
                    ? t('no_tickets_search')
                    : statusFilter === 'resolved'
                    ? t('no_tickets_resolved')
                    : statusFilter === 'closed'
                    ? t('no_tickets_closed')
                    : statusFilter === 'pending'
                    ? t('no_tickets_pending')
                    : statusFilter === 'in_progress'
                    ? t('no_tickets_in_progress')
                    : statusFilter === 'new'
                    ? t('no_tickets_new')
                    : t('no_tickets_term')}
                </p>
                {!searchTerm && statusFilter !== 'resolved' && statusFilter !== 'closed' && (
                  <button
                    onClick={() => navigate('student-create')}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <Plus size={15} />
                    <span>{t('btn_create_first')}</span>
                  </button>
                )}
              </div>
            ) : (
              displayedTickets.map((ticket) => {
                const isPending = ticket.status === 'pending';
                const isResolved = ticket.status === 'resolved';

                return (
                  <div
                    key={ticket.id}
                    onClick={() => navigate('student-tickets', ticket.id)}
                    className={`group bg-white rounded-2xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${
                      isPending
                        ? 'border-orange-300 bg-orange-50/20 ring-1 ring-orange-200'
                        : isResolved
                        ? 'border-emerald-300 bg-emerald-50/20 ring-1 ring-emerald-200'
                        : 'border-slate-200/90 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2 grow min-w-0">
                        {/* Meta Tags Row */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/80">
                            #{ticket.id}
                          </span>
                          <StatusBadge status={ticket.status} size="sm" />
                          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                            <Building2 size={13} className="text-slate-400" />
                            {getDeptName(ticket.departmentName)}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {ticket.title}
                        </h2>

                        {/* Description Preview */}
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {ticket.description}
                        </p>

                        {/* Footer Subtext */}
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1 font-medium">
                          <span>{t('date_sent')}: {formatDate(ticket.createdAt)}</span>
                          <span>·</span>
                          <span>{t('procedure')}: {getCatName(ticket.categoryName)}</span>
                          {ticket.attachments.length > 0 && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1 text-slate-600 font-semibold">
                                <Paperclip size={12} />
                                {ticket.attachments.length} {t('attachments_count')}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right Indicator / Countdown / Action prompt */}
                      <div className="shrink-0 flex sm:flex-col items-start sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {isPending && ticket.pendingUntil && (
                          <div className="flex flex-col sm:items-end gap-1">
                            <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider">
                              {t('need_supplement')}
                            </span>
                            <CountdownTimer targetIsoDate={ticket.pendingUntil} />
                          </div>
                        )}

                        {isResolved && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-xl border border-emerald-300">
                            <Sparkles size={13} />
                            {t('has_resolution_result')}
                          </span>
                        )}

                        <div className="text-xs text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>{t('view_details')}</span>
                          <ChevronRight size={15} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW: SV-02 TẠO YÊU CẦU HỖ TRỢ MỚI */}
      {/* ============================================================ */}
      {currentView === 'create' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <button
            onClick={() => navigate('student-tickets')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{t('btn_back_list')}</span>
          </button>

          {createdSuccessTicketId ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">{t('create_success_title')}</h2>
              <p className="text-xs text-slate-500 mt-1.5">
                {t('create_success_desc')}
              </p>
              <div className="mt-4 inline-block font-mono text-lg font-black text-blue-700 bg-blue-50 px-5 py-2 rounded-xl border border-blue-200">
                {createdSuccessTicketId}
              </div>
              <p className="text-xs text-slate-500 mt-4 max-w-md mx-auto leading-relaxed">
                {t('create_success_notice')}
              </p>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={() => {
                    navigate('student-tickets', createdSuccessTicketId);
                    setCreatedSuccessTicketId(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {t('btn_track_progress')}
                </button>
                <button
                  onClick={() => {
                    setCreatedSuccessTicketId(null);
                    setTicketTitle('');
                    setTicketDesc('');
                    setUploadedFiles([]);
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  {t('btn_create_another')}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/30">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                  <ShieldCheck size={14} />
                  <span>{t('create_form_badge')}</span>
                </div>
                <h1 className="text-xl font-extrabold text-slate-900">{t('create_form_title')}</h1>
                <p className="text-xs text-slate-500 mt-1">
                  {t('create_form_desc')}
                </p>
              </div>

              <form onSubmit={handleCreateSubmit} className="p-6 sm:p-8 space-y-6">
                {/* 1. Phòng ban tiếp nhận */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {t('form_dept_label')} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedDeptId}
                    onChange={(e) => {
                      const newDept = e.target.value;
                      setSelectedDeptId(newDept);
                      if (newDept === 'other') {
                        setSelectedCatId('cat-kh-01');
                      } else {
                        const firstCat = categories.find((c) => c.departmentId === newDept && c.isActive);
                        if (firstCat) setSelectedCatId(firstCat.id);
                      }
                    }}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {getDeptName(dept.name)} ({dept.code})
                      </option>
                    ))}
                    <option value="other">{t('form_dept_other')}</option>
                  </select>
                </div>

                {/* 2. Danh mục yêu cầu */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {t('form_cat_label')}<span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedCatId}
                    onChange={(e) => setSelectedCatId(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                  >
                    {filteredCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {getCatName(cat.name)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Tiêu đề yêu cầu */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {t('form_title_label')}<span className="text-rose-500">*</span>
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        ticketTitle.length > 140 ? 'text-rose-600 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {ticketTitle.length}/150 {t('form_char_count')}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={150}
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    placeholder={t('form_title_placeholder')}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                  />
                </div>

                {/* 4. Nội dung chi tiết */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {t('form_content_label')}<span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    placeholder={t('form_content_placeholder')}
                    className="w-full text-xs p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 leading-relaxed focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                  />
                </div>

                {/* 5. File Upload Dropzone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {t('form_files_label')}
                  </label>
                  <div
                    onClick={() => handleSimulateFileUpload(false)}
                    className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/40 rounded-2xl p-6 text-center cursor-pointer transition-all group"
                  >
                    <UploadCloud size={28} className="mx-auto text-slate-400 group-hover:text-blue-600 mb-2 transition-colors" />
                    <p className="text-xs font-bold text-slate-800">
                      {t('form_files_dropzone')}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {t('form_files_hint')}
                    </p>
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-2.5 bg-slate-100 rounded-xl text-xs font-medium"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText size={15} className="text-blue-600 shrink-0" />
                            <span className="text-slate-800 truncate">{f.name}</span>
                            <span className="text-[11px] text-slate-400 font-mono">({f.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setUploadedFiles((prev) => prev.filter((item) => item.id !== f.id))}
                            className="text-rose-500 hover:text-rose-700 font-bold px-2 py-0.5 cursor-pointer"
                          >
                            {t('delete')}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('student-tickets')}
                    className="px-5 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#6ebbd9] to-[#2b84ab] hover:from-[#5eabc9] hover:to-[#247396] text-white font-bold rounded-xl text-xs shadow-md shadow-[#6ebbd9]/25 active:translate-y-0.5 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Send size={15} />
                    <span>{t('btn_submit')}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW: SV-03 CHI TIẾT YÊU CẦU & TIẾN ĐỘ THỜI GIAN THỰC */}
      {/* ============================================================ */}
      {currentView === 'detail' && activeTicket && (
        <div className="space-y-6">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('student-tickets')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>{t('btn_back')}</span>
            </button>
            <div className="text-xs text-slate-400 font-mono">
              {t('due_date')}: {formatDate(activeTicket.slaDueAt)}
            </div>
          </div>

          {/* DYNAMIC ACTION BOXES */}
          {/* 1. If Pending -> Highlight Orange Box with 72h countdown + Add Info Button */}
          {activeTicket.status === 'pending' && (
            <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border-2 border-orange-300 rounded-3xl p-6 shadow-sm animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-orange-600 animate-ping" />
                    <h2 className="text-base font-extrabold text-orange-950">
                      {t('supplement_banner_title')}
                    </h2>
                  </div>
                  <div className="bg-white/90 p-4 rounded-2xl border border-orange-200/80 text-xs text-orange-950 font-medium leading-relaxed shadow-xs">
                    "{activeTicket.supplementaryInfo?.requestReason || 'Vui lòng cung cấp thêm minh chứng rõ nét'}"
                  </div>
                  <div className="text-[11px] text-orange-800 font-semibold flex items-center gap-2">
                    <span>{t('supplement_officer')} {activeTicket.supplementaryInfo?.requestedBy}</span>
                    <span>·</span>
                    <span>{t('supplement_deadline_72h')}</span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-start sm:items-end gap-3">
                  {activeTicket.pendingUntil && (
                    <CountdownTimer targetIsoDate={activeTicket.pendingUntil} />
                  )}
                  <button
                    onClick={() => setShowSupplementaryModal(true)}
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-orange-500/30 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    {t('supplement_btn_action')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. If Resolved -> Highlight Emerald Box with Resolution Notes + CSAT Rating CTA */}
          {activeTicket.status === 'resolved' && (
            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border-2 border-emerald-300 rounded-3xl p-6 shadow-sm animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="space-y-3 grow">
                  <div className="flex items-center gap-2 text-emerald-950">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                    <h2 className="text-base font-extrabold">{t('resolved_banner_title')}</h2>
                  </div>

                  <div className="bg-white/90 p-4 rounded-2xl border border-emerald-200 text-xs text-slate-800 leading-relaxed space-y-2.5 shadow-xs">
                    <div className="font-bold text-emerald-950">
                      {t('resolution_notes_label')}
                    </div>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                      {activeTicket.resolution?.notes}
                    </p>

                    {/* Resolution attachments */}
                    {activeTicket.resolution?.attachments && activeTicket.resolution.attachments.length > 0 && (
                      <div className="pt-2.5 border-t border-emerald-100 space-y-1.5">
                        <div className="text-[11px] font-bold text-emerald-900">{t('resolution_attachments_label')}</div>
                        {activeTicket.resolution.attachments.map((f) => (
                          <div
                            key={f.id}
                            className="flex items-center justify-between p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs"
                          >
                            <span className="font-semibold text-emerald-950">{f.name} ({f.size})</span>
                            <span className="text-[11px] text-emerald-700 font-extrabold cursor-pointer hover:underline">
                              {t('download')}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-emerald-800 font-semibold">
                    {t('resolved_by_officer')} {activeTicket.resolution?.resolvedByName} ·{' '}
                    {formatDate(activeTicket.resolution?.resolvedAt || '')}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-start sm:items-end gap-2.5">
                  <button
                    onClick={() => setShowCsatModal(true)}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Star size={16} className="fill-white" />
                    <span>{t('csat_btn_cta')}</span>
                  </button>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {t('csat_cta_sub')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. If Closed -> Read-only display */}
          {activeTicket.status === 'closed' && (
            <div className="bg-slate-100 rounded-2xl p-4.5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                <Lock size={16} className="text-slate-500" />
                <span>{t('closed_readonly_notice')}</span>
              </div>
              {activeTicket.csat && (
                <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs font-semibold">
                  <span className="text-slate-500">{t('closed_rating_label')}</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={13} className={s <= activeTicket.csat!.rating ? 'fill-amber-400' : 'text-slate-300'} />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900">({activeTicket.csat.rating}/5 {t('closed_stars')})</span>
                </div>
              )}
            </div>
          )}

          {/* Main Grid: Details & Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    #{activeTicket.id}
                  </span>
                  <StatusBadge status={activeTicket.status} size="md" />
                  <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
                    {getCatName(activeTicket.categoryName)}
                  </span>
                </div>

                <h1 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {activeTicket.title}
                </h1>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t('ticket_original_desc')}
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-800 leading-relaxed whitespace-pre-line border border-slate-200/60 font-medium">
                    {activeTicket.description}
                  </div>
                </div>

                {/* Attachments */}
                {activeTicket.attachments.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t('ticket_attachments_label')} ({activeTicket.attachments.length}):
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeTicket.attachments.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText size={16} className="text-blue-600 shrink-0" />
                            <span className="text-slate-800 truncate">{f.name}</span>
                          </div>
                          <span className="text-[11px] text-blue-600 font-bold cursor-pointer hover:underline shrink-0 ml-2">
                            {t('ticket_view_download')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Timeline */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {t('timeline_title')}
                  </h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {t('realtime')}
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {activeTicket.timeline.map((item, idx) => {
                    const isLast = idx === activeTicket.timeline.length - 1;
                    return (
                      <div key={item.id} className="relative text-xs">
                        <div
                          className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                            isLast ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-300'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${isLast ? 'bg-blue-600' : 'bg-slate-400'}`} />
                        </div>

                        <div>
                          <div className="font-bold text-slate-900">{item.action}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                            <span>{item.actorName} ({getRoleName(item.actorRole)})</span>
                            <span>·</span>
                            <span>
                              {formatDate(item.timestamp)}
                            </span>
                          </div>
                          {item.note && (
                            <p className="mt-1.5 p-2.5 bg-slate-50 rounded-xl text-slate-600 border border-slate-100 text-[11px] leading-relaxed font-medium">
                              {item.note}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Department Contact Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">{t('department_in_charge')}</h3>
                <div className="space-y-1.5 text-slate-600">
                  <div>
                    <span className="text-slate-400">{t('in_charge_dept')} </span>
                    <strong className="text-slate-900">{getDeptName(activeTicket.departmentName)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">{t('in_charge_staff')} </span>
                    <strong className="text-slate-900">{activeTicket.assigneeName || t('waiting_assignment')}</strong>
                  </div>
                  {activeTicket.status !== 'new' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{t('col_sla_due')}: </span>
                      <strong className="text-blue-700 font-mono">{formatDate(activeTicket.slaDueAt)}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* MODAL: SV-04 BỔ SUNG THÔNG TIN */}
          <Modal
            isOpen={showSupplementaryModal}
            onClose={() => setShowSupplementaryModal(false)}
            title={t('supplement_modal_title')}
            subtitle={`#${activeTicket.id}`}
          >
            <form onSubmit={handleSupplementarySubmit} className="space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                <strong>{t('supplement_modal_officer_req')}</strong> {activeTicket.supplementaryInfo?.requestReason}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('supplement_modal_content_label')}
                </label>
                <textarea
                  rows={4}
                  required={suppFiles.length === 0}
                  value={suppContent}
                  onChange={(e) => setSuppContent(e.target.value)}
                  placeholder={t('supplement_modal_content_placeholder')}
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('supplement_modal_upload_label')}
                </label>
                <div
                  onClick={() => handleSimulateFileUpload(true)}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 text-center cursor-pointer bg-slate-50 transition-colors"
                >
                  <UploadCloud size={24} className="mx-auto text-slate-400 mb-1" />
                  <span className="text-xs text-slate-700 font-bold">{t('supplement_modal_upload_btn')}</span>
                </div>

                {suppFiles.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {suppFiles.map((f) => (
                      <div key={f.id} className="text-xs p-2 bg-slate-100 rounded-lg flex justify-between font-medium">
                        <span>{f.name}</span>
                        <span className="text-slate-400 font-mono">{f.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowSupplementaryModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 text-white font-bold rounded-xl text-xs hover:bg-orange-700 shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  {t('supplement_modal_submit')}
                </button>
              </div>
            </form>
          </Modal>

          {/* MODAL: SV-05 ĐÁNH GIÁ CSAT */}
          <Modal
            isOpen={showCsatModal}
            onClose={() => setShowCsatModal(false)}
            title={t('csat_modal_title')}
            subtitle={t('csat_modal_subtitle')}
          >
            <form onSubmit={handleCsatSubmit} className="space-y-6 text-center">
              <div>
                <p className="text-xs font-bold text-slate-800 mb-3">
                  {t('csat_question')}
                </p>

                {/* 5-Star Interactive Rating */}
                <div className="flex justify-center items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingValue(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-hidden cursor-pointer"
                    >
                      <Star
                        size={34}
                        className={star <= ratingValue ? 'fill-amber-400 text-amber-500' : 'text-slate-200'}
                      />
                    </button>
                  ))}
                </div>

                <div className="text-xs font-extrabold text-slate-800">
                  {ratingValue === 5 && t('csat_rating_5')}
                  {ratingValue === 4 && t('csat_rating_4')}
                  {ratingValue === 3 && t('csat_rating_3')}
                  {ratingValue === 2 && t('csat_rating_2')}
                  {ratingValue === 1 && t('csat_rating_1')}
                </div>
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t('csat_feedback_label')}
                </label>
                <textarea
                  rows={3}
                  value={csatComment}
                  onChange={(e) => setCsatComment(e.target.value)}
                  placeholder={t('csat_feedback_placeholder')}
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCsatModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  {t('csat_btn_later')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  {t('csat_btn_confirm')}
                </button>
              </div>
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
};
