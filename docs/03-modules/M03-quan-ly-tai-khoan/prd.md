# PHÂN HỆ: M03 — QUẢN LÝ TÀI KHOẢN (ACCOUNT MANAGEMENT)

## [FR-M03-01] Xem, tìm kiếm và lọc danh sách tài khoản

**Mô tả:** Admin xem danh sách toàn bộ người dùng trong trường, tìm kiếm nhanh và lọc đa tiêu chí theo vai trò, phòng ban và trạng thái hoạt động.

**Actor:** Quản trị viên (Admin)

**Priority:** **High** — Chức năng quản trị người dùng cốt lõi, phục vụ việc tra cứu và quản lý tài khoản toàn trường.

**Preconditions (Điều kiện tiên quyết):** Admin đăng nhập thành công vào hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Tùy chọn, tìm theo Mã định danh (Mã SV/Mã Cán bộ) hoặc Họ tên.
- **Bộ lọc Phòng ban:** Tùy chọn, lọc theo Phòng ban trực thuộc.
- **Bộ lọc Vai trò:** Tùy chọn, lọc theo `Student`, `Staff`, `Manager`, `Admin`.
- **Bộ lọc Trạng thái:** Tùy chọn, lọc theo `Active` (Hoạt động) hoặc `Inactive` (Đang khóa).

**Luồng chính (Main Flow):**

