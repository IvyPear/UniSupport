# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ YÊU CẦU SINH VIÊN (REQ)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-REQ-01]** | Sinh viên Tạo mới Ticket | Sinh viên | Tạo mới đơn yêu cầu hỗ trợ bằng cách chọn danh mục, điền thông tin và đính kèm file. |
| **[FR-REQ-02]** | Xem Danh sách Ticket Cá nhân | Sinh viên | Xem danh sách các yêu cầu do mình gửi để theo dõi tiến độ và trạng thái xử lý. |
| **[FR-REQ-03]** | Sinh viên Chỉnh sửa Ticket | Sinh viên | Cho phép sửa thông tin đơn khi Ticket chưa có nhân viên tiếp nhận (`New`). |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

```text
 [Chọn Danh mục, Tiêu đề, Nội dung FR-REQ-01] ──► [Đính kèm File < 5MB (Tùy chọn)]
                                                            │
                                                            ▼
                                                [Gửi Yêu cầu & Tạo Ticket (New)]
                                                            │
                                                            ▼
 [Lọc theo Trạng thái (Pending...)] ◄───────── [Xem Danh sách Ticket cá nhân FR-REQ-02]
                                                            │
                                                            ▼
                                               [Mở Chi tiết Ticket Cá nhân]
                                                            │
                                            ┌───────────────┴───────────────┐
                                            ▼                               ▼
                              [Trạng thái New & Chưa Assign]     [Đã In Progress / Đã Assign]
                                            │                               │
                                            ▼                               ▼
                               [Chỉnh sửa Nội dung FR-REQ-03]        [Ẩn nút Chỉnh sửa]
```

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Luồng Khởi tạo Yêu cầu Hỗ trợ
1. **Nhập liệu & Tệp đính kèm:** Sinh viên chọn Danh mục hỗ trợ, nhập Tiêu đề và Nội dung chi tiết. Sinh viên có thể chọn tải file tài liệu/hình ảnh đính kèm (dung lượng tối đa **5MB**).
2. **Khởi tạo trạng thái:** Khi thông tin hợp lệ và nhấn "Gửi yêu cầu", hệ thống tạo đơn và mặc định gán trạng thái là `New`.

### 3.2. Luồng Quản lý & Theo dõi Cá nhân
1. **Bảo mật Cách ly Dữ liệu (Data Isolation):** Sinh viên chỉ có quyền nhìn thấy các Ticket do chính mình tạo ra.
2. **Thứ tự hiển thị & Bộ lọc:** Đơn mới tạo luôn hiển thị ở trên cùng. Hệ thống cung cấp bộ lọc theo trạng thái (`New`, `In Progress`, `Pending`, `Resolved`, `Closed`) để Sinh viên dễ dàng theo dõi.

### 3.3. Cơ chế Khóa quyền Chỉnh sửa
1. **Điều kiện cho phép sửa:** Nút "Chỉnh sửa" chỉ hiển thị khi Ticket đang ở trạng thái `New` và trường `Assignee` đang để trống.
2. **Khóa luồng tự động:** Ngay khi có Nhân viên bấm tiếp nhận hoặc đơn chuyển trạng thái sang `In Progress`, hệ thống tự động ẩn nút "Chỉnh sửa" để bảo toàn dữ liệu gốc trong quá trình xử lý.
