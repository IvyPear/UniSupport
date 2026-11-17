# PHÂN HỆ: M07 — XỬ LÝ & BỔ SUNG (PROCESS & EXCHANGE)

## [FR-M07-01] Nhân viên cập nhật tiến độ, ghi chú và lưu lịch sử xử lý đơn

**Mô tả:** Nhân viên phụ trách cập nhật tiến độ xử lý công việc chuyên môn, nhập ghi chú nội bộ và theo dõi dòng thời gian lịch sử thao tác (Audit Trail) của Ticket.

**Priority:** High (Cập nhật tiến độ xử lý và duy trì nhật ký theo dõi minh bạch).

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Nhân viên là người phụ trách chính (Assignee) của Ticket; Ticket đang ở trạng thái `Đang xử lý` (`In Progress`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Khóa chính của đơn.
- **Nội dung cập nhật:** Bắt buộc, Max 1000 ký tự (nội dung tiến độ hoặc ghi chú xử lý).
- **is_internal:** Bắt buộc, kiểu Boolean (Mặc định `false`). Nếu `true`: Ghi chú nội bộ (chỉ nhân sự phòng ban và quản lý nhìn thấy); Nếu `false`: Tiến độ công khai (Sinh viên và cán bộ đều nhìn thấy).
- **Mốc thời gian:** Tự động ghi nhận thời gian thực.

**Luồng chính (Main Flow):**

1. Nhân viên mở Ticket đang phụ trách từ danh sách công việc cá nhân.
2. Nhân viên chọn hình thức cập nhật: "Ghi chú nội bộ" (`is_internal = true`) hoặc "Tiến độ công khai" (`is_internal = false`), nhập nội dung chi tiết.
3. Bấm “Cập nhật tiến độ”.
4. Hệ thống ghi nhận thông tin vào dòng thời gian (Timeline / Audit Trail) của Ticket kèm cờ `is_internal`.
5. Phân quyền hiển thị:
   - Nếu `is_internal = true`: Chỉ hiển thị trong timeline nội bộ của Nhân viên và Trưởng phòng; Sinh viên xem chi tiết Ticket hoàn toàn không thấy ghi chú này.
   - Nếu `is_internal = false`: Hiển thị công khai trên tiến độ xử lý cho cả Sinh viên và Quản lý theo dõi.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ nhân viên phụ trách hoặc Trưởng phòng mới được quyền cập nhật tiến độ và ghi chú nội bộ cho Ticket đó. Ghi chú nội bộ (`is_internal = true`) tuyệt đối không trả về trong API xem chi tiết Ticket của vai trò Sinh viên.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Cập nhật tiến độ trái thẩm quyền):** Nhân viên không phải người phụ trách (Assignee) của Ticket cố gửi cập nhật $\rightarrow$ Backend từ chối với mã `403 Forbidden` (`BR-01`).
