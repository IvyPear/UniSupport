# KẾ HOẠCH QUẢN LÝ CHẤT LƯỢNG

## 1. Hoạch định chất lượng (Quality Planning – Plan)

Mục tiêu là xác định tiêu chuẩn chất lượng, cách đo, người thực hiện và bằng chứng cần lưu. PM quản lý phạm vi và AC; QA rà soát quy trình và tài liệu để phòng ngừa lỗi; QC lập và thực hiện kiểm thử; Dev làm rõ khả năng triển khai và cung cấp bằng chứng kiểm tra phần mình thực hiện.

### 1.1. Đầu vào và tiêu chuẩn

Đầu vào gồm PRD đã thống nhất, danh sách FR/NFR, User Story, Acceptance Criteria (AC), thiết kế giao diện, ma trận vai trò/quyền và kế hoạch phát hành. Mỗi FR cần có mã, người phụ trách, AC có thể kiểm chứng và liên kết test case.

### 1.2. Cổng kiểm chuẩn

| **Cổng**                   | **Điều kiện đi tiếp**                                                  | **Người thực hiện / bằng chứng**                                                                                             |
|----------------------------|------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **Trước phát triển (DoR)** | FR/AC rõ, không mâu thuẫn; có dữ liệu, luồng ngoại lệ và bên liên quan | PM xác nhận phạm vi/ưu tiên; QA rà soát tài liệu; QC xác nhận khả năng kiểm thử; Dev làm rõ điểm triển khai; biên bản review |
| **Trong phát triển**       | Có review thay đổi, kiểm tra phù hợp và ghi nhận kết quả               | Dev cung cấp pull request/commit và kết quả kiểm tra; QA theo dõi checklist quy trình                                        |
| **Trước nghiệm thu (DoD)** | AC được kiểm chứng; test trọng yếu đạt; không còn lỗi Critical/High mở | QC cung cấp RTM, test report và defect log; PM đối chiếu phạm vi; bên nghiệm thu xác nhận theo kế hoạch                      |

### 1.3. Chỉ số đo lường

| **Chỉ số**               | **Cách tính / cách đo**                                                                                                     | **Ngưỡng đề xuất**                                      |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| **Requirement Coverage** | Số FR có ít nhất một test case / tổng số FR trong phạm vi × 100%. Một FR có nhiều test case vẫn tính là một FR trong tử số. | 100%                                                    |
| **Test Pass Rate**       | Test case đạt / tổng test case đã thực thi × 100%; báo cáo riêng số chưa chạy và không tính chúng là đạt.                   | ≥95%; luồng trọng yếu 100%                              |
| **Mật độ lỗi**           | Số lỗi được xác nhận / đơn vị quy mô đã chọn (ví dụ mỗi 100 test case); phải dùng cùng mẫu số khi so sánh các đợt.          | Theo dõi xu hướng qua từng đợt                          |
| **Thời gian xử lý lỗi**  | Thời gian trung bình từ lúc ghi nhận lỗi đến khi QC xác minh kết quả sửa; báo cáo theo mức độ lỗi khi dữ liệu cho phép.     | Theo dõi theo mức độ; thống nhất cách tính trước khi đo |
| **First Pass Yield**     | Số hạng mục đạt ở lần kiểm tra đầu / tổng hạng mục được kiểm tra lần đầu × 100%.                                            | Theo dõi cải thiện qua các đợt                          |

## 2. Đảm bảo chất lượng (Quality Assurance – Do)

QA tập trung vào quy trình và tài liệu nhằm phát hiện điểm chưa rõ trước khi lỗi xuất hiện trong sản phẩm. Nhóm áp dụng các bước review và checklist phù hợp với quy mô dự án; tài liệu không tuyên bố nhóm đạt chứng nhận ISO 9001 hoặc CMMI.

**Quy trình báo cáo thường nhật (Standard Workflow)**

> **Quá trình làm việc hàng ngày**: các thành viên sẽ cập nhật tiến độ và trạng thái công việc định kỳ theo quy trình chung:

