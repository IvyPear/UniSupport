# WF-02: Luồng Nhân viên Tiếp nhận và Xử lý Chuẩn (Claim & Process)

## 1. Mô tả
Luồng đi thẳng (Happy Path) từ lúc nhân viên bắt đầu nhận việc cho đến khi xử lý thành công một yêu cầu hỗ trợ mà không gặp trở ngại hoặc phát sinh ngoại lệ nào.

---

## 2. Các bước thực hiện
1. **Truy cập danh sách:** Nhân viên truy cập vào danh sách ticket chờ xử lý thuộc đúng phòng ban mình phụ trách ([FR-STF-01]).
2. **Thao tác nhận việc (Claim):** Nhân viên mở một đơn đang ở trạng thái `New` và tiến hành bấm nút nhận việc ([FR-STF-02]).
3. **Cập nhật vòng đời:** Hệ thống gán tên nhân viên vào ticket và tự động chuyển đổi trạng thái đơn sang `In Progress` ([FR-TKT-02]).
4. **Xử lý nghiệp vụ:** Nhân viên tiến hành giải quyết yêu cầu. Trong quá trình xử lý, nhân viên có thể gửi phản hồi giải đáp ([FR-COM-01]) và đính kèm hình ảnh/tài liệu hướng dẫn ([FR-COM-03]) cho sinh viên. *(Lưu ý: Nếu cần sinh viên cung cấp thêm thông tin, quy trình sẽ rẽ nhánh sang `WF-03`).*
5. **Hoàn thành đơn:** Sau khi xử lý xong, nhân viên cập nhật trạng thái đơn thành `Resolved`, đồng thời **bắt buộc nhập nội dung** vào trường Ghi chú giải pháp (`Resolution Notes`) ([FR-STF-03]).
6. **Ghi nhận & Thông báo:** Hệ thống ghi nhận trạng thái `Resolved` ([FR-TKT-02]) và tự động bắn cảnh báo (in-app notification) cho sinh viên biết đơn yêu cầu đã được giải quyết xong ([FR-NOTI-01]).

---

## 3. Sơ đồ luồng quy trình (Mermaid Diagram)

```mermaid
graph TD
    A([Nhân viên mở DS phòng ban]) --> B[Chọn đơn trạng thái NEW]
    B --> C[Bấm Tiếp nhận / Claim]
    C --> D[Hệ thống gán tên NV & Chuyển IN PROGRESS]
    D --> E[NV xử lý nghiệp vụ, gửi phản hồi/đính kèm file]
    E --> F[NV cập nhật trạng thái RESOLVED]
    F --> G[Bắt buộc nhập Ghi chú giải pháp]
    G --> H([Bắn thông báo In-app cho Sinh viên])