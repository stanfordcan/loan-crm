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
- L1895: <style>
- L1908: </style>
- L1994: <style>
- L2003: </style>
- L2158: <script>
- L5341: </style></head><body>${pages}<script>window.onload=function(
- L6622: <style>
- L6629: </style></head>
- L6630: <body>
- L6637: </body></html>
- L9318: </script>
- L9319: </body>

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
- L2166 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L2169 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L2182)
- L2183 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L2212 `normalizeTime(val)`
- L2237 `fixPhone(val)`
- L2246 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2254 `saveLocal()`
- L2266 `loadLocal()`
- L2297 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2308)
- L2313 `saveMemos()`
- L2318 `loadMemos()`
- L2325 `addMemo(src)`
- L2346 `toggleMemoDone(id)`
- L2354 `deleteMemo(id)`
- L2359 `memoItemHtml(m)`
- L2378 `renderMemos()`
- L2404 `checkMemoReminders()`
- L2421 `openMemoModal()`
- L2425 `closeMemoModal()`

### Auto-classify  (L2429)
- L2430 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2436)
- L2437 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2440 `loadBlacklist()`
- L2447 `addToBlacklist(c)`
- L2463 `isBlacklisted(phone,idno,buildNo,name)`
- L2477 `removeFromBlacklist(i)`
- L2484 `updateBlacklistBtn()`

### Google Sheets sync  (L2489)

### Sync  (L2567)
- L2568 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2620 `syncData()`
- L2640 `pushToSheet()`

### Company Sheet (JSONP)  (L2647)
- L2648 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2676 `driveSubFolderName(name,addr,district,section,landNo,isoDate)` — 子資料夾名：民國日期_客戶名_門牌；沒門牌就用 地段號＋地號（例：1151019_張聖平_台北市中山區建國北路二段92號12樓）
- L2683 `createDriveFolder()`
- L2714 `openDriveFolder()`
- L2720 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2721 `curDriveUrl()`
- L2722 `openCloudFolder()`
- L2723 `renderCloudTab()`
- L2763 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2791 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2802 `syncFromCompany()`

### 疑似重複比對  (L2838)
- L2841 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2844 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2846 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2854 `findDupCandidates(c)`
- L2900 `liveDupCheck()`
- L2910 `renderDupPanel(c)`
- L2944 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2947 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L2954 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L2964 `foldClientInto(a,b)`
- L3010 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L3021 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L3035 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L3050)
- L3053 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L3070 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L3101 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L3148)
- L3151 `showClaudeReviewModal(pendingCases,onComplete)`
- L3170 `_renderCR(aiResults,errMsg)`
- L3209 `claudeDecide(index,decision)`
- L3219 `claudeReviewApply()`
- L3229 `claudeReviewSkipAll()`
- L3241 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L3247 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L3254 `cleanCreditorName(name)`
- L3268 `parseRightsLoans(text)`
- L3327 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3362 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3367 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3378 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3388 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3395 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3398 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3427 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3436 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3457)
- L3463 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3469 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3483 `propIdOf(p)` — 兩張不動產卡是不是同一間（整理工具用）：都有自己的建號就比建號；否則門牌正規化後要「完全一樣」（不用前綴比對，5樓 跟 5樓之1 不能併）
- L3484 `propListOf(p)`
- L3485 `samePropPair(a,b)`
- L3502 `foldPropInto(keep,other)` — 把 other 併進 keep：欄位只補空白、抵押列依登序或名稱＋金額去重後合併、版本紀錄接起來，然後 other 作廢
- L3517 `mergeDuplicateProperties(dryRun)` — 合併同一人底下重複的不動產卡。dryRun=true 只算不改。回傳 {clients:n, props:n, names:[]}
- L3542 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3550 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3568 `floorsFromBuildInfo(bi)` — 建物標示 → 總樓層（「12層」）、建築完成年（民國「88年05月」）
- L3569 `builtYearFromBuildInfo(bi)`
- L3571 `jobSummary(c)` — 基本頁 → 「上班族（某公司），月收 6 萬，薪轉，有報稅」
- L3581 `googleCommunity()`
- L3586 `syncFloorsToEval()`
- L3587 `syncBuiltYearToEval()`
- L3588 `processCompanyData(raw)`

