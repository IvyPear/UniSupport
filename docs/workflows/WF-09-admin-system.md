# WF-09: Luồng Admin Cấu hình Hệ thống (Admin System Configuration)

## 1. Mô tả
Luồng thể hiện quyền quản trị tối cao của Admin trong việc thiết lập bộ khung định tuyến (Danh mục), phân quyền nhân sự, quản lý trạng thái tài khoản và giám sát toàn bộ hoạt động của toàn trường.

---

## 2. Các bước thực hiện
* **Trường hợp 1 (Quản trị Danh mục hỗ trợ):** 
  1. Admin (hoặc Trưởng phòng trong phạm vi phòng ban mình) thực hiện thao tác Thêm, Sửa hoặc Ẩn các danh mục hỗ trợ ([FR-ADM-01]). 
  2. Các thiết lập này sẽ trực tiếp quyết định việc định tuyến đơn của sinh viên trong luồng khởi tạo (`WF-01`) sẽ tự động phân bổ về đúng phòng ban chuyên trách nào.

* **Trường hợp 2 (Phân quyền & Khóa tài khoản nhân sự):** 
  1. Admin tìm kiếm thông tin tài khoản nhân sự trên hệ thống, tiến hành gắn Vai trò (`Role`) và Phòng ban trực thuộc (`Department`) ([FR-ADM-02]). 
  2. Trong trường hợp nhân sự nghỉ việc hoặc thay đổi công tác, Admin chuyển trạng thái tài khoản sang `Inactive` (Khóa) $\rightarrow$ Hệ thống lập tức hủy phiên làm việc hiện tại của nhân sự đó (văng khỏi hệ thống) và tự động ẩn hoàn toàn tên khỏi danh sách phân công (`Assign`) của các phòng ban.

* **Trường hợp 3 (Giám sát dữ liệu toàn trường):** 
  1. Admin truy cập vào `Global Dashboard`, sử dụng bộ lọc thời gian tùy chỉnh để theo dõi trực quan biểu đồ thống kê tổng lưu lượng đơn yêu cầu cũng như tỷ lệ giải quyết công việc của TẤT CẢ các phòng ban trong toàn trường ([FR-REP-01]).

---

## 3. Sơ đồ luồng quy trình (Mermaid Diagram)

```mermaid
graph TD
    A([Admin đăng nhập]) --> B{Thao tác quản trị}
    
    B -->|Danh mục hệ thống| C[Thêm/Sửa/Ẩn danh mục]
    C --> D([Cập nhật luồng chọn mục cho Sinh viên])
    
    B -->|Tài khoản nhân sự| E[Sửa hồ sơ nhân viên]
    E --> F[Gán Vai trò Role / Phòng ban]
    E --> G[Đổi trạng thái Active/Inactive]
    G -->|Inactive| H([Văng đăng xuất & Xóa khỏi DS chia việc])
    
    B -->|Xem báo cáo| I[Vào Global Dashboard]
    I --> J([Xem số liệu tổng hợp toàn trường])