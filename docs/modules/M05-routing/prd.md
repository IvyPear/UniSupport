# PHÂN HỆ: ĐỊNH TUYẾN VÀ ĐIỀU PHỐI (ROUTING)

## [FR-ROUT-01] Hệ thống định tuyến Ticket tự động
* **Mô tả:** Hệ thống tự động phân bổ Ticket về đúng phòng ban dựa trên danh mục mà Sinh viên đã chọn. Các Ticket thuộc danh mục “Khác” được chuyển về danh sách chờ của Admin.
* **Actor:** Hệ thống.
* **Preconditions:** Sinh viên đã hoàn tất việc tạo và gửi yêu cầu hỗ trợ mới.
* **Main Flow:**
  1. Hệ thống tiếp nhận Ticket vừa được khởi tạo và đọc thông tin tại trường “Danh mục”.
  2. Nếu Ticket thuộc một danh mục đã được thiết lập chuyên trách cho phòng ban cụ thể $\rightarrow$ Hệ thống tự động chuyển Ticket vào danh sách chờ của phòng ban tương ứng.
  3. Nếu danh mục được chọn là “Khác” $\rightarrow$ Hệ thống tự động chuyển Ticket vào danh sách chờ của Quản trị viên (Admin).
* **Business Rules:**
  * **BR-01:** Việc phân bổ Ticket tự động phải dựa hoàn toàn vào danh mục do Sinh viên lựa chọn và chuyển đến đúng phòng ban cấu hình sẵn.
  * **BR-02:** Ticket mang danh mục “Khác” mặc định được định tuyến về danh sách chờ của Admin.
* **Acceptance Criteria (AC):**
  * **AC-01:** Sinh viên chọn danh mục thuộc phòng ban chuyên trách $\rightarrow$ Hệ thống tự động phân bổ Ticket về đúng phòng ban đó.
  * **AC-02:** Sinh viên chọn danh mục là "Khác" $\rightarrow$ Hệ thống tự động chuyển Ticket về cho Admin xử lý.

---

## [FR-ROUT-02] Admin phân phối Ticket (Dispatch)
* **Mô tả:** Admin thực hiện xử lý các đơn kẹt ở danh mục "Khác" bằng cách phân phối sang phòng ban chuyên trách phù hợp.
* **Actor:** Admin.
* **Preconditions:** Đơn đã được chuyển về danh sách chờ của Admin (do thuộc danh mục "Khác") và đang ở trạng thái `New`.
* **Main Flow:**
  1. Admin truy cập vào danh sách đơn đang chờ xử lý của mình.
  2. Admin mở xem nội dung chi tiết của một đơn.
  3. Dựa vào nội dung, Admin chọn tính năng "Phân phối" (`Dispatch`) và chọn phòng ban đích phù hợp (Ví dụ: Đọc thấy lỗi kết nối mạng $\rightarrow$ Chọn phòng IT).
  4. Nhấn "Xác nhận".
  5. Hệ thống gỡ bỏ đơn đó khỏi danh sách của Admin, chuyển giao sang danh sách của phòng ban đích, đồng thời giữ nguyên trạng thái `New`.
* **Business Rules:**
  * **BR-01:** Chỉ duy nhất tài khoản mang vai trò Admin mới nhìn thấy các đơn mục "Khác" và có quyền sử dụng tính năng Phân phối (`Dispatch`). Nhân viên thông thường không có quyền truy cập.
  * **BR-02:** Ngay khi đơn được chuyển sang phòng ban mới, trường Người xử lý (`Assignee`) phải được để trống và trạng thái đơn phải là `New`.
* **Alternative / Error Flows:**
  * Nếu Admin chưa chọn phòng ban đích mà đã bấm "Xác nhận" $\rightarrow$ Hệ thống bôi đỏ, chặn thao tác và yêu cầu bắt buộc phải chọn nơi chuyển đến.
* **Acceptance Criteria (AC):**
  * **AC-01:** Admin thực hiện phân phối Ticket từ mục "Khác" sang phòng ban phù hợp $\rightarrow$ Hệ thống chuyển giao Ticket thành công đến phòng ban đích.
  * **AC-02 (Kiểm tra BR-01 - Quyền hạn):** Đăng nhập bằng tài khoản Nhân viên/Trưởng phòng $\rightarrow$ Không thể tìm thấy các đơn thuộc danh mục "Khác" hay tính năng Dispatch.
  * **AC-03 (Kiểm tra BR-02 - Trạng thái đơn):** Admin vừa phân phối xong đơn cho Phòng IT $\rightarrow$ Kiểm tra danh sách Phòng IT thấy ngay đơn xuất hiện ở trạng thái `New` với `Assignee` đang trống.
  * **AC-04 (Kiểm tra Lỗi bỏ trống):** Admin bấm nút Phân phối nhưng không chọn phòng ban đích $\rightarrow$ Hệ thống bôi đỏ và báo lỗi yêu cầu chọn.

---

## [FR-ROUT-03] Quản lý phân công Ticket (Assign / Re-assign)
* **Mô tả:** Trưởng phòng (Manager) hoặc Admin chủ động phân công hoặc phân công lại Ticket cho các Nhân viên trong hệ thống.
* **Actor:** Quản lý (Manager), Admin.
* **Preconditions:** Quản lý hoặc Admin đã đăng nhập hệ thống và Ticket đang nằm trong danh sách cần xử lý.
* **Main Flow:**
  1. Người dùng chọn chức năng “Phân công” hoặc “Phân công lại” (`Assign`/`Re-assign`) trên một đơn cụ thể.
  2. Hệ thống hiển thị danh sách Nhân viên đang ở trạng thái hoạt động (`Active`).
  3. Người dùng chọn Nhân viên nhận xử lý từ danh sách.
  4. Hệ thống cập nhật tên Nhân viên được chỉ định vào trường `Assignee` và lưu lại thông tin.
