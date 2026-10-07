# ĐẶC TẢ API (RESTFUL API SPECIFICATION) - UNISUPPORT

---

## 1. Quy Định Chung (API Standards)

* **Base URL:** `https://unisupport.aurora.edu.vn/api/v1`
* **Format:** Request Body & Response Body chuẩn `JSON` (`Content-Type: application/json`).
* **Header Xác thực:** `Authorization: Bearer <JWT_TOKEN>` (Truyền trong mọi API yêu cầu bảo mật).
* **Cấu trúc Response tiêu chuẩn:**

```json
{
  "success": true,
  "code": 200,
  "message": "Thao tác thành công",
  "data": {},
  "errors": null,
  "timestamp": "2026-10-07T16:40:00Z"
}
```

---

## 2. Danh Sách Endpoint Chi Tiết Theo Phân Hệ

### 2.1 Phân Hệ Xác Thực (Authentication - Auth)

#### `POST /auth/login`
* **Mô tả:** Đăng nhập hệ thống bằng Mã định danh và Mật khẩu.
* **Request:**
  ```json
  {
    "user_code": "SV123456",
    "password": "PasswordSecret123"
  }
  ```
* **Response 200 (Success):**
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Đăng nhập thành công",
    "data": {
      "access_token": "eyJhbGciOi...",
      "token_type": "Bearer",
      "expires_in": 28800,
      "user": {
        "id": 101,
        "user_code": "SV123456",
        "full_name": "Nguyễn Văn A",
        "role": "STUDENT",
        "department_id": null
      }
    }
  }
  ```
* **Response 401 (Error):** Sai thông tin hoặc tài khoản đang bị tạm khóa 15 phút.

#### `POST /auth/admin/import-users` *(Admin only)*
* **Mô tả:** Import tài khoản hàng loạt từ file Excel/CSV.
* **Header:** `Content-Type: multipart/form-data`
* **Request Body:** File đính kèm (`.xlsx` hoặc `.csv`).

---

### 2.2 Phân Hệ Quản Lý Ticket (Ticket Management)

#### `POST /tickets` *(Student)*
* **Mô tả:** Sinh viên khởi tạo yêu cầu hỗ trợ mới.
* **Request:**
  ```json
  {
    "category_id": 5,
    "title": "Xin cấp bảng điểm tạm thời",
    "content": "Em cần xin bảng điểm để nộp hồ sơ thực tập doanh nghiệp."
  }
  ```
* **Response 201 (Created):**
  ```json
  {
    "success": true,
    "code": 201,
    "message": "Tạo yêu cầu thành công",
    "data": {
      "ticket_id": 5012,
      "ticket_code": "PAA-20261007-015",
      "status": "NEW",
      "created_at": "2026-10-07T16:42:00Z"
    }
  }
  ```

#### `GET /tickets`
* **Mô tả:** Lấy danh sách Ticket (Có phân trang, lọc theo Trạng thái, Phòng ban, Từ khóa).
* **Query Params:** `page=1&limit=20&status=NEW&search=bảng+điểm`

#### `GET /tickets/{id}`
* **Mô tả:** Xem chi tiết Ticket bao gồm Thông tin đơn, Tiến độ, Lịch sử chuyển trạng thái, File đính kèm và Các bình luận.

#### `POST /tickets/{id}/claim` *(Staff)*
* **Mô tả:** Nhân viên nhận xử lý ticket (`NEW` $\rightarrow$ `IN_PROGRESS`).

#### `POST /tickets/{id}/request-info` *(Staff)*
* **Mô tả:** Nhân viên yêu cầu sinh viên bổ sung thông tin (`IN_PROGRESS` $\rightarrow$ `PENDING`).
* **Request:**
  ```json
  {
    "message": "Vui lòng đính kèm ảnh thẻ sinh viên để phòng đối chiếu."
  }
  ```

#### `POST /tickets/{id}/resolve` *(Staff)*
* **Mô tả:** Hoàn tất xử lý yêu cầu (`IN_PROGRESS` $\rightarrow$ `RESOLVED`).
* **Request:**
  ```json
  {
    "resolution_notes": "Đã cấp bảng điểm điện tử qua email sinh viên. Vui lòng kiểm tra hộp thư."
  }
  ```

#### `POST /tickets/{id}/close-and-rate` *(Student)*
* **Mô tả:** Sinh viên đánh giá chất lượng và đóng vĩnh viễn đơn (`RESOLVED` $\rightarrow$ `CLOSED`).
* **Request:**
  ```json
  {
    "score": 5,
    "feedback_text": "Phòng đào tạo xử lý rất nhanh và nhiệt tình."
  }
  ```

#### `POST /tickets/{id}/transfer` *(Staff / Manager / Admin)*
* **Mô tả:** Luân chuyển ticket sang phòng ban khác hoặc Admin định tuyến lại.

---

### 2.3 Phân Hệ Báo Cáo & Thống Kê (Reporting & Analytics)

#### `GET /reports/dashboard-summary` *(Manager / Admin)*
* **Mô tả:** Thống kê tổng số đơn theo trạng thái, tỷ lệ đúng hạn (SLA), điểm đánh giá trung bình.

#### `GET /reports/staff-performance` *(Manager)*
* **Mô tả:** Thống kê số lượng ticket xử lý và rating trung bình của từng nhân viên trong phòng ban.
