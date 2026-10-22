# BẢNG PHÂN CHIA GIAI ĐOẠN— DỰ ÁN UNISUPPORT

> **Quy mô Hệ thống:** 3 GIAI ĐOẠN (PHASES) • 5 MỐC TRIỂN KHAI (MILESTONES) • 13 MODULE THỰC THI (M01–M13) • 37 TASKS CHUẨN GITHUB + 1 INFRA TASK • 4 VAI TRÒ
>
> **Phân bổ Giai đoạn & Mốc (Theo yêu cầu dự án & GitHub):**
>
> * **Giai đoạn 1 (GD1):** Chứa **Mốc 1: Nền tảng** (`GD1/Moc1-NenTang/`)
> * **Giai đoạn 2 (GD2):** Chứa **Mốc 2: Khởi Tạo Ticket**, **Mốc 3: Xử lí & Bổ sung**, và **Mốc 4: Phân Hệ Sinh viên** (`GD2/`)
> * **Giai đoạn 3 (GD3):** Chứa **Mốc 5: Giám sát & Dashboard** (`GD3/Moc5-GiamSat&Dashboard/`)
>
> **Nguyên tắc cốt lõi:** Triển khai cuốn chiếu theo từng Mốc; dùng Database thật (không mockup); hoàn thành, kiểm thử và nghiệm thu từng Mốc trước khi chuyển tiếp.

---

## 1. Bảng Tổng quan Giai đoạn & Mốc Triển khai

|       Giai đoạn       | Thư mục Giai đoạn | Mốc Triển khai                         | Thư mục Mốc              | Phạm vi Module                       | Số Issue | Nội dung & Mục tiêu Nghiệm thu                                                                                                                          |
| :---------------------: | :-------------------- | :--------------------------------------- | :-------------------------- | :------------------------------------ | :-------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Giai đoạn 1** | `GD1/`              | **Mốc 1: Nền tảng**             | `Moc1-NenTang/`           | `INF-01`, `M01`, `M02`, `M03` |  1 + 11  | Khởi tạo hạ tầng, xác thực đăng nhập, RBAC phân quyền và quản trị tài khoản người dùng trên Database thật.                             |
| **Giai đoạn 2** | `GD2/`              | **Mốc 2: Khởi Tạo Ticket**      | `Moc2-KhoiTaoTicket/`     | `M04`, `M05`                      |     4     | Cấu hình danh mục hỗ trợ chung/riêng và Form khởi tạo yêu cầu hỗ trợ của Sinh viên.                                                          |
|                        |                       | **Mốc 3: Xử lí & Bổ sung**     | `Moc3-XuLi&BoSung/`       | `M06`, `M07`, `M08`, `M11`    |    11    | Tiếp nhận, Xử lý tiến độ, Yêu cầu bổ sung 3 ngày làm việc, Báo sai phòng ban, Trả kết quả, và Điều phối (Admin & Trưởng phòng).                   |
|                        |                       | **Mốc 4: Phân Hệ Sinh viên**   | `Moc4-PhanHeSinhVien/`    | `M09`, `M10`                      |     5     | Trọn vẹn trải nghiệm Sinh viên: Theo dõi tiến độ thời gian thực, Nộp bổ sung hồ sơ, Xem kết quả và Đánh giá hài lòng (CSAT 1-5 sao). |
| **Giai đoạn 3** | `GD3/`              | **Mốc 5: Giám sát & Dashboard** | `Moc5-GiamSat&Dashboard/` | `M12`, `M13`                      |     8     | Giám sát tiến độ phòng ban và toàn trường, cảnh báo đỏ quá hạn SLA, Global Search, Dashboard trực quan và xuất báo cáo Excel/PDF.      |

---

## 2. Danh mục Chi tiết Theo Giai đoạn & Mốc (Khớp 1-1 với GitHub Issues)

### 🚀 GIAI ĐOẠN 1 — NỀN TẢNG HỆ THỐNG (`GD1/`)

#### 🏛️ Mốc 1: Nền tảng (`GD1/Moc1-NenTang/`)

* **`[INF-01]` Thiết lập cơ sở hạ tầng và môi trường triển khai hệ thống UniSupport**
* **[M01-dang-nhap-xac-thuc/](GD1/Moc1-NenTang/M01-dang-nhap-xac-thuc/) — [M01] Đăng nhập & Xác thực (0/5)** ([prd.md](GD1/Moc1-NenTang/M01-dang-nhap-xac-thuc/prd.md) | [Dang-nhap-xac-thuc.md](GD1/Moc1-NenTang/M01-dang-nhap-xac-thuc/Dang-nhap-xac-thuc.md))

  * `[M01-01]` Đăng nhập vào hệ thống
  * `[M01-02]` Khóa tài khoản 15 phút khi nhập sai mật khẩu 5 lần liên tiếp
  * `[M01-03]` Lấy lại mật khẩu qua Email dành riêng cho Admin
  * `[M01-04]` Tự động chuyển trang phù hợp với quyền hạn sau khi đăng nhập
  * `[M01-05]` Chặn truy cập trái phép và tự động văng tài khoản khi bị khóa
