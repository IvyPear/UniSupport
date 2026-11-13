# KẾ HOẠCH QUẢN LÝ SẢN PHẨM UNISUPPORT

## 1. Tổng quan sản phẩm

### 1.1. UniSupport là gì?
UniSupport là nền tảng trực tuyến giúp sinh viên gửi yêu cầu hỗ trợ đến các phòng ban chuyên trách của trường và theo dõi tiến độ xử lý tại một đầu mối duy nhất. Hệ thống tự động phân loại và điều phối Ticket, giúp giảm tải quy trình thủ công và nâng cao tốc độ giải quyết thủ tục hành chính.

### 1.2. Vấn đề cần giải quyết
Việc hỗ trợ sinh viên hiện tại thông qua nhiều kênh riêng lẻ (học vụ, tài chính, cơ sở vật chất, IT...) phát sinh ba vấn đề lớn:
- **Với sinh viên:** Không biết liên hệ đơn vị nào cho đúng và không nắm được tiến độ yêu cầu của mình đang ở đâu.
- **Với phòng ban:** Nhận yêu cầu từ quá nhiều nguồn (Email, Zalo, mạng xã hội, trực tiếp), khó phân loại, dễ trôi việc và khó kiểm soát tiến độ xử lý.
- **Với nhà trường:** Thiếu dữ liệu tổng thể để đánh giá năng lực và chất lượng hỗ trợ sinh viên của từng đơn vị.

### 1.3. Giá trị cốt lõi
- **Tập trung:** Mọi yêu cầu đi qua một cổng duy nhất, giải quyết bài toán "đi đâu, hỏi ai".
- **Minh bạch:** Sinh viên theo dõi được thời gian thực (real-time) trạng thái xử lý yêu cầu.
- **Hiệu quả:** Yêu cầu được tự động phân loại, có thời hạn cam kết dịch vụ (SLA) rõ ràng và đo lường được hiệu suất thực tế.

---

## 2. Đo lường sản phẩm & Cam kết dịch vụ (SLA)

Bộ chỉ số dưới đây dùng để đo lường mức độ thành công của sản phẩm trong thực tế. Hệ thống chỉ được đánh giá là hiệu quả nếu đạt được các mục tiêu (Target) đề ra.

| **Nhóm** | **Chỉ số đo lường** | **Công thức / Cách đo** | **Mục tiêu kỳ vọng (Target/SLA)** | **Tần suất theo dõi** | **Người theo dõi** |
|:---|:---|:---|:---|:---:|:---|
| **Sử dụng** | Lượt tạo Ticket thành công | Số Ticket hợp lệ tạo mới trong tháng | Tăng trưởng 15% / học kỳ | Hàng tháng | Product Owner |
| **Hoàn thành** | Tỷ lệ xử lý thành công | (Số Ticket có kết quả / Tổng Ticket hợp lệ) * 100 | > 90% | Hàng tuần | Trưởng phòng ban |
| **Tốc độ** | Thời gian phản hồi đầu tiên (First Response) | Thời gian từ lúc gửi đến khi nhân viên nhận xử lý | < 4 giờ làm việc | Hàng tuần | Trưởng phòng ban |
| **Tốc độ** | Thời gian xử lý hoàn tất (Resolution Time) | Thời gian trung bình từ lúc tiếp nhận đến khi đóng Ticket | < 48 giờ làm việc (Tùy danh mục) | Hàng tuần | Trưởng phòng ban |
| **Điều phối** | Tỷ lệ điều phối lại | Tỷ lệ Ticket bị chuyển trả lại hàng chờ phân loại | < 10% | Hàng tháng | Quản trị viên (Admin) |
| **Tiến độ** | Tỷ lệ quá hạn SLA | Tỷ lệ Ticket vi phạm hạn chót xử lý | < 5% | Hàng ngày/Tuần | Trưởng phòng / PM |
| **Hài lòng** | Điểm hài lòng (CSAT) | Khảo sát 1–5 sao sau khi Ticket đóng | > 4.0 / 5.0 | Hàng tháng | Ban Giám hiệu / PO |

---

## 3. Chất lượng và Vận hành (Quality & Operations)

### 3.1. Tiêu chuẩn nghiệm thu phát hành (Release Criteria)
Hệ thống bắt buộc phải trải qua kiểm thử QC/UAT và thỏa mãn các tiêu chuẩn về mức độ lỗi dưới đây mới được phép phát hành (Go-live):

