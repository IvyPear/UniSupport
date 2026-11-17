# MA TRẬN KỊCH BẢN KIỂM THỬ (TEST CASES MATRIX & NEGATIVE CASES)

> **Dự án:** UniSupport — Nền tảng Tiếp nhận và Hỗ trợ Thủ tục Hành chính Sinh viên  
> **Phiên bản:** 2.1 (QA/QC Test Engineering Specification — Đồng bộ mã AC & Baseline `MS-00..MS-04`)  
> **Phạm vi kế hoạch:** 13 Phân hệ (M01 đến M13), bao gồm **Happy Path**, **Negative Cases**, **Boundary Cases** và **Security/Concurrency**. Bảng số lượng bên dưới là phân bổ dự kiến; các bảng chi tiết liệt kê kịch bản tiêu biểu có ánh xạ trực tiếp đến từng Tiêu chí nghiệm thu (`AC-xx`) của PRD.

---

## 1. Tổng quan Phân bổ Kịch bản Kiểm thử

| Mã Module | Tên Phân hệ | Mốc Milestone | Happy Path | Negative / Edge Cases | Tổng số Test Cases | Trạng thái |
|:---:|---|:---:|:---:|:---:|:---:|:---:|
| **M01** | Đăng nhập & Xác thực | `MS-01` | 4 | 8 | 12 | Dự kiến |
| **M02** | Vai trò & Phân quyền | `MS-01` | 5 | 5 | 10 | Dự kiến |
| **M03** | Quản lý Tài khoản | `MS-01` | 6 | 9 | 15 | Dự kiến |
| **M04** | Quản lý Danh mục & SLA | `MS-02` | 5 | 7 | 12 | Dự kiến |
| **M05** | Khởi tạo Ticket | `MS-02` | 6 | 12 | 18 | Dự kiến |
| **M06** | Tiếp nhận Ticket & Đua lệnh | `MS-02` | 5 | 9 | 14 | Dự kiến |
| **M07** | Xử lý & Yêu cầu bổ sung | `MS-02` | 8 | 12 | 20 | Dự kiến |
| **M08** | Trả kết quả xử lý | `MS-02` | 5 | 7 | 12 | Dự kiến |
| **M09** | Theo dõi & Nộp bổ sung | `MS-02` | 6 | 10 | 16 | Dự kiến |
| **M10** | Đánh giá CSAT & Auto-close | `MS-02` | 4 | 6 | 10 | Dự kiến |
| **M11** | Điều phối & Re-assign | `MS-02` | 6 | 9 | 15 | Dự kiến |
| **M12** | Giám sát tiến độ & Cảnh báo SLA | `MS-03` | 6 | 8 | 14 | Dự kiến |
| **M13** | Dashboard & Báo cáo | `MS-03` | 6 | 6 | 12 | Dự kiến |
| | **TỔNG DỰ KIẾN** | | **72** | **108** | **180** | **Chưa xác nhận đầy đủ/đã chạy** |

---

## 2. Danh mục Kịch bản Kiểm thử Tiêu biểu (Ánh xạ Tiêu chí Nghiệm thu AC)

