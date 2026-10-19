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
- L1893: <style>
- L1906: </style>
- L1992: <style>
- L2001: </style>
- L2156: <script>
- L5255: </style></head><body>${pages}<script>window.onload=function(
- L6536: <style>
- L6543: </style></head>
- L6544: <body>
- L6551: </body></html>
- L9192: </script>
- L9193: </body>

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
- L2164 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L2167 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L2180)
- L2181 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L2210 `normalizeTime(val)`
- L2235 `fixPhone(val)`
- L2244 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2252 `saveLocal()`
- L2264 `loadLocal()`
- L2295 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2306)
- L2311 `saveMemos()`
- L2316 `loadMemos()`
- L2323 `addMemo(src)`
- L2344 `toggleMemoDone(id)`
- L2352 `deleteMemo(id)`
- L2357 `memoItemHtml(m)`
- L2376 `renderMemos()`
- L2402 `checkMemoReminders()`
- L2419 `openMemoModal()`
- L2423 `closeMemoModal()`

### Auto-classify  (L2427)
- L2428 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2434)
- L2435 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2438 `loadBlacklist()`
- L2445 `addToBlacklist(c)`
- L2461 `isBlacklisted(phone,idno,buildNo,name)`
- L2475 `removeFromBlacklist(i)`
- L2482 `updateBlacklistBtn()`

### Google Sheets sync  (L2487)

### Sync  (L2565)
- L2566 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2618 `syncData()`
- L2638 `pushToSheet()`

### Company Sheet (JSONP)  (L2645)
- L2646 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2674 `driveSubFolderName(name,addr,district,section,landNo,isoDate)` — 子資料夾名：民國日期_客戶名_門牌；沒門牌就用 地段號＋地號（例：1151019_張聖平_台北市中山區建國北路二段92號12樓）
- L2681 `createDriveFolder()`
- L2712 `openDriveFolder()`
- L2718 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2719 `curDriveUrl()`
- L2720 `openCloudFolder()`
- L2721 `renderCloudTab()`
- L2761 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2789 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2800 `syncFromCompany()`

### 疑似重複比對  (L2836)
- L2839 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2842 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2844 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2852 `findDupCandidates(c)`
- L2898 `liveDupCheck()`
- L2908 `renderDupPanel(c)`
- L2942 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2945 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L2952 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L2962 `foldClientInto(a,b)`
- L3008 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L3019 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L3033 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L3048)
- L3051 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L3068 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L3099 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L3146)
- L3149 `showClaudeReviewModal(pendingCases,onComplete)`
- L3168 `_renderCR(aiResults,errMsg)`
- L3207 `claudeDecide(index,decision)`
- L3217 `claudeReviewApply()`
- L3227 `claudeReviewSkipAll()`
- L3239 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L3245 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L3252 `cleanCreditorName(name)`
- L3266 `parseRightsLoans(text)`
- L3323 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3358 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3363 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3374 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3384 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3391 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3394 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3423 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3432 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3453)
- L3459 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3465 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3476 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3484 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3502 `floorsFromBuildInfo(bi)` — 建物標示 → 總樓層（「12層」）、建築完成年（民國「88年05月」）
- L3503 `builtYearFromBuildInfo(bi)`
- L3505 `jobSummary(c)` — 基本頁 → 「上班族（某公司），月收 6 萬，薪轉，有報稅」
- L3515 `googleCommunity()`
- L3520 `syncFloorsToEval()`
- L3521 `syncBuiltYearToEval()`
- L3522 `processCompanyData(raw)`

### Toolbar visibility settings  (L4215)
- L4229 `toggleMainMenu(e)`
- L4240 `closeMainMenu()`
- L4244 `closeImportMenu()`
- L4251 `loadBtnVis()`
- L4259 `saveBtnVis()`
- L4264 `toggleBtnSettings(e)`
- L4278 `renderBtnSettings()`
- L4286 `setBtnVis(id,val)`
- L4303 `uiDialog(o)`
- L4323 `_uiDlgClose(val)`
- L4327 `uiConfirm(msg,o)`
- L4328 `uiAlert(msg)`
- L4329 `uiPrompt(msg,value)`

