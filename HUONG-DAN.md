# Hướng dẫn dùng bộ khung repo

Bộ khung này theo đúng mục "Format repo" của tài liệu *Software Project Management: Format nộp bài và tiêu chí chấm*. Khi có điểm khác nhau, tài liệu đó và đề bài chung của môn là căn cứ.

Nhóm làm **tài liệu, kế hoạch và quy trình** cho toàn dự án: proposal, báo giá, PRD, master plan, rủi ro, Team Charter, quy trình quản lý chất lượng, quy trình quản lý sản phẩm, quy trình quản trị. Không yêu cầu làm phần mềm chạy thật, không cần code, kết quả test, demo hay release.

## Cách dùng

1. Dùng bản bộ khung giảng viên phát (đã có sẵn 3 file Word/Excel và `.claude/spm-standard.md`). Chép `docs/`, `.github/`, `.claude/`, `README.md`, `HUONG-DAN.md`, `CLAUDE.md`, `AGENTS.md` vào repo của nhóm. Nhóm đã có tài liệu thì chuyển dần nội dung sang đúng chỗ.
2. Tạo nhãn trên GitHub (tab Issues → Labels) để mẫu issue tự gắn nhãn và để đếm được số liệu: `task`, `bug`, `feedback`, `change-request`, và nhãn mức độ lỗi theo bảng trong `quality-plan.md` (ví dụ `sev:cao`). Owner của task ghi bằng Assignee; hạn dùng ngày của Milestone hoặc trường ngày trong GitHub Projects.
3. Đề bài của môn, nếu có bản chữ, để trong `docs/01-product/` và thêm vào mục lục, để skill đối chiếu được bài toán.
4. Mỗi file có dòng hướng dẫn nằm trong `<!-- … -->`. Dòng này không hiện trên GitHub, có thể giữ lại hoặc xoá.
5. Điền nội dung thật vào chỗ trống. Phần không áp dụng ghi `N/A` kèm lý do, không để file rỗng.
6. Đổi tên hoặc gộp file thì được, nhưng phải sửa `docs/README.md` để chỉ đúng vị trí. **Nội dung không có trong mục lục và không tìm được thì không được tính.**
7. Mỗi thông tin chỉ có một nơi gốc. Nơi khác dẫn lại bằng mã (`FR-…`, `Q-…`, `MS-…`), không chép lại nội dung. Liên kết chỉ ghi ở một phía, theo cột "Liên kết phải ghi" trong bảng quy ước mã của `docs/README.md`.
8. Client, feedback, báo cáo và change request được mô phỏng, nhưng phải ghi rõ `Mô phỏng`.
9. File này chỉ để hướng dẫn, xoá đi khi không cần nữa. Một số quy ước trong bộ khung (cách đặt mã FR, mã giả định `A-xx`, mã cục bộ `BR-01`/`AF-01`/`E-01`, nối WBS với báo giá qua `Q-xx`, Hạng mục dự phòng bắt đầu bằng "Dự phòng", Owner ghi bằng Assignee, Hạn lấy theo dòng WBS) là gợi ý để làm cho tiện, không phải yêu cầu của chuẩn.
10. **Khi nào sửa thẳng, khi nào cần change request.** Trước khi gửi proposal cho khách lần đầu (bản v1.0 trong `sent/`), nhóm sửa kế hoạch và báo giá trực tiếp; lịch sử sửa nằm trong PR. **Sửa theo feedback của giảng viên không phải là change request.** Sau khi khách đã nhận proposal, thay đổi phạm vi, giá hoặc mốc do khách yêu cầu (thật hoặc `Mô phỏng`) mới đi qua CR và ghi Change log, sheet Phiên bản.
11. **Ai là ai trong dự án.** Các thành viên nhóm là **ban quản lý dự án**: mỗi bạn phụ trách một số mảng (proposal và báo giá, PRD, kế hoạch, chất lượng, sản phẩm, quản trị…). **Đội thực thi** (BA, dev, QA…) là giả định: khai báo rõ vai trò, số người, giờ mỗi tuần ở sheet Resources và trong Team Charter, ghi `Mô phỏng`. Owner của task, của dòng WBS là một vai trò trong đội thực thi (ví dụ `BE Dev 1`); owner của rủi ro có thể là một thành viên ban quản lý hoặc một vai trò.
12. **Hai loại issue trên GitHub.** Issue của dự án (parent task, bug, feedback của client, CR) là một phần kế hoạch; parent task để trạng thái open. Issue feedback của giảng viên là riêng: nhóm sửa tài liệu bằng PR có `Closes #n`, hoặc đóng kèm lý do.