* **Business Rules:**
  * **BR-01 (Quyền hạn):** Chỉ tài khoản có vai trò Quản lý và Admin mới có quyền thực hiện chức năng Phân công hoặc Phân công lại.
  * **BR-02 (Giới hạn danh sách nhân viên):**
    * *Nếu là Quản lý thao tác:* Chỉ nhìn thấy nhân viên thuộc đúng phòng ban của mình.
    * *Nếu là Admin thao tác:* Nhìn thấy toàn bộ nhân viên của tất cả các phòng ban trên hệ thống.
  * **BR-03 (Tự động chuyển trạng thái):** Nếu Ticket đang ở trạng thái `New`, sau khi được phân công, hệ thống tự động chuyển trạng thái sang `In Progress`. Nếu Ticket đang ở trạng thái `In Progress` hoặc `Pending`, hệ thống giữ nguyên trạng thái cũ.
* **Acceptance Criteria (AC):**
  * **AC-01:** Quản lý chọn một Nhân viên và thực hiện phân công/phân công lại Ticket $\rightarrow$ Hệ thống cập nhật thành công Nhân viên phụ trách mới.
  * **AC-02 (Kiểm tra BR-01):** Đăng nhập bằng tài khoản Nhân viên thường $\rightarrow$ Giao diện không hiển thị chức năng Phân công/Phân công lại.
  * **AC-03 (Kiểm tra BR-02):** Khi mở danh sách chọn Nhân viên $\rightarrow$ Hệ thống lọc bỏ các nhân viên đã bị khóa tài khoản hoặc thuộc phòng ban khác (đối với Quản lý).
  * **AC-04 (Kiểm tra BR-03):** Khi phân công một Ticket đang ở trạng thái `New` cho Nhân viên A $\rightarrow$ Hệ thống cập nhật `Assignee` là A và tự động chuyển trạng thái Ticket sang `In Progress`.
  * **AC-05 (Kiểm tra luồng Admin):** Đăng nhập bằng Admin, bấm phân công đơn $\rightarrow$ Danh sách chọn hiển thị tất cả nhân viên trên toàn hệ thống để Admin tùy ý lựa chọn.

---

## [FR-ROUT-04] Xử lý Ticket sai phòng ban (Trả về cho Admin)
* **Mô tả:** Khi Nhân viên hoặc Trưởng phòng nhận được một đơn không thuộc chuyên môn của phòng mình, họ không cần mất công tìm kiếm phòng ban tiếp nhận chính xác. Chỉ với một nút bấm, hệ thống sẽ tự động chuyển đơn đó về lại cho Admin điều phối thông qua cơ chế gán ngầm danh mục thành "Khác".
* **Actor:** Nhân viên hỗ trợ, Quản lý phòng ban.
* **Preconditions:** Người dùng đang mở xem một Ticket nằm trong danh sách xử lý của phòng ban mình.
* **Main Flow:**
  1. Người dùng bấm chọn nút "Báo cáo sai phòng ban".
  2. Giao diện hiển thị hộp thoại xác nhận, người dùng bấm "Xác nhận" (Không bắt buộc nhập lý do giải trình).
  3. Hệ thống tự động gỡ bỏ Ticket này khỏi danh sách của phòng ban hiện tại.
  4. Hệ thống chuyển tiếp đơn về danh sách chờ của Admin để chờ điều phối lại.
* **Business Rules:**
  * **BR-01 (Đổi danh mục ngầm):** Mặc dù Nhân viên không có quyền trực tiếp sửa trường "Danh mục", nhưng khi bấm nút "Báo cáo sai phòng ban", hệ thống sẽ ngầm gán danh mục của đơn đó thành "Khác" để nó tự động bay về hàng đợi của Admin.
  * **BR-02 (Làm mới đơn):** Khi trả về cho Admin, đơn phải được hệ thống đưa về trạng thái như mới tinh: Trạng thái quay về `New` và mục Người xử lý (`Assignee`) bị xóa trống.
  * **BR-03 (Lưu lịch sử tự động):** Hệ thống phải tự động ghi lại một dòng log vào lịch sử của đơn.
* **Acceptance Criteria (AC):**
  * **AC-01 (Thao tác Nhân viên):** Nhân viên IT nhận nhầm đơn hỏi về học phí $\rightarrow$ Bấm "Báo cáo sai phòng ban" $\rightarrow$ Xác nhận $\rightarrow$ Đơn lập tức biến mất khỏi danh sách của phòng IT.
  * **AC-02 (Luồng chuyển đến Admin):** Đăng nhập bằng tài khoản Admin kiểm tra danh sách chờ $\rightarrow$ Nhìn thấy đơn vừa bị trả về với danh mục hiển thị là "Khác", trạng thái `New` và chưa có người tiếp nhận.
  * **AC-03 (Kiểm tra lịch sử):** Mở lịch sử của Ticket $\rightarrow$ Thấy dòng thông báo hệ thống tự động ghi lại thao tác báo cáo sai phòng ban.
