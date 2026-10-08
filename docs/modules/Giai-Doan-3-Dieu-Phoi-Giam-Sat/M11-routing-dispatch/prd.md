# PHÂN HỆ: M11 — QUẢN LÝ & ĐIỀU PHỐI TICKET

> **Giai đoạn:** GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT  
> **Thư mục Phân hệ:** `Giai-Doan-3-Dieu-Phoi-Giam-Sat/M11-routing-dispatch`  
> **Actors:** Quản lý, Admin  

---

## [FR-M11-01] Quản lý phân công Ticket cho nhân viên thuộc phòng ban
* **Mô tả:** Quản lý phân công Ticket cho nhân viên thuộc phòng ban.
* **Actor:** Quản lý, Admin.
* **Preconditions:** Phân hệ Quản lý & Điều phối Ticket thuộc GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Quản lý phân công Ticket cho nhân viên thuộc phòng ban'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.

---

## [FR-M11-02] Admin phân loại Ticket “Khác”
* **Mô tả:** Admin phân loại Ticket “Khác”.
* **Actor:** Quản lý, Admin.
* **Preconditions:** Phân hệ Quản lý & Điều phối Ticket thuộc GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Admin phân loại Ticket “Khác”'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.

---

## [FR-M11-03] Admin tiếp nhận và điều chuyển Ticket sai phòng ban
* **Mô tả:** Admin tiếp nhận và điều chuyển Ticket sai phòng ban.
* **Actor:** Quản lý, Admin.
* **Preconditions:** Phân hệ Quản lý & Điều phối Ticket thuộc GIAI ĐOẠN 3 — ĐIỀU PHỐI & GIÁM SÁT được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Admin tiếp nhận và điều chuyển Ticket sai phòng ban'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.


---

## Quy tắc Nghiệm thu & Phụ thuộc
* **Database thật:** Dữ liệu được ghi nhận trực tiếp trên CSDL thật, không sử dụng mock data.
* **Nghiệm thu cuốn chiếu:** Hoàn thiện và đóng gói nghiệm thu module trước khi chuyển tiếp.
