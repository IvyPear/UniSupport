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
│   ├── traceability-matrix.md
│   └── chien-luoc-kiem-thu.md
├── 07-architecture/         # Thiết kế kiến trúc & kỹ thuật
│   ├── README.md
│   ├── co-so-du-lieu-erd.md
│   └── dac-ta-api.md
├── 08-project/              # Quản lý dự án
│   ├── Proposal.md          # Proposal ban đầu (lịch sử)
│   ├── Dieu-chinh-proposal.md # Baseline milestone hiện hành (MS-00..MS-04)
│   ├── Bao-gia-cho-khach.md # Báo giá gửi khách (Q-00..Q-04)
│   ├── Ngan-sach-nhan-su.md # Ngân sách, đơn giá và phân bổ 886h theo vai trò
│   ├── Master Schedule.xlsx # File tính toán kế hoạch, WBS, Gantt
│   ├── Master-schedule.md   # Thuyết minh Master Plan & chi tiết tiến độ
│   ├── risk-register.md     # Sổ đăng ký rủi ro (R-01..R-10)
│   ├── open-questions.md    # Câu hỏi mở chờ nhóm chốt (OQ-01..OQ-06)
│   ├── team-charter.md      # Quy tắc làm việc nhóm & phân vai
│   ├── QL-chat-luong.md     # Kế hoạch quản lý chất lượng (QA, QC, DoD)
│   ├── QL-san-pham.md       # Kế hoạch quản lý sản phẩm (SLA, Feedback, Roadmap)
│   ├── Dieuphoi-Giamsat.md  # Kế hoạch điều phối, giám sát & Change Request
│   └── sent/                # Bản PDF đã gửi khách, lịch sử trong sent/README.md
└── README.md                # File này — Mục lục tổng
```

---

## Bảng tra nhanh vị trí nội dung cốt lõi (Quick Reference)

| Nội dung cần tìm | Tài liệu gốc & Mục cụ thể |
| :--- | :--- |
| **1. Phạm vi dự án (Scope — Làm & Không làm)** | • Tổng quan & Non-goals: [Proposal.md — Mục 4 & Mục 5](08-project/Proposal.md#4-các-hạng-mục-ngoài-phạm-vi-triển-khai), [01-product/README.md](01-product/README.md)<br>• Baseline 5 mốc & 13 module: [Dieu-chinh-proposal.md](08-project/Dieu-chinh-proposal.md), [03-modules/README.md](03-modules/README.md) |
| **2. Báo giá, Ngân sách & Nguồn lực (Resources & Cost)** | • Hạng mục báo giá `Q-00`–`Q-04` (300.000.000 VNĐ): [Bao-gia-cho-khach.md — Mục 2](08-project/Bao-gia-cho-khach.md#2-phạm-vi-và-hạng-mục-báo-giá)<br>• Cơ cấu 8 nhân sự, đơn giá & 886 giờ công: [Ngan-sach-nhan-su.md — Mục 2 & Mục 3](08-project/Ngan-sach-nhan-su.md#2-bảng-phân-bổ-lương-chi-tiết-theo-vai-trò-và-cá-nhân)<br>• Lịch trình & WBS: [Master-schedule.md](08-project/Master-schedule.md), [Master Schedule.xlsx](08-project/Master%20Schedule.xlsx) |
| **3. Sổ rủi ro (Risk Register)** | • Sổ đăng ký rủi ro tổng hợp (`R-01`–`R-10`): [risk-register.md](08-project/risk-register.md)<br>• Rủi ro chất lượng & vận hành: [QL-chat-luong.md — Mục 6](08-project/QL-chat-luong.md#6-quản-lý-rủi-ro-chất-lượng), [QL-san-pham.md — Mục 3.2](08-project/QL-san-pham.md#32-quản-trị-rủi-ro-vận-hành-risk-management) |
| **4. Quy trình Yêu cầu thay đổi (Change Request — CR)** | • Quy trình 4 bước, đánh giá 6 chiều & Approver Matrix: [Dieuphoi-Giamsat.md — Mục 3.4](08-project/Dieuphoi-Giamsat.md#34-quy-trình-yêu-cầu-thay-đổi-change-request---cr-và-phân-cấp-phê-duyệt)<br>• Mẫu tạo CR trên GitHub: [.github/ISSUE_TEMPLATE/4-change-request.md](../.github/ISSUE_TEMPLATE/4-change-request.md) |
| **5. Tiêu chuẩn hoàn thành (Definition of Done — DoD)** | • Cổng kiểm chuẩn DoR/DoD & Tiêu chuẩn hoàn thành: [QL-chat-luong.md — Mục 1.2 & Mục 5](08-project/QL-chat-luong.md#5-definition-of-done-dod--tiêu-chuẩn-hoàn-thành)<br>• Tiêu chuẩn nghiệm thu phát hành (Release Criteria): [QL-san-pham.md — Mục 3.1](08-project/QL-san-pham.md#31-tiêu-chuẩn-nghiệm-thu-phát-hành-release-criteria) |
| **6. Ma trận truy vết & Kiểm thử (Traceability & Test)** | • Ma trận truy vết theo AC: [06-acceptance/traceability-matrix.md](06-acceptance/traceability-matrix.md)<br>• Kịch bản kiểm thử & Chiến lược test: [06-acceptance/test-scenarios.md](06-acceptance/test-scenarios.md), [06-acceptance/chien-luoc-kiem-thu.md](06-acceptance/chien-luoc-kiem-thu.md) |

---

## Quy ước mã và Nơi gốc (ID Conventions & Single Source of Truth)

| Đối tượng | Định dạng mã | Nơi gốc (Source of Truth) | Liên kết phải ghi |
| :--- | :--- | :--- | :--- |
| **Module** | `M01` – `M13` | `docs/03-modules/README.md` | Milestone `MS-xx` |
| **Yêu cầu chức năng (FR)** | `FR-M01-01` .. `FR-M13-04` | `docs/03-modules/Mxx-.../prd.md` | Actor, Priority, BR, E, AC |
| **Tiêu chí nghiệm thu (AC)** | `FR-Mxx-yy/AC-zz` | `docs/03-modules/Mxx-.../prd.md` | — |
| **Yêu cầu phi chức năng (NFR)** | `NFR-SEC-01`, `NFR-PERF-01`... | `docs/05-non-functional-requirements/README.md` | Ngưỡng cam kết & cách đo |
| **Kịch bản kiểm thử (Test)** | `TC-M01-N01`... | `docs/06-acceptance/test-scenarios.md` | Mã `AC` hoặc `NFR` được kiểm |
| **Hạng mục báo giá** | `Q-00` – `Q-04` | `docs/08-project/Bao-gia-cho-khach.md` | Milestone `MS-xx`, Module, Giờ công |
| **Milestone** | `MS-00` – `MS-04` | `docs/08-project/Dieu-chinh-proposal.md`, `Master-schedule.md` | Phạm vi bàn giao, thời gian |
| **Parent Task** | `#1`, `#2`... | GitHub Issues (`.github/ISSUE_TEMPLATE/1-parent-task.md`) | Mã `FR`, `MS-xx`, Owner, Hạn, DoD |
| **Rủi ro** | `R-01` – `R-10` | `docs/08-project/risk-register.md` | Khả năng, Tác động, Owner, Phương án |
| **Change Request** | `CR-01`... | GitHub Issues (`.github/ISSUE_TEMPLATE/4-change-request.md`) | Đánh giá 6 chiều, Tài liệu cập nhật |
| **Câu hỏi mở** | `OQ-01` – `OQ-06` | `docs/08-project/open-questions.md` | Hạng mục liên quan, Người trả lời |

