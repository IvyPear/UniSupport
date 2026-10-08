# PHÂN HỆ: M03 — VAI TRÒ & PHÂN QUYỀN — ADMIN

> **Giai đoạn:** GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP  
> **Thư mục Phân hệ:** `Giai-Doan-1-Nen-Tang-Working-MVP/M03-roles-permissions`  
> **Actors:** Admin  

---

## [FR-M03-01] Quản lý vai trò người dùng
* **Mô tả:** Quản lý vai trò người dùng.
* **Actor:** Admin.
* **Preconditions:** Phân hệ Vai trò & Phân quyền — Admin thuộc GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Quản lý vai trò người dùng'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.

---

## [FR-M03-02] Cấu hình và kiểm soát quyền truy cập
* **Mô tả:** Cấu hình và kiểm soát quyền truy cập.
* **Actor:** Admin.
* **Preconditions:** Phân hệ Vai trò & Phân quyền — Admin thuộc GIAI ĐOẠN 1 — NỀN TẢNG & WORKING MVP được kích hoạt.
* **Main Flow:**
  1. Truy cập chức năng 'Cấu hình và kiểm soát quyền truy cập'.
  2. Nhập/xử lý dữ liệu nghiệp vụ và xác thực.
  3. Hệ thống ghi nhận dữ liệu vào Database thật và phát sinh thông báo/trạng thái.
* **Acceptance Criteria (AC):** Chạy trực tiếp trên hệ thống thật và kết nối CSDL thật.


---

## Quy tắc Nghiệm thu & Phụ thuộc
* **Database thật:** Dữ liệu được ghi nhận trực tiếp trên CSDL thật, không sử dụng mock data.
* **Nghiệm thu cuốn chiếu:** Hoàn thiện và đóng gói nghiệm thu module trước khi chuyển tiếp.
