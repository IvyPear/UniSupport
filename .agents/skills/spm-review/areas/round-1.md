# Review theo vòng 1: lỗi lớn

Dùng trước vòng feedback 1. Theo chuẩn, vòng 1 tập trung vào **lỗi lớn**:

- hiểu sai bài toán;
- thiếu tài liệu;
- milestone không giao được phần chạy được (trong kế hoạch);
- mâu thuẫn lớn về giá hoặc kế hoạch.

Ở vòng này chưa cần soi chi tiết từng AC hay cách trình bày. Mục tiêu là cái khung lớn của dự án đứng vững: đúng bài toán, đủ tài liệu, giá và kế hoạch không tự mâu thuẫn.

"Chuẩn yêu cầu" ở đây là mục "Chuẩn yêu cầu" của các file hạng mục được nhắc tới.

## Các bước

1. **Mục lục:** chạy nhanh các bước 1–3 của [index.md](index.md).
2. **Bài toán:** đọc phần bài toán trong proposal và phần tổng quan sản phẩm. Đối chiếu với đề bài của môn nếu nhóm có để trong repo, hoặc hỏi nhóm dán đề bài. Không có đề bài thì không dừng chờ: ghi vào "Chưa chắc", chỉ kiểm bài toán có nhất quán giữa các tài liệu không, rồi làm tiếp.
3. **Đủ tài liệu:** đi qua bảng "Nội dung tối thiểu" của chuẩn. Ở vòng này chỉ cần biết từng phần **đã có hay chưa**: proposal, báo giá, PRD, master plan, rủi ro, GitHub, team charter, quality, product, quản trị. Phần có tiêu đề mà chưa có nội dung thì tính là chưa có.
4. **Milestone:** với từng milestone trong kế hoạch, hỏi "theo kế hoạch, sau milestone này client tự dùng thử được gì?" (bước 2 của [plan.md](plan.md)).
5. **Giá và kế hoạch có mâu thuẫn lớn không:**
   - tổng giá có giống nhau ở mọi nơi nhắc tới không;
   - danh sách và ngày milestone có giống nhau giữa proposal, kế hoạch và GitHub không;
   - tổng nguồn lực có đủ cho tổng effort không. Đội thực thi là giả định, nên nguồn lực theo vai trò là hợp lệ; được cộng số giờ đã có để kiểm.

## Chọn góp ý

"Cần bổ sung": chỉ những gì thuộc 4 nhóm lỗi lớn ở trên, tối đa 7 mục. Mục lục thiếu, hoặc không chỉ tới tài liệu đang có, tính vào nhóm "thiếu tài liệu" (nhãn `thiếu` hoặc `ẩn`). Vòng này nên dùng mẫu gọn: được bỏ dòng "Tác động" khi nó lặp lại "Vấn đề".

"Để vòng sau": những chỗ chuẩn có yêu cầu nhưng chi tiết hơn, mỗi chỗ một dòng. Ví dụ: mẫu FR thiếu mục, mã AC chưa lần được, Excel chưa dùng công thức, Gantt tô tay, parent task thiếu owner hay hạn.

Cuối bản review, gợi ý nhóm: sau khi sửa xong các lỗi lớn, chạy `/spm-review prd` và `/spm-review plan` để bắt đầu làm kỹ từng phần trước vòng 2.
