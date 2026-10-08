# PHÂN HỆ: M03 — VAI TRÒ & PHÂN QUYỀN ADMIN (ROLES & PERMISSIONS)

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Actor chính:** Admin  

---

## [FR-M03-01] Quản lý vai trò người dùng
* **Mô tả:** Admin xem và quản lý danh mục các Vai trò chuẩn trong hệ thống (Sinh viên, Nhân viên, Quản lý, Admin).
* **Actor:** Admin
* **Preconditions:** Đăng nhập với quyền Admin tối cao.
* **Trường dữ liệu (Data Fields):**
  * `role_id`: String (Khóa chính: `ROLE_STUDENT`, `ROLE_STAFF`, `ROLE_MANAGER`, `ROLE_ADMIN`)
  * `role_name`: String (Bắt buộc, Max 50 ký tự, Tên tiếng Việt hiển thị)
  * `user_count`: Integer (Chỉ đọc, Số tài khoản đang gán Role này)
* **Main Flow:**
  1. Admin mở mục Quản lý vai trò.
  2. Hệ thống hiển thị 4 vai trò cốt lõi và số lượng người dùng đang gán theo từng vai trò.
  3. Admin chọn xem chi tiết danh sách tài khoản thuộc từng Vai trò.
* **Business Rules (BR):**
  * **BR-01:** 4 vai trò cốt lõi (`Student`, `Staff`, `Manager`, `Admin`) là các vai trò hệ thống cố định, không được phép xóa bỏ.
* **Acceptance Criteria (AC):**
  * **AC-01:** Hiển thị chính xác danh sách 4 vai trò chuẩn và thống kê số lượng người dùng.

---

## [FR-M03-02] Cấu hình và kiểm soát quyền truy cập chi tiết
* **Mô tả:** Admin thiết lập Ma trận phân quyền (ACL) cho từng vai trò trong hệ thống.
* **Actor:** Admin
* **Preconditions:** Quyền Admin hệ thống.
* **Trường dữ liệu (Data Fields):**
  * `role_id`: String (Bắt buộc)
  * `permission_codes`: Array of Strings (Danh sách mã quyền: `TICKET_READ`, `TICKET_WRITE`, `CATEGORY_MANAGE`...)
  * `is_enabled`: Boolean (Mặc định: `true`)
* **Main Flow:**
  1. Admin chọn một Vai trò cần cấu hình.
  2. Hệ thống hiển thị danh sách các quyền hạn chức năng.
  3. Admin tích chọn/bỏ chọn quyền hạn và bấm Lưu.
  4. Backend kiểm tra và cập nhật ma trận phân quyền vào CSDL.
* **Business Rules (BR):**
  * **BR-01:** Tuyệt đối không được phép tước bỏ quyền Quản trị tài khoản của tài khoản Admin chính (tránh mất quyền quản trị cuối cùng).
* **Acceptance Criteria (AC):**
  * **AC-01:** Cập nhật quyền hạn thành công $\rightarrow$ Áp dụng chính xác ở các phiên đăng nhập tiếp theo của người dùng thuộc Role đó.
