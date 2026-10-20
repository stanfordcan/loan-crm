# MAP — index-test.html 函式索引與開發手冊目錄（node dev/map.js 自動產生，勿手改）

> 用法：先在這裡找名字/行號，再用 Read 的 offset/limit 只讀那一段。行號以 index-test.html 為準。

## 檔案骨架
- L7: <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.1
- L8: <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3
- L10: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L11: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L12: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L13: <style>
- L534: </style>
- L535: <script>
- L569: </script>
- L570: </head>
- L571: <body>
- L588: <script>
- L1201: </script>
- L1209: <style>@keyframes cloudPulse{0%,100%{opacity:.45;transform:s
- L1898: <style>
- L1911: </style>
- L1997: <style>
- L2006: </style>
- L2162: <script>
- L5357: </style></head><body>${pages}<script>window.onload=function(
- L6638: <style>
- L6645: </style></head>
- L6646: <body>
- L6653: </body></html>
- L9624: </script>
- L9625: </body>

## 函式索引（行號｜名稱｜說明）

### 外觀主題：'light' | 'dark' | 'auto'（跟隨系統）。存在本機，各裝置各自設定  (L536)
- L539 `getThemeSetting()`
- L540 `applyTheme()`
- L546 `setTheme(s)`
- L555 `getZoomSetting()`
- L556 `applyZoom()`
- L562 `setZoom(z)`

### Firebase 初始化  (L589)

### 單一裝置登入：搶佔 session  (L608)
- L610 `claimSession(uid)` — 回傳 true = 成功登入；false = 使用者取消（auth.signOut() 已在內部呼叫）
- L657 `forceLogout()` — 被其他裝置踢出時執行
- L672 `startAutoPush()` — 啟動定時 push（每 5 分鐘）
- L683 `startReadOnlyRefresh()` — 唯讀模式：每 3 分鐘從雲端重讀一次；也可按提示列的 🔄
- L688 `stopReadOnlyRefresh()`
- L689 `readOnlyReload()`
- L692 `renderReadOnlyBar()`
- L699 `exitReadOnly()`
- L705 `stopAutoPush()` — 停止定時 push
- L777 `doLogin()` — 登入
- L816 `doLogout()` — 登出
- L827 `packData(jsonStr)` — 不支援 CompressionStream 的舊瀏覽器或壓縮出錯 → 退回不壓縮，確保不會卡住（相容）。
- L837 `unpackData(s)` — 解壓縮：沒「GZ:」前綴=舊的未壓縮資料，直接回傳（向下相容）
- L854 `splitChunks(str,size)`
- L856 `stageChunks(batch,userRef,col,packed,ts)` — 把分段寫進 batch；回傳段數。多出來的舊段一併刪掉（沒刪到的舊段時間戳對不上，讀的時候會被忽略）。
- L864 `readChunks(userRef,col,n,ts)` — 讀回分段：缺段或時間戳對不上 → 回 null（呼叫端只能當「讀不到」，絕不能因此清空資料）
- L875 `readCloudPacked(userRef,raw,col,nKey,tsKey,legacyKey,mainTsKey)` — 新舊格式擇一讀：回傳壓縮字串，兩種都沒有 → null
- L883 `saveToFirestore(ts,prePacked)` — 寫入 Firestore（ts 可由 saveLocal 傳入，確保本地與雲端時間戳一致；prePacked＝saveLocal 已壓好的字串，不用再壓一次）
- L932 `showCloudLock()` — 載入鎖：取得雲端資料時鎖住畫面
- L933 `hideCloudLock()`
- L936 `restoreBackup()` — 從備份還原
- L970 `downloadBackup()` — 下載備份檔到手機/電腦（離線快照，不依賴雲端）
- L995 `restoreFromFile(input)` — 從備份檔還原（讀使用者選的 .json 檔）
- L1026 `loadFromFirestore()` — 從 Firestore 載入
- L1064 `syncFromFirestoreIfNewer()` — 背景比對 Firestore：只有 Firestore 比本地新時才更新
- L1114 `applyCloudCustomDocs(str)` — 自訂文件清單：雲端有就以雲端為準（跟著帳號走，手機加了電腦也看得到）
- L1119 `saveUrlSettings()` — 儲存 URL 設定到 Firestore（不動客戶資料）
- L1130 `openUrlSettings()`
- L1146 `renderCloudUsage()` — 雲端用量：主文件 data（gzip 後）佔 1 MB 上限的多少；沒存過就現算一次
- L1169 `renderThemePicker()` — 外觀三選一（淺色／深色／跟隨系統）
- L1176 `renderStaleDaysPicker()`
- L1183 `renderZoomPicker()`
- L1190 `closeUrlSettings()`
- L1193 `applyUrlSettings()`
- L2170 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L2173 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L2186)
- L2187 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L2216 `normalizeTime(val)`
- L2241 `fixPhone(val)`
- L2250 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2258 `saveLocal()`
- L2270 `loadLocal()`
- L2301 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2312)
- L2317 `saveMemos()`
- L2322 `loadMemos()`
- L2329 `addMemo(src)`
- L2350 `toggleMemoDone(id)`
- L2358 `deleteMemo(id)`
- L2363 `memoItemHtml(m)`
- L2382 `renderMemos()`
- L2408 `checkMemoReminders()`
- L2425 `openMemoModal()`
- L2429 `closeMemoModal()`

### Auto-classify  (L2433)
- L2434 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2440)
- L2441 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2444 `loadBlacklist()`
- L2451 `addToBlacklist(c)`
- L2467 `isBlacklisted(phone,idno,buildNo,name)`
- L2481 `removeFromBlacklist(i)`
- L2488 `updateBlacklistBtn()`

