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
- L1321: <style>
- L1328: </style>
- L1944: <style>
- L1957: </style>
- L2043: <style>
- L2052: </style>
- L2208: <script>
- L5404: </style></head><body>${pages}<script>window.onload=function(
- L6685: <style>
- L6692: </style></head>
- L6693: <body>
- L6700: </body></html>
- L9984: </script>
- L9985: </body>

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
- L2216 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L2219 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L2232)
- L2233 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L2262 `normalizeTime(val)`
- L2287 `fixPhone(val)`
- L2296 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2304 `saveLocal()`
- L2316 `loadLocal()`
- L2347 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2358)
- L2363 `saveMemos()`
- L2368 `loadMemos()`
- L2375 `addMemo(src)`
- L2396 `toggleMemoDone(id)`
- L2404 `deleteMemo(id)`
- L2409 `memoItemHtml(m)`
- L2428 `renderMemos()`
- L2454 `checkMemoReminders()`
- L2471 `openMemoModal()`
- L2475 `closeMemoModal()`

### Auto-classify  (L2479)
- L2480 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2486)
- L2487 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2490 `loadBlacklist()`
- L2497 `addToBlacklist(c)`
- L2513 `isBlacklisted(phone,idno,buildNo,name)`
- L2527 `removeFromBlacklist(i)`
- L2534 `updateBlacklistBtn()`

### Google Sheets sync  (L2539)

### Sync  (L2617)
- L2618 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2670 `syncData()`
- L2690 `pushToSheet()`

### Company Sheet (JSONP)  (L2697)
- L2698 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2726 `driveSubFolderName(name,addr,district,section,landNo,isoDate)` — 子資料夾名：民國日期_客戶名_門牌；沒門牌就用 地段號＋地號（例：1151019_張聖平_台北市中山區建國北路二段92號12樓）
- L2733 `createDriveFolder()`
- L2764 `openDriveFolder()`
- L2770 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2771 `curDriveUrl()`
- L2772 `openCloudFolder()`
- L2773 `renderCloudTab()`
- L2813 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2841 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2852 `syncFromCompany()`

### 疑似重複比對  (L2888)
- L2891 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2894 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2896 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2904 `findDupCandidates(c)`
- L2950 `liveDupCheck()`
- L2960 `renderDupPanel(c)`
- L2994 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2997 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L3004 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L3014 `foldClientInto(a,b)`
- L3060 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L3071 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L3085 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L3100)
- L3103 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L3120 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L3151 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L3198)
- L3201 `showClaudeReviewModal(pendingCases,onComplete)`
- L3220 `_renderCR(aiResults,errMsg)`
- L3259 `claudeDecide(index,decision)`
- L3269 `claudeReviewApply()`
- L3279 `claudeReviewSkipAll()`
- L3291 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L3297 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L3304 `cleanCreditorName(name)`
- L3318 `parseRightsLoans(text)`
- L3377 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3412 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3417 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3428 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3438 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3445 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3448 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3477 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3486 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3507)
- L3513 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3519 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3533 `propIdOf(p)` — 兩張不動產卡是不是同一間（整理工具用）：都有自己的建號就比建號；否則門牌正規化後要「完全一樣」（不用前綴比對，5樓 跟 5樓之1 不能併）
- L3534 `propListOf(p)`
- L3535 `samePropPair(a,b)`
- L3552 `foldPropInto(keep,other)` — 把 other 併進 keep：欄位只補空白、抵押列依登序或名稱＋金額去重後合併、版本紀錄接起來，然後 other 作廢
- L3567 `mergeDuplicateProperties(dryRun)` — 合併同一人底下重複的不動產卡。dryRun=true 只算不改。回傳 {clients:n, props:n, names:[]}
- L3592 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3600 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3618 `floorsFromBuildInfo(bi)` — 建物標示 → 總樓層（「12層」）、建築完成年（民國「88年05月」）
- L3619 `builtYearFromBuildInfo(bi)`
- L3621 `jobSummary(c)` — 基本頁 → 「上班族（某公司），月收 6 萬，薪轉，有報稅」
- L3631 `googleCommunity()`
- L3636 `syncFloorsToEval()`
- L3637 `syncBuiltYearToEval()`
- L3638 `processCompanyData(raw)`

