# PHÂN HỆ: TRAO ĐỔI THÔNG TIN & TỆP ĐÍNH KÈM (COM)

## [FR-COM-01] Nhân viên gửi phản hồi
* **Mô tả:** Nhân viên soạn nội dung giải đáp hoặc yêu cầu sinh viên cung cấp thêm thông tin cho ticket.
* **Actor:** Nhân viên hỗ trợ.
* **Preconditions:** Nhân viên đang truy cập vào ticket thuộc thẩm quyền xử lý của mình.
* **Main Flow:**
  1. Nhân viên mở phần khung nhập nội dung phản hồi trong giao diện chi tiết ticket.
  2. Nhân viên soạn thảo nội dung giải đáp thắc mắc hoặc nội dung yêu cầu sinh viên cung cấp thêm thông tin.
  3. Nhân viên nhấn nút gửi phản hồi.
  4. Hệ thống ghi nhận nội dung trao đổi và hiển thị trực tiếp vào luồng trao đổi của ticket.
* **Business Rules:**
  * **BR-01:** Nội dung phản hồi là trường bắt buộc nhập, không được để trống hoặc chỉ chứa khoảng trắng khi gửi.
  * **BR-02:** Tính năng gửi phản hồi chỉ khả dụng khi đơn đang ở trạng thái `New`, `In Progress`, `Pending` hoặc `Resolved`. Nếu đơn đã chuyển sang trạng thái `Closed` (Đóng vĩnh viễn), hệ thống ẩn/khóa khung nhập phản hồi này.
* **Alternative / Error Flows:**
  * Nếu nhân viên để trống nội dung và bấm gửi $\rightarrow$ Hệ thống chặn lại và thông báo lỗi yêu cầu nhập nội dung.
* **Acceptance Criteria (AC):**
  * **AC-01:** Nhân viên nhập nội dung phản hồi hợp lệ và bấm gửi $\rightarrow$ Hệ thống cập nhật thành công nội dung vào dòng thời gian trao đổi của ticket.
  * **AC-02:** Nhân viên để trống nội dung phản hồi $\rightarrow$ Hệ thống từ chối gửi và hiển thị thông báo lỗi.
  * **AC-03 (Kiểm tra BR-02):** Nhân viên mở một đơn đã ở trạng thái `Closed` $\rightarrow$ Trên giao diện chi tiết ticket không hiển thị khung nhập phản hồi, chỉ có thể đọc nội dung cũ.

---

## [FR-COM-02] Sinh viên gửi thông tin bổ sung
* **Mô tả:** Sinh viên gửi nội dung đính chính hoặc cung cấp thêm thông tin theo yêu cầu của nhân viên (áp dụng khi đơn đang ở trạng thái `In Progress` hoặc `Pending`).
* **Actor:** Sinh viên.
* **Preconditions:** Ticket đang ở trạng thái `In Progress` hoặc `Pending`; sinh viên là người tạo ra ticket đó.
* **Main Flow:**
  1. Sinh viên truy cập vào chi tiết ticket cá nhân của mình.
  2. Sinh viên nhập nội dung thông tin bổ sung hoặc đính chính theo yêu cầu của nhân viên vào khung phản hồi.
  3. Sinh viên bấm gửi nội dung.
  4. Hệ thống cập nhật thông tin bổ sung vào lịch sử trao đổi của ticket.
* **Business Rules:**
  * **BR-01:** Nếu đơn đang ở trạng thái `Pending`, ngay khi sinh viên gửi phản hồi thành công, hệ thống phải tự động đổi trạng thái đơn về lại `In Progress` (Đồng thời ngắt bộ đếm 72 giờ ngầm của `FR-TKT-03`).
  * **BR-02:** Nội dung gửi bổ sung không được để trống hoặc chỉ gõ dấu cách.
  * **BR-03:** Khung nhập phản hồi của sinh viên tự động bị ẩn/khóa đi khi đơn đã chuyển sang trạng thái `Resolved` hoặc `Closed`. (Ở trạng thái `Resolved`, sinh viên chỉ được đánh giá sao, không được comment thêm).
* **Alternative / Error Flows:**
  * Nếu sinh viên để trống nội dung và bấm gửi $\rightarrow$ Hệ thống bôi đỏ và hiển thị cảnh báo yêu cầu nhập chữ.