### 2.1. Phân hệ M01 — Xác thực & Đăng nhập (`MS-01`)
| Test ID | Mã AC / NFR kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) | Regression |
|---|---|:---:|---|---|:---:|
| `TC-M01-M01` | `FR-M01-01/AC-03`, `NFR-SEC-03` | Kiểm tra cơ chế hệ thống đóng không có nút Đăng ký | Security / UI | Mở màn hình Đăng nhập và kiểm tra API đăng ký tự do | Giao diện tuyệt đối không có nút "Đăng ký"; không tồn tại endpoint tự đăng ký tài khoản. | Có |
| `TC-M01-N01` | `FR-M01-02/AC-01`, `NFR-SEC-02` | Đăng nhập sai mật khẩu 5 lần liên tiếp và thử lại khi đang khóa | Negative / Security | Nhập sai mật khẩu liên tiếp đúng 5 lần, sau đó nhập đúng mật khẩu ở phút thứ 5 | Khóa tạm thời tài khoản 15 phút ngay ở lần sai thứ 5, hiển thị *"Tài khoản tạm thời bị khóa trong 15 phút do nhập sai mật khẩu 5 lần liên tiếp"*, từ chối đăng nhập trong thời gian khóa. | Có |
| `TC-M01-M02` | `FR-M01-02/AC-02` | Tự động mở khóa tài khoản sau khi hết 15 phút | Main / Security | Tài khoản đã hết thời gian `lockout_until` (sau 15 phút), nhập đúng mật khẩu | Hệ thống tự động gỡ khóa, reset `failed_attempts = 0` và cho phép đăng nhập bình thường. | Không |
| `TC-M01-E01` | `FR-M01-02/AC-03` | Nhập sai 4 lần rồi nhập đúng ở lần thứ 5 | Boundary | Nhập sai mật khẩu 4 lần liên tiếp, lần thứ 5 nhập đúng mật khẩu | Đăng nhập thành công và bộ đếm `failed_attempts` được reset ngay về `0`. | Không |
| `TC-M01-N02` | `FR-M01-01/AC-02`, `FR-M01-05/AC-01`, `FR-M03-03/AC-01` | Truy cập trái quyền hoặc đăng nhập bằng tài khoản `INACTIVE` (`E-03`) | Negative / RBAC | Tài khoản `status = 'INACTIVE'` đăng nhập hoặc truy cập URL không thuộc vai trò | Trả về `403 Forbidden`, thông báo *"Tài khoản của bạn đã bị khóa, vui lòng liên hệ Quản trị viên"*, không cấp token. | Có |
| `TC-M01-N03` | `FR-M01-01/AC-01`, `NFR-SEC-01`, `NFR-SEC-03` | Đăng nhập tài khoản mới bằng mật khẩu mặc định (ngày sinh) | Security / Main | Tài khoản mới tạo (`must_change_password = false`) đăng nhập bằng mật khẩu ngày sinh (`DDMMYYYY`) | Đăng nhập thành công (`200 OK`), cấp JWT Token hợp lệ (thời hạn 8 tiếng) và điều hướng vào hệ thống. | Có |
| `TC-M01-N04` | `FR-M01-01/AC-02` | Đăng nhập sai mã định danh/mật khẩu (`E-01`) hoặc bỏ trống trường (`E-02`) | Negative / Security | (1) Nhập sai mật khẩu; (2) Bỏ trống ô mã định danh hoặc mật khẩu | (1) Trả về `401 Unauthorized`, báo *"Mã định danh hoặc mật khẩu không chính xác"*, tăng `failed_attempts`; (2) Chặn tại form / `422 Unprocessable Entity`, viền đỏ và báo *"Vui lòng nhập đầy đủ thông tin"*; cả 2 đều không cấp token. | Có |
| `TC-M01-M03` | `FR-M01-03/AC-01` | Admin đặt lại mật khẩu qua liên kết Email hợp lệ | Main / Security | Email thuộc tài khoản `ADMIN`, sử dụng Reset Token còn hạn trong 15 phút | Gửi liên kết khôi phục thành công, cập nhật mật khẩu mới và vô hiệu hóa Reset Token vừa dùng. | Có |
| `TC-M01-N05` | `FR-M01-03/AC-02` | Liên kết khôi phục quá 15 phút/đã dùng (`E-01`) hoặc mật khẩu mới yếu (`E-02`) | Negative | (1) Nhấp Reset Token sau 15 phút; (2) Nhập mật khẩu mới $< 8$ ký tự / thiếu chữ hoa, số | (1) Trả về `400 Bad Request` kèm thông báo *"Liên kết khôi phục mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng gửi lại yêu cầu"*; (2) Trả về `422 Unprocessable Entity` báo lỗi độ phức tạp mật khẩu. | Không |
| `TC-M01-N06` | `FR-M01-03/AC-03` | Sinh viên/Nhân viên/Quản lý gọi luồng quên mật khẩu của Admin | Negative / Security | Nhập mã định danh hoặc email của `STUDENT`/`STAFF`/`MANAGER` vào form quên mật khẩu | Hệ thống từ chối thực hiện với mã `403 Forbidden`, chỉ cho phép duy nhất vai trò `ADMIN`. | Có |
| `TC-M01-M04` | `FR-M01-04/AC-01`, `NFR-PERF-01` | Tự động điều hướng về đúng trang làm việc theo vai trò | Main | Đăng nhập thành công với tài khoản `Student`, `Staff`, `Manager`, `Admin` (`must_change_password = false`) | Tự động chuyển thẳng tới màn hình làm việc đúng vai trò với độ trễ API $\le 500\text{ms}$. | Có |
| `TC-M01-N07` | `FR-M01-05/AC-02` | Văng phiên đăng nhập khi bị Admin khóa hoặc hết hạn JWT 8 tiếng | Security | (1) Admin chuyển tài khoản đang đăng nhập sang `INACTIVE`; (2) Token quá 8 tiếng | (1) Trả về `403 Forbidden`; (2) Trả về `401 Unauthorized`; cả 2 trường hợp đều xóa token ở Client và đẩy về trang Đăng nhập kèm thông báo hết phiên/bị khóa. | Có |

