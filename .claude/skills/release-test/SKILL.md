---
name: release-test
description: 出測試版——loan-crm 改完 index-test.html 後的標準發版流程（bump tNN、驗證、commit、push、提醒業主）。使用者說「出測試版」「推測試」「推上去」或一段修改完成要發佈時使用。
---

# 出測試版流程

1. 確認這次只改了 `index-test.html`（及必要的附屬檔）。
2. Bump 版本：搜 `const APP_VERSION`，改成 `🧪測試版 tNN (白話說明這次改了什麼) YYYY.MM.DD`
   - tNN ＝ 上一版 +1；說明寫給非工程師業主看的白話。
   - 版本行取代一律用貪婪 regex `/const APP_VERSION = '.*';/`（字串內含分號，非貪婪會把檔案改壞）。
3. 驗證（缺一不可）：
   - `node dev/check-syntax.js index-test.html` → 語法 0 錯誤
   - `node dev/test.js` → 18/18 通過
   - 這次改動有對應的邏輯？先寫小測試抽函式驗過（參考 dev/backup-audit.js 的抽取手法）。
   - 大改動／動到匯入比對：用業主給的備份 JSON 跑 `node dev/backup-audit.js <備份.json>`。
4. `git pull` → `git add index-test.html`（別把 CRLF 髒檔一起帶進去）→ commit：
   - 標題 `tNN: 一句話`，內文講清楚原因與做法。
   - 結尾固定：`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
5. `git push`，成功後告訴業主：測試版 **Ctrl+Shift+R**（iPhone 用 Safari 無痕視窗），版本會顯示 tNN，並用白話列「這次改了什麼、要測哪裡」。
