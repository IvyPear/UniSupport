# TÀI LIỆU ĐẶC TẢ YÊU CẦU SẢN PHẨM (PRD)

* **Tên dự án:** UniSupport – Hệ thống tiếp nhận & xử lý yêu cầu hỗ trợ sinh viên
* **Khách hàng:** Trường Đại học Aurora (Aurora University)
* **Phiên bản:** 1.0

---

## PHẦN I: TỔNG QUAN & ĐỊNH HƯỚNG SẢN PHẨM

### 1. Tuyên bố vấn đề (Problem Statement)
* **Thực trạng:** Hiện tại, sinh viên phải gửi yêu cầu hỗ trợ qua nhiều kênh rải rác (email cá nhân, mạng xã hội, gặp trực tiếp...), dẫn đến đơn từ dễ bị thất lạc. Hơn 70% sinh viên phải chờ 3–5 ngày chỉ để nhận phản hồi cho một thắc mắc đơn giản.
* **Ảnh hưởng:** Sinh viên không nắm được tiến độ hay người phụ trách đơn của mình. Phía nhà trường và các phòng ban gặp khó khăn lớn trong việc quản lý khối lượng công việc, theo dõi tiến độ và kiểm tra lại các yêu cầu cũ bị trôi.

### 2. Mục tiêu & Phạm vi (Goals & Non-goals)
* **Mục tiêu (Goals):** Xây dựng một Cổng thông tin tập trung duy nhất cho khoảng 3.000 sinh viên để gửi, tra cứu FAQ và theo dõi trạng thái yêu cầu. Đồng thời, cung cấp công cụ quản lý workflow giúp nhân viên và quản lý xử lý đơn rõ ràng, đúng thời hạn.
* **Ngoài phạm vi (Non-goals):** Hệ thống không thay thế các cổng nghiệp vụ đào tạo chuyên sâu (như đăng ký học phần, xem điểm thi chính thức) mà chỉ tập trung vào tiếp nhận và xử lý yêu cầu hỗ trợ/thắc mắc administrative.

### 3. Bối cảnh dự án (Context & Background)
Nhà trường cần một nền tảng chuẩn hóa quy trình tiếp nhận thông tin, giúp đo lường chính xác hiệu suất giải quyết công việc của từng phòng ban. Ngoài ra, việc tích hợp chuyên mục Câu hỏi thường gặp (FAQ) thông minh giúp sinh viên tự giải đáp thắc mắc phổ biến, làm giảm tải số lượng yêu cầu trùng lặp gửi đến cán bộ.

### 4. Phân vai người dùng & Tình huống sử dụng (User Roles & Use Cases)
Hệ thống chia thành 4 nhóm người dùng với vai trò cụ thể:
* **Sinh viên:** Đăng nhập tài khoản trường, tra cứu FAQ, tạo ticket hỗ trợ mới, đính kèm minh chứng, theo dõi tiến độ xử lý theo thời gian thực và đánh giá chất lượng phục vụ sau khi hoàn thành.
* **Nhân viên xử lý:** Xem danh sách ticket phân về phòng ban, tiếp nhận đơn, trao đổi/yêu cầu sinh viên bổ sung hồ sơ, chuyển tiếp đơn sai luồng và gửi phản hồi đóng ticket.
* **Quản lý (Manager):** Theo dõi Dashboard tổng quan (số đơn tồn, tỷ lệ trễ hạn, SLA), phân công/điều chuyển công việc giữa các nhân viên để tối ưu vận hành.
* **Quản trị viên (Admin):** Cấu hình danh mục hỗ trợ, thiết lập quy tắc tự động điều phối ticket, quản lý tài khoản/phân quyền và bảo trì hệ thống FAQ mẫu.

---

## PHẦN II: LUỒNG NGHIỆP VỤ & QUẢN LÝ RỦI RO (CORE FLOWS & TRADE-OFFS)

### 1. Luồng Xác thực & Phân quyền người dùng
* **Bối cảnh:** Cần đảm bảo tính bảo mật, phân luồng chức năng chuẩn xác cho 4 nhóm người dùng, tuyệt đối không lộ thông tin nội bộ cho sinh viên.
* **Giải pháp:** Yêu cầu đăng nhập bằng SSO/Email do nhà trường cấp. Hệ thống tự động nhận diện Role ID và điều hướng người dùng đến Workspace tương ứng.
* **Rủi ro (Trade-off):** Người dùng quên mật khẩu hoặc bị tấn công dò mật khẩu (Brute-force).
* **Phương án xử lý:** Hỗ trợ khôi phục mật khẩu tự động qua Email xác thực. Khóa tài khoản tạm thời 15 phút nếu nhập sai mật khẩu 5 lần liên tiếp.

