# MA TRẬN TRUY VẾT YÊU CẦU (REQUIREMENTS TRACEABILITY MATRIX - RTM)

> **Dự án:** UniSupport — Hệ thống quản lý hỗ trợ sinh viên  
> **Nguyên tắc chuẩn:** Bảng này tổng hợp chuỗi liên kết theo từng Tiêu chí nghiệm thu (`AC`), **không phải nơi gốc** để sửa nội dung. Mọi chỉnh sửa phải thực hiện tại nơi gốc (`prd.md`, `test-scenarios.md`, `Bao-gia-cho-khach.md`, `Master-schedule.md`, GitHub Issues) trước, sau đó mới đồng bộ lại bảng này.

---

## 1. Quy chiếu Nơi gốc của Chuỗi Truy vết

- **Tiêu chí nghiệm thu (`FR-Mxx-yy/AC-zz`):** Nơi gốc tại `docs/03-modules/Mxx-.../prd.md`.
- **Kịch bản kiểm thử (`TC-Mxx-...`):** Nơi gốc tại [test-scenarios.md](test-scenarios.md). Các dòng ghi *(Chờ bổ sung TC chi tiết)* thuộc nhóm kịch bản dự kiến trong tổng 180 TC tại Mục 1 của `test-scenarios.md`.
- **Parent Task (`#...`):** Nơi gốc trên GitHub Issues (khởi tạo theo mẫu `.github/ISSUE_TEMPLATE/1-parent-task.md`).
- **Milestone (`MS-00` – `MS-04`):** Nơi gốc tại [Dieu-chinh-proposal.md](../08-project/Dieu-chinh-proposal.md) và [Master-schedule.md](../08-project/Master-schedule.md).
- **Hạng mục báo giá:** Nơi gốc tại [Bao-gia-cho-khach.md](../08-project/Bao-gia-cho-khach.md) (gắn mã `Q-00` đến `Q-04` tương ứng với 5 mốc triển khai).

---

## 2. Bảng Truy vết Tổng hợp theo từng AC

### 2.1. MS-01 — Nền tảng (`M01`, `M02`, `M03`)

