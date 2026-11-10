# KẾ HOẠCH QUẢN LÝ SẢN PHẨM UNISUPPORT

## 1. Tổng quan sản phẩm

### 1.1. UniSupport là gì?

UniSupport là website giúp sinh viên gửi yêu cầu hỗ trợ đến các phòng ban của trường và theo dõi tiến độ xử lý tại một đầu mối duy nhất . Hệ thống tự động phân loại và điều phối Ticket đến đúng phòng ban chuyên trách, giúp giảm tải quy trình thủ công và tăng tốc độ hỗ trợ.

### 1.2. Vấn đề cần giải quyết

Việc hỗ trợ sinh viên hiện tại thông qua nhiều kênh riêng lẻ (học vụ, tài chính, cơ sở vật chất, IT...) phát sinh ba vấn đề lớn:

- **Với sinh viên:** Không biết liên hệ ai cho đúng và không nắm được tiến độ yêu cầu của mình đang ở đâu.

- **Với phòng ban:** Nhận yêu cầu từ quá nhiều nguồn (Email, Zalo, Facebook, Trực tiếp), khó phân loại, dễ trôi việc và khó kiểm soát tiến độ xử lý.

- **Với nhà trường:** Thiếu dữ liệu tổng thể để đánh giá năng lực hỗ trợ sinh viên của từng đơn vị.

### 1.3. Giá trị cốt lõi

- **Tập trung:** Mọi yêu cầu đi qua một cổng duy nhất, giải quyết bài toán "đi đâu, hỏi ai".

- **Minh bạch:** Sinh viên theo dõi được thời gian thực (real-time) trạng thái xử lý yêu cầu.

- **Hiệu quả:** Yêu cầu được tự động phân loại, có thời hạn SLA (Service Level Agreement) rõ ràng và đo lường được hiệu suất.

## 2. Đo lường sản phẩm & Cam kết dịch vụ (SLA)

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

## 3. Chất lượng và Vận hành (Quality & Operations)

### 3.1. Tiêu chuẩn nghiệm thu phát hành (Release Criteria)

Hệ thống bắt buộc phải trải qua kiểm thử QC/UAT và thỏa mãn các tiêu chuẩn về lỗi dưới đây mới được phép phát hành (Go-live):

| **Loại lỗi**                              | **Mức độ**    | **Tiêu chuẩn nghiệm thu để Ra mắt (Release Criteria)**                           |
|-------------------------------------------|---------------|----------------------------------------------------------------------------------|
| Lỗi hệ thống, hỏng luồng cốt lõi          | P0 (Critical) | Bắt buộc = 0 lỗi. Không được phép tồn đọng bất kỳ lỗi P0 nào.                    |
| Lỗi chức năng quan trọng (Tạo, điều phối) | P1 (High)     | Bắt buộc = 0 lỗi. (Trường hợp ngoại lệ phải có giải pháp Workaround được duyệt). |
| Lỗi giao diện, tính năng phụ              | P2 (Medium)   | Chấp nhận \< 5 lỗi. Đưa vào Product Backlog để xử lý trong Sprint tiếp theo.     |
| Cải tiến UI/UX, Hiệu năng nhẹ             | P3 (Low)      | Không giới hạn. Chuyển vào Feedback Log để đánh giá ưu tiên sau.                 |

### 3.2. Quản trị rủi ro vận hành (Risk Management)

