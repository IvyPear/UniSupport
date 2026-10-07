# WF-08: Luồng Trưởng phòng điều phối và Xem báo cáo (Manager Dashboard & Assignment)

## 1. Mô tả
Luồng dành riêng cho Quản lý (Trưởng phòng) theo dõi hiệu suất làm việc của nhân sự trong phòng và chủ động can thiệp điều phối khi có đơn ứ đọng.

---

## 2. Các bước thực hiện
1. **Theo dõi báo cáo:** Trưởng phòng truy cập vào menu Báo cáo (`Department Dashboard`) để xem biểu đồ trực quan và bảng xếp hạng hiệu suất của các nhân viên thuộc nội bộ phòng ban mình phụ trách ([FR-REP-02]).
2. **Phát hiện điểm nghẽn:** Khi phát hiện có nhân sự đang xử lý quá nhiều việc hoặc có các đơn đang kẹt ở trạng thái `New` quá lâu, Trưởng phòng chủ động chuyển hướng sang danh sách quản lý Ticket của phòng ban.
3. **Thao tác phân công lại:** Trưởng phòng chọn tính năng "Phân công lại" (`Re-assign`), sau đó chọn đích danh một nhân sự khác trong phòng đang rảnh rỗi hoặc phù hợp hơn để tiếp nhận đơn ([FR-ROUT-03]).
4. **Cập nhật hệ thống & Thông báo:** Hệ thống tự động cập nhật tên Người xử lý (`Assignee`), chuyển trạng thái đơn sang `In Progress` và lập tức bắn thông báo in-app (quả chuông đỏ) cho nhân viên mới được phân công nhận việc ([FR-NOTI-01]).

---

## 3. Sơ đồ luồng quy trình (Mermaid Diagram)

```mermaid
graph TD
    A([Trưởng phòng đăng nhập]) --> B[Vào Department Dashboard]
    B --> C[Xem hiệu suất nhân sự phòng ban]
    C --> D{Phát hiện đơn kẹt/ứ đọng?}
    D -->|Có| E[Chuyển sang DS chờ xử lý]
    E --> F[Chọn tính năng Phân công lại - Re-assign]
    F --> G[Hệ thống gắn tên NV mới & Chuyển IN PROGRESS]
    G --> H([Bắn chuông cho NV mới nhận việc])