> **Ghi chú về dữ liệu `Mô phỏng` & Giả định:** Khách hàng (Aurora University), đội ngũ thực thi 8 nhân sự (PM, BA, Senior Dev, 3 Junior Dev, 2 QA/QC tại `Ngan-sach-nhan-su.md` và `team-charter.md`) cùng bảng dữ liệu phân tích phản hồi tại `QL-san-pham.md` (Mục 4.3) là dữ liệu **Mô phỏng** phục vụ kế hoạch quản lý dự án môn học.

---

## Danh mục tài liệu

### 📌 [01 — Tổng Quan Sản Phẩm](01-product/README.md)
Định vị sản phẩm, đối tượng sử dụng (Actors), giá trị cốt lõi.

### 🏛️ [02 — Nghiệp Vụ Cốt Lõi (Domain)](02-domain/README.md)
Bối cảnh, quy tắc nghiệp vụ, mô hình Ticket, vòng đời 5 trạng thái.

### 📦 [03 — Đặc Tả Module (PRD)](03-modules/README.md)
13 phân hệ thực thi (M01–M13) được phân vào baseline MS-00–MS-04.

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

### 📊 [Kế Hoạch Chất Lượng](08-project/QL-chat-luong.md)
Quality Planning, QA, QC, Definition of Done và Defect Management.

### 📦 [Quản Lý Sản Phẩm](08-project/QL-san-pham.md)
SLA, đo lường sản phẩm, tiêu chuẩn nghiệm thu và lộ trình.

### 🔒 [Quản Trị Dự Án](08-project/Dieuphoi-Giamsat.md)
Điều phối, giám sát, kiểm soát thay đổi và báo cáo.
