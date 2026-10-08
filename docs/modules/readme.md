# BẢNG PHÂN CHIA MODULE VÀ TASK - DỰ ÁN UNISUPPORT

> **Quy mô Phân hệ:** 13 MODULE THỰC THI (M01–M13) • 3 GIAI ĐOẠN • 4 ROLE
> **Lưu ý cấu trúc:** Thư mục `modules/` được phân chia thành 3 folder tương ứng với 3 Giai đoạn triển khai dự án. Danh mục mã Module được đánh số liên tục từ **M01 đến M13**.
> **Nguyên tắc cốt lõi:** Triển khai cuốn chiếu; dùng Database thật (không mockup); hoàn thành, kiểm thử và nghiệm thu từng module trước khi chuyển tiếp.

---

## 1. Tổng quan các Giai đoạn & Cấu trúc Thư mục (Phase Folders Overview)

| Giai đoạn     | Thư mục Giai đoạn                 | Phạm vi Module | Số lượng | Milestone Nghiệm thu                                                                                                                                     |
| :-------------- | :------------------------------------ | :-------------- | :---------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GĐ 1** | `GĐ1-NenTang&ChucNangCotLoi/` | M01–M08        |      8      | Khách hàng đăng nhập bằng tài khoản thật, tạo Ticket, Nhân viên tiếp nhận, xử lý và trả kết quả; dữ liệu lưu trên Database thật. |
| **GĐ 2** | `GĐ2-PhanHeSinhVien/`    | M09–M10        |      2      | Sinh viên thực hiện đầy đủ luồng: Tạo → Theo dõi → Bổ sung → Nhận kết quả → Đánh giá.                                                |
| **GĐ 3** | `GĐ3-DieuPhoi&GIamSat/`   | M11–M13        |            | Quản lý phân công và giám sát trong phòng ban; Admin theo dõi và điều phối toàn trường.                                                   |

---

## 2. Danh mục 13 Phân hệ Chi tiết Theo Thư mục Giai đoạn

### 🚀 GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP (`GĐ1-NenTang&ChucNangCotLoi/`)

*Mục tiêu: Hoàn thiện quản trị nền tảng và luồng tạo → tiếp nhận → xử lý → trả kết quả Ticket trên Database thật.*

* **[M01-dang-nhap-xac-thuc/](GĐ1-NenTang&ChucNangCotLoi/M01-dang-nhap-xac-thuc/) - M01: Đăng nhập & Xác thực** ([prd.md](GĐ1-NenTang&ChucNangCotLoi/M01-dang-nhap-xac-thuc/prd.md) | [Dang-nhap-xac-thuc.md](GĐ1-NenTang&ChucNangCotLoi/M01-dang-nhap-xac-thuc/Dang-nhap-xac-thuc.md))
  * Đăng nhập, đăng xuất, quên và đặt lại mật khẩu.
  * Xác thực và điều hướng theo Role.
* **[M02-quan-ly-tai-khoan/](GĐ1-NenTang&ChucNangCotLoi/M02-quan-ly-tai-khoan/) - M02: Quản lý tài khoản — Admin** ([prd.md](GĐ1-NenTang&ChucNangCotLoi/M02-quan-ly-tai-khoan/prd.md) | [Quan-ly-tai-khoan.md](GĐ1-NenTang&ChucNangCotLoi/M02-quan-ly-tai-khoan/Quan-ly-tai-khoan.md))
  * Tạo, xem, tìm kiếm và lọc tài khoản.
  * Cập nhật, khóa, mở khóa và xóa tài khoản.
* **[M03-vai-tro-phan-quyen/](GĐ1-NenTang&ChucNangCotLoi/M03-vai-tro-phan-quyen/) - M03: Vai trò & Phân quyền — Admin** ([prd.md](GĐ1-NenTang&ChucNangCotLoi/M03-vai-tro-phan-quyen/prd.md) | [Vai-tro-phan-quyen.md](GĐ1-NenTang&ChucNangCotLoi/M03-vai-tro-phan-quyen/Vai-tro-phan-quyen.md))
  * Quản lý vai trò người dùng.
  * Cấu hình và kiểm soát quyền truy cập.
