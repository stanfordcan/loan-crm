# MAP — index-test.html 函式索引與開發手冊目錄（node dev/map.js 自動產生，勿手改）

> 用法：先在這裡找名字/行號，再用 Read 的 offset/limit 只讀那一段。行號以 index-test.html 為準。

## 檔案骨架
- L7: <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.1
- L8: <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3
- L10: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L11: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L12: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L13: <style>
- L535: </style>
- L536: <script>
- L570: </script>
- L571: </head>
- L572: <body>
- L590: <script>
- L1203: </script>
- L1211: <style>@keyframes cloudPulse{0%,100%{opacity:.45;transform:s
- L1324: <style>
- L1331: </style>
- L1945: <style>
- L1958: </style>
- L2044: <style>
- L2053: </style>
- L2209: <script>
- L5405: </style></head><body>${pages}<script>window.onload=function(
- L6686: <style>
- L6693: </style></head>
- L6694: <body>
- L6701: </body></html>
- L9995: </script>
- L9996: </body>

## 函式索引（行號｜名稱｜說明）

### 外觀主題：'light' | 'dark' | 'auto'（跟隨系統）。存在本機，各裝置各自設定  (L537)
- L540 `getThemeSetting()`
- L541 `applyTheme()`
- L547 `setTheme(s)`
- L556 `getZoomSetting()`
- L557 `applyZoom()`
- L563 `setZoom(z)`

### Firebase 初始化  (L591)

### 單一裝置登入：搶佔 session  (L610)
- L612 `claimSession(uid)` — 回傳 true = 成功登入；false = 使用者取消（auth.signOut() 已在內部呼叫）
- L659 `forceLogout()` — 被其他裝置踢出時執行
- L674 `startAutoPush()` — 啟動定時 push（每 5 分鐘）
- L685 `startReadOnlyRefresh()` — 唯讀模式：每 3 分鐘從雲端重讀一次；也可按提示列的 🔄
- L690 `stopReadOnlyRefresh()`
- L691 `readOnlyReload()`
- L694 `renderReadOnlyBar()`
- L701 `exitReadOnly()`
- L707 `stopAutoPush()` — 停止定時 push
- L779 `doLogin()` — 登入
- L818 `doLogout()` — 登出
- L829 `packData(jsonStr)` — 不支援 CompressionStream 的舊瀏覽器或壓縮出錯 → 退回不壓縮，確保不會卡住（相容）。
- L839 `unpackData(s)` — 解壓縮：沒「GZ:」前綴=舊的未壓縮資料，直接回傳（向下相容）
- L856 `splitChunks(str,size)`
- L858 `stageChunks(batch,userRef,col,packed,ts)` — 把分段寫進 batch；回傳段數。多出來的舊段一併刪掉（沒刪到的舊段時間戳對不上，讀的時候會被忽略）。
- L866 `readChunks(userRef,col,n,ts)` — 讀回分段：缺段或時間戳對不上 → 回 null（呼叫端只能當「讀不到」，絕不能因此清空資料）
- L877 `readCloudPacked(userRef,raw,col,nKey,tsKey,legacyKey,mainTsKey)` — 新舊格式擇一讀：回傳壓縮字串，兩種都沒有 → null
- L885 `saveToFirestore(ts,prePacked)` — 寫入 Firestore（ts 可由 saveLocal 傳入，確保本地與雲端時間戳一致；prePacked＝saveLocal 已壓好的字串，不用再壓一次）
- L934 `showCloudLock()` — 載入鎖：取得雲端資料時鎖住畫面
- L935 `hideCloudLock()`
- L938 `restoreBackup()` — 從備份還原
- L972 `downloadBackup()` — 下載備份檔到手機/電腦（離線快照，不依賴雲端）
- L997 `restoreFromFile(input)` — 從備份檔還原（讀使用者選的 .json 檔）
- L1028 `loadFromFirestore()` — 從 Firestore 載入
- L1066 `syncFromFirestoreIfNewer()` — 背景比對 Firestore：只有 Firestore 比本地新時才更新
- L1116 `applyCloudCustomDocs(str)` — 自訂文件清單：雲端有就以雲端為準（跟著帳號走，手機加了電腦也看得到）
- L1121 `saveUrlSettings()` — 儲存 URL 設定到 Firestore（不動客戶資料）
- L1132 `openUrlSettings()`
- L1148 `renderCloudUsage()` — 雲端用量：主文件 data（gzip 後）佔 1 MB 上限的多少；沒存過就現算一次
- L1171 `renderThemePicker()` — 外觀三選一（淺色／深色／跟隨系統）
- L1178 `renderStaleDaysPicker()`
- L1185 `renderZoomPicker()`
- L1192 `closeUrlSettings()`
- L1195 `applyUrlSettings()`
- L2217 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L2220 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L2233)
- L2234 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L2263 `normalizeTime(val)`
- L2288 `fixPhone(val)`
- L2297 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2305 `saveLocal()`
- L2317 `loadLocal()`
- L2348 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2359)
- L2364 `saveMemos()`
- L2369 `loadMemos()`
- L2376 `addMemo(src)`
- L2397 `toggleMemoDone(id)`
- L2405 `deleteMemo(id)`
- L2410 `memoItemHtml(m)`
- L2429 `renderMemos()`
- L2455 `checkMemoReminders()`
- L2472 `openMemoModal()`
- L2476 `closeMemoModal()`

### Auto-classify  (L2480)
- L2481 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2487)
- L2488 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2491 `loadBlacklist()`
- L2498 `addToBlacklist(c)`
- L2514 `isBlacklisted(phone,idno,buildNo,name)`
- L2528 `removeFromBlacklist(i)`
- L2535 `updateBlacklistBtn()`

