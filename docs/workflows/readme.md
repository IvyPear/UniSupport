# TÀI LIỆU LUỒNG QUY TRÌNH NGHIỆP VỤ (FUNCTIONAL WORKFLOWS PRD)

> **Dự án:** UniSupport — System Helpdesk & Support
> **Ánh xạ Phân hệ:** Phân hệ M01 đến M13 (3 Giai đoạn triển khai)
> **Tác nhân:** Sinh viên, Nhân viên, Quản lý (Trưởng phòng), Admin

---

## 1. Bản đồ Danh mục Luồng Nghiệp vụ (Workflows Index)

### 📌 01. Vòng đời Ticket & Tổng quan

* **[01-luong-hoat-dong-Ticket.md](01-luong-hoat-dong-Ticket.md)** — Sơ đồ vòng đời Ticket (Mermaid), bảng 5 trạng thái cốt lõi và các nguyên tắc nghiệp vụ chung.

---

### 🎓 02. Phân hệ Sinh viên (Student Workflows)

* **[02-quy-trinh-sinh-vien.md](02-quy-trinh-sinh-vien.md)** — Tập hợp 5 quy trình nghiệp vụ Sinh viên:
  * **SV-01:** Gửi yêu cầu hỗ trợ ([M05-khoi-tao-ticket](../modules/GĐ1-NenTang&ChucNangCotLoi/M05-khoi-tao-ticket/))
  * **SV-02:** Theo dõi yêu cầu ([M09-theo-doi-bo-sung](../modules/GĐ2-PhanHeSinhVien/M09-theo-doi-bo-sung/))
  * **SV-03:** Bổ sung thông tin ([M09-theo-doi-bo-sung](../modules/GĐ2-PhanHeSinhVien/M09-theo-doi-bo-sung/))
  * **SV-04:** Xem kết quả ([M10-ket-qua-danh-gia](../modules/GĐ2-PhanHeSinhVien/M10-ket-qua-danh-gia/))
  * **SV-05:** Đánh giá chất lượng ([M10-ket-qua-danh-gia](../modules/GĐ2-PhanHeSinhVien/M10-ket-qua-danh-gia/))

---

### 🛠️ 03. Phân hệ Nhân viên (Staff Workflows)

* **[03-quy-trinh-nhan-vien.md](03-quy-trinh-nhan-vien.md)** — Tập hợp 6 quy trình nghiệp vụ Nhân viên phòng ban:
  * **NV-01:** Tiếp nhận Ticket ([M06-tiep-nhan-ticket](../modules/GĐ1-NenTang&ChucNangCotLoi/M06-tiep-nhan-ticket/))
  * **NV-02:** Cập nhật tiến độ ([M07-xu-ly-trao-doi](../modules/GĐ1-NenTang&ChucNangCotLoi/M07-xu-ly-trao-doi/))
  * **NV-03:** Yêu cầu bổ sung ([M07-xu-ly-trao-doi](../modules/GĐ1-NenTang&ChucNangCotLoi/M07-xu-ly-trao-doi/))
  * **NV-04:** Chuyển Ticket sai phòng ban ([M07-xu-ly-trao-doi](../modules/GĐ1-NenTang&ChucNangCotLoi/M07-xu-ly-trao-doi/))
  * **NV-05:** Trả kết quả ([M08-tra-ket-qua](../modules/GĐ1-NenTang&ChucNangCotLoi/M08-tra-ket-qua/))
  * **NV-06:** Xem lịch sử xử lý ([M07-xu-ly-trao-doi](../modules/GĐ1-NenTang&ChucNangCotLoi/M07-xu-ly-trao-doi/))

---

### 📊 04. Phân hệ Quản lý / Trưởng phòng (Manager Workflows)

