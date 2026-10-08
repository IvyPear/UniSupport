# PHÂN HỆ: M06 — TIẾP NHẬN TICKET — NHÂN VIÊN (RECEIVE TICKET)

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Actor chính:** Nhân viên phòng ban  

---

## [FR-M06-01] Xem danh sách Ticket mới thuộc phòng ban
* **Mô tả:** Nhân viên mở hộp thư tiếp nhận xem danh sách các Ticket mới gửi ở trạng thái `New` thuộc phòng ban mình phụ trách.
* **Actor:** Nhân viên
* **Preconditions:** Nhân viên đăng nhập thành công và có phòng ban trực thuộc.
* **Trường dữ liệu (Data Fields):**
  * `department_id`: Integer (Bắt buộc, ID phòng ban của Nhân viên hiện tại)
  * `status`: Enum (`NEW`)
  * `page_number`: Integer (Mặc định: 1)
  * `page_size`: Integer (Mặc định: 20)
* **Main Flow:**
  1. Truy cập mục “Ticket mới tiếp nhận”.
  2. Hệ thống tải danh sách đơn ở trạng thái `New` của phòng ban.
  3. Tìm kiếm, lọc theo ngày tạo, tiêu đề, độ ưu tiên.
* **Business Rules (BR):**
  * **BR-01:** Nhân viên chỉ xem được các Ticket thuộc phòng ban chuyên trách của mình (Data Isolation).
* **Acceptance Criteria (AC):**
  * **AC-01:** Danh sách chỉ hiển thị đúng các đơn trạng thái `New` thuộc đúng phòng ban của nhân viên.

---

## [FR-M06-02] Tìm kiếm, lọc và Tiếp nhận Ticket (Claim)
* **Mô tả:** Nhân viên chọn một Ticket mới và bấm nút Tiếp nhận (Claim) để chịu trách nhiệm giải quyết.
* **Actor:** Nhân viên
* **Preconditions:** Ticket ở trạng thái `New`.
* **Trường dữ liệu (Data Fields):**
  * `ticket_id`: Integer (Khóa chính của Ticket)
  * `staff_id`: Integer (ID Nhân viên bấm nhận việc)
  * `claimed_at`: DateTime (Mốc thời gian tiếp nhận)
  * `new_status`: Enum (`IN_PROGRESS`)
* **Main Flow:**
  1. Mở xem chi tiết Ticket.
  2. Nhấn nút “Tiếp nhận” (Claim).
  3. Backend kiểm tra điều kiện truy cập đồng thời (Concurrency check): Đảm bảo Ticket chưa có ai nhận trước.
  4. Hệ thống gán Nhân viên làm Assignee, chuyển trạng thái đơn sang `In Progress`.
  5. Đưa Ticket vào danh sách công việc cá nhân của Nhân viên.
* **Business Rules (BR):**
  * **BR-01:** Mỗi Ticket tại một thời điểm chỉ có duy nhất 1 Nhân viên phụ trách.
* **Alternative / Error Flows:**
  * Nếu hai Nhân viên bấm tiếp nhận cùng lúc, hệ thống chỉ chấp nhận người bấm trước, người bấm sau nhận thông báo *“Ticket đã được tiếp nhận bởi nhân viên khác”*.
* **Acceptance Criteria (AC):**
  * **AC-01:** Tiếp nhận thành công $\rightarrow$ Gán tên Assignee, chuyển trạng thái `In Progress`, cập nhật Database thật.
  * **AC-02 (Kiểm thử BR-01):** Thao tác trùng $\rightarrow$ Chặn người bấm sau và reload lại dữ liệu.
