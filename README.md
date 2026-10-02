# TEAM CHARTER

**Dự án:** UniSupport – Nền tảng tư vấn và hỗ trợ sinh viên toàn diện.
**Thời gian triển khai:** 4 Tháng (6 giai đoạn: Khởi tạo, Phân tích yêu cầu, Thiết kế, Phát triển Sprint, Kiểm thử QA/UAT, Triển khai Production).

---

## 1. Thành viên & Vai trò

### 1.1 Cơ cấu team & Trách nhiệm từng vai trò
* **Project Manager (PM):** Quản trị tiến độ, phạm vi, ngân sách; tháo gỡ điểm nghẽn; điều phối với các bên liên quan .
* **Business Analyst (BA):** Nghiên cứu UX, làm rõ nghiệp vụ, chuẩn hóa PRD, User Story, Workflow và Wireframe.
* **Developers (Frontend / Backend):** Lập trình tính năng theo UI/UX và API, đảm bảo hiệu năng và bảo mật code.
* **QA/QC Engineer:** Xây dựng Test Plan, Test Case, thực hiện kiểm thử Staging và giám sát nghiệm thu UAT.

### 1.2 Luồng liên hệ & Hỗ trợ
**Phân định luồng hỗ trợ:**
* Yêu cầu nghiệp vụ & Luồng tính năng → Liên hệ BA
* Tiến độ, phạm vi & Lịch trình → Liên hệ PM
* Sự cố kỹ thuật, API & CSDL → Liên hệ Senior Developer
* Lỗi phần mềm & Kế hoạch kiểm thử → Liên hệ QA/QC

**SUPPORT:** Thành viên mới được gán 1 supporter  đồng hành 1-  1 trong 2 tuần đầu để bàn giao tài liệu, thiết lập môi trường và hòa nhập quy trình làm việc.
> *(Đảm bảo: Thiết lập thành công môi trường chạy local, nắm rõ luồng PRD và hoàn thành ít nhất 1 task mức độ Easy/Medium trên ClickUp dưới sự hướng dẫn.)*

---

## 2. Cách thức làm việc

* **Làm việc theo Milestone:** Chia nhỏ lộ trình thành các task 2-  3 tuần, đảm bảo mỗi task đều bàn giao sản phẩm chạy được.
* **Team làm việc theo quy trình 8 bước chuẩn hóa:**
  1. **Define (Xác định):** BA làm rõ mục tiêu và chốt phạm vi công việc.
  2. **Design (Thiết kế):** Tạo Wireframe/Figma và thiết kế kiến trúc DB/API.
  3. **Review (Đánh giá):** Họp phản biện giữa BA, Dev, QA để đảm bảo tính khả thi.
  4. **Freeze (Chốt yêu cầu):** Chốt baseline tính năng, hỗ trợ điều chỉnh linh hoạt nếu cần.
  5. **Dev (Phát triển):** Lập trình, Unit Test và đẩy code lên Staging.
  6. **Test (Kiểm thử):** QA chạy Test Case, phản hồi và xác nhận fix bug nhanh chóng.
  7. **Review (Nghiệm thu):** Demo sản phẩm thực tế cho PM.
  8. **Done (Hoàn tất):** Deploy Production, cập nhật tài liệu và đóng task.

> *(Các task sửa lỗi nhỏ/fixbug được giản lược qua các bước: Dev fix → Test nhanh → Done. Để đảm bảo không bị delay.)*

* **Cập nhật tiến độ:** Cập nhật trạng thái ClickUp hằng ngày trước 17:00. 
> **(LƯU Ý:Công việc không có trên ClickUp được coi là không tồn tại.)**

* **Cách tạo và phân công task:** Quản lý tập trung trên ClickUp. Mọi nhiệm vụ phải có đầy đủ Mô tả, Người thực hiện, Người kiểm duyệt, Hạn chót và Mức độ ưu tiên. Đội ngũ làm việc theo quy trình.
* **Xử lý khi bị block:** Báo cáo ngay trên kênh Slack của team nếu công việc bị block 2 giờ làm việc để PM/Team hỗ trợ tháo gỡ.

---

## 3. Giao tiếp & Công cụ

* **Kênh giao tiếp chính:** Slack (trao đổi công việc hằng ngày) và Google Meet (họp trực tuyến).
* **Công cụ sử dụng:** 
  - ClickUp: Quản lý task và tiến độ Sprint.
  - GitHub: Quản lý mã nguồn và Version Control.
  -  Slack: để họp và trao đổi.
  - Google Drive: Lưu trữ tài liệu chính thức.
  -  Figma: Thiết kế UI/UX.

* **Khung giờ trao đổi & Cam kết phản hồi:** Giờ làm việc 08:30 – 17:00. Cam kết phản hồi trong vòng 2 giờ làm việc.
* **Cập nhật tiến độ:** Mỗi sáng họp nhanh 15 phút để cập nhật tiến độ. 

---

## 4. Nguyên tắc làm việc chung

* **Trách nhiệm với task:** Chủ động theo sát task được giao từ lúc bắt đầu đến khi nghiệm thu hoàn tất.
* **Cam kết Deadline:** Hoàn thành đúng hạn đã cam kết trong Sprint Planning; đảm bảo chất lượng.
* **Thống nhất yêu cầu & Phạm vi:** Không code khi chưa rõ yêu cầu. Mọi thay đổi phạm vi (Scope Change) phải qua BA & PM đánh giá.
* **Báo sớm vấn đề:** Chủ động cảnh báo rủi ro hoặc nguy cơ trễ hạn ngay khi phát hiện, không giấu lỗi.
* **Phối hợp & Hỗ trợ:** Lắng nghe phản hồi tích cực, sẵn sàng hỗ trợ tháo gỡ khó khăn.
* **Tiêu chuẩn hoàn thành:** Khớp PRD, Pass Code Review, Pass QA trên Staging (không còn bug High/Critical) và cập nhật tài liệu kỹ thuật đầy đủ.
> *(Bug High/Critical như: lỗi sập web hoặc sai lệch dữ liệu cốt lõi.)*