### Google Sheets sync  (L2540)

### Sync  (L2618)
- L2619 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2671 `syncData()`
- L2691 `pushToSheet()`

### Company Sheet (JSONP)  (L2698)
- L2699 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2727 `driveSubFolderName(name,addr,district,section,landNo,isoDate)` — 子資料夾名：民國日期_客戶名_門牌；沒門牌就用 地段號＋地號（例：1151019_張聖平_台北市中山區建國北路二段92號12樓）
- L2734 `createDriveFolder()`
- L2765 `openDriveFolder()`
- L2771 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2772 `curDriveUrl()`
- L2773 `openCloudFolder()`
- L2774 `renderCloudTab()`
- L2814 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2842 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2853 `syncFromCompany()`

### 疑似重複比對  (L2889)
- L2892 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2895 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2897 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2905 `findDupCandidates(c)`
- L2951 `liveDupCheck()`
- L2961 `renderDupPanel(c)`
- L2995 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2998 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L3005 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L3015 `foldClientInto(a,b)`
- L3061 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L3072 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L3086 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L3101)
- L3104 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L3121 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L3152 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L3199)
- L3202 `showClaudeReviewModal(pendingCases,onComplete)`
- L3221 `_renderCR(aiResults,errMsg)`
- L3260 `claudeDecide(index,decision)`
- L3270 `claudeReviewApply()`
- L3280 `claudeReviewSkipAll()`
- L3292 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L3298 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L3305 `cleanCreditorName(name)`
- L3319 `parseRightsLoans(text)`
- L3378 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3413 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3418 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3429 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3439 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3446 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3449 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3478 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3487 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3508)
- L3514 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3520 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3534 `propIdOf(p)` — 兩張不動產卡是不是同一間（整理工具用）：都有自己的建號就比建號；否則門牌正規化後要「完全一樣」（不用前綴比對，5樓 跟 5樓之1 不能併）
- L3535 `propListOf(p)`
- L3536 `samePropPair(a,b)`
- L3553 `foldPropInto(keep,other)` — 把 other 併進 keep：欄位只補空白、抵押列依登序或名稱＋金額去重後合併、版本紀錄接起來，然後 other 作廢
- L3568 `mergeDuplicateProperties(dryRun)` — 合併同一人底下重複的不動產卡。dryRun=true 只算不改。回傳 {clients:n, props:n, names:[]}
- L3593 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3601 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3619 `floorsFromBuildInfo(bi)` — 建物標示 → 總樓層（「12層」）、建築完成年（民國「88年05月」）
- L3620 `builtYearFromBuildInfo(bi)`
- L3622 `jobSummary(c)` — 基本頁 → 「上班族（某公司），月收 6 萬，薪轉，有報稅」
- L3632 `googleCommunity()`
- L3637 `syncFloorsToEval()`
- L3638 `syncBuiltYearToEval()`
- L3639 `processCompanyData(raw)`

