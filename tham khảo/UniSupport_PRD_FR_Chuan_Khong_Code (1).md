# UNISUPPORT — ĐẶC TẢ YÊU CẦU CHỨC NĂNG (PRD)

## Quy ước trạng thái Ticket

Chưa tiếp nhận → Đang xử lý → Chờ bổ sung (nếu cần) → Đang xử lý → Đã giải quyết → Đã đóng. Ticket sai phòng ban được chuyển về hàng chờ Admin để phân loại lại.

---

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

# PHÂN HỆ: M02 — QUẢN LÝ TÀI KHOẢN ADMIN (ACCOUNT MANAGEMENT)

## [FR-M02-01] Tạo, xem, tìm kiếm và lọc tài khoản

**Mô tả:** Admin thực hiện xem danh sách, tìm kiếm, lọc và quản lý thông tin các tài khoản người dùng trên toàn hệ thống.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Admin đã đăng nhập hệ thống thành công.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Tùy chọn, Tìm theo Mã định danh / Họ tên.
- **Phòng ban:** Tùy chọn, Khóa ngoại tới Bảng Phòng ban.
- **Vai trò:** Theo thông tin hiển thị trong hệ thống.
- **Bộ lọc trạng thái:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Admin truy cập mục Quản lý tài khoản.
2. Hệ thống tải danh sách tài khoản toàn trường.
3. Admin nhập từ khóa tìm kiếm (Mã định danh, Họ tên) hoặc chọn lọc theo Phòng ban / Vai trò / Trạng thái (Active/Inactive).
4. Hệ thống trả về danh sách kết quả phù hợp theo thời gian thực.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Hệ thống vận hành cơ chế đóng, tài khoản tạo mới phải gắn với Mã định danh chính thức và Vai trò hợp lệ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Nếu không tìm thấy kết quả phù hợp, hệ thống hiển thị thông báo *“Không tìm thấy tài khoản phù hợp”*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Lọc theo phòng ban/vai trò trả về đúng danh sách người dùng thuộc phân vùng đó.
* **AC-02:** Tìm kiếm theo Mã định danh hoặc Họ tên hiển thị đúng thông tin tài khoản.

## [FR-M02-02] Cập nhật, khóa, mở khóa và Import tài khoản từ Excel/CSV

**Mô tả:** Admin thực hiện cập nhật thông tin, thay đổi trạng thái hoạt động (Khóa/Mở khóa) hoặc Import danh sách tài khoản hàng loạt từ file tệp.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Admin có quyền quản trị tài khoản cao nhất.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Tệp danh sách tài khoản:** Bắt buộc, Định dạng .xlsx hoặc .csv, Dung lượng Max 10MB.
- **Mã định danh:** Bắt buộc trong file, Duy nhất, Max 20 ký tự.
- **Họ và tên:** Bắt buộc trong file, Max 100 ký tự.
- **Mã phòng ban:** Bắt buộc trong file, Mã phòng ban.
- **Vai trò:** Theo thông tin hiển thị trong hệ thống.
- **Trạng thái:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Admin chọn chức năng “Import tài khoản” và tải lên file .xlsx hoặc .csv.
2. Hệ thống kiểm tra cấu trúc cột dữ liệu (*Mã định danh, Họ tên, vai trò, Phòng ban*).
3. Với mã định danh chưa có: Tạo tài khoản mới với mật khẩu mặc định.
4. Với mã định danh đã có: Cập nhật họ tên, phòng ban và **giữ nguyên mật khẩu hiện tại**.
5. Khi chuyển trạng thái sang Inactive (Khóa): Hệ thống đăng xuất khỏi phiên hiện tại làm việc của người dùng đó lập tức.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Không được phép xóa cứng các tài khoản đã từng phát sinh Ticket để bảo toàn dữ liệu lịch sử.
* **BR-02:** File import sai định dạng hoặc thiếu trường bắt buộc sẽ bị chặn và trả về báo cáo dòng lỗi cho Admin.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Import file Excel hợp lệ → Khởi tạo/cập nhật tài khoản thành công và hiển thị tổng số dòng thành công/thất bại.
* **AC-02:** Khóa tài khoản Inactive → Người dùng bị đăng xuất khỏi phiên hiện tại đăng nhập ngay lập tức và không thể đăng nhập lại.

---

# PHÂN HỆ: M03 — VAI TRÒ & PHÂN QUYỀN ADMIN (ROLES & PERMISSIONS)

## [FR-M03-01] Quản lý vai trò người dùng

**Mô tả:** Admin xem và quản lý danh mục các Vai trò chuẩn trong hệ thống (Sinh viên, Nhân viên, Quản lý, Admin).

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin tối cao.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Vai trò:** Khóa chính: Sinh Viên, Nhân Viên, Quản Lý, Admin.
- **Tên vai trò:** Bắt buộc, Max 50 ký tự, Tên tiếng Việt hiển thị.
- **Số người dùng:** Chỉ đọc, Số tài khoản đang gán vai trò này.