| Mã AC | Mô tả tóm tắt (từ PRD) | Kịch bản Test (`test-scenarios.md`) | Parent Task (GitHub Issue) | Milestone | Hạng mục Báo giá |
| :--- | :--- | :--- | :---: | :---: | :---: |
| `FR-M01-01/AC-01` | Đăng nhập đúng cấp JWT 8 tiếng | `TC-M01-N03` | `#135` (`#86`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-01/AC-02` | Nhập sai thông tin báo lỗi, không cấp quyền | `TC-M01-N04` | `#135` (`#86`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-01/AC-03` | Không hiển thị nút Đăng ký | *(Thuộc 12 TC M01 dự kiến)* | `#135` (`#86`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-01/AC-04` | Đăng nhập mật khẩu mặc định buộc đổi mật khẩu | `TC-M01-N03` | `#135` (`#86`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-02/AC-01` | Nhập sai 5 lần liên tiếp khóa tạm 15 phút | `TC-M01-N01` | `#135` (`#87`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-02/AC-02` | Hết 15 phút tự mở khóa và đăng nhập lại được | *(Thuộc 12 TC M01 dự kiến)* | `#135` (`#87`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-02/AC-03` | Nhập đúng ở lần thứ 5 thì reset bộ đếm lỗi về 0 | *(Thuộc 12 TC M01 dự kiến)* | `#135` (`#87`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-03/AC-01` | Admin đặt lại mật khẩu qua liên kết email hợp lệ | *(Thuộc 12 TC M01 dự kiến)* | `#135` (`#88`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-03/AC-02` | Liên kết quá 15 phút hoặc đã dùng bị từ chối | *(Thuộc 12 TC M01 dự kiến)* | `#135` (`#88`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-03/AC-03` | Sinh viên/Nhân viên bị từ chối dùng luồng khôi phục của Admin | *(Thuộc 12 TC M01 dự kiến)* | `#135` (`#88`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-04/AC-01` | Không có cờ đổi mật khẩu thì chuyển thẳng về trang theo vai trò | *(Thuộc 12 TC M01 dự kiến)* | `#135` (`#89`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-04/AC-02` | Có cờ `must_change_password = true` buộc đổi mật khẩu trước | `TC-M03-N01` | `#135` (`#89`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-05/AC-01` | Truy cập URL trái quyền hoặc tài khoản `INACTIVE` bị chặn `403` | `TC-M01-N02` | `#135` (`#90`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M01-05/AC-02` | Tài khoản bị Admin khóa lập tức văng khỏi phiên | *(Thuộc 12 TC M01 dự kiến)* | `#135` (`#90`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M02-01/AC-01` | Hiển thị 4 vai trò chuẩn và số lượng tài khoản | *(Thuộc 10 TC M02 dự kiến)* | `#136` (`#91`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M02-02/AC-01` | Bật/tắt quyền hạn áp dụng ngay cho vai trò, bảo vệ quyền Admin chính | `TC-M02-N01`, `TC-M02-N02` | `#136` (`#92`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-01/AC-01` | Tìm kiếm theo Mã định danh hoặc Họ tên | *(Thuộc 15 TC M03 dự kiến)* | `#137` (`#93`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-01/AC-02` | Lọc kết hợp Phòng ban/Vai trò/Trạng thái | *(Thuộc 15 TC M03 dự kiến)* | `#137` (`#93`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-02/AC-01` | Tạo tài khoản hợp lệ đăng nhập bằng mật khẩu mặc định | *(Thuộc 15 TC M03 dự kiến)* | `#137` (`#94`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-02/AC-02` | Trùng Mã định danh báo lỗi và chặn tạo mới | *(Thuộc 15 TC M03 dự kiến)* | `#137` (`#94`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-03/AC-01` | Khóa tài khoản đăng xuất ngay và chặn đăng nhập lại | `TC-M01-N02` | `#137` (`#95`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-03/AC-02` | Mở khóa tài khoản cho phép đăng nhập lại bình thường | *(Thuộc 15 TC M03 dự kiến)* | `#137` (`#95`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-03/AC-03` | Admin reset mật khẩu bật cờ bắt buộc đổi mật khẩu ở lần đăng nhập kế tiếp | `TC-M03-N01` | `#137` (`#95`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-04/AC-01` | Import file Excel hợp lệ khởi tạo danh sách tài khoản | *(Thuộc 15 TC M03 dự kiến)* | `#137` (`#96`) | `MS-01` | `Q-01` (Mốc 1) |
| `FR-M03-04/AC-02` | Hiển thị số dòng thành công và thất bại kèm lý do lỗi | *(Thuộc 15 TC M03 dự kiến)* | `#137` (`#96`) | `MS-01` | `Q-01` (Mốc 1) |

### 2.2. MS-02 — Ticket và Phân hệ sinh viên (`M04` – `M11`)

| Mã AC | Mô tả tóm tắt (từ PRD) | Kịch bản Test (`test-scenarios.md`) | Parent Task (GitHub Issue) | Milestone | Hạng mục Báo giá |
| :--- | :--- | :--- | :---: | :---: | :---: |
| `FR-M04-01/AC-01` | Admin tạo danh mục chung hiển thị cho Sinh viên chọn | *(Thuộc 12 TC M04 dự kiến)* | `#138` (`#97`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M04-01/AC-02` | Trùng Mã danh mục báo lỗi và chặn lưu | *(Thuộc 12 TC M04 dự kiến)* | `#138` (`#97`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M04-02/AC-01` | Trưởng phòng tạo danh mục riêng hiển thị theo phòng ban | *(Thuộc 12 TC M04 dự kiến)* | `#138` (`#98`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M05-01/AC-01` | Chọn đúng phòng ban và danh mục hiển thị hướng dẫn thủ tục | *(Thuộc 18 TC M05 dự kiến)* | `#130` (`#133`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M05-01/AC-02` | Chọn mục "Khác" cho phép nhập nội dung không cần chọn phòng ban | *(Thuộc 18 TC M05 dự kiến)* | `#130` (`#133`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M05-02/AC-01` | Gửi đơn hợp lệ sinh mã Ticket chuẩn, trạng thái `New` | *(Thuộc 18 TC M05 dự kiến)* | `#130` (`#134`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M05-02/AC-02` | Dữ liệu không hợp lệ hoặc file > 5MB / sai định dạng bị chặn | `TC-M05-N01`, `TC-M05-N02`, `TC-M05-N03` | `#130` (`#134`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M05-03/AC-01` | Sửa tiêu đề, nội dung khi Ticket ở trạng thái `New` | `TC-M05-N06` | `#130` | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M05-03/AC-02` | Khóa hoàn toàn trường Phòng ban và Danh mục khi sửa | `TC-M05-N05` | `#130` | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M05-03/AC-03` | Chặn chỉnh sửa khi Ticket đã sang `In Progress` (`400 Bad Request`) | `TC-M05-N04` | `#130` | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M05-03/AC-04` | Thêm/xóa tệp đính kèm hợp lệ khi còn `New` và ghi lịch sử | `TC-M05-N06` | `#130` | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M06-01/AC-01` | Hiển thị đơn `New` thuộc đúng phòng ban của nhân viên | *(Thuộc 14 TC M06 dự kiến)* | `#140` (`#100`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M06-02/AC-01` | Nhân viên đúng phòng ban nhận đơn chuyển sang `In Progress` | `TC-M06-N02` | `#140` (`#101`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M06-02/AC-02` | Hai nhân viên cùng bấm nhận 1 đơn chỉ 1 người thành công | `TC-M06-E01` | `#140` (`#101`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M07-01/AC-01` | Lưu ghi chú nội bộ và hiển thị trong timeline lịch sử | *(Thuộc 20 TC M07 dự kiến)* | `#141` (`#102`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M07-02/AC-01` | Xem danh sách Ticket đã xử lý kèm Audit Trail | *(Thuộc 20 TC M07 dự kiến)* | `#141` (`#103`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M07-03/AC-01` | Yêu cầu bổ sung chuyển sang `Pending`, đếm ngược 3 ngày làm việc | `TC-M07-E02` | `#141` (`#104`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M07-03/AC-02` | Quá 3 ngày làm việc không bổ sung tự động chuyển `Closed` | `TC-M07-E03` | `#141` (`#104`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M07-03/AC-03` | Giới hạn yêu cầu bổ sung tối đa 1 lần cho mỗi Ticket | `TC-M07-N01` | `#141` (`#104`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M07-04/AC-01` | Báo sai phòng ban kèm lý do chuyển về Hàng chờ Admin | *(Thuộc 20 TC M07 dự kiến)* | `#141` (`#105`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M08-01/AC-01` | Lưu kết quả giải quyết và tệp đính kèm trả lời | *(Thuộc 12 TC M08 dự kiến)* | `#143` (`#106`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M08-01/AC-02` | Để trống trường kết quả bị chặn hoàn thành | `TC-M08-N01` | `#143` (`#106`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M08-02/AC-01` | Chuyển trạng thái `Resolved` và gửi thông báo cho sinh viên | *(Thuộc 12 TC M08 dự kiến)* | `#143` (`#107`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M09-01/AC-01` | Hiển thị danh sách Ticket của sinh viên kèm trạng thái thực | *(Thuộc 16 TC M09 dự kiến)* | `#144` (`#108`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M09-01/AC-02` | Tìm kiếm và lọc Ticket theo trạng thái | *(Thuộc 16 TC M09 dự kiến)* | `#144` (`#108`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M09-02/AC-01` | Nộp bổ sung hợp lệ chuyển về `In Progress`, chặn nộp khi đã đóng | `TC-M09-N04` | `#144` (`#109`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M10-01/AC-01` | Xem văn bản kết quả xử lý và tải tệp đính kèm | *(Thuộc 10 TC M10 dự kiến)* | `#146` (`#110`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M10-02/AC-01` | Đánh giá CSAT 1–5 sao và chuyển trạng thái `Closed` | `TC-M10-N02`, `TC-M10-E03` | `#146` (`#111`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M10-02/AC-02` | Chưa chọn sao mà bấm gửi thì báo lỗi yêu cầu chọn sao | *(Thuộc 10 TC M10 dự kiến)* | `#146` (`#111`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M10-03/AC-01` | Quá 3 ngày làm việc ở `Resolved` tự động chuyển `Closed` | *(Thuộc 10 TC M10 dự kiến)* | `#146` (`#112`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M11-01/AC-01` | Admin phân loại đơn mục "Khác" về đúng phòng ban đích | *(Thuộc 15 TC M11 dự kiến)* | `#145` (`#113`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M11-02/AC-01` | Admin điều chuyển đơn bị báo sai phòng ban và lưu lịch sử | *(Thuộc 15 TC M11 dự kiến)* | `#145` (`#114`) | `MS-02` | `Q-02` (Mốc 2) |
| `FR-M11-03/AC-01` | Trưởng phòng phân công / Re-assign nhân viên trong phòng ban | `TC-M11-N01`, `TC-M11-E02` | `#145` (`#115`) | `MS-02` | `Q-02` (Mốc 2) |

### 2.3. MS-03 — Giám sát Dashboard (`M12`, `M13`)

| Mã AC | Mô tả tóm tắt (từ PRD) | Kịch bản Test (`test-scenarios.md`) | Parent Task (GitHub Issue) | Milestone | Hạng mục Báo giá |
| :--- | :--- | :--- | :---: | :---: | :---: |
| `FR-M12-01/AC-01` | Hiển thị khối lượng công việc nhân viên trong phòng ban | `TC-M12-N02` | `#139` (`#116`) | `MS-03` | `Q-03` (Mốc 3) |
| `FR-M12-02/AC-01` | Ticket vượt SLA hiển thị nhãn tô đỏ cảnh báo | `TC-M12-N01` | `#139` (`#117`) | `MS-03` | `Q-03` (Mốc 3) |
| `FR-M12-03/AC-01` | Admin xem danh sách phòng ban tồn đọng nhiều đơn nhất | *(Thuộc 14 TC M12 dự kiến)* | `#139` (`#118`) | `MS-03` | `Q-03` (Mốc 3) |
| `FR-M12-04/AC-01` | Admin tra cứu chi tiết mọi đơn trên toàn trường theo Mã Ticket | *(Thuộc 14 TC M12 dự kiến)* | `#139` (`#119`) | `MS-03` | `Q-03` (Mốc 3) |
| `FR-M13-01/AC-01` | Biểu đồ và thẻ chỉ số hiển thị số liệu theo mốc thời gian | `TC-M13-E02` | `#142` (`#120`) | `MS-03` | `Q-03` (Mốc 3) |
| `FR-M13-02/AC-01` | Trưởng phòng chỉ xem được thống kê thuộc phòng ban mình | `TC-M13-N01` | `#142` (`#121`) | `MS-03` | `Q-03` (Mốc 3) |
| `FR-M13-02/AC-02` | Admin xem được toàn bộ số liệu của tất cả phòng ban | `TC-M13-N01` | `#142` (`#121`) | `MS-03` | `Q-03` (Mốc 3) |
| `FR-M13-03/AC-01` | Xuất báo cáo ra file Excel/PDF đầy đủ dữ liệu | *(Thuộc 12 TC M13 dự kiến)* | `#142` (`#122`) | `MS-03` | `Q-03` (Mốc 3) |
| `FR-M13-04/AC-01` | Thống kê điểm CSAT và KPI hiệu suất nhân viên | *(Thuộc 12 TC M13 dự kiến)* | `#142` (`#123`) | `MS-03` | `Q-03` (Mốc 3) |

### 2.4. Hạng mục Hạ tầng & Bàn giao (`MS-00`, `MS-04`)

| Mã hạng mục | Mô tả công việc | Parent Task (GitHub Issue) | Milestone | Hạng mục Báo giá |
| :--- | :--- | :---: | :---: | :---: |
| `INF-01` | Thiết lập cơ sở hạ tầng và môi trường triển khai hệ thống UniSupport | `#128` | `MS-00` | `Q-00` (Mốc 0) |
| `Docs-01` | Hoàn thiện các tài liệu mô tả hệ thống và sổ tay hướng dẫn sử dụng | `#126` | `MS-04` | `Q-04` (Mốc 4) |
| `Docs-02` | Tạo dữ liệu mẫu và chuẩn bị kịch bản để chạy thử nghiệm thu dự án (UAT) | `#127` | `MS-04` | `Q-04` (Mốc 4) |