| **Mức độ lỗi** | **Mô tả tính chất** | **Tiêu chuẩn nghiệm thu để Ra mắt (Release Criteria)** | **Quy trình xử lý tiếp theo** |
|:---|:---|:---|:---|
| **P0 (Critical)** | Lỗi hệ thống, sập dịch vụ, hỏng luồng cốt lõi (đăng nhập, tạo đơn) | Bắt buộc = 0 lỗi. Tuyệt đối không được phép tồn đọng bất kỳ lỗi P0 nào. | Kích hoạt Hotfix khẩn cấp theo Quy trình Quản lý Chất lượng. |
| **P1 (High)** | Lỗi chức năng quan trọng (điều phối, thông báo, phân quyền) | Bắt buộc = 0 lỗi. (Trường hợp ngoại lệ phải có giải pháp Workaround được duyệt). | Sửa lỗi trong đợt phát hành, QA re-test 100%. |
| **P2 (Medium)** | Lỗi giao diện nhỏ, tính năng phụ, hiển thị chưa chuẩn | Chấp nhận < 5 lỗi. | Đưa vào Product Backlog xử lý ở phiên bản tiếp theo. |
| **P3 (Low)** | Cải tiến UI/UX nhỏ, tối ưu hóa câu chữ | Không giới hạn số lượng. | Chuyển vào Feedback Log để đánh giá ưu tiên sau. |

### 3.2. Quản trị rủi ro vận hành (Risk Management)

| **Rủi ro dự kiến** | **Mức ảnh hưởng** | **Giải pháp phòng ngừa & Xử lý trên hệ thống** |
|:---|:---:|:---|
| **Phòng ban xử lý chậm/trễ hạn SLA** | Cao | Thiết lập cơ chế leo thang tự động (Auto-Escalation): Quá hạn 2h cảnh báo đỏ trên giao diện nhân viên; quá hạn 24h tự động gửi thông báo đến Trưởng phòng ban. |
| **Lộ lọt thông tin cá nhân của sinh viên** | Rất cao | Áp dụng che giấu danh tính (Data Anonymization): Chỉ hiển thị thông tin cần thiết phục vụ xử lý đơn. Dữ liệu xuất báo cáo được ẩn danh. Mã hóa thông tin cá nhân trong CSDL. |
| **Hệ thống quá tải lúc cao điểm (Đầu kỳ, thi cử)** | Cao | Tối ưu hóa tài nguyên máy chủ: Thiết lập Auto-scaling trên nền tảng Cloud (Render/AWS). Tối ưu hóa truy vấn CSDL và bộ nhớ đệm (Caching). |
| **Sinh viên gửi nhầm phòng ban hoặc tạo đơn rác** | Trung bình | Giao diện điều hướng theo loại thủ tục cụ thể thay vì phòng ban. Hệ thống tự động ánh xạ về phòng ban chuyên trách; đơn chưa rõ phân về hàng chờ Admin phân loại lại. |

---

## 4. Quy trình thu thập và Quản lý phản hồi (Feedback Management)

### 4.1. Kênh tiếp nhận và phương pháp thu thập phản hồi
Hệ thống kết hợp đa dạng kênh thu thập để lắng nghe cả phản hồi chủ động từ người dùng và dữ liệu hành vi thực tế:

1. **Kênh tiếp nhận phản hồi trực tiếp (In-app & Online):**
   - **Form khảo sát hài lòng (CSAT):** Tự động hiển thị đánh giá 1–5 sao kèm ô góp ý ngay khi Ticket hoàn tất (`RESOLVED`/`CLOSED`).
   - **Nút "Góp ý & Báo lỗi" trên giao diện:** Cung cấp mẫu biểu ngắn gọn (Tiêu đề, Loại góp ý, Ảnh chụp màn hình) tại chân trang để người dùng gửi phản hồi bất kỳ lúc nào.
   - **Mẫu GitHub Issue Feedback:** Kênh dành cho đội ngũ vận hành nội bộ và quản trị viên nhà trường ghi nhận phản hồi kỹ thuật hoặc đề xuất quy trình.

