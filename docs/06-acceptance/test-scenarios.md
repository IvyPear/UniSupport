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
| Test ID | Mã AC kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|---|
| `TC-M01-N01` | `M01-02/AC-01` | Đăng nhập sai mật khẩu quá 5 lần | Negative / Security | Nhập sai mật khẩu liên tiếp 5 lần với 1 tài khoản | Khóa tạm thời tài khoản trong 15 phút, hiển thị thông báo rõ ràng, chặn gửi request. |
| `TC-M01-N02` | `M01-05/AC-01` | Đăng nhập bằng tài khoản bị vô hiệu hóa (`INACTIVE`) | Negative | Tài khoản có cờ `status = 'INACTIVE'` | Trả về `403 Forbidden`, thông báo "Tài khoản của bạn đã bị khóa bởi Quản trị viên". |
| `TC-M01-N03` | `M01-03/AC-02` | Admin nhập mã OTP hết hạn | Negative / Boundary | Nhập mã OTP sau 16 phút kể từ lúc cấp (thời hạn 15 phút theo FR-M01-03) | Trả về `400 Bad Request`, thông báo "Mã OTP đã hết hiệu lực, vui lòng yêu cầu mã mới". |
| `TC-M01-N04` | `M01-03/AC-03` | Dùng lại mã OTP đã sử dụng | Negative / Security | Admin đã đổi mật khẩu thành công bằng OTP, sau đó gửi lại chính OTP đó | Hệ thống từ chối OTP đã dùng vì mỗi OTP chỉ có hiệu lực một lần theo FR-M01-03. |

### 2.1b. Phân hệ M02 & M03 — Phân quyền động và đổi mật khẩu sau reset (`MS-01`)
| Test ID | Mã AC kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|---|
| `TC-M02-N01` | `M02-02/AC-02` | Quyền vừa bị Admin tắt trong phiên đang đăng nhập | Security / RBAC | Admin tắt quyền chức năng của một Role; tài khoản Role đó gửi yêu cầu mới | Backend từ chối thao tác không còn quyền ngay ở request tiếp theo, kể cả JWT chưa hết hạn. |
| `TC-M02-N02` | `M02-02/AC-03` | Cố tước quyền tối cao của Admin chính | Negative / Security | Gửi thay đổi ACL tắt quyền quản trị tài khoản hoặc phân quyền tối cao | Backend từ chối cập nhật trái quy tắc M02, giữ nguyên quyền Admin chính. |
| `TC-M03-N01` | `M03-03/AC-03` | Người dùng đăng nhập sau khi Admin reset mật khẩu | Security / Main | `must_change_password = true`, đăng nhập bằng mật khẩu được reset | Buộc đổi mật khẩu trước khi vào chức năng khác; đổi hợp lệ thì tắt cờ, lần đăng nhập sau không còn bị buộc đổi. |

---

