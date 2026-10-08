# PHÂN HỆ: M06 — TIẾP NHẬN TICKET — NHÂN VIÊN

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Thư mục Phân hệ:** `Giai-Doan-1-Nen-Tang-Working-MVP/M06-receive-ticket`  
> **Actors:** Nhân viên  

---

## [FR-M06-01] Xem danh sách Ticket mới thuộc phòng ban
* **Mô tả:** Xem danh sách Ticket mới thuộc phòng ban.
* **Actor:** Nhân viên.
* **Preconditions:** Phân hệ Tiếp nhận Ticket — Nhân viên thuộc GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Xem danh sách Ticket mới thuộc phòng ban'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.

---

## [FR-M06-02] Tìm kiếm, lọc và tiếp nhận Ticket
* **Mô tả:** Tìm kiếm, lọc và tiếp nhận Ticket.
* **Actor:** Nhân viên.
* **Preconditions:** Phân hệ Tiếp nhận Ticket — Nhân viên thuộc GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Tìm kiếm, lọc và tiếp nhận Ticket'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.


---

## Quy tắc Nghiệm thu & Phụ thuộc
* **Database thật:** Dữ liệu được ghi nhận trực tiếp trên CSDL thật, không sử dụng mock data.
* **Nghiệm thu cuốn chiếu:** Hoàn thiện và đóng gói nghiệm thu module trước khi chuyển tiếp.
