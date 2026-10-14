# MAP — index-test.html 函式索引與開發手冊目錄（node dev/map.js 自動產生，勿手改）

> 用法：先在這裡找名字/行號，再用 Read 的 offset/limit 只讀那一段。行號以 index-test.html 為準。

## 檔案骨架
- L7: <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.1
- L8: <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3
- L10: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L11: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L12: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L13: <style>
- L471: </style>
- L472: <script>
- L490: </script>
- L491: </head>
- L492: <body>
- L508: <script>
- L1007: </script>
- L1015: <style>@keyframes cloudPulse{0%,100%{opacity:.45;transform:s
- L1655: <style>
- L1668: </style>
- L1754: <style>
- L1763: </style>
- L1913: <script>
- L4746: </style></head><body>${pages}<script>window.onload=function(
- L5858: <style>
- L5865: </style></head>
- L5866: <body>
- L5873: </body></html>
- L8278: </script>
- L8279: </body>

## 函式索引（行號｜名稱｜說明）

### 外觀主題：'light' | 'dark' | 'auto'（跟隨系統）。存在本機，各裝置各自設定  (L473)
- L476 `getThemeSetting()`
- L477 `applyTheme()`
- L483 `setTheme(s)`

### Firebase 初始化  (L509)

### 單一裝置登入：搶佔 session  (L526)
- L528 `claimSession(uid)` — 回傳 true = 成功登入；false = 使用者取消（auth.signOut() 已在內部呼叫）
- L575 `forceLogout()` — 被其他裝置踢出時執行
- L590 `startAutoPush()` — 啟動定時 push（每 5 分鐘）
- L601 `stopAutoPush()` — 停止定時 push
- L664 `doLogin()` — 登入
- L699 `doLogout()` — 登出
- L710 `packData(jsonStr)` — 不支援 CompressionStream 的舊瀏覽器或壓縮出錯 → 退回不壓縮，確保不會卡住（相容）。
- L720 `unpackData(s)` — 解壓縮：沒「GZ:」前綴=舊的未壓縮資料，直接回傳（向下相容）
- L728 `saveToFirestore(ts)` — 寫入 Firestore（ts 可由 saveLocal 傳入，確保本地與雲端時間戳一致）
- L766 `showCloudLock()` — 載入鎖：取得雲端資料時鎖住畫面
- L767 `hideCloudLock()`
- L770 `restoreBackup()` — 從備份還原
- L801 `downloadBackup()` — 下載備份檔到手機/電腦（離線快照，不依賴雲端）
- L826 `restoreFromFile(input)` — 從備份檔還原（讀使用者選的 .json 檔）
- L856 `loadFromFirestore()` — 從 Firestore 載入
- L892 `syncFromFirestoreIfNewer()` — 背景比對 Firestore：只有 Firestore 比本地新時才更新
- L940 `applyCloudCustomDocs(str)` — 自訂文件清單：雲端有就以雲端為準（跟著帳號走，手機加了電腦也看得到）
- L945 `saveUrlSettings()` — 儲存 URL 設定到 Firestore（不動客戶資料）
- L955 `openUrlSettings()`
- L971 `renderCloudUsage()` — 雲端用量：主文件 data（gzip 後）佔 1 MB 上限的多少；沒存過就現算一次
- L989 `renderThemePicker()` — 外觀三選一（淺色／深色／跟隨系統）
- L996 `closeUrlSettings()`
- L999 `applyUrlSettings()`
- L1921 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L1924 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L1937)
- L1938 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L1967 `normalizeTime(val)`
- L1992 `fixPhone(val)`
- L2001 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2006 `saveLocal()`
- L2012 `loadLocal()`
- L2035 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2046)
- L2051 `saveMemos()`
- L2056 `loadMemos()`
- L2063 `addMemo(src)`
- L2084 `toggleMemoDone(id)`
- L2092 `deleteMemo(id)`
- L2097 `memoItemHtml(m)`
- L2116 `renderMemos()`
- L2142 `checkMemoReminders()`
- L2159 `openMemoModal()`
- L2163 `closeMemoModal()`

### Auto-classify  (L2167)
- L2168 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2174)
- L2175 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2178 `loadBlacklist()`
- L2185 `addToBlacklist(c)`
- L2201 `isBlacklisted(phone,idno,buildNo,name)`
- L2215 `removeFromBlacklist(i)`
- L2222 `updateBlacklistBtn()`

### Google Sheets sync  (L2227)

### Sync  (L2305)
- L2306 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2358 `syncData()`
- L2378 `pushToSheet()`

