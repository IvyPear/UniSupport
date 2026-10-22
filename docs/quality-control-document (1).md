# QUALITY CONTROL DOCUMENT
## DỰ ÁN UNISUPPORT | KẾ HOẠCH KIỂM SOÁT CHẤT LƯỢNG

| Thông tin | Nội dung |
| :--- | :--- |
| **Mã tài liệu** | US-QC-PLAN-01 |
| **Phiên bản** | 1.0 – Bản dự thảo |
| **Ngày lập** | 13/10/2026 |
| **Dự án** | UniSupport – Hệ thống tiếp nhận và xử lý yêu cầu hỗ trợ sinh viên |
| **Phạm vi** | 19 module theo Master Schedule; đối chiếu 13 phân hệ chức năng PRD |
| **Người soạn / Duyệt** | [Điền tên] / [Điền tên] |
| **Trạng thái** | Draft – chờ nhóm xác nhận chỉ tiêu và người phụ trách |

---

## 1. Mục đích và phạm vi
Tài liệu xác định cách kiểm soát chất lượng của UniSupport từ rà soát yêu cầu, kiểm thử chức năng, kiểm thử tích hợp đến nghiệm thu và bàn giao. Mục tiêu là phát hiện sai lệch so với PRD sớm, có bằng chứng kiểm thử, theo dõi lỗi và chỉ cho phép chuyển giai đoạn khi đạt điều kiện chất lượng.
* **Trong phạm vi:** đăng nhập/phân quyền, tài khoản, danh mục, tạo/tiếp nhận/xử lý Ticket, bổ sung, kết quả/đánh giá, điều phối, giám sát, báo cáo, triển khai.
* **Ngoài phạm vi:** các chức năng chưa được xác nhận trong PRD và tích hợp bên thứ ba chưa được phê duyệt.

## 2. Cơ sở và nguyên tắc QC
* PRD 13 phân hệ M01–M13: nguồn xác định hành vi nghiệp vụ và Acceptance Criteria của từng FR.
* Master Schedule 19 module: nguồn xác định trình tự triển khai, mốc kiểm soát và bàn giao.
* Các tên/mã module trong PRD và Master Schedule có thể không trùng nhau; phải dùng bảng ánh xạ FR ↔ module thực hiện trước khi ký nghiệm thu.
* Mọi thay đổi yêu cầu sau khi chốt baseline phải có yêu cầu thay đổi, đánh giá ảnh hưởng, phê duyệt và cập nhật test case.

## 3. Quản lý chất lượng (Quality Management) & Định nghĩa Hoàn thành (Definition of Done)
### 3.1. Definition of Done (DoD) cho task
Task chỉ được chuyển sang **Done** khi đáp ứng đủ các tiêu chí áp dụng dưới đây; người thực hiện không tự phê duyệt thay cho reviewer.

| Tiêu chí | Điều kiện hoàn thành | Bằng chứng tối thiểu |
| :--- | :--- | :--- |
| **Yêu cầu và thiết kế** | Kết quả khớp PRD/FR và Acceptance Criteria (AC); thiết kế liên quan đã được cập nhật hoặc xác nhận không cần thay đổi. Sai khác với PRD phải qua Change Request. | Liên kết FR/AC, design hoặc ghi nhận review |
| **Unit test** | Unit test được thiết kế/viết cho logic thay đổi và chạy đạt; không bỏ qua test liên quan đang thất bại. | Kết quả test trong CI hoặc báo cáo test |
| **Kiểm thử theo ảnh hưởng** | Cập nhật/chạy Integration, System/E2E, Security hoặc Regression khi thay đổi ảnh hưởng các luồng đó; tất cả test bắt buộc của task đạt. | Test case và kết quả chạy gắn với task |
| **CI/CD** | Các bước bắt buộc của pipeline (build, lint/type check nếu có, automated tests và kiểm tra triển khai nếu áp dụng) đều pass. Pipeline đỏ hoặc bị bỏ qua thì task chưa Done. | Link pipeline thành công |
| **Review độc lập** | Có ít nhất một reviewer không phải tác giả kiểm tra thay đổi, test và tiêu chí chấp nhận. Nếu task đổi quy trình nghiệp vụ, BA/PO hoặc chủ quy trình xác nhận luồng đầu-cuối, vai trò, trạng thái và ngoại lệ. | Review được chấp thuận; xác nhận nghiệp vụ nếu có ảnh hưởng |
| **Lỗi và tài liệu** | Không còn lỗi Critical/High thuộc phạm vi task; tài liệu, hướng dẫn hoặc test case liên quan được cập nhật. | Defect log và liên kết tài liệu/test đã cập nhật |

