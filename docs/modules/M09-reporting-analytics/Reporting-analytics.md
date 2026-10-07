# TÀI LIỆU QUY TRÌNH & VẬN HÀNH - PHÂN HỆ BÁO CÁO & THỐNG KÊ (REP)

## 1. Danh mục Chức năng (Function Catalog)

| Mã FR | Tên Chức năng | Actor Chính | Mô tả Tóm tắt |
| :--- | :--- | :--- | :--- |
| **[FR-REP-01]** | Xem Báo cáo Thống kê Tổng quan | Admin | Xem Dashboard chỉ số toàn trường, phân bổ phòng ban và tỷ lệ xử lý. |
| **[FR-REP-02]** | Xem Báo cáo Thống kê Phòng ban | Quản lý (Manager) | Xem Dashboard lưu lượng đơn phòng ban và đo lường hiệu suất (KPI) nhân viên. |

---

## 2. Sơ đồ Luồng Quy trình (Flowchart)

```text
                                [Truy cập Menu Báo cáo / Dashboard]
                                                 │
                                                 ▼
                                [Xác thực Vai trò Người dùng]
                                                 │
                        ┌────────────────────────┴────────────────────────┐
                        ▼                                                 ▼
             [Vai trò: Admin FR-REP-01]                       [Vai trò: Quản lý FR-REP-02]
                        │                                                 │
                        ▼                                                 ▼
            [Chọn Mốc Thời gian Lọc]                          [Chọn Mốc Thời gian Lọc]
                        │                                                 │
                        ▼                                                 ▼
         [Tổng hợp Dữ liệu Toàn trường]                   [Tổng hợp Dữ liệu Riêng Phòng ban]
                        │                                                 │
                        ▼                                                 ▼
    [Hiển thị Global Dashboard & Biểu đồ]              [Hiển thị Dept Dashboard & KPI NV]
```

---

## 3. Cơ chế & Cách Vận hành (Operational Mechanics)

### 3.1. Phân cấp Tầm nhìn & Cách ly Dữ liệu (Data Isolation)
1. **Global Dashboard (Dành cho Admin):** Tổng hợp dữ liệu toàn trường, so sánh tỷ lệ hoàn thành đúng hạn/quá hạn giữa tất cả các phòng ban.
2. **Department Dashboard (Dành cho Trưởng phòng):** Dữ liệu được lọc khép kín theo mã phòng ban của Trưởng phòng. Hiển thị bảng số liệu KPI cá nhân (Số đơn tiếp nhận, đã xong, quá hạn) của nhân viên trong phòng.

### 3.2. Cơ chế Lọc theo Thời gian
1. **Mặc định hiển thị:** Hệ thống mặc định tải dữ liệu của "Tháng hiện tại".
2. **Tùy chỉnh khoảng thời gian:** Người dùng có thể chọn các mốc định sẵn (Tuần này, Tháng này) hoặc chọn khoảng ngày cụ thể (`From Date` - `To Date`). Biểu đồ tự động cập nhật tính toán trên tập dữ liệu đã lọc.
