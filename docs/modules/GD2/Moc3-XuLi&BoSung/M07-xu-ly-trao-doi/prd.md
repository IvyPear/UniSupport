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
* **BR-02 (Phụ thuộc Giai đoạn):** Để nghiệm thu thành công luồng này ở **Giai đoạn 1**, giao diện và API cốt lõi dành cho Admin tiếp nhận & điều chuyển đơn sai phòng ban (`[FR-M11-03]` Core MVP) được triển khai và bóc tách thực thi đồng bộ ngay ở Giai đoạn 1.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bấm chuyển trả kèm lý do → Xóa nhân viên phụ trách, đưa về Chưa tiếp nhận mục Khác cho Admin và lưu log lý do chuyển trả.

## [FR-M07-04] Tra cứu lịch sử Ticket cá nhân (Lịch sử xử lý)

**Mô tả:** Nhân viên tra cứu, tìm kiếm và xem lại danh sách các Ticket mình đã từng tiếp nhận, xử lý hoặc giải quyết trong quá khứ, xem điểm đánh giá (CSAT) từ Sinh viên.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Nhân viên.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Tùy chọn, Mã Ticket hoặc Tiêu đề Ticket.
- **Khoảng thời gian:** Tùy chọn, Từ ngày - Đến ngày.
- **Trạng thái Ticket:** Hoàn thành (`Resolved`), Đã điều chuyển (`Reassigned`), v.v.
- **Điểm đánh giá (CSAT):** Mức 1-5 sao từ Sinh viên (nếu có).

**Luồng chính (Main Flow):**

1. Nhân viên truy cập menu **"Lịch sử xử lý"**.
2. Hệ thống tải danh sách các Ticket Nhân viên đã từng phụ trách trong quá khứ.
3. Nhân viên thực hiện tìm kiếm/lọc theo thời gian, mã đơn hoặc mức đánh giá hài lòng.
4. Nhân viên chọn một Ticket để xem chi tiết lịch sử trao đổi, ghi chú nội bộ (Audit Trail) và nhận xét của Sinh viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nhân viên chỉ xem được lịch sử các Ticket mà chính mình đã từng được gán làm Assignee hoặc thao tác xử lý.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị đúng danh sách Ticket quá khứ kèm đầy đủ Audit Trail và điểm đánh giá 1-5 sao của Sinh viên.

---