### 2. Luồng Sinh viên tạo yêu cầu (Ticket Creation)
* **Bối cảnh:** Sinh viên thường bối rối trong việc chọn đúng đơn vị xử lý hoặc trình bày thiếu thông tin cần thiết.
* **Giải pháp:** Thiết kế Wizard tạo đơn 4 bước rõ ràng: Chọn Phòng ban → Chọn Danh mục → Nhập Chi tiết yêu cầu → Đính kèm tệp minh chứng. Hệ thống tự động sinh Mã ticket (Ticket ID) ngay khi tạo thành công.
* **Rủi ro (Trade-off):** Sinh viên chọn sai phòng ban hoặc gửi câu hỏi lặp lại đã có trong FAQ.
* **Phương án xử lý:** 
  * Tích hợp bộ gợi ý FAQ tự động dựa trên từ khóa tiêu đề trước khi mở nút "Gửi".
  * Cung cấp tính năng "Chuyển tiếp" cho nhân viên và danh mục "Khác" để Admin điều phối lại các đơn bị nhầm lẫn.

### 3. Luồng Tiếp nhận & Xử lý Ticket của Nhân viên
* **Bối cảnh:** Tránh việc nhiều nhân viên trùng lặp xử lý một đơn hoặc đơn bị bỏ sót không ai đảm nhận.
* **Giải pháp:** Cơ chế "Claim Ticket": Khi nhân viên bấm "Tiếp nhận", ticket lập tức khóa trạng thái gán cho cá nhân đó, không cho phép nhân viên khác thao tác tiếp nhận.
* **Rủi ro (Trade-off):** Nhân viên nhận đơn nhưng không xử lý hoặc ngâm đơn quá thời hạn.
* **Phương án xử lý:** Gắn đồng hồ đếm ngược SLA/Deadline. Hệ thống tự động cảnh báo đỏ trên Dashboard Quản lý khi ticket vượt quá thời gian cam kết.

### 4. Luồng Ngoại lệ: Bổ sung hồ sơ & Tự động đóng đơn
* **Bối cảnh:** Yêu cầu gửi lên thiếu thông tin hoặc giấy tờ minh chứng bắt buộc.
* **Giải pháp:** Cho phép nhân viên chuyển trạng thái ticket sang "Chờ bổ sung" kèm lý do chi tiết để thông báo cho sinh viên.
* **Rủi ro (Trade-off):** Sinh viên không quay lại bổ sung, gây ngâm đọng rác dữ liệu trên hệ thống.
* **Phương án xử lý:** Kích hoạt Job tự động đóng ticket (Auto-close) sau 7 ngày liên tục nếu sinh viên không có thao tác phản hồi hay cập nhật mới.

### 5. Luồng Quản trị hệ thống & Danh mục (Admin Config)
* **Bối cảnh:** Cơ cấu tổ chức phòng ban và quy trình thủ tục của nhà trường thường thay đổi theo từng kỳ học.
* **Giải pháp:** Admin có toàn quyền thêm, sửa, ẩn/hiện các Danh mục, Phòng ban và bài viết FAQ trực quan trên CMS Quản trị.
* **Rủi ro (Trade-off):** Admin thao tác xóa nhầm danh mục đang chứa dữ liệu ticket lịch sử, gây lỗi hệ thống.
* **Phương án xử lý:** Áp dụng cơ chế Soft-delete / Deactivate (Ẩn danh mục). Danh mục bị ẩn sẽ không hiển thị khi tạo đơn mới nhưng toàn bộ ticket lịch sử vẫn nguyên vẹn để tra cứu.

---

## PHẦN III: BẢNG ĐẶC TẢ CHỨC NĂNG CHI TIẾT (FUNCTIONAL SPECIFICATIONS)

