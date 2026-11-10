# YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

> **Dự án:** UniSupport – Hệ thống quản lý hỗ trợ sinh viên  
> **Nguồn:** Trích xuất từ tài liệu Kiến trúc Hệ thống

---

## 3. QUY TẮC BẢO MẬT VÀ YÊU CẦU PHI CHỨC NĂNG

### 3.1. Bảo mật và xác thực (Security & Authentication)

- **Xác thực bằng JWT (JSON Web Token):**
  - Sử dụng Token để xác thực người dùng, được mã hóa theo thuật toán HS256/RS256.
  - Thời hạn hiệu lực của Token là 8 tiếng.

- **Phân quyền theo vai trò (RBAC – Role-Based Access Control):**
  - Hệ thống có 4 vai trò cố định: `STUDENT`, `STAFF`, `MANAGER`, `ADMIN`.
  - Admin có quyền cấu hình bật/tắt các chức năng theo yêu cầu M02.
  - Backend kiểm tra ma trận quyền hiện tại và phạm vi dữ liệu trong từng yêu cầu, không chỉ dựa vào quyền cũ được lưu trong JWT.

- **Cơ chế hệ thống đóng (Closed-Loop):**
  - Không cung cấp chức năng hoặc giao diện cho phép người dùng tự đăng ký tài khoản.
  - Tất cả tài khoản được Admin tạo thủ công hoặc nhập hàng loạt bằng file Excel/CSV.
  - Người dùng đăng nhập bằng mã định danh (`user_code`) và mật khẩu.
  - Chức năng khôi phục mật khẩu bằng OTP qua Email chỉ áp dụng cho Admin.
  - Khi Admin đặt lại mật khẩu cho người dùng, hệ thống bắt buộc người dùng đổi mật khẩu ở lần đăng nhập tiếp theo.

- **Tự động khóa tài khoản (Brute-force Protection):**
  - Khi người dùng nhập sai mật khẩu 5 lần liên tiếp, tài khoản sẽ bị khóa tạm thời trong 15 phút.

### 3.2. Tải và hiệu năng (Performance & SLA)

- **Thời gian phản hồi API (Latency):**
  - Đăng nhập, tìm kiếm Ticket và gửi đơn: dưới 500ms.
  - Báo cáo thống kê tổng hợp: dưới 2000ms.

- **Giới hạn tệp đính kèm (File Attachment Limits):**
  - Dung lượng tối đa: 5MB cho mỗi tệp đính kèm.
  - Chỉ chấp nhận các định dạng được quy định trong tài liệu PRD:
    - `.pdf`
    - `.docx`
    - `.png`
    - `.jpg`
  - Server kiểm tra loại tệp (MIME-type) để ngăn chặn các tệp thực thi có khả năng gây hại như `.exe`, `.sh`, `.bat`, `.php`.

### 3.3. Toàn vẹn dữ liệu (Data Integrity Constraints)

- **Khóa vĩnh viễn Ticket đã đóng (No Reopen):**
  - Khi Ticket chuyển sang trạng thái `CLOSED`, Database áp dụng Trigger/Constraint để ngăn chặn mọi lệnh `UPDATE` làm thay đổi nội dung và kết quả xử lý của Ticket.

- **Ràng buộc khi hoàn tất Ticket:**
  - Khi cập nhật trạng thái Ticket thành `RESOLVED`, hệ thống bắt buộc phải có nội dung giải trình kết quả xử lý (`resolution_notes`).
  - Trường này không được để trống hoặc có giá trị `NULL`.

- **Luồng xử lý danh mục "Khác":**
  - Ticket ở trạng thái `NEW` trong hàng chờ Admin được phép chưa có phòng ban phụ trách.
  - Admin phải xác định phòng ban trước khi chuyển Ticket vào hàng chờ nhân viên.
  - Việc phân tuyến lại Ticket không làm thay đổi mã Ticket.

- **Thông báo:**
  - Lưu trạng thái thông báo trong ứng dụng (In-app) và thông tin người nhận trong PostgreSQL.
  - Đảm bảo không gửi hai thông báo trùng lặp cho cùng một sự kiện, theo yêu cầu M08/M10.