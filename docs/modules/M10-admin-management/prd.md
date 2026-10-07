# PHÂN HỆ: QUẢN TRỊ HỆ THỐNG & DANH MỤC (ADM)

## [FR-ADM-01] Quản trị Danh mục hỗ trợ (Category Management)
* **Mô tả:** Cho phép Admin và Quản lý thực hiện các thao tác Thêm, Sửa, Ẩn hoặc Xóa danh mục hỗ trợ. Quyền hạn thao tác được phân cấp theo phạm vi quản lý.
* **Actor:** Admin, Quản lý (Trưởng phòng).
* **Preconditions:** Người dùng đã đăng nhập vào hệ thống với vai trò Admin hoặc Quản lý.
* **Main Flow:**
  1. Người dùng truy cập vào phân hệ *Quản lý Danh mục*.
  2. Lựa chọn thao tác:
     * *Thêm mới:* Nhập tên danh mục, mô tả ngắn gọn, chọn phòng ban tiếp nhận và bấm "Lưu".
     * *Chỉnh sửa:* Chọn danh mục cần thay đổi, cập nhật thông tin và bấm "Lưu".
     * *Ẩn / Xóa:* Chọn danh mục cần ngừng hoạt động (`Ẩn` / `Inactive`) hoặc xóa khỏi hệ thống.
  3. Hệ thống kiểm tra tính hợp lệ và cập nhật thay đổi vào cơ sở dữ liệu.
* **Business Rules:**
  * **BR-01 (Phân cấp quyền hạn):**
    * *Admin:* Có toàn quyền (`Thêm`, `Sửa`, `Ẩn`, `Xóa`) trên TẤT CẢ danh mục của mọi phòng ban trên hệ thống.
    * *Quản lý (Trưởng phòng):* Chỉ có quyền (`Thêm`, `Sửa`, `Ẩn`, `Xóa`) đối với các danh mục thuộc phòng ban của mình. Tuyệt đối không nhìn thấy hoặc không thể can thiệp vào danh mục của phòng ban khác.
  * **BR-02 (Ràng buộc dữ liệu):** Tên danh mục là trường bắt buộc và không được trùng lặp với bất kỳ danh mục nào đang hiển thị (`Active`) trên toàn hệ thống.
  * **BR-03 (Toàn vẹn dữ liệu):** Nếu một danh mục đã từng có ticket phát sinh giao dịch (ở bất kỳ trạng thái nào, kể cả `Closed`), hệ thống tuyệt đối không cho phép Xóa vĩnh viễn (`Delete`) mà chỉ cho phép `Ẩn` (`Inactive`).
* **Alternative / Error Flows:**
  * Nếu để trống trường tên danh mục khi thêm/sửa $\rightarrow$ Hệ thống báo lỗi và từ chối lưu.
* **Acceptance Criteria (AC):**
  * **AC-01 (Kiểm tra BR-01 - Quyền Quản lý):** Đăng nhập bằng tài khoản Trưởng phòng IT $\rightarrow$ Chỉ có thể thêm mới danh mục cho phòng IT; chỉ nhìn thấy, sửa hoặc xóa được các danh mục thuộc phòng IT quản lý.
  * **AC-02 (Kiểm tra BR-01 - Quyền Admin):** Đăng nhập bằng tài khoản Admin $\rightarrow$ Có thể thêm danh mục cho bất kỳ phòng ban nào; nhìn thấy, sửa và xóa được toàn bộ danh mục trên toàn hệ thống.
  * **AC-03 (Kiểm tra BR-03 - Lỗi Xóa):** Người dùng bấm Xóa một danh mục đã từng có sinh viên gửi đơn giao dịch $\rightarrow$ Hệ thống chặn lại và báo lỗi: *"Danh mục này đã có dữ liệu giao dịch, chỉ được phép Ẩn"*.

---

