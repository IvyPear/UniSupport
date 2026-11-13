# PHÂN HỆ: M01 — ĐĂNG NHẬP & XÁC THỰC (AUTH)

## [FR-M01-01] Đăng nhập vào hệ thống

**Mô tả:** Tất cả các vai trò (Sinh viên, Nhân viên, Quản lý, Admin) thực hiện đăng nhập vào hệ thống bằng mã số định danh và mật khẩu cá nhân.

**Actor:** Sinh viên, Nhân viên, Quản lý, Admin

**Priority:** **High** — Chức năng cổng vào bắt buộc của toàn bộ hệ thống; nếu không đăng nhập được thì không thể thực hiện bất kỳ nghiệp vụ nào khác.

**Preconditions (Điều kiện tiên quyết):** Người dùng đã được cấp tài khoản hợp lệ trong hệ thống UniSupport và tài khoản ở trạng thái `Active`.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**
- **Mã định danh:** Bắt buộc, Max 20 ký tự (Mã SV / Mã Cán bộ / Mã Quản trị).
- **Mật khẩu:** Bắt buộc, Min 8 - Max 100 ký tự. Mật khẩu khởi tạo ban đầu là ngày tháng năm sinh (`DDMMYYYY`).
- **Ghi nhớ đăng nhập:** Tùy chọn, Mặc định: `false`.

**Luồng chính (Main Flow):**
1. Người dùng truy cập trang Đăng nhập UniSupport.
2. Nhập Mã định danh và Mật khẩu.
3. Nhấn nút “Đăng nhập”.
4. Hệ thống kiểm tra thông tin xác thực và trạng thái hoạt động của tài khoản.
5. Nếu thông tin hợp lệ, hệ thống cấp mã phiên làm việc (JWT Token). Nếu tài khoản đang có cờ bắt buộc đổi mật khẩu do Admin vừa đặt lại mật khẩu ở M03, người dùng phải đổi mật khẩu trước khi truy cập các chức năng khác; nếu không, hệ thống chuyển đến trang làm việc theo vai trò.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Hệ thống đóng):** Tài khoản được nhà trường khởi tạo sẵn, hệ thống tuyệt đối không hiển thị chức năng hoặc nút “Đăng ký”.
* **BR-02 (Mật khẩu mặc định):** Sinh viên, Nhân viên và Quản lý sử dụng tài khoản được cấp và không có chức năng tự quên mật khẩu. Nếu gặp sự cố, người dùng liên hệ phòng IT/Admin để được hỗ trợ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**
* **E-01 (Sai thông tin đăng nhập):** Nhập sai mã định danh hoặc mật khẩu $\rightarrow$ Hệ thống hiển thị thông báo lỗi: *“Mã định danh hoặc mật khẩu không chính xác”*, tăng bộ đếm số lần đăng nhập sai (`failed_attempts`).
* **E-02 (Bỏ trống trường bắt buộc):** Người dùng bấm Đăng nhập khi chưa điền mã định danh hoặc mật khẩu $\rightarrow$ Hệ thống kích hoạt validation tại chỗ, viền đỏ ô nhập liệu và báo lỗi *“Vui lòng nhập đầy đủ thông tin”*.
* **E-03 (Tài khoản bị vô hiệu hóa):** Tài khoản có trạng thái `Inactive` đăng nhập $\rightarrow$ Hệ thống từ chối (`403 Forbidden`) và thông báo: *“Tài khoản của bạn đã bị khóa, vui lòng liên hệ Quản trị viên”*.

* Nhập sai mã định danh hoặc mật khẩu $\rightarrow$ Hệ thống hiển thị thông báo *“Sai thông tin đăng nhập”*.
* Bỏ trống trường bắt buộc $\rightarrow$ Báo lỗi tại chỗ và không gửi yêu cầu.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**
* **AC-01:** Nhập đúng mã định danh và mật khẩu $\rightarrow$ Đăng nhập thành công và cấp JWT Token hợp lệ (thời hạn 8 tiếng).
* **AC-02:** Nhập sai thông tin đăng nhập $\rightarrow$ Báo lỗi rõ ràng và không cấp quyền truy cập.
* **AC-03:** Màn hình Đăng nhập tuyệt đối không hiển thị nút “Đăng ký”.
* **AC-04:** Đăng nhập lần đầu bằng mật khẩu ngày sinh (`must_change_password = true`) $\rightarrow$ Bắt buộc chuyển sang màn hình đổi mật khẩu mới.

