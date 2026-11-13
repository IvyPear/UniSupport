# YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

> **Dự án:** UniSupport – Hệ thống quản lý hỗ trợ sinh viên  
> **Phiên bản:** 2.0 (Đồng bộ mã NFR, Ngưỡng đo kiểm và Quy tắc xác thực đóng)

---

## 1. BẢNG TỔNG HỢP YÊU CẦU PHI CHỨC NĂNG (NFR MATRIX)

| Mã NFR | Nhóm yêu cầu | Tiêu chí kỹ thuật | Ngưỡng cam kết (Threshold) | Phương pháp / Công cụ đo kiểm |
|:---:|---|---|---|---|
| **`NFR-SEC-01`** | **Bảo mật** | Mã hóa phiên làm việc | JWT (HS256/RS256), thời hạn token tối đa 8 tiếng | Kiểm tra cấu hình Token Header & Expiration |
| **`NFR-SEC-02`** | **Bảo mật** | Chống dò quét mật khẩu (Brute-force) | Nhập sai liên tiếp 5 lần $\rightarrow$ Khóa tạm thời 15 phút | Kiểm thử tự động với script gửi 6 request sai |
| **`NFR-SEC-03`** | **Bảo mật** | Cơ chế hệ thống đóng (Closed-Loop) | Không có nút Đăng ký; mật khẩu mặc định là ngày sinh (`DDMMYYYY`); không dùng OTP | Rà soát giao diện và kiểm thử API không cho phép tự đăng ký |
| **`NFR-SEC-04`** | **Bảo mật** | Bắt buộc đổi mật khẩu lần đầu | Cờ `must_change_password = true` khi dùng mật khẩu mặc định hoặc sau khi Admin reset | Chặn điều hướng tới các trang khác khi chưa đổi mật khẩu |
| **`NFR-SEC-05`** | **Bảo mật** | Kiểm soát phân quyền dữ liệu (RBAC) | Kiểm tra quyền và phạm vi phòng ban tại Backend theo từng request | Gửi token Role khác để gọi API không thuộc quyền (kỳ vọng `403 Forbidden`) |
| **`NFR-PERF-01`** | **Hiệu năng** | Thời gian phản hồi API thông thường | Độ trễ API $\le$ 500ms (đăng nhập, tìm kiếm, gửi ticket) ở tải bình thường | Postman / k6 đo lường độ trễ mạng nội bộ |
| **`NFR-PERF-02`** | **Hiệu năng** | Thời gian phản hồi báo cáo tổng hợp | Độ trễ xử lý $\le$ 2.000ms (2 giây) đối với Dashboard và xuất báo cáo | Đo thời gian phản hồi API thống kê dưới tải 50 người dùng đồng thời |
| **`NFR-PERF-03`** | **Hiệu năng** | Giới hạn tệp tin đính kèm | Tối đa 5 file/ticket, dung lượng $\le$ 5MB/file; chỉ nhận `.pdf`, `.docx`, `.png`, `.jpg` | Thử tải lên file 5.2MB hoặc file script thực thi (`.exe`, `.bat`) |
| **`NFR-INT-01`** | **Toàn vẹn dữ liệu** | Bất biến trạng thái đơn đã đóng | Ticket ở trạng thái `CLOSED` không được phép chỉnh sửa (`No Reopen`) | Gọi API `PUT/PATCH` cập nhật ticket đã đóng (kỳ vọng `400 Bad Request`) |
| **`NFR-INT-02`** | **Toàn vẹn dữ liệu** | Ràng buộc hoàn tất đơn | Bắt buộc có `resolution_notes` (Min 10 ký tự) khi chuyển sang `RESOLVED` | Gửi request hoàn tất không có ghi chú (kỳ vọng `422 Unprocessable Entity`) |
| **`NFR-INT-03`** | **Toàn vẹn dữ liệu** | Kiểm soát xung đột tương tranh | Chặn 2 nhân viên cùng nhận 1 đơn tại cùng thời điểm (Race Condition) | Gửi 2 request claim đồng thời (1 thành công `200`, 1 bị chặn `409 Conflict`) |
| **`NFR-AVAIL-01`** | **Tính sẵn sàng** | Thời gian hoạt động hệ thống | Uptime $\ge$ 99% trong khung giờ hành chính (08:00 – 17:00 các ngày làm việc) | Nhật ký giám sát Server / Uptime Monitoring |

---

## 2. QUY TẮC BẢO MẬT VÀ XÁC THỰC CHI TIẾT

### 2.1. Xác thực và Phân quyền (`NFR-SEC-01`, `NFR-SEC-05`)
- **Xác thực phiên làm việc:**
  - Hệ thống sử dụng JSON Web Token (JWT) được mã hóa an toàn.
  - Thời hạn hiệu lực của Token là 8 tiếng (tương đương 1 ngày làm việc). Sau 8 tiếng không hoạt động hoặc khi đăng xuất, Token bị vô hiệu hóa.
