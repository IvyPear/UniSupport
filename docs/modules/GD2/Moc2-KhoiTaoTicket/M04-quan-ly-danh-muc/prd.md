# PHÂN HỆ: M04 — QUẢN LÝ DANH MỤC HỖ TRỢ (CATEGORY MANAGEMENT)

## [FR-M04-01] Quản lý danh mục cấp toàn trường (Dành cho Admin)

**Mô tả:** Admin chịu trách nhiệm tạo lập và quản lý các danh mục hỗ trợ chung cấp trường (Global Categories) hoặc danh mục dùng để điều phối ban đầu.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã danh mục:** Bắt buộc, Duy nhất, 2-4 ký tự in hoa, VD: AC, FN, IT.
- **Tên danh mục:** Bắt buộc, Max 100 ký tự, Tên danh mục dịch vụ.
- **Phòng ban phụ trách:** Bắt buộc, Khóa ngoại tới Phòng ban tiếp nhận.
- **Thời hạn xử lý:** Bắt buộc, Thời gian cam kết xử lý SLA mặc định tính theo giờ, VD: 24, 48.
- **Trạng thái hiển thị:** Mặc định: true.

**Luồng chính (Main Flow):**

1. Admin mở menu “Danh mục toàn trường”.
2. Thêm mới, chỉnh sửa thông tin hoặc ẩn/hiện các danh mục dùng chung.
3. Quản lý danh mục đặc biệt (VD: Danh mục "Khác" dùng để định tuyến).
4. Lưu thiết lập vào CSDL.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Giới hạn quyền Admin):** Admin có thể can thiệp thêm/sửa các danh mục cấp toàn trường.
* **BR-02:** Danh mục bị ẩn sẽ không hiển thị trên form Tạo Ticket của Sinh viên nhưng giữ nguyên dữ liệu trên các Ticket cũ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin tạo danh mục toàn trường thành công → Danh mục này được hiển thị lên form tạo Ticket của Sinh viên.
* **AC-02:** Trùng Mã danh mục → Hệ thống báo lỗi và không cho phép lưu.

## [FR-M04-02] Quản lý danh mục chuyên môn nội bộ (Dành cho Quản lý phòng ban)

**Mô tả:** Quản lý (Trưởng phòng) được quyền chủ động thêm mới, cấu hình và chỉnh sửa các danh mục dịch vụ chuyên môn chỉ thuộc về phòng ban của mình, không phụ thuộc vào Admin.

**Actor:** Quản lý phòng ban

**Preconditions (Điều kiện tiên quyết):** Tài khoản vai trò Quản lý đã gắn đúng Phòng ban.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Tên danh mục:** Bắt buộc.
- **Hướng dẫn hồ sơ:** Tùy chọn, Hướng dẫn hồ sơ sinh viên cần chuẩn bị.
- **Thời hạn xử lý của phòng ban:** Bắt buộc, Giờ.
- **Trạng thái:** Bật/Tắt hiển thị.

**Luồng chính (Main Flow):**

1. Quản lý mở menu “Danh mục phòng ban”.
2. Hệ thống chỉ tải các danh mục thuộc quyền sở hữu của phòng ban đó.
3. Quản lý chọn "Thêm mới danh mục", nhập Tên danh mục, Mô tả hướng dẫn và Thời hạn SLA tiêu chuẩn.
4. Chọn Ẩn/Hiện danh mục.
5. Lưu thông tin vào CSDL.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01 (Data Isolation):** Quản lý chỉ được phép thêm mới và chỉnh sửa danh mục thuộc nội bộ phòng ban mình. Tuyệt đối không nhìn thấy hoặc sửa được danh mục của phòng ban khác hay danh mục toàn trường của Admin.
- **BR-02:** Danh mục do Quản lý tạo ra khi hiển thị cho Sinh viên sẽ được nhóm tự động dưới tên Phòng ban đó.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Quản lý tạo danh mục mới → Sinh viên khi chọn đúng Phòng ban đó sẽ thấy danh mục chuyên môn này xuất hiện. Quản lý phòng ban khác không nhìn thấy danh mục này trong trang quản trị của họ.

---
