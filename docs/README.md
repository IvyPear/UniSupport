# TÀI LIỆU DỰ ÁN UNISUPPORT (PROJECT DOCUMENTATION INDEX)

---

## Cấu trúc tài liệu

```
docs/
├── 01-product/              # Tổng quan sản phẩm
│   └── README.md
├── 02-domain/               # Nghiệp vụ cốt lõi
│   ├── README.md
│   ├── tong-quan-domain.md
│   ├── quy-tac-nghiep-vu.md
│   ├── mo-hinh-ticket.md
│   └── chuyen-doi-trang-thai.md
├── 03-modules/              # Đặc tả chức năng (13 module: M01–M13)
│   ├── README.md
│   ├── M01-dang-nhap-xac-thuc/
│   ├── M02-vai-tro-phan-quyen/
│   ├── M03-quan-ly-tai-khoan/
│   ├── M04-quan-ly-danh-muc/
│   ├── M05-khoi-tao-ticket/
│   ├── M06-tiep-nhan-ticket/
│   ├── M07-xu-ly-trao-doi/
│   ├── M08-tra-ket-qua/
│   ├── M09-theo-doi-bo-sung/
│   ├── M10-ket-qua-danh-gia/
│   ├── M11-quan-ly-dieu-phoi/
│   ├── M12-giam-sat-tien-do/
│   └── M13-dashboard-bao-cao/
├── 04-workflows/            # Luồng quy trình nghiệp vụ
│   ├── README.md
│   ├── 00-quy-trinh-chung.md
│   ├── 01-luong-hoat-dong-Ticket.md
│   ├── 02-quy-trinh-sinh-vien.md
│   ├── 03-quy-trinh-nhan-vien.md
│   ├── 04-quy-trinh-quan-ly.md
│   ├── 05-quy-trinh-admin.md
│   └── 06-ma-tran-thong-bao.md
├── 05-non-functional-requirements/  # Yêu cầu phi chức năng
│   └── README.md
├── 06-acceptance/           # Kiểm thử & nghiệm thu
│   ├── test-scenarios.md
│   └── chien-luoc-kiem-thu.md
├── 07-architecture/         # Thiết kế kiến trúc & kỹ thuật
│   ├── README.md
│   ├── co-so-du-lieu-erd.md
│   └── dac-ta-api.md
├── 08-project/              # Quản lý dự án
│   ├── sent/
│   ├── Proposal.md
│   ├── team-charter.md
│   ├── proposal-adjustment.md
│   ├── master-plan.md
│   └── master-plan.xlsx
├── 09-quality/              # Kế hoạch chất lượng
│   └── quality-plan.md
├── 10-product-management/   # Quản lý sản phẩm
│   └── README.md
├── 11-governance/           # Quản trị dự án
│   ├── README.md
│   ├── change-control.md
│   ├── monitoring.md
│   └── reporting.md
└── README.md                # File này — Mục lục tổng
```

---

## Danh mục tài liệu

### 📌 [01 — Tổng Quan Sản Phẩm](01-product/README.md)
Định vị sản phẩm, đối tượng sử dụng (Actors), giá trị cốt lõi.

### 🏛️ [02 — Nghiệp Vụ Cốt Lõi (Domain)](02-domain/README.md)
Bối cảnh, quy tắc nghiệp vụ, mô hình Ticket, vòng đời 5 trạng thái.

### 📦 [03 — Đặc Tả Module (PRD)](03-modules/README.md)
13 phân hệ thực thi (M01–M13) chia 3 giai đoạn, 5 mốc triển khai.

### 🔄 [04 — Luồng Quy Trình (Workflows)](04-workflows/README.md)
Quy trình 4 vai trò (Sinh viên, Nhân viên, Quản lý, Admin) và ma trận thông báo.

### ⚙️ [05 — Yêu Cầu Phi Chức Năng](05-non-functional-requirements/README.md)
Bảo mật, hiệu năng, toàn vẹn dữ liệu, SLA.

### ✅ [06 — Kiểm Thử & Nghiệm Thu](06-acceptance/)
Chiến lược kiểm thử, kịch bản test theo module.

### 💻 [07 — Kiến Trúc & Kỹ Thuật](07-architecture/README.md)
Kiến trúc phân tầng, ERD, đặc tả API.

### 📋 [08 — Quản Lý Dự Án](08-project/)
Team Charter, điều chỉnh Proposal, kế hoạch nhân sự & ngân sách.

### 📊 [09 — Kế Hoạch Chất Lượng](09-quality/quality-plan.md)
Quality Planning, QA, QC, Defect Management.

### 📦 [10 — Quản Lý Sản Phẩm](10-product-management/README.md)
SLA, đo lường sản phẩm, tiêu chuẩn nghiệm thu, lộ trình.

### 🔒 [11 — Quản Trị Dự Án (Governance)](11-governance/README.md)
Điều phối, giám sát, kiểm soát thay đổi, báo cáo.