### 2.2. Phân hệ M04 & M05 — Khởi tạo Ticket & Chỉnh sửa đơn (`MS-02`)
| Test ID | Mã AC kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|---|
| `TC-M05-N01` | `M05-02/AC-02` | Tiêu đề Ticket quá ngắn (< 5 ký tự) | Boundary | Nhập tiêu đề 4 ký tự | Form hiển thị lỗi validation tại ô tiêu đề, nút "Gửi Ticket" bị disable. |
| `TC-M05-N02` | `M05-02/AC-02` | Đính kèm tệp tin vượt quá dung lượng 5MB | Negative | Đính kèm 1 file PDF có dung lượng 5.2MB | Hệ thống chặn tải lên ngay từ Client và Backend trả về `422 Unprocessable Entity` ("Dung lượng tệp tối đa là 5MB"). |
| `TC-M05-N03` | `M05-02/AC-02` | Đính kèm tệp sai định dạng (.exe, .zip, .bat) | Security | Tải lên file script `malware.exe` hoặc `archive.zip` | Bị từ chối ngay lập tức, thông báo danh sách định dạng hợp lệ (`.png`, `.jpg`, `.pdf`, `.docx`). |
| `TC-M05-N04` | `M05-03/AC-02` | Sinh viên sửa đơn khi trạng thái đã là `In Progress` | Negative | Gọi `PUT /api/v1/tickets/{id}` khi ticket đã có nhân viên tiếp nhận | Trả về `400 Bad Request`, thông báo "Đơn đã được tiếp nhận, không thể chỉnh sửa". |
| `TC-M05-N05` | `M05-03/AC-03` | Sinh viên cố tình sửa Danh mục/Phòng ban khi ở `New` | Negative / BR-2 | Sinh viên gửi request thay đổi `category_id` hoặc `department_id` | Backend từ chối thay đổi Danh mục/Phòng ban; chỉ chấp nhận cập nhật `title`, `content` và danh sách tệp đính kèm hợp lệ. |
| `TC-M05-N06` | `M05-03/AC-01` | Sinh viên sửa file đính kèm khi Ticket còn New | Boundary / File Validation | Chủ Ticket thay đổi tệp đính kèm, thử thêm tệp thứ 6 hoặc tệp sai định dạng | Cho phép thêm/xóa tệp hợp lệ trong giới hạn 5 tệp, 5MB/tệp; từ chối thay đổi vượt giới hạn, giữ nguyên dữ liệu hợp lệ và ghi lịch sử khi lưu thành công. |

---

### 2.3. Phân hệ M06 — Tiếp nhận Ticket & Race Condition (Đua lệnh) (`MS-02`)
| Test ID | Mã AC kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|---|
| `TC-M06-E01` | `M06-02/AC-02` | **Hai nhân viên cùng bấm nhận 1 đơn cùng mili-giây** | **Concurrency / Race Condition** | 2 request `POST /api/v1/tickets/{id}/claim` đồng thời | Nhờ Atomic Update (`UPDATE WHERE assignee_id IS NULL`), chính xác 1 nhân viên thành công (`200 OK`), nhân viên còn lại nhận `409 Conflict` và giao diện tự động refresh. |
| `TC-M06-N02` | `M06-02/AC-01` | Nhân viên phòng Đào tạo bấm nhận đơn của phòng CTSV | Security / RBAC | Token của Staff thuộc Dept A nhận ticket của Dept B | Trả về `403 Forbidden`, ghi nhận cảnh báo vi phạm quyền hạn. |

---

### 2.4. Phân hệ M07 & M09 — Yêu cầu Bổ sung hồ sơ & Giới hạn 1 lần (`MS-02`)
| Test ID | Mã AC kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|---|
| `TC-M07-N01` | `M07-03/AC-03` | **Nhân viên yêu cầu bổ sung lần thứ 2 cho cùng 1 đơn** | **Negative / BR-3** | Bấm yêu cầu bổ sung khi `supplement_count = 1` | Nút chức năng bị ẩn/disable trên UI, API trả về `400 Bad Request` ("Mỗi ticket chỉ được yêu cầu bổ sung tối đa 1 lần"). |
| `TC-M07-E02` | `M07-03/AC-01` | Yêu cầu bổ sung gửi vào chiều Thứ Sáu | Boundary / Business Days | Gửi yêu cầu bổ sung lúc 16:30 chiều Thứ 6 | Hạn chót đếm ngược 3 ngày làm việc phải rơi vào 16:30 chiều Thứ Tư tuần sau (bỏ qua hoàn toàn Thứ 7 và Chủ nhật). |
| `TC-M07-E03` | `M07-03/AC-02` | **Quá hạn 3 ngày làm việc mà sinh viên không bổ sung** | **Automation / Timeout** | Background worker quét ticket Pending quá deadline | Ticket tự động chuyển sang `Closed`, gán `auto_closed = true`, `closed_reason = "TIMEOUT_PENDING"` (thông báo hiển thị lý do quá hạn 3 ngày làm việc), khóa chức năng nộp bổ sung. |
| `TC-M09-N04` | `M09-02/AC-02` | Sinh viên bấm gửi bổ sung sau khi đơn đã bị Auto-close | Negative | Sinh viên submit form bổ sung chậm sau hạn chót | Trả về `400 Bad Request` ("Đơn đã bị đóng do quá hạn bổ sung, vui lòng tạo đơn mới"). |