* **AC-01:** Nhập đúng mã định danh và mật khẩu $\rightarrow$ Đăng nhập thành công.
* **AC-02:** Nhập sai thông tin $\rightarrow$ Báo lỗi rõ ràng và không cho phép đăng nhập.
* **AC-03:** Màn hình Đăng nhập không có nút “Đăng ký” cho người dùng vãng lai.

---

## [FR-M01-02] Khóa tài khoản 15 phút khi nhập sai mật khẩu 5 lần liên tiếp

**Mô tả:** Hệ thống tự động ghi nhận số lần đăng nhập thất bại liên tiếp và tạm khóa tài khoản để phòng chống tấn công dò mật khẩu (Brute-force).

**Actor:** Hệ thống (Security Mechanism)

**Priority:** **High** — Đảm bảo an toàn thông tin, ngăn chặn tấn công tự động dò quét mật khẩu người dùng.

**Preconditions (Điều kiện tiên quyết):** Người dùng thực hiện đăng nhập trên trang Đăng nhập.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**
- **Mã định danh:** Tài khoản đăng nhập.
- **Bộ đếm đăng nhập sai (failed_attempts):** Số nguyên, mặc định 0.
- **Thời điểm mở khóa (lockout_until):** Mốc thời gian hệ thống tự động gỡ khóa.

**Luồng chính (Main Flow):**
1. Người dùng nhập sai mật khẩu hoặc thông tin xác thực.
2. Hệ thống tăng bộ đếm số lần sai: `failed_attempts = failed_attempts + 1`.
3. Nếu `failed_attempts < 5`: Hiển thị cảnh báo số lần sai còn lại trước khi tài khoản bị khóa (Ví dụ: *"Bạn còn 2 lần thử trước khi tài khoản bị khóa"*).
4. Khi `failed_attempts >= 5`:
   a. Hệ thống tự động khóa tài khoản tạm thời.
   b. Thiết lập thời gian khóa: `lockout_until = current_time + 15 phút`.
   c. Hiển thị thông báo: *“Tài khoản tạm thời bị khóa trong 15 phút do nhập sai quá 5 lần liên tiếp”*.
5. Sau 15 phút, hệ thống tự động gỡ bỏ trạng thái tạm khóa, reset `failed_attempts = 0` và cho phép đăng nhập lại bình thường.

**Business Rules (Quy tắc nghiệp vụ):**
* **BR-01:** Trong suốt thời gian 15 phút khóa tạm thời, mọi yêu cầu đăng nhập (dù nhập đúng mật khẩu) đều bị từ chối ngay lập tức.
* **BR-02:** Nếu đăng nhập thành công ở bất kỳ lần nào trước mốc 5 lần sai, hệ thống lập tức reset `failed_attempts = 0`.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**
* **E-01 (Đăng nhập trong thời gian bị khóa):** Người dùng nhập đúng mật khẩu nhưng tài khoản vẫn còn trong thời gian 15 phút khóa $\rightarrow$ Hệ thống từ chối và hiển thị thông báo: *“Tài khoản đang bị tạm khóa. Vui lòng thử lại sau [số phút] phút”*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**
* **AC-01:** Nhập sai 5 lần liên tiếp $\rightarrow$ Tài khoản bị khóa 15 phút và hiển thị thông báo cảnh báo rõ ràng.
* **AC-02:** Sau khi hết 15 phút $\rightarrow$ Tài khoản tự động mở khóa và đăng nhập lại được bình thường khi nhập đúng mật khẩu.
* **AC-03:** Nhập sai 4 lần rồi nhập đúng ở lần thứ 5 $\rightarrow$ Đăng nhập thành công và bộ đếm lỗi được reset về 0.

**Ví dụ Edge Case (Trường hợp biên):**
* Người dùng thực hiện lần thử thứ 5 đúng vào thời điểm `lockout_until` vừa hết hạn của đợt khóa trước $\rightarrow$ Hệ thống cho phép đăng nhập nếu đúng hoặc bắt đầu chu kỳ đếm sai mới từ 1 nếu sai.

---

## [FR-M01-03] Đặt lại mật khẩu tài khoản quản trị Admin

**Mô tả:** Tài khoản vai trò Quản trị viên (Admin) khôi phục mật khẩu thông qua liên kết xác thực an toàn (Secure Reset Token) gửi trực tiếp về Email quản trị đã đăng ký; hệ thống không sử dụng OTP.

**Actor:** Quản trị viên (Admin)

**Priority:** **Medium** — Phục vụ riêng tài khoản Admin trong trường hợp khẩn cấp; các tài khoản khác (sinh viên, nhân viên) không áp dụng chức năng này.