### Company Sheet (JSONP)  (L2384)
- L2385 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2412 `createDriveFolder()`
- L2441 `openDriveFolder()`
- L2447 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2448 `curDriveUrl()`
- L2449 `openCloudFolder()`
- L2450 `renderCloudTab()`
- L2490 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2518 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2527 `syncFromCompany()`

### 疑似重複比對  (L2562)
- L2565 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2568 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2570 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2578 `findDupCandidates(c)`
- L2624 `liveDupCheck()`
- L2634 `renderDupPanel(c)`
- L2668 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2671 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L2678 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L2688 `foldClientInto(a,b)`
- L2729 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L2740 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L2754 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L2769)
- L2772 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L2789 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L2820 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L2867)
- L2870 `showClaudeReviewModal(pendingCases,onComplete)`
- L2889 `_renderCR(aiResults,errMsg)`
- L2928 `claudeDecide(index,decision)`
- L2938 `claudeReviewApply()`
- L2948 `claudeReviewSkipAll()`
- L2960 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L2966 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L2973 `cleanCreditorName(name)`
- L2987 `parseRightsLoans(text)`
- L3043 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3048 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3059 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3069 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3076 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3079 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3108 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3117 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3138)
- L3144 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3150 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3161 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3169 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3186 `processCompanyData(raw)`

### Toolbar visibility settings  (L3829)
- L3843 `toggleMainMenu(e)`
- L3854 `closeMainMenu()`
- L3858 `closeImportMenu()`
- L3865 `loadBtnVis()`
- L3873 `saveBtnVis()`
- L3878 `toggleBtnSettings(e)`
- L3892 `renderBtnSettings()`
- L3900 `setBtnVis(id,val)`
- L3917 `uiDialog(o)`
- L3937 `_uiDlgClose(val)`
- L3941 `uiConfirm(msg,o)`
- L3942 `uiAlert(msg)`
- L3943 `uiPrompt(msg,value)`

### UI helpers  (L3960)
- L3961 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L3966 `remSt(r)`
- L3972 `remChip(r,rt)`
- L3999 `updateStats()`
- L4042 `calEsc(s)`
- L4043 `calMonth(delta)`
- L4050 `renderCalendar()`
- L4096 `openCalModal()`
- L4097 `closeCalModal()`
- L4100 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4145 `closeDayView()`
- L4151 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4152 `loadGoogleCalCache()`
- L4155 `syncGoogleCal(silent)`
- L4176 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4201)
- L4204 `weekEndStr()`
- L4205 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4214)
- L4216 `saveViewState()`
- L4219 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4229)
- L4231 `onSearchInput()`
- L4236 `clearSearch()`
- L4240 `updateSearchClear()`
- L4248 `pushRecent(id)`
- L4255 `onSearchFocus(on)`
- L4260 `refreshRecentRow()`
- L4268 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4274)
- L4278 `setCardMode(full)`
- L4283 `renderCardModePicker()`
- L4290 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4291)
- L4294 `loadMoreCards()`
- L4297 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4318 `watchLoadMore()`
- L4325 `setTimeFilter(t)`
- L4331 `setTab(t)`
- L4342 `hl(text,q)` — Highlight matching keyword in text
- L4351 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4378 `openMapExport()`
- L4384 `mapRowMatch(r)`
- L4385 `mapPickBatch(b)`
- L4386 `closeMapExport()`
- L4387 `buildMapRows()`
- L4406 `renderMapCatBar()`
- L4412 `toggleMapCat(h)`
- L4413 `mapSelectAll(v)`
- L4414 `updateMapCount()`
- L4419 `renderMapList()`
- L4436 `downloadMapCsv()`
- L4459 `openListTool()`
- L4467 `closeListTool()`
- L4468 `ltToggleFilter()`
- L4469 `ltToggleCat(h)`
- L4470 `ltToggleCheck(id,on)`
- L4471 `ltVisible()`
- L4479 `ltSelectAllVisible(v)`
- L4480 `renderListTool()`
- L4500 `ltTagBatch()`
- L4510 `closeLtBatch()`
- L4511 `ltBatchApply()`
- L4524 `findBySerial(s)`
- L4526 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L4535 `unlinkRelation(a,b)`
- L4541 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L4557 `openRelPicker()`
- L4567 `closeRelPick()`
- L4568 `renderRelPickList()`
- L4582 `addRelation(targetId)`
- L4593 `removeRelation(serial)`
- L4608 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L4618 `renderCoOwners()`
- L4636 `ltMapCsv()`
- L4653 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L4663 `ltExportCompany()`
- L4690 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L4706 `noticeSlip(c,dv)`
- L4724 `ltPrintNotice()`
- L4755 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L4780 `render()`
- L4927 `openHeatPick(e,id)`
- L4941 `closeHeatPick()`
- L4942 `applyHeatPick(h)`
- L4955 `togglePin(id,e)`

