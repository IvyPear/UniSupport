# PHÂN HỆ: M13 — DASHBOARD & BÁO CÁO (DASHBOARD & REPORTING)

> **Giai đoạn:** GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT  
> **Actor chính:** Quản lý phòng ban, Admin  

---

## [FR-M13-01] Dashboard và biểu đồ thống kê theo phạm vi quyền
* **Mô tả:** Giao diện Dashboard trực quan hiển thị biểu đồ thống kê lưu lượng Ticket theo phân quyền (Phòng ban / Global toàn trường).
* **Actor:** Quản lý phòng ban, Admin
* **Preconditions:** Đã đăng nhập tài khoản Quản lý hoặc Admin.
* **Main Flow:**
  1. Mở trang Dashboard.
  2. Hệ thống tải các Widget biểu đồ: Biểu đồ cột lưu lượng theo tháng, biểu đồ tròn tỷ lệ trạng thái, thẻ chỉ số tổng quan.
  3. Chọn khoảng thời gian lọc (Tuần / Tháng / Quý).
* **Acceptance Criteria (AC):**
  * **AC-01:** Biểu đồ hiển thị chính xác số liệu thống kê thời gian thực theo khoảng thời gian đã chọn.

---

## [FR-M13-02] Báo cáo Ticket theo trạng thái, danh mục và khoảng thời gian
* **Mô tả:** Xuất báo cáo dữ liệu tổng hợp chi tiết theo trạng thái, danh mục dịch vụ và hỗ trợ tải file Excel/PDF.
* **Actor:** Quản lý phòng ban, Admin
* **Main Flow:**
  1. Truy cập mục Báo cáo thống kê.
  2. Chọn tiêu chí lọc: Từ ngày - Đến ngày, Trạng thái, Danh mục.
  3. Bấm “Xem báo cáo” hoặc “Xuất file Excel”.
  4. Hệ thống tải xuống tệp báo cáo Excel chuẩn hóa.
* **Acceptance Criteria (AC):**
  * **AC-01:** Xuất file Excel đúng định dạng, đầy đủ dữ liệu báo cáo theo tiêu chí lọc.

---

## [FR-M13-03] Thống kê đánh giá hài lòng (CSAT) và hiệu suất nhân sự
* **Mô tả:** Báo cáo thống kê điểm hài lòng trung bình (CSAT 1-5 sao), bảng tổng hợp nhận xét của Sinh viên và chỉ số KPI hoàn thành công việc của Nhân viên.
* **Actor:** Quản lý phòng ban, Admin
* **Main Flow:**
  1. Mở Báo cáo đánh giá hài lòng & KPI.
  2. Hệ thống tính điểm CSAT trung bình của phòng ban và từng Nhân viên.
  3. Hiển thị bảng chi tiết các nhận xét từ Sinh viên.
* **Acceptance Criteria (AC):**
  * **AC-01:** Điểm CSAT trung bình được tính chính xác dựa trên tổng số đánh giá thực tế của Sinh viên.