**Luồng chính (Main Flow):**

1. Admin mở mục Quản lý vai trò.
2. Hệ thống hiển thị 4 vai trò cốt lõi và số lượng người dùng đang gán theo từng vai trò.
3. Admin chọn xem chi tiết danh sách tài khoản thuộc từng Vai trò.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** 4 vai trò cốt lõi (Sinh Viên, Nhân Viên, Quản Lý, Admin) là các vai trò hệ thống cố định, không được phép xóa bỏ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác danh sách 4 vai trò chuẩn và thống kê số lượng người dùng.

## [FR-M03-02] Cấu hình và kiểm soát quyền truy cập chi tiết

**Mô tả:** Admin thiết lập Ma trận phân quyền (ACL) cho từng vai trò trong hệ thống.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Quyền Admin hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Vai trò:** Bắt buộc.
- **Danh sách quyền:** Danh sách mã quyền: 

        - Quản lý tài khoản và phân quyền người dùng.

        - Quản lý danh mục hỗ trợ và cấu hình SLA.

        - Tạo Ticket (nhập nội dung yêu cầu, đính kèm file ).

        - Xem danh sách và chi tiết Ticket.

        - Tiếp nhận Ticket.

        - Cập nhật trạng thái Ticket.

        - Nhắn tin, phản hồi và yêu cầu bổ sung tài liệu.

        - Trả Ticket sai phòng ban về mục "Khác".

        - Phân công lại Ticket nội bộ phòng ban.

        - Điều chuyển Ticket từ mục "Khác" về các phòng ban.

        - Đánh giá sao và viết nhận xét Ticket.

        - Xem Dashboard và biểu đồ thống kê.

        - Xuất báo cáo dữ liệu.
- **Trạng thái quyền:** Mặc định: true.

**Luồng chính (Main Flow):**

1. Admin chọn một Vai trò cần cấu hình.
2. Hệ thống hiển thị danh sách các quyền hạn chức năng.
3. Admin tích chọn/bỏ chọn quyền hạn và bấm Lưu.
4. Hệ thống kiểm tra và cập nhật ma trận phân quyền vào hệ thống.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tuyệt đối không được phép tước bỏ quyền Quản trị tài khoản của tài khoản Admin chính (tránh mất quyền quản trị cuối cùng).

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Cập nhật quyền hạn thành công → Áp dụng chính xác ở các phiên đăng nhập tiếp theo của người dùng thuộc vai trò đó.

---

# PHÂN HỆ: M04 — QUẢN LÝ DANH MỤC HỖ TRỢ (CATEGORY MANAGEMENT)

## [FR-M04-01] Admin quản lý danh mục toàn trường

**Mô tả:** Admin tạo mới, chỉnh sửa, ẩn/hiện danh mục dịch vụ hỗ trợ toàn trường và gán Phòng ban tiếp nhận mặc định.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã danh mục:** Bắt buộc, Duy nhất, 2-4 ký tự in hoa, VD: AC, FN, IT.
- **Tên danh mục:** Bắt buộc, Max 100 ký tự, Tên danh mục dịch vụ.
- **Phòng ban phụ trách:** Bắt buộc, Khóa ngoại tới Phòng ban tiếp nhận.
- **Thời hạn xử lý:** Bắt buộc, Thời gian cam kết xử lý SLA mặc định tính theo giờ, VD: 24, 48.
- **Trạng thái hiển thị:** Mặc định: true.

**Luồng chính (Main Flow):**

1. Admin truy cập Quản lý danh mục hỗ trợ.
2. Nhấn “Thêm danh mục mới”.
3. Nhập Tên danh mục, Mã danh mục (VD: AC, FN), Mô tả, Phòng ban phụ trách mặc định và SLA xử lý tiêu chuẩn.
4. Bấm “Lưu”.
5. Hệ thống kiểm tra trùng lặp và lưu vào hệ thống.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mã danh mục phải là duy nhất và gồm 2-4 ký tự in hoa.
* **BR-02:** Danh mục bị ẩn sẽ không hiển thị trên form Tạo Ticket của Sinh viên nhưng giữ nguyên dữ liệu trên các Ticket cũ.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Tạo mới danh mục hợp lệ → Danh mục xuất hiện trong cây danh mục toàn trường và form Tạo Ticket.
* **AC-02:** Trùng Mã danh mục → Hệ thống báo lỗi và không cho phép lưu.

## [FR-M04-02] Quản lý danh mục hỗ trợ thuộc phòng ban

**Mô tả:** Quản lý phòng ban (Trưởng phòng) xem và cấu hình danh mục dịch vụ chuyên trách thuộc nội bộ phòng ban mình.