### Toolbar visibility settings  (L4363)
- L4378 `toggleMainMenu(e)`
- L4389 `closeMainMenu()`
- L4393 `closeImportMenu()`
- L4400 `loadBtnVis()`
- L4408 `saveBtnVis()`
- L4413 `toggleBtnSettings(e)`
- L4427 `renderBtnSettings()`
- L4435 `setBtnVis(id,val)`
- L4452 `uiDialog(o)`
- L4472 `_uiDlgClose(val)`
- L4476 `uiConfirm(msg,o)`
- L4477 `uiAlert(msg)`
- L4478 `uiPrompt(msg,value)`

### UI helpers  (L4495)
- L4496 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4501 `remSt(r)`
- L4507 `remChip(r,rt)`
- L4534 `updateStats()`
- L4578 `calEsc(s)`
- L4579 `calMonth(delta)`
- L4586 `renderCalendar()`
- L4632 `openCalModal()`
- L4633 `closeCalModal()`
- L4636 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4681 `closeDayView()`
- L4687 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4688 `loadGoogleCalCache()`
- L4691 `syncGoogleCal(silent)`
- L4712 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4737)
- L4745 `staleDays()`
- L4746 `setStaleDays(n)`
- L4747 `lastLogDate(c)`
- L4748 `daysSince(d)`
- L4749 `isMuted(c)`
- L4750 `staleBase(c)`
- L4751 `isStale(c)`
- L4752 `isNever(c)`
- L4753 `staleTag(c)`
- L4759 `muteBtn(c)`
- L4761 `weekEndStr()`
- L4762 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4773)
- L4775 `saveViewState()`
- L4778 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4788)
- L4790 `onSearchInput()`
- L4795 `clearSearch()`
- L4799 `updateSearchClear()`
- L4807 `pushRecent(id)`
- L4814 `onSearchFocus(on)`
- L4819 `refreshRecentRow()`
- L4827 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4833)
- L4837 `setCardMode(full)`
- L4842 `renderCardModePicker()`
- L4849 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4850)
- L4853 `loadMoreCards()`
- L4856 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4877 `watchLoadMore()`
- L4884 `setTimeFilter(t)`
- L4890 `setTab(t)`
- L4901 `hl(text,q)` — Highlight matching keyword in text
- L4910 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4937 `openMapExport()`
- L4943 `mapRowMatch(r)`
- L4944 `mapPickBatch(b)`
- L4945 `closeMapExport()`
- L4946 `buildMapRows()`
- L4965 `renderMapCatBar()`
- L4971 `toggleMapCat(h)`
- L4972 `mapSelectAll(v)`
- L4973 `updateMapCount()`
- L4978 `renderMapList()`
- L4995 `downloadMapCsv()`
- L5018 `openListTool()`
- L5026 `closeListTool()`
- L5027 `ltToggleFilter()`
- L5028 `ltToggleCat(h)`
- L5029 `ltToggleCheck(id,on)`
- L5030 `ltVisible()`
- L5038 `ltSelectAllVisible(v)`
- L5039 `renderListTool()`
- L5059 `ltTagBatch()`
- L5069 `closeLtBatch()`
- L5070 `ltBatchApply()`
- L5084 `findBySerial(s)`
- L5086 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L5095 `unlinkRelation(a,b)`
- L5101 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L5117 `openRelPicker()`
- L5127 `closeRelPick()`
- L5128 `renderRelPickList()`
- L5142 `addRelation(targetId)`
- L5153 `removeRelation(serial)`
- L5168 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L5178 `renderCoOwners()`
- L5196 `ltMapCsv()`
- L5213 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L5230 `loadXlsxStyle()`
- L5246 `digitsOf(s)` — 謄本原文那種 CRM 沒拆開存的欄位（所有權部、債務人、義務人、權利人…）照總檔原值；兩邊都沒有的才用 CRM 資料湊一個看得懂的。
- L5247 `loansToRights(loans)`
- L5259 `companyExportRows(list)`
- L5310 `buildCompanyWorkbook(X,rows)`
- L5317 `buildCompanySheet(X,rows)`
- L5333 `ltExportCompany()`
- L5348 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L5364 `noticeSlip(c,dv)`
- L5382 `ltPrintNotice()`
- L5413 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L5438 `render()`
- L5597 `openHeatPick(e,id)`
- L5614 `openMutePick(e,id)`
- L5631 `applyMutePick(days)`
- L5639 `closeHeatPick()`
- L5640 `applyHeatPick(h)`
- L5653 `togglePin(id,e)`

