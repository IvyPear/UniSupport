# ĐỀ XUẤT GIẢI PHÁP HỆ THỐNG QUẢN LÝ HỖ TRỢ SINH VIÊN (UNISUPPORT)

- **Khách hàng:** Ban Giám hiệu - Aurora University

- **Đơn vị triển khai:** Tổ hợp Dự án UniSupport

- **Thời gian thực hiện dự kiến:** 16 Tuần

## 1. Mục tiêu

Xây dựng và triển khai nền tảng **UniSupport** nhằm đạt được các mục tiêu cốt lõi sau:

- **Tập trung hóa quản lý:** Cung cấp kênh duy nhất để sinh viên gửi phản ánh/yêu cầu và theo dõi tiến độ xử lý minh bạch.

- **Tối ưu quy trình vận hành:** Phân loại và tự động chuyển yêu cầu đến đúng phòng ban/nhân viên có thẩm quyền giải quyết dựa trên quy tắc đã thống nhất.

## 2. Giải pháp đề xuất

UniSupport là hệ thống Web hỗ trợ sinh viên, giúp Aurora University quản lý và xử lý các yêu cầu hỗ trợ sinh viên trên một nền tảng tập trung.

Hệ thống cho phép sinh viên gửi yêu cầu, theo dõi trạng thái xử lý và nhận thông báo. Các phòng ban có thể tiếp nhận, phân loại, phân công và cập nhật tiến độ xử lý yêu cầu.

## 3. Assumptions (Giả định)

- Hệ thống phục vụ quy mô khoảng **3.000 sinh viên**, **KHÔNG** bao gồm tối ưu hóa tải cho hàng trăm nghìn người dùng đồng thời.

- Giao diện hỗ trợ Tiếng Việt và Tiếng Anh.

- Thời gian triển khai không bao gồm thời gian chờ phản hồi từ phía khách hàng.

- Không yêu cầu tích hợp bên thứ ba.

- Hiệu năng phụ thuộc vào hạ tầng do khách hàng cung cấp.

## 4. Các hạng mục ngoài phạm vi triển khai

Để đảm bảo tiến độ và tính khả thi trong thời gian 16 tuần, các hạng mục sau **không nằm trong phạm vi** triển khai đợt này:

- Ứng dụng di động độc lập (Mobile App) trên App Store hoặc Google Play.

- Chức năng Trò chuyện trực tuyến hoặc Trợ lý ảo AI.

- Tích hợp với Cổng thanh toán học phí hoặc các phần mềm tài chính bên thứ ba, ngoài hệ thống quản lý đào tạo.

- Đảm bảo an toàn tài khoản, dữ liệu và thông tin người dùng trong phạm vi triển khai.

- Phát triển các chức năng chưa được mô tả hoặc chưa được thống nhất trong phạm vi dự án.

## 5. Chức năng

**Module 1: Quản lý / Admin**

- Đăng nhập

- Theo dõi và thống kê:

- Theo dõi số lượng và trạng thái yêu cầu.

- Theo dõi tiến độ xử lý của các phòng ban.

- Theo dõi các yêu cầu tồn đọng.

- Xem báo cáo và thống kê.

- Quản lý hệ thống:

- Quản lý tài khoản người dùng.

- Quản lý vai trò và quyền sử dụng.

- Quản lý danh mục hỗ trợ.

- Quản lý yêu cầu:

> o Xem và tiếp nhận yêu cầu.
>
> o Phân loại hoặc chuyển yêu cầu đến bộ phận phù hợp.( của admin)