- Minh bạch hóa thông tin công việc giữa các thành viên và các bên liên quan.

- Giúp Quản lý dự án (PM) nắm sát tiến độ thực tế để chủ động phát hiện rủi ro.

- Kịp thời điều phối nguồn lực trước khi cần đến các báo cáo chuyên sâu hay báo cáo sự cố

### 2.1. Quy trình và trách nhiệm

| **Thời điểm**                       | **Hoạt động / căn cứ**                                                                                       | **Người thực hiện hoặc kiểm chứng**                             |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| **Trước khi phát triển**            | Rà soát PRD, AC, luồng ngoại lệ, phân quyền và điều kiện DoR                                                 | PM, QA, QC; Dev làm rõ điểm triển khai                          |
| **Khi phát triển**                  | Dev tự kiểm tra, tạo pull request; kiểm tra tên gọi, tính rõ ràng, xử lý lỗi và không để lộ thông tin bí mật | Dev; QA theo dõi việc áp dụng checklist review                  |
| **Trước khi hợp nhất / triển khai** | Kiểm tra thay đổi liên quan, kết quả test áp dụng, cấu hình và thông tin nhạy cảm                            | Dev cung cấp bằng chứng; QC kiểm tra kết quả test liên quan     |
| **Cuối chu kỳ**                     | Đối chiếu AC, cập nhật RTM, tổng hợp lỗi và các điểm cần cải tiến                                            | QC tổng hợp; PM đối chiếu phạm vi; QA ghi nhận vấn đề quy trình |

### 2.2. Quy trình ghi nhận, sửa và xác minh lỗi

1.  **Ghi nhận:** QC tạo defect log gồm mã lỗi, FR/AC liên quan, build/version, môi trường, bước tái hiện, kết quả kỳ vọng/thực tế, bằng chứng.

2.  **Phân loại:** QC ghi nhận các lỗi xuất hiện dự án dựa trên ảnh hưởng quan sát được; nếu chưa đủ thông tin thì đánh dấu cần làm rõ, không tự kết luận nguyên nhân. PM hỗ trợ làm rõ phạm vi/AC khi cần.

3.  **Xử lý:** Dev phân tích lỗi thuộc phần triển khai và cập nhật hướng xử lý. Nếu phát hiện yêu cầu mơ hồ hoặc thay đổi phạm vi, PM ghi nhận để xử lý theo Change Request thay vì mặc định quy là lỗi triển khai.

4.  **Sửa và chuyển kiểm thử lại:** Dev cung cấp thông tin bản sửa, commit/build và chuyển trạng thái “Ready for Retest”.

5.  **Kiểm thử lại:** QC chạy lại các bước tái hiện và kiểm thử hồi quy phần liên quan. Nếu đạt, QC đóng lỗi; nếu chưa đạt, QC mở lại lỗi và bổ sung bằng chứng.

6.  **Cập nhật hồ sơ:** QC cập nhật trạng thái defect log và RTM; QA ghi nhận vấn đề quy trình lặp lại để xem xét cải tiến.

### 2.3. Môi trường và cơ sở hạ tầng kiểm thử

- **Dữ liệu & Cấu hình:** Tách biệt dữ liệu thật, ghi nhận cấu hình/DB/quyền, chuẩn bị sẵn dữ liệu thử, log lỗi và phương án sao lưu/khôi phục.

- **Xác nhận trước test:** QC duyệt build/tài khoản, Dev xác nhận ứng dụng/thành phần, QA kiểm tra checklist môi trường.

- **Lưu ý:** Hạn chế tối đa thông tin cá nhân thật; bắt buộc ghi rõ giới hạn nếu môi trường test khác với môi trường vận hành.

## 3. Kiểm soát chất lượng (Quality Control – Check)

kiểm thử trong quá trình phát triển (PQC), kiểm thử đầu ra hệ thống (OQC) và kiểm thử nghiệm thu người dùng (UAT) với kết quả được truy vết trực tiếp đến FR/AC trong PRD.

