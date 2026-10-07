# SƠ ĐỒ LUỒNG QUY TRÌNH - PHÂN HỆ ĐÁNH GIÁ & ĐÓNG ĐƠN TỰ ĐỘNG (FB)

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