### Toolbar visibility settings  (L4364)
- L4379 `toggleMainMenu(e)`
- L4390 `closeMainMenu()`
- L4394 `closeImportMenu()`
- L4401 `loadBtnVis()`
- L4409 `saveBtnVis()`
- L4414 `toggleBtnSettings(e)`
- L4428 `renderBtnSettings()`
- L4436 `setBtnVis(id,val)`
- L4453 `uiDialog(o)`
- L4473 `_uiDlgClose(val)`
- L4477 `uiConfirm(msg,o)`
- L4478 `uiAlert(msg)`
- L4479 `uiPrompt(msg,value)`

### UI helpers  (L4496)
- L4497 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4502 `remSt(r)`
- L4508 `remChip(r,rt)`
- L4535 `updateStats()`
- L4579 `calEsc(s)`
- L4580 `calMonth(delta)`
- L4587 `renderCalendar()`
- L4633 `openCalModal()`
- L4634 `closeCalModal()`
- L4637 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4682 `closeDayView()`
- L4688 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4689 `loadGoogleCalCache()`
- L4692 `syncGoogleCal(silent)`
- L4713 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4738)
- L4746 `staleDays()`
- L4747 `setStaleDays(n)`
- L4748 `lastLogDate(c)`
- L4749 `daysSince(d)`
- L4750 `isMuted(c)`
- L4751 `staleBase(c)`
- L4752 `isStale(c)`
- L4753 `isNever(c)`
- L4754 `staleTag(c)`
- L4760 `muteBtn(c)`
- L4762 `weekEndStr()`
- L4763 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4774)
- L4776 `saveViewState()`
- L4779 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4789)
- L4791 `onSearchInput()`
- L4796 `clearSearch()`
- L4800 `updateSearchClear()`
- L4808 `pushRecent(id)`
- L4815 `onSearchFocus(on)`
- L4820 `refreshRecentRow()`
- L4828 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4834)
- L4838 `setCardMode(full)`
- L4843 `renderCardModePicker()`
- L4850 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4851)
- L4854 `loadMoreCards()`
- L4857 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4878 `watchLoadMore()`
- L4885 `setTimeFilter(t)`
- L4891 `setTab(t)`
- L4902 `hl(text,q)` — Highlight matching keyword in text
- L4911 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4938 `openMapExport()`
- L4944 `mapRowMatch(r)`
- L4945 `mapPickBatch(b)`
- L4946 `closeMapExport()`
- L4947 `buildMapRows()`
- L4966 `renderMapCatBar()`
- L4972 `toggleMapCat(h)`
- L4973 `mapSelectAll(v)`
- L4974 `updateMapCount()`
- L4979 `renderMapList()`
- L4996 `downloadMapCsv()`
- L5019 `openListTool()`
- L5027 `closeListTool()`
- L5028 `ltToggleFilter()`
- L5029 `ltToggleCat(h)`
- L5030 `ltToggleCheck(id,on)`
- L5031 `ltVisible()`
- L5039 `ltSelectAllVisible(v)`
- L5040 `renderListTool()`
- L5060 `ltTagBatch()`
- L5070 `closeLtBatch()`
- L5071 `ltBatchApply()`
- L5085 `findBySerial(s)`
- L5087 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L5096 `unlinkRelation(a,b)`
- L5102 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L5118 `openRelPicker()`
- L5128 `closeRelPick()`
- L5129 `renderRelPickList()`
- L5143 `addRelation(targetId)`
- L5154 `removeRelation(serial)`
- L5169 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L5179 `renderCoOwners()`
- L5197 `ltMapCsv()`
- L5214 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L5231 `loadXlsxStyle()`
- L5247 `digitsOf(s)` — 謄本原文那種 CRM 沒拆開存的欄位（所有權部、債務人、義務人、權利人…）照總檔原值；兩邊都沒有的才用 CRM 資料湊一個看得懂的。
- L5248 `loansToRights(loans)`
- L5260 `companyExportRows(list)`
- L5311 `buildCompanyWorkbook(X,rows)`
- L5318 `buildCompanySheet(X,rows)`
- L5334 `ltExportCompany()`
- L5349 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L5365 `noticeSlip(c,dv)`
- L5383 `ltPrintNotice()`
- L5414 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L5439 `render()`
- L5598 `openHeatPick(e,id)`
- L5615 `openMutePick(e,id)`
- L5632 `applyMutePick(days)`
- L5640 `closeHeatPick()`
- L5641 `applyHeatPick(h)`
- L5654 `togglePin(id,e)`

