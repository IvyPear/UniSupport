# Review theo vòng 2: liên kết

Dùng trước vòng feedback 2. Theo chuẩn, vòng 2 tập trung vào **liên kết**:

- chuỗi từ báo giá, PRD, plan, task đến test có khớp không;
- mỗi business rule và error flow đã có AC chưa.

Ở vòng này các tài liệu đã có. Câu hỏi bây giờ là chúng có nối được với nhau không: một tính năng có lần được từ giá tới test không, một thay đổi ở PRD có biết phải sửa những đâu không.

"Chuẩn yêu cầu" ở đây là mục "Chuẩn yêu cầu" của [consistency.md](consistency.md), [prd.md](prd.md) và [github.md](github.md).

## Các bước

1. **Nếu nhóm có feedback vòng 1** (issue của giảng viên hoặc bản review r1 trước đó): điểm qua từng issue, đã xử lý chưa, xử lý ở đâu. Ghi nhận những chỗ đã sửa tốt. Lỗi lớn của vòng 1 mà vẫn còn thì đặt lên đầu.
2. **Chuỗi nối:** chạy [consistency.md](consistency.md) cho 3 tính năng quan trọng. Đây là phần chính của vòng này. In một bảng chuỗi gộp.
3. **Rule và error flow có AC:** chạy bước 3–5 của [prd.md](prd.md) cho ít nhất 5 FR ở các module khác nhau. Chỉ in những dòng BR/Error chưa có AC.
4. **Mã và liên kết:** kịch bản test có ghi mã AC hoặc NFR không; hạng mục báo giá có ghi module hoặc FR không; parent task có ghi FR và `MS-xx` không; `M01` và `MS-01` có bị dùng lẫn không.
5. **Ma trận truy vết:** có khớp với nơi gốc không? Còn dòng trống không?
6. **GitHub khớp kế hoạch:** bước 1–4 của [github.md](github.md).

## Chọn góp ý

"Cần bổ sung": tối đa 7 mục. Ưu tiên chỗ đứt chuỗi, rule hay error flow chưa có AC, và FR thiếu hẳn một mục của mẫu FR.

"Để vòng sau": những chỗ thuộc hoàn thiện (độ sâu nội dung, format, cách trình bày), mỗi chỗ một dòng.

Cuối bản review, gợi ý nhóm: sau khi sửa, chạy lại `/spm-review consistency` cho đúng những tính năng vừa sửa.
