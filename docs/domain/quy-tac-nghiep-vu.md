# Quy Tắc Nghiệp Vụ & Ràng Buộc Hệ Thống (Business Rules)

## 1. Quy tắc Phân quyền (Access Control & Authorization)
Hệ thống tuân thủ nghiêm ngặt nguyên tắc phân quyền theo vai trò (RBAC) và phạm vi dữ liệu nhằm bảo đảm tính riêng tư và an toàn thông tin:
*   **Cấp tài khoản:** Toàn bộ tài khoản của sinh viên và nhân viên do nhà trường cung cấp sẵn. Người dùng chỉ cần sử dụng mã định danh (mã sinh viên / mã cán bộ) được cấp để đăng nhập.
*   **Phạm vi xử lý:** Nhân viên thuộc phòng ban nào chỉ có quyền xem và giải quyết các yêu cầu thuộc phạm vi phòng ban đó (Data Isolation).

## 2. Quy tắc Chỉnh sửa Ticket (Ticket Editing Rules)
Nhằm bảo đảm tính minh bạch và toàn vẹn của dữ liệu trong suốt quá trình xử lý, việc chỉnh sửa ticket tuân thủ các điều kiện sau:
*   **Điều kiện cho phép sinh viên chỉnh sửa:**
    *   Khi ticket đang ở trạng thái `New` (Mới tạo / Chưa được tiếp nhận).
    *   Khi nhân viên phụ trách chuyển sang trạng thái `Pending` và yêu cầu sinh viên bổ sung thông tin.
*   **Khóa thao tác:** Ngay khi ticket chuyển sang trạng thái `In Progress` (Đang xử lý) hoặc đã được nhân viên tiếp nhận, tính năng chỉnh sửa của sinh viên sẽ tự động bị khóa hoàn toàn.

## 3. Quy tắc Trạng thái Pending (Chờ bổ sung)
*   **Giới hạn thời gian phản hồi:** Khi đơn chuyển sang trạng thái `Pending` để chờ sinh viên cung cấp thêm thông tin, sinh viên có thời hạn phản hồi trong vòng **3 ngày** (tương đương 72 giờ). *(Hệ thống kích hoạt đếm ngược SLA).*

## 4. Quy tắc Hoàn thành Yêu cầu (Completion Rules)
*   **Điều kiện đóng đơn:** Ticket chỉ được chuyển sang trạng thái hoàn tất vĩnh viễn (`Closed`) sau khi sinh viên thực hiện chấm điểm đánh giá mức độ hài lòng từ 1 đến 5 sao. *(Kết hợp cơ chế tự động đóng đơn sau 72h nếu sinh viên không đánh giá).*

## 5. Quy tắc Kiểm soát Dữ liệu Đầu vào (Validation Rules)
*   **Bắt buộc có kết quả giải quyết:** Khi nhân viên chuyển đơn sang trạng thái `Resolved` (Đã giải quyết), hệ thống bắt buộc nhân viên phải nhập đầy đủ nội dung vào ô *Resolution Notes* (Kết quả giải quyết) thì mới được phép lưu thay đổi và kích hoạt thông báo gửi cho sinh viên.

## 6. Quy tắc Định tuyến (Routing Rules)
*   **Xử lý ngoại lệ danh mục "Khác":** Các yêu cầu thuộc danh mục "Khác" hoặc các đơn do sinh viên chọn nhầm phòng ban sẽ được hệ thống/nhân viên chuyển tiếp đến Quản trị viên (`Admin`) để thực hiện phân phối lại đúng đơn vị chuyên trách tiếp nhận.