### Batch select mode  (L5666)
- L5670 `getVisibleList()`
- L5679 `toggleSelectMode()`
- L5686 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5692 `exitSelectMode()`
- L5698 `toggleSelect(id,e)`
- L5705 `batchDeleteSelected()` — 批次刪除勾選的客戶：不加黑名單（之後重新匯入會再建回來）；確認視窗列人數與前幾個名字
- L5719 `batchClearReimport()` — 清掉勾選的人的 🔁 二次匯入記號（例如只是為了補持分重匯一次，不想留記號）
- L5730 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5736 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5741 `batchSelectAll()`
- L5749 `updateBatchBar()`
- L5760 `applyBatchCategory()`
- L5771 `clearRemind(e,id)`

### 電話點擊  (L5786)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5787)
- L5800 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5811)

### 表單髒標記  (L5825)

### 瀏覽器推播通知  (L5829)
- L5830 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5834 `checkReminders()`

### 鍵盤快捷鍵  (L5850)
- L5895 `syncToEval(targetId,val)`
- L5899 `syncLandtax(field,val)`
- L5904 `extractDistrict(addr)`
- L5907 `autoFillDistrict(addr)`
- L5915 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5924 `openCalendar(id)`
- L5941 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5943)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5944)
- L5949 `nextDocState(cur)`
- L5954 `saveCustomDocs()`
- L5958 `allDocNames()`
- L5962 `addCustomDoc()`
- L5969 `removeCustomDoc(name)`
- L5977 `renderDocChips()`
- L5989 `toggleDoc(name)`
- L5995 `fillExtraFields(c)`
- L6013 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L6021 `renderBatchChips()` — 來源批次籤：顯示 #fBatch（「、」串接）裡的每一個，✕ 可移除；新增從輸入框 Enter
- L6028 `addBatchChip()`
- L6035 `removeBatchChip(b)`
- L6041 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L6047 `creditSet()`
- L6048 `renderCreditChips()`
- L6053 `toggleCredit(o)`
- L6064 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L6070 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L6075)
- L6076 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L6096 `applyReadOnlyToSheet()` — 唯讀：面板所有輸入欄鎖住（看得到、不能改）；按鈕由 CSS .readonly 隱藏
- L6102 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L6103 `openAdd()`
- L6147 `isSheetOpen()`
- L6149 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L6180 `openEdit(id)`
- L6260 `closeSheet()`
- L6281 `evalCtx(c,p)`
- L6286 `renderPriceEval(c)`
- L6470 `calcEvalBuildArea()`
- L6524 `calcTotal()`
- L6547 `fmtWan(n)` — 行情／總價範圍文字：好賣價～行情價（萬/坪）、各乘建坪再加車位
- L6548 `priceRangeStr(lo,hi,area,parkVal)`
- L6555 `regionFromAddr(addr)` — 門牌 → 「台北市 中山區」
- L6560 `clientAgeStr(c)` — 客戶年紀：用基本頁的出生年月日（民國）
- L6568 `evalReportText(d)` — 案源評估：純文字排版（空行位置照老闆定的範本，一行都不能動）
- L6607 `generateReport(clientId)`
- L6708 `sSTab(i,el)`
- L6725 `renderCompanyTabs()`
- L6738 `selectCompanyProp(i)`
- L6746 `renderCompanyPanel()`
- L6808 `sSTabTo(i)`
- L6818 `logKindLabel(k)`
- L6819 `logKindTag(k)`
- L6820 `renderLogKindChips()`
- L6824 `renderLogs()`
- L6849 `editLog(i)`
- L6855 `cancelLogEdit()`
- L6856 `saveLogEdit(i)`
- L6872 `markDebtPhoneDeleted(p)`
- L6878 `renderDebtPhones()`
- L6888 `debtPhoneTel(p)` — 債電字串 → tel: 可用的號碼：去掉「（名字）」等註記，#分機 變成「,分機」（撥通後停一下再送分機）
- L6895 `dialDebtPhone(i)`
- L6900 `addDebtPhone()`
- L6901 `setDebtPhone(i,v)`
- L6906 `removeDebtPhone(i)`
- L6910 `addLog()`
- L6922 `defaultRemindTime()` — 填了提醒日期、時間還空白 → 預設 11:30（業主定）
- L6927 `quickRemind(days)`
- L6942 `removeLog(i)`

