# SƠ ĐỒ CƠ SỞ DỮ LIỆU (DATABASE ERD & SCHEMA) - UNISUPPORT

---

## 1. Sơ Đồ Thực Thể Tương Quan (Mermaid ERD)

```mermaid
erDiagram
    DEPARTMENTS ||--o{ USERS : "thuộc phòng ban"
    DEPARTMENTS ||--o{ CATEGORIES : "quản lý danh mục"
    USERS ||--o{ TICKETS : "tạo (Sinh viên)"
    USERS ||--o{ TICKETS : "xử lý (Nhân viên)"
    CATEGORIES ||--o{ TICKETS : "phân loại"
    TICKETS ||--o{ TICKET_COMMENTS : "chứa bình luận"
    TICKETS ||--o{ TICKET_ATTACHMENTS : "chứa tệp đính kèm"
    TICKETS ||--o{ TICKET_HISTORIES : "ghi nhật ký trạng thái"
    TICKETS ||--|| RATINGS : "đánh giá kết quả"
    USERS ||--o{ NOTIFICATIONS : "nhận thông báo"

    USERS {
        bigint id PK
        string user_code UK "Mã sinh viên / Mã nhân viên"
        string full_name
        string email UK
        string password_hash
        string role "STUDENT | STAFF | MANAGER | ADMIN"
        bigint department_id FK "Null nếu là Student/Admin"
        string status "ACTIVE | LOCKED"
        datetime created_at
        datetime updated_at
    }

    DEPARTMENTS {
        bigint id PK
        string code UK "Mã phòng ban (VD: PAA, PCTSV)"
        string name "Tên phòng ban"
        string description
        bigint manager_id FK "Trưởng phòng phụ trách"
        datetime created_at
    }

    CATEGORIES {
        bigint id PK
        string code UK "Mã danh mục"
        string name "Tên dịch vụ/thủ tục"
        string description
        bigint department_id FK "Phòng ban chuyên trách (Null = Mục Khác)"
        boolean is_active "Trạng thái hoạt động"
        datetime created_at
    }

    TICKETS {
        bigint id PK
        string code UK "Mã Ticket (VD: IT-20261005-001)"
        bigint student_id FK "Sinh viên khởi tạo"
        bigint category_id FK "Danh mục yêu cầu"
        bigint department_id FK "Phòng ban thụ lý"
        bigint assigned_staff_id FK "Nhân viên được gán (Nullable)"
        string title "Tiêu đề yêu cầu"
        text content "Nội dung chi tiết"
        string status "NEW | IN_PROGRESS | PENDING | RESOLVED | CLOSED"
        text resolution_notes "Kết quả xử lý (Bắt buộc khi Resolved)"
        boolean is_spam "Đánh dấu spam"
        datetime created_at
        datetime updated_at
        datetime resolved_at
        datetime closed_at
    }

    TICKET_COMMENTS {
        bigint id PK
        bigint ticket_id FK
        bigint sender_id FK "Người gửi (Student / Staff)"
        text message
        boolean is_internal "Bình luận nội bộ"
        datetime created_at
    }

    TICKET_ATTACHMENTS {
        bigint id PK
        bigint ticket_id FK
        bigint comment_id FK "Nullable"
        string file_name
        string file_path
        integer file_size
        string mime_type
        bigint uploaded_by FK
        datetime created_at
    }

    TICKET_HISTORIES {
        bigint id PK
        bigint ticket_id FK
        bigint actor_id FK "Người thực hiện thay đổi"
        string action "ACTION_CLAIM | ACTION_PENDING | ACTION_RESOLVE | etc."
        string old_status
        string new_status
        text notes
        datetime created_at
    }

    RATINGS {
        bigint id PK
        bigint ticket_id FK UK "1 Ticket chỉ có 1 đánh giá"
        bigint student_id FK
        integer score "Từ 1 đến 5 sao"
        text feedback_text "Nhận xét của sinh viên"
        datetime created_at
    }

    NOTIFICATIONS {
        bigint id PK
        bigint user_id FK
        bigint ticket_id FK
        string title
        string message
        boolean is_read
        string type "IN_APP | EMAIL"
        datetime created_at
    }
```

---

## 2. Chi Tiết Các Bảng & Đánh Chỉ Mục (Indexes & Constraints)

### 2.1 Bảng `tickets`

* **Khoá chính:** `id` (BIGINT, Auto-increment).
* **Khoá duy nhất:** `code` (VARCHAR(30), UNIQUE) - Định dạng `[MÃ_PHÒNG]-[YYYYMMDD]-[STT_TRONG_NGÀY]`.
* **Ràng buộc:**
  * `CHECK (status IN ('NEW', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED'))`.
  * `CHECK (status != 'RESOLVED' OR (resolution_notes IS NOT NULL AND LENGTH(TRIM(resolution_notes)) > 0))`.
* **Chỉ mục (Indexes):**
  * `idx_tickets_student_id` ON `tickets(student_id)` (Tối ưu tìm kiếm đơn theo sinh viên).
  * `idx_tickets_assigned_staff` ON `tickets(assigned_staff_id, status)` (Tối ưu danh sách công việc của nhân viên).
  * `idx_tickets_dept_status` ON `tickets(department_id, status)` (Tối ưu màn hình quản lý phòng ban/Admin).

### 2.2 Bảng `users`

* **Khoá duy nhất:** `user_code` (Mã định danh SV/NV), `email`.
* **Ràng buộc:** `CHECK (role IN ('STUDENT', 'STAFF', 'MANAGER', 'ADMIN'))`.
* **Chỉ mục:** `idx_users_code_role` ON `users(user_code, role)`.

### 2.3 Bảng `ratings`

* **Khoá duy nhất:** `ticket_id` (Đảm bảo tính duy nhất 1-1 với ticket).
* **Ràng buộc:** `CHECK (score BETWEEN 1 AND 5)`.
