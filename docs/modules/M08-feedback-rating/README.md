# PHÂN HỆ: ĐÁNH GIÁ & ĐÓNG ĐƠN TỰ ĐỘNG (FB)

## [FR-FB-01] Sinh viên gửi đánh giá chất lượng
* **Mô tả:** Sinh viên chọn điểm sao (1-5) và để lại nhận xét cho ticket đang ở trạng thái `Resolved`.
* **Actor:** Sinh viên.
* **Preconditions:** Ticket đang ở trạng thái `Resolved`; sinh viên là người tạo ra ticket đó.
* **Main Flow:**
  1. Sinh viên truy cập vào chi tiết ticket đã được xử lý xong (`Resolved`). Hệ thống hiển thị biểu mẫu đánh giá.
  2. Sinh viên nhấp chọn mức độ điểm sao (từ 1 đến 5 sao) và nhập nội dung nhận xét (nếu muốn).
  3. Sinh viên bấm "Gửi đánh giá".
  4. Hệ thống ghi nhận điểm số và nhận xét vào cơ sở dữ liệu của ticket.
  5. Hệ thống lập tức tự động chuyển trạng thái ticket từ `Resolved` sang `Closed`.
* **Business Rules:**
  * **BR-01:** Điểm sao (từ 1 đến 5) là trường bắt buộc. Nội dung nhận xét bằng chữ là trường tùy chọn (có thể để trống).
  * **BR-02:** Thao tác đánh giá chỉ được thực hiện đúng một lần duy nhất cho mỗi đơn. Khi đơn đã sang trạng thái `Closed`, biểu mẫu đánh giá sẽ tự động biến mất.
* **Alternative / Error Flows:**
  * Nếu sinh viên bấm "Gửi" mà chưa chọn mức sao nào $\rightarrow$ Hệ thống báo đỏ vùng chọn sao và yêu cầu bắt buộc phải chọn mức điểm.
* **Acceptance Criteria (AC):**
  * **AC-01 (Kiểm tra luồng chuẩn):** Sinh viên chọn 5 sao, để trống ô nhận xét và bấm Gửi $\rightarrow$ Hệ thống ghi nhận thành công, đơn ngay lập tức chuyển trạng thái sang `Closed`.
  * **AC-02 (Kiểm tra BR-01):** Sinh viên không bấm chọn sao, chỉ gõ chữ và bấm Gửi $\rightarrow$ Hệ thống chặn lại và hiển thị thông báo yêu cầu chọn điểm sao.
  * **AC-03 (Kiểm tra BR-02):** Sinh viên mở một ticket đã ở trạng thái `Closed` (đã đánh giá trước đó) $\rightarrow$ Hệ thống chỉ hiển thị kết quả đánh giá cũ, tuyệt đối không cho phép đánh giá lại.

---

## [FR-FB-02] Hệ thống đóng Ticket tự động do quá hạn (Auto-Close)
* **Mô tả:** Nếu nhân viên đã xử lý xong (đơn chuyển sang `Resolved`) mà sinh viên không chịu vào đánh giá, hệ thống sẽ tự động chốt đóng đơn sau 3 ngày để dọn dẹp hàng đợi.
* **Actor:** Hệ thống.
* **Preconditions:** Ticket vừa được nhân viên chuyển sang trạng thái `Resolved`.
* **Main Flow:**
  1. Ngay khi đơn chuyển sang `Resolved`, hệ thống kích hoạt đồng hồ đếm ngược ngầm trong 3 ngày (72 giờ).
  2. Nếu sinh viên vào đánh giá sao trước khi hết hạn $\rightarrow$ Hệ thống chuyển đơn sang `Closed` (đã xử lý tại `FR-FB-01`) và hủy bộ đếm ngầm.
  3. Nếu hết đúng 72 giờ mà sinh viên vẫn không có bất kỳ thao tác đánh giá nào $\rightarrow$ Hệ thống tự động cập nhật trạng thái đơn thành `Closed`.
* **Business Rules:**
  * **BR-01 (Chốt chặn cuối):** `Closed` là trạng thái kết thúc vĩnh viễn. Mọi đơn đã chuyển sang `Closed` (do sinh viên đánh giá hoặc do máy tự động đóng) đều bị khóa cứng toàn bộ các thao tác chỉnh sửa, phản hồi hay đánh giá.
* **Acceptance Criteria (AC):**
  * **AC-01:** Lấy một đơn đang ở trạng thái `Resolved`, mô phỏng thời gian hệ thống trôi qua đúng 72 giờ (không có thao tác đánh giá từ sinh viên) $\rightarrow$ Hệ thống tự động chuyển trạng thái đơn thành `Closed`.
  * **AC-02 (Kiểm tra BR-01 - Khóa vĩnh viễn):** Mở xem một đơn đã ở trạng thái `Closed` $\rightarrow$ Giao diện chỉ cho phép đọc thông tin cũ, tuyệt đối không hiển thị các nút thao tác như *Chỉnh sửa*, *Gửi phản hồi* hay *Đánh giá*.