---

### 2.5. Phân hệ M08 & M10 — Trả kết quả & Đánh giá CSAT (`MS-02`)
| Test ID | Mã AC kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|---|
| `TC-M08-N01` | `M08-01/AC-01` | Hoàn tất đơn nhưng để trống `Resolution Notes` | Negative / BR-5 | Bấm "Trả kết quả" nhưng không nhập nội dung giải trình | Hệ thống chặn submit, báo lỗi bắt buộc nhập nội dung kết quả (Min 10 ký tự). |
| `TC-M10-N02` | `M10-02/AC-02` | Sinh viên đánh giá lại lần 2 cho đơn đã đánh giá | Negative | Gửi `POST /api/v1/tickets/{id}/feedback` lần 2 | Trả về `409 Conflict`, thông báo "Bạn đã gửi đánh giá cho đơn này rồi". |
| `TC-M10-E03` | `M10-02/AC-03` | Đánh giá sao khi đơn bị đóng tự động do quá hạn Pending | Negative / Edge | Gọi API feedback trên ticket có `auto_closed = true` và `closed_reason = TIMEOUT_PENDING` | Trả về `400 Bad Request` ("Đơn tự động đóng do quá hạn không áp dụng đánh giá CSAT"). |

---

### 2.6. Phân hệ M11 — Phân công & Re-assign (`MS-02`)
| Test ID | Mã AC kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|---|
| `TC-M11-N01` | `M11-03/AC-02` | Trưởng phòng phân công cho Nhân viên không thuộc phòng ban mình | Negative / Security | Chọn Assignee ID là nhân viên thuộc phòng ban khác | Backend từ chối với mã `403 Forbidden` hoặc `422 Unprocessable Entity`. |
| `TC-M11-E02` | `M11-03/AC-01` | **Trưởng phòng Re-assign đơn đang `In Progress` từ NV A sang NV B** | **Main / Re-assign Flow** | Quản lý chọn đổi Assignee cho đơn đang xử lý | Đơn được chuyển giao thành công sang NV B, lưu lịch sử log rõ ràng ai đã điều chuyển, và hệ thống bắn thông báo In-app ngay lập tức cho NV B (Trigger #7). |

---

### 2.7. Phân hệ M12 & M13 — Giám sát SLA & Dashboard báo cáo (`MS-03`)
| Test ID | Mã AC kiểm chứng | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|---|
| `TC-M12-N01` | `M12-02/AC-01` | Đơn vượt thời hạn cam kết SLA | Boundary / SLA Warning | Ticket ở trạng thái `In Progress` vượt quá số giờ quy định theo danh mục | Hệ thống tự động tô màu đỏ nổi bật dòng Ticket, hiển thị nhãn `Quá hạn SLA` kèm số giờ vượt quá. |
| `TC-M12-N02` | `M12-01/AC-01` | Trưởng phòng xem tiến độ của phòng ban khác | Negative / Data Isolation | Trưởng phòng Dept A truy cập URL/API giám sát tiến độ của Dept B | Backend từ chối với mã `403 Forbidden`, chỉ hiển thị số liệu thuộc phòng ban phụ trách. |
| `TC-M13-N01` | `M13-02/AC-01` | Trưởng phòng truy cập Dashboard số liệu toàn trường của Admin | Negative / RBAC | Token của Role `Manager` gọi API Dashboard tổng hợp toàn trường | Trả về `403 Forbidden` hoặc tự động giới hạn chỉ trả về dữ liệu nội bộ phòng ban. |
| `TC-M13-E02` | `M13-01/AC-01` | Lọc Dashboard với khoảng thời gian không có dữ liệu | Boundary | Chọn khoảng thời gian Từ ngày - Đến ngày trong quá khứ chưa có phát sinh đơn | Các widget hiển thị 0 đơn, biểu đồ hiển thị trạng thái Empty State sạch sẽ, không phát sinh lỗi mã nguồn. |
