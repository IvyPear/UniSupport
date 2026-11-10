# TEAM CHARTER

**Dự án:** UniSupport – Nền tảng tư vấn và hỗ trợ sinh viên toàn diện  
**Team:** Group 4  
**Thời gian triển khai:** 4 tháng  

---

## 1. OVERVIEW & WORKING VALUES

### Thông tin chung
| Hạng mục | Nội dung |
| :--- | :--- |
| **Project** | UniSupport – Nền tảng tư vấn và hỗ trợ sinh viên toàn diện |
| **Team** | Group 4 |
| **Mục đích** | Team Charter quy định cách các thành viên phối hợp, phân công và thực hiện công việc trong suốt quá trình phát triển dự án. Tài liệu giúp thành viên hiện tại và thành viên mới hiểu rõ vai trò, trách nhiệm, công cụ, quy trình làm việc và cách xử lý khi có vấn đề. |

### Nguyên tắc làm việc
* **Transparency (Minh bạch):** Cập nhật tiến độ và vấn đề một cách rõ ràng, kể cả khi công việc chưa hoàn thành hoặc gặp khó khăn.
* **Respect (Tôn trọng):** Tôn trọng ý kiến, thời gian và trách nhiệm của các thành viên.
* **Responsibility (Trách nhiệm):** Chủ động hoàn thành công việc đã nhận và báo sớm khi có nguy cơ trễ.
* **Quality (Chất lượng):** Ưu tiên chất lượng và tính đúng đắn của công việc thay vì chỉ hoàn thành cho đủ.

---

## 2. ROLES & RESPONSIBILITIES

### 2.1. Cơ cấu team
| Role (Vai trò) | SL | Trách nhiệm chính |
| :--- | :---: | :--- |
| **Project Manager (PM)** | 1 | Quản lý tiến độ, phân công công việc, theo dõi deadline, điều phối thành viên và xử lý các vấn đề ảnh hưởng đến tiến độ chung. |
| **Business Analyst (BA)** | 1 | Phân tích yêu cầu, làm rõ nghiệp vụ, quản lý tài liệu yêu cầu và phối hợp với Developer và QA để đảm bảo chức năng được hiểu đúng. |
| **Senior Developer** | 1 | Định hướng kỹ thuật, hỗ trợ Developer, review các thay đổi quan trọng và xử lý các vấn đề kỹ thuật phức tạp. |
| **Junior Developer 1** | 1 | Phát triển và bảo trì các chức năng được phân công, cập nhật tiến độ và phối hợp với Senior Developer khi gặp vấn đề. |
| **Junior Developer 2** | 2 | Phát triển và bảo trì các chức năng được phân công, phối hợp với các Developer khác và cập nhật tiến độ công việc. |
| **QA/QC 1** | 1 | Xây dựng và thực hiện test case, kiểm tra chức năng và ghi nhận lỗi. |
| **QA/QC 2** | 1 | Thực hiện kiểm thử, xác nhận kết quả sửa lỗi và hỗ trợ kiểm tra chất lượng trước khi hoàn thành task. |

### 2.2. Luồng liên hệ & hỗ trợ
| Vấn đề | Liên hệ đầu tiên | Người xử lý tiếp theo |
| :--- | :--- | :--- |
| **Yêu cầu / nghiệp vụ chưa rõ** | BA | PM |
| **Task / deadline / phân công** | PM | — |
| **Vấn đề kỹ thuật** | Senior Developer | PM |
| **Frontend / Backend** | Developer phụ trách | Senior Developer |
| **Testing / Quality / Bug** | QA/QC | Senior Developer |
| **Vấn đề ảnh hưởng nhiều thành viên** | Người phụ trách trực tiếp | PM |

> **Quy tắc leo thang (Escalation):** Thành viên ưu tiên trao đổi với người phụ trách trực tiếp trước. Nếu vấn đề không được giải quyết hoặc ảnh hưởng đến tiến độ, phạm vi hoặc chất lượng dự án, vấn đề được đưa lên PM để điều phối.

