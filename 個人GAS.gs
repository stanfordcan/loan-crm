// ===== 個人總檔 GAS（最新完整版 2026/06/14，含 listFolder）=====
// 部署：網頁應用程式，執行身分=我自己，存取=所有人
// appsscript.json 的 oauthScopes 需含：
//   "https://www.googleapis.com/auth/drive"
//   "https://www.googleapis.com/auth/spreadsheets"
//   "https://www.googleapis.com/auth/calendar.readonly"
// 第一次或加新權限後：跑一次 authorize() 授權，再「建立新版本」重新部署。

var SPREADSHEET_ID = '1ROlo6EXFpFDUsE_Gx2JB31mAk3CNOhZTxq2KbQxAtAM';  // ← 各自的試算表 ID
var TOKEN = 'stanford87';

function doGet(e) {
  var token    = e.parameter.token    || '';
  var action   = e.parameter.action   || '';
  var callback = e.parameter.callback || 'callback';

  if (token !== TOKEN) {
    return jsonp(callback, {status: 'error', message: 'invalid token'});
  }

  // ── 建立資料夾：巢狀 客戶資料 / 客戶名 / 門牌地址 ──
  if (action === 'createFolder') {
    var client = e.parameter.client || e.parameter.name || '未命名客戶'; // 相容舊參數 name
    var addr   = e.parameter.addr   || '';
    try {
      var rootIt = DriveApp.getFoldersByName('客戶資料');
      var root = rootIt.hasNext() ? rootIt.next() : DriveApp.createFolder('客戶資料');
      var cIt = root.getFoldersByName(client);
      var clientFolder = cIt.hasNext() ? cIt.next() : root.createFolder(client);
      var target = clientFolder;
      if (addr) {
        var aIt = clientFolder.getFoldersByName(addr);
        target = aIt.hasNext() ? aIt.next() : clientFolder.createFolder(addr);
      }
      return jsonp(callback, {status: 'ok', url: target.getUrl()});
    } catch(err) {
      return jsonp(callback, {status: 'error', message: err.toString()});
    }
  }

  // ── 讀取 Google 行事曆（含共享行事曆，唯讀）──
  if (action === 'getEvents') {
    try {
      var now = new Date();
      var start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      var end   = new Date(now.getFullYear(), now.getMonth() + 4, 0);
      var cals = CalendarApp.getAllCalendars();
      var out = [];
      for (var k = 0; k < cals.length; k++) {
        var calName = cals[k].getName();
        var evs = cals[k].getEvents(start, end);
        for (var i = 0; i < evs.length; i++) {
          out.push({
            title: evs[i].getTitle(),
            cal:   calName,
            date:  Utilities.formatDate(evs[i].getStartTime(), 'Asia/Taipei', 'yyyy-MM-dd'),
            start: Utilities.formatDate(evs[i].getStartTime(), 'Asia/Taipei', 'HH:mm'),
            end:   Utilities.formatDate(evs[i].getEndTime(),   'Asia/Taipei', 'HH:mm'),
            allday: evs[i].isAllDayEvent()
          });
        }
      }
      return jsonp(callback, {status: 'ok', events: out});
    } catch(err) {
      return jsonp(callback, {status: 'error', message: err.toString()});
    }
  }

  // ── 列出資料夾內的檔案（☁️雲端預覽分頁用，唯讀；只用既有 Drive 權限，不用重新授權）──
  if (action === 'listFolder') {
    var url = e.parameter.url || '';
    try {
      var m = url.match(/folders\/([A-Za-z0-9_-]+)/);
      var id = m ? m[1] : '';
      if (!id) return jsonp(callback, {status: 'error', message: 'invalid url'});
      var folder = DriveApp.getFolderById(id);
      var it = folder.getFiles();
      var out = [];
      while (it.hasNext()) {
        var f = it.next();
        out.push({
          name:  f.getName(),
          id:    f.getId(),
          mime:  f.getMimeType(),
          url:   f.getUrl(),
          thumb: 'https://drive.google.com/thumbnail?id=' + f.getId() + '&sz=w300'
        });
      }
      return jsonp(callback, {status: 'ok', files: out});
    } catch(err) {
      return jsonp(callback, {status: 'error', message: err.toString()});
    }
  }

  // ── 預設：回傳總檔資料 ──
  try {
    var result = getSheetData();
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(result) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } catch(err) {
    return jsonp(callback, {status: 'error', message: err.toString()});
  }
}

