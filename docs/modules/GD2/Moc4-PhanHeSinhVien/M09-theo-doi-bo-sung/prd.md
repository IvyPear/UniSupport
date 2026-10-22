# PHÂN HỆ: M09 — THEO DÕI & BỔ SUNG (TICKET TRACKING & SUPPLEMENT)

## [FR-M09-01] Sinh viên xem, tìm kiếm và theo dõi các đơn mình đã gửi

**Mô tả:** Sinh viên truy cập màn hình cá nhân để xem danh sách toàn bộ yêu cầu đã gửi, tìm kiếm, lọc theo trạng thái và theo dõi chi tiết tiến độ xử lý theo thời gian thực.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Sinh viên đã đăng nhập thành công vào hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **ID Sinh viên:** Xác thực tài khoản hiện tại.
- **Từ khóa tìm kiếm:** Tùy chọn, Mã Ticket hoặc Tiêu đề yêu cầu.
- **Bộ lọc trạng thái:** Tùy chọn, lọc theo: `Chưa tiếp nhận`, `Đang xử lý`, `Chờ bổ sung`, `Đã giải quyết`, `Đã đóng`.
- **Thông tin chi tiết Ticket:** Mã Ticket, Ngày gửi, Phòng ban, Danh mục, Trạng thái hiện tại, Timeline lịch sử xử lý.

**Luồng chính (Main Flow):**

1. Sinh viên mở menu “Yêu cầu của tôi”.
2. Hệ thống tải toàn bộ danh sách Ticket do chính Sinh viên đó khởi tạo.
3. Sinh viên có thể nhập từ khóa hoặc chọn bộ lọc trạng thái để tìm đơn.
4. Sinh viên chọn một Ticket bất kỳ để mở xem chi tiết:
   - Thông tin yêu cầu ban đầu và các file đính kèm.
   - Trạng thái hiện tại và tiến độ công việc theo thời gian thực.
   - Các mốc lịch sử trao đổi và phản hồi từ nhân viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Phân tách dữ liệu):** Sinh viên chỉ xem được danh sách và chi tiết các đơn do chính tài khoản của mình khởi tạo.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị đúng và đầy đủ danh sách Ticket của sinh viên kèm trạng thái thời gian thực.
* **AC-02:** Tìm kiếm và lọc theo trạng thái trả về kết quả chính xác.

---

## [FR-M09-02] Sinh viên nộp bổ sung thông tin và giấy tờ theo yêu cầu

**Mô tả:** Khi đơn ở trạng thái Chờ bổ sung, Sinh viên nhập nội dung phản hồi và tải lên các tệp tài liệu minh chứng bổ sung theo yêu cầu của nhân viên.

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái `Chờ bổ sung` (`Pending`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung bổ sung:** Bắt buộc, Min 5 ký tự, văn bản giải trình của sinh viên.
- **Tài liệu đính kèm bổ sung:** Tùy chọn, tối đa 5 file, dung lượng tối đa 5MB/file (ảnh, pdf, docx).
- **Trạng thái sau thao tác:** `Đang xử lý` (`In Progress`).

**Luồng chính (Main Flow):**

1. Sinh viên mở chi tiết Ticket đang ở trạng thái `Chờ bổ sung`.
2. Đọc nội dung yêu cầu bổ sung từ Nhân viên và theo dõi thời gian còn lại trên đồng hồ đếm ngược 3 ngày làm việc (không tính Thứ 7, Chủ nhật và ngày lễ).
3. Sinh viên nhập nội dung giải trình bổ sung tại form phản hồi.
4. Tải lên các tệp tài liệu/giấy tờ minh chứng (nếu có).
5. Nhấn “Xác nhận gửi bổ sung”.
6. Hệ thống lưu nội dung bổ sung vào dòng thời gian của Ticket và dừng bộ đếm ngược 3 ngày làm việc.
7. Tự động chuyển trạng thái Ticket về lại `Đang xử lý` (`In Progress`).
8. Giữ nguyên Nhân viên phụ trách cũ và phát thông báo cho Nhân viên đó tiếp tục giải quyết.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Giữ nguyên Mã Ticket và Nhân viên phụ trách cũ, tuyệt đối không tạo đơn mới.
* **BR-02:** Form nộp bổ sung chỉ mở khi đơn ở trạng thái `Chờ bổ sung`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Sinh viên nộp bổ sung thành công $\rightarrow$ Đơn chuyển về `Đang xử lý`, hủy bộ đếm 3 ngày làm việc và lưu thông tin vào lịch sử.

---
