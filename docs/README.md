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
Tập hợp đặc tả 10 phân hệ chức năng tiêu chuẩn (kèm `FR`, `BR`, `Main Flow`, `Alternative Flow` và `Acceptance Criteria - AC`):
* [01_Auth_Module.md](modules/01_Auth_Module.md) - Phân hệ Tài khoản (Đăng nhập, Closed-loop system, Admin Import).
* [02_Request_Ticket_Module.md](modules/02_Request_Ticket_Module.md) - Phân hệ Sinh viên Khởi tạo Ticket.
* [03_Category_Management_Module.md](modules/03_Category_Management_Module.md) - Quản lý Danh mục Dịch vụ & Chuyên trách.
* [04_Staff_Operations_Module.md](modules/04_Staff_Operations_Module.md) - Phân hệ Nhân viên Tiếp nhận & Xử lý (Claim, Resolve, Spam).
* [05_Routing_Module.md](modules/05_Routing_Module.md) - Cơ chế Định tuyến Tự động & Điều phối Đơn.
* [06_Communication_Module.md](modules/06_Communication_Module.md) - Trao đổi 2 chiều & Đính kèm Minh chứng.
* [07_Notification_Module.md](modules/07_Notification_Module.md) - Hệ thống Thông báo (In-app & Email).
* [08_Feedback_Rating_Module.md](modules/08_Feedback_Rating_Module.md) - Đánh giá Chất lượng 1-5 Sao & Khóa đơn.
* [09_Reporting_Analytics_Module.md](modules/09_Reporting_Analytics_Module.md) - Báo cáo Thống kê & Hiệu suất Nhân sự.
* [10_Admin_Management_Module.md](modules/10_Admin_Management_Module.md) - Quản trị Hệ thống Toàn trường.

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