2. **Phương pháp nghiên cứu dữ liệu "What & Why":**
   - **Bước 1 (Định lượng - WHAT):** Sử dụng các công cụ phân tích dữ liệu tự động:
     - *Google Analytics (GA4) / Microsoft Clarity:* Theo dõi lưu lượng truy cập, tỷ lệ thoát trang, các luồng thao tác phổ biến.
     - *Bản đồ nhiệt (Heatmap / Clarity):* Quan sát trực quan các vị trí click chuột, vùng cuộn trang để phát hiện điểm nghẽn giao diện.
   - **Bước 2 (Định tính - WHY):** Khoanh vùng điểm bất thường từ dữ liệu số và tổ chức phỏng vấn chuyên sâu 1:1 (5–7 người dùng đại diện) để tìm hiểu nguyên nhân tâm lý cốt lõi.
   - **Bước 3 (Phân loại - CLASSIFY):** Phân loại phản hồi theo bảng chuẩn hóa ở mục 4.2.
   - **Bước 4 (Thực thi - ACTION):** Chuyển giao phản hồi đến đúng quy trình dự án tương ứng để đưa ra hành động khắc phục hoặc cải tiến.

### 4.2. Quản lý, phân loại và luồng xử lý tiếp theo

Mọi phản hồi thu thập được phải được phân loại và chuyển tiếp vào quy trình xử lý chuyên trách theo bảng sau:

| STT | Loại phản hồi | Tiêu chí nhận diện | Quy trình tiếp nhận & Xử lý tiếp theo | Đầu mối chịu trách nhiệm |
|:---:|:---|:---|:---|:---|
| 1 | **Lỗi kỹ thuật / Sự cố (Bugs)** | Báo cáo lỗi giao diện, đứt kết nối, tính năng chạy sai đặc tả PRD | Chuyển vào **Quy trình Quản lý Chất lượng** ([QL-chat-luong.md](QL-chat-luong.md)), gắn nhãn mức độ lỗi (P0–P3). | Đội ngũ QA/QC |
| 2 | **Yêu cầu thay đổi / Tính năng mới (Feature Requests / CR)** | Đề xuất bổ sung tính năng mới, thay đổi luồng nghiệp vụ hoặc quy tắc tính điểm/thời hạn | Chuyển vào **Quy trình Kiểm soát Thay đổi** ([Dieuphoi-Giamsat.md](Dieuphoi-Giamsat.md)), lập hồ sơ CR đánh giá tác động giá/tiến độ. | Project Manager & Ban Giám hiệu |
| 3 | **Cải tiến giao diện & trải nghiệm (UX/UI Improvements)** | Góp ý về màu sắc, bố cục, nút bấm, độ tiện dụng mà không làm đổi nghiệp vụ cốt lõi | Đưa vào **Product Backlog** (Mục 6.1) để chấm điểm ưu tiên cho phiên bản tiếp theo. | Business Analyst / UI Designer |
| 4 | **Thắc mắc vận hành / Quy trình (Inquiries)** | Sinh viên thắc mắc về thời gian xử lý, giấy tờ cần chuẩn bị hoặc cách dùng tính năng | Chuyển đến bộ phận CSKH/Nhân viên phòng ban để giải đáp; tổng hợp để bổ sung vào tài liệu **FAQ / Hướng dẫn sử dụng**. | Nhân viên tiếp nhận & BA |
| 5 | **Góp ý chung / Khác (General Feedback)** | Lời khen ngợi, nhận xét chung về thái độ phục vụ hoặc ý kiến khác | Lưu trữ vào **Sổ tay Phản hồi (Feedback Log)** định kỳ hàng tháng để báo cáo đánh giá dịch vụ. | Product Owner |

### 4.3. Báo cáo phân tích đối chiếu *(Dữ liệu mô phỏng)*

> **Ghi chú:** Bảng dưới đây là kịch bản phân tích giả định mô phỏng phương pháp kết hợp số liệu định lượng (GA4) và định tính (Phỏng vấn) để đưa ra quyết định cải tiến sản phẩm.

