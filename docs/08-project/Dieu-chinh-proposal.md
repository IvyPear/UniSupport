# BÁO CÁO ĐIỀU CHỈNH KẾ HOẠCH TRIỂN KHAI DỰ ÁN (PROPOSAL)

## 1. THÔNG TIN CHUNG
- **Tên dự án:** Hệ thống quản lý hỗ trợ sinh viên UniSupport.
- **Khách hàng:** Ban Giám hiệu – Aurora University.
- **Đơn vị triển khai:** Nhóm 4.
- **Ngày cập nhật:** 31/10/2026.

## 2. LÝ DO VÀ MỤC ĐÍCH ĐIỀU CHỈNH
Việc điều chỉnh cấu trúc Timeline và các cột mốc (Milestone) trong Proposal nhằm mục đích tối ưu hóa chất lượng dự án và giảm thiểu tối đa các rủi ro trong quá trình triển khai. Sự phân bổ lại các giai đoạn giúp cấu trúc hóa khối lượng công việc rời rạc thành các nhóm liền mạch, từ đó đảm bảo quá trình kiểm soát chất lượng được thực hiện chặt chẽ tại từng mốc, đồng thời giúp Ban Giám hiệu thuận tiện hơn trong việc theo dõi, phối hợp và đánh giá dự án.

Đơn vị triển khai cam kết việc điều chỉnh này chỉ mang tính chất cơ cấu lại cách quản lý lộ trình, hoàn toàn không làm thay đổi tiến độ tổng thể cũng như ngân sách đã thống nhất.

## 3. CHI TIẾT HẠNG MỤC THAY ĐỔI

> Đây là baseline milestone hiện hành của dự án. Proposal ban đầu được lưu tại [Proposal.md](Proposal.md) để đối chiếu lịch sử.

Lộ trình triển khai được tái cấu trúc thành 5 giai đoạn chính bằng cách tích hợp các tính năng có tính liên kết cao, thay cho việc liệt kê theo tuần đơn lẻ, giúp duy trì luồng công việc liên tục và tối ưu nguồn lực.

| Cột mốc | Thời gian | Nội dung hoàn thành & Bàn giao |
| :--- | :---: | :--- |
| **MS-00 – Khởi động** | Tuần 1 – 3<br>*(01/09 – 18/09)* | - Khảo sát quy trình nghiệp vụ & hoàn thiện tài liệu đặc tả yêu cầu.<br>- Thiết kế kiến trúc tổng thể, cơ sở dữ liệu và khởi tạo hạ tầng kỹ thuật (`INF-01`).<br>- Hoàn thiện bản mẫu giao diện tương tác (**Interactive Prototype**) cho cả 4 vai trò để khách hàng duyệt luồng màn hình và khóa phạm vi thiết kế.<br>*(Lưu ý: Module M01 bắt đầu triển khai từ MS-01)*. |
| **MS-01 – Nền tảng** | Tuần 4 – 6<br>*(21/09 – 14/10)* | - Phát triển phân hệ nền tảng: Đăng nhập & Xác thực (`M01`), Vai trò & Phân quyền (`M02`), Quản lý tài khoản (`M03`).<br>- **Kiểm thử & Khách hàng test (08/10 – 14/10):** QA/QC thực hiện kiểm thử Đợt 1 và phối hợp khách hàng trực tiếp dùng thử, nghiệm thu sơ bộ giai đoạn nền tảng. |
| **MS-02 – Ticket và Phân hệ sinh viên** | Tuần 7 – 11<br>*(12/10 – 13/11)* | - Khởi động Module `M04` (Quản lý danh mục) từ **12/10**, gối đầu (overlap) có chủ đích 3 ngày (12/10 – 14/10) với giai đoạn kiểm thử MS-01 để tối ưu thời gian chờ.<br>- Triển khai trọn vẹn quy trình vòng đời Ticket (`M04`–`M11`) và phân hệ sinh viên.<br>- Kiểm thử QA/QC Đợt 2 & Đợt 3. |
| **MS-03 – Giám sát Dashboard** | Tuần 12 – 14<br>*(16/11 – 04/12)* | - Giám sát tiến độ và cảnh báo chậm hạn SLA thời gian thực (`M12`).<br>- Dashboard thống kê và xuất báo cáo điều hành dành cho cấp quản lý (`M13`).<br>- Kiểm thử QA/QC Đợt 4. |
| **MS-04 – Bàn giao dự án** | Tuần 15 – 16<br>*(07/12 – 18/12)* | - Kiểm thử nghiệm thu người dùng toàn diện (UAT toàn trình).<br>- Đóng gói sản phẩm, hoàn thiện bộ tài liệu kỹ thuật & tài liệu hướng dẫn vận hành.<br>- Chuyển giao hệ thống chính thức lên môi trường Production và ký biên bản bàn giao. |

