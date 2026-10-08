# PHÂN HỆ: M04 — QUẢN LÝ DANH MỤC HỖ TRỢ (CATEGORY MANAGEMENT)

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Actor chính:** Admin, Quản lý phòng ban  

---

## [FR-M04-01] Admin quản lý danh mục toàn trường
* **Mô tả:** Admin tạo mới, chỉnh sửa, ẩn/hiện danh mục dịch vụ hỗ trợ toàn trường và gán Phòng ban tiếp nhận mặc định.
* **Actor:** Admin
* **Preconditions:** Đã đăng nhập tài khoản Admin.
* **Main Flow:**
  1. Admin truy cập Quản lý danh mục hỗ trợ.
  2. Nhấn “Thêm danh mục mới”.
  3. Nhập Tên danh mục, Mã danh mục (VD: `AC`, `FN`), Mô tả, Phòng ban phụ trách mặc định và SLA xử lý tiêu chuẩn.
  4. Bấm “Lưu”.
  5. Hệ thống kiểm tra trùng lặp và lưu vào CSDL.
* **Business Rules (BR):**
  * **BR-01:** Mã danh mục (Category Code) phải là duy nhất và gồm 2-4 ký tự in hoa.
  * **BR-02:** Danh mục bị ẩn sẽ không hiển thị trên form Tạo Ticket của Sinh viên nhưng giữ nguyên dữ liệu trên các Ticket cũ.
* **Acceptance Criteria (AC):**
  * **AC-01:** Tạo mới danh mục hợp lệ $\rightarrow$ Danh mục xuất hiện trong cây danh mục toàn trường và form Tạo Ticket.
  * **AC-02:** Trùng Mã danh mục $\rightarrow$ Hệ thống báo lỗi và không cho phép lưu.

---

## [FR-M04-02] Quản lý danh mục hỗ trợ thuộc phòng ban
* **Mô tả:** Quản lý phòng ban (Trưởng phòng) xem và cấu hình danh mục dịch vụ chuyên trách thuộc nội bộ phòng ban mình.
* **Actor:** Quản lý phòng ban
* **Preconditions:** Tài khoản Role Quản lý đã gắn đúng Phòng ban.
* **Main Flow:**
  1. Quản lý mở Quản lý danh mục phòng ban.
  2. Xem danh sách danh mục trực thuộc.
  3. Chỉnh sửa mô tả hướng dẫn, thời hạn SLA phòng ban.
  4. Bấm Lưu.
* **Acceptance Criteria (AC):**
  * **AC-01:** Quản lý chỉ xem và sửa được danh mục thuộc phòng ban mình phụ trách.
