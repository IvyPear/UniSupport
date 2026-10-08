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
