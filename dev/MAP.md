# MAP — index-test.html 函式索引與開發手冊目錄（node dev/map.js 自動產生，勿手改）

> 用法：先在這裡找名字/行號，再用 Read 的 offset/limit 只讀那一段。行號以 index-test.html 為準。

## 檔案骨架
- L7: <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.1
- L8: <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3
- L10: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L11: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L12: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L13: <style>
- L480: </style>
- L481: <script>
- L499: </script>
- L500: </head>
- L501: <body>
- L517: <script>
- L1016: </script>
- L1024: <style>@keyframes cloudPulse{0%,100%{opacity:.45;transform:s
- L1665: <style>
- L1678: </style>
- L1764: <style>
- L1773: </style>
- L1923: <script>
- L4845: </style></head><body>${pages}<script>window.onload=function(
- L5959: <style>
- L5966: </style></head>
- L5967: <body>
- L5974: </body></html>
- L8436: </script>
- L8437: </body>

## 函式索引（行號｜名稱｜說明）

### 外觀主題：'light' | 'dark' | 'auto'（跟隨系統）。存在本機，各裝置各自設定  (L482)
- L485 `getThemeSetting()`
- L486 `applyTheme()`
- L492 `setTheme(s)`

### Firebase 初始化  (L518)

### 單一裝置登入：搶佔 session  (L535)
- L537 `claimSession(uid)` — 回傳 true = 成功登入；false = 使用者取消（auth.signOut() 已在內部呼叫）
- L584 `forceLogout()` — 被其他裝置踢出時執行
- L599 `startAutoPush()` — 啟動定時 push（每 5 分鐘）
- L610 `stopAutoPush()` — 停止定時 push
- L673 `doLogin()` — 登入
- L708 `doLogout()` — 登出
- L719 `packData(jsonStr)` — 不支援 CompressionStream 的舊瀏覽器或壓縮出錯 → 退回不壓縮，確保不會卡住（相容）。
- L729 `unpackData(s)` — 解壓縮：沒「GZ:」前綴=舊的未壓縮資料，直接回傳（向下相容）
- L737 `saveToFirestore(ts)` — 寫入 Firestore（ts 可由 saveLocal 傳入，確保本地與雲端時間戳一致）
- L775 `showCloudLock()` — 載入鎖：取得雲端資料時鎖住畫面
- L776 `hideCloudLock()`
- L779 `restoreBackup()` — 從備份還原
- L810 `downloadBackup()` — 下載備份檔到手機/電腦（離線快照，不依賴雲端）
- L835 `restoreFromFile(input)` — 從備份檔還原（讀使用者選的 .json 檔）
- L865 `loadFromFirestore()` — 從 Firestore 載入
- L901 `syncFromFirestoreIfNewer()` — 背景比對 Firestore：只有 Firestore 比本地新時才更新
- L949 `applyCloudCustomDocs(str)` — 自訂文件清單：雲端有就以雲端為準（跟著帳號走，手機加了電腦也看得到）
- L954 `saveUrlSettings()` — 儲存 URL 設定到 Firestore（不動客戶資料）
- L964 `openUrlSettings()`
- L980 `renderCloudUsage()` — 雲端用量：主文件 data（gzip 後）佔 1 MB 上限的多少；沒存過就現算一次
- L998 `renderThemePicker()` — 外觀三選一（淺色／深色／跟隨系統）
- L1005 `closeUrlSettings()`
- L1008 `applyUrlSettings()`
- L1931 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L1934 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L1947)
- L1948 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L1977 `normalizeTime(val)`
- L2002 `fixPhone(val)`
- L2011 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2016 `saveLocal()`
- L2022 `loadLocal()`
- L2045 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2056)
- L2061 `saveMemos()`
- L2066 `loadMemos()`
- L2073 `addMemo(src)`
- L2094 `toggleMemoDone(id)`
- L2102 `deleteMemo(id)`
- L2107 `memoItemHtml(m)`
- L2126 `renderMemos()`
- L2152 `checkMemoReminders()`
- L2169 `openMemoModal()`
- L2173 `closeMemoModal()`

### Auto-classify  (L2177)
- L2178 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2184)
- L2185 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2188 `loadBlacklist()`
- L2195 `addToBlacklist(c)`
- L2211 `isBlacklisted(phone,idno,buildNo,name)`
- L2225 `removeFromBlacklist(i)`
- L2232 `updateBlacklistBtn()`

### Google Sheets sync  (L2237)

### Sync  (L2315)
- L2316 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2368 `syncData()`
- L2388 `pushToSheet()`

