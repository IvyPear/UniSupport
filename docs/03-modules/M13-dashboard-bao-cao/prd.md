# PHÂN HỆ: M13 — DASHBOARD & BÁO CÁO (DASHBOARD & REPORTING)

## [FR-M13-01] Hiển thị bảng thống kê tổng quan và biểu đồ số lượng đơn

**Mô tả:** Giao diện Dashboard trực quan hiển thị các thẻ chỉ số (KPI Cards) tổng quan và hệ thống biểu đồ thống kê lưu lượng đơn theo trạng thái và thời gian.

**Actor:** Quản lý phòng ban, Admin

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với tài khoản vai trò Quản lý hoặc Admin.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Khoảng thời gian:** Lọc theo Tuần này, Tháng này, Quý này hoặc tùy chọn Từ ngày - Đến ngày.
- **Thẻ chỉ số tổng quan:** Tổng số đơn, Đơn đang xử lý, Đơn hoàn thành, Đơn quá hạn SLA.
- **Biểu đồ hiển thị:** Biểu đồ cột (lưu lượng đơn theo ngày/tháng), Biểu đồ tròn (tỷ lệ phần trăm trạng thái).

**Luồng chính (Main Flow):**

1. Người dùng mở trang Dashboard.
2. Hệ thống tải các Widget thẻ chỉ số tổng quan.
3. Hệ thống vẽ các biểu đồ trực quan về xu hướng tiếp nhận và tỷ lệ phân bố trạng thái đơn.
4. Người dùng thay đổi bộ lọc thời gian $\rightarrow$ Hệ thống tự động tính toán lại và vẽ lại biểu đồ tương ứng.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Biểu đồ và các thẻ chỉ số hiển thị chính xác số liệu thống kê thời gian thực theo mốc thời gian đã chọn.

---

## [FR-M13-02] Hiển thị dữ liệu thống kê đúng theo quyền của Trưởng phòng và Admin

**Mô tả:** Hệ thống kiểm soát phạm vi truy cập dữ liệu thống kê (Data Isolation & RBAC): Trưởng phòng chỉ xem thống kê nội bộ phòng ban; Admin xem số liệu toàn hệ thống trường.

**Actor:** Quản lý phòng ban, Admin

**Preconditions (Điều kiện tiên quyết):** Đã đăng nhập vào hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Vai trò người dùng:** `Manager` hoặc `Admin`.
- **Phạm vi phòng ban:** `department_id` của Trưởng phòng hoặc `All` đối với Admin.

**Luồng chính (Main Flow):**

1. Người dùng truy cập trang Dashboard hoặc Báo cáo.
2. Hệ thống đọc thông tin vai trò từ phiên đăng nhập:
   - **Đối với Trưởng phòng (`Manager`):** Toàn bộ biểu đồ và thẻ chỉ số chỉ hiển thị dữ liệu của phòng ban đó. Trưởng phòng không thể xem dữ liệu phòng khác.
   - **Đối với Quản trị viên (`Admin`):** Cung cấp bộ lọc chọn xem theo từng phòng ban cụ thể.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Phân tách dữ liệu thống kê bắt buộc phải thực thi an toàn ở tầng Backend/Database, không chỉ ẩn hiện ở Frontend.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Trưởng phòng chỉ xem được dữ liệu thống kê thuộc phòng ban của mình.
* **AC-02:** Admin xem được toàn bộ số liệu của tất cả phòng ban toàn trường.

---

## [FR-M13-03] Xuất báo cáo số liệu ra file Excel và PDF

**Mô tả:** Cho phép Quản lý và Admin xuất các báo cáo số liệu tổng hợp và chi tiết ra tệp định dạng Excel (.xlsx) hoặc PDF để phục vụ công tác lưu trữ và báo cáo giao ban.

**Actor:** Quản lý phòng ban, Admin

**Preconditions (Điều kiện tiên quyết):** Đã lọc danh sách dữ liệu cần xuất báo cáo.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Tiêu chí xuất báo cáo:** Khoảng thời gian, Danh mục dịch vụ, Trạng thái đơn.
- **Định dạng file xuất:** Tùy chọn `.xlsx` (Excel) hoặc `.pdf`.

**Luồng chính (Main Flow):**

1. Người dùng truy cập menu “Báo cáo & Thống kê”.
2. Chọn các tiêu chí lọc dữ liệu báo cáo (Khoảng thời gian, phòng ban, trạng thái).
3. Nhấp nút “Xuất báo cáo Excel” hoặc “Xuất file PDF”.
4. Hệ thống tạo file báo cáo chuẩn hóa (gồm tiêu đề trường, ngày xuất, bảng dữ liệu chi tiết và chữ ký số/ghi chú).
5. Trình duyệt tự động tải xuống tệp dữ liệu tương ứng.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Dữ liệu trong file xuất ra phải khớp chính xác với kết quả hiển thị trên bảng lọc tại thời điểm xuất.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Xuất file Excel/PDF đúng định dạng, đầy đủ dữ liệu và tải về thành công.

---

## [FR-M13-04] Thống kê điểm đánh giá hài lòng và hiệu suất làm việc của nhân viên

**Mô tả:** Báo cáo tổng hợp điểm đánh giá mức độ hài lòng trung bình (CSAT 1-5 sao), bảng nhận xét của sinh viên và các chỉ số hiệu suất hoàn thành công việc (KPI) của từng nhân sự.

**Actor:** Quản lý phòng ban, Admin

**Preconditions (Điều kiện tiên quyết):** Có các Ticket đã hoàn thành và được đánh giá trong hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Điểm CSAT trung bình:** Thang điểm 1.0 đến 5.0 sao.
- **Phân bố số sao:** Số lượt đánh giá 1 sao, 2 sao, 3 sao, 4 sao, 5 sao.
- **Chỉ số hiệu suất nhân sự:**
  - Tên nhân viên.
  - Số lượng Ticket đã giải quyết.
  - Tỷ lệ hoàn thành đúng hạn SLA (%).
  - Điểm CSAT trung bình của nhân viên đó.
  - Danh sách ý kiến nhận xét của sinh viên.

**Luồng chính (Main Flow):**

1. Người dùng mở mục “Báo cáo Đánh giá hài lòng & Hiệu suất”.
2. Hệ thống tính toán điểm trung bình CSAT của đơn vị và vẽ biểu đồ phân bố mức độ hài lòng.
3. Hiển thị bảng xếp hạng năng suất của từng Nhân viên trong phòng ban (hoặc toàn trường nếu là Admin).
4. Người dùng có thể nhấp vào một Nhân viên để đọc chi tiết các dòng nhận xét/góp ý thực tế từ Sinh viên gửi cho nhân sự đó.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Điểm CSAT được tính từ trung bình cộng số sao của các đơn có sinh viên gửi đánh giá thực tế.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Điểm đánh giá CSAT và các chỉ số KPI nhân viên được tính toán chính xác và hiển thị minh bạch.

---