### 3.1. Trọng tâm 1 — Kiểm thử trong quá trình phát triển (PQC)

Thực hiện khi hoàn thành từng chức năng hoặc phần tích hợp liên quan.

- **Dev:** thực hiện unit test cho xử lý dữ liệu, validation và các nhánh điều kiện quan trọng; lưu kết quả phù hợp.

- **QC:** xây dựng hoặc cập nhật test case tích hợp theo AC; kiểm tra tương tác giữa các thành phần được mô tả trong PRD.

- **Các nội dung cần kiểm tra:** dữ liệu hợp lệ; thiếu trường bắt buộc; dữ liệu không hợp lệ; thao tác lặp; quyền truy cập; chuyển trạng thái Ticket và các tích hợp khác nếu có trong PRD.

- **Bằng chứng:** kết quả unit/integration test, test case, build/version và defect log.

### 3.2. Trọng tâm 2 — Kiểm thử đầu ra hệ thống (OQC)

Thực hiện trên bản build đủ ổn định trước UAT hoặc bàn giao.

- **System/E2E:** QC kiểm thử các luồng nghiệp vụ từ đầu đến cuối theo từng vai trò được nêu trong PRD; đối chiếu kết quả thực tế với AC và dữ liệu được lưu.

- **Phân quyền:** kiểm tra người dùng chỉ xem và thao tác trong phạm vi quyền được quy định.

- **Thông báo:** chỉ kiểm thử các loại thông báo và điều kiện gửi đã được PRD xác nhận.

- **Tương thích và khả dụng:** kiểm tra trên trình duyệt/thiết bị mục tiêu đã được nhóm thống nhất; ghi lại môi trường kiểm thử.

- **Bảo mật cơ bản:** kiểm tra các tình huống truy cập trái quyền và xử lý dữ liệu theo phạm vi yêu cầu đã chốt.

- **Hiệu năng:** đo PageSpeed Insights trên các trang đại diện đã thống nhất, lưu URL, thiết bị và ngày đo. Đo thời gian phản hồi bằng kịch bản và điều kiện tải được ghi rõ. Điểm PageSpeed không thay thế kết quả kiểm thử tải thực tế.

- **Bằng chứng:** test report, log đo, defect log và phiên bản build.

### 3.3. Trọng tâm 3 — Kiểm thử nghiệm thu người dùng (UAT)

**Kịch bản:** PM và QC chuẩn bị kịch bản dựa trên AC; người dùng/bên nghiệm thu thực hiện các thao tác theo vai trò trong PRD.

**Điều kiện nghiệm thu:** Không còn lỗi Critical/High mở, các luồng trọng yếu đạt và có quyết định nghiệm thu chính thức từ bên nghiệm thu.

### 3.4. Thang điểm đánh giá chất lượng

| **Trọng tâm** | **Trọng số** | **Tiêu chí chấm**                                                                                                   |
|---------------|--------------|---------------------------------------------------------------------------------------------------------------------|
| **PQC**       | 30 điểm      | 15 điểm: unit test phần quan trọng; 10 điểm: kiểm thử tích hợp theo AC; 5 điểm: log và bằng chứng                   |
| **OQC**       | 45 điểm      | 20 điểm: chức năng/E2E; 10 điểm: phân quyền và bảo mật; 10 điểm: hiệu năng/khả dụng; 5 điểm: tương thích và báo cáo |
| **UAT**       | 25 điểm      | 15 điểm: kịch bản nghiệp vụ; 5 điểm: biên bản/bằng chứng; 5 điểm: xử lý phản hồi/tồn đọng                           |
| **Tổng**      | **100 điểm** |                                                                                                                     |

Cách chấm: mỗi tiêu chí nhận **0%** nếu không có bằng chứng hoặc không đạt; **50%** nếu đạt