### Company Sheet (JSONP)  (L2394)
- L2395 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2422 `createDriveFolder()`
- L2451 `openDriveFolder()`
- L2457 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2458 `curDriveUrl()`
- L2459 `openCloudFolder()`
- L2460 `renderCloudTab()`
- L2500 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2528 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2537 `syncFromCompany()`

### 疑似重複比對  (L2573)
- L2576 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2579 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2581 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2589 `findDupCandidates(c)`
- L2635 `liveDupCheck()`
- L2645 `renderDupPanel(c)`
- L2679 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2682 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L2689 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L2699 `foldClientInto(a,b)`
- L2742 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L2753 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L2767 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L2782)
- L2785 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L2802 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L2833 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L2880)
- L2883 `showClaudeReviewModal(pendingCases,onComplete)`
- L2902 `_renderCR(aiResults,errMsg)`
- L2941 `claudeDecide(index,decision)`
- L2951 `claudeReviewApply()`
- L2961 `claudeReviewSkipAll()`
- L2973 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L2979 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L2986 `cleanCreditorName(name)`
- L3000 `parseRightsLoans(text)`
- L3057 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3092 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3097 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3108 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3118 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3125 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3128 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3157 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3166 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3187)
- L3193 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3199 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3210 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3218 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3235 `processCompanyData(raw)`

### Toolbar visibility settings  (L3926)
- L3940 `toggleMainMenu(e)`
- L3951 `closeMainMenu()`
- L3955 `closeImportMenu()`
- L3962 `loadBtnVis()`
- L3970 `saveBtnVis()`
- L3975 `toggleBtnSettings(e)`
- L3989 `renderBtnSettings()`
- L3997 `setBtnVis(id,val)`
- L4014 `uiDialog(o)`
- L4034 `_uiDlgClose(val)`
- L4038 `uiConfirm(msg,o)`
- L4039 `uiAlert(msg)`
- L4040 `uiPrompt(msg,value)`

### UI helpers  (L4057)
- L4058 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4063 `remSt(r)`
- L4069 `remChip(r,rt)`
- L4096 `updateStats()`
- L4139 `calEsc(s)`
- L4140 `calMonth(delta)`
- L4147 `renderCalendar()`
- L4193 `openCalModal()`
- L4194 `closeCalModal()`
- L4197 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4242 `closeDayView()`
- L4248 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4249 `loadGoogleCalCache()`
- L4252 `syncGoogleCal(silent)`
- L4273 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4298)
- L4302 `weekEndStr()`
- L4303 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4313)
- L4315 `saveViewState()`
- L4318 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4328)
- L4330 `onSearchInput()`
- L4335 `clearSearch()`
- L4339 `updateSearchClear()`
- L4347 `pushRecent(id)`
- L4354 `onSearchFocus(on)`
- L4359 `refreshRecentRow()`
- L4367 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4373)
- L4377 `setCardMode(full)`
- L4382 `renderCardModePicker()`
- L4389 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4390)
- L4393 `loadMoreCards()`
- L4396 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4417 `watchLoadMore()`
- L4424 `setTimeFilter(t)`
- L4430 `setTab(t)`
- L4441 `hl(text,q)` — Highlight matching keyword in text
- L4450 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4477 `openMapExport()`
- L4483 `mapRowMatch(r)`
- L4484 `mapPickBatch(b)`
- L4485 `closeMapExport()`
- L4486 `buildMapRows()`
- L4505 `renderMapCatBar()`
- L4511 `toggleMapCat(h)`
- L4512 `mapSelectAll(v)`
- L4513 `updateMapCount()`
- L4518 `renderMapList()`
- L4535 `downloadMapCsv()`
- L4558 `openListTool()`
- L4566 `closeListTool()`
- L4567 `ltToggleFilter()`
- L4568 `ltToggleCat(h)`
- L4569 `ltToggleCheck(id,on)`
- L4570 `ltVisible()`
- L4578 `ltSelectAllVisible(v)`
- L4579 `renderListTool()`
- L4599 `ltTagBatch()`
- L4609 `closeLtBatch()`
- L4610 `ltBatchApply()`
- L4623 `findBySerial(s)`
- L4625 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L4634 `unlinkRelation(a,b)`
- L4640 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L4656 `openRelPicker()`
- L4666 `closeRelPick()`
- L4667 `renderRelPickList()`
- L4681 `addRelation(targetId)`
- L4692 `removeRelation(serial)`
- L4707 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L4717 `renderCoOwners()`
- L4735 `ltMapCsv()`
- L4752 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L4762 `ltExportCompany()`
- L4789 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L4805 `noticeSlip(c,dv)`
- L4823 `ltPrintNotice()`
- L4854 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L4879 `render()`
- L5027 `openHeatPick(e,id)`
- L5041 `closeHeatPick()`
- L5042 `applyHeatPick(h)`
- L5055 `togglePin(id,e)`

