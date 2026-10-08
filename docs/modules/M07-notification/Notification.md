# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ THÔNG BÁO HỆ THỐNG (NOTI)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR                 | Tên Chức năng            | Actor Chính | Mô tả Tóm tắt                                                                               |
| :--------------------- | :-------------------------- | :----------- | :---------------------------------------------------------------------------------------------- |
| **[FR-NOTI-01]** | Gửi Thông báo Tự động | Hệ thống   | Đẩy cảnh báo in-app (biểu tượng quả chuông) khi ticket có sự thay đổi quan trọng. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

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

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Sự kiện Bật Cảnh báo (Trigger Events)

1. **Thông báo cho Sinh viên:** Khi đơn đổi trạng thái (`In Progress`, `Pending`, `Resolved`, `Closed`).
2. **Thông báo cho Nhân viên:** Khi được Quản lý phân công (`Assign`), khi có đơn được chuyển từ phòng khác tới, hoặc khi Sinh viên phản hồi bổ sung thông tin.
3. **Thông báo cho Admin:** Khi có đơn mới khởi tạo mang danh mục "Khác".
4. **Lọc thông báo rác (Spam Filter):** Các hành vi chỉnh sửa lỗi chính tả nhẹ ở trạng thái `New` không tạo thông báo.

### 3.2. Cơ chế Tương tác Chuông & Hàng đợi Retry

1. **Điều hướng trực tiếp (Deep Linking):** Người dùng nhấp vào dòng thông báo ở quả chuông -> Trình duyệt mở thẳng tới trang chi tiết của đúng Ticket đó.
2. **Hàng đợi phát lại (Retry Queue):** Nếu thiết bị người dùng mất mạng đúng lúc thông báo gửi đi, hệ thống ghi nhận vào hàng đợi ngầm và đẩy lại thông báo ngay khi thiết bị có kết nối Internet trở lại.
