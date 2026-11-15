# KẾ HOẠCH ĐIỀU PHỐI VÀ GIÁM SÁT DỰ ÁN UNISUPPORT

## 1. Tổng quan (Overview)

### 1.1. Mục đích của kế hoạch
Kế hoạch Điều phối và Giám sát Dự án UniSupport được xây dựng nhằm thiết lập phương thức trao đổi thông tin, báo cáo tiến độ, phối hợp nguồn lực và theo dõi tình hình thực hiện dự án.

Kế hoạch giúp Project Manager (PM) nắm bắt kịp thời tình hình công việc của các thành viên, phát hiện những vấn đề ảnh hưởng đến tiến độ và đưa ra phương án xử lý phù hợp. Đồng thời, thông qua hoạt động báo cáo định kỳ, các bên liên quan có thể theo dõi tình hình dự án mà không cần can thiệp trực tiếp vào công việc hằng ngày của từng thành viên.

### 1.2. Phạm vi điều phối và giám sát
Phạm vi điều phối và giám sát được thiết lập và phân định rõ ràng theo vai trò của từng bên tham gia dự án:

- **Developer:** Phạm vi công việc được giao, tiến độ hoàn thành mốc (milestone), cập nhật trạng thái tác vụ hàng tuần và phản hồi khó khăn kỹ thuật phát sinh.
- **Project Manager (PM):** Quản lý tiến độ tổng thể, cân đối nguồn lực nhóm, duy trì động lực làm việc, theo dõi chi phí, rủi ro và điều phối luồng thông tin giữa các bên.
- **Ban quản lý (Management):** Giám sát mức độ đạt mục tiêu chiến lược, tình hình sử dụng ngân sách tổng thể, hỗ trợ giải quyết các tắc nghẽn vượt cấp và phê duyệt thay đổi nhân sự/phạm vi lớn.
- **Khách hàng (Aurora University):** Theo dõi các sản phẩm đầu ra theo mốc cam kết, đánh giá mức độ đáp ứng yêu cầu và đưa ra phản hồi/yêu cầu điều chỉnh cấp cao.

### 1.3. Nguyên tắc thực hiện
- **Đúng vai trò (Role-based Accountability):** Mỗi vị trí chịu trách nhiệm hoàn toàn về độ chính xác và tính kịp thời của thông tin báo cáo thuộc phạm vi quản lý của mình.
- **Minh bạch & Tập trung:** Toàn bộ báo cáo và thông tin công việc phải được cập nhật công khai trên công cụ chung thay vì trao đổi cá nhân rải rác.
- **Báo cáo phân tầng (Tiered Reporting):** Mức độ chi tiết của thông tin được cô đọng phù hợp theo từng cấp (từ chi tiết kỹ thuật ở cấp Developer đến thông tin điều hành ở cấp Ban quản lý/Khách hàng).
- **Phản hồi chủ động:** Báo cáo không chỉ nêu hiện trạng mà phải đi kèm đề xuất giải pháp hoặc yêu cầu hỗ trợ cụ thể đối với các rủi ro, vướng mắc.

---

## 2. Quy trình báo cáo (Reporting Process)
Dự án áp dụng quy trình báo cáo đa cấp nhằm duy trì luồng thông tin minh bạch, liên tục giữa các vị trí và đối tác liên quan. Quy trình bao gồm 5 loại báo cáo cốt lõi với tần suất, mục đích và thành phần tham dự được phân định cụ thể.

### 2.1. Họp nhanh và cập nhật hằng ngày (Daily Stand-up & Daily Updates)
Họp nhanh hàng ngày nhằm trao đổi ngắn gọn tiến độ và giải quyết ngay các vướng mắc kỹ thuật phát sinh.

- **Tần suất & Thời lượng:** Mỗi ngày làm việc (Thứ 2 - Thứ 6), 15 phút (09:00 - 09:15).
- **Hình thức & Kênh:** Họp trực tuyến qua Google Meet / Discord hoặc cập nhật qua kênh Slack của dự án.
- **Thành phần tham dự:** Project Manager, Developers, QA/Tester.
- **Nội dung trọng tâm (3 câu hỏi):**
  1. Đã làm gì hôm qua?
  2. Sẽ làm gì hôm nay?
  3. Có khó khăn/tắc nghẽn (blocker) nào cần hỗ trợ không?