**Luồng đóng task:** (1) Làm rõ phạm vi, FR/AC và ảnh hưởng; (2) thống nhất thiết kế và test trước khi triển khai; (3) thực hiện, viết/chạy unit test và các test theo ảnh hưởng; (4) mở PR kèm liên kết yêu cầu và bằng chứng; (5) reviewer và người xác nhận nghiệp vụ (nếu cần) duyệt; (6) pipeline bắt buộc pass; (7) người phụ trách kiểm tra checklist, ghi bằng chứng rồi mới chuyển task sang Done. Nếu bất kỳ bước bắt buộc nào fail, task quay lại In Progress/Review, không tính là hoàn thành.

### 3.2. Definition of Done (DoD) cho milestone
Milestone chỉ được xem là **Done** sau khi có quyết định nghiệm thu, không chỉ vì đã hết thời gian hoặc mọi task đã được báo xong. Điều kiện đóng milestone:
* Tất cả task trong phạm vi đã Done theo mục 3.1; task chưa hoàn thành chỉ được đưa ra khỏi phạm vi milestone qua Change Request được PO/PM phê duyệt, đánh giá ảnh hưởng và cập nhật baseline.
* 100% FR/AC thuộc milestone được ánh xạ tới test case và có kết quả; các luồng nghiệp vụ đầu-cuối trọng yếu của milestone đều pass.
* Regression và các kiểm thử tích hợp/E2E bị ảnh hưởng đã pass; không còn lỗi Critical/High chưa xử lý trong phạm vi nghiệm thu.
* BA/PO hoặc chủ quy trình xác nhận quy trình nghiệp vụ; QA/QC xác nhận bằng chứng và kết quả test; Manager/PM hoặc người được ủy quyền chấp thuận đóng milestone.
* Lưu biên bản nghiệm thu gồm phạm vi, kết quả theo từng gate, lỗi còn lại/rủi ro được chấp thuận, người duyệt và ngày duyệt.

**Luồng đóng milestone:** rà soát danh sách task và truy vết FR/AC → chạy bộ kiểm thử hồi quy và luồng đầu-cuối → review quy trình với người đại diện nghiệp vụ → QA/QC tổng hợp bằng chứng và lỗi → người có thẩm quyền ký nghiệm thu. Nếu gate không đạt, milestone giữ trạng thái In Progress/Blocked, lập danh sách việc cần xử lý và chỉ đánh giá lại sau khi có bằng chứng mới.

### 3.3. Trách nhiệm quản lý
Manager/PM thiết lập người chịu trách nhiệm, reviewer, gate và nơi lưu bằng chứng từ đầu milestone; theo dõi ngoại lệ và rủi ro. Manager không thay reviewer kỹ thuật hoặc BA/PO xác nhận quy trình nghiệp vụ. Mọi ngoại lệ DoD phải ghi rõ lý do, rủi ro, người chấp thuận và hạn xử lý; ngoại lệ không được ghi nhận thì không được tính là Done.

## 4. Tiêu chuẩn chất lượng đề xuất
Các ngưỡng dưới đây là đề xuất phục vụ lập kế hoạch, cần được nhóm/giảng viên xác nhận trước khi sử dụng làm tiêu chí nghiệm thu chính thức.

| Mã | Chỉ tiêu | Ngưỡng đề xuất / cách đo |
| :--- | :--- | :--- |
| **Q-01** | Bao phủ yêu cầu | 100% FR trong phạm vi release có ít nhất 1 test case và kết quả |
| **Q-02** | Kiểm thử chức năng | ≥ 95% test case đạt; 100% test case luồng trọng yếu đạt |
| **Q-03** | Lỗi nghiêm trọng | 0 lỗi Critical/High đang mở tại thời điểm bàn giao |
| **Q-04** | Phân quyền và riêng tư | 100% kiểm thử truy cập trái quyền trọng yếu đạt |
| **Q-05** | Tính toàn vẹn Ticket | Không có Ticket trùng do gửi lặp; không mất lịch sử/đính kèm |
| **Q-06** | Hiệu năng | Ngưỡng phản hồi, tải đồng thời: [CẦN CHỐT] |
| **Q-07** | Khả năng phục hồi | Có bản sao lưu, thử phục hồi và phương án rollback được kiểm tra |

## 5. Chiến lược kiểm tra và kiểm thử

