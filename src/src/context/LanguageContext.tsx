import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role } from '../types';

export type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  getDeptName: (deptIdOrName?: string) => string;
  getCatName: (catIdOrName?: string) => string;
  getRoleName: (role?: Role | string) => string;
  formatDate: (dateStr: string | number | Date, options?: Intl.DateTimeFormatOptions) => string;
  formatDateTime: (dateStr: string | number | Date) => string;
}

const STORAGE_KEY = 'unisupport_language_v1';

const departmentTranslations: Record<Language, Record<string, string>> = {
  vi: {
    'dept-it': 'Phòng Công nghệ Thông tin',
    'dept-training': 'Phòng Đào tạo & Quản lý Đào tạo',
    'dept-finance': 'Phòng Kế hoạch - Tài chính',
    'dept-student-affairs': 'Phòng Công tác Sinh viên',
    'other': 'Khác - Ban Quản trị phân loại',
  },
  en: {
    'dept-it': 'Information Technology Department',
    'dept-training': 'Academic & Training Affairs Department',
    'dept-finance': 'Planning & Finance Department',
    'dept-student-affairs': 'Student Affairs Department',
    'other': 'Other - Admin Routed',
  },
};

const categoryTranslations: Record<Language, Record<string, string>> = {
  vi: {
    'cat-it-01': 'Cấp lại mật khẩu Portal & Email sinh viên',
    'cat-it-02': 'Xử lý sự cố kết nối Wi-Fi Giảng đường & Ký túc xá',
    'cat-it-03': 'Cấp bản quyền Microsoft 365 & Phần mềm học tập',
    'cat-ac-01': 'Đơn xin phúc khảo kết quả thi kết thúc học phần',
    'cat-ac-02': 'Xử lý trùng lịch học & Đăng ký môn bổ sung',
    'cat-ac-03': 'Cấp bản sao Bảng điểm & Giấy chứng nhận tốt nghiệp',
    'cat-fn-01': 'Gia hạn đóng học phí & Hỗ trợ vay vốn sinh viên',
    'cat-fn-02': 'Xác minh giao dịch chuyển khoản học phí & Xuất hóa đơn VAT',
    'cat-sa-01': 'Đăng ký phòng ở Ký túc xá & Xác nhận ngoại trú',
    'cat-sa-02': 'Cấp Giấy xác nhận Sinh viên & Vay vốn chính sách',
    'cat-sa-03': 'Khiếu nại Điểm rèn luyện & Xét học bổng Khuyến khích',
    'cat-kh-01': 'Yêu cầu hỗ trợ tổng hợp / Chưa rõ phòng ban',
  },
  en: {
    'cat-it-01': 'Reset Portal & Student Email Password',
    'cat-it-02': 'Campus & Dormitory Wi-Fi Connectivity Issue',
    'cat-it-03': 'Microsoft 365 License & Educational Software',
    'cat-ac-01': 'Course Final Exam Grade Re-evaluation Request',
    'cat-ac-02': 'Schedule Conflict & Add-Drop Course Registration',
    'cat-ac-03': 'Official Transcript Copy & Graduation Certificate',
    'cat-fn-01': 'Tuition Payment Extension & Student Loan Support',
    'cat-fn-02': 'Tuition Transfer Verification & Electronic VAT Invoice',
    'cat-sa-01': 'Dormitory Room Application & Off-Campus Verification',
    'cat-sa-02': 'Student Status Certificate & Policy Loan Verification',
    'cat-sa-03': 'Training Point Appeal & Merit Scholarship Evaluation',
    'cat-kh-01': 'General Support Inquiry / Unclear Department',
  },
};