### Toolbar visibility settings  (L4301)
- L4315 `toggleMainMenu(e)`
- L4326 `closeMainMenu()`
- L4330 `closeImportMenu()`
- L4337 `loadBtnVis()`
- L4345 `saveBtnVis()`
- L4350 `toggleBtnSettings(e)`
- L4364 `renderBtnSettings()`
- L4372 `setBtnVis(id,val)`
- L4389 `uiDialog(o)`
- L4409 `_uiDlgClose(val)`
- L4413 `uiConfirm(msg,o)`
- L4414 `uiAlert(msg)`
- L4415 `uiPrompt(msg,value)`

### UI helpers  (L4432)
- L4433 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4438 `remSt(r)`
- L4444 `remChip(r,rt)`
- L4471 `updateStats()`
- L4515 `calEsc(s)`
- L4516 `calMonth(delta)`
- L4523 `renderCalendar()`
- L4569 `openCalModal()`
- L4570 `closeCalModal()`
- L4573 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4618 `closeDayView()`
- L4624 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4625 `loadGoogleCalCache()`
- L4628 `syncGoogleCal(silent)`
- L4649 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4674)
- L4682 `staleDays()`
- L4683 `setStaleDays(n)`
- L4684 `lastLogDate(c)`
- L4685 `daysSince(d)`
- L4686 `isMuted(c)`
- L4687 `staleBase(c)`
- L4688 `isStale(c)`
- L4689 `isNever(c)`
- L4690 `staleTag(c)`
- L4696 `muteBtn(c)`
- L4698 `weekEndStr()`
- L4699 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4710)
- L4712 `saveViewState()`
- L4715 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4725)
- L4727 `onSearchInput()`
- L4732 `clearSearch()`
- L4736 `updateSearchClear()`
- L4744 `pushRecent(id)`
- L4751 `onSearchFocus(on)`
- L4756 `refreshRecentRow()`
- L4764 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4770)
- L4774 `setCardMode(full)`
- L4779 `renderCardModePicker()`
- L4786 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4787)
- L4790 `loadMoreCards()`
- L4793 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4814 `watchLoadMore()`
- L4821 `setTimeFilter(t)`
- L4827 `setTab(t)`
- L4838 `hl(text,q)` — Highlight matching keyword in text
- L4847 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4874 `openMapExport()`
- L4880 `mapRowMatch(r)`
- L4881 `mapPickBatch(b)`
- L4882 `closeMapExport()`
- L4883 `buildMapRows()`
- L4902 `renderMapCatBar()`
- L4908 `toggleMapCat(h)`
- L4909 `mapSelectAll(v)`
- L4910 `updateMapCount()`
- L4915 `renderMapList()`
- L4932 `downloadMapCsv()`
- L4955 `openListTool()`
- L4963 `closeListTool()`
- L4964 `ltToggleFilter()`
- L4965 `ltToggleCat(h)`
- L4966 `ltToggleCheck(id,on)`
- L4967 `ltVisible()`
- L4975 `ltSelectAllVisible(v)`
- L4976 `renderListTool()`
- L4996 `ltTagBatch()`
- L5006 `closeLtBatch()`
- L5007 `ltBatchApply()`
- L5021 `findBySerial(s)`
- L5023 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L5032 `unlinkRelation(a,b)`
- L5038 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L5054 `openRelPicker()`
- L5064 `closeRelPick()`
- L5065 `renderRelPickList()`
- L5079 `addRelation(targetId)`
- L5090 `removeRelation(serial)`
- L5105 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L5115 `renderCoOwners()`
- L5133 `ltMapCsv()`
- L5150 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L5167 `loadXlsxStyle()`
- L5183 `digitsOf(s)` — 謄本原文那種 CRM 沒拆開存的欄位（所有權部、債務人、義務人、權利人…）照總檔原值；兩邊都沒有的才用 CRM 資料湊一個看得懂的。
- L5184 `loansToRights(loans)`
- L5196 `companyExportRows(list)`
- L5247 `buildCompanyWorkbook(X,rows)`
- L5254 `buildCompanySheet(X,rows)`
- L5270 `ltExportCompany()`
- L5285 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L5301 `noticeSlip(c,dv)`
- L5319 `ltPrintNotice()`
- L5350 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L5375 `render()`
- L5534 `openHeatPick(e,id)`
- L5551 `openMutePick(e,id)`
- L5568 `applyMutePick(days)`
- L5576 `closeHeatPick()`
- L5577 `applyHeatPick(h)`
- L5590 `togglePin(id,e)`

