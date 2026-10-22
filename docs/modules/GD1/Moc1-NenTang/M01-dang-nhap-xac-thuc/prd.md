# PHÂN HỆ: M01 — ĐĂNG NHẬP & XÁC THỰC (AUTH)

## [FR-M01-01] Đăng nhập vào hệ thống

**Mô tả:** Tất cả các vai trò (Sinh viên, Nhân viên, Quản lý, Admin) thực hiện đăng nhập vào hệ thống bằng mã số định danh và mật khẩu cá nhân.

**Actor:** Sinh viên, Nhân viên, Quản lý, Admin

**Preconditions (Điều kiện tiên quyết):** Người dùng đã được cấp tài khoản hợp lệ trong hệ thống UniSupport và tài khoản ở trạng thái `Active`.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã định danh:** Bắt buộc, Max 20 ký tự (Mã SV / Mã Cán bộ / Mã Quản trị).
- **Mật khẩu:** Bắt buộc, Min 6 - Max 100 ký tự.
- **Ghi nhớ đăng nhập:** Tùy chọn, Mặc định: `false`.

**Luồng chính (Main Flow):**

1. Người dùng truy cập trang Đăng nhập UniSupport.
2. Nhập Mã định danh và Mật khẩu.
3. Nhấn nút “Đăng nhập”.
4. Hệ thống kiểm tra thông tin xác thực và trạng thái hoạt động của tài khoản.
5. Nếu thông tin hợp lệ, hệ thống cấp mã phiên làm việc (JWT Token) và chuyển người dùng vào trang hệ thống.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Hệ thống đóng):** Tài khoản được nhà trường khởi tạo sẵn, hệ thống tuyệt đối không hiển thị chức năng hoặc nút “Đăng ký”.
* **BR-02 (Mật khẩu mặc định):** Sinh viên và Nhân viên sử dụng tài khoản được cấp và không có chức năng tự quên mật khẩu. Nếu gặp sự cố, người dùng liên hệ phòng IT/Admin để được hỗ trợ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Nhập sai mã định danh hoặc mật khẩu $\rightarrow$ Hệ thống hiển thị thông báo *“Sai thông tin đăng nhập”*.
* Bỏ trống trường bắt buộc $\rightarrow$ Báo lỗi tại chỗ và không gửi yêu cầu.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đúng mã định danh và mật khẩu $\rightarrow$ Đăng nhập thành công.
* **AC-02:** Nhập sai thông tin $\rightarrow$ Báo lỗi rõ ràng và không cho phép đăng nhập.
* **AC-03:** Màn hình Đăng nhập không có nút “Đăng ký” cho người dùng vãng lai.

---

## [FR-M01-02] Khóa tài khoản 15 phút khi nhập sai mật khẩu 5 lần liên tiếp

**Mô tả:** Hệ thống tự động ghi nhận số lần đăng nhập thất bại liên tiếp và tạm khóa tài khoản để phòng chống tấn công dò mật khẩu (Brute-force).

**Actor:** Hệ thống (Security Mechanism)

**Preconditions (Điều kiện tiên quyết):** Người dùng thực hiện đăng nhập trên trang Đăng nhập.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã định danh:** Tài khoản đăng nhập.
- **Bộ đếm đăng nhập sai (failed_attempts):** Số nguyên, mặc định 0.
- **Thời điểm mở khóa (lockout_until):** Mốc thời gian hệ thống tự động gỡ khóa.

**Luồng chính (Main Flow):**

1. Người dùng nhập sai mật khẩu hoặc thông tin xác thực.
2. Hệ thống tăng bộ đếm số lần sai: `failed_attempts = failed_attempts + 1`.
3. Nếu `failed_attempts < 5`: Hiển thị cảnh báo số lần sai còn lại trước khi tài khoản bị khóa.
4. Khi `failed_attempts >= 5`:
   a. Hệ thống tự động khóa tài khoản tạm thời.
   b. Thiết lập thời gian khóa: `lockout_until = current_time + 15 phút`.
   c. Hiển thị thông báo: *“Tài khoản tạm thời bị khóa trong 15 phút do nhập sai quá 5 lần liên tiếp”*.
5. Sau 15 phút, hệ thống tự động gỡ bỏ trạng thái tạm khóa, reset `failed_attempts = 0` và cho phép đăng nhập lại bình thường.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Trong suốt thời gian 15 phút khóa tạm thời, mọi yêu cầu đăng nhập (dù nhập đúng mật khẩu) đều bị từ chối.
* **BR-02:** Nếu đăng nhập thành công ở bất kỳ lần nào trước mốc 5 lần sai, hệ thống lập tức reset `failed_attempts = 0`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập sai 5 lần liên tiếp $\rightarrow$ Tài khoản bị khóa 15 phút và hiển thị thông báo đếm ngược/cảnh báo rõ ràng.
* **AC-02:** Sau 15 phút $\rightarrow$ Tài khoản tự động mở khóa và đăng nhập lại được khi nhập đúng mật khẩu.

---

## [FR-M01-03] Lấy lại mật khẩu qua Email dành riêng cho Admin

