# Master Plan

<!-- Hướng dẫn: trang giải thích đi kèm `master-plan.xlsx`. Số liệu (ngày, effort, nguồn lực) chỉ nằm trong Excel; trang này giải thích quyết định. -->

## Cách chia milestone

<!-- Vì sao chia và xếp thứ tự milestone như vậy. Mỗi milestone giao một phần phần mềm chạy được để client tự dùng thử (nên chia theo workflow), không phải chỉ tài liệu hay một tầng kỹ thuật. Phần giao, cách client kiểm tra và điều kiện nghiệm thu của từng MS-xx ghi ở sheet Milestones; ở đây chỉ dẫn mã và giải thích lý do. -->

## Phụ thuộc giữa các milestone

## Effort cho test, regression và sửa lỗi

<!-- Đây là việc đã biết trước, nên nằm trong WBS và báo giá như các việc khác. Ghi những dòng WBS và hạng mục Q-xx nào chứa phần này. -->

## Dự phòng cho thay đổi và rủi ro

<!-- Phần chừa cho việc chưa biết trước: CR, rủi ro xảy ra. Bao nhiêu giờ, nằm ở dòng WBS "Dự phòng" nào (sheet Resources tự tính tổng và tỷ lệ); có tính vào giá không, hay CR được báo giá riêng. Đừng tính trùng với effort sửa lỗi ở trên. -->

## Cách nhận feedback của client sau mỗi milestone

## Thay đổi kế hoạch

Kế hoạch đã chốt lưu trong `master-plan.xlsx`; mỗi CR được duyệt ghi một dòng vào sheet Change log (phiên bản, ngày, CR, thay đổi), không ghi đè.

Trước khi gửi proposal cho khách lần đầu, nhóm sửa kế hoạch và báo giá trực tiếp; lịch sử sửa nằm trong PR. Sửa theo feedback của giảng viên không phải là change request. Sau khi khách đã nhận proposal, thay đổi phạm vi, giá hoặc mốc do khách yêu cầu (thật hoặc `Mô phỏng`) mới đi qua CR và ghi Change log.