## Nên làm gì trước

| Trước | Tập trung |
| --- | --- |
| Vòng feedback 1 | Mục lục; proposal và báo giá; tổng quan sản phẩm và danh sách FR; Milestones và WBS; sổ rủi ro; Team Charter |
| Vòng feedback 2 | FR đủ mẫu, AC cho mọi rule và error flow; kịch bản test; parent task trên GitHub; ma trận truy vết |
| Vòng feedback 3 | Quy trình chất lượng, sản phẩm, quản trị; xử lý hết issue cũ; luyện bảo vệ |

Mỗi lần xong một phần, chạy `/spm-review <hạng mục>`; trước mỗi vòng, chạy `/spm-review r1`, `r2` hoặc `r3`.

## Dùng AI với bộ skill

Thư mục `.claude/skills/` có 2 skill để dùng với công cụ AI trong lúc làm bài. Các skill đọc tài liệu chuẩn của môn ở `.claude/spm-standard.md`; thiếu file này thì skill sẽ dừng. `CLAUDE.md` và `AGENTS.md` ở gốc repo ghi các nguyên tắc dùng AI cho cả khi không gọi skill; nhớ chép cả hai file này vào repo của nhóm.

- **Claude Code:** gõ `/tên-skill`, ví dụ `/spm-review prd`.
- **Công cụ AI khác đọc được file trong repo** (Cursor, Copilot, Codex…): yêu cầu AI đọc `.claude/skills/<skill>/SKILL.md` và làm theo.
- **Chat trên web không đọc được repo:** dán `SKILL.md`, file hạng mục cần dùng trong `spm-review/areas/`, `.claude/spm-standard.md` và nội dung tài liệu cần review. Khi đó bằng chứng ghi theo tên mục hoặc đoạn trích thay vì `file:dòng`. Review toàn repo theo cách này rất dài; nên review từng hạng mục.

**`spm-review`: tự review tài liệu.** Viết xong một phần thì review đúng hạng mục đó; trước vòng feedback N thì chạy `rN`; lần đầu hoặc khi muốn nhìn toàn cảnh thì chạy `overview`.

| Lệnh | Review |
| --- | --- |
| `/spm-review index` | Mục lục và cấu trúc repo |
| `/spm-review proposal` | Proposal và báo giá |
| `/spm-review prd` | PRD: sản phẩm, module, FR, NFR, AC, test. Thêm mã module để review một module, ví dụ `/spm-review prd M02` |
| `/spm-review plan` | Master Plan và sổ rủi ro |
| `/spm-review github` | Milestones, parent task, mẫu issue và PR |
| `/spm-review team-charter` | Team Charter |
| `/spm-review quality` | Quy trình quản lý chất lượng (QA, QC, DoD, mức độ lỗi, điều kiện release) |
| `/spm-review product` | Quản lý sản phẩm sau bàn giao |
| `/spm-review governance` | Báo cáo, giám sát, change request |
| `/spm-review consistency FR-…` | Lần một tính năng qua báo giá → PRD → plan → task → kịch bản test |
| `/spm-review overview` | Toàn bộ repo, chọn ra những góp ý quan trọng nhất |
| `/spm-review r1` | Trước vòng feedback 1: lỗi lớn (hiểu sai bài toán, thiếu tài liệu, milestone không giao được phần chạy được, mâu thuẫn lớn về giá hoặc plan) |
| `/spm-review r2` | Trước vòng feedback 2: liên kết (chuỗi báo giá → PRD → plan → task → test; mỗi rule và error flow có AC) |
| `/spm-review r3` | Trước vòng feedback 3 và trước khi chốt: hoàn thiện (issue cũ đã xử lý thật chưa, độ sâu nội dung, format, vấn đáp thử) |

