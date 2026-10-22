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

## [FR-M12-04] Tiếp nhận thông báo & Cảnh báo tồn đọng / Quá hạn SLA cho Quản lý

**Mô tả:** Quản lý phòng ban (Trưởng phòng) và Admin nhận thông báo/cảnh báo hệ thống khi Ticket bị quá hạn SLA hoặc chưa được tiếp nhận vượt quá thời gian quy định (Sự kiện #6 trong Ma trận thông báo).

**Actor:** Quản lý phòng ban, Admin

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập tài khoản Quản lý hoặc Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã thông báo:** Khóa chính thông báo.
- **Người nhận thông báo:** Bắt buộc, ID Quản lý phòng ban / Admin.
- **Mức độ cảnh báo:** Warning / Critical (Vượt mốc SLA).
- **Ticket liên quan:** Bắt buộc, ID Ticket quá hạn.

**Luồng chính (Main Flow):**

1. Hệ thống chạy job kiểm tra định kỳ (Background SLA checker).
2. Nếu phát hiện Ticket tồn đọng hoặc quá hạn SLA phòng ban, hệ thống phát cảnh báo trực quan trên Dashboard và sinh thông báo In-app cho Quản lý phòng ban.
3. Quản lý nhấp vào thông báo/cảnh báo để mở trực tiếp Ticket bị quá hạn và tiến hành phân công lại hoặc đôn đốc nhân viên (`QL-02`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhấp vào cảnh báo quá hạn → Mở thẳng chi tiết Ticket đó để Quản lý can thiệp kịp thời.

## [FR-M12-05] Tra cứu Ticket toàn hệ thống (Global Ticket Search)

**Mô tả:** Admin có đặc quyền tìm kiếm, truy vết tiến độ và xem lịch sử luân chuyển của bất kỳ Ticket nào trên phạm vi toàn trường nhằm phục vụ công tác thanh tra, giải đáp thắc mắc đột xuất.

**Actor:** Admin

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Bắt buộc, nhập Mã Ticket (ưu tiên) hoặc Tên/Mã Sinh viên.
- **Quyền truy cập dữ liệu:** Vượt qua rào cản phòng ban (Bypass Data Isolation).

**Luồng chính (Main Flow):**

1. Admin mở công cụ “Tra cứu toàn trường”.
2. Nhập chính xác Mã Ticket hoặc thông tin Sinh viên.
3. Hệ thống quét toàn bộ Database và trả về danh sách kết quả phù hợp.
4. Admin nhấp vào Ticket để xem chi tiết toàn bộ: Trạng thái hiện hành, Phòng ban đang thụ lý, Nhân viên phụ trách, và toàn bộ lịch sử luân chuyển (Audit Trail).

**Business Rules (Quy tắc nghiệp vụ):**

- **BR-01 (Đặc quyền xuyên phòng ban):** Chỉ Role Admin mới được phép tìm kiếm và xem chi tiết Ticket không phân biệt phòng ban. Các Role khác (Kể cả Trưởng phòng) bị giới hạn tuyệt đối trong phòng ban của mình.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin nhập đúng Mã Ticket → Hệ thống hiển thị chi tiết đơn dù đơn đó đang nằm ở bất kỳ phòng ban nào.

---
