# PHÂN HỆ: M10 — KẾT QUẢ & ĐÁNH GIÁ (RESULTS & FEEDBACK)

> **Giai đoạn:** GIAI ĐOẠN 2 — PHÂN HỆ SINH VIÊN  
> **Actor chính:** Sinh viên  

---

## [FR-M10-01] Xem kết quả xử lý và tải tệp kết quả
* **Mô tả:** Sinh viên xem nội dung giải trình kết quả (Resolution Notes) và tải tài liệu trả lời khi đơn ở trạng thái `Resolved`.
* **Actor:** Sinh viên
* **Preconditions:** Ticket ở trạng thái `Resolved`.
* **Trường dữ liệu (Data Fields):**
  * `ticket_id`: Integer (Bắt buộc)
  * `resolution_notes`: Text (Chỉ đọc)
  * `result_file_urls`: Array of Strings (Danh sách đường dẫn tải tệp kết quả)
* **Main Flow:**
  1. Mở Ticket `Resolved`.
  2. Hệ thống hiển thị phần thông tin Kết quả xử lý từ Nhân viên.
  3. Bấm tải tệp kết quả trả lời (nếu có).
* **Acceptance Criteria (AC):**
  * **AC-01:** Hiển thị đầy đủ văn bản kết quả và hỗ trợ tải file kết quả an toàn.

---

## [FR-M10-02] Đánh giá mức độ hài lòng 1–5 sao
* **Mô tả:** Sinh viên chấm điểm đánh giá chất lượng phục vụ từ 1 đến 5 sao cho đơn đã xử lý.
* **Actor:** Sinh viên
* **Preconditions:** Ticket ở trạng thái `Resolved`.
* **Trường dữ liệu (Data Fields):**
  * `ticket_id`: Integer (Bắt buộc)
  * `rating_score`: Integer (Bắt buộc, Enum: `1`, `2`, `3`, `4`, `5`)
* **Main Flow:**
  1. Tại màn hình xem kết quả, chọn mục “Đánh giá chất lượng”.
  2. Chọn số sao từ 1 đến 5 sao.
  3. Hệ thống ghi nhận điểm sao.
* **Business Rules (BR):**
  * **BR-01:** Chọn số sao (1-5) là thao tác bắt buộc khi gửi đánh giá.
* **Acceptance Criteria (AC):**
  * **AC-01:** Chọn sao và bấm gửi $\rightarrow$ Lưu điểm CSAT vào CSDL thành công.

---

## [FR-M10-03] Viết nhận xét và đóng Ticket vĩnh viễn
* **Mô tả:** Sinh viên nhập góp ý tùy chọn và xác nhận đóng đơn vĩnh viễn (`Closed`).
* **Actor:** Sinh viên
* **Preconditions:** Hoàn tất chọn sao ở FR-M10-02.
* **Trường dữ liệu (Data Fields):**
  * `ticket_id`: Integer (Bắt buộc)
  * `rating_score`: Integer (Bắt buộc, 1-5 sao)
  * `feedback_comment`: Text (Tùy chọn, Ý kiến đóng góp thêm của Sinh viên)
  * `new_status`: Enum (`CLOSED`)
  * `closed_at`: DateTime (Mốc thời gian đóng đơn)
  * `is_auto_closed`: Boolean (Mặc định `false`, bằng `true` nếu do tự động đóng 72h)
* **Main Flow:**
  1. Nhập ý kiến nhận xét (tùy chọn).
  2. Bấm “Gửi đánh giá & Đóng đơn”.
  3. Hệ thống lưu nhận xét và chuyển trạng thái Ticket thành `Closed` (Đóng vĩnh viễn).
* **Business Rules (BR):**
  * **BR-01:** Ticket ở trạng thái `Closed` bị khóa cứng mọi tương tác, tuyệt đối không cho phép mở lại (No Reopen).
  * **BR-02 (Auto-Close):** Sau 72 giờ ở trạng thái `Resolved` mà Sinh viên không đánh giá, hệ thống tự động gỡ bộ đếm và chuyển thành `Closed`.
* **Acceptance Criteria (AC):**
  * **AC-01:** Đánh giá xong $\rightarrow$ Chuyển `Closed`, khóa vĩnh viễn mọi thao tác chỉnh sửa/bình luận.
  * **AC-02 (Kiểm thử BR-02):** Quá 72h không đánh giá $\rightarrow$ Tự động đóng đơn sang `Closed`.
