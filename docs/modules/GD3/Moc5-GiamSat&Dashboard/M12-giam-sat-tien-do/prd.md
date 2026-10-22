# PHÂN HỆ: M12 — THEO DÕI TIẾN ĐỘ (PROGRESS MONITORING)

## [FR-M12-01] Theo dõi khối lượng công việc của từng nhân viên trong phòng ban

**Mô tả:** Trưởng phòng (Quản lý) theo dõi bảng tổng hợp khối lượng công việc, số lượng đơn đang thụ lý và năng suất xử lý của từng nhân viên trong phòng ban.

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

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác bảng phân bổ khối lượng công việc thực tế của từng nhân viên trong phòng ban.

---

## [FR-M12-02] Tô đỏ cảnh báo các đơn sắp quá hạn hoặc bị tồn đọng lâu

**Mô tả:** Hệ thống tự động phát hiện, tính toán mốc thời gian và hiển thị nhãn tô đỏ cảnh báo đối với các Ticket chưa được tiếp nhận quá lâu hoặc có nguy cơ vượt ngưỡng cam kết SLA của phòng ban.

**Actor:** Quản lý phòng ban, Nhân viên

**Preconditions (Điều kiện tiên quyết):** Ticket tồn tại trong hệ thống và có mốc SLA quy định.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Thời hạn SLA:** Số giờ xử lý cam kết theo danh mục dịch vụ.
- **Thời gian đã trôi qua:** Tính từ lúc tạo đơn hoặc lúc tiếp nhận.
- **Trạng thái cảnh báo:** Cảnh báo vàng (sắp quá hạn) / Cảnh báo đỏ (đã quá hạn SLA hoặc tồn đọng lâu ngày).

**Luồng chính (Main Flow):**

1. Tại danh sách đơn phòng ban hoặc màn hình giám sát, hệ thống liên tục tính toán thời gian xử lý thực tế so với mốc SLA cam kết.
2. Với các đơn quá hạn đếm ngược 3 ngày làm việc bổ sung hoặc quá hạn thời gian SLA:
   - Hệ thống tự động tô màu đỏ nổi bật trên dòng Ticket.
   - Hiển thị nhãn cảnh báo rõ ràng: `Quá hạn SLA` kèm số giờ vượt quá.
3. Trưởng phòng và nhân viên nhấp vào nhãn cảnh báo để xem chi tiết và can thiệp kịp thời (phân công lại hoặc đôn đốc xử lý).

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Mọi Ticket vượt quá thời hạn SLA quy định đều bắt buộc phải được đánh dấu cảnh báo đỏ trên giao diện quản trị.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Ticket vượt mốc SLA cam kết lập tức hiển thị nhãn tô đỏ cảnh báo nổi bật.

---

## [FR-M12-03] Admin theo dõi các phòng ban đang bị tồn đọng nhiều đơn nhất

**Mô tả:** Admin giám sát tiến độ xử lý toàn trường, theo dõi biểu đồ và bảng xếp hạng các phòng ban đang có lượng Ticket tồn đọng nhiều nhất hoặc tỷ lệ quá hạn cao nhất để kịp thời chỉ đạo.

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

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Hiển thị chính xác danh sách các phòng ban có tỷ lệ tồn đọng nhiều đơn nhất trên toàn trường.

---

## [FR-M12-04] Admin tìm kiếm và tra cứu chi tiết mọi đơn trên toàn trường

**Mô tả:** Admin có đặc quyền tìm kiếm, truy vết tiến độ và xem chi tiết toàn bộ lịch sử luân chuyển của bất kỳ Ticket nào trên phạm vi toàn trường nhằm phục vụ công tác thanh tra và giải quyết khiếu nại.

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

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin nhập đúng Mã Ticket $\rightarrow$ Hiển thị đầy đủ thông tin chi tiết của Ticket dù đơn đó đang nằm ở bất kỳ phòng ban nào.

---
