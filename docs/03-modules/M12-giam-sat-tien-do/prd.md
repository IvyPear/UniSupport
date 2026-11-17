# PHÂN HỆ: M12 — THEO DÕI TIẾN ĐỘ (PROGRESS MONITORING)

## [FR-M12-01] Theo dõi khối lượng công việc của từng nhân viên trong phòng ban

**Mô tả:** Trưởng phòng (Quản lý) theo dõi bảng tổng hợp khối lượng công việc, số lượng đơn đang thụ lý và năng suất xử lý của từng nhân viên trong phòng ban.

**Priority:** Medium (Giám sát năng suất nội bộ phòng ban, hỗ trợ trưởng phòng điều hành).

**Actor:** Quản lý phòng ban (Trưởng phòng)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với vai trò Quản lý phòng ban.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phòng ban:** ID phòng ban của Quản lý.
- **Danh sách nhân viên:** Tên nhân viên, Số đơn đang xử lý, Số đơn chờ bổ sung, Số đơn hoàn thành.
- **Tải công việc:** Tỷ lệ phân bổ công việc giữa các nhân sự.

**Luồng chính (Main Flow):**

1. Trưởng phòng mở menu “Theo dõi tiến độ phòng ban”.
2. Hệ thống tổng hợp số liệu thời gian thực của tất cả nhân viên trực thuộc:
   - Tổng số đơn đã tiếp nhận.
   - Số đơn đang xử lý (`In Progress`).
   - Số đơn chờ sinh viên bổ sung (`Pending`).
   - Số đơn đã giải quyết trong tháng (`Resolved`).
