# BẢNG PHÂN CHIA MODULE VÀ TASK - DỰ ÁN UNISUPPORT

> **Quy mô Phân hệ:** 13 MODULE THỰC THI (M01–M13) • 3 GIAI ĐOẠN • 4 ROLE
> **Lưu ý cấu trúc:** Thư mục `modules/` được phân chia thành 3 folder tương ứng với 3 Giai đoạn triển khai dự án. Danh mục mã Module được đánh số liên tục từ **M01 đến M13**.
> **Nguyên tắc cốt lõi:** Triển khai cuốn chiếu; dùng Database thật (không mockup); hoàn thành, kiểm thử và nghiệm thu từng module trước khi chuyển tiếp.

---

## 1. Tổng quan các Giai đoạn & Cấu trúc Thư mục (Phase Folders Overview)

| Giai đoạn     | Thư mục Giai đoạn                 | Phạm vi Module | Số lượng | Milestone Nghiệm thu                                                                                                                                     |
| :-------------- | :------------------------------------ | :-------------- | :---------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GĐ 1** | `Giai-Doan-1-Nen-Tang-Working-MVP/` | M01–M08        |      8      | Khách hàng đăng nhập bằng tài khoản thật, tạo Ticket, Nhân viên tiếp nhận, xử lý và trả kết quả; dữ liệu lưu trên Database thật. |
| **GĐ 2** | `Giai-Doan-2-Phan-He-Sinh-Vien/`    | M09–M10        |      2      | Sinh viên thực hiện đầy đủ luồng: Tạo → Theo dõi → Bổ sung → Nhận kết quả → Đánh giá.                                                |
| **GĐ 3** | `Giai-Doan-3-Dieu-Phoi-Giam-Sat/`   | M11–M13        |            | Quản lý phân công và giám sát trong phòng ban; Admin theo dõi và điều phối toàn trường.                                                   |

---

## 2. Danh mục 13 Phân hệ Chi tiết Theo Thư mục Giai đoạn

### 🚀 GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP (`Giai-Doan-1-Nen-Tang-Working-MVP/`)

*Mục tiêu: Hoàn thiện quản trị nền tảng và luồng tạo → tiếp nhận → xử lý → trả kết quả Ticket trên Database thật.*

* **[M01-auth/](Giai-Doan-1-Nen-Tang-Working-MVP/M01-auth/) - M01: Đăng nhập & Xác thực** ([prd.md](Giai-Doan-1-Nen-Tang-Working-MVP/M01-auth/prd.md) | [Auth.md](Giai-Doan-1-Nen-Tang-Working-MVP/M01-auth/Auth.md))
  * Đăng nhập, đăng xuất, quên và đặt lại mật khẩu.
  * Xác thực và điều hướng theo Role.
* **[M02-account-management/](Giai-Doan-1-Nen-Tang-Working-MVP/M02-account-management/) - M02: Quản lý tài khoản — Admin** ([prd.md](Giai-Doan-1-Nen-Tang-Working-MVP/M02-account-management/prd.md) | [Account-management.md](Giai-Doan-1-Nen-Tang-Working-MVP/M02-account-management/Account-management.md))
  * Tạo, xem, tìm kiếm và lọc tài khoản.
  * Cập nhật, khóa, mở khóa và xóa tài khoản.
* **[M03-roles-permissions/](Giai-Doan-1-Nen-Tang-Working-MVP/M03-roles-permissions/) - M03: Vai trò & Phân quyền — Admin** ([prd.md](Giai-Doan-1-Nen-Tang-Working-MVP/M03-roles-permissions/prd.md) | [Roles-permissions.md](Giai-Doan-1-Nen-Tang-Working-MVP/M03-roles-permissions/Roles-permissions.md))
  * Quản lý vai trò người dùng.
  * Cấu hình và kiểm soát quyền truy cập.
* **[M04-category-management/](Giai-Doan-1-Nen-Tang-Working-MVP/M04-category-management/) - M04: Quản lý danh mục hỗ trợ** ([prd.md](Giai-Doan-1-Nen-Tang-Working-MVP/M04-category-management/prd.md) | [Category-management.md](Giai-Doan-1-Nen-Tang-Working-MVP/M04-category-management/Category-management.md))
  * Admin quản lý danh mục toàn trường.
  * Quản lý thêm danh mục thuộc phòng ban.
* **[M05-create-ticket/](Giai-Doan-1-Nen-Tang-Working-MVP/M05-create-ticket/) - M05: Khởi tạo Ticket — Sinh viên** ([prd.md](Giai-Doan-1-Nen-Tang-Working-MVP/M05-create-ticket/prd.md) | [Create-ticket.md](Giai-Doan-1-Nen-Tang-Working-MVP/M05-create-ticket/Create-ticket.md))
  * Chọn phòng ban, danh mục hoặc “Khác”.
  * Nhập thông tin, đính kèm và gửi Ticket.
* **[M06-receive-ticket/](Giai-Doan-1-Nen-Tang-Working-MVP/M06-receive-ticket/) - M06: Tiếp nhận Ticket — Nhân viên** ([prd.md](Giai-Doan-1-Nen-Tang-Working-MVP/M06-receive-ticket/prd.md) | [Receive-ticket.md](Giai-Doan-1-Nen-Tang-Working-MVP/M06-receive-ticket/Receive-ticket.md))
  * Xem danh sách Ticket mới thuộc phòng ban.
  * Tìm kiếm, lọc và tiếp nhận Ticket.