function getSheetData() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheets = ss.getSheets();
  var SKIP_SHEETS = ['設定', 'config', 'Config', '說明', 'Sheet1'];
  var allRows = [];
  allRows.push(['電話姓名','拜訪過程','備註','建物編號','門牌地址','面積','建物所有權部','','','','','','','他項權利部','分頁']);
  allRows.push(['電話/姓名欄','拜訪過程','備註','建物所有權編號','門牌地址','面積坪數','建物所有權部','','','','','','','他項權利部','分頁名稱']);
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var sheetName = sheet.getName();
    var skip = false;
    for (var s = 0; s < SKIP_SHEETS.length; s++) {
      if (SKIP_SHEETS[s] === sheetName) { skip = true; break; }
    }
    if (skip) continue;
    var data = sheet.getDataRange().getValues();
    if (data.length < 2) continue;
    for (var r = 1; r < data.length; r++) {
      var row = data[r];
      var hasData = false;
      for (var c = 0; c < row.length; c++) {
        if (String(row[c]).trim() !== '') { hasData = true; break; }
      }
      if (!hasData) continue;
      var paddedRow = [];
      // 送 0~24 欄（標準14欄 + 額外欄位：權利人/限制登記事項/流抵約定/各門牌/金主門牌…）
      // CRM 靠固定欄位位置顯示「總檔其他欄位」，所以這裡要送足 25 欄；最後再接分頁名稱
      for (var c = 0; c < 25; c++) {
        paddedRow.push(c < row.length ? row[c] : '');
      }
      paddedRow.push(sheetName);
      allRows.push(paddedRow);
    }
  }
  return allRows;
}

function jsonp(callback, obj) {
  return ContentService
    .createTextOutput(callback + '(' + JSON.stringify(obj) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// ── 上傳檔案到指定資料夾（CRM ☁️雲端分頁的「⬆️ 上傳」用）──
// CRM 以 POST 送 JSON：{token, action:'uploadFile', url, filename, mime, data(base64)}
// 只用既有 Drive 寫入權限，不需重新授權；存檔後「建立新版本」重新部署即可。
function doPost(e) {
  var p = {};
  try { p = JSON.parse(e.postData.contents); } catch(err) { p = {}; }
  var callback = p.callback || 'callback';
  if (p.token !== TOKEN) {
    return jsonp(callback, {status: 'error', message: 'invalid token'});
  }
  if (p.action === 'uploadFile') {
    try {
      var m = String(p.url || '').match(/folders\/([A-Za-z0-9_-]+)/);
      var id = m ? m[1] : '';
      if (!id) return jsonp(callback, {status: 'error', message: 'invalid url'});
      var folder = DriveApp.getFolderById(id);
      var bytes = Utilities.base64Decode(p.data || '');
      var blob = Utilities.newBlob(bytes, p.mime || 'application/octet-stream', p.filename || '上傳檔案');
      var file = folder.createFile(blob);
      return jsonp(callback, {status: 'ok', url: file.getUrl(), name: file.getName()});
    } catch(err) {
      return jsonp(callback, {status: 'error', message: err.toString()});
    }
  }
  return jsonp(callback, {status: 'error', message: 'unknown action'});
}

// 跑一次來授權（含 Drive + 試算表 + 行事曆）；不要在編輯器跑 doGet
function authorize() {
  DriveApp.getRootFolder();
  SpreadsheetApp.openById(SPREADSHEET_ID);
  CalendarApp.getDefaultCalendar().getName();
}
