# MAP — index-test.html 函式索引與開發手冊目錄（node dev/map.js 自動產生，勿手改）

> 用法：先在這裡找名字/行號，再用 Read 的 offset/limit 只讀那一段。行號以 index-test.html 為準。

## 檔案骨架
- L7: <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.1
- L8: <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3
- L10: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L11: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L12: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L13: <style>
- L502: </style>
- L503: <script>
- L521: </script>
- L522: </head>
- L523: <body>
- L540: <script>
- L1080: </script>
- L1088: <style>@keyframes cloudPulse{0%,100%{opacity:.45;transform:s
- L1757: <style>
- L1770: </style>
- L1856: <style>
- L1865: </style>
- L2020: <script>
- L4948: </style></head><body>${pages}<script>window.onload=function(
- L6120: <style>
- L6127: </style></head>
- L6128: <body>
- L6135: </body></html>
- L8700: </script>
- L8701: </body>

## 函式索引（行號｜名稱｜說明）

### 外觀主題：'light' | 'dark' | 'auto'（跟隨系統）。存在本機，各裝置各自設定  (L504)
- L507 `getThemeSetting()`
- L508 `applyTheme()`
- L514 `setTheme(s)`

### Firebase 初始化  (L541)

### 單一裝置登入：搶佔 session  (L560)
- L562 `claimSession(uid)` — 回傳 true = 成功登入；false = 使用者取消（auth.signOut() 已在內部呼叫）
- L609 `forceLogout()` — 被其他裝置踢出時執行
- L624 `startAutoPush()` — 啟動定時 push（每 5 分鐘）
- L635 `startReadOnlyRefresh()` — 唯讀模式：每 3 分鐘從雲端重讀一次；也可按提示列的 🔄
- L640 `stopReadOnlyRefresh()`
- L641 `readOnlyReload()`
- L644 `renderReadOnlyBar()`
- L651 `exitReadOnly()`
- L657 `stopAutoPush()` — 停止定時 push
- L729 `doLogin()` — 登入
- L768 `doLogout()` — 登出
- L779 `packData(jsonStr)` — 不支援 CompressionStream 的舊瀏覽器或壓縮出錯 → 退回不壓縮，確保不會卡住（相容）。
- L789 `unpackData(s)` — 解壓縮：沒「GZ:」前綴=舊的未壓縮資料，直接回傳（向下相容）
- L797 `saveToFirestore(ts)` — 寫入 Firestore（ts 可由 saveLocal 傳入，確保本地與雲端時間戳一致）
- L836 `showCloudLock()` — 載入鎖：取得雲端資料時鎖住畫面
- L837 `hideCloudLock()`
- L840 `restoreBackup()` — 從備份還原
- L872 `downloadBackup()` — 下載備份檔到手機/電腦（離線快照，不依賴雲端）
- L897 `restoreFromFile(input)` — 從備份檔還原（讀使用者選的 .json 檔）
- L928 `loadFromFirestore()` — 從 Firestore 載入
- L964 `syncFromFirestoreIfNewer()` — 背景比對 Firestore：只有 Firestore 比本地新時才更新
- L1012 `applyCloudCustomDocs(str)` — 自訂文件清單：雲端有就以雲端為準（跟著帳號走，手機加了電腦也看得到）
- L1017 `saveUrlSettings()` — 儲存 URL 設定到 Firestore（不動客戶資料）
- L1028 `openUrlSettings()`
- L1044 `renderCloudUsage()` — 雲端用量：主文件 data（gzip 後）佔 1 MB 上限的多少；沒存過就現算一次
- L1062 `renderThemePicker()` — 外觀三選一（淺色／深色／跟隨系統）
- L1069 `closeUrlSettings()`
- L1072 `applyUrlSettings()`
- L2028 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L2031 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L2044)
- L2045 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L2074 `normalizeTime(val)`
- L2099 `fixPhone(val)`
- L2108 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2113 `saveLocal()`
- L2120 `loadLocal()`
- L2143 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2154)
- L2159 `saveMemos()`
- L2164 `loadMemos()`
- L2171 `addMemo(src)`
- L2192 `toggleMemoDone(id)`
- L2200 `deleteMemo(id)`
- L2205 `memoItemHtml(m)`
- L2224 `renderMemos()`
- L2250 `checkMemoReminders()`
- L2267 `openMemoModal()`
- L2271 `closeMemoModal()`

### Auto-classify  (L2275)
- L2276 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2282)
- L2283 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2286 `loadBlacklist()`
- L2293 `addToBlacklist(c)`
- L2309 `isBlacklisted(phone,idno,buildNo,name)`
- L2323 `removeFromBlacklist(i)`
- L2330 `updateBlacklistBtn()`

