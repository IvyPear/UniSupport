# PHÂN HỆ: THÔNG BÁO HỆ THỐNG (NOTI)

## [FR-NOTI-01] Hệ thống gửi thông báo tự động
* **Mô tả:** Hệ thống phát cảnh báo qua in-app đến các bên liên quan khi ticket có thay đổi.
* **Actor:** Hệ thống.
* **Preconditions:** Ticket đã tồn tại trên hệ thống và có sự thay đổi trạng thái hoặc phát sinh thông tin mới.
* **Main Flow:**
  1. Hệ thống ghi nhận sự kiện ticket có thay đổi trạng thái hoặc có thông tin mới.
  2. Hệ thống xác định chính xác đối tượng cần nhận thông báo.
  3. Hệ thống tự động tạo một bản tin ngắn và đẩy vào mục "Thông báo" (biểu tượng quả chuông) trên tài khoản của người nhận, hiển thị số lượng thông báo mới (chấm đỏ báo hiệu).
* **Business Rules:**
  * **BR-01:** Người dùng nhấp vào một dòng thông báo bất kỳ $\rightarrow$ Hệ thống phải tự động chuyển hướng (mở) thẳng vào trang chi tiết của chính ticket đó.
  * **BR-02:** Chỉ gửi thông báo khi ticket của họ thay đổi trạng thái (Sang `In Progress`, `Pending`, `Resolved`, `Closed`).
  * **BR-03:** Chỉ gửi khi họ được Trưởng phòng phân công (`Assign`), hoặc khi sinh viên gửi bổ sung thông tin cho đơn họ đang giữ.
  * **BR-04:** Chỉ gửi khi có một nhân viên từ phòng khác chuyển (`Transfer`) một đơn sang cho phòng mình.
  * **BR-05:** Chỉ gửi khi có đơn mới mang danh mục "Khác" vừa được khởi tạo thành công.
* **Alternative / Error Flows:**
  * Nếu hệ thống thông báo in-app gặp sự cố kết nối, sự kiện thông báo sẽ được đưa vào hàng đợi ngầm để thực hiện phát lại (`Retry`) khi có mạng trở lại, đảm bảo người dùng không bị bỏ lỡ thông tin quan trọng.
* **Acceptance Criteria (AC):**
  * **AC-01 (Kiểm tra BR-02 - Luồng Sinh viên):** Nhân viên đổi trạng thái đơn của Sinh viên A sang `Resolved` $\rightarrow$ Quả chuông trên tài khoản của Sinh viên A báo đỏ với nội dung: *"Yêu cầu [Mã đơn] của bạn đã được xử lý"*.
  * **AC-02 (Kiểm tra BR-03 - Luồng Nhân viên):** Trưởng phòng phân công đơn cho Nhân viên B $\rightarrow$ Quả chuông trên tài khoản Nhân viên B báo đỏ với nội dung: *"Bạn vừa được giao xử lý yêu cầu [Mã đơn]"*.
  * **AC-03 (Kiểm tra BR-01 - Tương tác):** Người dùng bấm vào dòng thông báo ở AC-01 $\rightarrow$ Trình duyệt tự động chuyển hướng đến trang chi tiết của đúng mã đơn đó.
  * **AC-04 (Kiểm tra quy tắc lọc Spam):** Sinh viên vào chỉnh sửa lỗi chính tả ở phần nội dung đơn khi đơn đang ở trạng thái `New` $\rightarrow$ Tuyệt đối không có thông báo nào được gửi đi (do không nằm trong danh mục sự kiện kích hoạt).
