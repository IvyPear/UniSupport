# PHÂN HỆ: NHÂN VIÊN HỖ TRỢ (STAFF)

## [FR-STF-01] Nhân viên xem danh sách Ticket theo phòng ban
* **Mô tả:** Nhân viên xem danh sách các Ticket được phân bổ về phòng ban của mình để theo dõi và tiếp nhận xử lý.
* **Actor:** Nhân viên hỗ trợ.
* **Preconditions:** Nhân viên đã đăng nhập vào hệ thống và được phân quyền thuộc một phòng ban cụ thể.
* **Main Flow:**
  1. Nhân viên truy cập vào mục "Danh sách Ticket phòng ban".
  2. Hệ thống tìm và lọc ra đúng các ticket được phân bổ về phòng ban của nhân viên đó.
  3. Hệ thống hiển thị danh sách dưới dạng bảng. Các cột bắt buộc phải có: Mã đơn, Tiêu đề, Ngày tạo, Trạng thái, và Người xử lý (Assignee).
  4. Nhân viên có thể dùng bộ lọc để tìm nhanh (Ví dụ: Lọc những đơn có trạng thái `New` và Người xử lý đang để trống để bắt đầu nhận việc).
* **Business Rules:**
  * **BR-01:** Nhân viên chỉ được xem các Ticket thuộc phòng ban mình phụ trách và tuyệt đối không được xem Ticket của phòng ban khác.
  * **BR-02:** Danh sách Ticket được sắp xếp theo thời gian tạo, Ticket mới nhất luôn nằm ở đầu danh sách.
* **Acceptance Criteria (AC):**
  * **AC-01:** Khi Nhân viên truy cập danh sách Ticket của phòng ban $\rightarrow$ Hệ thống hiển thị chính xác các Ticket được phân bổ về phòng ban đó.
  * **AC-02 (Kiểm tra BR-01):** Khi sử dụng tài khoản Nhân viên Phòng Đào Tạo $\rightarrow$ Nhân viên không thể xem hoặc tìm thấy các Ticket được phân bổ cho Phòng IT hoặc Phòng Tài chính.
  * **AC-03 (Kiểm tra BR-02):** Trong danh sách Ticket của phòng ban, các Ticket có thời gian tạo gần nhất luôn được hiển thị ở đầu danh sách.
  * **AC-04 (Kiểm tra hiển thị):** Trong bảng danh sách, cột “Người xử lý” hiển thị tên Nhân viên đang xử lý Ticket hoặc để trống nếu Ticket chưa có người tiếp nhận.

---

## [FR-STF-02] Nhân viên tiếp nhận Ticket
* **Mô tả:** Nhân viên tiếp nhận Ticket để xử lý. Hệ thống gán tên Nhân viên vào Ticket và chuyển trạng thái sang `In Progress`.
* **Actor:** Nhân viên hỗ trợ.
* **Preconditions:** Ticket đang thuộc danh sách chờ của phòng ban và chưa có nhân viên nhận xử lý.
* **Main Flow:**
  1. Nhân viên chọn một Ticket trong danh sách để xem chi tiết.
  2. Nhân viên nhấn nút “Tiếp nhận” (Claim / Assign cho tôi).
  3. Hệ thống cập nhật tên Nhân viên vào trường Assignee của Ticket.
  4. Hệ thống chuyển trạng thái Ticket từ `New` sang `In Progress`.
* **Business Rules:**
  * **BR-01:** Khi Ticket đã có người tiếp nhận, các Nhân viên khác trong cùng phòng ban không thể tiếp nhận Ticket đó, trừ khi có sự điều phối lại từ Quản lý phòng ban.
  * **BR-02:** Nút “Tiếp nhận” chỉ hiển thị khi Ticket đang ở trạng thái `New` và trường Người xử lý đang để trống. Khi Ticket đã có người tiếp nhận, nút này sẽ bị ẩn.
* **Alternative / Error Flows:**
  * Nếu Ticket đã được Nhân viên khác tiếp nhận trước đó $\rightarrow$ Hệ thống từ chối thao tác và hiển thị thông báo lỗi. Thông tin Ticket được cập nhật lại để Nhân viên biết ai đang xử lý.
* **Acceptance Criteria (AC):**
  * **AC-01:** Khi Nhân viên tiếp nhận một Ticket chưa có người xử lý $\rightarrow$ Hệ thống gán tên Nhân viên vào Ticket và chuyển trạng thái sang `In Progress`.
  * **AC-02 (Kiểm tra BR-02):** Khi Nhân viên mở một Ticket đã có người xử lý và đang ở trạng thái `In Progress` $\rightarrow$ Hệ thống không hiển thị nút “Tiếp nhận”.
  * **AC-03 (Kiểm tra BR-01 và Alternative):** Khi hai Nhân viên cùng mở một Ticket ở trạng thái `New`, Nhân viên A tiếp nhận trước thành công. Khi Nhân viên B tiếp nhận sau $\rightarrow$ Hệ thống từ chối thao tác và cập nhật thông tin hiển thị Nhân viên A là người xử lý.

---

## [FR-STF-03] Nhân viên cập nhật trạng thái Ticket
* **Mô tả:** Nhân viên cập nhật trạng thái đơn yêu cầu thành `Resolved` sau khi xử lý xong, bao gồm cả trường hợp xử lý thành công hoặc từ chối đơn không hợp lệ/Spam. Nhân viên bắt buộc phải để lại lời nhắn giải thích cho Sinh viên.
* **Actor:** Nhân viên hỗ trợ.
* **Preconditions:** Ticket đang ở trạng thái `In Progress` và do chính nhân viên đó đang phụ trách xử lý.
* **Main Flow:**
  1. Nhân viên bấm chọn "Cập nhật trạng thái Ticket".
  2. Hệ thống hiển thị biểu mẫu gồm 2 thông tin chính:
     * *Trạng thái:* Tùy chọn `Pending` (Chờ bổ sung) hoặc `Resolved` (Hoàn thành).
     * *Ghi chú (`Resolution Notes`):* Ô nhập văn bản phản hồi.
  3. Nhân viên chọn trạng thái, gõ nội dung và bấm "Xác nhận".
  4. Hệ thống kiểm tra dữ liệu và cập nhật trạng thái mới cho Ticket.
* **Business Rules:**
  * **BR-01:** Trường `Resolution Notes` là bắt buộc; nếu để trống, hệ thống tuyệt đối không cho phép chuyển trạng thái sang `Resolved`.
* **Alternative / Error Flows:**
  * Nếu Nhân viên bỏ trống trường `Resolution Notes` và nhấn “Xác nhận” $\rightarrow$ Hệ thống chặn thay đổi trạng thái và hiển thị thông báo yêu cầu nhập nội dung ghi chú.
* **Acceptance Criteria (AC):**
  * **AC-01:** Nhân viên nhập đầy đủ `Resolution Notes` và cập nhật trạng thái $\rightarrow$ Hệ thống cập nhật thành công trạng thái Ticket thành `Resolved`.
  * **AC-02:** Nhân viên để trống `Resolution Notes` khi cập nhật trạng thái $\rightarrow$ Hệ thống chặn thao tác và hiển thị thông báo lỗi yêu cầu nhập nội dung.
