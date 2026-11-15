# BẢNG PHÂN CHIA GIAI ĐOẠN — DỰ ÁN UNISUPPORT

> **Baseline milestone hiện hành:** [Báo cáo điều chỉnh kế hoạch triển khai](../08-project/Dieu-chinh-proposal.md), gồm `MS-00` đến `MS-04`.
>
> **Quy mô hệ thống:** 5 milestone • 13 module thực thi (`M01`–`M13`) • 40 FR trong PRD + 1 task hạ tầng (`INF-01`) • 4 vai trò. Số GitHub Issue thực tế phải đối chiếu trên công cụ quản lý, không suy ra từ tổng FR.
>
> **Phân bổ module theo baseline:**
>
> - **MS-00 — Khởi động:** khảo sát, đặc tả, thiết kế, database và nền tảng (`INF-01`).
> - **MS-01 — Nền tảng:** `M01`, `M02`, `M03`.
> - **MS-02 — Ticket và Phân hệ sinh viên:** `M04` đến `M11`.
> - **MS-03 — Giám sát Dashboard:** `M12`, `M13`.
> - **MS-04 — Bàn giao dự án:** nghiệm thu, chuẩn bị tài liệu và bàn giao.
>
> **Nguyên tắc cốt lõi:** phạm vi và thời gian của milestone lấy theo baseline hiện hành; các module bên dưới là nơi gốc của FR.

---

## 1. Bảng tổng quan milestone và module

| Milestone | Thời gian | Phạm vi module | Số FR / hạ tầng |
| :--- | :---: | :--- | :---: |
| **MS-00 — Khởi động** | Tuần 1–3 | `INF-01` | 1 hạ tầng |
| **MS-01 — Nền tảng** | Tuần 4–6 | `M01`, `M02`, `M03` | 11 FR |
| **MS-02 — Ticket và Phân hệ sinh viên** | Tuần 7–11 | `M04`, `M05`, `M06`, `M07`, `M08`, `M09`, `M10`, `M11` | 21 FR |
| **MS-03 — Giám sát Dashboard** | Tuần 12–14 | `M12`, `M13` | 8 FR |
| **MS-04 — Bàn giao dự án** | Tuần 15–16 | Nghiệm thu, tài liệu và bàn giao | — |

---

## 2. Danh mục FR theo milestone

### MS-00 — KHỞI ĐỘNG

- **`INF-01`** Thiết lập cơ sở hạ tầng và môi trường triển khai hệ thống UniSupport.

### MS-01 — NỀN TẢNG HỆ THỐNG

#### M01 — Đăng nhập và Xác thực

- [PRD](M01-dang-nhap-xac-thuc/prd.md)
- [Tài liệu module](M01-dang-nhap-xac-thuc/Dang-nhap-xac-thuc.md)


  * `[M01-01]` Đăng nhập vào hệ thống
  * `[M01-02]` Khóa tài khoản 15 phút khi nhập sai mật khẩu 5 lần liên tiếp
  * `[M01-03]` Lấy lại mật khẩu qua Email dành riêng cho Admin
  * `[M01-04]` Tự động chuyển trang phù hợp với quyền hạn sau khi đăng nhập
  * `[M01-05]` Chặn truy cập trái phép và tự động văng tài khoản khi bị khóa
* **[M02-vai-tro-phan-quyen/](M02-vai-tro-phan-quyen/) — [M02] Vai trò & Phân quyền (2 FR)** ([prd.md](M02-vai-tro-phan-quyen/prd.md) | [Vai-tro-phan-quyen.md](M02-vai-tro-phan-quyen/Vai-tro-phan-quyen.md))

  * `[M02-01]` Xem danh sách 4 vai trò của hệ thống
  * `[M02-02]` Cài đặt và phân quyền chức năng chi tiết cho từng vai trò
* **[M03-quan-ly-tai-khoan/](M03-quan-ly-tai-khoan/) — [M03] Quản lý tài khoản (4 FR)** ([prd.md](M03-quan-ly-tai-khoan/prd.md) | [Quan-ly-tai-khoan.md](M03-quan-ly-tai-khoan/Quan-ly-tai-khoan.md))

  * `[M03-01]` Xem, tìm kiếm và lọc danh sách tài khoản
  * `[M03-02]` Tạo mới tài khoản
  * `[M03-03]` Cập nhật thông tin và Khóa/Mở khóa tài khoản
  * `[M03-04]` Thêm tài khoản hàng loạt bằng file Excel

---

### MS-02 — TICKET VÀ PHÂN HỆ SINH VIÊN

#### M04 — Quản lý danh mục và M05 — Khởi tạo Ticket

* **[M04-quan-ly-danh-muc/](M04-quan-ly-danh-muc/) — [M04] Quản lý danh mục (2 FR)** ([prd.md](M04-quan-ly-danh-muc/prd.md) | [Quan-ly-danh-muc.md](M04-quan-ly-danh-muc/Quan-ly-danh-muc.md))

  * `[M04-01]` Admin quản lý danh mục hỗ trợ chung của toàn trường
  * `[M04-02]` Trưởng phòng quản lý danh mục hỗ trợ riêng của phòng ban
* **[M05-khoi-tao-ticket/](M05-khoi-tao-ticket/) — [M05] Tạo Form Ticket (3 FR)** ([prd.md](M05-khoi-tao-ticket/prd.md) | [Khoi-tao-ticket.md](M05-khoi-tao-ticket/Khoi-tao-ticket.md))

  * `[M05-01]` Chọn phòng ban, danh mục hoặc "Khác"
  * `[M05-02]` Nhập thông tin, đính kèm file và gửi Ticket
  * `[M05-03]` Sinh viên chỉnh sửa Tiêu đề, Nội dung và tệp đính kèm khi đơn chưa được tiếp nhận (trạng thái New)

