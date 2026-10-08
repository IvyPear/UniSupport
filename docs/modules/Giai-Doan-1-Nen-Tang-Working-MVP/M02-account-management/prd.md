# PHÂN HỆ: M02 — QUẢN LÝ TÀI KHOẢN ADMIN (ACCOUNT MANAGEMENT)

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Actor chính:** Admin  

---

## [FR-M02-01] Tạo, xem, tìm kiếm và lọc tài khoản
* **Mô tả:** Admin thực hiện xem danh sách, tìm kiếm, lọc và quản lý thông tin các tài khoản người dùng trên toàn hệ thống.
* **Actor:** Admin
* **Preconditions:** Admin đã đăng nhập hệ thống thành công.
* **Trường dữ liệu (Data Fields):**
  * `search_keyword`: String (Tùy chọn, Tìm theo Mã định danh / Họ tên / Email)
  * `department_id`: Integer (Tùy chọn, Khóa ngoại tới Bảng Phòng ban)
  * `role_id`: Enum (`STUDENT`, `STAFF`, `MANAGER`, `ADMIN`)
  * `status_filter`: Enum (`ACTIVE`, `INACTIVE`, `ALL`)
* **Main Flow:**
  1. Admin truy cập mục Quản lý tài khoản.
  2. Hệ thống tải danh sách tài khoản toàn trường.
  3. Admin nhập từ khóa tìm kiếm (Mã định danh, Họ tên) hoặc chọn lọc theo Phòng ban / Vai trò / Trạng thái (`Active`/`Inactive`).
  4. Hệ thống trả về danh sách kết quả phù hợp theo thời gian thực.
* **Business Rules (BR):**
  * **BR-01:** Hệ thống vận hành cơ chế đóng, tài khoản tạo mới phải gắn với Mã định danh chính thức và Vai trò hợp lệ.
* **Alternative / Error Flows:**
  * Nếu không tìm thấy kết quả phù hợp, hệ thống hiển thị thông báo *“Không tìm thấy tài khoản phù hợp”*.
* **Acceptance Criteria (AC):**
  * **AC-01:** Lọc theo phòng ban/vai trò trả về đúng danh sách người dùng thuộc phân vùng đó.
  * **AC-02:** Tìm kiếm theo Mã định danh hoặc Họ tên hiển thị đúng thông tin tài khoản.

---

## [FR-M02-02] Cập nhật, khóa, mở khóa và Import tài khoản từ Excel/CSV
* **Mô tả:** Admin thực hiện cập nhật thông tin, thay đổi trạng thái hoạt động (Khóa/Mở khóa) hoặc Import danh sách tài khoản hàng loạt từ file tệp.
* **Actor:** Admin
* **Preconditions:** Admin có quyền quản trị tài khoản cao nhất.
* **Trường dữ liệu (Data Fields):**
  * `account_file`: File (Bắt buộc, Định dạng `.xlsx` hoặc `.csv`, Dung lượng Max 10MB)
  * `identity_code`: String (Bắt buộc trong file, Duy nhất, Max 20 ký tự)
  * `full_name`: String (Bắt buộc trong file, Max 100 ký tự)
  * `department_code`: String (Bắt buộc trong file, Mã phòng ban)
  * `role`: Enum (`STUDENT`, `STAFF`, `MANAGER`, `ADMIN`)
  * `status`: Enum (`ACTIVE`, `INACTIVE`)
* **Main Flow:**
  1. Admin chọn chức năng “Import tài khoản” và tải lên file `.xlsx` hoặc `.csv`.
  2. Hệ thống kiểm tra cấu trúc cột dữ liệu (*Mã định danh, Họ tên, Role, Phòng ban*).
  3. Với mã định danh chưa có: Tạo tài khoản mới với mật khẩu mặc định.
  4. Với mã định danh đã có: Cập nhật họ tên, phòng ban và **giữ nguyên mật khẩu hiện tại**.
  5. Khi chuyển trạng thái sang `Inactive` (Khóa): Hệ thống văng phiên làm việc của người dùng đó lập tức.
* **Business Rules (BR):**
  * **BR-01:** Không được phép xóa cứng các tài khoản đã từng phát sinh Ticket để bảo toàn dữ liệu lịch sử.
  * **BR-02:** File import sai định dạng hoặc thiếu trường bắt buộc sẽ bị chặn và trả về báo cáo dòng lỗi cho Admin.
* **Acceptance Criteria (AC):**
  * **AC-01:** Import file Excel hợp lệ $\rightarrow$ Khởi tạo/cập nhật tài khoản thành công và hiển thị tổng số dòng thành công/thất bại.
  * **AC-02:** Khóa tài khoản `Inactive` $\rightarrow$ Người dùng bị văng phiên đăng nhập ngay lập tức và không thể đăng nhập lại.