### Batch select mode  (L5602)
- L5606 `getVisibleList()`
- L5615 `toggleSelectMode()`
- L5622 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5628 `exitSelectMode()`
- L5634 `toggleSelect(id,e)`
- L5641 `batchDeleteSelected()` — 批次刪除勾選的客戶：不加黑名單（之後重新匯入會再建回來）；確認視窗列人數與前幾個名字
- L5655 `batchClearReimport()` — 清掉勾選的人的 🔁 二次匯入記號（例如只是為了補持分重匯一次，不想留記號）
- L5666 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5672 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5677 `batchSelectAll()`
- L5685 `updateBatchBar()`
- L5696 `applyBatchCategory()`
- L5707 `clearRemind(e,id)`

### 電話點擊  (L5722)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5723)
- L5736 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5747)

### 表單髒標記  (L5761)

### 瀏覽器推播通知  (L5765)
- L5766 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5770 `checkReminders()`

### 鍵盤快捷鍵  (L5786)
- L5831 `syncToEval(targetId,val)`
- L5835 `syncLandtax(field,val)`
- L5840 `extractDistrict(addr)`
- L5843 `autoFillDistrict(addr)`
- L5851 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5860 `openCalendar(id)`
- L5877 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5879)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5880)
- L5885 `nextDocState(cur)`
- L5890 `saveCustomDocs()`
- L5894 `allDocNames()`
- L5898 `addCustomDoc()`
- L5905 `removeCustomDoc(name)`
- L5913 `renderDocChips()`
- L5925 `toggleDoc(name)`
- L5931 `fillExtraFields(c)`
- L5949 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L5957 `renderBatchChips()` — 來源批次籤：顯示 #fBatch（「、」串接）裡的每一個，✕ 可移除；新增從輸入框 Enter
- L5964 `addBatchChip()`
- L5971 `removeBatchChip(b)`
- L5977 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L5983 `creditSet()`
- L5984 `renderCreditChips()`
- L5989 `toggleCredit(o)`
- L6000 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L6006 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L6011)
- L6012 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L6032 `applyReadOnlyToSheet()` — 唯讀：面板所有輸入欄鎖住（看得到、不能改）；按鈕由 CSS .readonly 隱藏
- L6038 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L6039 `openAdd()`
- L6083 `isSheetOpen()`
- L6085 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L6116 `openEdit(id)`
- L6196 `closeSheet()`
- L6217 `evalCtx(c,p)`
- L6222 `renderPriceEval(c)`
- L6406 `calcEvalBuildArea()`
- L6460 `calcTotal()`
- L6483 `fmtWan(n)` — 行情／總價範圍文字：好賣價～行情價（萬/坪）、各乘建坪再加車位
- L6484 `priceRangeStr(lo,hi,area,parkVal)`
- L6491 `regionFromAddr(addr)` — 門牌 → 「台北市 中山區」
- L6496 `clientAgeStr(c)` — 客戶年紀：用基本頁的出生年月日（民國）
- L6504 `evalReportText(d)` — 案源評估：純文字排版（空行位置照老闆定的範本，一行都不能動）
- L6543 `generateReport(clientId)`
- L6644 `sSTab(i,el)`
- L6661 `renderCompanyTabs()`
- L6674 `selectCompanyProp(i)`
- L6682 `renderCompanyPanel()`
- L6744 `sSTabTo(i)`
- L6754 `logKindLabel(k)`
- L6755 `logKindTag(k)`
- L6756 `renderLogKindChips()`
- L6760 `renderLogs()`
- L6785 `editLog(i)`
- L6791 `cancelLogEdit()`
- L6792 `saveLogEdit(i)`
- L6808 `markDebtPhoneDeleted(p)`
- L6814 `renderDebtPhones()`
- L6824 `debtPhoneTel(p)` — 債電字串 → tel: 可用的號碼：去掉「（名字）」等註記，#分機 變成「,分機」（撥通後停一下再送分機）
- L6831 `dialDebtPhone(i)`
- L6836 `addDebtPhone()`
- L6837 `setDebtPhone(i,v)`
- L6842 `removeDebtPhone(i)`
- L6846 `addLog()`
- L6858 `defaultRemindTime()` — 填了提醒日期、時間還空白 → 預設 11:30（業主定）
- L6863 `quickRemind(days)`
- L6878 `removeLog(i)`

