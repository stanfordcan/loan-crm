# loan-crm 開發須知（精簡版；完整規範見 交接報告_Cowork.md）

**每次開工先讀 `協作板.md`**——那是與 Cowork 的留言板；對方可能留了待辦或狀況更新。要告知/交接給 Cowork 的事寫進去（新留言放最上面），不要請業主人肉轉貼。

業主是民間二胎放款業務、**非工程師**：溝通一律白話中文、先講結論、少術語。他說「先回答我再動手」＝只回計畫、不改碼。

## 架構
- 單一 HTML（~5900 行，JS/CSS 內嵌）：`index.html`＝正式版、`index-test.html`＝測試版。GitHub Pages 部署（push 即上線）。
- 資料在 Firebase Firestore（gzip 壓縮前綴 `GZ:`，單文件 1MB 上限）＋localStorage；試算表同步是舊機制，別動。

## 改版鐵則
1. 只改 `index-test.html`，改完 bump `APP_VERSION`（`🧪測試版 tNN (白話說明) YYYY.MM.DD`，tNN 遞增）。
2. 驗證必跑：`node dev/check-syntax.js index-test.html`＋`node dev/test.js`（18項）。大改動用 `node dev/backup-audit.js <備份.json>` 壓測。
3. commit 結尾：`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`。push 後提醒業主 Ctrl+Shift+R（iPhone 用 Safari 無痕）。
4. 業主說「上正式」才搬：整份 test 複製成 index.html，**只改版本行**成 `YYYY.MM.DD #N`（同日遞增、跨日回 #1）；版本行取代用貪婪 `/const APP_VERSION = '.*';/`（字串內有分號，非貪婪會弄壞檔案）；搬完 `diff` 確認只差那一行。
5. 中文 regex 的行 Edit 工具常比對不到 → 改用 Python（UTF-8）替換。
6. 匯入邏輯原則「只補空白」：電話/備註/分類(heatManual)/手改姓名永不覆蓋。serial 流水編號只補不改。

## 地雷區（動之前先讀交接報告 §5）
比對順序（完整證→電話→建號→地址）、hasFen（全部1分之1不算持分）、clearlyDifferentPerson、
信託（塗銷=原屋主；未塗銷=抓委託人、不帶受託人證號）、義務人補本名（regex 容忍空白）、
buildShare 只乘建物坪（土地填已算持分）、共同持分人 bldKeys（建號要帶段）、金額 銀/法÷1.2 民間原值。

## 環境
Python 用全路徑 `C:\Users\USER\AppData\Local\Programs\Python\Python312\python.exe`（PATH 的 python 是廢 stub）；Node 可直接用；PowerShell 5.1（無 `&&`、.ps1 要 UTF-8 BOM）。