**Actor:** Quản lý phòng ban

**Preconditions (Điều kiện tiên quyết):** Tài khoản vai trò Quản lý đã gắn đúng Phòng ban.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Danh mục hỗ trợ:** Khóa chính.
- **Hướng dẫn hồ sơ:** Tùy chọn, Hướng dẫn hồ sơ sinh viên cần chuẩn bị.
- **Thời hạn xử lý của phòng ban:** Bắt buộc, Giờ.
- **Trạng thái:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Quản lý mở Quản lý danh mục phòng ban.
2. Xem danh sách danh mục trực thuộc.
3. Chỉnh sửa mô tả hướng dẫn, thời hạn SLA phòng ban.
4. Bấm Lưu.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Quản lý chỉ xem và sửa được danh mục thuộc phòng ban mình phụ trách.

---

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

# PHÂN HỆ: M06 — TIẾP NHẬN TICKET — NHÂN VIÊN (RECEIVE TICKET)

## [FR-M06-01] Xem danh sách Ticket mới thuộc phòng ban

**Mô tả:** Nhân viên mở hộp thư tiếp nhận xem danh sách các Ticket mới gửi ở trạng thái Chưa tiếp nhận thuộc phòng ban mình phụ trách.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Nhân viên đăng nhập thành công và có phòng ban trực thuộc.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban:** Bắt buộc, ID phòng ban của Nhân viên hiện tại.
- **Trạng thái:** Theo thông tin hiển thị trong hệ thống.
- **Trang danh sách:** Mặc định: 1.
- **Số mục mỗi trang:** Mặc định: 20.

**Luồng chính (Main Flow):**

1. Truy cập mục “Ticket mới tiếp nhận”.
2. Hệ thống tải danh sách đơn ở trạng thái Chưa tiếp nhận của phòng ban.
3. Tìm kiếm, lọc theo ngày tạo, tiêu đề, độ ưu tiên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nhân viên chỉ xem được các Ticket thuộc phòng ban chuyên trách của mình (Data Isolation).

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Danh sách chỉ hiển thị đúng các đơn trạng thái Chưa tiếp nhận thuộc đúng phòng ban của nhân viên.

## [FR-M06-02] Tìm kiếm, lọc và Tiếp nhận Ticket (Claim)

**Mô tả:** Nhân viên chọn một Ticket mới và bấm nút Tiếp nhận (Claim) để chịu trách nhiệm giải quyết.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Ticket ở trạng thái Chưa tiếp nhận.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Khóa chính của Ticket.
- **Nhân viên tiếp nhận:** ID Nhân viên bấm nhận việc.
- **Thời điểm tiếp nhận:** Mốc thời gian tiếp nhận.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Mở xem chi tiết Ticket.
2. Nhấn nút “Tiếp nhận” (Claim).
3. Hệ thống kiểm tra điều kiện truy cập đồng thời (Concurrency check): Đảm bảo Ticket chưa có ai nhận trước.
4. Hệ thống gán Nhân viên làm nhân viên phụ trách, chuyển trạng thái đơn sang Đang xử lý.
5. Đưa Ticket vào danh sách công việc cá nhân của Nhân viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mỗi Ticket tại một thời điểm chỉ có duy nhất 1 Nhân viên phụ trách.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Nếu hai Nhân viên bấm tiếp nhận cùng lúc, hệ thống chỉ chấp nhận người bấm trước, người bấm sau nhận thông báo *“Ticket đã được tiếp nhận bởi nhân viên khác”*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Tiếp nhận thành công → Gán tên nhân viên phụ trách, chuyển trạng thái Đang xử lý, cập nhật hệ thống.
* **AC-02 (Kiểm thử BR-01):** Thao tác trùng → Chặn người bấm sau và tải lại dữ liệu.

---

# PHÂN HỆ: M07 — XỬ LÝ & TRAO ĐỔI — NHÂN VIÊN (PROCESS & EXCHANGE)

## [FR-M07-01] Cập nhật trạng thái và tiến độ Ticket

**Mô tả:** Nhân viên cập nhật tiến độ công việc, ghi chú nội bộ và theo dõi lịch sử xử lý.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Đã tiếp nhận Ticket ở FR-M06-02.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Khóa chính Ticket.
- **Ghi chú nội bộ:** Tùy chọn, Ghi chú nội bộ dành cho nhân sự phòng ban.
- **Trạng thái cập nhật:** Theo thông tin hiển thị trong hệ thống.
- **Thời điểm ghi nhận:** Mốc thời gian hệ thống ghi nhận.

**Luồng chính (Main Flow):**

1. Mở Ticket đang phụ trách.
2. Nhập ghi chú xử lý nội bộ.
3. Cập nhật tiến độ.
4. Bấm Lưu. Hệ thống ghi nhận lịch sử lịch sử thao tác.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Ghi chú nội bộ được lưu trữ chính xác và hiển thị trong timeline lịch sử xử lý.

