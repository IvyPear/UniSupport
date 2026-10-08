# Quy Định Luồng Trạng Thái Ticket

## 1. Danh sách và Định nghĩa các Trạng thái
Vòng đời của một Ticket bao gồm các trạng thái tiêu chuẩn sau:
*   **New (Mới tạo):** Sinh viên vừa gửi yêu cầu thành công. Ticket đang nằm trong danh sách chờ nhân viên nhận yêu cầu (hoặc chờ Admin phân loại nếu chọn mục "Khác").
*   **In Progress (Đang xử lý):** Nhân viên đã nhận và đang tiến hành giải quyết yêu cầu.
*   **Pending (Chờ bổ sung):** Tạm dừng xử lý vì nhân viên cần sinh viên bổ sung thêm thông tin hoặc tệp đính kèm.
*   **Resolved (Đã giải quyết):** Nhân viên đã xử lý xong và gửi kết quả phản hồi cho sinh viên.
*   **Closed (Đã đóng):** Sinh viên đã chấm điểm hài lòng (1–5 sao). Ticket đóng vĩnh viễn, không cho phép mở lại.

---

## 2. Ma trận Chuyển đổi Trạng thái

| Từ trạng thái | Sang trạng thái | Người thực hiện | Điều kiện chuyển đổi |
| :--- | :--- | :--- | :--- |
| **New** | **In Progress** | Nhân viên / Quản lý | Nhân viên tự nhận việc (Claim) hoặc quản lý phân công. |
| **In Progress** | **Pending** | Nhân viên | Nhân viên yêu cầu sinh viên bổ sung thông tin/tệp minh chứng. |
| **Pending** | **In Progress** | Sinh viên | Sinh viên gửi lại thông tin bổ sung theo yêu cầu. |
| **In Progress** | **Resolved** | Nhân viên | Nhân viên gửi kết quả xử lý hoàn tất (kèm Resolution Notes). |
| **Resolved** | **Closed** | Sinh viên | Sinh viên chấm điểm hài lòng (1–5 sao). **Đóng vĩnh viễn, không mở lại.** |

---

## 3. Các quy tắc tự động hóa (Automation Rules)
Hệ thống tập trung tự động hóa các tác vụ thông báo và định tuyến, đảm bảo tuân thủ tuyệt đối các quy tắc cốt lõi:
*   **Tự động gửi thông báo:** Hệ thống tự động gửi thông báo (In-app/Email) cho sinh viên hoặc nhân viên ngay khi có thay đổi trạng thái (ví dụ: nhân viên vừa nhận việc, hoặc đã có kết quả giải quyết).
*   **Tự động định tuyến mục "Khác":** Khi sinh viên chọn danh mục "Khác", hệ thống tự động chuyển yêu cầu về hộp thư của Admin để phân phối đúng người phụ trách.

---

## 4. Ràng buộc kỹ thuật & Kiểm soát dữ liệu
*   **Đã đóng là khóa vĩnh viễn (No Reopen):** Khi ticket chuyển sang trạng thái `Closed`, mọi dữ liệu sẽ bị khóa cứng trên cơ sở dữ liệu. Hệ thống tuyệt đối không cho phép mở lại dưới mọi hình thức.
*   **Bắt buộc có kết quả khi hoàn thành:** Khi nhân viên chuyển ticket sang trạng thái `Resolved`, hệ thống bắt buộc kiểm tra ô *Kết quả giải quyết (Resolution Notes)*; nếu trống, hệ thống chặn không cho phép lưu thay đổi trạng thái.
*   **Trạng thái chờ đơn giản:** Trạng thái `Pending` (Chờ bổ sung) chỉ phục vụ mục đích chờ sinh viên cung cấp thêm thông tin, không áp dụng các quy trình rườm rà như duyệt nội bộ hay chuyển giao bên thứ ba.