### Extra Loans  (L6956)
- L6961 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6962 `updateLandLabels()`
- L6966 `renderExtraLands()`
- L6995 `syncExtraAreaLabel(i)`
- L6999 `addExtraLand()`
- L7001 `applyLandShare()` — 土地：全筆坪 × 持分 → 自動填進「土地持分坪」（估價用）；沒填全筆或持分就不動手填的值
- L7012 `renderShareBanner()` — 持分結算條：把「系統實際用的坪數」用大字寫出來，持分<1 橘底、全部持有綠底
- L7030 `updateLandTotals()`
- L7046 `renderExtraLoans()`
- L7055 `addExtraLoan()`
- L7058 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L7100 `addLoanRow()`
- L7108 `removeLoanRow(i)`
- L7116 `rocShort(iso)` — 西元 2026-10-19 → 民國 115/10/19
- L7117 `toggleLoanConfirm(i)`
- L7123 `setLoanField(i,key,val)`
- L7134 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L7149 `renderFinProofs()`
- L7158 `addFinProof()`
- L7160 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L7170 `syncDocFromProof(type)`
- L7198 `addrForGeo(raw,district)` — 門牌 → 查座標用字串：丟樓層／室／戶、「號之N」「N-M號」→「N之M號」、只留到「號」、多門牌共用號取第一個、沒縣市用區名補。回 {q, level, notes}
- L7223 `geoParts(s)` — 拆地址成 區／巷／弄／主號／之號，給 geoGrade 比對用。Google 回傳的「458-460號」「88~92號」是範圍寫法，含在內就算對；「5 之1號」有空白也認
- L7234 `geoGrade(q,addr)`
- L7249 `propsNeedingGeo(onlyIds,scope)` — scope：打的字若是現有批次名（例「包區 115/10 大安區」）就只查那個批次的人；不是批次名就當區名（例「大安區」）比門牌／地段欄；留空＝全部
- L7270 `loadGeoLib()`
- L7282 `geocodeOne(q)`
- L7293 `geoNeighborQueries(q)` — 查不到就用旁邊的門牌代查（業主 2026/10/20：173 查不到就查 171，一定在旁邊）：同側隔兩號優先 → 173 給 [171,175,169,177]；有「之」號的不代
- L7302 `geocodeProps(targets,onProgress)`
- L7336 `geoStopText(code)`
- L7342 `geoSummaryText(st,total)`
- L7349 `geoProblemList(scope)` — 某範圍內已查過但「不準」或「查無」的清單（給業主事後翻看、去面板重查或貼座標）
- L7365 `geocodeTool()` — 設定頁按鈕：查所有還沒查過／門牌改過的不動產
- L7389 `geocodeAfterImport(ids)` — 匯入後自動查：只查這批人（新建＋併入）裡還沒座標的；背景跑，跑完存檔，不跳視窗只給 toast（不準的留到設定頁再看）
- L7399 `geoTagHtml(p)` — 面板：門牌旁的座標標籤＋重查
- L7406 `renderGeoTag()`
- L7412 `parseLatLng(txt)` — 手動貼座標：接受「25.0304,121.5521」或 Google 地圖網址（@25.03,121.55 或 q=25.03,121.55 或 !3d25.03!4d121.55
- L7421 `pasteGeoCurrent()`
- L7432 `regeocodeCurrent()`
- L7451 `toggleMapLock()`
- L7452 `renderMapLock()`
- L7453 `geoKey(g)`
- L7456 `mapGroupPoints(list,cats,staleOnly,stalePred,visited,visitedPred)` — cats：要上圖的分類（null＝全部）；staleOnly＋stalePred：只看久未聯絡；visited：'all'／'no'／'yes' ＋ visitedPred（跑過沒
- L7470 `openMapView(opts)`
- L7486 `closeMapView()`
- L7488 `mapBatchOptions(list)` — 有定位過的批次：[{b, n}]，n＝那批有座標的不動產數
- L7493 `renderMapBatchSelect()`
- L7500 `mapSearchChanged()`
- L7502 `updateMapBackBtn()` — 主畫面的「回地圖」鈕：路線有站、或這次開過地圖就顯示
- L7504 `renderMapSelChip()`
- L7505 `mapClearSel()`
- L7506 `mapScopeList()`
- L7515 `lastSiteVisit(c)` — 跑過了＝有「現場拜訪」的聯絡記錄。lastSiteVisit 回最近一次日期；visitedWithin 看是否在幾天內
- L7516 `visitedWithin(c,days)`
- L7518 `markVisitedClients(list)` — 把這些人標成今天跑過：各寫一筆今天的「現場拜訪」記錄（今天已有就不重複）。回寫了幾人
- L7529 `routeMarkVisited(k)`
- L7538 `mapPinIcon(hex,stop,visited)`
- L7541 `mapRender()`
- L7570 `mapRefit()`
- L7571 `mapEntryHtml(e)`
- L7585 `mapOpenInfo(k)`
- L7593 `mapDragEnd(k,lat,lng)` — 拖針：這個點上所有不動產的座標改成拖到的位置，存成手填
- L7603 `mapShowMissing()`

