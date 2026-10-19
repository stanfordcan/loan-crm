// 總檔更新連按兩次模擬：用備份當現有客戶，把 GAS 格式的 rows（dev 用 python 從總檔 xlsx 照 getSheetData 做出來）
// 跑 processCompanyData 兩次，比較兩次的小結，並列出指定客戶每次跑完的 reimports／抵押列。純本機。
// 用法：node dev/sync-twice-sim.js <備份.json> <gasrows.json> [客戶名…]
const fs=require('fs'), vm=require('vm'), path=require('path');
const HTML=fs.readFileSync(path.join(__dirname,'..','index-test.html'),'utf8');
const BK=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const ROWS=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const WATCH=process.argv.slice(4);
function extFn(n){const s=HTML.indexOf('function '+n+'(');if(s<0)return null;let j=HTML.indexOf('{',s),d=0;for(;j<HTML.length;j++){const c=HTML[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return HTML.slice(s,j+1);}}return null;}
function extConst(n){const m=HTML.match(new RegExp('^(?:const|let|var) '+n+'\\s*=.*?;\\s*$','m'));return m?m[0]:null;}
const cap={summaries:[],toasts:[]};
const base=`var TODAY='2026-10-19'; var CLAUDE_API_KEY=''; var GAS_URL=''; var COMPANY_URL=''; var blacklist=[]; var editId=null; var memos=[]; var nextMemoId=1; var _importSource='總檔';
function showToast(m){ __cap.toasts.push(String(m)); } function saveLocal(){} function pushToSheet(){ return Promise.resolve(); } function render(){} function saveToFirestore(){ return Promise.resolve(); }
function uiAlert(m){ __cap.summaries.push(String(m)); return Promise.resolve(true); } function uiConfirm(){ return Promise.resolve(true); } function openBatchTagForImport(){}
function calEsc(s){ return String(s==null?'':s); }
var localStorage={_s:{},getItem(k){return this._s[k]??null;},setItem(k,v){this._s[k]=String(v);},removeItem(k){delete this._s[k];}};
var document={getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return [];}}; var window={innerWidth:1200}; var navigator={userAgent:'node'};
`;
let SRC=''; const have=new Set();
function add(n){ if(have.has(n)) return true; const f=extFn(n)||extConst(n); if(!f) return false; SRC+=f+'\n'; have.add(n); return true; }
['processCompanyData','normalizeXlsRows','smartMergeLoans','COMPANY_EXPORT_HEADER','autoClassify','ensureSerials','consolidateByIdno','foldClientInto','migrateProperties','mergePropInto','normalizeAddr','normBuildNo','addrCore','addrHit','isFullId','propLabel','emptyProperty','extractDistrict','clientRichness','dispName','genderFromId','normPhoneKey','mergeDebtPhones','mergeDebtPhonesInto','isBlacklisted','parseVisitLogs','companyOwnerFromRaw','extractDebtPhones','idnoFromOwner','isTrustOwner','trustSettlorName','isMaskedShortName','ownerFullNameFromCompanyRaw','censusFromCompanyRaw','bestDoor','parseShare','defaultLoanE','getLoanE','loansToTotals','clientLoanTotals','isPlaceholderLoanName','patchLoanDates','applyLoansToProp','samePropertyCard','parseRightsLoans','cleanCreditorName','classifyCreditor','surnameOf','isMaskedName','clearlyDifferentPerson','linkRelation','findAiMatch','EXTRA_FIELDS','hCls','hOrd','floorsFromBuildInfo','builtYearFromBuildInfo','shareFromOwner','batchList','batchAdd','firstBatch'].forEach(add);
function makeCtx(){ const ctx={console,__cap:cap,Math,Date,JSON,String,Number,Array,Object,Set,Map,RegExp,parseInt,parseFloat,isNaN,Promise,setTimeout:(f)=>f(),clearTimeout(){},encodeURIComponent,decodeURIComponent}; vm.createContext(ctx); return ctx; }
function tryRun(fn){ for(let i=0;i<200;i++){ const ctx=makeCtx(); try{ vm.runInContext(base+SRC,ctx); return fn(ctx); }catch(e){ const m=String(e.message).match(/^(\w+) is not defined/); if(!m){ console.error('❌',e.stack.split('\n').slice(0,6).join('\n')); process.exit(1);} if(!add(m[1])){ SRC+=`function ${m[1]}(){ return undefined; }\n`; have.add(m[1]); } } } throw new Error('deps'); }

tryRun(ctx=>{
  const run=(code)=>vm.runInContext(code,ctx);
  ctx.__bk=JSON.parse(JSON.stringify(BK)); ctx.__rows=ROWS;
  run("clients=__bk.clients.filter(c=>c.name&&c.name!=='（未知）'); nextId=__bk.nextId||1;");
  const before=run("clients.length");
  const snap=(label)=>{
    console.log(`\n===== ${label} =====`);
    console.log('小結：', (cap.summaries[cap.summaries.length-1]||'(無)').split('\n').filter(l=>!l.startsWith('併入既有')).join(' | ').slice(0,400));
    const m=(cap.summaries[cap.summaries.length-1]||'').match(/併入既有 (\d+) 人/); if(m) console.log('併入既有', m[1], '人');
    console.log('今天新建的客戶：', run("clients.filter(c=>c.createdAt===TODAY).map(c=>c.id+' '+c.name+' ['+(c.heat||'')+'] '+(c.addr||'').slice(0,18))").join(' / '));
    console.log('今天被標塗銷的抵押列：', run("clients.flatMap(c=>(c.properties||[]).flatMap(p=>(p.loans||[]).filter(l=>l.x&&l.x.date===TODAY).map(l=>c.name+'：'+(l.s||'-')+' '+(l.n||'')+' '+(l.a||0))))").join(' / '));
    console.log('今天新增的抵押列：', run("clients.flatMap(c=>(c.properties||[]).flatMap(p=>(p.loans||[]).filter(l=>l.added&&l.added.date===TODAY).map(l=>c.name+'：'+(l.s||'-')+' '+(l.n||'')+' '+(l.a||0))))").join(' / '));
    WATCH.forEach(n=>{
      ctx.__n=n; const info=run("(function(){const c=clients.find(x=>x.name===__n); if(!c) return null; return {reimports:c.reimports||[], props:(c.properties||[]).map(p=>({label:p.label,addr:p.addr,importRun:(p.companyRaw||{}).importRun,importedAt:(p.companyRaw||{}).importedAt,rawHist:(p.rawHistory||[]).length,loans:(p.loans||[]).map(l=>(l.s||'-')+' '+(l.n||'')+' '+(l.a||0)+(l.x?' x'+l.x.date:'')+(l.added?' +':''))}))};})()");
      console.log(`— ${n} —`, JSON.stringify(info,null,1).slice(0,1500));
    });
  };
  run("processCompanyData(__rows)"); snap('第 1 次');
  run("processCompanyData(__rows)"); snap('第 2 次');
  run("processCompanyData(__rows)"); snap('第 3 次');
  console.log('\n客戶數', before, '→', run("clients.length"));
});
