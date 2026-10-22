# PHÂN HỆ: M03 — QUẢN LÝ TÀI KHOẢN (ACCOUNT MANAGEMENT)

## [FR-M03-01] Xem, tìm kiếm và lọc danh sách tài khoản

**Mô tả:** Admin xem danh sách toàn bộ người dùng trong trường, tìm kiếm nhanh và lọc đa tiêu chí theo vai trò, phòng ban và trạng thái hoạt động.

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Admin đăng nhập thành công vào hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Tùy chọn, tìm theo Mã định danh (Mã SV/Mã Cán bộ) hoặc Họ tên.
- **Bộ lọc Phòng ban:** Tùy chọn, lọc theo Phòng ban trực thuộc.
- **Bộ lọc Vai trò:** Tùy chọn, lọc theo `Student`, `Staff`, `Manager`, `Admin`.
- **Bộ lọc Trạng thái:** Tùy chọn, lọc theo `Active` (Hoạt động) hoặc `Inactive` (Đang khóa).

**Luồng chính (Main Flow):**

1. Admin truy cập menu “Quản lý tài khoản”.
2. Hệ thống hiển thị bảng danh sách tài khoản toàn trường (phân trang 20 dòng/trang).
3. Admin nhập từ khóa hoặc chọn các tiêu chí lọc.
4. Hệ thống tải lại danh sách kết quả phù hợp theo thời gian thực.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Tìm kiếm theo Mã định danh hoặc Họ tên hiển thị chính xác tài khoản.
* **AC-02:** Lọc kết hợp theo Phòng ban/Vai trò/Trạng thái trả về đúng tập dữ liệu tương ứng.

---

## [FR-M03-02] Tạo mới tài khoản

**Mô tả:** Admin thực hiện tạo mới thủ công từng tài khoản người dùng đơn lẻ trên form giao diện.

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã định danh:** Bắt buộc, Duy nhất, Max 20 ký tự (Mã SV / Mã Cán bộ).
- **Họ và tên:** Bắt buộc, Max 100 ký tự.
- **Email:** Bắt buộc, Đúng định dạng email trường.
- **Vai trò:** Bắt buộc, chọn trong 4 vai trò chuẩn.
- **Phòng ban:** Bắt buộc nếu là Nhân viên/Quản lý; không bắt buộc nếu là Sinh viên/Admin toàn trường.
- **Mật khẩu khởi tạo:** Mật khẩu mặc định hệ thống.

**Luồng chính (Main Flow):**

1. Admin chọn “Tạo mới tài khoản”.
2. Điền đầy đủ các trường thông tin bắt buộc.
3. Bấm “Xác nhận tạo”.
4. Hệ thống kiểm tra trùng lặp Mã định danh và Email.
5. Tạo tài khoản với trạng thái `Active`, băm mật khẩu mặc định và lưu vào CSDL.
6. Hiển thị thông báo tạo tài khoản thành công.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mã định danh và Email phải là duy nhất trên toàn hệ thống.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ thông tin hợp lệ $\rightarrow$ Tài khoản được tạo thành công và người dùng có thể đăng nhập ngay bằng mật khẩu mặc định.
* **AC-02:** Nhập trùng Mã định danh $\rightarrow$ Báo lỗi và chặn tạo mới.

---

## [FR-M03-03] Cập nhật thông tin và Khóa/Mở khóa tài khoản

**Mô tả:** Admin cập nhật thông tin cá nhân/phòng ban của tài khoản, thực hiện thao tác Khóa (`Inactive`) hoặc Mở khóa (`Active`), và hỗ trợ đặt lại (Reset) mật khẩu mặc định khi người dùng gặp sự cố.

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Tài khoản cần thao tác tồn tại trong hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã định danh:** Chỉ đọc.
- **Họ tên / Email / Phòng ban:** Có thể chỉnh sửa.
- **Trạng thái tài khoản:** `Active` / `Inactive`.
- **Đặt lại mật khẩu:** Tùy chọn nút bấm đưa mật khẩu về mặc định (`UniSupport@123`).

**Luồng chính (Main Flow):**

1. Admin mở chi tiết một tài khoản từ danh sách.
2. Chỉnh sửa thông tin cần thiết và bấm “Lưu thay đổi”.
3. **Thao tác Khóa tài khoản:** Admin chuyển trạng thái sang `Inactive` $\rightarrow$ Hệ thống cập nhật trạng thái và lập tức thu hồi mọi phiên đăng nhập của người dùng đó (Kick-out).
4. **Thao tác Mở khóa:** Admin chuyển trạng thái sang `Active` $\rightarrow$ Tài khoản được phép đăng nhập lại bình thường.
5. **Thao tác Reset mật khẩu:** Admin nhấp “Đặt lại mật khẩu mặc định” $\rightarrow$ Hệ thống cập nhật mật khẩu về mặc định và yêu cầu đổi mật khẩu ở lần đăng nhập tới.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tuyệt đối không xóa cứng (Hard Delete) tài khoản đã từng phát sinh Ticket để đảm bảo toàn vẹn dữ liệu lịch sử; chỉ được chuyển trạng thái Khóa (`Inactive`).
* **BR-02:** Không được phép khóa tài khoản Admin chính của hệ thống.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Khóa tài khoản $\rightarrow$ Người dùng bị đăng xuất ngay lập tức và không thể đăng nhập lại.
* **AC-02:** Mở khóa tài khoản $\rightarrow$ Người dùng đăng nhập lại bình thường.

---

## [FR-M03-04] Thêm tài khoản hàng loạt bằng file Excel

**Mô tả:** Admin tải lên file danh sách tài khoản định dạng Excel (.xlsx/.csv) để thêm mới hoặc cập nhật thông tin hàng loạt tài khoản sinh viên/cán bộ.

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin; chuẩn bị file Excel theo đúng định dạng mẫu.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **File dữ liệu:** Bắt buộc, `.xlsx` hoặc `.csv`, dung lượng tối đa 10MB.
- **Cấu trúc cột:** Mã định danh, Họ và tên, Email, Vai trò, Mã phòng ban.

**Luồng chính (Main Flow):**

1. Admin chọn chức năng “Nhập từ Excel” và tải file dữ liệu lên hệ thống.
2. Hệ thống kiểm tra cấu trúc tiêu đề các cột dữ liệu.
3. Hệ thống quét từng dòng dữ liệu:
   - Với dòng có Mã định danh chưa tồn tại: Tạo mới tài khoản với mật khẩu mặc định.
   - Với dòng có Mã định danh đã tồn tại: Cập nhật thông tin họ tên, phòng ban và giữ nguyên mật khẩu hiện tại.
4. Hệ thống hoàn tất xử lý và hiển thị thông báo tổng kết: Số dòng thành công, danh sách các dòng bị lỗi (nếu có).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nếu file sai cấu trúc cột hoặc sai định dạng file, hệ thống chặn toàn bộ tiến trình và hiển thị cảnh báo lỗi cụ thể.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Tải file Excel hợp lệ $\rightarrow$ Khởi tạo và cập nhật đúng danh sách người dùng vào hệ thống.
* **AC-02:** Hiển thị rõ số dòng thành công và số dòng thất bại kèm lý do lỗi.

---