### Batch select mode  (L5066)
- L5070 `getVisibleList()`
- L5079 `toggleSelectMode()`
- L5086 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5092 `exitSelectMode()`
- L5098 `toggleSelect(id,e)`
- L5105 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5111 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5116 `batchSelectAll()`
- L5124 `updateBatchBar()`
- L5135 `applyBatchCategory()`
- L5146 `clearRemind(e,id)`

### 電話點擊  (L5160)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5161)
- L5174 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5185)

### 表單髒標記  (L5199)

### 瀏覽器推播通知  (L5203)
- L5204 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5208 `checkReminders()`

### 鍵盤快捷鍵  (L5224)
- L5269 `syncToEval(targetId,val)`
- L5273 `syncLandtax(field,val)`
- L5283 `extractDistrict(addr)`
- L5286 `autoFillDistrict(addr)`
- L5294 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5303 `openCalendar(id)`
- L5320 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5322)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5323)
- L5328 `nextDocState(cur)`
- L5333 `saveCustomDocs()`
- L5337 `allDocNames()`
- L5341 `addCustomDoc()`
- L5348 `removeCustomDoc(name)`
- L5356 `renderDocChips()`
- L5368 `toggleDoc(name)`
- L5374 `fillExtraFields(c)`
- L5390 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L5398 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L5404 `creditSet()`
- L5405 `renderCreditChips()`
- L5410 `toggleCredit(o)`
- L5421 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L5427 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L5432)
- L5433 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L5453 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L5454 `openAdd()`
- L5498 `isSheetOpen()`
- L5500 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L5531 `openEdit(id)`
- L5610 `closeSheet()`
- L5631 `evalCtx(c,p)`
- L5636 `renderPriceEval(c)`
- L5810 `calcEvalBuildArea()`
- L5863 `calcTotal()`
- L5883 `generateReport(clientId)`
- L5981 `sSTab(i,el)`
- L5998 `renderCompanyTabs()`
- L6011 `selectCompanyProp(i)`
- L6019 `renderCompanyPanel()`
- L6081 `sSTabTo(i)`
- L6087 `renderLogs()`
- L6102 `markDebtPhoneDeleted(p)`
- L6108 `renderDebtPhones()`
- L6116 `addDebtPhone()`
- L6117 `setDebtPhone(i,v)`
- L6122 `removeDebtPhone(i)`
- L6126 `addLog()`
- L6136 `quickRemind(days)` — 快速提醒：days=1/3/7/14/30 設成幾天後（時間保留原本的）；0=清除。基本頁與聯絡記錄頁共用
- L6150 `removeLog(i)`

### Extra Loans  (L6164)
- L6169 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6170 `updateLandLabels()`
- L6174 `renderExtraLands()`
- L6203 `syncExtraAreaLabel(i)`
- L6207 `addExtraLand()`
- L6208 `updateLandTotals()`
- L6224 `renderExtraLoans()`
- L6233 `addExtraLoan()`
- L6236 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L6274 `addLoanRow()`
- L6282 `removeLoanRow(i)`
- L6289 `setLoanField(i,key,val)`
- L6300 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L6315 `renderFinProofs()`
- L6324 `addFinProof()`
- L6326 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L6336 `syncDocFromProof(type)`
- L6345 `openLandZoneQuery()`
- L6357 `calcAge()`

### Properties (多筆不動產)  (L6372)
- L6376 `emptyProperty(n)`
- L6385 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L6395 `migrateProperties(c)`
- L6418 `renderPropTabs()`
- L6427 `startRenameTab(e,idx)`
- L6441 `finishRenameTab(inp,idx)`
- L6447 `savePropFields()`
- L6485 `loadPropFields(idx)`
- L6526 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L6561 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L6591 `openLoanCalc()`
- L6624 `renderLoanHints()`
- L6647 `togglePrivateConfirm(v)`
- L6652 `switchProperty(idx)`
- L6658 `addProperty()`
- L6667 `removeProperty(idx)`
- L6678 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L6685)
- L6690 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L6706 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L6713 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L6720 `updateEvalIndicator()`