### 路線  (L7608)
- L7609 `routeAdd(k)` — ── 路線 ──
- L7610 `routeRemove(k)`
- L7611 `routeMove(i,d)`
- L7612 `routeClear()`
- L7613 `routeAddInView()`
- L7618 `geoDist(a,b)`
- L7620 `routeNearestOrder(keys,pts)` — 最近順序：從第一站出發，每次走到最近的下一站；排完再跑「交叉解開」（2-opt）：路線上有兩段交叉就把中間那段反過來，直到沒得改，整條會變直、不折返
- L7626 `routeUncross(order,pts)`
- L7642 `routeLength(keys,pts)`
- L7643 `routeOptimize()`
- L7651 `routeNavUrls(keys,pts)` — Google 地圖導航網址：一段最多 10 站（起點用「目前位置」，中途最多 9 個），超過就分段，下一段的起點＝上一段的終點
- L7662 `routeOpenNav(seg)`
- L7668 `renderRouteList()`
- L7689 `openMapForProp()` — 📍 地圖：用門牌開 Google 地圖釘一根針（手機會直接開地圖 App）
- L7694 `openLandZoneQuery()`
- L7707 `calcAge()`

### Properties (多筆不動產)  (L7722)
- L7726 `emptyProperty(n)`
- L7735 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L7745 `migrateProperties(c)`
- L7768 `renderPropTabs()`
- L7777 `startRenameTab(e,idx)`
- L7791 `finishRenameTab(inp,idx)`
- L7797 `savePropFields()`
- L7841 `loadPropFields(idx)`
- L7890 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L7925 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L7955 `openLoanCalc()`
- L7988 `renderLoanHints()`
- L8011 `togglePrivateConfirm(v)`
- L8016 `switchProperty(idx)`
- L8022 `addProperty()`
- L8031 `removeProperty(idx)`
- L8042 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L8049)
- L8054 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L8071 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L8078 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L8085 `updateEvalIndicator()`

