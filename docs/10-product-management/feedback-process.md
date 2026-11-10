# QUY TRÌNH THU THẬP VÀ XỬ LÝ PHẢN HỒI

> *Trích xuất từ Kế hoạch Quản lý Sản phẩm UniSupport – Mục 4.*

## 1. Phương pháp thu thập phản hồi "What & Why"

Sử dụng kết hợp Dữ liệu định lượng (Biết cái gì đang xảy ra) và Định tính (Biết tại sao lại xảy ra) để ra quyết định cải tiến tính năng.

### 1.1. Quy trình kết hợp dữ liệu

- **Bước 1 (Định lượng - WHAT):** Sử dụng các công cụ phân tích để phát hiện các điểm nghẽn giao diện và thao tác của sinh viên:

  - **Google Analytics (GA4):** Theo dõi các chỉ số lưu lượng và tương tác cơ bản.

  - **Mixpanel / Amplitude:** Phân tích sâu hành trình và phễu chuyển đổi của sinh viên.

  - **Hotjar / FullStory:** Quan sát trực quan (heatmap) và thao tác thực tế trên trang để phát hiện nút bấm ít tương tác hoặc đoạn hay bỏ dở.

- **Bước 2 (Định tính - WHY):** Dùng dữ liệu GA khoanh vùng vấn đề và tổ chức Phỏng vấn trực tiếp 1:1 (5-7 người đại diện). Đặt câu hỏi đào sâu tâm lý để tìm hiểu nguyên nhân đằng sau các con số.

- **Bước 3 (Thực thi - ACTION):** Đưa ra giải pháp thiết kế lại hoặc bổ sung tính năng dựa trên kết luận chéo.

### 1.2. Báo cáo phân tích đối chiếu (Ví dụ mẫu thực tế)

| **Vấn đề phát hiện trên GA4 (What)**                                                                 | **Kết quả phỏng vấn 1:1 (Why)**                                                                                           | **Phân tích rủi ro sản phẩm**                                                                       | **Hành động cải tiến (Action Item)**                                                                                     |
|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Tạo Ticket: Tỷ lệ thoát ngang (Bounce Rate) ở form tạo là 60%. User tốn \>3 phút nhưng không submit. | *"Em không biết vấn đề của em thì phòng Đào tạo hay phòng CTSV giải quyết. Sợ chọn sai bị từ chối nên em không gửi nữa."* | Giao diện đòi hỏi sinh viên phải hiểu cơ cấu tổ chức nhà trường → Đi ngược lại giá trị "Tập trung". | Bỏ trường "Chọn phòng ban". Thay bằng "Chọn loại hỗ trợ" (Xin bảng điểm, Học phí...). Admin sẽ tự map về đúng phòng ban. |
| Theo dõi Ticket: Returning User vào trang chi tiết rất cao (trung bình 4 lần/ngày cho 1 Ticket).     | *"Hệ thống chỉ báo 'Đang xử lý', em không biết bao giờ xong, ruột gan nóng như lửa nên cứ refresh liên tục."*             | Trạng thái hiển thị thiếu minh bạch về mặt thời gian, gây trải nghiệm lo lắng.                      | Cập nhật thanh tiến trình (Progress Bar). Bổ sung trường "Thời gian dự kiến hoàn thành (ETA)".                           |

## 2. Quản trị rủi ro vận hành (Risk Management)

| **Rủi ro dự kiến** | **Mức ảnh hưởng** | **Cách phòng ngừa & Giải pháp trên hệ thống** |
|---|---|---|
| Phòng ban xử lý chậm/trễ hạn SLA | Cao | Thiết lập Leo thang tự động (Auto-Escalation): Quá hạn 2h cảnh báo đỏ; quá hạn 24h tự động gửi Email báo cáo Trưởng phòng ban. |
| Lộ lọt thông tin cá nhân của sinh viên | Rất cao | Che giấu danh tính (Data Anonymization): Chỉ mã sinh viên và thông tin cần thiết được hiển thị. Dữ liệu xuất báo cáo được ẩn danh. Mã hóa thông tin tại Database. |
| Hệ thống sập lúc đông người dùng | Cao | Tối ưu tài nguyên: Thiết lập Auto-scaling trên máy chủ Cloud. Tối ưu hóa các câu truy vấn Database. |
| Sinh viên tạo nhầm phòng ban, ticket rác | Trung bình | Bỏ tính năng "Sinh viên tự chọn phòng ban", thay bằng "Sinh viên chọn loại vấn đề". Hệ thống tự map vấn đề về đúng phòng. |

