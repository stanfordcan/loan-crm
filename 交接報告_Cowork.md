# loan-crm 開發交接報告（給 Claude Cowork）

> 交接日期：2026/07/15。本文件為完整交接，讀完即可接手開發。
> 業主是民間二胎／不動產借款業務，**非工程師**——所有溝通一律用白話中文、少術語、講重點。

---

## 1. 專案是什麼

「客戶追蹤系統」：民間二胎放款業務的 CRM。管理客戶（借款人）、不動產（謄本資料）、抵押貸款金額、追蹤提醒、房價評估。單人使用為主，同公司同事各自有自己的一份（各自的 Google 帳號＋各自的 GAS）。

- **線上網址**：GitHub Pages（repo：`stanfordcan/loan-crm`）
  - 正式版：`index.html` → stanfordcan.github.io/loan-crm/
  - 測試版：`index-test.html` → 同網域 /index-test.html
- **本機 repo**：`C:\Users\USER\OneDrive\桌面\claude\loan-crm\`
- **架構**：單一 HTML 檔（~5700 行，CSS/JS 全內嵌），無後端伺服器、無框架、無建置流程。

## 2. 資料流（重要，別弄壞）

```
使用者操作 → saveLocal()
  ├─ localStorage（本機快取）
  └─ saveToFirestore()（真正的資料庫）
       ├─ users/{uid}.data      ← 主資料（gzip壓縮，前綴 "GZ:"）
       └─ users/{uid}/backups/latest.backup ← 雲端備份（同樣壓縮）
```

- **Firebase 專案**：`loan-crm-a60e0`。Auth＝email 登入；Firestore 規則已確認安全（只有本人讀寫自己的資料）。
- **⚠️ 1MB 上限**：Firestore 單文件上限 1MB。已用 gzip 壓縮（`packData`/`unpackData`，前綴 `GZ:`，向下相容未壓縮舊資料）。業主 370 筆壓後約 211KB。**壓縮天花板約 1800 筆**——同事有 2000 筆的，需要「分割儲存 chunking」，**已規劃但暫緩**（業主要當面跟同事討論才做）。
- **Session 鎖**：一次只允許一台裝置在線（`claimSession`／`sessionToken`）。
- **載入鎖**：開啟時顯示「☁️ 正在取得最新資料」全屏鎖（`#cloudLock`），拿到雲端資料（或 12 秒逾時）才放行。
- **試算表同步（舊機制）**：`pushToSheet`/`toRow`/`fromRow` 同步到 Google 試算表「追蹤表紀錄檔」。富欄位 JSON（第 34 欄）已含 `companyRaw` 完整 25 欄（修過會砍資料的 bug）。業主長期方向是拿掉這條，暫留。

## 3. 開發流程（鐵則）

1. **只改 `index-test.html`**，改完：
   - 更新 `APP_VERSION`（搜 `const APP_VERSION`）：格式 `🧪測試版 tNN (白話說明改了什麼) YYYY.MM.DD`，tNN 遞增（目前到 t81）。
   - 驗證：`node dev/check-syntax.js index-test.html`（語法）＋ `node dev/test.js`（18 項回歸測試）。
   - `git pull` → commit → push。commit 訊息結尾：`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`（沿用既有慣例）。
   - 告訴業主：測試版 **Ctrl+Shift+R**（iPhone 用 Safari 無痕視窗，一般分頁要到 設定→Safari→進階→網站資料刪 github 那筆）。
2. **業主確認 OK 才搬正式版**：整份 `index-test.html` 複製成 `index.html`，**只改 APP_VERSION 那一行**成 `YYYY.MM.DD #N`（同日遞增、跨日從 #1 重來）。搬完 `diff` 確認只差版本行。
   - ⚠️ 版本字串內含分號，取代時用**整行貪婪比對** `/const APP_VERSION = '.*';/`，別用非貪婪（曾把檔案改壞過）。
3. **大改動先用真實備份檔壓測**：`node dev/backup-audit.js "備份.json"`（業主會從 ⚙️設定下載 `CRM備份_日期.json` 給你）。
4. 中文 regex 的行有時 Edit 工具比對不到 → 用 Python（UTF-8 讀寫）做字串替換。
5. 目前狀態：**正式版 2026.07.15 #1 ＝ 測試版 t81，完全同步**。

## 4. 開發環境（Windows 11）

- Python 3.12：`C:\Users\USER\AppData\Local\Programs\Python\Python312\python.exe`（PATH 裡的 `python` 是廢 stub，要用全路徑；openpyxl 已裝）
- Node v24：可直接 `node`。PowerShell 是 5.1（無 `&&`、UTF-8 檔要 BOM 才能跑 .ps1）。
- 驗證工具（repo 的 `dev/`）：
  - `check-syntax.js`：抽出內嵌 script 用 vm 編譯，報語法錯。
  - `test.js`：18 項回歸（性別/顯示名/地址解析/聯絡紀錄解析/去重）。
  - `backup-audit.js`：用真實備份 JSON 壓測比對/持分/信託/搜尋等邏輯。
