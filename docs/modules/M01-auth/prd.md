# SƠ ĐỒ LUỒNG QUY TRÌNH - PHÂN HỆ TÀI KHOẢN (AUTH)

```text
 [Nhập Mã Định danh & Mật khẩu FR-AUTH-01] ──► [Xác thực Hệ thống & Kiểm tra BR-01]
                                                        │
                                    ┌───────────────────┴───────────────────┐
                                    ▼                                       ▼
                       [Sai > 5 lần: Khóa 15 phút]             [Đăng nhập Thành công]
                                                                            │
                                                                            ▼
                                                             [Truy cập Dashboard theo Vai trò]
                                                                            ▲
                                                                            │
 [Admin Upload File Excel/CSV FR-AUTH-02] ──► [Kiểm tra Định dạng & Cấu trúc]
                                                        │
                                                        ▼
                                       [Tạo mới TK Mặc định / Cập nhật Hồ sơ]
```