| Vấn đề phát hiện trên số liệu (What) *(Mô phỏng)* | Kết quả phỏng vấn người dùng (Why) *(Mô phỏng)* | Phân tích rủi ro sản phẩm | Hành động cải tiến thực tế (Action Item) |
|:---|:---|:---|:---|
| **Tạo Ticket:** Tỷ lệ thoát ngang (Bounce Rate) ở form tạo là 60%. Người dùng dừng > 3 phút nhưng không bấm gửi. | *"Em không biết vấn đề của em thì phòng Đào tạo hay phòng CTSV giải quyết. Sợ chọn sai bị từ chối nên em không gửi nữa."* | Giao diện đòi hỏi sinh viên phải nắm rõ cơ cấu tổ chức nhà trường → Đi ngược lại giá trị cốt lõi "Tập trung". | Giữ tùy chọn mục 'Khác' (theo FR-M05-01) và đề xuất tính năng tự động gợi ý phòng ban theo tên thủ tục ở Giai đoạn 2 để không mâu thuẫn với PRD M05. |
| **Theo dõi Ticket:** Tần suất truy cập lại trang chi tiết rất cao (trung bình 4 lần/ngày cho 1 đơn). | *"Hệ thống chỉ báo 'Đang xử lý', em không biết bao giờ xong nên cứ mở ra xem liên tục."* | Trạng thái hiển thị thiếu minh bạch về mốc thời gian, gây lo lắng cho người dùng. | Bổ sung thanh tiến trình trực quan (Progress Bar) kèm mốc "Thời gian dự kiến hoàn thành (ETA)". |

---

## 5. Tầm nhìn và Chiến lược (Vision & Strategy)

### 5.1. Tầm nhìn dài hạn
UniSupport hướng tới trở thành Cổng Dịch vụ Sinh viên Toàn diện (Digital Student Hub) cho nhà trường. Không dừng lại ở việc xử lý yêu cầu hành chính đơn lẻ, hệ thống đóng vai trò trung tâm dữ liệu giúp Ban Giám hiệu nắm bắt xu hướng vướng mắc của sinh viên để chủ động cải tiến chất lượng đào tạo và dịch vụ hỗ trợ.

### 5.2. Chiến lược phát triển qua các giai đoạn
- **Giai đoạn 1 (Core Foundations):** Hoàn thiện và vận hành ổn định luồng nghiệp vụ cốt lõi: Tiếp nhận $\rightarrow$ Điều phối $\rightarrow$ Xử lý $\rightarrow$ Nghiệm thu kết quả.
- **Giai đoạn 2 (Data-driven Optimization):** Tối ưu hóa trải nghiệm người dùng dựa trên phản hồi thực tế, dữ liệu phân tích truy cập và chỉ số SLA.
- **Giai đoạn 3 (Scale & Ecosystem):** Tự động hóa giải đáp bằng Trợ lý ảo (AI Chatbot) và mở rộng tích hợp vào hệ sinh thái quản lý đại học số.

---

## 6. Lộ trình phát triển & Danh mục cải tiến (Roadmap & Backlog)

### 6.1. Danh mục tính năng ưu tiên sau bàn giao (Product Backlog)

> **Nguyên tắc ưu tiên:** Danh mục Backlog chỉ bao gồm các tính năng mở rộng nằm ngoài phạm vi 13 phân hệ cốt lõi đã cam kết bàn giao tại PRD. Thứ tự ưu tiên được sắp xếp dựa trên **Tác động tới trải nghiệm người dùng (Impact)** và **Hiệu quả giảm tải vận hành cho nhà trường (Value vs Effort)**.

| STT | Tính năng cải tiến (Feature) | Giá trị mang lại & Tác động | Độ ưu tiên | Trạng thái |
|:---:|:---|:---|:---:|:---:|
| 1 | **Trung tâm trợ giúp thông minh (FAQ Hub)** | Tự động gợi ý câu trả lời cho các thắc mắc phổ biến ngay khi sinh viên gõ tiêu đề đơn; dự kiến giảm 30% lượng đơn rác/trùng lặp. | **High** | Chờ phê duyệt |
| 2 | **Tích hợp Cổng Thông tin Sinh viên (SSO & Profile API)** | Tự động đồng bộ thông tin ngành học, lớp, trạng thái học phí khi tạo đơn; loại bỏ việc sinh viên phải nhập lại thông tin cá nhân. | **Medium** | Lên ý tưởng |
| 3 | **Trợ lý Ảo AI tư vấn thủ tục (AI Chatbot Assistant)** | Hỗ trợ giải đáp tự động 24/7 các quy chế đào tạo, chuẩn đầu ra và hướng dẫn chuẩn bị hồ sơ trước khi nộp đơn chính thức. | **Medium** | Nghiên cứu công nghệ |
| 4 | **Ứng dụng di động UniSupport (Mobile App)** | Đẩy thông báo đẩy (Push Notifications) thời gian thực về tiến độ đơn; phục vụ sinh viên thao tác thuận tiện trên điện thoại. | **Low** | Kế hoạch dài hạn |