- 本機 Word 可用（PowerShell COM automation），LibreOffice/pdftoppm 不可用。

## 5. 核心業務邏輯（地雷區，動之前先讀）

### 5.1 客戶比對（誰跟誰是同一人）
- **總檔匯入** `processCompanyData` 內 existing 比對順序：①col4建號完全相同 ②電話 ③**完整**身分證（`isFullId`，遮罩版不可當唯一鍵）④地址（`normalizeAddr` 後全等）。
- **地址比對的持分排除**：`hasFen()` 只有「真持分」才跳過地址比對；**「全部1分之1」不算持分**（曾因此讓遮罩證號客戶每次被當新人，t71 修正）。
- **AI 匯入** `findAiMatch` 順序：完整證→電話→建號→地址→純姓名(弱)。建號/地址步驟會排除 `clearlyDifferentPerson`（不同姓、或兩個完整本名不同）→ 持分共有的共有人不可合併（t64）。
- **流水編號 serial**：每客戶唯一 6 位隨機數，`ensureSerials()` 只補缺、**絕不改已有**。是關聯/信件反查的 ID。
- **手動分類鎖 heatManual**：業主親手分過類（覆訪/追很緊/已簽約/無效案件/新鑫）→ 匯入永不覆蓋分類。

### 5.2 謄本欄位（總檔 25 欄）
GAS 送 0~24 欄＋分頁名。關鍵欄：col0 電話姓名、col1 拜訪過程、col2 備註、col3 標示部(建物)、col4 門牌、col6 所有權部、col12 債務人電話、col13 他項權利部、col18 限制登記事項。
- 金額規則：他項權利的設定金額是最高限額，**銀/法 ÷1.2 估實貸、民間保留原值**（`Math.ceil(x/1.2)`）。AI 匯入 `recordToProps` 同規則——**AI 給原值，系統自己除，別讓 AI 先除（會除兩次）**。
- 遮罩名補全：所有權部遮罩（馬＊＊→存單姓「馬」）時，從 col18 的「義務人」抓完整本名；regex 必須容忍空白 `義務人\s*[：:]\s*`，且**同姓才補**（t72/t77）。
- **信託**：`isTrustOwner`（有「信託」無「塗銷」）→ 所有權人是受託人；客戶改抓委託人 `trustSettlorName`（三來源：`信託（委託人：X）`、遮罩名後括號 `張＊＊（本名）`、col18 `委託人:X`），**不帶受託人身分證**，備註標 ⚠️。「塗銷信託」＝原屋主，照常。
- **建物持分 buildShare**：只影響房價評估的建物坪（`calcEvalBuildArea` × num/den）；**土地不乘**（業主流程：土地坪一律填「已算好持分」的數字）。UI 有標註。
- **共同持分人**：`renderCoOwners` 用 `bldKeys`——完整建號(col4含段)或「區+段+建號」才算同一棟；**建號只在同段內唯一，光比數字會跨段誤判**（t78）。
- **黑名單三無**：沒電話沒證號的客戶用「建號＋姓名」擋（同建號同名才擋，共有人不連坐）。
- **新鑫名單**：col 格式不同（0=姓名 1=證號 2=電話 3=地址 4=備註）。「沒地址」列＝共同借款人 → **各自獨立建檔＋自動綁『共同借款人』關聯**（`lastXinMain` 追蹤主借款人；舊版會併成「名字／名字」，已有拆分工具）。批次標頭 `1150522_資料(N)` 進 batch 欄。
- **關聯 relations**：`[{serial, relation}]` 雙向（`linkRelation`/`unlinkRelation`），基本頁 🔗 標籤可跳轉，可自訂關係文字。

### 5.3 匯入的「只補空白」原則
更新既有客戶時：電話/備註/提醒/分類(heatManual)/手改姓名**永不覆蓋**；空白才補。例外：companyRaw（總檔職責，永遠刷新）、遮罩名→完整本名升級、門牌「區」按標示部修正。

## 6. GAS（Google Apps Script）

- repo 的 `個人GAS.gs` ＝ 最新完整版。功能：回傳總檔 25 欄（doGet 預設）、createFolder（Drive 客戶資料夾）、getEvents（行事曆）、listFolder／uploadFile（☁️雲端分頁）。
- `TOKEN = 'stanford87'`（全公司同一個）；`SPREADSHEET_ID` 每人各自填自己的總檔試算表 ID。
- 部署鐵則：執行身分＝我自己、存取＝**任何人**；改完要「管理部署→編輯→**新版本**」（網址才不變）；加權限後要跑一次 `authorize()`。
- **⚠️ 未完事項：業主的總檔試算表被誤刪**（原 ID `1ROlo6EXFpFDUsE_Gx2JB31mAk3CNOhZTxq2KbQxAtAM` 已 404）。備援：①Drive 垃圾桶還原（30 天內，ID 不變最省事）②本機 `C:\Users\USER\Downloads\平總檔_新版.xlsx (3).xlsx` 上傳→另存 Google 試算表→新 ID 填進 GAS 第 9 行→重新部署。Drive 裡的「整理後_總檔_20260602」（ID `1yMyGFPD7j-dgYZncJbeNgKtufN6W6YdmaIBU_5rZwZU`）也是候選。**接手後先問業主處理到哪了。**