### Google Sheets sync  (L2493)

### Sync  (L2571)
- L2572 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2624 `syncData()`
- L2644 `pushToSheet()`

### Company Sheet (JSONP)  (L2651)
- L2652 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2680 `driveSubFolderName(name,addr,district,section,landNo,isoDate)` — 子資料夾名：民國日期_客戶名_門牌；沒門牌就用 地段號＋地號（例：1151019_張聖平_台北市中山區建國北路二段92號12樓）
- L2687 `createDriveFolder()`
- L2718 `openDriveFolder()`
- L2724 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2725 `curDriveUrl()`
- L2726 `openCloudFolder()`
- L2727 `renderCloudTab()`
- L2767 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2795 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2806 `syncFromCompany()`

### 疑似重複比對  (L2842)
- L2845 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2848 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2850 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2858 `findDupCandidates(c)`
- L2904 `liveDupCheck()`
- L2914 `renderDupPanel(c)`
- L2948 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2951 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L2958 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L2968 `foldClientInto(a,b)`
- L3014 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L3025 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L3039 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L3054)
- L3057 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L3074 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L3105 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L3152)
- L3155 `showClaudeReviewModal(pendingCases,onComplete)`
- L3174 `_renderCR(aiResults,errMsg)`
- L3213 `claudeDecide(index,decision)`
- L3223 `claudeReviewApply()`
- L3233 `claudeReviewSkipAll()`
- L3245 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L3251 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L3258 `cleanCreditorName(name)`
- L3272 `parseRightsLoans(text)`
- L3331 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3366 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3371 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3382 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3392 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3399 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3402 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3431 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3440 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3461)
- L3467 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3473 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3487 `propIdOf(p)` — 兩張不動產卡是不是同一間（整理工具用）：都有自己的建號就比建號；否則門牌正規化後要「完全一樣」（不用前綴比對，5樓 跟 5樓之1 不能併）
- L3488 `propListOf(p)`
- L3489 `samePropPair(a,b)`
- L3506 `foldPropInto(keep,other)` — 把 other 併進 keep：欄位只補空白、抵押列依登序或名稱＋金額去重後合併、版本紀錄接起來，然後 other 作廢
- L3521 `mergeDuplicateProperties(dryRun)` — 合併同一人底下重複的不動產卡。dryRun=true 只算不改。回傳 {clients:n, props:n, names:[]}
- L3546 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3554 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3572 `floorsFromBuildInfo(bi)` — 建物標示 → 總樓層（「12層」）、建築完成年（民國「88年05月」）
- L3573 `builtYearFromBuildInfo(bi)`
- L3575 `jobSummary(c)` — 基本頁 → 「上班族（某公司），月收 6 萬，薪轉，有報稅」
- L3585 `googleCommunity()`
- L3590 `syncFloorsToEval()`
- L3591 `syncBuiltYearToEval()`
- L3592 `processCompanyData(raw)`