* **E-02 (Nội dung cập nhật rỗng hoặc quá 1000 ký tự):** Bấm lưu khi ô nội dung trống hoặc vượt quá 1000 ký tự $\rightarrow$ Báo lỗi validation `422 Unprocessable Entity`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhân viên phụ trách cập nhật tiến độ công khai hợp lệ (`is_internal = false`) $\rightarrow$ Lưu vào timeline và hiển thị cho cả Sinh viên và Quản lý; chặn cập nhật nếu không phải người phụ trách hoặc nội dung rỗng (`BR-01`, `E-01`, `E-02`).
* **AC-02:** Cập nhật ghi chú nội bộ (`is_internal = true`) $\rightarrow$ Lưu trữ chính xác trong timeline nội bộ; chỉ Nhân viên phòng ban và Trưởng phòng nhìn thấy, Sinh viên xem chi tiết Ticket hoàn toàn không thấy thông tin này (`BR-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Trên cùng một Ticket, nhân viên ghi 2 ghi chú nội bộ (`is_internal = true`) và 1 tiến độ công khai (`is_internal = false`) $\rightarrow$ API chi tiết Ticket của Sinh viên chỉ trả về đúng 1 bản ghi tiến độ công khai.

---

## [FR-M07-02] Nhân viên xem lại danh sách lịch sử các đơn mình đã xử lý

**Mô tả:** Nhân viên tra cứu, tìm kiếm và xem lại danh sách các Ticket mình đã từng tiếp nhận, xử lý hoặc giải quyết trong quá khứ kèm theo điểm đánh giá mức độ hài lòng (CSAT) từ Sinh viên.

**Priority:** Low (Tra cứu lịch sử cá nhân phục vụ rà soát, không ảnh hưởng trực tiếp đến luồng xử lý đơn hiện hành).

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Nhân viên đã đăng nhập vào hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Tùy chọn, Mã Ticket hoặc Tiêu đề Ticket.
- **Khoảng thời gian:** Tùy chọn, Từ ngày - Đến ngày.
- **Trạng thái Ticket / Nhãn lịch sử xử lý:** `Hoàn thành` (`Resolved`), `Đã đóng` (`Closed`), `Đã điều chuyển` (`Reassigned` — nhãn lịch sử của nhân viên đối với đơn đã báo sai phòng ban/điều chuyển đi; trạng thái vòng đời gốc của Ticket vẫn giữ theo 5 trạng thái chuẩn).
- **Điểm đánh giá (CSAT):** Điểm 1-5 sao và nhận xét của sinh viên (nếu có).

**Luồng chính (Main Flow):**

1. Nhân viên truy cập menu “Lịch sử xử lý”.
2. Hệ thống tải toàn bộ danh sách các Ticket mà nhân viên đã từng tham gia xử lý hoặc hoàn thành.
3. Nhân viên có thể lọc theo khoảng thời gian hoặc tìm theo Mã Ticket.
4. Nhấp vào một Ticket để xem lại chi tiết nội dung, các bước xử lý, kết quả đã trả và điểm số đánh giá 1-5 sao của sinh viên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nhân viên chỉ xem được lịch sử các đơn mà chính mình đã từng phụ trách.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Cố truy cập lịch sử đơn của nhân viên khác):** Nhân viên gọi API xem lịch sử đơn mà mình chưa từng tham gia xử lý $\rightarrow$ Hệ thống từ chối với mã `403 Forbidden` (`BR-01`).
* **E-02 (Khoảng thời gian lọc không có dữ liệu):** Lọc khoảng ngày không có đơn nào đã xử lý $\rightarrow$ Hiển thị bảng rỗng kèm thông báo *"Không có đơn trong khoảng thời gian đã chọn"*.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị đúng danh sách Ticket mà chính nhân viên đó đã từng xử lý kèm Mã Ticket, trạng thái/nhãn lịch sử (`Resolved`, `Closed`, `Reassigned`), Audit Trail và điểm đánh giá CSAT (1–5 sao) từ sinh viên; chặn xem đơn của người khác (`BR-01`, `E-01`, `E-02`).

**Ví dụ Edge Case (Trường hợp biên):**

* Ticket bị hệ thống tự động đóng sau 3 ngày không đánh giá (`Rating = null`) $\rightarrow$ Trong danh sách lịch sử của nhân viên, cột điểm CSAT hiển thị *"Chưa có đánh giá"* thay vì `0 sao`.

---

## [FR-M07-03] Nhân viên yêu cầu sinh viên bổ sung hồ sơ và bắt đầu đếm ngược 3 ngày làm việc

**Mô tả:** Khi hồ sơ chưa đủ điều kiện xử lý, Nhân viên gửi yêu cầu Sinh viên bổ sung thêm thông tin/giấy tờ còn thiếu, hệ thống chuyển đơn sang trạng thái `Chờ bổ sung` và kích hoạt đồng hồ đếm ngược 3 ngày làm việc.

**Priority:** High (Cơ chế yêu cầu bổ sung hồ sơ và kích hoạt hạn chót 3 ngày làm việc).

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Ticket đang ở trạng thái `Đang xử lý` (`In Progress`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nội dung yêu cầu bổ sung:** Bắt buộc, Min 10 ký tự, mô tả rõ các loại giấy tờ/thông tin cần cung cấp thêm.
- **Thời điểm bắt đầu đếm ngược:** Mốc thời gian hệ thống ghi nhận lúc gửi yêu cầu.
- **Hạn chót bổ sung:** `deadline = current_time + 3 ngày làm việc` (không tính Thứ 7, Chủ Nhật và ngày Lễ).
- **Trạng thái sau thao tác:** `Chờ bổ sung` (`Pending`).

**Luồng chính (Main Flow):**

1. Nhân viên nhấp chọn tính năng “Yêu cầu bổ sung hồ sơ”.
2. Nhập chi tiết các mục thông tin/giấy tờ sinh viên cần bổ sung.
3. Bấm “Gửi yêu cầu”.
4. Hệ thống kiểm tra nội dung (không được để trống).
5. Chuyển trạng thái Ticket sang `Chờ bổ sung` (`Pending`).
6. Kích hoạt bộ đếm ngược thời gian 3 ngày làm việc (không tính Thứ 7, Chủ nhật và ngày lễ).
7. Phát thông báo cho Sinh viên để sinh viên vào nộp bổ sung ở Module M09.
8. *(Quy tắc tự động đóng)*: Nếu quá **3 ngày làm việc** (không tính Thứ 7, Chủ Nhật và ngày Lễ) mà Sinh viên không nộp bổ sung, hệ thống tự động chuyển đơn sang trạng thái `Closed`, đánh dấu `auto_closed = true` và ghi nhận lý do đóng tự động vào lịch sử Ticket.

**Alternative / Error Flows:**

* **E-01 (Yêu cầu bổ sung lần 2 trên cùng một Ticket):**
  - *Điều kiện kích hoạt:* Nhân viên cố tình gửi thêm yêu cầu bổ sung khi Ticket đã từng chuyển sang `Pending` trước đó (hoặc gọi API khi giao diện đã khóa nút).
  - *Xử lý của hệ thống:* Backend chặn yêu cầu, trả về mã lỗi `400 Bad Request` kèm thông báo *"Ticket chỉ được phép yêu cầu bổ sung tối đa 1 lần"* (`BR-03`).
* **E-02 (Để trống nội dung yêu cầu bổ sung):**
  - *Điều kiện kích hoạt:* Nhân viên bấm gửi nhưng để trống hoặc nhập dưới 10 ký tự tại ô nội dung yêu cầu bổ sung.
  - *Xử lý của hệ thống:* Hệ thống chặn gửi và báo lỗi validation `422 Unprocessable Entity` (`BR-01`).

**Ví dụ Edge Case:**
* *Yêu cầu bổ sung vào 16h30 chiều Thứ Sáu:* Hệ thống tính hạn chót 3 ngày làm việc bỏ qua Thứ Bảy và Chủ Nhật, hạn chót sẽ rơi vào 16h30 chiều Thứ Tư tuần kế tiếp.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Nội dung yêu cầu bổ sung là bắt buộc để sinh viên biết rõ cần nộp giấy tờ gì.
* **BR-02:** Đồng hồ đếm ngược 3 ngày làm việc chạy tự động để kiểm soát thời hạn bổ sung.
* **BR-03 (Giới hạn 1 lần bổ sung):** Nhân viên chỉ được gửi yêu cầu bổ sung tối đa **1 lần** cho mỗi Ticket. Sau khi Sinh viên đã bổ sung và đơn quay lại `In Progress`, Nhân viên không được chuyển đơn về `Pending` lần thứ hai.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ nội dung ($\ge 10$ ký tự) và gửi yêu cầu bổ sung $\rightarrow$ Đơn chuyển sang trạng thái Chờ bổ sung (`Pending`) và hiển thị đếm ngược 3 ngày làm việc; nếu để trống nội dung thì chặn gửi (`BR-01`, `BR-02`, `E-02`).
* **AC-02:** Quá 3 ngày làm việc Sinh viên không bổ sung $\rightarrow$ Đơn tự động chuyển sang `Closed` (`auto_closed = true`) và ghi nhận lý do đóng tự động (`BR-02`).
* **AC-03:** Nhân viên đã gửi yêu cầu bổ sung 1 lần $\rightarrow$ Nút "Yêu cầu bổ sung" bị ẩn/khóa, gọi API trả về `400 Bad Request`, không cho phép gửi lần thứ hai (`BR-03`, `E-01`).

---

## [FR-M07-04] Nhân viên báo cáo và trả lại đơn do bị gửi sai phòng ban

**Mô tả:** Khi phát hiện Ticket không thuộc thẩm quyền chuyên môn của phòng ban mình, Nhân viên thực hiện báo cáo và chuyển trả đơn về cho Admin để điều chuyển sang phòng ban khác.

**Priority:** High (Xử lý trường hợp gửi nhầm phòng ban, chuyển trả về hàng chờ điều phối tập trung).

**Actor:** Nhân viên hỗ trợ

**Preconditions (Điều kiện tiên quyết):** Nhân viên là người phụ trách Ticket, Ticket thuộc phòng ban hiện tại và đang ở trạng thái `Đang xử lý` (`In Progress`).

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
5. Đổi danh mục Ticket thành "Khác", đưa phòng ban về trạng thái chưa xác định trong thời gian chờ Admin phân loại; mã Ticket giữ nguyên.
6. Đưa trạng thái Ticket về `Chưa tiếp nhận` (`New`) và đẩy vào Hàng chờ điều chuyển của Admin ở Module M11.
7. Lưu toàn bộ lý do chuyển trả vào lịch sử luân chuyển của đơn.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Bắt buộc phải nhập Lý do chuyển trả làm cơ sở để Admin phân tích và định tuyến lại đơn.
* **BR-02 (Nghiệm thu đồng bộ MS-02):** Luồng Admin tiếp nhận và điều chuyển đơn sai phòng ban (`FR-M11-02`) phải được nghiệm thu cùng tính năng chuyển trả ở M07 trong MS-02 để tránh đơn bị kẹt ở hàng chờ Admin.
* **BR-03:** Đây là chuyển đổi ngoại lệ `In Progress` $\rightarrow$ `New` đã được quy định trong Domain, không áp dụng cho Ticket `Pending`, `Resolved` hoặc `Closed`.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Bỏ trống lý do chuyển trả):** Nhân viên bấm xác nhận chuyển trả nhưng không nhập lý do $\rightarrow$ Hệ thống chặn thao tác và báo lỗi `422 Unprocessable Entity` (`BR-01`).
* **E-02 (Chuyển trả đơn không ở trạng thái `In Progress`):** Gọi API chuyển trả khi Ticket đang ở `Pending`, `Resolved` hoặc `Closed` $\rightarrow$ Backend từ chối với mã `400 Bad Request` (`BR-03`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Khi đơn đang `In Progress`, nhân viên bấm chuyển trả kèm lý do hợp lệ $\rightarrow$ Đơn được gỡ khỏi phòng ban, xóa Assignee cũ, đổi danh mục sang "Khác", chuyển về Hàng chờ của Admin ở trạng thái `New` (`BR-02`); nếu bỏ trống lý do (`BR-01`, `E-01`) thì trả về `422 Unprocessable Entity`, nếu đơn đang ở `Pending`/`Resolved`/`Closed` (`BR-03`, `E-02`) thì trả về `400 Bad Request`.

**Ví dụ Edge Case (Trường hợp biên):**

* Ticket đã được nhân viên phòng A ghi 2 dòng ghi chú nội bộ rồi mới phát hiện sai phòng ban và chuyển trả về Admin $\rightarrow$ Mã Ticket và toàn bộ dòng thời gian lịch sử trước đó được giữ nguyên khi chuyển sang phòng ban mới.

---
