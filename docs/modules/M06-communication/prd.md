# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ TRAO ĐỔI THÔNG TIN & TỆP ĐÍNH KÈM (COM)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-COM-01]** | Nhân viên Gửi Phản hồi | Nhân viên | Soạn thảo câu trả lời hoặc yêu cầu sinh viên cung cấp thêm minh chứng. |
| **[FR-COM-02]** | Sinh viên Gửi Thông tin Bổ sung | Sinh viên | Phản hồi lời nhắn của nhân viên và kích hoạt đợt xử lý tiếp theo. |
| **[FR-COM-03]** | Đính kèm Tệp tin | Sinh viên, Nhân viên | Tải lên tài liệu (PDF, Word) hoặc hình ảnh (JPG, PNG) đính kèm minh họa. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

```text
 [Nhân viên Soạn Phản hồi FR-COM-01]           [Sinh viên Bổ sung Thông tin FR-COM-02]
                 │                                              │
                 └──────────────────────┬───────────────────────┘
                                        ▼
                   [Đính kèm Tệp: JPG/PNG/PDF/DOCX < 5MB FR-COM-03]
                                        │
                                        ▼
                          [Kiểm tra Nội dung & File]
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
        [Trống Nội dung / File > 5MB]               [Hợp lệ: Gửi Phản hồi]
                    │                                       │
                    ▼                                       ▼
           [Báo Lỗi Chặn Gửi]                   [Cập nhật Dòng Thời gian Ticket]
                                                            │
                                            ┌───────────────┴───────────────┐
                                            ▼                               ▼
                              [Nếu Đơn đang ở PENDING]             [Nếu Đơn đang ở IN PROGRESS]
                                            │                               │
                                            ▼                               ▼
                              [Tự động về IN PROGRESS]               [Giữ nguyên IN PROGRESS]
                              [Tắt Đếm ngược 72h ngầm]
```

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Luồng Trao đổi & Đánh thức Trạng thái Đơn
1. **Dòng thời gian minh bạch (Timeline):** Tất cả tin nhắn trao đổi từ cả 2 phía đều được lưu vết vĩnh viễn theo thứ tự thời gian.
2. **Cơ chế Tự động Đánh thức Đơn (`Pending` -> `In Progress`):** Khi đơn đang ở `Pending` (chờ SV cung cấp minh chứng), ngay khi Sinh viên gửi phản hồi thành công, hệ thống lập tức tự động đưa đơn về lại trạng thái `In Progress` và hủy bộ đếm ngầm 72h để Nhân viên tiếp tục xử lý.

### 3.2. Quy tắc Khóa Khung Chat
1. **Khóa khung phản hồi:** Khi Ticket đã chuyển sang trạng thái `Closed` hoặc `Resolved` (đối với Sinh viên), hệ thống ẩn toàn bộ khung soạn thảo phản hồi, chỉ cho phép đọc lại lịch sử trao đổi.

### 3.3. Kiểm duyệt Tệp đính kèm & An toàn Hệ thống
1. **Giới hạn tệp:** Dung lượng tối đa không vượt quá **5MB/file**, đính kèm tối đa **3 file** trong một lượt gửi.
2. **Kiểm tra định dạng:** Chỉ chấp nhận định dạng ảnh (`.jpg`, `.png`) và tài liệu (`.pdf`, `.docx`, `.xlsx`). Chặn tuyệt đối các file thực thi có nguy cơ gây hại (`.exe`, `.bat`, `.js`...).
