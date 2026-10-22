# PHÂN HỆ: M06 — TIẾP NHẬN TICKET (RECEIVE TICKET)

## [FR-M06-01] Nhân viên xem danh sách đơn mới của phòng ban

**Mô tả:** Nhân viên mở hộp thư tiếp nhận để xem danh sách các Ticket mới gửi ở trạng thái Chưa tiếp nhận thuộc phạm vi chuyên môn của phòng ban mình.

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Nhân viên đã đăng nhập và được gắn vào một Phòng ban cụ thể.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban:** ID phòng ban của Nhân viên hiện tại.
- **Trạng thái:** `Chưa tiếp nhận` (`New`).
- **Thông tin hiển thị:** Mã Ticket, Tiêu đề, Ngày tạo, Tên sinh viên, Thời hạn SLA.
- **Bộ lọc:** Lọc theo ngày tạo, mức độ ưu tiên, danh mục dịch vụ.

**Luồng chính (Main Flow):**

1. Nhân viên truy cập mục “Hộp thư phòng ban / Ticket mới”.
2. Hệ thống tải danh sách các Ticket ở trạng thái `Chưa tiếp nhận` thuộc phòng ban của nhân viên.
3. Nhân viên tìm kiếm hoặc sử dụng bộ lọc để xem danh sách.
4. Nhân viên có thể nhấp vào một đơn để xem trước nội dung chi tiết.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Phân tách dữ liệu):** Nhân viên chỉ xem được các Ticket thuộc phòng ban của mình, không được xem đơn của phòng ban khác.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Danh sách hiển thị đúng các đơn Chưa tiếp nhận thuộc đúng phòng ban của nhân viên.

---

## [FR-M06-02] Nhân viên nhận xử lý đơn và hệ thống chặn lỗi hai người nhận cùng một đơn

**Mô tả:** Nhân viên bấm nút Tiếp nhận (Claim) để chịu trách nhiệm giải quyết đơn; hệ thống xử lý kiểm soát tương tranh (Concurrency Control) để chặn trường hợp hai nhân viên cùng bấm nhận một đơn tại một thời điểm.

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái `Chưa tiếp nhận` (`New`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Khóa chính của đơn.
- **Nhân viên tiếp nhận:** ID tài khoản Nhân viên bấm nhận.
- **Trạng thái sau thao tác:** `Đang xử lý` (`In Progress`).

**Luồng chính (Main Flow):**

1. Nhân viên mở xem chi tiết đơn Chưa tiếp nhận.
2. Nhân viên bấm nút “Tiếp nhận” (`Claim`).
3. Hệ thống kiểm tra tức thời tại CSDL (Atomic update / Row locking): Kiểm tra xem đơn đã có ai nhận trước chưa.
4. **Trường hợp thành công:**
   - Gán ID Nhân viên làm người phụ trách chính (Assignee).
   - Đổi trạng thái Ticket thành `Đang xử lý` (`In Progress`).
   - Đưa Ticket vào danh sách công việc cá nhân của Nhân viên.
   - Ghi log lịch sử tiếp nhận vào Audit Trail.
5. **Trường hợp có người khác đã nhận trước:**
   - Hệ thống chặn thao tác của nhân viên bấm sau.
   - Hiển thị thông báo: *“Đơn này đã được tiếp nhận bởi nhân viên khác!”*.
   - Tự động làm mới giao diện và gỡ đơn khỏi danh sách đơn mới.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mỗi Ticket tại một thời điểm chỉ có duy nhất 1 Nhân viên phụ trách giải quyết.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bấm nhận thành công $\rightarrow$ Gán tên người xử lý, chuyển sang trạng thái Đang xử lý.
* **AC-02 (Kiểm thử Concurrency):** Hai nhân viên cùng bấm nhận 1 đơn $\rightarrow$ Người bấm trước nhận thành công, người bấm sau bị chặn và nhận thông báo lỗi.

---
