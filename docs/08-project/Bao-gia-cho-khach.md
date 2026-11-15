# BÁO GIÁ VÀ ĐIỀU KIỆN TRIỂN KHAI DỰ ÁN UNI SUPPORT

## 1. Thông tin chung
* **Dự án:** UniSupport - Hệ thống quản lý hỗ trợ sinh viên
* **Khách hàng:** Aurora University
* **Đơn vị triển khai:** Tổ hợp Dự án UniSupport
* **Thời gian dự kiến:** Khoảng 16 tuần
* **Kinh phí:** 300.000.000 VNĐ (đã bao gồm VAT)

*Ghi chú: Mức 300.000.000 VNĐ là giá trị thương mại được xác định sau quá trình trao đổi và đàm phán giữa hai bên, đã bao gồm VAT và là tổng giá trị khách hàng phải thanh toán theo các điều kiện trong báo giá này.*

---

## 2. Bảng báo giá chi tiết theo module (Hệ thống UniSupport)

> **Thông tin chung:**
> - **Dự án:** Hệ thống Quản lý và Tiếp nhận Hỗ trợ UniSupport
> - **Tổng ngân sách modules:** `300.000.000 VNĐ` (Đã bao gồm VAT)
> - **Đơn vị tính:** Việt Nam Đồng (VNĐ)
> - **Phương pháp định giá:** Phân bổ theo tỷ trọng chi phí nhân sự thực tế (dựa trên đơn giá theo giờ từng vai trò)

| STT | Mã báo giá | Mã module | Tên Module / Chức năng | Giờ WBS (h) | Giờ BA (h) | Tổng Effort (h) | Thành tiền (VNĐ) |
| :---: | :---: | :---: | :--- | :---: | :---: | :---: | ---: |
| 1 | **`Q-01`** | `M01` | Đăng nhập & xác thực | 40 h | 10 h | **50 h** | 17.000.000 ₫ |
| 2 | **`Q-02`** | `M02` | Vai trò & Phân quyền | 38 h | 9 h | **47 h** | 16.000.000 ₫ |
| 3 | **`Q-03`** | `M03` | Quản lý tài khoản | 40 h | 10 h | **50 h** | 17.000.000 ₫ |
| 4 | **`Q-04`** | `M04` | Quản lý danh mục | 42 h | 10 h | **52 h** | 17.500.000 ₫ |
| 5 | **`Q-05`** | `M05` | Khởi tạo Ticket | 82 h | 19 h | **101 h** | 34.500.000 ₫ |
| 6 | **`Q-06`** | `M06` | Tiếp nhận Ticket | 75 h | 17 h | **92 h** | 31.000.000 ₫ |
| 7 | **`Q-07`** | `M07` | Xử lý & Bổ sung | 80 h | 19 h | **99 h** | 33.500.000 ₫ |
| 8 | **`Q-08`** | `M08` | Trả kết quả | 62 h | 14 h | **76 h** | 26.000.000 ₫ |
| 9 | **`Q-09`** | `M09` | Theo dõi & Bổ sung | 50 h | 12 h | **62 h** | 21.000.000 ₫ |
| 10 | **`Q-10`** | `M10` | Kết quả & Đánh giá | 34 h | 9 h | **43 h** | 14.500.000 ₫ |
| 11 | **`Q-11`** | `M11` | Điều phối Ticket | 46 h | 11 h | **57 h** | 19.500.000 ₫ |
| 12 | **`Q-12`** | `M12` | Giám sát tiến độ | 58 h | 15 h | **73 h** | 24.500.000 ₫ |
| 13 | **`Q-13`** | `M13` | Dashboard & Báo cáo | 65 h | 19 h | **84 h** | 28.000.000 ₫ |
| **-** | **TỔNG CỘNG** | **13 MODULES** | **Toàn bộ hệ thống UniSupport** | **712 h** | **174 h** | **886 h** | **300.000.000 ₫** |

> **Kiểm tra đối soát (Phương án A):** ✅ Khớp đúng ngân sách: **300.000.000 ₫** (100%) | Khớp đúng nỗ lực: **886h Effort** (712h WBS + 174h BA).
>
> 📌 **NGUYÊN TẮC XÁC ĐỊNH & PHÂN BỔ GIỜ CÔNG VÀ LƯƠNG NHÂN SỰ:**
> 1. **Đơn giá lương:** Trích xuất từ bảng *'PHÂN CHIA GIỜ CÔNG CHI TIẾT'*: PM 200.000 đ/h, BA 160.000 đ/h, Senior Dev 240.000 đ/h, Junior Devs (Dev 1, Dev 2, Dev 3) 90.000 đ/h, QA/QC 125.000 đ/h. Tổng quỹ lương gốc của toàn bộ dự án (886h) là 126.490.000 VNĐ.
> 2. **Nhân sự module:** Từng module được gán đúng nhân sự đảm nhận: Senior phụ trách chính các module phức tạp, nền tảng (M01, M02, M03, M04, M05, M06, M11); Junior Devs phụ trách triển khai chi tiết; BA tham gia xuyên suốt mọi module. Các module thuần Junior không tính lương Senior.
> 3. **Định giá phân bổ (Phương án A):** Ngân sách 300.000.000 VNĐ được tái phân bổ tập trung trọng số lớn vào các module cốt lõi xử lý Ticket của Mốc 2 (M05–M11 chiếm ~60% ngân sách và effort). Chi phí từng module phân bổ theo tỷ trọng nỗ lực thực tế kết hợp hệ số nghiệp vụ: $\text{Thành tiền} = \text{Tỷ trọng nỗ lực \& độ phức tạp} \times 300.000.000\text{ VNĐ}$, đảm bảo khớp đúng 300.000.000 VNĐ.
> 4. **Quy mô nỗ lực:** Nỗ lực phát triển trực tiếp 13 modules là 450h (398h Dev + 52h BA). Toàn bộ 436h công việc chung (PM 72h, QA/QC 170h, kiến trúc & nền tảng 72h, nghiệm thu & bàn giao 122h BA) được phân bổ theo tỷ trọng nỗ lực kỹ thuật, đảm bảo tổng nỗ lực khớp đúng 712h WBS, 174h BA (tổng 886h effort).
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
> - Bảng tại **Mục 2** (`Q-01` đến `Q-13`) là bảng **báo giá chi tiết theo từng module chức năng bàn giao**, xác định giá trị kinh tế của từng phân hệ tương ứng với khối lượng giờ công (effort) và độ phức tạp kỹ thuật thực tế.
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
