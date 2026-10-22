# PHÂN HỆ: M02 — VAI TRÒ & PHÂN QUYỀN ADMIN (ROLES & PERMISSIONS)

## [FR-M02-01] Quản lý vai trò người dùng

**Mô tả:** Admin xem và quản lý danh mục các Vai trò chuẩn trong hệ thống (Sinh viên, Nhân viên, Quản lý, Admin).

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin tối cao.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Vai trò:** Khóa chính: Sinh Viên, Nhân Viên, Quản Lý, Admin.
- **Tên vai trò:** Bắt buộc, Max 50 ký tự, Tên tiếng Việt hiển thị.
- **Số người dùng:** Chỉ đọc, Số tài khoản đang gán vai trò này.

**Luồng chính (Main Flow):**

1. Admin mở mục Quản lý vai trò.
2. Hệ thống hiển thị 4 vai trò cốt lõi và số lượng người dùng đang gán theo từng vai trò.
3. Admin chọn xem chi tiết danh sách tài khoản thuộc từng Vai trò.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** 4 vai trò cốt lõi (Sinh Viên, Nhân Viên, Quản Lý, Admin) là các vai trò hệ thống cố định, không được phép xóa bỏ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác danh sách 4 vai trò chuẩn và thống kê số lượng người dùng.

## [FR-M02-02] Cấu hình và kiểm soát quyền truy cập chi tiết

**Mô tả:** Admin thiết lập Ma trận phân quyền (ACL) cho từng vai trò trong hệ thống.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Quyền Admin hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Vai trò:** Bắt buộc.
- **Danh sách quyền:** Danh sách mã quyền: 

        - Quản lý tài khoản và phân quyền người dùng.

        - Quản lý danh mục hỗ trợ và cấu hình SLA.

        - Tạo Ticket (nhập nội dung yêu cầu, đính kèm file ).

        - Xem danh sách và chi tiết Ticket.

        - Tiếp nhận Ticket.

        - Cập nhật trạng thái Ticket.

        - Nhắn tin, phản hồi và yêu cầu bổ sung tài liệu.

        - Trả Ticket sai phòng ban về mục "Khác".

        - Phân công lại Ticket nội bộ phòng ban.

        - Điều chuyển Ticket từ mục "Khác" về các phòng ban.

        - Đánh giá sao và viết nhận xét Ticket.

        - Xem Dashboard và biểu đồ thống kê.

        - Xuất báo cáo dữ liệu.
- **Trạng thái quyền:** Mặc định: true.

**Luồng chính (Main Flow):**

1. Admin chọn một Vai trò cần cấu hình.
2. Hệ thống hiển thị danh sách các quyền hạn chức năng.
3. Admin tích chọn/bỏ chọn quyền hạn và bấm Lưu.
4. Hệ thống kiểm tra và cập nhật ma trận phân quyền vào hệ thống.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tuyệt đối không được phép tước bỏ quyền Quản trị tài khoản của tài khoản Admin chính (tránh mất quyền quản trị cuối cùng).

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Cập nhật quyền hạn thành công → Áp dụng chính xác ở các phiên đăng nhập tiếp theo của người dùng thuộc vai trò đó.

---