### Toolbar visibility settings  (L4317)
- L4331 `toggleMainMenu(e)`
- L4342 `closeMainMenu()`
- L4346 `closeImportMenu()`
- L4353 `loadBtnVis()`
- L4361 `saveBtnVis()`
- L4366 `toggleBtnSettings(e)`
- L4380 `renderBtnSettings()`
- L4388 `setBtnVis(id,val)`
- L4405 `uiDialog(o)`
- L4425 `_uiDlgClose(val)`
- L4429 `uiConfirm(msg,o)`
- L4430 `uiAlert(msg)`
- L4431 `uiPrompt(msg,value)`

### UI helpers  (L4448)
- L4449 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4454 `remSt(r)`
- L4460 `remChip(r,rt)`
- L4487 `updateStats()`
- L4531 `calEsc(s)`
- L4532 `calMonth(delta)`
- L4539 `renderCalendar()`
- L4585 `openCalModal()`
- L4586 `closeCalModal()`
- L4589 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4634 `closeDayView()`
- L4640 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4641 `loadGoogleCalCache()`
- L4644 `syncGoogleCal(silent)`
- L4665 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4690)
- L4698 `staleDays()`
- L4699 `setStaleDays(n)`
- L4700 `lastLogDate(c)`
- L4701 `daysSince(d)`
- L4702 `isMuted(c)`
- L4703 `staleBase(c)`
- L4704 `isStale(c)`
- L4705 `isNever(c)`
- L4706 `staleTag(c)`
- L4712 `muteBtn(c)`
- L4714 `weekEndStr()`
- L4715 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4726)
- L4728 `saveViewState()`
- L4731 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4741)
- L4743 `onSearchInput()`
- L4748 `clearSearch()`
- L4752 `updateSearchClear()`
- L4760 `pushRecent(id)`
- L4767 `onSearchFocus(on)`
- L4772 `refreshRecentRow()`
- L4780 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4786)
- L4790 `setCardMode(full)`
- L4795 `renderCardModePicker()`
- L4802 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4803)
- L4806 `loadMoreCards()`
- L4809 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4830 `watchLoadMore()`
- L4837 `setTimeFilter(t)`
- L4843 `setTab(t)`
- L4854 `hl(text,q)` — Highlight matching keyword in text
- L4863 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4890 `openMapExport()`
- L4896 `mapRowMatch(r)`
- L4897 `mapPickBatch(b)`
- L4898 `closeMapExport()`
- L4899 `buildMapRows()`
- L4918 `renderMapCatBar()`
- L4924 `toggleMapCat(h)`
- L4925 `mapSelectAll(v)`
- L4926 `updateMapCount()`
- L4931 `renderMapList()`
- L4948 `downloadMapCsv()`
- L4971 `openListTool()`
- L4979 `closeListTool()`
- L4980 `ltToggleFilter()`
- L4981 `ltToggleCat(h)`
- L4982 `ltToggleCheck(id,on)`
- L4983 `ltVisible()`
- L4991 `ltSelectAllVisible(v)`
- L4992 `renderListTool()`
- L5012 `ltTagBatch()`
- L5022 `closeLtBatch()`
- L5023 `ltBatchApply()`
- L5037 `findBySerial(s)`
- L5039 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L5048 `unlinkRelation(a,b)`
- L5054 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L5070 `openRelPicker()`
- L5080 `closeRelPick()`
- L5081 `renderRelPickList()`
- L5095 `addRelation(targetId)`
- L5106 `removeRelation(serial)`
- L5121 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L5131 `renderCoOwners()`
- L5149 `ltMapCsv()`
- L5166 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L5183 `loadXlsxStyle()`
- L5199 `digitsOf(s)` — 謄本原文那種 CRM 沒拆開存的欄位（所有權部、債務人、義務人、權利人…）照總檔原值；兩邊都沒有的才用 CRM 資料湊一個看得懂的。
- L5200 `loansToRights(loans)`
- L5212 `companyExportRows(list)`
- L5263 `buildCompanyWorkbook(X,rows)`
- L5270 `buildCompanySheet(X,rows)`
- L5286 `ltExportCompany()`
- L5301 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L5317 `noticeSlip(c,dv)`
- L5335 `ltPrintNotice()`
- L5366 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L5391 `render()`
- L5550 `openHeatPick(e,id)`
- L5567 `openMutePick(e,id)`
- L5584 `applyMutePick(days)`
- L5592 `closeHeatPick()`
- L5593 `applyHeatPick(h)`
- L5606 `togglePin(id,e)`

