# PHÂN HỆ: M09 — THEO DÕI & BỔ SUNG THÔNG TIN (TICKET TRACKING & SUPPLEMENT)

> **Giai đoạn:** GIAI ĐOẠN 2 — PHÂN HỆ SINH VIÊN  
> **Actor chính:** Sinh viên  

---

## [FR-M09-01] Xem danh sách, chi tiết và trạng thái Ticket theo thời gian thực
* **Mô tả:** Sinh viên xem danh sách các đơn đã gửi và xem màn hình chi tiết tiến độ giải quyết thời gian thực.
* **Actor:** Sinh viên
* **Preconditions:** Đã đăng nhập tài khoản Sinh viên.
* **Trường dữ liệu (Data Fields):**
  * `student_id`: Integer (Bắt buộc, ID Sinh viên hiện tại)
  * `ticket_id`: Integer (Khóa chính Ticket khi xem chi tiết)
  * `current_status`: Enum (`NEW`, `IN_PROGRESS`, `PENDING`, `RESOLVED`, `CLOSED`)
* **Main Flow:**
  1. Mở menu “Yêu cầu của tôi”.
  2. Danh sách tải toàn bộ các Ticket do chính Sinh viên khởi tạo.
  3. Chọn một Ticket để xem chi tiết: Mã đơn, Ngày tạo, Phòng ban, Trạng thái hiện tại, Lịch sử xử lý.
* **Business Rules (BR):**
  * **BR-01:** Sinh viên chỉ có quyền xem các Ticket do chính mình gửi (Data Isolation).
* **Acceptance Criteria (AC):**
  * **AC-01:** Màn hình chi tiết hiển thị đúng dữ liệu và trạng thái thời gian thực của đơn.

---

## [FR-M09-02] Tìm kiếm, lọc và theo dõi lịch sử Ticket
* **Mô tả:** Sinh viên tìm kiếm đơn theo Mã Ticket/Tiêu đề và lọc danh sách theo từng trạng thái xử lý.
* **Actor:** Sinh viên
* **Trường dữ liệu (Data Fields):**
  * `search_keyword`: String (Tùy chọn, Mã Ticket hoặc Tiêu đề)
  * `status_filter`: Enum (`ALL`, `NEW`, `IN_PROGRESS`, `PENDING`, `RESOLVED`, `CLOSED`)
* **Main Flow:**
  1. Nhập từ khóa tìm kiếm tại ô Tìm kiếm.
  2. Chọn bộ lọc Trạng thái (`Chưa tiếp nhận`, `Đang xử lý`, `Chờ bổ sung`, `Hoàn thành`).
  3. Hệ thống trả về kết quả lọc tương ứng.
* **Acceptance Criteria (AC):**
  * **AC-01:** Lọc trạng thái trả về đúng danh sách các Ticket thuộc trạng thái đó.

---

## [FR-M09-03] Bổ sung thông tin và tài liệu theo yêu cầu
* **Mô tả:** Sinh viên phản hồi nhập nội dung và tải tệp đính kèm bổ sung khi Ticket ở trạng thái `Pending`.
* **Actor:** Sinh viên
* **Preconditions:** Ticket đang ở trạng thái `Pending` (Chờ bổ sung).
* **Trường dữ liệu (Data Fields):**
  * `ticket_id`: Integer (Bắt buộc)
  * `supplement_message`: Text (Bắt buộc, Văn bản giải trình/bổ sung của Sinh viên)
  * `supplement_files`: Array of Files (Tùy chọn, Tệp minh chứng bổ sung, Max 5MB/file)
  * `new_status`: Enum (`IN_PROGRESS`)
  * `assignee_id`: Integer (Giữ nguyên ID Nhân viên phụ trách cũ)
* **Main Flow:**
  1. Mở Ticket `Pending` từ thông báo hoặc danh sách.
  2. Đọc yêu cầu bổ sung của Nhân viên.
  3. Nhập thông tin bổ sung và tải file minh chứng (nếu có).
  4. Bấm “Xác nhận bổ sung”.
  5. Hệ thống lưu thông tin vào lịch sử đơn, dừng bộ đếm 72h.
  6. Tự động chuyển trạng thái đơn về lại `In Progress`.
  7. Bắn thông báo cho Nhân viên phụ trách cũ vào tiếp tục xử lý.
* **Business Rules (BR):**
  * **BR-01:** Giữ nguyên Nhân viên phụ trách cũ, tuyệt đối không tạo đơn mới.
* **Acceptance Criteria (AC):**
  * **AC-01:** Bổ sung thành công $\rightarrow$ Chuyển lại `In Progress`, hủy bộ đếm 72h và báo cho Nhân viên phụ trách.

---

## [FR-M09-04] Tiếp nhận thông báo trạng thái và yêu cầu bổ sung
* **Mô tả:** Sinh viên nhận thông báo In-app (chấm đỏ biểu tượng quả chuông) khi có thay đổi trạng thái đơn.
* **Actor:** Sinh viên
* **Trường dữ liệu (Data Fields):**
  * `notification_id`: Integer (Khóa chính thông báo)
  * `recipient_id`: Integer (Bắt buộc, ID Sinh viên nhận)
  * `title`: String (Max 100 ký tự)
  * `message`: String (Max 255 ký tự)
  * `target_ticket_id`: Integer (Bắt buộc, ID Ticket để chuyển hướng khi nhấp chuột)
  * `is_read`: Boolean (Mặc định: `false`)
* **Main Flow:**
  1. Hệ thống phát thông báo In-app khi đơn đổi trạng thái hoặc có yêu cầu bổ sung.
  2. Sinh viên bấm vào thông báo.
  3. Hệ thống chuyển hướng tới đúng màn hình chi tiết Ticket đó.
* **Acceptance Criteria (AC):**
  * **AC-01:** Bấm thông báo $\rightarrow$ Mở trực tiếp màn hình chi tiết Ticket tương ứng.
