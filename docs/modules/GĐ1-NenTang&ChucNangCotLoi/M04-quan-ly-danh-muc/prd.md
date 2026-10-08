# PHÂN HỆ: M04 — QUẢN LÝ DANH MỤC HỖ TRỢ (CATEGORY MANAGEMENT)

## [FR-M04-01] Admin quản lý danh mục toàn trường

**Mô tả:** Admin tạo mới, chỉnh sửa, ẩn/hiện danh mục dịch vụ hỗ trợ toàn trường và gán Phòng ban tiếp nhận mặc định.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã danh mục:** Bắt buộc, Duy nhất, 2-4 ký tự in hoa, VD: AC, FN, IT.
- **Tên danh mục:** Bắt buộc, Max 100 ký tự, Tên danh mục dịch vụ.
- **Phòng ban phụ trách:** Bắt buộc, Khóa ngoại tới Phòng ban tiếp nhận.
- **Thời hạn xử lý:** Bắt buộc, Thời gian cam kết xử lý SLA mặc định tính theo giờ, VD: 24, 48.
- **Trạng thái hiển thị:** Mặc định: true.

**Luồng chính (Main Flow):**

1. Admin truy cập Quản lý danh mục hỗ trợ.
2. Nhấn “Thêm danh mục mới”.
3. Nhập Tên danh mục, Mã danh mục (VD: AC, FN), Mô tả, Phòng ban phụ trách mặc định và SLA xử lý tiêu chuẩn.
4. Bấm “Lưu”.
5. Hệ thống kiểm tra trùng lặp và lưu vào hệ thống.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mã danh mục phải là duy nhất và gồm 2-4 ký tự in hoa.
* **BR-02:** Danh mục bị ẩn sẽ không hiển thị trên form Tạo Ticket của Sinh viên nhưng giữ nguyên dữ liệu trên các Ticket cũ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Tạo mới danh mục hợp lệ → Danh mục xuất hiện trong cây danh mục toàn trường và form Tạo Ticket.
* **AC-02:** Trùng Mã danh mục → Hệ thống báo lỗi và không cho phép lưu.

## [FR-M04-02] Quản lý danh mục hỗ trợ thuộc phòng ban

**Mô tả:** Quản lý phòng ban (Trưởng phòng) xem và cấu hình danh mục dịch vụ chuyên trách thuộc nội bộ phòng ban mình.

**Actor:** Quản lý phòng ban

**Preconditions (Điều kiện tiên quyết):** Tài khoản vai trò Quản lý đã gắn đúng Phòng ban.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Danh mục hỗ trợ:** Khóa chính.
- **Hướng dẫn hồ sơ:** Tùy chọn, Hướng dẫn hồ sơ sinh viên cần chuẩn bị.
- **Thời hạn xử lý của phòng ban:** Bắt buộc, Giờ.
- **Trạng thái:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Quản lý mở Quản lý danh mục phòng ban.
2. Xem danh sách danh mục trực thuộc.
3. Chỉnh sửa mô tả hướng dẫn, thời hạn SLA phòng ban.
4. Bấm Lưu.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Quản lý chỉ xem và sửa được danh mục thuộc phòng ban mình phụ trách.

---
