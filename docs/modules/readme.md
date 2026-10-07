# ĐẶC TẢ YÊU CẦU CHỨC NĂNG (FUNCTIONAL MODULES) - UNISUPPORT

## 1. Giới thiệu tổng quan
Thư mục `modules` lưu trữ toàn bộ tài liệu Đặc tả Yêu cầu Sản phẩm (PRD - Product Requirement Document) của hệ thống hỗ trợ hành chính sinh viên **UniSupport**. 

Hệ thống được chia nhỏ thành 10 phân hệ (Modules) độc lập để dễ dàng theo dõi, phát triển và nghiệm thu. Mỗi phân hệ chứa các Yêu cầu chức năng (Functional Requirements - FR) đã được chuẩn hóa chi tiết.

---

## 2. Danh sách Phân hệ (Modules Index)
Dưới đây là danh sách 10 phân hệ cốt lõi của hệ thống. Vui lòng bấm vào từng file để đọc đặc tả chi tiết:

### Nền tảng & Khởi tạo
* [01_Auth_Module.md](01_Auth_Module.md) - Phân hệ Xác thực & Quản lý tài khoản (Đăng nhập, Đồng bộ dữ liệu).
* [02_Request_Ticket_Module.md](02_Request_Ticket_Module.md) - Phân hệ Khởi tạo & Vòng đời Ticket (Dành cho Sinh viên).
* [03_Category_Management_Module.md](03_Category_Management_Module.md) - Phân hệ Quản lý Danh mục (Cấu hình danh mục hỗ trợ).

### Nghiệp vụ Xử lý & Luân chuyển
* [04_Staff_Operations_Module.md](04_Staff_Operations_Module.md) - Phân hệ Nghiệp vụ Nhân viên (Tiếp nhận, Xử lý, Cập nhật trạng thái).
* [05_Routing_Module.md](05_Routing_Module.md) - Phân hệ Định tuyến & Điều phối (Tự động chia việc, Dispatch, Phân công lại).
* [06_Communication_Module.md](06_Communication_Module.md) - Phân hệ Trao đổi & Tệp đính kèm (Nhắn tin bổ sung thông tin, Gửi file).

### Hậu mãi & Quản trị
* [07_Notification_Module.md](07_Notification_Module.md) - Phân hệ Thông báo hệ thống (Cảnh báo in-app, tự động nhắc nhở).
* [08_Feedback_Rating_Module.md](08_Feedback_Rating_Module.md) - Phân hệ Đánh giá & Đóng đơn (Chấm điểm chất lượng, Auto-Close 72h).
* [09_Reporting_Analytics_Module.md](09_Reporting_Analytics_Module.md) - Phân hệ Báo cáo & Thống kê (Dashboard cho Admin và Trưởng phòng).
* [10_Admin_Management_Module.md](10_Admin_Management_Module.md) - Phân hệ Quản trị Hệ thống (Phân quyền Vai trò, Quản lý trạng thái nhân sự).

---

## 3. Cấu trúc chuẩn của một Yêu cầu chức năng (FR)
Để thuận tiện cho đội ngũ Phát triển (Dev) và Kiểm thử (QA), mỗi chức năng trong các file trên đều được chuẩn hóa theo format thống nhất bao gồm:

1. **Mã định danh (ID) & Tiêu đề:** Ví dụ `[FR-STF-01] Nhân viên tiếp nhận Ticket`.
2. **Mô tả & Actor:** Tóm tắt chức năng và xác định rõ đối tượng người dùng nào được phép thực hiện.
3. **Preconditions (Điều kiện tiên quyết):** Trạng thái hoặc điều kiện bắt buộc trước khi thực hiện chức năng.
4. **Main Flow & Alternative Flows:** Luồng thao tác chính từng bước (Happy Path) và các luồng ngoại lệ/báo lỗi.
5. **Business Rules (BR):** Các quy tắc nghiệp vụ/logic ngầm bắt buộc hệ thống phải tuân thủ.
6. **Acceptance Criteria (AC):** Tiêu chí nghiệm thu rõ ràng, dùng làm đầu vào trực tiếp để QA viết Test Case.

---
*Lưu ý: Để xem cách các module này liên kết với nhau thành một hành trình xuyên suốt, vui lòng tham khảo thư mục `workflows`.*