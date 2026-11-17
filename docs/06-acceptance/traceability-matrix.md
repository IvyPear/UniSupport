# MA TRẬN TRUY VẾT YÊU CẦU (REQUIREMENTS TRACEABILITY MATRIX - RTM)

> **Dự án:** UniSupport — Hệ thống quản lý hỗ trợ sinh viên  
> **Nguyên tắc chuẩn:** Bảng này tổng hợp chuỗi liên kết theo từng Tiêu chí nghiệm thu (`AC`), **không phải nơi gốc** để sửa nội dung. Mọi chỉnh sửa phải thực hiện tại nơi gốc (`prd.md`, `test-scenarios.md`, `Bao-gia-cho-khach.md`, `Master-schedule.md`, GitHub Issues) trước, sau đó mới đồng bộ lại bảng này.

---

## 1. Quy chiếu Nơi gốc của Chuỗi Truy vết

- **Tiêu chí nghiệm thu (`FR-Mxx-yy/AC-zz`):** Nơi gốc tại `docs/03-modules/Mxx-.../prd.md`.
- **Kịch bản kiểm thử (`TC-Mxx-...`):** Nơi gốc tại [test-scenarios.md](test-scenarios.md) (mỗi `AC` đều có ít nhất một mã kịch bản kiểm thử cụ thể kiểm chứng).
- **Parent Task (`#...`):** Nơi gốc trên GitHub Issues (khởi tạo theo mẫu `.github/ISSUE_TEMPLATE/1-parent-task.md`).
- **Milestone (`MS-00` – `MS-04`):** Nơi gốc tại [Dieu-chinh-proposal.md](../08-project/Dieu-chinh-proposal.md) và [Master-schedule.md](../08-project/Master-schedule.md).
- **Hạng mục báo giá:** Nơi gốc tại [Bao-gia-cho-khach.md](../08-project/Bao-gia-cho-khach.md) (gắn mã `Q-01` đến `Q-13` tương ứng với 13 phân hệ).

---

## 2. Bảng Truy vết Tổng hợp theo từng AC

### 2.1. MS-01 — Nền tảng (`M01`, `M02`, `M03`)