* **Acceptance Criteria (AC):**
  * **AC-01:** Đơn đang `In Progress`, sinh viên nhập nội dung và bấm gửi $\rightarrow$ Hệ thống lưu vào dòng thời gian thành công, trạng thái đơn giữ nguyên là `In Progress`.
  * **AC-02 (Kiểm tra BR-01 - Đánh thức đơn):** Đơn đang `Pending` đếm ngược, sinh viên nhập nội dung và bấm gửi $\rightarrow$ Lời nhắn được gửi thành công, đơn tự động nhảy về trạng thái `In Progress`.
  * **AC-03 (Kiểm tra BR-02 - Lỗi trống):** Sinh viên không gõ gì mà bấm Gửi $\rightarrow$ Hệ thống chặn lại báo lỗi.
  * **AC-04 (Kiểm tra BR-03 - Khóa khung):** Khi ticket ở trạng thái `Resolved` hoặc `Closed`, sinh viên mở đơn ra xem $\rightarrow$ Hệ thống không hiển thị khung nhập nội dung nữa, chỉ cho đọc lịch sử cũ.

---

## [FR-COM-03] Sinh viên/Nhân viên đính kèm tệp tin
* **Mô tả:** Cả Sinh viên và Nhân viên đều có thể tải lên tài liệu (PDF, Word) hoặc hình ảnh (JPG, PNG) minh họa khi gửi yêu cầu, cập nhật trạng thái hoặc gửi thông tin bổ sung.
* **Actor:** Sinh viên, Nhân viên hỗ trợ.
* **Preconditions:** Người dùng đang trong giao diện soạn thảo phản hồi hoặc tạo/cập nhật ticket.
* **Main Flow:**
  1. Người dùng chọn biểu tượng đính kèm tệp tin (hình kẹp ghim) trong khung soạn thảo.
  2. Người dùng chọn tệp tin từ thiết bị cá nhân.
  3. Hệ thống kiểm tra định dạng và dung lượng tệp tin.
  4. Nếu hợp lệ, hệ thống tải tệp lên và hiển thị tên tệp tin (hoặc ảnh thu nhỏ) ngay bên dưới khung nội dung.
  5. Sau khi người dùng bấm gửi, tệp tin được đính kèm và lưu vĩnh viễn vào lịch sử trao đổi của ticket.
* **Business Rules:**
  * **BR-01:** Dung lượng tối đa không vượt quá 5MB/file. Mỗi lần gửi phản hồi được đính kèm tối đa 3 file.
  * **BR-02:** Hệ thống chỉ chấp nhận các định dạng an toàn: Hình ảnh (JPG, PNG) và Tài liệu (PDF, DOCX, XLSX).
  * **BR-03:** Tuyệt đối chặn không cho tải lên các file thực thi có nguy cơ chứa virus (Ví dụ: `.exe`, `.bat`, `.js`, v.v.).
* **Alternative / Error Flows:**
  * Nếu tệp tin vượt quá 5MB $\rightarrow$ Hệ thống chặn lại và báo lỗi *"File tải lên vượt quá giới hạn 5MB"*.
  * Nếu chọn tệp tin sai định dạng (VD: tải file mp4, zip) $\rightarrow$ Hệ thống từ chối và báo lỗi *"Định dạng tệp không được hỗ trợ"*.
* **Acceptance Criteria (AC):**
  * **AC-01:** Người dùng đính kèm 2 hình ảnh JPG (dưới 5MB/ảnh) và bấm gửi $\rightarrow$ Hệ thống tải lên thành công, cả hai bên đều xem/tải được tệp đính kèm trong luồng trao đổi.
  * **AC-02 (Kiểm tra BR-01):** Người dùng cố tình tải lên 1 file tài liệu nặng 10MB $\rightarrow$ Hệ thống chặn ngay lập tức và báo lỗi giới hạn dung lượng.
  * **AC-03 (Kiểm tra BR-02 & BR-03):** Người dùng cố tình đính kèm một file cài đặt phần mềm (`virus.exe`) $\rightarrow$ Hệ thống chặn và báo lỗi sai định dạng cho phép.