Mỗi hạng mục có hướng dẫn riêng trong `.claude/skills/spm-review/areas/`: vì sao phần đó quan trọng, chuẩn yêu cầu gì, thế nào là chung chung và thế nào là dùng được ngay, câu hỏi để nhóm tự trả lời, chỗ hay bị sót. Nên đọc file đó **trước khi viết** phần tương ứng, không chỉ lúc review.

Trước khi review, skill hỏi nhóm một câu: phần này nhóm thấy chắc ở đâu, còn băn khoăn ở đâu. Kết quả review gồm: phần nhóm đã làm tốt; phần **cần bổ sung** theo chuẩn (cùng mẫu với issue feedback của giảng viên: nhãn `ẩn` / `mâu thuẫn` / `thiếu`, Vòng, Bằng chứng, Vấn đề, Tác động, Câu hỏi cho nhóm, Hoàn thành khi); phần **để vòng sau**; và vài **gợi ý thêm** không bắt buộc. Skill tôn trọng cách làm riêng của nhóm: đặt file khác chỗ, chia milestone khác, miễn đáp ứng chuẩn và mục lục chỉ đúng. Đang sửa theo một issue feedback thì đưa issue đó cho skill để kiểm lại điều kiện "Hoàn thành khi".

**`spm-defense-practice`: luyện bảo vệ cá nhân.** AI hỏi thử từng câu theo 3 loại câu bảo vệ, dựa trên tài liệu của nhóm, rồi nhận xét câu trả lời đã bám tài liệu chưa và chỉ ra chỗ cần đọc lại.

Cách dùng cho đúng:

- **AI là người review, nhóm là người quyết định.** Skill được viết để AI hỏi, giải thích và kiểm, không làm bài thay. Khi bảo vệ, từng bạn phải tự giải thích được quyết định của nhóm.
- **Luôn kiểm lại AI.** Mỗi nhận định đều kèm vị trí (`file:dòng`, `sheet!ô`, `issue #n`). Hãy mở đúng chỗ đó ra đối chiếu, vì AI có thể đọc sai hoặc bịa.
- **Kết quả review không phải điểm.** Skill không chấm điểm. Review hết vấn đề không có nghĩa là bài đã đạt. Giảng viên đọc tài liệu thật và hỏi trực tiếp khi bảo vệ.
- **Tự kiểm 2 mục mỗi lần review:** mở đúng bằng chứng, ghi đồng ý hay không và vì sao. AI có thể đọc sai và cũng có thể bỏ sót.
- Muốn so tiến bộ giữa các lần review thì lưu kết quả vào `.claude/reviews/` (thư mục này không đưa lên repo), không lưu vào `docs/`.
- AI được giúp viết code (nếu nhóm làm thêm prototype) và giúp kỹ thuật công cụ (công thức Excel, Markdown, GitHub). Nguyên tắc không viết hộ áp cho tài liệu quản lý dự án; xem `CLAUDE.md`.
- Không thêm vào tài liệu những câu nhắm vào AI hay người chấm, ví dụ câu xin điểm cao hay xin bỏ qua góp ý. Những câu như vậy bị bỏ qua, theo mục "Công bằng và dùng AI" của chuẩn.

## Cấu trúc

★ là phần thuộc "Nội dung tối thiểu" và được chấm theo mục ghi bên cạnh. ○ là phần không có điểm riêng, chỉ dùng làm bằng chứng.