| Mã AC | Mô tả tóm tắt (từ PRD) | Kịch bản Test (`test-scenarios.md`) | Parent Task (GitHub Issue) | Milestone | Hạng mục Báo giá |
| :--- | :--- | :--- | :---: | :---: | :---: |
| `FR-M01-01/AC-01` | Đăng nhập đúng cấp JWT 8 tiếng | `TC-M01-N03` | `#135` (`#86`) | `MS-01` | Q-01 (M01) |
| `FR-M01-01/AC-02` | Nhập sai thông tin (`401`), bỏ trống (`422`) hoặc `Inactive` (`403`) báo lỗi, không cấp token | `TC-M01-N04`, `TC-M01-N02` | `#135` (`#86`) | `MS-01` | Q-01 (M01) |
| `FR-M01-01/AC-03` | Không hiển thị nút Đăng ký | `TC-M01-M01` | `#135` (`#86`) | `MS-01` | Q-01 (M01) |
| `FR-M01-01/AC-04` | Đăng nhập sau khi Admin đặt lại mật khẩu (`must_change_password = true`) buộc đổi mật khẩu | `TC-M03-N01` | `#135` (`#86`) | `MS-01` | Q-01 (M01) |
| `FR-M01-02/AC-01` | Nhập sai 5 lần liên tiếp khóa tạm 15 phút, chặn đăng nhập trong lúc khóa | `TC-M01-N01` | `#135` (`#87`) | `MS-01` | Q-01 (M01) |
| `FR-M01-02/AC-02` | Hết 15 phút tự mở khóa và đăng nhập lại được | `TC-M01-M02` | `#135` (`#87`) | `MS-01` | Q-01 (M01) |
| `FR-M01-02/AC-03` | Nhập đúng ở lần thứ 5 thì reset bộ đếm lỗi về 0 | `TC-M01-E01` | `#135` (`#87`) | `MS-01` | Q-01 (M01) |
| `FR-M01-03/AC-01` | Admin đặt lại mật khẩu qua liên kết email hợp lệ | `TC-M01-M03` | `#135` (`#88`) | `MS-01` | Q-01 (M01) |
| `FR-M01-03/AC-02` | Liên kết quá 15 phút/đã dùng hoặc mật khẩu mới yếu bị từ chối | `TC-M01-N05` | `#135` (`#88`) | `MS-01` | Q-01 (M01) |
| `FR-M01-03/AC-03` | Sinh viên/Nhân viên bị từ chối dùng luồng khôi phục của Admin | `TC-M01-N06` | `#135` (`#88`) | `MS-01` | Q-01 (M01) |
| `FR-M01-04/AC-01` | Không có cờ đổi mật khẩu thì chuyển thẳng về trang theo vai trò | `TC-M01-M04` | `#135` (`#89`) | `MS-01` | Q-01 (M01) |
| `FR-M01-04/AC-02` | Có cờ `must_change_password = true` buộc đổi mật khẩu trước | `TC-M03-N01` | `#135` (`#89`) | `MS-01` | Q-01 (M01) |
| `FR-M01-05/AC-01` | Truy cập URL trái quyền hoặc tài khoản `INACTIVE` bị chặn `403` | `TC-M01-N02` | `#135` (`#90`) | `MS-01` | Q-01 (M01) |
| `FR-M01-05/AC-02` | Tài khoản bị Admin khóa hoặc hết hạn JWT 8 tiếng lập tức văng khỏi phiên | `TC-M01-N07` | `#135` (`#90`) | `MS-01` | Q-01 (M01) |
| `FR-M02-01/AC-01` | Hiển thị 4 vai trò chuẩn, số lượng tài khoản và chặn xóa/đổi mã vai trò | `TC-M02-M01` | `#136` (`#91`) | `MS-01` | Q-02 (M02) |
| `FR-M02-02/AC-01` | Bật/tắt quyền hạn áp dụng ngay cho người dùng thuộc vai trò đó | `TC-M02-N01` | `#136` (`#92`) | `MS-01` | Q-02 (M02) |
| `FR-M02-02/AC-02` | Chặn tước quyền Quản trị tài khoản/phân quyền của Admin chính (`400 Bad Request`) | `TC-M02-N02` | `#136` (`#92`) | `MS-01` | Q-02 (M02) |
| `FR-M03-01/AC-01` | Tìm kiếm theo Mã định danh hoặc Họ tên (không phân biệt hoa/thường) | `TC-M03-M01` | `#137` (`#93`) | `MS-01` | Q-03 (M03) |
| `FR-M03-01/AC-02` | Lọc kết hợp Phòng ban/Vai trò/Trạng thái và phân trang 20 dòng | `TC-M03-M02` | `#137` (`#93`) | `MS-01` | Q-03 (M03) |
| `FR-M03-02/AC-01` | Tạo tài khoản hợp lệ đăng nhập bằng mật khẩu mặc định | `TC-M03-M03` | `#137` (`#94`) | `MS-01` | Q-03 (M03) |
| `FR-M03-02/AC-02` | Trùng Mã định danh, trùng Email hoặc thiếu trường bắt buộc bị chặn | `TC-M03-N02` | `#137` (`#94`) | `MS-01` | Q-03 (M03) |
| `FR-M03-03/AC-01` | Khóa tài khoản đăng xuất ngay; chặn xóa cứng tài khoản có Ticket hoặc khóa Admin chính | `TC-M01-N02`, `TC-M03-N03` | `#137` (`#95`) | `MS-01` | Q-03 (M03) |
| `FR-M03-03/AC-02` | Mở khóa tài khoản cho phép đăng nhập lại bình thường | `TC-M03-M04` | `#137` (`#95`) | `MS-01` | Q-03 (M03) |
| `FR-M03-03/AC-03` | Admin reset mật khẩu bật cờ bắt buộc đổi mật khẩu ở lần đăng nhập kế tiếp | `TC-M03-N01` | `#137` (`#95`) | `MS-01` | Q-03 (M03) |
| `FR-M03-04/AC-01` | Import file Excel hợp lệ khởi tạo và cập nhật danh sách tài khoản | `TC-M03-M05` | `#137` (`#96`) | `MS-01` | Q-03 (M03) |
| `FR-M03-04/AC-02` | Hiển thị số dòng thành công/thất bại; chặn nếu file sai cấu trúc cột | `TC-M03-N04` | `#137` (`#96`) | `MS-01` | Q-03 (M03) |

