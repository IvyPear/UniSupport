# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ ĐỊNH TUYẾN VÀ ĐIỀU PHỐI (ROUTING)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-ROUT-01]** | Định tuyến Ticket Tự động | Hệ thống | Phân bổ đơn về đúng phòng ban chuyên trách dựa vào danh mục được chọn. |
| **[FR-ROUT-02]** | Admin Phân phối Ticket (Dispatch) | Admin | Điều phối các đơn thuộc danh mục "Khác" về đúng phòng ban chuyên môn. |
| **[FR-ROUT-03]** | Quản lý Phân công Ticket (Assign) | Quản lý, Admin | Chỉ định hoặc phân công lại nhân viên phụ trách xử lý Ticket. |
| **[FR-ROUT-04]** | Xử lý Ticket Sai phòng ban | Nhân viên, Quản lý | Bấm nút báo sai phòng ban để hệ thống tự động trả đơn về cho Admin. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

```text
 [Sinh viên Tạo Ticket mới] ──► [Định tuyến Tự động FR-ROUT-01]
                                          │
                     ┌────────────────────┴────────────────────┐
                     ▼                                         ▼
         [Danh mục Chuyên trách]                        [Danh mục "Khác"]
                     │                                         │
                     ▼                                         ▼
         [Về Hàng đợi Phòng ban]                      [Về Hàng đợi Admin]
                     │                                         │
                     │                                         ▼
                     │                        [Admin Dispatch sang Phòng mới FR-ROUT-02]
                     │                                         │
                     └────────────────────┬────────────────────┘
                                          ▼
                         [Về Danh sách Chờ của Phòng ban]
                                          │
                     ┌────────────────────┴────────────────────┐
                     ▼                                         ▼
       [NV Tự Tiếp nhận FR-STF-02]               [Quản lý/Admin Assign/Re-assign FR-ROUT-03]
                     │                                         │
                     └────────────────────┬────────────────────┘
                                          ▼
                             [Nhân viên Tiến hành Xử lý]
                                          │
                                          ▼
                        [Báo cáo Sai phòng ban FR-ROUT-04]
                                          │
                                          ▼
                      [Đổi Danh mục ngầm ──► "Khác", Reset NEW] ──► (Quay lại Hàng đợi Admin)
```

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Cơ chế Định tuyến Tự động & Hàng đợi Admin (Dispatch)
1. **Phân loại danh mục:** Đơn có danh mục rõ ràng (Học phí, Đăng ký môn...) lập tức về hàng đợi phòng ban tương ứng. Đơn có danh mục "Khác" về hàng đợi của Admin.
2. **Quyền Dispatch của Admin:** Admin đọc chi tiết nội dung đơn "Khác", bấm `Dispatch` và chọn phòng ban đích. Khi điều phối xong, đơn về phòng mới với trạng thái `New` và `Assignee` xóa trống.

### 3.2. Cơ chế Phân công Công việc (Assign / Re-assign)
1. **Phân cấp danh sách nhân viên:**
   - **Trưởng phòng:** Chỉ nhìn thấy và giao việc cho Nhân viên thuộc phòng ban mình.
   - **Admin:** Nhìn thấy tất cả nhân viên thuộc tất cả phòng ban để giao việc.
2. **Tự động chuyển trạng thái:** Nếu đơn đang ở trạng thái `New`, sau khi phân công cho nhân viên, hệ thống tự động đưa đơn sang trạng thái `In Progress`.

### 3.3. Cơ chế Trả đơn do Sai phòng ban
1. **Quy trình nút bấm đơn giản:** Khi Nhân viên/Trưởng phòng mở nhầm đơn không thuộc chuyên môn -> Bấm nút "Báo cáo sai phòng ban" và xác nhận.
2. **Xử lý ngầm:** Hệ thống tự động ngầm gán danh mục thành "Khác", xóa tên `Assignee`, chuyển đơn về `New` và đẩy đơn quay lại danh sách chờ của Admin để điều phối lại.
