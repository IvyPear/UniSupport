# PHÂN HỆ: M11 — ĐIỀU PHỐI (ROUTING & DISPATCH)

## [FR-M11-01] Admin phân loại và chuyển các đơn mục 'Khác' về đúng phòng ban

**Mô tả:** Admin mở Hàng chờ các Ticket thuộc danh mục "Khác" do Sinh viên gửi, đọc nội dung yêu cầu và thực hiện phân loại, định tuyến đơn về đúng phòng ban chuyên trách.

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

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin phân loại $\rightarrow$ Ticket chuyển sang Hàng chờ của đúng phòng ban đích ở trạng thái Chưa tiếp nhận.

---

## [FR-M11-02] Admin chuyển lại các đơn bị báo sai phòng ban về đúng nơi

**Mô tả:** Admin tiếp nhận các Ticket do Nhân viên báo cáo sai phòng ban chuyển về (`M07-04`), xem xét lý do chuyển trả và điều chuyển đơn sang phòng ban chuyên trách mới.

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

* **BR-01 (Bóc tách Giai đoạn 1 MVP):** Tính năng cốt lõi này được nghiệm thu đồng bộ cùng M07 ở Giai đoạn 1 để đảm bảo quy trình luân chuyển đơn không bị đứt gãy.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Admin điều chuyển thành công $\rightarrow$ Đơn chuyển về phòng ban mới và lưu đầy đủ lịch sử lý do luân chuyển.

---

## [FR-M11-03] Trưởng phòng phân công người xử lý đơn trong nội bộ phòng ban

**Mô tả:** Trưởng phòng (Quản lý) chủ động gán đơn mới hoặc phân công lại (Re-assign) Ticket cho các Nhân viên thuộc nội bộ phòng ban của mình.

**Actor:** Quản lý phòng ban (Trưởng phòng)

**Preconditions (Điều kiện tiên quyết):** Tài khoản vai trò Quản lý; Ticket thuộc phạm vi phòng ban mình quản lý.

**Dữ liệu đầu vào / Thông tin sử dụng (Data Fields):**

- **Mã Ticket:** Bắt buộc.
- **Nhân viên được phân công:** Bắt buộc, ID nhân viên thuộc phòng ban.
- **Trạng thái sau thao tác:** `Đang xử lý` (`In Progress`).

**Luồng chính (Main Flow):**

1. Trưởng phòng mở danh sách Ticket của phòng ban.
2. Chọn Ticket cần điều phối $\rightarrow$ Nhấp nút “Phân công”.
3. Hệ thống hiển thị danh sách nhân sự của phòng ban kèm số lượng đơn mỗi người đang phụ trách.
4. Trưởng phòng chọn một Nhân viên và nhấn Xác nhận.
5. Hệ thống gán ID Nhân viên làm người phụ trách (Assignee), chuyển trạng thái đơn sang `Đang xử lý` (nếu là đơn mới).
6. Đưa đơn vào danh sách công việc cá nhân của Nhân viên được gán.
7. Ghi log phân công vào lịch sử Ticket.

**Business Rules (Quy tắc nghiệp vụ):**

* **BR-01:** Trưởng phòng chỉ được phân công đơn cho các Nhân viên thuộc nội bộ phòng ban của mình.

**Acceptance Criteria (Tiêu chí nghiệm thu - AC):**

* **AC-01:** Phân công thành công $\rightarrow$ Ticket được gán cho nhân viên mới và chuyển sang trạng thái Đang xử lý.

---