### 2.1b. Phân hệ M02 & M03 — Phân quyền động và Quản lý tài khoản (`MS-01`)
| Test ID | Mã AC / NFR kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) | Regression |
|---|---|:---:|---|---|:---:|
| `TC-M02-M01` | `FR-M02-01/AC-01` | Xem danh sách 4 vai trò chuẩn và chặn xóa/đổi mã vai trò | Main / Security | Admin mở danh sách vai trò và thử gửi request xóa/đổi mã vai trò chuẩn | Hiển thị đúng 4 vai trò (`Student`, `Staff`, `Manager`, `Admin`) kèm số tài khoản; từ chối `400 Bad Request` nếu xóa/đổi mã. | Có |
| `TC-M02-N01` | `FR-M02-02/AC-01`, `NFR-SEC-05` | Quyền vừa bị Admin tắt trong phiên đang đăng nhập | Security / RBAC | Admin tắt quyền chức năng của một Role; tài khoản Role đó gửi yêu cầu mới | Backend từ chối thao tác không còn quyền ngay ở request tiếp theo, kể cả JWT chưa hết hạn. | Có |
| `TC-M02-N02` | `FR-M02-02/AC-02` | Cố tước quyền tối cao của Admin chính | Negative / Security | Gửi thay đổi ACL tắt quyền quản trị tài khoản hoặc phân quyền tối cao | Backend từ chối cập nhật (`400 Bad Request`) trái quy tắc M02, giữ nguyên quyền Admin chính. | Có |
| `TC-M03-M01` | `FR-M03-01/AC-01` | Tìm kiếm tài khoản theo Mã định danh hoặc Họ tên | Main | Nhập chuỗi con chữ thường/hoa của Mã SV hoặc Họ tên | Trả về chính xác danh sách tài khoản khớp chuỗi con (Case-insensitive); báo rỗng nếu không khớp. | Không |
| `TC-M03-M02` | `FR-M03-01/AC-02` | Lọc kết hợp tài khoản theo Phòng ban, Vai trò và Trạng thái | Main | Chọn bộ lọc `Role = STAFF`, `Status = ACTIVE` và Phòng Đào tạo | Hiển thị đúng danh sách tài khoản thỏa điều kiện, phân trang 20 bản ghi/trang theo thứ tự mới nhất. | Không |
| `TC-M03-M03` | `FR-M03-02/AC-01` | Admin tạo mới tài khoản thủ công hợp lệ | Main | Nhập đủ Mã định danh, Họ tên, Email trường, Vai trò và ngày sinh | Tạo tài khoản `Active` thành công với mật khẩu mặc định `DDMMYYYY`, đăng nhập được ngay. | Có |
| `TC-M03-N02` | `FR-M03-02/AC-02` | Tạo mới tài khoản bị trùng Mã định danh hoặc trùng Email | Negative | Nhập Mã định danh hoặc Email đã tồn tại trong hệ thống | Hệ thống chặn tạo mới (`409 Conflict`) và hiển thị thông báo lỗi trùng dữ liệu. | Có |
| `TC-M03-N03` | `FR-M03-03/AC-01` | Cố tình xóa cứng tài khoản đã có Ticket hoặc khóa Admin chính | Negative | Gửi yêu cầu xóa tài khoản đã phát sinh Ticket hoặc khóa tài khoản Admin chính | Hệ thống chặn thao tác (`400 Bad Request`), chỉ cho phép khóa tài khoản thường. | Có |
| `TC-M03-M04` | `FR-M03-03/AC-02` | Admin mở khóa tài khoản từ `Inactive` sang `Active` | Main | Chọn tài khoản đang bị khóa và chuyển trạng thái về `Active` | Cập nhật trạng thái thành công, người dùng đăng nhập lại bình thường. | Không |
| `TC-M03-N01` | `FR-M01-01/AC-04`, `FR-M01-04/AC-02`, `FR-M03-03/AC-03`, `NFR-SEC-04` | Người dùng đăng nhập sau khi Admin reset mật khẩu | Security / Main | `must_change_password = true`, đăng nhập bằng mật khẩu được reset | Buộc đổi mật khẩu trước khi vào chức năng khác; đổi hợp lệ thì tắt cờ, lần đăng nhập sau không còn bị buộc đổi. | Có |
| `TC-M03-M05` | `FR-M03-04/AC-01` | Import danh sách tài khoản từ file Excel hợp lệ | Main | Tải file `.xlsx` ($\le 10\text{MB}$) gồm cả mã định danh mới và mã đã tồn tại | Tạo mới các tài khoản chưa có (mật khẩu mặc định) và cập nhật thông tin tài khoản cũ (giữ nguyên mật khẩu). | Có |
| `TC-M03-N04` | `FR-M03-04/AC-02` | Import file Excel sai cấu trúc cột hoặc có dòng dữ liệu lỗi | Negative | Tải file thiếu cột bắt buộc hoặc có dòng sai định dạng Email | Chặn toàn bộ tiến trình nếu sai cấu trúc cột; hoặc báo rõ số dòng thành công/thất bại kèm lý do lỗi từng dòng. | Không |

---