### Batch select mode  (L5665)
- L5669 `getVisibleList()`
- L5678 `toggleSelectMode()`
- L5685 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5691 `exitSelectMode()`
- L5697 `toggleSelect(id,e)`
- L5704 `batchDeleteSelected()` — 批次刪除勾選的客戶：不加黑名單（之後重新匯入會再建回來）；確認視窗列人數與前幾個名字
- L5718 `batchClearReimport()` — 清掉勾選的人的 🔁 二次匯入記號（例如只是為了補持分重匯一次，不想留記號）
- L5729 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5735 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5740 `batchSelectAll()`
- L5748 `updateBatchBar()`
- L5759 `applyBatchCategory()`
- L5770 `clearRemind(e,id)`

### 電話點擊  (L5785)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5786)
- L5799 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5810)

### 表單髒標記  (L5824)

### 瀏覽器推播通知  (L5828)
- L5829 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5833 `checkReminders()`

### 鍵盤快捷鍵  (L5849)
- L5894 `syncToEval(targetId,val)`
- L5898 `syncLandtax(field,val)`
- L5903 `extractDistrict(addr)`
- L5906 `autoFillDistrict(addr)`
- L5914 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5923 `openCalendar(id)`
- L5940 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5942)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5943)
- L5948 `nextDocState(cur)`
- L5953 `saveCustomDocs()`
- L5957 `allDocNames()`
- L5961 `addCustomDoc()`
- L5968 `removeCustomDoc(name)`
- L5976 `renderDocChips()`
- L5988 `toggleDoc(name)`
- L5994 `fillExtraFields(c)`
- L6012 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L6020 `renderBatchChips()` — 來源批次籤：顯示 #fBatch（「、」串接）裡的每一個，✕ 可移除；新增從輸入框 Enter
- L6027 `addBatchChip()`
- L6034 `removeBatchChip(b)`
- L6040 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L6046 `creditSet()`
- L6047 `renderCreditChips()`
- L6052 `toggleCredit(o)`
- L6063 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L6069 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L6074)
- L6075 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L6095 `applyReadOnlyToSheet()` — 唯讀：面板所有輸入欄鎖住（看得到、不能改）；按鈕由 CSS .readonly 隱藏
- L6101 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L6102 `openAdd()`
- L6146 `isSheetOpen()`
- L6148 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L6179 `openEdit(id)`
- L6259 `closeSheet()`
- L6280 `evalCtx(c,p)`
- L6285 `renderPriceEval(c)`
- L6469 `calcEvalBuildArea()`
- L6523 `calcTotal()`
- L6546 `fmtWan(n)` — 行情／總價範圍文字：好賣價～行情價（萬/坪）、各乘建坪再加車位
- L6547 `priceRangeStr(lo,hi,area,parkVal)`
- L6554 `regionFromAddr(addr)` — 門牌 → 「台北市 中山區」
- L6559 `clientAgeStr(c)` — 客戶年紀：用基本頁的出生年月日（民國）
- L6567 `evalReportText(d)` — 案源評估：純文字排版（空行位置照老闆定的範本，一行都不能動）
- L6606 `generateReport(clientId)`
- L6707 `sSTab(i,el)`
- L6724 `renderCompanyTabs()`
- L6737 `selectCompanyProp(i)`
- L6745 `renderCompanyPanel()`
- L6807 `sSTabTo(i)`
- L6817 `logKindLabel(k)`
- L6818 `logKindTag(k)`
- L6819 `renderLogKindChips()`
- L6823 `renderLogs()`
- L6848 `editLog(i)`
- L6854 `cancelLogEdit()`
- L6855 `saveLogEdit(i)`
- L6871 `markDebtPhoneDeleted(p)`
- L6877 `renderDebtPhones()`
- L6887 `debtPhoneTel(p)` — 債電字串 → tel: 可用的號碼：去掉「（名字）」等註記，#分機 變成「,分機」（撥通後停一下再送分機）
- L6894 `dialDebtPhone(i)`
- L6899 `addDebtPhone()`
- L6900 `setDebtPhone(i,v)`
- L6905 `removeDebtPhone(i)`
- L6909 `addLog()`
- L6921 `defaultRemindTime()` — 填了提醒日期、時間還空白 → 預設 11:30（業主定）
- L6926 `quickRemind(days)`
- L6941 `removeLog(i)`

