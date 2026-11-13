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

| Mã hạng mục | Cột mốc (`MS-xx`) | Phạm vi Module / Công việc | Giờ công WBS trực tiếp | Giá trị báo giá (VNĐ, gồm VAT) |
| :---: | :--- | :--- | :---: | ---: |
| **`Q-00`** | **MS-00 – Khởi động** (Tuần 1 – 3) | Khảo sát & đặc tả, thiết kế kiến trúc/UI, tạm ứng, dựng Database & nền tảng (`INF-01`). | 88h | 30.000.000 |
| **`Q-01`** | **MS-01 – Nền tảng** (Tuần 4 – 6) | `M01` Đăng nhập & Xác thực, `M02` Vai trò & Phân quyền, `M03` Quản lý tài khoản, kèm Test QA/QC Đợt 1. | 160h | 45.000.000 |
| **`Q-02`** | **MS-02 – Ticket và Phân hệ sinh viên** (Tuần 7 – 11) | `M04` Danh mục, `M05` Tạo Ticket, `M06` Tiếp nhận, `M07` Xử lý & Bổ sung, `M08` Trả kết quả, `M09` Theo dõi, `M10` Đánh giá, `M11` Điều phối, kèm Test QA/QC Đợt 2 & Đợt 3. | 290h | 90.000.000 |
| **`Q-03`** | **MS-03 – Giám sát Dashboard** (Tuần 12 – 14) | `M12` Giám sát tiến độ & cảnh báo SLA, `M13` Dashboard & Báo cáo, kèm Test QA/QC Đợt 4. | 124h | 45.000.000 |
| **`Q-04`** | **MS-04 – Bàn giao dự án** (Tuần 15 – 16) | Kiểm thử nghiệm thu toàn diện (UAT), chuẩn bị tài liệu hướng dẫn và bàn giao chính thức. | 50h | 90.000.000 |
| **—** | **Hoạt động BA xuyên suốt** (Tuần 1 – 16) | BA đồng hành làm rõ nghiệp vụ, quản lý yêu cầu và hỗ trợ nghiệm thu xuyên suốt 16 tuần *(đã phân bổ vào giá các mốc trên)*. | 174h | *(Đã tính trong Q-00..Q-04)* |
| **TỔNG** | **Toàn dự án (16 tuần)** | **13 Module (`M01`–`M13`) + `INF-01` + Kiểm thử & Bàn giao** | **886h** | **300.000.000** |

> **Quyền lợi của khách hàng:** Khách hàng được kiểm tra và xác nhận sản phẩm bàn giao trước khi thực hiện thanh toán theo từng đợt, căn cứ trên phạm vi và tiêu chí đã được hai bên thống nhất.

---

## 3. Điều kiện thanh toán
Về phương thức thanh toán, các mốc được chia thành 02 đợt thanh toán như sau:

| Đợt thanh toán | Mốc | Điều kiện thanh toán | Giá trị |
| :--- | :--- | :--- | :--- |
| **Đợt 1** | Từ Mốc 0 đến Mốc 3 | Sau khi hoàn thành từ Mốc 0 đến hết Mốc 3 (Khảo sát, Nền tảng, Ticket - Phân hệ sinh viên và Dashboard giám sát). | 210.000.000 VNĐ (70%) |
| **Đợt 2** | Mốc 4 | Sau khi hoàn tất công tác nghiệm thu, chuẩn bị đầy đủ tài liệu và bàn giao chính thức dự án. | 90.000.000 VNĐ (30%) |
| **Tổng** | | | **300.000.000 VNĐ (100%)** |

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