### 2.2. Phân hệ M04 & M05 — Quản lý Danh mục, Khởi tạo Ticket & Chỉnh sửa đơn (`MS-02`)
| Test ID | Mã AC / NFR kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) | Regression |
|---|---|:---:|---|---|:---:|
| `TC-M04-M01` | `FR-M04-01/AC-01` | Admin tạo mới danh mục hỗ trợ chung của toàn trường | Main | Nhập Mã danh mục (2–6 ký tự in hoa), Tên, Phòng ban và SLA $> 0$ | Lưu thành công và danh mục hiển thị ngay trên Form tạo Ticket của Sinh viên. | Có |
| `TC-M04-N01` | `FR-M04-01/AC-02` | Tạo danh mục bị trùng Mã danh mục (`E-01`) hoặc SLA không hợp lệ (`E-02`) | Negative | (1) Nhập Mã danh mục đã tồn tại; (2) Nhập thời hạn SLA $\le 0$ | (1) Trả về `409 Conflict` báo trùng mã; (2) Trả về `422 Unprocessable Entity` báo lỗi SLA; cả 2 đều chặn lưu. | Không |
| `TC-M04-M02` | `FR-M04-01/AC-03` | Admin tắt hiển thị danh mục (`is_active = false`) | Main | Chuyển trạng thái hiển thị của danh mục đang có Ticket cũ sang `false` | Danh mục bị ẩn khỏi Form tạo Ticket mới của Sinh viên, nhưng các Ticket cũ vẫn hiển thị nguyên vẹn tên và mã. | Có |
| `TC-M04-M03` | `FR-M04-02/AC-01` | Trưởng phòng quản lý danh mục riêng và chặn sửa phòng khác | Main / RBAC | Trưởng phòng tạo danh mục cho phòng mình và thử gọi API sửa danh mục phòng khác | Tạo thành công danh mục kèm hướng dẫn hồ sơ cho phòng mình; trả về `403 Forbidden` khi chạm danh mục phòng khác. | Có |
| `TC-M05-M01` | `FR-M05-01/AC-01` | Sinh viên chọn Phòng ban và Danh mục hỗ trợ đang hoạt động | Main | Chọn Phòng Đào tạo và danh mục "Cấp bảng điểm" trên form tạo đơn | Form hiển thị chính xác văn bản hướng dẫn chuẩn bị giấy tờ của danh mục đó. | Không |
| `TC-M05-M02` | `FR-M05-01/AC-02` | Sinh viên chọn danh mục "Khác" khi không rõ phòng ban | Main | Tích chọn mục "Khác" trên form tạo yêu cầu | Cho phép chuyển sang bước nhập tiêu đề/nội dung mà không bắt buộc chọn phòng ban. | Có |
| `TC-M05-M03` | `FR-M05-02/AC-01`, `NFR-PERF-01` | Sinh viên gửi Ticket hợp lệ thành công | Main | Nhập tiêu đề ($\ge 5$ ký tự), nội dung ($\ge 10$ ký tự) và đính kèm 2 tệp PDF $\le 5\text{MB}$ | Sinh mã chuẩn `[CATEGORY_CODE]-[YYYYMMDD]-[SEQ_NUMBER]`, lưu trạng thái `New` và đưa vào đúng hàng chờ ($\le 500\text{ms}$). | Có |
| `TC-M05-N01` | `FR-M05-02/AC-02` | Tiêu đề hoặc nội dung Ticket để trống / quá ngắn | Boundary | Nhập tiêu đề 4 ký tự ($< 5$) hoặc nội dung $< 10$ ký tự | Form hiển thị lỗi validation tại ô nhập liệu, chặn gửi Ticket. | Không |
| `TC-M05-N02` | `FR-M05-02/AC-02`, `NFR-PERF-03` | Đính kèm tệp tin vượt quá dung lượng 5MB | Negative | Đính kèm 1 file PDF có dung lượng 5.2MB | Hệ thống chặn tải lên ngay từ Client và Backend trả về `422 Unprocessable Entity` ("Dung lượng tệp tối đa là 5MB"). | Có |
| `TC-M05-N03` | `FR-M05-02/AC-02`, `NFR-PERF-03` | Đính kèm tệp sai định dạng (.exe, .zip, .bat) | Security | Tải lên file script `malware.exe` hoặc `archive.zip` | Bị từ chối ngay lập tức, thông báo danh sách định dạng hợp lệ (`.png`, `.jpg`, `.pdf`, `.docx`). | Có |
| `TC-M05-N04` | `FR-M05-03/AC-03` | Sinh viên sửa đơn khi trạng thái đã là `In Progress` | Negative | Gọi `PUT /api/v1/tickets/{id}` khi ticket đã có nhân viên tiếp nhận | Trả về `400 Bad Request`, thông báo "Đơn đã được tiếp nhận, không thể chỉnh sửa". | Có |
| `TC-M05-N05` | `FR-M05-03/AC-02` | Sinh viên cố tình sửa Danh mục/Phòng ban khi ở `New` | Negative / BR-2 | Sinh viên gửi request thay đổi `category_id` hoặc `department_id` | Backend từ chối thay đổi Danh mục/Phòng ban; chỉ chấp nhận cập nhật `title`, `content` và danh sách tệp đính kèm hợp lệ. | Có |
| `TC-M05-N06` | `FR-M05-03/AC-01`, `FR-M05-03/AC-04` | Sinh viên sửa tiêu đề, nội dung và tệp đính kèm khi Ticket còn `New` | Boundary / File Validation | Chủ Ticket sửa tiêu đề/nội dung, thêm/xóa tệp hợp lệ và thử thêm tệp thứ 6 | Lưu thành công thay đổi hợp lệ trong giới hạn 5 tệp $\times$ 5MB, ghi log Audit Trail và giữ nguyên mã Ticket; chặn tệp thứ 6. | Không |

