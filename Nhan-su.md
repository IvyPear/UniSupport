# TỔ CHỨC ĐỘI NGŨ VÀ PHÂN CÔNG TRÁCH NHIỆM

Dự án UniSupport sử dụng đội ngũ **08 nhân sự bán thời gian** trong thời gian triển khai **16 tuần**, gồm 01 Project Manager (PM), 01 Business Analyst (BA), 01 Senior Developer, 03 Junior Developer và 02 QA/QC. Nhân sự được phân bổ theo từng giai đoạn và chức năng, không yêu cầu tất cả thành viên tham gia xuyên suốt toàn bộ thời gian dự án.

**Quy ước thời gian làm việc:** 04 giờ/ngày, 05 ngày trong tuần và 04 giờ vào sáng thứ 7, tương đương **16 tuần** khi nhân sự được huy động đầy đủ. Chi phí nhân sự được tính dựa trên **số giờ dự kiến thực tế của từng vai trò** theo kế hoạch phân công.

## CƠ CẤU ĐỘI NGŨ

| **Nhóm chuyên môn**                    | **SL** | **Vai trò**                              | **Trách nhiệm chính**                                                                                                                                   |
|----------------------------------------|--------|------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Khối Quản lý & Phân tích nghiệp vụ** | 02     | 01 PM, 01 BA                             | Khởi động và điều phối dự án; khảo sát, phân tích và chốt yêu cầu; theo dõi phạm vi, tiến độ; phối hợp nghiệm thu và bàn giao.                          |
| **Khối Phát triển phần mềm**           | 04     | 01 Senior Developer, 03 Junior Developer | Thiết kế CSDL và kiến trúc; phát triển các module Quản lý/Admin, Nhân viên, Sinh viên; xây dựng giao diện, API, chức năng phụ trợ; tích hợp và sửa lỗi. |
| **Khối Kiểm thử**                      | 02     | 02 QA/QC                                 | Kiểm thử chức năng theo từng module; ghi nhận và theo dõi lỗi; kiểm thử tích hợp, kiểm thử toàn diện và hỗ trợ UAT trước nghiệm thu.                    |

## 1. BẢNG TỔNG QUÁT PHÂN CÔNG NHÂN SỰ

| **Giai đoạn**                                 | **Thời gian** | **Nhân sự chính**      | **Dự phòng rủi ro** |
|-----------------------------------------------|---------------|------------------------|---------------------|
| **Khởi động + phân tích yêu cầu**             | Tuần 1        | PM, BA, Senior         | 0%                  |
| **Prototype + thiết kế CSDL**                 | Tuần 2- 3     | BA, Senior, Junior     | 10%                 |
| **Module Quản lý/Admin**                      | Tuần 4- 7     | BA, Senior, Junior, QA | 30%                 |
| **Module Nhân viên**                          | Tuần 8- 9     | BA, Senior, Junior, QA |                     |
| **Module Sinh viên**                          | Tuần 10       | BA, Senior, Junior, QA |                     |
| **Kết hợp các module (Tích hợp hệ thống)**    | Tuần 11- 12   | Senior, Junior, QA     | 10%                 |
| **Kiểm thử toàn diện & UAT (Giai đoạn cuối)** | Tuần 13 – 14  | PM, BA, Senior, QA     | 15%                 |
| **Nghiệm thu & Bàn giao dự án**               | Tuần 16       | PM, BA                 | 0%                  |

## 2. BẢNG PHÂN CÔNG CHI TIẾT

