# PHÂN HỆ: M10 — KẾT QUẢ & ĐÁNH GIÁ (RESULTS & FEEDBACK)

## [FR-M10-01] Sinh viên xem kết quả giải quyết và tải tệp trả lời

**Mô tả:** Sinh viên xem văn bản giải trình kết quả (Resolution Notes) từ Nhân viên và tải về các tệp tài liệu văn bản trả lời khi đơn ở trạng thái Đã giải quyết.

**Priority:** High (Cho phép sinh viên tiếp nhận kết quả xử lý và tải tệp chứng từ trả lời).

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái `Đã giải quyết` (`Resolved`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung kết quả giải quyết:** Chỉ đọc, văn bản giải trình của nhân viên.
- **Tệp đính kèm kết quả:** Danh sách đường dẫn tải tệp kết quả.

**Luồng chính (Main Flow):**

1. Sinh viên mở Ticket đã có kết quả (từ danh sách yêu cầu hoặc từ thông báo).
2. Hệ thống hiển thị phần thông tin “Kết quả giải quyết” từ Nhân viên phụ trách.
3. Sinh viên đọc nội dung phản hồi và nhấp tải các tệp tài liệu trả lời đính kèm (nếu có).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ hiển thị nội dung kết quả khi đơn đã đạt trạng thái `Đã giải quyết` hoặc `Đã đóng`.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Xem kết quả khi đơn chưa giải quyết xong):** Sinh viên mở đơn đang ở `New`, `In Progress` hoặc `Pending` $\rightarrow$ Khu vực "Kết quả giải quyết" chưa hiển thị (`BR-01`).
* **E-02 (Tệp đính kèm kết quả không tồn tại hoặc lỗi tải xuống):** Đường dẫn tệp bị lỗi $\rightarrow$ Hệ thống trả về mã `404 Not Found` và thông báo lỗi tải tệp an toàn.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Khi đơn ở trạng thái `Resolved` hoặc `Closed`, hiển thị đầy đủ văn bản `Resolution Notes` và tải xuống thành công các tệp trả lời đính kèm; ẩn khu vực kết quả nếu đơn chưa giải quyết xong (`BR-01`, `E-01`, `E-02`).

**Ví dụ Edge Case (Trường hợp biên):**

* Nhân viên giải quyết xong đơn bằng văn bản hướng dẫn trực tiếp mà không đính kèm tệp nào $\rightarrow$ Màn hình kết quả hiển thị đầy đủ `Resolution Notes` và ẩn danh sách tệp đính kèm.

---

## [FR-M10-02] Sinh viên đánh giá độ hài lòng từ 1 đến 5 sao, nhận xét và đóng đơn

**Mô tả:** Sinh viên chấm điểm đánh giá chất lượng phục vụ từ 1 đến 5 sao, viết nhận xét góp ý tùy chọn và xác nhận đóng đơn vĩnh viễn.

