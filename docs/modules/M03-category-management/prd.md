# SƠ ĐỒ LUỒNG QUY TRÌNH - PHÂN HỆ VÒNG ĐỜI & TRẠNG THÁI TICKET (TKT)

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