## 7. AI 匯入提示詞

- 最新版：repo `AI匯入提示詞.txt` ＝ 桌面同名檔（兩份同步）。含 11 條規則：坪換算、面積填全額、buildShare、土地填已算持分、金額原值不除、多屋同人、持分共有每人一筆、不亂猜、姓名補全（第9）、信託（第10）、車位 parkArea/parkType/parkTitle（第11）＋note 風險必寫清單。
- 改提示詞時**兩份都要更新**，並確認 CRM 端 `recordToProps`/`mapEval` 真的接得住新欄位。

## 8. 周邊工具

- **總檔整理工具**：`C:\Users\USER\OneDrive\桌面\客戶系統\總檔整理工具\總檔整理工具.html`（獨立檔，不在 repo）。前處理：原始總檔去重＋合併拜訪紀錄→乾淨 xlsx。`canMerge`：同建號＝權威判斷；無建號用完整 normDoor 比對。
- **通知單合併列印**：`客戶系統\包裏信件通知單_最多支援100筆.docx`＋CRM「📋名單→📨通知單名單」匯出 CSV（欄：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話）。
- **16 格地址標籤（進行中）**：貼紙原廠模板 `C:\Users\USER\Dropbox\環匯\表格文件\2x4a(16格）.doc`（61頁工作檔，A4/0邊界/2欄×8列/欄寬297.7pt）。產生器：scratchpad `gen-labels2.ps1`（Word COM：拿原廠檔第1頁表格、16格填「姓名+換行+地址」、**列高調 105.0pt** 否則第8列會溢到第2頁、表尾段落縮到最小）。已出測試檔 `客戶系統\地址標籤16格_測試.docx`（Word 實測 1 頁）。**待業主印白紙對貼紙確認 → 之後做成 CRM 正式功能（名單勾選→一鍵產出）**。
- **⚙️設定→資料整理工具**：日常＝清除無效空資料；「🧰 舊資料整理（一次性）」摺疊區＝一鍵套用新規則（有變更預覽）、拆分舊共同借款人、找信託修委託人、清理髒資料——匯入已內建同規則，清過一輪就用不到。

## 9. 待辦與暫緩清單

| 項目 | 狀態 |
|---|---|
| 總檔試算表誤刪重建＋GAS 接回 | **待處理**（見 §6，先問業主） |
| 16 格標籤：白紙試印確認 → 做成 CRM 功能 | 測試檔已交付，等業主確認 |
| 分割儲存 chunking（同事 2000 筆超 1MB） | 已規劃，**暫緩**：業主要當面跟同事談 |
| Cowork 匯入 API（產 JSON→POST 進待審收件匣+紅點） | 已定設計，**暫緩**。端點走 GAS 不是 CRM（靜態網頁無後端）；POST 只回 queued，防重複靠 CRM 既有比對 |
| 拿掉試算表舊同步 | 業主長期方向，等資料穩定 |
| 車位提示詞實測 | t81 剛加，業主還沒用新提示詞跑過謄本 |

## 10. 跟業主協作的要領

- 白話中文，先講結論；表格少、句子短；他說「先回答我再動手」就**只回計畫不改碼**。
- 他會丟：謄本文字/截圖、總檔 Excel、CRM 截圖、備份 JSON——這些就是需求與測資。
- 高風險操作（清資料、批次改）一律「**先列清單讓他確認**＋建議先下載備份」——系統內建按鈕都遵守這慣例，新功能也要。
- 錯了就直說哪裡錯、為什麼、怎麼修好了。他很能抓 bug（跑版、誤併、批次重跳都是他先發現的），認真對待他的每個回報——通常背後真有一個 root cause。
- 版本號說明寫白話（他靠它了解改了什麼）。

## 11. 快速上手檢查單（接手第一天）

1. `git pull`，開 `index-test.html` 搜 `APP_VERSION` 確認目前版本。
2. 跑 `node dev/check-syntax.js index-test.html` 和 `node dev/test.js`，確認綠燈。
3. 讀 repo `開發手冊.md`（更完整的歷史脈絡）＋本文件。
4. 問業主：①總檔重建處理到哪 ②標籤試印了沒 ③最近有沒有新 bug。
5. 任何改動照 §3 流程走。