### Google Sheets sync  (L2335)

### Sync  (L2413)
- L2414 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2466 `syncData()`
- L2486 `pushToSheet()`

### Company Sheet (JSONP)  (L2493)
- L2494 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2521 `createDriveFolder()`
- L2550 `openDriveFolder()`
- L2556 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2557 `curDriveUrl()`
- L2558 `openCloudFolder()`
- L2559 `renderCloudTab()`
- L2599 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2627 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2636 `syncFromCompany()`

### 疑似重複比對  (L2672)
- L2675 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2678 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2680 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2688 `findDupCandidates(c)`
- L2734 `liveDupCheck()`
- L2744 `renderDupPanel(c)`
- L2778 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2781 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L2788 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L2798 `foldClientInto(a,b)`
- L2844 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L2855 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L2869 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L2884)
- L2887 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L2904 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L2935 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L2982)
- L2985 `showClaudeReviewModal(pendingCases,onComplete)`
- L3004 `_renderCR(aiResults,errMsg)`
- L3043 `claudeDecide(index,decision)`
- L3053 `claudeReviewApply()`
- L3063 `claudeReviewSkipAll()`
- L3075 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L3081 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L3088 `cleanCreditorName(name)`
- L3102 `parseRightsLoans(text)`
- L3159 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3194 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3199 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3210 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3220 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3227 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3230 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3259 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3268 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3289)
- L3295 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3301 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3312 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3320 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3337 `processCompanyData(raw)`

### Toolbar visibility settings  (L4028)
- L4042 `toggleMainMenu(e)`
- L4053 `closeMainMenu()`
- L4057 `closeImportMenu()`
- L4064 `loadBtnVis()`
- L4072 `saveBtnVis()`
- L4077 `toggleBtnSettings(e)`
- L4091 `renderBtnSettings()`
- L4099 `setBtnVis(id,val)`
- L4116 `uiDialog(o)`
- L4136 `_uiDlgClose(val)`
- L4140 `uiConfirm(msg,o)`
- L4141 `uiAlert(msg)`
- L4142 `uiPrompt(msg,value)`

