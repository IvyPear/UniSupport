export type Role = 'student' | 'staff' | 'manager' | 'admin';

export type TicketStatus = 'new' | 'in_progress' | 'pending' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface User {
  id: string;
  code: string; // MSSV / Mã cán bộ (e.g. 20260101, CB0102, QL0101, AD0001)
  name: string;
  email: string;
  role: Role;
  departmentId?: string;
  departmentName?: string;
  status: 'active' | 'inactive';
  avatar?: string;
  phone?: string;
  className?: string; // For students (e.g. K22-CNTT01)
}

export interface Department {
  id: string;
  code: string; // IT, AC, FN, SA
  name: string;
  description: string;
  managerId?: string;
  managerName?: string;
  slaStandardHours: number;
}

export interface Category {
  id: string;
  code: string; // IT, AC, FN, SA, KH
  name: string;
  departmentId: string; // or 'other'
  departmentName: string;
  slaHours: number;
  isActive: boolean;
  description: string;
}

export interface TicketAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
  uploadedAt: string;
}

export interface TicketTimelineItem {
  id: string;
  action: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  note?: string;
  status: TicketStatus;
}

export interface SupplementaryInfo {
  requestReason: string;
  requestedAt: string;
  requestedBy: string;
  content?: string;
  submittedAt?: string;
  attachments?: TicketAttachment[];
}

export interface ResolutionData {
  notes: string;
  resolvedAt: string;
  resolvedBy: string;
  resolvedByName: string;
  attachments?: TicketAttachment[];
}

export interface CsatReview {
  rating: number; // 1 to 5
  comment?: string;
  ratedAt: string;
}

export interface Ticket {
  id: string; // E.g. IT-20261012-0001
  seqNumber: number;
  title: string;
  description: string;
  categoryId: string;
  categoryCode: string;
  categoryName: string;
  departmentId: string;
  departmentName: string;
  isOtherCategory: boolean; // Selected "Khác"
  
  // Wrong department reporting
  isWrongDepartment?: boolean;
  wrongDepartmentReason?: string;
  wrongDepartmentReportedBy?: string;
  wrongDepartmentReportedAt?: string;
  
  // Student
  studentId: string;
  studentCode: string;
  studentName: string;
  studentEmail: string;
  studentClass?: string;
  
  // Assignee
  assigneeId?: string;
  assigneeName?: string;
  
  // Status & Priority
  status: TicketStatus;
  priority: TicketPriority;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  pendingUntil?: string; // 72 hours from request
  
  // Attachments
  attachments: TicketAttachment[];
  
  // Information addition request
  supplementaryInfo?: SupplementaryInfo;
  
  // Resolution
  resolution?: ResolutionData;
  
  // CSAT
  csat?: CsatReview;
  
  // SLA & Staff-set processing time
  slaDueAt: string;
  isOverdue?: boolean;
  processingHours?: number; // Duration in hours set by staff (max 168h / 1 week)
  
  // Audit Trail
  timeline: TicketTimelineItem[];
}

export type NotificationType =
  | 'status_changed'
  | 'student_supplemented'
  | 'ticket_resolved'
  | 'wrong_department'
  | 'sla_breached';

export interface InAppNotification {
  id: string;
  type: NotificationType;
  ticketId: string;
  ticketCode: string;
  recipientRole?: Role;
  recipientUserId?: string;
  recipientDepartmentId?: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  targetScreen: string; // e.g. 'student-detail', 'staff-detail', 'admin-dispatch', 'manager-monitor'
}

export interface RbacPermission {
  id: string;
  module: string;
  action: string;
  description: string;
  student: boolean;
  staff: boolean;
  manager: boolean;
  admin: boolean;
}