### Batch select mode  (L4966)
- L4970 `getVisibleList()`
- L4979 `toggleSelectMode()`
- L4986 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L4992 `exitSelectMode()`
- L4998 `toggleSelect(id,e)`
- L5005 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5011 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5016 `batchSelectAll()`
- L5024 `updateBatchBar()`
- L5035 `applyBatchCategory()`
- L5046 `clearRemind(e,id)`

### 電話點擊  (L5060)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5061)
- L5074 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5085)

### 表單髒標記  (L5099)

### 瀏覽器推播通知  (L5103)
- L5104 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5108 `checkReminders()`

### 鍵盤快捷鍵  (L5124)
- L5169 `syncToEval(targetId,val)`
- L5173 `syncLandtax(field,val)`
- L5183 `extractDistrict(addr)`
- L5186 `autoFillDistrict(addr)`
- L5194 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5203 `openCalendar(id)`
- L5220 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5222)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5223)
- L5228 `nextDocState(cur)`
- L5233 `saveCustomDocs()`
- L5237 `allDocNames()`
- L5241 `addCustomDoc()`
- L5248 `removeCustomDoc(name)`
- L5256 `renderDocChips()`
- L5268 `toggleDoc(name)`
- L5274 `fillExtraFields(c)`
- L5290 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L5298 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L5304 `creditSet()`
- L5305 `renderCreditChips()`
- L5310 `toggleCredit(o)`
- L5321 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L5327 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L5332)
- L5333 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L5352 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L5353 `openAdd()`
- L5397 `isSheetOpen()`
- L5399 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L5430 `openEdit(id)`
- L5509 `closeSheet()`
- L5530 `evalCtx(c,p)`
- L5535 `renderPriceEval(c)`
- L5709 `calcEvalBuildArea()`
- L5762 `calcTotal()`
- L5782 `generateReport(clientId)`
- L5880 `sSTab(i,el)`
- L5897 `renderCompanyTabs()`
- L5909 `selectCompanyProp(i)`
- L5917 `renderCompanyPanel()`
- L5969 `sSTabTo(i)`
- L5975 `renderLogs()`
- L5990 `markDebtPhoneDeleted(p)`
- L5996 `renderDebtPhones()`
- L6004 `addDebtPhone()`
- L6005 `setDebtPhone(i,v)`
- L6010 `removeDebtPhone(i)`
- L6014 `addLog()`
- L6024 `quickRemind(days)` — 快速提醒：days=1/3/7/14/30 設成幾天後（時間保留原本的）；0=清除。基本頁與聯絡記錄頁共用
- L6038 `removeLog(i)`

### Extra Loans  (L6052)
- L6057 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6058 `updateLandLabels()`
- L6062 `renderExtraLands()`
- L6091 `syncExtraAreaLabel(i)`
- L6095 `addExtraLand()`
- L6096 `updateLandTotals()`
- L6112 `renderExtraLoans()`
- L6121 `addExtraLoan()`
- L6124 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L6156 `addLoanRow()`
- L6164 `removeLoanRow(i)`
- L6171 `setLoanField(i,key,val)`
- L6182 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L6197 `renderFinProofs()`
- L6206 `addFinProof()`
- L6208 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L6218 `syncDocFromProof(type)`
- L6227 `openLandZoneQuery()`
- L6239 `calcAge()`

### Properties (多筆不動產)  (L6254)
- L6258 `emptyProperty(n)`
- L6267 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L6277 `migrateProperties(c)`
- L6300 `renderPropTabs()`
- L6309 `startRenameTab(e,idx)`
- L6323 `finishRenameTab(inp,idx)`
- L6329 `savePropFields()`
- L6367 `loadPropFields(idx)`
- L6408 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L6443 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L6473 `openLoanCalc()`
- L6506 `renderLoanHints()`
- L6529 `togglePrivateConfirm(v)`
- L6534 `switchProperty(idx)`
- L6540 `addProperty()`
- L6549 `removeProperty(idx)`
- L6560 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L6567)
- L6572 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L6588 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L6595 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L6602 `updateEvalIndicator()`