### 2.2. MS-02 — Ticket và Phân hệ sinh viên (`M04` – `M11`)

| Mã AC | Mô tả tóm tắt (từ PRD) | Kịch bản Test (`test-scenarios.md`) | Parent Task (GitHub Issue) | Milestone | Hạng mục Báo giá |
| :--- | :--- | :--- | :---: | :---: | :---: |
| `FR-M04-01/AC-01` | Admin tạo danh mục chung hiển thị cho Sinh viên chọn | `TC-M04-M01` | `#138` (`#97`) | `MS-02` | Q-04 (M04) |
| `FR-M04-01/AC-02` | Trùng Mã danh mục hoặc SLA không hợp lệ báo lỗi và chặn lưu | `TC-M04-N01` | `#138` (`#97`) | `MS-02` | Q-04 (M04) |
| `FR-M04-01/AC-03` | Tắt hiển thị danh mục (`false`) ẩn khỏi form tạo mới, giữ nguyên đơn cũ | `TC-M04-M02` | `#138` (`#97`) | `MS-02` | Q-04 (M04) |
| `FR-M04-02/AC-01` | Trưởng phòng tạo danh mục riêng theo phòng ban, chặn sửa phòng khác | `TC-M04-M03` | `#138` (`#98`) | `MS-02` | Q-04 (M04) |
| `FR-M05-01/AC-01` | Chọn đúng phòng ban và danh mục hiển thị hướng dẫn thủ tục | `TC-M05-M01` | `#130` (`#133`) | `MS-02` | Q-05 (M05) |
| `FR-M05-01/AC-02` | Chọn mục "Khác" cho phép nhập nội dung không cần chọn phòng ban | `TC-M05-M02` | `#130` (`#133`) | `MS-02` | Q-05 (M05) |
| `FR-M05-02/AC-01` | Gửi đơn hợp lệ sinh mã Ticket chuẩn, trạng thái `New` | `TC-M05-M03` | `#130` (`#134`) | `MS-02` | Q-05 (M05) |
| `FR-M05-02/AC-02` | Dữ liệu không hợp lệ hoặc file > 5MB / sai định dạng bị chặn | `TC-M05-N01`, `TC-M05-N02`, `TC-M05-N03` | `#130` (`#134`) | `MS-02` | Q-05 (M05) |
| `FR-M05-03/AC-01` | Sửa tiêu đề, nội dung khi Ticket ở trạng thái `New` | `TC-M05-N06` | `#130` | `MS-02` | Q-05 (M05) |
| `FR-M05-03/AC-02` | Khóa hoàn toàn trường Phòng ban và Danh mục khi sửa | `TC-M05-N05` | `#130` | `MS-02` | Q-05 (M05) |
| `FR-M05-03/AC-03` | Chặn chỉnh sửa khi Ticket đã sang `In Progress` (`400 Bad Request`) | `TC-M05-N04` | `#130` | `MS-02` | Q-05 (M05) |
| `FR-M05-03/AC-04` | Thêm/xóa tệp đính kèm hợp lệ khi còn `New` và ghi lịch sử | `TC-M05-N06` | `#130` | `MS-02` | Q-05 (M05) |
| `FR-M06-01/AC-01` | Hiển thị đơn `New` thuộc đúng phòng ban của nhân viên, chặn phòng khác | `TC-M06-M01` | `#140` (`#100`) | `MS-02` | Q-06 (M06) |
| `FR-M06-02/AC-01` | Nhân viên đúng phòng ban nhận đơn chuyển sang `In Progress`; chặn khác phòng | `TC-M06-M02`, `TC-M06-N02` | `#140` (`#101`) | `MS-02` | Q-06 (M06) |
| `FR-M06-02/AC-02` | Hai nhân viên cùng bấm nhận 1 đơn chỉ 1 người thành công | `TC-M06-E01` | `#140` (`#101`) | `MS-02` | Q-06 (M06) |
| `FR-M07-01/AC-01` | Cập nhật tiến độ công khai hiển thị cho Sinh viên và Quản lý | `TC-M07-M01` | `#141` (`#102`) | `MS-02` | Q-07 (M07) |
| `FR-M07-01/AC-02` | Ghi chú nội bộ chỉ hiển thị cho Nhân viên/Trưởng phòng, ẩn với Sinh viên | `TC-M07-M02` | `#141` (`#102`) | `MS-02` | Q-07 (M07) |
| `FR-M07-02/AC-01` | Xem danh sách Ticket đã xử lý kèm Audit Trail và CSAT | `TC-M07-M03` | `#141` (`#103`) | `MS-02` | Q-07 (M07) |
| `FR-M07-03/AC-01` | Yêu cầu bổ sung chuyển sang `Pending`, đếm ngược 3 ngày làm việc | `TC-M07-E02` | `#141` (`#104`) | `MS-02` | Q-07 (M07) |
| `FR-M07-03/AC-02` | Quá 3 ngày làm việc không bổ sung tự động chuyển `Closed` | `TC-M07-E03` | `#141` (`#104`) | `MS-02` | Q-07 (M07) |
| `FR-M07-03/AC-03` | Giới hạn yêu cầu bổ sung tối đa 1 lần cho mỗi Ticket | `TC-M07-N01` | `#141` (`#104`) | `MS-02` | Q-07 (M07) |
| `FR-M07-04/AC-01` | Báo sai phòng ban kèm lý do chuyển về Hàng chờ Admin | `TC-M07-M04` | `#141` (`#105`) | `MS-02` | Q-07 (M07) |
| `FR-M08-01/AC-01` | Lưu kết quả giải quyết và tệp đính kèm trả lời | `TC-M08-M01` | `#143` (`#106`) | `MS-02` | Q-08 (M08) |
| `FR-M08-01/AC-02` | Để trống trường kết quả bị chặn hoàn thành | `TC-M08-N01` | `#143` (`#106`) | `MS-02` | Q-08 (M08) |
| `FR-M08-01/AC-03` | Tải tệp kết quả > 5MB hoặc sai định dạng bị chặn và cảnh báo lỗi | `TC-M08-N02` | `#143` (`#106`) | `MS-02` | Q-08 (M08) |
| `FR-M08-02/AC-01` | Chuyển trạng thái `Resolved` và gửi 1 thông báo duy nhất cho sinh viên | `TC-M08-M02` | `#143` (`#107`) | `MS-02` | Q-08 (M08) |
| `FR-M09-01/AC-01` | Hiển thị danh sách Ticket của sinh viên kèm trạng thái thực, chặn xem đơn người khác | `TC-M09-M01` | `#144` (`#108`) | `MS-02` | Q-09 (M09) |
| `FR-M09-01/AC-02` | Tìm kiếm và lọc Ticket theo trạng thái | `TC-M09-M02` | `#144` (`#108`) | `MS-02` | Q-09 (M09) |
| `FR-M09-02/AC-01` | Nộp bổ sung hợp lệ chuyển về `In Progress`, chặn nộp khi đã đóng | `TC-M09-M03`, `TC-M09-N04` | `#144` (`#109`) | `MS-02` | Q-09 (M09) |
| `FR-M10-01/AC-01` | Xem văn bản kết quả xử lý và tải tệp đính kèm | `TC-M10-M01` | `#146` (`#110`) | `MS-02` | Q-10 (M10) |
| `FR-M10-02/AC-01` | Đánh giá CSAT 1–5 sao, chuyển trạng thái `Closed` và khóa vĩnh viễn | `TC-M10-M02`, `TC-M10-N02`, `TC-M10-E03` | `#146` (`#111`) | `MS-02` | Q-10 (M10) |
| `FR-M10-02/AC-02` | Chưa chọn sao mà bấm gửi thì báo lỗi yêu cầu chọn sao | `TC-M10-N01` | `#146` (`#111`) | `MS-02` | Q-10 (M10) |
| `FR-M10-03/AC-01` | Quá 3 ngày làm việc ở `Resolved` tự động chuyển `Closed` (`rating = null`) | `TC-M10-E04` | `#146` (`#112`) | `MS-02` | Q-10 (M10) |
| `FR-M11-01/AC-01` | Admin phân loại đơn mục "Khác" về đúng phòng ban đích | `TC-M11-M01` | `#145` (`#113`) | `MS-02` | Q-11 (M11) |
| `FR-M11-02/AC-01` | Admin điều chuyển đơn bị báo sai phòng ban và lưu lịch sử | `TC-M11-M02` | `#145` (`#114`) | `MS-02` | Q-11 (M11) |
| `FR-M11-03/AC-01` | Trưởng phòng phân công / Re-assign nhân viên trong phòng ban | `TC-M11-N01`, `TC-M11-E02` | `#145` (`#115`) | `MS-02` | Q-11 (M11) |

