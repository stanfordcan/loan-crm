# MAP — index-test.html 函式索引與開發手冊目錄（node dev/map.js 自動產生，勿手改）

> 用法：先在這裡找名字/行號，再用 Read 的 offset/limit 只讀那一段。行號以 index-test.html 為準。

## 檔案骨架
- L7: <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.1
- L8: <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3
- L10: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L11: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L12: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L13: <style>
- L486: </style>
- L487: <script>
- L505: </script>
- L506: </head>
- L507: <body>
- L523: <script>
- L1022: </script>
- L1030: <style>@keyframes cloudPulse{0%,100%{opacity:.45;transform:s
- L1699: <style>
- L1712: </style>
- L1798: <style>
- L1807: </style>
- L1962: <script>
- L4888: </style></head><body>${pages}<script>window.onload=function(
- L6051: <style>
- L6058: </style></head>
- L6059: <body>
- L6066: </body></html>
- L8614: </script>
- L8615: </body>

## 函式索引（行號｜名稱｜說明）

### 外觀主題：'light' | 'dark' | 'auto'（跟隨系統）。存在本機，各裝置各自設定  (L488)
- L491 `getThemeSetting()`
- L492 `applyTheme()`
- L498 `setTheme(s)`

### Firebase 初始化  (L524)

### 單一裝置登入：搶佔 session  (L541)
- L543 `claimSession(uid)` — 回傳 true = 成功登入；false = 使用者取消（auth.signOut() 已在內部呼叫）
- L590 `forceLogout()` — 被其他裝置踢出時執行
- L605 `startAutoPush()` — 啟動定時 push（每 5 分鐘）
- L616 `stopAutoPush()` — 停止定時 push
- L679 `doLogin()` — 登入
- L714 `doLogout()` — 登出
- L725 `packData(jsonStr)` — 不支援 CompressionStream 的舊瀏覽器或壓縮出錯 → 退回不壓縮，確保不會卡住（相容）。
- L735 `unpackData(s)` — 解壓縮：沒「GZ:」前綴=舊的未壓縮資料，直接回傳（向下相容）
- L743 `saveToFirestore(ts)` — 寫入 Firestore（ts 可由 saveLocal 傳入，確保本地與雲端時間戳一致）
- L781 `showCloudLock()` — 載入鎖：取得雲端資料時鎖住畫面
- L782 `hideCloudLock()`
- L785 `restoreBackup()` — 從備份還原
- L816 `downloadBackup()` — 下載備份檔到手機/電腦（離線快照，不依賴雲端）
- L841 `restoreFromFile(input)` — 從備份檔還原（讀使用者選的 .json 檔）
- L871 `loadFromFirestore()` — 從 Firestore 載入
- L907 `syncFromFirestoreIfNewer()` — 背景比對 Firestore：只有 Firestore 比本地新時才更新
- L955 `applyCloudCustomDocs(str)` — 自訂文件清單：雲端有就以雲端為準（跟著帳號走，手機加了電腦也看得到）
- L960 `saveUrlSettings()` — 儲存 URL 設定到 Firestore（不動客戶資料）
- L970 `openUrlSettings()`
- L986 `renderCloudUsage()` — 雲端用量：主文件 data（gzip 後）佔 1 MB 上限的多少；沒存過就現算一次
- L1004 `renderThemePicker()` — 外觀三選一（淺色／深色／跟隨系統）
- L1011 `closeUrlSettings()`
- L1014 `applyUrlSettings()`
- L1970 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L1973 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L1986)
- L1987 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L2016 `normalizeTime(val)`
- L2041 `fixPhone(val)`
- L2050 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2055 `saveLocal()`
- L2061 `loadLocal()`
- L2084 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2095)
- L2100 `saveMemos()`
- L2105 `loadMemos()`
- L2112 `addMemo(src)`
- L2133 `toggleMemoDone(id)`
- L2141 `deleteMemo(id)`
- L2146 `memoItemHtml(m)`
- L2165 `renderMemos()`
- L2191 `checkMemoReminders()`
- L2208 `openMemoModal()`
- L2212 `closeMemoModal()`

### Auto-classify  (L2216)
- L2217 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2223)
- L2224 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2227 `loadBlacklist()`
- L2234 `addToBlacklist(c)`
- L2250 `isBlacklisted(phone,idno,buildNo,name)`
- L2264 `removeFromBlacklist(i)`
- L2271 `updateBlacklistBtn()`