* **[M04-quan-ly-danh-muc/](GĐ1-NenTang&ChucNangCotLoi/M04-quan-ly-danh-muc/) - M04: Quản lý danh mục hỗ trợ** ([prd.md](GĐ1-NenTang&ChucNangCotLoi/M04-quan-ly-danh-muc/prd.md) | [Quan-ly-danh-muc.md](GĐ1-NenTang&ChucNangCotLoi/M04-quan-ly-danh-muc/Quan-ly-danh-muc.md))
  * Admin quản lý danh mục toàn trường.
  * Quản lý thêm danh mục thuộc phòng ban.
* **[M05-khoi-tao-ticket/](GĐ1-NenTang&ChucNangCotLoi/M05-khoi-tao-ticket/) - M05: Khởi tạo Ticket — Sinh viên** ([prd.md](GĐ1-NenTang&ChucNangCotLoi/M05-khoi-tao-ticket/prd.md) | [Khoi-tao-ticket.md](GĐ1-NenTang&ChucNangCotLoi/M05-khoi-tao-ticket/Khoi-tao-ticket.md))
  * Chọn phòng ban, danh mục hoặc “Khác”.
  * Nhập thông tin, đính kèm và gửi Ticket.
* **[M06-tiep-nhan-ticket/](GĐ1-NenTang&ChucNangCotLoi/M06-tiep-nhan-ticket/) - M06: Tiếp nhận Ticket — Nhân viên** ([prd.md](GĐ1-NenTang&ChucNangCotLoi/M06-tiep-nhan-ticket/prd.md) | [Tiep-nhan-ticket.md](GĐ1-NenTang&ChucNangCotLoi/M06-tiep-nhan-ticket/Tiep-nhan-ticket.md))
  * Xem danh sách Ticket mới thuộc phòng ban.
  * Tìm kiếm, lọc và tiếp nhận Ticket.
* **[M07-xu-ly-trao-doi/](GĐ1-NenTang&ChucNangCotLoi/M07-xu-ly-trao-doi/) - M07: Xử lý & Trao đổi — Nhân viên** ([prd.md](GĐ1-NenTang&ChucNangCotLoi/M07-xu-ly-trao-doi/prd.md) | [Xu-ly-trao-doi.md](GĐ1-NenTang&ChucNangCotLoi/M07-xu-ly-trao-doi/Xu-ly-trao-doi.md))
  * Cập nhật trạng thái và tiến độ Ticket.
  * Yêu cầu bổ sung và trao đổi với Sinh viên.
  * Chuyển Ticket sai phòng ban về Admin.
* **[M08-tra-ket-qua/](GĐ1-NenTang&ChucNangCotLoi/M08-tra-ket-qua/) - M08: Trả kết quả — Nhân viên** ([prd.md](GĐ1-NenTang&ChucNangCotLoi/M08-tra-ket-qua/prd.md) | [Tra-ket-qua.md](GĐ1-NenTang&ChucNangCotLoi/M08-tra-ket-qua/Tra-ket-qua.md))
  * Nhập kết quả và đính kèm tài liệu.
  * Hoàn thành Ticket và thông báo cho Sinh viên.

---

### 🎓 GIAI ĐOẠN 2 — PHÂN HỆ SINH VIÊN (`GĐ2-PhanHeSinhVien/`)

*Mục tiêu: Hoàn thiện toàn bộ trải nghiệm Sinh viên.*

