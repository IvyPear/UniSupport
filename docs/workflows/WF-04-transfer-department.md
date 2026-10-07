# WF-04: Luồng Luân chuyển & Điều phối Ticket (Routing & Assignment)

## 1. Mô tả
Luồng mô tả quá trình luân chuyển đơn khi bị sai phòng ban, hoặc khi Trưởng phòng/Admin cần can thiệp phân chia lại công việc.

---

## 2. Các bước thực hiện
* **Trường hợp 1 (Điều phối nội bộ - Assign / Re-assign):** Trưởng phòng (hoặc Admin) truy cập danh sách, chủ động phân công hoặc phân công lại một đơn cho nhân viên cụ thể ([FR-ROUT-03]). Hệ thống cập nhật tên người xử lý mới, đổi trạng thái sang `In Progress` và tự động bắn thông báo in-app cho nhân viên vừa được giao việc ([FR-NOTI-01]).
* **Trường hợp 2 (Nhân viên báo cáo sai phòng ban):** Nhân viên đang xử lý thì phát hiện đơn không thuộc chuyên môn $\rightarrow$ Bấm nút "Báo cáo sai phòng ban" ([FR-ROUT-04]). Hệ thống lập tức gán ngầm danh mục thành "Khác", làm trống Người xử lý, đưa trạng thái về `New` và đẩy đơn bay về danh sách chờ của Admin.
* **Trường hợp 3 (Admin phân phối đơn - Dispatch):** Admin vào xử lý các đơn kẹt ở mục "Khác" (bao gồm đơn do sinh viên tự chọn [FR-ROUT-01] và đơn do nhân viên trả về ở Trường hợp 2). Admin thao tác chọn phòng ban đích và thực hiện Phân phối ([FR-ROUT-02]). Hệ thống chuyển đơn sang phòng ban mới kèm lịch sử luân chuyển, sẵn sàng bước vào luồng tiếp nhận (`WF-02`).

---

## 3. Sơ đồ luồng quy trình (Mermaid Diagram)

```mermaid
graph TD
    A{Bên nào thực hiện?}
    
    A -->|Trưởng phòng/Admin| B[Chọn NV & Phân công Re-assign]
    B --> C[Chuyển đơn sang IN PROGRESS]
    C --> D([Bắn thông báo cho NV được giao])
    
    A -->|Nhân viên xử lý| E[Phát hiện sai phòng ban]
    E --> F[Bấm Trả về mục Khác]
    F --> G[Hệ thống làm trống NV, về NEW, chuyển cho Admin]
    
    A -->|Admin (Đơn kẹt mục Khác)| H[Chọn tính năng Phân phối Dispatch]
    H --> I[Ném đơn về đúng phòng ban]
    G --> H
    I --> J([Đơn về DS phòng ban mới ở trạng thái NEW])