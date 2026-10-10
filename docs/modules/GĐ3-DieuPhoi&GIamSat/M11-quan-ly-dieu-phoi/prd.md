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
- **BR-02 (Tách Scope Giai đoạn 1 MVP):** Giao diện và API cốt lõi của tính năng `[FR-M11-03]` (Admin tiếp nhận & điều chuyển Ticket bị báo sai phòng ban) được bóc tách triển khai và nghiệm thu ngay ở **Giai đoạn 1** (đi kèm `M07`/`NV-04`), đảm bảo quy trình luân chuyển đơn không bị tắc nghẽn ở GĐ1.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Điều chuyển thành công → Chuyển về hàng chờ phòng ban mới và lưu toàn bộ log luân chuyển.

## [FR-M11-04] Tiếp nhận thông báo In-app cho Admin

**Mô tả:** Admin nhận thông báo trong ứng dụng khi Nhân viên báo Ticket sai phòng ban (Sự kiện #5 trong Ma trận thông báo) hoặc khi có đơn "Khác" mới cần phân loại.

**Actor:** Admin

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã thông báo:** Khóa chính thông báo.
- **Người nhận thông báo:** Bắt buộc, Vai trò Admin.
- **Tiêu đề:** Max 100 ký tự (Ví dụ: "Có Ticket #TK-9999 bị báo sai phòng ban cần điều chuyển").
- **Nội dung thông báo:** Max 255 ký tự (Gồm mã đơn, phòng ban chuyển trả, lý do chuyển).
- **Ticket liên quan:** Bắt buộc, ID Ticket.

**Luồng chính (Main Flow):**

1. Khi Nhân viên bấm chuyển đơn sai phòng ban (`NV-04`), hệ thống phát thông báo In-app tới Hàng chờ thông báo của Admin.
2. Admin nhấp vào thông báo quả chuông.
3. Hệ thống điều hướng thẳng tới màn hình Hàng chờ đơn sai phòng ban chờ điều chuyển (`AD-05`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bấm thông báo → Chuyển hướng trực tiếp mở danh sách Hàng chờ điều chuyển của Admin.

---

