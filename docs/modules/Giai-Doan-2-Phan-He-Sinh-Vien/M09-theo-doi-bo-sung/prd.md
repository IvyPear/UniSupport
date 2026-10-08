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
