# 6. MA TRẬN THÔNG BÁO (NOTIFICATION MATRIX)

> **Quy tắc:** Giới hạn đúng 7 hành vi thông báo hệ thống đã được thống nhất. Không tự ý bổ sung các loại thông báo khác khi chưa có phê duyệt.

---

## Bảng Ma trận 7 Hành vi Thông báo Standard

| # | Sự kiện / Hành vi phát sinh | Người nhận thông báo | Module & FR liên quan | Quy tắc vận hành |
|---|---|---|---|---|
| **1** | Trạng thái Ticket thay đổi (VD: `Chưa tiếp nhận` $\rightarrow$ `Đang xử lý` $\rightarrow$ `Chờ bổ sung`) | Sinh viên | [M09](../modules/GD2/Moc4-PhanHeSinhVien/M09-theo-doi-bo-sung/) (`[FR-M09-01]`) / `NV-02` | Bắn thông báo In-app. Nhấn vào thông báo sẽ mở trực tiếp màn hình chi tiết Ticket đó. |
| **2** | Sinh viên gửi thông tin/tài liệu bổ sung thành công | Nhân viên đang phụ trách Ticket | [M06](../modules/GD2/Moc3-XuLi&BoSung/M06-tiep-nhan-ticket/) (`[FR-M06-01]`), [M09](../modules/GD2/Moc4-PhanHeSinhVien/M09-theo-doi-bo-sung/) (`[FR-M09-02]`) / `SV-03` | Bắn thông báo In-app cho đúng Nhân viên (Assignee) cũ. Giữ nguyên Assignee, không đổi người. |
| **3** | Hiển thị thông báo có kết quả xử lý | Sinh viên | [M10](../modules/GD2/Moc4-PhanHeSinhVien/M10-ket-qua-danh-gia/) (`[FR-M10-01]`) / `SV-04` | Nhấn thông báo cho phép Sinh viên xem nội dung kết quả và tải file kết quả đính kèm. |
| **4** | Nhân viên trả kết quả xử lý (Hoàn thành đơn) | Sinh viên | [M08](../modules/GD2/Moc3-XuLi&BoSung/M08-tra-ket-qua/) (`[FR-M08-02]`) / `NV-05` | **Cùng là 1 sự kiện với #3**. Tuyệt đối không bắn 2 lần thông báo trùng lặp cho Sinh viên. |
| **5** | Nhân viên chuyển Ticket sai phòng ban về Admin | Admin hệ thống | [M11](../modules/GD2/Moc3-XuLi&BoSung/M11-quan-ly-dieu-phoi/) (`[FR-M11-02]`), [M07](../modules/GD2/Moc3-XuLi&BoSung/M07-xu-ly-trao-doi/) (`[FR-M07-04]`) / `NV-04`, `AD-05` | Thông báo gửi tới Admin để thực hiện điều chuyển lại, không gửi cho Quản lý phòng ban. |
| **6** | Ticket quá hạn SLA hoặc chưa được tiếp nhận quá lâu | Quản lý phòng ban (Trưởng phòng) | [M12](../modules/GD3/Moc5-GiamSat&Dashboard/M12-giam-sat-tien-do/) (`[FR-M12-02]`) / `QL-03` | Hiển thị cảnh báo trực quan trên Dashboard của Quản lý và phát thông báo In-app cho Quản lý. |
| **7** | Quản lý phòng ban phân công (`Assign`) hoặc điều phối lại (`Re-assign`) Ticket | Nhân viên được phân công (Assignee mới) | [M11](../modules/GD2/Moc3-XuLi&BoSung/M11-quan-ly-dieu-phoi/) (`[FR-M11-03]`) / `QL-02` | Bắn thông báo In-app cho Nhân viên được gán đơn mới/chuyển đơn. Nhấn vào thông báo sẽ mở trực tiếp màn hình chi tiết Ticket cần xử lý. |

---

> **Lưu ý:** 
> 1. Sự kiện #3 và #4 dùng chung một luồng xử lý thông báo kết quả. Không phát sinh email/in-app dư thừa gây phiền người dùng.
> 2. Đã bổ sung đầy đủ các tính năng tiếp nhận thông báo In-app cho 4 Vai trò: Sinh viên (`[FR-M09-01]`), Nhân viên (`[FR-M06-01]`), Quản lý (`[FR-M12-02]`), Admin (`[FR-M11-02]`).