#### M06, M07, M08 và M11 — Tiếp nhận, xử lý, trả kết quả và điều phối

* **[M06-tiep-nhan-ticket/](M06-tiep-nhan-ticket/) — [M06] Tiếp nhận Ticket (2 FR)** ([prd.md](M06-tiep-nhan-ticket/prd.md) | [Tiep-nhan-ticket.md](M06-tiep-nhan-ticket/Tiep-nhan-ticket.md))

  * `[M06-01]` Nhân viên xem danh sách đơn mới của phòng ban
  * `[M06-02]` Nhân viên nhận xử lý đơn và hệ thống chặn lỗi hai người nhận cùng một đơn
* **[M07-xu-ly-trao-doi/](M07-xu-ly-trao-doi/) — [M07] Xử lý & Bổ sung (4 FR)** ([prd.md](M07-xu-ly-trao-doi/prd.md) | [Xu-ly-trao-doi.md](M07-xu-ly-trao-doi/Xu-ly-trao-doi.md))

  * `[M07-01]` Nhân viên cập nhật tiến độ, ghi chú và lưu lịch sử xử lý đơn
  * `[M07-02]` Nhân viên xem lại danh sách lịch sử các đơn mình đã xử lý
  * `[M07-03]` Nhân viên yêu cầu sinh viên bổ sung hồ sơ và bắt đầu đếm ngược 3 ngày làm việc
  * `[M07-04]` Nhân viên báo cáo và trả lại đơn do bị gửi sai phòng ban
* **[M08-tra-ket-qua/](M08-tra-ket-qua/) — [M08] Trả kết quả (2 FR)** ([prd.md](M08-tra-ket-qua/prd.md) | [Tra-ket-qua.md](M08-tra-ket-qua/Tra-ket-qua.md))

  * `[M08-01]` Nhân viên nhập kết quả giải quyết và đính kèm tệp trả lời
  * `[M08-02]` Hoàn thành đơn và tự động gửi thông báo kết quả cho sinh viên
* **[M11-quan-ly-dieu-phoi/](M11-quan-ly-dieu-phoi/) — [M11] Điều phối (3 FR)** ([prd.md](M11-quan-ly-dieu-phoi/prd.md) | [Quan-ly-dieu-phoi.md](M11-quan-ly-dieu-phoi/Quan-ly-dieu-phoi.md))

  * `[M11-01]` Admin phân loại và chuyển các đơn mục 'Khác' về đúng phòng ban
  * `[M11-02]` Admin chuyển lại các đơn bị báo sai phòng ban về đúng nơi
  * `[M11-03]` Trưởng phòng phân công người xử lý đơn trong nội bộ phòng ban

#### M09 và M10 — Theo dõi, bổ sung, kết quả và đánh giá

* **[M09-theo-doi-bo-sung/](M09-theo-doi-bo-sung/) — [M09] Theo dõi & Bổ sung (2 FR)** ([prd.md](M09-theo-doi-bo-sung/prd.md) | [Theo-doi-bo-sung.md](M09-theo-doi-bo-sung/Theo-doi-bo-sung.md))

  * `[M09-01]` Sinh viên xem, tìm kiếm và theo dõi các đơn mình đã gửi
  * `[M09-02]` Sinh viên nộp bổ sung thông tin và giấy tờ theo yêu cầu
* **[M10-ket-qua-danh-gia/](M10-ket-qua-danh-gia/) — [M10] Kết quả & Đánh giá (3 FR)** ([prd.md](M10-ket-qua-danh-gia/prd.md) | [Ket-qua-danh-gia.md](M10-ket-qua-danh-gia/Ket-qua-danh-gia.md))

  * `[M10-01]` Sinh viên xem kết quả giải quyết và tải tệp trả lời
  * `[M10-02]` Sinh viên đánh giá độ hài lòng từ 1 đến 5 sao, nhận xét và đóng đơn
  * `[M10-03]` Hệ thống tự động đóng đơn nếu sinh viên không đánh giá sau 3 ngày làm việc

---

### MS-03 — GIÁM SÁT VÀ DASHBOARD

#### M12 và M13 — Giám sát tiến độ, dashboard và báo cáo

* **[M12-giam-sat-tien-do/](M12-giam-sat-tien-do/) — [M12] Theo dõi tiến độ (4 FR)** ([prd.md](M12-giam-sat-tien-do/prd.md) | [Giam-sat-tien-do.md](M12-giam-sat-tien-do/Giam-sat-tien-do.md))

  * `[M12-01]` Theo dõi khối lượng công việc của từng nhân viên trong phòng ban
  * `[M12-02]` Tô đỏ cảnh báo các đơn sắp quá hạn hoặc bị tồn đọng lâu
  * `[M12-03]` Admin theo dõi các phòng ban đang bị tồn đọng nhiều đơn nhất
  * `[M12-04]` Admin tìm kiếm và tra cứu chi tiết mọi đơn trên toàn trường
* **[M13-dashboard-bao-cao/](M13-dashboard-bao-cao/) — [M13] Dashboard & báo cáo (4 FR)** ([prd.md](M13-dashboard-bao-cao/prd.md) | [Dashboard-bao-cao.md](M13-dashboard-bao-cao/Dashboard-bao-cao.md))

  * `[M13-01]` Hiển thị bảng thống kê tổng quan và biểu đồ số lượng đơn
  * `[M13-02]` Hiển thị dữ liệu thống kê đúng theo quyền của Trưởng phòng và Admin
  * `[M13-03]` Xuất báo cáo số liệu ra file Excel và PDF
  * `[M13-04]` Thống kê điểm đánh giá hài lòng và hiệu suất làm việc của nhân viên
