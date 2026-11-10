# Review: Mục lục và cấu trúc repo

Tìm: mục lục của nhóm (`docs/README.md`, hoặc `README.md` ở gốc repo nếu nhóm dùng nó làm mục lục), cây thư mục của repo.

## Vì sao quan trọng

Mục lục là cửa vào của toàn bộ tài liệu. Khách hàng, giảng viên hay thành viên mới đều bắt đầu từ đây. Theo chuẩn, nội dung không có trong mục lục và không tìm được thì **không được tính**, dù nhóm đã viết. Một mục lục tốt cũng buộc nhóm trả lời: mỗi thông tin nằm ở đâu, nơi nào là gốc.

## Chuẩn yêu cầu

- Có mục lục (`docs/README.md`). Nhóm dùng file khác làm mục lục mà chỉ đúng vị trí thì vẫn dùng được; không đề nghị nhóm đổi thư mục.
- Mục lục nêu thứ tự đọc và vị trí của scope, nguồn lực, rủi ro, change request, Definition of Done.
- Tên file và thư mục được khác chuẩn nếu có lý do, nhưng mục lục phải chỉ đúng.
- Không để file rỗng. Phần không áp dụng ghi `N/A` kèm lý do.
- Mỗi thông tin chỉ có một nơi gốc, nơi khác dẫn lại bằng mã.
- Phần mô phỏng (client, feedback, báo cáo, CR) ghi rõ `Mô phỏng`.

## Các bước kiểm

1. Mở từng link trong mục lục. Link nào hỏng hoặc trỏ tới file khác nội dung?
2. Liệt kê mọi tài liệu trong repo (`.md`, `.docx`, `.xlsx`, `.pdf`). File nào mục lục không nhắc tới? File quản lý dự án nằm ngoài thư mục tài liệu (ở gốc repo, thư mục lạ) cũng tính.
3. Mục lục có chỉ được vị trí cụ thể (file và mục) của: scope, nguồn lực, rủi ro, change request, Definition of Done? "Xem thư mục 08" là chưa đủ cụ thể nếu thư mục đó có nhiều file.
4. Thứ tự đọc có hợp lý cho người mới không: bài toán và phạm vi → yêu cầu → giá và kế hoạch → cách làm việc?
5. File nào rỗng, chỉ còn dòng hướng dẫn của bộ khung, hoặc chỉ có tiêu đề?
6. Có tài liệu trùng nhau không (hai bản PRD, hai bản kế hoạch, thư mục `v1`, `v2`, `old`)? Bản nào là bản đang dùng?
7. Phần nào là mô phỏng đã được ghi rõ chưa?

## Câu hỏi để nhóm tự trả lời

- Một người chưa biết gì về dự án, chỉ đọc mục lục, có tìm được giá dự án và lý do chia milestone trong 2 phút không?
- Nếu hai tài liệu nói khác nhau về cùng một thông tin, tài liệu nào là gốc?
- Còn tài liệu nào trong repo mà chính nhóm cũng không chắc có còn dùng không?

## Chỗ hay bị sót

- Không có mục lục, hoặc mục lục chỉ có giới thiệu chung và cây thư mục, không chỉ vị trí từng nội dung.
- Tài liệu quản lý (Team Charter, Quality, ngân sách) để ở gốc repo, mục lục không nhắc.
- Link trỏ tới file ngoài repo (Google Drive, máy cá nhân) mà không có bản trong repo.
- Giữ nhiều phiên bản song song (`docs/`, `docs_v2/`) mà không nói bản nào đang dùng.