**Preconditions (Điều kiện tiên quyết):** Tài khoản yêu cầu phải có vai trò Admin và đã cấu hình Email quản trị hợp lệ trong hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**
- **Email / Mã Admin:** Bắt buộc, Max 100 ký tự.
- **Reset Token:** Bắt buộc, token dùng một lần có hiệu lực 15 phút.
- **Mật khẩu mới:** Bắt buộc, Min 8 ký tự, gồm chữ hoa, chữ thường và chữ số.
- **Xác nhận mật khẩu:** Bắt buộc, trùng khớp với mật khẩu mới.

**Luồng chính (Main Flow):**

1. Tại giao diện Đăng nhập, Admin nhấp vào liên kết “Quên mật khẩu”.
2. Nhập Email hoặc Mã định danh Admin và nhấn “Gửi liên kết đặt lại”.
3. Hệ thống kiểm tra quyền Admin, tạo Reset Token dùng một lần và gửi liên kết đặt lại về Email quản trị.
4. Admin mở liên kết đặt lại trong thời hạn 15 phút.
5. Admin nhập Mật khẩu mới và Xác nhận mật khẩu mới, sau đó bấm “Đổi mật khẩu”.
6. Hệ thống kiểm tra Reset Token, cập nhật mật khẩu đã mã hóa vào CSDL và vô hiệu hóa token.
7. Hiển thị thông báo thành công và chuyển Admin về màn hình Đăng nhập.

**Business Rules (Quy tắc nghiệp vụ):**
* **BR-01:** Chức năng này chỉ áp dụng duy nhất cho Role Admin. Sinh viên, Nhân viên và Quản lý không được sử dụng luồng này.
* **BR-02:** Liên kết khôi phục chỉ có hiệu lực trong 15 phút và chỉ được dùng 1 lần duy nhất. Hệ thống không sử dụng OTP.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**
* **E-01 (Mã token hết hạn hoặc đã dùng):** Nhấp vào liên kết sau 15 phút hoặc liên kết đã sử dụng $\rightarrow$ Báo lỗi *“Liên kết khôi phục mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng gửi lại yêu cầu”*.
* **E-02 (Mật khẩu mới không đủ độ phức tạp):** Nhập mật khẩu dưới 8 ký tự hoặc thiếu chữ hoa/số $\rightarrow$ Báo lỗi validation tại ô nhập liệu.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**
* **AC-01:** Nhập đúng email Admin $\rightarrow$ Hệ thống gửi liên kết đặt lại mật khẩu và cập nhật thành công khi Reset Token hợp lệ.
* **AC-02:** Liên kết quá 15 phút hoặc đã qua sử dụng $\rightarrow$ Bị từ chối và không cho đổi mật khẩu.
* **AC-03:** Sinh viên, Nhân viên hoặc Quản lý cố tình gửi yêu cầu lấy lại mật khẩu $\rightarrow$ Hệ thống từ chối thực hiện.

**Ví dụ Edge Case (Trường hợp biên):**
* Admin gửi 2 yêu cầu khôi phục liên tiếp trong vòng 1 phút $\rightarrow$ Hệ thống chỉ chấp nhận Token của yêu cầu sau cùng, Token đầu tiên bị vô hiệu hóa ngay lập tức.

---

## [FR-M01-04] Tự động chuyển trang phù hợp với quyền hạn sau khi đăng nhập

**Mô tả:** Hệ thống đọc vai trò người dùng từ phiên đăng nhập (JWT Payload) và tự động điều hướng tới Dashboard/Giao diện làm việc chuyên biệt theo đúng thẩm quyền.

**Actor:** Sinh viên, Nhân viên, Quản lý, Admin

**Priority:** **High** — Trải nghiệm điều hướng cốt lõi, đảm bảo người dùng truy cập đúng chức năng theo vai trò.

**Preconditions (Điều kiện tiên quyết):** Đăng nhập thành công ở FR-M01-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**
- **Vai trò người dùng (Role):** `Student`, `Staff`, `Manager`, `Admin`.
- **Đường dẫn đích (Landing URL):** Tự động xác định theo Role.
- **Yêu cầu đổi mật khẩu sau reset:** Cờ `must_change_password`, do M03 thiết lập khi Admin đặt lại mật khẩu.