### Batch select mode  (L5618)
- L5622 `getVisibleList()`
- L5631 `toggleSelectMode()`
- L5638 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5644 `exitSelectMode()`
- L5650 `toggleSelect(id,e)`
- L5657 `batchDeleteSelected()` — 批次刪除勾選的客戶：不加黑名單（之後重新匯入會再建回來）；確認視窗列人數與前幾個名字
- L5671 `batchClearReimport()` — 清掉勾選的人的 🔁 二次匯入記號（例如只是為了補持分重匯一次，不想留記號）
- L5682 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5688 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5693 `batchSelectAll()`
- L5701 `updateBatchBar()`
- L5712 `applyBatchCategory()`
- L5723 `clearRemind(e,id)`

### 電話點擊  (L5738)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5739)
- L5752 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5763)

### 表單髒標記  (L5777)

### 瀏覽器推播通知  (L5781)
- L5782 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5786 `checkReminders()`

### 鍵盤快捷鍵  (L5802)
- L5847 `syncToEval(targetId,val)`
- L5851 `syncLandtax(field,val)`
- L5856 `extractDistrict(addr)`
- L5859 `autoFillDistrict(addr)`
- L5867 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5876 `openCalendar(id)`
- L5893 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5895)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5896)
- L5901 `nextDocState(cur)`
- L5906 `saveCustomDocs()`
- L5910 `allDocNames()`
- L5914 `addCustomDoc()`
- L5921 `removeCustomDoc(name)`
- L5929 `renderDocChips()`
- L5941 `toggleDoc(name)`
- L5947 `fillExtraFields(c)`
- L5965 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L5973 `renderBatchChips()` — 來源批次籤：顯示 #fBatch（「、」串接）裡的每一個，✕ 可移除；新增從輸入框 Enter
- L5980 `addBatchChip()`
- L5987 `removeBatchChip(b)`
- L5993 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L5999 `creditSet()`
- L6000 `renderCreditChips()`
- L6005 `toggleCredit(o)`
- L6016 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L6022 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L6027)
- L6028 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L6048 `applyReadOnlyToSheet()` — 唯讀：面板所有輸入欄鎖住（看得到、不能改）；按鈕由 CSS .readonly 隱藏
- L6054 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L6055 `openAdd()`
- L6099 `isSheetOpen()`
- L6101 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L6132 `openEdit(id)`
- L6212 `closeSheet()`
- L6233 `evalCtx(c,p)`
- L6238 `renderPriceEval(c)`
- L6422 `calcEvalBuildArea()`
- L6476 `calcTotal()`
- L6499 `fmtWan(n)` — 行情／總價範圍文字：好賣價～行情價（萬/坪）、各乘建坪再加車位
- L6500 `priceRangeStr(lo,hi,area,parkVal)`
- L6507 `regionFromAddr(addr)` — 門牌 → 「台北市 中山區」
- L6512 `clientAgeStr(c)` — 客戶年紀：用基本頁的出生年月日（民國）
- L6520 `evalReportText(d)` — 案源評估：純文字排版（空行位置照老闆定的範本，一行都不能動）
- L6559 `generateReport(clientId)`
- L6660 `sSTab(i,el)`
- L6677 `renderCompanyTabs()`
- L6690 `selectCompanyProp(i)`
- L6698 `renderCompanyPanel()`
- L6760 `sSTabTo(i)`
- L6770 `logKindLabel(k)`
- L6771 `logKindTag(k)`
- L6772 `renderLogKindChips()`
- L6776 `renderLogs()`
- L6801 `editLog(i)`
- L6807 `cancelLogEdit()`
- L6808 `saveLogEdit(i)`
- L6824 `markDebtPhoneDeleted(p)`
- L6830 `renderDebtPhones()`
- L6840 `debtPhoneTel(p)` — 債電字串 → tel: 可用的號碼：去掉「（名字）」等註記，#分機 變成「,分機」（撥通後停一下再送分機）
- L6847 `dialDebtPhone(i)`
- L6852 `addDebtPhone()`
- L6853 `setDebtPhone(i,v)`
- L6858 `removeDebtPhone(i)`
- L6862 `addLog()`
- L6874 `defaultRemindTime()` — 填了提醒日期、時間還空白 → 預設 11:30（業主定）
- L6879 `quickRemind(days)`
- L6894 `removeLog(i)`

