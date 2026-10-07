# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ NHÂN VIÊN HỖ TRỢ (STAFF)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-STF-01]** | Xem Danh sách Ticket Phòng ban | Nhân viên | Xem và lọc danh sách Ticket thuộc thẩm quyền tiếp nhận của phòng ban mình. |
| **[FR-STF-02]** | Nhân viên Tiếp nhận Ticket | Nhân viên | Tiếp nhận xử lý đơn đang chờ (`Claim`), gán tên người xử lý và đổi trạng thái. |
| **[FR-STF-03]** | Cập nhật Trạng thái Ticket | Nhân viên | Cập nhật đơn sang `Resolved` hoặc `Pending` bắt buộc kèm theo nội dung giải đáp. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

```text
 [Truy cập Danh sách Ticket Phòng ban FR-STF-01] ──► [Lọc đơn NEW chưa có Người xử lý]
                                                               │
                                                               ▼
                                                  [Chọn Đơn & Xem Chi tiết]
                                                               │
                                                               ▼
                                                 [Bấm Tiếp nhận Ticket FR-STF-02]
                                                               │
                                            ┌──────────────────┴──────────────────┐
                                            ▼                                     ▼
                              [NV khác đã nhận: Báo Lỗi]              [Gán Assignee cho NV]
                                                                                  │
                                                                                  ▼
                                                                     [Chuyển sang IN PROGRESS]
                                                                                  │
                                                                                  ▼
                                                                     [Xử lý Yêu cầu Sinh viên]
                                                                                  │
                                                                                  ▼
                                                                 [Nhập Resolution Notes FR-STF-03]
                                                                                  │
                                                              ┌───────────────────┴───────────────────┐
                                                              ▼                                       ▼
                                                   [Chuyển sang PENDING]                   [Chuyển sang RESOLVED]
```

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Luồng Tiếp nhận Công việc (Claiming Flow)
1. **Phạm vi hiển thị:** Nhân viên chỉ có thể đọc các Ticket thuộc phòng ban mình được phân quyền. Các Ticket thuộc phòng ban khác bị ẩn hoàn toàn.
2. **Thao tác tiếp nhận (`Claim`):** Mở xem Ticket ở trạng thái `New` và chưa có `Assignee` -> Nhấn nút "Tiếp nhận". Hệ thống điền tên Nhân viên vào trường `Assignee` và chuyển trạng thái đơn sang `In Progress`.
3. **Cơ chế khóa chống xung đột (Concurrency Control):** Nếu 2 nhân viên cùng mở một đơn `New` và bấm nút "Tiếp nhận", người đầu tiên sẽ nhận việc thành công, người thứ hai bấm sau sẽ bị từ chối và hệ thống cập nhật tên của nhân viên đầu tiên lên màn hình.

### 3.2. Luồng Cập nhật Kết quả & Bắt buộc Ghi chú
1. **Bắt buộc ô Resolution Notes:** Khi chuyển trạng thái đơn sang `Resolved` hoặc `Pending`, trường ghi chú giải đáp (`Resolution Notes`) là bắt buộc. Nếu nhân viên bỏ trống, hệ thống chặn lại và báo lỗi.
2. **Gửi kết quả cho Sinh viên:** Nội dung giải đáp và trạng thái mới lập tức được công khai trên giao diện của Sinh viên và gửi thông báo in-app.