## [FR-M07-02] Yêu cầu bổ sung và trao đổi với Sinh viên

**Mô tả:** Nhân viên gửi yêu cầu Sinh viên bổ sung thêm thông tin/hồ sơ còn thiếu, chuyển trạng thái đơn sang Chờ bổ sung kèm bộ đếm 72h.

**Actor:** Nhân viên, Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái Đang xử lý.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung yêu cầu bổ sung:** Bắt buộc, Chi tiết nội dung/tài liệu cần Sinh viên bổ sung.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.
- **Thời điểm bắt đầu chờ bổ sung:** Thời điểm chuyển Pending.
- **Hạn bổ sung:** Thời điểm hết hạn = pending_start + 72 giờ.

**Luồng chính (Main Flow):**

1. Nhân viên chọn “Yêu cầu bổ sung thông tin”.
2. Bắt buộc nhập chi tiết nội dung thông tin/hồ sơ cần bổ sung.
3. Nhấn “Gửi yêu cầu”.
4. Hệ thống chuyển trạng thái Ticket sang Chờ bổ sung (Chờ bổ sung), kích hoạt đồng hồ đếm ngược 72 giờ.
5. Hệ thống gửi thông báo trong ứng dụng cho Sinh viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nội dung yêu cầu bổ sung không được để trống.
* **BR-02:** Đồng hồ 72h kích hoạt đếm ngược ngầm để tránh đồn đọng đơn treo.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Gửi yêu cầu bổ sung → Chuyển trạng thái Chờ bổ sung, kích hoạt bộ đếm 72h và phát thông báo tới Sinh viên.

## [FR-M07-03] Báo cáo và chuyển Ticket sai phòng ban về Admin

**Mô tả:** Nhân viên phát hiện Ticket bị gửi nhầm phòng ban chuyên trách, thực hiện thao tác chuyển trả đơn về Admin.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Ticket thuộc phòng ban hiện tại nhưng không đúng chuyên môn.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Lý do chuyển phòng ban:** Bắt buộc, Lý do cụ thể chuyển trả đơn cho Admin.
- **Phòng ban cũ:** Hệ thống tự động điền.
- **Danh mục mới:** ID đặc biệt của danh mục "Khác".
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.
- **Nhân viên phụ trách:** chưa xác định (Hệ thống làm trống tên người phụ trách cũ).

**Luồng chính (Main Flow):**

1. Nhân viên chọn “Báo cáo sai phòng ban”.
2. Bắt buộc nhập Lý do chuyển trả.
3. Nhấn Xác nhận.
4. Hệ thống xóa tên nhân viên phụ trách, đổi danh mục thành “Khác”, đưa trạng thái về Chưa tiếp nhận và đẩy đơn về Hàng chờ Admin.
5. Bắn thông báo cho Admin.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Lý do chuyển trả là bắt buộc để Admin làm căn cứ định tuyến lại.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bấm chuyển trả kèm lý do → Xóa nhân viên phụ trách, đưa về Chưa tiếp nhận mục Khác cho Admin và lưu log lý do chuyển trả.

---

# PHÂN HỆ: M08 — TRẢ KẾT QUẢ — NHÂN VIÊN (TICKET RESULTS)

## [FR-M08-01] Nhập kết quả giải quyết và đính kèm tài liệu kết quả

**Mô tả:** Nhân viên nhập văn bản giải trình kết quả (Resolution Notes) và đính kèm tệp kết quả trả lời cho Sinh viên.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái Đang xử lý.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung kết quả giải quyết:** Bắt buộc, Nội dung văn bản trả lời/kết quả giải quyết.
- **Tài liệu kết quả:** Tùy chọn, Max 5MB/file, File văn bản trả lời.

**Luồng chính (Main Flow):**

1. Nhân viên chọn “Trả kết quả / Hoàn tất”.
2. Nhập nội dung chi tiết tại trường *Resolution Notes*.
3. Đính kèm file kết quả (nếu có).
4. Nhấn “Xác nhận hoàn thành”.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Trường *Resolution Notes* (Kết quả giải quyết) là bắt buộc. Nếu để trống hệ thống sẽ chặn không cho hoàn thành.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Nếu chưa nhập *Resolution Notes* → Hệ thống cảnh báo đỏ và chặn chuyển trạng thái.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ nội dung và bấm hoàn thành → Lưu kết quả vào hệ thống thành công.

## [FR-M08-02] Hoàn thành Ticket và tự động gửi thông báo cho Sinh viên

**Mô tả:** Hệ thống chuyển trạng thái Ticket sang Đã giải quyết và phát 1 thông báo kết quả duy nhất cho Sinh viên.