### Extra Loans  (L6908)
- L6913 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6914 `updateLandLabels()`
- L6918 `renderExtraLands()`
- L6947 `syncExtraAreaLabel(i)`
- L6951 `addExtraLand()`
- L6953 `applyLandShare()` — 土地：全筆坪 × 持分 → 自動填進「土地持分坪」（估價用）；沒填全筆或持分就不動手填的值
- L6964 `renderShareBanner()` — 持分結算條：把「系統實際用的坪數」用大字寫出來，持分<1 橘底、全部持有綠底
- L6982 `updateLandTotals()`
- L6998 `renderExtraLoans()`
- L7007 `addExtraLoan()`
- L7010 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L7052 `addLoanRow()`
- L7060 `removeLoanRow(i)`
- L7068 `rocShort(iso)` — 西元 2026-10-19 → 民國 115/10/19
- L7069 `toggleLoanConfirm(i)`
- L7075 `setLoanField(i,key,val)`
- L7086 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L7101 `renderFinProofs()`
- L7110 `addFinProof()`
- L7112 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L7122 `syncDocFromProof(type)`
- L7150 `addrForGeo(raw,district)` — 門牌 → 查座標用字串：丟樓層／室／戶、「號之N」「N-M號」→「N之M號」、只留到「號」、多門牌共用號取第一個、沒縣市用區名補。回 {q, level, notes}
- L7175 `geoParts(s)` — 拆地址成 區／巷／弄／主號／之號，給 geoGrade 比對用。Google 回傳的「458-460號」「88~92號」是範圍寫法，含在內就算對；「5 之1號」有空白也認
- L7186 `geoGrade(q,addr)`
- L7195 `propsNeedingGeo(onlyIds)` — 哪些不動產要查：有門牌、還沒查過、或門牌改了（存的 q 跟現在算的不一樣）。onlyIds 給就只看那些客戶
- L7210 `loadGeoLib()`
- L7222 `geocodeOne(q)`
- L7234 `geocodeProps(targets,onProgress)`
- L7257 `geoStopText(code)`
- L7263 `geoSummaryText(st,total)`
- L7270 `geocodeTool()` — 設定頁按鈕：查所有還沒查過／門牌改過的不動產
- L7281 `geocodeAfterImport(ids)` — 匯入後自動查：只查這批人（新建＋併入）裡還沒座標的；背景跑，跑完存檔，不跳視窗只給 toast（不準的留到設定頁再看）
- L7291 `geoTagHtml(p)` — 面板：門牌旁的座標標籤＋重查
- L7298 `renderGeoTag()`
- L7303 `regeocodeCurrent()`
- L7318 `openMapForProp()` — 📍 地圖：用門牌開 Google 地圖釘一根針（手機會直接開地圖 App）
- L7323 `openLandZoneQuery()`
- L7336 `calcAge()`