**Luồng chính (Main Flow):**
1. Xác thực thông tin đăng nhập thành công.
2. Hệ thống kiểm tra cờ `must_change_password`; nếu đang bật, chuyển đến màn hình bắt buộc đổi mật khẩu, xác thực mật khẩu mới hợp lệ, sau đó tắt cờ và tiếp tục điều hướng. Trong thời gian đó, chặn thao tác nghiệp vụ khác.
3. Hệ thống kiểm tra vai trò người dùng và điều hướng tự động:
   - **Sinh viên (`Student`):** Chuyển đến màn hình Quản lý Yêu cầu của tôi.
   - **Nhân viên (`Staff`):** Chuyển đến Hộp thư tiếp nhận Ticket phòng ban.
   - **Quản lý (`Manager`):** Chuyển đến Department Dashboard.
   - **Quản trị viên (`Admin`):** Chuyển đến Global System Dashboard.

**Business Rules (Quy tắc nghiệp vụ):**
* **BR-01:** Điều hướng diễn ra tự động ngay sau khi cấp Token, không hiển thị trang trung gian.
* **BR-02:** Nếu chưa hoàn tất đổi mật khẩu bắt buộc, người dùng bị chặn toàn bộ các thao tác nghiệp vụ khác.

* **BR-01:** Điều hướng diễn ra tự động ngay sau khi cấp Token, không hiển thị trang trung gian không cần thiết.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**
* **AC-01:** Đăng nhập tài khoản không có cờ đổi mật khẩu $\rightarrow$ Chuyển thẳng về đúng giao diện làm việc của vai trò đó.
* **AC-02:** Đăng nhập tài khoản có `must_change_password = true` $\rightarrow$ Bắt buộc đổi mật khẩu thành công mới được vào giao diện làm việc.

**Ví dụ Edge Case (Trường hợp biên):**
* Người dùng cố tình gõ URL trực tiếp (ví dụ `/student/tickets`) khi chưa hoàn tất đổi mật khẩu $\rightarrow$ Route Guard chặn lại và tự động đẩy về trang `/change-password-required`.

---

## [FR-M01-05] Chặn truy cập trái phép và tự động văng tài khoản khi bị khóa

**Mô tả:** Hệ thống kiểm soát an ninh phân quyền (RBAC Middleware) chặn người dùng truy cập trái quyền và tự động thu hồi phiên làm việc (Kick-out) ngay khi tài khoản bị khóa hoặc hết hạn.

**Actor:** Hệ thống, Tất cả người dùng

**Priority:** **High** — Cơ chế an ninh bảo vệ dữ liệu, chống leo thang đặc quyền (Privilege Escalation).

**Preconditions (Điều kiện tiên quyết):** Người dùng đang có phiên truy cập hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**
- **JWT Token:** Chứa `user_id`, `role`, `status`, `exp`.

**Luồng chính (Main Flow):**
1. **Kịch bản A (Truy cập trái quyền URL):** Người dùng cố tình truy cập URL không thuộc quyền hạn vai trò của mình $\rightarrow$ Middleware phát hiện không đủ quyền $\rightarrow$ Chặn truy cập và hiển thị màn hình thông báo lỗi phân quyền `403 Forbidden`.
2. **Kịch bản B (Admin khóa tài khoản):** Khi Admin đổi trạng thái tài khoản sang `Inactive` ở M03, hệ thống lập tức thu hồi/cho vào danh sách đen (Blacklist) phiên làm việc của tài khoản này.
3. Ở request tiếp theo của người dùng, hệ thống phát hiện phiên bị vô hiệu hóa $\rightarrow$ Hủy session ở Client, lập tức đẩy người dùng về trang Đăng nhập kèm thông báo *"Tài khoản của bạn đã bị khóa hoặc phiên đăng nhập đã hết hạn"*.

**Business Rules (Quy tắc nghiệp vụ):**
* **BR-01:** Quyền truy cập được xác thực ở cả Frontend (Route Guard) và Backend (API Middleware).

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**
* **E-01 (Token hết hạn 8 tiếng):** Token hết hạn trong khi người dùng đang mở trình duyệt $\rightarrow$ Thao tác tiếp theo trả về `401 Unauthorized`, hệ thống tự động xóa token và chuyển về trang Đăng nhập.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**
* **AC-01:** Truy cập URL trái quyền $\rightarrow$ Bị chặn ngay lập tức với mã `403 Forbidden`.
* **AC-02:** Tài khoản bị Admin khóa $\rightarrow$ Lập tức văng khỏi phiên đăng nhập và không thể thực hiện thêm thao tác nào.

**Ví dụ Edge Case (Trường hợp biên):**
* Người dùng mở 2 tab trình duyệt cùng lúc; tab 1 bấm Đăng xuất hoặc bị khóa tài khoản $\rightarrow$ Thao tác tại tab 2 lập tức bị chặn và chuyển về trang Đăng nhập.
