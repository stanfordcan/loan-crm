# loan-crm 開發須知（精簡版；完整規範見 交接報告_Cowork.md）

**每次開工先讀 `協作板.md`**——那是與 Cowork 的留言板；對方可能留了待辦或狀況更新。要告知/交接給 Cowork 的事寫進去（新留言放最上面），不要請業主人肉轉貼。
協作板規則（2026/10/14 業主定案）：結案滿兩週的留言由回覆方搬到 `協作板_歷史.md`；大規格表不貼板上，寫進提示詞／技能，板上只留一行指引。

業主是民間二胎放款業務、**非工程師**：溝通一律白話中文、先講結論、少術語。他說「先回答我再動手」＝只回計畫、不改碼。

## 模型分工（2026/10/14 業主要求：平常用 Opus 省用量，必要時提醒換 Fable）
接到任務先判斷，命中下列任一項就**先停下來一句話提醒業主「這題建議換 Fable 視窗做」，等他決定再動手**；沒命中就直接做：
1. 動到資料怎麼存／同步／合併：Firestore 文件結構、分段存、封存、saveToFirestore／loadFromFirestore／syncFromFirestoreIfNewer、foldClientInto、processCompanyData、匯入比對邏輯。
2. 找不出原因的 bug：資料跑掉、同步後被蓋、重複增生、兩台裝置不一致。
3. 業主要「建議怎麼設計比較好」而不是明確指令。
4. 一次要改超過三個分頁或超過 300 行、或要搬正式版前的整批回歸驗證。
5. 做到一半覺得在繞圈、連改兩次還沒好。
不命中的（加欄位、改選項、搬格子、改樣式、出測試版、上正式、查資料）Opus 直接做。提醒只講一次，業主說「就用這個做」就照做。

## 省 token 開工流程（2026/10/14 業主要求）
1. 開工只讀三份：`CLAUDE.md`、`協作板.md`、`dev/MAP.md`（函式索引＋手冊目錄，約 15k token；只看「函式索引」那段就好，手冊目錄要用再看）。**不要整份讀 `index-test.html`（25 萬 token）或 `開發手冊.md`（2.6 萬）**。
2. 找程式一律先查 `dev/MAP.md` 的行號，再用 Read 的 offset/limit 只讀那一段；grep 只在 MAP 查不到時用，且限定 `-n` 加 `head`。
3. 改完程式跑 `node dev/map.js` 更新 MAP.md 一起 commit（release-test 流程已含）。
4. 手冊、交接報告、歷史協作板只在遇到該主題時按需讀對應章節；回歸測試與語法檢查只看 `tail`。
5. 畫面驗證優先用 javascript_tool 讀 DOM 數值，截圖只在要看版面時才截、一次 0.6 倍以下。
6. 一個視窗一個主題；主題換了就開新視窗（長對話被摘要後反而要重讀）。

## 架構
- 單一 HTML（~5900 行，JS/CSS 內嵌）：`index.html`＝正式版、`index-test.html`＝測試版。GitHub Pages 部署（push 即上線）。
- 資料在 Firebase Firestore（gzip 壓縮前綴 `GZ:`，單文件 1MB 上限）＋localStorage；試算表同步是舊機制，別動。

## 改版鐵則
1. 只改 `index-test.html`，改完 bump `APP_VERSION`（`🧪測試版 tNN (白話說明) YYYY.MM.DD`，tNN 遞增）。
2. 驗證必跑：`node dev/check-syntax.js index-test.html`＋`node dev/test.js`（21項）。大改動用 `node dev/backup-audit.js <備份.json>` 壓測。
   **改了行為就把守它的測試加進 `dev/test.js`**（抽真函式跑，不要另寫一份邏輯）；純畫面行為用瀏覽器實跑驗證，別只看程式碼。
3. commit 結尾：`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`。push 後提醒業主 Ctrl+Shift+R（iPhone 用 Safari 無痕）。
4. 業主說「上正式」才搬：整份 test 複製成 index.html，**只改版本行**成 `YYYY.MM.DD #N`（同日遞增、跨日回 #1）；版本行取代用貪婪 `/const APP_VERSION = '.*';/`（字串內有分號，非貪婪會弄壞檔案）；搬完 `diff` 確認只差那一行。
5. 中文 regex 的行 Edit 工具常比對不到 → 改用 Python（UTF-8）替換。
6. 匯入邏輯原則「只補空白」：電話/備註/分類(heatManual)/手改姓名永不覆蓋。serial 流水編號只補不改。

## 地雷區（動之前先讀交接報告 §5）
**多筆不動產是最容易出錯的地方（t105～t109 連修五版）**：每筆不動產的資料一律「只認自己這筆」——
房價評估用 `evalCtx()` 把客戶層級的不動產欄位剔除再疊，缺的就是缺的，絕不向上借；
評估內容 `evalData` 存在各筆 property 上（`_evalRenderedIdx` 記面板正在顯示哪一筆，存檔寫回那一筆，不是 curPropIdx）；
土增稅一般/自用各自有「算過」旗標（只算一般時自用要空白，0 的語意是「算過是零」）。
**`mergePropInto()` 有順序陷阱**：通用數字複製若含 landtax，會讓後面「土增稅」那段的 `!dst.landtaxNormal` 條件永遠失效。
**任何「累加進陣列」的地方都要去重**（聯絡記錄、債電都曾無限增生）；業主刪過的要記進 `deletedLogKeys`／`deletedDebtPhones`，永不由總檔帶回。
**`scrollIntoView({behavior:'smooth'})` 不可靠**（實測有環境完全不捲），要自己算容器位移。

比對順序（完整證→電話→建號→地址）、hasFen（全部1分之1不算持分）、clearlyDifferentPerson、
信託（塗銷=原屋主；未塗銷=抓委託人、不帶受託人證號）、義務人補本名（regex 容忍空白）、
buildShare 只乘建物坪（土地填已算持分）、共同持分人 bldKeys（建號要帶段）、金額 銀/法÷1.2 民間原值。

## 環境
Python 用全路徑 `C:\Users\Stanford\AppData\Local\Programs\Python\Python312\python.exe`（PATH 的 python 是廢 stub）；Node 可直接用；PowerShell 5.1（無 `&&`、.ps1 要 UTF-8 BOM）。