### Extra Loans  (L6892)
- L6897 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6898 `updateLandLabels()`
- L6902 `renderExtraLands()`
- L6931 `syncExtraAreaLabel(i)`
- L6935 `addExtraLand()`
- L6937 `applyLandShare()` — 土地：全筆坪 × 持分 → 自動填進「土地持分坪」（估價用）；沒填全筆或持分就不動手填的值
- L6948 `renderShareBanner()` — 持分結算條：把「系統實際用的坪數」用大字寫出來，持分<1 橘底、全部持有綠底
- L6966 `updateLandTotals()`
- L6982 `renderExtraLoans()`
- L6991 `addExtraLoan()`
- L6994 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L7036 `addLoanRow()`
- L7044 `removeLoanRow(i)`
- L7052 `rocShort(iso)` — 西元 2026-10-19 → 民國 115/10/19
- L7053 `toggleLoanConfirm(i)`
- L7059 `setLoanField(i,key,val)`
- L7070 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L7085 `renderFinProofs()`
- L7094 `addFinProof()`
- L7096 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L7106 `syncDocFromProof(type)`
- L7116 `openMapForProp()` — 📍 地圖：用門牌開 Google 地圖釘一根針（手機會直接開地圖 App）
- L7121 `openLandZoneQuery()`
- L7134 `calcAge()`

### Properties (多筆不動產)  (L7149)
- L7153 `emptyProperty(n)`
- L7162 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L7172 `migrateProperties(c)`
- L7195 `renderPropTabs()`
- L7204 `startRenameTab(e,idx)`
- L7218 `finishRenameTab(inp,idx)`
- L7224 `savePropFields()`
- L7268 `loadPropFields(idx)`
- L7316 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L7351 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L7381 `openLoanCalc()`
- L7414 `renderLoanHints()`
- L7437 `togglePrivateConfirm(v)`
- L7442 `switchProperty(idx)`
- L7448 `addProperty()`
- L7457 `removeProperty(idx)`
- L7468 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L7475)
- L7480 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L7497 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L7504 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L7511 `updateEvalIndicator()`

### 謄本 Import  (L7519)
- L7530 `openTenModal()`
- L7543 `closeTenModal()`
- L7545 `normNum(s)`
- L7552 `detectTenType(text)`
- L7565 `parseBiao(text)`
- L7590 `parseSuo(text)`
- L7606 `parseTa(text)`
- L7628 `extractPdfText(file)`
- L7654 `handleTenFiles(files)`
- L7694 `tenToggleRaw(idx)`
- L7703 `renderTenPreview()`
- L7728 `doTenImport()`
- L7742 `applyTenParsed(mode)`
- L7780 `onTenModeChange()`
- L7787 `filterTenClients()`
- L7808 `selectTenClient(id)`
- L7813 `saveClient(silent)`
- L7918 `scheduleDraftSave()`
- L7926 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L7931)
- L7933 `takeSnapshot(id)`
- L7939 `updateRevertBtn()`
- L7944 `revertClient()`
- L7960 `deleteClient()`
- L7970 `blacklistClient()`