### 2.2. Báo cáo tuần (Weekly Report)
Báo cáo tuần dùng để đối soát tiến độ thực tế với kế hoạch cơ sở, đánh giá khối lượng công việc hoàn thành và lập kế hoạch cho tuần kế tiếp.

- **Tần suất:** Cuối tuần (trước 17:00 Thứ Sáu).
- **Thành phần tham dự:** Toàn bộ thành viên tham gia trong dự án.
- **Hình thức:** Đăng tải lên hệ thống Jira/GitHub Projects và gửi email tóm tắt.

**Cấu trúc báo cáo tuần:**

| Hạng mục | Chi tiết nội dung |
|---|---|
| **Công việc hoàn thành** | Danh sách các ticket/module đã được kiểm thử và nghiệm thu trong tuần. |
| **Tiến độ so với kế hoạch** | Tỷ lệ % hoàn thành kế hoạch tuần, giải trình nguyên nhân nếu có chậm trễ. |
| **Vấn đề & Rủi ro** | Các khó khăn kỹ thuật, rủi ro tiềm ẩn và phương án xử lý đề xuất. |
| **Kế hoạch tuần tới** | Danh mục nhiệm vụ trọng tâm và phân công cho tuần tiếp theo. |

### 2.3. Báo cáo cột mốc (Milestone Report)
Báo cáo cột mốc được lập khi dự án hoàn thành một giai đoạn quan trọng hoặc đầu ra bàn giao chính theo cam kết hợp đồng.

- **Thời điểm thực hiện:** Ngay sau khi hoàn thành từng mốc tiến độ (Milestone).
- **Mục đích:** Báo cáo kết quả nghiệm thu, demo sản phẩm cho Khách hàng và làm cơ sở xác nhận hoàn thành giai đoạn.
- **Sản phẩm đi kèm:** Biên bản nghiệm thu mốc, tài liệu kỹ thuật hoàn chỉnh và bản demo hệ thống.

### 2.4. Báo cáo cảnh báo rủi ro & sự cố (Alert / Incident Report)
Báo cáo cảnh báo được phát hành đột xuất khi phát sinh sự cố khẩn cấp hoặc rủi ro nghiêm trọng đe dọa đến tiến độ, chi phí hoặc chất lượng dự án.

- **Thời điểm phát hành:** Đột xuất, ngay khi phát hiện sự cố (trong vòng 15-60 phút tùy mức độ SLA).
- **Quy trình xử lý báo cáo cảnh báo:**
  - **Ghi nhận & Thông báo:** Thành viên phát hiện thông báo ngay trên kênh chung (Slack).
  - **Đánh giá tác động:** PM đánh giá mức độ ảnh hưởng (Critical, Major, Minor) và gửi thông báo khẩn cho Ban quản lý.
  - **Đề xuất giải pháp:** Lập phương án khắc phục khẩn cấp và xin phê duyệt nguồn lực ứng phó.

### 2.5. Báo cáo tổng kết dự án (Project Closure Report)
Báo cáo tổng kết được thực hiện khi dự án kết thúc nhằm đánh giá toàn bộ quá trình thực hiện, đối soát mục tiêu và đúc kết bài học kinh nghiệm.

- **Thời điểm:** Khi kết thúc dự án và hoàn tất bàn giao cho Khách hàng.
- **Nội dung trọng tâm:**
  - Đánh giá mức độ hoàn thành các mục tiêu ban đầu (Phạm vi, Tiến độ, Ngân sách, Chất lượng).
  - Tổng kết tài chính và chi phí thực tế so với ngân sách được duyệt.
  - Kinh nghiệm trong quản lý, kỹ thuật và phối hợp đội ngũ.
  - Bàn giao tài sản dự án, mã nguồn và tài liệu vận hành.

