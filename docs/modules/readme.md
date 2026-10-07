	

# ĐẶC TẢ YÊU CẦU CHỨC NĂNG (FUNCTIONAL MODULES) - UNISUPPORT

## 1. Giới thiệu tổng quan

Thư mục `modules` lưu trữ toàn bộ tài liệu Đặc tả Yêu cầu Sản phẩm (PRD - Product Requirement Document) của hệ thống hỗ trợ hành chính sinh viên **UniSupport**.

Hệ thống được chia nhỏ thành 10 phân hệ (Modules) độc lập để dễ dàng theo dõi, phát triển và nghiệm thu. Mỗi phân hệ chứa các Yêu cầu chức năng (Functional Requirements - FR) đã được chuẩn hóa chi tiết.

---

## 2. Danh sách Phân hệ (Modules Index)

Dưới đây là danh sách 10 phân hệ cốt lõi của hệ thống. Vui lòng bấm vào từng file để đọc đặc tả chi tiết:

### Nền tảng & Khởi tạo

* [M01-auth/](M01-auth/) - Phân hệ Xác thực & Quản lý tài khoản ([prd.md](M01-auth/prd.md) | [M01-auth.md](M01-auth/M01-auth.md)).
* [M02-request-ticket/](M02-request-ticket/) - Phân hệ Khởi tạo & Vòng đời Ticket ([prd.md](M02-request-ticket/prd.md) | [M02-request-ticket.md](M02-request-ticket/M02-request-ticket.md)).
* [M03-category-management/](M03-category-management/) - Phân hệ Quản lý Ticket & Vòng đời Trạng thái ([prd.md](M03-category-management/prd.md) | [M03-category-management.md](M03-category-management/M03-category-management.md)).

### Nghiệp vụ Xử lý & Luân chuyển

* [M04-staff-operations/](M04-staff-operations/) - Phân hệ Nghiệp vụ Nhân viên ([prd.md](M04-staff-operations/prd.md) | [M04-staff-operations.md](M04-staff-operations/M04-staff-operations.md)).
* [M05-routing/](M05-routing/) - Phân hệ Định tuyến & Điều phối ([prd.md](M05-routing/prd.md) | [M05-routing.md](M05-routing/M05-routing.md)).
* [M06-communication/](M06-communication/) - Phân hệ Trao đổi & Tệp đính kèm ([prd.md](M06-communication/prd.md) | [M06-communication.md](M06-communication/M06-communication.md)).

### Hậu mãi & Quản trị

* [M07-notification/](M07-notification/) - Phân hệ Thông báo hệ thống ([prd.md](M07-notification/prd.md) | [M07-notification.md](M07-notification/M07-notification.md)).
* [M08-feedback-rating/](M08-feedback-rating/) - Phân hệ Đánh giá & Đóng đơn ([prd.md](M08-feedback-rating/prd.md) | [M08-feedback-rating.md](M08-feedback-rating/M08-feedback-rating.md)).
* [M09-reporting-analytics/](M09-reporting-analytics/) - Phân hệ Báo cáo & Thống kê ([prd.md](M09-reporting-analytics/prd.md) | [M09-reporting-analytics.md](M09-reporting-analytics/M09-reporting-analytics.md)).
* [M10-admin-management/](M10-admin-management/) - Phân hệ Quản trị Hệ thống ([prd.md](M10-admin-management/prd.md) | [M10-admin-management.md](M10-admin-management/M10-admin-management.md)).

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
