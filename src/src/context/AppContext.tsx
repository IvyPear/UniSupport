import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  User,
  Role,
  Ticket,
  Department,
  Category,
  InAppNotification,
  RbacPermission,
  TicketStatus,
  TicketAttachment,
  TicketTimelineItem,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_CATEGORIES,
  INITIAL_TICKETS,
  INITIAL_NOTIFICATIONS,
  INITIAL_RBAC_PERMISSIONS,
} from '../data/initialData';

interface LoginAttemptState {
  failedAttempts: number;
  lockUntil: number | null; // timestamp ms
}

interface AppContextType {
  // Auth & User
  currentUser: User | null;
  users: User[];
  sessionInvalid: boolean;
  loginAttempts: LoginAttemptState;
  login: (code: string, pass: string) => { success: boolean; message?: string; lockedOut?: boolean; remainingSeconds?: number };
  quickLoginAs: (user: User) => void;
  logout: () => void;
  clearSessionInvalid: () => void;

  // Data
  departments: Department[];
  categories: Category[];
  tickets: Ticket[];
  notifications: InAppNotification[];
  rbacPermissions: RbacPermission[];

  // Navigation
  activeTab: string;
  selectedTicketId: string | null;
  navigate: (screen: string, ticketId?: string | null) => void;

  // Ticket Operations
  createTicket: (data: {
    title: string;
    description: string;
    categoryId: string;
    departmentId: string;
    attachments: TicketAttachment[];
    isOtherCategory: boolean;
  }) => { success: boolean; ticketId: string };
  claimTicket: (ticketId: string, processingHours?: number, note?: string) => { success: boolean; error?: string };
  adjustProcessingDeadline: (ticketId: string, newHours: number, note?: string) => { success: boolean; error?: string };
  assignTicket: (ticketId: string, assigneeId: string) => { success: boolean; error?: string };
  updateTicketProgress: (ticketId: string, note: string) => { success: boolean };
  requestSupplementaryInfo: (ticketId: string, reason: string) => { success: boolean; error?: string };
  submitSupplementaryInfo: (ticketId: string, content: string, attachments: TicketAttachment[]) => { success: boolean; error?: string };
  reportWrongDepartment: (ticketId: string, reason: string) => { success: boolean; error?: string };
  resolveTicket: (ticketId: string, notes: string, attachments?: TicketAttachment[]) => { success: boolean; error?: string };
  submitCsatReview: (ticketId: string, rating: number, comment?: string) => { success: boolean };
  
