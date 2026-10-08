# ĐẶC TẢ RESTFUL API — UNISUPPORT

> **Dự án:** UniSupport — System Helpdesk & Support  
> **Chuẩn:** RESTful JSON, JWT Authentication, Role-based Access Control (RBAC)

---

## 1. Nhóm API Xác thực (`/api/v1/auth`)
* `POST /api/v1/auth/login` — Đăng nhập hệ thống (M01)
* `POST /api/v1/auth/refresh-token` — Làm mới JWT Token (M01)
* `POST /api/v1/auth/logout` — Đăng xuất (M01)

---

## 2. Nhóm API Ticket (`/api/v1/tickets`)
* `POST /api/v1/tickets` — Khởi tạo Ticket mới (M05)
* `GET /api/v1/tickets` — Danh sách Ticket theo role (M06, M09, M11)
* `GET /api/v1/tickets/{id}` — Chi tiết Ticket (M09, M06)
* `PATCH /api/v1/tickets/{id}/status` — Cập nhật trạng thái (M07)
* `POST /api/v1/tickets/{id}/claim` — Tiếp nhận Ticket (M06)
* `POST /api/v1/tickets/{id}/resolve` — Trả kết quả xử lý (M08)
* `POST /api/v1/tickets/{id}/feedback` — Đánh giá 1–5 sao (M10)
