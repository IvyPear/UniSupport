# PHÂN HỆ: M09 — THEO DÕI & BỔ SUNG (TICKET TRACKING & SUPPLEMENT)

## [FR-M09-01] Sinh viên xem, tìm kiếm và theo dõi các đơn mình đã gửi

**Mô tả:** Sinh viên truy cập màn hình cá nhân để xem danh sách toàn bộ yêu cầu đã gửi, tìm kiếm, lọc theo trạng thái và theo dõi chi tiết tiến độ xử lý theo thời gian thực.

**Priority:** High (Màn hình theo dõi tiến độ chính của sinh viên, đảm bảo tính minh bạch).

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
   - Các mốc lịch sử trao đổi và phản hồi được phép hiển thị cho Sinh viên; không lộ ghi chú nội bộ chỉ dành cho Nhân viên/Quản lý tại M07.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Phân tách dữ liệu):** Sinh viên chỉ xem được danh sách và chi tiết các đơn do chính tài khoản của mình khởi tạo.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Cố truy cập Ticket của sinh viên khác):** Sinh viên thay đổi ID trên URL hoặc gọi API xem Ticket không thuộc sở hữu của mình $\rightarrow$ Backend từ chối với mã `403 Forbidden` (`BR-01`).
* **E-02 (Không tìm thấy Ticket khớp điều kiện lọc):** Từ khóa hoặc trạng thái lọc không có đơn nào $\rightarrow$ Hiển thị danh sách rỗng kèm thông báo *"Không tìm thấy yêu cầu phù hợp"*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị đúng và đầy đủ danh sách Ticket do chính sinh viên tạo kèm trạng thái thời gian thực (ẩn ghi chú nội bộ); chặn `403 Forbidden` nếu truy cập đơn của người khác (`BR-01`, `E-01`).
* **AC-02:** Tìm kiếm theo mã/tiêu đề và lọc theo 5 trạng thái trả về kết quả chính xác; hiển thị trạng thái rỗng nếu không có đơn khớp (`E-02`).

**Ví dụ Edge Case (Trường hợp biên):**

* Tài khoản sinh viên mới nhập học chưa từng gửi yêu cầu nào $\rightarrow$ Màn hình "Yêu cầu của tôi" hiển thị trạng thái trống (*Empty State*) cùng nút dẫn tới form "Tạo yêu cầu mới".

---

## [FR-M09-02] Sinh viên nộp bổ sung thông tin và giấy tờ theo yêu cầu

**Mô tả:** Khi đơn ở trạng thái Chờ bổ sung, Sinh viên nhập nội dung phản hồi và tải lên các tệp tài liệu minh chứng bổ sung theo yêu cầu của nhân viên.

**Priority:** High (Chức năng tương tác phản hồi của sinh viên khi hồ sơ thiếu, tiếp nối luồng xử lý).

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

**Alternative / Error Flows:**

* **E-01 (Nộp bổ sung khi đơn đã quá hạn 3 ngày làm việc và bị tự động đóng):**
  - *Điều kiện kích hoạt:* Sinh viên truy cập form hoặc gọi API nộp bổ sung sau khi Ticket đã bị hệ thống tự động chuyển sang trạng thái `Closed` (`auto_closed = true`).
  - *Xử lý của hệ thống:* Hệ thống từ chối nhận hồ sơ, khóa hoàn toàn form nộp bổ sung, trả về mã lỗi `400 Bad Request` kèm thông báo: *"Yêu cầu này đã quá hạn bổ sung (3 ngày làm việc) và đã tự động đóng. Vui lòng tạo yêu cầu mới nếu cần hỗ trợ"*.
* **E-02 (Nội dung bổ sung trống hoặc tệp đính kèm không hợp lệ):**
  - *Điều kiện kích hoạt:* Sinh viên để trống nội dung giải trình ($< 5$ ký tự) hoặc tải tệp vượt 5MB / sai định dạng.
  - *Xử lý của hệ thống:* Hệ thống chặn gửi và báo lỗi validation `422 Unprocessable Entity` tại chỗ.

**Ví dụ Edge Case:**
* *Nộp bổ sung vào giây cuối cùng trước hạn chót:* Giao dịch gửi thành công trước thời điểm scheduler quét đóng đơn $\rightarrow$ Hệ thống dừng bộ đếm ngược, chuyển trạng thái về `In Progress` và thông báo cho nhân viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Giữ nguyên Mã Ticket và Nhân viên phụ trách cũ, tuyệt đối không tạo đơn mới.
* **BR-02:** Form nộp bổ sung chỉ mở khi đơn ở trạng thái `Chờ bổ sung`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Sinh viên nộp bổ sung hợp lệ khi đơn đang `Pending` $\rightarrow$ Đơn chuyển về `Đang xử lý` (`In Progress`), giữ nguyên Mã Ticket và Nhân viên phụ trách cũ (`BR-01`), hủy bộ đếm 3 ngày làm việc; nếu đơn đã đóng (`BR-02`, `E-01`) thì trả về `400 Bad Request`, nếu nội dung bổ sung $< 5$ ký tự hoặc tệp lỗi (`E-02`) thì trả về `422 Unprocessable Entity`.

---
