# PHÂN HỆ: M08 — TRẢ KẾT QUẢ — NHÂN VIÊN (TICKET RESULTS)

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Actor chính:** Nhân viên  

---

## [FR-M08-01] Nhập kết quả giải quyết và đính kèm tài liệu kết quả
* **Mô tả:** Nhân viên nhập văn bản giải trình kết quả (Resolution Notes) và đính kèm tệp kết quả trả lời cho Sinh viên.
* **Actor:** Nhân viên
* **Preconditions:** Ticket đang ở trạng thái `In Progress`.
* **Main Flow:**
  1. Nhân viên chọn “Trả kết quả / Hoàn tất”.
  2. Nhập nội dung chi tiết tại trường *Resolution Notes*.
  3. Đính kèm file kết quả (nếu có).
  4. Nhấn “Xác nhận hoàn thành”.
* **Business Rules (BR):**
  * **BR-01:** Trường *Resolution Notes* (Kết quả giải quyết) là bắt buộc. Nếu để trống hệ thống sẽ chặn không cho hoàn thành.
* **Alternative / Error Flows:**
  * Nếu chưa nhập *Resolution Notes* $ightarrow$ Hệ thống cảnh báo đỏ và chặn chuyển trạng thái.
* **Acceptance Criteria (AC):**
  * **AC-01:** Nhập đủ nội dung và bấm hoàn thành $\rightarrow$ Lưu kết quả vào CSDL thành công.

---

## [FR-M08-02] Hoàn thành Ticket và tự động gửi thông báo cho Sinh viên
* **Mô tả:** Hệ thống chuyển trạng thái Ticket sang `Resolved` và phát 1 thông báo kết quả duy nhất cho Sinh viên.
* **Actor:** Nhân viên, Hệ thống
* **Preconditions:** Hoàn tất FR-M08-01.
* **Main Flow:**
  1. Hệ thống cập nhật trạng thái đơn thành `Resolved` (Đã giải quyết).
  2. Ghi nhận thời điểm hoàn thành vào CSDL.
  3. Tự động phát thông báo In-app cho Sinh viên với nội dung *"Yêu cầu [Mã đơn] đã có kết quả"*.
* **Business Rules (BR):**
  * **BR-01:** Chỉ gửi 1 thông báo duy nhất cho Sinh viên, không phát trùng lặp.
* **Acceptance Criteria (AC):**
  * **AC-01:** Chuyển trạng thái `Resolved`, ghi mốc thời gian hoàn thành và gửi đúng 1 thông báo tới Sinh viên.