### UI helpers  (L4346)
- L4347 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4352 `remSt(r)`
- L4358 `remChip(r,rt)`
- L4385 `updateStats()`
- L4429 `calEsc(s)`
- L4430 `calMonth(delta)`
- L4437 `renderCalendar()`
- L4483 `openCalModal()`
- L4484 `closeCalModal()`
- L4487 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4532 `closeDayView()`
- L4538 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4539 `loadGoogleCalCache()`
- L4542 `syncGoogleCal(silent)`
- L4563 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4588)
- L4596 `staleDays()`
- L4597 `setStaleDays(n)`
- L4598 `lastLogDate(c)`
- L4599 `daysSince(d)`
- L4600 `isMuted(c)`
- L4601 `staleBase(c)`
- L4602 `isStale(c)`
- L4603 `isNever(c)`
- L4604 `staleTag(c)`
- L4610 `muteBtn(c)`
- L4612 `weekEndStr()`
- L4613 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4624)
- L4626 `saveViewState()`
- L4629 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4639)
- L4641 `onSearchInput()`
- L4646 `clearSearch()`
- L4650 `updateSearchClear()`
- L4658 `pushRecent(id)`
- L4665 `onSearchFocus(on)`
- L4670 `refreshRecentRow()`
- L4678 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4684)
- L4688 `setCardMode(full)`
- L4693 `renderCardModePicker()`
- L4700 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4701)
- L4704 `loadMoreCards()`
- L4707 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4728 `watchLoadMore()`
- L4735 `setTimeFilter(t)`
- L4741 `setTab(t)`
- L4752 `hl(text,q)` — Highlight matching keyword in text
- L4761 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4788 `openMapExport()`
- L4794 `mapRowMatch(r)`
- L4795 `mapPickBatch(b)`
- L4796 `closeMapExport()`
- L4797 `buildMapRows()`
- L4816 `renderMapCatBar()`
- L4822 `toggleMapCat(h)`
- L4823 `mapSelectAll(v)`
- L4824 `updateMapCount()`
- L4829 `renderMapList()`
- L4846 `downloadMapCsv()`
- L4869 `openListTool()`
- L4877 `closeListTool()`
- L4878 `ltToggleFilter()`
- L4879 `ltToggleCat(h)`
- L4880 `ltToggleCheck(id,on)`
- L4881 `ltVisible()`
- L4889 `ltSelectAllVisible(v)`
- L4890 `renderListTool()`
- L4910 `ltTagBatch()`
- L4920 `closeLtBatch()`
- L4921 `ltBatchApply()`
- L4935 `findBySerial(s)`
- L4937 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L4946 `unlinkRelation(a,b)`
- L4952 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L4968 `openRelPicker()`
- L4978 `closeRelPick()`
- L4979 `renderRelPickList()`
- L4993 `addRelation(targetId)`
- L5004 `removeRelation(serial)`
- L5019 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L5029 `renderCoOwners()`
- L5047 `ltMapCsv()`
- L5064 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L5081 `loadXlsxStyle()`
- L5097 `digitsOf(s)` — 謄本原文那種 CRM 沒拆開存的欄位（所有權部、債務人、義務人、權利人…）照總檔原值；兩邊都沒有的才用 CRM 資料湊一個看得懂的。
- L5098 `loansToRights(loans)`
- L5110 `companyExportRows(list)`
- L5161 `buildCompanyWorkbook(X,rows)`
- L5168 `buildCompanySheet(X,rows)`
- L5184 `ltExportCompany()`
- L5199 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L5215 `noticeSlip(c,dv)`
- L5233 `ltPrintNotice()`
- L5264 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L5289 `render()`
- L5448 `openHeatPick(e,id)`
- L5465 `openMutePick(e,id)`
- L5482 `applyMutePick(days)`
- L5490 `closeHeatPick()`
- L5491 `applyHeatPick(h)`
- L5504 `togglePin(id,e)`

### Batch select mode  (L5516)
- L5520 `getVisibleList()`
- L5529 `toggleSelectMode()`
- L5536 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5542 `exitSelectMode()`
- L5548 `toggleSelect(id,e)`
- L5555 `batchDeleteSelected()` — 批次刪除勾選的客戶：不加黑名單（之後重新匯入會再建回來）；確認視窗列人數與前幾個名字
- L5569 `batchClearReimport()` — 清掉勾選的人的 🔁 二次匯入記號（例如只是為了補持分重匯一次，不想留記號）
- L5580 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5586 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5591 `batchSelectAll()`
- L5599 `updateBatchBar()`
- L5610 `applyBatchCategory()`
- L5621 `clearRemind(e,id)`

### 電話點擊  (L5636)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5637)
- L5650 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5661)

### 表單髒標記  (L5675)

### 瀏覽器推播通知  (L5679)
- L5680 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5684 `checkReminders()`

