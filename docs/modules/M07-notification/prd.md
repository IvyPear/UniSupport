# SƠ ĐỒ LUỒNG QUY TRÌNH - PHÂN HỆ THÔNG BÁO HỆ THỐNG (NOTI)

```text
 [Phát sinh Sự kiện Ticket (Đổi trạng thái, Assign, Transfer, Tạo đơn "Khác")]
                                       │
                                       ▼
                       [Xác định Đối tượng Nhận Thông báo]
                                       │
                                       ▼
                 [Tạo Bản tin & Đẩy Thông báo In-App FR-NOTI-01]
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
        [Kết nối Mạng Bình thường]               [Mất kết nối Mạng]
                    │                                     │
                    ▼                                     ▼
        [Hiển thị Chấm đỏ Quả chuông]            [Đưa vào Hàng đợi Retry]
                    │                                     │
                    ▼                                     └──────► (Phát lại khi Online)
         [Người dùng Click Thông báo]
                    │
                    ▼
     [Chuyển hướng Trực tiếp đến Chi tiết Ticket]
```
