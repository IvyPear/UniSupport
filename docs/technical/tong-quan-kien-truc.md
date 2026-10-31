# THIẾT KẾ KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE) - UNISUPPORT

---

## 1. Tổng Quan Kiến Trúc (Architecture Overview)

Hệ thống **UniSupport** được thiết kế theo mô hình **Phân tầng (Layered / Tiered Architecture)**, phục vụ 4 vai trò đã chốt: Sinh viên, Nhân viên, Quản lý và Admin. Hệ thống bảo vệ dữ liệu và phân tách phạm vi truy cập theo vai trò/phòng ban.

---

## 2. Chi Tiết Các Tầng Công Nghệ (Technology Stack)

### 2.1 Front-End Layer

* **Công nghệ:** React.js / Next.js / HTML5 / CSS3 / JavaScript (ES6+).
* **Giao diện:** Responsive Design (hỗ trợ hoàn hảo trên Desktop, Tablet và Mobile browser).
* **State Management:** Redux Toolkit / React Query (Quản lý cache và đồng bộ dữ liệu API thời gian thực).

### 2.2 API & Business Layer

* **Công nghệ:** Node.js (Express / NestJS) hoặc Python (FastAPI) / Java (Spring Boot).
* **Mô hình kiến trúc:** RESTful API chuẩn hóa JSON response.
* **Định tuyến & Xử lý:** Routing Engine tự động đọc cấu hình danh mục để phân bổ ticket đến đúng phòng ban hoặc tài khoản Admin.

### 2.3 Persistence & Infrastructure Layer

* **Cơ sở dữ liệu:** PostgreSQL 15+ (Lưu trữ dữ liệu quan hệ, giao dịch Ticket, tài khoản, ma trận quyền, nhật ký và thông báo In-app).
* **Bộ nhớ đệm & Hàng đợi (Cache & Message Queue):** Redis (Lưu phiên làm việc, Cache danh mục, hàng đợi bắn Notification).
* **Lưu trữ tệp đính kèm:** S3 Compatible Storage hoặc thư mục đĩa cục bộ bảo mật (`/uploads/tickets/`).

---

## 3. Quy Tắc Bảo Mật & Yêu Cầu Phi Chức Năng (NFR)

### 3.1 Bảo mật & Xác thực (Security & Authentication)

* **JWT (JSON Web Token):** Xác thực người dùng bằng Token ngẫu nhiên mã hóa HS256/RS256, thời hạn 8 tiếng.
* **RBAC (Role-Based Access Control):** 4 mã vai trò cố định `STUDENT`, `STAFF`, `MANAGER`, `ADMIN`; Admin được cấu hình bật/tắt quyền chức năng theo M02. Backend kiểm tra ma trận quyền hiện hành và phạm vi dữ liệu ở từng yêu cầu, không dựa riêng vào quyền cũ trong JWT.
* **Cơ chế Closed-Loop (Hệ thống đóng):**
  * Không có endpoint/giao diện cho đăng ký tự do (`No Self-Registration`).
  * Mọi tài khoản do Admin khởi tạo thủ công hoặc Import Excel/CSV; không có đăng ký tự do.
  * Đăng nhập bằng mã định danh (`user_code`) và mật khẩu; OTP khôi phục qua Email chỉ áp dụng cho Admin. Khi Admin reset mật khẩu người dùng, hệ thống bắt buộc người dùng đổi mật khẩu ở lần đăng nhập tiếp theo.
* **Khóa tài khoản tự động (Brute-force protection):** Nhập sai mật khẩu 5 lần liên tiếp sẽ tạm khóa tài khoản trong 15 phút.

### 3.2 Tải & Hiệu năng (Performance & SLA)

* **Thời gian phản hồi API (Latency):**
  * Đăng nhập / Tìm kiếm ticket / Gửi đơn: $< 500\text{ms}$.
  * Báo cáo thống kê tổng hợp: $< 2000\text{ms}$.
* **Giới hạn tệp đính kèm (File Attachment Limits):**
  * Tối đa $5\text{MB}$ / tệp đính kèm.
  * Chỉ chấp nhận định dạng đã chốt trong PRD: `.pdf`, `.docx`, `.png`, `.jpg`.
  * Kiểm tra MIME-type phía Server để chặn tệp thực thi độc hại (`.exe`, `.sh`, `.bat`, `.php`).

### 3.3 Toàn vẹn dữ liệu (Data Integrity Constraints)

* **Trạng thái Closed khóa vĩnh viễn (No Reopen):** Khi Ticket chuyển sang `CLOSED`, Database áp dụng Trigger / Constraint ngăn chặn mọi câu lệnh `UPDATE` vào nội dung và kết quả ticket.
* **Ràng buộc hoàn tất:** Cập nhật trạng thái `RESOLVED` bắt buộc phải kèm theo văn bản giải trình kết quả xử lý (`resolution_notes IS NOT NULL AND resolution_notes != ''`).
* **Luồng danh mục "Khác":** Ticket `NEW` trong hàng chờ Admin được phép chưa có phòng ban. Admin xác định phòng ban trước khi đưa về hàng chờ nhân viên; việc định tuyến lại không thay đổi mã Ticket.
* **Thông báo:** Lưu trạng thái thông báo In-app và người nhận trong PostgreSQL, tránh gửi hai thông báo trùng nhau cho cùng sự kiện trả kết quả M08/M10.