### 謄本 Import  (L6610)
- L6621 `openTenModal()`
- L6634 `closeTenModal()`
- L6636 `normNum(s)`
- L6643 `detectTenType(text)`
- L6656 `parseBiao(text)`
- L6681 `parseSuo(text)`
- L6697 `parseTa(text)`
- L6719 `extractPdfText(file)`
- L6745 `handleTenFiles(files)`
- L6785 `tenToggleRaw(idx)`
- L6794 `renderTenPreview()`
- L6819 `doTenImport()`
- L6833 `applyTenParsed(mode)`
- L6871 `onTenModeChange()`
- L6878 `filterTenClients()`
- L6899 `selectTenClient(id)`
- L6904 `saveClient(silent)`
- L7007 `scheduleDraftSave()`
- L7014 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L7019)
- L7021 `takeSnapshot(id)`
- L7027 `updateRevertBtn()`
- L7032 `revertClient()`
- L7048 `deleteClient()`
- L7058 `blacklistClient()`

### AI 整理匯入  (L7070)
- L7073 `openAiImport()`
- L7082 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L7084)
- L7086 `checkInbox()`
- L7096 `openInbox()`
- L7109 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L7115 `parseAiImport()`
- L7142 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L7155 `normAddr(s)`
- L7157 `addrCore(s)` — 地址核心：去掉縣市區鄉鎮前綴，只留街路門牌（兩邊格式不同也能對上）
- L7163 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L7164 `isMaskedName(n)`
- L7166 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L7177 `addrHit(a,b)`
- L7180 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L7228 `renderAiPreview()`
- L7283 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L7302 `setAiDecision(i,v)`
- L7305 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L7318 `parseShare(s,num,den)` — 解析建物持分：回傳 {num,den}。支援 "1/2"（分子/分母）、"2分之1"（分母在前）、或分開的 num/den
- L7332 `emptyProp()`
- L7340 `recordToProps(rec)`
- L7424 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L7459 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L7545)
- L7546 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L7584 `shareClient()`
- L7593 `closeShare()`
- L7594 `copyShareCode()`
- L7602 `nativeShareCode()`

### XLS Import  (L7607)
- L7608 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L7616 `closeImport()`

### Blacklist UI  (L7618)
- L7619 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L7639 `closeBlacklist()`
- L7641 `handleXls(file)`
- L7660 `doImport()`
- L7671 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L7678 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L7680 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L7688 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L7691 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L7698 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L7707 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L7723 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L7736 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L7737 `applyNewRulesToExisting(dryRun)`
- L7832 `runApplyNewRules()`
- L7848 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L7892 `cleanupInvalidEmpty()` — 注意：不看身分證！謄本所有權部本來就帶屋主身分證號，那不是聯絡方式，看了會清不掉。
- L7910 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L7951 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L7986 `clearAllData()`

### City Filter  (L8007)
- L8011 `initCityFilter()`
- L8022 `toggleCityFilter()`
- L8030 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L8036 `onCityChange()`
- L8045 `selectAllCities()`
- L8050 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L8055)
- L8058 `allBatches()`
- L8059 `batchFilterPass(c)`
- L8060 `refreshBatchDatalist()`
- L8065 `renderBatchCheckboxes()`
- L8074 `onBatchChange()`
- L8075 `clearBatchFilter()`
- L8080 `renderBatchTagCatBar()`
- L8084 `toggleBatchTagCat(h)`
- L8086 `openBatchTag()`
- L8098 `closeBatchTag()`
- L8102 `openBatchTagForImport(newIds)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L8109 `batchTagVisible()`
- L8119 `updateBatchTagCount(visLen)`
- L8120 `renderBatchTagList()`
- L8136 `toggleBatchTagPick(id,on)`
- L8137 `batchTagSelectAll(v)`
- L8138 `batchTagApply()`

### Init time dropdowns  (L8158)
- L8159 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L8169)

## 重要畫面元件 id（L 行號）
- #mainApp L1017
- #statsBar L1021
- #mainMenu L1029
- #tabSelect L1053
- #searchInput L1050
- #cityFilterPanel L1056
- #listWrap L1087
- #batchBar L1094
- #sheetBg L1120
- #sheetTitle L1186
- #saveStatus L1187
- #sp0 L1208
- #sp1 L1365
- #sp2 L1467
- #sp3 L1490
- #sp4 L1497
- #sp5 L1501
- #heatChips L1253
- #creditChips L1318
- #docChips L1325
- #finProofList L1292
- #loanRowList L1428
- #priceEvalPanel L1499
- #urlSettingsBg L1571
- #uiDlgBg L1524
- #themePicker L1627
- #cardModePicker L1625

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
