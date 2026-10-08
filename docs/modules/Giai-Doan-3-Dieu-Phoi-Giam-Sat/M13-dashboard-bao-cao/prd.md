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