### 2.3. Backup (Phương án dự phòng)
* Khi **PM** vắng mặt, **BA** hỗ trợ điều phối các công việc cần thiết.
* Khi **Senior Developer** vắng mặt, Developer phù hợp trong team có thể hỗ trợ review hoặc xử lý vấn đề kỹ thuật trong phạm vi được giao.
* Khi một thành viên vắng mặt trong thời gian dài, **PM** xem xét phân bổ lại task để hạn chế ảnh hưởng đến tiến độ chung.

---

## 3. TOOLS, WORKFLOW & ONBOARDING

### 3.1. Công cụ làm việc
| Công cụ | Mục đích sử dụng |
| :--- | :--- |
| **Slack** | Trao đổi công việc hàng ngày, họp, cập nhật tiến độ, lưu trữ và chia sẻ tài liệu. |
| **ClickUp** | Quản lý task, deadline và theo dõi tiến độ công việc. |
| **GitHub** | Quản lý source code và version control. |
| **Figma** | Thiết kế UI, wireframe và prototype. |
| **Google Drive** | Lưu trữ tài liệu, meeting minutes và các tài liệu dự án. |

### 3.2. Quy trình thực hiện công việc
**Vòng đời task:** `Task Assigned` → `To Do` → `Doing` → `Review` → `QA Verify` → `Done`

1. **Nhận task (Task Assigned/To Do):** Kiểm tra mô tả, deadline, tài liệu và tiêu chí nghiệm thu trên ClickUp.
2. **Thực hiện (Doing):** Chuyển trạng thái sang Doing, làm trên branch Git riêng (với dev) và cập nhật tiến độ. Hỏi BA/PM ngay nếu chưa rõ yêu cầu.
3. **Review:** Tạo Pull Request gửi Senior Dev/thành viên liên quan review trước khi merge.
4. **QA Verify:** Đội QA/QC kiểm thử tính năng và xác nhận không còn lỗi.
5. **Hoàn tất (Done):** Chuyển sang Done khi đạt QA, code đã merge và cập nhật xong tài liệu.

> **Lưu ý:**
> * **Non-dev task:** Người phụ trách hoặc PM sẽ trực tiếp review và nghiệm thu.
> * **Fix bug nhỏ:** Có thể rút gọn bước trung gian nhưng bắt buộc qua khâu review và kiểm thử trước khi đóng task.

### 3.3. Quy tắc Git
* Mỗi task phát triển được thực hiện trên branch riêng.
* Đặt tên branch theo định dạng:
  * `feature/[task-id]-[short-description]`
  * `bugfix/[task-id]-[short-description]`
* **Không** merge trực tiếp vào branch chính khi chưa được review.
* Pull Request cần mô tả rõ nội dung thay đổi và liên kết với task tương ứng trên ClickUp.
* Việc review không bắt buộc do một cá nhân cố định thực hiện; thành viên phù hợp có thể review tùy theo nội dung task.

### 3.4. Onboarding thành viên mới
Khi có thành viên mới tham gia team:
* **Giới thiệu dự án:** PM/BA giới thiệu mục tiêu, phạm vi và tình trạng hiện tại của dự án.
* **Giới thiệu team:** Thành viên mới được giới thiệu vai trò của từng thành viên và người phụ trách các phần chính.
* **Cấp quyền:** Cấp quyền truy cập vào Slack, ClickUp, GitHub, Figma và Google Drive theo role.
* **Đọc tài liệu:** Thành viên mới đọc các tài liệu cần thiết liên quan đến dự án và phần công việc của mình.
* **Nhận task đầu tiên:** Người phụ trách hướng dẫn task đầu tiên và hỗ trợ khi cần trước khi thành viên thực hiện độc lập.
* *Thành viên mới được khuyến khích hỏi khi chưa rõ về yêu cầu, công cụ hoặc quy trình thay vì tự thực hiện theo giả định.*