---

## 3. Quản lý minh bạch thông qua công cụ và quy định giao tiếp (Transparency & Communication Management)

### 3.1. Sử dụng công cụ quản lý và theo dõi công việc
Dự án sử dụng công cụ quản lý tập trung như Jira hoặc GitHub Projects để quản lý và theo dõi các công việc trong quá trình triển khai.

Các thông tin cần được cập nhật trên hệ thống bao gồm:
- Danh sách công việc và trạng thái thực hiện.
- Người phụ trách công việc.
- Tiến độ và kết quả cập nhật.
- Các vấn đề phát sinh trong quá trình thực hiện.
- Nội dung thay đổi và lịch sử cập nhật công việc.

Việc sử dụng công cụ chung giúp các thành viên và PM có thể theo dõi tình hình công việc trên cùng một nguồn thông tin, hạn chế tình trạng thông tin bị phân tán hoặc thất lạc.

### 3.2. Quy định giao tiếp và trao đổi thông tin
Để đảm bảo tính minh bạch và trách nhiệm trong quá trình phối hợp, dự án áp dụng các quy định sau:
- Các yêu cầu công việc, thay đổi phạm vi và quyết định quan trọng phải được ghi nhận trên công cụ quản lý chung.
- Thành viên cần cập nhật trạng thái công việc sau khi hoàn thành hoặc khi có thay đổi đáng kể.
- Các thành viên có thể trao đổi trực tiếp qua Zalo hoặc Discord để giải quyết vấn đề nhanh chóng. Tuy nhiên, những nội dung ảnh hưởng đến công việc, quyết định hoặc yêu cầu chính thức phải được cập nhật lại trên công cụ quản lý dự án.
- Không sử dụng tin nhắn riêng làm nơi lưu trữ duy nhất đối với các quyết định quan trọng của dự án.

Quy định này giúp duy trì tính linh hoạt trong giao tiếp nhưng vẫn đảm bảo các thông tin quan trọng được lưu trữ và có thể kiểm tra khi cần thiết.

### 3.3. Thông báo và xử lý sự cố khẩn cấp
Đối với những sự cố nghiêm trọng như rò rỉ dữ liệu, lỗi hệ thống nghiêm trọng hoặc các vấn đề có khả năng ảnh hưởng lớn đến dự án, thành viên phát hiện sự cố cần thông báo ngay trên kênh giao tiếp chung.

**Quy trình xử lý gồm:**
1. **Thông báo sự cố:** Thành viên phát hiện thông báo tình hình trên kênh chung, nêu rõ thời điểm và nội dung sự cố.
2. **Tiếp nhận thông tin:** PM tiếp nhận thông tin, xác định mức độ ảnh hưởng và thông báo đến các thành viên liên quan.
3. **Phối hợp xử lý:** Các thành viên có liên quan phối hợp tìm nguyên nhân và thực hiện biện pháp xử lý.
4. **Cập nhật tình hình:** Người phụ trách cập nhật tiến độ xử lý và kết quả trên kênh chung.
5. **Ghi nhận sự cố:** Nội dung sự cố, quá trình xử lý và kết quả cuối cùng được lưu lại trên công cụ quản lý dự án.

**Thời gian cam kết xử lý sự cố (SLA):**

| Mức độ | Mô tả | Thời gian phản hồi | Thời gian khắc phục |
|---|---|---|---|
| **Nghiêm trọng (Critical)** | Hệ thống ngừng hoạt động hoàn toàn, rò rỉ dữ liệu hoặc ảnh hưởng trực tiếp đến toàn bộ người dùng. | Trong vòng 15 phút | Trong vòng 2 - 4 giờ |
| **Trung bình (Major)** | Tính năng chính bị lỗi nhưng có giải pháp tạm thời, hoặc ảnh hưởng đến một nhóm người dùng. | Trong vòng 1 giờ | Trong vòng 8 - 12 giờ |
| **Thấp (Minor)** | Lỗi nhỏ về giao diện, hiển thị hoặc các vấn đề không ảnh hưởng đến hoạt động cốt lõi. | Trong vòng 4 giờ | Trong vòng 24 - 48 giờ |