**Actor:** Nhân viên, Hệ thống

**Preconditions (Điều kiện tiên quyết):** Hoàn tất FR-M08-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.
- **Thời điểm hoàn thành:** Mốc thời gian hoàn thành.
- **Loại thông báo:** Theo thông tin hiển thị trong hệ thống.
- **Người nhận thông báo:** ID tài khoản Sinh viên nhận đơn.

**Luồng chính (Main Flow):**

1. Hệ thống cập nhật trạng thái đơn thành Đã giải quyết (Đã giải quyết).
2. Ghi nhận thời điểm hoàn thành vào hệ thống.
3. Tự động phát thông báo trong ứng dụng cho Sinh viên với nội dung *"Yêu cầu [Mã đơn] đã có kết quả"*.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ gửi 1 thông báo duy nhất cho Sinh viên, không phát trùng lặp.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chuyển trạng thái Đã giải quyết, ghi mốc thời gian hoàn thành và gửi đúng 1 thông báo tới Sinh viên.

---

# PHÂN HỆ: M09 — THEO DÕI & BỔ SUNG THÔNG TIN (TICKET TRACKING & SUPPLEMENT)

## [FR-M09-01] Xem danh sách, chi tiết và trạng thái Ticket theo thời gian thực

**Mô tả:** Sinh viên xem danh sách các đơn đã gửi và xem màn hình chi tiết tiến độ giải quyết thời gian thực.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Sinh viên.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Sinh viên gửi yêu cầu:** Bắt buộc, ID Sinh viên hiện tại.
- **Mã Ticket:** Khóa chính Ticket khi xem chi tiết.
- **Trạng thái hiện tại:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Mở menu “Yêu cầu của tôi”.
2. Danh sách tải toàn bộ các Ticket do chính Sinh viên khởi tạo.
3. Chọn một Ticket để xem chi tiết: Mã đơn, Ngày tạo, Phòng ban, Trạng thái hiện tại, Lịch sử xử lý.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Sinh viên chỉ có quyền xem các Ticket do chính mình gửi (Data Isolation).

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Màn hình chi tiết hiển thị đúng dữ liệu và trạng thái thời gian thực của đơn.

## [FR-M09-02] Tìm kiếm, lọc và theo dõi lịch sử Ticket

**Mô tả:** Sinh viên tìm kiếm đơn theo Mã Ticket/Tiêu đề và lọc danh sách theo từng trạng thái xử lý.

**Actor:** Sinh viên

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Tùy chọn, Mã Ticket hoặc Tiêu đề.
- **Bộ lọc trạng thái:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Nhập từ khóa tìm kiếm tại ô Tìm kiếm.
2. Chọn bộ lọc Trạng thái (Chưa tiếp nhận, Đang xử lý, Chờ bổ sung, Hoàn thành).
3. Hệ thống trả về kết quả lọc tương ứng.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Lọc trạng thái trả về đúng danh sách các Ticket thuộc trạng thái đó.

## [FR-M09-03] Bổ sung thông tin và tài liệu theo yêu cầu

**Mô tả:** Sinh viên phản hồi nhập nội dung và tải tệp đính kèm bổ sung khi Ticket ở trạng thái Chờ bổ sung.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái Chờ bổ sung (Chờ bổ sung).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung bổ sung:** Bắt buộc, Văn bản giải trình/bổ sung của Sinh viên.
- **Tài liệu bổ sung:** Tùy chọn, Tệp minh chứng bổ sung, Max 5MB/file.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.
- **Nhân viên phụ trách:** Giữ nguyên ID Nhân viên phụ trách cũ.

**Luồng chính (Main Flow):**

1. Mở Ticket Chờ bổ sung từ thông báo hoặc danh sách.
2. Đọc yêu cầu bổ sung của Nhân viên.
3. Nhập thông tin bổ sung và tải file minh chứng (nếu có).
4. Bấm “Xác nhận bổ sung”.
5. Hệ thống lưu thông tin vào lịch sử đơn, dừng bộ đếm 72h.
6. Tự động chuyển trạng thái đơn về lại Đang xử lý.
7. Bắn thông báo cho Nhân viên phụ trách cũ vào tiếp tục xử lý.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Giữ nguyên Nhân viên phụ trách cũ, tuyệt đối không tạo đơn mới.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bổ sung thành công → Chuyển lại Đang xử lý, hủy bộ đếm 72h và báo cho Nhân viên phụ trách.

## [FR-M09-04] Tiếp nhận thông báo trạng thái và yêu cầu bổ sung

**Mô tả:** Sinh viên nhận thông báo trong ứng dụng (chấm đỏ biểu tượng quả chuông) khi có thay đổi trạng thái đơn.

