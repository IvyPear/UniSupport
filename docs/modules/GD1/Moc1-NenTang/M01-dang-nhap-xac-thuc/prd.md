# PHÂN HỆ: M01 — ĐĂNG NHẬP & XÁC THỰC (AUTH)

## [FR-M01-01] Người dùng đăng nhập hệ thống

**Mô tả:** Tất cả các vai trò (Sinh viên, Nhân viên, Admin, Quản lý) thực hiện đăng nhập vào hệ thống bằng mã số định danh và mật khẩu cá nhân.

**Actor:** Sinh viên, Nhân viên, Admin, Quản lý

**Preconditions (Điều kiện tiên quyết):** Người dùng đã được cấp tài khoản hợp lệ trong hệ thống UniSupport.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã định danh:** Bắt buộc, Max 20 ký tự, Mã SV / Mã Cán bộ / Mã Định danh.
- **Mật khẩu:** Bắt buộc, Min 6 - Max 100 ký tự, Mật khẩu cá nhân.
- **Ghi nhớ đăng nhập:** Tùy chọn, Mặc định: false.

**Luồng chính (Main Flow):**

1. Người dùng truy cập trang Đăng nhập.
2. Nhập mã định danh và mật khẩu.
3. Nhấn “Đăng nhập”.
4. Hệ thống kiểm tra thông tin đăng nhập và trạng thái tài khoản.
5. Nếu thông tin hợp lệ, hệ thống đăng nhập thành công và chuyển người dùng đến trang chủ theo vai trò.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nếu nhập sai thông tin đăng nhập quá 5 lần liên tiếp, tài khoản sẽ bị tạm khóa trong 15 phút.
* **BR-02 (System Constraint):** Hệ thống hoạt động theo cơ chế đóng. Tài khoản được nhà trường cung cấp sẵn cho Sinh viên và Nhân viên, người dùng không thể tự đăng ký tài khoản. Vì vậy, hệ thống tuyệt đối không hiển thị chức năng hoặc nút “Đăng ký”.
* **BR-03 (Mật khẩu mặc định):** Sinh viên và Nhân viên sử dụng tài khoản và mật khẩu do nhà trường cung cấp. Hai đối tượng này không có chức năng “Đổi mật khẩu” hoặc “Quên mật khẩu”. Nếu gặp vấn đề khi đăng nhập, người dùng cần liên hệ phòng IT để được hỗ trợ.
* **BR-04:** Riêng tài khoản Admin được hỗ trợ chức năng “Quên mật khẩu” để khôi phục quyền truy cập.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Nếu nhập sai mã định danh hoặc mật khẩu, hệ thống hiển thị thông báo *“Sai thông tin đăng nhập”* và không cho phép đăng nhập.
* Nếu bỏ trống Mã định danh hoặc Mật khẩu, hệ thống không cho đăng nhập và bôi đỏ trường còn thiếu.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đúng mã định danh và mật khẩu → Đăng nhập thành công và chuyển đến giao diện tương ứng với vai trò.
* **AC-02:** Nhập sai mật khẩu → Không đăng nhập được và hiển thị thông báo lỗi.
* **AC-03:** Bỏ trống thông tin → Không thể đăng nhập và hiển thị cảnh báo tại chỗ còn thiếu thông tin.
* **AC-04 (Kiểm thử BR-01):** Nhập sai thông tin 5 lần liên tiếp → Tài khoản bị khóa và hiển thị thông báo khóa trong 15 phút.
* **AC-05 (Kiểm thử BR-02 & BR-03):** Màn hình Đăng nhập không có nút “Đăng ký” và “Quên mật khẩu” cho Sinh viên/Nhân viên.

## [FR-M01-02] Xác thực và Điều hướng theo Role

**Mô tả:** Hệ thống thực hiện xác thực thông tin phiên đăng nhập phiên đăng nhập và điều hướng người dùng tới Dashboard thuộc đúng phân quyền vai trò.

**Actor:** Sinh viên, Nhân viên, Admin, Quản lý

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập thành công ở FR-M01-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phiên đăng nhập:** Bắt buộc, Mã hóa JWT thông tin phiên đăng nhập, chứa user_id, role, exp.
- **Vai trò:** Theo thông tin hiển thị trong hệ thống.
- **Trang được chuyển đến:** Tự động tạo theo phân quyền URL.

**Luồng chính (Main Flow):**

1. Hệ thống đọc vai trò và Quyền từ thông tin phiên đăng nhập xác thực.
2. Điều hướng tự động: Sinh viên → Trang cá nhân yêu cầu; Nhân viên → Danh sách xử lý phòng ban; Quản lý → Department Dashboard; Admin → Global System Dashboard.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Truy cập trái quyền vào các URL không thuộc vai trò bị chặn lập tức và chuyển về 403 Forbidden.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Đăng nhập thành công với vai trò nào chuyển đến đúng giao diện của vai trò đó.
* **AC-02:** Cố tình gõ URL trái quyền bị hệ thống chặn và đẩy về trang thông báo lỗi phân quyền.

---
