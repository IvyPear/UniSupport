# TÀI LIỆU LUỒNG QUY TRÌNH NGHIỆP VỤ (FUNCTIONAL WORKFLOWS PRD)

> **Dự án:** UniSupport — System Helpdesk & Support  
> **Ánh xạ Phân hệ:** Phân hệ M01 đến M13 (3 Giai đoạn triển khai)  
> **Tác nhân:** Sinh viên, Nhân viên, Quản lý (Trưởng phòng), Admin  

---

## 1. Bản đồ Danh mục Luồng Nghiệp vụ (Workflows Index)

### 📌 01. Vòng đời Ticket & Tổng quan
* **[01-lifecycle-overview.md](01-lifecycle-overview.md)** — Sơ đồ vòng đời Ticket (Mermaid), bảng 5 trạng thái cốt lõi và các nguyên tắc nghiệp vụ chung.

---

### 🎓 02. Phân hệ Sinh viên (Student Workflows)
* **[02-student-workflows.md](02-student-workflows.md)** — Tập hợp 5 quy trình nghiệp vụ Sinh viên:
  * **SV-01:** Gửi yêu cầu hỗ trợ ([M05-create-ticket](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M05-create-ticket/))
  * **SV-02:** Theo dõi yêu cầu ([M09-ticket-tracking-supplement](../modules/Giai-Doan-2-Phan-He-Sinh-Vien/M09-ticket-tracking-supplement/))
  * **SV-03:** Bổ sung thông tin ([M09-ticket-tracking-supplement](../modules/Giai-Doan-2-Phan-He-Sinh-Vien/M09-ticket-tracking-supplement/))
  * **SV-04:** Xem kết quả ([M10-results-feedback](../modules/Giai-Doan-2-Phan-He-Sinh-Vien/M10-results-feedback/))
  * **SV-05:** Đánh giá chất lượng ([M10-results-feedback](../modules/Giai-Doan-2-Phan-He-Sinh-Vien/M10-results-feedback/))

---

### 🛠️ 03. Phân hệ Nhân viên (Staff Workflows)
* **[03-staff-workflows.md](03-staff-workflows.md)** — Tập hợp 6 quy trình nghiệp vụ Nhân viên phòng ban:
  * **NV-01:** Tiếp nhận Ticket ([M06-receive-ticket](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M06-receive-ticket/))
  * **NV-02:** Cập nhật tiến độ ([M07-process-exchange](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M07-process-exchange/))
  * **NV-03:** Yêu cầu bổ sung ([M07-process-exchange](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M07-process-exchange/))
  * **NV-04:** Chuyển Ticket sai phòng ban ([M07-process-exchange](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M07-process-exchange/))
  * **NV-05:** Trả kết quả ([M08-ticket-results](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M08-ticket-results/))
  * **NV-06:** Xem lịch sử xử lý ([M07-process-exchange](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M07-process-exchange/))

---

### 📊 04. Phân hệ Quản lý / Trưởng phòng (Manager Workflows)
* **[04-manager-workflows.md](04-manager-workflows.md)** — Tập hợp 6 quy trình nghiệp vụ Quản lý:
  * **QL-01:** Theo dõi tổng quan phòng ban ([M13-dashboard-reporting](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M13-dashboard-reporting/))
  * **QL-02:** Phân công nhanh ([M11-routing-dispatch](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M11-routing-dispatch/))
  * **QL-03:** Giám sát tiến độ và tồn đọng ([M12-progress-monitoring](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M12-progress-monitoring/))
  * **QL-04:** Theo dõi hiệu suất Nhân viên ([M12-progress-monitoring](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M12-progress-monitoring/), [M13-dashboard-reporting](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M13-dashboard-reporting/))
  * **QL-05:** Quản lý danh mục phòng ban ([M04-category-management](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M04-category-management/))
  * **QL-06:** Báo cáo và đánh giá ([M13-dashboard-reporting](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M13-dashboard-reporting/))

---

### ⚙️ 05. Phân hệ Quản trị viên (Admin Workflows)
* **[05-admin-workflows.md](05-admin-workflows.md)** — Tập hợp 6 quy trình nghiệp vụ Admin:
  * **AD-01:** Quản lý tài khoản ([M02-account-management](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M02-account-management/))
  * **AD-02:** Vai trò và phân quyền ([M03-roles-permissions](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M03-roles-permissions/))
  * **AD-03:** Quản lý danh mục toàn trường ([M04-category-management](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M04-category-management/))
  * **AD-04:** Phân loại Ticket "Khác" ([M11-routing-dispatch](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M11-routing-dispatch/))
  * **AD-05:** Điều chuyển Ticket sai phòng ban ([M11-routing-dispatch](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M11-routing-dispatch/))
  * **AD-06:** Theo dõi và thống kê toàn trường ([M12-progress-monitoring](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M12-progress-monitoring/), [M13-dashboard-reporting](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M13-dashboard-reporting/))

---

### 🔔 06. Ma trận Thông báo & ⚙️ 07. Quyết định Nghiệp vụ
* **[06-notification-matrix.md](06-notification-matrix.md)** — Ma trận 6 hành vi thông báo hệ thống đã thống nhất.
* **[07-business-rules.md](07-business-rules.md)** — Danh mục 10 quyết định nghiệp vụ (BR-01 đến BR-10) cần chốt trước khi hoàn thiện Database/API.

---

### 📁 08. Luồng Quy trình Chi tiết (Detail WF Files)
* **[WF-01-submit-ticket.md](WF-01-submit-ticket.md)** — [SV-01] Sinh viên khởi tạo yêu cầu.
* **[WF-02-claim-and-process.md](WF-02-claim-and-process.md)** — [NV-01, NV-02] Nhân viên tiếp nhận và xử lý.
* **[WF-03-request-additional-info.md](WF-03-request-additional-info.md)** — [NV-03, SV-03] Yêu cầu bổ sung & đếm ngược 72h.
* **[WF-04-transfer-department.md](WF-04-transfer-department.md)** — [NV-04, AD-04, AD-05] Luân chuyển & điều chuyển đơn.
* **[WF-05-complete-or-resolve.md](WF-05-complete-or-resolve.md)** — [NV-05] Trả kết quả & hoàn tất xử lý.
* **[WF-06-close-and-rate.md](WF-06-close-and-rate.md)** — [SV-04, SV-05] Xem kết quả & đánh giá 1–5 sao.
* **[WF-07-authentication.md](WF-07-authentication.md)** — [AD-01] Đăng nhập & đồng bộ tài khoản.
* **[WF-08-manager-assign.md](WF-08-manager-assign.md)** — [QL-01 đến QL-06] Điều phối & giám sát Trưởng phòng.
* **[WF-09-admin-system.md](WF-09-admin-system.md)** — [AD-01 đến AD-06] Cấu hình & quản trị hệ thống Admin.