* **[M02-vai-tro-phan-quyen/](GD1/Moc1-NenTang/M02-vai-tro-phan-quyen/) — [M02] Vai trò & Phân quyền (0/2)** ([prd.md](GD1/Moc1-NenTang/M02-vai-tro-phan-quyen/prd.md) | [Vai-tro-phan-quyen.md](GD1/Moc1-NenTang/M02-vai-tro-phan-quyen/Vai-tro-phan-quyen.md))

  * `[M02-01]` Xem danh sách 4 vai trò của hệ thống
  * `[M02-02]` Cài đặt và phân quyền chức năng chi tiết cho từng vai trò
* **[M03-quan-ly-tai-khoan/](GD1/Moc1-NenTang/M03-quan-ly-tai-khoan/) — [M03] Quản lý tài khoản (0/4)** ([prd.md](GD1/Moc1-NenTang/M03-quan-ly-tai-khoan/prd.md) | [Quan-ly-tai-khoan.md](GD1/Moc1-NenTang/M03-quan-ly-tai-khoan/Quan-ly-tai-khoan.md))

  * `[M03-01]` Xem, tìm kiếm và lọc danh sách tài khoản
  * `[M03-02]` Tạo mới tài khoản
  * `[M03-03]` Cập nhật thông tin và Khóa/Mở khóa tài khoản
  * `[M03-04]` Thêm tài khoản hàng loạt bằng file Excel

---

### 📦 GIAI ĐOẠN 2 — NGHIỆP VỤ TICKET & PHÂN HỆ SINH VIÊN (`GD2/`)

#### 📝 Mốc 2: Khởi Tạo Ticket (`GD2/Moc2-KhoiTaoTicket/`)

* **[M04-quan-ly-danh-muc/](GD2/Moc2-KhoiTaoTicket/M04-quan-ly-danh-muc/) — [M04] Quản lý danh mục (0/2)** ([prd.md](GD2/Moc2-KhoiTaoTicket/M04-quan-ly-danh-muc/prd.md) | [Quan-ly-danh-muc.md](GD2/Moc2-KhoiTaoTicket/M04-quan-ly-danh-muc/Quan-ly-danh-muc.md))

  * `[M04-01]` Admin quản lý danh mục hỗ trợ chung của toàn trường
  * `[M04-02]` Trưởng phòng quản lý danh mục hỗ trợ riêng của phòng ban
* **[M05-khoi-tao-ticket/](GD2/Moc2-KhoiTaoTicket/M05-khoi-tao-ticket/) — [M05] Tạo Form Ticket (0/3)** ([prd.md](GD2/Moc2-KhoiTaoTicket/M05-khoi-tao-ticket/prd.md) | [Khoi-tao-ticket.md](GD2/Moc2-KhoiTaoTicket/M05-khoi-tao-ticket/Khoi-tao-ticket.md))

  * `[M05-01]` Chọn phòng ban, danh mục hoặc "Khác"
  * `[M05-02]` Nhập thông tin, đính kèm file và gửi Ticket
  * `[M05-03]` Sinh viên chỉnh sửa Tiêu đề và Nội dung khi đơn chưa được tiếp nhận (trạng thái New)

#### ⚙️ Mốc 3: Xử lí & Bổ sung (`GD2/Moc3-XuLi&BoSung/`)

* **[M06-tiep-nhan-ticket/](GD2/Moc3-XuLi&BoSung/M06-tiep-nhan-ticket/) — [M06] Tiếp nhận Ticket (0/2)** ([prd.md](GD2/Moc3-XuLi&BoSung/M06-tiep-nhan-ticket/prd.md) | [Tiep-nhan-ticket.md](GD2/Moc3-XuLi&BoSung/M06-tiep-nhan-ticket/Tiep-nhan-ticket.md))

  * `[M06-01]` Nhân viên xem danh sách đơn mới của phòng ban
  * `[M06-02]` Nhân viên nhận xử lý đơn và hệ thống chặn lỗi hai người nhận cùng một đơn
* **[M07-xu-ly-trao-doi/](GD2/Moc3-XuLi&BoSung/M07-xu-ly-trao-doi/) — [M07] Xử lý & Bổ sung (0/4)** ([prd.md](GD2/Moc3-XuLi&BoSung/M07-xu-ly-trao-doi/prd.md) | [Xu-ly-trao-doi.md](GD2/Moc3-XuLi&BoSung/M07-xu-ly-trao-doi/Xu-ly-trao-doi.md))

  * `[M07-01]` Nhân viên cập nhật tiến độ, ghi chú và lưu lịch sử xử lý đơn
  * `[M07-02]` Nhân viên xem lại danh sách lịch sử các đơn mình đã xử lý
  * `[M07-03]` Nhân viên yêu cầu sinh viên bổ sung hồ sơ và bắt đầu đếm ngược 3 ngày làm việc
  * `[M07-04]` Nhân viên báo cáo và trả lại đơn do bị gửi sai phòng ban