---

### 2.3. Phân hệ M06 — Tiếp nhận Ticket & Race Condition (Đua lệnh) (`MS-02`)
| Test ID | Mã AC / NFR kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) | Regression |
|---|---|:---:|---|---|:---:|
| `TC-M06-M01` | `FR-M06-01/AC-01` | Nhân viên xem danh sách đơn `New` thuộc phòng ban mình | Main / RBAC | Nhân viên phòng Đào tạo mở hộp thư tiếp nhận và lọc theo danh mục/SLA | Chỉ hiển thị các đơn `New` thuộc phòng Đào tạo; ẩn và chặn `403` với đơn của phòng khác. | Có |
| `TC-M06-M02` | `FR-M06-02/AC-01` | Nhân viên đúng phòng ban bấm nhận xử lý đơn (`Claim`) thành công | Main | Nhân viên bấm "Tiếp nhận" trên 1 đơn `New` thuộc phòng ban mình | Gán `assignee_id` là nhân viên đó, chuyển trạng thái sang `In Progress` và ghi log Audit Trail. | Có |
| `TC-M06-E01` | `FR-M06-02/AC-02`, `NFR-INT-03` | **Hai nhân viên cùng bấm nhận 1 đơn cùng mili-giây** | **Concurrency / Race Condition** | 2 request `POST /api/v1/tickets/{id}/claim` đồng thời | Nhờ Atomic Update (`UPDATE WHERE assignee_id IS NULL`), chính xác 1 nhân viên thành công (`200 OK`), nhân viên còn lại nhận `409 Conflict` và giao diện tự động refresh. | Có |
| `TC-M06-N02` | `FR-M06-02/AC-01`, `NFR-SEC-05` | Nhân viên phòng Đào tạo bấm nhận đơn của phòng CTSV | Security / RBAC | Token của Staff thuộc Dept A nhận ticket của Dept B | Trả về `403 Forbidden`, ghi nhận cảnh báo vi phạm quyền hạn. | Có |

---