### Properties (多筆不動產)  (L7351)
- L7355 `emptyProperty(n)`
- L7364 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L7374 `migrateProperties(c)`
- L7397 `renderPropTabs()`
- L7406 `startRenameTab(e,idx)`
- L7420 `finishRenameTab(inp,idx)`
- L7426 `savePropFields()`
- L7470 `loadPropFields(idx)`
- L7519 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L7554 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L7584 `openLoanCalc()`
- L7617 `renderLoanHints()`
- L7640 `togglePrivateConfirm(v)`
- L7645 `switchProperty(idx)`
- L7651 `addProperty()`
- L7660 `removeProperty(idx)`
- L7671 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L7678)
- L7683 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L7700 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L7707 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L7714 `updateEvalIndicator()`

### 謄本 Import  (L7722)
- L7733 `openTenModal()`
- L7746 `closeTenModal()`
- L7748 `normNum(s)`
- L7755 `detectTenType(text)`
- L7768 `parseBiao(text)`
- L7793 `parseSuo(text)`
- L7809 `parseTa(text)`
- L7831 `extractPdfText(file)`
- L7857 `handleTenFiles(files)`
- L7897 `tenToggleRaw(idx)`
- L7906 `renderTenPreview()`
- L7931 `doTenImport()`
- L7945 `applyTenParsed(mode)`
- L7983 `onTenModeChange()`
- L7990 `filterTenClients()`
- L8011 `selectTenClient(id)`
- L8016 `saveClient(silent)`
- L8121 `scheduleDraftSave()`
- L8129 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L8134)
- L8136 `takeSnapshot(id)`
- L8142 `updateRevertBtn()`
- L8147 `revertClient()`
- L8163 `deleteClient()`
- L8173 `blacklistClient()`

### AI 整理匯入  (L8185)
- L8188 `openAiImport()`
- L8197 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L8199)
- L8201 `checkInbox()`
- L8211 `openInbox()`
- L8224 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L8230 `parseAiImport()`
- L8257 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L8270 `normAddr(s)`
- L8273 `cleanAddr(s)` — 門牌統一寫法（存檔、匯入、整理工具都用這個）：全形數字→半形、「五樓」→「5樓」、去掉所有空白。台／臺不動。
- L8278 `addrCore(s)`
- L8284 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L8285 `isMaskedName(n)`
- L8287 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L8298 `addrHit(a,b)`
- L8301 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L8349 `renderAiPreview()`
- L8404 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L8423 `setAiDecision(i,v)`
- L8426 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L8440 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L8446 `parseShare(s,num,den)`
- L8460 `emptyProp()`
- L8468 `recordToProps(rec)`
- L8552 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L8590 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L8676)
- L8677 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L8715 `shareClient()`
- L8724 `closeShare()`
- L8725 `copyShareCode()`
- L8733 `nativeShareCode()`

### XLS Import  (L8738)
- L8739 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L8747 `closeImport()`

