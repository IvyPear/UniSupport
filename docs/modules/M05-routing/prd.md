# SƠ ĐỒ LUỒNG QUY TRÌNH - PHÂN HỆ ĐỊNH TUYẾN VÀ ĐIỀU PHỐI (ROUTING)

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
