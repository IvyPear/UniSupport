# PHÂN HỆ: M05 — TẠO FORM TICKET (CREATE TICKET)

## [FR-M05-01] Chọn phòng ban, danh mục hoặc "Khác"

**Mô tả:** Sinh viên chọn đơn vị tiếp nhận và loại danh mục thủ tục hành chính cụ thể hoặc chọn danh mục "Khác" nếu không rõ đơn vị phụ trách.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Sinh viên đã đăng nhập thành công vào hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban tiếp nhận:** Bắt buộc (chọn trong danh sách Phòng ban) hoặc chưa xác định nếu chọn mục "Khác".
- **Danh mục hỗ trợ:** Bắt buộc, ID danh mục cụ thể hoặc mã đặc biệt của mục "Khác".

**Luồng chính (Main Flow):**

1. Sinh viên nhấp nút “Tạo yêu cầu mới”.
2. Giao diện hiển thị cây danh mục thủ tục được nhóm trực quan theo từng Phòng ban.
3. Sinh viên chọn Phòng ban tiếp nhận $\rightarrow$ Chọn Danh mục thủ tục cụ thể.
4. Trường hợp không biết yêu cầu thuộc phòng ban nào, Sinh viên tích chọn mục “Khác”.
5. Hệ thống hiển thị phần mô tả hướng dẫn giấy tờ tương ứng với danh mục vừa chọn (nếu có).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Đơn chọn danh mục “Khác” sẽ được chuyển về Hàng chờ của Admin ở Module M11 để phân loại định tuyến.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chọn đúng phòng ban và danh mục $\rightarrow$ Form hiển thị đúng hướng dẫn thủ tục.
* **AC-02:** Chọn mục "Khác" $\rightarrow$ Cho phép tiếp tục bước nhập nội dung mà không bắt buộc chọn phòng ban.

---

## [FR-M05-02] Nhập thông tin, đính kèm file và gửi Ticket

**Mô tả:** Sinh viên điền chi tiết tiêu đề, nội dung yêu cầu, đính kèm tệp minh chứng và gửi Ticket lên hệ thống.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Đã hoàn tất bước chọn danh mục ở FR-M05-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Hệ thống tự động sinh theo quy chuẩn: `[CAT]-[YYYYMMDD]-[SEQ]` (VD: `IT-20261022-0042`).
- **Tiêu đề yêu cầu:** Bắt buộc, Min 5 - Max 150 ký tự.
- **Nội dung chi tiết:** Bắt buộc, Min 10 ký tự, mô tả rõ vấn đề cần hỗ trợ.
- **Tệp đính kèm:** Tùy chọn, tối đa 5 file, dung lượng tối đa 5MB/file (định dạng: `.png`, `.jpg`, `.pdf`, `.docx`).
- **Trạng thái khởi tạo:** `Chưa tiếp nhận` (`New`).

**Luồng chính (Main Flow):**

1. Sinh viên nhập Tiêu đề và Nội dung chi tiết yêu cầu.
2. Sinh viên tải lên các tệp đính kèm minh chứng (nếu có).
3. Nhấn nút “Gửi Ticket”.
4. Hệ thống kiểm tra tính hợp lệ của dữ liệu đầu vào và dung lượng file.
5. Hệ thống tự động sinh Mã Ticket chuẩn duy nhất.
6. Lưu Ticket vào CSDL với trạng thái ban đầu là `Chưa tiếp nhận` (`New`).
7. Tự động đưa đơn vào Hàng chờ tiếp nhận của Phòng ban chuyên trách (hoặc Hàng chờ Admin nếu là mục "Khác").
8. Hiển thị thông báo gửi đơn thành công kèm Mã Ticket cho sinh viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tiêu đề và Nội dung là trường bắt buộc, không được để trống.
* **BR-02:** Tệp vượt quá 5MB hoặc không đúng định dạng cho phép sẽ bị chặn và cảnh báo tại chỗ.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ thông tin hợp lệ và gửi thành công $\rightarrow$ Sinh đúng Mã Ticket, lưu trạng thái Chưa tiếp nhận và chuyển vào hàng chờ.
* **AC-02:** File đính kèm > 5MB hoặc sai định dạng $\rightarrow$ Hệ thống hiển thị cảnh báo lỗi và không cho gửi.

---
