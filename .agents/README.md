# BỘ KỸ NĂNG VÀ QUY TẮC ANTIGRAVITY (SPM ASSISTANT)

Thư mục `.agents/` chứa các cấu hình, kỹ năng (Skills), quy tắc (Rules) và tài liệu chuẩn dành cho trợ lý AI Antigravity phục vụ môn học **Software Project Management (SPM)** cho dự án **UniSupport**.

> Thư mục `.claude/` vẫn được giữ nguyên vẹn để tương thích nếu nhóm sử dụng Claude Code.

---

## 1. Cấu trúc thư mục

```text
.agents/
├── README.md                          # Tài liệu hướng dẫn này
├── spm-standard.md                    # Tài liệu chuẩn của môn học (căn cứ duy nhất)
└── skills/                            # Danh mục các kỹ năng tự động
    ├── spm-review/                    # Kỹ năng tự review tài liệu dự án
    │   ├── SKILL.md                   # Hướng dẫn chính cho agent
    │   └── areas/                     # 14 chuyên đề review chi tiết
    │       ├── index.md               # Review mục lục và cấu trúc
    │       ├── proposal.md            # Review proposal và báo giá
    │       ├── prd.md                 # Review PRD và các FR/NFR/AC
    │       ├── plan.md                # Review Master Plan & WBS
    │       ├── consistency.md         # Review chuỗi truy vết tính năng
    │       ├── quality.md             # Review kế hoạch chất lượng
    │       ├── product.md             # Review kế hoạch quản lý sản phẩm
    │       ├── governance.md          # Review quản trị & kiểm soát thay đổi
    │       ├── team-charter.md        # Review team charter
    │       ├── github.md              # Review issues, milestones GitHub
    │       ├── overview.md            # Review tổng thể toàn repo
    │       ├── round-1.md             # Review trọng tâm trước vòng 1
    │       ├── round-2.md             # Review trọng tâm trước vòng 2
    │       └── round-3.md             # Review hoàn thiện trước vòng 3
    ├── spm-defense-practice/          # Kỹ năng luyện vấn đáp bảo vệ cá nhân
    │   └── SKILL.md
    └── spm-fix/                       # Kỹ năng chuẩn hóa sửa đổi tài liệu
        └── SKILL.md
```

---

## 2. Hướng dẫn sử dụng các Skill trên Antigravity

Bạn có thể kích hoạt trực tiếp trong khung chat Antigravity bằng câu lệnh slash command hoặc bằng ngôn ngữ tự nhiên:

### 2.1. Skill `spm-review`: Tự review tài liệu dự án
- **Review toàn bộ repo:**
  - Lệnh: `/spm-review overview` hoặc *"Review tổng thể dự án"*
- **Review theo từng hạng mục:**
  - Mục lục: `/spm-review index`
  - Báo giá & Proposal: `/spm-review proposal`
  - PRD & Yêu cầu: `/spm-review prd` (hoặc module cụ thể: `/spm-review prd M01`)
  - Kế hoạch & Rủi ro: `/spm-review plan`
  - Quản lý sản phẩm: `/spm-review product`
  - Kế hoạch chất lượng: `/spm-review quality`
  - Quản trị dự án: `/spm-review governance`
  - Chuỗi liên kết tính năng: `/spm-review consistency <mã-FR>`
- **Review trước từng vòng feedback:**
  - Vòng 1: `/spm-review r1`
  - Vòng 2: `/spm-review r2`
  - Vòng 3: `/spm-review r3`

---

### 2.2. Skill `spm-defense-practice`: Luyện vấn đáp bảo vệ cá nhân
- **Cách dùng:**
  - Lệnh: `/spm-defense-practice` hoặc *"Luyện bảo vệ cho tôi"*, *"Hỏi thử tôi phần PRD"*.

---

### 2.3. Skill `spm-fix`: Sửa tài liệu chuẩn hóa
- **Cách dùng:**
  - Lệnh: `/spm-fix <hạng mục | #issue>` (ví dụ: `/spm-fix product`, `/spm-fix #12`).