### 鍵盤快捷鍵  (L5700)
- L5745 `syncToEval(targetId,val)`
- L5749 `syncLandtax(field,val)`
- L5754 `extractDistrict(addr)`
- L5757 `autoFillDistrict(addr)`
- L5765 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5774 `openCalendar(id)`
- L5791 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5793)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5794)
- L5799 `nextDocState(cur)`
- L5804 `saveCustomDocs()`
- L5808 `allDocNames()`
- L5812 `addCustomDoc()`
- L5819 `removeCustomDoc(name)`
- L5827 `renderDocChips()`
- L5839 `toggleDoc(name)`
- L5845 `fillExtraFields(c)`
- L5863 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L5871 `renderBatchChips()` — 來源批次籤：顯示 #fBatch（「、」串接）裡的每一個，✕ 可移除；新增從輸入框 Enter
- L5878 `addBatchChip()`
- L5885 `removeBatchChip(b)`
- L5891 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L5897 `creditSet()`
- L5898 `renderCreditChips()`
- L5903 `toggleCredit(o)`
- L5914 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L5920 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L5925)
- L5926 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L5946 `applyReadOnlyToSheet()` — 唯讀：面板所有輸入欄鎖住（看得到、不能改）；按鈕由 CSS .readonly 隱藏
- L5952 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L5953 `openAdd()`
- L5997 `isSheetOpen()`
- L5999 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L6030 `openEdit(id)`
- L6110 `closeSheet()`
- L6131 `evalCtx(c,p)`
- L6136 `renderPriceEval(c)`
- L6320 `calcEvalBuildArea()`
- L6374 `calcTotal()`
- L6397 `fmtWan(n)` — 行情／總價範圍文字：好賣價～行情價（萬/坪）、各乘建坪再加車位
- L6398 `priceRangeStr(lo,hi,area,parkVal)`
- L6405 `regionFromAddr(addr)` — 門牌 → 「台北市 中山區」
- L6410 `clientAgeStr(c)` — 客戶年紀：用基本頁的出生年月日（民國）
- L6418 `evalReportText(d)` — 案源評估：純文字排版（空行位置照老闆定的範本，一行都不能動）
- L6457 `generateReport(clientId)`
- L6558 `sSTab(i,el)`
- L6575 `renderCompanyTabs()`
- L6588 `selectCompanyProp(i)`
- L6596 `renderCompanyPanel()`
- L6658 `sSTabTo(i)`
- L6668 `logKindLabel(k)`
- L6669 `logKindTag(k)`
- L6670 `renderLogKindChips()`
- L6674 `renderLogs()`
- L6699 `editLog(i)`
- L6705 `cancelLogEdit()`
- L6706 `saveLogEdit(i)`
- L6722 `markDebtPhoneDeleted(p)`
- L6728 `renderDebtPhones()`
- L6738 `debtPhoneTel(p)` — 債電字串 → tel: 可用的號碼：去掉「（名字）」等註記，#分機 變成「,分機」（撥通後停一下再送分機）
- L6745 `dialDebtPhone(i)`
- L6750 `addDebtPhone()`
- L6751 `setDebtPhone(i,v)`
- L6756 `removeDebtPhone(i)`
- L6760 `addLog()`
- L6772 `defaultRemindTime()` — 填了提醒日期、時間還空白 → 預設 11:30（業主定）
- L6777 `quickRemind(days)`
- L6792 `removeLog(i)`

### Extra Loans  (L6806)
- L6811 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6812 `updateLandLabels()`
- L6816 `renderExtraLands()`
- L6845 `syncExtraAreaLabel(i)`
- L6849 `addExtraLand()`
- L6851 `applyLandShare()` — 土地：全筆坪 × 持分 → 自動填進「土地持分坪」（估價用）；沒填全筆或持分就不動手填的值
- L6862 `renderShareBanner()` — 持分結算條：把「系統實際用的坪數」用大字寫出來，持分<1 橘底、全部持有綠底
- L6880 `updateLandTotals()`
- L6896 `renderExtraLoans()`
- L6905 `addExtraLoan()`
- L6908 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L6949 `addLoanRow()`
- L6957 `removeLoanRow(i)`
- L6965 `rocShort(iso)` — 西元 2026-10-19 → 民國 115/10/19
- L6966 `toggleLoanConfirm(i)`
- L6972 `setLoanField(i,key,val)`
- L6983 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L6998 `renderFinProofs()`
- L7007 `addFinProof()`
- L7009 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L7019 `syncDocFromProof(type)`
- L7029 `openMapForProp()` — 📍 地圖：用門牌開 Google 地圖釘一根針（手機會直接開地圖 App）
- L7034 `openLandZoneQuery()`
- L7047 `calcAge()`

### Properties (多筆不動產)  (L7062)
- L7066 `emptyProperty(n)`
- L7075 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L7085 `migrateProperties(c)`
- L7108 `renderPropTabs()`
- L7117 `startRenameTab(e,idx)`
- L7131 `finishRenameTab(inp,idx)`
- L7137 `savePropFields()`
- L7181 `loadPropFields(idx)`
- L7229 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L7264 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L7294 `openLoanCalc()`
- L7327 `renderLoanHints()`
- L7350 `togglePrivateConfirm(v)`
- L7355 `switchProperty(idx)`
- L7361 `addProperty()`
- L7370 `removeProperty(idx)`
- L7381 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L7388)
- L7393 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L7410 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L7417 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L7424 `updateEvalIndicator()`