**Module 2: Nhân viên(Phòng ban**

- Đăng nhập

- Xử lý yêu cầu:

- Cập nhật tiến độ.

- Trả kết quả xử lý.

**Module 3: Sinh viên**

- Đăng nhập

- Request:

- Gửi yêu cầu

- Xem trạng thái yêu cầu

- Nhận kết quả

- Đánh giá chất lượng

## 6. Kế hoạch

Thời gian làm việc tính từ **Thứ Hai đến Thứ Bảy** (không bao gồm Chủ Nhật và ngày các ngày Lễ, Tết).

### 6.1. Lộ trình triển khai (16 Tuần)

<table>
<colgroup>
<col style="width: 24%" />
<col style="width: 75%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Tuần</strong></th>
<th><strong>Công việc chính</strong></th>
</tr>
<tr class="odd">
<th><strong>Tuần 1</strong></th>
<th><ul>
<li><blockquote>
<p>Khảo sát quy trình, hoàn thiện tài liệu mô tả yêu cầu.</p>
</blockquote></li>
<li><blockquote>
<p>Khởi động dự án.</p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><strong>Tuần 2 - 3</strong></th>
<th><p><strong>Hoàn thiện và bàn giao bản mẫu:</strong></p>
<ul>
<li><blockquote>
<p>Giao diện tương tác (Prototype).</p>
</blockquote></li>
<li><blockquote>
<p>Thiết kế cơ sở dữ liệu ban đầu.</p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><strong>Tuần 4 - 7</strong></th>
<th>Phát triển &amp; kiểm thử module Admin.</th>
</tr>
<tr class="header">
<th><strong>Tuần 8 - 9</strong></th>
<th>Phát triển &amp; kiểm thử module Nhân viên.</th>
</tr>
<tr class="odd">
<th><strong>Tuần 10 – 11</strong></th>
<th>Phát triển &amp; kiểm thử module Sinh viên.</th>
</tr>
<tr class="header">
<th><strong>Tuần 12</strong></th>
<th>Kết hợp và kiểm tra các luồng hoạt động chính đúng theo logic vận hành.</th>
</tr>
<tr class="odd">
<th><strong>Tuần 13</strong></th>
<th><strong>Kiểm thử với khách hàng:</strong> Khách hàng kiểm thử trên dữ liệu giả lập.</th>
</tr>
<tr class="header">
<th><strong>Tuần 14</strong></th>
<th><ul>
<li><blockquote>
<p>Khắc phục lỗi phát hiện trong quá trình kiểm thử với khách hàng.</p>
</blockquote></li>
<li><blockquote>
<p>Ổn định hệ thống.</p>
</blockquote></li>
</ul></th>
</tr>
<tr class="odd">
<th><strong>Tuần 15</strong></th>
<th><ul>
<li><blockquote>
<p>Nghiệm thu.</p>
</blockquote></li>
<li><blockquote>
<p>Chuẩn bị các tài liệu liên quan.</p>
</blockquote></li>
</ul></th>
</tr>
<tr class="header">
<th><strong>Tuần 16</strong></th>
<th><ul>
<li><blockquote>
<p>Đóng gói sản phẩm.</p>
</blockquote></li>
<li><blockquote>
<p>Bàn giao tài liệu và hướng dẫn sử dụng.</p>
</blockquote></li>
</ul></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

### 6.2. Các cột mốc quan trọng

- **Mốc 0 (Tuần 1):** Khởi động dự án và thực hiện khoản tạm ứng theo thỏa thuận để chính thức khởi động dự án.

- **Mốc 1 (Tuần 2 - 3):** Hoàn thành bản mẫu và Khóa phạm vi dự án

- **Mốc 2 (Tuần 13):** Kiểm thử với khách hàng

- **Mốc 3 (Tuần 15):** Nghiệm thu

- **Mốc 4 (Tuần 16):** Bàn giao chính thức hệ thống và tài liệu.

## 7. Kinh phí

- Tổng kinh phí gói triển khai dự án UniSupport**: 400.000.000** **VNĐ** (*dự kiến, có thể thay đổi)*.

## 8. Nghiệm thu và bàn giao

### 8.1. Nội dung bàn giao

Các sản phẩm bàn giao chính thức vào tháng cuối của dự án bao gồm:

- Bộ mã nguồn và hệ thống phần mềm UniSupport hoàn chỉnh.

- Bản thiết kế giao diện mẫu.

- Tài liệu Kiến trúc & Kỹ thuật hệ thống.

- Tài liệu Hướng dẫn sử dụng.

### 8.2. Nghiệm thu

**Thời gian nghiệm thu:** Khách hàng tiến hành kiểm tra và ký biên bản nghiệm thu trong vòng **10 ngày làm việc** kể từ thời điểm hệ thống được bàn giao chính thức.

**Nguyên tắc nghiệm thu**

- Hoạt động đúng với các yêu cầu đã được hai bên xác nhận.

- Hoạt động đúng trong các tình huống kiểm tra đã thống nhất.

- Không còn lỗi nghiêm trọng làm gián đoạn việc sử dụng hệ thống.

- Các lỗi phát sinh do phía đơn vị phát triển (nếu có) được ghi nhận và có kế hoạch khắc phục cụ thể.

### 8.3. Bảo hành và hỗ trợ

- **Thời gian bảo hành: 06 tháng** miễn phí tính từ ngày ký Biên bản nghiệm thu và bàn giao chính thức.

- **Phạm vi bảo hành:** Sửa chữa các lỗi kỹ thuật/lỗi phần mềm phát sinh thuộc phạm vi đã chốt tại Mốc 1. Không áp dụng cho các tính năng mới hoặc yêu cầu thay đổi ngoài scope.

- **Khung giờ tiếp nhận hỗ trợ:** Từ **08:00 đến 17:00, Thứ Hai đến Thứ Sáu và 09:00 đến 15h đối với Thứ Bảy** (Trừ các ngày lễ, Tết).

- **Thời gian phản hồi:** Phản hồi trong vòng **24 giờ** kể từ khi nhận được thông tin đối với lỗi nghiêm trọng.

## 9. Cam kết

**Cam kết chung giữa hai bên:**

- Cùng hợp tác trên tinh thần minh bạch, tôn trọng và hỗ trợ lẫn nhau nhằm đảm bảo dự án hoàn thành đúng mục tiêu và chất lượng đề ra.

- Mọi phát sinh, thay đổi về phạm vi hoặc tiến độ sẽ được thảo luận công khai và thống nhất bằng văn bản trước khi thực hiện.

- **Phát sinh yêu cầu mới ngoài phạm vi:** Phạm vi chức năng được hai bên thống nhất tại **Mốc 1 – cuối Tuần 3**. Sau thời điểm này, mọi yêu cầu bổ sung hoặc thay đổi sẽ được xem xét riêng về thời gian và kinh phí trước khi thực hiện.

- **Thay đổi yêu cầu nghiệp vụ:** Thống nhất và chốt văn bản yêu cầu tại **Mốc 1 – cuối Tuần 3**. Mọi yêu cầu thay đổi sau thời điểm này phải tuân theo quy trình quản lý thay đổi chính thức và đánh giá lại ngân sách/tiến độ.

**Cam kết từ Đơn vị triển khai (Tổ hợp Dự án UniSupport):**

- Nỗ lực tối đa triển khai dự án theo đúng lộ trình, đảm bảo chất lượng kỹ thuật, an toàn bảo mật và trải nghiệm người dùng theo đúng phạm vi đã thống nhất tại **Mốc 1**.

- Bàn giao đầy đủ bộ tài liệu hướng dẫn sử dụng và thực hiện dịch vụ **bảo hành 06 tháng** theo đúng quy định.

- Đảm bảo tính bảo mật cho dữ liệu và thông tin nội bộ của Khách hàng trong suốt quá trình triển khai.

- **Phát sinh lỗi kỹ thuật:** Đội kiểm thử tham gia từ sớm trong quá trình phát triển để phát hiện và xử lý lỗi trước khi đến giai đoạn nghiệm thu, thay vì chỉ kiểm tra vào cuối dự án.

**Cam kết và trách nhiệm từ Khách hàng (Aurora University):**

- Cung cấp đầy đủ, chính xác và kịp thời tài liệu nghiệp vụ, dữ liệu giả lập và hạ tầng kỹ thuật cần thiết theo tiến độ dự án.

- Phối hợp nghiệm thu đúng thời hạn và cam kết phản hồi các yêu cầu/kết quả trong vòng 10 ngày làm việc. Trường hợp Khách hàng quá hạn phản hồi hoặc chậm bàn giao thông tin/hạ tầng, Đơn vị triển khai có quyền tự động gia hạn thời gian thực hiện tương ứng mà không bị coi là vi phạm tiến độ hoặc chịu phạt đền bù.

<!-- -->

- Đảm bảo thanh toán đầy đủ và đúng hạn theo các mốc đã thỏa thuận để duy trì tiến độ công việc liên tục.
