# BÁO GIÁ VÀ ĐIỀU KIỆN TRIỂN KHAI DỰ ÁN UNI SUPPORT

## 1. Thông tin chung
* **Dự án:** UniSupport - Hệ thống quản lý hỗ trợ sinh viên
* **Khách hàng:** Aurora University
* **Đơn vị triển khai:** Tổ hợp Dự án UniSupport
* **Thời gian dự kiến:** Khoảng 16 tuần
* **Kinh phí:** 300.000.000 VNĐ (đã bao gồm VAT)

*Ghi chú: Mức 300.000.000 VNĐ là giá trị thương mại được xác định sau quá trình trao đổi và đàm phán giữa hai bên, đã bao gồm VAT và là tổng giá trị khách hàng phải thanh toán theo các điều kiện trong báo giá này.*

---

## 2. Phạm vi và hạng mục báo giá

> **Liên kết cơ sở ước lượng giờ công (Effort) & đơn giá:** Chi tiết phân bổ 886 giờ công theo vai trò, đơn giá theo giờ và cơ cấu chi phí dự án được quy định tại [Ngan-sach-nhan-su.md](Ngan-sach-nhan-su.md) và chi tiết theo từng tác vụ tại [Master-schedule.md](Master-schedule.md).

| Mã hạng mục | Cột mốc (`MS-xx`) | Phạm vi Module / Công việc bàn giao | Giờ WBS | Giờ BA | Tổng Effort | Thành tiền (VNĐ, gồm VAT) | Đơn giá bình quân (VNĐ/h) |
| :---: | :--- | :--- | :---: | :---: | :---: | ---: | ---: |
| **`Q-00`** | **MS-00 – Khởi động**<br>*(Tuần 1 – 3)* | Khảo sát quy trình, đặc tả yêu cầu, thiết kế kiến trúc/DB (`INF-01`), bàn giao Interactive Prototype 4 vai trò. *(M01 bắt đầu ở MS-01)*. | 88h | 32h | **120h** | 30.000.000 | **250.000** |
| **`Q-01`** | **MS-01 – Nền tảng**<br>*(Tuần 4 – 6)* | Module `M01` (Đăng nhập), `M02` (Phân quyền), `M03` (Quản lý tài khoản), kèm kiểm thử QA/QC Đợt 1 & khách hàng test (08–14/10). | 160h | 32h | **192h** | 45.000.000 | **234.375** |
| **`Q-02`** | **MS-02 – Ticket & SV**<br>*(Tuần 7 – 11)* | Khởi động `M04` từ 12/10 (overlap đến 14/10), hoàn thiện vòng đời Ticket (`M04`–`M11`), phân hệ sinh viên và kiểm thử Đợt 2 & 3. | 290h | 56h | **346h** | 90.000.000 | **260.116** |
| **`Q-03`** | **MS-03 – Giám sát**<br>*(Tuần 12 – 14)* | Giám sát tiến độ & cảnh báo SLA (`M12`), Dashboard & Báo cáo quản trị (`M13`), kèm kiểm thử QA/QC Đợt 4. | 124h | 32h | **156h** | 45.000.000 | **288.462** |
| **`Q-04`** | **MS-04 – Bàn giao**<br>*(Tuần 15 – 16)* | Kiểm thử nghiệm thu người dùng (UAT), bàn giao tài liệu kỹ thuật, chuyển giao Production và bảo hành 06 tháng. | 50h | 22h | **72h** | 90.000.000 | **1.250.000** |
| **TỔNG** | **Toàn dự án (16 tuần)** | **Toàn bộ 13 Module (`M01`–`M13`) + Hạ tầng nền tảng + UAT bàn giao** | **712h** | **174h** | **886h** | **300.000.000** | **338.599** |

> **Nguyên tắc tính toán và Cơ cấu Đơn giá bình quân:**
> - **Công thức tính đơn giá bình quân từng hạng mục:** $\text{Đơn giá bình quân (Q-xx)} = \frac{\text{Thành tiền Q-xx}}{\text{Tổng Effort Q-xx}}$.
> - **Đơn giá bình quân toàn dự án:** $\frac{300.000.000\text{ VNĐ}}{886\text{ giờ công}} \approx 338.599\text{ VNĐ/giờ}$ (~338,6k/h), hoàn toàn khớp với tổng 886 giờ công tại [Ngan-sach-nhan-su.md](Ngan-sach-nhan-su.md) và [Master-schedule.md](Master-schedule.md).
> - **Giải trình hạng mục `Q-04`:** Mức đơn giá tính trên giờ của `Q-04` cao hơn các giai đoạn phát triển trước do gói chi phí này bao gồm trách nhiệm nghiệm thu toàn trình (UAT), chi phí chuyển giao quyền sử dụng trọn đời mã nguồn, chi phí rủi ro đóng gói và cam kết bảo hành miễn phí 06 tháng sau bàn giao.
>
> **Quyền lợi của khách hàng:** Khách hàng được kiểm tra và xác nhận sản phẩm bàn giao trước khi thực hiện thanh toán theo từng đợt, căn cứ trên phạm vi và tiêu chí đã được hai bên thống nhất.

---

## 3. Điều kiện thanh toán
Về phương thức thanh toán thương mại, dự án áp dụng cơ chế 02 đợt thanh toán (tỷ lệ 70% – 30%) nhằm đảm bảo nguồn kinh phí vận hành, hạ tầng và chi trả lương cho đội ngũ nhân sự ngay từ khi khởi động dự án:

| Đợt thanh toán | Cột mốc áp dụng | Điều kiện kích hoạt thanh toán | Tỷ lệ | Giá trị thanh toán (VNĐ) |
| :--- | :--- | :--- | :---: | ---: |
| **Đợt 1 (Tạm ứng khởi động)** | **Mốc 0 (Khởi động)**<br>*(Tuần 1)* | Khách hàng thực hiện thanh toán tạm ứng ngay sau khi ký kết thỏa thuận hợp đồng và chính thức khởi động dự án để bảo đảm nguồn ngân sách thực thi, thiết lập hạ tầng Staging và chi trả lương nhân sự. | 70% | **210.000.000** |
| **Đợt 2 (Tất toán bàn giao)** | **Mốc 4 (Bàn giao)**<br>*(Tuần 15–16)* | Thanh toán toàn bộ giá trị còn lại sau khi hoàn tất kiểm thử nghiệm thu người dùng (UAT), bàn giao đầy đủ bộ mã nguồn, tài liệu hướng dẫn và ký biên bản bàn giao chính thức. | 30% | **90.000.000** |
| **TỔNG CỘNG** | **Toàn dự án** | **Hoàn thành nghĩa vụ thanh toán hợp đồng** | **100%** | **300.000.000** |

> **Nguyên tắc phân biệt giữa Báo giá hạng mục và Điều kiện thanh toán:**
> - Bảng tại **Mục 2** (`Q-00` đến `Q-04`) là bảng **báo giá chi tiết theo từng hạng mục và module bàn giao**, xác định giá trị kinh tế của từng phân hệ chức năng tương ứng với khối lượng giờ công (effort) thực tế.
> - Bảng tại **Mục 3** quy định **lịch trình dòng tiền thanh toán thực tế** giữa hai bên: Áp dụng cơ chế tạm ứng 70% tại Mốc 0 để đơn vị triển khai chủ động dòng tiền chi trả đội ngũ, tránh rủi ro đứt gãy tài chính trong suốt 14 tuần phát triển. Khách hàng giữ lại 30% để thanh toán tại Mốc 4 khi nghiệm thu toàn trình.

---

## 4. Điều kiện triển khai và quản lý phạm vi

### 4.1. Cơ sở báo giá
* Báo giá được xây dựng trên cơ sở phạm vi, tiến độ và các giả định triển khai của Dự án UniSupport.
* Về giá và điều kiện thanh toán, báo giá này là căn cứ áp dụng cho giao dịch thương mại giữa hai bên.
* Về phạm vi chức năng và yêu cầu, căn cứ theo Proposal/phiên bản tài liệu được hai bên xác nhận.

### 4.2. Chốt phạm vi
Phạm vi dự án được xác nhận tại Mốc 1 và là cơ sở để triển khai các giai đoạn tiếp theo. Sau khi phạm vi được chốt, các yêu cầu phát sinh hoặc thay đổi so với phạm vi đã xác nhận sẽ được đánh giá riêng về:
* Ảnh hưởng đến thời gian.
* Ảnh hưởng đến nguồn lực.
* Ảnh hưởng đến chi phí.

Việc thực hiện thay đổi chỉ được tiến hành sau khi hai bên thống nhất bằng văn bản về phạm vi thay đổi và các ảnh hưởng liên quan đến thời gian, nguồn lực và chi phí.

### 4.3. Hạ tầng và dữ liệu
* Khách hàng có trách nhiệm cung cấp các thông tin cần thiết, dữ liệu thử nghiệm/dữ liệu giả lập và điều kiện hạ tầng thuộc trách nhiệm của khách hàng theo thống nhất giữa hai bên.
* Trường hợp việc chậm cung cấp thông tin, dữ liệu, phản hồi hoặc điều kiện hạ tầng từ phía khách hàng ảnh hưởng trực tiếp đến tiến độ, thời gian thực hiện dự án sẽ được điều chỉnh tương ứng với thời gian bị ảnh hưởng.

### 4.4. Thuế
Mức giá 300.000.000 VNĐ đã bao gồm VAT. Các nghĩa vụ thuế và trách nhiệm liên quan được thực hiện theo quy định pháp luật hiện hành.

---

## 5. Cam kết và trách nhiệm của các bên

### Đơn vị triển khai
* Cung cấp đầy đủ hồ sơ và thông tin cần thiết để khách hàng thực hiện thanh toán theo từng đợt.
* Thông báo cho khách hàng khi đạt điều kiện thanh toán của từng đợt.
* Không phát sinh thêm chi phí ngoài giá trị báo giá nếu không có thay đổi phạm vi được hai bên thống nhất.

### Khách hàng
* Thực hiện thanh toán đúng thời hạn theo thỏa thuận.
* Phối hợp xác nhận các điều kiện thanh toán và cung cấp hồ sơ cần thiết khi có yêu cầu.
* Các nội dung về phạm vi, tiến độ, nghiệm thu, bàn giao, bảo hành và hỗ trợ được thực hiện theo Proposal và các tài liệu được hai bên xác nhận.

---

## 6. Hiệu lực báo giá
* Báo giá có hiệu lực trong vòng 30 ngày kể từ ngày phát hành.
* Báo giá này được sử dụng cùng với Proposal và các tài liệu được hai bên xác nhận để làm cơ sở triển khai dự án.
