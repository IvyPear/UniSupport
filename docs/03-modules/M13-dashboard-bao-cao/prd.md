# PHÂN HỆ: M13 — DASHBOARD & BÁO CÁO (DASHBOARD & REPORTING)

## [FR-M13-01] Hiển thị bảng thống kê tổng quan và biểu đồ số lượng đơn

**Mô tả:** Giao diện Dashboard trực quan hiển thị các thẻ chỉ số (KPI Cards) tổng quan và hệ thống biểu đồ thống kê lưu lượng đơn theo trạng thái và thời gian.

**Actor:** Quản lý phòng ban, Admin

**Priority:** **High** — Cung cấp bức tranh toàn cảnh về hiệu suất vận hành của hệ thống cho các cấp quản lý và lãnh đạo.

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

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Dữ liệu trên Dashboard được làm mới tự động theo cơ chế thời gian thực (Polling mỗi 60 giây hoặc khi người dùng chủ động tải lại trang).
* **BR-02:** Tỷ lệ % hoàn thành trên biểu đồ tròn được làm tròn đến 1 chữ số thập phân, đảm bảo tổng các phần bằng đúng 100%.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Khoảng thời gian lọc không hợp lệ):** Người dùng chọn `Từ ngày` lớn hơn `Đến ngày` $\rightarrow$ Hệ thống báo lỗi validation `422 Unprocessable Entity` và yêu cầu chọn lại.
* **E-02 (Khoảng thời gian không có dữ liệu phát sinh):** Kỳ lọc chưa có Ticket nào $\rightarrow$ Các thẻ KPI hiển thị `0` và biểu đồ hiển thị trạng thái trống (*Empty State*) không lỗi.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác 4 thẻ chỉ số (Tổng đơn, Đang xử lý, Hoàn thành, Quá hạn SLA) và biểu đồ theo mốc thời gian đã chọn (tự làm mới mỗi 60 giây theo `BR-01`, tổng tỷ lệ tròn bằng 100% theo `BR-02`, hiển thị `0` nếu kỳ lọc trống theo `E-01`, `E-02`).

**Ví dụ Edge Case (Trường hợp biên):**

* Kỳ thống kê có 3 đơn thuộc 3 trạng thái khác nhau (mỗi trạng thái 1 đơn $\approx 33.33\%$) $\rightarrow$ Biểu đồ tròn làm tròn đến 1 chữ số thập phân và tự cân bằng phần dư để tổng hiển thị đạt đúng `100.0%` (`BR-02`).

---

## [FR-M13-02] Hiển thị dữ liệu thống kê đúng theo quyền của Trưởng phòng và Admin

**Mô tả:** Hệ thống kiểm soát phạm vi truy cập dữ liệu thống kê (Data Isolation & RBAC): Trưởng phòng chỉ xem thống kê nội bộ phòng ban; Admin xem số liệu toàn hệ thống trường.

**Priority:** High (Đảm bảo an toàn phân tách dữ liệu thống kê RBAC giữa Trưởng phòng và Admin).

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

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Trưởng phòng truyền tham số phòng ban khác):** Tài khoản `Manager` can thiệp query param gửi `department_id` của phòng ban khác $\rightarrow$ Backend từ chối với mã `403 Forbidden` (`BR-01`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Trưởng phòng chỉ xem được dữ liệu thống kê thuộc phòng ban của mình; nếu gọi API của phòng ban khác hoặc toàn trường thì bị chặn `403 Forbidden` (`BR-01`, `E-01`).
* **AC-02:** Admin xem được toàn bộ số liệu tổng hợp của tất cả phòng ban toàn trường và lọc xem được từng phòng ban cụ thể (`BR-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Admin chọn lọc Dashboard theo "Phòng Đào tạo" trong tháng 10 $\rightarrow$ Các con số tổng hợp hiển thị trùng khớp 100% với màn hình Dashboard của Trưởng phòng Đào tạo trong cùng kỳ.

---

## [FR-M13-03] Xuất báo cáo số liệu ra file Excel và PDF

**Mô tả:** Cho phép Quản lý và Admin xuất các báo cáo số liệu tổng hợp và chi tiết ra tệp định dạng Excel (.xlsx) hoặc PDF để phục vụ công tác lưu trữ và báo cáo giao ban.

**Priority:** Medium (Tiện ích kết xuất báo cáo phục vụ họp giao ban định kỳ; thuộc phạm vi cam kết nghiệm thu MS-03 UAT).

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

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Định dạng xuất không hỗ trợ):** Gửi tham số `format` khác `.xlsx` và `.pdf` $\rightarrow$ Backend trả về lỗi `422 Unprocessable Entity`.
* **E-02 (Xuất báo cáo khi danh sách lọc rỗng):** Bộ lọc hiện tại có `0` bản ghi $\rightarrow$ Hệ thống vẫn xuất tệp hợp lệ gồm tiêu đề báo cáo và dòng ghi chú *"Không có dữ liệu phát sinh trong kỳ lọc"*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Xuất file `.xlsx` hoặc `.pdf` tải về thành công (trong thời gian $\le 2.000\text{ms}$ theo `NFR-PERF-02`), chứa đầy đủ tiêu đề trường, ngày xuất và bảng số liệu khớp 100% với bộ lọc hiện tại trên màn hình (`BR-01`, `E-01`, `E-02`).

**Ví dụ Edge Case (Trường hợp biên):**

* Trưởng phòng lọc riêng trạng thái `Quá hạn SLA` rồi bấm "Xuất Excel" $\rightarrow$ File `.xlsx` tải về chỉ liệt kê đúng các đơn quá hạn của phòng ban đó, không lẫn đơn của phòng ban khác.

---

## [FR-M13-04] Thống kê điểm đánh giá hài lòng và hiệu suất làm việc của nhân viên

**Mô tả:** Báo cáo tổng hợp điểm đánh giá mức độ hài lòng trung bình (CSAT 1-5 sao), bảng nhận xét của sinh viên và các chỉ số hiệu suất hoàn thành công việc (KPI) của từng nhân sự.

**Priority:** Medium (Thống kê chuyên sâu phục vụ đánh giá thi đua và nâng cao chất lượng dịch vụ nội bộ).

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

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Nhân viên chưa có đơn nào được đánh giá sao):** Nhân viên chỉ có các đơn tự động đóng (`rating = null`) hoặc chưa hoàn thành đơn nào $\rightarrow$ Cột điểm CSAT trung bình hiển thị `"N/A"` (*Chưa có đánh giá*) thay vì `0.0`, tránh chia cho 0 (`BR-01`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác bảng KPI từng nhân viên (Số Ticket đã giải quyết, Tỷ lệ hoàn thành đúng hạn SLA %, Điểm CSAT trung bình từ 1.0–5.0 tính riêng trên các đơn có đánh giá thực tế và danh sách nhận xét); hiển thị `"N/A"` nếu chưa có lượt đánh giá nào (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Nhân viên giải quyết 3 đơn: 2 đơn sinh viên chấm `5 sao`, 1 đơn hệ thống tự động đóng sau 3 ngày (`rating = null`) $\rightarrow$ Điểm CSAT trung bình của nhân viên được tính là `(5 + 5) / 2 = 5.0 sao`, không tính đơn `null` vào mẫu số (`BR-01`).

---
