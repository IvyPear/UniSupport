# KẾ HOẠCH & CHIẾN LƯỢC KIỂM THỬ (TEST STRATEGY)

> **Dự án:** UniSupport — System Helpdesk & Support  
> **Đối tượng áp dụng:** QA/QC Engineering Team

---

## 1. Cấp độ Kiểm thử (Testing Levels)
1. **Unit Testing:** Kiểm thử đơn vị các hàm xử lý logic nghiệp vụ và Business Rules.
2. **Integration Testing:** Kiểm thử tích hợp API và CSDL thật.
3. **System Testing:** Kiểm thử toàn bộ 13 Phân hệ từ M01 đến M13.
4. **Acceptance Testing (UAT):** Nghiệm thu theo đúng PRD không bao gồm mã giả.

---

## 2. Phân loại Mức độ Lỗi (Bug Severity)
* **Critical (Blocker):** Crash hệ thống, mất dữ liệu, không đăng nhập được (M01, M05).
* **High:** Không tiếp nhận hoặc chuyển Ticket sai luồng (M06, M07, M11).
* **Medium:** Lỗi giao diện, hiển thị thông báo chưa khớp (M09, M10).
* **Low:** Lỗi chính tả, căn chỉnh UI minor.
