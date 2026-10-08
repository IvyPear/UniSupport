# 6. MA TRẬN THÔNG BÁO (NOTIFICATION MATRIX)

> **Quy tắc:** Giới hạn đúng 6 hành vi thông báo hệ thống đã được thống nhất. Không tự ý bổ sung các loại thông báo khác khi chưa có phê duyệt.

---

## Bảng Ma trận 6 Hành vi Thông báo Standard

| # | Sự kiện / Hành vi phát sinh | Người nhận thông báo | Module & Workflow liên quan | Quy tắc vận hành |
|---|---|---|---|---|
| **1** | Trạng thái Ticket thay đổi (VD: `Chưa tiếp nhận` $\rightarrow$ `Đang xử lý` $\rightarrow$ `Chờ bổ sung`) | Sinh viên | [M09](../modules/Giai-Doan-2-Phan-He-Sinh-Vien/M09-theo-doi-bo-sung/) / `NV-02` | Bắn thông báo In-app. Nhấn vào thông báo sẽ mở trực tiếp màn hình chi tiết Ticket đó. |
| **2** | Sinh viên gửi thông tin/tài liệu bổ sung thành công | Nhân viên đang phụ trách Ticket | [M09](../modules/Giai-Doan-2-Phan-He-Sinh-Vien/M09-theo-doi-bo-sung/) / `SV-03` | Bắn thông báo cho đúng Nhân viên (Assignee) cũ. Giữ nguyên Assignee, không đổi người. |
| **3** | Hiển thị thông báo có kết quả xử lý | Sinh viên | [M10](../modules/Giai-Doan-2-Phan-He-Sinh-Vien/M10-ket-qua-danh-gia/) / `SV-04` | Nhấn thông báo cho phép Sinh viên xem nội dung kết quả và tải file kết quả đính kèm. |
| **4** | Nhân viên trả kết quả xử lý (Hoàn thành đơn) | Sinh viên | [M08](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M08-tra-ket-qua/) / `NV-05` | **Cùng là 1 sự kiện với #3**. Tuyệt đối không bắn 2 lần thông báo trùng lặp cho Sinh viên. |
| **5** | Nhân viên chuyển Ticket sai phòng ban về Admin | Admin hệ thống | [M07](../modules/Giai-Doan-1-Nen-Tang-Working-MVP/M07-xu-ly-trao-doi/) / `NV-04`, `AD-05` | Thông báo gửi tới Admin để thực hiện điều chuyển lại, không gửi cho Quản lý phòng ban. |
| **6** | Ticket quá hạn SLA hoặc chưa được tiếp nhận quá lâu | Quản lý phòng ban (Trưởng phòng) | [M12](../modules/Giai-Doan-3-Dieu-Phoi-Giam-Sat/M12-giam-sat-tien-do/) / `QL-03` | Hiển thị cảnh báo trực quan trên Dashboard của Quản lý theo ngưỡng cấu hình. |

---

> **Lưu ý:** Sự kiện #3 và #4 dùng chung một luồng xử lý thông báo kết quả. Không phát sinh email/in-app dư thừa gây phiền người dùng.