**Actor:** Sinh viên

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã thông báo:** Khóa chính thông báo.
- **Người nhận thông báo:** Bắt buộc, ID Sinh viên nhận.
- **Tiêu đề:** Max 100 ký tự.
- **Nội dung thông báo:** Max 255 ký tự.
- **Ticket liên quan:** Bắt buộc, ID Ticket để chuyển hướng khi nhấp chuột.
- **Trạng thái đã đọc:** Mặc định: false.

**Luồng chính (Main Flow):**

1. Hệ thống phát thông báo trong ứng dụng khi đơn đổi trạng thái hoặc có yêu cầu bổ sung.
2. Sinh viên bấm vào thông báo.
3. Hệ thống chuyển hướng tới đúng màn hình chi tiết Ticket đó.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bấm thông báo → Mở trực tiếp màn hình chi tiết Ticket tương ứng.

---

# PHÂN HỆ: M10 — KẾT QUẢ & ĐÁNH GIÁ (RESULTS & FEEDBACK)

## [FR-M10-01] Xem kết quả xử lý và tải tệp kết quả

**Mô tả:** Sinh viên xem nội dung giải trình kết quả (Resolution Notes) và tải tài liệu trả lời khi đơn ở trạng thái Đã giải quyết.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket ở trạng thái Đã giải quyết.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung kết quả giải quyết:** Chỉ đọc.
- **Tệp kết quả:** Danh sách đường dẫn tải tệp kết quả.

**Luồng chính (Main Flow):**

1. Mở Ticket Đã giải quyết.
2. Hệ thống hiển thị phần thông tin Kết quả xử lý từ Nhân viên.
3. Bấm tải tệp kết quả trả lời (nếu có).

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị đầy đủ văn bản kết quả và hỗ trợ tải file kết quả an toàn.

## [FR-M10-02] Đánh giá mức độ hài lòng 1–5 sao

**Mô tả:** Sinh viên chấm điểm đánh giá chất lượng phục vụ từ 1 đến 5 sao cho đơn đã xử lý.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket ở trạng thái Đã giải quyết.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Điểm đánh giá:** Bắt buộc, lựa chọn: 1, 2, 3, 4, 5.

**Luồng chính (Main Flow):**

1. Tại màn hình xem kết quả, chọn mục “Đánh giá chất lượng”.
2. Chọn số sao từ 1 đến 5 sao.
3. Hệ thống ghi nhận điểm sao.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chọn số sao (1-5) là thao tác bắt buộc khi gửi đánh giá.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chọn sao và bấm gửi → Lưu điểm mức độ hài lòng vào hệ thống thành công.

## [FR-M10-03] Viết nhận xét và đóng Ticket vĩnh viễn

**Mô tả:** Sinh viên nhập góp ý tùy chọn và xác nhận đóng đơn vĩnh viễn (Đã đóng).

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Hoàn tất chọn sao ở FR-M10-02.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Điểm đánh giá:** Bắt buộc, 1-5 sao.
- **Nhận xét:** Tùy chọn, Ý kiến đóng góp thêm của Sinh viên.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.
- **Thời điểm đóng Ticket:** Mốc thời gian đóng đơn.
- **Đóng tự động:** Mặc định false, bằng true nếu do tự động đóng 72h.

**Luồng chính (Main Flow):**

1. Nhập ý kiến nhận xét (tùy chọn).
2. Bấm “Gửi đánh giá & Đóng đơn”.
3. Hệ thống lưu nhận xét và chuyển trạng thái Ticket thành Đã đóng (Đóng vĩnh viễn).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Ticket ở trạng thái Đã đóng bị khóa cứng mọi tương tác, tuyệt đối không cho phép mở lại (No Reopen).
* **BR-02 (Auto-Close):** Sau 72 giờ ở trạng thái Đã giải quyết mà Sinh viên không đánh giá, hệ thống tự động gỡ bộ đếm và chuyển thành Đã đóng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Đánh giá xong → Chuyển Đã đóng, khóa vĩnh viễn mọi thao tác chỉnh sửa/bình luận.
* **AC-02 (Kiểm thử BR-02):** Quá 72h không đánh giá → Tự động đóng đơn sang Đã đóng.

---

# PHÂN HỆ: M11 — QUẢN LÝ & ĐIỀU PHỐI TICKET (ROUTING & DISPATCH)

## [FR-M11-01] Quản lý phân công và phân công lại Ticket trong phòng ban

**Mô tả:** Trưởng phòng (Quản lý) chủ động gán đơn hoặc phân công lại (Re-assign) Ticket cho Nhân viên trong phòng ban.

**Actor:** Quản lý phòng ban