* **[04-quy-trinh-quan-ly.md](04-quy-trinh-quan-ly.md)** — Tập hợp 6 quy trình nghiệp vụ Quản lý:
  * **QL-01:** Theo dõi tổng quan phòng ban ([M13-dashboard-bao-cao](../modules/GĐ3-DieuPhoi&GIamSat/M13-dashboard-bao-cao/))
  * **QL-02:** Phân công nhanh ([M11-quan-ly-dieu-phoi](../modules/GĐ3-DieuPhoi&GIamSat/M11-quan-ly-dieu-phoi/))
  * **QL-03:** Giám sát tiến độ và tồn đọng ([M12-giam-sat-tien-do](../modules/GĐ3-DieuPhoi&GIamSat/M12-giam-sat-tien-do/))
  * **QL-04:** Theo dõi hiệu suất Nhân viên ([M12-giam-sat-tien-do](../modules/GĐ3-DieuPhoi&GIamSat/M12-giam-sat-tien-do/), [M13-dashboard-bao-cao](../modules/GĐ3-DieuPhoi&GIamSat/M13-dashboard-bao-cao/))
  * **QL-05:** Quản lý danh mục phòng ban ([M04-quan-ly-danh-muc](../modules/GĐ1-NenTang&ChucNangCotLoi/M04-quan-ly-danh-muc/))
  * **QL-06:** Báo cáo và đánh giá ([M13-dashboard-bao-cao](../modules/GĐ3-DieuPhoi&GIamSat/M13-dashboard-bao-cao/))

---

### ⚙️ 05. Phân hệ Quản trị viên (Admin Workflows)

* **[05-quy-trinh-admin.md](05-quy-trinh-admin.md)** — Tập hợp 6 quy trình nghiệp vụ Admin:
  * **AD-01:** Quản lý tài khoản ([M02-quan-ly-tai-khoan](../modules/GĐ1-NenTang&ChucNangCotLoi/M02-quan-ly-tai-khoan/))
  * **AD-02:** Vai trò và phân quyền ([M03-vai-tro-phan-quyen](../modules/GĐ1-NenTang&ChucNangCotLoi/M03-vai-tro-phan-quyen/))
  * **AD-03:** Quản lý danh mục toàn trường ([M04-quan-ly-danh-muc](../modules/GĐ1-NenTang&ChucNangCotLoi/M04-quan-ly-danh-muc/))
  * **AD-04:** Phân loại Ticket "Khác" ([M11-quan-ly-dieu-phoi](../modules/GĐ3-DieuPhoi&GIamSat/M11-quan-ly-dieu-phoi/))
  * **AD-05:** Điều chuyển Ticket sai phòng ban ([M11-quan-ly-dieu-phoi](../modules/GĐ3-DieuPhoi&GIamSat/M11-quan-ly-dieu-phoi/))
  * **AD-06:** Theo dõi và thống kê toàn trường ([M12-giam-sat-tien-do](../modules/GĐ3-DieuPhoi&GIamSat/M12-giam-sat-tien-do/), [M13-dashboard-bao-cao](../modules/GĐ3-DieuPhoi&GIamSat/M13-dashboard-bao-cao/))

---

### 🔔 06. Ma trận Thông báo 

* **[06-ma-tran-thong-bao.md](06-ma-tran-thong-bao.md)** — Ma trận 6 hành vi thông báo hệ thống đã thống nhất.

### 📁 07. Luồng Quy trình Chi tiết (Detail WF Files)

* **[01-luong-hoat-dong-Ticket.md](01-luong-hoat-dong-Ticket.md)** — Sơ đồ luồng hoạt động Ticket tổng quan và vòng đời xử lý.
* **[02-quy-trinh-sinh-vien.md](02-quy-trinh-sinh-vien.md)** — Chi tiết 5 luồng quy trình Sinh viên (Khởi tạo, Theo dõi, Bổ sung, Kết quả, Đánh giá).
* **[03-quy-trinh-nhan-vien.md](03-quy-trinh-nhan-vien.md)** — Chi tiết 6 luồng quy trình Nhân viên (Tiếp nhận, Xử lý, Bổ sung, Chuyển đơn, Trả kết quả, Lịch sử).
* **[04-quy-trinh-quan-ly.md](04-quy-trinh-quan-ly.md)** — Chi tiết 6 luồng quy trình Quản lý (Dashboard, Phân công, Giám sát, Hiệu suất, Danh mục, Báo cáo).
* **[05-quy-trinh-admin.md](05-quy-trinh-admin.md)** — Chi tiết 6 luồng quy trình Admin (Tài khoản, Phân quyền, Danh mục toàn trường, Phân loại, Điều chuyển, Thống kê).
