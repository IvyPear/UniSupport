# PHÂN HỆ: M08 — TRẢ KẾT QUẢ (TICKET RESULTS)

## [FR-M08-01] Nhân viên nhập kết quả giải quyết và đính kèm tệp trả lời

**Mô tả:** Nhân viên nhập văn bản giải trình kết quả xử lý (Resolution Notes) và đính kèm tệp văn bản trả lời chính thức cho Sinh viên.

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái `Đang xử lý` (`In Progress`); Nhân viên là người phụ trách đơn.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung kết quả giải quyết:** Bắt buộc, Min 10 ký tự, văn bản giải thích/hướng dẫn chi tiết.
- **Tệp đính kèm kết quả:** Tùy chọn, tối đa 5 file, dung lượng tối đa 5MB/file (định dạng `.pdf`, `.docx`, `.png`, `.jpg`).

**Luồng chính (Main Flow):**

1. Nhân viên mở Ticket cần hoàn thành và chọn “Trả kết quả”.
2. Nhập nội dung chi tiết tại trường “Kết quả giải quyết”.
3. Đính kèm tệp văn bản trả lời chính thức hoặc giấy tờ chứng nhận (nếu có).
4. Kiểm tra lại thông tin và bấm “Xác nhận hoàn thành”.
5. Hệ thống lưu kết quả giải quyết và các tệp đính kèm vào CSDL.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Trường “Kết quả giải quyết” là trường bắt buộc, không được để trống khi hoàn thành Ticket.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ nội dung và bấm xác nhận $\rightarrow$ Hệ thống lưu kết quả giải quyết và tệp đính kèm thành công.
* **AC-02:** Để trống trường kết quả $\rightarrow$ Báo lỗi và không cho phép hoàn thành.

---

## [FR-M08-02] Hoàn thành đơn và tự động gửi thông báo kết quả cho sinh viên

**Mô tả:** Hệ thống cập nhật trạng thái đơn thành `Đã giải quyết` (`Resolved`), ghi nhận mốc thời gian hoàn tất và tự động gửi thông báo kết quả cho Sinh viên.

**Actor:** Hệ thống, Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Đã hoàn tất bước nhập kết quả ở FR-M08-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Trạng thái sau thao tác:** `Đã giải quyết` (`Resolved`).
- **Thời điểm hoàn thành:** Mốc thời gian hệ thống ghi nhận.
- **Thông báo gửi sinh viên:** Nội dung thông báo kết quả đơn.

**Luồng chính (Main Flow):**

1. Sau khi nhân viên bấm xác nhận hoàn thành, hệ thống cập nhật trạng thái đơn thành `Đã giải quyết` (`Resolved`).
2. Ghi nhận thời gian hoàn thành để làm căn cứ tính toán chỉ số SLA xử lý.
3. Hệ thống tự động kích hoạt thông báo gửi đến tài khoản của Sinh viên tạo đơn với nội dung: *"Yêu cầu [Mã Ticket] của bạn đã được giải quyết. Vui lòng xem kết quả và đánh giá chất lượng"*.
4. Giao diện của Sinh viên mở ra phần đánh giá mức độ hài lòng ở Module M10.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ gửi 1 thông báo kết quả duy nhất cho sinh viên, không gửi trùng lặp.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chuyển trạng thái đơn thành `Đã giải quyết`, ghi nhận thời gian hoàn tất và phát thông báo tới sinh viên.

---
