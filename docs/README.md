# TÀI LIỆU DỰ ÁN UNISUPPORT (PROJECT DOCUMENTATION INDEX)

---

## 1. Giới Thiệu Cấu Trúc Tài Liệu

Chào mừng bạn đến với bộ tài liệu hoàn chỉnh của hệ thống **UniSupport** (Nền tảng Tiếp nhận và Hỗ trợ Thủ tục Hành chính Sinh viên). Thư mục tài liệu này được cấu trúc theo chuẩn Quản trị Phần mềm Chuyên nghiệp, hỗ trợ đầy đủ các vai trò: **Business Analyst (BA)**, **Software Developer (Dev)**, **QA/QC Engineer** và **Project Manager (PM)**.

---

## 2. Danh Mục Tài Liệu Chi Tiết (Documentation Index)

### 📌 Tổng Quan Sản Phẩm (Product Overview)
* [product.md](product.md) - Định vị sản phẩm, mục tiêu dự án, các đối tượng sử dụng (Actors) và giá trị cốt lõi.

---

### 🏛️ 1. Nghiệp Vụ Cốt Lõi (Domain Knowledge)
* [docs/domain/domain-overview.md](domain/domain-overview.md) - Bối cảnh, Vấn đề cốt lõi và Giải pháp tổng thể Single Service Desk.
* [docs/domain/business-rules.md](domain/business-rules.md) - Quy tắc nghiệp vụ toàn cục của toàn hệ thống.
* [docs/domain/state-transition.md](domain/state-transition.md) - Vòng đời 5 trạng thái Ticket (`NEW` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `PENDING` $\rightarrow$ `RESOLVED` $\rightarrow$ `CLOSED`) và Ma trận chuyển đổi.
* [docs/domain/ticket-model.md](domain/ticket-model.md) - Mô hình khái niệm của Ticket.

---

### 📦 2. Đặc Tả Yêu Cầu Chức Năng (Modules / PRD)
Tập hợp đặc tả **13 Phân hệ thực thi (từ M01 đến M13)** phân chia thành 3 thư mục Giai đoạn phát triển ([Xem chi tiết: modules/readme.md](modules/readme.md)):
* **Giai đoạn 1 — Nền tảng & Working MVP (`modules/Giai-Doan-1-Nen-Tang-Working-MVP/`):** M01 (Đăng nhập & Xác thực), M02 (Quản lý tài khoản — Admin), M03 (Vai trò & Phân quyền — Admin), M04 (Quản lý danh mục hỗ trợ), M05 (Khởi tạo Ticket — Sinh viên), M06 (Tiếp nhận Ticket — Nhân viên), M07 (Xử lý & Trao đổi — Nhân viên), M08 (Trả kết quả — Nhân viên).
* **Giai đoạn 2 — Phân hệ Sinh viên (`modules/Giai-Doan-2-Phan-He-Sinh-Vien/`):** M09 (Theo dõi & Bổ sung thông tin), M10 (Kết quả & Đánh giá).
* **Giai đoạn 3 — Điều phối & Giám sát (`modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/`):** M11 (Quản lý & Điều phối Ticket), M12 (Giám sát tiến độ), M13 (Dashboard & Báo cáo).

---

### 🔄 3. Luồng Quy Trình Nghiệp Vụ (Workflows)
* [docs/workflows/readme.md](workflows/readme.md) - Danh mục 9 luồng quy trình kèm sơ đồ Mermaid Diagram trực quan.

---

### 💻 4. Thiết Kế Kỹ Thuật (Technical Design)
* [architecture-overview.md](technical/architecture-overview.md) - Sơ đồ Kiến trúc Hệ thống Phân tầng, Tech Stack, Security (JWT/RBAC) và NFR (SLA/Performance).
* [database-erd.md](technical/database-erd.md) - Sơ đồ CSDL Quan hệ (Mermaid ERD), Chi tiết Bảng, Constraints và Indexes.
* [api-specification.md](technical/api-specification.md) - Đặc tả RESTful API Endpoints chuẩn hóa.

---

### 🧪 5. Kế Hoạch & Ma Trận Kiểm Thử (QA & Testing)
* [test-strategy.md](qa/test-strategy.md) - Kế hoạch Kiểm thử, Các mức độ testing, Ma trận phân loại Bug Severity và Tiêu chí Release.
* [test-cases-matrix.md](qa/test-cases-matrix.md) - Ma trận Kịch bản Kiểm thử chi tiết (Test Cases) phủ 100% yêu cầu PRD.