| Phân hệ / Đối tượng | Tên chức năng | Điều kiện tiên quyết | Luồng thao tác | Kết quả mong đợi | Xử lý ngoại lệ & Case Test |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Xác thực (Auth)** | Đăng nhập | Tài khoản đã được khởi tạo trong hệ thống UniSupport. | Nhập Email, Mật khẩu và nhấn "Đăng nhập". | Xác thực thành công, trả về JWT Token và điều hướng người dùng tới Dashboard theo Role. | - Trống dữ liệu: Báo lỗi "Vui lòng nhập đầy đủ thông tin".<br>- Sai mật khẩu 5 lần: Khóa tài khoản 15 phút, gửi email cảnh báo. |
| | Quên mật khẩu | Giao diện Đăng nhập. | Nhấn "Quên mật khẩu", nhập Email tài khoản và nhấn "Gửi". | Hệ thống gửi Email chứa đường dẫn Reset Password (token hết hạn sau 15 phút). | - Email không tồn tại: Thông báo "Tài khoản không tồn tại". |
| **2. Sinh viên** | Tạo ticket hỗ trợ | Đã đăng nhập thành công với vai trò Sinh viên. | 1. Chọn Phòng ban & Danh mục.<br>2. Nhập Tiêu đề, Nội dung.<br>3. Tải đính kèm (tuỳ chọn).<br>4. Bấm "Gửi yêu cầu". | Khởi tạo Ticket ID mới, set trạng thái "Chờ tiếp nhận", gửi email xác nhận và về trang Danh sách ticket. | - Bỏ trống thông tin: Cảnh báo đỏ.<br>- File > 5MB hoặc sai định dạng (`.png`, `.jpg`, `.pdf`, `.docx`): Chặn Upload. |
| | Theo dõi tiến độ | Đã gửi ít nhất 1 ticket. | Nhấp vào ticket bất kỳ trong danh sách đơn cá nhân. | Hiển thị chi tiết timeline xử lý: Thời gian tạo, người tiếp nhận, nhật ký phản hồi, tệp kết quả. | - Ticket bị ẩn/không thuộc sở hữu: Báo lỗi "Không có quyền truy cập". |
| | Bổ sung hồ sơ | Ticket ở trạng thái "Chờ bổ sung". | Mở ticket, cập nhật nội dung/tệp đính kèm theo yêu cầu và nhấn "Gửi bổ sung". | Chuyển trạng thái về lại "Đang xử lý" và gửi Notification cho nhân viên phụ trách. | - Quá 7 ngày không bổ sung: Tự động chuyển sang "Đã đóng (Closed)". |
| | Đánh giá dịch vụ | Ticket chuyển sang "Hoàn thành". | Chọn số sao (1–5), nhập nhận xét và nhấn "Gửi đánh giá". | Ghi nhận điểm CSAT vào hệ thống, liên kết với hồ sơ nhân viên xử lý. | - Đã đánh giá rồi: Khóa form, chỉ cho phép xem lại. |
| **3. Nhân viên** | Lọc & Tìm kiếm ticket | Đang ở màn hình Quản lý Ticket phòng ban. | Nhập Mã ticket, từ khóa hoặc chọn bộ lọc (Trạng thái, Thời gian, Độ ưu tiên). | Hiển thị danh sách kết quả phù hợp theo thời gian thực. | - Không khớp dữ liệu: Báo "Không tìm thấy dữ liệu phù hợp". |
| | Tiếp nhận ticket | Ticket ở trạng thái "Chờ tiếp nhận". | Nhấn nút "Tiếp nhận". | Gán Assignee = Nhân viên hiện tại, đổi sang "Đang xử lý", tính giờ SLA. | - Người khác nhận trước 1 giây: Báo lỗi "Ticket đã có người tiếp nhận", ẩn nút. |
| | Yêu cầu bổ sung | Ticket ở trạng thái "Đang xử lý". | Nhấn "Yêu cầu bổ sung", nhập lý do/chi tiết thông tin thiếu. | Chuyển trạng thái sang "Chờ bổ sung", thông báo cho sinh viên. | - Bỏ trống lý do: Chặn gửi, yêu cầu nhập nội dung hướng dẫn. |
| | Chuyển tiếp ticket | Ticket gửi sai thẩm quyền phòng ban. | Nhấn "Chuyển tiếp", chọn Phòng ban đích và điền lý do. | Ticket rời khỏi Queue cũ, đẩy về Queue phòng ban mới ở trạng thái "Chờ tiếp nhận". | - Chuyển trùng phòng ban hiện tại: Hệ thống chặn thao tác. |
| | Hoàn thành ticket | Đã xử lý xong yêu cầu. | Nhập nội dung phản hồi chính thức, đính kèm kết quả (nếu có) và nhấn "Hoàn thành". | Chuyển trạng thái sang "Hoàn thành", dừng đếm SLA, mở form Đánh giá. | - Chưa điền nội dung kết quả: Chặn đóng ticket. |
| **4. Quản lý** | Xem Dashboard Thống kê | Tài khoản có vai trò Quản lý (Manager). | Truy cập mục Dashboard Thống kê phòng ban. | Hiển thị các chỉ số: Tổng ticket, Tỷ lệ đúng hạn SLA, Số đơn quá hạn, Điểm CSAT trung bình. | - Dữ liệu load tự động chu kỳ Real-time / Auto-refresh 5 phút. |
| | Phân công / Phân bổ lại | Có ticket trễ hạn hoặc nhân viên vắng mặt. | Chọn ticket → Chọn "Re-assign" → Chọn Nhân viên mới → Bấm "Giao việc". | Cập nhật Assignee mới, ghi lại Audit Log quá trình điều chuyển. | - Nhân viên mới ngưng hoạt động: Chặn phân công. |
| **5. Admin** | Quản lý Danh mục & Cấu hình | Tài khoản có quyền Admin. | Thêm/Sửa/Ẩn Danh mục hỗ trợ, Phòng ban hoặc cấu hình quy tắc phân luồng. | Dữ liệu cập nhật ngay lập tức. Danh mục ẩn không hiện ở form tạo đơn mới. | - Không cung cấp nút Hard Delete (xóa hẳn) để tránh đứt gãy quan hệ dữ liệu. |
| | Điều phối danh mục "Khác" | Sinh viên tạo ticket thuộc mục "Khác". | Đọc nội dung ticket và chọn lại Phòng ban chuyên trách phù hợp. | Ticket chuyển về Queue phòng ban đích ở trạng thái "Chờ tiếp nhận". | - Không chọn phòng ban đích: Chặn lưu thao tác điều phối. |
