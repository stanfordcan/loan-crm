# MAP — index-test.html 函式索引與開發手冊目錄（node dev/map.js 自動產生，勿手改）

> 用法：先在這裡找名字/行號，再用 Read 的 offset/limit 只讀那一段。行號以 index-test.html 為準。

## 檔案骨架
- L7: <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.1
- L8: <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3
- L10: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L11: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L12: <script src="https://www.gstatic.com/firebasejs/10.12.2/fire
- L13: <style>
- L525: </style>
- L526: <script>
- L560: </script>
- L561: </head>
- L562: <body>
- L579: <script>
- L1185: </script>
- L1193: <style>@keyframes cloudPulse{0%,100%{opacity:.45;transform:s
- L1873: <style>
- L1886: </style>
- L1972: <style>
- L1981: </style>
- L2136: <script>
- L5213: </style></head><body>${pages}<script>window.onload=function(
- L6456: <style>
- L6463: </style></head>
- L6464: <body>
- L6471: </body></html>
- L9111: </script>
- L9112: </body>

## 函式索引（行號｜名稱｜說明）

### 外觀主題：'light' | 'dark' | 'auto'（跟隨系統）。存在本機，各裝置各自設定  (L527)
- L530 `getThemeSetting()`
- L531 `applyTheme()`
- L537 `setTheme(s)`
- L546 `getZoomSetting()`
- L547 `applyZoom()`
- L553 `setZoom(z)`

### Firebase 初始化  (L580)

### 單一裝置登入：搶佔 session  (L599)
- L601 `claimSession(uid)` — 回傳 true = 成功登入；false = 使用者取消（auth.signOut() 已在內部呼叫）
- L648 `forceLogout()` — 被其他裝置踢出時執行
- L663 `startAutoPush()` — 啟動定時 push（每 5 分鐘）
- L674 `startReadOnlyRefresh()` — 唯讀模式：每 3 分鐘從雲端重讀一次；也可按提示列的 🔄
- L679 `stopReadOnlyRefresh()`
- L680 `readOnlyReload()`
- L683 `renderReadOnlyBar()`
- L690 `exitReadOnly()`
- L696 `stopAutoPush()` — 停止定時 push
- L768 `doLogin()` — 登入
- L807 `doLogout()` — 登出
- L818 `packData(jsonStr)` — 不支援 CompressionStream 的舊瀏覽器或壓縮出錯 → 退回不壓縮，確保不會卡住（相容）。
- L828 `unpackData(s)` — 解壓縮：沒「GZ:」前綴=舊的未壓縮資料，直接回傳（向下相容）
- L845 `splitChunks(str,size)`
- L847 `stageChunks(batch,userRef,col,packed,ts)` — 把分段寫進 batch；回傳段數。多出來的舊段一併刪掉（沒刪到的舊段時間戳對不上，讀的時候會被忽略）。
- L855 `readChunks(userRef,col,n,ts)` — 讀回分段：缺段或時間戳對不上 → 回 null（呼叫端只能當「讀不到」，絕不能因此清空資料）
- L866 `readCloudPacked(userRef,raw,col,nKey,tsKey,legacyKey,mainTsKey)` — 新舊格式擇一讀：回傳壓縮字串，兩種都沒有 → null
- L874 `saveToFirestore(ts,prePacked)` — 寫入 Firestore（ts 可由 saveLocal 傳入，確保本地與雲端時間戳一致；prePacked＝saveLocal 已壓好的字串，不用再壓一次）
- L923 `showCloudLock()` — 載入鎖：取得雲端資料時鎖住畫面
- L924 `hideCloudLock()`
- L927 `restoreBackup()` — 從備份還原
- L961 `downloadBackup()` — 下載備份檔到手機/電腦（離線快照，不依賴雲端）
- L986 `restoreFromFile(input)` — 從備份檔還原（讀使用者選的 .json 檔）
- L1017 `loadFromFirestore()` — 從 Firestore 載入
- L1055 `syncFromFirestoreIfNewer()` — 背景比對 Firestore：只有 Firestore 比本地新時才更新
- L1105 `applyCloudCustomDocs(str)` — 自訂文件清單：雲端有就以雲端為準（跟著帳號走，手機加了電腦也看得到）
- L1110 `saveUrlSettings()` — 儲存 URL 設定到 Firestore（不動客戶資料）
- L1121 `openUrlSettings()`
- L1137 `renderCloudUsage()` — 雲端用量：主文件 data（gzip 後）佔 1 MB 上限的多少；沒存過就現算一次
- L1160 `renderThemePicker()` — 外觀三選一（淺色／深色／跟隨系統）
- L1167 `renderZoomPicker()`
- L1174 `closeUrlSettings()`
- L1177 `applyUrlSettings()`
- L2144 `shortVersion(v)` — 標題列只顯示短版（🧪 t112 或正式版日期），完整說明放 title 與 ⚙️ 設定底部，省手機首屏空間
- L2147 `localDateStr(d)` — 用本地時間取日期字串，避免 UTC 時區偏移導致日期錯誤

### Storage  (L2160)
- L2161 `normalizeDate(val)` — ── Storage ───────────────────────────────────────────────
- L2190 `normalizeTime(val)`
- L2215 `fixPhone(val)`
- L2224 `migrateHeat(c)` — 舊分類名稱遷移（最新資料 → 追很緊）
- L2232 `saveLocal()`
- L2244 `loadLocal()`
- L2275 `ensureSerials()` — 一旦給了就「鎖死」——只補沒有的，絕不更動已有的。回傳這次新補幾筆。

### Memo  (L2286)
- L2291 `saveMemos()`
- L2296 `loadMemos()`
- L2303 `addMemo(src)`
- L2324 `toggleMemoDone(id)`
- L2332 `deleteMemo(id)`
- L2337 `memoItemHtml(m)`
- L2356 `renderMemos()`
- L2382 `checkMemoReminders()`
- L2399 `openMemoModal()`
- L2403 `closeMemoModal()`

### Auto-classify  (L2407)
- L2408 `autoClassify()` — ── Auto-classify ────────────────────────────────────────

### Blacklist  (L2414)
- L2415 `saveBlacklist()` — ── Blacklist ─────────────────────────────────────────────
- L2418 `loadBlacklist()`
- L2425 `addToBlacklist(c)`
- L2441 `isBlacklisted(phone,idno,buildNo,name)`
- L2455 `removeFromBlacklist(i)`
- L2462 `updateBlacklistBtn()`

### Google Sheets sync  (L2467)

### Sync  (L2545)
- L2546 `parseVisitLogs(text)` — ── Sync ──────────────────────────────────────────────────
- L2598 `syncData()`
- L2618 `pushToSheet()`

### Company Sheet (JSONP)  (L2625)
- L2626 `jsonpFetch(url,timeoutMs)` — ── Company Sheet (JSONP) ─────────────────────────────────
- L2654 `driveSubFolderName(name,addr,district,section,landNo,isoDate)` — 子資料夾名：民國日期_客戶名_門牌；沒門牌就用 地段號＋地號（例：1151019_張聖平_台北市中山區建國北路二段92號12樓）
- L2661 `createDriveFolder()`
- L2692 `openDriveFolder()`
- L2698 `cloudEsc(s)` — ☁️ 雲端預覽分頁：列出該筆不動產 Drive 資料夾裡的檔案（縮圖格狀）
- L2699 `curDriveUrl()`
- L2700 `openCloudFolder()`
- L2701 `renderCloudTab()`
- L2741 `uploadCloudFile(input)` — 上傳檔案到該筆不動產的 Drive 資料夾（POST base64 給個人 GAS 的 uploadFile）
- L2769 `updateDrivePath()` — 顯示資料夾在雲端的「位置」而非網址：客戶資料 / 客戶名
- L2780 `syncFromCompany()`

### 疑似重複比對  (L2816)
- L2819 `isFullId(s)` — 完整身分證(A+9碼)才唯一,才能拿來判定「同一人」;遮罩版(F122*****2)不唯一,只能顯示參考
- L2822 `genderFromId(idno)` — 身分證第二碼＝性別：1男 2女（遮罩身分證也看得到第二碼）
- L2824 `dispName(c)` — 顯示用姓名：沒有全名(只剩姓或被遮罩)→「姓＋先生/小姐」(性別取身分證第二碼);完整姓名照原樣
- L2832 `findDupCandidates(c)`
- L2878 `liveDupCheck()`
- L2888 `renderDupPanel(c)`
- L2922 `normPhoneKey(s)` — 債電比對用：去掉 -、空白、括號、#，只留可比對的號碼本體
- L2925 `mergeDebtPhonesInto(client,incoming)` — 業主刪過的債電＝永不再由總檔/匯入帶回來，跟聯絡紀錄的 deletedLogKeys 同一套規矩。
- L2932 `mergeDebtPhones(existing,incoming)` — 同一支號碼不管重跑幾次總檔同步都只留一筆——這裡不去重就會每同步一次多長一輪。
- L2942 `foldClientInto(a,b)`
- L2988 `clientRichness(c)` — 資料豐富度（決定哪筆當主）：有電話/房產/各種欄位都加分
- L2999 `mergeWithDup(otherId)` — 手動：把「疑似重複」面板裡某筆併入目前開啟這位（自動保留資料較完整那筆）
- L3013 `consolidateByIdno()` — 自動：同身分證＝同一人，匯入收尾時把空殼/較少那筆併進較完整那筆

### Claude AI 輔助去重  (L3028)
- L3031 `normalizeAddr(addr)` — 地址標準化：全形→半形 + 中文樓層→數字（保留樓層，不刪除）
- L3048 `findFuzzyMatches(incoming,existingClients)` — 找出可能模糊相符的現有客戶（已被精確比對略過的才會到這裡）
- L3079 `callClaudeAPI(pendingCases)` — 呼叫 Anthropic Claude API

### Claude 審查 Modal 狀態  (L3126)
- L3129 `showClaudeReviewModal(pendingCases,onComplete)`
- L3148 `_renderCR(aiResults,errMsg)`
- L3187 `claudeDecide(index,decision)`
- L3197 `claudeReviewApply()`
- L3207 `claudeReviewSkipAll()`
- L3219 `defaultLoanE(a,t)` — 單筆 e 預設值：bank/legal → Math.ceil(a/1.2)；private → a（原值即實貸）
- L3225 `normLoanType(t)` — 貸款類型正規化：AI/總檔可能給中文或英文
- L3232 `cleanCreditorName(name)`
- L3246 `parseRightsLoans(text)`
- L3303 `smartMergeLoans(p,incoming,src,date,opts)` — 回傳 {added:n, cancelled:n, changed:n}
- L3338 `getLoanE(l)` — 取得單筆 loan 的實貸估值：有 e 就用 e（可能是使用者手改過的值），沒有才用預設規則現算（相容舊資料）
- L3343 `clientLoanTotals(c)` — 名片用：全部房產的貸款「即時」加總(逐筆估值Σe)。有 loans 用逐筆算,沒有才退用存的舊總額——確保名片和抵押貸款區永遠同步
- L3354 `loansToTotals(loans)` — loans[] → {bank,legal,private} 加總（萬）：直接加總各筆 e（使用者手改過的金額也算進去，絕不再 ÷1.2）
- L3364 `classifyCreditor(name)` — 依關鍵字預判債權人名稱屬於銀行／法人／民間（規則與 parseRightsLoans 一致）
- L3371 `isPlaceholderLoanName(n)` — 總檔摘要佔位筆的系統代填名稱（parseRightsLoans fallback 產生的）
- L3374 `patchLoanDates(dstLoans,srcLoans)` — 例外：總檔摘要佔位筆（系統代填名稱＋沒登序，金額是摘要數字常對不上謄本設定額）→ 放寬成「分類兩邊都唯一」就補，並順便補登序、把佔位名稱換成真實債權人。
- L3403 `applyLoansToProp(p,loans)` — 把 loans[] 套用到不動產物件 p：設定 p.loans 並從中加總回寫 p.bank/legal/private
- L3412 `ensurePropLoans(c,p)` — 若 p.loans 已存在但缺 e（t82 舊資料），就地補上 e（同 defaultLoanE 預設規則）

### 公司總檔匯入  (L3433)
- L3439 `ownBuildKeyFromBuildInfo(text)` — 這才是「同一間」的唯一識別；「共同擔保建號」清單是整棟/整批共用的，拿它判斷同一間會把不同戶併掉。
- L3445 `samePropertyCard(p,incBuild,incSection,incAddrCore)`
- L3456 `companyOwnerFromRaw(ownerRaw)` — 只在「沒有任何個人身分證格式」時才用(個人＋公司共有時仍以個人為客戶,維持原行為)。
- L3464 `extractDebtPhones(raw)` — 「00」開頭多打的 0 修掉;沒區碼的市話(7-8碼)照原樣保留讓人看得到——不猜區碼、也不丟掉。
- L3482 `floorsFromBuildInfo(bi)` — 建物標示 → 總樓層（「12層」）、建築完成年（民國「88年05月」）
- L3483 `builtYearFromBuildInfo(bi)`
- L3485 `jobSummary(c)` — 基本頁 → 「上班族（某公司），月收 6 萬，薪轉，有報稅」
- L3495 `googleCommunity()`
- L3500 `syncFloorsToEval()`
- L3501 `syncBuiltYearToEval()`
- L3502 `processCompanyData(raw)`

### Toolbar visibility settings  (L4195)
- L4209 `toggleMainMenu(e)`
- L4220 `closeMainMenu()`
- L4224 `closeImportMenu()`
- L4231 `loadBtnVis()`
- L4239 `saveBtnVis()`
- L4244 `toggleBtnSettings(e)`
- L4258 `renderBtnSettings()`
- L4266 `setBtnVis(id,val)`
- L4283 `uiDialog(o)`
- L4303 `_uiDlgClose(val)`
- L4307 `uiConfirm(msg,o)`
- L4308 `uiAlert(msg)`
- L4309 `uiPrompt(msg,value)`

### UI helpers  (L4326)
- L4327 `showToast(msg)` — ── UI helpers ────────────────────────────────────────────
- L4332 `remSt(r)`
- L4338 `remChip(r,rt)`
- L4365 `updateStats()`
- L4408 `calEsc(s)`
- L4409 `calMonth(delta)`
- L4416 `renderCalendar()`
- L4462 `openCalModal()`
- L4463 `closeCalModal()`
- L4466 `openDayView(ds)` — 點某天 → 當日排程清單（依時間由早到晚；Google 事件之後插進同一條時間線）
- L4511 `closeDayView()`
- L4517 `isCrmReminderEvent(e)` — CRM 自己用「加入行事曆」建的事件標題是「📞 聯絡 …」，這種跟客戶提醒重複，過濾掉
- L4518 `loadGoogleCalCache()`
- L4521 `syncGoogleCal(silent)`
- L4542 `updateTabs()` — 手機端點擊切換

### 時間篩選（上方統計卡）：'' | 'over' 逾期 | 'today' 今日 | 'week' 本週 | 'noremind' 未排程  (L4567)
- L4571 `weekEndStr()`
- L4572 `applyListFilters(list)`

### 記住檢視狀態（分類分頁、時間篩選、排序）：重新整理後不會又回到「全部＋提醒日期」  (L4582)
- L4584 `saveViewState()`
- L4587 `loadViewState()`

### 搜尋：停頓 0.15 秒才重畫（打字不頓）、✕ 清空  (L4597)
- L4599 `onSearchInput()`
- L4604 `clearSearch()`
- L4608 `updateSearchClear()`
- L4616 `pushRecent(id)`
- L4623 `onSearchFocus(on)`
- L4628 `refreshRecentRow()`
- L4636 `recentRowHtml(q)`

### 卡片顯示模式：精簡（預設；點到的那張展開）／一律完整。存本機  (L4642)
- L4646 `setCardMode(full)`
- L4651 `renderCardModePicker()`
- L4658 `shortAddr(a)` — 地址去掉縣市（卡片上只放區以後；完整版仍顯示全址）

### 清單分段載入：先畫 60 張，捲到底再補，開頁與切分頁才不會卡  (L4659)
- L4662 `loadMoreCards()`
- L4665 `jumpToClient(id)` — 不在目前篩選 → 清掉搜尋、切回「全部」、取消時間篩選；排在分段之後 → 把分段放大到他為止；最後捲到正中間。
- L4686 `watchLoadMore()`
- L4693 `setTimeFilter(t)`
- L4699 `setTab(t)`
- L4710 `hl(text,q)` — Highlight matching keyword in text
- L4719 `clientMatchesQuery(c,q)` — 搜尋比對：姓名/電話/身分證/備註/主地址 + 所有房產的地址/建號/地號（打第二間以後也找得到）
- L4746 `openMapExport()`
- L4752 `mapRowMatch(r)`
- L4753 `mapPickBatch(b)`
- L4754 `closeMapExport()`
- L4755 `buildMapRows()`
- L4774 `renderMapCatBar()`
- L4780 `toggleMapCat(h)`
- L4781 `mapSelectAll(v)`
- L4782 `updateMapCount()`
- L4787 `renderMapList()`
- L4804 `downloadMapCsv()`
- L4827 `openListTool()`
- L4835 `closeListTool()`
- L4836 `ltToggleFilter()`
- L4837 `ltToggleCat(h)`
- L4838 `ltToggleCheck(id,on)`
- L4839 `ltVisible()`
- L4847 `ltSelectAllVisible(v)`
- L4848 `renderListTool()`
- L4868 `ltTagBatch()`
- L4878 `closeLtBatch()`
- L4879 `ltBatchApply()`
- L4893 `findBySerial(s)`
- L4895 `linkRelation(a,b,relation)` — 在 A、B 兩位客戶間建立雙向關聯（同型別不重複）
- L4904 `unlinkRelation(a,b)`
- L4910 `renderRelChips()` — 渲染目前編輯中客戶的關聯標籤
- L4926 `openRelPicker()`
- L4936 `closeRelPick()`
- L4937 `renderRelPickList()`
- L4951 `addRelation(targetId)`
- L4962 `removeRelation(serial)`
- L4977 `bldKeys(buildNo,col4,district,purpose)` — 優先用完整建號(col4，含縣市/區/段)；沒有才退用「區+段+建號數字」，且「沒填段就不比」避免亂配。
- L4987 `renderCoOwners()`
- L5005 `ltMapCsv()`
- L5022 `logsToProcess(logs)` — 聯絡記錄→總檔「拜訪過程」格式（民國日期 + 內容，舊到新）
- L5039 `loadXlsxStyle()`
- L5055 `digitsOf(s)` — 謄本原文那種 CRM 沒拆開存的欄位（所有權部、債務人、義務人、權利人…）照總檔原值；兩邊都沒有的才用 CRM 資料湊一個看得懂的。
- L5056 `loansToRights(loans)`
- L5068 `companyExportRows(list)`
- L5119 `buildCompanyWorkbook(X,rows)`
- L5126 `buildCompanySheet(X,rows)`
- L5142 `ltExportCompany()`
- L5157 `noticeAddrParts(addr)` — 地址自動拆成 區/路/段/巷/弄/號/樓 各部分，填進通知單對應空格
- L5173 `noticeSlip(c,dv)`
- L5191 `ltPrintNotice()`
- L5222 `ltExportNoticeData()` — 欄位名要跟 Word 範本的合併欄位一致：流水編號/姓名/地址/區/路/段/巷/弄/號/樓/樓別/投遞姓名/投遞電話
- L5247 `render()`
- L5396 `openHeatPick(e,id)`
- L5411 `closeHeatPick()`
- L5412 `applyHeatPick(h)`
- L5425 `togglePin(id,e)`

### Batch select mode  (L5437)
- L5441 `getVisibleList()`
- L5450 `toggleSelectMode()`
- L5457 `setSelectBtn(on)` — 選取鈕外觀：進入選取＝實心藍「✕ 取消」；平常＝淡藍「☑ 選取」（手機只顯示圖示）
- L5463 `exitSelectMode()`
- L5469 `toggleSelect(id,e)`
- L5476 `batchDeleteSelected()` — 批次刪除勾選的客戶：不加黑名單（之後重新匯入會再建回來）；確認視窗列人數與前幾個名字
- L5490 `batchClearReimport()` — 清掉勾選的人的 🔁 二次匯入記號（例如只是為了補持分重匯一次，不想留記號）
- L5501 `withSel(fn)` — 名單面板那套動作（標批次／匯出／通知單／地圖）都吃 _ltChecked；這裡把主清單勾選的人灌進去再呼叫
- L5507 `mapFromSelection()` — 地圖名單：開原本的地圖匯出視窗，但只預勾目前選取的人（分類全開，免得被分類篩掉）
- L5512 `batchSelectAll()`
- L5520 `updateBatchBar()`
- L5531 `applyBatchCategory()`
- L5542 `clearRemind(e,id)`

### 電話點擊  (L5557)

### 手機撥號後回到 app → 自動開那位客戶的「聯絡記錄」頁，游標停在輸入框  (L5558)
- L5571 `handlePhoneClick(e,phone,cid)`

### 關掉瀏覽器自動填入  (L5582)

### 表單髒標記  (L5596)

### 瀏覽器推播通知  (L5600)
- L5601 `initNotifications()` — ── 瀏覽器推播通知 ────────────────────────────────────────
- L5605 `checkReminders()`

### 鍵盤快捷鍵  (L5621)
- L5666 `syncToEval(targetId,val)`
- L5670 `syncLandtax(field,val)`
- L5675 `extractDistrict(addr)`
- L5678 `autoFillDistrict(addr)`
- L5686 `refreshLoanSection()` — 房價評估頁「貸款狀況」區塊的可見度：有哪筆 loans（或其他貸款）就顯示，內容本身在 renderPriceEval() 產生
- L5695 `openCalendar(id)`
- L5712 `autoGrowNote(el)` — 備註欄隨內容自動長高（打越多越高，不用滾）

### Sheet modal  (L5714)

### t126 新欄位：聯絡／工作家庭／借款需求／信用／文件清單／結案原因  (L5715)
- L5720 `nextDocState(cur)`
- L5725 `saveCustomDocs()`
- L5729 `allDocNames()`
- L5733 `addCustomDoc()`
- L5740 `removeCustomDoc(name)`
- L5748 `renderDocChips()`
- L5760 `toggleDoc(name)`
- L5766 `fillExtraFields(c)`
- L5784 `updateSpouseRow()` — 配偶欄只在「已婚」時出現；改成非已婚就把配偶值清掉
- L5792 `renderBatchChips()` — 來源批次籤：顯示 #fBatch（「、」串接）裡的每一個，✕ 可移除；新增從輸入框 Enter
- L5799 `addBatchChip()`
- L5806 `removeBatchChip(b)`
- L5812 `updateCloseReasonRow()` — 結案原因只在「無效案件」時出現
- L5818 `creditSet()`
- L5819 `renderCreditChips()`
- L5824 `toggleCredit(o)`
- L5835 `renderHeatChips()` — ── 追蹤熱度色籤（取代下拉；仍透過隱藏的 #fHeat 存值，其他程式不用改）──
- L5841 `pickHeatChip(h)`

### 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度  (L5846)
- L5847 `updateSheetHeader()` — ── 面板標題列：頭像（名字首字、顏色跟分類）、副標（流水編號 · 區）、資料完整度 ──
- L5867 `applyReadOnlyToSheet()` — 唯讀：面板所有輸入欄鎖住（看得到、不能改）；按鈕由 CSS .readonly 隱藏
- L5873 `saveBtnLabel()` — 儲存鈕文字依情況：新客戶「建立客戶」；既有客戶手機「存並關閉」、電腦「儲存」（面板不關）
- L5874 `openAdd()`
- L5918 `isSheetOpen()`
- L5920 `highlightActiveCard(doScroll)` — 左邊清單標出「右邊正在看的那位」：卡片浮起來，並把它捲進可視範圍(↑↓切換客戶時清單會跟著走)
- L5951 `openEdit(id)`
- L6031 `closeSheet()`
- L6052 `evalCtx(c,p)`
- L6057 `renderPriceEval(c)`
- L6241 `calcEvalBuildArea()`
- L6295 `calcTotal()`
- L6318 `fmtWan(n)` — 行情／總價範圍文字：好賣價～行情價（萬/坪）、各乘建坪再加車位
- L6319 `priceRangeStr(lo,hi,area,parkVal)`
- L6326 `regionFromAddr(addr)` — 門牌 → 「台北市 中山區」
- L6331 `clientAgeStr(c)` — 客戶年紀：用基本頁的出生年月日（民國）
- L6339 `evalReportText(d)` — 案源評估：純文字排版（空行位置照老闆定的範本，一行都不能動）
- L6378 `generateReport(clientId)`
- L6478 `sSTab(i,el)`
- L6495 `renderCompanyTabs()`
- L6508 `selectCompanyProp(i)`
- L6516 `renderCompanyPanel()`
- L6578 `sSTabTo(i)`
- L6588 `logKindLabel(k)`
- L6589 `logKindTag(k)`
- L6590 `renderLogKindChips()`
- L6594 `renderLogs()`
- L6619 `editLog(i)`
- L6625 `cancelLogEdit()`
- L6626 `saveLogEdit(i)`
- L6642 `markDebtPhoneDeleted(p)`
- L6648 `renderDebtPhones()`
- L6658 `debtPhoneTel(p)` — 債電字串 → tel: 可用的號碼：去掉「（名字）」等註記，#分機 變成「,分機」（撥通後停一下再送分機）
- L6665 `dialDebtPhone(i)`
- L6670 `addDebtPhone()`
- L6671 `setDebtPhone(i,v)`
- L6676 `removeDebtPhone(i)`
- L6680 `addLog()`
- L6691 `defaultRemindTime()` — 填了提醒日期、時間還空白 → 預設 11:30（業主定）
- L6696 `quickRemind(days)`
- L6711 `removeLog(i)`

### Extra Loans  (L6725)
- L6730 `landAreaLabel(no)` — 坪數欄標籤：有地號→「114地號面積」；沒有→「土地坪數」
- L6731 `updateLandLabels()`
- L6735 `renderExtraLands()`
- L6764 `syncExtraAreaLabel(i)`
- L6768 `addExtraLand()`
- L6770 `applyLandShare()` — 土地：全筆坪 × 持分 → 自動填進「土地持分坪」（估價用）；沒填全筆或持分就不動手填的值
- L6781 `renderShareBanner()` — 持分結算條：把「系統實際用的坪數」用大字寫出來，持分<1 橘底、全部持有綠底
- L6799 `updateLandTotals()`
- L6815 `renderExtraLoans()`
- L6824 `addExtraLoan()`
- L6827 `renderLoanRows()` — ── 抵押貸款：逐筆列債權人（登序＋名稱＋金額＋分類）───────────────
- L6868 `addLoanRow()`
- L6876 `removeLoanRow(i)`
- L6884 `rocShort(iso)` — 西元 2026-10-19 → 民國 115/10/19
- L6885 `toggleLoanConfirm(i)`
- L6891 `setLoanField(i,key,val)`
- L6902 `syncLoanTotalsToForm()` — 從 p.loans 加總回寫 p.bank/legal/private，同步進隱藏欄位＋房價評估區＋可貸空間
- L6917 `renderFinProofs()`
- L6926 `addFinProof()`
- L6928 `reorderProofHints()` — 收入佐證的建議類型排序：薪轉→存摺排第一；有報稅→所得清單/扣繳憑單排第一（只是排序提示，不自動填）
- L6938 `syncDocFromProof(type)`
- L6948 `openMapForProp()` — 📍 地圖：用門牌開 Google 地圖釘一根針（手機會直接開地圖 App）
- L6953 `openLandZoneQuery()`
- L6966 `calcAge()`

### Properties (多筆不動產)  (L6981)
- L6985 `emptyProperty(n)`
- L6994 `propLabel(p)` — 不動產子頁標籤：地址優先（取區之後的街路門牌），沒地址才用建號
- L7004 `migrateProperties(c)`
- L7027 `renderPropTabs()`
- L7036 `startRenameTab(e,idx)`
- L7050 `finishRenameTab(inp,idx)`
- L7056 `savePropFields()`
- L7100 `loadPropFields(idx)`
- L7148 `calcLoanRoom()` — 可貸空間 = 核定估價 × 成數 − 既有抵押(銀行+租賃+民間+其他)
- L7183 `buildLoanCalcState(c,p)` — 用目前不動產的抵押金額建立試算表初始狀態
- L7213 `openLoanCalc()`
- L7246 `renderLoanHints()`
- L7269 `togglePrivateConfirm(v)`
- L7274 `switchProperty(idx)`
- L7280 `addProperty()`
- L7289 `removeProperty(idx)`
- L7300 `jumpToEval()`

### 房價評估：畫面上顯示的是「哪一筆」不動產  (L7307)
- L7312 `collectEvalData()` — 讀取評估表單目前的內容（存檔與切換前保存都用這個，只有一份定義）
- L7329 `saveEvalFields()` — 把畫面上的評估內容存回「畫面正在顯示的那一筆」（不是 curPropIdx，切換途中兩者可能不同）
- L7336 `refreshPriceEval()` — 重畫評估面板成「目前這筆」，並記住畫的是哪一筆
- L7343 `updateEvalIndicator()`

### 謄本 Import  (L7351)
- L7362 `openTenModal()`
- L7375 `closeTenModal()`
- L7377 `normNum(s)`
- L7384 `detectTenType(text)`
- L7397 `parseBiao(text)`
- L7422 `parseSuo(text)`
- L7438 `parseTa(text)`
- L7460 `extractPdfText(file)`
- L7486 `handleTenFiles(files)`
- L7526 `tenToggleRaw(idx)`
- L7535 `renderTenPreview()`
- L7560 `doTenImport()`
- L7574 `applyTenParsed(mode)`
- L7612 `onTenModeChange()`
- L7619 `filterTenClients()`
- L7640 `selectTenClient(id)`
- L7645 `saveClient(silent)`
- L7750 `scheduleDraftSave()`
- L7758 `setSaveStatus(kind,text)` — 面板標題旁的狀態字：saving=儲存中、saved=✓ 已自動儲存 時:分、dirty=灰字提示

### 還原：開啟客戶時先拍一份快照，誤改（含已自動存的）可整筆退回  (L7763)
- L7765 `takeSnapshot(id)`
- L7771 `updateRevertBtn()`
- L7776 `revertClient()`
- L7792 `deleteClient()`
- L7802 `blacklistClient()`

### AI 整理匯入  (L7814)
- L7817 `openAiImport()`
- L7826 `closeAiImport()`

### 📥 AI匯入待審收件匣：Cowork POST 進 GAS 佇列 → 這裡紅點提示 → 點開走既有AI匯入預覽 → 確認匯入後標記已處理  (L7828)
- L7830 `checkInbox()`
- L7840 `openInbox()`
- L7853 `inboxMarkDone()` — 匯入成功後呼叫:通知 GAS 標記已處理、紅點消失
- L7859 `parseAiImport()`
- L7886 `normBuildNo(s)` — 建號正規化：去掉段名與前導0，套用「母-子」慣例，全0子號只留母號
- L7899 `normAddr(s)`
- L7901 `addrCore(s)` — 地址核心：去掉縣市區鄉鎮前綴，只留街路門牌（兩邊格式不同也能對上）
- L7907 `surnameOf(n)` — 姓氏（去掉遮罩星號取第一字）：「龔**」→「龔」
- L7908 `isMaskedName(n)`
- L7910 `clearlyDifferentPerson(a,b)` — 判斷 a、b 是否「明顯不同人」(用於同建號/同地址時避免把持分共有的共有人併在一起)
- L7921 `addrHit(a,b)`
- L7924 `findAiMatch(rec)` — 多層比對：身分證→電話→建號→地址(+姓氏)→只有姓名
- L7972 `renderAiPreview()`
- L8027 `weakMatchBox(x,i)` — 疑似同名：顯示系統既有那筆的資料 + 合併/新增 按鈕讓使用者判斷
- L8046 `setAiDecision(i,v)`
- L8049 `mapEval(rec)` — 案源評估表欄位 → evalData（key 與系統內部一致）
- L8063 `shareFromOwner(ownerRaw)` — 從所有權部文字抓這一戶的建物持分：第一個「X分之Y」→ Y/X（全部1分之1＝1/1）；抓不到回 0/0
- L8069 `parseShare(s,num,den)`
- L8083 `emptyProp()`
- L8091 `recordToProps(rec)`
- L8175 `mergePropInto(dst,src)` — 把匯入不動產 src 的資料補進既有不動產 dst 的「空格」，有值的不覆蓋
- L8213 `doAiImport()`

### 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔  (L8299)
- L8300 `clientToShareJson(c)` — ── 分享客戶給同事：把一筆客戶轉成「AI 匯入」吃得下的 JSON，同事貼進🤖AI匯入即可建檔 ──
- L8338 `shareClient()`
- L8347 `closeShare()`
- L8348 `copyShareCode()`
- L8356 `nativeShareCode()`

### XLS Import  (L8361)
- L8362 `openImport()` — ── XLS Import ────────────────────────────────────────────
- L8370 `closeImport()`

### Blacklist UI  (L8372)
- L8373 `openBlacklist()` — ── Blacklist UI ──────────────────────────────────────────
- L8393 `closeBlacklist()`
- L8400 `normalizeXlsRows(raw)` — 回傳 {format:'master'|'export'|'unknown', rows, count}；rows 一律是「前 2 列標題、第 3 列起資料」的 25 欄陣列。
- L8415 `handleXls(file)`
- L8444 `doImport()`
- L8458 `idnoFromOwner(ownerRaw)` — 從所有權部文字抓身分證：完整(A+9碼)優先,否則遮罩版(只取緊接姓名前那組)
- L8465 `isTrustOwner(ownerStr)` — 信託判斷：所有權部有「信託」但沒「塗銷」＝進行中信託(登記人是受託人)
- L8467 `trustSettlorName(ownerStr,restrictStr)` — 從信託謄本抓「委託人(原屋主)」：可能在 1.所有權部「信託（委託人：X）」 2.遮罩名後括號「張＊＊（高鄭慧貞）」 3.限制登記事項「委託人:X」
- L8475 `isMaskedShortName(n)` — 名字是不是遮罩/只剩姓(總檔的遮罩名會被縮成單姓如「馬」)
- L8478 `ownerFullNameFromCompanyRaw(cr)` — 注意:「義務人」和冒號間可能有空白/換行(義務人  :馬曉芃)
- L8485 `censusFromCompanyRaw(cr)` — 從整列總檔抓戶籍地：優先第7欄,否則所有權部第二行(屋主住址)
- L8494 `bestDoor(buildInfo,ownerRaw)` — 門牌欄空白/壞掉時的最佳門牌：優先標示部(col3)的門牌行(縣市+區+門牌),沒有就退用所有權部屋主住址
- L8510 `fixAddrDistrict(addr,buildInfo)` — 用標示部(謄本)修正門牌的「區」：只在區不一致時換區,縣市與街道保留
- L8523 `isJunkLog(t)` — 聯絡紀錄雜訊判斷：內容只剩數字/標點（沒中文也沒字母）就是雜訊
- L8524 `applyNewRulesToExisting(dryRun)`
- L8619 `runApplyNewRules()`
- L8635 `cleanupDirtyData()` — 🧹 清理明顯髒資料：標題列誤當客戶、地址裡的 Excel 公式殘渣、錯放成身分證的地址
- L8679 `cleanupInvalidEmpty()` — 注意：不看身分證！謄本所有權部本來就帶屋主身分證號，那不是聯絡方式，看了會清不掉。
- L8697 `splitMergedCoborrowers()` — 🔗 拆分舊的「名字／名字」共同借款人：拆成獨立兩筆＋雙向綁定「共同借款人」
- L8738 `fixTrustClients()` — 🔍 找出信託案件並修正：名字是受託人的→改成委託人(原屋主);抓不到委託人的→標記待補
- L8773 `clearAllData()`

### City Filter  (L8795)
- L8799 `initCityFilter()`
- L8810 `toggleCityFilter()`
- L8818 `updateFilterBadge()` — 篩選徽章：縣市數 + 批次數 合計顯示在「🗺️ 篩選」按鈕上
- L8824 `onCityChange()`
- L8833 `selectAllCities()`
- L8838 `clearAllCities()`

### 來源批次：篩選 + 標記工具  (L8843)

### 批次管理視窗  (L8846)
- L8847 `openBatchMgr()` — ── 批次管理視窗 ──
- L8853 `closeBatchMgr()`
- L8854 `batchMgrSuggestAll()`
- L8855 `batchMgrResetAll()`
- L8856 `batchMgrApply()`

### t141 多批次：batch 仍是一格文字，多個用「、」串接；一律用下面這幾個函式讀寫  (L8868)
- L8870 `batchList(c)`
- L8871 `batchJoin(arr)`
- L8872 `batchAdd(c,b)`
- L8873 `batchSetAll(c,label)`
- L8875 `suggestBatchName(b)` — 批次改名建議：新鑫「1150318_資料 (5)」→「新鑫 115/03/18 (5)」（同月多份，保留日）；「115_03 松山區包區」→「包區 115/03 松山區」；「X中人
- L8883 `allBatches()`
- L8884 `batchFilterPass(c)`
- L8885 `refreshBatchDatalist()`
- L8890 `renderBatchCheckboxes()`
- L8899 `onBatchChange()`
- L8900 `clearBatchFilter()`
- L8905 `renderBatchTagCatBar()`
- L8909 `toggleBatchTagCat(h)`
- L8911 `openBatchTag()`
- L8923 `closeBatchTag()`
- L8927 `openBatchTagForImport(newIds)` — 從總檔更新後自動開啟，預設只看「本次匯入新增的人」，方便直接圈這批標來源
- L8939 `batchTagVisible()`
- L8949 `updateBatchTagCount(visLen)`
- L8950 `renderBatchTagList()`
- L8966 `toggleBatchTagPick(id,on)`
- L8967 `batchTagSelectAll(v)`
- L8968 `batchTagApply()`

### Init time dropdowns  (L8991)
- L8992 `initTimeDropdowns()` — ── Init time dropdowns ───────────────────────────────────

### Drag to resize sheet (mobile)  (L9002)

## 重要畫面元件 id（L 行號）
- #mainApp L1195
- #statsBar L1199
- #mainMenu L1207
- #tabSelect L1231
- #searchInput L1228
- #cityFilterPanel L1234
- #listWrap L1266
- #batchBar L1273
- #sheetBg L1301
- #sheetTitle L1367
- #saveStatus L1368
- #sp0 L1389
- #sp1 L1552
- #sp2 L1665
- #sp3 L1690
- #sp4 L1697
- #sp5 L1701
- #heatChips L1434
- #creditChips L1505
- #docChips L1512
- #finProofList L1473
- #loanRowList L1626
- #priceEvalPanel L1699
- #urlSettingsBg L1785
- #uiDlgBg L1724
- #themePicker L1842
- #cardModePicker L1840

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
