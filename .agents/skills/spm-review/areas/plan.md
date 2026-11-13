# Review: Master Plan và rủi ro

Tìm theo mục lục của nhóm. Vị trí trong bộ khung: `docs/08-project/master-plan.xlsx` (sheet Milestones, WBS, Resources, Gantt, Change log), `master-plan.md`, `risk-register.md`.

## Vì sao quan trọng

Kế hoạch trả lời: giao gì, khi nào, ai làm, và nếu có chuyện thì sao. Milestone chia theo tầng kỹ thuật ("làm xong database", "làm xong API") khiến khách không dùng thử được gì cho tới cuối dự án, và phát hiện sai thì đã muộn. Kế hoạch không chừa năng lực cho thay đổi thì CR đầu tiên sẽ làm trễ mọi thứ phía sau.

## Chuẩn yêu cầu

- Milestones, WBS, Resources, Gantt, Change log; một trang giải thích cách chia milestone. Các phần này có thể nằm ở file hoặc sheet tên khác, miễn mục lục chỉ tới.
- Mỗi milestone hướng đến một phần phần mềm chạy được để client tự dùng thử, không phải chỉ tài liệu hoặc một tầng kỹ thuật; nên chia theo workflow. Milestone `MS-xx` ghi phần giao được và điều kiện nghiệm thu.
- Có phụ thuộc, nguồn lực, rủi ro.
- Kế hoạch có regression test trước mỗi lần bàn giao; kế hoạch nên chừa năng lực cho change request.
- Gantt vẽ từ ngày, không tô tay. Khi CR được duyệt, ghi phiên bản mới vào Change log, không ghi đè.
- **Rủi ro:** mô tả, khả năng xảy ra, tác động, owner, phương án, trạng thái.

## Hướng tới

Có cách client kiểm tra, cách nhận feedback, năng lực dự phòng; rủi ro phần mềm có owner và phương án.

## Các bước kiểm

1. Có đủ 5 phần Milestones, WBS, Resources, Gantt, Change log và trang giải thích cách chia milestone chưa?
2. **Từng milestone:** theo kế hoạch, sau milestone này client tự làm được việc gì trên phần mềm? Nếu câu trả lời là "chưa làm được gì" hoặc "xem tài liệu" thì milestone đó đang chia theo tầng kỹ thuật hoặc chỉ giao tài liệu.
3. Mỗi milestone có điều kiện nghiệm thu kiểm được và cách client kiểm tra không?
4. **Chỉ một bộ mốc:** danh sách và ngày milestone có giống nhau ở proposal, kế hoạch, GitHub và các tài liệu khác không?
5. **WBS:** mỗi dòng có milestone, liên kết tới báo giá hoặc FR (bộ khung dùng `Q-xx`; nhóm dùng cách khác lần được cũng được), effort, owner, ngày không? Có việc cho tích hợp, test, regression, sửa lỗi không? Tích hợp có bị dồn hết vào milestone cuối không?
6. **Resources:** tổng giờ nguồn lực có đủ cho tổng effort không, có ai bị giao quá sức không? Đội thực thi là giả định: vai trò, số người, giờ mỗi tuần đã khai báo rõ và ghi `Mô phỏng` chưa? Không đòi gắn vai trò thực thi cho thành viên nhóm (thành viên nhóm là ban quản lý). Được cộng số giờ đã có để kiểm.
7. **Gantt:** vẽ từ ngày trong ô hay tô màu tay? Có phụ thuộc giữa các việc không?
8. **Dự phòng:** effort cho test, regression, sửa lỗi đã nằm trong WBS và báo giá chưa (đây là việc biết trước)? Phần chừa cho CR và rủi ro (việc chưa biết trước) là bao nhiêu, nằm ở đâu, có bị tính trùng với effort sửa lỗi không?
9. **Change log:** có dòng phiên bản đầu tiên không? Kế hoạch đã đổi mà Change log không có dòng nào là chỗ cần bổ sung.
10. **Rủi ro:** có đủ 6 thông tin không? Có rủi ro phần mềm thật của dự án (tích hợp, dữ liệu, hiệu năng, phụ thuộc bên ngoài, thiếu người) hay chỉ rủi ro chung chung? Owner có cụ thể không (một thành viên ban quản lý hoặc một vai trò)? Phương án có làm được không?

## Câu hỏi để nhóm tự trả lời

- Theo kế hoạch, sau milestone đầu tiên client mở phần mềm và làm được gì?
- Nếu milestone 2 trễ một tuần, những gì phía sau bị ảnh hưởng?
- Rủi ro nào dễ xảy ra nhất, ai theo dõi, dấu hiệu nào cho biết nó đang xảy ra?

## Chỗ hay bị sót

- Không có Master Plan, chỉ có vài bảng rời rạc ở các tài liệu khác nhau.
- Hai hoặc nhiều bộ mốc khác nhau giữa proposal, lịch trình và GitHub.
- Thiếu phần giao và điều kiện nghiệm thu cho từng milestone; thiếu Change log.
- Gantt tô màu bằng tay.
- Toàn bộ tích hợp hệ thống dồn vào milestone cuối.
- Dự phòng tính hai lần (đã có trong effort, lại cộng thêm phần trăm vào giá) mà không giải thích.
- Sổ rủi ro không có trong repo, hoặc rủi ro chung chung, owner là "cả nhóm".