## [FR-ADM-02] Quản lý Tài khoản & Phân quyền Người dùng
* **Mô tả:** Admin thực hiện tìm kiếm tài khoản, gắn vai trò (`Role`), gán phòng ban trực thuộc (`Department`) và quản lý trạng thái hoạt động (`Active`/`Inactive`) cho nhân sự trên toàn hệ thống.
* **Actor:** Quản trị viên (Admin).
* **Preconditions:** Admin đã đăng nhập với quyền quản trị; tài khoản nhân sự đã tồn tại trong hệ thống (thường được đồng bộ tự động từ hệ thống SSO của nhà trường).
* **Main Flow:**
  1. Admin truy cập vào phân hệ *Quản lý Tài khoản*.
  2. Admin thực hiện tìm kiếm (theo mã nhân viên hoặc email) và chọn hồ sơ nhân sự cần cấu hình.
  3. Giao diện hiển thị chi tiết tài khoản, Admin tiến hành:
     * Chọn Vai trò (`Sinh viên` / `Nhân viên` / `Quản lý` / `Admin`).
     * Chọn Phòng ban trực thuộc (Chỉ bắt buộc áp dụng nếu Vai trò là `Nhân viên` hoặc `Quản lý`; có thể chọn nhiều phòng ban nếu nhân sự kiêm nhiệm).
     * Cập nhật Trạng thái tài khoản (`Active` hoặc `Inactive`).
  4. Admin nhấn nút "Lưu".
  5. Hệ thống cập nhật quyền hạn, phạm vi truy cập dữ liệu và trạng thái hoạt động của tài khoản người dùng.
* **Business Rules:**
  * **BR-01 (Ràng buộc Vai trò - Phòng ban):** Nếu tài khoản được gắn vai trò là `Nhân viên` hoặc `Quản lý`, trường "Phòng ban trực thuộc" là bắt buộc phải chọn. Nếu vai trò là `Sinh viên` hoặc `Admin`, trường phòng ban sẽ bị làm mờ (không áp dụng).
  * **BR-02 (Quy tắc Kiêm nhiệm):** Một nhân sự chỉ mang 1 vai trò duy nhất trong hệ thống nhưng có thể thuộc biên chế của nhiều phòng ban khác nhau.
  * **BR-03 (Khóa tài khoản):** Khi tài khoản bị chuyển sang trạng thái `Inactive` (Khóa), người dùng đó lập tức bị đăng xuất phiên làm việc hiện tại và không thể đăng nhập trở lại. Đồng thời, tên của nhân sự đó cũng bị ẩn hoàn toàn khỏi danh sách phân công (`Assign`) của các phòng ban.
* **Alternative / Error Flows:**
  * Nếu Admin chọn vai trò `Nhân viên` hoặc `Quản lý` nhưng bỏ trống ô phòng ban và bấm Lưu $\rightarrow$ Hệ thống hiển thị thông báo lỗi yêu cầu bắt buộc chọn phòng ban.
* **Acceptance Criteria (AC):**
  * **AC-01 (Kiểm tra phân quyền chuẩn):** Admin gắn vai trò "Quản lý" và phòng ban "Công tác Sinh viên" cho tài khoản A $\rightarrow$ Tài khoản A truy cập thành công menu Dashboard và xem được danh sách đơn của đúng phòng Công tác Sinh viên.
  * **AC-02 (Kiểm tra BR-01 & Lỗi):** Admin chọn vai trò "Nhân viên" nhưng bỏ trống ô phòng ban và bấm Lưu $\rightarrow$ Hệ thống chặn thao tác và báo lỗi.
  * **AC-03 (Kiểm tra BR-03 - Khóa tài khoản):** Admin chuyển trạng thái tài khoản nhân viên B sang `Inactive` $\rightarrow$ Trưởng phòng vào luồng Phân công (`FR-ROUT-03`) tìm tên nhân viên B $\rightarrow$ Hệ thống không còn hiển thị tên nhân viên này trong danh sách chọn.
