# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ TÀI KHOẢN (AUTH)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-AUTH-01]** | Đăng nhập Hệ thống | Sinh viên, Nhân viên, Quản lý, Admin | Đăng nhập bằng mã định danh cá nhân và mật khẩu do nhà trường cấp. |
| **[FR-AUTH-02]** | Admin Đồng bộ Tài khoản | Admin | Tải tệp Excel/CSV để khởi tạo mới hoặc cập nhật thông tin tài khoản hàng loạt. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

```text
 [Nhập Mã Định danh & Mật khẩu FR-AUTH-01] ──► [Xác thực Hệ thống & Kiểm tra BR-01]
                                                        │
                                    ┌───────────────────┴───────────────────┐
                                    ▼                                       ▼
                       [Sai > 5 lần: Khóa 15 phút]             [Đăng nhập Thành công]
                                                                            │
                                                                            ▼
                                                             [Truy cập Dashboard theo Vai trò]
                                                                            ▲
                                                                            │
 [Admin Upload File Excel/CSV FR-AUTH-02] ──► [Kiểm tra Định dạng & Cấu trúc]
                                                        │
                                                        ▼
                                       [Tạo mới TK Mặc định / Cập nhật Hồ sơ]
```

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Luồng Đăng nhập & Bảo mật Tài khoản
1. **Môi trường hệ thống đóng:** Hệ thống vận hành theo cơ chế đóng, tài khoản do nhà trường cấp sẵn. Tuyệt đối không hiển thị tính năng đăng ký tự do hay tự đổi/khôi phục mật khẩu đối với Sinh viên và Nhân viên.
2. **Kiểm soát đăng nhập thất bại:** Hệ thống theo dõi số lần đăng nhập sai liên tiếp. Nếu nhập sai mật khẩu quá **5 lần liên tiếp**, hệ thống lập tức tạm khóa tài khoản trong **15 phút** để chống tấn công dò mật khẩu (Brute-force).
3. **Phân quyền và Điều hướng:** Khi xác thực thông tin thành công, hệ thống cấp Token JWT và điều hướng người dùng tới trang Dashboard phù hợp với Vai trò (`Role`).

### 3.2. Luồng Đồng bộ Dữ liệu Hàng loạt (Import Accounts)
1. **Kiểm duyệt File đầu vào:** Admin tải file cấu trúc `.xlsx` hoặc `.csv`. Hệ thống kiểm tra các cột bắt buộc (*Mã định danh, Họ tên, Vai trò, Phòng ban*).
2. **Khởi tạo & Cập nhật Dữ liệu:**
   - **Tài khoản mới:** Khởi tạo hồ sơ với mật khẩu mặc định.
   - **Tài khoản đã tồn tại:** Cập nhật thông tin phòng ban, họ tên và **tuyệt đối giữ nguyên mật khẩu hiện tại** của người dùng.
3. **Xử lý ngoại lệ:** Bỏ qua các dòng lỗi/thiếu cột, ghi nhận chi tiết vào log lỗi và trả bảng tổng kết cho Admin sau khi hoàn tất.