<table style="width:100%;">
<colgroup>
<col style="width: 19%" />
<col style="width: 24%" />
<col style="width: 12%" />
<col style="width: 6%" />
<col style="width: 6%" />
<col style="width: 7%" />
<col style="width: 7%" />
<col style="width: 6%" />
<col style="width: 7%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Hạng mục / Module</strong></th>
<th><strong>Chức năng cụ thể</strong></th>
<th><strong>Estimate</strong></th>
<th colspan="5"><strong>Resources (số lượng)</strong></th>
<th><strong>Risk</strong></th>
</tr>
<tr class="odd">
<th colspan="3"><strong>Nhân sự</strong></th>
<th><strong>PM</strong></th>
<th><strong>BA</strong></th>
<th><strong>SEN</strong></th>
<th><strong>JUN</strong></th>
<th><strong>QA</strong></th>
<th></th>
</tr>
<tr class="header">
<th><strong>Khởi động &amp; Phân tích hệ thống (Setup)</strong></th>
<th>Khảo sát, thiết kế CSDL &amp; kiến trúc hệ thống</th>
<th>11 ngày</th>
<th>1</th>
<th>1</th>
<th>1</th>
<th>1</th>
<th>1</th>
<th>15%</th>
</tr>
<tr class="odd">
<th rowspan="4"><strong>Module 1: Quản lý / Admin (16.5 ngày)</strong></th>
<th>Chức năng Đăng nhập và xác thực hệ thống</th>
<th>3 ngày</th>
<th>0</th>
<th>1</th>
<th>1</th>
<th>2</th>
<th>0</th>
<th>10%</th>
</tr>
<tr class="header">
<th>Theo dõi và thống kê</th>
<th>3.5 ngày</th>
<th>0</th>
<th>1</th>
<th>1</th>
<th>2</th>
<th>1</th>
<th>20%</th>
</tr>
<tr class="odd">
<th>Quản lý hệ thống</th>
<th>3 ngày</th>
<th>0</th>
<th>1</th>
<th>1</th>
<th>2</th>
<th>1</th>
<th>15%</th>
</tr>
<tr class="header">
<th>Quản lý yêu cầu</th>
<th>2 ngày</th>
<th>0</th>
<th>1</th>
<th>0</th>
<th>3</th>
<th>1</th>
<th>20%</th>
</tr>
<tr class="odd">
<th><strong>Module 2: Nhân viên (11 ngày)</strong></th>
<th>Xử lý yêu cầu</th>
<th>3 ngày</th>
<th>0</th>
<th>1</th>
<th>0</th>
<th>2</th>
<th>1</th>
<th>15%</th>
</tr>
<tr class="header">
<th rowspan="2"><strong>Module 3: Sinh viên<br />
(11 ngày)</strong></th>
<th>Request</th>
<th>4 ngày</th>
<th>0</th>
<th>1</th>
<th>0</th>
<th>3</th>
<th>1</th>
<th>15%</th>
</tr>
<tr class="odd">
<th>Đánh giá chất lượng</th>
<th>2 ngày</th>
<th>0</th>
<th>0</th>
<th>0</th>
<th>3</th>
<th>1</th>
<th>0%</th>
</tr>
<tr class="header">
<th><strong>Tích hợp &amp; Kiểm thử (11 ngày)</strong></th>
<th>Kết nối toàn bộ module &amp; Kiểm thử toàn diện</th>
<th>7 ngày</th>
<th>0</th>
<th>1</th>
<th>1</th>
<th>2</th>
<th>2</th>
<th>20%</th>
</tr>
<tr class="odd">
<th><strong>Nghiệm thu &amp; Bàn giao</strong></th>
<th>Đóng gói sản phẩm. Và bàn giao tài liệu và hướng dẫn sử dụng.</th>
<th>7 ngày</th>
<th>1</th>
<th>1</th>
<th>1</th>
<th>1</th>
<th>0</th>
<th>10%</th>
</tr>
</thead>
<tbody>
</tbody>
</table>

## 3. BẢNG PHÂN BỔ LƯƠNG CHI TIẾT THEO VAI TRÒ VÀ CÁ NHÂN

