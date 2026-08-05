# Cowork → loan-crm 資料匯入教學（2026/08/05）

你（Cowork）整理好的客戶資料要送進業主的 CRM，有兩條路。**預設走路線 A（收件匣）**。

## 路線 A：收件匣（預設用這條，不干擾業主）

把 AI 匯入格式的 JSON POST 到業主的 GAS：

```
POST https://script.google.com/macros/s/AKfycbyolBN-1JHQWsHyARSKrLuy4rafGI7_o_r9m7rkpS1-AIdTzBonk6vj2itQkDTYQc94xw/exec
Content-Type: application/json

{ "token": "stanford87", "action": "inbox", "payload": [ ...AI匯入JSON陣列... ] }
```

- 成功回 `{"status":"ok","queued":N}`（N＝實際入列筆數）。
- 之後**不用做任何事**：業主的 CRM 會跳紅色「📥 待審(N)」，他點開預覽、按匯入才真正進資料庫（防重複比對由 CRM 做，你重送同批也不會灌出重複客戶，但請盡量別重送）。
- **先驗格式**：body 加 `"dryRun": true` → 只回 `{valid, invalid}` 不入列。第一次串接先 dryRun。
- **沒有 name 的資料會被拒收**（invalid 計數），送之前確認每筆都有姓名。
- 查佇列狀態（GET）：`<GAS網址>?token=stanford87&action=inboxList&callback=cb` → pending 清單。

## 路線 B：?claim=1 全自動（急件才用）

用瀏覽器開 `https://stanfordcan.github.io/loan-crm/index-test.html?claim=1` 登入，可直接操作 CRM 的「🤖 AI 匯入」貼 JSON 匯入，遇「其他裝置在線」會**自動接管不彈窗**。

⚠️ 代價：**業主當下開著的 CRM 會被踢下線**。所以：
1. 先確認業主沒在用（問他）。
2. 匯完立刻關閉分頁，讓業主重新整理拿回 session。
3. 平常一律走路線 A。

## JSON 格式

以 `AI匯入提示詞.txt`（repo／業主桌面／客戶系統資料夾，三份同步）為準，目前含 12 條規則。你產出時特別注意：

- 金額（bank/legal/private、loans[].amt）一律填**謄本設定金額原值（萬），不要除 1.2**——CRM 匯入時自己算。
- `loans`：一筆抵押一個物件 `{creditor(只留本名),amt,type(銀行/法人/民間),seq(登序)}`。
- 建物面積填全額、`buildShare` 另填持分；土地坪填**已算好持分**的數字。
- 車位含在公設時 `commonArea` 照謄本全額填，CRM 會自動扣——你不要先扣。
- 信託未塗銷：name 填委託人、idno 留空、note 標⚠️。
- **估價寫入（t91 起）**：`eval` 可帶 `aiEvalBasis`（多行純文字，放實價登錄錨點逐筆／A/B/C分級／四情境／母體統計，自行排版，等寬字型顯示）＋照舊的 `unitprice`（行情單價，萬/坪）與 `evalNote`。顯示在 CRM 房價評估頁「🤖 AI估價依據」。重送同客戶會覆蓋舊的 aiEvalBasis（估價新版蓋舊版）。

## 常見錯誤

| 回應 | 原因 |
|---|---|
| `invalid token` | token 打錯（正確：stanford87） |
| `no payload` | body 沒有 payload 欄位 |
| queued 比送的少 | 有幾筆沒 name 被拒收（看 invalid 數） |
| 完全沒回應/HTML錯誤頁 | GAS 網址過期——跟業主要最新部署網址 |
