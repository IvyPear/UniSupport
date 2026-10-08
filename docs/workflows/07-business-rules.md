# 7. CÁC QUYẾT ĐỊNH NGHIỆP VỤ CẦN CHỐT (BUSINESS DECISIONS)

> **Lưu ý quan trọng:** Những mục đánh nhãn **[CẦN CHỐT]** là quyết định nghiệp vụ chưa xác nhận chính thức. Cần thống nhất trước khi đóng băng thiết kế CSDL và Hợp đồng API.

---

## Danh mục 10 Quyết định Nghiệp vụ Cốt lõi

| Mã BR          | Vấn đề / Khía cạnh nghiệp vụ          | Các Phương án xem xét chốt                                                                                                                         |
| --------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BR-01** | **Định tuyến Danh mục "Khác"**    | *PA1:* Luôn ném về Admin phân loại.  *PA2:* Chỉ ném về Admin khi không thuộc phòng ban nào.                                              |
| **BR-02** | **Cơ chế Tiếp nhận Ticket**        | *PA1:* Cho Nhân viên tự chọn đơn (Claim).  *PA2:* Chỉ cho Quản lý phân công.  *PA3:* Cho phép cả 2 cơ chế song song.                |
| **BR-03** | **Đóng Ticket sau khi hoàn thành** | *PA1:* Nhân viên trả kết quả là xong (Hoàn thành).  *PA2:* Cần Sinh viên xác nhận hài lòng mới đóng hẳn (`Closed`).              |
| **BR-04** | **Chính sách Đánh giá (CSAT)**    | *PA1:* Cho phép đánh giá 1 lần duy nhất.  *PA2:* Cho sửa đánh giá trong 24h.  *PA3:* Tự động đóng nếu quá 72h không đánh giá. |
| **BR-05** | **Xử lý SLA khi Chuyển phòng ban** | Khi Nhân viên báo sai phòng ban, SLA có tính lại từ đầu hay giữ nguyên tổng thời gian đếm?                                               |
| **BR-06** | **Duyệt Danh mục phòng ban**        | Danh mục do Quản lý phòng ban thêm mới (`QL-05`) có cần Admin phê duyệt trước khi mở cho Sinh viên không?                               |
| **BR-07** | **Đồng hồ đếm SLA**               | Tính SLA từ lúc Sinh viên tạo đơn, hay lúc Nhân viên tiếp nhận (`Claim`)? Tạm dừng SLA khi ở trạng thái `Chờ bổ sung`?            |
| **BR-08** | **Phân quyền động (Role ACL)**     | Những quyền hạn nào Admin được phép bật/tắt; khi sửa quyền của một Role thì các Session đang truy cập xử lý ra sao?                  |
| **BR-09** | **Giới hạn File đính kèm**        | Dung lượng tối đa (VD: 5MB hay 10MB), định dạng file cho phép (`.pdf`, `.png`, `.jpg`, `.docx`), thời hạn lưu file trên server?      |
| **BR-10** | **Chính sách Xóa Tài khoản**      | Xóa mềm (`is_deleted=true`) để bảo toàn lịch sử Ticket hay cho phép xóa cứng (`DELETE FROM users`)?                                       |
