# PHÂN HỆ: YÊU CẦU SINH VIÊN (REQ)

## [FR-REQ-01] Sinh viên tạo mới Ticket
* **Mô tả:** Sinh viên tạo yêu cầu hỗ trợ mới bằng cách chọn danh mục, nhập tiêu đề và nội dung.
* **Actor:** Sinh viên.
* **Preconditions:** Sinh viên đã đăng nhập vào hệ thống.
* **Main Flow:**
  1. Sinh viên chọn “Tạo Ticket mới”.
  2. Hệ thống hiển thị form tạo yêu cầu.
  3. Sinh viên chọn Danh mục, nhập Tiêu đề và Nội dung.
  4. Sinh viên nhấn “Gửi yêu cầu”.
  5. Hệ thống kiểm tra thông tin, tạo Ticket và hiển thị mã Ticket.
* **Business Rules:**
  * **BR-01:** Danh mục, Tiêu đề và Nội dung là các trường bắt buộc.
  * **BR-02:** File đính kèm là tùy chọn, dung lượng tối đa 5MB/file.
  * **BR-03:** Ticket mới tạo có trạng thái mặc định là `New`.
* **Alternative / Error Flows:**
  * Bỏ trống trường bắt buộc $\rightarrow$ Chặn gửi và bôi đỏ các trường bị thiếu.
  * File đính kèm vượt quá 5MB $\rightarrow$ Chặn tải lên và hiển thị thông báo lỗi giới hạn dung lượng.
* **Acceptance Criteria (AC):**
  * **AC-01:** Sinh viên điền đầy đủ thông tin hợp lệ và bấm gửi $\rightarrow$ Ticket được khởi tạo thành công trên hệ thống.
  * **AC-02:** Sinh viên bỏ trống trường tiêu đề $\rightarrow$ Hệ thống chặn lại và báo lỗi.
  * **AC-03 (Kiểm thử BR-02):** Sinh viên tải lên một file đính kèm nặng 6MB $\rightarrow$ Hệ thống chặn lại và hiển thị thông báo lỗi vượt quá giới hạn 5MB.

---

## [FR-REQ-02] Sinh viên xem danh sách Ticket cá nhân
* **Mô tả:** Sinh viên xem danh sách các Ticket do chính mình tạo để theo dõi tiến độ và tình trạng xử lý.
* **Actor:** Sinh viên.
* **Preconditions:** Sinh viên đã đăng nhập vào hệ thống và đã tạo ít nhất một Ticket.
* **Main Flow:**
  1. Sinh viên chọn menu “Danh sách Ticket của tôi”.
  2. Hệ thống tìm kiếm và hiển thị tất cả các Ticket do chính sinh viên đó tạo.
  3. Hiển thị danh sách kèm các thông tin: Mã Ticket, Tiêu đề, Danh mục, Ngày tạo và Trạng thái hiện tại.
  4. Sinh viên có thể sử dụng bộ lọc để tìm kiếm Ticket theo trạng thái (ví dụ: chỉ xem các Ticket đang ở trạng thái `Pending`).
* **Business Rules:**
  * **BR-01 (Bảo mật thông tin):** Sinh viên chỉ được phép xem các Ticket do chính mình tạo, tuyệt đối không được xem Ticket của sinh viên khác.
  * **BR-02 (Sắp xếp hiển thị):** Ticket mới tạo gần đây nhất hiển thị ở trên cùng, các Ticket cũ hơn hiển thị bên dưới.
  * **BR-03 (Chưa có Ticket):** Nếu sinh viên chưa từng tạo Ticket, hệ thống không hiển thị trang trống hoặc báo lỗi, thay vào đó hiển thị thông báo *“Bạn chưa có yêu cầu hỗ trợ nào”* kèm nút *“Tạo yêu cầu mới”*.
* **Acceptance Criteria (AC):**
  * **AC-01:** Sinh viên truy cập trang danh sách Ticket $\rightarrow$ Hiển thị đúng các Ticket do chính sinh viên đó tạo.
  * **AC-02 (Kiểm tra BR-01):** Đăng nhập bằng tài khoản Sinh viên A $\rightarrow$ Không thể xem hoặc tìm thấy Ticket của Sinh viên B.
  * **AC-03 (Kiểm tra BR-02):** Sinh viên đã tạo nhiều Ticket $\rightarrow$ Ticket mới nhất nằm ở dòng đầu tiên.
  * **AC-04 (Kiểm tra trường hợp chưa có Ticket):** Đăng nhập bằng tài khoản mới $\rightarrow$ Hệ thống hiển thị thông báo *“Bạn chưa có yêu cầu hỗ trợ nào”*.

---

## [FR-REQ-03] Sinh viên chỉnh sửa Ticket
* **Mô tả:** Sinh viên được phép chỉnh sửa nội dung Ticket trong điều kiện Ticket chưa có nhân viên tiếp nhận.
* **Actor:** Sinh viên.
* **Preconditions:** Sinh viên là người tạo Ticket. Ticket đang ở trạng thái `New` và chưa có nhân viên tiếp nhận (Assignee).
* **Main Flow:**
  1. Sinh viên chọn một Ticket của mình để xem chi tiết.
  2. Hệ thống kiểm tra trạng thái và lịch sử tiếp nhận của Ticket.
  3. Nếu Ticket đang ở trạng thái `New` và chưa có nhân viên tiếp nhận, hệ thống hiển thị nút “Chỉnh sửa”.
  4. Sinh viên tiến hành chỉnh sửa nội dung và chọn “Lưu thay đổi”.
  5. Hệ thống cập nhật nội dung mới cho Ticket.
* **Business Rules:**
  * **BR-01:** Nếu Ticket đã chuyển sang trạng thái `In Progress` hoặc đã có nhân viên tiếp nhận, nút “Chỉnh sửa” sẽ tự động bị ẩn.
* **Alternative / Error Flows:**
  * Nếu sinh viên cố gắng chỉnh sửa Ticket khi Ticket không còn ở trạng thái `New` (ví dụ thông qua thao tác ép luồng/API), hệ thống từ chối thao tác và hiển thị thông báo lỗi.
* **Acceptance Criteria (AC):**
  * **AC-01:** Ticket ở trạng thái `New` và chưa có nhân viên tiếp nhận $\rightarrow$ Sinh viên có thể chỉnh sửa và lưu thành công.
  * **AC-02:** Ticket đã chuyển sang `In Progress` $\rightarrow$ Sinh viên không thể chỉnh sửa nội dung.
  * **AC-03 (Kiểm tra BR-01):** Sinh viên mở Ticket đã có nhân viên tiếp nhận $\rightarrow$ Giao diện tuyệt đối không hiển thị nút “Chỉnh sửa”.
