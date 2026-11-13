# Review: PRD

Tìm theo mục lục của nhóm. Vị trí trong bộ khung: `docs/01-product/`, `docs/03-modules/*/prd.md`, `docs/05-non-functional-requirements/`, `docs/06-acceptance/`.

Có thể giới hạn một module: `/spm-review prd <module>` (mã module, tiền tố FR như `STU`, hoặc tên thư mục). Khi đó chỉ làm bước 2–6 và 8–9 cho FR của module đó; bỏ qua bước 1 và 7.

## Vì sao quan trọng

PRD là thỏa thuận về "thế nào là xong". Dev dựa vào đó để làm, tester dựa vào đó để kiểm, khách dựa vào đó để nghiệm thu. FR thiếu error flow thì lỗi không ai lường trước; AC không kiểm được thì nghiệm thu thành tranh cãi; thiếu priority thì khi trễ hạn không biết bỏ gì trước.

## Chuẩn yêu cầu

- Vấn đề, actor, goals và non-goals, FR theo mẫu, NFR đo được, AC test được.
- **Mẫu FR (9 mục):** Mô tả, Actor, Priority, Preconditions, Luồng chính, Business Rules, Alternative và Error Flows, Acceptance Criteria, ví dụ Edge Case.
- Mỗi business rule và error flow cần ít nhất một AC.
- Mỗi FR, AC, NFR, kịch bản test có mã riêng; kịch bản test ghi mã AC hoặc NFR mà nó kiểm. Dạng mã trong chuẩn (`FR-STU-02`, `FR-STU-02/AC-04`, `NFR-PERF-01`, `TS-05`) là ví dụ: nhóm dùng dạng khác mà mã duy nhất và lần được thì chỉ nêu ở "Gợi ý thêm".
- Có kịch bản test cho các AC của toàn dự án.

## Hướng tới

Ưu tiên hợp lý; phạm vi khớp goals và non-goals.

## Các bước kiểm

1. **Phần đầu PRD:** vấn đề, actor, goals, non-goals có cụ thể cho dự án này không?
2. **Đếm và lấy mẫu FR:** liệt kê số FR theo module. Đọc kỹ ít nhất 5 FR ở các module khác nhau, trong đó có FR quan trọng nhất.
3. **Với mỗi FR mẫu**, kiểm đủ 9 mục của mẫu FR. Mục có tiêu đề nhưng nội dung trống hoặc chung chung tính là thiếu. Lỗi lặp lại ở mọi FR thì gộp một mục ("x/y FR chưa có Priority và Edge Case").
4. **BR/Error → AC** cho từng FR mẫu: mỗi business rule, mỗi error flow có AC nào kiểm nó? Chỉ in những dòng chưa có AC. Error flow chưa có mã riêng thì gọi theo nội dung; có thể gợi ý nhóm đánh mã cục bộ (BR-01, E-01).
5. **AC test được không:** mỗi AC có điều kiện, dữ liệu, kết quả mong đợi cụ thể (con số, trạng thái, thông báo)? Câu "hệ thống phản hồi nhanh", "giao diện thân thiện", "từ chối" không kèm kết quả cụ thể là chưa test được.
6. **Priority:** có không, có lý do không, có khớp goals không? Mọi FR đều "High" cũng là chưa có ưu tiên.
7. **NFR:** có mã, có ngưỡng đo và cách đo không? Nằm ở một nơi gốc hay rải trong tài liệu kỹ thuật?
8. **Kịch bản test:** mỗi kịch bản có ghi mã AC hoặc NFR không? AC nào của FR mẫu chưa có kịch bản?
9. **Phạm vi:** có FR nào nằm ngoài goals, hay mâu thuẫn non-goals? Có FR nào mâu thuẫn FR khác về thời hạn, giới hạn, trạng thái?

## Câu hỏi để nhóm tự trả lời

- Với FR quan trọng nhất, người dùng làm sai thì hệ thống phản ứng thế nào? Đã có AC cho tình huống đó chưa?
- Nếu chỉ kịp làm một nửa số FR của một milestone, nhóm bỏ FR nào trước? PRD có thể hiện điều đó không?
- Tester chưa từng nói chuyện với nhóm, chỉ đọc AC, có viết được test không?

## Chỗ hay bị sót

- FR chỉ có mô tả và luồng chính; thiếu Priority, Alternative, Edge Case.
- Error flow là một khối chung chép y nguyên ở mọi FR, không riêng cho FR đó.
- Error flow có nhưng không có AC nào kiểm nó.
- NFR viết bằng tính từ ("nhanh", "an toàn") hoặc ghi "chưa có ngưỡng".
- Kịch bản test chỉ trỏ tới FR, không trỏ tới AC, nên không biết AC nào đã được test.
- File test, ma trận truy vết có tiêu đề nhưng rỗng.
