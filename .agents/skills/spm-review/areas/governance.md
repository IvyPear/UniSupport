# Review: Quản trị và giám sát

Tìm theo mục lục của nhóm. Vị trí trong bộ khung: `docs/11-governance/` (reporting, monitoring, change-control).

## Vì sao quan trọng

Quản trị trả lời: ai biết gì, khi nào, và khi lệch kế hoạch thì ai hành động. Không có ngưỡng escalate thì vấn đề chỉ được báo khi đã muộn. Không có quy trình CR thì mỗi yêu cầu thay đổi là một cuộc cãi nhau, và tài liệu lệch nhau dần.

## Chuẩn yêu cầu

- Ai báo cáo gì, cho ai, khi nào; chỉ số theo dõi; ngưỡng escalate; quy trình change request; CR có người duyệt.
- Change request `CR-xx` là GitHub Issue, ghi tài liệu và task đã cập nhật. Chưa có CR thật không bị trừ nếu quy trình rõ và áp dụng được.

## Hướng tới

Chỉ số theo dõi lấy được từ GitHub; có ngưỡng escalate; CR có đánh giá tác động và cập nhật đồng bộ.

## Các bước kiểm

1. Mỗi loại báo cáo có đủ: ai lập, gửi cho ai, khi nào, nội dung? Mẫu báo cáo có phần so kế hoạch đã chốt với tiến độ khi dự án chạy không? Không đòi số liệu thực tế.
2. Chỉ số theo dõi: lấy từ đâu, bằng cách nào (ví dụ bộ lọc issue)? Với cách nhóm đang dùng GitHub (assignee, milestone, nhãn), khi dự án chạy có đếm được chỉ số đó không?
3. Ngưỡng escalate: con số cụ thể nào thì escalate, tới ai?
4. Quy trình CR:
   - các bước;
   - đánh giá tác động lên phạm vi, effort, giá, timeline, rủi ro, test;
   - người duyệt cụ thể theo loại thay đổi;
   - danh sách tài liệu phải cập nhật đồng bộ;
   - ghi Change log.
5. Có mẫu issue cho CR không? CR thật (nếu có) có đi đúng quy trình không?
6. Báo cáo, CR mô phỏng có ghi `Mô phỏng` không?

## Câu hỏi để nhóm tự trả lời

- Giữa dự án, nhóm biết một milestone đang xanh, vàng hay đỏ bằng số liệu nào?
- Client muốn thêm một bước duyệt vào luồng chính sau `MS-01`. Đi qua quy trình CR của nhóm từng bước, tài liệu nào phải sửa?

## Chỗ hay bị sót

- Báo cáo có tần suất nhưng không rõ gửi cho ai.
- Chỉ số chung chung, không lấy được từ GitHub vì issue không có assignee, milestone hay nhãn.
- Không có ngưỡng escalate.
- Không có quy trình CR, hoặc người duyệt chỉ ghi "ban quản lý".
- CR, rủi ro, báo cáo để trên công cụ ngoài, repo không có.
