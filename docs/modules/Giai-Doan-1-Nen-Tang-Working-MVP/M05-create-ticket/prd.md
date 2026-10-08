# PHÂN HỆ: M05 — KHỞI TẠO TICKET — SINH VIÊN (CREATE TICKET)

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Actor chính:** Sinh viên  

---

## [FR-M05-01] Chọn phòng ban, danh mục hoặc “Khác”
* **Mô tả:** Sinh viên chọn đơn vị cần hỗ trợ và loại danh mục thủ tục hành chính cụ thể hoặc chọn danh mục "Khác".
* **Actor:** Sinh viên
* **Preconditions:** Sinh viên đã đăng nhập thành công.
* **Trường dữ liệu (Data Fields):**
  * `department_id`: Integer (Bắt buộc hoặc Null nếu chọn "Khác")
  * `category_id`: Integer (Bắt buộc, Mã danh mục cụ thể hoặc ID đặc biệt của mục "Khác")
* **Main Flow:**
  1. Sinh viên bấm “Tạo yêu cầu mới”.
  2. Giao diện hiển thị cây danh mục hỗ trợ phân theo Phòng ban.
  3. Sinh viên chọn Phòng ban $\rightarrow$ Chọn Danh mục tương ứng.
  4. Hoặc nếu không biết rõ đơn vị, Sinh viên chọn danh mục “Khác”.
* **Business Rules (BR):**
  * **BR-01:** Đơn chọn danh mục “Khác” sẽ được chuyển về Hàng chờ của Admin để phân loại định tuyến.
* **Acceptance Criteria (AC):**
  * **AC-01:** Chọn đúng phòng ban/danh mục $\rightarrow$ Form tải đúng thông tin hướng dẫn dịch vụ.

---

## [FR-M05-02] Nhập thông tin, đính kèm file và gửi Ticket
* **Mô tả:** Sinh viên điền chi tiết nội dung yêu cầu, đính kèm tệp minh chứng và gửi đơn lên hệ thống.
* **Actor:** Sinh viên
* **Preconditions:** Đã chọn danh mục ở FR-M05-01.
* **Trường dữ liệu (Data Fields):**
  * `ticket_code`: String (Hệ thống tự động sinh: `[CAT]-[YYYYMMDD]-[SEQ]`, VD: `AC-20261005-0042`)
  * `title`: String (Bắt buộc, Max 150 ký tự, Tiêu đề tóm tắt yêu cầu)
  * `description`: Text (Bắt buộc, Min 10 ký tự, Nội dung trình bày chi tiết)
  * `attachments`: Array of Files (Tùy chọn, Max 5 file, Dung lượng Max 5MB/file: `.png`, `.jpg`, `.pdf`, `.docx`)
  * `student_id`: Integer (Khóa ngoại tới tài khoản Sinh viên tạo đơn)
  * `initial_status`: Enum (`NEW`)
* **Main Flow:**
  1. Nhập Tiêu đề (tối đa 150 ký tự) và Nội dung chi tiết.
  2. Đính kèm tệp tin (ảnh, PDF, docx - tối đa 5MB/file) nếu có.
  3. Bấm “Gửi yêu cầu”.
  4. Hệ thống kiểm tra dữ liệu đầu vào.
  5. Tự động sinh mã Ticket duy nhất: `[CAT]-[YYYYMMDD]-[SEQ]`.
  6. Lưu vào CSDL với trạng thái khởi tạo `New` (Chưa tiếp nhận).
  7. Hiển thị mã đơn và thông báo tạo thành công.
* **Business Rules (BR):**
  * **BR-01:** Tiêu đề và Nội dung là trường bắt buộc không được bỏ trống.
  * **BR-02:** Tệp đính kèm vượt quá 5MB hoặc sai định dạng sẽ bị từ chối.
* **Alternative / Error Flows:**
  * Bỏ trống tiêu đề hoặc nội dung $\rightarrow$ Hệ thống cảnh báo đỏ tại chỗ và không cho gửi.
* **Acceptance Criteria (AC):**
  * **AC-01:** Nhập đủ thông tin và gửi thành công $\rightarrow$ Sinh mã Ticket chuẩn, lưu trạng thái `New` trong Database thật.
  * **AC-02:** Đính kèm file > 5MB $\rightarrow$ Hệ thống hiển thị thông báo vượt dung lượng cho phép.
