# PHÂN HỆ: M07 — XỬ LÝ & TRAO ĐỔI — NHÂN VIÊN (PROCESS & EXCHANGE)

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Actor chính:** Nhân viên, Sinh viên  

---

## [FR-M07-01] Cập nhật trạng thái và tiến độ Ticket
* **Mô tả:** Nhân viên cập nhật tiến độ công việc, ghi chú nội bộ và theo dõi lịch sử xử lý.
* **Actor:** Nhân viên
* **Preconditions:** Đã tiếp nhận Ticket ở FR-M06-02.
* **Main Flow:**
  1. Mở Ticket đang phụ trách.
  2. Nhập ghi chú xử lý nội bộ.
  3. Cập nhật tiến độ.
  4. Bấm Lưu. Hệ thống ghi nhận lịch sử Audit Trail.
* **Acceptance Criteria (AC):**
  * **AC-01:** Ghi chú nội bộ được lưu trữ chính xác và hiển thị trong timeline lịch sử xử lý.

---

## [FR-M07-02] Yêu cầu bổ sung và trao đổi với Sinh viên
* **Mô tả:** Nhân viên gửi yêu cầu Sinh viên bổ sung thêm thông tin/hồ sơ còn thiếu, chuyển trạng thái đơn sang `Pending` kèm bộ đếm 72h.
* **Actor:** Nhân viên, Sinh viên
* **Preconditions:** Ticket đang ở trạng thái `In Progress`.
* **Main Flow:**
  1. Nhân viên chọn “Yêu cầu bổ sung thông tin”.
  2. Bắt buộc nhập chi tiết nội dung thông tin/hồ sơ cần bổ sung.
  3. Nhấn “Gửi yêu cầu”.
  4. Hệ thống chuyển trạng thái Ticket sang `Pending` (Chờ bổ sung), kích hoạt đồng hồ đếm ngược 72 giờ.
  5. Hệ thống gửi thông báo In-app cho Sinh viên.
* **Business Rules (BR):**
  * **BR-01:** Nội dung yêu cầu bổ sung không được để trống.
  * **BR-02:** Đồng hồ 72h kích hoạt đếm ngược ngầm để tránh đồn đọng đơn treo.
* **Acceptance Criteria (AC):**
  * **AC-01:** Gửi yêu cầu bổ sung $\rightarrow$ Chuyển trạng thái `Pending`, kích hoạt bộ đếm 72h và phát thông báo tới Sinh viên.

---

## [FR-M07-03] Báo cáo và chuyển Ticket sai phòng ban về Admin
* **Mô tả:** Nhân viên phát hiện Ticket bị gửi nhầm phòng ban chuyên trách, thực hiện thao tác chuyển trả đơn về Admin.
* **Actor:** Nhân viên
* **Preconditions:** Ticket thuộc phòng ban hiện tại nhưng không đúng chuyên môn.
* **Main Flow:**
  1. Nhân viên chọn “Báo cáo sai phòng ban”.
  2. Bắt buộc nhập Lý do chuyển trả.
  3. Nhấn Xác nhận.
  4. Hệ thống xóa tên Assignee, đổi danh mục thành “Khác”, đưa trạng thái về `New` và đẩy đơn về Hàng chờ Admin.
  5. Bắn thông báo cho Admin.
* **Business Rules (BR):**
  * **BR-01:** Lý do chuyển trả là bắt buộc để Admin làm căn cứ định tuyến lại.
* **Acceptance Criteria (AC):**
  * **AC-01:** Bấm chuyển trả kèm lý do $\rightarrow$ Xóa Assignee, đưa về `New` mục Khác cho Admin và lưu log lý do chuyển trả.