### 謄本 Import  (L7432)
- L7443 `openTenModal()`
- L7456 `closeTenModal()`
- L7458 `normNum(s)`
- L7465 `detectTenType(text)`
- L7478 `parseBiao(text)`
- L7503 `parseSuo(text)`
- L7519 `parseTa(text)`
- L7541 `extractPdfText(file)`
- L7567 `handleTenFiles(files)`
- L7607 `tenToggleRaw(idx)`
- L7616 `renderTenPreview()`
- L7641 `doTenImport()`
- L7655 `applyTenParsed(mode)`
- L7693 `onTenModeChange()`
- L7700 `filterTenClients()`
- L7721 `selectTenClient(id)`
- L7726 `saveClient(silent)`
- L7831 `scheduleDraftSave()`
- L7839 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L7844)
- L7846 `takeSnapshot(id)`
- L7852 `updateRevertBtn()`
- L7857 `revertClient()`
- L7873 `deleteClient()`
- L7883 `blacklistClient()`

### AI 整理匯入  (L7895)
- L7898 `openAiImport()`
- L7907 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L7909)
- L7911 `checkInbox()`
- L7921 `openInbox()`
- L7934 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L7940 `parseAiImport()`
- L7967 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L7980 `normAddr(s)`
- L7982 `addrCore(s)` — 地址核心：去掉縣市區鄉鎮前綴，只留街路門牌（兩邊格式不同也能對上）
- L7988 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L7989 `isMaskedName(n)`
- L7991 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L8002 `addrHit(a,b)`
- L8005 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L8053 `renderAiPreview()`
- L8108 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L8127 `setAiDecision(i,v)`
- L8130 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L8144 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L8150 `parseShare(s,num,den)`
- L8164 `emptyProp()`
- L8172 `recordToProps(rec)`
- L8256 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L8294 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L8380)
- L8381 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L8419 `shareClient()`
- L8428 `closeShare()`
- L8429 `copyShareCode()`
- L8437 `nativeShareCode()`

### XLS Import  (L8442)
- L8443 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L8451 `closeImport()`

### Blacklist UI  (L8453)
- L8454 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L8474 `closeBlacklist()`
- L8481 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L8496 `handleXls(file)`
- L8525 `doImport()`
- L8539 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L8546 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L8548 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L8556 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L8559 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L8566 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L8575 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L8591 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L8604 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L8605 `applyNewRulesToExisting(dryRun)`
- L8700 `runApplyNewRules()`
- L8716 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L8760 `cleanupInvalidEmpty()` — 注意：不看身分證！謄本所有權部本來就帶屋主身分證號，那不是聯絡方式，看了會清不掉。
- L8778 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L8819 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L8854 `clearAllData()`

### City Filter  (L8876)
- L8880 `initCityFilter()`
- L8891 `toggleCityFilter()`
- L8899 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L8905 `onCityChange()`
- L8914 `selectAllCities()`
- L8919 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L8924)

### 批次管理視窗  (L8927)
- L8928 `openBatchMgr()` — ── 批次管理視窗 ──
- L8934 `closeBatchMgr()`
- L8935 `batchMgrSuggestAll()`
- L8936 `batchMgrResetAll()`
- L8937 `batchMgrApply()`

### t141 多批次：batch 仍是一格文字，多個用「、」串接；一律用下面這幾個函式讀寫  (L8949)
- L8951 `batchList(c)`
- L8952 `batchJoin(arr)`
- L8953 `batchAdd(c,b)`
- L8954 `batchSetAll(c,label)`
- L8956 `suggestBatchName(b)` — 批次改名建議：新鑫「1150318_資料 (5)」→「新鑫 115/03/18 (5)」（同月多份，保留日）；「115_03 松山區包區」→「包區 115/03 松山區」；「X中人
- L8964 `allBatches()`
- L8965 `batchFilterPass(c)`
- L8966 `refreshBatchDatalist()`
- L8971 `renderBatchCheckboxes()`
- L8980 `onBatchChange()`
- L8981 `clearBatchFilter()`
- L8986 `renderBatchTagCatBar()`
- L8990 `toggleBatchTagCat(h)`
- L8992 `openBatchTag()`
- L9004 `closeBatchTag()`
- L9008 `openBatchTagForImport(newIds)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L9020 `batchTagVisible()`
- L9030 `updateBatchTagCount(visLen)`
- L9031 `renderBatchTagList()`
- L9047 `toggleBatchTagPick(id,on)`
- L9048 `batchTagSelectAll(v)`
- L9049 `batchTagApply()`

### Init time dropdowns  (L9072)
- L9073 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L9083)

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
- #themePicker L1859
- #cardModePicker L1857

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