### Google Sheets sync  (L2276)

### Sync  (L2354)
- L2355 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2407 `syncData()`
- L2427 `pushToSheet()`

### Company Sheet (JSONP)  (L2433)
- L2434 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2461 `createDriveFolder()`
- L2490 `openDriveFolder()`
- L2496 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2497 `curDriveUrl()`
- L2498 `openCloudFolder()`
- L2499 `renderCloudTab()`
- L2539 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2567 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2576 `syncFromCompany()`

### 疑似重複比對  (L2612)
- L2615 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2618 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2620 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2628 `findDupCandidates(c)`
- L2674 `liveDupCheck()`
- L2684 `renderDupPanel(c)`
- L2718 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2721 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L2728 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L2738 `foldClientInto(a,b)`
- L2784 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L2795 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L2809 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L2824)
- L2827 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L2844 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L2875 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L2922)
- L2925 `showClaudeReviewModal(pendingCases,onComplete)`
- L2944 `_renderCR(aiResults,errMsg)`
- L2983 `claudeDecide(index,decision)`
- L2993 `claudeReviewApply()`
- L3003 `claudeReviewSkipAll()`
- L3015 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L3021 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L3028 `cleanCreditorName(name)`
- L3042 `parseRightsLoans(text)`
- L3099 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3134 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3139 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3150 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3160 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3167 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3170 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3199 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3208 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3229)
- L3235 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3241 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3252 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3260 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3277 `processCompanyData(raw)`

### Toolbar visibility settings  (L3968)
- L3982 `toggleMainMenu(e)`
- L3993 `closeMainMenu()`
- L3997 `closeImportMenu()`
- L4004 `loadBtnVis()`
- L4012 `saveBtnVis()`
- L4017 `toggleBtnSettings(e)`
- L4031 `renderBtnSettings()`
- L4039 `setBtnVis(id,val)`
- L4056 `uiDialog(o)`
- L4076 `_uiDlgClose(val)`
- L4080 `uiConfirm(msg,o)`
- L4081 `uiAlert(msg)`
- L4082 `uiPrompt(msg,value)`

