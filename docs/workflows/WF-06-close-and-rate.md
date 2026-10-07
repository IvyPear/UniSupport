# WF-06: Luồng Đánh giá chất lượng & Đóng Ticket (Feedback & Close)

## 1. Mô tả
Luồng cuối cùng khép lại vòng đời của một ticket, ghi nhận đánh giá của sinh viên về chất lượng hỗ trợ, đi kèm cơ chế tự động dọn dẹp hệ thống nếu sinh viên bỏ qua thao tác này.

---

## 2. Các bước thực hiện
* **Trường hợp 1 (Sinh viên chủ động đánh giá - Happy Path):**
  1. Sinh viên nhận được thông báo, truy cập vào ticket đang ở trạng thái `Resolved`.
  2. Sinh viên thực hiện gửi đánh giá: Bắt buộc chọn điểm sao (1-5), tùy chọn nhập nhận xét rồi bấm "Gửi" ([FR-FB-01]).
  3. Hệ thống lưu đánh giá và ngay lập tức chuyển trạng thái ticket thành `Closed` (Khóa vĩnh viễn toàn bộ tương tác chỉnh sửa/bình luận).
* **Trường hợp 2 (Hệ thống tự động đóng - Auto-Close):**
  1. Ngay khi đơn chuyển sang `Resolved` (từ luồng `WF-05`), hệ thống đã ngầm kích hoạt đồng hồ đếm ngược 72 giờ (3 ngày) ([FR-FB-02]).
  2. Trôi qua đúng 72 giờ mà sinh viên vẫn không thực hiện đánh giá, hệ thống tự động gỡ bộ đếm và cập nhật trạng thái đơn thành `Closed`.
  3. Đơn chính thức kết thúc vòng đời mà không có điểm đánh giá, toàn bộ tương tác bị khóa vĩnh viễn.

---

## 3. Sơ đồ luồng quy trình (Mermaid Diagram)

```mermaid
graph TD
    A([Đơn chuyển sang RESOLVED]) --> B[Hệ thống kích hoạt đếm ngược 72H]
    B --> C{Sinh viên có đánh giá không?}
    
    C -->|SV vào đánh giá sao 1-5| D[Hệ thống lưu đánh giá & Hủy đếm ngược]
    D --> E([Chuyển trạng thái CLOSED])
    
    C -->|Hết 72H không đánh giá| F[Hệ thống tự động gỡ bộ đếm]
    F --> G([Tự động chuyển CLOSED - Khóa vĩnh viễn])