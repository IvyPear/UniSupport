# 6. MA TRẬN THÔNG BÁO (NOTIFICATION MATRIX)

> **Quy tắc:** Giới hạn đúng 6 hành vi thông báo hệ thống đã được thống nhất. Không tự ý bổ sung các loại thông báo khác khi chưa có phê duyệt.

---

## Bảng Ma trận 6 Hành vi Thông báo Standard

| # | Sự kiện / Hành vi phát sinh | Người nhận thông báo | Module & FR liên quan | Quy tắc vận hành |
|---|---|---|---|---|
| **1** | Trạng thái Ticket thay đổi (VD: `Chưa tiếp nhận` $\rightarrow$ `Đang xử lý` $\rightarrow$ `Chờ bổ sung`) | Sinh viên | [M09](../modules/GĐ2-PhanHeSinhVien/M09-theo-doi-bo-sung/) (`[FR-M09-04]`) / `NV-02` | Bắn thông báo In-app. Nhấn vào thông báo sẽ mở trực tiếp màn hình chi tiết Ticket đó. |
| **2** | Sinh viên gửi thông tin/tài liệu bổ sung thành công | Nhân viên đang phụ trách Ticket | [M06](../modules/GĐ1-NenTang&ChucNangCotLoi/M06-tiep-nhan-ticket/) (`[FR-M06-03]`), [M09](../modules/GĐ2-PhanHeSinhVien/M09-theo-doi-bo-sung/) / `SV-03` | Bắn thông báo In-app cho đúng Nhân viên (Assignee) cũ. Giữ nguyên Assignee, không đổi người. |
| **3** | Hiển thị thông báo có kết quả xử lý | Sinh viên | [M10](../modules/GĐ2-PhanHeSinhVien/M10-ket-qua-danh-gia/) (`[FR-M10-01]`) / `SV-04` | Nhấn thông báo cho phép Sinh viên xem nội dung kết quả và tải file kết quả đính kèm. |
| **4** | Nhân viên trả kết quả xử lý (Hoàn thành đơn) | Sinh viên | [M08](../modules/GĐ1-NenTang&ChucNangCotLoi/M08-tra-ket-qua/) (`[FR-M08-02]`) / `NV-05` | **Cùng là 1 sự kiện với #3**. Tuyệt đối không bắn 2 lần thông báo trùng lặp cho Sinh viên. |
| **5** | Nhân viên chuyển Ticket sai phòng ban về Admin | Admin hệ thống | [M11](../modules/GĐ3-DieuPhoi&GIamSat/M11-quan-ly-dieu-phoi/) (`[FR-M11-04]`), [M07](../modules/GĐ1-NenTang&ChucNangCotLoi/M07-xu-ly-trao-doi/) (`[FR-M07-03]`) / `NV-04`, `AD-05` | Thông báo gửi tới Admin để thực hiện điều chuyển lại, không gửi cho Quản lý phòng ban. |
| **6** | Ticket quá hạn SLA hoặc chưa được tiếp nhận quá lâu | Quản lý phòng ban (Trưởng phòng) | [M12](../modules/GĐ3-DieuPhoi&GIamSat/M12-giam-sat-tien-do/) (`[FR-M12-04]`) / `QL-03` | Hiển thị cảnh báo trực quan trên Dashboard của Quản lý và phát thông báo In-app cho Quản lý. |

---

> **Lưu ý:** 
> 1. Sự kiện #3 và #4 dùng chung một luồng xử lý thông báo kết quả. Không phát sinh email/in-app dư thừa gây phiền người dùng.
> 2. Đã bổ sung đầy đủ các tính năng tiếp nhận thông báo In-app cho 4 Vai trò: Sinh viên (`[FR-M09-04]`), Nhân viên (`[FR-M06-03]`), Quản lý (`[FR-M12-04]`), Admin (`[FR-M11-04]`).

