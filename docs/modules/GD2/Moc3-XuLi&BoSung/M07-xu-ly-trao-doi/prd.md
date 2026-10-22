# PHÂN HỆ: M07 — XỬ LÝ & BỔ SUNG (PROCESS & EXCHANGE)

## [FR-M07-01] Nhân viên cập nhật tiến độ, ghi chú và lưu lịch sử xử lý đơn

**Mô tả:** Nhân viên phụ trách cập nhật tiến độ xử lý công việc chuyên môn, nhập ghi chú nội bộ và theo dõi dòng thời gian lịch sử thao tác (Audit Trail) của Ticket.

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Nhân viên là người phụ trách chính (Assignee) của Ticket; Ticket đang ở trạng thái `Đang xử lý` (`In Progress`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Khóa chính của đơn.
- **Ghi chú nội bộ:** Tùy chọn, Max 1000 ký tự (chỉ nhân sự phòng ban và quản lý nhìn thấy).
- **Tiến độ cập nhật:** Nội dung tóm tắt các bước đã thực hiện.
- **Mốc thời gian:** Tự động ghi nhận thời gian thực.

**Luồng chính (Main Flow):**

1. Nhân viên mở Ticket đang phụ trách từ danh sách công việc cá nhân.
2. Nhập nội dung ghi chú xử lý nội bộ hoặc tiến độ công việc.
3. Bấm “Cập nhật tiến độ”.
4. Hệ thống ghi nhận thông tin vào dòng thời gian (Timeline / Audit Trail) của Ticket.
5. Cập nhật trạng thái hiển thị cho sinh viên và quản lý theo dõi.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ nhân viên phụ trách hoặc Trưởng phòng mới được quyền cập nhật tiến độ và ghi chú nội bộ cho Ticket đó.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Ghi chú nội bộ được lưu trữ chính xác và hiển thị trong timeline lịch sử xử lý của đơn.

---

## [FR-M07-02] Nhân viên xem lại danh sách lịch sử các đơn mình đã xử lý

**Mô tả:** Nhân viên tra cứu, tìm kiếm và xem lại danh sách các Ticket mình đã từng tiếp nhận, xử lý hoặc giải quyết trong quá khứ kèm theo điểm đánh giá mức độ hài lòng (CSAT) từ Sinh viên.

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Nhân viên đã đăng nhập vào hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Tùy chọn, Mã Ticket hoặc Tiêu đề Ticket.
- **Khoảng thời gian:** Tùy chọn, Từ ngày - Đến ngày.
- **Trạng thái Ticket:** `Hoàn thành` (`Resolved`), `Đã đóng` (`Closed`), `Đã điều chuyển` (`Reassigned`).
- **Điểm đánh giá (CSAT):** Điểm 1-5 sao và nhận xét của sinh viên (nếu có).

**Luồng chính (Main Flow):**

1. Nhân viên truy cập menu “Lịch sử xử lý”.
2. Hệ thống tải toàn bộ danh sách các Ticket mà nhân viên đã từng tham gia xử lý hoặc hoàn thành.
3. Nhân viên có thể lọc theo khoảng thời gian hoặc tìm theo Mã Ticket.
4. Nhấp vào một Ticket để xem lại chi tiết nội dung, các bước xử lý, kết quả đã trả và điểm số đánh giá 1-5 sao của sinh viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nhân viên chỉ xem được lịch sử các đơn mà chính mình đã từng phụ trách.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị đúng danh sách Ticket quá khứ kèm đầy đủ Audit Trail và phản hồi từ sinh viên.

---

## [FR-M07-03] Nhân viên yêu cầu sinh viên bổ sung hồ sơ và bắt đầu đếm ngược 72 giờ

**Mô tả:** Khi hồ sơ chưa đủ điều kiện xử lý, Nhân viên gửi yêu cầu Sinh viên bổ sung thêm thông tin/giấy tờ còn thiếu, hệ thống chuyển đơn sang trạng thái `Chờ bổ sung` và kích hoạt đồng hồ đếm ngược 72 giờ.

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái `Đang xử lý` (`In Progress`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung yêu cầu bổ sung:** Bắt buộc, Min 10 ký tự, mô tả rõ các loại giấy tờ/thông tin cần cung cấp thêm.
- **Thời điểm bắt đầu đếm ngược:** Mốc thời gian hệ thống ghi nhận lúc gửi yêu cầu.
- **Hạn chót bổ sung (72h):** `deadline = current_time + 72 giờ`.
- **Trạng thái sau thao tác:** `Chờ bổ sung` (`Pending`).

**Luồng chính (Main Flow):**

1. Nhân viên nhấp chọn tính năng “Yêu cầu bổ sung hồ sơ”.
2. Nhập chi tiết các mục thông tin/giấy tờ sinh viên cần bổ sung.
3. Bấm “Gửi yêu cầu”.
4. Hệ thống kiểm tra nội dung (không được để trống).
5. Chuyển trạng thái Ticket sang `Chờ bổ sung` (`Pending`).
6. Kích hoạt bộ đếm ngược thời gian 72 giờ.
7. Phát thông báo cho Sinh viên để sinh viên vào nộp bổ sung ở Module M09.
8. *(Quy tắc tự động đóng)*: Nếu quá 72 giờ đếm ngược mà Sinh viên không nộp bổ sung, hệ thống sẽ tự động đóng đơn (`Closed`) để tránh đọng đơn treo.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nội dung yêu cầu bổ sung là bắt buộc để sinh viên biết rõ cần nộp giấy tờ gì.
* **BR-02:** Đồng hồ đếm ngược 72 giờ chạy tự động để kiểm soát thời hạn bổ sung.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Gửi yêu cầu bổ sung $\rightarrow$ Đơn chuyển sang trạng thái Chờ bổ sung và hiển thị đồng hồ đếm ngược 72h.

---

## [FR-M07-04] Nhân viên báo cáo và trả lại đơn do bị gửi sai phòng ban

**Mô tả:** Khi phát hiện Ticket không thuộc thẩm quyền chuyên môn của phòng ban mình, Nhân viên thực hiện báo cáo và chuyển trả đơn về cho Admin để điều chuyển sang phòng ban khác.

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Ticket đang thuộc phòng ban hiện tại của Nhân viên.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Lý do chuyển trả:** Bắt buộc, Max 500 ký tự (nêu rõ lý do sai phòng ban và gợi ý phòng ban đúng nếu biết).
- **Phòng ban chuyển trả:** Tự động lấy phòng ban hiện tại.
- **Trạng thái sau thao tác:** `Chưa tiếp nhận` (`New`).

**Luồng chính (Main Flow):**

1. Nhân viên mở Ticket và chọn tính năng “Báo sai phòng ban”.
2. Nhập bắt buộc “Lý do chuyển trả về Admin”.
3. Bấm “Xác nhận chuyển trả”.
4. Hệ thống làm trống tên nhân viên phụ trách cũ.
5. Đổi danh mục Ticket thành danh mục điều phối .
6. Đưa trạng thái Ticket về `Chưa tiếp nhận` (`New`) và đẩy vào Hàng chờ điều chuyển của Admin ở Module M11.
7. Lưu toàn bộ lý do chuyển trả vào lịch sử luân chuyển của đơn.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Bắt buộc phải nhập Lý do chuyển trả làm cơ sở để Admin phân tích và định tuyến lại đơn.
* **BR-02 (Bóc tách MVP Giai đoạn 1):** Luồng Admin tiếp nhận và điều chuyển đơn sai phòng ban (`M11-02`) được triển khai đồng bộ ở Giai đoạn 1 để đảm bảo đơn không bị kẹt khi nhân viên bấm trả lại.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Bấm chuyển trả kèm lý do $\rightarrow$ Đơn được gỡ khỏi phòng ban, xóa Assignee cũ và chuyển về Hàng chờ của Admin thành công.

---
