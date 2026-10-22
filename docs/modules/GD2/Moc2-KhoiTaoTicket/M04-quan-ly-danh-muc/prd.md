# PHÂN HỆ: M04 — QUẢN LÝ DANH MỤC HỖ TRỢ (CATEGORY MANAGEMENT)

## [FR-M04-01] Admin quản lý danh mục hỗ trợ chung của toàn trường

**Mô tả:** Admin thiết lập, thêm mới, chỉnh sửa thông tin hoặc ẩn/hiện các danh mục hỗ trợ cấp trường và danh mục định tuyến dùng chung.

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã danh mục:** Bắt buộc, Duy nhất, 2-6 ký tự in hoa (VD: `DT`, `CTSV`, `IT`, `OTHER`).
- **Tên danh mục:** Bắt buộc, Max 100 ký tự (VD: Xác nhận sinh viên, Bảng điểm, Hỗ trợ tài khoản).
- **Phòng ban tiếp nhận mặc định:** Bắt buộc, liên kết tới Phòng ban chuyên trách xử lý.
- **Thời hạn cam kết xử lý SLA (giờ):** Bắt buộc, số nguyên dương (VD: 24, 48, 72 giờ).
- **Trạng thái hiển thị:** Bật (`true`) / Tắt (`false`). Mặc định: `true`.

**Luồng chính (Main Flow):**

1. Admin truy cập mục “Danh mục hỗ trợ toàn trường”.
2. Hệ thống hiển thị bảng danh mục dịch vụ cấp trường hiện có.
3. Admin chọn “Thêm danh mục mới” hoặc nhấp sửa danh mục hiện hành.
4. Nhập Mã danh mục, Tên dịch vụ, chọn Phòng ban phụ trách và thời gian SLA tiêu chuẩn.
5. Quản lý danh mục đặc biệt (Danh mục "Khác" dùng để điều phối luồng ngoại lệ).
6. Bấm “Lưu”. Hệ thống kiểm tra trùng lặp và lưu vào CSDL.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Danh mục bị tắt hiển thị (`false`) sẽ không xuất hiện trên form tạo Ticket mới của Sinh viên nhưng dữ liệu trên các Ticket cũ vẫn được giữ nguyên vẹn.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin tạo danh mục mới thành công $\rightarrow$ Danh mục này hiển thị cho Sinh viên lựa chọn khi gửi Ticket.
* **AC-02:** Trùng Mã danh mục $\rightarrow$ Báo lỗi và không cho phép lưu.

---

## [FR-M04-02] Trưởng phòng quản lý danh mục hỗ trợ riêng của phòng ban

**Mô tả:** Trưởng phòng (Quản lý) chủ động thêm mới, cập nhật mô tả hướng dẫn hồ sơ và thời hạn SLA cho các danh mục thủ tục chuyên môn nội bộ thuộc phòng ban mình phụ trách.

**Actor:** Quản lý phòng ban (Trưởng phòng)

**Preconditions (Điều kiện tiên quyết):** Tài khoản vai trò Quản lý đã được gắn đúng Phòng ban trực thuộc.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Tên danh mục dịch vụ:** Bắt buộc, Max 150 ký tự.
- **Hướng dẫn hồ sơ / Giấy tờ cần chuẩn bị:** Tùy chọn, văn bản hướng dẫn sinh viên.
- **Thời hạn xử lý tiêu chuẩn SLA (giờ):** Bắt buộc, số giờ cam kết.
- **Trạng thái kích hoạt:** Bật/Tắt hiển thị.

**Luồng chính (Main Flow):**

1. Trưởng phòng mở menu “Danh mục phòng ban”.
2. Hệ thống chỉ tải các danh mục thuộc quyền sở hữu của phòng ban đó (Data Isolation).
3. Trưởng phòng chọn “Thêm mới danh mục dịch vụ”, nhập tên thủ tục, mô tả hướng dẫn sinh viên chuẩn bị giấy tờ và cấu hình thời hạn SLA.
4. Bấm Lưu thiết lập.
5. Khi kích hoạt, danh mục dịch vụ này sẽ tự động xuất hiện trên Form tạo Ticket của Sinh viên dưới nhóm tên của phòng ban đó.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Phân tách dữ liệu):** Trưởng phòng chỉ quản lý danh mục nội bộ của phòng mình, không nhìn thấy hoặc sửa đổi được danh mục của phòng ban khác hay danh mục toàn trường của Admin.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Trưởng phòng tạo danh mục chuyên môn thành công $\rightarrow$ Sinh viên chọn phòng ban này sẽ nhìn thấy danh mục và hướng dẫn giấy tờ tương ứng.

---
