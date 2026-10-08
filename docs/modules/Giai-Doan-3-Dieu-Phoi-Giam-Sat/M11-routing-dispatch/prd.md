# PHÂN HỆ: M11 — QUẢN LÝ & ĐIỀU PHỐI TICKET (ROUTING & DISPATCH)

> **Giai đoạn:** GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT  
> **Actor chính:** Quản lý phòng ban, Admin  

---

## [FR-M11-01] Quản lý phân công và phân công lại Ticket trong phòng ban
* **Mô tả:** Trưởng phòng (Quản lý) chủ động gán đơn hoặc phân công lại (Re-assign) Ticket cho Nhân viên trong phòng ban.
* **Actor:** Quản lý phòng ban
* **Preconditions:** Tài khoản Role Quản lý.
* **Trường dữ liệu (Data Fields):**
  * `ticket_id`: Integer (Bắt buộc)
  * `target_staff_id`: Integer (Bắt buộc, ID Nhân viên thuộc nội bộ phòng ban)
  * `manager_id`: Integer (ID Quản lý thao tác)
  * `new_status`: Enum (`IN_PROGRESS`)
* **Main Flow:**
  1. Quản lý xem danh sách Ticket phòng ban.
  2. Chọn đơn cần điều phối $\rightarrow$ Bấm “Phân công”.
  3. Chọn Nhân viên phụ trách từ danh sách nhân sự nội bộ phòng.
  4. Bấm Xác nhận.
  5. Hệ thống gán Assignee mới, chuyển trạng thái `In Progress` (nếu đơn mới), phát thông báo In-app cho Nhân viên được gán.
* **Business Rules (BR):**
  * **BR-01:** Chỉ được phân công cho Nhân viên thuộc nội bộ phòng ban quản lý.
* **Acceptance Criteria (AC):**
  * **AC-01:** Phân công thành công $\rightarrow$ Gán Assignee mới và bắn thông báo cho Nhân viên đó.

---

## [FR-M11-02] Admin phân loại Ticket thuộc danh mục “Khác”
* **Mô tả:** Admin xem và định tuyến các Ticket thuộc danh mục "Khác" về đúng phòng ban chuyên trách.
* **Actor:** Admin
* **Preconditions:** Đơn thuộc danh mục "Khác".
* **Trường dữ liệu (Data Fields):**
  * `ticket_id`: Integer (Bắt buộc)
  * `target_department_id`: Integer (Bắt buộc, ID Phòng ban tiếp nhận mới)
  * `target_category_id`: Integer (Bắt buộc, ID Danh mục dịch vụ chuẩn)
  * `new_status`: Enum (`NEW`)
* **Main Flow:**
  1. Admin mở Hàng chờ đơn "Khác".
  2. Đọc chi tiết nội dung đơn yêu cầu của Sinh viên.
  3. Chọn Phòng ban đích phù hợp.
  4. Nhấn “Phân loại”.
  5. Hệ thống cập nhật phòng ban, đưa đơn về Hàng chờ của phòng ban đó ở trạng thái `New`.
* **Acceptance Criteria (AC):**
  * **AC-01:** Admin phân loại $\rightarrow$ Đơn chuyển sang Hàng chờ phòng ban mới chính xác.

---

## [FR-M11-03] Admin tiếp nhận và điều chuyển Ticket sai phòng ban
* **Mô tả:** Admin xử lý điều chuyển các Ticket do Nhân viên báo sai phòng ban chuyển về.
* **Actor:** Admin
* **Preconditions:** Ticket được Nhân viên báo sai phòng ban từ FR-M07-03.
* **Trường dữ liệu (Data Fields):**
  * `ticket_id`: Integer (Bắt buộc)
  * `old_department_id`: Integer (Chỉ đọc)
  * `new_department_id`: Integer (Bắt buộc)
  * `new_category_id`: Integer (Bắt buộc)
  * `new_status`: Enum (`NEW`)
  * `assignee_id`: Null (Xóa Assignee cũ)
* **Main Flow:**
  1. Admin mở danh sách Đơn sai phòng ban chờ điều chuyển.
  2. Xem lý do chuyển trả từ Nhân viên cũ và xem nội dung đơn.
  3. Chọn Phòng ban mới phù hợp.
  4. Bấm “Điều chuyển”.
  5. Hệ thống xóa Assignee cũ, cập nhật Phòng ban mới, lưu log lịch sử luân chuyển.
* **Acceptance Criteria (AC):**
  * **AC-01:** Điều chuyển thành công $\rightarrow$ Chuyển về hàng chờ phòng ban mới và lưu toàn bộ log luân chuyển.
