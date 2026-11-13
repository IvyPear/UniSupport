# Review: Proposal và báo giá

Tìm theo mục lục của nhóm. Vị trí trong bộ khung: `docs/08-project/proposal.docx`, `docs/08-project/quotation.xlsx`, `docs/08-project/sent/`, `assumptions.md`, `constraints.md`.

## Vì sao quan trọng

Proposal là cam kết đầu tiên với khách: làm gì, không làm gì, bao lâu, bao nhiêu tiền, nghiệm thu thế nào. Báo giá là cơ sở của con số đó. Giá không suy ra được từ effort thì nhóm không bảo vệ được giá khi khách mặc cả, và cũng không biết dự án lỗ hay lãi khi phạm vi đổi.

## Chuẩn yêu cầu

- **Proposal:** bài toán, giải pháp, phạm vi làm và không làm, giả định, timeline tổng, giá, điều kiện nghiệm thu.
- **Báo giá:** hạng mục `Q-xx`, phạm vi, effort, đơn giá, tổng tiền, công thức. Effort gồm cả tích hợp, test, triển khai, sửa lỗi. Mỗi `Q-xx` ghi module hoặc FR thuộc hạng mục.
- Giá tính được từ effort.
- Proposal là Word, kèm PDF khi gửi. Bản đã gửi lưu trong `sent/`, có phiên bản và ngày.
- Excel: số liệu nằm trong ô dữ liệu, tổng là công thức.

## Hướng tới

Giả định ảnh hưởng giá được nêu rõ; khách đủ thông tin để quyết định.

## Các bước kiểm

1. Proposal có đủ 7 phần ở trên không? Phần "không làm" có cụ thể không, hay chỉ một câu chung?
2. Bài toán có nói rõ ai đang gặp vấn đề gì, hiện xử lý ra sao, vì sao cần hệ thống mới không? Hay chỉ mô tả tính năng?
3. Báo giá có mã `Q-xx` cho từng hạng mục, và mỗi hạng mục ghi module hoặc FR không?
4. **Lần ngược con số:** tổng giá trong proposal có bằng tổng báo giá không? Tổng báo giá có ra từ effort × đơn giá bằng công thức không? Có chỗ nào gõ tay con số tổng không? Bạn được tự cộng để kiểm, và ghi phép cộng làm bằng chứng; không đề xuất con số mới.
5. Effort có các phần tích hợp, test, triển khai, sửa lỗi không? Hay chỉ có effort "code tính năng"?
6. Timeline tổng trong proposal có khớp danh sách và ngày milestone trong kế hoạch không?
7. Điều kiện nghiệm thu có kiểm được không, có dẫn tới AC cụ thể không?
8. Có bản đã gửi trong `sent/` với phiên bản và ngày không? Khách là mô phỏng thì đã ghi `Mô phỏng` chưa?
9. (Gợi ý, không phải yêu cầu của chuẩn) Đơn giá và effort có ghi căn cứ ước lượng không? Chi phí nội bộ và giá bán có tách rõ không?

## Câu hỏi để nhóm tự trả lời

- Khách đề nghị giảm giá 20%: nhóm bỏ hạng mục `Q-xx` nào, và phạm vi đổi ra sao?
- Hạng mục tốn effort nhiều nhất được ước lượng thế nào? Nếu sai 30% thì sao?
- Nếu giả định quan trọng nhất sai, giá và timeline đổi thế nào?

## Chỗ hay bị sót

- Không có báo giá theo hạng mục; chỉ có bảng ngân sách nhân sự theo tháng.
- Giá bán không suy ra được từ chi phí hay effort, hoặc chênh lệch lớn mà không giải thích.
- Hai con số giá khác nhau ở hai tài liệu.
- Effort chỉ có phần phát triển, không có tích hợp, test, triển khai, sửa lỗi.
- Timeline trong proposal dùng bộ mốc khác với kế hoạch.
