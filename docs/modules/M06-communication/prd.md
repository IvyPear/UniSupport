# SƠ ĐỒ LUỒNG QUY TRÌNH - PHÂN HỆ TRAO ĐỔI THÔNG TIN & TỆP ĐÍNH KÈM (COM)

```text
 [Nhân viên Soạn Phản hồi FR-COM-01]           [Sinh viên Bổ sung Thông tin FR-COM-02]
                 │                                              │
                 └──────────────────────┬───────────────────────┘
                                        ▼
                   [Đính kèm Tệp: JPG/PNG/PDF/DOCX < 5MB FR-COM-03]
                                        │
                                        ▼
                          [Kiểm tra Nội dung & File]
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
        [Trống Nội dung / File > 5MB]               [Hợp lệ: Gửi Phản hồi]
                    │                                       │
                    ▼                                       ▼
           [Báo Lỗi Chặn Gửi]                   [Cập nhật Dòng Thời gian Ticket]
                                                            │
                                            ┌───────────────┴───────────────┐
                                            ▼                               ▼
                              [Nếu Đơn đang ở PENDING]             [Nếu Đơn đang ở IN PROGRESS]
                                            │                               │
                                            ▼                               ▼
                              [Tự động về IN PROGRESS]               [Giữ nguyên IN PROGRESS]
                              [Tắt Đếm ngược 72h ngầm]
```