### Blacklist UI  (L8749)
- L8750 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L8770 `closeBlacklist()`
- L8777 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L8792 `handleXls(file)`
- L8821 `doImport()`
- L8835 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L8842 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L8844 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L8852 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L8855 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L8862 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L8871 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L8887 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L8900 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L8901 `applyNewRulesToExisting(dryRun)`
- L8996 `runApplyNewRules()`
- L9012 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L9057 `normalizeAllAddrs(dryRun)` — 門牌統一半形：所有客戶地址、戶籍地址、每張不動產卡的門牌。dryRun 只算
- L9066 `cleanupAddrs()`
- L9080 `dedupeClientLogs(c,dryRun)` — 3 被截斷的半句（≥8 字、有另一筆更長且以它開頭、總檔原文裡沒這半句）丟掉。丟掉的都記進 deletedLogKeys，匯入不會再帶回。
- L9104 `dedupeAllLogs(dryRun)`
- L9110 `cleanFalseReimports(dryRun)` — 清掉「假的」二次匯入記號：舊版跟最新一模一樣（只差空白）的版本紀錄刪掉；之後沒有任何真正不同舊版的人，把「總檔更新：…有變」的記號拿掉
- L9129 `cleanupFalseReimports()`
- L9140 `cleanupDupLogs()`
- L9151 `cleanupDuplicateProps()`
- L9163 `cleanupInvalidEmpty()`
- L9181 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L9222 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L9257 `clearAllData()`

### City Filter  (L9279)
- L9283 `initCityFilter()`
- L9294 `toggleCityFilter()`
- L9302 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L9308 `onCityChange()`
- L9317 `selectAllCities()`
- L9322 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L9327)

### 批次管理視窗  (L9330)
- L9331 `openBatchMgr()` — ── 批次管理視窗 ──
- L9337 `closeBatchMgr()`
- L9338 `batchMgrSuggestAll()`
- L9339 `batchMgrResetAll()`
- L9340 `batchMgrApply()`