### AI 整理匯入  (L7982)
- L7985 `openAiImport()`
- L7994 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L7996)
- L7998 `checkInbox()`
- L8008 `openInbox()`
- L8021 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L8027 `parseAiImport()`
- L8054 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L8067 `normAddr(s)`
- L8070 `cleanAddr(s)` — 門牌統一寫法（存檔、匯入、整理工具都用這個）：全形數字→半形、「五樓」→「5樓」、去掉所有空白。台／臺不動。
- L8075 `addrCore(s)`
- L8081 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L8082 `isMaskedName(n)`
- L8084 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L8095 `addrHit(a,b)`
- L8098 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L8146 `renderAiPreview()`
- L8201 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L8220 `setAiDecision(i,v)`
- L8223 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L8237 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L8243 `parseShare(s,num,den)`
- L8257 `emptyProp()`
- L8265 `recordToProps(rec)`
- L8349 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L8387 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L8473)
- L8474 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L8512 `shareClient()`
- L8521 `closeShare()`
- L8522 `copyShareCode()`
- L8530 `nativeShareCode()`

### XLS Import  (L8535)
- L8536 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L8544 `closeImport()`

### Blacklist UI  (L8546)
- L8547 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L8567 `closeBlacklist()`
- L8574 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L8589 `handleXls(file)`
- L8618 `doImport()`
- L8632 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L8639 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L8641 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L8649 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L8652 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L8659 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L8668 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L8684 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L8697 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L8698 `applyNewRulesToExisting(dryRun)`
- L8793 `runApplyNewRules()`
- L8809 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L8854 `normalizeAllAddrs(dryRun)` — 門牌統一半形：所有客戶地址、戶籍地址、每張不動產卡的門牌。dryRun 只算
- L8863 `cleanupAddrs()`
- L8874 `cleanupDuplicateProps()`
- L8886 `cleanupInvalidEmpty()`
- L8904 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L8945 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L8980 `clearAllData()`

### City Filter  (L9002)
- L9006 `initCityFilter()`
- L9017 `toggleCityFilter()`
- L9025 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L9031 `onCityChange()`
- L9040 `selectAllCities()`
- L9045 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L9050)

### 批次管理視窗  (L9053)
- L9054 `openBatchMgr()` — ── 批次管理視窗 ──
- L9060 `closeBatchMgr()`
- L9061 `batchMgrSuggestAll()`
- L9062 `batchMgrResetAll()`
- L9063 `batchMgrApply()`

### t141 多批次：batch 仍是一格文字，多個用「、」串接；一律用下面這幾個函式讀寫  (L9075)
- L9077 `batchList(c)`
- L9078 `batchJoin(arr)`
- L9079 `batchAdd(c,b)`
- L9080 `batchSetAll(c,label)`
- L9082 `suggestBatchName(b)` — 批次改名建議：新鑫「1150318_資料 (5)」→「新鑫 115/03/18 (5)」（同月多份，保留日）；「115_03 松山區包區」→「包區 115/03 松山區」；「X中人
- L9090 `allBatches()`
- L9091 `batchFilterPass(c)`
- L9092 `refreshBatchDatalist()`
- L9097 `renderBatchCheckboxes()`
- L9106 `onBatchChange()`
- L9107 `clearBatchFilter()`
- L9112 `renderBatchTagCatBar()`
- L9116 `toggleBatchTagCat(h)`
- L9118 `openBatchTag()`
- L9130 `closeBatchTag()`
- L9134 `openBatchTagForImport(newIds)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L9146 `batchTagVisible()`
- L9156 `updateBatchTagCount(visLen)`
- L9157 `renderBatchTagList()`
- L9173 `toggleBatchTagPick(id,on)`
- L9174 `batchTagSelectAll(v)`
- L9175 `batchTagApply()`

### Init time dropdowns  (L9198)
- L9199 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L9209)

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
- #themePicker L1861
- #cardModePicker L1859

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
