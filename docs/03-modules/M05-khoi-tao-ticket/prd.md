# PHÂN HỆ: M05 — TẠO FORM TICKET (CREATE TICKET)

## [FR-M05-01] Chọn phòng ban, danh mục hoặc "Khác"

**Mô tả:** Sinh viên chọn đơn vị tiếp nhận và loại danh mục thủ tục hành chính cụ thể hoặc chọn danh mục "Khác" nếu không rõ đơn vị phụ trách.

**Priority:** High (Bước khởi đầu bắt buộc của quy trình tạo yêu cầu hỗ trợ).

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Sinh viên đã đăng nhập thành công vào hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban tiếp nhận:** Bắt buộc (chọn trong danh sách Phòng ban) hoặc chưa xác định nếu chọn mục "Khác".
- **Danh mục hỗ trợ:** Bắt buộc, ID danh mục cụ thể hoặc mã đặc biệt của mục "Khác".

**Luồng chính (Main Flow):**

1. Sinh viên nhấp nút “Tạo yêu cầu mới”.
2. Giao diện hiển thị cây danh mục thủ tục được nhóm trực quan theo từng Phòng ban.
3. Sinh viên chọn Phòng ban tiếp nhận $\rightarrow$ Chọn Danh mục thủ tục cụ thể.
4. Trường hợp không biết yêu cầu thuộc phòng ban nào, Sinh viên tích chọn mục “Khác”.
5. Hệ thống hiển thị phần mô tả hướng dẫn giấy tờ tương ứng với danh mục vừa chọn (nếu có).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Đơn chọn danh mục “Khác” sẽ được chuyển về Hàng chờ của Admin ở Module M11 để phân loại định tuyến.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Chưa chọn danh mục hoặc danh mục vừa bị ẩn):** Sinh viên nhấn tiếp tục khi chưa chọn danh mục hỗ trợ, hoặc danh mục đang chọn vừa bị Admin/Trưởng phòng tắt hiển thị (`is_active = false`) $\rightarrow$ Hệ thống báo lỗi yêu cầu chọn lại danh mục đang hoạt động.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Chọn đúng phòng ban và danh mục đang hoạt động $\rightarrow$ Form hiển thị đúng hướng dẫn thủ tục; nếu chưa chọn hoặc danh mục bị khóa thì báo lỗi (`E-01`).
* **AC-02:** Chọn mục "Khác" $\rightarrow$ Cho phép tiếp tục bước nhập nội dung mà không bắt buộc chọn phòng ban để định tuyến về Hàng chờ Admin (`BR-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Sinh viên ban đầu chọn "Phòng Đào tạo" nhưng sau đó chuyển sang tích chọn mục "Khác" $\rightarrow$ Hệ thống tự động xóa lựa chọn Phòng Đào tạo và ẩn phần hướng dẫn giấy tờ cũ.

---

## [FR-M05-02] Nhập thông tin, đính kèm file và gửi Ticket

**Mô tả:** Sinh viên điền chi tiết tiêu đề, nội dung yêu cầu, đính kèm tệp minh chứng và gửi Ticket lên hệ thống.

**Priority:** High (Chức năng cốt lõi cho phép sinh viên nộp yêu cầu hỗ trợ vào hệ thống).

**Actor:** Sinh viên

**Preconditions (Điều kiện tiên quyết):** Đã hoàn tất bước chọn danh mục ở FR-M05-01.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Hệ thống tự động sinh theo quy chuẩn: `[CATEGORY_CODE]-[YYYYMMDD]-[SEQ_NUMBER]` (4 chữ số thứ tự trong ngày; VD: `IT-20261022-0042`). Mã không thay đổi khi Ticket được phân loại/điều phối lại.
- **Tiêu đề yêu cầu:** Bắt buộc, Min 5 - Max 150 ký tự.
- **Nội dung chi tiết:** Bắt buộc, Min 10 ký tự, mô tả rõ vấn đề cần hỗ trợ.
- **Tệp đính kèm:** Tùy chọn, tối đa 5 file, dung lượng tối đa 5MB/file (định dạng: `.png`, `.jpg`, `.pdf`, `.docx`).
- **Trạng thái khởi tạo:** `Chưa tiếp nhận` (`New`).

**Luồng chính (Main Flow):**

1. Sinh viên nhập Tiêu đề và Nội dung chi tiết yêu cầu.
2. Sinh viên tải lên các tệp đính kèm minh chứng (nếu có).
3. Nhấn nút “Gửi Ticket”.
4. Hệ thống kiểm tra tính hợp lệ của dữ liệu đầu vào và dung lượng file.
5. Hệ thống tự động sinh Mã Ticket chuẩn duy nhất.
6. Lưu Ticket vào CSDL với trạng thái ban đầu là `Chưa tiếp nhận` (`New`).
7. Tự động đưa đơn vào Hàng chờ tiếp nhận của Phòng ban chuyên trách (hoặc Hàng chờ Admin nếu là mục "Khác").
8. Hiển thị thông báo gửi đơn thành công kèm Mã Ticket cho sinh viên.

**Alternative / Error Flows:**

* **E-01 (Tệp đính kèm không hợp lệ hoặc vượt dung lượng):**
  - *Điều kiện kích hoạt:* Sinh viên tải file có dung lượng > 5MB hoặc định dạng không thuộc `.png`, `.jpg`, `.pdf`, `.docx`.
  - *Xử lý của hệ thống:* Hệ thống chặn gửi đơn, trả về mã lỗi `422 Unprocessable Entity` (hoặc thông báo lỗi validation trên giao diện), hiển thị rõ tên tệp vi phạm và yêu cầu chọn lại tệp đúng chuẩn. Form giữ nguyên nội dung tiêu đề và mô tả đã nhập.
* **E-02 (Bỏ trống hoặc nhập quá ngắn Tiêu đề / Nội dung):**
  - *Điều kiện kích hoạt:* Sinh viên để trống hoặc nhập Tiêu đề $< 5$ ký tự / Nội dung $< 10$ ký tự.
  - *Xử lý của hệ thống:* Hiển thị lỗi validation tại ô nhập liệu và không cho phép gửi Ticket (`BR-01`).

**Ví dụ Edge Case:**
* *Tải 6 tệp đính kèm:* Sinh viên chọn 6 ảnh chụp màn hình minh chứng $\rightarrow$ Hệ thống lập tức báo lỗi vượt quá số lượng tối đa 5 file và không cho tải lên.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Tiêu đề và Nội dung là trường bắt buộc, không được để trống.
* **BR-02:** Tệp vượt quá 5MB hoặc không đúng định dạng cho phép sẽ bị chặn và cảnh báo tại chỗ.
* **BR-03:** Nếu chọn danh mục "Khác", Ticket được lưu trạng thái `New` với phòng ban chưa xác định và chuyển về hàng chờ Admin; Admin xác định phòng ban trước khi chuyển cho nhân viên xử lý.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Nhập đủ thông tin hợp lệ và gửi thành công $\rightarrow$ Sinh đúng Mã Ticket, lưu trạng thái Chưa tiếp nhận (`New`) và chuyển vào hàng chờ phòng ban hoặc hàng chờ Admin nếu là mục "Khác" (`BR-03`).
* **AC-02:** Bỏ trống/nhập quá ngắn Tiêu đề, Nội dung (`BR-01`, `E-02`) hoặc file đính kèm > 5MB / sai định dạng (`BR-02`, `E-01`) $\rightarrow$ Hệ thống hiển thị cảnh báo lỗi và không cho gửi.

---

## [FR-M05-03] Sinh viên chỉnh sửa Tiêu đề, Nội dung và tệp đính kèm khi đơn chưa được tiếp nhận

**Mô tả:** Khi Ticket đang ở trạng thái `Chưa tiếp nhận` (`New`), Sinh viên có quyền mở lại đơn để chỉnh sửa Tiêu đề và Nội dung yêu cầu hoặc cập nhật lại tệp đính kèm. Để tránh xáo trộn luồng điều phối hàng chờ, Sinh viên không được phép thay đổi Phòng ban và Danh mục dịch vụ.

**Priority:** Medium (Tiện ích hỗ trợ sinh viên tự sửa sai sót khi đơn chưa vào luồng xử lý).

**Actor:** Sinh viên (Chủ sở hữu Ticket)

**Preconditions (Điều kiện tiên quyết):** Ticket do chính tài khoản Sinh viên tạo và đang ở trạng thái `Chưa tiếp nhận` (`New`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc, chỉ đọc.
- **Phòng ban & Danh mục:** Chỉ đọc (Khóa cứng, không cho phép chỉnh sửa).
- **Tiêu đề yêu cầu:** Bắt buộc, Min 5 - Max 150 ký tự.
- **Nội dung chi tiết:** Bắt buộc, Min 10 ký tự.
- **Tệp đính kèm:** Tùy chọn, tối đa 5 file, dung lượng tối đa 5MB/file (`.png`, `.jpg`, `.pdf`, `.docx`).

**Luồng chính (Main Flow):**

1. Sinh viên mở chi tiết Ticket đang ở trạng thái `Chưa tiếp nhận` (`New`) từ danh sách yêu cầu.
2. Nhấn nút “Chỉnh sửa đơn”.
3. Giao diện hiển thị form chỉnh sửa:
   - Thông tin Phòng ban và Danh mục hiển thị ở dạng chỉ đọc (`disabled`).
   - Ô Tiêu đề và Nội dung cho phép người dùng thay đổi văn bản.
   - Khu vực đính kèm cho phép xóa tệp cũ hoặc tải thêm tệp mới (tổng số tệp $\le 5$).
4. Sinh viên sửa đổi thông tin và nhấn “Lưu thay đổi”.
5. Hệ thống kiểm tra hợp lệ dữ liệu (độ dài, dung lượng tệp).
6. Hệ thống cập nhật dữ liệu mới vào Ticket và ghi nhận log vào Audit Trail: *"Sinh viên cập nhật tiêu đề/nội dung/tệp đính kèm yêu cầu"* (ghi rõ tệp đã thêm/xóa nếu có).
7. Hiển thị thông báo cập nhật thành công trên giao diện.

**Alternative / Error Flows:**

* **E-01 (Xung đột trạng thái do nhân viên tiếp nhận đơn):**
  - *Điều kiện kích hoạt:* Trong lúc sinh viên đang sửa form, nhân viên bấm tiếp nhận (`claim`) khiến trạng thái Ticket chuyển từ `New` sang `In Progress`.
  - *Xử lý của hệ thống:* Khi sinh viên bấm "Lưu thay đổi", hệ thống kiểm tra trạng thái hiện tại, từ chối cập nhật, trả về mã lỗi `400 Bad Request` kèm thông báo *"Đơn đã được nhân viên tiếp nhận xử lý, không thể chỉnh sửa"*, đồng thời tải lại giao diện chi tiết mới nhất của Ticket.
* **E-02 (Cố tình thay đổi phòng ban hoặc danh mục):**
  - *Điều kiện kích hoạt:* Người dùng can thiệp payload gửi yêu cầu đổi `department_id` hoặc `category_id`.
  - *Xử lý của hệ thống:* Backend chặn yêu cầu, trả về lỗi `400 Bad Request` và giữ nguyên phòng ban/danh mục ban đầu (BR-02).

**Ví dụ Edge Case:**
* *Xóa toàn bộ tệp cũ và tải 1 tệp mới hợp lệ:* Hệ thống cập nhật danh sách đính kèm mới, xóa liên kết tệp cũ và ghi log chi tiết vào Audit Trail mà không làm thay đổi mã Ticket.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ cho phép chỉnh sửa Tiêu đề, Nội dung và tệp đính kèm khi trạng thái Ticket chính xác là `New`; giới hạn số lượng, dung lượng và định dạng tệp vẫn giữ như lúc tạo.
* **BR-02:** Tuyệt đối không cho phép thay đổi Phòng ban hoặc Danh mục (theo quy định tại [quy-tac-nghiep-vu.md](../../02-domain/quy-tac-nghiep-vu.md) BR-2).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Khi Ticket ở trạng thái `New`, sinh viên sửa Tiêu đề và Nội dung hợp lệ $\rightarrow$ Hệ thống lưu thành công và ghi lịch sử truy vết.
* **AC-02:** Form chỉnh sửa khóa hoàn toàn trường Phòng ban và Danh mục, không cho phép thay đổi.
* **AC-03:** Khi Ticket đã chuyển sang `In Progress` hoặc các trạng thái khác $\rightarrow$ Nút "Chỉnh sửa đơn" bị ẩn, gọi API trực tiếp trả về lỗi `400 Bad Request`.
* **AC-04:** Khi Ticket còn `New`, sinh viên được thêm hoặc xóa tệp đính kèm hợp lệ; việc thay đổi được ghi lịch sử và không làm thay đổi mã Ticket, danh mục hoặc phòng ban.