### UI helpers  (L4159)
- L4160 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4165 `remSt(r)`
- L4171 `remChip(r,rt)`
- L4198 `updateStats()`
- L4241 `calEsc(s)`
- L4242 `calMonth(delta)`
- L4249 `renderCalendar()`
- L4295 `openCalModal()`
- L4296 `closeCalModal()`
- L4299 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4344 `closeDayView()`
- L4350 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4351 `loadGoogleCalCache()`
- L4354 `syncGoogleCal(silent)`
- L4375 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4400)
- L4404 `weekEndStr()`
- L4405 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4415)
- L4417 `saveViewState()`
- L4420 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4430)
- L4432 `onSearchInput()`
- L4437 `clearSearch()`
- L4441 `updateSearchClear()`
- L4449 `pushRecent(id)`
- L4456 `onSearchFocus(on)`
- L4461 `refreshRecentRow()`
- L4469 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4475)
- L4479 `setCardMode(full)`
- L4484 `renderCardModePicker()`
- L4491 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4492)
- L4495 `loadMoreCards()`
- L4498 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4519 `watchLoadMore()`
- L4526 `setTimeFilter(t)`
- L4532 `setTab(t)`
- L4543 `hl(text,q)` — Highlight matching keyword in text
- L4552 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4579 `openMapExport()`
- L4585 `mapRowMatch(r)`
- L4586 `mapPickBatch(b)`
- L4587 `closeMapExport()`
- L4588 `buildMapRows()`
- L4607 `renderMapCatBar()`
- L4613 `toggleMapCat(h)`
- L4614 `mapSelectAll(v)`
- L4615 `updateMapCount()`
- L4620 `renderMapList()`
- L4637 `downloadMapCsv()`
- L4660 `openListTool()`
- L4668 `closeListTool()`
- L4669 `ltToggleFilter()`
- L4670 `ltToggleCat(h)`
- L4671 `ltToggleCheck(id,on)`
- L4672 `ltVisible()`
- L4680 `ltSelectAllVisible(v)`
- L4681 `renderListTool()`
- L4701 `ltTagBatch()`
- L4711 `closeLtBatch()`
- L4712 `ltBatchApply()`
- L4726 `findBySerial(s)`
- L4728 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L4737 `unlinkRelation(a,b)`
- L4743 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L4759 `openRelPicker()`
- L4769 `closeRelPick()`
- L4770 `renderRelPickList()`
- L4784 `addRelation(targetId)`
- L4795 `removeRelation(serial)`
- L4810 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L4820 `renderCoOwners()`
- L4838 `ltMapCsv()`
- L4855 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L4865 `ltExportCompany()`
- L4892 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L4908 `noticeSlip(c,dv)`
- L4926 `ltPrintNotice()`
- L4957 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L4982 `render()`
- L5131 `openHeatPick(e,id)`
- L5146 `closeHeatPick()`
- L5147 `applyHeatPick(h)`
- L5160 `togglePin(id,e)`

### Batch select mode  (L5172)
- L5176 `getVisibleList()`
- L5185 `toggleSelectMode()`
- L5192 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5198 `exitSelectMode()`
- L5204 `toggleSelect(id,e)`
- L5211 `batchDeleteSelected()` — 批次刪除勾選的客戶：不加黑名單（之後重新匯入會再建回來）；確認視窗列人數與前幾個名字
- L5225 `batchClearReimport()` — 清掉勾選的人的 🔁 二次匯入記號（例如只是為了補持分重匯一次，不想留記號）
- L5236 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5242 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5247 `batchSelectAll()`
- L5255 `updateBatchBar()`
- L5266 `applyBatchCategory()`
- L5277 `clearRemind(e,id)`

### 電話點擊  (L5292)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5293)
- L5306 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5317)

### 表單髒標記  (L5331)

### 瀏覽器推播通知  (L5335)
- L5336 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5340 `checkReminders()`

### 鍵盤快捷鍵  (L5356)
- L5401 `syncToEval(targetId,val)`
- L5405 `syncLandtax(field,val)`
- L5415 `extractDistrict(addr)`
- L5418 `autoFillDistrict(addr)`
- L5426 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5435 `openCalendar(id)`
- L5452 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5454)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5455)
- L5460 `nextDocState(cur)`
- L5465 `saveCustomDocs()`
- L5469 `allDocNames()`
- L5473 `addCustomDoc()`
- L5480 `removeCustomDoc(name)`
- L5488 `renderDocChips()`
- L5500 `toggleDoc(name)`
- L5506 `fillExtraFields(c)`
- L5524 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L5532 `renderBatchChips()` — 來源批次籤：顯示 #fBatch（「、」串接）裡的每一個，✕ 可移除；新增從輸入框 Enter
- L5539 `addBatchChip()`
- L5546 `removeBatchChip(b)`
- L5552 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L5558 `creditSet()`
- L5559 `renderCreditChips()`
- L5564 `toggleCredit(o)`
- L5575 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L5581 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L5586)
- L5587 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L5607 `applyReadOnlyToSheet()` — 唯讀：面板所有輸入欄鎖住（看得到、不能改）；按鈕由 CSS .readonly 隱藏
- L5612 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L5613 `openAdd()`
- L5657 `isSheetOpen()`
- L5659 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L5690 `openEdit(id)`
- L5770 `closeSheet()`
- L5791 `evalCtx(c,p)`
- L5796 `renderPriceEval(c)`
- L5970 `calcEvalBuildArea()`
- L6024 `calcTotal()`
- L6044 `generateReport(clientId)`
- L6142 `sSTab(i,el)`
- L6159 `renderCompanyTabs()`
- L6172 `selectCompanyProp(i)`
- L6180 `renderCompanyPanel()`
- L6242 `sSTabTo(i)`
- L6248 `renderLogs()`
- L6263 `markDebtPhoneDeleted(p)`
- L6269 `renderDebtPhones()`
- L6279 `debtPhoneTel(p)` — 債電字串 → tel: 可用的號碼：去掉「（名字）」等註記，#分機 變成「,分機」（撥通後停一下再送分機）
- L6286 `dialDebtPhone(i)`
- L6291 `addDebtPhone()`
- L6292 `setDebtPhone(i,v)`
- L6297 `removeDebtPhone(i)`
- L6301 `addLog()`
- L6311 `quickRemind(days)` — 快速提醒：days=1/3/7/14/30 設成幾天後（時間保留原本的）；0=清除。基本頁與聯絡記錄頁共用
- L6325 `removeLog(i)`