<table>
<colgroup>
<col style="width: 29%" />
<col style="width: 18%" />
<col style="width: 52%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Rủi ro dự kiến</strong></th>
<th><strong>Mức ảnh hưởng</strong></th>
<th><strong>Cách phòng ngừa &amp; Giải pháp trên hệ thống</strong></th>
</tr>
<tr class="odd">
<th>Phòng ban xử lý chậm/trễ hạn SLA</th>
<th>Cao</th>
<th><p>Thiết lập Leo thang tự động (Auto-Escalation):</p>
<p>• Quá hạn 2h: Cảnh báo đỏ trên hệ thống cho nhân viên.</p>
<p>• Quá hạn 24h: Tự động gửi Email báo cáo Trưởng phòng ban.</p></th>
</tr>
<tr class="header">
<th>Lộ lọt thông tin cá nhân của sinh viên</th>
<th>Rất cao</th>
<th>Che giấu danh tính (Data Anonymization): Chỉ mã sinh viên và thông tin cần thiết được hiển thị. Dữ liệu xuất báo cáo được ẩn danh. Mã hóa thông tin tại Database.</th>
</tr>
<tr class="odd">
<th>Hệ thống sập lúc đông người dùng (Đăng ký môn, thi cử)</th>
<th>Cao</th>
<th>Tối ưu tài nguyên: Thiết lập Auto-scaling trên máy chủ Cloud (Render/AWS). Tối ưu hóa các câu truy vấn Database.</th>
</tr>
<tr class="header">
<th>Sinh viên tạo nhầm phòng ban, ticket rác</th>
<th>Trung bình</th>
<th>Bỏ tính năng "Sinh viên tự chọn phòng ban", thay bằng "Sinh viên chọn loại vấn đề". Hệ thống tự map vấn đề về đúng phòng.</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 4. Phương pháp thu thập phản hồi "What & Why"

Sử dụng kết hợp Dữ liệu định lượng (Biết cái gì đang xảy ra) và Định tính (Biết tại sao lại xảy ra) để ra quyết định cải tiến tính năng.

### 4.1. Quy trình kết hợp dữ liệu

- **Bước 1 (Định lượng - WHAT):** Sử dụng các công cụ phân tích để phát hiện các điểm nghẽn giao diện và thao tác của sinh viên:

- **Google Analytics (GA4):** Theo dõi các chỉ số lưu lượng và tương tác cơ bản.

- **Mixpanel / Amplitude:** Phân tích sâu hành trình và phễu chuyển đổi của sinh viên.

- **Hotjar / FullStory:** Quan sát trực quan (heatmap) và thao tác thực tế trên trang để phát hiện nút bấm ít tương tác hoặc đoạn hay bỏ dở.

- **Bước 2 (Định tính - WHY):** Dùng dữ liệu GA khoanh vùng vấn đề và tổ chức Phỏng vấn trực tiếp 1:1 (5-7 người đại diện). Đặt câu hỏi đào sâu tâm lý để tìm hiểu nguyên nhân đằng sau các con số.

- **Bước 3 (Thực thi - ACTION):** Đưa ra giải pháp thiết kế lại hoặc bổ sung tính năng dựa trên kết luận chéo.

### 4.2. Báo cáo phân tích đối chiếu (Ví dụ mẫu thực tế)

| **Vấn đề phát hiện trên GA4 (What)**                                                                 | **Kết quả phỏng vấn 1:1 (Why)**                                                                                           | **Phân tích rủi ro sản phẩm**                                                                       | **Hành động cải tiến (Action Item)**                                                                                     |
|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Tạo Ticket: Tỷ lệ thoát ngang (Bounce Rate) ở form tạo là 60%. User tốn \>3 phút nhưng không submit. | *"Em không biết vấn đề của em thì phòng Đào tạo hay phòng CTSV giải quyết. Sợ chọn sai bị từ chối nên em không gửi nữa."* | Giao diện đòi hỏi sinh viên phải hiểu cơ cấu tổ chức nhà trường → Đi ngược lại giá trị "Tập trung". | Bỏ trường "Chọn phòng ban". Thay bằng "Chọn loại hỗ trợ" (Xin bảng điểm, Học phí...). Admin sẽ tự map về đúng phòng ban. |
| Theo dõi Ticket: Returning User vào trang chi tiết rất cao (trung bình 4 lần/ngày cho 1 Ticket).     | *"Hệ thống chỉ báo 'Đang xử lý', em không biết bao giờ xong, ruột gan nóng như lửa nên cứ refresh liên tục."*             | Trạng thái hiển thị thiếu minh bạch về mặt thời gian, gây trải nghiệm lo lắng.                      | Cập nhật thanh tiến trình (Progress Bar). Bổ sung trường "Thời gian dự kiến hoàn thành (ETA)".                           |

