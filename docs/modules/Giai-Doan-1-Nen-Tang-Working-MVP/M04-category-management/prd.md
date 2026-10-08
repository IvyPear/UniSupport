# PHÂN HỆ: M04 — QUẢN LÝ DANH MỤC HỖ TRỢ

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Thư mục Phân hệ:** `Giai-Doan-1-Nen-Tang-Working-MVP/M04-category-management`  
> **Actors:** Admin, Quản lý phòng ban  

---

## [FR-M04-01] Admin quản lý danh mục toàn trường
* **Mô tả:** Admin quản lý danh mục toàn trường.
* **Actor:** Admin, Quản lý phòng ban.
* **Preconditions:** Phân hệ Quản lý danh mục hỗ trợ thuộc GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Admin quản lý danh mục toàn trường'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.

---

## [FR-M04-02] Quản lý thêm danh mục thuộc phòng ban
* **Mô tả:** Quản lý thêm danh mục thuộc phòng ban.
* **Actor:** Admin, Quản lý phòng ban.
* **Preconditions:** Phân hệ Quản lý danh mục hỗ trợ thuộc GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Quản lý thêm danh mục thuộc phòng ban'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.


---

## Quy tắc Nghiệm thu & Phụ thuộc
* **Database thật:** Dữ liệu được ghi nhận trực tiếp trên CSDL thật, không sử dụng mock data.
* **Nghiệm thu cuốn chiếu:** Hoàn thiện và đóng gói nghiệm thu module trước khi chuyển tiếp.