### Extra Loans  (L6339)
- L6344 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6345 `updateLandLabels()`
- L6349 `renderExtraLands()`
- L6378 `syncExtraAreaLabel(i)`
- L6382 `addExtraLand()`
- L6384 `applyLandShare()` — 土地：全筆坪 × 持分 → 自動填進「土地持分坪」（估價用）；沒填全筆或持分就不動手填的值
- L6395 `renderShareBanner()` — 持分結算條：把「系統實際用的坪數」用大字寫出來，持分<1 橘底、全部持有綠底
- L6413 `updateLandTotals()`
- L6429 `renderExtraLoans()`
- L6438 `addExtraLoan()`
- L6441 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L6479 `addLoanRow()`
- L6487 `removeLoanRow(i)`
- L6494 `setLoanField(i,key,val)`
- L6505 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L6520 `renderFinProofs()`
- L6529 `addFinProof()`
- L6531 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L6541 `syncDocFromProof(type)`
- L6550 `openLandZoneQuery()`
- L6562 `calcAge()`

### Properties (多筆不動產)  (L6577)
- L6581 `emptyProperty(n)`
- L6590 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L6600 `migrateProperties(c)`
- L6623 `renderPropTabs()`
- L6632 `startRenameTab(e,idx)`
- L6646 `finishRenameTab(inp,idx)`
- L6652 `savePropFields()`
- L6693 `loadPropFields(idx)`
- L6738 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L6773 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L6803 `openLoanCalc()`
- L6836 `renderLoanHints()`
- L6859 `togglePrivateConfirm(v)`
- L6864 `switchProperty(idx)`
- L6870 `addProperty()`
- L6879 `removeProperty(idx)`
- L6890 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L6897)
- L6902 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L6918 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L6925 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L6932 `updateEvalIndicator()`

### 謄本 Import  (L6940)
- L6951 `openTenModal()`
- L6964 `closeTenModal()`
- L6966 `normNum(s)`
- L6973 `detectTenType(text)`
- L6986 `parseBiao(text)`
- L7011 `parseSuo(text)`
- L7027 `parseTa(text)`
- L7049 `extractPdfText(file)`
- L7075 `handleTenFiles(files)`
- L7115 `tenToggleRaw(idx)`
- L7124 `renderTenPreview()`
- L7149 `doTenImport()`
- L7163 `applyTenParsed(mode)`
- L7201 `onTenModeChange()`
- L7208 `filterTenClients()`
- L7229 `selectTenClient(id)`
- L7234 `saveClient(silent)`
- L7339 `scheduleDraftSave()`
- L7347 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L7352)
- L7354 `takeSnapshot(id)`
- L7360 `updateRevertBtn()`
- L7365 `revertClient()`
- L7381 `deleteClient()`
- L7391 `blacklistClient()`