Việc thông báo trên kênh chung giúp các thành viên nắm bắt tình hình kịp thời và phối hợp xử lý thống nhất.

### 3.4. Quy trình Yêu cầu Thay đổi (Change Request - CR) và Phân cấp Phê duyệt
Mọi thay đổi về phạm vi, tiến độ, chi phí hoặc kỹ thuật đều phải tuân thủ quy trình chính thức để kiểm soát rủi ro.

#### A. Các bước xử lý Yêu cầu Thay đổi:
1. **Khởi tạo Yêu cầu:** Đề xuất biểu mẫu CR nêu rõ lý do và nội dung thay đổi.
2. **Đánh giá Tác động (6 chiều):** PM và nhóm kỹ thuật phân tích ảnh hưởng toàn diện:
   - **Phạm vi (Scope):** Tính năng nào được thêm, sửa hoặc hủy bỏ?
   - **Giờ công & Chi phí (Effort & Cost):** Tăng/giảm bao nhiêu giờ làm việc? Có phát sinh thêm chi phí không?
   - **Lịch trình (Timeline):** Ảnh hưởng thế nào đến deadline của Milestone hiện tại?
   - **Nguồn lực (Resources):** Cần huy động thêm nhân sự hay điều chuyển công việc?
   - **Rủi ro (Risk):** Có làm phát sinh rủi ro kỹ thuật hoặc rủi ro pháp lý mới không?
   - **Kiểm thử (Quality & Test):** Cần bổ sung bao nhiêu test case mới? Cần test hồi quy phạm vi nào?
3. **Phê duyệt theo phân cấp thẩm quyền:** Chuyển hồ sơ CR đến cấp có thẩm quyền tương ứng theo Bảng Approver Matrix.
4. **Triển khai & Cập nhật đồng bộ tài liệu:** Sau khi CR được phê duyệt bằng văn bản, PM phân bổ task trên GitHub và cập nhật đồng bộ các tài liệu liên quan.

#### B. Phân cấp Phê duyệt (Approver Matrix):

| Mức độ | Mô tả tác động | Cấp phê duyệt |
|---|---|---|
| **Nhỏ (Minor)** | Thay đổi nhỏ về UI/kỹ thuật, không ảnh hưởng deadline và ngân sách. | Project Manager (PM) |
| **Vừa (Medium)** | Thay đổi tính năng hoặc trễ deadline < 1 tuần, trong hạn mức chi phí dự phòng. | PM & Đại diện Khách hàng |
| **Lớn (Major)** | Thay đổi phạm vi cốt lõi, trễ milestone chính hoặc vượt ngân sách. | Ban quản lý & Khách hàng |

#### C. Danh mục tài liệu bắt buộc cập nhật đồng bộ khi CR được duyệt:
Khi một Yêu cầu Thay đổi được thông qua, nhóm chịu trách nhiệm cập nhật đồng bộ các tài liệu gốc sau:
- **Báo giá & Kế hoạch ngân sách:** Cập nhật sheet phân bổ chi phí nếu có phát sinh ngân sách.
- **Master Schedule:** Cập nhật WBS, danh sách Milestone và biểu đồ Gantt trong Master Schedule.
- **Đặc tả yêu cầu PRD:** Cập nhật lại mô tả FR, Business Rules và Acceptance Criteria (`AC-...`) trong thư mục `docs/03-modules/`.
- **Kịch bản kiểm thử:** Cập nhật `docs/06-acceptance/test-scenarios.md` và Ma trận truy vết.
- **Ghi nhật ký thay đổi (Change Log):** Bắt buộc ghi một dòng mới vào sheet/bảng Change Log (gồm: Mã CR, Ngày phê duyệt, Nội dung thay đổi, Người phê duyệt).

---

## 4. Điều phối nguồn lực và duy trì động lực đội ngũ (Resource Coordination & Team Motivation)

