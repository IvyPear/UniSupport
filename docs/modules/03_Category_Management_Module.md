# PHÂN HỆ : Phân hệ Quản lý Ticket (TKT)

## [FR-TKT-01] Hệ thống tạo ID Ticket
* **Mô tả:** Hệ thống tự động tạo mã định danh duy nhất (VD: `IT-20261005-001`) khi có ticket mới được khởi tạo.
* **Actor:** Hệ thống.
* **Preconditions:** Sinh viên đã thực hiện thành công thao tác tạo mới một yêu cầu hỗ trợ (Ticket).
* **Main Flow:**
  1. Sinh viên nhấn “Gửi yêu cầu”.
  2. Hệ thống xác định phòng ban tiếp nhận và ngày tạo đơn.
  3. Hệ thống tiến hành tạo mã định danh theo cấu trúc chuẩn hóa: `[Tên phòng ban]-[YYYYMMDD]-[Số thứ tự trong ngày]`. (Ví dụ: Một đơn gửi phòng IT vào ngày 05/10/2026 và là đơn đầu tiên trong ngày sẽ được gán mã `IT-20261005-001`).
  4. Hệ thống gắn mã đơn vào Ticket và lưu trữ xuống cơ sở dữ liệu.
* **Business Rules:**
  * **BR-01:** Mỗi đơn yêu cầu phải mang một mã định danh duy nhất, tuyệt đối không được trùng lặp trên toàn hệ thống.
  * **BR-02:** Vào ngày mới, số thứ tự trong mã đơn được tự động reset và bắt đầu lại từ `001`.
  * **BR-03:** Trường hợp có nhiều sinh viên gửi đơn đồng thời tại cùng một thời điểm, hệ thống phải cơ chế khóa/tuần tự hóa để cấp các số thứ tự khác nhau, ngăn chặn tuyệt đối lỗi trùng mã.
* **Alternative / Error Flows:**
  * Nếu xảy ra lỗi kết nối cơ sở dữ liệu khiến hệ thống không thể sinh mã định danh, quy trình khởi tạo Ticket bị hủy bỏ và hệ thống hiển thị thông báo lỗi kỹ thuật.
* **Acceptance Criteria (AC):**
  * **AC-01:** Khi có ticket mới được tạo thành công $\rightarrow$ Hệ thống tự động gán mã định danh duy nhất (VD: `IT-20261005-001`) cho ticket đó.
  * **AC-02 (Kiểm tra BR-02):** Khi sinh viên gửi đơn sang ngày mới $\rightarrow$ Số thứ tự trong mã đơn tự động bắt đầu lại từ `001`.
  * **AC-03 (Kiểm tra BR-03):** Khi hai sinh viên gửi đơn đồng thời $\rightarrow$ Hệ thống cấp hai số thứ tự khác nhau (ví dụ: `001` và `002`), không xảy ra lỗi trùng mã.

---

## [FR-TKT-02] Hệ thống chuyển đổi trạng thái Ticket
* **Mô tả:** Hệ thống tự động cập nhật trạng thái của đơn yêu cầu dựa trên thao tác của Nhân viên, Sinh viên hoặc cơ chế vận hành ngầm, giúp các bên theo dõi sát sao tiến độ xử lý đơn.
* **Actor:** Hệ thống, Nhân viên, Sinh viên.
* **Preconditions:** Ticket đã được khởi tạo thành công trên hệ thống.
* **Main Flow:**
  * Vừa tạo xong $\rightarrow$ Đơn mang trạng thái `New` (Mới).
  * Nhân viên bấm nút tiếp nhận $\rightarrow$ Chuyển sang `In Progress` (Đang xử lý).
  * Khi Nhân viên cần Sinh viên bổ sung thông tin $\rightarrow$ Hệ thống chuyển trạng thái sang `Pending` (Chờ bổ sung).
  * Nhân viên xử lý thành công $\rightarrow$ Chuyển sang `Resolved` (Đã giải quyết).
  * Khi Sinh viên đánh giá đơn yêu cầu $\rightarrow$ Hệ thống chuyển trạng thái sang `Closed` (Đã đóng).
* **Business Rules:**
  * **BR-01 (Luồng tiêu chuẩn):** Trạng thái của đơn yêu cầu phải được cập nhật tuần tự, tuyệt đối không được chuyển ngược về trạng thái trước đó (Ví dụ: Đơn đã ở trạng thái `Resolved` thì không được quay lại `New`).
  * **BR-02 (Luồng bỏ qua Pending):** Đơn có thể đi thẳng từ `In Progress` sang `Resolved` nếu nhân viên giải quyết xong xuôi ngay mà không cần Sinh viên cung cấp thêm minh chứng/thông tin.
  * **BR-03 (Đơn không hợp lệ / Spam):** Nếu đơn đang ở trạng thái `In Progress` và Nhân viên phân loại là “Đơn không hợp lệ / Spam”, hệ thống chuyển thẳng đơn đó sang `Closed`, bỏ qua trạng thái `Resolved` và vô hiệu hóa quyền đánh giá của Sinh viên.
