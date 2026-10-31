# THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE ERD & SCHEMA) — UNISUPPORT

> **Dự án:** UniSupport — Nền tảng Tiếp nhận và Hỗ trợ Thủ tục Hành chính Sinh viên  
> **Phiên bản:** 2.0 (Lead Dev Technical Specification)  
> **Cơ sở dữ liệu mục tiêu đã chốt:** PostgreSQL 15+

---

## 1. Sơ đồ Quan hệ Thực thể (Mermaid ERD)

```mermaid
erDiagram
    DEPARTMENTS ||--o{ USERS : "thuộc"
    USERS ||--o{ NOTIFICATIONS : "nhận"
    ROLE_PERMISSIONS }o--|| PERMISSIONS : "quyền chức năng"
    DEPARTMENTS ||--o{ CATEGORIES : "quản lý"
    CATEGORIES ||--o{ TICKETS : "phân loại"
    USERS ||--o{ TICKETS : "sinh viên tạo / nhân viên xử lý"
    TICKETS ||--o{ TICKET_LOGS : "ghi vết chuyển trạng thái"
    TICKETS ||--o{ TICKET_COMMENTS : "trao đổi nội bộ & bổ sung"
    TICKETS ||--o{ TICKET_ATTACHMENTS : "đính kèm file"
    TICKETS ||--o| TICKET_FEEDBACKS : "đánh giá CSAT sau đóng"
    TICKETS ||--o{ NOTIFICATIONS : "phát sinh thông báo"
```

---

## 2. Đặc tả Chi tiết các Bảng CSDL (Data Dictionary)

### 2.1. Bảng `departments` (Phòng ban chuyên trách)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `code` | `VARCHAR(20)` | `NOT NULL, UNIQUE` | Mã phòng ban (VD: `P_CTSV`, `P_DT`, `P_KHTC`) |
| `name` | `VARCHAR(150)` | `NOT NULL` | Tên phòng ban (VD: Phòng Công tác Sinh viên) |
| `description` | `TEXT` | `NULL` | Mô tả chức năng nhiệm vụ |
| `is_active` | `BOOLEAN` | `NOT NULL DEFAULT TRUE` | Trạng thái hoạt động (True = Hoạt động) |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |
| `updated_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm cập nhật |

---

### 2.2. Bảng `users` (Tài khoản người dùng)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `user_code` | `VARCHAR(20)` | `NOT NULL, UNIQUE` | Mã định danh đăng nhập (MSSV/Mã cán bộ/Mã Admin), tối đa 20 ký tự theo M01/M03 |
| `email` | `VARCHAR(100)` | `NOT NULL, UNIQUE` | Email trường (tên miền do trường quy định, được kiểm tra theo M03) |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Mật khẩu băm (Bcrypt / Argon2) |
| `full_name` | `VARCHAR(100)` | `NOT NULL` | Họ và tên |
| `phone_number` | `VARCHAR(15)` | `NULL` | Số điện thoại liên hệ |
| `role` | `VARCHAR(20)` | `NOT NULL` | Vai trò: `ADMIN`, `MANAGER`, `STAFF`, `STUDENT` |
| `department_id` | `VARCHAR(36)` | `NULL, FK(departments.id)` | Phòng ban (bắt buộc với Manager & Staff) |
| `status` | `VARCHAR(20)` | `NOT NULL DEFAULT 'ACTIVE'` | Trạng thái tài khoản: `ACTIVE`, `INACTIVE` |
| `must_change_password` | `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Bật khi Admin reset mật khẩu; người dùng phải đổi mật khẩu trước khi tiếp tục sử dụng hệ thống |
| `last_login_at` | `TIMESTAMP` | `NULL` | Lần đăng nhập cuối |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |
| `updated_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm cập nhật |

---

### 2.3. Danh mục quyền `permissions` và ma trận `role_permissions` (M02)
Hai bảng lưu cấu hình phân quyền động theo 4 mã vai trò cố định `STUDENT`, `STAFF`, `MANAGER`, `ADMIN`. Quyền chức năng và phạm vi dữ liệu phải được kiểm tra tại Backend trong từng yêu cầu; thay đổi có hiệu lực ngay với yêu cầu tiếp theo.

| Bảng | Tên cột | Kiểu dữ liệu | Ràng buộc / Mô tả |
|---|---|---|---|
| `permissions` | `code` | `VARCHAR(60)` | `PRIMARY KEY`, mã quyền chức năng cố định trong danh mục quyền của M02 |
| `permissions` | `name` | `VARCHAR(150)` | `NOT NULL`, tên quyền hiển thị |
| `role_permissions` | `role_code` | `VARCHAR(20)` | Một trong 4 mã vai trò cố định; thuộc khóa ghép |
| `role_permissions` | `permission_code` | `VARCHAR(60)` | `FK(permissions.code)`; thuộc khóa ghép |
| `role_permissions` | `is_enabled` | `BOOLEAN` | `NOT NULL DEFAULT FALSE`, bật/tắt quyền |

Khóa chính của `role_permissions` là (`role_code`, `permission_code`). Hệ thống từ chối thao tác vô hiệu hóa quyền quản lý tài khoản/phân quyền tối cao của Admin chính.

---

### 2.4. Bảng `categories` (Danh mục dịch vụ hành chính)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `code` | `VARCHAR(6)` | `NOT NULL, UNIQUE` | Mã danh mục 2–6 ký tự viết hoa theo M04; là phần tiền tố của mã Ticket lúc tạo |
| `department_id` | `VARCHAR(36)` | `NULL, FK(departments.id)` | Bắt buộc với danh mục thông thường; được `NULL` chỉ với danh mục hệ thống "Khác" đang chờ Admin phân loại |
| `name` | `VARCHAR(150)` | `NOT NULL` | Tên danh mục (VD: Cấp bảng điểm, Xác nhận SV) |
| `description` | `TEXT` | `NULL` | Mô tả hướng dẫn sinh viên chuẩn bị giấy tờ |
| `sla_business_hours` | `INT` | `NOT NULL DEFAULT 24` | Thời hạn cam kết xử lý (tính theo Giờ hành chính) |
| `is_active` | `BOOLEAN` | `NOT NULL DEFAULT TRUE` | Trạng thái hiển thị (True = Đang mở tiếp nhận) |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |
| `updated_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm cập nhật |