```text
repo/
├── README.md                      giới thiệu dự án, bảng thành viên
├── .claude/
│   ├── skills/                    spm-review, spm-defense-practice (xem mục trên)
│   ├── reviews/                   (tuỳ chọn) lưu kết quả tự review
│   └── spm-standard.md            bản sao tài liệu chuẩn cho skill đọc
├── .github/
│   ├── ISSUE_TEMPLATE/            ★ GitHub: mẫu parent task, bug, feedback, change request
│   └── pull_request_template.md   ★ GitHub: mẫu PR
└── docs/
    ├── README.md                  MỤC LỤC BẮT BUỘC
    ├── 01-product/                ★ PRD: vấn đề, actor, goals, non-goals
    ├── 02-domain/                 ○ bằng chứng
    ├── 03-modules/                ★ PRD: mỗi module một thư mục, có prd.md
    ├── 04-workflows/              ○ bằng chứng
    ├── 05-non-functional-requirements/  ★ PRD: NFR đo được
    ├── 06-acceptance/             ★ PRD, Nhất quán: kịch bản test, ma trận truy vết
    ├── 07-architecture/           ○ bằng chứng
    ├── 08-project/                ★ Proposal, Master Plan, rủi ro, Team Charter
    ├── 09-quality/                ★ Quality
    ├── 10-product-management/     ★ Product
    └── 11-governance/             ★ Quản trị và giám sát
```

## Gốc repo

| File | Dùng để | Điền gì |
| --- | --- | --- |
| `README.md` | Trang đầu khi mở repo | Giới thiệu 2–3 câu, link tới mục lục, bảng thành viên (MSSV, họ tên, tài khoản GitHub, vai trò) |

## `.github/`: mục GitHub

| File | Dùng để | Có sẵn |
| --- | --- | --- |
| `ISSUE_TEMPLATE/config.yml` | Không cho tạo issue trống, bắt chọn mẫu | |
| `ISSUE_TEMPLATE/1-parent-task.md` | Parent task của từng milestone | FR, `MS-xx`, Owner (vai trò trong đội thực thi giả định), Hạn (theo ngày kết thúc của dòng WBS), mã WBS (tuỳ chọn), điều kiện hoàn thành, subtask (tuỳ chọn) |
| `ISSUE_TEMPLATE/2-bug.md` | Báo lỗi | Mức độ (theo `quality-plan.md`), AC/TS/MS liên quan, các bước tái hiện, kết quả mong đợi và thực tế |
| `ISSUE_TEMPLATE/3-feedback.md` | Phản hồi của client | Nguồn và kênh, nội dung, phân loại, quyết định |
| `ISSUE_TEMPLATE/4-change-request.md` | Change request `CR-xx` | Lý do, feedback gốc, bảng tác động (phạm vi, effort, giá, timeline, rủi ro, test, dự phòng), người duyệt, phiên bản kế hoạch và báo giá mới, danh sách tài liệu đã cập nhật (ghi cụ thể mã, phiên bản) |
| `pull_request_template.md` | Mẫu PR, gồm cả PR sửa theo feedback | Thay đổi và lý do, `Closes #`, mã liên quan, sheet hoặc mục đã đổi trong Word/Excel, phần kiểm tra ghi bằng lời |

Trên GitHub cần tạo thêm:
- Milestones `MS-xx`, khớp với `master-plan.xlsx`;
- parent task cho toàn dự án.

Subtask, code review và release note không bắt buộc.

## `docs/README.md`: mục lục

Đây là file bắt buộc, gồm:

1. Thứ tự đọc, có link tới mọi tài liệu, kể cả phần bằng chứng (`02`, `04`, `07`) và `sent/`.
2. Bảng tra nhanh vị trí của scope, nguồn lực, rủi ro, change request, Definition of Done.
3. Bảng quy ước mã, có cột "Liên kết phải ghi". `M01` là module, `MS-01` là milestone, không dùng lẫn.
4. Bảng ghi phần nào là `Mô phỏng`.
5. Người chịu trách nhiệm chính của từng file Word/Excel.

## PRD: `01`, `03`, `05`, `06`

