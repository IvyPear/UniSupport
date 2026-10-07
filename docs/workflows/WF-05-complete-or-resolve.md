# WF-05: Luồng Hoàn tất Xử lý Yêu cầu (Resolve / Complete)

## 1. Mô tả
Luồng ghi nhận thao tác kết thúc công việc chuyên môn của nhân viên, đóng gói kết quả để chuyển sang bước nghiệm thu.

---

## 2. Các bước thực hiện
* **Trường hợp 1 (Xử lý thành công - Happy Path):**
  1. Nhân viên hoàn tất giải quyết vấn đề, tiến hành cập nhật trạng thái ticket thành `Resolved` ([FR-STF-03]).
  2. Hệ thống kiểm tra và ép buộc nhân viên phải nhập đầy đủ nội dung vào trường Ghi chú giải pháp (`Resolution Notes`).
  3. Hệ thống ghi nhận trạng thái vòng đời mới ([FR-TKT-02]) và tự động bắn thông báo in-app (quả chuông đỏ) cho sinh viên với nội dung: *"Yêu cầu [Mã đơn] của bạn đã được xử lý"* ([FR-NOTI-01]). (Sẵn sàng chuyển sang `WF-06`).
* **Trường hợp 2 (Đơn rác / Không hợp lệ - Exception Path):**
  1. Nhân viên kiểm tra và xác định đây là đơn spam, trùng lặp hoặc vi phạm quy định.
  2. Nhân viên chọn cập nhật trạng thái, đánh dấu là *"Đơn không hợp lệ / Spam"* kèm theo ghi chú giải thích ([FR-STF-03]).
  3. Hệ thống lập tức chuyển thẳng ticket sang trạng thái `Closed` (Đóng vĩnh viễn), đồng thời vô hiệu hóa luôn quyền đánh giá sao của sinh viên ([FR-TKT-02]).

---

## 3. Sơ đồ luồng quy trình (Mermaid Diagram)

```mermaid
graph TD
    A([Đơn đang IN PROGRESS]) --> B{Đánh giá của Nhân viên}
    B -->|Đơn hợp lệ| C[Cập nhật trạng thái RESOLVED]
    C --> D[Ghi chú giải pháp]
    D --> E([Báo SV vào đánh giá])
    
    B -->|Đơn rác/Spam/Sai quy định| F[Đánh dấu Không hợp lệ]
    F --> G[Nhập lý do từ chối]
    G --> H([Hệ thống chuyển thẳng CLOSED - Khóa vĩnh viễn])