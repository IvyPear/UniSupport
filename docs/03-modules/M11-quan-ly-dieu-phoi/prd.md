# PHÂN HỆ: M11 — ĐIỀU PHỐI (ROUTING & DISPATCH)

## [FR-M11-01] Admin phân loại và chuyển các đơn mục 'Khác' về đúng phòng ban

**Mô tả:** Admin mở Hàng chờ các Ticket thuộc danh mục "Khác" do Sinh viên gửi, đọc nội dung yêu cầu và thực hiện phân loại, định tuyến đơn về đúng phòng ban chuyên trách.

**Priority:** High (Nghiệp vụ định tuyến đơn ngoại lệ danh mục "Khác" về đúng phòng ban).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Ticket thuộc danh mục "Khác" và đang ở trạng thái `Chưa tiếp nhận` (`New`).

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Phòng ban tiếp nhận mới:** Bắt buộc, chọn Phòng ban chuyên trách phù hợp từ danh sách.
- **Danh mục thủ tục mới:** Bắt buộc, gán Danh mục chuẩn thuộc phòng ban đó.
- **Trạng thái sau thao tác:** `Chưa tiếp nhận` (`New`).

**Luồng chính (Main Flow):**

1. Admin truy cập màn hình “Hàng chờ đơn Khác / Định tuyến”.
2. Hệ thống tải danh sách các Ticket do sinh viên chọn mục "Khác".
3. Admin nhấp vào một Ticket để đọc nội dung và xem tài liệu đính kèm.
4. Admin chọn Phòng ban đích và chọn Danh mục dịch vụ chuẩn tương ứng.
5. Nhấn “Xác nhận phân loại”.
6. Hệ thống cập nhật Phòng ban và Danh mục mới cho Ticket.
7. Đưa đơn vào Hàng chờ tiếp nhận của phòng ban đó ở trạng thái `Chưa tiếp nhận` (`New`).
8. Ghi log lịch sử định tuyến vào Audit Trail của đơn.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Sau khi Admin phân loại, đơn sẽ xuất hiện ngay trong Hàng chờ đơn mới của phòng ban tiếp nhận để nhân viên hoặc quản lý phòng ban vào xử lý.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Bỏ trống Phòng ban đích hoặc Danh mục mới):** Admin nhấn xác nhận phân loại khi chưa chọn đủ Phòng ban đích và Danh mục chuẩn $\rightarrow$ Hệ thống chặn lưu và báo lỗi `422 Unprocessable Entity`.
* **E-02 (Danh mục không thuộc Phòng ban đích):** Gửi cặp `department_id` và `category_id` không khớp nhau $\rightarrow$ Backend từ chối với mã `400 Bad Request`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin chọn đủ Phòng ban đích và Danh mục hợp lệ $\rightarrow$ Ticket chuyển sang Hàng chờ của đúng phòng ban đích ở trạng thái Chưa tiếp nhận (`New`) và ghi log lịch sử (`BR-01`); nếu bỏ trống trường bắt buộc (`E-01`) trả về `422 Unprocessable Entity`, nếu danh mục không thuộc phòng ban đích (`E-02`) trả về `400 Bad Request`.

**Ví dụ Edge Case (Trường hợp biên):**

* Đơn chọn mục "Khác" có mã `OTHER-20261022-0005` được Admin phân loại về Phòng Đào tạo (danh mục `DT`) $\rightarrow$ Phòng ban và danh mục được cập nhật về Phòng Đào tạo nhưng mã Ticket `OTHER-20261022-0005` giữ nguyên không đổi.

---

## [FR-M11-02] Admin chuyển lại các đơn bị báo sai phòng ban về đúng nơi

**Mô tả:** Admin tiếp nhận các Ticket do Nhân viên báo cáo sai phòng ban chuyển về (`M07-04`), xem xét lý do chuyển trả và điều chuyển đơn sang phòng ban chuyên trách mới.

**Priority:** High (Nghiệp vụ xử lý đơn báo sai phòng ban, khép kín quy trình luân chuyển đơn).

**Actor:** Quản trị viên (Admin)

**Preconditions (Điều kiện tiên quyết):** Ticket được chuyển về từ chức năng báo sai phòng ban M07-04.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Lý do chuyển trả từ nhân viên cũ:** Chỉ đọc.
- **Phòng ban cũ:** Chỉ đọc.
- **Phòng ban chuyên trách mới:** Bắt buộc.
- **Danh mục dịch vụ mới:** Bắt buộc.
- **Nhân viên phụ trách:** `null` (xóa nhân viên cũ).

**Luồng chính (Main Flow):**