### 2.4. Phân hệ M07 & M09 — Xử lý, Yêu cầu Bổ sung hồ sơ & Theo dõi (`MS-02`)
| Test ID | Mã AC / NFR kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) | Regression |
|---|---|:---:|---|---|:---:|
| `TC-M07-M01` | `FR-M07-01/AC-01` | Nhân viên phụ trách cập nhật tiến độ công khai (`is_internal = false`) | Main | Assignee nhập nội dung tiến độ công khai và bấm lưu | Lưu vào timeline lịch sử và hiển thị công khai cho cả Sinh viên và Quản lý; chặn `403` nếu không phải Assignee. | Có |
| `TC-M07-M02` | `FR-M07-01/AC-02` | Nhân viên cập nhật ghi chú nội bộ (`is_internal = true`) | Security / Main | Assignee nhập ghi chú với cờ `is_internal = true`; Sinh viên mở xem chi tiết Ticket | Ghi chú hiển thị cho Nhân viên và Trưởng phòng nhưng hoàn toàn không trả về trong API/giao diện của Sinh viên. | Có |
| `TC-M07-M03` | `FR-M07-02/AC-01` | Nhân viên xem danh sách lịch sử các đơn mình đã xử lý | Main | Nhân viên mở menu "Lịch sử xử lý" và lọc theo thời gian/mã Ticket | Hiển thị đúng các đơn nhân viên đó từng phụ trách (`Resolved`, `Closed`, `Reassigned`) kèm Audit Trail và CSAT. | Không |
| `TC-M07-N01` | `FR-M07-03/AC-03` | **Nhân viên yêu cầu bổ sung lần thứ 2 cho cùng 1 đơn** | **Negative / BR-3** | Bấm yêu cầu bổ sung khi `supplement_count = 1` | Nút chức năng bị ẩn/disable trên UI, API trả về `400 Bad Request` ("Mỗi ticket chỉ được yêu cầu bổ sung tối đa 1 lần"). | Có |
| `TC-M07-E02` | `FR-M07-03/AC-01` | Gửi yêu cầu bổ sung hợp lệ vào chiều Thứ Sáu và kiểm tra bỏ trống | Boundary / Business Days | Nhập nội dung $\ge 10$ ký tự lúc 16:30 Thứ Sáu (và thử gửi rỗng) | Chặn nếu nội dung rỗng; khi hợp lệ chuyển sang `Pending`, hạn chót 3 ngày làm việc rơi vào 16:30 Thứ Tư tuần sau. | Có |
| `TC-M07-E03` | `FR-M07-03/AC-02` | **Quá hạn 3 ngày làm việc mà sinh viên không bổ sung** | **Automation / Timeout** | Background worker quét ticket Pending quá deadline | Ticket tự động chuyển sang `Closed`, gán `auto_closed = true`, `closed_reason = "TIMEOUT_PENDING"`, khóa chức năng nộp bổ sung. | Có |
| `TC-M07-M04` | `FR-M07-04/AC-01` | Nhân viên báo sai phòng ban kèm lý do chuyển trả về Admin | Main / Negative | Đơn đang `In Progress`, nhập lý do chuyển trả (và thử bỏ trống lý do) | Chặn nếu trống lý do; khi hợp lệ thì xóa Assignee, đổi danh mục sang "Khác" và đưa về Hàng chờ Admin ở trạng thái `New`. | Có |
| `TC-M09-M01` | `FR-M09-01/AC-01` | Sinh viên xem danh sách và chi tiết Ticket cá nhân đã gửi | Main / RBAC | Sinh viên mở "Yêu cầu của tôi" và thử truy cập URL đơn của sinh viên khác | Hiển thị đúng danh sách đơn của chính sinh viên đó kèm trạng thái thực; trả về `403 Forbidden` nếu xem đơn người khác. | Có |
| `TC-M09-M02` | `FR-M09-01/AC-02` | Sinh viên tìm kiếm và lọc Ticket theo trạng thái | Main | Nhập mã Ticket hoặc chọn lọc trạng thái `Đang xử lý` / `Chờ bổ sung` | Trả về chính xác các đơn khớp điều kiện lọc; hiển thị thông báo rỗng nếu không có đơn. | Không |
| `TC-M09-M03` | `FR-M09-02/AC-01` | Sinh viên nộp bổ sung hồ sơ hợp lệ khi đơn đang `Pending` | Main | Nhập nội dung giải trình $\ge 5$ ký tự và đính kèm tệp hợp lệ trước hạn 3 ngày làm việc | Dừng bộ đếm ngược, chuyển đơn về `In Progress`, giữ nguyên Mã Ticket và Nhân viên phụ trách cũ, phát thông báo cho nhân viên. | Có |
| `TC-M09-N04` | `FR-M09-02/AC-01`, `NFR-INT-01` | Sinh viên bấm gửi bổ sung sau khi đơn đã bị Auto-close | Negative | Sinh viên submit form bổ sung chậm sau hạn chót | Trả về `400 Bad Request` ("Đơn đã bị đóng do quá hạn bổ sung, vui lòng tạo đơn mới"). | Có |

---