  // Admin Operations
  adminRouteOtherTicket: (ticketId: string, newDeptId: string, newCatId: string) => { success: boolean };
  adminRerouteWrongDepartmentTicket: (ticketId: string, newDeptId: string, newCatId: string, adminNote?: string) => { success: boolean };
  addUser: (userData: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  toggleUserStatus: (id: string) => void;
  resetUserPassword: (id: string) => { tempPass: string };
  importUsersFromCsv: (csvContent: string) => { count: number; error?: string };

  // Category Operations
  addCategory: (cat: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  toggleCategoryActive: (id: string) => void;

  // Notifications
  unreadNotifications: InAppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Reset
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'unisupport_users_v1',
  DEPARTMENTS: 'unisupport_depts_v1',
  CATEGORIES: 'unisupport_categories_v1',
  TICKETS: 'unisupport_tickets_v1',
  NOTIFICATIONS: 'unisupport_notifications_v1',
  CURRENT_USER_ID: 'unisupport_current_user_id_v1',
  RBAC: 'unisupport_rbac_v2',
  LOGIN_ATTEMPTS: 'unisupport_login_attempts_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage or fallback
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [notifications, setNotifications] = useState<InAppNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [rbacPermissions, setRbacPermissions] = useState<RbacPermission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RBAC);
    return saved ? JSON.parse(saved) : INITIAL_RBAC_PERMISSIONS;
  });

  // Current User: Default to first student for immediate exploratory experience
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved !== null ? saved : 'usr-std-01';
  });

  const [sessionInvalid, setSessionInvalid] = useState(false);

  // Login Brute-force State
  const [loginAttempts, setLoginAttempts] = useState<LoginAttemptState>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    return saved ? JSON.parse(saved) : { failedAttempts: 0, lockUntil: null };
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<string>('student-tickets');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RBAC, JSON.stringify(rbacPermissions));
  }, [rbacPermissions]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, JSON.stringify(loginAttempts));
  }, [loginAttempts]);

  // Derive Current User object
  const currentUser = useMemo(() => {
    if (!currentUserId) return null;
    return users.find((u) => u.id === currentUserId) || null;
  }, [currentUserId, users]);

  // Check if current user was deactivated while logged in
  useEffect(() => {
    if (currentUser && currentUser.status === 'inactive') {
      setSessionInvalid(true);
      setCurrentUserId(null);
    }
  }, [currentUser]);

  // Automatically update navigation default screen based on role when switching users
  const navigate = (screen: string, ticketId?: string | null) => {
    setActiveTab(screen);
    if (ticketId !== undefined) {
      setSelectedTicketId(ticketId);
    }
  };

  // Helper to set default view for role
  const setDefaultScreenForRole = (role: Role) => {
    switch (role) {
      case 'student':
        setActiveTab('student-tickets');
        break;
      case 'staff':
        setActiveTab('staff-inbox');
        break;
      case 'manager':
        setActiveTab('manager-dashboard');
        break;
      case 'admin':
        setActiveTab('admin-dashboard');
        break;
    }
    setSelectedTicketId(null);
  };

  // Quick Login
  const quickLoginAs = (user: User) => {
    if (user.status === 'inactive') {
      setSessionInvalid(true);
      return;
    }
    setSessionInvalid(false);
    setCurrentUserId(user.id);
    setDefaultScreenForRole(user.role);
    // Reset login attempts on successful login
    setLoginAttempts({ failedAttempts: 0, lockUntil: null });
  };

  // Login handler with brute-force lockout logic
  const login = (code: string, pass: string) => {
    const now = Date.now();
    // Check if currently locked out
    if (loginAttempts.lockUntil && now < loginAttempts.lockUntil) {
      const remainingSeconds = Math.ceil((loginAttempts.lockUntil - now) / 1000);
      return {
        success: false,
        lockedOut: true,
        remainingSeconds,
        message: `Tài khoản tạm thời bị khóa do nhập sai nhiều lần. Vui lòng thử lại sau ${remainingSeconds} giây.`,
      };
    }

    // Reset lock if expired
    if (loginAttempts.lockUntil && now >= loginAttempts.lockUntil) {
      setLoginAttempts({ failedAttempts: 0, lockUntil: null });
    }

    const trimmedCode = code.trim().toLowerCase();
    const targetUser = users.find(
      (u) => u.code.toLowerCase() === trimmedCode || u.email.toLowerCase() === trimmedCode
    );

    // Standard demo password: accept '123456' or password matching user code
    const isPasswordValid = pass === '123456' || (targetUser && pass === targetUser.code);

    if (!targetUser || !isPasswordValid) {
      const newAttempts = loginAttempts.failedAttempts + 1;
      let newLockUntil: number | null = null;
      let message = 'Mã đăng nhập hoặc mật khẩu không chính xác.';

      if (newAttempts >= 5) {
        // Lock out for 15 minutes (900 seconds)
        newLockUntil = now + 15 * 60 * 1000;
        message = 'Bạn đã nhập sai 5 lần liên tiếp. Tài khoản bị tạm khóa đăng nhập trong 15 phút!';
      } else if (newAttempts >= 3) {
        message = `Cảnh báo: Bạn đã nhập sai ${newAttempts}/5 lần. Nếu nhập sai 5 lần, tài khoản sẽ bị khóa 15 phút.`;
      }

      setLoginAttempts({
        failedAttempts: newAttempts,
        lockUntil: newLockUntil,
      });

      return {
        success: false,
        message,
        lockedOut: newAttempts >= 5,
        remainingSeconds: newLockUntil ? 15 * 60 : undefined,
      };
    }

    // Check inactive status
    if (targetUser.status === 'inactive') {
      return {
        success: false,
        message: 'Tài khoản này đã bị Quản trị viên vô hiệu hóa (Inactive). Vui lòng liên hệ Phòng Đào tạo / CNTT.',
      };
    }

    // Success
    setLoginAttempts({ failedAttempts: 0, lockUntil: null });
    setSessionInvalid(false);
    setCurrentUserId(targetUser.id);
    setDefaultScreenForRole(targetUser.role);
    return { success: true };
  };

  const logout = () => {
    setCurrentUserId(null);
    setSelectedTicketId(null);
  };

  const clearSessionInvalid = () => {
    setSessionInvalid(false);
  };

  // -------------------------------------------------------------
  // TICKET OPERATIONS
  // -------------------------------------------------------------

  // Generate Ticket ID according to format: [CATEGORY_CODE]-[YYYYMMDD]-[SEQ_NUMBER]
  const generateTicketId = (catCode: string): { id: string; seq: number } => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}${mm}${dd}`;

    const seq = tickets.length + 1;
    const seqStr = String(seq).padStart(4, '0');
    return {
      id: `${catCode}-${dateStr}-${seqStr}`,
      seq,
    };
  };

  // 1. Create Ticket
  const createTicket = (data: {
    title: string;
    description: string;
    categoryId: string;
    departmentId: string;
    attachments: TicketAttachment[];
    isOtherCategory: boolean;
  }) => {
    if (!currentUser) return { success: false, ticketId: '' };

    const cat = categories.find((c) => c.id === data.categoryId);
    const catCode = data.isOtherCategory ? 'KH' : (cat?.code || 'TK');
    const catName = data.isOtherCategory ? 'Khác - Không rõ phòng ban / Yêu cầu tổng hợp' : (cat?.name || 'Yêu cầu');

    let dept = departments.find((d) => d.id === data.departmentId);
    let deptId = data.departmentId;
    let deptName = dept?.name || 'Phòng ban chuyên môn';

    if (data.isOtherCategory) {
      deptId = 'other';
      deptName = 'Hàng chờ phân loại Admin';
    }

    const { id: ticketId, seq } = generateTicketId(catCode);
    const nowIso = new Date().toISOString();
    const slaHours = cat?.slaHours || 48;
    const slaDueAt = new Date(Date.now() + slaHours * 3600 * 1000).toISOString();

    const newTicket: Ticket = {
      id: ticketId,
      seqNumber: seq,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      categoryCode: catCode,
      categoryName: catName,
      departmentId: deptId,
      departmentName: deptName,
      isOtherCategory: data.isOtherCategory,
      studentId: currentUser.id,
      studentCode: currentUser.code,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentClass: currentUser.className,
      status: 'new',
      priority: 'normal',
      createdAt: nowIso,
      updatedAt: nowIso,
      slaDueAt,
      attachments: data.attachments,
      timeline: [
        {
          id: `tl-${Date.now()}`,
          action: data.isOtherCategory ? 'Tạo mới yêu cầu (Danh mục "Khác")' : 'Tạo mới yêu cầu hỗ trợ',
          timestamp: nowIso,
          actorName: currentUser.name,
          actorRole: 'Sinh viên',
          note: data.isOtherCategory
            ? 'Đơn được chuyển vào Hàng chờ Quản trị viên để định tuyến thủ công'
            : `Gửi đến ${deptName}`,
          status: 'new',
        },
      ],
    };

    setTickets((prev) => [newTicket, ...prev]);

    // If it's "Khác", notify admin
    if (data.isOtherCategory) {
      const notif: InAppNotification = {
        id: `notif-${Date.now()}`,
        type: 'status_changed',
        ticketId: ticketId,
        ticketCode: ticketId,
        recipientRole: 'admin',
        title: 'Có đơn mới thuộc danh mục "Khác" cần định tuyến',
        message: `Sinh viên ${currentUser.name} (${currentUser.code}) vừa gửi yêu cầu "${data.title}".`,
        createdAt: nowIso,
        isRead: false,
        targetScreen: 'admin-dispatch',
      };
      setNotifications((prev) => [notif, ...prev]);
    }

    return { success: true, ticketId };
  };

  // 2. Claim Ticket (Staff) - with custom processing time set by staff (Max 1 week / 168 hours)
  const claimTicket = (ticketId: string, processingHours?: number, note?: string) => {
    if (!currentUser) return { success: false, error: 'Chưa đăng nhập' };

    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return { success: false, error: 'Không tìm thấy ticket' };

    // Concurrency conflict check: already claimed by another staff member
    if (target.status !== 'new' && target.assigneeId && target.assigneeId !== currentUser.id) {
      return {
        success: false,
        error: `Xung đột tiếp nhận: Ticket này đã được tiếp nhận bởi cán bộ ${target.assigneeName}!`,
      };
    }

    // Default to 72h if not provided, clamp strictly to max 168 hours (1 week)
    const validHours = Math.min(Math.max(1, processingHours && processingHours > 0 ? processingHours : 72), 168);
    const now = Date.now();
    const nowIso = new Date(now).toISOString();
    const slaDueAt = new Date(now + validHours * 3600 * 1000).toISOString();
    const durationText = validHours % 24 === 0 ? `${validHours / 24} ngày` : `${validHours} giờ`;

    const updatedTickets = tickets.map((t) => {
      if (t.id === ticketId) {
        const timelineItem: TicketTimelineItem = {
          id: `tl-${Date.now()}`,
          action: 'Tiếp nhận xử lý đơn',
          timestamp: nowIso,
          actorName: currentUser.name,
          actorRole: currentUser.role === 'manager' ? 'Trưởng phòng' : 'Chuyên viên phụ trách',
          note: note
            ? `${note} (Hạn xử lý cam kết: ${durationText})`
            : `${currentUser.name} đã tiếp nhận vào danh sách công việc. Thời hạn xử lý cam kết: ${durationText}`,
          status: 'in_progress',
        };
        return {
          ...t,
          status: 'in_progress' as TicketStatus,
          assigneeId: currentUser.id,
          assigneeName: currentUser.name,
          slaDueAt,
          processingHours: validHours,
          updatedAt: nowIso,
          timeline: [...t.timeline, timelineItem],
        };
      }
      return t;
    });

    setTickets(updatedTickets);

    // Notification #1: Ticket status changed (To Student) with committed duration
    const notif: InAppNotification = {
      id: `notif-${Date.now()}`,
      type: 'status_changed',
      ticketId,
      ticketCode: ticketId,
      recipientUserId: target.studentId,
      title: 'Yêu cầu của bạn đã được tiếp nhận',
      message: `Cán bộ ${currentUser.name} (${target.departmentName}) đã tiếp nhận xử lý yêu cầu "${target.title}". Thời gian xử lý dự kiến: ${durationText}.`,
      createdAt: nowIso,
      isRead: false,
      targetScreen: 'student-detail',
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true };
  };

  // Adjust Processing Deadline (Staff can adjust up to 1 week from now)
  const adjustProcessingDeadline = (ticketId: string, newHours: number, note?: string) => {
    if (!currentUser) return { success: false, error: 'Chưa đăng nhập' };
    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return { success: false, error: 'Không tìm thấy ticket' };

    const validHours = Math.min(Math.max(1, newHours && newHours > 0 ? newHours : 72), 168);
    const now = Date.now();
    const nowIso = new Date(now).toISOString();
    const slaDueAt = new Date(now + validHours * 3600 * 1000).toISOString();
    const durationText = validHours % 24 === 0 ? `${validHours / 24} ngày` : `${validHours} giờ`;

    const updatedTickets = tickets.map((t) => {
      if (t.id === ticketId) {
        const timelineItem: TicketTimelineItem = {
          id: `tl-${Date.now()}`,
          action: 'Điều chỉnh thời hạn xử lý',
          timestamp: nowIso,
          actorName: currentUser.name,
          actorRole: currentUser.role === 'manager' ? 'Trưởng phòng' : 'Chuyên viên phụ trách',
          note: note
            ? `${note} (Hạn xử lý mới: ${durationText})`
            : `Đã cập nhật thời hạn cam kết hoàn tất thành: ${durationText}`,
          status: t.status,
        };
        return {
          ...t,
          slaDueAt,
          processingHours: validHours,
          updatedAt: nowIso,
          timeline: [...t.timeline, timelineItem],
        };
      }
      return t;
    });

    setTickets(updatedTickets);

    // Notify student about adjusted processing deadline
    const notif: InAppNotification = {
      id: `notif-${Date.now()}`,
      type: 'status_changed',
      ticketId,
      ticketCode: ticketId,
      recipientUserId: target.studentId,
      title: 'Cập nhật thời hạn xử lý yêu cầu',
      message: `Cán bộ ${currentUser.name} đã cập nhật thời hạn xử lý yêu cầu "${target.title}" thành ${durationText} (Hạn chót: ${new Date(slaDueAt).toLocaleDateString('vi-VN')}).`,
      createdAt: nowIso,
      isRead: false,
      targetScreen: 'student-detail',
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true };
  };

  // 3. Assign Ticket (Manager or Admin)
  const assignTicket = (ticketId: string, assigneeId: string) => {
    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return { success: false, error: 'Không tìm thấy ticket' };

    const assignee = users.find((u) => u.id === assigneeId);
    if (!assignee) return { success: false, error: 'Không tìm thấy cán bộ được gán' };

    const nowIso = new Date().toISOString();
    const updatedTickets = tickets.map((t) => {
      if (t.id === ticketId) {
        const timelineItem: TicketTimelineItem = {
          id: `tl-${Date.now()}`,
          action: t.assigneeId ? 'Chuyển giao người phụ trách (Re-assign)' : 'Phân công cán bộ phụ trách (Assign)',
          timestamp: nowIso,
          actorName: currentUser?.name || 'Trưởng phòng',
          actorRole: currentUser?.role === 'manager' ? 'Trưởng phòng' : 'Quản trị viên',
          note: `Phân công cho ${assignee.name} (${assignee.code})`,
          status: 'in_progress',
        };
        return {
          ...t,
          status: 'in_progress' as TicketStatus,
          assigneeId: assignee.id,
          assigneeName: assignee.name,
          updatedAt: nowIso,
          timeline: [...t.timeline, timelineItem],
        };
      }
      return t;
    });

    setTickets(updatedTickets);

    // Notify student & assignee
    const notifStudent: InAppNotification = {
      id: `notif-${Date.now()}-1`,
      type: 'status_changed',
      ticketId,
      ticketCode: ticketId,
      recipientUserId: target.studentId,
      title: 'Yêu cầu đã được phân công xử lý',
      message: `Trưởng phòng đã phân công cán bộ ${assignee.name} trực tiếp xử lý yêu cầu "${target.title}".`,
      createdAt: nowIso,
      isRead: false,
      targetScreen: 'student-detail',
    };

    const notifStaff: InAppNotification = {
      id: `notif-${Date.now()}-2`,
      type: 'status_changed',
      ticketId,
      ticketCode: ticketId,
      recipientUserId: assignee.id,
      title: 'Bạn được phân công một ticket mới',
      message: `Bạn được phân công xử lý ticket ${ticketId} của sinh viên ${target.studentName}.`,
      createdAt: nowIso,
      isRead: false,
      targetScreen: 'staff-detail',
    };

    setNotifications((prev) => [notifStudent, notifStaff, ...prev]);
    return { success: true };
  };

  // 4. Update Ticket Progress Note
  const updateTicketProgress = (ticketId: string, note: string) => {
    if (!currentUser || !note.trim()) return { success: false };

    const nowIso = new Date().toISOString();
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const timelineItem: TicketTimelineItem = {
            id: `tl-${Date.now()}`,
            action: 'Cập nhật tiến độ xử lý',
            timestamp: nowIso,
            actorName: currentUser.name,
            actorRole: currentUser.role === 'staff' ? 'Chuyên viên' : 'Quản lý',
            note: note.trim(),
            status: t.status,
          };
          return {
            ...t,
            updatedAt: nowIso,
            timeline: [...t.timeline, timelineItem],
          };
        }
        return t;
      })
    );
    return { success: true };
  };

  // 5. Request Supplementary Info (Staff -> Pending, 72h countdown)
  const requestSupplementaryInfo = (ticketId: string, reason: string) => {
    if (!currentUser) return { success: false, error: 'Chưa đăng nhập' };
    if (!reason.trim()) return { success: false, error: 'Vui lòng nhập lý do/nội dung cần sinh viên bổ sung' };

    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return { success: false, error: 'Không tìm thấy ticket' };

    const nowIso = new Date().toISOString();
    // 72 hours deadline
    const pendingUntil = new Date(Date.now() + 72 * 3600 * 1000).toISOString();

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const timelineItem: TicketTimelineItem = {
            id: `tl-${Date.now()}`,
            action: 'Yêu cầu bổ sung thông tin / tài liệu',
            timestamp: nowIso,
            actorName: currentUser.name,
            actorRole: 'Chuyên viên phụ trách',
            note: reason.trim(),
            status: 'pending',
          };
          return {
            ...t,
            status: 'pending' as TicketStatus,
            pendingUntil,
            supplementaryInfo: {
              requestReason: reason.trim(),
              requestedAt: nowIso,
              requestedBy: currentUser.name,
            },
            updatedAt: nowIso,
            timeline: [...t.timeline, timelineItem],
          };
        }
        return t;
      })
    );

    // Notification #1 & #2: Notify Student with 72h window
    const notif: InAppNotification = {
      id: `notif-${Date.now()}`,
      type: 'status_changed',
      ticketId,
      ticketCode: ticketId,
      recipientUserId: target.studentId,
      title: 'Cần bổ sung hồ sơ trong vòng 72 giờ',
      message: `Cán bộ ${currentUser.name} yêu cầu bổ sung thông tin cho yêu cầu "${target.title}": ${reason.trim().slice(0, 80)}...`,
      createdAt: nowIso,
      isRead: false,
      targetScreen: 'student-detail',
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true };
  };

  // 6. Submit Supplementary Info (Student -> back to In Progress)
  const submitSupplementaryInfo = (ticketId: string, content: string, attachments: TicketAttachment[]) => {
    if (!currentUser) return { success: false, error: 'Chưa đăng nhập' };
    if (!content.trim() && attachments.length === 0) {
      return { success: false, error: 'Vui lòng nhập nội dung giải trình hoặc đính kèm tài liệu bổ sung' };
    }

    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return { success: false, error: 'Không tìm thấy yêu cầu' };

    const nowIso = new Date().toISOString();

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const timelineItem: TicketTimelineItem = {
            id: `tl-${Date.now()}`,
            action: 'Sinh viên gửi tài liệu / thông tin bổ sung',
            timestamp: nowIso,
            actorName: currentUser.name,
            actorRole: 'Sinh viên',
            note: content.trim() || 'Đã tải lên tệp đính kèm bổ sung',
            status: 'in_progress',
          };
          return {
            ...t,
            status: 'in_progress' as TicketStatus,
            pendingUntil: undefined,
            supplementaryInfo: {
              requestReason: t.supplementaryInfo?.requestReason || '',
              requestedAt: t.supplementaryInfo?.requestedAt || nowIso,
              requestedBy: t.supplementaryInfo?.requestedBy || '',
              content: content.trim(),
              submittedAt: nowIso,
              attachments,
            },
            attachments: [...t.attachments, ...attachments],
            updatedAt: nowIso,
            timeline: [...t.timeline, timelineItem],
          };
        }
        return t;
      })
    );

    // Notification #2: Sinh viên gửi tài liệu bổ sung thành công -> gửi cho Cán bộ đang phụ trách
    if (target.assigneeId) {
      const notif: InAppNotification = {
        id: `notif-${Date.now()}`,
        type: 'student_supplemented',
        ticketId,
        ticketCode: ticketId,
        recipientUserId: target.assigneeId,
        title: 'Sinh viên đã bổ sung thông tin hồ sơ',
        message: `Sinh viên ${currentUser.name} đã nộp bổ sung giấy tờ cho yêu cầu ${ticketId}.`,
        createdAt: nowIso,
        isRead: false,
        targetScreen: 'staff-detail',
      };
      setNotifications((prev) => [notif, ...prev]);
    }

    return { success: true };
  };

  // 7. Report Wrong Department (Staff -> Admin Dispatch Queue Tab 2)
  const reportWrongDepartment = (ticketId: string, reason: string) => {
    if (!currentUser) return { success: false, error: 'Chưa đăng nhập' };
    if (!reason.trim()) return { success: false, error: 'Bắt buộc nhập lý do đơn sai phòng ban để Quản trị viên điều chuyển' };

    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return { success: false, error: 'Không tìm thấy yêu cầu' };

    const nowIso = new Date().toISOString();

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const timelineItem: TicketTimelineItem = {
            id: `tl-${Date.now()}`,
            action: 'Báo đơn sai phòng ban & Chuyển trả Admin',
            timestamp: nowIso,
            actorName: currentUser.name,
            actorRole: 'Chuyên viên phòng ban',
            note: reason.trim(),
            status: t.status,
          };
          return {
            ...t,
            isWrongDepartment: true,
            wrongDepartmentReason: reason.trim(),
            wrongDepartmentReportedBy: `${currentUser.name} (${t.departmentName})`,
            wrongDepartmentReportedAt: nowIso,
            updatedAt: nowIso,
            timeline: [...t.timeline, timelineItem],
          };
        }
        return t;
      })
    );

    // Notification #5: Staff reports wrong dept -> System Admin gets notification
    const notif: InAppNotification = {
      id: `notif-${Date.now()}`,
      type: 'wrong_department',
      ticketId,
      ticketCode: ticketId,
      recipientRole: 'admin',
      title: 'Đơn báo sai phòng ban cần điều chuyển',
      message: `Cán bộ ${currentUser.name} đã chuyển trả đơn ${ticketId} vì lý do: "${reason.trim().slice(0, 60)}..."`,
      createdAt: nowIso,
      isRead: false,
      targetScreen: 'admin-dispatch',
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true };
  };

  // 8. Resolve Ticket (Staff -> Resolved with MANDATORY Resolution Notes)
  const resolveTicket = (ticketId: string, notes: string, attachments: TicketAttachment[] = []) => {
    if (!currentUser) return { success: false, error: 'Chưa đăng nhập' };
    // Edge case 3: Chặn hoàn thành khi thiếu Resolution Notes
    if (!notes.trim()) {
      return { success: false, error: 'Bắt buộc nhập nội dung giải trình kết quả trước khi hoàn tất đơn' };
    }

    const target = tickets.find((t) => t.id === ticketId);
    if (!target) return { success: false, error: 'Không tìm thấy yêu cầu' };

    const nowIso = new Date().toISOString();

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const timelineItem: TicketTimelineItem = {
            id: `tl-${Date.now()}`,
            action: 'Hoàn thành và trả kết quả giải quyết',
            timestamp: nowIso,
            actorName: currentUser.name,
            actorRole: 'Chuyên viên phụ trách',
            note: notes.trim(),
            status: 'resolved',
          };
          return {
            ...t,
            status: 'resolved' as TicketStatus,
            resolution: {
              notes: notes.trim(),
              resolvedAt: nowIso,
              resolvedBy: currentUser.id,
              resolvedByName: currentUser.name,
              attachments,
            },
            updatedAt: nowIso,
            timeline: [...t.timeline, timelineItem],
          };
        }
        return t;
      })
    );

    // Merged Notification #3 & #4: Duy nhất 1 thông báo tới sinh viên kèm kết quả và link đánh giá CSAT
    const notif: InAppNotification = {
      id: `notif-${Date.now()}`,
      type: 'ticket_resolved',
      ticketId,
      ticketCode: ticketId,
      recipientUserId: target.studentId,
      title: 'Yêu cầu của bạn đã được giải quyết xong!',
      message: `Cán bộ ${currentUser.name} (${target.departmentName}) đã trả kết quả cho yêu cầu "${target.title}". Vui lòng kiểm tra và gửi đánh giá chất lượng phục vụ.`,
      createdAt: nowIso,
      isRead: false,
      targetScreen: 'student-detail',
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true };
  };

  // 9. CSAT Review (Student -> Closed, permanently immutable)
  const submitCsatReview = (ticketId: string, rating: number, comment?: string) => {
    if (!currentUser) return { success: false };

    const nowIso = new Date().toISOString();
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const timelineItem: TicketTimelineItem = {
            id: `tl-${Date.now()}`,
            action: `Sinh viên đánh giá ${rating} sao & Đóng đơn vĩnh viễn`,
            timestamp: nowIso,
            actorName: currentUser.name,
            actorRole: 'Sinh viên',
            note: comment?.trim() ? `Nhận xét: "${comment.trim()}"` : `Chấm điểm hài lòng: ${rating}/5 sao`,
            status: 'closed',
          };
          return {
            ...t,
            status: 'closed' as TicketStatus,
            csat: {
              rating,
              comment: comment?.trim(),
              ratedAt: nowIso,
            },
            updatedAt: nowIso,
            timeline: [...t.timeline, timelineItem],
          };
        }
        return t;
      })
    );

    return { success: true };
  };

  // 10. Admin: Route "Khác" Ticket (Tab 1 in AD-02)
  const adminRouteOtherTicket = (ticketId: string, newDeptId: string, newCatId: string) => {
    const target = tickets.find((t) => t.id === ticketId);
    const dept = departments.find((d) => d.id === newDeptId);
    const cat = categories.find((c) => c.id === newCatId);
    if (!target || !dept) return { success: false };

    const nowIso = new Date().toISOString();
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const timelineItem: TicketTimelineItem = {
            id: `tl-${Date.now()}`,
            action: 'Quản trị viên định tuyến phân bổ đơn vị',
            timestamp: nowIso,
            actorName: currentUser?.name || 'Quản trị viên',
            actorRole: 'Quản trị viên',
            note: `Đã định tuyến sang ${dept.name} (Danh mục: ${cat?.name || 'Chuyên môn'})`,
            status: 'new',
          };
          return {
            ...t,
            isOtherCategory: false,
            departmentId: dept.id,
            departmentName: dept.name,
            categoryId: cat?.id || t.categoryId,
            categoryCode: cat?.code || dept.code,
            categoryName: cat?.name || t.categoryName,
            status: 'new' as TicketStatus,
            updatedAt: nowIso,
            timeline: [...t.timeline, timelineItem],
          };
        }
        return t;
      })
    );

    return { success: true };
  };

  // 11. Admin: Re-route "Sai phòng ban" Ticket (Tab 2 in AD-02)
  const adminRerouteWrongDepartmentTicket = (
    ticketId: string,
    newDeptId: string,
    newCatId: string,
    adminNote?: string
  ) => {
    const target = tickets.find((t) => t.id === ticketId);
    const dept = departments.find((d) => d.id === newDeptId);
    const cat = categories.find((c) => c.id === newCatId);
    if (!target || !dept) return { success: false };

    const nowIso = new Date().toISOString();
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const timelineItem: TicketTimelineItem = {
            id: `tl-${Date.now()}`,
            action: 'Quản trị viên điều chuyển sang phòng ban đúng',
            timestamp: nowIso,
            actorName: currentUser?.name || 'Quản trị viên',
            actorRole: 'Quản trị viên',
            note: adminNote?.trim()
              ? `Chuyển sang ${dept.name}. Ghi chú: ${adminNote.trim()}`
              : `Điều chuyển từ phòng ban cũ sang ${dept.name}`,
            status: 'new',
          };
          return {
            ...t,
            isWrongDepartment: false,
            wrongDepartmentReason: undefined,
            wrongDepartmentReportedBy: undefined,
            wrongDepartmentReportedAt: undefined,
            assigneeId: undefined, // Reset assignee so new department can claim
            assigneeName: undefined,
            departmentId: dept.id,
            departmentName: dept.name,
            categoryId: cat?.id || t.categoryId,
            categoryCode: cat?.code || dept.code,
            categoryName: cat?.name || t.categoryName,
            status: 'new' as TicketStatus, // Return to NEW for the new department to claim
            updatedAt: nowIso,
            timeline: [...t.timeline, timelineItem],
          };
        }
        return t;
      })
    );

    return { success: true };
  };

  // -------------------------------------------------------------
  // USER OPERATIONS
  // -------------------------------------------------------------
  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const updated = { ...u, ...updates };
          // If we de-activated the current logged in user, kick them out!
          if (u.id === currentUserId && updates.status === 'inactive') {
            setSessionInvalid(true);
            setCurrentUserId(null);
          }
          return updated;
        }
        return u;
      })
    );
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'active' ? 'inactive' : 'active';
          if (u.id === currentUserId && nextStatus === 'inactive') {
            setSessionInvalid(true);
            setCurrentUserId(null);
          }
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const resetUserPassword = (id: string) => {
    const target = users.find((u) => u.id === id);
    const tempPass = 'Uni@' + Math.floor(100000 + Math.random() * 900000);
    return { tempPass };
  };

  const importUsersFromCsv = (csvContent: string) => {
    try {
      const lines = csvContent.trim().split('\n');
      if (lines.length <= 1) return { count: 0, error: 'File CSV rỗng hoặc chỉ có dòng tiêu đề' };

      const newUsersList: User[] = [];
      // Expect format: code,name,email,role,className,deptCode
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const [code, name, email, role, className, deptCode] = line.split(',').map((s) => s.trim());
        if (!code || !name) continue;

        let deptId: string | undefined;
        let deptName: string | undefined;
        if (deptCode) {
          const foundDept = departments.find((d) => d.code.toLowerCase() === deptCode.toLowerCase());
          if (foundDept) {
            deptId = foundDept.id;
            deptName = foundDept.name;
          }
        }

        newUsersList.push({
          id: `usr-import-${Date.now()}-${i}`,
          code,
          name,
          email: email || `${code.toLowerCase()}@student.edu.vn`,
          role: (role as Role) || 'student',
          status: 'active',
          className,
          departmentId: deptId,
          departmentName: deptName,
        });
      }

      if (newUsersList.length === 0) {
        return { count: 0, error: 'Không tìm thấy dòng dữ liệu hợp lệ trong file CSV' };
      }

      setUsers((prev) => [...newUsersList, ...prev]);
      return { count: newUsersList.length };
    } catch (e) {
      return { count: 0, error: 'Lỗi định dạng cấu trúc CSV' };
    }
  };

  // -------------------------------------------------------------
  // CATEGORY OPERATIONS
  // -------------------------------------------------------------
  const addCategory = (cat: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...cat,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const toggleCategoryActive = (id: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  };

  // -------------------------------------------------------------
  // NOTIFICATIONS
  // -------------------------------------------------------------
  const unreadNotifications = useMemo(() => {
    if (!currentUser) return [];
    return notifications.filter((n) => {
      if (n.isRead) return false;
      if (n.recipientUserId && n.recipientUserId === currentUser.id) return true;
      if (n.recipientRole && n.recipientRole === currentUser.role) {
        if (n.recipientDepartmentId) {
          return n.recipientDepartmentId === currentUser.departmentId;
        }
        return true;
      }
      return false;
    });
  }, [notifications, currentUser]);

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications((prev) =>
      prev.map((n) => {
        if (
          n.recipientUserId === currentUser.id ||
          (n.recipientRole === currentUser.role && (!n.recipientDepartmentId || n.recipientDepartmentId === currentUser.departmentId))
        ) {
          return { ...n, isRead: true };
        }
        return n;
      })
    );
  };

  // Reset to initial demo dataset
  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.DEPARTMENTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.TICKETS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    localStorage.removeItem(STORAGE_KEYS.RBAC);
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);

    setUsers(INITIAL_USERS);
    setDepartments(INITIAL_DEPARTMENTS);
    setCategories(INITIAL_CATEGORIES);
    setTickets(INITIAL_TICKETS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setRbacPermissions(INITIAL_RBAC_PERMISSIONS);
    setCurrentUserId('usr-std-01');
    setSessionInvalid(false);
    setLoginAttempts({ failedAttempts: 0, lockUntil: null });
    setActiveTab('student-tickets');
    setSelectedTicketId(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        sessionInvalid,
        loginAttempts,
        login,
        quickLoginAs,
        logout,
        clearSessionInvalid,
        departments,
        categories,
        tickets,
        notifications,
        rbacPermissions,
        activeTab,
        selectedTicketId,
        navigate,
        createTicket,
        claimTicket,
        adjustProcessingDeadline,
        assignTicket,
        updateTicketProgress,
        requestSupplementaryInfo,
        submitSupplementaryInfo,
        reportWrongDepartment,
        resolveTicket,
        submitCsatReview,
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
        unreadNotifications,
        markNotificationRead,
        markAllNotificationsRead,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