1. Admin mở danh sách “Đơn sai phòng ban chờ điều chuyển”.
2. Xem lý do chuyển trả từ Nhân viên phòng ban cũ và đọc nội dung yêu cầu của sinh viên.
3. Admin chọn Phòng ban mới phù hợp hơn và chọn Danh mục dịch vụ mới.
4. Nhấn “Điều chuyển”.
5. Hệ thống xóa người phụ trách cũ , cập nhật Phòng ban mới, giữ nguyên lịch sử cũ và đẩy đơn về Hàng chờ của phòng ban mới ở trạng thái `Chưa tiếp nhận` (`New`).
6. Ghi nhận log luân chuyển vào lịch sử Ticket.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01 (Nghiệm thu đồng bộ MS-02):** Tính năng cốt lõi này được nghiệm thu cùng `FR-M07-04` trong MS-02 để đảm bảo quy trình luân chuyển đơn không bị đứt gãy.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Chưa chọn Phòng ban mới hoặc Danh mục mới):** Admin bấm "Điều chuyển" khi chưa chọn Phòng ban mới hoặc Danh mục dịch vụ tương ứng $\rightarrow$ Hệ thống báo lỗi validation `422 Unprocessable Entity`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin chọn Phòng ban và Danh mục mới hợp lệ $\rightarrow$ Đơn chuyển về Hàng chờ của phòng ban mới ở trạng thái `New` (`assignee_id = null`) và lưu đầy đủ lịch sử lý do luân chuyển; báo lỗi nếu bỏ trống phòng ban/danh mục đích (`BR-01`, `E-01`).

**Ví dụ Edge Case (Trường hợp biên):**

* Một Ticket bị chuyển nhầm qua 2 phòng ban liên tiếp trước khi được Admin điều chuyển về đúng phòng ban thứ 3 $\rightarrow$ Toàn bộ lý do chuyển trả của các lần trước đều được giữ nguyên theo thứ tự thời gian trong Audit Trail.

---

## [FR-M11-03] Trưởng phòng phân công người xử lý đơn trong nội bộ phòng ban

**Mô tả:** Trưởng phòng (Quản lý) chủ động gán đơn mới hoặc phân công lại (Re-assign) Ticket cho các Nhân viên thuộc nội bộ phòng ban của mình.

**Priority:** Medium (Cho phép trưởng phòng chủ động điều phối và cân bằng tải công việc giữa các nhân viên).

**Actor:** Quản lý phòng ban (Trưởng phòng)

**Preconditions (Điều kiện tiên quyết):** Tài khoản vai trò Quản lý; Ticket thuộc phòng ban mình quản lý và đang ở `New` (phân công mới) hoặc `In Progress` (phân công lại). Không phân công lại Ticket ở `Pending`, `Resolved`, `Closed`.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nhân viên được phân công:** Bắt buộc, ID nhân viên thuộc phòng ban.
- **Trạng thái sau thao tác:** `Đang xử lý` (`In Progress`).

**Luồng chính (Main Flow):**

1. Trưởng phòng mở danh sách Ticket của phòng ban.
2. Chọn Ticket cần điều phối $\rightarrow$ Nhấp nút “Phân công”.
3. Hệ thống hiển thị danh sách nhân sự của phòng ban kèm số lượng đơn mỗi người đang phụ trách.
4. Trưởng phòng chọn một Nhân viên và nhấn Xác nhận.
5. Hệ thống gán ID Nhân viên làm người phụ trách (Assignee). Nếu Ticket ở `New`, chuyển trạng thái sang `In Progress`; nếu đang `In Progress`, giữ trạng thái và chỉ thay đổi người phụ trách.
6. Đưa đơn vào danh sách công việc cá nhân của Nhân viên được gán.
7. Ghi log phân công vào lịch sử Ticket.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Trưởng phòng chỉ được phân công đơn cho các Nhân viên thuộc nội bộ phòng ban của mình.
* **BR-02:** Mỗi Ticket chỉ có một người phụ trách hiện tại; thao tác phân công lại được ghi vào lịch sử, giữ nguyên mã Ticket và phát thông báo tới nhân viên mới.

**Alternative / Error Flows (Luồng rẽ nhánh / Xử lý lỗi):**

* **E-01 (Phân công cho nhân viên ngoài phòng ban):** Trưởng phòng chọn hoặc gửi ID nhân viên không thuộc phòng ban của mình $\rightarrow$ Backend từ chối với mã `403 Forbidden` / `422 Unprocessable Entity` (`BR-01`).
* **E-02 (Phân công khi trạng thái Ticket không hợp lệ):** Gọi thao tác phân công trên đơn đang ở `Pending`, `Resolved` hoặc `Closed` $\rightarrow$ Hệ thống chặn với mã `400 Bad Request`.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Trưởng phòng phân công/Re-assign cho nhân viên trong phòng ban thành công $\rightarrow$ Ticket được gán cho nhân viên mới, ở trạng thái `In Progress`, ghi log lịch sử và phát thông báo In-app cho nhân viên mới (`BR-02`); nếu chọn nhân viên ngoài phòng ban (`BR-01`, `E-01`) trả về `403 Forbidden`, nếu đơn đang ở `Pending`/`Resolved`/`Closed` (`E-02`) trả về `400 Bad Request`.

**Ví dụ Edge Case (Trường hợp biên):**

* Trưởng phòng đang mở hộp thoại phân công một đơn `New` cho Nhân viên A thì Nhân viên B trong phòng vừa bấm `Claim` nhận đơn đó trước $\rightarrow$ Khi Trưởng phòng xác nhận, hệ thống cập nhật người phụ trách theo quyết định điều phối của Trưởng phòng (hoặc báo `409 Conflict` để làm mới) và lưu đầy đủ vết vào Audit Trail.

---