**Mô tả:** Tài khoản vai trò Quản trị viên (Admin) yêu cầu cấp lại mật khẩu đăng nhập thông qua mã xác thực OTP gửi về Email quản trị chính thức.

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Tài khoản yêu cầu phải có vai trò Admin và đã cấu hình Email quản trị hợp lệ trong hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Email / Mã Admin:** Bắt buộc, Max 100 ký tự.
- **Mã OTP xác thực:** Bắt buộc, chuỗi 6 chữ số có hiệu lực 15 phút.
- **Mật khẩu mới:** Bắt buộc, Min 8 ký tự, gồm chữ hoa, chữ thường và chữ số.
- **Xác nhận mật khẩu:** Bắt buộc, trùng khớp với mật khẩu mới.

**Luồng chính (Main Flow):**

1. Tại giao diện Đăng nhập, Admin nhấp vào liên kết “Quên mật khẩu”.
2. Nhập Email hoặc Mã định danh Admin và nhấn “Gửi mã xác thực”.
3. Hệ thống kiểm tra quyền Admin, tạo mã OTP ngẫu nhiên và gửi về Email quản trị.
4. Admin kiểm tra hòm thư, nhập mã OTP vào màn hình xác thực.
5. Admin nhập Mật khẩu mới và Xác nhận mật khẩu mới, sau đó bấm “Đổi mật khẩu”.
6. Hệ thống kiểm tra OTP, cập nhật mật khẩu mã hóa mới vào CSDL và vô hiệu hóa mã OTP.
7. Hiển thị thông báo thành công và chuyển Admin về màn hình Đăng nhập.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chức năng này chỉ áp dụng duy nhất cho Role Admin. Sinh viên và Nhân viên không hiển thị nút Quên mật khẩu.
* **BR-02:** Mã OTP chỉ có hiệu lực trong 15 phút và chỉ được dùng 1 lần duy nhất.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin nhận được OTP qua Email và đổi mật khẩu thành công.
* **AC-02:** Mật khẩu mới có hiệu lực ngay lập tức.

---

## [FR-M01-04] Tự động chuyển trang phù hợp với quyền hạn sau khi đăng nhập

**Mô tả:** Hệ thống đọc vai trò người dùng từ phiên đăng nhập (JWT Payload) và tự động điều hướng tới Dashboard/Giao diện làm việc chuyên biệt theo đúng thẩm quyền.

**Actor:** Sinh viên, Nhân viên, Quản lý, Admin

**Preconditions (Điều kiện tiên quyết):** Đăng nhập thành công ở FR-M01-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Vai trò người dùng (Role):** `Student`, `Staff`, `Manager`, `Admin`.
- **Đường dẫn đích (Landing URL):** Tự động xác định theo Role.

**Luồng chính (Main Flow):**

1. Xác thực thông tin đăng nhập thành công.
2. Hệ thống kiểm tra vai trò người dùng và điều hướng tự động:
   - **Sinh viên (`Student`):** Chuyển đến màn hình Quản lý Yêu cầu của tôi.
   - **Nhân viên (`Staff`):** Chuyển đến Hộp thư tiếp nhận Ticket phòng ban .
   - **Quản lý (`Manager`):** Chuyển đến Department Dashboard .
   - **Quản trị viên (`Admin`):** Chuyển đến Global System Dashboard.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Điều hướng diễn ra tự động ngay sau khi cấp Token, không hiển thị trang trung gian không cần thiết.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Đăng nhập tài khoản vai trò nào $\rightarrow$ Chuyển thẳng về đúng giao diện làm việc của vai trò đó.

---

## [FR-M01-05] Chặn truy cập trái phép và tự động văng tài khoản khi bị khóa

**Mô tả:** Hệ thống kiểm soát an ninh phân quyền (RBAC Middleware) chặn người dùng truy cập trái quyền và tự động thu hồi phiên làm việc (Kick-out) ngay khi tài khoản bị khóa hoặc hết hạn.

**Actor:** Hệ thống, Tất cả người dùng

**Preconditions (Điều kiện tiên quyết):** Người dùng đang có phiên truy cập hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **JWT Token:** Chứa `user_id`, `role`, `status`, `exp`.

**Luồng chính (Main Flow):**

1. **Kịch bản A (Truy cập trái quyền URL):** Người dùng cố tình gõ URL không thuộc quyền hạn vai trò của mình $\rightarrow$ Middleware phát hiện không đủ quyền $\rightarrow$ Chặn truy cập và hiển thị màn hình thông báo lỗi phân quyền `403 Forbidden`.
2. **Kịch bản B (Admin khóa tài khoản):** Khi Admin đổi trạng thái tài khoản sang `Inactive` ở M03, hệ thống lập tức thu hồi/cho vào danh sách đen (Blacklist) phiên làm việc của tài khoản này.
3. Ở request tiếp theo của người dùng, hệ thống phát hiện phiên bị vô hiệu hóa $\rightarrow$ Hủy session ở Client, lập tức đẩy người dùng về trang Đăng nhập kèm thông báo *"Tài khoản của bạn đã bị khóa hoặc phiên đăng nhập đã hết hạn"*.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Quyền truy cập được xác thực ở cả Frontend (Route Guard) và Backend (API Middleware).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Truy cập URL trái quyền $\rightarrow$ Bị chặn ngay lập tức.
* **AC-02:** Tài khoản bị Admin khóa $\rightarrow$ Lập tức văng khỏi phiên đăng nhập và không thể thực hiện thêm thao tác nào.

---
