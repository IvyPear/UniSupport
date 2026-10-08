# PHÂN HỆ: M12 — GIÁM SÁT TIẾN ĐỘ (PROGRESS MONITORING)

> **Giai đoạn:** GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT  
> **Actor chính:** Quản lý phòng ban, Admin  

---

## [FR-M12-01] Quản lý theo dõi tiến độ và hiệu suất nhân viên phòng ban
* **Mô tả:** Quản lý phòng ban theo dõi danh sách các đơn đang xử lý, tiến độ giải quyết và tải khối lượng công việc của từng Nhân viên.
* **Actor:** Quản lý phòng ban
* **Preconditions:** Role Quản lý phòng ban.
* **Trường dữ liệu (Data Fields):**
  * `department_id`: Integer (Bắt buộc)
  * `total_tickets`: Integer (Số liệu tính toán)
  * `in_progress_count`: Integer (Số liệu tính toán)
  * `pending_count`: Integer (Số liệu tính toán)
  * `resolved_count`: Integer (Số liệu tính toán)
* **Main Flow:**
  1. Mở màn hình Giám sát tiến độ phòng ban.
  2. Hệ thống tổng hợp số đơn `New`, `In Progress`, `Pending`, `Resolved` theo từng Nhân viên.
  3. Quản lý nhấp xem danh sách chi tiết công việc của một Nhân viên cụ thể.
* **Acceptance Criteria (AC):**
  * **AC-01:** Hiển thị chính xác bảng phân bổ khối lượng công việc thực tế của từng nhân sự phòng ban.

---

## [FR-M12-02] Theo dõi Ticket tồn đọng, chưa tiếp nhận và quá hạn SLA
* **Mô tả:** Hệ thống hiển thị cảnh báo đỏ đối với các Ticket chưa có người nhận quá lâu hoặc có nguy cơ quá hạn SLA.
* **Actor:** Quản lý phòng ban
* **Trường dữ liệu (Data Fields):**
  * `overdue_threshold_hours`: Integer (Ngưỡng thời gian SLA tính theo giờ)
  * `flagged_ticket_ids`: Array of Integers (Danh sách ID đơn vượt quá mốc SLA)
  * `alert_level`: Enum (`WARNING`, `CRITICAL`)
* **Main Flow:**
  1. Mở danh sách Giám sát cảnh báo.
  2. Hệ thống lọc và tô đỏ các Ticket quá hạn đếm ngược 72h hoặc quá hạn SLA phòng ban.
  3. Quản lý xem chi tiết để can thiệp điều phối (Re-assign).
* **Acceptance Criteria (AC):**
  * **AC-01:** Ticket vượt mốc thời gian quy định lập tức hiển thị nhãn cảnh báo đỏ nổi bật.

---

## [FR-M12-03] Admin theo dõi tiến độ xử lý và cảnh báo toàn trường
* **Mô tả:** Admin giám sát chỉ số quá hạn và điểm nghẽn tiến độ trên phạm vi tất cả các phòng ban trong toàn trường.
* **Actor:** Admin
* **Trường dữ liệu (Data Fields):**
  * `global_overdue_count`: Integer (Tổng số đơn quá hạn toàn trường)
  * `department_bottlenecks`: Array of Objects (`dept_name`, `open_count`, `overdue_count`, `csat_score`)
* **Main Flow:**
  1. Admin mở Giám sát tiến độ toàn trường.
  2. Hệ thống thống kê danh sách các phòng ban có tỷ lệ tồn đọng hoặc quá hạn cao nhất.
* **Acceptance Criteria (AC):**
  * **AC-01:** Hiển thị đầy đủ số liệu giám sát và điểm nghẽn tiến độ của toàn hệ thống.