### UI helpers  (L4099)
- L4100 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4105 `remSt(r)`
- L4111 `remChip(r,rt)`
- L4138 `updateStats()`
- L4181 `calEsc(s)`
- L4182 `calMonth(delta)`
- L4189 `renderCalendar()`
- L4235 `openCalModal()`
- L4236 `closeCalModal()`
- L4239 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4284 `closeDayView()`
- L4290 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4291 `loadGoogleCalCache()`
- L4294 `syncGoogleCal(silent)`
- L4315 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4340)
- L4344 `weekEndStr()`
- L4345 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4355)
- L4357 `saveViewState()`
- L4360 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4370)
- L4372 `onSearchInput()`
- L4377 `clearSearch()`
- L4381 `updateSearchClear()`
- L4389 `pushRecent(id)`
- L4396 `onSearchFocus(on)`
- L4401 `refreshRecentRow()`
- L4409 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4415)
- L4419 `setCardMode(full)`
- L4424 `renderCardModePicker()`
- L4431 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4432)
- L4435 `loadMoreCards()`
- L4438 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4459 `watchLoadMore()`
- L4466 `setTimeFilter(t)`
- L4472 `setTab(t)`
- L4483 `hl(text,q)` — Highlight matching keyword in text
- L4492 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4519 `openMapExport()`
- L4525 `mapRowMatch(r)`
- L4526 `mapPickBatch(b)`
- L4527 `closeMapExport()`
- L4528 `buildMapRows()`
- L4547 `renderMapCatBar()`
- L4553 `toggleMapCat(h)`
- L4554 `mapSelectAll(v)`
- L4555 `updateMapCount()`
- L4560 `renderMapList()`
- L4577 `downloadMapCsv()`
- L4600 `openListTool()`
- L4608 `closeListTool()`
- L4609 `ltToggleFilter()`
- L4610 `ltToggleCat(h)`
- L4611 `ltToggleCheck(id,on)`
- L4612 `ltVisible()`
- L4620 `ltSelectAllVisible(v)`
- L4621 `renderListTool()`
- L4641 `ltTagBatch()`
- L4651 `closeLtBatch()`
- L4652 `ltBatchApply()`
- L4666 `findBySerial(s)`
- L4668 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L4677 `unlinkRelation(a,b)`
- L4683 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L4699 `openRelPicker()`
- L4709 `closeRelPick()`
- L4710 `renderRelPickList()`
- L4724 `addRelation(targetId)`
- L4735 `removeRelation(serial)`
- L4750 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L4760 `renderCoOwners()`
- L4778 `ltMapCsv()`
- L4795 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L4805 `ltExportCompany()`
- L4832 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L4848 `noticeSlip(c,dv)`
- L4866 `ltPrintNotice()`
- L4897 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L4922 `render()`
- L5071 `openHeatPick(e,id)`
- L5085 `closeHeatPick()`
- L5086 `applyHeatPick(h)`
- L5099 `togglePin(id,e)`

### Batch select mode  (L5110)
- L5114 `getVisibleList()`
- L5123 `toggleSelectMode()`
- L5130 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5136 `exitSelectMode()`
- L5142 `toggleSelect(id,e)`
- L5149 `batchDeleteSelected()` — 批次刪除勾選的客戶：不加黑名單（之後重新匯入會再建回來）；確認視窗列人數與前幾個名字
- L5163 `batchClearReimport()` — 清掉勾選的人的 🔁 二次匯入記號（例如只是為了補持分重匯一次，不想留記號）
- L5174 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5180 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5185 `batchSelectAll()`
- L5193 `updateBatchBar()`
- L5204 `applyBatchCategory()`
- L5215 `clearRemind(e,id)`

### 電話點擊  (L5229)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5230)
- L5243 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5254)

### 表單髒標記  (L5268)

### 瀏覽器推播通知  (L5272)
- L5273 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5277 `checkReminders()`

### 鍵盤快捷鍵  (L5293)
- L5338 `syncToEval(targetId,val)`
- L5342 `syncLandtax(field,val)`
- L5352 `extractDistrict(addr)`
- L5355 `autoFillDistrict(addr)`
- L5363 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5372 `openCalendar(id)`
- L5389 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5391)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5392)
- L5397 `nextDocState(cur)`
- L5402 `saveCustomDocs()`
- L5406 `allDocNames()`
- L5410 `addCustomDoc()`
- L5417 `removeCustomDoc(name)`
- L5425 `renderDocChips()`
- L5437 `toggleDoc(name)`
- L5443 `fillExtraFields(c)`
- L5461 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L5469 `renderBatchChips()` — 來源批次籤：顯示 #fBatch（「、」串接）裡的每一個，✕ 可移除；新增從輸入框 Enter
- L5476 `addBatchChip()`
- L5483 `removeBatchChip(b)`
- L5489 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L5495 `creditSet()`
- L5496 `renderCreditChips()`
- L5501 `toggleCredit(o)`
- L5512 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L5518 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L5523)
- L5524 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L5544 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L5545 `openAdd()`
- L5589 `isSheetOpen()`
- L5591 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L5622 `openEdit(id)`
- L5701 `closeSheet()`
- L5722 `evalCtx(c,p)`
- L5727 `renderPriceEval(c)`
- L5901 `calcEvalBuildArea()`
- L5955 `calcTotal()`
- L5975 `generateReport(clientId)`
- L6073 `sSTab(i,el)`
- L6090 `renderCompanyTabs()`
- L6103 `selectCompanyProp(i)`
- L6111 `renderCompanyPanel()`
- L6173 `sSTabTo(i)`
- L6179 `renderLogs()`
- L6194 `markDebtPhoneDeleted(p)`
- L6200 `renderDebtPhones()`
- L6208 `addDebtPhone()`
- L6209 `setDebtPhone(i,v)`
- L6214 `removeDebtPhone(i)`
- L6218 `addLog()`
- L6228 `quickRemind(days)` — 快速提醒：days=1/3/7/14/30 設成幾天後（時間保留原本的）；0=清除。基本頁與聯絡記錄頁共用
- L6242 `removeLog(i)`