### 2.3. MS-03 — Giám sát Dashboard (`M12`, `M13`)

| Mã AC | Mô tả tóm tắt (từ PRD) | Kịch bản Test (`test-scenarios.md`) | Parent Task (GitHub Issue) | Milestone | Hạng mục Báo giá |
| :--- | :--- | :--- | :---: | :---: | :---: |
| `FR-M12-01/AC-01` | Hiển thị khối lượng công việc nhân viên trong phòng ban; chặn phòng khác | `TC-M12-M01`, `TC-M12-N02` | `#139` (`#116`) | `MS-03` | Q-12 (M12) |
| `FR-M12-02/AC-01` | Cảnh báo vàng khi chạm $\ge 80\%$ SLA và tô đỏ khi vượt SLA | `TC-M12-N01` | `#139` (`#117`) | `MS-03` | Q-12 (M12) |
| `FR-M12-03/AC-01` | Admin xem danh sách phòng ban tồn đọng nhiều đơn nhất | `TC-M12-M02` | `#139` (`#118`) | `MS-03` | Q-12 (M12) |
| `FR-M12-04/AC-01` | Admin tra cứu chi tiết mọi đơn trên toàn trường theo Mã Ticket | `TC-M12-M03` | `#139` (`#119`) | `MS-03` | Q-12 (M12) |
| `FR-M13-01/AC-01` | Biểu đồ và thẻ chỉ số hiển thị số liệu theo mốc thời gian | `TC-M13-M01`, `TC-M13-E02` | `#142` (`#120`) | `MS-03` | Q-13 (M13) |
| `FR-M13-02/AC-01` | Trưởng phòng chỉ xem được thống kê thuộc phòng ban mình | `TC-M13-N01` | `#142` (`#121`) | `MS-03` | Q-13 (M13) |
| `FR-M13-02/AC-02` | Admin xem được toàn bộ số liệu của tất cả phòng ban | `TC-M13-M02` | `#142` (`#121`) | `MS-03` | Q-13 (M13) |
| `FR-M13-03/AC-01` | Xuất báo cáo ra file Excel/PDF đầy đủ dữ liệu | `TC-M13-M03` | `#142` (`#122`) | `MS-03` | Q-13 (M13) |
| `FR-M13-04/AC-01` | Thống kê điểm CSAT và KPI hiệu suất nhân viên | `TC-M13-M04` | `#142` (`#123`) | `MS-03` | Q-13 (M13) |

### 2.4. Hạng mục Hạ tầng & Bàn giao (`MS-00`, `MS-04`)

| Mã hạng mục | Mô tả công việc | Parent Task (GitHub Issue) | Milestone | Hạng mục Báo giá |
| :--- | :--- | :---: | :---: | :---: |
| `INF-01` | Thiết lập cơ sở hạ tầng và môi trường triển khai hệ thống UniSupport | `#128` | `MS-00` | Phân bổ vào `Q-01`–`Q-13` (72h nền tảng) |
| `Docs-01` | Hoàn thiện các tài liệu mô tả hệ thống và sổ tay hướng dẫn sử dụng | `#126` | `MS-04` | Phân bổ vào `Q-01`–`Q-13` (122h UAT bàn giao) |
| `Docs-02` | Tạo dữ liệu mẫu và chuẩn bị kịch bản để chạy thử nghiệm thu dự án (UAT) | `#127` | `MS-04` | Phân bổ vào `Q-01`–`Q-13` (122h UAT bàn giao) |