---

## 4. COMMUNICATION & COORDINATION

### 4.1. Trao đổi và phản hồi
* **Slack** là kênh trao đổi công việc chính của team.
* Tin nhắn thông thường nên được phản hồi trong khoảng **6–12 giờ**.
* Vấn đề khẩn cấp hoặc ảnh hưởng trực tiếp đến tiến độ cần được phản hồi sớm, ưu tiên trong **1–2 giờ** khi có thể.
* Các quyết định hoặc vấn đề ảnh hưởng đến task, tiến độ hoặc kỹ thuật cần được cập nhật lại trên ClickUp, GitHub hoặc tài liệu liên quan để team có thông tin thống nhất.

### 4.2. Họp team
* Team tổ chức **weekly meeting** để cập nhật tiến độ và xử lý các vấn đề đang tồn tại.
* PM chuẩn bị nội dung chính cho buổi họp.
* Thành viên không thể tham gia cần báo trước cho PM.
* Sau cuộc họp, các công việc cần thực hiện được ghi lại cùng người phụ trách và deadline (Meeting Minutes).

### 4.3. Cập nhật tiến độ & xử lý khi bị block
* Thành viên chủ động cập nhật trạng thái task trên ClickUp.
* Khi công việc bị block, thành viên cần báo cho người phụ trách hoặc PM, nêu rõ vấn đề đang gặp và hỗ trợ cần thiết.

---

## 5. DECISION, CONFLICT & ACCOUNTABILITY

### 5.1. Decision (Ra quyết định)
* Các quyết định trong phạm vi task được trao đổi giữa những thành viên liên quan và ưu tiên người phụ trách trực tiếp đưa ra quyết định.
* Các vấn đề kỹ thuật ảnh hưởng đến nhiều chức năng hoặc kiến trúc được **Senior Developer** định hướng.
* Các quyết định ảnh hưởng đến phạm vi, tiến độ hoặc phân bổ công việc được **PM** điều phối.
* Khi quyết định quan trọng được thống nhất, cần ghi lại trong tài liệu hoặc công cụ quản lý công việc để các thành viên có cùng thông tin.

### 5.2. Conflict Resolution (Giải quyết xung đột)
Khi có ý kiến khác nhau:
1. **Trao đổi trực tiếp:** Các thành viên liên quan trao đổi để tìm phương án phù hợp.
2. **Thảo luận trong team:** Nếu chưa thống nhất, đưa vấn đề ra thảo luận với các thành viên liên quan.
3. **PM điều phối:** Nếu vấn đề ảnh hưởng đến tiến độ, phạm vi hoặc không thể thống nhất, PM đưa ra quyết định cuối cùng dựa trên ý kiến của các bên.
*Mục tiêu của việc giải quyết conflict là tìm phương án phù hợp nhất cho dự án, không tập trung vào việc xác định cá nhân đúng hay sai.*

### 5.3. Accountability (Trách nhiệm giải trình)
Mỗi thành viên có trách nhiệm:
* Hoàn thành task đúng deadline đã thống nhất.
* Chủ động cập nhật tiến độ.
* Báo sớm khi gặp vấn đề hoặc có nguy cơ trễ.
* Tham gia các cuộc họp và phản hồi các vấn đề liên quan đến công việc.
* Đảm bảo công việc hoàn thành đúng yêu cầu và được review/kiểm tra trước khi chuyển sang Done.

**Xử lý vi phạm:** Nếu một vấn đề xảy ra nhiều lần, team xử lý theo thứ tự:  
`Nhắc nhở` → `Trao đổi nguyên nhân` → `Điều chỉnh/phân bổ lại công việc nếu cần`.  
*Mục tiêu là đảm bảo tiến độ và chất lượng chung của team thay vì tập trung vào xử phạt cá nhân.*