## 5. Tầm nhìn và Chiến lược (Vision & Strategy)

### 5.1. Tầm nhìn

UniSupport hướng đến việc trở thành Trợ lý Số (Digital Assistant) toàn diện cho sinh viên trong môi trường đại học. Không chỉ dừng ở mức xử lý yêu cầu, hệ thống sẽ cung cấp dữ liệu lớn (Big Data) giúp nhà trường phân tích xu hướng khó khăn của sinh viên để chủ động cải thiện dịch vụ giáo dục.

### 5.2. Chiến lược phát triển

- **Giai đoạn 1 (Core):** Hoàn thiện luồng Gửi - Xử lý - Nhận kết quả trơn tru.

- **Giai đoạn 2 (Data-driven):** Các thay đổi tính năng phải dựa vào báo cáo dữ liệu (Google Analytics) và Feedback hệ thống.

- **Giai đoạn 3 (Scale):** Tự động hóa giải đáp bằng AI/Chatbot và mở rộng các báo cáo nâng cao cho Ban giám hiệu.

## 6. Lộ trình phát triển & Product Backlog (Roadmap)

Ưu tiên phát triển các tính năng có tác động trực tiếp đến việc cải thiện 3 giá trị cốt lõi và các chỉ số SLA.

### 6.1. Lộ trình phát triển dài hạn

1.  **MVP (Bản khả thi tối thiểu):** Luồng đăng nhập, gửi yêu cầu, phân loại, xử lý, cập nhật trạng thái.

2.  **Kiểm chứng (Pilot):** Chạy thử nghiệm ở 1-2 phòng ban (IT, Đào tạo) & một nhóm sinh viên nhỏ.

3.  **Đo lường & Cải tiến:** Thu thập dữ liệu GA và Phỏng vấn (Mục 4) để sửa lỗi UI/UX trước khi mở rộng.

4.  **Triển khai đại trà (Go-live):** Mở rộng cho toàn trường sử dụng.

5.  **Mở rộng chức năng:** Xây dựng hệ thống báo cáo, AI, FAQ tự động.

6.  **Tối ưu hóa & Mở rộng hệ sinh thái số:** Tích hợp sâu với các hệ thống quản lý đào tạo, cổng thanh toán và hạ tầng CNTT toàn trường.

7.  **Trợ lý AI toàn diện & Cá nhân hóa trải nghiệm:** Ứng dụng AI để phân tích hành vi, tự động hóa xử lý tác vụ phức tạp và cá nhân hóa trải nghiệm hỗ trợ cho từng sinh viên.

### 6.2. Các tính năng ưu tiên tiếp theo (Product Backlog)

| **STT** | **Cải tiến (Feature)**        | **Giá trị mang lại**                                                                      | **Trạng thái** |
|---------|-------------------------------|-------------------------------------------------------------------------------------------|----------------|
| 1       | Trung tâm trợ giúp (FAQ)      | Trả lời tự động các câu hỏi lặp lại. Dự kiến giảm tải 30% lượng Ticket rác cho phòng ban. | Chờ duyệt      |
| 2       | Cơ chế leo thang (Escalation) | Tự động báo cáo cấp quản lý khi Ticket quá hạn 24h. Đảm bảo tỷ lệ đạt SLA \>95%.          | Chuẩn bị Dev   |
| 3       | Báo cáo hiệu suất (Dashboard) | Quản lý xem được biểu đồ hiệu suất trả lời Ticket của từng nhân viên theo thời gian thực. | Lên ý tưởng    |

## 7. Kết luận

Kế hoạch quản lý sản phẩm UniSupport không chạy theo số lượng tính năng mà tập trung tuyệt đối vào việc giải quyết nút thắt trong khâu vận hành hỗ trợ sinh viên. Sản phẩm được quản trị chặt chẽ bằng các chỉ tiêu định lượng (SLA), kiểm soát rủi ro bằng tự động hóa, và cải tiến liên tục bằng dữ liệu thực tế (Google Analytics kết hợp Phỏng vấn).