### Extra Loans  (L6955)
- L6960 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6961 `updateLandLabels()`
- L6965 `renderExtraLands()`
- L6994 `syncExtraAreaLabel(i)`
- L6998 `addExtraLand()`
- L7000 `applyLandShare()` — 土地：全筆坪 × 持分 → 自動填進「土地持分坪」（估價用）；沒填全筆或持分就不動手填的值
- L7011 `renderShareBanner()` — 持分結算條：把「系統實際用的坪數」用大字寫出來，持分<1 橘底、全部持有綠底
- L7029 `updateLandTotals()`
- L7045 `renderExtraLoans()`
- L7054 `addExtraLoan()`
- L7057 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L7099 `addLoanRow()`
- L7107 `removeLoanRow(i)`
- L7115 `rocShort(iso)` — 西元 2026-10-19 → 民國 115/10/19
- L7116 `toggleLoanConfirm(i)`
- L7122 `setLoanField(i,key,val)`
- L7133 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L7148 `renderFinProofs()`
- L7157 `addFinProof()`
- L7159 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L7169 `syncDocFromProof(type)`
- L7197 `addrForGeo(raw,district)` — 門牌 → 查座標用字串：丟樓層／室／戶、「號之N」「N-M號」→「N之M號」、只留到「號」、多門牌共用號取第一個、沒縣市用區名補。回 {q, level, notes}
- L7222 `geoParts(s)` — 拆地址成 區／巷／弄／主號／之號，給 geoGrade 比對用。Google 回傳的「458-460號」「88~92號」是範圍寫法，含在內就算對；「5 之1號」有空白也認
- L7233 `geoGrade(q,addr)`
- L7248 `propsNeedingGeo(onlyIds,scope)` — scope：打的字若是現有批次名（例「包區 115/10 大安區」）就只查那個批次的人；不是批次名就當區名（例「大安區」）比門牌／地段欄；留空＝全部
- L7269 `loadGeoLib()`
- L7281 `geocodeOne(q)`
- L7292 `geoNeighborQueries(q)` — 查不到就用旁邊的門牌代查（業主 2026/10/20：173 查不到就查 171，一定在旁邊）：同側隔兩號優先 → 173 給 [171,175,169,177]；有「之」號的不代
- L7301 `geocodeProps(targets,onProgress)`
- L7335 `geoStopText(code)`
- L7341 `geoSummaryText(st,total)`
- L7348 `geoProblemList(scope)` — 某範圍內已查過但「不準」或「查無」的清單（給業主事後翻看、去面板重查或貼座標）
- L7364 `geocodeTool()` — 設定頁按鈕：查所有還沒查過／門牌改過的不動產
- L7388 `geocodeAfterImport(ids)` — 匯入後自動查：只查這批人（新建＋併入）裡還沒座標的；背景跑，跑完存檔，不跳視窗只給 toast（不準的留到設定頁再看）
- L7398 `geoTagHtml(p)` — 面板：門牌旁的座標標籤＋重查
- L7405 `renderGeoTag()`
- L7411 `parseLatLng(txt)` — 手動貼座標：接受「25.0304,121.5521」或 Google 地圖網址（@25.03,121.55 或 q=25.03,121.55 或 !3d25.03!4d121.55
- L7420 `pasteGeoCurrent()`
- L7431 `regeocodeCurrent()`
- L7450 `toggleMapLock()`
- L7451 `renderMapLock()`
- L7452 `geoKey(g)`
- L7455 `mapGroupPoints(list,cats,staleOnly,stalePred,visited,visitedPred)` — cats：要上圖的分類（null＝全部）；staleOnly＋stalePred：只看久未聯絡；visited：'all'／'no'／'yes' ＋ visitedPred（跑過沒
- L7469 `openMapView(opts)`
- L7484 `closeMapView()`
- L7486 `mapBatchOptions(list)` — 有定位過的批次：[{b, n}]，n＝那批有座標的不動產數
- L7491 `renderMapBatchSelect()`
- L7497 `mapScopeList()`
- L7505 `lastSiteVisit(c)` — 跑過了＝有「現場拜訪」的聯絡記錄。lastSiteVisit 回最近一次日期；visitedWithin 看是否在幾天內
- L7506 `visitedWithin(c,days)`
- L7508 `markVisitedClients(list)` — 把這些人標成今天跑過：各寫一筆今天的「現場拜訪」記錄（今天已有就不重複）。回寫了幾人
- L7519 `routeMarkVisited(k)`
- L7528 `mapPinIcon(hex,stop,visited)`
- L7531 `mapRender()`
- L7559 `mapRefit()`
- L7560 `mapEntryHtml(e)`
- L7574 `mapOpenInfo(k)`
- L7582 `mapDragEnd(k,lat,lng)` — 拖針：這個點上所有不動產的座標改成拖到的位置，存成手填
- L7592 `mapShowMissing()`

