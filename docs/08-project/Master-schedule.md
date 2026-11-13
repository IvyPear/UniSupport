# Master Schedule & Chi Tiết Tiến Độ - UniSupport

Dưới đây là bảng tổng hợp và mô tả chi tiết toàn bộ kế hoạch Master Schedule (UniSupport) được trích xuất trực tiếp từ biểu đồ Gantt tiến độ tại tab Final (kết hợp chi tiết giờ công thực hiện):

## I. TỔNG QUAN DỰ ÁN

* **Tên dự án:** UniSupport | Master Schedule
* **Tổng thời gian dự kiến:** Khoảng 16 tuần (từ 01/09/2026 đến 18/12/2026).
* **Số mốc chính:** 5 mốc (từ Mốc 0 đến Mốc 4).
* **Nhân sự tham gia:** PM, BA (theo dõi xuyên suốt dự án), Senior, Dev 1, Dev 2, Dev 3, QA 1, QA 2.

---

## II. BẢNG TIẾN ĐỘ CHI TIẾT THEO TỪNG TASK & MỐC

| Mốc | Giai đoạn | Tên Task / Module | Ngày bắt đầu | Ngày kết thúc | Thời lượng | Phụ trách | Tổng giờ công |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :---: |
| **Mốc 0**<br>*(1/9 – 18/9)* | Khởi động | Khảo sát & Đặc tả | 01/09/2026 | 02/09/2026 | 2 ngày | PM, BA | 8h |
| | | Thiết kế & Tạm ứng | 03/09/2026 | 10/09/2026 | 6 ngày | PM, BA, Senior | 32h |
| | | Database & Nền tảng | 11/09/2026 | 18/09/2026 | 6 ngày | Senior, Dev 1 | 48h |
| **Mốc 1**<br>*(21/9 – 9/10)* | Nền tảng | M01: Đăng nhập & Xác thực | 21/09/2026 | 25/09/2026 | 5 ngày | Senior, Dev 1, Dev 2 | 40h |
| | | M02: Vai trò & Phân quyền | 28/09/2026 | 02/10/2026 | 5 ngày | Senior, Dev 1, Dev 3 | 40h |
| | | M03: Quản lý tài khoản | 05/10/2026 | 07/10/2026 | 3 ngày | Senior, Dev 2, Dev 3 | 36h |
| | | Test QA/QC (Đợt 1) | 08/10/2026 | 14/10/2026 | 5 ngày | PM, QA 1, QA 2 | 44h |
| **Mốc 2**<br>*(12/10 – 13/11)* | Ticket & Phân hệ sinh viên | M04: Quản lý danh mục | 12/10/2026 | 14/10/2026 | 3 ngày | Senior, Dev 1, Dev 3 | 36h |
| | | M05: Khởi tạo Ticket | 15/10/2026 | 19/10/2026 | 3 ngày | Senior, Dev 1, Dev 3 | 36h |
| | | M06: Tiếp nhận Ticket | 20/10/2026 | 22/10/2026 | 3 ngày | Senior, Dev 2, Dev 3 | 36h |
| | | M11: Điều phối Ticket | 23/10/2026 | 26/10/2026 | 2 ngày | Senior, Dev 1, Dev 3 | 18h |
| | | M07: Xử lý & Bổ sung | 27/10/2026 | 28/10/2026 | 2 ngày | Senior, Dev 1, Dev 3 | 16h |
| | | M08: Trả kết quả | 29/10/2026 | 30/10/2026 | 2 ngày | Dev 1, Dev 2, Dev 3 | 24h |
| | | Test QA/QC (Đợt 2) | 02/11/2026 | 06/11/2026 | 5 ngày | PM, QA 1, QA 2 | 44h |
| | | M09: Theo dõi | 02/11/2026 | 03/11/2026 | 2 ngày | Dev 1, Dev 2, Dev 3 | 24h |
| | | M10: Kết quả & Đánh giá | 04/11/2026 | 05/11/2026 | 2 ngày | Dev 1, Dev 2, Dev 3 | 12h |
| | | Test QA/QC (Đợt 3) | 09/11/2026 | 13/11/2026 | 5 ngày | PM, QA 1, QA 2 | 44h |
| **Mốc 3**<br>*(16/11 – 4/12)* | Giám sát Dashboard | M12: Giám sát tiến độ | 16/11/2026 | 20/11/2026 | 5 ngày | Dev 1, Dev 2, Dev 3 | 40h |
| | | M13: Dashboard & Báo cáo | 23/11/2026 | 27/11/2026 | 5 ngày | Dev 1, Dev 2, Dev 3 | 40h |
| | | Test QA/QC (Đợt 4) | 30/11/2026 | 04/12/2026 | 5 ngày | PM, QA 1, QA 2 | 44h |
| **Mốc 4**<br>*(7/12 – 18/12)* | Bàn giao dự án | Nghiệm thu | 07/12/2026 | 11/12/2026 | 5 ngày | PM, QA 1 | 25h |
| | | Bàn giao chính thức | 14/12/2026 | 18/12/2026 | 5 ngày | PM, QA 2 | 25h |