| **STT**       | **Vai trò**              | **SL** | **Đơn giá TB/giờ (VNĐ)** | **Giờ dự kiến/người** | **Tổng Gross/người (VNĐ)** | **BH DN 21,5%\*** | **Chi phí DN/người (VNĐ)** |
|---------------|--------------------------|--------|--------------------------|-----------------------|----------------------------|-------------------|----------------------------|
| 1             | Project Manager (PM)     | 1      | 200.000                  | 72h                   | 14.400.000                 | 3.096.000         | 17.496.000                 |
| 2             | Business Analyst (BA)    | 1      | 160.000                  | 174h                  | 27.840.000                 | 5.985.600         | 33.825.600                 |
| 3             | Senior Developer (Dev 1) | 1      | 240.000                  | 138h                  | 33.120.000                 | 7.120.800         | 40.240.800                 |
| 4             | Junior Developer (Dev 2) | 1      | 90.000                   | 120h                  | 10.800.000                 | 2.322.000         | 13.122.000                 |
| 5             | Junior Developer (Dev 3) | 1      | 90.000                   | 108h                  | 9.720.000                  | 2.089.800         | 11.809.800                 |
| 6             | Junior Developer (Dev 4) | 1      | 90.000                   | 108h                  | 9.720.000                  | 2.089.800         | 11.809.800                 |
| 7             | QA/QC Specialist (QA 1)  | 1      | 125.000                  | 85h                   | 10.625.000                 | 2.284.375         | 12.909.375                 |
| 8             | QA/QC Specialist (QA 2)  | 1      | 125.000                  | 85h                   | 10.625.000                 | 2.284.375         | 12.909.375                 |
| **TỔNG CỘNG** |                          | **8**  |                          | **890h**              | **126.850.000**            | **27.272.750**    | **154.122.750**            |

## Tổng chi phí nhân sự

> · **Tổng Gross nhân sự:** 126.850.000 VNĐ
>
> · **Bảo hiểm doanh nghiệp giả định:** 27.272.750 VNĐ
>
> · **Tổng chi phí nhân sự phía công ty: 154.122.750 VNĐ**

## 4. BẢNG TỔNG HỢP NGÂN SÁCH DỰ ÁN & TÍNH TOÁN SAU THUẾ

| **STT** | **Hạng mục tài chính**                  | **Cơ sở tính toán / Công thức**          | **Thành tiền (VNĐ)** |
|---------|-----------------------------------------|------------------------------------------|----------------------|
| 1       | **Tổng giá trị hợp đồng**               | Giá trọn gói đã bao gồm VAT              | **300.000.000**      |
| 2       | **Doanh thu dự án chưa VAT**            | 300.000.000 / 1,10                       | **272.727.273**      |
| 3       | Chi phí lương nhân sự                   | Tổng quỹ lương Gross                     | 126.850.000          |
| 4       | Chi phí bảo hiểm doanh nghiệp giả định  | 21,5% × (3)                              | 27.272.750           |
| 5       | Chi phí dự phòng rủi ro & bảo hành      | Theo Risk trong bảng phân công           | 22.138.272           |
| 6       | Chi phí vận hành, hạ tầng & quản lý     | Server, môi trường test, domain, quản lý | 15.489.366           |
| 7       | **Tổng chi phí dự án**                  | \(3\) + (4) + (5) + (6)                  | **191.750.388**      |
| 8       | **Lợi nhuận trước thuế (EBT)**          | \(2\) − (7)                              | **80.976.885**       |
| 9       | **Thuế thu nhập doanh nghiệp giả định** | 15% × (8)                                | **12.146.533**       |
| 10      | **Lợi nhuận ròng dự kiến**              | \(8\) − (9)                              | **68.830.352**       |
|         | **Biên lợi nhuận ròng**                 | 68.830.352 / 300.000.000                 | **22,94%**           |

## 5. KẾT QUẢ CUỐI CÙNG

| **Chỉ tiêu**                            | **Số tiền**         |
|-----------------------------------------|---------------------|
| **Giá hợp đồng**                        | **300.000.000 VNĐ** |
| Doanh thu chưa VAT                      | 227.272.727 VNĐ     |
| Chi phí nhân sự                         | 101.570.000 VNĐ     |
| Bảo hiểm doanh nghiệp                   | 21.837.550 VNĐ      |
| Dự phòng rủi ro & bảo hành              | 18.448.560 VNĐ      |
| Vận hành + hạ tầng + quản lý            | 12.907.805 VNĐ      |
| **Tổng chi phí**                        | **154.763.915 VNĐ** |
| EBT                                     | 72.508.812 VNĐ      |
| Thuế thu nhập doanh nghiệp giả định 15% | 10.876.322 VNĐ      |
| **Lợi nhuận ròng**                      | **61.632.490 VNĐ**  |
| **Biên lợi nhuận ròng**                 | **24,65%**          |