| File | Điền gì |
| --- | --- |
| `01-product/README.md` | Vấn đề, bảng actor, goals, non-goals. Phạm vi các FR phải khớp với goals và non-goals |
| `03-modules/README.md` | Danh sách module: mã `M01`, tên, nhóm mã FR, thư mục |
| `03-modules/M01-ten-module/README.md` | Mục đích, actor, phụ thuộc của module. Đổi tên thư mục cho đúng module, mỗi module một thư mục |
| `03-modules/M01-ten-module/prd.md` | Các FR của module. **Mỗi FR đủ 9 mục của mẫu FR:** Mô tả, Actor, Priority, Preconditions, Luồng chính, Business Rules, Alternative và Error Flows, Acceptance Criteria, ví dụ Edge Case. Mỗi business rule và mỗi error flow có ít nhất một AC. Mã viết dạng `FR-XXX-01` và `FR-XXX-01/AC-01` (bộ khung gợi ý XXX là viết tắt module bằng chữ in hoa); trong một FR có thể đánh mã cục bộ `BR-01`, `E-01` để cột "Kiểm cho" của AC ghi rõ |
| `05-non-functional-requirements/README.md` | NFR `NFR-PERF-01`, có ngưỡng và cách đo. "Hệ thống nhanh" là không đo được |
| `06-acceptance/test-scenarios.md` | Kịch bản `TS-01`. Mỗi kịch bản ghi mã AC hoặc NFR mà nó kiểm; cột Regression đánh dấu kịch bản chạy lại trước mỗi lần bàn giao |
| `06-acceptance/traceability-matrix.md` | Bảng tổng hợp theo từng AC: AC → Test → Parent task → Milestone → Báo giá. Bảng này không phải nơi gốc: sửa ở nơi gốc trước rồi mới cập nhật bảng |

## Chỉ dùng làm bằng chứng

`02-domain/`, `04-workflows/`, `07-architecture/` không có điểm riêng và không bị chấm thiết kế đúng hay sai. Các phần này dùng để giải thích PRD, effort và rủi ro. Không dùng thì ghi `N/A` kèm lý do.

## `08-project/`: dự án

| File | Điền gì |
| --- | --- |
| `proposal.docx` | Tài liệu gửi khách: lịch sử phiên bản, bài toán, giải pháp, phạm vi làm và không làm, giả định, timeline tổng, giá, điều kiện nghiệm thu |
| `quotation.xlsx` | Sheet **Hạng mục**: nơi gốc của `Q-xx`, mỗi hạng mục một dòng với tên, module/FR, phạm vi; effort và tiền tự cộng. Sheet **Chi tiết effort**: mỗi dòng một loại effort của một hạng mục (phát triển, tích hợp, test, triển khai, sửa lỗi…), vai trò, số giờ, cách ước lượng; đơn giá tự tra, thành tiền là công thức. Các ô kiểm tra phải bằng 0. Sheet **Đơn giá**: đơn giá bán theo vai trò, kèm căn cứ. Sheet **Giả định**: nối mã `A-xx` với hạng mục. Sheet **Phiên bản**: mỗi lần báo giá đổi ghi một dòng |
| `master-plan.xlsx` | Sheet **Milestones**: phần giao chạy được (theo kế hoạch), cách client kiểm tra, điều kiện nghiệm thu, ngày đã chốt; cột Kiểm tra báo khi kế hoạch WBS vượt mốc. Sheet **WBS**: hạng mục, MS, `Q-xx`, effort, owner, ngày đã chốt; gồm cả test, regression, sửa lỗi; dự phòng là dòng riêng bắt đầu bằng "Dự phòng"; có ô kiểm ngày và mã milestone. Sheet **Resources**: giờ của từng người, effort được giao, dư hay thiếu, tổng dự phòng. Sheet **Gantt**: tự vẽ từ ngày trong WBS, chỉ nhập ngày bắt đầu tuần đầu ở ô E3, không tô màu tay. Sheet **Change log**: mỗi CR được duyệt ghi một dòng với giá trị cũ và mới. File cần mở bằng Excel, LibreOffice hoặc Google Sheets (Numbers không hiển thị Gantt) |
| `master-plan.md` | Vì sao chia milestone như vậy, phụ thuộc giữa các milestone, effort cho test và sửa lỗi nằm ở đâu, dự phòng cho CR và rủi ro, cách nhận feedback sau mỗi milestone |
| `risk-register.md` | Rủi ro `R-01`: mô tả, khả năng, tác động, owner, phương án, trạng thái. Ưu tiên rủi ro phần mềm thật của dự án |
| `team-charter.md` | Ban quản lý dự án (thành viên nhóm, mảng phụ trách, người dự phòng) và đội thực thi giả định (vai trò, số người, trách nhiệm), cách ra quyết định, lịch phối hợp, xử lý xung đột, khi thiếu người, quy tắc branch, PR, review, merge |
| `assumptions.md`, `constraints.md`, `open-questions.md` | Giả định (mã `A-xx`, nơi gốc của giả định), ràng buộc, câu hỏi mở. Mỗi dòng ghi ảnh hưởng tới giá hoặc plan |
| `sent/` | Bản PDF của Proposal mỗi lần gửi khách, tên có phiên bản và ngày (ví dụ `proposal-v1.0-2026-11-10.pdf`). Ghi thêm một dòng vào `sent/README.md` |