---

## III. MÔ TẢ CHI TIẾT NỘI DUNG TỪNG MỐC

### 1. Mốc 0: Khởi động (01/09/2026 – 18/09/2026)
* **Mục tiêu:** Hoàn thiện đặc tả yêu cầu, thiết kế kiến trúc hệ thống và dựng cơ sở hạ tầng nền tảng.
* **Các công việc chính:**
  * **Khảo sát & Đặc tả (01/09 – 02/09):** PM và BA thực hiện làm rõ phạm vi, tài liệu hóa luồng nghiệp vụ.
  * **Thiết kế & Tạm ứng (03/09 – 10/09):** Senior cùng PM/BA thiết kế giao diện, luồng dữ liệu kiến trúc hệ thống.
  * **Database & Nền tảng (11/09 – 18/09):** Senior và Dev 1 dựng cấu trúc database, thiết lập môi trường framework.

### 2. Mốc 1: Nền tảng (21/09/2026 – 09/10/2026)
* **Mục tiêu:** Xây dựng khung bảo mật, định danh người dùng và cơ chế phân quyền cốt lõi.
* **Các công việc chính:**
  * **M01: Đăng nhập & Xác thực (21/09 – 25/09):** Senior, Dev 1, Dev 2 lập trình cơ chế Auth/Token/Session.
  * **M02: Vai trò & Phân quyền (28/09 – 02/10):** Senior, Dev 1, Dev 3 cấu hình ma trận quyền theo vai trò.
  * **M03: Quản lý tài khoản (05/10 – 07/10):** Senior, Dev 2, Dev 3 tạo các chức năng CRUD người dùng/phân hệ.
  * **Test QA/QC Đợt 1 (08/10 – 14/10):** Đội ngũ QA (QA 1, QA 2) cùng PM kiểm thử chức năng và phối hợp khách hàng nghiệm thu sơ bộ giai đoạn nền tảng.

### 3. Mốc 2: Ticket & Phân hệ sinh viên (12/10/2026 – 13/11/2026)
* **Mục tiêu:** Đây là giai đoạn trọng tâm của hệ thống, triển khai toàn bộ quy trình vòng đời của Ticket hỗ trợ.
* **Các công việc chính:**
  * **M04: Quản lý danh mục (12/10 – 14/10):** Khởi tạo danh mục phòng ban, loại yêu cầu hỗ trợ.
  * **M05: Khởi tạo Ticket (15/10 – 19/10):** Giao diện và API cho sinh viên gửi yêu cầu hỗ trợ.
  * **M06: Tiếp nhận Ticket (20/10 – 22/10):** Cơ chế ghi nhận và phân loại ticket đến bộ phận chuyên môn.
  * **M11: Điều phối Ticket (23/10 – 26/10):** Chức năng gán việc, phân bổ người giải quyết ticket.
  * **M07: Xử lý & Bổ sung (27/10 – 28/10):** Trao đổi, yêu cầu bổ sung thông tin giữa các bên.
  * **M08: Trả kết quả (29/10 – 30/10):** Phản hồi giải pháp/kết quả xử lý đến sinh viên.
  * **Test QA/QC Đợt 2 (02/11 – 06/11):** Kiểm thử toàn bộ luồng tạo, tiếp nhận và điều phối ticket.
  * **M09: Theo dõi (02/11 – 03/11):** Màn hình tra cứu trạng thái, tiến độ xử lý ticket.
  * **M10: Kết quả & Đánh giá (04/11 – 05/11):** Chức năng đánh giá chất lượng phục vụ và đóng ticket.
  * **Test QA/QC Đợt 3 (09/11 – 13/11):** Kiểm thử luồng đóng ticket, đánh giá và hoàn thiện phân hệ sinh viên.

