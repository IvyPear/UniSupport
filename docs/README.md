# TÀI LIỆU DỰ ÁN UNISUPPORT (PROJECT DOCUMENTATION INDEX)

---

## 1. Giới Thiệu Cấu Trúc Tài Liệu

Chào mừng bạn đến với bộ tài liệu hoàn chỉnh của hệ thống **UniSupport** (Nền tảng Tiếp nhận và Hỗ trợ Thủ tục Hành chính Sinh viên). Thư mục tài liệu này được cấu trúc theo chuẩn Quản trị Phần mềm Chuyên nghiệp, hỗ trợ đầy đủ các vai trò: **Business Analyst (BA)**, **Software Developer (Dev)**, **QA/QC Engineer** và **Project Manager (PM)**.

---

## 2. Danh Mục Tài Liệu Chi Tiết (Documentation Index)

### 📌 Tổng Quan Sản Phẩm (Product Overview)
* [tong-quan-san-pham.md](tong-quan-san-pham.md) - Định vị sản phẩm, mục tiêu dự án, các đối tượng sử dụng (Actors) và giá trị cốt lõi.

---

### 🏛️ 1. Nghiệp Vụ Cốt Lõi (Domain Knowledge) ([Xem chỉ mục chi tiết: domain/readme.md](domain/readme.md))
* [docs/domain/tong-quan-domain.md](domain/tong-quan-domain.md) - Bối cảnh, Vấn đề cốt lõi và Giải pháp tổng thể Single Service Desk.
* [docs/domain/quy-tac-nghiep-vu.md](domain/quy-tac-nghiep-vu.md) - Quy tắc nghiệp vụ toàn cục của toàn hệ thống.
* [docs/domain/chuyen-doi-trang-thai.md](domain/chuyen-doi-trang-thai.md) - Vòng đời 5 trạng thái Ticket (`NEW` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `PENDING` $\rightarrow$ `RESOLVED` $\rightarrow$ `CLOSED`) và Ma trận chuyển đổi.
* [docs/domain/mo-hinh-ticket.md](domain/mo-hinh-ticket.md) - Mô hình khái niệm của Ticket.

---

### 📦 2. Đặc Tả Yêu Cầu Chức Năng (Modules / PRD)
Tập hợp đặc tả **13 Phân hệ thực thi (từ M01 đến M13)** phân chia thành 3 thư mục Giai đoạn phát triển ([Xem chi tiết: modules/readme.md](modules/readme.md)):
* **Giai đoạn 1 — Nền tảng & Working MVP (`modules/GĐ1-NenTang&ChucNangCotLoi/`):** M01 (Đăng nhập & Xác thực), M02 (Quản lý tài khoản — Admin), M03 (Vai trò & Phân quyền — Admin), M04 (Quản lý danh mục hỗ trợ), M05 (Khởi tạo Ticket — Sinh viên), M06 (Tiếp nhận Ticket — Nhân viên), M07 (Xử lý & Trao đổi — Nhân viên), M08 (Trả kết quả — Nhân viên).
* **Giai đoạn 2 — Phân hệ Sinh viên (`modules/GĐ2-PhanHeSinhVien/`):** M09 (Theo dõi & Bổ sung thông tin), M10 (Kết quả & Đánh giá).
* **Giai đoạn 3 — Điều phối & Giám sát (`modules/GĐ3-DieuPhoi&GIamSat/`):** M11 (Quản lý & Điều phối Ticket), M12 (Giám sát tiến độ), M13 (Dashboard & Báo cáo).

---

### 🔄 3. Luồng Quy Trình Nghiệp Vụ (Workflows)
* [docs/workflows/readme.md](workflows/readme.md) - Danh mục 9 luồng quy trình kèm sơ đồ Mermaid Diagram trực quan.

---

### 💻 4. Thiết Kế Kỹ Thuật (Technical Design)
* [tong-quan-kien-truc.md](technical/tong-quan-kien-truc.md) - Sơ đồ Kiến trúc Hệ thống Phân tầng, Tech Stack, Security (JWT/RBAC) và NFR (SLA/Performance).
* [co-so-du-lieu-erd.md](technical/co-so-du-lieu-erd.md) - Sơ đồ CSDL Quan hệ (Mermaid ERD), Chi tiết Bảng, Constraints và Indexes.
* [dac-ta-api.md](technical/dac-ta-api.md) - Đặc tả RESTful API Endpoints chuẩn hóa.

---

### 🧪 5. Kế Hoạch & Ma Trận Kiểm Thử (QA & Testing)
* [chien-luoc-kiem-thu.md](qa/chien-luoc-kiem-thu.md) - Kế hoạch Kiểm thử, Các mức độ testing, Ma trận phân loại Bug Severity và Tiêu chí Release.
* [ma-tran-test-case.md](qa/ma-tran-test-case.md) - Ma trận Kịch bản Kiểm thử chi tiết (Test Cases) phủ 100% yêu cầu PRD.
