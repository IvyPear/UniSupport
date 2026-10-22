# PHÂN HỆ: M08 — TRẢ KẾT QUẢ — NHÂN VIÊN (TICKET RESULTS)

## [FR-M08-01] Nhập kết quả giải quyết và đính kèm tài liệu kết quả

**Mô tả:** Nhân viên nhập văn bản giải trình kết quả (Resolution Notes) và đính kèm tệp kết quả trả lời cho Sinh viên.

**Actor:** Nhân viên

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái Đang xử lý.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung kết quả giải quyết:** Bắt buộc, Nội dung văn bản trả lời/kết quả giải quyết.
- **Tài liệu kết quả:** Tùy chọn, Max 5MB/file, File văn bản trả lời.

**Luồng chính (Main Flow):**

1. Nhân viên chọn “Trả kết quả / Hoàn tất”.
2. Nhập nội dung chi tiết tại trường *Resolution Notes*.
3. Đính kèm file kết quả (nếu có).
4. Nhấn “Xác nhận hoàn thành”.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Trường *Resolution Notes* (Kết quả giải quyết) là bắt buộc. Nếu để trống hệ thống sẽ chặn không cho hoàn thành.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* Nếu chưa nhập *Resolution Notes* → Hệ thống cảnh báo đỏ và chặn chuyển trạng thái.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ nội dung và bấm hoàn thành → Lưu kết quả vào hệ thống thành công.

## [FR-M08-02] Hoàn thành Ticket và tự động gửi thông báo cho Sinh viên

**Mô tả:** Hệ thống chuyển trạng thái Ticket sang Đã giải quyết và phát 1 thông báo kết quả duy nhất cho Sinh viên.

**Actor:** Nhân viên, Hệ thống

**Preconditions (Điều kiện tiên quyết):** Hoàn tất FR-M08-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Trạng thái sau thao tác:** Theo thông tin hiển thị trong hệ thống.
- **Thời điểm hoàn thành:** Mốc thời gian hoàn thành.
- **Loại thông báo:** Theo thông tin hiển thị trong hệ thống.
- **Người nhận thông báo:** ID tài khoản Sinh viên nhận đơn.

**Luồng chính (Main Flow):**

1. Hệ thống cập nhật trạng thái đơn thành Đã giải quyết (Đã giải quyết).
2. Ghi nhận thời điểm hoàn thành vào hệ thống.
3. Tự động phát thông báo trong ứng dụng cho Sinh viên với nội dung *"Yêu cầu [Mã đơn] đã có kết quả"*.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ gửi 1 thông báo duy nhất cho Sinh viên, không phát trùng lặp.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

- Nếu người dùng không có quyền truy cập, hệ thống từ chối thao tác và thông báo phù hợp.
- Nếu thao tác không thành công, hệ thống hiển thị lỗi và không ghi nhận kết quả chưa hoàn chỉnh.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chuyển trạng thái Đã giải quyết, ghi mốc thời gian hoàn thành và gửi đúng 1 thông báo tới Sinh viên.

---