### 2.5. Phân hệ M08 & M10 — Trả kết quả & Đánh giá CSAT (`MS-02`)
| Test ID | Mã AC / NFR kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) | Regression |
|---|---|:---:|---|---|:---:|
| `TC-M08-M01` | `FR-M08-01/AC-01` | Nhân viên nhập kết quả giải quyết và đính kèm tệp trả lời hợp lệ | Main | Nhập `Resolution Notes` ($\ge 10$ ký tự) và đính kèm file PDF trả lời $\le 5\text{MB}$ | Hệ thống lưu thành công nội dung giải trình và tệp đính kèm kết quả vào CSDL. | Có |
| `TC-M08-N01` | `FR-M08-01/AC-02`, `NFR-INT-02` | Hoàn tất đơn nhưng để trống `Resolution Notes` | Negative / BR-5 | Bấm "Trả kết quả" nhưng không nhập nội dung giải trình | Hệ thống chặn submit (`422 Unprocessable Entity`), báo lỗi bắt buộc nhập nội dung kết quả (Min 10 ký tự). | Có |
| `TC-M08-N02` | `FR-M08-01/AC-03`, `NFR-PERF-03` | Đính kèm tệp kết quả vượt quá 5MB hoặc sai định dạng | Negative | Nhân viên tải lên tệp trả lời nặng 6MB hoặc định dạng `.exe`/`.zip` | Hệ thống chặn tải file, hiển thị cảnh báo lỗi cụ thể và không cho phép hoàn thành đơn. | Có |
| `TC-M08-M02` | `FR-M08-02/AC-01` | Hoàn thành đơn chuyển sang `Resolved` và gửi 1 thông báo duy nhất | Main | Nhân viên xác nhận hoàn thành (kể cả bấm đúp 2 lần liên tiếp) | Đơn chuyển sang `Resolved`, ghi nhận `resolved_at` và chỉ phát đúng 1 thông báo kết quả duy nhất cho sinh viên. | Có |
| `TC-M10-M01` | `FR-M10-01/AC-01` | Sinh viên xem nội dung kết quả giải quyết và tải tệp trả lời | Main | Sinh viên mở Ticket ở trạng thái `Resolved` và nhấn tải tệp đính kèm | Hiển thị rõ `Resolution Notes` và tải xuống tệp trả lời thành công; ẩn kết quả nếu đơn chưa `Resolved`. | Có |
| `TC-M10-M02` | `FR-M10-02/AC-01` | Sinh viên chấm điểm 1–5 sao, nhận xét và đóng đơn thành công | Main | Chọn mức 5 sao, nhập nhận xét và bấm "Gửi đánh giá & Đóng đơn" | Lưu điểm CSAT gắn với nhân viên xử lý, chuyển trạng thái đơn sang `Closed` (đóng vĩnh viễn). | Có |
| `TC-M10-N01` | `FR-M10-02/AC-02` | Sinh viên bấm gửi đánh giá khi chưa chọn số sao | Negative | Để trống số sao và nhấn nút gửi đánh giá | Hệ thống chặn gửi và hiển thị thông báo yêu cầu bắt buộc chọn từ 1 đến 5 sao. | Không |
| `TC-M10-N02` | `FR-M10-02/AC-01`, `NFR-INT-01` | Sinh viên đánh giá lại lần 2 cho đơn đã đánh giá | Negative | Gửi `POST /api/v1/tickets/{id}/feedback` lần 2 | Trả về `409 Conflict`, thông báo "Bạn đã gửi đánh giá cho đơn này rồi". | Không |
| `TC-M10-E03` | `FR-M10-02/AC-01` | Đánh giá sao khi đơn bị đóng tự động do quá hạn Pending | Negative / Edge | Gọi API feedback trên ticket có `auto_closed = true` và `closed_reason = TIMEOUT_PENDING` | Trả về `400 Bad Request` ("Đơn tự động đóng do quá hạn không áp dụng đánh giá CSAT"). | Không |
| `TC-M10-E04` | `FR-M10-03/AC-01` | Tự động đóng đơn sau 3 ngày làm việc ở `Resolved` không đánh giá | Automation / Timeout | Ticket ở `Resolved` quá 3 ngày làm việc (bỏ qua Thứ 7, CN, ngày lễ) | Tác vụ ngầm chuyển đơn sang `Closed` (`auto_closed = true`, `rating = null`, không tính vào CSAT) và khóa form đánh giá. | Có |

---

