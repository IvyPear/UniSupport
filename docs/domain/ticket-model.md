## Cấu trúc Dữ liệu Yêu cầu (Ticket Data Model)

### 1. Mã định danh (Ticket ID)
Mã Ticket được thiết kế theo cấu trúc định dạng chuẩn hóa để đảm bảo tính duy nhất, dễ phân loại và theo dõi:
*   **Cấu trúc mã:** `[CATEGORY_CODE]-[YYYYMMDD]-[SEQ_NUMBER]`
    *   `CATEGORY_CODE`: Mã viết tắt danh mục phân loại (VD: `AC` - Academic/Học tập, `FN` - Finance/Tài chính).
    *   `YYYYMMDD`: Ngày khởi tạo yêu cầu (Năm-Tháng-Ngày).
    *   `SEQ_NUMBER`: Số thứ tự tự động tăng theo ngày (gồm 4 chữ số, từ `0001` đến `9999`).
*   **Ví dụ:** `AC-20261005-0042` (Ticket thuộc mảng Học tập tạo ngày 05/10/2026, mang số thứ tự 42).

### 2. Thông tin cơ bản (Basic Information)
Chứa toàn bộ nội dung yêu cầu hoặc sự cố do người dùng phản ánh:
*   **Tiêu đề (Title):** Tóm tắt ngắn gọn nội dung cần hỗ trợ (Tối đa 150 ký tự).
*   **Phân loại (Category):** Phân vùng nhóm vấn đề chính (Học tập, Học phí & Lệ phí, Dịch vụ SV, Kỹ thuật/IT, Bảng điểm/Bằng cấp).
*   **Mô tả (Description):** Trình bày chi tiết hoàn cảnh, thông tin lỗi hoặc yêu cầu cụ thể. Hỗ trợ đính kèm tệp tin (hình ảnh, tài liệu minh chứng).

### 3. Thông tin Trạng thái & Thời gian (Status & Timestamps)
Theo dõi trạng thái xử lý của ticket và cam kết chất lượng dịch vụ (SLA):
*   **Trạng thái hiện tại (Status):**
    *   `New`: Ticket mới được gửi, chờ tiếp nhận.
    *   `In Progress`: Đã phân công chuyên viên và đang trong quá trình xử lý.
    *   `Pending Student Response`: Tạm dừng để chờ sinh viên bổ sung thêm thông tin.
    *   `Resolved`: Vấn đề đã được giải quyết, chờ phản hồi xác nhận từ sinh viên.
    *   `Closed`: Ticket đã đóng hoàn tất.
*   **Thời gian tạo (Created At):** Mốc thời gian hệ thống ghi nhận ticket.
*   **Thời gian cập nhật (Updated At):** Mốc thời gian gần nhất có sự thay đổi trạng thái, phản hồi hoặc cập nhật thông tin.

### 4. Kết quả giải quyết (Resolution Notes)
*   Ghi nhận nội dung phản hồi, kết quả xử lý hoặc hướng dẫn cuối cùng từ nhân viên gửi cho sinh viên trước khi chuyển ticket sang trạng thái hoàn thành (`Resolved`).