### 路線  (L7597)
- L7598 `routeAdd(k)` — ── 路線 ──
- L7599 `routeRemove(k)`
- L7600 `routeMove(i,d)`
- L7601 `routeClear()`
- L7602 `routeAddInView()`
- L7607 `geoDist(a,b)`
- L7609 `routeNearestOrder(keys,pts)` — 最近順序：從第一站出發，每次走到最近的下一站；排完再跑「交叉解開」（2-opt）：路線上有兩段交叉就把中間那段反過來，直到沒得改，整條會變直、不折返
- L7615 `routeUncross(order,pts)`
- L7631 `routeLength(keys,pts)`
- L7632 `routeOptimize()`
- L7640 `routeNavUrls(keys,pts)` — Google 地圖導航網址：一段最多 10 站（起點用「目前位置」，中途最多 9 個），超過就分段，下一段的起點＝上一段的終點
- L7651 `routeOpenNav(seg)`
- L7657 `renderRouteList()`
- L7678 `openMapForProp()` — 📍 地圖：用門牌開 Google 地圖釘一根針（手機會直接開地圖 App）
- L7683 `openLandZoneQuery()`
- L7696 `calcAge()`

### Properties (多筆不動產)  (L7711)
- L7715 `emptyProperty(n)`
- L7724 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L7734 `migrateProperties(c)`
- L7757 `renderPropTabs()`
- L7766 `startRenameTab(e,idx)`
- L7780 `finishRenameTab(inp,idx)`
- L7786 `savePropFields()`
- L7830 `loadPropFields(idx)`
- L7879 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L7914 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L7944 `openLoanCalc()`
- L7977 `renderLoanHints()`
- L8000 `togglePrivateConfirm(v)`
- L8005 `switchProperty(idx)`
- L8011 `addProperty()`
- L8020 `removeProperty(idx)`
- L8031 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L8038)
- L8043 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L8060 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L8067 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L8074 `updateEvalIndicator()`

### 謄本 Import  (L8082)
- L8093 `openTenModal()`
- L8106 `closeTenModal()`
- L8108 `normNum(s)`
- L8115 `detectTenType(text)`
- L8128 `parseBiao(text)`
- L8153 `parseSuo(text)`
- L8169 `parseTa(text)`
- L8191 `extractPdfText(file)`
- L8217 `handleTenFiles(files)`
- L8257 `tenToggleRaw(idx)`
- L8266 `renderTenPreview()`
- L8291 `doTenImport()`
- L8305 `applyTenParsed(mode)`
- L8343 `onTenModeChange()`
- L8350 `filterTenClients()`
- L8371 `selectTenClient(id)`
- L8376 `saveClient(silent)`
- L8481 `scheduleDraftSave()`
- L8489 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L8494)
- L8496 `takeSnapshot(id)`
- L8502 `updateRevertBtn()`
- L8507 `revertClient()`
- L8523 `deleteClient()`
- L8533 `blacklistClient()`

### AI 整理匯入  (L8545)
- L8548 `openAiImport()`
- L8557 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L8559)
- L8561 `checkInbox()`
- L8571 `openInbox()`
- L8584 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L8590 `parseAiImport()`
- L8617 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L8630 `normAddr(s)`
- L8633 `cleanAddr(s)` — 門牌統一寫法（存檔、匯入、整理工具都用這個）：全形數字→半形、「五樓」→「5樓」、去掉所有空白。台／臺不動。
- L8638 `addrCore(s)`
- L8644 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L8645 `isMaskedName(n)`
- L8647 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L8658 `addrHit(a,b)`
- L8661 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L8709 `renderAiPreview()`
- L8764 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L8783 `setAiDecision(i,v)`
- L8786 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L8800 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L8806 `parseShare(s,num,den)`
- L8820 `emptyProp()`
- L8828 `recordToProps(rec)`
- L8912 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L8950 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L9036)
- L9037 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L9075 `shareClient()`
- L9084 `closeShare()`
- L9085 `copyShareCode()`
- L9093 `nativeShareCode()`

