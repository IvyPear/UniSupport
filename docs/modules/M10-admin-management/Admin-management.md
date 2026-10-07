# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ QUẢN TRỊ HỆ THỐNG & DANH MỤC (ADM)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-ADM-01]** | Quản trị Danh mục Hỗ trợ | Admin, Manager | Thêm mới, Chỉnh sửa, Ẩn hoặc Xóa các danh mục hỗ trợ hành chính. |
| **[FR-ADM-02]** | Quản lý Tài khoản & Phân quyền | Admin | Gắn Vai trò, Phòng ban trực thuộc và Quản lý trạng thái Active/Inactive. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

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

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Phân cấp Quản trị Danh mục & Bảo toàn Dữ liệu
1. **Phân cấp quyền hạn:** Admin có quyền quản lý danh mục toàn trường. Trưởng phòng chỉ được phép quản lý các danh mục thuộc phòng ban của mình.
2. **Ràng buộc toàn vẹn dữ liệu (Data Integrity):** Nếu một danh mục đã từng phát sinh Ticket giao dịch trong lịch sử, hệ thống từ chối thao tác Xóa vĩnh viễn (`Delete`) để tránh làm đứt gãy báo cáo, chỉ cho phép chuyển sang trạng thái Ẩn (`Inactive`).

### 3.2. Quy trình Phân quyền & Khóa Tài khoản
1. **Gán Vai trò & Phòng ban:** Admin tìm kiếm tài khoản nhân sự, chỉ định 1 Vai trò duy nhất (`Sinh viên`, `Nhân viên`, `Quản lý`, `Admin`) và gán Phòng ban phụ trách (bắt buộc với NV và Quản lý).
2. **Cơ chế Khóa tài khoản (`Inactive`):** Khi Admin đổi trạng thái tài khoản sang `Inactive`, hệ thống lập tức đăng xuất phiên làm việc hiện tại của người dùng đó, chặn đăng nhập mới và ẩn tên khỏi danh sách phân công công việc (`Assign`) của Trưởng phòng.