### 4.1. Theo dõi và đánh giá khối lượng công việc
PM có trách nhiệm theo dõi khối lượng công việc của từng thành viên thông qua trạng thái công việc, báo cáo định kỳ và tiến độ thực hiện trên công cụ quản lý dự án.

Việc theo dõi nhằm:
- Phát hiện thành viên đang có khối lượng công việc quá lớn.
- Xác định các công việc bị chậm do thiếu nguồn lực.
- Nhận biết những thành viên còn khả năng hỗ trợ công việc khác.
- Đánh giá tình hình sử dụng nguồn lực trong nhóm.

Khi phát hiện sự mất cân đối, PM cần xem xét điều chỉnh khối lượng công việc để đảm bảo tiến độ chung.

### 4.2. Điều phối và bổ sung nguồn lực
Khi khối lượng công việc vượt quá khả năng đáp ứng của nhóm, PM cần chủ động đánh giá tình hình và đề xuất phương án bổ sung nguồn lực.

Các phương án điều phối bao gồm:
- **Phân bổ lại công việc:** Điều chỉnh công việc giữa các thành viên dựa trên khối lượng và khả năng thực hiện.
- **Điều chuyển nhân sự:** Đề xuất Ban quản lý hỗ trợ điều chuyển nhân sự từ các dự án khác khi cần thiết.
- **Bổ sung nhân sự:** Đề xuất tuyển thêm nhân sự nếu nguồn lực hiện tại không đáp ứng được yêu cầu dự án.

Mọi đề xuất bổ sung hoặc điều chuyển nhân sự cần được trao đổi và thống nhất với Ban quản lý trước khi thực hiện.

### 4.3. Duy trì động lực và gắn kết đội ngũ
Bên cạnh việc điều phối công việc, PM cần quan tâm đến tinh thần làm việc và sự gắn kết giữa các thành viên.

Dự án đề xuất duy trì các hoạt động sau:
- **Ghi nhận đóng góp:** Kịp thời ghi nhận những thành viên hoàn thành tốt công việc hoặc có đóng góp tích cực cho nhóm.
- **Khen thưởng:** Đề xuất hình thức khen thưởng phù hợp đối với những thành viên có thành tích nổi bật.
- **Hoạt động gắn kết:** Tổ chức các buổi gặp mặt, ăn uống hoặc hoạt động nhóm nhằm tăng cường sự kết nối giữa các thành viên.
- **Quỹ gắn kết đội ngũ:** Đề xuất duy trì ngân sách hoạt động nhóm theo tháng, tính trên từng thành viên để phục vụ các hoạt động chung.

Các khoản chi cho hoạt động gắn kết và khen thưởng cần được thống nhất, phê duyệt trước khi sử dụng.

---

## 5. Giám sát tổng thể dự án (Overall Project Monitoring)

### 5.1. Phạm vi giám sát dự án
PM chịu trách nhiệm theo dõi tình hình dự án trong toàn bộ vòng đời, từ giai đoạn khởi động đến khi hoàn thành và báo cáo kết quả.

Các nội dung giám sát chính bao gồm:

| Nội dung giám sát | Hoạt động theo dõi |
|---|---|
| **Tiến độ dự án** | Theo dõi tình hình hoàn thành công việc và các mốc tiến độ |
| **Kết quả thực hiện** | Kiểm tra các kết quả và đầu ra đã hoàn thành |
| **Nguồn lực** | Theo dõi khối lượng công việc và tình hình sử dụng nhân sự |
| **Chi phí** | Theo dõi chi phí thực tế so với ngân sách dự kiến |
| **Rủi ro và vấn đề** | Ghi nhận, theo dõi và đánh giá các vấn đề ảnh hưởng đến dự án |
| **Phản hồi khách hàng** | Tiếp nhận và theo dõi các ý kiến từ đại diện khách hàng |

### 5.2. Các chỉ số theo dõi dự án (Project Monitoring Metrics)
Để đánh giá tình hình thực hiện dự án dựa trên dữ liệu, PM sử dụng các chỉ số theo dõi sau:

| Chỉ số | Ý nghĩa | Cách theo dõi |
|---|---|---|
| **Tỷ lệ hoàn thành công việc** | Đánh giá mức độ hoàn thành các công việc trong dự án | Số công việc hoàn thành / Tổng số công việc |
| **Tiến độ thực tế so với kế hoạch** | Xác định dự án đang đúng tiến độ hay chậm tiến độ | Đối chiếu kết quả thực tế với kế hoạch |
| **Chi phí thực tế** | Theo dõi mức chi phí đã sử dụng | So sánh chi phí thực tế với ngân sách dự kiến |
| **Số lượng vấn đề chưa xử lý** | Theo dõi các vấn đề còn tồn đọng | Tổng hợp các vấn đề chưa được giải quyết |
| **Tình trạng rủi ro** | Theo dõi các rủi ro đang ảnh hưởng đến dự án | Cập nhật trạng thái và mức độ ảnh hưởng |

Các chỉ số được cập nhật trong quá trình thực hiện và sử dụng làm cơ sở cho báo cáo định kỳ. Những chỉ số chưa có dữ liệu thực tế sẽ được ghi nhận khi có thông tin, không sử dụng số liệu ước đoán thay cho kết quả thực tế.

### 5.3. Phân tích sai lệch và hành động khắc phục
Trong quá trình giám sát, PM cần so sánh tình hình thực tế với kế hoạch để xác định những sai lệch có thể ảnh hưởng đến mục tiêu dự án.

Khi phát hiện sai lệch, PM thực hiện:
1. **Xác định sai lệch:** Ghi nhận công việc chậm tiến độ, chi phí vượt dự kiến hoặc vấn đề chưa được xử lý.
2. **Phân tích nguyên nhân:** Xác định nguyên nhân dẫn đến sai lệch dựa trên báo cáo và thông tin thực tế.
3. **Đề xuất biện pháp khắc phục:** Điều chỉnh cách thực hiện, phân bổ lại nguồn lực hoặc đề xuất hỗ trợ từ Ban quản lý.
4. **Theo dõi kết quả:** Kiểm tra hiệu quả của biện pháp khắc phục trong các kỳ báo cáo tiếp theo.

Đối với những sai lệch vượt quá khả năng xử lý của nhóm, PM cần báo cáo Ban quản lý để thống nhất phương án phù hợp.

### 5.4. Báo cáo tình hình và kết quả dự án
PM có trách nhiệm tổng hợp tình hình thực hiện và báo cáo cho các bên liên quan trong suốt quá trình triển khai.

Báo cáo cần thể hiện:
- Tình hình tiến độ và kết quả thực hiện.
- Mức độ hoàn thành các mục tiêu đã đề ra.
- Tình hình sử dụng nguồn lực và chi phí.
- Các vấn đề, rủi ro còn tồn tại.
- Những biện pháp đã thực hiện để khắc phục sai lệch.
- Kết quả cuối cùng của dự án.

Sau khi dự án kết thúc, PM tổng hợp kết quả thực hiện và báo cáo đến Ban quản lý cùng đại diện khách hàng.

---

## 6. Kết luận (Conclusion)
Kế hoạch Điều phối và Giám sát Dự án UniSupport thiết lập phương thức báo cáo, trao đổi thông tin, điều phối nguồn lực và theo dõi tình hình thực hiện dự án.

Thông qua quy trình báo cáo định kỳ, công cụ quản lý tập trung và các chỉ số giám sát, PM có thể nắm bắt tiến độ, phát hiện vấn đề và đề xuất biện pháp xử lý kịp thời. Đồng thời, việc theo dõi khối lượng công việc và duy trì hoạt động gắn kết giúp nhóm phối hợp hiệu quả hơn trong quá trình triển khai.

Kế hoạch là cơ sở để đảm bảo thông tin dự án được cập nhật minh bạch, các nguồn lực được điều phối phù hợp và tình hình thực hiện được kiểm soát xuyên suốt vòng đời dự án.