### 謄本 Import  (L8093)
- L8104 `openTenModal()`
- L8117 `closeTenModal()`
- L8119 `normNum(s)`
- L8126 `detectTenType(text)`
- L8139 `parseBiao(text)`
- L8164 `parseSuo(text)`
- L8180 `parseTa(text)`
- L8202 `extractPdfText(file)`
- L8228 `handleTenFiles(files)`
- L8268 `tenToggleRaw(idx)`
- L8277 `renderTenPreview()`
- L8302 `doTenImport()`
- L8316 `applyTenParsed(mode)`
- L8354 `onTenModeChange()`
- L8361 `filterTenClients()`
- L8382 `selectTenClient(id)`
- L8387 `saveClient(silent)`
- L8492 `scheduleDraftSave()`
- L8500 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L8505)
- L8507 `takeSnapshot(id)`
- L8513 `updateRevertBtn()`
- L8518 `revertClient()`
- L8534 `deleteClient()`
- L8544 `blacklistClient()`

### AI 整理匯入  (L8556)
- L8559 `openAiImport()`
- L8568 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L8570)
- L8572 `checkInbox()`
- L8582 `openInbox()`
- L8595 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L8601 `parseAiImport()`
- L8628 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L8641 `normAddr(s)`
- L8644 `cleanAddr(s)` — 門牌統一寫法（存檔、匯入、整理工具都用這個）：全形數字→半形、「五樓」→「5樓」、去掉所有空白。台／臺不動。
- L8649 `addrCore(s)`
- L8655 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L8656 `isMaskedName(n)`
- L8658 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L8669 `addrHit(a,b)`
- L8672 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L8720 `renderAiPreview()`
- L8775 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L8794 `setAiDecision(i,v)`
- L8797 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L8811 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L8817 `parseShare(s,num,den)`
- L8831 `emptyProp()`
- L8839 `recordToProps(rec)`
- L8923 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L8961 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L9047)
- L9048 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L9086 `shareClient()`
- L9095 `closeShare()`
- L9096 `copyShareCode()`
- L9104 `nativeShareCode()`

### XLS Import  (L9109)
- L9110 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L9118 `closeImport()`