### Cơ chế nghiệm thu tại Mốc khởi động (MS-00) và Kế hoạch gối đầu (Overlap):
- **Phạm vi và nghiệm thu MS-00:** Cột mốc `MS-00` chỉ tập trung vào khảo sát nghiệp vụ, hoàn thiện tài liệu đặc tả, thiết kế cơ sở dữ liệu/hạ tầng nền tảng và bàn giao bản mẫu giao diện tương tác (**Interactive Prototype**). Khách hàng trực tiếp thao tác duyệt luồng màn hình của 4 vai trò trên Prototype để chính thức khóa phạm vi thiết kế (Scope Baseline). Module Đăng nhập & Xác thực (`M01`) chính thức bắt đầu thực hiện lập trình tại cột mốc `MS-01`.
- **Lịch trình kiểm thử MS-01 và Gối đầu MS-02:**
  - Cột mốc `MS-01` kéo dài từ **21/09 đến 14/10/2026**, trong đó giai đoạn từ **08/10 đến 14/10/2026** được bố trí riêng cho công tác kiểm thử QA/QC Đợt 1 và khách hàng trực tiếp kiểm thử (test) nghiệm thu sơ bộ.
  - Cột mốc `MS-02` bắt đầu từ ngày **12/10/2026** với module Quản lý danh mục (`M04`), tạo nên khoảng gối đầu (overlap) có chủ đích 3 ngày (từ 12/10 đến 14/10/2026). Việc overlap này giúp đội ngũ phát triển chủ động khởi tạo trước cây danh mục tĩnh, tránh lãng phí thời gian chờ trong khi đội ngũ QA và khách hàng đang thực hiện kiểm thử trên môi trường `MS-01`.

## 4. CAM KẾT VỀ MỨC ĐỘ ẢNH HƯỞNG ĐẾN DỰ ÁN
Đội ngũ dự án đánh giá và cam kết việc cập nhật kế hoạch trên sẽ giữ nguyên các tiêu chuẩn cốt lõi của dự án:
- **Tiến độ và thời hạn bàn giao:** Không thay đổi. Mặc dù cấu trúc tuần được tối ưu lại để quy trình kiểm thử diễn ra sớm hơn, dự án vẫn đảm bảo hoàn thành và bàn giao đúng thời hạn cuối cùng (Deadline) đã thống nhất.
- **Ngân sách:** Không thay đổi. Giữ nguyên mức chi phí dự kiến là 300.000.000 VNĐ.
- **Phạm vi công việc (Scope of Work):** Không thay đổi. Toàn bộ các tính năng và sản phẩm bàn giao (Deliverables) được đảm bảo nguyên vẹn như thỏa thuận ban đầu.

## 5. KẾT LUẬN
Bản cập nhật Proposal này được thực hiện nhằm hướng tới mục tiêu tối ưu hóa chất lượng sản phẩm đầu ra và giảm thiểu rủi ro phát sinh trong quá trình phối hợp. Việc gom nhóm các công việc thành các giai đoạn lớn không chỉ giúp kiểm soát chất lượng chặt chẽ mà còn tối ưu hóa thời gian thực thi của đội ngũ. Kính mong Ban Giám hiệu xem xét và thông qua sự điều chỉnh này để dự án UniSupport tiếp tục được triển khai một cách an toàn, chuyên nghiệp và thuận lợi nhất.