| Mức | Nội dung | Đầu ra |
| :--- | :--- | :--- |
| **Review tài liệu** | Kiểm tra FR, AC, ngoại lệ, tính nhất quán trạng thái và vai trò | Review checklist |
| **Unit test** | Kiểm tra xử lý đơn lẻ, validation, ràng buộc dữ liệu | Unit test result |
| **Integration test** | Luồng xuyên module, thông báo, phân công, lịch sử Ticket | Integration report |
| **System test** | Kiểm thử end-to-end theo Actor và quyền | System test report |
| **Security test** | Xác thực, phân quyền, truy cập dữ liệu người khác, file upload | Security checklist |
| **UAT** | Sinh viên/Nhân viên/Quản lý/Admin thực hiện kịch bản nghiệp vụ | UAT sign-off |
| **Regression** | Chạy lại test bị ảnh hưởng sau mỗi lần sửa lỗi | Regression report |
| **Smoke / deployment** | Đăng nhập, tạo Ticket, nhận, xử lý, trả kết quả trên môi trường triển khai | Smoke checklist |

## 6. Ma trận kiểm soát theo 13 module

| Module | Hạng mục | Điểm kiểm soát chính |
| **M01** | Đăng nhập | Kiểm thử đăng nhập đúng/sai, khóa tài khoản |
| **M02** | Quản lý tài khoản | Kiểm tra tìm kiếm, import, khóa/mở |
| **M03** | Phân quyền | Kiểm tra 4 role, truy cập trái quyền |
| **M04** | Danh mục hỗ trợ | Kiểm tra CRUD, ẩn danh mục, định tuyến |
| **M05** | Tạo Ticket | Validation, file ≤5MB, chống tạo trùng |
| **M06** | Theo dõi & bổ sung | Quyền xem Ticket, bổ sung đúng Ticket |
| **M07** | Kết quả & đánh giá | Xem kết quả, 1–5 sao, đóng Ticket |
| **M08** | Tiếp nhận Ticket | Chỉ 1 người nhận, chống tranh chấp |
| **M09** | Xử lý & trao đổi | Yêu cầu bổ sung, lưu lịch sử, thông báo |
| **M10** | Trả kết quả | Bắt buộc nội dung trả lời, thông báo một lần |
| **M11** | Điều phối Ticket | Chuyển sai phòng ban, phân công lại, audit |
| **M12** | Giám sát tiến độ | SLA, Ticket tồn đọng, phạm vi phòng ban |
| **M13** | Dashboard / báo cáo | Đối chiếu thống kê, xuất báo cáo |


*Lưu ý: bảng trên sử dụng mã M01–M19 của Master Schedule. Các mã FR-M01–FR-M13 trong bộ PRD là mã phân hệ tài liệu, không mặc nhiên đồng nhất với module lịch triển khai.*

## 7. Test scenario trọng yếu

| ID | Actor | Kịch bản | Kết quả mong đợi |
| :--- | :--- | :--- | :--- |
| **TC-01** | Sinh viên | Gửi Ticket hợp lệ | Tạo đúng 1 Ticket, có mã và gắn sinh viên |
| **TC-02** | Sinh viên | Thiếu tiêu đề/mô tả hoặc chỉ có khoảng trắng | Không tạo Ticket; hiện lỗi đúng trường |
| **TC-03** | Sinh viên | Gửi lặp/double click/retry | Chỉ tạo một Ticket |
| **TC-04** | Sinh viên | Đính kèm sai định dạng hoặc >5MB | Từ chối tệp không hợp lệ |
| **TC-05** | Nhân viên | Hai nhân viên tiếp nhận cùng Ticket | Chỉ một người được gán |
| **TC-06** | Nhân viên/SV | Yêu cầu và gửi bổ sung | Chờ bổ sung → Đang xử lý; giữ người phụ trách |
| **TC-07** | Nhân viên/Admin | Báo sai phòng ban và điều chuyển | Ticket đến đúng hàng chờ, có lịch sử |
| **TC-08** | Nhân viên/SV | Trả kết quả và xem kết quả | Bắt buộc nội dung; sinh viên được thông báo |
| **TC-09** | Sinh viên | Đánh giá 1–5 sao và đóng Ticket | Lưu đánh giá; trạng thái đóng theo PRD |
| **TC-10** | 4 vai trò | Truy cập dữ liệu/chức năng ngoài quyền | Từ chối truy cập, không lộ dữ liệu |
| **TC-11** | Quản lý | Phân công nhân viên khác phòng ban | Bị từ chối |
| **TC-12** | Admin/Quản lý | Lọc thống kê, xuất báo cáo | Số liệu đúng phạm vi và kỳ báo cáo |

