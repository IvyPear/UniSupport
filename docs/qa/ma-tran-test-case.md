# MA TRẬN KỊCH BẢN KIỂM THỬ (TEST CASES MATRIX & NEGATIVE CASES)

> **Dự án:** UniSupport — Nền tảng Tiếp nhận và Hỗ trợ Thủ tục Hành chính Sinh viên  
> **Phiên bản:** 2.0 (QA/QC Test Engineering Specification)  
> **Bao phủ:** Toàn bộ 13 Phân hệ (M01 đến M13) bao gồm **Happy Path**, **Negative Cases**, **Boundary Cases** và **Security/Concurrency**.

---

## 1. Tổng quan Phân bổ Kịch bản Kiểm thử

| Mã Module | Tên Phân hệ | Happy Path | Negative / Edge Cases | Tổng số Test Cases | Trạng thái |
|:---:|---|:---:|:---:|:---:|:---:|
| **M01** | Đăng nhập & Xác thực | 4 | 8 | 12 | Ready |
| **M02** | Vai trò & Phân quyền | 5 | 5 | 10 | Ready |
| **M03** | Quản lý Tài khoản | 6 | 9 | 15 | Ready |
| **M04** | Quản lý Danh mục & SLA | 5 | 7 | 12 | Ready |
| **M05** | Khởi tạo Ticket | 6 | 12 | 18 | Ready |
| **M06** | Tiếp nhận Ticket & Đua lệnh | 5 | 9 | 14 | Ready |
| **M07** | Xử lý & Yêu cầu bổ sung | 8 | 12 | 20 | Ready |
| **M08** | Trả kết quả xử lý | 5 | 7 | 12 | Ready |
| **M09** | Theo dõi & Nộp bổ sung | 6 | 10 | 16 | Ready |
| **M10** | Đánh giá CSAT & Auto-close | 4 | 6 | 10 | Ready |
| **M11** | Điều phối & Re-assign | 6 | 9 | 15 | Ready |
| **M12** | Giám sát tiến độ & Cảnh báo SLA | 6 | 8 | 14 | Ready |
| **M13** | Dashboard & Báo cáo | 6 | 6 | 12 | Ready |
| | **TỔNG CỘNG** | **72** | **108** | **180** | **Ready for QA Execution** |

---

## 2. Danh mục Kịch bản Kiểm thử Tiêu biểu (Focus vào Negative & Edge Cases)

### 2.1. Phân hệ M01 — Xác thực & Đăng nhập
| Test ID | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|
| `TC-M01-N01` | Đăng nhập sai mật khẩu quá 5 lần | Negative / Security | Nhập sai mật khẩu liên tiếp 5 lần với 1 tài khoản | Khóa tạm thời tài khoản trong 15 phút, hiển thị thông báo rõ ràng, chặn gửi request. |
| `TC-M01-N02` | Đăng nhập bằng tài khoản bị vô hiệu hóa (`INACTIVE`) | Negative | Tài khoản có cờ `status = 'INACTIVE'` | Trả về `403 Forbidden`, thông báo "Tài khoản của bạn đã bị khóa bởi Quản trị viên". |
| `TC-M01-N03` | Nhập mã OTP hết hạn | Negative / Boundary | Nhập mã OTP sau khi đã quá hạn 5 phút | Trả về `400 Bad Request`, thông báo "Mã OTP đã hết hiệu lực, vui lòng yêu cầu mã mới". |
| `TC-M01-N04` | Nhập mã OTP sai quá 3 lần | Negative / Security | Nhập sai OTP 3 lần liên tiếp trong luồng đặt lại mật khẩu | Hủy hiệu lực của phiên OTP hiện tại, yêu cầu bắt đầu lại luồng quên mật khẩu. |

---

### 2.2. Phân hệ M04 & M05 — Khởi tạo Ticket & Chỉnh sửa đơn
| Test ID | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|
| `TC-M05-N01` | Tiêu đề Ticket quá ngắn (< 5 ký tự) | Boundary | Nhập tiêu đề 4 ký tự | Form hiển thị lỗi validation tại ô tiêu đề, nút "Gửi Ticket" bị disable. |
| `TC-M05-N02` | Đính kèm tệp tin vượt quá dung lượng 5MB | Negative | Đính kèm 1 file PDF có dung lượng 5.2MB | Hệ thống chặn tải lên ngay từ Client và Backend trả về `422 Unprocessable Entity` ("Dung lượng tệp tối đa là 5MB"). |
| `TC-M05-N03` | Đính kèm tệp sai định dạng (.exe, .zip, .bat) | Security | Tải lên file script `malware.exe` hoặc `archive.zip` | Bị từ chối ngay lập tức, thông báo danh sách định dạng hợp lệ (`.png`, `.jpg`, `.pdf`, `.docx`). |
| `TC-M05-N04` | Sinh viên sửa đơn khi trạng thái đã là `In Progress` | Negative | Gọi `PUT /api/v1/tickets/{id}` khi ticket đã có nhân viên tiếp nhận | Trả về `400 Bad Request`, thông báo "Đơn đã được tiếp nhận, không thể chỉnh sửa". |
| `TC-M05-N05` | Sinh viên cố tình sửa Danh mục/Phòng ban khi ở `New` | Negative / BR-2 | Sinh viên gửi request thay đổi `category_id` hoặc `department_id` | Backend bỏ qua hoặc từ chối trường này, chỉ cho phép cập nhật `title` và `content`. |
| `TC-M05-N06` | Spam tạo liên tục nhiều ticket trong 1 phút | Edge / Rate Limit | Gửi 5 request tạo ticket trong vòng 30 giây | Bị chặn bởi cơ chế Cooldown/Rate Limit (429 Too Many Requests), yêu cầu chờ 1 phút. |