### 6.2. Lộ trình phát triển dài hạn (Roadmap)

> **Nguyên tắc cốt lõi:** Lộ trình phát triển được thiết lập theo **giá trị cần đạt**, không chạy theo mốc thời gian cố định. Dự án chỉ chuyển sang giai đoạn tiếp theo khi đã đáp ứng đầy đủ các điều kiện chuyển giao (Exit Criteria) định lượng.

| Giai đoạn | Hạng mục trọng tâm | Nội dung thực hiện | Điều kiện chuyển giao (Exit Criteria) |
|:---|:---|:---|:---|
| **Giai đoạn 1 (Hiện tại: 16 tuần)** | **Triển khai Hệ thống Cốt lõi (Web Platform)** | Triển khai 13 module chức năng (M01–M13) theo cam kết PRD; hoàn thành nghiệm thu UAT với Ban Giám hiệu. | - 100% test case P0 và P1 đạt nghiệm thu (0 lỗi tồn đọng).<br>- Tỷ lệ hoàn tất xử lý đạt chuẩn cam kết SLA (> 90%). |
| **Giai đoạn 2 (Sau bàn giao: 3–6 tháng)** | **Tối ưu hóa Vận hành & Trải nghiệm** | Tiếp nhận phản hồi thực tế; phát hành tính năng FAQ Hub; bảo hành và tinh chỉnh luồng giao diện sinh viên. | - Hệ thống vận hành liên tục không có sự cố P0 trong 60 ngày.<br>- Điểm đánh giá mức độ hài lòng (CSAT) duy trì > 4.0/5.0. |
| **Giai đoạn 3 (Dài hạn: 1–2 năm)** | **Mở rộng Hệ sinh thái & Mobile** | Phát triển ứng dụng di động (iOS/Android); tích hợp API đào tạo và ứng dụng AI tự động hóa. | - Tỷ lệ người dùng truy cập từ thiết bị di động đạt > 70% tổng traffic (đo lường bằng GA4/Clarity).<br>- Có biên bản nghiệm thu tích hợp kỹ thuật với phòng CNTT nhà trường. |

### 6.3. Thẩm quyền và cơ chế ra quyết định sau bàn giao

Nhằm đảm bảo tính kế thừa và quy trình vận hành nhất quán sau khi dự án nghiệm thu chính thức, quyền hạn và trách nhiệm được phân định như sau:

- **Ban Giám hiệu (Sponsor / Steering Committee):** Phê duyệt tầm nhìn chiến lược, định hướng mở rộng hệ sinh thái, phê duyệt ngân sách nâng cấp định kỳ và ra quyết định cuối cùng về các thay đổi chính sách vận hành cấp trường.
- **Đại diện các Phòng ban (Business Owners / Key Users):** Đề xuất điều chỉnh hoặc bổ sung danh mục thủ tục thuộc thẩm quyền phụ trách; quản lý phân công nhân sự nội bộ và tham gia nghiệm thu tính năng mới liên quan đến đơn vị mình.
- **Đội ngũ Kỹ thuật & Quản trị Hệ thống (IT & Product Owner):** Chịu trách nhiệm bảo trì hệ thống, giám sát an toàn thông tin, tiếp nhận và phân loại phản hồi, lập kế hoạch phát hành phiên bản mới và khắc phục sự cố kỹ thuật theo SLA.

---

## 7. Kết luận
Kế hoạch quản lý sản phẩm UniSupport định hình phương pháp tiếp cận lấy người dùng làm trung tâm, gắn chặt mọi cải tiến với dữ liệu thực tế và cam kết dịch vụ (SLA). Bằng việc phân loại phản hồi khoa học, phân định rạch ròi thẩm quyền sau bàn giao và quản trị lộ trình theo giá trị định lượng, sản phẩm đảm bảo duy trì chất lượng và giá trị sử dụng lâu dài cho nhà trường.