* **[M08-tra-ket-qua/](GD2/Moc3-XuLi&BoSung/M08-tra-ket-qua/) — [M08] Trả kết quả (0/2)** ([prd.md](GD2/Moc3-XuLi&BoSung/M08-tra-ket-qua/prd.md) | [Tra-ket-qua.md](GD2/Moc3-XuLi&BoSung/M08-tra-ket-qua/Tra-ket-qua.md))

  * `[M08-01]` Nhân viên nhập kết quả giải quyết và đính kèm tệp trả lời
  * `[M08-02]` Hoàn thành đơn và tự động gửi thông báo kết quả cho sinh viên
* **[M11-quan-ly-dieu-phoi/](GD2/Moc3-XuLi&BoSung/M11-quan-ly-dieu-phoi/) — [M11] Điều phối (0/3)** ([prd.md](GD2/Moc3-XuLi&BoSung/M11-quan-ly-dieu-phoi/prd.md) | [Quan-ly-dieu-phoi.md](GD2/Moc3-XuLi&BoSung/M11-quan-ly-dieu-phoi/Quan-ly-dieu-phoi.md))

  * `[M11-01]` Admin phân loại và chuyển các đơn mục 'Khác' về đúng phòng ban
  * `[M11-02]` Admin chuyển lại các đơn bị báo sai phòng ban về đúng nơi
  * `[M11-03]` Trưởng phòng phân công người xử lý đơn trong nội bộ phòng ban

#### 🎓 Mốc 4: Phân Hệ Sinh viên (`GD2/Moc4-PhanHeSinhVien/`)

* **[M09-theo-doi-bo-sung/](GD2/Moc4-PhanHeSinhVien/M09-theo-doi-bo-sung/) — [M09] Theo dõi & Bổ sung (0/2)** ([prd.md](GD2/Moc4-PhanHeSinhVien/M09-theo-doi-bo-sung/prd.md) | [Theo-doi-bo-sung.md](GD2/Moc4-PhanHeSinhVien/M09-theo-doi-bo-sung/Theo-doi-bo-sung.md))

  * `[M09-01]` Sinh viên xem, tìm kiếm và theo dõi các đơn mình đã gửi
  * `[M09-02]` Sinh viên nộp bổ sung thông tin và giấy tờ theo yêu cầu
* **[M10-ket-qua-danh-gia/](GD2/Moc4-PhanHeSinhVien/M10-ket-qua-danh-gia/) — [M10] Kết quả & Đánh giá (0/3)** ([prd.md](GD2/Moc4-PhanHeSinhVien/M10-ket-qua-danh-gia/prd.md) | [Ket-qua-danh-gia.md](GD2/Moc4-PhanHeSinhVien/M10-ket-qua-danh-gia/Ket-qua-danh-gia.md))

  * `[M10-01]` Sinh viên xem kết quả giải quyết và tải tệp trả lời
  * `[M10-02]` Sinh viên đánh giá độ hài lòng từ 1 đến 5 sao, nhận xét và đóng đơn
  * `[M10-03]` Hệ thống tự động đóng đơn nếu sinh viên không đánh giá sau 3 ngày làm việc

---

### 📊 GIAI ĐOẠN 3 — ĐIỀU PHỐI, GIÁM SÁT & BÁO CÁO TOÀN TRƯỜNG (`GD3/`)

#### 📈 Mốc 5: Giám sát & Dashboard (`GD3/Moc5-GiamSat&Dashboard/`)

* **[M12-giam-sat-tien-do/](GD3/Moc5-GiamSat&Dashboard/M12-giam-sat-tien-do/) — [M12] Theo dõi tiến độ (0/4)** ([prd.md](GD3/Moc5-GiamSat&Dashboard/M12-giam-sat-tien-do/prd.md) | [Giam-sat-tien-do.md](GD3/Moc5-GiamSat&Dashboard/M12-giam-sat-tien-do/Giam-sat-tien-do.md))

  * `[M12-01]` Theo dõi khối lượng công việc của từng nhân viên trong phòng ban
  * `[M12-02]` Tô đỏ cảnh báo các đơn sắp quá hạn hoặc bị tồn đọng lâu
  * `[M12-03]` Admin theo dõi các phòng ban đang bị tồn đọng nhiều đơn nhất
  * `[M12-04]` Admin tìm kiếm và tra cứu chi tiết mọi đơn trên toàn trường
* **[M13-dashboard-bao-cao/](GD3/Moc5-GiamSat&Dashboard/M13-dashboard-bao-cao/) — [M13] Dashboard & báo cáo (0/4)** ([prd.md](GD3/Moc5-GiamSat&Dashboard/M13-dashboard-bao-cao/prd.md) | [Dashboard-bao-cao.md](GD3/Moc5-GiamSat&Dashboard/M13-dashboard-bao-cao/Dashboard-bao-cao.md))

  * `[M13-01]` Hiển thị bảng thống kê tổng quan và biểu đồ số lượng đơn
  * `[M13-02]` Hiển thị dữ liệu thống kê đúng theo quyền của Trưởng phòng và Admin
  * `[M13-03]` Xuất báo cáo số liệu ra file Excel và PDF
  * `[M13-04]` Thống kê điểm đánh giá hài lòng và hiệu suất làm việc của nhân viên