---

### 2.3. Phân hệ M06 — Tiếp nhận Ticket & Race Condition (Đua lệnh)
| Test ID | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|
| `TC-M06-E01` | **Hai nhân viên cùng bấm nhận 1 đơn cùng mili-giây** | **Concurrency / Race Condition** | 2 request `POST /api/v1/tickets/{id}/claim` đồng thời | Nhờ Atomic Update (`UPDATE WHERE assignee_id IS NULL`), chính xác 1 nhân viên thành công (`200 OK`), nhân viên còn lại nhận `409 Conflict` và giao diện tự động refresh. |
| `TC-M06-N02` | Nhân viên phòng Đào tạo bấm nhận đơn của phòng CTSV | Security / RBAC | Token của Staff thuộc Dept A nhận ticket của Dept B | Trả về `403 Forbidden`, ghi nhận cảnh báo vi phạm quyền hạn. |

---

### 2.4. Phân hệ M07 & M09 — Yêu cầu Bổ sung hồ sơ & Giới hạn 1 lần
| Test ID | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|
| `TC-M07-N01` | **Nhân viên yêu cầu bổ sung lần thứ 2 cho cùng 1 đơn** | **Negative / BR-3** | Bấm yêu cầu bổ sung khi `supplement_count = 1` | Nút chức năng bị ẩn/disable trên UI, API trả về `400 Bad Request` ("Mỗi ticket chỉ được yêu cầu bổ sung tối đa 1 lần"). |
| `TC-M07-E02` | Yêu cầu bổ sung gửi vào chiều Thứ Sáu | Boundary / Business Days | Gửi yêu cầu bổ sung lúc 16:30 chiều Thứ 6 | Hạn chót đếm ngược 3 ngày làm việc phải rơi vào 16:30 chiều Thứ Tư tuần sau (bỏ qua hoàn toàn Thứ 7 và Chủ nhật). |
| `TC-M07-E03` | **Quá hạn 3 ngày làm việc mà sinh viên không bổ sung** | **Automation / Timeout** | Background worker quét ticket Pending quá deadline | Ticket tự động chuyển sang `Closed`, gán `auto_closed = true`, `closed_reason = "Quá hạn bổ sung 3 ngày làm việc"`, khóa chức năng nộp bổ sung. |
| `TC-M09-N04` | Sinh viên bấm gửi bổ sung sau khi đơn đã bị Auto-close | Negative | Sinh viên submit form bổ sung chậm sau hạn chót | Trả về `400 Bad Request` ("Đơn đã bị đóng do quá hạn bổ sung, vui lòng tạo đơn mới"). |

---

### 2.5. Phân hệ M08 & M10 — Trả kết quả & Đánh giá CSAT
| Test ID | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|
| `TC-M08-N01` | Hoàn tất đơn nhưng để trống `Resolution Notes` | Negative / BR-5 | Bấm "Trả kết quả" nhưng không nhập nội dung giải trình | Hệ thống chặn submit, báo lỗi bắt buộc nhập nội dung kết quả (Min 10 ký tự). |
| `TC-M10-N02` | Sinh viên đánh giá lại lần 2 cho đơn đã đánh giá | Negative | Gửi `POST /api/v1/tickets/{id}/feedback` lần 2 | Trả về `409 Conflict`, thông báo "Bạn đã gửi đánh giá cho đơn này rồi". |
| `TC-M10-E03` | Đánh giá sao khi đơn bị đóng tự động do quá hạn Pending | Negative / Edge | Gọi API feedback trên ticket có `auto_closed = true` và `closed_reason = TIMEOUT_PENDING` | Trả về `400 Bad Request` ("Đơn tự động đóng do quá hạn không áp dụng đánh giá CSAT"). |

---

### 2.6. Phân hệ M11 — Phân công & Re-assign
| Test ID | Tên kịch bản | Loại | Dữ liệu đầu vào / Điều kiện | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|---|
| `TC-M11-N01` | Trưởng phòng phân công cho Nhân viên không thuộc phòng ban mình | Negative / Security | Chọn Assignee ID là nhân viên thuộc phòng ban khác | Backend từ chối với mã `403 Forbidden` hoặc `422 Unprocessable Entity`. |
| `TC-M11-E02` | **Trưởng phòng Re-assign đơn đang `In Progress` từ NV A sang NV B** | **Main / Re-assign Flow** | Quản lý chọn đổi Assignee cho đơn đang xử lý | Đơn được chuyển giao thành công sang NV B, lưu lịch sử log rõ ràng ai đã điều chuyển, và hệ thống bắn thông báo In-app ngay lập tức cho NV B (Trigger #7). |
