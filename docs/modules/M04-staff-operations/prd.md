# SƠ ĐỒ LUỒNG QUY TRÌNH - PHÂN HỆ NHÂN VIÊN HỖ TRỢ (STAFF)

```text
 [Truy cập Danh sách Ticket Phòng ban FR-STF-01] ──► [Lọc đơn NEW chưa có Người xử lý]
                                                               │
                                                               ▼
                                                  [Chọn Đơn & Xem Chi tiết]
                                                               │
                                                               ▼
                                                 [Bấm Tiếp nhận Ticket FR-STF-02]
                                                               │
                                            ┌──────────────────┴──────────────────┐
                                            ▼                                     ▼
                              [NV khác đã nhận: Báo Lỗi]              [Gán Assignee cho NV]
                                                                                  │
                                                                                  ▼
                                                                     [Chuyển sang IN PROGRESS]
                                                                                  │
                                                                                  ▼
                                                                     [Xử lý Yêu cầu Sinh viên]
                                                                                  │
                                                                                  ▼
                                                                 [Nhập Resolution Notes FR-STF-03]
                                                                                  │
                                                              ┌───────────────────┴───────────────────┐
                                                              ▼                                       ▼
                                                   [Chuyển sang PENDING]                   [Chuyển sang RESOLVED]
```