### 4. Mốc 3: Giám sát Dashboard (16/11/2026 – 04/12/2026)
* **Mục tiêu:** Xây dựng hệ thống đo lường, phân tích hiệu suất và báo cáo dữ liệu quản trị.
* **Các công việc chính:**
  * **M12: Giám sát tiến độ (16/11 – 20/11):** Dev 1, Dev 2, Dev 3 xây dựng màn hình tracking SLA, cảnh báo ticket quá hạn.
  * **M13: Dashboard & Báo cáo (23/11 – 27/11):** Lập trình biểu đồ thống kê, xuất báo cáo tổng hợp.
  * **Test QA/QC Đợt 4 (30/11 – 04/12):** Kiểm thử tính chính xác của số liệu và độ ổn định báo cáo.

### 5. Mốc 4: Bàn giao dự án (07/12/2026 – 18/12/2026)
* **Mục tiêu:** Nghiệm thu toàn diện và chuyển giao chính thức hệ thống vào vận hành.
* **Các công việc chính:**
  * **Nghiệm thu (07/12 – 11/12):** PM phối hợp cùng QA 1 và khách hàng rà soát tài liệu, checklist nghiệm thu UAT.
  * **Bàn giao chính thức (14/12 – 18/12):** PM và QA 2 thực hiện bàn giao môi trường Production, bàn giao mã nguồn, tài liệu hướng dẫn và đóng dự án.

> *(Lưu ý: Vai trò BA theo kế hoạch sẽ đồng hành, hỗ trợ làm rõ nghiệp vụ và phối hợp UAT xuyên suốt toàn bộ 16 tuần với tổng thời lượng phân bổ là 174 giờ).*

---

## IV. LÝ DO CHIA MILESTONE, PHỤ THUỘC, NỖ LỰC KIỂM THỬ & DỰ PHÒNG

### 1. Nguyên tắc chia Milestone, Sản phẩm khách hàng dùng thử và Phụ thuộc giữa các mốc
Dự án được tổ chức theo 5 cột mốc tuần tự (`MS-00` $\rightarrow$ `MS-04`, căn cứ theo baseline tại [Dieu-chinh-proposal.md](Dieu-chinh-proposal.md)):