### XLS Import  (L9098)
- L9099 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L9107 `closeImport()`

### Blacklist UI  (L9109)
- L9110 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L9130 `closeBlacklist()`
- L9137 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L9152 `handleXls(file)`
- L9181 `doImport()`
- L9195 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L9202 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L9204 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L9212 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L9215 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L9222 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L9231 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L9247 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L9260 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L9261 `applyNewRulesToExisting(dryRun)`
- L9356 `runApplyNewRules()`
- L9372 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L9417 `normalizeAllAddrs(dryRun)` — 門牌統一半形：所有客戶地址、戶籍地址、每張不動產卡的門牌。dryRun 只算
- L9426 `cleanupAddrs()`
- L9440 `dedupeClientLogs(c,dryRun)` — 3 被截斷的半句（≥8 字、有另一筆更長且以它開頭、總檔原文裡沒這半句）丟掉。丟掉的都記進 deletedLogKeys，匯入不會再帶回。
- L9464 `dedupeAllLogs(dryRun)`
- L9470 `cleanFalseReimports(dryRun)` — 清掉「假的」二次匯入記號：舊版跟最新一模一樣（只差空白）的版本紀錄刪掉；之後沒有任何真正不同舊版的人，把「總檔更新：…有變」的記號拿掉
- L9489 `cleanupFalseReimports()`
- L9500 `cleanupDupLogs()`
- L9511 `cleanupDuplicateProps()`
- L9523 `cleanupInvalidEmpty()`
- L9541 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L9582 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L9617 `clearAllData()`

### City Filter  (L9639)
- L9643 `initCityFilter()`
- L9654 `toggleCityFilter()`
- L9662 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L9668 `onCityChange()`
- L9677 `selectAllCities()`
- L9682 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L9687)

### 批次管理視窗  (L9690)
- L9691 `openBatchMgr()` — ── 批次管理視窗 ──
- L9697 `closeBatchMgr()`
- L9698 `batchMgrSuggestAll()`
- L9699 `batchMgrResetAll()`
- L9700 `batchMgrApply()`

### t141 多批次：batch 仍是一格文字，多個用「、」串接；一律用下面這幾個函式讀寫  (L9712)
- L9714 `batchList(c)`
- L9715 `batchJoin(arr)`
- L9716 `batchAdd(c,b)`
- L9717 `batchSetAll(c,label)`
- L9720 `batchNameFromFile(fname,now)` — 匯入檔名 → 預設批次名「包區 民國年/月 剩下的字」：檔名有日期就用檔名的（1150318、115_03、115-03、1158、11510、2026-10、20261019 都
- L9730 `suggestBatchName(b)`
- L9738 `allBatches()`
- L9739 `batchFilterPass(c)`
- L9740 `refreshBatchDatalist()`
- L9745 `renderBatchCheckboxes()`
- L9754 `onBatchChange()`
- L9755 `clearBatchFilter()`
- L9760 `renderBatchTagCatBar()`
- L9764 `toggleBatchTagCat(h)`
- L9766 `openBatchTag()`
- L9778 `closeBatchTag()`
- L9785 `openBatchTagForImport(info)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L9804 `batchTagVisible()`
- L9814 `updateBatchTagCount(visLen)`
- L9815 `renderBatchTagList()`
- L9831 `toggleBatchTagPick(id,on)`
- L9832 `batchTagSelectAll(v)`
- L9833 `batchTagApply()`

### Init time dropdowns  (L9864)
- L9865 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L9875)

## 重要畫面元件 id（L 行號）
- #mainApp L1211
- #statsBar L1215
- #mainMenu L1223
- #tabSelect L1249
- #searchInput L1246
- #cityFilterPanel L1252
- #listWrap L1285
- #batchBar L1292
- #sheetBg L1364
- #sheetTitle L1430
- #saveStatus L1431
- #sp0 L1452
- #sp1 L1615
- #sp2 L1728
- #sp3 L1753
- #sp4 L1760
- #sp5 L1764
- #heatChips L1497
- #creditChips L1568
- #docChips L1575
- #finProofList L1536
- #loanRowList L1689
- #priceEvalPanel L1762
- #urlSettingsBg L1848
- #uiDlgBg L1787
- #themePicker L1910
- #cardModePicker L1908

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
