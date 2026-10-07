# PHÂN HỆ: BÁO CÁO & THỐNG KÊ (REP)

## [FR-REP-01] Admin xem báo cáo thống kê tổng quan (Global Dashboard)
* **Mô tả:** Admin truy xuất dashboard xem số lượng ticket, phân loại trạng thái và tỷ lệ xử lý theo từng phòng ban, giúp đánh giá nhanh hiệu suất toàn hệ thống.
* **Actor:** Quản trị viên (Admin).
* **Preconditions:** Admin đã đăng nhập vào hệ thống với quyền hạn quản trị cao nhất.
* **Main Flow:**
  1. Admin truy cập vào menu *Báo cáo / Dashboard*.
  2. Admin chọn mốc thời gian muốn xem (Ví dụ: Tuần này, Tháng này, hoặc Tùy chọn khoảng thời gian cụ thể).
  3. Hệ thống tổng hợp dữ liệu từ cơ sở dữ liệu dựa trên mốc thời gian đã chọn.
  4. Hệ thống hiển thị các số liệu và biểu đồ trực quan, bao gồm:
     * Tổng số lượng ticket toàn trường và phân bổ theo từng phòng ban.
     * Số lượng ticket theo từng trạng thái cụ thể (`New`, `In Progress`, `Pending`, `Resolved`, `Closed`).
     * Tỷ lệ hoàn thành đúng hạn / quá hạn của từng phòng ban.
* **Business Rules:**
  * **BR-01 (Tầm nhìn toàn cảnh):** Dữ liệu hiển thị trên Dashboard của Admin phải bao quát toàn bộ hệ thống, tổng hợp đồng thời từ tất cả các phòng ban trong trường.
  * **BR-02 (Bộ lọc thời gian):** Báo cáo bắt buộc phải hỗ trợ tính năng lọc theo thời gian. Mặc định khi mới truy cập, hệ thống sẽ hiển thị dữ liệu của *"Tháng hiện tại"*.
* **Alternative / Error Flows:**
  * Không có.
* **Acceptance Criteria (AC):**
  * **AC-01:** Admin truy cập vào Dashboard $\rightarrow$ Hệ thống hiển thị đầy đủ số lượng ticket, trạng thái và tỷ lệ xử lý tổng hợp theo từng phòng ban của tháng hiện tại.
  * **AC-02 (Kiểm tra BR-02 - Lọc dữ liệu):** Admin chọn khoảng thời gian từ ngày `01/10/2026` đến `05/10/2026` $\rightarrow$ Biểu đồ lập tức cập nhật lại, chỉ tính toán trên các đơn được tạo trong khoảng thời gian này.
  * **AC-03 (Kiểm tra Phân quyền):** Đăng nhập bằng tài khoản Trưởng phòng hoặc Nhân viên $\rightarrow$ Menu Báo cáo tổng quan (`Global Dashboard`) hoàn toàn bị ẩn, không thể truy cập.

---

## [FR-REP-02] Quản lý xem báo cáo phòng ban (Department Dashboard)
* **Mô tả:** Trưởng phòng truy xuất Dashboard để theo dõi tổng lưu lượng đơn, tỷ lệ giải quyết và đo lường hiệu suất làm việc (KPI) của từng nhân viên trong nội bộ phòng ban mình quản lý.
* **Actor:** Quản lý / Trưởng phòng (Manager).
* **Preconditions:** Quản lý đã đăng nhập vào hệ thống với phân quyền gắn liền với phòng ban tương ứng.
* **Main Flow:**
  1. Trưởng phòng truy cập vào menu *Báo cáo / Dashboard*.
  2. Người dùng chọn mốc thời gian muốn xem (Ví dụ: Tuần này, Tháng này).
  3. Hệ thống truy xuất dữ liệu các ticket được phân bổ riêng về phòng ban đó.
  4. Hệ thống hiển thị các biểu đồ và bảng số liệu, bao gồm:
     * Tổng số lượng ticket của phòng ban (chia theo từng trạng thái).
     * Bảng hiệu suất cá nhân: Hiển thị danh sách nhân viên trong phòng kèm theo số lượng đơn đã tiếp nhận, số đơn đã hoàn thành (`Resolved`) và số đơn quá hạn (`Auto-Closed`).
* **Business Rules:**
  * **BR-01 (Cách ly dữ liệu - Data Isolation):** Dữ liệu trên Dashboard của Trưởng phòng bắt buộc phải được lọc khép kín theo đúng mã phòng ban của họ. Tuyệt đối không được rò rỉ hay hiển thị dữ liệu của các phòng ban khác.
  * **BR-02 (Bộ lọc thời gian):** Báo cáo bắt buộc phải hỗ trợ tính năng lọc theo thời gian. Mặc định khi mới truy cập, hệ thống sẽ hiển thị dữ liệu của *"Tháng hiện tại"*.
* **Alternative / Error Flows:**
  * Không có.
* **Acceptance Criteria (AC):**
  * **AC-01 (Luồng chuẩn):** Trưởng phòng truy cập Dashboard $\rightarrow$ Hệ thống hiển thị biểu đồ trạng thái đơn và bảng xếp hạng hiệu suất của các nhân viên trực thuộc phòng ban đó.
  * **AC-02 (Kiểm tra BR-01 - Cách ly dữ liệu):** Đăng nhập bằng tài khoản Trưởng phòng IT $\rightarrow$ Số liệu trên Dashboard chỉ đếm các đơn của phòng IT, tuyệt đối không trộn lẫn số liệu của phòng Tài chính hay Đào tạo.
  * **AC-03 (Kiểm tra Phân quyền):** Đăng nhập bằng tài khoản Nhân viên thường $\rightarrow$ Menu Báo cáo Dashboard hoàn toàn bị ẩn, không thể truy cập.