- **Phân quyền theo vai trò (RBAC):**
  - Hệ thống áp dụng 4 vai trò cố định: `STUDENT`, `STAFF`, `MANAGER`, `ADMIN`.
  - Backend bắt buộc kiểm tra quyền hạn và phạm vi dữ liệu (`department_id`) độc lập trên từng API request, không phụ thuộc vào quyền cũ lưu tại client.

### 2.2. Cơ chế Hệ thống Đóng và Mật khẩu Khởi tạo (`NFR-SEC-03`, `NFR-SEC-04`)
- **Không tự đăng ký tài khoản:**
  - Tuyệt đối không hiển thị giao diện hoặc cung cấp API đăng ký cho người dùng tự do.
  - Toàn bộ danh sách tài khoản được Admin tạo từ danh sách sinh viên và cán bộ của trường.
- **Quy tắc mật khẩu mặc định (Ngày tháng năm sinh):**
  - Mật khẩu khởi tạo ban đầu cho Sinh viên, Nhân viên và Quản lý là ngày tháng năm sinh theo định dạng 8 chữ số: `DDMMYYYY` (Ví dụ: sinh ngày 15/09/2004 thì mật khẩu mặc định là `15092004`).
- **Không sử dụng OTP:**
  - Hệ thống **hoàn toàn không sử dụng cơ chế mã xác thực OTP** qua Email hay SMS để tránh phụ thuộc bên thứ ba và giảm chi phí hạ tầng.
  - Nếu người dùng quên mật khẩu, họ liên hệ trực tiếp phòng IT/Admin nhà trường. Admin sẽ kiểm tra định danh và thực hiện đặt lại mật khẩu về mặc định (ngày sinh) trên phân hệ `M03`.
- **Bắt buộc đổi mật khẩu lần đầu (`NFR-SEC-04`):**
  - Tài khoản đăng nhập bằng mật khẩu mặc định (hoặc vừa được Admin reset) sẽ mang cờ `must_change_password = true`.
  - Hệ thống lập tức điều hướng người dùng tới màn hình đổi mật khẩu mới (yêu cầu tối thiểu 6 ký tự). Người dùng không thể truy cập bất kỳ chức năng nào khác trước khi hoàn tất bước này.

### 2.3. Phòng chống tấn công dò quét mật khẩu (`NFR-SEC-02`)
- Hệ thống áp dụng bộ đếm số lần đăng nhập sai (`failed_attempts`):
  - Nhập sai mật khẩu liên tiếp 5 lần: Tài khoản tự động bị khóa tạm thời trong vòng **15 phút**.
  - Trong suốt thời gian khóa, mọi request đăng nhập (kể cả khi nhập đúng mật khẩu) đều bị từ chối với thông báo cảnh báo rõ ràng.
  - Đăng nhập thành công sẽ tự động reset bộ đếm `failed_attempts = 0`.

---

## 3. TẢI VÀ HIỆU NĂNG (PERFORMANCE & SLA)

### 3.1. Thời gian phản hồi (`NFR-PERF-01`, `NFR-PERF-02`)
- **Tác vụ tương tác thường nhật:** Đăng nhập, tra cứu ticket, tạo form yêu cầu, tiếp nhận đơn có thời gian phản hồi trung bình **dưới 500ms** trong điều kiện mạng tiêu chuẩn.
- **Tác vụ báo cáo tổng hợp:** Các truy vấn Dashboard trực quan, thống kê lưu lượng theo tháng toàn trường có thời gian phản hồi **dưới 2.000ms (2 giây)**, đồng nhất với cam kết kiểm thử hiệu năng trong Kế hoạch chất lượng ([QL-chat-luong.md](../08-project/QL-chat-luong.md)).

### 3.2. Giới hạn lưu trữ tệp đính kèm (`NFR-PERF-03`)
- Dung lượng tối đa: **5MB** cho mỗi tệp đính kèm; tối đa 5 file cho mỗi Ticket.
- Định dạng hợp lệ được kiểm tra nghiêm ngặt bằng MIME-type ở tầng Server: `.pdf`, `.docx`, `.png`, `.jpg`.
- Server tự động chặn và từ chối lưu trữ các tệp thực thi có nguy cơ gây hại (`.exe`, `.sh`, `.bat`, `.php`, `.zip`).

---

## 4. TOÀN VẸN DỮ LIỆU (DATA INTEGRITY CONSTRAINTS)

- **Bất biến trạng thái Ticket đã đóng (`NFR-INT-01`):** Khi Ticket chuyển sang `CLOSED`, CSDL áp dụng ràng buộc ngăn chặn mọi thao tác sửa đổi nội dung và kết quả xử lý.
- **Ràng buộc giải trình khi hoàn tất (`NFR-INT-02`):** Không cho phép hoàn tất đơn (`RESOLVED`) nếu trường ghi chú kết quả giải quyết (`resolution_notes`) để trống.
- **Kiểm soát tương tranh (`NFR-INT-03`):** Áp dụng Atomic Update (`UPDATE tickets SET assignee_id = ? WHERE id = ? AND assignee_id IS NULL`) tại tầng CSDL để đảm bảo chỉ có đúng 1 nhân viên tiếp nhận đơn thành công khi có nhiều người cùng bấm nhận.
