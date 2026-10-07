# DANH MỤC QUY TRÌNH NGHIỆP VỤ (WORKFLOWS) - UNISUPPORT

## 1. Giới thiệu tổng quan
Thư mục này lưu trữ toàn bộ các tài liệu đặc tả Luồng quy trình nghiệp vụ (Workflows) của hệ thống hỗ trợ hành chính sinh viên **UniSupport**. 

Mỗi quy trình mô tả chi tiết hành trình của một hoặc nhiều luồng dữ liệu, sự tương tác giữa các tác nhân (Sinh viên, Nhân viên, Quản lý, Admin) và hệ thống, có đính kèm sơ đồ luồng (Mermaid Diagram) và được ánh xạ trực tiếp đến các Đặc tả chức năng (FR - Functional Requirements).

---

## 2. Danh sách Luồng quy trình (Workflow Index)
Dưới đây là danh sách 9 luồng nghiệp vụ cốt lõi của hệ thống. Vui lòng bấm vào từng file để xem chi tiết:

### Luồng cốt lõi (Core Ticket Lifecycle)
* [WF-01: Khởi tạo yêu cầu (Submit Ticket)](WF-01-submit-ticket.md) - Sinh viên tạo đơn và định tuyến tự động.
* [WF-02: Tiếp nhận và Xử lý (Claim & Process)](WF-02-claim-and-process.md) - Luồng đi thẳng (Happy Path) nhân viên xử lý đơn.
* [WF-03: Yêu cầu bổ sung & Đếm ngược (Request Info)](WF-03-request-additional-info.md) - Nhân viên thiếu thông tin, chờ sinh viên phản hồi (Pending 72h).
* [WF-04: Luân chuyển & Điều phối (Transfer)](WF-04-transfer-department.md) - Xử lý sai phòng ban, phân công lại hoặc Admin phân phối đơn.
* [WF-05: Hoàn tất xử lý (Complete/Resolve)](WF-05-complete-or-resolve.md) - Nhân viên đóng gói kết quả, cập nhật trạng thái hoặc đánh dấu Spam.
* [WF-06: Đánh giá & Đóng đơn (Close & Rate)](WF-06-close-and-rate.md) - Sinh viên đánh giá chất lượng hoặc hệ thống tự động đóng đơn (Auto-Close).

### Luồng Hệ thống & Quản trị (System & Admin)
* [WF-07: Xác thực & Đồng bộ tài khoản (Authentication)](WF-07-authentication.md) - Đăng nhập hệ thống và Admin import danh sách người dùng.
* [WF-08: Điều phối & Báo cáo (Manager Assign)](WF-08-manager-assign.md) - Trưởng phòng theo dõi Dashboard và phân công lại công việc.
* [WF-09: Cấu hình hệ thống (Admin System)](WF-09-admin-system.md) - Quản trị toàn trường, quản lý danh mục và trạng thái tài khoản.

---

## 3. Hướng dẫn đọc tài liệu
* **Mã FR (Ví dụ: `FR-STF-01`):** Các mã nằm trong ngoặc đơn trỏ trực tiếp đến các yêu cầu chức năng (Functional Requirements) tương ứng trong bộ PRD chính.
* **Sơ đồ Mermaid:** Tất cả các luồng đều được minh họa bằng mã `mermaid`. Nếu xem trên GitHub, GitLab, Notion hoặc các Markdown Editor hỗ trợ (như Obsidian, VSCode có cài extension), sơ đồ sẽ tự động render thành hình ảnh trực quan.
* **Quy ước Vòng đời Ticket (States):** Vui lòng nắm vững 5 trạng thái cốt lõi của đơn trước khi đọc luồng: `New` (Mới) $\rightarrow$ `In Progress` (Đang xử lý) $\rightarrow$ `Pending` (Chờ bổ sung) $\rightarrow$ `Resolved` (Đã giải quyết) $\rightarrow$ `Closed` (Đã đóng).