# PHÂN HỆ: M02 — QUẢN LÝ TÀI KHOẢN ADMIN (ACCOUNT MANAGEMENT)

## [FR-M02-01] Tạo, xem, tìm kiếm và lọc tài khoản

**Mô tả:** Admin thực hiện xem danh sách, tìm kiếm, lọc và quản lý thông tin các tài khoản người dùng trên toàn hệ thống.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Admin đã đăng nhập hệ thống thành công.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Tùy chọn, Tìm theo Mã định danh / Họ tên.
- **Phòng ban:** Tùy chọn, Khóa ngoại tới Bảng Phòng ban.
- **Vai trò:** Theo thông tin hiển thị trong hệ thống.
- **Bộ lọc trạng thái:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Admin truy cập mục Quản lý tài khoản.
2. Hệ thống tải danh sách tài khoản toàn trường.
3. Admin nhập từ khóa tìm kiếm (Mã định danh, Họ tên) hoặc chọn lọc theo Phòng ban / Vai trò / Trạng thái (Active/Inactive).
4. Hệ thống trả về danh sách kết quả phù hợp theo thời gian thực.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Hệ thống vận hành cơ chế đóng, tài khoản tạo mới phải gắn với Mã định danh chính thức và Vai trò hợp lệ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Nếu không tìm thấy kết quả phù hợp, hệ thống hiển thị thông báo *“Không tìm thấy tài khoản phù hợp”*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Lọc theo phòng ban/vai trò trả về đúng danh sách người dùng thuộc phân vùng đó.
* **AC-02:** Tìm kiếm theo Mã định danh hoặc Họ tên hiển thị đúng thông tin tài khoản.

## [FR-M02-02] Cập nhật, khóa, mở khóa và Import tài khoản từ Excel/CSV

**Mô tả:** Admin thực hiện cập nhật thông tin, thay đổi trạng thái hoạt động (Khóa/Mở khóa) hoặc Import danh sách tài khoản hàng loạt từ file tệp.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Admin có quyền quản trị tài khoản cao nhất.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Tệp danh sách tài khoản:** Bắt buộc, Định dạng .xlsx hoặc .csv, Dung lượng Max 10MB.
- **Mã định danh:** Bắt buộc trong file, Duy nhất, Max 20 ký tự.
- **Họ và tên:** Bắt buộc trong file, Max 100 ký tự.
- **Mã phòng ban:** Bắt buộc trong file, Mã phòng ban.
- **Vai trò:** Theo thông tin hiển thị trong hệ thống.
- **Trạng thái:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Admin chọn chức năng “Import tài khoản” và tải lên file .xlsx hoặc .csv.
2. Hệ thống kiểm tra cấu trúc cột dữ liệu (*Mã định danh, Họ tên, vai trò, Phòng ban*).
3. Với mã định danh chưa có: Tạo tài khoản mới với mật khẩu mặc định.
4. Với mã định danh đã có: Cập nhật họ tên, phòng ban và **giữ nguyên mật khẩu hiện tại**.
5. Khi chuyển trạng thái sang Inactive (Khóa): Hệ thống đăng xuất khỏi phiên hiện tại làm việc của người dùng đó lập tức.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Không được phép xóa cứng các tài khoản đã từng phát sinh Ticket để bảo toàn dữ liệu lịch sử.
* **BR-02:** File import sai định dạng hoặc thiếu trường bắt buộc sẽ bị chặn và trả về báo cáo dòng lỗi cho Admin.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Import file Excel hợp lệ → Khởi tạo/cập nhật tài khoản thành công và hiển thị tổng số dòng thành công/thất bại.
* **AC-02:** Khóa tài khoản Inactive → Người dùng bị đăng xuất khỏi phiên hiện tại đăng nhập ngay lập tức và không thể đăng nhập lại.

---