## 8. Quy trình quản lý lỗi (Defect Management)
1. Tester phát hiện lỗi, tạo Defect ID kèm module/FR, môi trường, bước tái hiện, kết quả thực tế/mong đợi, bằng chứng.
2. QA phân loại mức độ và ưu tiên; Leader phân công người sửa.
3. Developer sửa và cập nhật trạng thái Ready for Retest, ghi phiên bản sửa.
4. QA tái kiểm thử: Pass → Closed; Fail → Reopened; đồng thời chạy regression các luồng liên quan.
5. Lỗi ảnh hưởng yêu cầu hoặc phạm vi được chuyển qua quy trình Change Request thay vì âm thầm sửa PRD.

| Mức | Định nghĩa | Quy tắc xử lý đề xuất |
| :--- | :--- | :--- |
| **Critical** | Mất dữ liệu, lộ dữ liệu, hệ thống không dùng được | Chặn nghiệm thu |
| **High** | Luồng chính không thực hiện được hoặc sai quyền | Chặn nghiệm thu |
| **Medium** | Lỗi chức năng phụ có giải pháp tạm | Cần kế hoạch khắc phục và phê duyệt ngoại lệ |
| **Low** | Giao diện, nội dung nhỏ không ảnh hưởng nghiệp vụ | Ghi backlog có thời hạn |

## 9. Quality Gates theo giai đoạn

| Gate | Thời điểm | Điều kiện ra cổng |
| :--- | :--- | :--- |
| **G1 – Baseline** | Sau M01–M02 | PRD/thiết kế được review, AC rõ, scope và mapping FR–module được duyệt |
| **G2 – Working MVP** | Sau các module nền tảng và luồng Ticket cốt lõi | Đăng nhập → tạo → tiếp nhận → xử lý → trả kết quả hoạt động trên dữ liệu thật |
| **G3 – Student flows** | Sau M09–M10 | Theo dõi, bổ sung, xem kết quả và đánh giá đạt test trọng yếu |
| **G4 – Management** | Sau M14–M16 | Điều phối, cảnh báo, dashboard/báo cáo đúng phạm vi |
| **G5 – Release** | Sau M17–M19 | UAT đạt; không còn Critical/High; có triển khai, rollback và ký nghiệm thu |

Mỗi gate phải áp dụng DoD task/milestone tại mục 3. Gate chỉ **Pass** khi có đủ bằng chứng kiểm thử và xác nhận của đúng vai trò; nếu chưa đạt, ghi trạng thái **Blocked** cùng owner và việc cần hoàn thành. Các chỉ tiêu Q-01–Q-07 áp dụng theo ngưỡng đã được nhóm xác nhận; ngưỡng còn [CẦN CHỐT] không được tự coi là đã đạt.

## 10. Hồ sơ bằng chứng và báo cáo QC
* Requirements Traceability Matrix (FR ↔ Module ↔ Test Case ↔ Kết quả).
* Test Case Register và Test Execution Report theo đợt kiểm thử.
* Defect Log: ID, mức độ, người xử lý, trạng thái, ngày mở/đóng.
* Biên bản review PRD, biên bản nghiệm thu module và UAT.
* Báo cáo tổng hợp: số test đã chạy/đạt/trượt, lỗi mở theo mức, rủi ro và quyết định gate.

## 11. Rủi ro chất lượng và phương án

| Rủi ro | Tác động | Biện pháp |
| :--- | :--- | :--- |
| **Mã module PRD khác Master Schedule** | Sai phạm vi test / nghiệm thu | Chốt mapping trước khi viết test case |
| **Hai người nhận cùng Ticket** | Sai người phụ trách | Test cạnh tranh và kiểm tra dữ liệu cuối |
| **Thông báo gửi trùng** | Nhiễu trải nghiệm | Kiểm thử retry và sự kiện lặp |
| **Quy tắc 72 giờ chưa đồng nhất** | Sai đóng/chờ bổ sung | Chốt điều kiện SLA/auto-close với BA/PO |
| **Phân quyền sai** | Lộ Ticket cá nhân/phòng ban | Test ma trận quyền và dữ liệu xuyên role |
| **Lỗi xuất báo cáo** | Quyết định sai | Đối soát với dữ liệu nguồn |

## 12. Các quyết định cần chốt trước baseline
* Xác nhận ngày thực tế, milestone và người phụ trách từ Master Schedule bản cuối.
* Xác nhận mapping 13 phân hệ PRD sang 19 module triển khai.
* Xác nhận các trạng thái Ticket (New, In Progress, Pending, Resolved, Closed) và thời điểm chuyển.
* Xác nhận cách tính 72 giờ ở Pending và tự động đóng 72 giờ sau Resolved.
* Xác nhận ngưỡng SLA, hiệu năng, số lượng người dùng đồng thời và tỷ lệ pass tối thiểu.
* Xác nhận môi trường UAT, dữ liệu thử, người có quyền ký nghiệm thu.