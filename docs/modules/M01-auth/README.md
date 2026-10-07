# PHÂN HỆ: TÀI KHOẢN (AUTH)

## [FR-AUTH-01] Người dùng đăng nhập hệ thống
* **Mô tả:** Tất cả các vai trò (Sinh viên, Nhân viên, Quản lý, Admin) thực hiện đăng nhập vào hệ thống bằng mã số định danh và mật khẩu cá nhân.
* **Actor:** Sinh viên, Nhân viên, Quản lý, Admin.
* **Preconditions:** Người dùng đã được cấp tài khoản hợp lệ trong hệ thống.
* **Main Flow:**
  1. Người dùng truy cập trang Đăng nhập.
  2. Nhập mã định danh và mật khẩu.
  3. Nhấn “Đăng nhập”.
  4. Hệ thống kiểm tra thông tin đăng nhập.
  5. Nếu thông tin hợp lệ, hệ thống đăng nhập thành công và chuyển người dùng đến trang chủ theo đúng phân quyền vai trò.
* **Business Rules:**
  * **BR-01:** Nếu nhập sai thông tin đăng nhập quá 5 lần liên tiếp, tài khoản sẽ bị tạm khóa trong vòng 15 phút.
  * **BR-02 (System Constraint):** Hệ thống hoạt động theo cơ chế đóng. Tài khoản do nhà trường cấp sẵn cho Sinh viên và Nhân viên, người dùng không thể tự đăng ký. Do đó, hệ thống tuyệt đối không hiển thị nút hoặc chức năng “Đăng ký”.
  * **BR-03 (Mật khẩu mặc định):** Sinh viên và Nhân viên sử dụng tài khoản/mật khẩu do nhà trường cấp, **không có** tính năng “Đổi mật khẩu” hay “Quên mật khẩu”. Mọi sự cố đăng nhập đều phải liên hệ phòng IT để được xử lý.
  * **BR-04:** Riêng tài khoản Admin được hỗ trợ tính năng “Quên mật khẩu” để khôi phục quyền quản trị.
* **Alternative / Error Flows:**
  * Nếu nhập sai mã định danh hoặc mật khẩu, hệ thống hiển thị thông báo *“Sai thông tin đăng nhập”* và chặn đăng nhập.
  * Nếu bỏ trống Mã định danh hoặc Mật khẩu, hệ thống chặn đăng nhập và tô đỏ trường dữ liệu còn thiếu.
* **Acceptance Criteria (AC):**
  * **AC-01:** Nhập đúng thông tin $\rightarrow$ Đăng nhập thành công, chuyển hướng đúng giao diện theo vai trò.
  * **AC-02:** Nhập sai mật khẩu $\rightarrow$ Chặn đăng nhập, hiển thị thông báo lỗi.
  * **AC-03:** Bỏ trống thông tin $\rightarrow$ Chặn đăng nhập, cảnh báo tại chỗ.
  * **AC-04 (Test BR-01):** Nhập sai 5 lần liên tiếp $\rightarrow$ Khóa tài khoản và hiển thị thời gian khóa 15 phút.
  * **AC-05 (Test BR-02 & BR-03):** Màn hình đăng nhập không có nút "Đăng ký"/"Quên mật khẩu"; tài khoản Sinh viên/Nhân viên không có chức năng tự đổi mật khẩu.

---

## [FR-AUTH-02] Admin đồng bộ tài khoản
* **Mô tả:** Admin thực hiện import danh sách tài khoản từ file Excel/CSV do nhà trường cung cấp để khởi tạo mới hoặc cập nhật thông tin hàng loạt.
* **Actor:** Admin.
* **Preconditions:** Admin đã đăng nhập hệ thống với quyền cao nhất. File dữ liệu đúng định dạng, bao gồm các cột bắt buộc: *Mã định danh, Họ tên, Mã vai trò, Mã phòng ban*.
* **Main Flow:**
  1. Admin truy cập mục Quản lý tài khoản và chọn “Import tài khoản”.
  2. Tải lên tệp định dạng `.xlsx` hoặc `.csv`.
  3. Hệ thống kiểm tra cấu trúc định dạng và tính hợp lệ của dữ liệu trong file.
  4. Hệ thống khởi tạo tài khoản mới (với mật khẩu mặc định) hoặc cập nhật thông tin cho các tài khoản đã tồn tại.
  5. Hệ thống hiển thị báo cáo kết quả: X tài khoản tạo mới, Y tài khoản cập nhật thành công, Z tài khoản lỗi (nếu có).
* **Business Rules:**
  * **BR-01:** Nếu Mã định danh chưa tồn tại trong hệ thống $\rightarrow$ Tạo mới tài khoản và cấp mật khẩu mặc định.
  * **BR-02:** Nếu Mã định danh đã tồn tại $\rightarrow$ Cập nhật thông tin thay đổi (Họ tên, Phòng ban) và **tuyệt đối giữ nguyên mật khẩu hiện tại**.
  * **BR-03:** Nếu dòng dữ liệu thiếu các cột bắt buộc $\rightarrow$ Bỏ qua dòng đó và ghi nhận vào log lỗi.
* **Alternative / Error Flows:**
  * Nếu định dạng file tải lên không phải là Excel hoặc CSV $\rightarrow$ Hệ thống chặn lại và thông báo lỗi cấu trúc tệp.
* **Acceptance Criteria (AC):**
  * **AC-01:** Tải lên file hợp lệ $\rightarrow$ Import thành công, cập nhật dữ liệu người dùng lên hệ thống.
  * **AC-02:** File chứa dòng lỗi/trùng lặp $\rightarrow$ Lọc bỏ dòng lỗi, import các dòng sạch và trả về bảng chi tiết lỗi cho Admin.
  * **AC-03:** File chứa tài khoản cũ đã có trên hệ thống $\rightarrow$ Cập nhật thông tin mới nhưng giữ nguyên mật khẩu cũ.
  * **AC-04:** Cố tình tải lên file sai định dạng (vd: `.exe`, `.txt`) $\rightarrow$ Hệ thống báo lỗi và từ chối xử lý.
