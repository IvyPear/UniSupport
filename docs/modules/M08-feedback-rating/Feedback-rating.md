# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ ĐÁNH GIÁ & ĐÓNG ĐƠN TỰ ĐỘNG (FB)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-FB-01]** | Sinh viên Gửi Đánh giá Chất lượng | Sinh viên | Chấm điểm sao (1-5) và nhận xét chất lượng hỗ trợ cho Ticket đã `Resolved`. |
| **[FR-FB-02]** | Tự động Đóng Ticket quá hạn (Auto-Close) | Hệ thống | Tự động chốt đóng đơn sau 72h nếu Sinh viên không vào thực hiện đánh giá. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

```text
 [Ticket chuyển sang Trạng thái RESOLVED]
                    │
                    ▼
   [Kích hoạt Đồng hồ Đếm ngược Ngầm 72h FR-FB-02]
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 [Sinh viên Đánh giá]   [Hết 72h Không Đánh giá]
        │                       │
        ▼                       │
 [Chọn 1-5 Sao FR-FB-01]        │
 [Nhập Nhận xét (Tùy chọn)]     │
        │                       │
        └───────────┬───────────┘
                    ▼
   [Tự động Chuyển Trạng thái CLOSED]
                    │
                    ▼
   [Khóa Cứng Toàn bộ Thao tác Chỉnh sửa / Phản hồi / Đánh giá]
```

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Quy trình Đánh giá & Chuyển Trạng thái Đóng
1. **Hiển thị Form Đánh giá:** Khi Ticket chuyển sang `Resolved`, màn hình chi tiết Ticket của Sinh viên mở giao diện chấm sao.
2. **Quy tắc bắt buộc:** Điểm sao (1 đến 5 sao) là trường bắt buộc. Ô nhận xét văn bản là tùy chọn.
3. **Đóng đơn tự động:** Ngay khi Sinh viên bấm "Gửi đánh giá", hệ thống lưu kết quả và chuyển đơn sang trạng thái `Closed`.

### 3.2. Quy trình Auto-Close Quá hạn 72 giờ
1. **Đếm ngược 72h:** Khi đơn chuyển sang `Resolved`, hệ thống kích hoạt đồng hồ đếm ngược ngầm 72 giờ.
2. **Quá hạn:** Nếu hết đúng 72 giờ mà Sinh viên không thực hiện đánh giá, máy tự động chốt chuyển trạng thái đơn sang `Closed`.

### 3.3. Ràng buộc Trạng thái Kết thúc (`Closed State Constraint`)
1. **Khóa cứng dữ liệu:** `Closed` là trạng thái kết thúc vĩnh viễn. Mọi Ticket đã ở trạng thái `Closed` đều bị khóa cứng toàn bộ các thao tác chỉnh sửa, phản hồi hay đánh giá lại.