### AI 整理匯入  (L7403)
- L7406 `openAiImport()`
- L7415 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L7417)
- L7419 `checkInbox()`
- L7429 `openInbox()`
- L7442 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L7448 `parseAiImport()`
- L7475 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L7488 `normAddr(s)`
- L7490 `addrCore(s)` — 地址核心：去掉縣市區鄉鎮前綴，只留街路門牌（兩邊格式不同也能對上）
- L7496 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L7497 `isMaskedName(n)`
- L7499 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L7510 `addrHit(a,b)`
- L7513 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L7561 `renderAiPreview()`
- L7616 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L7635 `setAiDecision(i,v)`
- L7638 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L7652 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L7658 `parseShare(s,num,den)`
- L7672 `emptyProp()`
- L7680 `recordToProps(rec)`
- L7764 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L7802 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L7888)
- L7889 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L7927 `shareClient()`
- L7936 `closeShare()`
- L7937 `copyShareCode()`
- L7945 `nativeShareCode()`

### XLS Import  (L7950)
- L7951 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L7959 `closeImport()`

### Blacklist UI  (L7961)
- L7962 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L7982 `closeBlacklist()`
- L7989 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L8004 `handleXls(file)`
- L8033 `doImport()`
- L8047 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L8054 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L8056 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L8064 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L8067 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L8074 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L8083 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L8099 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L8112 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L8113 `applyNewRulesToExisting(dryRun)`
- L8208 `runApplyNewRules()`
- L8224 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L8268 `cleanupInvalidEmpty()` — 注意：不看身分證！謄本所有權部本來就帶屋主身分證號，那不是聯絡方式，看了會清不掉。
- L8286 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L8327 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L8362 `clearAllData()`

### City Filter  (L8384)
- L8388 `initCityFilter()`
- L8399 `toggleCityFilter()`
- L8407 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L8413 `onCityChange()`
- L8422 `selectAllCities()`
- L8427 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L8432)

### 批次管理視窗  (L8435)
- L8436 `openBatchMgr()` — ── 批次管理視窗 ──
- L8442 `closeBatchMgr()`
- L8443 `batchMgrSuggestAll()`
- L8444 `batchMgrResetAll()`
- L8445 `batchMgrApply()`

### t141 多批次：batch 仍是一格文字，多個用「、」串接；一律用下面這幾個函式讀寫  (L8457)
- L8459 `batchList(c)`
- L8460 `batchJoin(arr)`
- L8461 `batchAdd(c,b)`
- L8462 `batchSetAll(c,label)`
- L8464 `suggestBatchName(b)` — 批次改名建議：新鑫「1150318_資料 (5)」→「新鑫 115/03/18 (5)」（同月多份，保留日）；「115_03 松山區包區」→「包區 115/03 松山區」；「X中人
- L8472 `allBatches()`
- L8473 `batchFilterPass(c)`
- L8474 `refreshBatchDatalist()`
- L8479 `renderBatchCheckboxes()`
- L8488 `onBatchChange()`
- L8489 `clearBatchFilter()`
- L8494 `renderBatchTagCatBar()`
- L8498 `toggleBatchTagCat(h)`
- L8500 `openBatchTag()`
- L8512 `closeBatchTag()`
- L8516 `openBatchTagForImport(newIds)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L8528 `batchTagVisible()`
- L8538 `updateBatchTagCount(visLen)`
- L8539 `renderBatchTagList()`
- L8555 `toggleBatchTagPick(id,on)`
- L8556 `batchTagSelectAll(v)`
- L8557 `batchTagApply()`

### Init time dropdowns  (L8580)
- L8581 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L8591)

## 重要畫面元件 id（L 行號）
- #mainApp L1090
- #statsBar L1094
- #mainMenu L1102
- #tabSelect L1126
- #searchInput L1123
- #cityFilterPanel L1129
- #listWrap L1161
- #batchBar L1168
- #sheetBg L1196
- #sheetTitle L1262
- #saveStatus L1263
- #sp0 L1284
- #sp1 L1446
- #sp2 L1554
- #sp3 L1577
- #sp4 L1584
- #sp5 L1588
- #heatChips L1329
- #creditChips L1399
- #docChips L1406
- #finProofList L1368
- #loanRowList L1515
- #priceEvalPanel L1586
- #urlSettingsBg L1672
- #uiDlgBg L1611
- #themePicker L1729
- #cardModePicker L1727

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