3. Trưởng phòng có thể nhấp vào tên một Nhân viên cụ thể để xem danh sách chi tiết các đơn người đó đang phụ trách.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Trưởng phòng chỉ xem được số liệu và danh sách nhân sự thuộc nội bộ phòng ban của mình.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Truy cập dữ liệu nhân sự phòng ban khác):** Trưởng phòng gọi API giám sát tiến độ với `department_id` của phòng ban khác $\rightarrow$ Backend từ chối với mã `403 Forbidden` (`BR-01`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác bảng phân bổ khối lượng công việc của từng nhân viên thuộc phòng ban (gồm các cột: Tổng đơn đã nhận, `In Progress`, `Pending`, `Resolved`); chặn `403 Forbidden` nếu Trưởng phòng truy cập số liệu phòng ban khác (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Nhân viên mới chuyển về phòng ban chưa từng tiếp nhận Ticket nào $\rightarrow$ Vẫn hiển thị tên nhân viên trong bảng giám sát với các chỉ số số lượng đơn bằng `0`.

---

## [FR-M12-02] Tô đỏ cảnh báo các đơn sắp quá hạn hoặc bị tồn đọng lâu

**Mô tả:** Hệ thống tự động phát hiện, tính toán mốc thời gian và hiển thị nhãn tô đỏ cảnh báo đối với các Ticket chưa được tiếp nhận quá lâu hoặc có nguy cơ vượt ngưỡng cam kết SLA của phòng ban.

**Priority:** High (Cảnh báo trực quan vi phạm thời hạn SLA, ngăn ngừa chậm trễ giải quyết đơn).

**Actor:** Quản lý phòng ban, Nhân viên

**Preconditions (Điều kiện tiên quyết):** Ticket tồn tại trong hệ thống và có mốc SLA quy định.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Thời hạn SLA:** Số giờ xử lý cam kết theo danh mục dịch vụ.
- **Thời gian đã trôi qua:** Tính từ lúc tạo đơn hoặc lúc tiếp nhận.
- **Trạng thái cảnh báo:** Cảnh báo vàng (sắp quá hạn — khi thời gian xử lý đã chạm $\ge 80\%$ thời hạn SLA) / Cảnh báo đỏ (đã quá hạn SLA $> 100\%$ hoặc đơn `New` tồn đọng quá 4 giờ làm việc chưa được tiếp nhận).

**Luồng chính (Main Flow):**

1. Tại danh sách đơn phòng ban hoặc màn hình giám sát, hệ thống liên tục tính toán thời gian xử lý thực tế so với mốc SLA cam kết.
2. Khi thời gian xử lý đạt $\ge 80\%$ thời hạn SLA cam kết, hệ thống hiển thị nhãn cảnh báo vàng (`Sắp quá hạn SLA`). Với các đơn quá hạn đếm ngược 3 ngày làm việc bổ sung, đơn `New` chưa tiếp nhận quá 4 giờ làm việc, hoặc vượt $100\%$ thời gian SLA:
   - Hệ thống tự động tô màu đỏ nổi bật trên dòng Ticket.
   - Hiển thị nhãn cảnh báo rõ ràng: `Quá hạn SLA` kèm số giờ vượt quá.
3. Trưởng phòng và nhân viên nhấp vào nhãn cảnh báo để xem chi tiết và can thiệp kịp thời (phân công lại hoặc đôn đốc xử lý).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mọi Ticket vượt quá thời hạn SLA quy định đều bắt buộc phải được đánh dấu cảnh báo đỏ trên giao diện quản trị.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Ticket đã chuyển sang `Resolved` hoặc `Closed`):** Khi đơn được nhân viên giải quyết xong hoặc đóng lại $\rightarrow$ Hệ thống chốt thời gian thực tế tại thời điểm `resolved_at` và gỡ đơn khỏi danh sách cảnh báo tồn đọng đang hoạt động.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Ticket chạm $\ge 80\%$ thời hạn SLA hiển thị cảnh báo vàng; Ticket vượt $100\%$ mốc SLA cam kết hoặc đơn `New` tồn đọng $> 4$ giờ làm việc lập tức hiển thị nhãn tô đỏ `Quá hạn SLA` kèm số giờ vượt quá (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Ticket thuộc danh mục có SLA 24 giờ làm việc đã trôi qua 24 giờ 05 phút $\rightarrow$ Dòng Ticket tự động chuyển từ cảnh báo vàng sang tô đỏ `Quá hạn SLA` và phát thông báo In-app cho Trưởng phòng.

---

## [FR-M12-03] Admin theo dõi các phòng ban đang bị tồn đọng nhiều đơn nhất

**Mô tả:** Admin giám sát tiến độ xử lý toàn trường, theo dõi biểu đồ và bảng xếp hạng các phòng ban đang có lượng Ticket tồn đọng nhiều nhất hoặc tỷ lệ quá hạn cao nhất để kịp thời chỉ đạo.

**Priority:** Medium (Theo dõi điểm nghẽn toàn trường, phục vụ chỉ đạo quản lý của Admin).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin toàn trường.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Phạm vi giám sát:** Toàn bộ các Phòng ban trong trường.
- **Chỉ số tổng hợp:** Tổng số đơn toàn trường, Số đơn đang tồn đọng theo từng phòng ban, Tỷ lệ đơn quá hạn của từng phòng ban.

**Luồng chính (Main Flow):**

1. Admin truy cập màn hình “Giám sát tiến độ toàn trường”.
2. Hệ thống tổng hợp dữ liệu từ tất cả các phòng ban.
3. Hiển thị danh sách các phòng ban được sắp xếp theo thứ tự giảm dần của số lượng đơn tồn đọng hoặc tỷ lệ quá hạn.
4. Admin nhấp vào từng phòng ban để xem chi tiết tình hình điểm nghẽn của đơn vị đó.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Chỉ Role Admin mới có quyền xem dữ liệu giám sát so sánh chéo giữa tất cả các phòng ban.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Người dùng không phải Admin truy cập):** Tài khoản `Manager`, `Staff` hoặc `Student` truy cập màn hình/API xếp hạng tồn đọng toàn trường $\rightarrow$ Backend chặn với mã `403 Forbidden` (`BR-01`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác bảng xếp hạng các phòng ban giảm dần theo số lượng đơn tồn đọng và tỷ lệ quá hạn SLA trên toàn trường; chặn `403 Forbidden` đối với các vai trò ngoài Admin (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Toàn trường chưa có đơn nào quá hạn SLA $\rightarrow$ Bảng xếp hạng hiển thị tỷ lệ quá hạn `0%` cho tất cả các phòng ban và sắp xếp theo tổng số đơn đang xử lý.

---

## [FR-M12-04] Admin tìm kiếm và tra cứu chi tiết mọi đơn trên toàn trường

**Mô tả:** Admin có đặc quyền tìm kiếm, truy vết tiến độ và xem chi tiết toàn bộ lịch sử luân chuyển của bất kỳ Ticket nào trên phạm vi toàn trường nhằm phục vụ công tác thanh tra và giải quyết khiếu nại.

**Priority:** Low (Công cụ tra cứu thanh tra đột xuất toàn trường của Admin, không ảnh hưởng vận hành thường nhật).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Đăng nhập với quyền Admin hệ thống.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Từ khóa tìm kiếm:** Mã Ticket (ưu tiên), Mã sinh viên, Họ tên sinh viên hoặc Tiêu đề.
- **Quyền dữ liệu:** Xuyên phòng ban (Bypass Data Isolation).

**Luồng chính (Main Flow):**

1. Admin mở công cụ “Tra cứu Ticket toàn trường” (`Global Ticket Search`).
2. Admin nhập Mã Ticket hoặc thông tin sinh viên cần tra cứu.
3. Hệ thống quét toàn bộ CSDL và trả về danh sách kết quả phù hợp không phân biệt phòng ban.
4. Admin nhấp vào một Ticket để xem chi tiết:
   - Trạng thái hiện tại và phòng ban đang thụ lý.
   - Nhân viên phụ trách hiện tại.
   - Toàn bộ dòng thời gian lịch sử luân chuyển (Audit Trail) từ lúc tạo, các lần chuyển phòng ban, ghi chú và kết quả.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Đặc quyền tra cứu xuyên phòng ban chỉ dành riêng cho Role Admin. Trưởng phòng chỉ được tra cứu trong phạm vi phòng ban của mình.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Không tìm thấy Ticket):** Admin nhập Mã Ticket hoặc mã sinh viên không tồn tại $\rightarrow$ Hiển thị trạng thái rỗng kèm thông báo *"Không tìm thấy Ticket khớp với từ khóa tra cứu"*.
* **E-02 (Truy cập công cụ tra cứu toàn trường trái quyền):** Vai trò không phải `Admin` gọi API tra cứu xuyên phòng ban $\rightarrow$ Từ chối với mã `403 Forbidden` (`BR-01`).

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin nhập đúng Mã Ticket hoặc thông tin sinh viên $\rightarrow$ Hiển thị đầy đủ chi tiết và lịch sử Audit Trail của Ticket dù đơn thuộc bất kỳ phòng ban nào; trả về thông báo rỗng nếu không khớp và chặn `403` với vai trò khác (`BR-01`, `E-01`, `E-02`).

**Ví dụ Edge Case (Trường hợp biên):**

* Admin tra cứu một Ticket vừa tạo ở mục "Khác" (chưa có `department_id` và `assignee_id`) $\rightarrow$ Hệ thống vẫn hiển thị đầy đủ nội dung đơn với trạng thái phòng ban là *"Chờ Admin phân loại"*.

---