**Preconditions (Điều kiện tiên quyết):** Tài khoản vai trò Quản lý.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nhân viên được phân công:** Bắt buộc, ID Nhân viên thuộc nội bộ phòng ban.
- **Quản lý thực hiện:** ID Quản lý thao tác.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Quản lý xem danh sách Ticket phòng ban.
2. Chọn đơn cần điều phối → Bấm “Phân công”.
3. Chọn Nhân viên phụ trách từ danh sách nhân sự nội bộ phòng.
4. Bấm Xác nhận.
5. Hệ thống gán nhân viên phụ trách mới, chuyển trạng thái Đang xử lý (nếu đơn mới), phát thông báo trong ứng dụng cho Nhân viên được gán.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ được phân công cho Nhân viên thuộc nội bộ phòng ban quản lý.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Phân công thành công → Gán nhân viên phụ trách mới và gửi thông báo cho Nhân viên đó.

## [FR-M11-02] Admin phân loại Ticket thuộc danh mục “Khác”

**Mô tả:** Admin xem và định tuyến các Ticket thuộc danh mục "Khác" về đúng phòng ban chuyên trách.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Đơn thuộc danh mục "Khác".

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Phòng ban phụ trách:** Bắt buộc, ID Phòng ban tiếp nhận mới.
- **Danh mục được phân loại:** Bắt buộc, ID Danh mục dịch vụ chuẩn.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Admin mở Hàng chờ đơn "Khác".
2. Đọc chi tiết nội dung đơn yêu cầu của Sinh viên.
3. Chọn Phòng ban đích phù hợp.
4. Nhấn “Phân loại”.
5. Hệ thống cập nhật phòng ban, đưa đơn về Hàng chờ của phòng ban đó ở trạng thái Chưa tiếp nhận.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin phân loại → Đơn chuyển sang Hàng chờ phòng ban mới chính xác.

## [FR-M11-03] Admin tiếp nhận và điều chuyển Ticket sai phòng ban

**Mô tả:** Admin xử lý điều chuyển các Ticket do Nhân viên báo sai phòng ban chuyển về.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Ticket được Nhân viên báo sai phòng ban từ FR-M07-03.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Phòng ban cũ:** Chỉ đọc.
- **Phòng ban mới:** Bắt buộc.
- **Danh mục mới:** Bắt buộc.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.
- **Nhân viên phụ trách:** chưa xác định (Xóa nhân viên phụ trách cũ).

**Luồng chính (Main Flow):**

1. Admin mở danh sách Đơn sai phòng ban chờ điều chuyển.
2. Xem lý do chuyển trả từ Nhân viên cũ và xem nội dung đơn.
3. Chọn Phòng ban mới phù hợp.
4. Bấm “Điều chuyển”.
5. Hệ thống xóa nhân viên phụ trách cũ, cập nhật Phòng ban mới, lưu log lịch sử luân chuyển.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Điều chuyển thành công → Chuyển về hàng chờ phòng ban mới và lưu toàn bộ log luân chuyển.

---

# PHÂN HỆ: M12 — GIÁM SÁT TIẾN ĐỘ (PROGRESS MONITORING)

## [FR-M12-01] Quản lý theo dõi tiến độ và hiệu suất nhân viên phòng ban

**Mô tả:** Quản lý phòng ban theo dõi danh sách các đơn đang xử lý, tiến độ giải quyết và tải khối lượng công việc của từng Nhân viên.

**Actor:** Quản lý phòng ban

**Preconditions (Điều kiện tiên quyết):** vai trò Quản lý phòng ban.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban:** Bắt buộc.
- **Tổng Ticket:** Số liệu tính toán.
- **Ticket đang xử lý:** Số liệu tính toán.
- **Ticket chờ bổ sung:** Số liệu tính toán.
- **Ticket đã giải quyết:** Số liệu tính toán.

**Luồng chính (Main Flow):**

1. Mở màn hình Giám sát tiến độ phòng ban.
2. Hệ thống tổng hợp số đơn Chưa tiếp nhận, Đang xử lý, Chờ bổ sung, Đã giải quyết theo từng Nhân viên.
3. Quản lý nhấp xem danh sách chi tiết công việc của một Nhân viên cụ thể.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác bảng phân bổ khối lượng công việc thực tế của từng nhân sự phòng ban.

## [FR-M12-02] Theo dõi Ticket tồn đọng, chưa tiếp nhận và quá hạn SLA

**Mô tả:** Hệ thống hiển thị cảnh báo đỏ đối với các Ticket chưa có người nhận quá lâu hoặc có nguy cơ quá hạn SLA.

**Actor:** Quản lý phòng ban

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Ngưỡng quá hạn:** Ngưỡng thời gian SLA tính theo giờ.
- **Danh sách Ticket cảnh báo:** Danh sách ID đơn vượt quá mốc SLA.
- **Mức độ cảnh báo:** Theo thông tin hiển thị trong hệ thống.

**Luồng chính (Main Flow):**

