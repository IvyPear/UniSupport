# ĐẶC TẢ RESTFUL API — HỆ THỐNG UNISUPPORT

> **Dự án:** UniSupport — Nền tảng Tiếp nhận và Hỗ trợ Thủ tục Hành chính Sinh viên  
> **Phiên bản:** 2.0 (Lead Dev API Specification)  
> **Chuẩn thiết kế:** RESTful JSON, Bearer JWT Authentication, RBAC  
> **Mã lỗi chuẩn:** `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `500 Internal Error`

---

## 1. Phân hệ M01 — Xác thực & Phân quyền (`/api/v1/auth`)

| Method | Endpoint | Mô tả | Quyền truy cập | Request Body chính | Response Status |
|---|---|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Đăng nhập hệ thống (Google OAuth2 hoặc Email/Password) | Public | `{ email, password }` | `200 OK` (trả về `access_token`, `refresh_token`, `user`) |
| `POST` | `/api/v1/auth/refresh-token` | Cấp lại Access Token mới | Public | `{ refresh_token }` | `200 OK` (`access_token` mới) |
| `POST` | `/api/v1/auth/logout` | Đăng xuất, hủy hiệu lực refresh token | All Roles | `{ refresh_token }` | `200 OK` |
| `POST` | `/api/v1/auth/forgot-password` | Yêu cầu gửi mã OTP đặt lại mật khẩu | Public | `{ email }` | `200 OK` |
| `POST` | `/api/v1/auth/reset-password` | Đặt lại mật khẩu với OTP | Public | `{ email, otp, new_password }` | `200 OK` |

---

## 2. Phân hệ M02 & M03 — Quản lý Tài khoản & Phân quyền (`/api/v1/admin`)

| Method | Endpoint | Mô tả | Quyền truy cập | Request / Params | Response Status |
|---|---|---|---|---|---|
| `GET` | `/api/v1/admin/users` | Danh sách tài khoản (phân trang, lọc theo role, dept) | `ADMIN` | Query: `?page=1&limit=20&role=STAFF&dept_id=...` | `200 OK` |
| `POST` | `/api/v1/admin/users` | Tạo mới tài khoản (Admin, Manager, Staff) | `ADMIN` | `{ full_name, email, role, department_id, user_code }` | `201 Created` |
| `PATCH` | `/api/v1/admin/users/{id}/status` | Khóa / Kích hoạt tài khoản (`ACTIVE`/`INACTIVE`) | `ADMIN` | `{ status: "INACTIVE" }` | `200 OK` |
| `POST` | `/api/v1/admin/users/import-csv` | Import danh sách sinh viên/nhân viên bằng file CSV | `ADMIN` | `multipart/form-data (file .csv)` | `200 OK` |
| `GET` | `/api/v1/admin/permissions` | Xem ma trận phân quyền hệ thống | `ADMIN` | None | `200 OK` |
| `PUT` | `/api/v1/admin/permissions` | Cập nhật cấu hình quyền theo Role | `ADMIN` | `{ role: "STAFF", permissions: [...] }` | `200 OK` |

---

## 3. Phân hệ M04 — Quản lý Danh mục & Phòng ban (`/api/v1/categories`, `/api/v1/departments`)

| Method | Endpoint | Mô tả | Quyền truy cập | Request / Params | Response Status |
|---|---|---|---|---|---|
| `GET` | `/api/v1/departments` | Lấy danh sách các phòng ban đang hoạt động | All Roles | Query: `?is_active=true` | `200 OK` |
| `GET` | `/api/v1/categories` | Lấy danh sách danh mục thủ tục theo phòng ban | All Roles | Query: `?department_id=...&is_active=true` | `200 OK` |
| `POST` | `/api/v1/categories` | Tạo danh mục thủ tục mới cho phòng ban | `MANAGER`, `ADMIN` | `{ department_id, name, description, sla_business_hours }` | `201 Created` |
| `PUT` | `/api/v1/categories/{id}` | Cập nhật thông tin danh mục, thời hạn SLA | `MANAGER`, `ADMIN` | `{ name, description, sla_business_hours }` | `200 OK` |
| `PATCH` | `/api/v1/categories/{id}/status` | Ẩn/Hiện danh mục tiếp nhận | `MANAGER`, `ADMIN` | `{ is_active: false }` | `200 OK` |

---

## 4. Phân hệ M05, M06, M07, M08 — Vòng đời Xử lý Ticket (`/api/v1/tickets`)

| Method | Endpoint | Mô tả | Quyền truy cập | Request Body / Params | Response Status |
|---|---|---|---|---|---|
| `POST` | `/api/v1/tickets` | Sinh viên tạo Ticket mới (M05) | `STUDENT` | `{ category_id, title, content, attachment_ids: [...] }` | `201 Created` |
| `PUT` | `/api/v1/tickets/{id}` | Sinh viên chỉnh sửa Tiêu đề & Nội dung khi đơn ở `New` (Q8/BR-2) | `STUDENT` (Owner) | `{ title, content }` | `200 OK` (400 nếu status != NEW) |
| `GET` | `/api/v1/tickets` | Lấy danh sách Ticket (tự động filter theo Role và Department) | All Roles | Query: `?status=...&page=1&limit=20&search=...` | `200 OK` |
| `GET` | `/api/v1/tickets/{id}` | Xem chi tiết Ticket, tài liệu đính kèm & timeline | All Roles (có quyền) | Path param: `id` | `200 OK` |
| `POST` | `/api/v1/tickets/{id}/claim` | Nhân viên bấm nhận xử lý đơn (M06, Concurrency control) | `STAFF` | None | `200 OK` (409 Conflict nếu đã có người nhận) |
| `POST` | `/api/v1/tickets/{id}/progress` | Cập nhật tiến độ / ghi chú nội bộ (M07) | `STAFF` (Assignee) | `{ note: "Đang in bảng điểm...", is_internal: true }` | `200 OK` |
| `POST` | `/api/v1/tickets/{id}/request-supplement` | Nhân viên yêu cầu bổ sung thông tin (M07, đếm ngược 3 ngày LV, max 1 lần) | `STAFF` (Assignee) | `{ content: "Vui lòng đính kèm ảnh chụp CCCD..." }` | `200 OK` (400 nếu đã gửi yêu cầu trước đó) |
| `POST` | `/api/v1/tickets/{id}/return-to-admin` | Nhân viên báo cáo và trả lại đơn do gửi sai phòng ban (M07) | `STAFF` (Assignee) | `{ reason: "Đơn thuộc Phòng Đào tạo xử lý" }` | `200 OK` |
| `POST` | `/api/v1/tickets/{id}/resolve` | Nhân viên hoàn tất đơn & trả kết quả giải quyết (M08) | `STAFF` (Assignee) | `{ resolution_notes: "...", attachment_ids: [...] }` | `200 OK` |

---

## 5. Phân hệ M09, M10 — Phân hệ Sinh viên Bổ sung & Đánh giá

| Method | Endpoint | Mô tả | Quyền truy cập | Request Body | Response Status |
|---|---|---|---|---|---|
| `GET` | `/api/v1/student/tickets` | Sinh viên xem danh sách các đơn cá nhân đã tạo (M09) | `STUDENT` | Query: `?status=...` | `200 OK` |
| `POST` | `/api/v1/tickets/{id}/submit-supplement` | Sinh viên gửi tài liệu/thông tin bổ sung (M09, chuyển lại `In Progress`) | `STUDENT` (Owner) | `{ content: "Em đã bổ sung file...", attachment_ids: [...] }` | `200 OK` (400 nếu status != PENDING hoặc quá hạn) |
| `POST` | `/api/v1/tickets/{id}/feedback` | Sinh viên đánh giá chất lượng phục vụ 1–5 sao (M10, đóng đơn vĩnh viễn) | `STUDENT` (Owner) | `{ rating: 5, comment: "Xử lý rất nhanh" }` | `200 OK` (400 nếu đơn đã đóng hoặc auto_closed) |

---

## 6. Phân hệ M11, M12, M13 — Điều phối, Cảnh báo SLA & Báo cáo Thống kê

| Method | Endpoint | Mô tả | Quyền truy cập | Request Body / Params | Response Status |
|---|---|---|---|---|---|
| `POST` | `/api/v1/admin/tickets/{id}/dispatch` | Admin điều phối đơn gửi nhầm/sai mục về đúng phòng ban (M11) | `ADMIN` | `{ department_id, category_id, note }` | `200 OK` |
| `POST` | `/api/v1/manager/tickets/{id}/assign` | Trưởng phòng phân công (`Assign`) hoặc gán lại (`Re-assign`) đơn (M11) | `MANAGER` | `{ assignee_id: "staff-uuid-...", note: "..." }` | `200 OK` |
| `GET` | `/api/v1/manager/sla-alerts` | Danh sách các đơn sắp hết hạn hoặc đã vi phạm SLA (M12) | `MANAGER`, `ADMIN` | Query: `?department_id=...` | `200 OK` |
| `GET` | `/api/v1/reports/overview` | Báo cáo tổng quan số lượng ticket theo trạng thái (M13) | `MANAGER`, `ADMIN` | Query: `?from_date=...&to_date=...` | `200 OK` |
| `GET` | `/api/v1/reports/staff-performance` | Thống kê hiệu suất xử lý và điểm CSAT theo từng nhân viên (M13) | `MANAGER`, `ADMIN` | Query: `?department_id=...&from_date=...` | `200 OK` |

---

## 7. Dịch vụ dùng chung: Tệp tin & Thông báo (`/api/v1/files`, `/api/v1/notifications`)

| Method | Endpoint | Mô tả | Quyền truy cập | Request / Params | Response Status |
|---|---|---|---|---|---|
| `POST` | `/api/v1/files/upload` | Tải tệp đính kèm lên máy chủ (Tối đa 5MB, `.png`, `.jpg`, `.pdf`, `.docx`) | All Roles | `multipart/form-data (file)` | `201 Created` (`{ file_id, file_url, file_name }`) |
| `GET` | `/api/v1/notifications` | Lấy danh sách 20 thông báo In-app mới nhất | All Roles | Query: `?is_read=false` | `200 OK` |
| `PATCH` | `/api/v1/notifications/{id}/read` | Đánh dấu thông báo đã đọc | All Roles | None | `200 OK` |
| `PATCH` | `/api/v1/notifications/read-all` | Đánh dấu tất cả thông báo đã đọc | All Roles | None | `200 OK` |
