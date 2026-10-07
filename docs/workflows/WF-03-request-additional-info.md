# WF-03: Luồng Yêu Cầu Bổ Sung Thông Tin & Đếm Ngược 72h (Pending/Feedback Loop)

## 1. Mô tả
Luồng xử lý khi nhân viên bị thiếu dữ kiện để giải quyết đơn (ví dụ: thiếu ảnh màn hình lỗi), yêu cầu sinh viên cung cấp thêm thông tin, bao gồm cả cơ chế đếm ngược chống treo đơn.

---

## 2. Các bước thực hiện
1. **Chuyển trạng thái Pending:** Trong quá trình xử lý, nhân viên cập nhật trạng thái đơn sang `Pending` ([FR-STF-03]) và gửi tin nhắn yêu cầu sinh viên cung cấp thêm thông tin hoặc tệp đính kèm ([FR-COM-01], [FR-COM-03]).
2. **Ghi nhận hệ thống & Đếm ngược:** Hệ thống ghi nhận vòng đời chuyển sang `Pending` ([FR-TKT-02]), tự động bắn thông báo in-app cho sinh viên ([FR-NOTI-01]), đồng thời kích hoạt đồng hồ đếm ngược ngầm trong 72 giờ ([FR-TKT-03]).
3. **Rẽ nhánh dựa trên hành vi của Sinh viên:**
   * **Nhánh A (Sinh viên hợp tác):** Sinh viên nhận thông báo, truy cập vào ticket và gửi nội dung chữ hoặc hình ảnh bổ sung ([FR-COM-02], [FR-COM-03]). Hệ thống lập tức dừng bộ đếm ngược, tự động đẩy trạng thái ticket về lại `In Progress`, đồng thời bắn thông báo cho Nhân viên vào làm tiếp ([FR-NOTI-01]).
   * **Nhánh B (Sinh viên không phản hồi):** Hết đúng 72 giờ đếm ngược, hệ thống hiển thị cảnh báo đỏ hoặc gắn nhãn "Quá hạn" tại đơn đó ([FR-TKT-03]). Nhân viên vào kiểm tra, chủ động đóng đơn bằng cách chuyển sang `Resolved` kèm theo lý do *"Quá hạn phản hồi"* ([FR-STF-03]).

---

## 3. Sơ đồ luồng quy trình (Mermaid Diagram)

```mermaid
graph TD
    A([Đơn đang IN PROGRESS]) --> B[NV cập nhật trạng thái PENDING]
    B --> C[NV nhắn tin yêu cầu bổ sung thông tin]
    C --> D[Hệ thống báo Sinh viên & Kích hoạt đếm ngược 72H]
    D --> E{Phản ứng của Sinh viên?}
    E -->|Gửi bổ sung thông tin trước 72H| F[Hệ thống dừng bộ đếm]
    F --> G[Chuyển lại IN PROGRESS & Báo cho NV]
    E -->|Không phản hồi sau 72H| H[Hệ thống gắn nhãn Quá hạn]
    H --> I([NV chuyển thẳng sang RESOLVED])