### Blacklist UI  (L9120)
- L9121 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L9141 `closeBlacklist()`
- L9148 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L9163 `handleXls(file)`
- L9192 `doImport()`
- L9206 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L9213 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L9215 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L9223 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L9226 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L9233 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L9242 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L9258 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L9271 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L9272 `applyNewRulesToExisting(dryRun)`
- L9367 `runApplyNewRules()`
- L9383 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L9428 `normalizeAllAddrs(dryRun)` — 門牌統一半形：所有客戶地址、戶籍地址、每張不動產卡的門牌。dryRun 只算
- L9437 `cleanupAddrs()`
- L9451 `dedupeClientLogs(c,dryRun)` — 3 被截斷的半句（≥8 字、有另一筆更長且以它開頭、總檔原文裡沒這半句）丟掉。丟掉的都記進 deletedLogKeys，匯入不會再帶回。
- L9475 `dedupeAllLogs(dryRun)`
- L9481 `cleanFalseReimports(dryRun)` — 清掉「假的」二次匯入記號：舊版跟最新一模一樣（只差空白）的版本紀錄刪掉；之後沒有任何真正不同舊版的人，把「總檔更新：…有變」的記號拿掉
- L9500 `cleanupFalseReimports()`
- L9511 `cleanupDupLogs()`
- L9522 `cleanupDuplicateProps()`
- L9534 `cleanupInvalidEmpty()`
- L9552 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L9593 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L9628 `clearAllData()`

### City Filter  (L9650)
- L9654 `initCityFilter()`
- L9665 `toggleCityFilter()`
- L9673 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L9679 `onCityChange()`
- L9688 `selectAllCities()`
- L9693 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L9698)

### 批次管理視窗  (L9701)
- L9702 `openBatchMgr()` — ── 批次管理視窗 ──
- L9708 `closeBatchMgr()`
- L9709 `batchMgrSuggestAll()`
- L9710 `batchMgrResetAll()`
- L9711 `batchMgrApply()`

### t141 多批次：batch 仍是一格文字，多個用「、」串接；一律用下面這幾個函式讀寫  (L9723)
- L9725 `batchList(c)`
- L9726 `batchJoin(arr)`
- L9727 `batchAdd(c,b)`
- L9728 `batchSetAll(c,label)`
- L9731 `batchNameFromFile(fname,now)` — 匯入檔名 → 預設批次名「包區 民國年/月 剩下的字」：檔名有日期就用檔名的（1150318、115_03、115-03、1158、11510、2026-10、20261019 都
- L9741 `suggestBatchName(b)`
- L9749 `allBatches()`
- L9750 `batchFilterPass(c)`
- L9751 `refreshBatchDatalist()`
- L9756 `renderBatchCheckboxes()`
- L9765 `onBatchChange()`
- L9766 `clearBatchFilter()`
- L9771 `renderBatchTagCatBar()`
- L9775 `toggleBatchTagCat(h)`
- L9777 `openBatchTag()`
- L9789 `closeBatchTag()`
- L9796 `openBatchTagForImport(info)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L9815 `batchTagVisible()`
- L9825 `updateBatchTagCount(visLen)`
- L9826 `renderBatchTagList()`
- L9842 `toggleBatchTagPick(id,on)`
- L9843 `batchTagSelectAll(v)`
- L9844 `batchTagApply()`

### Init time dropdowns  (L9875)
- L9876 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L9886)

## 重要畫面元件 id（L 行號）
- #mainApp L1213
- #statsBar L1217
- #mainMenu L1225
- #tabSelect L1251
- #searchInput L1248
- #cityFilterPanel L1254
- #listWrap L1287
- #batchBar L1295
- #sheetBg L1365
- #sheetTitle L1431
- #saveStatus L1432
- #sp0 L1453
- #sp1 L1616
- #sp2 L1729
- #sp3 L1754
- #sp4 L1761
- #sp5 L1765
- #heatChips L1498
- #creditChips L1569
- #docChips L1576
- #finProofList L1537
- #loanRowList L1690
- #priceEvalPanel L1763
- #urlSettingsBg L1849
- #uiDlgBg L1788
- #themePicker L1911
- #cardModePicker L1909

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