### t141 多批次：batch 仍是一格文字，多個用「、」串接；一律用下面這幾個函式讀寫  (L9352)
- L9354 `batchList(c)`
- L9355 `batchJoin(arr)`
- L9356 `batchAdd(c,b)`
- L9357 `batchSetAll(c,label)`
- L9360 `batchNameFromFile(fname,now)` — 匯入檔名 → 預設批次名「包區 民國年/月 剩下的字」：檔名有日期就用檔名的（1150318、115_03、115-03、1158、11510、2026-10、20261019 都
- L9370 `suggestBatchName(b)`
- L9378 `allBatches()`
- L9379 `batchFilterPass(c)`
- L9380 `refreshBatchDatalist()`
- L9385 `renderBatchCheckboxes()`
- L9394 `onBatchChange()`
- L9395 `clearBatchFilter()`
- L9400 `renderBatchTagCatBar()`
- L9404 `toggleBatchTagCat(h)`
- L9406 `openBatchTag()`
- L9418 `closeBatchTag()`
- L9425 `openBatchTagForImport(info)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L9444 `batchTagVisible()`
- L9454 `updateBatchTagCount(visLen)`
- L9455 `renderBatchTagList()`
- L9471 `toggleBatchTagPick(id,on)`
- L9472 `batchTagSelectAll(v)`
- L9473 `batchTagApply()`

### Init time dropdowns  (L9504)
- L9505 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L9515)

## 重要畫面元件 id（L 行號）
- #mainApp L1211
- #statsBar L1215
- #mainMenu L1223
- #tabSelect L1247
- #searchInput L1244
- #cityFilterPanel L1250
- #listWrap L1283
- #batchBar L1290
- #sheetBg L1318
- #sheetTitle L1384
- #saveStatus L1385
- #sp0 L1406
- #sp1 L1569
- #sp2 L1682
- #sp3 L1707
- #sp4 L1714
- #sp5 L1718
- #heatChips L1451
- #creditChips L1522
- #docChips L1529
- #finProofList L1490
- #loanRowList L1643
- #priceEvalPanel L1716
- #urlSettingsBg L1802
- #uiDlgBg L1741
- #themePicker L1864
- #cardModePicker L1862

## 開發手冊.md 目錄（只讀需要的章節：Read offset=行號）
- L1 開發手冊 — 借款客戶 CRM 系統
  - L9 0. 一句話總結
  - L17 1. 業務背景（一定要先懂）
    - L25 借款相關名詞
  - L33 2. 檔案與位置
  - L48 3. 部署流程
  - L64 4. 架構
    - L66 追蹤系統（index.html）
    - L73 Firestore 資料結構 `users/{uid}`
    - L86 兩個 GAS（Google Apps Script）端點
    - L93 整理工具（整理工具.html）
  - L100 5. 分類系統（heat）
  - L119 6. 主要功能與對應函式（index.html）
    - L131 客戶資料結構（clients[] 的一筆）
  - L150 7. 個人總檔 GAS 完整程式碼
  - L215 8. 踩過的坑（別重犯）
  - L226 9. AI 匯入格式（重要 — 這是 AI 協作的核心）
    - L230 JSON 格式
    - L260 建號／地號的書寫慣例（業主習慣，務必遵守）
    - L270 解讀謄本的要點
  - L280 10. 跟業主互動的原則
- L290 11. 近期重大更新（2026/06/12–13）— 新接手者必讀
  - L294 11.1 檔案現況
  - L301 11.2 個人 GAS（每人自架）目前完整指令集
  - L311 11.3 AI 匯入（謄本→JSON→建檔）
  - L318 11.4 不動產分頁（分群卡片）
  - L326 11.5 貸款試算整合（按鈕→新視窗）
  - L333 11.6 行事曆（PC 空白區 #pcEmptyState）
  - L340 11.7 自動存 / 同步（重要！踩過資料被改壞的坑）
  - L349 11.8 配色
  - L352 11.9b 分享客戶給同事（v2026.06.14 #5）
  - L359 11.9c 地圖名單匯出 + 搜尋擴大（v2026.06.14 #7）
  - L364 11.9d 來源批次標記（v2026.06.14 #9）
  - L371 11.9e 總檔多筆不動產 + 公司資料分房（v2026.06.15 #2）
  - L378 11.9f 總檔格式相容 + AI土增連動 + 匯入後跳批次（v2026.06.15 #4）
  - L387 11.9 給接手者的話
- L394 12. 功能：☁️ 雲端預覽分頁（CRM 端已實作 v2026.06.14 #2；剩 GAS 部署）
  - L402 12.1 前置背景
  - L407 12.2 定案的設計
  - L413 12.3 個人 GAS 要加的指令（listFolder）
  - L439 12.4 CRM 端要做的
  - L446 12.5 第二階段：手動上傳（已實作 v2026.06.14 #4）
  - L453 12.6 實作提醒
- L460 13. 2026/06/16 session — 新接手者必讀
  - L462 13.0 版本現況
  - L466 13.1 已上正式版 #5
  - L472 13.2 在測試版 t20、待驗證後搬正式版
  - L481 13.3 ⚠️ 沒解決的 BUG（最優先）
  - L487 13.3b 另外兩個待查（2026/06/16 業主回報）
  - L491 13.4 GAS 更新（業主+同事都要做）
  - L494 13.5 互動原則（不變）
  - L497 13.6 待做：把「批次篩選」併進「縣市」按鈕（業主指定，交接給接手系統）
- L513 14. 2026/06/17 session — 新接手者必讀（大量更新，已上正式版）
  - L515 14.0 版本現況
  - L521 14.1 這次做了什麼（依主題）
  - L541 14.2 通知單（包裏信件投遞通知單）— Word 合併列印
  - L547 14.3 ✅ Firestore 安全規則（2026/06/17 已確認安全，無需更動）
  - L567 14.4 其他狀態 / 提醒
  - L573 14.5 本機開發環境（2026/06/18 裝好，接手者可用）
