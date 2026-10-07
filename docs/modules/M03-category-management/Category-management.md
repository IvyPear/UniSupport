# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ VÒNG ĐỜI & TRẠNG THÁI TICKET (TKT)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-TKT-01]** | Tự động Cấp Mã ID Ticket | Hệ thống | Sinh mã định danh duy nhất cho đơn theo cấu trúc `[Phòng ban]-[YYYYMMDD]-[STT]`. |
| **[FR-TKT-02]** | Chuyển đổi Trạng thái Ticket | Hệ thống, NV, SV | Quản lý việc chuyển giao nấc trạng thái tuần tự trong vòng đời của đơn. |
| **[FR-TKT-03]** | Đếm ngược Hạn Pending | Hệ thống | Kích hoạt bộ đếm thời hạn 72h khi đơn chuyển sang `Pending` chờ Sinh viên phản hồi. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

```text
 [Sinh viên Gửi Đơn] ──► [Tự động sinh Mã ID: [Phòng]-[YYYYMMDD]-[STT] FR-TKT-01]
                                              │
                                              ▼
                                 [Khởi tạo Trạng thái NEW]
                                              │
                                              ▼
                                 [Nhân viên Tiếp nhận Đơn]
                                              │
                                              ▼
                              [Chuyển trạng thái IN PROGRESS FR-TKT-02]
                                              │
                      ┌───────────────────────┼───────────────────────┐
                      ▼                       ▼                       ▼
            [Yêu cầu Bổ sung]       [Phát hiện Spam / Error]    [Xử lý Hoàn tất]
                      │                       │                       │
                      ▼                       ▼                       │
         [Chuyển PENDING FR-TKT-02]    [Chuyển CLOSED ngầm]           │
                      │                       ▲                       │
                      ▼                       │                       │
         [Kích hoạt Đếm ngược 72h FR-TKT-03]  │                       │
                      │                       │                       │
           ┌──────────┴──────────┐            │                       │
           ▼                     ▼            │                       │
 [SV Phản hồi trước 72h]  [Quá hạn 72h]       │                       │
           │                     │            │                       │
           ▼                     ▼            │                       │
 [Về IN PROGRESS]    [Cảnh báo Quá hạn]       │                       │
                         │                   │                       │
                         ▼                   │                       │
                 [Nhân viên Đóng Đơn]        │                       │
                         │                   │                       │
                         └──────────┬────────┘                       ▼
                                    ▼                      [Chuyển RESOLVED]
                             [Chuyển CLOSED] ◄───────────────────────┘
```

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Quy tắc Sinh mã Định danh Duy nhất (Ticket ID)
1. **Cấu trúc mã chuẩn:** `[Tên phòng ban]-[YYYYMMDD]-[Số thứ tự trong ngày]` (Ví dụ: `IT-20261005-001`).
2. **Cơ chế Reset số thứ tự:** Vào đúng `00:00:00` ngày mới, số thứ tự trong mã đơn được tự động reset và bắt đầu lại từ `001`.
3. **Chống trùng mã:** Khi có đồng thời nhiều yêu cầu được gửi tới hệ thống tại cùng một miligiây, hệ thống cơ chế tuần tự hóa database lock để đảm bảo không bị trùng mã.

### 3.2. Quy tắc Chuyển đổi Trạng thái Vòng đời
1. **Luồng tuần tự tiêu chuẩn:** `New` ➔ `In Progress` ➔ `Pending` ➔ `Resolved` ➔ `Closed`. Tuyệt đối không được chuyển ngược về trạng thái trước đó.
2. **Luồng bỏ qua `Pending`:** Nếu nhân viên xử lý xong ngay mà không cần sinh viên bổ sung tài liệu, đơn chuyển thẳng từ `In Progress` ➔ `Resolved`.
3. **Ngoại lệ Đơn Spam / Không hợp lệ:** Nếu phát hiện đơn rác hoặc vi phạm, Nhân viên chọn "Đơn không hợp lệ", hệ thống chuyển thẳng đơn sang `Closed`, loại bỏ quyền đánh giá sao của Sinh viên.

### 3.3. Cơ chế Bộ Đếm ngược 72 giờ (Pending Deadline)
1. **Kích hoạt đếm ngược:** Khi đơn chuyển sang `Pending`, bộ đếm ngầm 72 giờ (3 ngày) được bật.
2. **Sinh viên phản hồi trước 72h:** Bộ đếm ngắt ngay lập tức, đơn tự động đưa về lại trạng thái `In Progress`.
3. **Quá hạn 72h:** Giao diện Nhân viên hiển thị nhãn "Quá hạn", Nhân viên chủ động thao tác chuyển đơn sang `Resolved` để đóng quy trình xử lý.
