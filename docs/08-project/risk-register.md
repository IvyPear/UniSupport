# SỔ ĐĂNG KÝ RỦI RO DỰ ÁN (RISK REGISTER)

> **Dự án:** UniSupport — Hệ thống quản lý hỗ trợ sinh viên  
> **Nguồn tổng hợp:** Hợp nhất từ bảng Quản lý rủi ro chất lượng tại [QL-chat-luong.md — Mục 6](QL-chat-luong.md#6-quản-lý-rủi-ro-chất-lượng) và bảng Quản trị rủi ro vận hành tại [QL-san-pham.md — Mục 3.2](QL-san-pham.md#32-quản-trị-rủi-ro-vận-hành-risk-management).  
> **Quỹ dự phòng rủi ro & bảo hành:** `22.138.272 VNĐ` theo [Ngan-sach-nhan-su.md — Mục 3](Ngan-sach-nhan-su.md#3-bảng-tổng-hợp-ngân-sách-dự-án--tính-toán-sau-thuế).

---

## 1. Bảng Sổ Đăng Ký Rủi Ro (`R-01` – `R-10`)

> **Ghi chú:** Các cột *Khả năng xảy ra*, *Owner cụ thể* và *Trạng thái hiện tại* đối với một số rủi ro đang chờ nhóm xác nhận tại [open-questions.md](open-questions.md) để không tự suy diễn ngoài nội dung đã viết trong tài liệu gốc.

| Mã Rủi ro | Mô tả rủi ro | Nguồn gốc | Khả năng xảy ra | Mức độ tác động (Ảnh hưởng) | Owner (Đầu mối) | Phương án phòng ngừa & Xử lý | Trạng thái |
| :---: | :--- | :---: | :---: | :--- | :--- | :--- | :---: |
| **`R-01`** | **Ticket bị ghi đè khi nhiều người cập nhật đồng thời (Race Condition)** | `QL-chat-luong.md` (Mục 6) | *(Chờ nhóm chốt tại OQ-02)* | Trạng thái hoặc lịch sử xử lý không nhất quán | Dev, QC | Áp dụng Atomic Update (`NFR-INT-03`) tại tầng CSDL; Dev kiểm tra xử lý tương tranh, QC kiểm chứng bằng `TC-M06-E01`. | Đang theo dõi |
| **`R-02`** | **Sai phân quyền Ticket giữa các vai trò / phòng ban** | `QL-chat-luong.md` (Mục 6) | *(Chờ nhóm chốt tại OQ-02)* | Người dùng xem hoặc sửa dữ liệu ngoài phạm vi quyền hạn | QC, PM | QC kiểm thử ma trận vai trò × hành động × dữ liệu (`NFR-SEC-05`, `TC-M02-N01`, `TC-M06-N02`); PM xác nhận quyền theo PRD. | Đang theo dõi |
| **`R-03`** | **Thông báo trùng lặp hoặc gửi thiếu sự kiện** | `QL-chat-luong.md` (Mục 6) | *(Chờ nhóm chốt tại OQ-02)* | Người dùng nhận thông tin không chính xác về trạng thái đơn | QC | QC kiểm tra sự kiện gửi, thao tác lặp và điều kiện nhận đã đặc tả tại ma trận thông báo và `M08`/`M10`. | Đang theo dõi |
| **`R-04`** | **Dữ liệu Ticket hoặc lịch sử xử lý (Audit Trail) bị sai lệch** | `QL-chat-luong.md` (Mục 6) | *(Chờ nhóm chốt tại OQ-02)* | Mất bằng chứng xử lý hoặc báo cáo thống kê không tin cậy | Dev, QC | Kiểm thử tạo/sửa/đọc và đối soát dữ liệu; áp dụng ràng buộc khóa đơn đã đóng (`NFR-INT-01`). | Đang theo dõi |
| **`R-05`** | **Hiệu năng không đạt ngưỡng cam kết trong điều kiện đo** | `QL-chat-luong.md` (Mục 6) | *(Chờ nhóm chốt tại OQ-02)* | Người dùng thao tác chậm (vượt 500ms với API thường hoặc 2.000ms với báo cáo) | Dev, QC | Ghi rõ điều kiện đo (`NFR-PERF-01`, `NFR-PERF-02`), xác định điểm nghẽn truy vấn và kiểm thử lại sau tối ưu. | Đang theo dõi |
| **`R-06`** | **Thay đổi yêu cầu phát sinh sát thời điểm bàn giao** | `QL-chat-luong.md` (Mục 6) | *(Chờ nhóm chốt tại OQ-02)* | Tăng lỗi hồi quy (regression), ảnh hưởng tiến độ bàn giao | PM, QC | PM ghi nhận qua quy trình Change Request (`Dieuphoi-Giamsat.md` Mục 3.4); QC đánh giá phạm vi hồi quy; chỉ đưa vào bản bàn giao khi được chấp thuận. | Đang theo dõi |
| **`R-07`** | **Phòng ban xử lý chậm / trễ hạn cam kết SLA** | `QL-san-pham.md` (Mục 3.2) | *(Chờ nhóm chốt tại OQ-02)* | **Cao** — Giảm mức độ hài lòng của sinh viên, tồn đọng đơn | *(Chờ nhóm chốt tại OQ-02)* | Thiết lập cảnh báo đỏ trên giao diện (`FR-M12-02`) và cơ chế leo thang tự động tới Trưởng phòng ban. | Đang theo dõi |
| **`R-08`** | **Lộ lọt thông tin cá nhân của sinh viên** | `QL-san-pham.md` (Mục 3.2) | *(Chờ nhóm chốt tại OQ-02)* | **Rất cao** — Vi phạm bảo mật và quy định an toàn thông tin | *(Chờ nhóm chốt tại OQ-02)* | Chỉ hiển thị thông tin cần thiết phục vụ xử lý đơn; ẩn danh dữ liệu xuất báo cáo; mã hóa thông tin trong CSDL và kiểm soát RBAC (`NFR-SEC-01..05`). | Đang theo dõi |
| **`R-09`** | **Hệ thống quá tải vào thời điểm cao điểm (đầu học kỳ, kỳ thi)** | `QL-san-pham.md` (Mục 3.2) | *(Chờ nhóm chốt tại OQ-02)* | **Cao** — Gián đoạn dịch vụ hoặc phản hồi chậm | *(Chờ nhóm chốt tại OQ-02)* | Tối ưu hóa tài nguyên máy chủ, câu truy vấn CSDL và bộ nhớ đệm (Caching). | Đang theo dõi |
| **`R-10`** | **Sinh viên gửi nhầm phòng ban hoặc tạo đơn rác** | `QL-san-pham.md` (Mục 3.2) | *(Chờ nhóm chốt tại OQ-02)* | **Trung bình** — Mất thời gian phân loại lại của nhân viên | Admin, Nhân viên | Cung cấp tùy chọn mục "Khác" (`FR-M05-01`) về hàng chờ Admin phân loại (`FR-M11-01`) và luồng báo sai phòng ban (`FR-M07-04`, `FR-M11-02`). | Đang theo dõi |
