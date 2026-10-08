# PHÂN HỆ: M05 — KHỞI TẠO TICKET — SINH VIÊN (CREATE TICKET)

## [FR-M05-01] Chọn phòng ban, danh mục hoặc “Khác”

**Mô tả:** Sinh viên chọn đơn vị cần hỗ trợ và loại danh mục thủ tục hành chính cụ thể hoặc chọn danh mục "Khác".

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Sinh viên đã đăng nhập thành công.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban:** Bắt buộc hoặc chưa xác định nếu chọn "Khác".
- **Danh mục hỗ trợ:** Bắt buộc, Mã danh mục cụ thể hoặc ID đặc biệt của mục "Khác".

**Luồng chính (Main Flow):**

1. Sinh viên bấm “Tạo yêu cầu mới”.
2. Giao diện hiển thị cây danh mục hỗ trợ phân theo Phòng ban.
3. Sinh viên chọn Phòng ban → Chọn Danh mục tương ứng.
4. Hoặc nếu không biết rõ đơn vị, Sinh viên chọn danh mục “Khác”.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Đơn chọn danh mục “Khác” sẽ được chuyển về Hàng chờ của Admin để phân loại định tuyến.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chọn đúng phòng ban/danh mục → Form tải đúng thông tin hướng dẫn dịch vụ.

## [FR-M05-02] Nhập thông tin, đính kèm file và gửi Ticket

**Mô tả:** Sinh viên điền chi tiết nội dung yêu cầu, đính kèm tệp minh chứng và gửi đơn lên hệ thống.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Đã chọn danh mục ở FR-M05-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Hệ thống tự động sinh: [CAT]-[YYYYMMDD]-[SEQ], VD: AC-20261005-0042.
- **Tiêu đề:** Bắt buộc, Max 150 ký tự, Tiêu đề tóm tắt yêu cầu.
- **Mô tả vấn đề:** Bắt buộc, Min 10 ký tự, Nội dung trình bày chi tiết.
- **Tệp đính kèm:** Tùy chọn, Max 5 file, Dung lượng Max 5MB/file: .png, .jpg, .pdf, .docx.
- **Sinh viên gửi yêu cầu:** Khóa ngoại tới tài khoản Sinh viên tạo đơn.
- **Trạng thái ban đầu:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Nhập Tiêu đề (tối đa 150 ký tự) và Nội dung chi tiết.
2. Đính kèm tệp tin (ảnh, PDF, docx - tối đa 5MB/file) nếu có.
3. Bấm “Gửi yêu cầu”.
4. Hệ thống kiểm tra dữ liệu đầu vào.
5. Tự động sinh mã Ticket duy nhất: [CAT]-[YYYYMMDD]-[SEQ].
6. Lưu vào hệ thống với trạng thái khởi tạo Chưa tiếp nhận (Chưa tiếp nhận).
7. Hiển thị mã đơn và thông báo tạo thành công.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tiêu đề và Nội dung là trường bắt buộc không được bỏ trống.
* **BR-02:** Tệp đính kèm vượt quá 5MB hoặc sai định dạng sẽ bị từ chối.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Bỏ trống tiêu đề hoặc nội dung → Hệ thống cảnh báo đỏ tại chỗ và không cho gửi.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ thông tin và gửi thành công → Sinh mã Ticket chuẩn, lưu trạng thái Chưa tiếp nhận trong hệ thống.
* **AC-02:** Đính kèm file > 5MB → Hệ thống hiển thị thông báo vượt dung lượng cho phép.

---
