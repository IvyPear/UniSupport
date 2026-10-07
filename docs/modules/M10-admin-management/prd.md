# SƠ ĐỒ LUỒNG QUY TRÌNH - PHÂN HỆ QUẢN TRỊ HỆ THỐNG & DANH MỤC (ADM)

```text
                 [Truy cập Phân hệ Quản trị (Admin / Manager)]
                                       │
              ┌────────────────────────┴────────────────────────┐
              ▼                                                 ▼
 [Quản lý Danh mục FR-ADM-01]                      [Quản lý Tài khoản FR-ADM-02]
              │                                                 │
              ├──────────────────────────┐                      ▼
              ▼                          ▼             [Tìm kiếm Mã NV / Email]
   [Thêm / Chỉnh sửa Danh mục]       [Ẩn / Xóa Danh mục]        │
              │                          │                      ▼
              │                ┌─────────┴─────────┐   [Gán Vai trò: SV/NV/Manager/Admin]
              │                ▼                   ▼            │
              │          [Đã có Ticket]     [Chưa có Ticket]    ▼
              │                │                   │   [Gán Phòng ban & Trạng thái Active/Inactive]
              │                ▼                   ▼            │
              │          [Chỉ cho phép Ẩn]   [Cho Xóa Vĩnh viễn]│
              │                │                   │            │
              └────────────────┴─────────┬─────────┘            │
                                         ▼                      ▼
                            [Cập nhật Cơ sở Dữ liệu & Áp dụng Quyền hạn]
```