### Extra Loans  (L6256)
- L6261 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6262 `updateLandLabels()`
- L6266 `renderExtraLands()`
- L6295 `syncExtraAreaLabel(i)`
- L6299 `addExtraLand()`
- L6301 `applyLandShare()` — 土地：全筆坪 × 持分 → 自動填進「土地持分坪」（估價用）；沒填全筆或持分就不動手填的值
- L6312 `renderShareBanner()` — 持分結算條：把「系統實際用的坪數」用大字寫出來，持分<1 橘底、全部持有綠底
- L6330 `updateLandTotals()`
- L6346 `renderExtraLoans()`
- L6355 `addExtraLoan()`
- L6358 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L6396 `addLoanRow()`
- L6404 `removeLoanRow(i)`
- L6411 `setLoanField(i,key,val)`
- L6422 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L6437 `renderFinProofs()`
- L6446 `addFinProof()`
- L6448 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L6458 `syncDocFromProof(type)`
- L6467 `openLandZoneQuery()`
- L6479 `calcAge()`

### Properties (多筆不動產)  (L6494)
- L6498 `emptyProperty(n)`
- L6507 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L6517 `migrateProperties(c)`
- L6540 `renderPropTabs()`
- L6549 `startRenameTab(e,idx)`
- L6563 `finishRenameTab(inp,idx)`
- L6569 `savePropFields()`
- L6610 `loadPropFields(idx)`
- L6655 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L6690 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L6720 `openLoanCalc()`
- L6753 `renderLoanHints()`
- L6776 `togglePrivateConfirm(v)`
- L6781 `switchProperty(idx)`
- L6787 `addProperty()`
- L6796 `removeProperty(idx)`
- L6807 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L6814)
- L6819 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L6835 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L6842 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L6849 `updateEvalIndicator()`

### 謄本 Import  (L6857)
- L6868 `openTenModal()`
- L6881 `closeTenModal()`
- L6883 `normNum(s)`
- L6890 `detectTenType(text)`
- L6903 `parseBiao(text)`
- L6928 `parseSuo(text)`
- L6944 `parseTa(text)`
- L6966 `extractPdfText(file)`
- L6992 `handleTenFiles(files)`
- L7032 `tenToggleRaw(idx)`
- L7041 `renderTenPreview()`
- L7066 `doTenImport()`
- L7080 `applyTenParsed(mode)`
- L7118 `onTenModeChange()`
- L7125 `filterTenClients()`
- L7146 `selectTenClient(id)`
- L7151 `saveClient(silent)`
- L7255 `scheduleDraftSave()`
- L7262 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L7267)
- L7269 `takeSnapshot(id)`
- L7275 `updateRevertBtn()`
- L7280 `revertClient()`
- L7296 `deleteClient()`
- L7306 `blacklistClient()`