| Mã Mốc | Thời gian | Giờ công | Phụ thuộc | Sản phẩm chạy được / Đầu ra bàn giao & Cách khách hàng tự kiểm tra (Nghiệm thu) |
| :---: | :---: | :---: | :---: | :--- |
| **`MS-00`** | Tuần 1–3<br>*(01/09 – 18/09)* | 88h | — | **Đầu ra & Kiểm tra:** Bàn giao bản **Prototype giao diện tương tác (Interactive Prototype)** trên trình duyệt cùng khung ứng dụng & Database (`INF-01`) đã khởi tạo trên môi trường Staging ([Proposal.md — Mục 6.1 & 6.2](Proposal.md#61-lộ-trình-triển-khai-16-tuần)). Khách hàng trực tiếp bấm duyệt luồng màn hình của 4 vai trò trên Prototype để xác nhận khóa phạm vi trước khi lập trình chi tiết. |
| **`MS-01`** | Tuần 4–6<br>*(21/09 – 14/10)* | 160h | `MS-00` | **Phần mềm chạy được:** Phân hệ Xác thực (`M01`), Phân quyền RBAC (`M02`) và Quản lý tài khoản (`M03`).<br>**Cách khách hàng tự dùng thử:** Khách hàng đăng nhập bằng 4 tài khoản vai trò (`Student`, `Staff`, `Manager`, `Admin`), thử nghiệm đổi mật khẩu lần đầu, khóa tài khoản khi nhập sai 5 lần, bật/tắt quyền động và import danh sách tài khoản bằng file Excel. |
| **`MS-02`** | Tuần 7–11<br>*(12/10 – 13/11)* | 290h | `MS-01` | **Phần mềm chạy được:** Trọn vẹn vòng đời xử lý Ticket (`M04` đến `M11`).<br>**Cách khách hàng tự dùng thử:** Khách hàng tự thực hiện luồng khép kín: Cấu hình danh mục & SLA (`M04`) $\rightarrow$ Sinh viên tạo đơn & đính kèm file (`M05`) $\rightarrow$ Nhân viên tiếp nhận (`M06`) / Admin & Trưởng phòng điều phối (`M11`) $\rightarrow$ Nhân viên xử lý, yêu cầu bổ sung 3 ngày làm việc (`M07`) và trả kết quả (`M08`) $\rightarrow$ Sinh viên theo dõi, nộp bổ sung (`M09`) và đánh giá CSAT 1–5 sao (`M10`). |
| **`MS-03`** | Tuần 12–14<br>*(16/11 – 04/12)* | 124h | `MS-02` | **Phần mềm chạy được:** Phân hệ Giám sát tiến độ (`M12`) và Dashboard & Báo cáo (`M13`).<br>**Cách khách hàng tự dùng thử:** Trưởng phòng và Ban Giám hiệu truy cập Dashboard xem biểu đồ thống kê thời gian thực, kiểm tra cảnh báo tô đỏ với các đơn quá hạn SLA, tra cứu đơn toàn trường và tải xuống báo cáo định dạng Excel/PDF. |
| **`MS-04`** | Tuần 15–16<br>*(07/12 – 18/12)* | 50h | `MS-03` | **Phần mềm chạy được:** Bản phát hành hoàn chỉnh (Release Candidate / Production) tích hợp toàn bộ 13 phân hệ (`M01`–`M13`) kèm dữ liệu mẫu nghiệm thu (`Docs-02`) và bộ tài liệu hướng dẫn (`Docs-01`).<br>**Cách khách hàng tự dùng thử:** Khách hàng thực hiện kiểm thử nghiệm thu người dùng (UAT) toàn trình trên hệ thống hoàn chỉnh theo tiêu chuẩn tại [Proposal.md — Mục 8.2](Proposal.md#82-nghiệm-thu) và ký biên bản bàn giao chính thức. |

### 2. Phân bổ giờ công Kiểm thử (Test / Regression) và Sửa lỗi
* **Kiểm thử theo từng mốc:** Thay vì dồn toàn bộ kiểm thử về cuối dự án, kế hoạch bố trí **04 đợt Test QA/QC độc lập** ngay trong từng mốc phát triển: Đợt 1 tại `MS-01` (44h), Đợt 2 và Đợt 3 tại `MS-02` (44h + 44h = 88h), Đợt 4 tại `MS-03` (44h), cùng giai đoạn Nghiệm thu & Bàn giao tại `MS-04` (50h). Việc kiểm thử hồi quy (Regression Test) và sửa lỗi được thực hiện cuốn chiếu trước khi đóng từng mốc theo quy định tại [QL-chat-luong.md](QL-chat-luong.md).
* **Tổng đối chiếu giờ công (886 giờ):** Tổng giờ công các tác vụ trên bảng tiến độ là `88h + 160h + 290h + 124h + 50h = 712h`, cộng với `174h` của BA đồng hành xuyên suốt 16 tuần = **`886 giờ công`**, khớp 100% với bảng ngân sách nhân sự tại [Ngan-sach-nhan-su.md](Ngan-sach-nhan-su.md) và báo giá [Bao-gia-cho-khach.md](Bao-gia-cho-khach.md).

### 3. Quỹ dự phòng cho Rủi ro & Yêu cầu thay đổi (CR), và tiếp nhận phản hồi
* **Dự phòng ngân sách & rủi ro:** Dự án trích lập khoản **Chi phí dự phòng rủi ro & bảo hành là `22.138.272 VNĐ`** (tách biệt với chi phí lương trực tiếp `153.685.350 VNĐ` tại [Ngan-sach-nhan-su.md — Mục 3](Ngan-sach-nhan-su.md#3-bảng-tổng-hợp-ngân-sách-dự-án--tính-toán-sau-thuế)) để ứng phó với các rủi ro trong [risk-register.md](risk-register.md) và các điều chỉnh nhỏ trong hạn mức.
* **Tiếp nhận phản hồi và xử lý Change Request sau mỗi Milestone:** Kết thúc mỗi mốc, PM tổ chức báo cáo và demo sản phẩm ([Dieuphoi-Giamsat.md — Mục 2.3](Dieuphoi-Giamsat.md#23-báo-cáo-cột-mốc-milestone-report)). Phản hồi của khách hàng được tiếp nhận, phân loại theo [QL-san-pham.md — Mục 4.2](QL-san-pham.md#42-quản-lý-phân-loại-và-luồng-xử-lý-tiếp-theo); nếu phát sinh thay đổi phạm vi/tiến độ/chi phí sau khi đã chốt baseline thì thực hiện qua quy trình phê duyệt **Change Request (`CR-xx`)** tại [Dieuphoi-Giamsat.md — Mục 3.4](Dieuphoi-Giamsat.md#34-quy-trình-yêu-cầu-thay-đổi-change-request---cr-và-phân-cấp-phê-duyệt).