### 2.6. Phân hệ M11 — Phân công & Re-assign (`MS-02`)
| Test ID | Mã AC / NFR kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) | Regression |
|---|---|:---:|---|---|:---:|
| `TC-M11-M01` | `FR-M11-01/AC-01` | Admin phân loại đơn mục "Khác" về đúng phòng ban đích | Main | Admin mở đơn mục "Khác", chọn Phòng ban đích và Danh mục chuẩn tương ứng | Cập nhật phòng ban/danh mục, giữ nguyên mã Ticket và đưa đơn vào Hàng chờ phòng ban đích ở trạng thái `New`. | Có |
| `TC-M11-M02` | `FR-M11-02/AC-01` | Admin điều chuyển đơn bị nhân viên báo sai phòng ban | Main | Admin xem lý do chuyển trả từ `M07-04`, chọn Phòng ban và Danh mục mới | Xóa Assignee cũ, chuyển đơn về Hàng chờ phòng ban mới ở trạng thái `New` và bảo toàn lịch sử luân chuyển. | Có |
| `TC-M11-N01` | `FR-M11-03/AC-01`, `NFR-SEC-05` | Trưởng phòng phân công cho Nhân viên không thuộc phòng ban mình (`E-01`) | Negative / Security | Chọn Assignee ID là nhân viên thuộc phòng ban khác | Backend từ chối với mã `403 Forbidden` và giữ nguyên người phụ trách hiện tại. | Có |
| `TC-M11-E02` | `FR-M11-03/AC-01` | **Trưởng phòng Re-assign đơn đang `In Progress` từ NV A sang NV B** | **Main / Re-assign Flow** | Quản lý chọn đổi Assignee cho đơn đang xử lý | Đơn được chuyển giao thành công sang NV B, lưu lịch sử log rõ ràng ai đã điều chuyển, và hệ thống bắn thông báo In-app ngay lập tức cho NV B (Trigger #7). | Có |

---

### 2.7. Phân hệ M12 & M13 — Giám sát SLA & Dashboard báo cáo (`MS-03`)
| Test ID | Mã AC / NFR kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) | Regression |
|---|---|:---:|---|---|:---:|
| `TC-M12-M01` | `FR-M12-01/AC-01` | Trưởng phòng xem bảng phân bổ khối lượng công việc nhân viên | Main | Trưởng phòng mở màn hình "Theo dõi tiến độ phòng ban" | Hiển thị chính xác số đơn đã nhận, `In Progress`, `Pending`, `Resolved` của từng nhân viên thuộc phòng ban. | Có |
| `TC-M12-N01` | `FR-M12-02/AC-01` | Cảnh báo vàng khi sắp hết hạn ($\ge 80\%$) và tô đỏ khi vượt SLA | Boundary / SLA Warning | Ticket chạm $80\%$ thời hạn SLA và Ticket vượt $100\%$ SLA (hoặc đơn `New` $> 4$h làm việc) | Chạm $80\%$ hiển thị cảnh báo vàng; vượt $100\%$ SLA tự động tô đỏ dòng Ticket, gắn nhãn `Quá hạn SLA` kèm số giờ vượt quá. | Có |
| `TC-M12-N02` | `FR-M12-01/AC-01`, `NFR-SEC-05` | Trưởng phòng xem tiến độ của phòng ban khác | Negative / Data Isolation | Trưởng phòng Dept A truy cập URL/API giám sát tiến độ của Dept B | Backend từ chối với mã `403 Forbidden`, chỉ hiển thị số liệu thuộc phòng ban phụ trách. | Có |
| `TC-M12-M02` | `FR-M12-03/AC-01` | Admin theo dõi xếp hạng các phòng ban tồn đọng nhiều đơn nhất | Main / RBAC | Admin mở màn hình giám sát toàn trường (và thử truy cập bằng tài khoản `Manager`) | Hiển thị bảng xếp hạng phòng ban giảm dần theo số đơn tồn đọng/tỷ lệ quá hạn; chặn `403` nếu không phải Admin. | Có |
| `TC-M12-M03` | `FR-M12-04/AC-01` | Admin tìm kiếm và tra cứu chi tiết Ticket xuyên phòng ban | Main | Admin nhập Mã Ticket bất kỳ trên công cụ `Global Ticket Search` | Hiển thị đầy đủ chi tiết và toàn bộ dòng thời gian Audit Trail của Ticket dù thuộc bất kỳ phòng ban nào. | Có |
| `TC-M13-M01` | `FR-M13-01/AC-01`, `NFR-AVAIL-01` | Hiển thị thẻ chỉ số KPI và biểu đồ thống kê theo thời gian | Main | Mở Dashboard, lọc theo Tháng này | Hiển thị đúng 4 thẻ KPI (Tổng đơn, Đang xử lý, Hoàn thành, Quá hạn) và biểu đồ tròn có tổng tỷ lệ đúng `100.0%`. | Có |
| `TC-M13-N01` | `FR-M13-02/AC-01`, `NFR-SEC-05` | Trưởng phòng truy cập Dashboard số liệu toàn trường của Admin | Negative / RBAC | Token của Role `Manager` gọi API Dashboard tổng hợp toàn trường hoặc phòng khác | Trả về `403 Forbidden`, Trưởng phòng chỉ xem được dữ liệu thống kê thuộc phòng ban của mình. | Có |
| `TC-M13-M02` | `FR-M13-02/AC-02` | Admin xem thống kê toàn trường và lọc theo từng phòng ban | Main | Admin mở Global Dashboard và chọn lọc theo từng phòng ban cụ thể | Hiển thị đầy đủ số liệu toàn trường và khớp chính xác với số liệu nội bộ khi lọc theo từng phòng ban. | Có |
| `TC-M13-E02` | `FR-M13-01/AC-01`, `NFR-PERF-02` | Lọc Dashboard với khoảng thời gian không có dữ liệu | Boundary | Chọn khoảng thời gian Từ ngày - Đến ngày trong quá khứ chưa có phát sinh đơn | Các widget hiển thị 0 đơn, biểu đồ hiển thị trạng thái Empty State sạch sẽ, phản hồi $\le 2.000\text{ms}$. | Không |
| `TC-M13-M03` | `FR-M13-03/AC-01`, `NFR-PERF-02` | Xuất báo cáo số liệu ra file Excel (`.xlsx`) và PDF (`.pdf`) | Main | Lọc danh sách báo cáo và bấm "Xuất báo cáo Excel" / "Xuất file PDF" | Tải xuống tệp `.xlsx`/`.pdf` thành công trong $\le 2.000\text{ms}$, dữ liệu trong tệp khớp 100% với bảng lọc trên màn hình. | Có |
| `TC-M13-M04` | `FR-M13-04/AC-01` | Thống kê điểm CSAT trung bình và hiệu suất KPI nhân viên | Main / Boundary | Xem báo cáo nhân sự có cả đơn chấm sao và đơn đóng tự động (`rating = null`) | Tính đúng tỷ lệ hoàn thành SLA và trung bình CSAT chỉ trên các đơn có đánh giá thực tế; hiển thị `"N/A"` nếu chưa có đánh giá. | Có |
