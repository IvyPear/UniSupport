# Mục lục tài liệu

<!-- Hướng dẫn
- File này là mục lục BẮT BUỘC. Nội dung không có trong mục lục và không tìm được thì không được tính.
- Đổi tên hoặc gộp file thì sửa đường dẫn ở bảng dưới cho đúng. Phần không áp dụng ghi `N/A` kèm lý do, không để file rỗng.
- Mỗi thông tin chỉ có một nơi gốc; nơi khác dẫn lại mã (FR-…, Q-…, MS-…), không chép lại nội dung.
-->

## Thứ tự đọc

1. Bài toán và phạm vi: [Proposal](08-project/proposal.docx), [Tổng quan sản phẩm](01-product/README.md)
2. Yêu cầu: [Danh sách module](03-modules/README.md) → PRD từng module ([M01](03-modules/M01-ten-module/prd.md), …) → [NFR](05-non-functional-requirements/README.md)
3. Nghiệm thu: [Kịch bản test](06-acceptance/test-scenarios.md), [Ma trận truy vết](06-acceptance/traceability-matrix.md)
4. Giá và kế hoạch: [Báo giá](08-project/quotation.xlsx), [Master Plan](08-project/master-plan.md) + [master-plan.xlsx](08-project/master-plan.xlsx), [Rủi ro](08-project/risk-register.md)
5. Cách làm việc: [Team Charter](08-project/team-charter.md), [Quality](09-quality/quality-plan.md)
6. Product: [Quy trình feedback](10-product-management/feedback-process.md), [Roadmap](10-product-management/roadmap.md), [Chỉ số giá trị](10-product-management/success-metrics.md)
7. Quản trị: [Báo cáo](11-governance/reporting.md), [Giám sát](11-governance/monitoring.md), [Change request](11-governance/change-control.md)
8. Tài liệu hỗ trợ (bằng chứng): [Domain](02-domain/README.md), [Workflows](04-workflows/README.md), [Kiến trúc](07-architecture/README.md), [Bản proposal đã gửi](08-project/sent/)

## Tra nhanh vị trí

| Nội dung | Ở đâu |
| --- | --- |
| Scope (làm và không làm) | `08-project/proposal.docx` mục …; `01-product/README.md` mục Goals / Non-goals |
| Nguồn lực | `08-project/master-plan.xlsx` sheet Resources |
| Giá và hạng mục báo giá | `08-project/quotation.xlsx` sheet Hạng mục |
| Rủi ro | [risk-register.md](08-project/risk-register.md) |
| Change request | Quy trình: [change-control.md](11-governance/change-control.md); CR thực tế: GitHub Issues nhãn `change-request` |
| Definition of Done | [quality-plan.md](09-quality/quality-plan.md) mục Definition of Done |
| Giả định, ràng buộc, câu hỏi mở | [assumptions.md](08-project/assumptions.md), [constraints.md](08-project/constraints.md), [open-questions.md](08-project/open-questions.md) |
| Quy trình báo cáo | [reporting.md](11-governance/reporting.md) |

## Quy ước mã

Liên kết chỉ ghi ở **một phía**: phía ghi là cột "Liên kết phải ghi". Ví dụ kịch bản test ghi mã AC mà nó kiểm; PRD không ghi ngược lại mã test.

Bộ khung không yêu cầu phần mềm chạy thật: nhóm làm tài liệu, kế hoạch và quy trình cho toàn dự án.

| Đối tượng | Dạng | Nơi gốc | Liên kết phải ghi |
| --- | --- | --- | --- |
| Module | `M01` | `03-modules/` | |
| Yêu cầu chức năng | `FR-XXX-01` | prd.md của module | |
| Tiêu chí nghiệm thu | `FR-XXX-01/AC-01` | prd.md của module | |
| Yêu cầu phi chức năng | `NFR-PERF-01` | `05-non-functional-requirements/` | |
| Kịch bản test | `TS-01` | `06-acceptance/test-scenarios.md` | Mã AC hoặc NFR được test |
| Hạng mục báo giá | `Q-01` | `08-project/quotation.xlsx` (sheet Hạng mục) | Module hoặc FR thuộc hạng mục |
| Milestone | `MS-01` | `08-project/master-plan.xlsx`, GitHub Milestones | Phần giao được, điều kiện nghiệm thu |
| Parent task | `#12` | GitHub Issue | Mã FR, `MS-xx`, owner, hạn, điều kiện hoàn thành |
| Rủi ro | `R-01` | `08-project/risk-register.md` | Owner, phương án xử lý |
| Change request | `CR-01` | GitHub Issue | Tài liệu và task đã cập nhật |
| Giả định | `A-01` | `08-project/assumptions.md` | |

`M01` là module, `MS-01` là milestone; không dùng lẫn. Dạng mã trong chuẩn là ví dụ; nhóm đặt dạng khác vẫn được nếu mỗi mã là duy nhất và lần được. Cách đặt phần XXX của mã FR và mã giả định `A-01` là gợi ý của bộ khung.

## Dữ liệu mô phỏng

<!-- Hướng dẫn: client, feedback, báo cáo, CR được phép mô phỏng nhưng phải ghi rõ chữ `Mô phỏng` ngay tại chỗ dùng. Liệt kê ở đây những phần là mô phỏng. -->

| Phần | Mô phỏng? | Ghi chú |
| --- | --- | --- |
| Client | | |
| Feedback | | |
| Change request | | |
| Báo cáo | | |

## Người chịu trách nhiệm file Word/Excel

| File | Người chịu trách nhiệm chính |
| --- | --- |
| `08-project/proposal.docx` | |
| `08-project/quotation.xlsx` | |
| `08-project/master-plan.xlsx` | |
