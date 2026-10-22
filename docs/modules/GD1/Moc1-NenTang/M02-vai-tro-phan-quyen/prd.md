# PHÂN HỆ: M02 — VAI TRÒ & PHÂN QUYỀN (ROLES & PERMISSIONS)

## [FR-M02-01] Xem danh sách 4 vai trò của hệ thống

**Mô tả:** Admin xem danh mục 4 vai trò chuẩn cốt lõi trong hệ thống UniSupport (Sinh viên, Nhân viên, Quản lý, Admin) cùng số lượng người dùng đang được gán theo từng vai trò.

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

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác danh sách 4 vai trò chuẩn và số lượng tài khoản trực thuộc.

---

## [FR-M02-02] Cài đặt và phân quyền chức năng chi tiết cho từng vai trò

**Mô tả:** Admin cấu hình Ma trận phân quyền (Access Control List - ACL) chi tiết, cấp hoặc thu hồi từng quyền hạn chức năng cụ thể cho từng vai trò.

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
5. Hệ thống cập nhật bảng phân quyền trong CSDL.
6. Quyền hạn mới được áp dụng ngay lập tức cho các thao tác tiếp theo của người dùng thuộc vai trò đó.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tuyệt đối không được phép tước bỏ quyền Quản trị tài khoản và Quản trị phân quyền của tài khoản Admin chính (tránh mất quyền quản trị tối cao).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bật/tắt quyền hạn thành công $\rightarrow$ Hệ thống áp dụng chính xác cho người dùng thuộc vai trò đó.

---
