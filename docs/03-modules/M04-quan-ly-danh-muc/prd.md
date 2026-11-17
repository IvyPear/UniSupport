# PHÂN HỆ: M04 — QUẢN LÝ DANH MỤC HỖ TRỢ (CATEGORY MANAGEMENT)

## [FR-M04-01] Admin quản lý danh mục hỗ trợ chung của toàn trường

**Mô tả:** Admin thiết lập, thêm mới, chỉnh sửa thông tin hoặc ẩn/hiện các danh mục hỗ trợ cấp trường và danh mục định tuyến dùng chung.

**Priority:** High (Cấu hình danh mục hỗ trợ toàn trường và mốc thời gian cam kết SLA nền tảng).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã danh mục:** Bắt buộc, Duy nhất, 2-6 ký tự in hoa (VD: `DT`, `CTSV`, `IT`, `OTHER`).
- **Tên danh mục:** Bắt buộc, Max 100 ký tự (VD: Xác nhận sinh viên, Bảng điểm, Hỗ trợ tài khoản).
- **Phòng ban tiếp nhận mặc định:** Bắt buộc với danh mục thông thường; riêng danh mục hệ thống "Khác" chưa xác định phòng ban để Admin phân loại.
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
* **BR-02:** Danh mục "Khác" dùng riêng cho hàng chờ Admin. Mã danh mục là duy nhất và được dùng khi tạo mã Ticket; mã Ticket đã sinh không thay đổi nếu danh mục được phân loại lại.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Trùng Mã danh mục hoặc sai định dạng mã):** Nhập Mã danh mục đã tồn tại hoặc không đúng chuẩn 2–6 ký tự in hoa $\rightarrow$ Hệ thống từ chối lưu (`409 Conflict` / `422 Unprocessable Entity`) và báo lỗi (`BR-02`).
* **E-02 (Thời hạn SLA không hợp lệ):** Nhập thời hạn cam kết xử lý SLA $\le 0$ hoặc bỏ trống phòng ban phụ trách đối với danh mục thường $\rightarrow$ Hệ thống báo lỗi validation tại chỗ.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin tạo danh mục mới thành công $\rightarrow$ Danh mục này hiển thị cho Sinh viên lựa chọn khi gửi Ticket.
* **AC-02:** Trùng Mã danh mục (`BR-02`, `E-01`) trả về `409 Conflict`; sai quy chuẩn mã 2–6 ký tự in hoa hoặc thời hạn SLA $\le 0$ (`E-02`) trả về `422 Unprocessable Entity` và không cho phép lưu.
* **AC-03:** Khi Admin chuyển trạng thái hiển thị của danh mục sang Tắt (`false`) $\rightarrow$ Danh mục này lập tức bị ẩn khỏi Form tạo Ticket mới của Sinh viên, nhưng các Ticket cũ thuộc danh mục này vẫn hiển thị tên danh mục và dữ liệu lịch sử bình thường (`BR-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Ticket `IT-20261022-0042` được tạo khi danh mục `IT` đang bật; sau đó Admin tắt hiển thị danh mục `IT` hoặc điều phối đơn sang danh mục khác $\rightarrow$ Mã Ticket `IT-20261022-0042` và lịch sử ban đầu vẫn giữ nguyên không đổi (`BR-02`).

---

## [FR-M04-02] Trưởng phòng quản lý danh mục hỗ trợ riêng của phòng ban

**Mô tả:** Trưởng phòng (Quản lý) chủ động thêm mới, cập nhật mô tả hướng dẫn hồ sơ và thời hạn SLA cho các danh mục thủ tục chuyên môn nội bộ thuộc phòng ban mình phụ trách.

**Priority:** High (Cho phép trưởng phòng tự quản danh mục chuyên môn và cấu hình SLA đặc thù của phòng ban).

**Actor:** Quản lý phòng ban (Trưởng phòng)

**Preconditions (Điều kiện tiên quyết):** Tài khoản vai trò Quản lý đã được gắn đúng Phòng ban trực thuộc.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Tên danh mục dịch vụ:** Bắt buộc, Max 150 ký tự.
- **Mã danh mục:** Bắt buộc, 2–6 ký tự in hoa và duy nhất như quy định danh mục chung ở FR-M04-01.
- **Hướng dẫn hồ sơ / Giấy tờ cần chuẩn bị:** Tùy chọn, văn bản hướng dẫn sinh viên.
- **Thời hạn xử lý tiêu chuẩn SLA (giờ):** Bắt buộc, số giờ cam kết.
- **Trạng thái kích hoạt:** Bật/Tắt hiển thị.

**Luồng chính (Main Flow):**

1. Trưởng phòng mở menu “Danh mục phòng ban”.
2. Hệ thống chỉ tải các danh mục thuộc quyền sở hữu của phòng ban đó (Data Isolation).
3. Trưởng phòng chọn “Thêm mới danh mục dịch vụ”, nhập mã, tên thủ tục, mô tả hướng dẫn sinh viên chuẩn bị giấy tờ và cấu hình thời hạn SLA.
4. Bấm Lưu thiết lập.
5. Khi kích hoạt, danh mục dịch vụ này sẽ tự động xuất hiện trên Form tạo Ticket của Sinh viên dưới nhóm tên của phòng ban đó.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Phân tách dữ liệu):** Trưởng phòng chỉ quản lý danh mục nội bộ của phòng mình, không nhìn thấy hoặc sửa đổi được danh mục của phòng ban khác hay danh mục toàn trường của Admin.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Can thiệp danh mục của phòng ban khác):** Trưởng phòng gọi API sửa/ẩn danh mục không thuộc `department_id` của mình $\rightarrow$ Backend chặn yêu cầu với mã `403 Forbidden` (`BR-01`).
* **E-02 (Trùng Mã danh mục hoặc thiếu trường bắt buộc):** Nhập Mã danh mục đã tồn tại trên hệ thống hoặc để trống Tên danh mục / SLA $\rightarrow$ Báo lỗi `409 Conflict` hoặc `422 Unprocessable Entity`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Trưởng phòng tạo/cập nhật danh mục chuyên môn của phòng mình thành công $\rightarrow$ Sinh viên chọn phòng ban này sẽ nhìn thấy danh mục và hướng dẫn giấy tờ tương ứng; hệ thống chặn (`403 Forbidden`) mọi thao tác xem/sửa danh mục của phòng ban khác (`BR-01`, `E-01`, `E-02`).

**Ví dụ Edge Case (Trường hợp biên):**

* Trưởng phòng Đào tạo đặt mã danh mục mới trùng với mã đã tồn tại của phòng Công tác Sinh viên $\rightarrow$ Hệ thống từ chối lưu và thông báo mã danh mục đã được sử dụng trên hệ thống.

---