1. Mở danh sách Giám sát cảnh báo.
2. Hệ thống lọc và tô đỏ các Ticket quá hạn đếm ngược 72h hoặc quá hạn SLA phòng ban.
3. Quản lý xem chi tiết để can thiệp điều phối.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Ticket vượt mốc thời gian quy định lập tức hiển thị nhãn cảnh báo đỏ nổi bật.

## [FR-M12-03] Admin theo dõi tiến độ xử lý và cảnh báo toàn trường

**Mô tả:** Admin giám sát chỉ số quá hạn và điểm nghẽn tiến độ trên phạm vi tất cả các phòng ban trong toàn trường.

**Actor:** Admin

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Tổng Ticket quá hạn:** Tổng số đơn quá hạn toàn trường.
- **Phòng ban tồn đọng** 

**Luồng chính (Main Flow):**

1. Admin mở Giám sát tiến độ toàn trường.
2. Hệ thống thống kê danh sách các phòng ban có tỷ lệ tồn đọng hoặc quá hạn cao nhất.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị đầy đủ số liệu giám sát và điểm nghẽn tiến độ của toàn hệ thống.

---

# PHÂN HỆ: M13 — DASHBOARD & BÁO CÁO (DASHBOARD & REPORTING)

## [FR-M13-01] Dashboard và biểu đồ thống kê theo phạm vi quyền

**Mô tả:** Giao diện Dashboard trực quan hiển thị biểu đồ thống kê lưu lượng Ticket theo phân quyền (Phòng ban / Global toàn trường).

**Actor:** Quản lý phòng ban, Admin

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Quản lý hoặc Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Khoảng thời gian:** Theo thông tin hiển thị trong hệ thống.
- **Ngày bắt đầu:** Tùy chọn.
- **Ngày kết thúc:** Tùy chọn.
- **Số liệu thống kê:** Payload JSON chứa dữ liệu vẽ biểu đồ.

**Luồng chính (Main Flow):**

1. Mở trang Dashboard.
2. Hệ thống tải các Widget biểu đồ: Biểu đồ cột lưu lượng theo tháng, biểu đồ tròn tỷ lệ trạng thái, thẻ chỉ số tổng quan.
3. Chọn khoảng thời gian lọc (Tuần / Tháng / Quý).

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Biểu đồ hiển thị chính xác số liệu thống kê thời gian thực theo khoảng thời gian đã chọn.

## [FR-M13-02] Báo cáo Ticket theo trạng thái, danh mục và khoảng thời gian

**Mô tả:** Xuất báo cáo dữ liệu tổng hợp chi tiết theo trạng thái, danh mục dịch vụ và hỗ trợ tải file Excel/PDF.

**Actor:** Quản lý phòng ban, Admin

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Loại báo cáo:** Theo thông tin hiển thị trong hệ thống.
- **Định dạng báo cáo:** Theo thông tin hiển thị trong hệ thống.
- **Tệp báo cáo:** Luồng tải xuống tệp báo cáo.

**Luồng chính (Main Flow):**

1. Truy cập mục Báo cáo thống kê.
2. Chọn tiêu chí lọc: Từ ngày - Đến ngày, Trạng thái, Danh mục.
3. Bấm “Xem báo cáo” hoặc “Xuất file Excel”.
4. Hệ thống tải xuống tệp báo cáo Excel chuẩn hóa.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Xuất file Excel đúng định dạng, đầy đủ dữ liệu báo cáo theo tiêu chí lọc.

## [FR-M13-03] Thống kê đánh giá hài lòng (CSAT) và hiệu suất nhân sự

**Mô tả:** Báo cáo thống kê điểm hài lòng trung bình (mức độ hài lòng 1-5 sao), bảng tổng hợp nhận xét của Sinh viên và chỉ số chỉ số hiệu suất hoàn thành công việc của Nhân viên.

**Actor:** Quản lý phòng ban, Admin

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Điểm hài lòng trung bình:** Thang điểm 1.0 đến 5.0.
- **Số lượt đánh giá:** Tổng số đơn đã đánh giá.
- **Phân bố số sao:** Số lượng đơn theo từng mức 1, 2, 3, 4, 5 sao.
- **Hiệu suất nhân viên:** Tên nhân viên, Số ticket hoàn thành, Điểm đánh giá trung bình, Số ticket quá hạn.

**Luồng chính (Main Flow):**

1. Mở Báo cáo đánh giá hài lòng & chỉ số hiệu suất.
2. Hệ thống tính điểm mức độ hài lòng trung bình của phòng ban và từng Nhân viên.
3. Hiển thị bảng chi tiết các nhận xét từ Sinh viên.

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01:** Chỉ người dùng có quyền phù hợp mới được thực hiện chức năng.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Điểm mức độ hài lòng trung bình được tính chính xác dựa trên tổng số đánh giá thực tế của Sinh viên.

---