một phần và tồn đọng được ghi nhận; **80%** nếu cơ bản đạt nhưng còn thiếu sót nhỏ; **100%** nếu đáp ứng đầy đủ và có bằng chứng. Nếu nằm giữa các mức, chọn mức gần nhất và ghi lý do, không tự tạo thêm mức phần trăm. Điểm tiêu chí = điểm tối đa × tỷ lệ đạt.

Thang đánh giá thống nhất với Kế hoạch quản lý sản phẩm:

- **90–100:** Tốt

- **75–89:** Đạt

- **60–74:** Cần cải thiện

> **Dưới 60:** Chưa đạt

Dù tổng điểm đạt ngưỡng, không kết luận nghiệm thu nếu còn lỗi Critical/High mở hoặc luồng trọng yếu chưa đạt. Điều kiện này là cổng nghiệm thu bắt buộc, độc lập với tổng điểm.

### 3.5. Tiêu chí phi chức năng cần kiểm chứng

| **Tiêu chí**            | **Mục tiêu đề xuất**                                                                                                                             | **Bằng chứng / điều kiện đo**                                                      |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| **Hiệu suất giao diện** | PageSpeed Insights Performance ≥90 trên các trang đại diện đã thống nhất                                                                         | Lưu báo cáo PSI, URL/trang, ngày đo và thiết bị                                    |
| **Khả năng tiếp cận**   | Kiểm tra thao tác bàn phím, nhãn trường nhập, độ tương phản và thông báo lỗi dễ hiểu; mục tiêu Accessibility ≥90 là đề xuất                      | Checklist thao tác và báo cáo công cụ; xác nhận trang/phạm vi đo trước khi áp dụng |
| **SEO**                 | Với trang công khai có yêu cầu SEO: title, mô tả và heading phù hợp; mục tiêu SEO ≥90 là đề xuất. Trang đăng nhập/nội bộ không mặc định phải SEO | Báo cáo công cụ và checklist trên các trang đã thống nhất                          |
| **Mã nguồn dễ bảo trì** | Tên gọi rõ ràng, không hardcode bí mật, có review trước khi hợp nhất và hạn chế lỗi critical / high                                              | Pull request và checklist review                                                   |
| **Thời gian phản hồi**  | Trung bình dưới 2 giây theo kịch bản và điều kiện tải đã thống nhất                                                                              | Log đo, mô tả kịch bản, môi trường và kết quả                                      |

Các ngưỡng định lượng là đề xuất cho đến khi nhóm và bên nghiệm thu xác nhận trang, thiết bị, môi trường, kịch bản tải và phương pháp đo. Không dùng một kết quả đơn lẻ để khẳng định mọi chức năng đều đạt hiệu năng.

## 4. Cải tiến chất lượng (Quality Improvement – Act)

- **Đánh giá & Ưu tiên:** Sau mỗi chu kỳ/đợt test, xem xét các vấn đề có bằng chứng và ưu tiên lỗi ảnh hưởng đến chức năng, dữ liệu, phân quyền hoặc nghiệm thu.

- **Nguyên nhân & Hành động:** Tập trung phân tích nguyên nhân gốc rễ để giảm thiểu lỗi lặp lại, không quy trách nhiệm cá nhân.

- **Cải tiến quy trình:** QC tổng hợp báo cáo lỗi và phản hồi UAT; các bên thống nhất hành động, người phụ trách, thời hạn và cập nhật checklist/test case tương ứng.

**Quản lý thay đổi:** Mọi đề xuất vượt phạm vi hoặc nguồn lực ban đầu bắt buộc thực hiện qua Change Request.

## 5. Definition of Done (DoD) — Tiêu chuẩn hoàn thành

- FR và AC của hạng mục đã được xác nhận, có liên kết đến test case trong RTM.

- Thay đổi mã nguồn đã được review; unit/integration test áp dụng đã chạy và có bằng chứng.

- Test case thuộc phạm vi hạng mục đã có kết quả; không còn lỗi Critical/High mở.

