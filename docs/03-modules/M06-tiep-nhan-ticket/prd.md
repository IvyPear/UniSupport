# PHÂN HỆ: M06 — TIẾP NHẬN TICKET (RECEIVE TICKET)

## [FR-M06-01] Nhân viên xem danh sách đơn mới của phòng ban

**Mô tả:** Nhân viên mở hộp thư tiếp nhận để xem danh sách các Ticket mới gửi ở trạng thái Chưa tiếp nhận thuộc phạm vi chuyên môn của phòng ban mình.

**Priority:** High (Hộp thư tiếp nhận công việc hàng ngày của nhân viên hỗ trợ).

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Nhân viên đã đăng nhập và được gắn vào một Phòng ban cụ thể.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban:** ID phòng ban của Nhân viên hiện tại.
- **Trạng thái:** `Chưa tiếp nhận` (`New`).
- **Thông tin hiển thị:** Mã Ticket, Tiêu đề, Ngày tạo, Tên sinh viên, Thời hạn SLA.
- **Bộ lọc:** Lọc theo ngày tạo, danh mục dịch vụ và thời hạn xử lý (SLA); không sử dụng mức độ ưu tiên Ticket.

**Luồng chính (Main Flow):**

1. Nhân viên truy cập mục “Hộp thư phòng ban / Ticket mới”.
2. Hệ thống tải danh sách các Ticket ở trạng thái `Chưa tiếp nhận` thuộc phòng ban của nhân viên.
3. Nhân viên tìm kiếm hoặc sử dụng bộ lọc để xem danh sách.
4. Nhân viên có thể nhấp vào một đơn để xem trước nội dung chi tiết.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Phân tách dữ liệu):** Nhân viên chỉ xem được các Ticket thuộc phòng ban của mình, không được xem đơn của phòng ban khác.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Truy cập Ticket của phòng ban khác):** Nhân viên gọi trực tiếp URL hoặc API xem đơn thuộc phòng ban khác $\rightarrow$ Backend từ chối với mã `403 Forbidden` (`BR-01`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Danh sách hiển thị đúng các đơn Chưa tiếp nhận (`New`) thuộc đúng phòng ban của nhân viên; chặn truy cập (`403 Forbidden`) đối với đơn của phòng ban khác (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Phòng ban hiện không có đơn mới nào ở trạng thái `New` $\rightarrow$ Giao diện hiển thị trạng thái rỗng (*"Hiện không có yêu cầu mới chờ tiếp nhận"*) mà không báo lỗi.

---

## [FR-M06-02] Nhân viên nhận xử lý đơn và hệ thống chặn lỗi hai người nhận cùng một đơn

**Mô tả:** Nhân viên bấm nút Tiếp nhận (Claim) để chịu trách nhiệm giải quyết đơn; hệ thống xử lý kiểm soát tương tranh (Concurrency Control) để chặn trường hợp hai nhân viên cùng bấm nhận một đơn tại một thời điểm.

**Priority:** High (Chức năng cốt lõi đảm bảo quy trình phân công và kiểm soát tương tranh không trùng lặp người xử lý).

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

**Alternative / Error Flows:**

* **E-01 (Xung đột tương tranh khi hai nhân viên cùng nhận một đơn):**
  - *Điều kiện kích hoạt:* Hai nhân viên đồng thời bấm "Tiếp nhận" (`Claim`) cùng một Ticket ở trạng thái `New`.
  - *Xử lý của hệ thống:* Hệ thống sử dụng khóa mức bản ghi (Row locking/Atomic update). Nhân viên gửi yêu cầu đến sau sẽ bị từ chối, API trả về lỗi `409 Conflict` (hoặc thông báo lỗi tranh chấp trên giao diện: *"Đơn này đã được tiếp nhận bởi nhân viên khác!"*). Trạng thái đơn được giữ nguyên là `In Progress` với Assignee là nhân viên bấm trước.
* **E-02 (Tiếp nhận đơn không thuộc phòng ban của mình):**
  - *Điều kiện kích hoạt:* Nhân viên can thiệp API cố gắng claim đơn thuộc phòng ban khác.
  - *Xử lý của hệ thống:* Backend kiểm tra quyền dữ liệu, trả về mã lỗi `403 Forbidden` và từ chối thao tác.

**Ví dụ Edge Case:**
* *Hai nhân viên click nút Tiếp nhận cách nhau 50ms:* Nhân viên A nhận thành công đơn; nhân viên B nhận thông báo 409 Conflict, đơn biến mất khỏi danh sách chờ của nhân viên B sau khi giao diện tự động refresh.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mỗi Ticket tại một thời điểm chỉ có duy nhất 1 Nhân viên phụ trách giải quyết.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhân viên đúng phòng ban bấm nhận thành công $\rightarrow$ Gán tên người xử lý, chuyển sang trạng thái Đang xử lý (`In Progress`); nếu nhân viên khác phòng ban cố nhận đơn thì bị chặn với mã `403 Forbidden` (`BR-01`, `E-02`).
* **AC-02 (Kiểm thử Concurrency):** Hai nhân viên cùng bấm nhận 1 đơn $\rightarrow$ Người bấm trước nhận thành công, người bấm sau bị chặn (`409 Conflict`) và nhận thông báo lỗi (`BR-01`, `E-01`).

---
