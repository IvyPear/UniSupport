# Review: Quality

Tìm theo mục lục của nhóm. Vị trí trong bộ khung: `docs/09-quality/quality-plan.md`, `docs/06-acceptance/test-scenarios.md`.

## Vì sao quan trọng

QA giúp lỗi không xảy ra, QC giúp phát hiện lỗi trước khi khách thấy. Definition of Done chung giúp cả nhóm hiểu "xong" giống nhau. Không có mức độ lỗi và điều kiện release thì không ai dám nói khi nào được bàn giao.

## Chuẩn yêu cầu

- QA, QC, Definition of Done chung, mức độ lỗi, điều kiện release.
- Có tiêu chí kiểm tra được.
- Kế hoạch có regression test trước mỗi lần bàn giao.
- Chuẩn không yêu cầu kết quả test thực tế.

## Hướng tới

Có xử lý lỗi theo mức độ, điều kiện release, và quy trình áp dụng được ngay: rõ ai làm, khi nào, dùng mẫu nào.

## Các bước kiểm

1. QA: những hoạt động phòng ngừa cụ thể nào (review, checklist, cổng chất lượng), ai làm, khi nào?
2. QC: những loại test nào, ai test, khi nào, dùng kịch bản nào? Có regression test trước mỗi lần bàn giao không?
3. Definition of Done: là danh sách kiểm được, hay câu chung? Chỉ có một DoD chung, hay mỗi tài liệu một kiểu?
4. Mức độ lỗi: định nghĩa từng mức, thời hạn xử lý, ai quyết. Cả repo dùng một thang mức độ lỗi hay mỗi file một thang?
5. Điều kiện release: những điều kiện kiểm được nào (số lỗi còn mở theo mức, kịch bản đã chạy) thì được bàn giao?
6. Quy trình có chỉ ra áp dụng thế nào không: ai làm, ở milestone nào, dùng mẫu bug hay checklist nào?

## Câu hỏi để nhóm tự trả lời

- Trước release còn một lỗi mức cao, quy trình của nhóm nói gì: hoãn, release kèm cảnh báo, hay sửa nóng? Ai quyết?
- Một việc được coi là xong khi nào? Cả nhóm có trả lời giống nhau không?

## Chỗ hay bị sót

- Kế hoạch chất lượng có đủ mục nhưng chung chung, không nói ai làm, khi nào.
- Nhiều thang mức độ lỗi khác nhau ở các file khác nhau.
- Hai nơi định nghĩa DoD khác nhau.
- Nhầm DoD (áp cho mọi việc) với AC (áp cho từng FR) và điều kiện release (áp cho cả bản giao).