---

### 2.5. Bảng `tickets` (Đơn yêu cầu hỗ trợ)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `ticket_code` | `VARCHAR(30)` | `NOT NULL, UNIQUE` | `[CATEGORY_CODE]-[YYYYMMDD]-[SEQ_NUMBER]` (4 chữ số thứ tự/ngày; VD: `IT-20261022-0042`), không đổi khi điều phối lại |
| `title` | `VARCHAR(150)` | `NOT NULL` | Tiêu đề yêu cầu (Min 5 - Max 150 ký tự) |
| `content` | `TEXT` | `NOT NULL` | Nội dung chi tiết yêu cầu (Min 10 ký tự) |
| `category_id` | `VARCHAR(36)` | `NOT NULL, FK(categories.id)` | Danh mục thủ tục |
| `department_id` | `VARCHAR(36)` | `NULL, FK(departments.id)` | `NULL` chỉ khi Ticket `New` ở hàng chờ Admin với danh mục "Khác"; phải xác định trước khi chuyển về hàng chờ phòng ban |
| `student_id` | `VARCHAR(36)` | `NOT NULL, FK(users.id)` | Sinh viên tạo đơn |
| `assignee_id` | `VARCHAR(36)` | `NULL, FK(users.id)` | Nhân viên đang nhận xử lý đơn |
| `status` | `VARCHAR(30)` | `NOT NULL DEFAULT 'NEW'` | `NEW`, `IN_PROGRESS`, `PENDING`, `RESOLVED`, `CLOSED` |
| `supplement_count` | `INT` | `NOT NULL DEFAULT 0` | Số lần yêu cầu bổ sung (Ràng buộc tối đa 1 lần) |
| `pending_deadline` | `TIMESTAMP` | `NULL` | Hạn chót bổ sung (3 ngày làm việc kể từ lúc Pending) |
| `sla_deadline` | `TIMESTAMP` | `NULL` | Hạn chót xử lý theo SLA (Giờ hành chính) |
| `is_overdue` | `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Cờ đánh dấu quá hạn SLA |
| `resolution_notes` | `TEXT` | `NULL` | Nội dung giải trình kết quả (Bắt buộc khi Resolved) |
| `resolved_at` | `TIMESTAMP` | `NULL` | Thời điểm chuyển sang Resolved |
| `auto_close_deadline`| `TIMESTAMP` | `NULL` | Hạn chót tự động đóng sau Resolved (3 ngày làm việc) |
| `closed_at` | `TIMESTAMP` | `NULL` | Thời điểm đóng đơn vĩnh viễn |
| `closed_reason` | `VARCHAR(255)` | `NULL` | Lý do đóng (`RATED`, `TIMEOUT_PENDING`, `TIMEOUT_RESOLVED`) |
| `auto_closed` | `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Cờ xác định hệ thống tự đóng do hết hạn |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |
| `updated_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm cập nhật |

---

### 2.6. Bảng `ticket_logs` (Nhật ký luân chuyển & Audit Trail)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `ticket_id` | `VARCHAR(36)` | `NOT NULL, FK(tickets.id)` | Ticket liên quan |
| `actor_id` | `VARCHAR(36)` | `NULL, FK(users.id)` | Người thực hiện (NULL nếu do System Auto) |
| `from_status` | `VARCHAR(30)` | `NULL` | Trạng thái trước khi chuyển |
| `to_status` | `VARCHAR(30)` | `NOT NULL` | Trạng thái sau khi chuyển |
| `action` | `VARCHAR(50)` | `NOT NULL` | Hành động: `CREATE`, `EDIT_NEW`, `CLAIM`, `REQUEST_SUPPLEMENT`, `SUBMIT_SUPPLEMENT`, `RETURN_TO_ADMIN`, `DISPATCH`, `RE_ASSIGN`, `RESOLVE`, `CLOSE`, `AUTO_CLOSE` |
| `note` | `TEXT` | `NULL` | Ghi chú chuyển trạng thái hoặc lý do trả đơn |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm ghi log |

---

### 2.7. Bảng `ticket_comments` (Trao đổi xử lý & Bổ sung)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `ticket_id` | `VARCHAR(36)` | `NOT NULL, FK(tickets.id)` | Ticket liên quan |
| `author_id` | `VARCHAR(36)` | `NOT NULL, FK(users.id)` | Người gửi bình luận |
| `type` | `VARCHAR(30)` | `NOT NULL` | `INTERNAL_NOTE` (Nội bộ nhân viên), `SUPPLEMENT_REQUEST` (Yêu cầu bổ sung), `SUPPLEMENT_RESPONSE` (Sinh viên gửi bổ sung) |
| `content` | `TEXT` | `NOT NULL` | Nội dung văn bản trao đổi |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm gửi |

---

### 2.8. Bảng `ticket_attachments` (Tài liệu & Tệp tin đính kèm)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `ticket_id` | `VARCHAR(36)` | `NOT NULL, FK(tickets.id)` | Ticket liên quan |
| `uploader_id` | `VARCHAR(36)` | `NOT NULL, FK(users.id)` | Người tải tệp lên |
| `file_name` | `VARCHAR(255)` | `NOT NULL` | Tên gốc của tệp tin |
| `file_url` | `VARCHAR(500)` | `NOT NULL` | Đường dẫn lưu trữ (Cloud/S3/Local storage) |
| `file_size` | `INT` | `NOT NULL` | Dung lượng tính bằng Byte (Tối đa 5MB) |
| `file_extension` | `VARCHAR(10)` | `NOT NULL` | Phần mở rộng (`.png`, `.jpg`, `.pdf`, `.docx`) |
| `attachment_type` | `VARCHAR(30)` | `NOT NULL` | `TICKET_CREATION`, `SUPPLEMENT`, `RESOLUTION` |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm tải lên |

Khi Ticket còn `New`, sinh viên có thể thêm/xóa tệp đính kèm thuộc yêu cầu ban đầu theo M05 (tối đa 5 tệp, 5MB/tệp, `.png`, `.jpg`, `.pdf`, `.docx`). Thao tác thay đổi phải qua kiểm tra quyền chủ sở hữu và được ghi vào `ticket_logs` để giữ lịch sử; khi `In Progress`, không được sửa tệp của yêu cầu ban đầu.

---

### 2.9. Bảng `ticket_feedbacks` (Đánh giá mức độ hài lòng CSAT)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `ticket_id` | `VARCHAR(36)` | `NOT NULL, UNIQUE, FK(tickets.id)` | Ticket được đánh giá (1 Ticket có tối đa 1 Feedback) |
| `student_id` | `VARCHAR(36)` | `NOT NULL, FK(users.id)` | Sinh viên thực hiện đánh giá |
| `rating` | `INT` | `NOT NULL` | Điểm đánh giá (1 đến 5 sao) |
| `comment` | `TEXT` | `NULL` | Nhận xét góp ý của sinh viên |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm đánh giá |

---

### 2.10. Bảng `notifications` (Thông báo In-app)
| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa thông báo |
| `recipient_id` | `VARCHAR(36)` | `NOT NULL, FK(users.id)` | Người nhận theo ma trận thông báo |
| `ticket_id` | `VARCHAR(36)` | `NULL, FK(tickets.id)` | Ticket liên quan để mở trực tiếp từ thông báo |
| `event_code` | `VARCHAR(60)` | `NOT NULL` | Một trong các sự kiện đã thống nhất tại ma trận thông báo |
| `event_key` | `VARCHAR(150)` | `NOT NULL` | Mã sự kiện duy nhất theo người nhận để tránh gửi lặp (đặc biệt kết quả M08/M10) |
| `content` | `TEXT` | `NOT NULL` | Nội dung thông báo |
| `read_at` | `TIMESTAMP` | `NULL` | Thời điểm đánh dấu đã đọc |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm phát sinh |

Ràng buộc duy nhất (`recipient_id`, `event_key`) tránh nhân đôi thông báo của cùng một sự kiện. Chỉ người nhận mới được xem hoặc đánh dấu đã đọc thông báo của mình.

---

### 2.11. Bảng `system_holidays` (Lịch nghỉ lễ & cấu hình ngày làm việc)
*Phục vụ cho Background Worker và hàm tính toán hạn chót 3 ngày làm việc (bỏ qua Thứ 7, Chủ nhật và các ngày được khai báo trong bảng này).*

| Tên cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| `id` | `VARCHAR(36)` / `UUID` | `PRIMARY KEY` | Khóa chính |
| `holiday_date` | `DATE` | `NOT NULL, UNIQUE` | Ngày nghỉ lễ theo lịch nhà nước/nhà trường (YYYY-MM-DD) |
| `description` | `VARCHAR(150)` | `NOT NULL` | Tên ngày nghỉ lễ (VD: Tết Dương Lịch, Quốc Khánh 2/9) |
| `is_recurring` | `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Có lặp lại hàng năm không |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT CURRENT_TIMESTAMP` | Thời điểm tạo |

---

## 3. Danh mục Chỉ mục Tối ưu Truy vấn (Database Indexes)

Để đảm bảo hiệu năng hệ thống không bị chậm khi dữ liệu ticket tăng trưởng, bắt buộc đánh chỉ mục:

```sql
-- 1. Tối ưu tìm kiếm và lọc danh sách Ticket theo phòng ban và trạng thái (Staff & Manager)
CREATE INDEX idx_tickets_dept_status ON tickets(department_id, status);

-- 2. Tối ưu màn hình công việc cá nhân của Nhân viên (Assignee Ticket Pool)
CREATE INDEX idx_tickets_assignee_status ON tickets(assignee_id, status);

-- 3. Tối ưu tra cứu danh sách đơn của Sinh viên
CREATE INDEX idx_tickets_student ON tickets(student_id, created_at DESC);

-- 4. Tối ưu Background Worker quét timeout tự động đóng đơn (Pending & Auto-close)
CREATE INDEX idx_tickets_pending_worker ON tickets(status, pending_deadline) WHERE status = 'PENDING';
CREATE INDEX idx_tickets_resolved_worker ON tickets(status, auto_close_deadline) WHERE status = 'RESOLVED';

-- 5. Tối ưu truy vấn Audit Trail và Lịch sử Ticket
CREATE INDEX idx_ticket_logs_ticket_id ON ticket_logs(ticket_id, created_at ASC);
CREATE INDEX idx_attachments_ticket_id ON ticket_attachments(ticket_id);
CREATE INDEX idx_comments_ticket_id ON ticket_comments(ticket_id, created_at ASC);
```
