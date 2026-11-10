# SỔ ĐĂNG KÝ RỦI RO (RISK REGISTER)

> *Tổng hợp từ các tài liệu quản lý dự án UniSupport.*

## 1. Rủi ro chất lượng sản phẩm

*Nguồn: Kế hoạch Quản lý Chất lượng – Mục 6.*

| **Rủi ro**                                    | **Ảnh hưởng**                                   | **Kiểm soát / đầu mối**                                                                                    |
|-----------------------------------------------|-------------------------------------------------|------------------------------------------------------------------------------------------------------------| 
| Ticket bị ghi đè khi nhiều người cập nhật     | Trạng thái hoặc lịch sử không nhất quán         | Kiểm thử cập nhật đồng thời nếu luồng này thuộc phạm vi; Dev kiểm tra xử lý dữ liệu, QC kiểm chứng kết quả |
| Sai phân quyền Ticket                         | Người dùng xem/sửa dữ liệu ngoài quyền          | QC kiểm thử ma trận vai trò × hành động × dữ liệu; PM xác nhận quyền theo PRD                              |
| Thông báo trùng hoặc thiếu (nếu PRD có)       | Người dùng nhận thông tin không chính xác       | QC kiểm tra sự kiện gửi, thao tác lặp và điều kiện nhận đã đặc tả                                          |
| Dữ liệu Ticket hoặc lịch sử xử lý sai         | Mất bằng chứng xử lý hoặc báo cáo không tin cậy | Kiểm thử tạo/sửa/đọc và đối soát dữ liệu; Dev kiểm tra phần xử lý liên quan                                |
| Hiệu năng không đạt trong điều kiện đo        | Người dùng thao tác chậm                        | Ghi rõ điều kiện đo, xác định vấn đề và kiểm thử lại sau xử lý                                             |
| Thay đổi sát thời điểm bàn giao               | Tăng lỗi hồi quy, ảnh hưởng lịch                | PM ghi nhận CR; QC đánh giá phạm vi hồi quy; chỉ đưa vào bản bàn giao khi được chấp thuận                  |

## 2. Rủi ro vận hành sản phẩm

*Nguồn: Kế hoạch Quản lý Sản phẩm – Mục 3.2.*

| **Rủi ro dự kiến** | **Mức ảnh hưởng** | **Cách phòng ngừa & Giải pháp** |
|---|---|---|
| Phòng ban xử lý chậm/trễ hạn SLA | Cao | Thiết lập Leo thang tự động (Auto-Escalation): Quá hạn 2h cảnh báo đỏ; quá hạn 24h tự động gửi Email báo cáo Trưởng phòng ban. |
| Lộ lọt thông tin cá nhân của sinh viên | Rất cao | Che giấu danh tính (Data Anonymization): Chỉ mã sinh viên và thông tin cần thiết được hiển thị. Dữ liệu xuất báo cáo được ẩn danh. Mã hóa thông tin tại Database. |
| Hệ thống sập lúc đông người dùng (Đăng ký môn, thi cử) | Cao | Tối ưu tài nguyên: Thiết lập Auto-scaling trên máy chủ Cloud. Tối ưu hóa các câu truy vấn Database. |
| Sinh viên tạo nhầm phòng ban, ticket rác | Trung bình | Bỏ tính năng "Sinh viên tự chọn phòng ban", thay bằng "Sinh viên chọn loại vấn đề". Hệ thống tự map vấn đề về đúng phòng. |

## 3. Rủi ro quản lý dự án

*Nguồn: Kế hoạch Điều phối và Giám sát – Mục 2.4 & 5.*

| **Rủi ro** | **Mức ảnh hưởng** | **Biện pháp kiểm soát** |
|---|---|---|
| Sự cố nghiêm trọng (hệ thống ngừng hoạt động, rò rỉ dữ liệu) | Critical | Phản hồi trong vòng 15 phút, khắc phục trong 2-4 giờ. |
| Tính năng chính bị lỗi, ảnh hưởng nhóm người dùng | Major | Phản hồi trong vòng 1 giờ, khắc phục trong 8-12 giờ. |
| Lỗi nhỏ giao diện, hiển thị | Minor | Phản hồi trong vòng 4 giờ, khắc phục trong 24-48 giờ. |
| Chậm tiến độ, chi phí vượt dự kiến | Cao | PM phân tích sai lệch, đề xuất biện pháp khắc phục, báo cáo Ban quản lý. |
| Thiếu nguồn lực nhân sự | Trung bình | Phân bổ lại công việc, điều chuyển hoặc bổ sung nhân sự với phê duyệt Ban quản lý. |

