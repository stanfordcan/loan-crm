---
name: deploy-prod
description: 搬正式版——把 loan-crm 測試版整包搬上正式版的標準流程（只改版本行、diff 驗證、push）。使用者說「搬正式版」「上正式」「上傳正式版」時使用；業主沒開口前絕不主動搬。
---

# 搬正式版流程

前提：**業主明確說了「上正式」才執行**。測試版必須是已驗證過的狀態。

1. 用 Node 腳本把 `index-test.html` 整份複製成 `index.html`，**只改 APP_VERSION 那一行**：
   ```js
   let t=fs.readFileSync('index-test.html','utf8');
   t=t.replace(/const APP_VERSION = '.*';/, "const APP_VERSION = 'YYYY.MM.DD #N';");
   fs.writeFileSync('index.html',t,'utf8');
   ```
   - 正式版號格式 `YYYY.MM.DD #N`：同一天遞增（#1→#2…），跨日回 #1。日期用**今天**。
   - regex 必須貪婪 `'.*'`（版本字串內含分號，非貪婪曾把檔案截壞）。
2. 驗證（缺一不可）：
   - `node dev/check-syntax.js index.html` → 0 錯誤
   - `diff index.html index-test.html` → **只允許差 APP_VERSION 那一行**，多任何一行就停下來查。
3. `git pull` → `git add index.html` → commit（標題 `正式版 YYYY.MM.DD #N：重點摘要`，內文列本批帶上的功能；結尾 `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`）→ push。
4. 告訴業主：正式版重新整理（電腦 Ctrl+Shift+R、手機無痕），版本會顯示 `YYYY.MM.DD #N`，並白話列這批帶上了什麼。