1. Admin truy cập menu “Quản lý tài khoản”.
2. Hệ thống hiển thị bảng danh sách tài khoản toàn trường (phân trang 20 dòng/trang).
3. Admin nhập từ khóa hoặc chọn các tiêu chí lọc.
4. Hệ thống tải lại danh sách kết quả phù hợp theo thời gian thực.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Phân trang cố định 20 bản ghi trên mỗi trang; sắp xếp theo thứ tự thời gian tạo mới nhất lên đầu.
* **BR-02:** Tìm kiếm không phân biệt chữ hoa, chữ thường (Case-insensitive) và hỗ trợ tìm kiếm gần đúng theo chuỗi con (Partial Match).

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Không tìm thấy kết quả khớp bộ lọc):** Từ khóa hoặc tổ hợp bộ lọc không khớp với tài khoản nào $\rightarrow$ Hệ thống trả về danh sách rỗng và hiển thị thông báo *"Không tìm thấy tài khoản phù hợp"*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Tìm kiếm theo Mã định danh hoặc Họ tên (không phân biệt hoa/thường, khớp chuỗi con theo `BR-02`) hiển thị chính xác tài khoản; nếu không có kết quả thì hiển thị thông báo rỗng (`E-01`).
* **AC-02:** Lọc kết hợp theo Phòng ban/Vai trò/Trạng thái trả về đúng tập dữ liệu tương ứng, phân trang 20 bản ghi/trang và sắp xếp mới nhất lên đầu (`BR-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Admin nhập từ khóa có chữ hoa/thường lẫn lộn kèm khoảng trắng đầu cuối (ví dụ `"  sv2026  "`) $\rightarrow$ Hệ thống tự cắt khoảng trắng và trả về đúng các tài khoản chứa chuỗi `"SV2026"`.

---

## [FR-M03-02] Tạo mới tài khoản

**Mô tả:** Admin thực hiện tạo mới thủ công từng tài khoản người dùng đơn lẻ trên form giao diện.

**Priority:** High (Chức năng tạo mới tài khoản thủ công, phục vụ cấp phát tài khoản trực tiếp).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã định danh:** Bắt buộc, Duy nhất, Max 20 ký tự (Mã SV / Mã Cán bộ).
- **Họ và tên:** Bắt buộc, Max 100 ký tự.
- **Email:** Bắt buộc, Đúng định dạng email trường.
- **Vai trò:** Bắt buộc, chọn trong 4 vai trò chuẩn.
- **Phòng ban:** Bắt buộc nếu là Nhân viên/Quản lý; không bắt buộc nếu là Sinh viên/Admin toàn trường.
- **Mật khẩu khởi tạo:** Mật khẩu mặc định là ngày sinh của người dùng theo định dạng `DDMMYYYY`.

**Luồng chính (Main Flow):**

1. Admin chọn “Tạo mới tài khoản”.
2. Điền đầy đủ các trường thông tin bắt buộc.
3. Bấm “Xác nhận tạo”.
4. Hệ thống kiểm tra trùng lặp Mã định danh và Email.
5. Tạo tài khoản với trạng thái `Active`, băm mật khẩu mặc định và lưu vào CSDL.
6. Hiển thị thông báo tạo tài khoản thành công.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mã định danh và Email phải là duy nhất trên toàn hệ thống.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Trùng Mã định danh hoặc Email):** Admin nhập Mã định danh hoặc Email đã tồn tại trong CSDL $\rightarrow$ Hệ thống chặn tạo mới, trả về mã `409 Conflict` và báo rõ trường bị trùng (`BR-01`).
* **E-02 (Thiếu Phòng ban với Nhân viên/Quản lý hoặc sai định dạng):** Chọn vai trò `Staff`/`Manager` nhưng không chọn Phòng ban, hoặc Email sai định dạng $\rightarrow$ Hệ thống báo lỗi validation `422 Unprocessable Entity`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ thông tin hợp lệ $\rightarrow$ Tài khoản được tạo thành công (`Active`, `must_change_password = false`) và người dùng có thể đăng nhập ngay bằng mật khẩu mặc định (`DDMMYYYY`).
* **AC-02:** Nhập trùng Mã định danh hoặc trùng Email (`BR-01`, `E-01`) trả về `409 Conflict`; thiếu Phòng ban với `Staff`/`Manager` hoặc sai định dạng Email (`E-02`) trả về `422 Unprocessable Entity` và chặn tạo mới.

**Ví dụ Edge Case (Trường hợp biên):**

* Tạo tài khoản vai trò `Student` hoặc `Admin` mà để trống trường Phòng ban (`department_id = null`) $\rightarrow$ Hệ thống chấp nhận hợp lệ; nhưng nếu đổi vai trò sang `Staff` hoặc `Manager` thì trường Phòng ban lập tức chuyển thành bắt buộc.

---

## [FR-M03-03] Cập nhật thông tin và Khóa/Mở khóa tài khoản

**Mô tả:** Admin cập nhật thông tin cá nhân/phòng ban của tài khoản, thực hiện thao tác Khóa (`Inactive`) hoặc Mở khóa (`Active`), và hỗ trợ đặt lại (Reset) mật khẩu mặc định khi người dùng gặp sự cố.

**Priority:** High (Chức năng quản lý vòng đời tài khoản và bảo mật, khóa truy cập vi phạm và đặt lại mật khẩu).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Tài khoản cần thao tác tồn tại trong hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã định danh:** Chỉ đọc.
- **Họ tên / Email / Phòng ban:** Có thể chỉnh sửa.
- **Trạng thái tài khoản:** `Active` / `Inactive`.
- **Đặt lại mật khẩu:** Tùy chọn nút bấm đưa mật khẩu về mặc định là ngày sinh của người dùng (`DDMMYYYY`).

**Luồng chính (Main Flow):**

1. Admin mở chi tiết một tài khoản từ danh sách.
2. Chỉnh sửa thông tin cần thiết và bấm “Lưu thay đổi”.
3. **Thao tác Khóa tài khoản:** Admin chuyển trạng thái sang `Inactive` $\rightarrow$ Hệ thống cập nhật trạng thái và lập tức thu hồi mọi phiên đăng nhập của người dùng đó (Kick-out).
4. **Thao tác Mở khóa:** Admin chuyển trạng thái sang `Active` $\rightarrow$ Tài khoản được phép đăng nhập lại bình thường.
5. **Thao tác Reset mật khẩu:** Admin nhấp “Đặt lại mật khẩu mặc định” $\rightarrow$ Hệ thống cập nhật mật khẩu về ngày sinh của người dùng (`DDMMYYYY`) và bật cờ `must_change_password`. Ở lần đăng nhập tới, người dùng phải đổi mật khẩu tối thiểu 8 ký tự thành công trước khi được phép truy cập các chức năng nghiệp vụ; hệ thống tắt cờ sau khi đổi thành công.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tuyệt đối không xóa cứng (Hard Delete) tài khoản đã từng phát sinh Ticket để đảm bảo toàn vẹn dữ liệu lịch sử; chỉ được chuyển trạng thái Khóa (`Inactive`).
* **BR-02:** Không được phép khóa tài khoản Admin chính của hệ thống.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Cố tình xóa cứng tài khoản hoặc khóa Admin chính):** Gửi yêu cầu xóa tài khoản đã có Ticket hoặc chuyển trạng thái tài khoản Admin chính sang `Inactive` $\rightarrow$ Backend từ chối với mã `400 Bad Request` (`BR-01`, `BR-02`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Khóa tài khoản thường $\rightarrow$ Người dùng bị đăng xuất ngay lập tức và không thể đăng nhập lại; hệ thống chặn mọi thao tác xóa cứng tài khoản đã phát sinh Ticket hoặc khóa tài khoản Admin chính (`BR-01`, `BR-02`, `E-01`).
* **AC-02:** Mở khóa tài khoản $\rightarrow$ Người dùng đăng nhập lại bình thường.
* **AC-03:** Admin reset mật khẩu thành công $\rightarrow$ Người dùng đăng nhập bằng mật khẩu đặt lại (`must_change_password = true`) nhưng bắt buộc đổi mật khẩu mới trước khi dùng hệ thống.

**Ví dụ Edge Case (Trường hợp biên):**

* Admin bấm Khóa (`Inactive`) một tài khoản Nhân viên đúng lúc nhân viên đó đang mở form xử lý Ticket $\rightarrow$ Phiên JWT bị thu hồi tức thì, thao tác lưu của nhân viên bị chặn và đẩy về màn hình Đăng nhập.

---

## [FR-M03-04] Thêm tài khoản hàng loạt bằng file Excel

**Mô tả:** Admin tải lên file danh sách tài khoản định dạng Excel (.xlsx/.csv) để thêm mới hoặc cập nhật thông tin hàng loạt tài khoản sinh viên/cán bộ.

**Priority:** Medium (Tiện ích nhập liệu hàng loạt phục vụ triển khai đầu kỳ, có thể thay thế bằng tạo đơn lẻ nếu cần).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin; chuẩn bị file Excel theo đúng định dạng mẫu.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **File dữ liệu:** Bắt buộc, `.xlsx` hoặc `.csv`, dung lượng tối đa 10MB.
- **Cấu trúc cột:** Mã định danh, Họ và tên, Email, Vai trò, Mã phòng ban.

**Luồng chính (Main Flow):**

1. Admin chọn chức năng “Nhập từ Excel” và tải file dữ liệu lên hệ thống.
2. Hệ thống kiểm tra cấu trúc tiêu đề các cột dữ liệu.
3. Hệ thống quét từng dòng dữ liệu:
   - Với dòng có Mã định danh chưa tồn tại: Tạo mới tài khoản với mật khẩu mặc định.
   - Với dòng có Mã định danh đã tồn tại: Cập nhật thông tin họ tên, phòng ban và giữ nguyên mật khẩu hiện tại.
4. Hệ thống hoàn tất xử lý và hiển thị thông báo tổng kết: Số dòng thành công, danh sách các dòng bị lỗi (nếu có).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nếu file sai cấu trúc cột hoặc sai định dạng file, hệ thống chặn toàn bộ tiến trình và hiển thị cảnh báo lỗi cụ thể.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (File sai định dạng, sai cấu trúc cột hoặc quá 10MB):** Admin tải file không phải `.xlsx`/`.csv`, vượt 10MB hoặc thiếu cột bắt buộc $\rightarrow$ Hệ thống từ chối toàn bộ file (`422 Unprocessable Entity`) và báo lỗi cụ thể (`BR-01`).
* **E-02 (Dữ liệu lỗi trên từng dòng):** Một số dòng trong file bị trống trường bắt buộc hoặc sai định dạng Email $\rightarrow$ Hệ thống bỏ qua các dòng lỗi và trả về danh sách dòng thất bại kèm nguyên nhân.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Tải file Excel hợp lệ $\rightarrow$ Khởi tạo tài khoản mới và cập nhật thông tin tài khoản đã tồn tại (giữ nguyên mật khẩu cũ) đúng theo danh sách.
* **AC-02:** Hiển thị rõ số dòng thành công và số dòng thất bại kèm lý do lỗi (`E-02`); nếu file sai cấu trúc cột hoặc sai định dạng thì chặn toàn bộ tiến trình và cảnh báo lỗi (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* File Excel có 100 dòng, trong đó 95 dòng là mã sinh viên mới và 5 dòng là mã sinh viên đã tồn tại trong hệ thống $\rightarrow$ Hệ thống tạo mới 95 tài khoản với mật khẩu mặc định, cập nhật thông tin 5 tài khoản cũ mà không ghi đè mật khẩu của 5 tài khoản đó.

---