**Priority:** Medium (Thu thập dữ liệu hài lòng CSAT và kết thúc vòng đời của Ticket).

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái `Đã giải quyết` (`Resolved`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Điểm đánh giá (CSAT):** Bắt buộc, chọn từ 1 đến 5 sao.
- **Nhận xét / Góp ý:** Tùy chọn, Max 1000 ký tự.
- **Trạng thái sau thao tác:** `Đã đóng` (`Closed`).

**Luồng chính (Main Flow):**

1. Tại màn hình xem kết quả, hệ thống hiển thị khu vực “Đánh giá chất lượng phục vụ”.
2. Sinh viên nhấp chọn số sao tương ứng (từ 1 đến 5 sao).
3. Sinh viên nhập thêm nhận xét, góp ý chi tiết (nếu muốn).
4. Bấm nút “Gửi đánh giá & Đóng đơn”.
5. Hệ thống kiểm tra số sao đã chọn (bắt buộc).
6. Lưu điểm số sao và nhận xét vào dữ liệu đánh giá của Ticket (gắn chặt với Nhân viên phụ trách).
7. Chuyển trạng thái Ticket thành `Đã đóng` (`Closed` - Đóng vĩnh viễn).
8. Hiển thị thông báo cảm ơn sinh viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chọn số sao (1-5 sao) là thao tác bắt buộc khi gửi đánh giá.
* **BR-02 (Khóa vĩnh viễn - No Reopen):** Khi Ticket đã chuyển sang trạng thái `Đã đóng`, hệ thống khóa cứng toàn bộ tương tác, tuyệt đối không cho phép mở lại hoặc chỉnh sửa nội dung.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Bấm gửi khi chưa chọn số sao):** Sinh viên bấm "Gửi đánh giá & Đóng đơn" nhưng chưa chọn mức sao (1–5) $\rightarrow$ Báo lỗi validation yêu cầu chọn số sao (`BR-01`).
* **E-02 (Đánh giá lại hoặc chỉnh sửa đơn đã `Closed`):** Sinh viên gửi request đánh giá lần 2 hoặc đánh giá trên đơn đã tự động đóng (`auto_closed = true`) $\rightarrow$ Backend từ chối với mã `409 Conflict` hoặc `400 Bad Request` (`BR-02`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chọn số sao (1–5 sao) và bấm đóng đơn $\rightarrow$ Lưu điểm đánh giá CSAT thành công, chuyển trạng thái thành `Đã đóng` (`Closed`) và khóa vĩnh viễn mọi thao tác chỉnh sửa/đánh giá lại (`BR-02`, `E-02`).
* **AC-02:** Chưa chọn sao mà bấm gửi $\rightarrow$ Báo lỗi yêu cầu chọn số sao trước khi gửi (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Sinh viên chọn mức 5 sao nhưng để trống ô nhận xét văn bản $\rightarrow$ Hệ thống vẫn chấp nhận hợp lệ, lưu `rating = 5`, `comment = null` và đóng đơn.

---

## [FR-M10-03] Hệ thống tự động đóng đơn nếu sinh viên không đánh giá sau 3 ngày làm việc

**Mô tả:** Sau 3 ngày làm việc (không tính Thứ 7, Chủ nhật và ngày lễ) tính từ thời điểm Ticket chuyển sang trạng thái Đã giải quyết mà Sinh viên không thực hiện đánh giá, hệ thống sẽ tự động chuyển trạng thái đơn sang Đã đóng.

**Priority:** Medium (Tác vụ ngầm dọn dẹp và kết thúc vòng đời các Ticket không có phản hồi đánh giá).

**Actor:** Hệ thống (System Background Task)

**Preconditions (Điều kiện tiên quyết):** Ticket ở trạng thái `Đã giải quyết` (`Resolved`); thời gian hiện tại $\ge$ `auto_close_deadline` (mốc tính bằng `resolved_at + 3 ngày làm việc`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Thời điểm chuyển Resolved:** Mốc thời gian bắt đầu tính 3 ngày làm việc.
- **Trạng thái sau thao tác:** `Đã đóng` (`Closed`).
- **Ghi chú tự động:** *"Hệ thống tự động đóng đơn do sinh viên không đánh giá sau 3 ngày làm việc"*.

**Luồng chính (Main Flow):**

1. Tác vụ ngầm của hệ thống quét định kỳ các Ticket đang ở trạng thái `Đã giải quyết`.
2. So sánh thời gian hiện tại với mốc `auto_close_deadline` (được tính bằng cách cộng 3 ngày làm việc bỏ qua Thứ 7, Chủ nhật và ngày nghỉ lễ).
3. Nếu phát hiện Ticket đã quá 3 ngày làm việc mà Sinh viên chưa thực hiện đánh giá:
   a. Hệ thống tự động cập nhật trạng thái đơn thành `Đã đóng` (`Closed`).
   b. Đánh dấu trường `auto_closed = true`.
   c. Gán `closed_reason = "Quá hạn đánh giá 3 ngày làm việc"`.
   d. Ghi nhận log hoàn tất vào dòng thời gian của Ticket.
   e. Khóa form đánh giá của Ticket đó.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Các đơn bị đóng tự động do không đánh giá sau `Resolved` không có điểm số sao (Rating = null) và không tính vào CSAT. Việc đúng hay quá hạn SLA được xác định bằng thời điểm giải quyết `resolved_at` so với hạn xử lý, không mặc định mọi đơn tự đóng đều hoàn thành đúng hạn.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Sinh viên gửi đánh giá sau khi đơn đã bị đóng tự động):** Sinh viên mở sẵn trang đánh giá nhưng bấm gửi sau khi Background Worker đã chuyển đơn sang `Closed` (`auto_closed = true`) $\rightarrow$ Hệ thống từ chối với mã `400 Bad Request` và thông báo đơn đã tự động đóng.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Sau 3 ngày làm việc ở trạng thái `Đã giải quyết` không có đánh giá $\rightarrow$ Đơn tự động chuyển sang `Đã đóng` (`auto_closed = true`, `rating = null`, không tính vào trung bình CSAT) và khóa form đánh giá (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Ticket chuyển sang `Resolved` lúc 14:00 Thứ Năm và Thứ Sáu là ngày nghỉ lễ được khai báo trong bảng `system_holidays` $\rightarrow$ Bộ đếm 3 ngày làm việc tự động bỏ qua Thứ Sáu, Thứ Bảy và Chủ Nhật, chỉ đóng tự động vào 14:00 Thứ Tư tuần kế tiếp.

---
