// 模擬「XLS 匯入」：用真實備份檔當現有客戶，把一個或多個 xlsx（先用 python 轉成 rows.json）依序跑 processCompanyData，
// 回報每份的新增／併入／略過，以及匯入後資料是否還在（新欄位沒被洗掉、沒有空名字）。純本機，不碰雲端。
// 用法：node dev/xls-import-sim.js <備份.json> <rows.json>
//   rows.json 格式：{ "檔名.xlsx": [[row0...],[row1...],...], ... }（第一個工作表的二維陣列）
const fs=require('fs'), vm=require('vm');
const HTML=fs.readFileSync('index-test.html','utf8');
const BK=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const FILES=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));

function extFn(n){const s=HTML.indexOf('function '+n+'(');if(s<0)return null;let j=HTML.indexOf('{',s),d=0;for(;j<HTML.length;j++){const c=HTML[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return HTML.slice(HTML.lastIndexOf('\n',s)+1,j+1);}}return null;}
function extConst(n){const m=HTML.match(new RegExp('^(?:const|let|var) '+n+'\\s*=.*?;\\s*$','ms'));return m?m[0]:null;}

// 固定 stub：畫面/雲端/對話框
const captured={summaries:[],toasts:[],batchTag:[]};
const base=`
var TODAY='${new Date().toISOString().slice(0,10)}';
var CLAUDE_API_KEY=''; var GAS_URL=''; var COMPANY_URL='';
var blacklist=[]; var editId=null; var memos=[]; var nextMemoId=1;
function showToast(m){ __cap.toasts.push(String(m)); }
function saveLocal(){} function pushToSheet(){ return Promise.resolve(); } function render(){} function saveToFirestore(){ return Promise.resolve(); }
function uiAlert(m){ __cap.summaries.push(String(m)); return Promise.resolve(true); }
function uiConfirm(){ return Promise.resolve(true); }
function openBatchTagForImport(ids){ __cap.batchTag.push([...ids].length); }
function calEsc(s){ return String(s==null?'':s); }
var localStorage={ _s:{}, getItem(k){ return this._s[k]??null; }, setItem(k,v){ this._s[k]=String(v); }, removeItem(k){ delete this._s[k]; } };
var document={ getElementById(){ return null; }, querySelector(){ return null; }, querySelectorAll(){ return []; } };
var window={ innerWidth:1200 }; var navigator={ userAgent:'node' };
`;
let SRC=''; const have=new Set();
function add(name){ if(have.has(name)) return true; const f=extFn(name)||extConst(name); if(!f) return false; SRC+=f+'\n'; have.add(name); return true; }
['processCompanyData','normalizeXlsRows','COMPANY_EXPORT_HEADER','autoClassify','ensureSerials','consolidateByIdno','foldClientInto','migrateProperties','mergePropInto','normalizeAddr','normBuildNo','addrCore','addrHit','isFullId','propLabel','emptyProperty','extractDistrict','clientRichness','dispName','genderFromId','normPhoneKey','mergeDebtPhones','mergeDebtPhonesInto','isBlacklisted','parseVisitLogs','companyOwnerFromRaw','extractDebtPhones','idnoFromOwner','isTrustOwner','trustSettlorName','isMaskedShortName','ownerFullNameFromCompanyRaw','censusFromCompanyRaw','bestDoor','parseShare','defaultLoanE','surnameOf','isMaskedName','clearlyDifferentPerson','linkRelation','findAiMatch','EXTRA_FIELDS','hCls','hOrd'].forEach(add);

function makeCtx(){
  const ctx={ console, __cap:captured, Math, Date, JSON, String, Number, Array, Object, Set, Map, RegExp, parseInt, parseFloat, isNaN, Promise, setTimeout:(f)=>f(), clearTimeout(){}, encodeURIComponent, decodeURIComponent };
  vm.createContext(ctx); return ctx;
}
function tryRun(fn){
  for(let i=0;i<120;i++){
    const ctx=makeCtx();
    try{ vm.runInContext(base+SRC, ctx); return fn(ctx); }
    catch(e){
      const m=String(e.message).match(/^(\w+) is not defined/);
      if(!m){ console.error('❌ 執行錯誤：', e.stack.split('\n').slice(0,4).join('\n')); process.exit(1); }
      if(!add(m[1])){ SRC+=`function ${m[1]}(){ return undefined; }\n`; have.add(m[1]); console.log('  (stub) '+m[1]); }
    }
  }
  throw new Error('依賴解析超過上限');
}

// ── 主流程 ──
const result=tryRun(ctx=>{
  ctx.clients=JSON.parse(JSON.stringify(BK.clients)); ctx.nextId=BK.nextId||9999;
  const probe=ctx.clients[0]; probe.loanWant='999'; probe.taxed='有'; probe.docs={'身分證':'got'};   // 探針：匯入後要還在
  const report=[];
  for(const [name,rows] of Object.entries(FILES)){
    const n=vm.runInContext('normalizeXlsRows', ctx)(rows);
    const before=ctx.clients.length, sBefore=captured.summaries.length;
    vm.runInContext('processCompanyData', ctx)(n.rows);
    const summary=captured.summaries[sBefore]||'(沒有小結)';
    report.push({name, format:n.format, count:n.count, before, after:ctx.clients.length, summary:summary.replace(/\n+/g,' / ').slice(0,160)});
  }
  const p=ctx.clients.find(c=>c.id===probe.id);
  const checks={
    probeKept: p && p.loanWant==='999' && p.taxed==='有' && p.docs && p.docs['身分證']==='got',
    noEmptyName: ctx.clients.every(c=>c.name&&String(c.name).trim()),
    total: ctx.clients.length,
  };
  return {report, checks};
});
console.log('=== XLS 匯入模擬（現有客戶 '+BK.clients.length+' 筆） ===');
result.report.forEach(r=>console.log(`• ${r.name}｜格式 ${r.format}｜檔內 ${r.count} 筆｜客戶 ${r.before}→${r.after}\n   ${r.summary}`));
console.log('=== 檢查 ===', JSON.stringify(result.checks));
console.log('批次標記視窗被呼叫次數：'+captured.batchTag.length+'（每次新增人數：'+captured.batchTag.join(',')+'）');
