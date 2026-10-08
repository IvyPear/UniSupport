# PHÂN HỆ: M10 — KẾT QUẢ & ĐÁNH GIÁ (RESULTS & FEEDBACK)

## [FR-M10-01] Xem kết quả xử lý và tải tệp kết quả

**Mô tả:** Sinh viên xem nội dung giải trình kết quả (Resolution Notes) và tải tài liệu trả lời khi đơn ở trạng thái Đã giải quyết.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket ở trạng thái Đã giải quyết.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung kết quả giải quyết:** Chỉ đọc.
- **Tệp kết quả:** Danh sách đường dẫn tải tệp kết quả.

**Luồng chính (Main Flow):**

1. Mở Ticket Đã giải quyết.
2. Hệ thống hiển thị phần thông tin Kết quả xử lý từ Nhân viên.
3. Bấm tải tệp kết quả trả lời (nếu có).

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị đầy đủ văn bản kết quả và hỗ trợ tải file kết quả an toàn.

## [FR-M10-02] Đánh giá mức độ hài lòng 1–5 sao

**Mô tả:** Sinh viên chấm điểm đánh giá chất lượng phục vụ từ 1 đến 5 sao cho đơn đã xử lý.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket ở trạng thái Đã giải quyết.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Điểm đánh giá:** Bắt buộc, lựa chọn: 1, 2, 3, 4, 5.

**Luồng chính (Main Flow):**

1. Tại màn hình xem kết quả, chọn mục “Đánh giá chất lượng”.
2. Chọn số sao từ 1 đến 5 sao.
3. Hệ thống ghi nhận điểm sao.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chọn số sao (1-5) là thao tác bắt buộc khi gửi đánh giá.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chọn sao và bấm gửi → Lưu điểm mức độ hài lòng vào hệ thống thành công.

## [FR-M10-03] Viết nhận xét và đóng Ticket vĩnh viễn

**Mô tả:** Sinh viên nhập góp ý tùy chọn và xác nhận đóng đơn vĩnh viễn (Đã đóng).

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Hoàn tất chọn sao ở FR-M10-02.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Điểm đánh giá:** Bắt buộc, 1-5 sao.
- **Nhận xét:** Tùy chọn, Ý kiến đóng góp thêm của Sinh viên.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.
- **Thời điểm đóng Ticket:** Mốc thời gian đóng đơn.
- **Đóng tự động:** Mặc định false, bằng true nếu do tự động đóng 72h.

**Luồng chính (Main Flow):**

1. Nhập ý kiến nhận xét (tùy chọn).
2. Bấm “Gửi đánh giá & Đóng đơn”.
3. Hệ thống lưu nhận xét và chuyển trạng thái Ticket thành Đã đóng (Đóng vĩnh viễn).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Ticket ở trạng thái Đã đóng bị khóa cứng mọi tương tác, tuyệt đối không cho phép mở lại (No Reopen).
* **BR-02 (Auto-Close):** Sau 72 giờ ở trạng thái Đã giải quyết mà Sinh viên không đánh giá, hệ thống tự động gỡ bộ đếm và chuyển thành Đã đóng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Đánh giá xong → Chuyển Đã đóng, khóa vĩnh viễn mọi thao tác chỉnh sửa/bình luận.
* **AC-02 (Kiểm thử BR-02):** Quá 72h không đánh giá → Tự động đóng đơn sang Đã đóng.

---
