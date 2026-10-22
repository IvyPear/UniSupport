# Quy Tắc Nghiệp Vụ & Ràng Buộc Hệ Thống (Business Rules)

## 1. Quy tắc Phân quyền (Access Control & Authorization)
Hệ thống tuân thủ nghiêm ngặt nguyên tắc phân quyền theo vai trò (RBAC) và phạm vi dữ liệu nhằm bảo đảm tính riêng tư và an toàn thông tin:
*   **Cấp tài khoản:** Toàn bộ tài khoản của sinh viên và nhân viên do nhà trường cung cấp sẵn. Người dùng chỉ cần sử dụng mã định danh (mã sinh viên / mã cán bộ) được cấp để đăng nhập.
*   **Phạm vi xử lý:** Nhân viên thuộc phòng ban nào chỉ có quyền xem và giải quyết các yêu cầu thuộc phạm vi phòng ban đó (Data Isolation).

## 2. Quy tắc Chỉnh sửa Ticket (Ticket Editing Rules)
Nhằm bảo đảm tính minh bạch và toàn vẹn của dữ liệu trong suốt quá trình xử lý, việc chỉnh sửa ticket tuân thủ các điều kiện sau:
*   **Điều kiện cho phép sinh viên chỉnh sửa:**
    *   Khi ticket đang ở trạng thái `New` (Mới tạo / Chưa được tiếp nhận): Sinh viên được chỉnh sửa **Tiêu đề** và **Nội dung chi tiết**. Không được thay đổi Phòng ban và Danh mục đã chọn.
    *   Khi nhân viên phụ trách chuyển sang trạng thái `Pending` và yêu cầu sinh viên bổ sung thông tin: Sinh viên chỉ được bổ sung nội dung và tệp đính kèm mới.
*   **Khóa thao tác:** Ngay khi ticket chuyển sang trạng thái `In Progress` (Đang xử lý) hoặc đã được nhân viên tiếp nhận, tính năng chỉnh sửa của sinh viên sẽ tự động bị khóa hoàn toàn.

## 3. Quy tắc Trạng thái Pending (Chờ bổ sung)
*   **Giới hạn thời gian phản hồi:** Khi đơn chuyển sang trạng thái `Pending` để chờ sinh viên cung cấp thêm thông tin, sinh viên có thời hạn phản hồi trong vòng **3 ngày làm việc** (không tính Thứ 7, Chủ Nhật và ngày Lễ). Quá thời hạn mà sinh viên không bổ sung, hệ thống tự động đóng đơn (`Closed`). *(Nhân viên chỉ được yêu cầu bổ sung tối đa 1 lần cho mỗi Ticket).*

## 4. Quy tắc Hoàn thành Yêu cầu (Completion Rules)
*   **Điều kiện đóng đơn:** Ticket chuyển sang trạng thái hoàn tất vĩnh viễn (`Closed`) khi sinh viên chấm điểm đánh giá mức độ hài lòng từ 1 đến 5 sao, hoặc khi hệ thống tự động đóng sau **3 ngày làm việc** (không tính Thứ 7, Chủ Nhật và ngày Lễ) nếu sinh viên không đánh giá.

## 5. Quy tắc Kiểm soát Dữ liệu Đầu vào (Validation Rules)
*   **Bắt buộc có kết quả giải quyết:** Khi nhân viên chuyển đơn sang trạng thái `Resolved` (Đã giải quyết), hệ thống bắt buộc nhân viên phải nhập đầy đủ nội dung vào ô *Resolution Notes* (Kết quả giải quyết) thì mới được phép lưu thay đổi và kích hoạt thông báo gửi cho sinh viên.

## 6. Quy tắc Định tuyến (Routing Rules)
*   **Xử lý ngoại lệ danh mục "Khác":** Các yêu cầu thuộc danh mục "Khác" hoặc các đơn do sinh viên chọn nhầm phòng ban sẽ được hệ thống/nhân viên chuyển tiếp đến Quản trị viên (`Admin`) để thực hiện phân phối lại đúng đơn vị chuyên trách tiếp nhận.

## 7. Quy tắc Tính toán Thời gian (Time & SLA Calculation Rules)
*   **Quy tắc tính thời gian:** Tất cả các mốc đếm ngược trong hệ thống (SLA xử lý, 3 ngày chờ bổ sung Pending, 3 ngày chờ đánh giá Resolved) được tính theo **ngày làm việc** của nhà trường (Thứ 2 đến Thứ 6, không tính Thứ 7, Chủ Nhật và ngày Lễ Tết) để bảo đảm KPI của Nhân viên không bị đánh giá sai lệch.