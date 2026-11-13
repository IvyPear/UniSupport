# Review: Nhất quán (chuỗi nối giữa các tài liệu)

Đối số: một mã FR hoặc tên tính năng, ví dụ `/spm-review consistency FR-STU-02`. Không có thì chọn 3 tính năng quan trọng nhất của PRD và nói rõ vì sao chọn.

## Vì sao quan trọng

Một dự án nhất quán là khi giá, effort, kế hoạch, task và test cùng kể một câu chuyện. Khi một mắt xích đứt, thay đổi ở một nơi không lan sang nơi khác: tính năng không được tính giá, task không có test, test không biết kiểm AC nào. Đây là phần cho thấy nhóm quản lý dự án thật hay chỉ viết từng tài liệu rời.

## Chuẩn yêu cầu

- Chuỗi: Proposal và báo giá → PRD → Master Plan → parent task → kịch bản test.
- Mỗi yêu cầu, việc, thay đổi có mã riêng. Liên kết chỉ khai báo ở một phía; phía nào ghi liên kết nào xem cột "Liên kết phải ghi" trong bảng quy ước mã của chuẩn.
- Ma trận truy vết tổng hợp theo từng AC (AC → Test → Parent task → Milestone → Báo giá), không phải nơi gốc để sửa.

## Hướng tới

Giá, effort, plan, task, test khớp nhau; quyết định kỹ thuật lớn phản ánh vào effort, rủi ro, timeline.

## Các bước kiểm

Với mỗi tính năng, đi từng mắt xích và ghi **có / thiếu / mâu thuẫn** kèm vị trí:

1. **Báo giá:** hạng mục `Q-xx` nào chứa FR hoặc module này? Effort bao nhiêu, có phần tích hợp, test không?
2. **PRD:** FR ở file nào, có những AC nào?
3. **Master Plan:** thuộc `MS-xx` nào, những dòng WBS nào? (Bộ khung nối WBS với `Q-xx`; nhóm nối cách khác lần được cũng được.) Tổng effort các dòng đó có khớp effort của hạng mục báo giá không? Ngày có nằm trong mốc không?
4. **GitHub:** parent task `#n` nào ghi mã FR này, cùng `MS-xx`, có owner, hạn, điều kiện hoàn thành? Nội dung task có khớp PRD không?
5. **Kịch bản test:** kịch bản nào ghi mã các AC này? AC nào chưa có kịch bản?
6. **Ma trận truy vết:** các dòng của tính năng này có khớp với những gì vừa lần được không?

Sau đó so thêm các con số dùng ở nhiều nơi: tổng giá (proposal so với báo giá), danh sách và ngày milestone (proposal, kế hoạch, GitHub), effort (báo giá so với WBS), số người (Resources so với Team Charter), thời hạn và giới hạn trong FR so với workflow, task, test. Bạn được tự cộng hoặc so để kiểm, và ghi phép tính làm bằng chứng.

## Cách trình bày thêm

Trước các mục góp ý, đặt **một** bảng chuỗi gộp cho các tính năng đã lần:

| Tính năng | Báo giá | PRD | Plan | Task | Test |
| --- | --- | --- | --- | --- | --- |
| `FR-…` | có / thiếu / mâu thuẫn | | | | |

Với mỗi chỗ đứt, nói rõ sửa ở **nơi gốc** nào (không sửa trong ma trận truy vết trước). Không tự sửa số liệu: giá, effort, ngày là quyết định của nhóm.

## Câu hỏi để nhóm tự trả lời

- Client bỏ tính năng này: những file nào, dòng nào phải sửa? Nhóm có tìm hết được bằng mã không?
- Một quyết định kỹ thuật lớn của nhóm (ví dụ tích hợp hệ thống ngoài) đã được tính vào effort, rủi ro và timeline ở đâu?

## Chỗ hay bị sót

- Chuỗi đứt ngay mắt đầu vì không có báo giá theo hạng mục.
- Proposal và kế hoạch dùng hai bộ mốc khác nhau.
- Task GitHub ghi thời hạn hoặc quy tắc khác PRD.
- Test trỏ tới FR, không trỏ tới AC.
- Ma trận truy vết thiếu cột báo giá, task, milestone; hoặc rỗng.
