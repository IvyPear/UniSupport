# DOMAIN KNOWLEDGE & NGHIỆP VỤ CỐT LÕI — UNISUPPORT

> **Dự án:** UniSupport — Nền tảng Tiếp nhận và Hỗ trợ Thủ tục Hành chính Sinh viên  
> **Phạm vi:** Tài liệu nền tảng định nghĩa mô hình dữ liệu, quy tắc nghiệp vụ, ma trận chuyển trạng thái và cấu trúc Ticket chuẩn toàn hệ thống.

---

## 1. Mục lục Tài liệu Nghiệp vụ (Domain Documentation)

| File Tài liệu | Tiêu đề chính | Nội dung tóm tắt |
| :--- | :--- | :--- |
| **[tong-quan-domain.md](tong-quan-domain.md)** | Đề xuất Giải pháp Single Service Desk | Bối cảnh, vấn đề cốt lõi, giải pháp một cửa số hóa và các đối tượng sử dụng (Actors: Sinh viên, Nhân viên, Quản lý, Admin). |
| **[quy-tac-nghiep-vu.md](quy-tac-nghiep-vu.md)** | Quy tắc Nghiệp vụ & Ràng buộc Hệ thống | Các quy tắc cốt lõi về phân quyền RBAC, điều kiện chỉnh sửa Ticket, cơ chế Pending 3 ngày làm việc, kiểm soát kết quả giải quyết và định tuyến danh mục "Khác". |
| **[chuyen-doi-trang-thai.md](chuyen-doi-trang-thai.md)** | Quy định Luồng Trạng thái Ticket | Vòng đời 5 trạng thái Ticket (`New` $\rightarrow$ `In Progress` $\rightarrow$ `Pending` $\rightarrow$ `Resolved` $\rightarrow$ `Closed`), ma trận chuyển đổi và các quy tắc tự động hóa. |
| **[mo-hinh-ticket.md](mo-hinh-ticket.md)** | Cấu trúc Dữ liệu Yêu cầu (Ticket Data Model) | Định dạng mã Ticket (`[CATEGORY_CODE]-[YYYYMMDD]-[SEQ_NUMBER]`), các thuộc tính dữ liệu cơ bản, trạng thái, timestamps và Resolution Notes. |

---

## 2. Tổng quan Mô hình Vòng đời Ticket 5 Trạng thái

```mermaid
flowchart LR
    A[New - Mới tạo] --> B[In Progress - Đang xử lý]
    B --> C[Pending - Chờ bổ sung]
    C -->|SV bổ sung| B
    C -->|Quá 3 ngày LV| E[Closed - Đã đóng vĩnh viễn]
    B --> D[Resolved - Đã giải quyết]
    D -->|SV đánh giá / Quá 3 ngày LV| E
```

---

## 3. Các Quy tắc Nghiệp vụ Cốt lõi (Key Principles)

1. **Cơ chế Hệ thống Đóng:** Tài khoản do nhà trường cấp sẵn; Sinh viên và Nhân viên đăng nhập bằng mã định danh cá nhân, tuyệt đối không có chức năng đăng ký tự do.
2. **Khóa thao tác khi Đang xử lý:** Sinh viên chỉ được sửa Tiêu đề & Nội dung Ticket khi ở trạng thái `New` (không sửa Danh mục/Phòng ban), hoặc nộp bổ sung giấy tờ khi ở trạng thái `Pending`.
3. **Chống đếm ngược / Đơn treo (Pending 3 ngày làm việc):** Trạng thái `Pending` đếm ngược tối đa 3 ngày làm việc (không tính Thứ 7, Chủ nhật, Ngày lễ); hết 3 ngày làm việc sinh viên không bổ sung thông tin sẽ tự động đóng đơn (`Closed`).
4. **Ép buộc Nhập kết quả (Resolution Notes):** Khi Nhân viên chuyển đơn sang `Resolved`, hệ thống bắt buộc nhập nội dung giải trình kết quả trước khi lưu.
5. **Đóng vĩnh viễn (No Reopen):** Đơn chuyển sang `Closed` sau khi Sinh viên đánh giá sao (1–5) hoặc tự động đóng sau 3 ngày làm việc sẽ bị khóa cứng trên Database, tuyệt đối không cho phép mở lại.
