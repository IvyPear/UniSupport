# WF-07: Luồng Xác thực và Đồng bộ tài khoản (Authentication & Account Sync)

## 1. Mô tả
Luồng ghi nhận cách người dùng thuộc mọi vai trò thực hiện đăng nhập vào hệ thống, đồng thời mô tả cơ chế Admin tạo mới hoặc cập nhật hàng loạt tài khoản từ nguồn dữ liệu do nhà trường cung cấp.

---

## 2. Các bước thực hiện
* **Trường hợp 1 (Người dùng đăng nhập hệ thống):**
  1. Người dùng (Sinh viên / Nhân viên / Quản lý / Admin) tiến hành nhập Mã định danh và Mật khẩu tại trang Đăng nhập ([FR-AUTH-01]).
  2. Hệ thống tiến hành xác thực thông tin:
     * *Nếu thông tin hợp lệ:* Chuyển hướng người dùng vào giao diện trang chủ tương ứng với đúng vai trò phân quyền.
     * *Nếu thông tin không hợp lệ:* Hiển thị thông báo lỗi. Đặc biệt, nếu nhập sai liên tiếp 5 lần $\rightarrow$ Hệ thống tự động tạm khóa tài khoản trong vòng 15 phút.

* **Trường hợp 2 (Admin đồng bộ tài khoản hàng loạt):**
  1. Admin truy cập chức năng *"Import tài khoản"*, tải lên file định dạng Excel hoặc CSV chứa danh sách nhân sự/sinh viên từ nhà trường ([FR-AUTH-02]).
  2. Hệ thống tiến hành quét và xử lý dữ liệu từng dòng trong tệp:
     * *Nếu Mã định danh chưa tồn tại:* Khởi tạo tài khoản mới kèm theo mật khẩu mặc định theo quy định.
     * *Nếu Mã định danh đã tồn tại:* Cập nhật thông tin thay đổi (Họ tên, Phòng ban trực thuộc) và **tuyệt đối giữ nguyên mật khẩu hiện tại** của người dùng.
  3. Hệ thống trả về báo cáo kết quả import tổng hợp (số lượng dòng thành công, số dòng thất bại/lỗi).

---

## 3. Sơ đồ luồng quy trình (Mermaid Diagram)

```mermaid
graph TD
    A{Hành động}
    
    A -->|Người dùng đăng nhập| B[Nhập ID & Mật khẩu]
    B --> C{Đúng hay Sai?}
    C -->|Sai 5 lần| D([Khóa tài khoản 15 phút])
    C -->|Đúng| E([Vào giao diện đúng Vai trò])
    
    A -->|Admin Đồng bộ| F[Tải file Excel/CSV lên]
    F --> G{Hệ thống kiểm tra Mã ID}
    G -->|Mã mới| H[Tạo tài khoản & Cấp MK mặc định]
    G -->|Mã đã tồn tại| I[Cập nhật chức danh/phòng ban - Giữ MK]
    H --> J([Trả kết quả Import])
    I --> J