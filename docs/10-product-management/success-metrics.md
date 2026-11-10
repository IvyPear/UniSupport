# ĐO LƯỜNG SẢN PHẨM & CAM KẾT DỊCH VỤ (SLA)

> *Trích xuất từ Kế hoạch Quản lý Sản phẩm UniSupport – Mục 2 & 3.*

## 1. Bộ chỉ số đo lường sản phẩm

Bộ chỉ số dưới đây dùng để đo lường mức độ thành công của sản phẩm trong thực tế. Hệ thống chỉ được đánh giá là hiệu quả nếu đạt được các mục tiêu (Target) đề ra.

| **Nhóm**   | **Chỉ số đo lường**                 | **Công thức / Cách đo**                                   | **Mục tiêu kỳ vọng (Target/SLA)** |
|------------|-------------------------------------|-----------------------------------------------------------|-----------------------------------|
| Sử dụng    | Lượt tạo Ticket thành công          | Số Ticket hợp lệ tạo mới trong tháng                      | Tăng trưởng 15% / học kỳ          |
| Hoàn thành | Tỷ lệ xử lý thành công              | (Số Ticket có kết quả / Tổng Ticket hợp lệ) \* 100        | \> 90%                            |
| Tốc độ     | Thời gian phản hồi (First Response) | Từ lúc gửi đến khi đổi trạng thái "Đang xử lý"            | \< 4 giờ làm việc                 |
| Tốc độ     | Thời gian xử lý (Resolution Time)   | Thời gian trung bình từ lúc tiếp nhận đến khi đóng Ticket | \< 48 giờ làm việc (Tùy danh mục) |
| Điều phối  | Tỷ lệ điều phối lại                 | Tỷ lệ Ticket bị chuyển trả lại phòng ban "Khác"           | \< 10%                            |
| Tiến độ    | Tỷ lệ quá hạn SLA                   | Tỷ lệ Ticket vi phạm hạn chót xử lý                       | \< 5%                             |
| Hài lòng   | Điểm hài lòng (CSAT)                | Khảo sát 1-5 sao sau khi Ticket đóng                      | \> 4.0 / 5.0                      |

## 2. Tiêu chuẩn nghiệm thu phát hành (Release Criteria)

Hệ thống bắt buộc phải trải qua kiểm thử QC/UAT và thỏa mãn các tiêu chuẩn về lỗi dưới đây mới được phép phát hành (Go-live):

| **Loại lỗi**                              | **Mức độ**    | **Tiêu chuẩn nghiệm thu để Ra mắt (Release Criteria)**                           |
|-------------------------------------------|---------------|----------------------------------------------------------------------------------|
| Lỗi hệ thống, hỏng luồng cốt lõi          | P0 (Critical) | Bắt buộc = 0 lỗi. Không được phép tồn đọng bất kỳ lỗi P0 nào.                    |
| Lỗi chức năng quan trọng (Tạo, điều phối) | P1 (High)     | Bắt buộc = 0 lỗi. (Trường hợp ngoại lệ phải có giải pháp Workaround được duyệt). |
| Lỗi giao diện, tính năng phụ              | P2 (Medium)   | Chấp nhận \< 5 lỗi. Đưa vào Product Backlog để xử lý trong Sprint tiếp theo.     |
| Cải tiến UI/UX, Hiệu năng nhẹ             | P3 (Low)      | Không giới hạn. Chuyển vào Feedback Log để đánh giá ưu tiên sau.                 |