### 謄本 Import  (L6728)
- L6739 `openTenModal()`
- L6752 `closeTenModal()`
- L6754 `normNum(s)`
- L6761 `detectTenType(text)`
- L6774 `parseBiao(text)`
- L6799 `parseSuo(text)`
- L6815 `parseTa(text)`
- L6837 `extractPdfText(file)`
- L6863 `handleTenFiles(files)`
- L6903 `tenToggleRaw(idx)`
- L6912 `renderTenPreview()`
- L6937 `doTenImport()`
- L6951 `applyTenParsed(mode)`
- L6989 `onTenModeChange()`
- L6996 `filterTenClients()`
- L7017 `selectTenClient(id)`
- L7022 `saveClient(silent)`
- L7125 `scheduleDraftSave()`
- L7132 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L7137)
- L7139 `takeSnapshot(id)`
- L7145 `updateRevertBtn()`
- L7150 `revertClient()`
- L7166 `deleteClient()`
- L7176 `blacklistClient()`

### AI 整理匯入  (L7188)
- L7191 `openAiImport()`
- L7200 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L7202)
- L7204 `checkInbox()`
- L7214 `openInbox()`
- L7227 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L7233 `parseAiImport()`
- L7260 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L7273 `normAddr(s)`
- L7275 `addrCore(s)` — 地址核心：去掉縣市區鄉鎮前綴，只留街路門牌（兩邊格式不同也能對上）
- L7281 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L7282 `isMaskedName(n)`
- L7284 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L7295 `addrHit(a,b)`
- L7298 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L7346 `renderAiPreview()`
- L7401 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L7420 `setAiDecision(i,v)`
- L7423 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L7437 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L7443 `parseShare(s,num,den)`
- L7457 `emptyProp()`
- L7465 `recordToProps(rec)`
- L7549 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L7586 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L7672)
- L7673 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L7711 `shareClient()`
- L7720 `closeShare()`
- L7721 `copyShareCode()`
- L7729 `nativeShareCode()`

### XLS Import  (L7734)
- L7735 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L7743 `closeImport()`

### Blacklist UI  (L7745)
- L7746 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L7766 `closeBlacklist()`
- L7773 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L7788 `handleXls(file)`
- L7816 `doImport()`
- L7829 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L7836 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L7838 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L7846 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L7849 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L7856 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L7865 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L7881 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L7894 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L7895 `applyNewRulesToExisting(dryRun)`
- L7990 `runApplyNewRules()`
- L8006 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L8050 `cleanupInvalidEmpty()` — 注意：不看身分證！謄本所有權部本來就帶屋主身分證號，那不是聯絡方式，看了會清不掉。
- L8068 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L8109 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L8144 `clearAllData()`

### City Filter  (L8165)
- L8169 `initCityFilter()`
- L8180 `toggleCityFilter()`
- L8188 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L8194 `onCityChange()`
- L8203 `selectAllCities()`
- L8208 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L8213)
- L8216 `allBatches()`
- L8217 `batchFilterPass(c)`
- L8218 `refreshBatchDatalist()`
- L8223 `renderBatchCheckboxes()`
- L8232 `onBatchChange()`
- L8233 `clearBatchFilter()`
- L8238 `renderBatchTagCatBar()`
- L8242 `toggleBatchTagCat(h)`
- L8244 `openBatchTag()`
- L8256 `closeBatchTag()`
- L8260 `openBatchTagForImport(newIds)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L8267 `batchTagVisible()`
- L8277 `updateBatchTagCount(visLen)`
- L8278 `renderBatchTagList()`
- L8294 `toggleBatchTagPick(id,on)`
- L8295 `batchTagSelectAll(v)`
- L8296 `batchTagApply()`

### Init time dropdowns  (L8316)
- L8317 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L8327)

## 重要畫面元件 id（L 行號）
- #mainApp L1026
- #statsBar L1030
- #mainMenu L1038
- #tabSelect L1062
- #searchInput L1059
- #cityFilterPanel L1065
- #listWrap L1097
- #batchBar L1104
- #sheetBg L1130
- #sheetTitle L1196
- #saveStatus L1197
- #sp0 L1218
- #sp1 L1375
- #sp2 L1477
- #sp3 L1500
- #sp4 L1507
- #sp5 L1511
- #heatChips L1263
- #creditChips L1328
- #docChips L1335
- #finProofList L1302
- #loanRowList L1438
- #priceEvalPanel L1509
- #urlSettingsBg L1581
- #uiDlgBg L1534
- #themePicker L1637
- #cardModePicker L1635

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