const translations: Record<Language, Record<string, string>> = {
  vi: {
    // Brand & Common
    app_name: 'UniSupport',
    app_subtitle: 'Hỗ trợ trực tuyến',
    app_desc: 'Hệ thống Hỗ trợ Sinh viên & Cán bộ',
    app_footer: '© {year} UniSupport System — Trường Đại học',
    language_name: 'Tiếng Việt',

    // Roles
    role_student: 'Sinh viên',
    role_staff: 'Chuyên viên',
    role_manager: 'Trưởng phòng',
    role_admin: 'Quản trị viên',

    // Header Nav
    nav_overview: 'Tổng quan',
    nav_dispatch: 'Chuyển đơn',
    nav_users: 'Tài khoản',
    nav_school_categories: 'Danh mục trường',
    nav_roles_permissions: 'Phân quyền người dùng',
    nav_processing_time: 'Thời gian xử lý',
    nav_staff_progress: 'Tiến độ cán bộ',
    nav_categories: 'Danh mục',
    nav_inbox: 'Hộp thư tiếp nhận',
    nav_history_reviews: 'Lịch sử & Đánh giá',
    nav_my_requests: 'Yêu cầu của tôi',
    nav_create_request: 'Tạo yêu cầu mới',

    // Notifications & User Menu
    notifications: 'Thông báo',
    notifications_empty: 'Hiện chưa có thông báo nào',
    notifications_mark_all: 'Đã đọc hết',
    notifications_new: 'mới',
    switch_role: 'Đổi vai trò người dùng',
    switch_role_desc: 'Chuyển sang 4 vai trò trong hệ thống',
    reset_data: 'Đặt lại dữ liệu',
    logout: 'Đăng xuất',
    close: 'Đóng',
    cancel: 'Hủy bỏ',
    save: 'Lưu thay đổi',
    confirm: 'Xác nhận',
    delete: 'Xóa',
    edit: 'Chỉnh sửa',
    search: 'Tìm kiếm',
    actions: 'Thao tác',
    view_details: 'Xem chi tiết',
    download: 'Tải về',
    loading: 'Đang tải...',
    realtime: 'Thời gian thực',
    all: 'Tất cả',
    unknown: 'Chưa xác định',

    // Ticket Statuses
    status_new: 'Chưa tiếp nhận',
    status_in_progress: 'Đang xử lý',
    status_pending: 'Cần bổ sung',
    status_pending_72h: 'Chờ bổ sung (72h)',
    status_resolved: 'Đã giải quyết',
    status_closed: 'Đã đóng',
    status_closed_perm: 'Đã đóng vĩnh viễn',
    status_all: 'Tất cả',

    // Student Portal
    student_title: 'Yêu cầu của tôi',
    student_desc: 'Theo dõi tiến độ, trao đổi và bổ sung hồ sơ trực tuyến theo thời gian thực',
    btn_create_ticket: 'Tạo yêu cầu mới',
    search_ticket_placeholder: 'Tìm theo tiêu đề, mã ticket...',
    no_tickets_found: 'Không tìm thấy yêu cầu nào',
    no_tickets_search: 'Không có kết quả nào khớp với từ khóa tìm kiếm của bạn.',
    no_tickets_resolved: 'Chưa có yêu cầu nào đã giải quyết.',
    no_tickets_closed: 'Chưa có yêu cầu nào đã đóng.',
    no_tickets_pending: 'Hiện không có yêu cầu nào cần bổ sung hồ sơ.',
    no_tickets_in_progress: 'Hiện không có yêu cầu nào đang xử lý.',
    no_tickets_new: 'Hiện không có yêu cầu nào đang chờ tiếp nhận.',
    no_tickets_term: 'Bạn chưa tạo yêu cầu hỗ trợ nào trong kỳ này.',
    btn_create_first: 'Tạo yêu cầu đầu tiên',
    date_sent: 'Ngày gửi',
    procedure: 'Thủ tục',
    attachments_count: 'tệp đính kèm',
    due_date: 'Hạn xử lý',
    btn_back_list: 'Quay lại danh sách yêu cầu',
    btn_back: 'Quay lại danh sách',
    has_resolution_result: 'Đã có kết quả',
    need_supplement: 'Cần bổ sung',

    // Create Ticket Form
    create_form_badge: 'Aurora University',
    create_form_title: 'Tạo yêu cầu hỗ trợ trực tuyến',
    create_form_desc: 'Vui lòng cung cấp chính xác thông tin để hồ sơ được chuyển đúng đơn vị giải quyết',
    form_dept_label: '1. Phòng ban tiếp nhận',
    form_dept_other: 'Khác - Không rõ phòng ban / Yêu cầu tổng hợp (Ban quản trị phân loại)',
    form_cat_label: '2. Danh mục',
    form_title_label: '3. Tiêu đề',
    form_title_placeholder: 'Ví dụ: Đơn xin phúc khảo kết quả thi môn Lập trình Web...',
    form_char_count: 'ký tự',
    form_content_label: '4. Nội dung',
    form_content_placeholder: 'Mô tả chi tiết vấn đề cần hỗ trợ, nguyện vọng cụ thể và thông tin liên hệ nếu cần...',
    form_files_label: '5. Tệp đính kèm (Nếu có)',
    form_files_dropzone: 'Bấm vào đây để tải lên tệp minh chứng',
    form_files_hint: 'Định dạng hỗ trợ: .png, .jpg, .pdf, .docx (Tối đa 5MB)',
    btn_submit: 'Gửi yêu cầu hỗ trợ',
    create_success_title: 'Gửi yêu cầu hỗ trợ thành công!',
    create_success_desc: 'Yêu cầu của bạn đã được tiếp nhận vào hàng chờ phòng ban với mã định danh:',
    create_success_notice: 'Hệ thống sẽ gửi thông báo In-app ngay khi chuyên viên phòng ban tiếp nhận và phản hồi.',
    btn_track_progress: 'Theo dõi tiến độ ngay',
    btn_create_another: 'Tạo đơn khác',

    // Ticket Details (Student & Staff)
    ticket_original_desc: 'Mô tả yêu cầu ban đầu:',
    ticket_attachments_label: 'Tệp đính kèm',
    ticket_view_download: 'Xem / Tải',
    timeline_title: 'Dòng thời gian xử lý (Timeline)',
    department_in_charge: 'Đơn vị phụ trách',
    in_charge_dept: 'Phòng ban:',
    in_charge_staff: 'Người phụ trách:',
    waiting_assignment: 'Đang chờ phân bổ',

    // Supplementary Info Modal & Banner
    supplement_banner_title: 'Cán bộ yêu cầu bổ sung thông tin hồ sơ',
    supplement_officer: 'Cán bộ:',
    supplement_deadline_72h: 'Hạn nộp: 72 giờ từ khi nhận thông báo',
    supplement_btn_action: 'Bổ sung thông tin ngay',
    supplement_modal_title: 'Bổ sung thông tin / Hồ sơ minh chứng',
    supplement_modal_officer_req: 'Yêu cầu từ cán bộ:',
    supplement_modal_content_label: 'Nội dung giải trình / Thông tin bổ sung',
    supplement_modal_content_placeholder: 'Nhập nội dung giải trình hoặc làm rõ thông tin được yêu cầu...',
    supplement_modal_upload_label: 'Tải thêm tệp đính kèm minh chứng',
    supplement_modal_upload_btn: 'Bấm để tải thêm tệp',
    supplement_modal_submit: 'Gửi bổ sung & Tiếp tục xử lý',
    timer_72h_expired: 'Đã hết hạn 72 giờ bổ sung',
    timer_remaining: 'Còn lại',

    // Resolution & CSAT
    resolved_banner_title: 'Yêu cầu đã được xử lý hoàn tất!',
    resolution_notes_label: 'Văn bản trả lời (Resolution Notes):',
    resolution_attachments_label: 'Văn bản kết quả đính kèm:',
    resolved_by_officer: 'Cán bộ giải quyết:',
    csat_btn_cta: 'Đánh giá mức độ hài lòng (CSAT)',
    csat_cta_sub: 'Chấm 1–5 sao để đóng đơn vĩnh viễn',
    csat_modal_title: 'Đánh giá mức độ hài lòng',
    csat_modal_subtitle: 'Góp ý của bạn giúp cải thiện chất lượng phục vụ của Nhà trường',
    csat_question: 'Bạn cảm thấy chất lượng hỗ trợ cho yêu cầu này như thế nào?',
    csat_rating_5: '★★★★★ Rất hài lòng',
    csat_rating_4: '★★★★☆ Hài lòng',
    csat_rating_3: '★★★☆☆ Tạm chấp nhận',
    csat_rating_2: '★★☆☆☆ Chưa hài lòng',
    csat_rating_1: '★☆☆☆☆ Rất không hài lòng',
    csat_feedback_label: 'Ý kiến đóng góp thêm (Không bắt buộc)',
    csat_feedback_placeholder: 'Nhập cảm nhận của bạn về thái độ phục vụ, tốc độ giải quyết...',
    csat_btn_later: 'Để sau',
    csat_btn_confirm: 'Xác nhận & Đóng đơn vĩnh viễn',
    closed_readonly_notice: 'Đơn đã đóng vĩnh viễn (Read-only) — Không thể chỉnh sửa hoặc thao tác thêm',
    closed_rating_label: 'Đánh giá:',
    closed_stars: 'sao',

    // Staff Portal
    staff_header_title: 'Hộp thư công việc phòng ban',
    staff_header_desc: 'Tiếp nhận yêu cầu mới, giải quyết chuyên môn và cập nhật kết quả cho sinh viên',
    staff_subtab_unclaimed: 'Chưa tiếp nhận',
    staff_subtab_active: 'Đang xử lý',
    staff_subtab_pending: 'Chờ bổ sung',
    staff_search_placeholder: 'Tìm theo tiêu đề, MSSV, mã đơn...',
    staff_empty_queue: 'Hàng chờ trống',
    staff_empty_queue_desc: 'Không có ticket nào trong danh mục này cần xử lý.',
    col_ticket_id: 'Mã yêu cầu',
    col_student: 'Sinh viên',
    col_title_category: 'Tiêu đề & Danh mục',
    col_sla_due: 'Thời hạn xử lý',
    btn_claim: 'Tiếp nhận xử lý',
    btn_resolve: 'Hoàn thành xử lý',
    btn_request_info: 'Yêu cầu bổ sung',
    btn_wrong_dept: 'Báo sai phòng ban',
    btn_update_progress: 'Cập nhật tiến độ',
    staff_history_title: 'Lịch sử đơn đã giải quyết & Đánh giá chất lượng',
    staff_history_desc: 'Toàn bộ các đơn do bạn đã hoàn tất xử lý và phản hồi đánh giá CSAT từ sinh viên',
    staff_history_empty: 'Chưa có đơn nào đã giải quyết trong lịch sử.',
    staff_concurrency_error: 'Xung đột: Không thể tiếp nhận ticket này!',
    staff_claim_modal_title: 'Tiếp nhận yêu cầu & Thiết lập thời hạn xử lý',
    staff_claim_modal_sub: 'Cán bộ tự thiết lập thời gian cam kết giải quyết cho yêu cầu này (Tối đa 1 tuần - 7 ngày)',
    staff_processing_time_label: 'Thời gian xử lý dự kiến:',
    staff_processing_max_notice: 'Quy định: Thời gian xử lý tối đa không quá 1 tuần (7 ngày / 168 giờ)',
    staff_preset_1d: '1 ngày (24h)',
    staff_preset_2d: '2 ngày (48h)',
    staff_preset_3d: '3 ngày (72h)',
    staff_preset_5d: '5 ngày (120h)',
    staff_preset_7d: '7 ngày (1 tuần)',
    staff_custom_time_label: 'Chọn số ngày / số giờ tùy chỉnh:',
    staff_days_unit: 'ngày',
    staff_hours_unit: 'giờ',
    staff_estimated_deadline: 'Hạn chót cam kết hoàn tất:',
    staff_claim_note_label: 'Ghi chú tiếp nhận ban đầu (Không bắt buộc):',
    staff_claim_note_placeholder: 'Ví dụ: Đã tiếp nhận hồ sơ, dự kiến rà soát và trả kết quả vào thứ Sáu...',
    staff_claim_confirm_btn: 'Xác nhận tiếp nhận',
    staff_claim_max_err: 'Thời gian xử lý không được vượt quá 1 tuần (7 ngày / 168 giờ)!',
    staff_claim_min_err: 'Thời gian xử lý tối thiểu là 1 giờ!',
    staff_adjust_time_btn: 'Thời gian xử lý',
    staff_adjust_modal_title: 'Điều chỉnh thời gian xử lý yêu cầu',
    staff_adjust_confirm_btn: 'Cập nhật thời hạn',
    staff_toast_claimed_with_deadline: 'Đã tiếp nhận yêu cầu #{id} với thời hạn xử lý là {duration}!',
    staff_toast_adjusted_deadline: 'Đã cập nhật thời hạn xử lý của yêu cầu #{id}!',
    staff_committed_deadline_badge: 'Thời hạn xử lý do cán bộ cam kết:',

    // Staff Modals
    modal_resolve_title: 'Hoàn tất xử lý & Phản hồi kết quả',
    modal_resolve_notes_label: 'Nội dung trả lời sinh viên / Kết quả xử lý',
    modal_resolve_notes_placeholder: 'Nhập kết quả xử lý chi tiết, hướng dẫn sinh viên các bước tiếp theo nếu có...',
    modal_resolve_files_label: 'Tệp đính kèm kết quả (Văn bản có dấu, minh chứng...)',
    modal_resolve_submit: 'Xác nhận hoàn thành & Gửi kết quả',
    modal_request_info_title: 'Yêu cầu sinh viên bổ sung hồ sơ (Hạn 72h)',
    modal_request_info_label: 'Lý do yêu cầu bổ sung / Tài liệu còn thiếu',
    modal_request_info_placeholder: 'Ví dụ: Thiếu giấy báo thi, ảnh chụp mờ không rõ số báo danh...',
    modal_request_info_submit: 'Gửi yêu cầu bổ sung',
    modal_wrong_dept_title: 'Báo cáo yêu cầu sai phòng ban',
    modal_wrong_dept_label: 'Lý do & Đề xuất đơn vị đúng',
    modal_wrong_dept_placeholder: 'Ví dụ: Đơn này thuộc thẩm quyền của Phòng Đào tạo (AC), đề nghị chuyển phòng...',
    modal_wrong_dept_submit: 'Gửi về Ban Quản trị điều phối',

    // Manager Portal
    mgr_header_title: 'Quản lý & Điều phối Phòng ban',
    mgr_header_desc: 'Theo dõi tiến độ, thời gian xử lý, phân công nhân sự và quản lý danh mục dịch vụ',
    mgr_total_received: 'Tổng tiếp nhận trong tháng',
    mgr_total_received_sub: 'Toàn bộ yêu cầu gửi về phòng ban',
    mgr_in_progress: 'Đang xử lý / Tiếp nhận',
    mgr_in_progress_sub: 'Gồm Chưa nhận và Đang xử lý',
    mgr_on_time: 'Hoàn thành đúng hạn',
    mgr_on_time_sub: 'Đã giải quyết và đóng đơn',
    mgr_overdue: 'Cảnh báo trễ hạn xử lý',
    mgr_overdue_sub: 'Đơn vượt quá thời gian cam kết',
    mgr_tickets_tab_title: 'Quản lý thời gian xử lý & Điều phối đơn',
    mgr_tickets_tab_desc: 'Theo dõi danh sách yêu cầu, cảnh báo nguy cơ trễ hạn SLA và tái phân công cán bộ',
    mgr_staff_perf_title: 'Báo cáo hiệu suất cán bộ xử lý',
    mgr_staff_perf_desc: 'Thống kê khối lượng công việc, tỷ lệ hoàn thành đúng hạn và điểm CSAT từng cán bộ',
    mgr_categories_title: 'Cấu hình Danh mục Thủ tục Dịch vụ',
    mgr_categories_desc: 'Thêm, cập nhật và kích hoạt các thủ tục dịch vụ trực tuyến của phòng ban',
    btn_add_category: 'Thêm danh mục mới',
    btn_reassign: 'Phân công',
    col_staff_name: 'Cán bộ',
    col_staff_active_tickets: 'Đang xử lý',
    col_staff_completed: 'Đã hoàn thành',
    col_staff_csat: 'Điểm CSAT',
    col_cat_code: 'Mã',
    col_cat_name: 'Tên danh mục thủ tục',
    col_cat_sla: 'Định mức SLA',
    col_cat_status: 'Trạng thái',
    cat_active: 'Đang mở tiếp nhận',
    cat_inactive: 'Đang tạm dừng',

    // Admin Portal
    admin_top3_title: 'Top 3 phòng ban có điểm đánh giá CSAT cao nhất',
    admin_top3_sub: 'Dựa trên khảo sát mức độ hài lòng thực tế của sinh viên',
    btn_view_all: 'Xem tất cả',
    admin_modal_all_depts_title: 'Xếp hạng điểm đánh giá toàn bộ phòng ban',
    admin_modal_all_depts_sub: 'Dữ liệu khảo sát mức độ hài lòng của sinh viên theo thời gian thực',
    admin_dispatch_title: 'Hàng chờ điều phối & Định tuyến đơn',
    admin_dispatch_sub: 'Phân loại các đơn danh mục "Khác" và các đơn được cán bộ báo "Sai phòng ban"',
    tab_other_queue: 'Yêu cầu "Khác"',
    tab_wrong_queue: 'Yêu cầu "Sai phòng ban"',
    dispatch_other_title: 'Hàng chờ các đơn sinh viên chọn danh mục "Khác - Không rõ phòng ban"',
    dispatch_other_sub: 'Quản trị viên đọc nội dung thắc mắc và chuyển đơn về đúng phòng ban chuyên môn',
    dispatch_wrong_title: 'Hàng chờ các đơn bị nhân viên báo "Sai phòng ban"',
    dispatch_wrong_sub: 'Xem ghi chú lý do sai phòng ban từ cán bộ và chuyển sang phòng ban xử lý chính xác',
    dispatch_target_dept: 'Chuyển sang phòng:',
    dispatch_reroute_target: 'Điều chuyển sang phòng:',
    dispatch_btn_route: 'Chuyển đơn này',
    dispatch_btn_confirm: 'Xác nhận điều chuyển',
    dispatch_admin_note: 'Ghi chú điều chuyển (Tùy chọn)...',
    admin_users_title: 'Quản lý tài khoản & Phân quyền nhân sự',
    admin_users_sub: 'Thêm mới, khóa tài khoản và thiết lập mật khẩu truy cập hệ thống',
    btn_add_user: 'Thêm tài khoản',
    btn_import_csv: 'Nạp tệp CSV',
    col_code: 'Mã định danh',
    col_name: 'Họ và tên',
    col_role: 'Vai trò (Role)',
    col_dept_class: 'Đơn vị / Lớp',
    col_status: 'Trạng thái',
    col_actions: 'Thao tác',
    btn_reset_pwd: 'Đặt lại Mật Khẩu',
    btn_lock: 'Khóa',
    btn_unlock: 'Mở khóa',
    status_active: 'Đang hoạt động',
    status_locked: 'Đã khóa',
    admin_school_cats_title: 'Danh mục thủ tục toàn trường',
    admin_roles_title: 'Bảng ma trận phân quyền người dùng (RBAC)',
    admin_header_title: 'Trung tâm Quản trị Toàn trường',
    admin_header_desc: 'Bao quát toàn trường, điều phối định tuyến đơn ngoại lệ, quản lý tài khoản & phân quyền',
    admin_kpi_total_tickets: 'Tổng Yêu Cầu',
    admin_kpi_on_time_rate: 'Tỷ lệ xử lý đúng hạn',
    admin_kpi_need_dispatch: 'Đơn cần điều phối',
    admin_kpi_accounts: 'Tài khoản hoạt động',
    admin_dept_resolution_rates: 'Tỷ lệ hoàn thành theo từng phòng ban',
    admin_satisfaction: 'Mức độ hài lòng',
    admin_total_rated: 'Lượt đánh giá',
    admin_resolved_count: 'Đơn đã giải quyết',
    admin_rbac_permissions_total: 'Tổng số quyền',
    admin_rbac_action: 'Chức năng / Quyền hạn',
    admin_rbac_desc: 'Mô tả hành động',

    // Login View
    login_heading: 'Hệ thống Tư vấn & Hỗ trợ UniSupport',
    login_subheading: 'Cổng tiếp nhận và giải quyết thủ tục trực tuyến dành cho Sinh viên & Cán bộ',
    login_code_label: 'Mã số sinh viên / Mã cán bộ',
    login_code_placeholder: 'Nhập mã MSSV hoặc mã cán bộ...',
    login_pass_label: 'Mật khẩu',
    login_pass_placeholder: 'Nhập mật khẩu của bạn...',
    btn_login: 'Đăng nhập hệ thống',
    quick_login_title: 'Đăng nhập nhanh theo vai trò (Dành cho kiểm thử)',
    switch_lang_tooltip: 'Chuyển sang tiếng Anh / Switch to English',
    login_lockout_title: 'Tài khoản bị tạm khóa đăng nhập',
    login_lockout_desc: 'Bạn đã nhập sai mật khẩu 5 lần liên tiếp để bảo đảm an toàn. Hệ thống tự động khóa tạm thời:',
    login_lockout_time: 'Thời gian mở lại:',
    login_lockout_minutes: 'phút',
    login_lockout_seconds: 'giây',
    login_notice_title: 'Lưu ý:',
    login_notice_desc: 'Tài khoản được đồng bộ và cấp tự động bởi Nhà trường. Trường hợp quên mật khẩu, sinh viên và cán bộ vui lòng liên hệ trực tiếp Phòng CNTT / Phòng Dịch vụ Sinh viên để được xác minh và cấp lại.',
    login_recover_admin: 'Khôi phục quyền truy cập Quản trị viên',
    login_quick_roles_title: 'Chọn nhanh tài khoản thử nghiệm theo vai trò:',
    login_admin_modal_title: 'Khôi phục mật khẩu Quản trị viên',
    login_admin_modal_desc: 'Dành riêng cho tài khoản quản trị trường học. Mã xác thực sẽ được gửi về hộp thư điện tử chính thức của Nhà trường.',
    login_admin_code_sent: 'Mã xác thực đã được gửi tới',
    login_admin_check_inbox: 'Vui lòng kiểm tra hòm thư quản trị viên.',
    login_btn_send_code: 'Gửi mã xác thực qua Email',

    // Session Modal
    session_invalid_title: 'Hết phiên đăng nhập',
    session_invalid_desc: 'Thời gian đăng nhập đã hết hạn hoặc tài khoản của bạn đã bị tạm khóa bởi Quản trị viên.',
    session_invalid_sub: 'Vui lòng đăng nhập lại bằng tài khoản hợp lệ để tiếp tục sử dụng.',
    btn_back_to_login: 'Về trang đăng nhập',

    // All Ratings Modal & Admin RBAC
    admin_all_ratings_modal_title: 'Bảng Xếp Hạng Đánh Giá Toàn Bộ Phòng Ban',
    admin_all_ratings_modal_sub: 'Thống kê điểm số hài lòng CSAT và chi tiết hiệu suất của tất cả phòng ban toàn trường',
    admin_total_departments: 'Tổng phòng ban',
    admin_school_avg_score: 'Điểm TB Toàn trường',
    admin_avg_satisfaction: 'Mức độ hài lòng TB',
    admin_rank: 'Hạng',
    admin_col_department: 'Phòng ban',
    admin_col_resolved_tickets: 'Đơn đã giải quyết',
    admin_col_rated_count: 'Lượt đánh giá',
    admin_col_csat_score: 'Điểm CSAT',
    admin_col_satisfaction: 'Hài lòng',
    admin_ratings_realtime_note: '💡 Dữ liệu được tổng hợp thời gian thực từ phản hồi sau khi sinh viên hoàn thành đơn.',
    admin_dept_code: 'Mã:',
    admin_dept_manager: 'Quản lý:',
    admin_unassigned: 'Chưa gán',
    admin_tickets_suffix: 'đơn',
    admin_rbac_module: 'Phân hệ:',
    admin_rbac_allowed: 'Được phép thực hiện',
    admin_rbac_denied: 'Không có quyền',
    admin_rbac_footer_note: '* Quản trị viên có thể xem xét và điều chỉnh quyền hạn theo quy định nội bộ của nhà trường',
    toast_assigned_staff: 'Đã phân công cán bộ {name} phụ trách ticket {id}',
  },
  en: {
    // Brand & Common
    app_name: 'UniSupport',
    app_subtitle: 'Online Support',
    app_desc: 'Student & Staff Institutional Support System',
    app_footer: '© {year} UniSupport System — University Portal',
    language_name: 'English',

    // Roles
    role_student: 'Student',
    role_staff: 'Specialist',
    role_manager: 'Manager',
    role_admin: 'Admin',

    // Header Nav
    nav_overview: 'Overview',
    nav_dispatch: 'Dispatch',
    nav_users: 'Users',
    nav_school_categories: 'School Categories',
    nav_roles_permissions: 'Permissions Matrix',
    nav_processing_time: 'Processing Time',
    nav_staff_progress: 'Staff Progress',
    nav_categories: 'Categories',
    nav_inbox: 'Inbox',
    nav_history_reviews: 'History & Reviews',
    nav_my_requests: 'My Requests',
    nav_create_request: 'Create Request',

    // Notifications & User Menu
    notifications: 'Notifications',
    notifications_empty: 'No notifications at this time',
    notifications_mark_all: 'Mark all as read',
    notifications_new: 'new',
    switch_role: 'Switch User Role',
    switch_role_desc: 'Switch among 4 system roles',
    reset_data: 'Reset Demo Data',
    logout: 'Log Out',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save Changes',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    actions: 'Actions',
    view_details: 'View Details',
    download: 'Download',
    loading: 'Loading...',
    realtime: 'Real-time',
    all: 'All',
    unknown: 'Unknown',

    // Ticket Statuses
    status_new: 'Unclaimed',
    status_in_progress: 'In Progress',
    status_pending: 'Pending Info',
    status_pending_72h: 'Pending Info (72h)',
    status_resolved: 'Resolved',
    status_closed: 'Closed',
    status_closed_perm: 'Permanently Closed',
    status_all: 'All',

    // Student Portal
    student_title: 'My Requests',
    student_desc: 'Track progress, communicate and submit supplementary documents in real time',
    btn_create_ticket: '+ Create New Request',
    search_ticket_placeholder: 'Search by title, ticket code...',
    no_tickets_found: 'No requests found',
    no_tickets_search: 'No requests match your search keywords.',
    no_tickets_resolved: 'No resolved requests yet.',
    no_tickets_closed: 'No closed requests yet.',
    no_tickets_pending: 'No requests currently requiring additional documents.',
    no_tickets_in_progress: 'No requests currently in progress.',
    no_tickets_new: 'No requests currently unclaimed.',
    no_tickets_term: "You haven't submitted any support requests this term.",
    btn_create_first: 'Create First Request',
    date_sent: 'Submitted',
    procedure: 'Procedure',
    attachments_count: 'attachments',
    due_date: 'Due Date',
    btn_back_list: 'Back to request list',
    btn_back: 'Back to list',
    has_resolution_result: 'Resolved',
    need_supplement: 'Info Required',

    // Create Ticket Form
    create_form_badge: 'Aurora University',
    create_form_title: 'Create Online Support Request',
    create_form_desc: 'Please provide accurate information so your request is routed to the correct department',
    form_dept_label: '1. Receiving Department',
    form_dept_other: 'Other - Unclear department / General inquiry (Admin routed)',
    form_cat_label: '2. Category',
    form_title_label: '3. Title',
    form_title_placeholder: 'E.g.: Request for exam grade reconsideration...',
    form_char_count: 'characters',
    form_content_label: '4. Content',
    form_content_placeholder: 'Describe your issue in detail, specific requests and contact details if needed...',
    form_files_label: '5. Attachments (Optional)',
    form_files_dropzone: 'Click here to upload supporting files',
    form_files_hint: 'Supported formats: .png, .jpg, .pdf, .docx (Max 5MB)',
    btn_submit: 'Submit Support Request',
    create_success_title: 'Support request submitted successfully!',
    create_success_desc: 'Your request has been placed in the departmental queue with reference ID:',
    create_success_notice: 'The system will send an in-app notification as soon as a specialist responds.',
    btn_track_progress: 'Track Progress Now',
    btn_create_another: 'Create Another Request',

    // Ticket Details (Student & Staff)
    ticket_original_desc: 'Initial Request Description:',
    ticket_attachments_label: 'Attachments',
    ticket_view_download: 'View / Download',
    timeline_title: 'Processing Timeline',
    department_in_charge: 'Responsible Unit',
    in_charge_dept: 'Department:',
    in_charge_staff: 'Assignee:',
    waiting_assignment: 'Awaiting assignment',

    // Supplementary Info Modal & Banner
    supplement_banner_title: 'Officer requested additional information/documents',
    supplement_officer: 'Officer:',
    supplement_deadline_72h: 'Deadline: 72 hours from notification',
    supplement_btn_action: 'Submit Supplementary Info Now',
    supplement_modal_title: 'Submit Supplementary Information / Documents',
    supplement_modal_officer_req: 'Officer Request:',
    supplement_modal_content_label: 'Explanation / Additional Information',
    supplement_modal_content_placeholder: 'Provide your explanation or requested clarifications...',
    supplement_modal_upload_label: 'Upload Additional Supporting Documents',
    supplement_modal_upload_btn: 'Click to upload additional files',
    supplement_modal_submit: 'Submit & Resume Processing',
    timer_72h_expired: '72-hour supplement period expired',
    timer_remaining: 'Time remaining',

    // Resolution & CSAT
    resolved_banner_title: 'Request has been successfully resolved!',
    resolution_notes_label: 'Resolution Notes & Outcome:',
    resolution_attachments_label: 'Attached Outcome Documents:',
    resolved_by_officer: 'Resolved by:',
    csat_btn_cta: 'Rate Satisfaction (CSAT)',
    csat_cta_sub: 'Rate 1–5 stars to permanently close ticket',
    csat_modal_title: 'Service Satisfaction Evaluation',
    csat_modal_subtitle: 'Your feedback directly helps improve University institutional services',
    csat_question: 'How satisfied are you with the resolution of this support request?',
    csat_rating_5: '★★★★★ Very Satisfied',
    csat_rating_4: '★★★★☆ Satisfied',
    csat_rating_3: '★★★☆☆ Neutral / Acceptable',
    csat_rating_2: '★★☆☆☆ Unsatisfied',
    csat_rating_1: '★☆☆☆☆ Very Unsatisfied',
    csat_feedback_label: 'Additional Comments (Optional)',
    csat_feedback_placeholder: 'Share your thoughts regarding response speed, service quality...',
    csat_btn_later: 'Maybe Later',
    csat_btn_confirm: 'Confirm & Permanently Close Ticket',
    closed_readonly_notice: 'Permanently Closed (Read-only) — No further modifications allowed',
    closed_rating_label: 'Rating:',
    closed_stars: 'stars',

    // Staff Portal
    staff_header_title: 'Department Work Inbox',
    staff_header_desc: 'Claim new inquiries, provide specialist resolution and deliver results to students',
    staff_subtab_unclaimed: 'Unclaimed',
    staff_subtab_active: 'In Progress',
    staff_subtab_pending: 'Pending Info',
    staff_search_placeholder: 'Search by title, student ID, ticket code...',
    staff_empty_queue: 'Queue is Empty',
    staff_empty_queue_desc: 'No tickets in this section requiring action.',
    col_ticket_id: 'Ticket ID',
    col_student: 'Student',
    col_title_category: 'Title & Category',
    col_sla_due: 'SLA Deadline',
    btn_claim: 'Claim Request',
    btn_resolve: 'Complete & Resolve',
    btn_request_info: 'Request Supplementary Info',
    btn_wrong_dept: 'Report Wrong Department',
    btn_update_progress: 'Update Progress',
    staff_history_title: 'Resolved Request History & Quality Reviews',
    staff_history_desc: 'All requests successfully completed by you with student CSAT satisfaction evaluations',
    staff_history_empty: 'No resolved tickets in your history yet.',
    staff_concurrency_error: 'Conflict: This ticket could not be claimed!',
    staff_claim_modal_title: 'Accept Request & Set Processing Deadline',
    staff_claim_modal_sub: 'Officer sets the committed processing time for this inquiry (Maximum 1 week - 7 days)',
    staff_processing_time_label: 'Estimated processing duration:',
    staff_processing_max_notice: 'Policy: Maximum processing time cannot exceed 1 week (7 days / 168 hours)',
    staff_preset_1d: '1 day (24h)',
    staff_preset_2d: '2 days (48h)',
    staff_preset_3d: '3 days (72h)',
    staff_preset_5d: '5 days (120h)',
    staff_preset_7d: '7 days (1 week)',
    staff_custom_time_label: 'Select or customize number of days / hours:',
    staff_days_unit: 'days',
    staff_hours_unit: 'hours',
    staff_estimated_deadline: 'Committed completion deadline:',
    staff_claim_note_label: 'Initial acceptance note (Optional):',
    staff_claim_note_placeholder: 'E.g.: File received, scheduled to review and deliver outcome by Friday...',
    staff_claim_confirm_btn: 'Confirm Acceptance',
    staff_claim_max_err: 'Processing duration cannot exceed 1 week (7 days / 168 hours)!',
    staff_claim_min_err: 'Minimum processing duration is 1 hour!',
    staff_adjust_time_btn: 'Processing Time',
    staff_adjust_modal_title: 'Adjust Processing Deadline',
    staff_adjust_confirm_btn: 'Update Deadline',
    staff_toast_claimed_with_deadline: 'Accepted ticket #{id} with a processing deadline of {duration}!',
    staff_toast_adjusted_deadline: 'Updated processing deadline for ticket #{id}!',
    staff_committed_deadline_badge: 'Officer committed deadline:',

    // Staff Modals
    modal_resolve_title: 'Complete Resolution & Deliver Outcome',
    modal_resolve_notes_label: 'Student Response Notes / Resolution Details',
    modal_resolve_notes_placeholder: 'Enter detailed resolution outcome and next steps for student...',
    modal_resolve_files_label: 'Outcome Attachments (Official stamped files, proofs...)',
    modal_resolve_submit: 'Confirm Resolution & Deliver',
    modal_request_info_title: 'Request Student Supplement (72h Deadline)',
    modal_request_info_label: 'Reason for Supplement / Missing Documents',
    modal_request_info_placeholder: 'E.g.: Missing examination notice, blurry student card image...',
    modal_request_info_submit: 'Send Supplement Request',
    modal_wrong_dept_title: 'Report Wrong Department Request',
    modal_wrong_dept_label: 'Reason & Suggested Correct Department',
    modal_wrong_dept_placeholder: 'E.g.: This belongs to Academic Affairs (AC), suggest transferring...',
    modal_wrong_dept_submit: 'Send to Admin Dispatch',

    // Manager Portal
    mgr_header_title: 'Department Management & Dispatch',
    mgr_header_desc: 'Monitor progress, processing times, staff assignments and procedure categories',
    mgr_total_received: 'Total Received This Month',
    mgr_total_received_sub: 'All requests submitted to this department',
    mgr_in_progress: 'In Progress / Unclaimed',
    mgr_in_progress_sub: 'Including Unclaimed and In Progress',
    mgr_on_time: 'Completed On Time',
    mgr_on_time_sub: 'Resolved and closed on schedule',
    mgr_overdue: 'Overdue SLA Warning',
    mgr_overdue_sub: 'Requests exceeding standard processing time',
    mgr_tickets_tab_title: 'Processing Time Monitoring & Dispatch',
    mgr_tickets_tab_desc: 'Monitor ticket list, SLA breach risk warnings, and reassign officers',
    mgr_staff_perf_title: 'Specialist Performance Report',
    mgr_staff_perf_desc: 'Workload statistics, on-time resolution rate, and CSAT ratings per officer',
    mgr_categories_title: 'Service Category Configuration',
    mgr_categories_desc: 'Add, update and activate departmental online service categories',
    btn_add_category: 'Add New Category',
    btn_reassign: 'Assign',
    col_staff_name: 'Specialist',
    col_staff_active_tickets: 'In Progress',
    col_staff_completed: 'Completed',
    col_staff_csat: 'CSAT Rating',
    col_cat_code: 'Code',
    col_cat_name: 'Category Name',
    col_cat_sla: 'SLA Quota',
    col_cat_status: 'Status',
    cat_active: 'Accepting Requests',
    cat_inactive: 'Temporarily Paused',

    // Admin Portal
    admin_top3_title: 'Top 3 Departments by CSAT Rating',
    admin_top3_sub: 'Based on verified student satisfaction evaluations',
    btn_view_all: 'View All',
    admin_modal_all_depts_title: 'Full Department CSAT Satisfaction Ranking',
    admin_modal_all_depts_sub: 'Real-time verified student survey ratings and satisfaction rates',
    admin_dispatch_title: 'Dispatch & Routing Queue',
    admin_dispatch_sub: 'Route requests from "Other" category and tickets flagged as "Wrong Department"',
    tab_other_queue: '"Other" Inquiries',
    tab_wrong_queue: '"Wrong Dept" Inquiries',
    dispatch_other_title: 'Queue for requests marked "Other - Unclear Department"',
    dispatch_other_sub: 'Administrator reviews inquiry content and routes to the proper functional department',
    dispatch_wrong_title: 'Queue for requests reported as "Wrong Department"',
    dispatch_wrong_sub: 'Review specialist misrouting notes and transfer to the correct department',
    dispatch_target_dept: 'Transfer to department:',
    dispatch_reroute_target: 'Re-route to department:',
    dispatch_btn_route: 'Transfer Ticket',
    dispatch_btn_confirm: 'Confirm Re-routing',
    dispatch_admin_note: 'Routing note (Optional)...',
    admin_users_title: 'User Accounts & Access Management',
    admin_users_sub: 'Add users, lock accounts and reset system access passwords',
    btn_add_user: 'Add User',
    btn_import_csv: 'Import CSV',
    col_code: 'User ID / Code',
    col_name: 'Full Name',
    col_role: 'Role',
    col_dept_class: 'Department / Class',
    col_status: 'Status',
    col_actions: 'Actions',
    btn_reset_pwd: 'Reset Password',
    btn_lock: 'Lock',
    btn_unlock: 'Unlock',
    status_active: 'Active',
    status_locked: 'Locked',
    admin_school_cats_title: 'Campus-wide Service Categories',
    admin_roles_title: 'User Role-Based Access Matrix (RBAC)',
    admin_header_title: 'Campus Administration Center',
    admin_header_desc: 'Campus oversight, exceptional ticket dispatching, user account & permission control',
    admin_kpi_total_tickets: 'Total Requests',
    admin_kpi_on_time_rate: 'On-time Resolution Rate',
    admin_kpi_need_dispatch: 'Awaiting Dispatch',
    admin_kpi_accounts: 'Active Accounts',
    admin_dept_resolution_rates: 'Resolution Rate by Department',
    admin_satisfaction: 'Satisfaction',
    admin_total_rated: 'Total Reviews',
    admin_resolved_count: 'Resolved Requests',
    admin_rbac_permissions_total: 'Total Permissions',
    admin_rbac_action: 'Function / Permission',
    admin_rbac_desc: 'Action Description',

    // Login View
    login_heading: 'UniSupport Online Portal',
    login_subheading: 'Online institutional desk for Student & Staff inquiries and procedures',
    login_code_label: 'Student ID / Staff Code',
    login_code_placeholder: 'Enter student ID or staff code...',
    login_pass_label: 'Password',
    login_pass_placeholder: 'Enter your password...',
    btn_login: 'Log in to System',
    quick_login_title: 'Quick Role Login (For Testing)',
    switch_lang_tooltip: 'Chuyển sang tiếng Việt / Switch to Vietnamese',
    login_lockout_title: 'Account Temporarily Locked',
    login_lockout_desc: 'You entered the wrong password 5 consecutive times for security. The system has temporarily locked access:',
    login_lockout_time: 'Unlocks in:',
    login_lockout_minutes: 'minutes',
    login_lockout_seconds: 'seconds',
    login_notice_title: 'Notice:',
    login_notice_desc: 'Accounts are synchronized and issued automatically by the University. If forgotten, students and staff please contact the IT Office / Student Services Office for verification and password reset.',
    login_recover_admin: 'Recover Administrator Access',
    login_quick_roles_title: 'Quick test account login by role:',
    login_admin_modal_title: 'Administrator Password Recovery',
    login_admin_modal_desc: 'Exclusive for university administrator accounts. A verification code will be sent to the official university email address.',
    login_admin_code_sent: 'Verification code has been sent to',
    login_admin_check_inbox: 'Please check your administrator email inbox.',
    login_btn_send_code: 'Send Verification Code via Email',

    // Session Modal
    session_invalid_title: 'Session Expired',
    session_invalid_desc: 'Your login session has expired or your account has been locked by an Administrator.',
    session_invalid_sub: 'Please log in again with valid credentials to continue using the system.',
    btn_back_to_login: 'Back to Login Page',

    // All Ratings Modal & Admin RBAC
    admin_all_ratings_modal_title: 'Campus-wide Department Rating Rankings',
    admin_all_ratings_modal_sub: 'CSAT satisfaction scores and performance breakdown for all university departments',
    admin_total_departments: 'Total Departments',
    admin_school_avg_score: 'Campus Avg Score',
    admin_avg_satisfaction: 'Avg Satisfaction',
    admin_rank: 'Rank',
    admin_col_department: 'Department',
    admin_col_resolved_tickets: 'Resolved Tickets',
    admin_col_rated_count: 'Ratings Count',
    admin_col_csat_score: 'CSAT Score',
    admin_col_satisfaction: 'Satisfaction',
    admin_ratings_realtime_note: '💡 Data is aggregated in real time from feedback after students complete requests.',
    admin_dept_code: 'Code:',
    admin_dept_manager: 'Manager:',
    admin_unassigned: 'Unassigned',
    admin_tickets_suffix: 'tickets',
    admin_rbac_module: 'Module:',
    admin_rbac_allowed: 'Authorized',
    admin_rbac_denied: 'Not Authorized',
    admin_rbac_footer_note: '* Administrators can review and adjust permissions according to institutional regulations',
    toast_assigned_staff: 'Assigned specialist {name} to ticket {id}',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'en' || saved === 'vi' ? saved : 'vi';
    } catch {
      return 'vi';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage unavailable fallback
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    if (translations.vi[key]) {
      return translations.vi[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  const getDeptName = (deptIdOrName?: string): string => {
    if (!deptIdOrName) return '';
    // Look up by deptId
    if (departmentTranslations[language][deptIdOrName]) {
      return departmentTranslations[language][deptIdOrName];
    }
    // Check if input is a Vietnamese name and return English if language is 'en'
    if (language === 'en') {
      for (const [id, viName] of Object.entries(departmentTranslations.vi)) {
        if (viName.toLowerCase() === deptIdOrName.toLowerCase()) {
          return departmentTranslations.en[id] || deptIdOrName;
        }
      }
    }
    return deptIdOrName;
  };

  const getCatName = (catIdOrName?: string): string => {
    if (!catIdOrName) return '';
    if (categoryTranslations[language][catIdOrName]) {
      return categoryTranslations[language][catIdOrName];
    }
    if (language === 'en') {
      for (const [id, viName] of Object.entries(categoryTranslations.vi)) {
        if (viName.toLowerCase() === catIdOrName.toLowerCase()) {
          return categoryTranslations.en[id] || catIdOrName;
        }
      }
    }
    return catIdOrName;
  };

  const getRoleName = (role?: Role | string): string => {
    switch (role) {
      case 'student':
        return t('role_student');
      case 'staff':
        return t('role_staff');
      case 'manager':
        return t('role_manager');
      case 'admin':
        return t('role_admin');
      default:
        return String(role || '');
    }
  };

  const formatDate = (dateStr: string | number | Date, options?: Intl.DateTimeFormatOptions): string => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(language === 'en' ? 'en-US' : 'vi-VN', options);
    } catch {
      return String(dateStr);
    }
  };

  const formatDateTime = (dateStr: string | number | Date): string => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString(language === 'en' ? 'en-US' : 'vi-VN');
    } catch {
      return String(dateStr);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        getDeptName,
        getCatName,
        getRoleName,
        formatDate,
        formatDateTime,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