* **[M07-process-exchange/](Giai-Doan-1-Nen-Tang-Working-MVP/M07-process-exchange/) - M07: Xử lý & Trao đổi — Nhân viên** ([prd.md](Giai-Doan-1-Nen-Tang-Working-MVP/M07-process-exchange/prd.md) | [Process-exchange.md](Giai-Doan-1-Nen-Tang-Working-MVP/M07-process-exchange/Process-exchange.md))
  * Cập nhật trạng thái và tiến độ Ticket.
  * Yêu cầu bổ sung và trao đổi với Sinh viên.
  * Chuyển Ticket sai phòng ban về Admin.
* **[M08-ticket-results/](Giai-Doan-1-Nen-Tang-Working-MVP/M08-ticket-results/) - M08: Trả kết quả — Nhân viên** ([prd.md](Giai-Doan-1-Nen-Tang-Working-MVP/M08-ticket-results/prd.md) | [Ticket-results.md](Giai-Doan-1-Nen-Tang-Working-MVP/M08-ticket-results/Ticket-results.md))
  * Nhập kết quả và đính kèm tài liệu.
  * Hoàn thành Ticket và thông báo cho Sinh viên.

---

### 🎓 GIAI ĐOẠN 2 — PHÂN HỆ SINH VIÊN (`Giai-Doan-2-Phan-He-Sinh-Vien/`)

*Mục tiêu: Hoàn thiện toàn bộ trải nghiệm Sinh viên.*

* **[M09-ticket-tracking-supplement/](Giai-Doan-2-Phan-He-Sinh-Vien/M09-ticket-tracking-supplement/) - M09: Theo dõi & Bổ sung thông tin** ([prd.md](Giai-Doan-2-Phan-He-Sinh-Vien/M09-ticket-tracking-supplement/prd.md) | [Ticket-tracking-supplement.md](Giai-Doan-2-Phan-He-Sinh-Vien/M09-ticket-tracking-supplement/Ticket-tracking-supplement.md))
  * Xem danh sách, chi tiết và trạng thái Ticket.
  * Tìm kiếm, lọc và theo dõi lịch sử Ticket.
  * Bổ sung thông tin và tài liệu theo yêu cầu.
  * Thông báo trạng thái và yêu cầu bổ sung.
* **[M10-results-feedback/](Giai-Doan-2-Phan-He-Sinh-Vien/M10-results-feedback/) - M10: Kết quả & Đánh giá** ([prd.md](Giai-Doan-2-Phan-He-Sinh-Vien/M10-results-feedback/prd.md) | [Results-feedback.md](Giai-Doan-2-Phan-He-Sinh-Vien/M10-results-feedback/Results-feedback.md))
  * Xem kết quả và tải tài liệu.
  * Đánh giá mức độ hài lòng 1–5 sao.
  * Viết nhận xét và xem thông báo kết quả.

---

### 📊 GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT (`Giai-Doan-3-Dieu-Phoi-Giam-Sat/`)

*Mục tiêu: Hoàn thiện điều phối phòng ban và giám sát toàn trường.*

* **[M11-routing-dispatch/](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M11-routing-dispatch/) - M11: Quản lý & Điều phối Ticket** ([prd.md](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M11-routing-dispatch/prd.md) | [Routing-dispatch.md](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M11-routing-dispatch/Routing-dispatch.md))
  * Quản lý phân công Ticket cho nhân viên thuộc phòng ban.
  * Admin phân loại Ticket “Khác”.
  * Admin tiếp nhận và điều chuyển Ticket sai phòng ban.
* **[M12-progress-monitoring/](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M12-progress-monitoring/) - M12: Giám sát tiến độ** ([prd.md](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M12-progress-monitoring/prd.md) | [Progress-monitoring.md](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M12-progress-monitoring/Progress-monitoring.md))
  * Quản lý theo dõi tiến độ và hiệu suất nhân viên.
  * Theo dõi Ticket tồn đọng, chưa tiếp nhận và quá hạn.
  * Admin theo dõi tiến độ xử lý toàn trường.
* **[M13-dashboard-reporting/](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M13-dashboard-reporting/) - M13: Dashboard & Báo cáo** ([prd.md](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M13-dashboard-reporting/prd.md) | [Dashboard-reporting.md](Giai-Doan-3-Dieu-Phoi-Giam-Sat/M13-dashboard-reporting/Dashboard-reporting.md))
  * Dashboard và thống kê theo phạm vi quyền.
  * Báo cáo Ticket theo trạng thái, danh mục và thời gian.
  * Thống kê đánh giá và hiệu suất nhân viên.

---

## 3. Quy tắc Nghiệm thu 

1. **Dữ liệu hệ thống:** Thực hiện trên Database thật do chính người dùng nhập vào
2. **Nghiệm thu theo từng Phân hệ:** Hoàn thiện Frontend, Backend, API và kiểm thử trong phạm vi từng module.
3. **Phụ thuộc M07/M11:** M07 có chức năng chuyển Ticket sai phòng ban về Admin, M11 có giao diện xử lý điều chuyển. Để nghiệm thu M07 ở GĐ1, đưa phần chuyển tiếp của M11 lên GĐ1.
