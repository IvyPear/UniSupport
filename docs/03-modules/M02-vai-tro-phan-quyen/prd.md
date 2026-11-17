# PHÂN HỆ: M02 — VAI TRÒ & PHÂN QUYỀN (ROLES & PERMISSIONS)

## [FR-M02-01] Xem danh sách 4 vai trò của hệ thống

**Mô tả:** Admin xem danh mục 4 vai trò chuẩn cốt lõi trong hệ thống UniSupport (Sinh viên, Nhân viên, Quản lý, Admin) cùng số lượng người dùng đang được gán theo từng vai trò.

**Priority:** Medium (Chức năng tra cứu thông tin tĩnh về 4 vai trò cốt lõi, phục vụ quản trị phân quyền).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã vai trò:** Khóa chính: `Student`, `Staff`, `Manager`, `Admin`.
- **Tên vai trò hiển thị:** Tên tiếng Việt: Sinh viên, Nhân viên hỗ trợ, Quản lý phòng ban, Quản trị viên.
- **Mô tả vai trò:** Tóm tắt phạm vi trách nhiệm.
- **Số lượng tài khoản:** Chỉ đọc, số tài khoản đang gán vai trò này.

**Luồng chính (Main Flow):**

1. Admin truy cập menu “Vai trò & Phân quyền”.
2. Hệ thống tải và hiển thị danh sách 4 vai trò cốt lõi kèm thẻ chỉ số người dùng trực thuộc.
3. Admin có thể bấm chọn từng vai trò để xem danh sách tài khoản cụ thể.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** 4 vai trò cốt lõi (`Student`, `Staff`, `Manager`, `Admin`) là các vai trò hệ thống cố định, không được phép xóa bỏ hoặc đổi mã định danh vai trò.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Cố tình xóa hoặc đổi mã vai trò cố định):** Gửi yêu cầu API xóa hoặc sửa mã một trong 4 vai trò chuẩn $\rightarrow$ Backend từ chối với mã `400 Bad Request` (`BR-01`).
* **E-02 (Truy cập trái quyền):** Tài khoản không phải `Admin` truy cập màn hình/API danh sách vai trò $\rightarrow$ Hệ thống chặn với mã `403 Forbidden`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác danh sách 4 vai trò chuẩn kèm số lượng tài khoản trực thuộc; chặn mọi thao tác xóa hoặc đổi mã định danh vai trò cố định (`BR-01`, `E-01`, `E-02`).

**Ví dụ Edge Case (Trường hợp biên):**

* Một vai trò trong hệ thống hiện chưa có tài khoản nào đang hoạt động (`Active`) $\rightarrow$ Thẻ chỉ số hiển thị số lượng là `0` mà không phát sinh lỗi chia/hiển thị.

---

## [FR-M02-02] Cài đặt và phân quyền chức năng chi tiết cho từng vai trò

**Mô tả:** Admin cấu hình Ma trận phân quyền (Access Control List - ACL) chi tiết, cấp hoặc thu hồi từng quyền hạn chức năng cụ thể cho từng vai trò.

**Priority:** High (Chức năng bảo mật cốt lõi, quyết định tính toàn vẹn và phân quyền truy cập hệ thống).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Vai trò cấu hình:** Vai trò được chọn.
- **Danh mục quyền hạn chức năng:**
  - Quản lý tài khoản và phân quyền người dùng.
  - Quản lý danh mục hỗ trợ và cấu hình SLA.
  - Khởi tạo Ticket và đính kèm tài liệu.
  - Tiếp nhận (Claim) Ticket.
  - Cập nhật tiến độ và ghi chú nội bộ.
  - Yêu cầu bổ sung hồ sơ và trao đổi.
  - Chuyển trả Ticket sai phòng ban.
  - Phân công lại Ticket nội bộ phòng ban.
  - Điều chuyển Ticket mục "Khác" và đơn chuyển sai.
  - Đánh giá chất lượng và nhận xét.
  - Xem Dashboard và biểu đồ thống kê.
  - Xuất báo cáo dữ liệu (Excel/PDF).
- **Trạng thái quyền:** Bật (`true`) / Tắt (`false`).

**Luồng chính (Main Flow):**

1. Admin chọn vai trò cần điều chỉnh quyền.
2. Hệ thống hiển thị ma trận danh sách các quyền hạn chức năng tương ứng.
3. Admin tích chọn hoặc bỏ chọn quyền hạn.
4. Bấm “Lưu thiết lập phân quyền”.
5. Hệ thống cập nhật quan hệ vai trò – quyền chức năng trong CSDL.
6. Quyền hạn mới được kiểm tra tại Backend và áp dụng ngay cho các yêu cầu tiếp theo của người dùng thuộc vai trò đó, kể cả khi phiên đăng nhập đang tồn tại.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tuyệt đối không được phép tước bỏ quyền Quản trị tài khoản và Quản trị phân quyền của tài khoản Admin chính (tránh mất quyền quản trị tối cao).
* **BR-02:** Chỉ có 4 mã vai trò cố định. Bật/tắt quyền không làm thay đổi mã vai trò hoặc phạm vi dữ liệu của người dùng; Backend phải kiểm tra cả quyền chức năng lẫn quyền dữ liệu.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Tước quyền quản trị tối cao của Admin):** Admin bỏ chọn quyền Quản lý tài khoản hoặc Quản lý phân quyền của vai trò `Admin` $\rightarrow$ Hệ thống từ chối lưu, trả về `400 Bad Request` và hiển thị cảnh báo (`BR-01`).
* **E-02 (Gửi mã vai trò hoặc mã quyền không hợp lệ):** Payload cập nhật chứa mã vai trò ngoài 4 vai trò chuẩn $\rightarrow$ Backend từ chối với mã `422 Unprocessable Entity` (`BR-02`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bật/tắt quyền hạn thành công $\rightarrow$ Hệ thống áp dụng chính xác ngay ở request tiếp theo cho người dùng thuộc vai trò đó và kiểm tra đúng phạm vi dữ liệu (`BR-02`, `E-02`).
* **AC-02:** Khi Admin cố gắng bỏ chọn quyền Quản trị tài khoản hoặc Quản trị phân quyền đối với vai trò Admin $\rightarrow$ Hệ thống từ chối cập nhật, trả về lỗi `400 Bad Request` và hiển thị thông báo lỗi cấm tước quyền quản trị tối cao (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Admin thu hồi quyền "Xuất báo cáo dữ liệu" của vai trò `Manager` trong khi một Trưởng phòng đang mở sẵn trang Báo cáo $\rightarrow$ Ngay khi Trưởng phòng bấm nút "Xuất Excel", Backend từ chối với mã `403 Forbidden` dù JWT Token hiện tại chưa hết hạn.

---