* **[M09-theo-doi-bo-sung/](GĐ2-PhanHeSinhVien/M09-theo-doi-bo-sung/) - M09: Theo dõi & Bổ sung thông tin** ([prd.md](GĐ2-PhanHeSinhVien/M09-theo-doi-bo-sung/prd.md) | [Theo-doi-bo-sung.md](GĐ2-PhanHeSinhVien/M09-theo-doi-bo-sung/Theo-doi-bo-sung.md))
  * Xem danh sách, chi tiết và trạng thái Ticket.
  * Tìm kiếm, lọc và theo dõi lịch sử Ticket.
  * Bổ sung thông tin và tài liệu theo yêu cầu.
  * Thông báo trạng thái và yêu cầu bổ sung.
* **[M10-ket-qua-danh-gia/](GĐ2-PhanHeSinhVien/M10-ket-qua-danh-gia/) - M10: Kết quả & Đánh giá** ([prd.md](GĐ2-PhanHeSinhVien/M10-ket-qua-danh-gia/prd.md) | [Ket-qua-danh-gia.md](GĐ2-PhanHeSinhVien/M10-ket-qua-danh-gia/Ket-qua-danh-gia.md))
  * Xem kết quả và tải tài liệu.
  * Đánh giá mức độ hài lòng 1–5 sao.
  * Viết nhận xét và xem thông báo kết quả.

---

### 📊 GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT (`GĐ3-DieuPhoi&GIamSat/`)

*Mục tiêu: Hoàn thiện điều phối phòng ban và giám sát toàn trường.*

* **[M11-quan-ly-dieu-phoi/](GĐ3-DieuPhoi&GIamSat/M11-quan-ly-dieu-phoi/) - M11: Quản lý & Điều phối Ticket** ([prd.md](GĐ3-DieuPhoi&GIamSat/M11-quan-ly-dieu-phoi/prd.md) | [Quan-ly-dieu-phoi.md](GĐ3-DieuPhoi&GIamSat/M11-quan-ly-dieu-phoi/Quan-ly-dieu-phoi.md))
  * Quản lý phân công Ticket cho nhân viên thuộc phòng ban.
  * Admin phân loại Ticket “Khác”.
  * Admin tiếp nhận và điều chuyển Ticket sai phòng ban.
* **[M12-giam-sat-tien-do/](GĐ3-DieuPhoi&GIamSat/M12-giam-sat-tien-do/) - M12: Giám sát tiến độ** ([prd.md](GĐ3-DieuPhoi&GIamSat/M12-giam-sat-tien-do/prd.md) | [Giam-sat-tien-do.md](GĐ3-DieuPhoi&GIamSat/M12-giam-sat-tien-do/Giam-sat-tien-do.md))
  * Quản lý theo dõi tiến độ và hiệu suất nhân viên.
  * Theo dõi Ticket tồn đọng, chưa tiếp nhận và quá hạn.
  * Admin theo dõi tiến độ xử lý toàn trường.
* **[M13-dashboard-bao-cao/](GĐ3-DieuPhoi&GIamSat/M13-dashboard-bao-cao/) - M13: Dashboard & Báo cáo** ([prd.md](GĐ3-DieuPhoi&GIamSat/M13-dashboard-bao-cao/prd.md) | [Dashboard-bao-cao.md](GĐ3-DieuPhoi&GIamSat/M13-dashboard-bao-cao/Dashboard-bao-cao.md))
  * Dashboard và thống kê theo phạm vi quyền.
  * Báo cáo Ticket theo trạng thái, danh mục và thời gian.
  * Thống kê đánh giá và hiệu suất nhân viên.

---

## 3. Quy tắc Nghiệm thu 

1. **Dữ liệu hệ thống:** Thực hiện trên Database thật do chính người dùng nhập vào
2. **Nghiệm thu theo từng Phân hệ:** Hoàn thiện Frontend, Backend, API và kiểm thử trong phạm vi từng module.
3. **Phụ thuộc M07/M11:** M07 có chức năng chuyển Ticket sai phòng ban về Admin, M11 có giao diện xử lý điều chuyển. Để nghiệm thu M07 ở GĐ1, đưa phần chuyển tiếp của M11 lên GĐ1.