### AI 整理匯入  (L7318)
- L7321 `openAiImport()`
- L7330 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L7332)
- L7334 `checkInbox()`
- L7344 `openInbox()`
- L7357 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L7363 `parseAiImport()`
- L7390 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L7403 `normAddr(s)`
- L7405 `addrCore(s)` — 地址核心：去掉縣市區鄉鎮前綴，只留街路門牌（兩邊格式不同也能對上）
- L7411 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L7412 `isMaskedName(n)`
- L7414 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L7425 `addrHit(a,b)`
- L7428 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L7476 `renderAiPreview()`
- L7531 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L7550 `setAiDecision(i,v)`
- L7553 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L7567 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L7573 `parseShare(s,num,den)`
- L7587 `emptyProp()`
- L7595 `recordToProps(rec)`
- L7679 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L7717 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L7803)
- L7804 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L7842 `shareClient()`
- L7851 `closeShare()`
- L7852 `copyShareCode()`
- L7860 `nativeShareCode()`

### XLS Import  (L7865)
- L7866 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L7874 `closeImport()`

### Blacklist UI  (L7876)
- L7877 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L7897 `closeBlacklist()`
- L7904 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L7919 `handleXls(file)`
- L7948 `doImport()`
- L7962 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L7969 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L7971 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L7979 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L7982 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L7989 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L7998 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L8014 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L8027 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L8028 `applyNewRulesToExisting(dryRun)`
- L8123 `runApplyNewRules()`
- L8139 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L8183 `cleanupInvalidEmpty()` — 注意：不看身分證！謄本所有權部本來就帶屋主身分證號，那不是聯絡方式，看了會清不掉。
- L8201 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L8242 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L8277 `clearAllData()`

### City Filter  (L8298)
- L8302 `initCityFilter()`
- L8313 `toggleCityFilter()`
- L8321 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L8327 `onCityChange()`
- L8336 `selectAllCities()`
- L8341 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L8346)

### 批次管理視窗  (L8349)
- L8350 `openBatchMgr()` — ── 批次管理視窗 ──
- L8356 `closeBatchMgr()`
- L8357 `batchMgrSuggestAll()`
- L8358 `batchMgrResetAll()`
- L8359 `batchMgrApply()`

### t141 多批次：batch 仍是一格文字，多個用「、」串接；一律用下面這幾個函式讀寫  (L8371)
- L8373 `batchList(c)`
- L8374 `batchJoin(arr)`
- L8375 `batchAdd(c,b)`
- L8376 `batchSetAll(c,label)`
- L8378 `suggestBatchName(b)` — 批次改名建議：新鑫「1150318_資料 (5)」→「新鑫 115/03/18 (5)」（同月多份，保留日）；「115_03 松山區包區」→「包區 115/03 松山區」；「X中人
- L8386 `allBatches()`
- L8387 `batchFilterPass(c)`
- L8388 `refreshBatchDatalist()`
- L8393 `renderBatchCheckboxes()`
- L8402 `onBatchChange()`
- L8403 `clearBatchFilter()`
- L8408 `renderBatchTagCatBar()`
- L8412 `toggleBatchTagCat(h)`
- L8414 `openBatchTag()`
- L8426 `closeBatchTag()`
- L8430 `openBatchTagForImport(newIds)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L8442 `batchTagVisible()`
- L8452 `updateBatchTagCount(visLen)`
- L8453 `renderBatchTagList()`
- L8469 `toggleBatchTagPick(id,on)`
- L8470 `batchTagSelectAll(v)`
- L8471 `batchTagApply()`

### Init time dropdowns  (L8494)
- L8495 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L8505)

## 重要畫面元件 id（L 行號）
- #mainApp L1032
- #statsBar L1036
- #mainMenu L1044
- #tabSelect L1068
- #searchInput L1065
- #cityFilterPanel L1071
- #listWrap L1103
- #batchBar L1110
- #sheetBg L1138
- #sheetTitle L1204
- #saveStatus L1205
- #sp0 L1226
- #sp1 L1388
- #sp2 L1496
- #sp3 L1519
- #sp4 L1526
- #sp5 L1530
- #heatChips L1271
- #creditChips L1341
- #docChips L1348
- #finProofList L1310
- #loanRowList L1457
- #priceEvalPanel L1528
- #urlSettingsBg L1614
- #uiDlgBg L1553
- #themePicker L1671
- #cardModePicker L1669

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
