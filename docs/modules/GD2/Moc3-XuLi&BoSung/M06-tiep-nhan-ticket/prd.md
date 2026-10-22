# PHÂN HỆ: M06 — TIẾP NHẬN TICKET — NHÂN VIÊN (RECEIVE TICKET)

## [FR-M06-01] Xem danh sách Ticket mới thuộc phòng ban

**Mô tả:** Nhân viên mở hộp thư tiếp nhận xem danh sách các Ticket mới gửi ở trạng thái Chưa tiếp nhận thuộc phòng ban mình phụ trách.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Nhân viên đăng nhập thành công và có phòng ban trực thuộc.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban:** Bắt buộc, ID phòng ban của Nhân viên hiện tại.
- **Trạng thái:** Theo thông tin hiển thị trong hệ thống.
- **Trang danh sách:** Mặc định: 1.
- **Số mục mỗi trang:** Mặc định: 20.

**Luồng chính (Main Flow):**

1. Truy cập mục “Ticket mới tiếp nhận”.
2. Hệ thống tải danh sách đơn ở trạng thái Chưa tiếp nhận của phòng ban.
3. Tìm kiếm, lọc theo ngày tạo, tiêu đề, độ ưu tiên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nhân viên chỉ xem được các Ticket thuộc phòng ban chuyên trách của mình (Data Isolation).

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Danh sách chỉ hiển thị đúng các đơn trạng thái Chưa tiếp nhận thuộc đúng phòng ban của nhân viên.

## [FR-M06-02] Tìm kiếm, lọc và Tiếp nhận Ticket (Claim)

**Mô tả:** Nhân viên chọn một Ticket mới và bấm nút Tiếp nhận (Claim) để chịu trách nhiệm giải quyết.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Ticket ở trạng thái Chưa tiếp nhận.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Khóa chính của Ticket.
- **Nhân viên tiếp nhận:** ID Nhân viên bấm nhận việc.
- **Thời điểm tiếp nhận:** Mốc thời gian tiếp nhận.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Mở xem chi tiết Ticket.
2. Nhấn nút “Tiếp nhận” (Claim).
3. Hệ thống kiểm tra điều kiện truy cập đồng thời (Concurrency check): Đảm bảo Ticket chưa có ai nhận trước.
4. Hệ thống gán Nhân viên làm nhân viên phụ trách, chuyển trạng thái đơn sang Đang xử lý.
5. Đưa Ticket vào danh sách công việc cá nhân của Nhân viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mỗi Ticket tại một thời điểm chỉ có duy nhất 1 Nhân viên phụ trách.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Nếu hai Nhân viên bấm tiếp nhận cùng lúc, hệ thống chỉ chấp nhận người bấm trước, người bấm sau nhận thông báo *“Ticket đã được tiếp nhận bởi nhân viên khác”*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Tiếp nhận thành công → Gán tên nhân viên phụ trách, chuyển trạng thái Đang xử lý, cập nhật hệ thống.
* **AC-02 (Kiểm thử BR-01):** Thao tác trùng → Chặn người bấm sau và tải lại dữ liệu.

## [FR-M06-03] Tiếp nhận thông báo In-app cho Nhân viên

**Mô tả:** Nhân viên nhận thông báo trong ứng dụng (chấm đỏ quả chuông trên thanh điều hướng) khi Sinh viên bổ sung thông tin/tài liệu cho Ticket (Sự kiện #2 trong Ma trận thông báo) hoặc khi được Quản lý phân công đơn mới.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Nhân viên.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã thông báo:** Khóa chính thông báo.
- **Người nhận thông báo:** Bắt buộc, ID Nhân viên (Assignee).
- **Tiêu đề:** Max 100 ký tự (Ví dụ: "Sinh viên đã bổ sung thông tin cho Ticket #TK-1234").
- **Nội dung thông báo:** Max 255 ký tự.
- **Ticket liên quan:** Bắt buộc, ID Ticket để chuyển hướng khi nhấp chuột.
- **Trạng thái đã đọc:** Mặc định: false.

**Luồng chính (Main Flow):**

1. Khi Sinh viên gửi bổ sung thông tin (`SV-03`) hoặc Quản lý phân công đơn (`QL-02`), hệ thống tự động sinh thông báo In-app cho đúng Nhân viên phụ trách.
2. Nhân viên thấy chấm đỏ thông báo trên thanh tiêu đề và nhấp xem danh sách thông báo.
3. Nhân viên nhấp vào một thông báo cụ thể.
4. Hệ thống tự động đánh dấu thông báo đã đọc (`is_read = true`) và chuyển hướng trực tiếp đến màn hình Chi tiết Ticket tương ứng.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Giữ nguyên Assignee cũ khi Sinh viên bổ sung thông tin, thông báo gửi chính xác cho Assignee đó.
* **BR-02:** Không gửi thông báo dư thừa cho các nhân viên khác trong cùng phòng ban.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhấp vào thông báo → Chuyển hướng trực tiếp mở đúng màn hình Chi tiết Ticket tương ứng và đánh dấu đã đọc.

---