* **Acceptance Criteria (AC):**
  * **AC-01:** Các bước chuyển đổi trạng thái diễn ra chuẩn xác tuần tự theo đúng vòng đời: `New` $\rightarrow$ `In Progress` $\rightarrow$ `Pending` $\rightarrow$ `Resolved` $\rightarrow$ `Closed`.
  * **AC-02 (Kiểm tra BR-02):** Nhân viên xử lý xong và lưu kết quả khi đơn đang ở `In Progress` $\rightarrow$ Trạng thái chuyển ngay sang `Resolved` mà không bắt buộc qua `Pending`.
  * **AC-03 (Kiểm tra BR-03):** Nhân viên đánh dấu "Đơn không hợp lệ" $\rightarrow$ Hệ thống lập tức đóng đơn sang `Closed`, tuyệt đối không chuyển qua `Resolved`.

---

## [FR-TKT-03] Hệ thống đếm ngược hạn Pending
* **Mô tả:** Hệ thống tự động kích hoạt bộ đếm thời hạn 3 ngày khi Ticket chuyển sang trạng thái `Pending`, giúp kiểm soát thời gian chờ Sinh viên bổ sung thông tin.
* **Actor:** Hệ thống.
* **Preconditions:** Ticket được chuyển sang trạng thái `Pending` theo yêu cầu bổ sung thông tin từ phía Nhân viên.
* **Main Flow:**
  1. Hệ thống ghi nhận mốc thời gian Ticket chuyển sang trạng thái `Pending`.
  2. Kích hoạt bộ đếm ngược thời hạn 3 ngày (72 giờ).
  3. Nếu Sinh viên gửi thông tin bổ sung trước hạn $\rightarrow$ Hệ thống dừng đếm ngược và tự động đưa Ticket về lại trạng thái `In Progress` để Nhân viên xử lý tiếp.
  4. Nếu hết 72 giờ mà Sinh viên không phản hồi $\rightarrow$ Giao diện Nhân viên hiển thị cảnh báo (bôi đỏ hoặc gắn nhãn “Quá hạn”).
  5. Nhân viên kiểm tra và chủ động thao tác chuyển đơn sang `Resolved`, đồng thời ghi chú lý do đóng đơn.
* **Business Rules:**
  * **BR-01:** Thời gian đếm ngược tính chính xác từ thời điểm đơn chuyển sang `Pending` và kéo dài trong khung thời gian 72 giờ.
  * **BR-02:** Khi hết thời hạn 72 giờ, hệ thống **không tự động đóng đơn**, yêu cầu Nhân viên phải chủ động thao tác chuyển trạng thái sang `Resolved`.
  * **BR-03:** Bộ đếm thời gian phải dừng ngay lập tức khi Sinh viên gửi thông tin bổ sung hợp lệ.
* **Alternative / Error Flows:**
  * Nếu Nhân viên cố tình thao tác chuyển Ticket sang `Resolved` khi chưa hết thời hạn 3 ngày và Sinh viên chưa bổ sung thông tin $\rightarrow$ Hệ thống hiển thị hộp thoại cảnh báo xác nhận: *“Chưa hết thời hạn 3 ngày chờ, bạn có chắc chắn muốn đóng đơn?”*.
* **Acceptance Criteria (AC):**
  * **AC-01 (Kích hoạt bộ đếm):** Đơn chuyển sang `Pending` $\rightarrow$ Hệ thống tự động đếm ngược 72 giờ (3 ngày).
  * **AC-02 (Kiểm tra BR-03):** Đơn đang đếm ngược, Sinh viên gửi thông tin bổ sung $\rightarrow$ Bộ đếm dừng ngay lập tức và đơn tự động quay lại `In Progress`.
  * **AC-03 (Hết hạn 72h):** Đơn nằm ở `Pending` trôi qua đủ 72 giờ không có phản hồi $\rightarrow$ Giao diện Nhân viên hiển thị nhãn cảnh báo "Quá hạn".
  * **AC-04 (Kiểm tra ngoại lệ):** Đơn mới Pending được 1 ngày, Nhân viên bấm chuyển `Resolved` $\rightarrow$ Hệ thống chặn lại và hiện hộp thoại xác nhận yêu cầu người dùng xác nhận.