# YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

> **Dự án:** UniSupport — System Helpdesk & Support
> **Nguồn:** Trích xuất từ tài liệu Kiến trúc Hệ thống

---

## 3. Quy Táº¯c Báº£o Máº­t & YÃªu Cáº§u Phi Chá»©c NÄƒng (NFR)

### 3.1 Báº£o máº­t & XÃ¡c thá»±c (Security & Authentication)

* **JWT (JSON Web Token):** XÃ¡c thá»±c ngÆ°á»i dÃ¹ng báº±ng Token ngáº«u nhiÃªn mÃ£ hÃ³a HS256/RS256, thá»i háº¡n 8 tiáº¿ng.
* **RBAC (Role-Based Access Control):** 4 mÃ£ vai trÃ² cá»‘ Ä‘á»‹nh `STUDENT`, `STAFF`, `MANAGER`, `ADMIN`; Admin Ä‘Æ°á»£c cáº¥u hÃ¬nh báº­t/táº¯t quyá»n chá»©c nÄƒng theo M02. Backend kiá»ƒm tra ma tráº­n quyá»n hiá»‡n hÃ nh vÃ  pháº¡m vi dá»¯ liá»‡u á»Ÿ tá»«ng yÃªu cáº§u, khÃ´ng dá»±a riÃªng vÃ o quyá»n cÅ© trong JWT.
* **CÆ¡ cháº¿ Closed-Loop (Há»‡ thá»‘ng Ä‘Ã³ng):**
  * KhÃ´ng cÃ³ endpoint/giao diá»‡n cho Ä‘Äƒng kÃ½ tá»± do (`No Self-Registration`).
  * Má»i tÃ i khoáº£n do Admin khá»Ÿi táº¡o thá»§ cÃ´ng hoáº·c Import Excel/CSV; khÃ´ng cÃ³ Ä‘Äƒng kÃ½ tá»± do.
  * ÄÄƒng nháº­p báº±ng mÃ£ Ä‘á»‹nh danh (`user_code`) vÃ  máº­t kháº©u; OTP khÃ´i phá»¥c qua Email chá»‰ Ã¡p dá»¥ng cho Admin. Khi Admin reset máº­t kháº©u ngÆ°á»i dÃ¹ng, há»‡ thá»‘ng báº¯t buá»™c ngÆ°á»i dÃ¹ng Ä‘á»•i máº­t kháº©u á»Ÿ láº§n Ä‘Äƒng nháº­p tiáº¿p theo.
* **KhÃ³a tÃ i khoáº£n tá»± Ä‘á»™ng (Brute-force protection):** Nháº­p sai máº­t kháº©u 5 láº§n liÃªn tiáº¿p sáº½ táº¡m khÃ³a tÃ i khoáº£n trong 15 phÃºt.

### 3.2 Táº£i & Hiá»‡u nÄƒng (Performance & SLA)

* **Thá»i gian pháº£n há»“i API (Latency):**
  * ÄÄƒng nháº­p / TÃ¬m kiáº¿m ticket / Gá»­i Ä‘Æ¡n: $< 500\text{ms}$.
  * BÃ¡o cÃ¡o thá»‘ng kÃª tá»•ng há»£p: $< 2000\text{ms}$.
* **Giá»›i háº¡n tá»‡p Ä‘Ã­nh kÃ¨m (File Attachment Limits):**
  * Tá»‘i Ä‘a $5\text{MB}$ / tá»‡p Ä‘Ã­nh kÃ¨m.
  * Chá»‰ cháº¥p nháº­n Ä‘á»‹nh dáº¡ng Ä‘Ã£ chá»‘t trong PRD: `.pdf`, `.docx`, `.png`, `.jpg`.
  * Kiá»ƒm tra MIME-type phÃ­a Server Ä‘á»ƒ cháº·n tá»‡p thá»±c thi Ä‘á»™c háº¡i (`.exe`, `.sh`, `.bat`, `.php`).

### 3.3 ToÃ n váº¹n dá»¯ liá»‡u (Data Integrity Constraints)

* **Tráº¡ng thÃ¡i Closed khÃ³a vÄ©nh viá»…n (No Reopen):** Khi Ticket chuyá»ƒn sang `CLOSED`, Database Ã¡p dá»¥ng Trigger / Constraint ngÄƒn cháº·n má»i cÃ¢u lá»‡nh `UPDATE` vÃ o ná»™i dung vÃ  káº¿t quáº£ ticket.
* **RÃ ng buá»™c hoÃ n táº¥t:** Cáº­p nháº­t tráº¡ng thÃ¡i `RESOLVED` báº¯t buá»™c pháº£i kÃ¨m theo vÄƒn báº£n giáº£i trÃ¬nh káº¿t quáº£ xá»­ lÃ½ (`resolution_notes IS NOT NULL AND resolution_notes != ''`).
* **Luá»“ng danh má»¥c "KhÃ¡c":** Ticket `NEW` trong hÃ ng chá» Admin Ä‘Æ°á»£c phÃ©p chÆ°a cÃ³ phÃ²ng ban. Admin xÃ¡c Ä‘á»‹nh phÃ²ng ban trÆ°á»›c khi Ä‘Æ°a vá» hÃ ng chá» nhÃ¢n viÃªn; viá»‡c Ä‘á»‹nh tuyáº¿n láº¡i khÃ´ng thay Ä‘á»•i mÃ£ Ticket.
* **ThÃ´ng bÃ¡o:** LÆ°u tráº¡ng thÃ¡i thÃ´ng bÃ¡o In-app vÃ  ngÆ°á»i nháº­n trong PostgreSQL, trÃ¡nh gá»­i hai thÃ´ng bÃ¡o trÃ¹ng nhau cho cÃ¹ng sá»± kiá»‡n tráº£ káº¿t quáº£ M08/M10.

