// ===== 個人總檔 GAS（最新完整版 2026/06/14）=====
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
      for (var c = 0; c < 14; c++) {
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

// 跑一次來授權（含 Drive + 試算表 + 行事曆）；不要在編輯器跑 doGet
function authorize() {
  DriveApp.getRootFolder();
  SpreadsheetApp.openById(SPREADSHEET_ID);
  CalendarApp.getDefaultCalendar().getName();
}