Khuyến nghị, không tính điểm riêng: retrospective `closure.md`, đặt trong `08-project/`.

Mỗi file Word/Excel có một người chịu trách nhiệm chính và giữ cố định tên file. Khi sửa thì ghi rõ trong PR đã đổi sheet hoặc mục nào.

## `09-quality/`: chất lượng

| File | Điền gì |
| --- | --- |
| `quality-plan.md` | Quy trình quản lý chất lượng: QA (phòng ngừa), QC (kiểm tra, có regression test trước mỗi lần bàn giao), Definition of Done, mức độ lỗi và cách xử lý, điều kiện release, và áp dụng thế nào (ai làm, khi nào, dùng mẫu nào). Không cần kết quả test thực tế |

## `10-product-management/`: sản phẩm

| File | Điền gì |
| --- | --- |
| `feedback-process.md` | Kênh nhận feedback, phân loại (bug, CR, cải tiến), cách ưu tiên, ai quyết định sau bàn giao |
| `roadmap.md` | Các giai đoạn, mục tiêu, tính năng, điều kiện để làm |
| `success-metrics.md` | Chỉ số giá trị: mục tiêu, cách đo, tần suất, người theo dõi |

## `11-governance/`: quản trị và giám sát

| File | Điền gì |
| --- | --- |
| `reporting.md` | Báo cáo nào, ai lập, gửi cho ai, khi nào, lưu ở đâu; báo cáo giải thích chênh lệch giữa kế hoạch và tiến độ thế nào |
| `monitoring.md` | Chỉ số theo dõi (ưu tiên lấy từ GitHub), ngưỡng bình thường, ngưỡng escalate và escalate tới ai |
| `change-control.md` | Các bước xử lý CR, cách đánh giá tác động, bảng ai duyệt loại thay đổi nào, những tài liệu phải cập nhật khi CR được duyệt |

## Một chuỗi nối mã hoàn chỉnh

Giảng viên sẽ chọn 3 tính năng và lần theo chuỗi sau để đánh giá phần Nhất quán. Mắt xích nào đứt là một vấn đề cần sửa.

```text
quotation.xlsx  Q-03  ──►  prd.md  FR-STU-02/AC-04  ──►  master-plan.xlsx  MS-02
      ──►  GitHub parent task #12  ──►  test-scenarios.md  TS-05
```

## Thuật ngữ

| Thuật ngữ | Nghĩa |
| --- | --- |
| Effort | Số giờ công cần để làm một việc |
| WBS | Bảng chia nhỏ toàn bộ công việc của dự án |
| Milestone | Mốc giao một phần sản phẩm trong kế hoạch; mã `MS-xx` |
| AC (Acceptance Criteria) | Tiêu chí nghiệm thu: điều kiện cụ thể để biết một yêu cầu đã đạt |
| NFR | Yêu cầu phi chức năng: hiệu năng, bảo mật, sẵn sàng…, phải đo được |
| DoD (Definition of Done) | Danh sách điều kiện để một việc được coi là xong |
| Regression test | Chạy lại test các phần đã có để chắc phần mới không làm hỏng chúng |
| CR (Change Request) | Yêu cầu thay đổi phạm vi, giá hoặc kế hoạch, đi qua quy trình duyệt |
| Escalate | Báo lên người có thẩm quyền khi chỉ số vượt ngưỡng |
| Baseline | Kế hoạch đã chốt, dùng để so với thực tế |