- Lỗi Medium/Low còn tồn tại phải được ghi nhận ảnh hưởng và có quyết định xử lý của bên có thẩm quyền trước nghiệm thu.

- Đã kiểm tra quyền truy cập và dữ liệu của các vai trò liên quan.

- Tiêu chí NFR áp dụng được đo theo điều kiện đã thống nhất.

- Tài liệu, trạng thái issue, test log và ghi chú bàn giao đã cập nhật.

## 6. Quản lý rủi ro chất lượng

Chỉ đưa vào đánh giá nghiệm thu những rủi ro liên quan đến phạm vi PRD và kiến trúc đã xác nhận. Các nội dung phụ thuộc tính năng chưa được xác nhận chỉ áp dụng khi được bổ sung và thống nhất trong phạm vi dự án.

| **Rủi ro**                                    | **Ảnh hưởng**                                   | **Kiểm soát / đầu mối**                                                                                    |
|-----------------------------------------------|-------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **Ticket bị ghi đè khi nhiều người cập nhật** | Trạng thái hoặc lịch sử không nhất quán         | Kiểm thử cập nhật đồng thời nếu luồng này thuộc phạm vi; Dev kiểm tra xử lý dữ liệu, QC kiểm chứng kết quả |
| **Sai phân quyền Ticket**                     | Người dùng xem/sửa dữ liệu ngoài quyền          | QC kiểm thử ma trận vai trò × hành động × dữ liệu; PM xác nhận quyền theo PRD                              |
| **Thông báo trùng hoặc thiếu (nếu PRD có)**   | Người dùng nhận thông tin không chính xác       | QC kiểm tra sự kiện gửi, thao tác lặp và điều kiện nhận đã đặc tả                                          |
| **Dữ liệu Ticket hoặc lịch sử xử lý sai**     | Mất bằng chứng xử lý hoặc báo cáo không tin cậy | Kiểm thử tạo/sửa/đọc và đối soát dữ liệu; Dev kiểm tra phần xử lý liên quan                                |
| **Hiệu năng không đạt trong điều kiện đo**    | Người dùng thao tác chậm                        | Ghi rõ điều kiện đo, xác định vấn đề và kiểm thử lại sau xử lý                                             |
| **Thay đổi sát thời điểm bàn giao**           | Tăng lỗi hồi quy, ảnh hưởng lịch                | PM ghi nhận CR; QC đánh giá phạm vi hồi quy; chỉ đưa vào bản bàn giao khi được chấp thuận                  |

## 7. Hồ sơ chất lượng và công cụ

| **Tài liệu**                      | **Nội dung tối thiểu**                                                  | **Đầu mối**                                |
|-----------------------------------|-------------------------------------------------------------------------|--------------------------------------------|
| **RTM**                           | FR ↔ AC ↔ test case ↔ kết quả ↔ defect                                  | QC                                         |
| **Test Suite & Execution Report** | Bước test, dữ liệu, kết quả, build, người chạy                          | QC; Dev cung cấp kết quả kiểm tra của Dev  |
| **Defect Log**                    | Mã lỗi, severity, trạng thái, người xử lý, commit/build, kết quả retest | QC cập nhật; Dev cập nhật thông tin sửa    |
| **Quality Scorecard**             | Điểm PQC/OQC/UAT, KPI, phạm vi đo và ngoại lệ                           | QC tổng hợp; PM đối chiếu phạm vi          |
| **UAT Sign-off**                  | Kịch bản, kết quả, tồn đọng và xác nhận nghiệm thu                      | PM tổng hợp hồ sơ; bên nghiệm thu xác nhận |

Ghi chú phạm vi: các chỉ tiêu như tải đồng thời 3.000 người dùng, tự động đóng Ticket theo SLA, SEO cho trang nội bộ hoặc cơ chế thông báo phức tạp chỉ được áp dụng nếu PRD/NFR và kế hoạch hạ tầng UniSupport đã xác nhận tương ứng.
