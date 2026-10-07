# MA TRẬN KỊCH BẢN KIỂM THỬ (TEST CASE MATRIX) - UNISUPPORT

---

## 1. Tổng Quan Ma Trận Kiểm Thử

Ma trận này bao phủ các kịch bản kiểm thử chính (Test Scenarios) được ánh xạ trực tiếp từ bộ Đặc tả Yêu cầu Chức năng (`FR`), Quy tắc nghiệp vụ (`BR`) và Tiêu chí nghiệm thu (`AC`).

---

## 2. Danh Sách Kịch Bản Kiểm Thử Cốt Lõi (Core Test Cases)

### Phân Hệ 01: Tài Khoản (AUTH)

| Test Case ID | Tên Kịch Bản Kiểm Thử | Điều Kiện & Các Bước Thực Hiện | Kết Quả Kỳ Vọng (Expected Result) | Ánh Xạ PRD |
| :--- | :--- | :--- | :--- | :--- |
| **TC-AUTH-01** | Đăng nhập hợp lệ cho Sinh viên / Nhân viên | 1. Nhập Mã SV/NV đúng.<br>2. Nhập mật khẩu đúng.<br>3. Bấm "Đăng nhập". | Đăng nhập thành công, chuyển hướng đến đúng trang Dashboard theo vai trò. | `FR-AUTH-01` (`AC-01`) |
| **TC-AUTH-02** | Khóa tài khoản khi nhập sai 5 lần liên tiếp | 1. Nhập sai mật khẩu 5 lần liên tiếp với cùng 1 mã user. | Bị chặn đăng nhập ở lần 5, hiển thị thông báo khóa tài khoản 15 phút. | `BR-01`, `AC-04` |
| **TC-AUTH-03** | Kiểm tra hệ thống đóng (Closed System) | 1. Mở màn hình Đăng nhập. | **Không hiển thị** nút / đường dẫn "Đăng ký" hay "Quên mật khẩu" cho Sinh viên. | `BR-02`, `BR-03` |
| **TC-AUTH-04** | Admin Import danh sách tài khoản từ file Excel | 1. Đăng nhập Admin.<br>2. Upload file `.xlsx` danh sách tài khoản hợp lệ. | Import thành công, khởi tạo tài khoản mới với mật khẩu mặc định, hiển thị báo cáo kết quả. | `FR-AUTH-02` (`AC-01`) |

---

### Phân Hệ 02 & Workflows: Khởi Tạo & Xử Lý Ticket (TICKET & WORKFLOWS)

| Test Case ID | Tên Kịch Bản Kiểm Thử | Điều Kiện & Các Bước Thực Hiện | Kết Quả Kỳ Vọng (Expected Result) | Ánh Xạ PRD |
| :--- | :--- | :--- | :--- | :--- |
| **TC-TKT-01** | Sinh viên tạo ticket thành công | 1. Đăng nhập Sinh viên.<br>2. Nhập tiêu đề, chọn danh mục "Phòng Đào tạo", nội dung.<br>3. Bấm "Gửi yêu cầu". | Khởi tạo thành công, tạo mã định danh duy nhất (`PAA-YYYYMMDD-XXX`), trạng thái là `NEW`. | `WF-01`, `FR-REQ-01` |
| **TC-TKT-02** | Định tuyến tự động mục "Khác" | 1. Sinh viên chọn danh mục "Khác" và gửi đơn. | Đơn tự động được chuyển về danh sách chờ của Admin, bắn thông báo in-app cho Admin. | `WF-01`, `FR-ROUT-01` |
| **TC-TKT-03** | Nhân viên nhận xử lý Ticket (Claim) | 1. Nhân viên truy cập danh sách chờ của phòng ban.<br>2. Bấm "Nhận xử lý" một ticket `NEW`. | Ticket đổi sang trạng thái `IN_PROGRESS`, gán `assigned_staff_id` cho nhân viên đó. | `WF-02`, `FR-STF-01` |
| **TC-TKT-04** | Nhân viên hoàn tất xử lý (Resolve) thành công | 1. Nhân viên nhập ghi chú kết quả giải quyết (`Resolution Notes`).<br>2. Bấm "Hoàn tất". | Ticket đổi sang trạng thái `RESOLVED`, hệ thống gửi thông báo cho sinh viên. | `WF-05`, `FR-STF-02` |
| **TC-TKT-05** | Chặn Resolve ticket khi bỏ trống kết quả | 1. Nhân viên bấm "Hoàn tất" nhưng để trống ô Ghi chú kết quả. | Hệ thống chặn thao tác, cảnh báo tô đỏ ô ghi chú kết quả. | `state-transition.md` (Mục 4) |
| **TC-TKT-06** | Sinh viên đánh giá và Đóng ticket vĩnh viễn | 1. Sinh viên mở ticket `RESOLVED`.<br>2. Chấm 5 sao và bấm "Hoàn thành & Đóng đơn". | Ticket chuyển sang trạng thái `CLOSED`. **Khóa cứng dữ liệu, không cho phép mở lại hay chỉnh sửa.** | `WF-06`, `FR-RAT-01` |

---

### Phân Hệ 08 & 09: Đánh Giá & Báo Cáo (RATINGS & REPORTS)

| Test Case ID | Tên Kịch Bản Kiểm Thử | Điều Kiện & Các Bước Thực Hiện | Kết Quả Kỳ Vọng (Expected Result) | Ánh Xạ PRD |
| :--- | :--- | :--- | :--- | :--- |
| **TC-RAT-01** | Ràng buộc đánh giá 1-5 sao | 1. Sinh viên cố tình gửi số điểm đánh giá ngoài khoảng 1-5 (VD: 0 sao hoặc 6 sao qua API). | API từ chối xử lý, báo lỗi validate dữ liệu. | `FR-RAT-02` |
| **TC-REP-01** | Trưởng phòng xem Báo cáo thống kê hiệu suất | 1. Đăng nhập Quản lý phòng ban.<br>2. Truy cập màn hình Báo cáo. | Hiển thị bảng tổng hợp số ticket đã xử lý, tỷ lệ đúng hạn và rating trung bình của từng nhân viên thuộc phòng ban. | `FR-REP-01` |
