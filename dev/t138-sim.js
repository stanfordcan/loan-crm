// t138 模擬：二次匯入記號／版本保留／抵押列聰明合併。純本機，不碰雲端。
// 用法：node dev/t138-sim.js <備份.json> <rows.json>
const fs=require('fs'), vm=require('vm');
const HTML=fs.readFileSync('index-test.html','utf8');
const BK=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const FILES=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
function extFn(n){const s=HTML.indexOf('function '+n+'(');if(s<0)return null;let j=HTML.indexOf('{',s),d=0;for(;j<HTML.length;j++){const c=HTML[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return HTML.slice(HTML.lastIndexOf('\n',s)+1,j+1);}}return null;}
function extConst(n){const m=HTML.match(new RegExp('^(?:const|let|var) '+n+'\\s*=.*?;\\s*$','ms'));return m?m[0]:null;}
const cap={summaries:[],toasts:[]};
const base=`var TODAY='2026-10-14'; var CLAUDE_API_KEY=''; var GAS_URL=''; var COMPANY_URL=''; var blacklist=[]; var editId=null; var memos=[]; var nextMemoId=1; var _importSource='';
function showToast(m){ __cap.toasts.push(String(m)); } function saveLocal(){} function pushToSheet(){ return Promise.resolve(); } function render(){} function saveToFirestore(){ return Promise.resolve(); }
function uiAlert(m){ __cap.summaries.push(String(m)); return Promise.resolve(true); } function uiConfirm(){ return Promise.resolve(true); } function openBatchTagForImport(){}
function calEsc(s){ return String(s==null?'':s); }
var localStorage={_s:{},getItem(k){return this._s[k]??null;},setItem(k,v){this._s[k]=String(v);},removeItem(k){delete this._s[k];}};
var document={getElementById(){return null;},querySelector(){return null;},querySelectorAll(){return [];}}; var window={innerWidth:1200}; var navigator={userAgent:'node'};
`;
let SRC=''; const have=new Set();
function add(n){ if(have.has(n)) return true; const f=extFn(n)||extConst(n); if(!f) return false; SRC+=f+'\n'; have.add(n); return true; }
['processCompanyData','normalizeXlsRows','smartMergeLoans','COMPANY_EXPORT_HEADER','autoClassify','ensureSerials','consolidateByIdno','foldClientInto','migrateProperties','mergePropInto','normalizeAddr','normBuildNo','addrCore','addrHit','isFullId','propLabel','emptyProperty','extractDistrict','clientRichness','dispName','genderFromId','normPhoneKey','mergeDebtPhones','mergeDebtPhonesInto','isBlacklisted','parseVisitLogs','companyOwnerFromRaw','extractDebtPhones','idnoFromOwner','isTrustOwner','trustSettlorName','isMaskedShortName','ownerFullNameFromCompanyRaw','censusFromCompanyRaw','bestDoor','parseShare','defaultLoanE','getLoanE','loansToTotals','clientLoanTotals','isPlaceholderLoanName','patchLoanDates','applyLoansToProp','samePropertyCard','parseRightsLoans','cleanCreditorName','classifyCreditor','surnameOf','isMaskedName','clearlyDifferentPerson','linkRelation','findAiMatch','EXTRA_FIELDS','hCls','hOrd'].forEach(add);
function makeCtx(){ const ctx={console,__cap:cap,Math,Date,JSON,String,Number,Array,Object,Set,Map,RegExp,parseInt,parseFloat,isNaN,Promise,setTimeout:(f)=>f(),clearTimeout(){},encodeURIComponent,decodeURIComponent}; vm.createContext(ctx); return ctx; }
function tryRun(fn){ for(let i=0;i<150;i++){ const ctx=makeCtx(); try{ vm.runInContext(base+SRC,ctx); return fn(ctx); }catch(e){ const m=String(e.message).match(/^(\w+) is not defined/); if(!m){ console.error('❌',e.stack.split('\n').slice(0,5).join('\n')); process.exit(1);} if(!add(m[1])){ SRC+=`function ${m[1]}(){ return undefined; }\n`; have.add(m[1]); } } } throw new Error('deps'); }
let pass=0,fail=0; const ok=(c,l,x)=>{ c?(pass++,console.log('  ✅ '+l)):(fail++,console.log('  ❌ '+l+(x?'  '+x:''))); };

tryRun(ctx=>{
  const run=(code)=>vm.runInContext(code,ctx);
  // ── 1. 整筆轉貸：smartMergeLoans 單元情境 ──
  console.log('— 抵押列聰明合併（整筆轉貸）—');
  const p={loans:[{n:'國泰世華商業銀行',a:600,t:'bank',s:'0001-000',e:420,eManual:true},{n:'民間甲',a:200,t:'private',s:'0002-000',e:200}]};
  ctx.__p=p; ctx.__inc=[{n:'彰化商業銀行',a:800,t:'bank',s:'0003-000',e:667},{n:'民間乙',a:300,t:'private',s:'0004-000',e:300}];
  const r=run("smartMergeLoans(__p, __inc, '總檔', '2026-10-14')");
  ok(r.cancelled===2&&r.added===2,'國泰+民間甲標塗銷、彰銀+民間乙新增',JSON.stringify(r));
  ok(p.loans[0].x&&p.loans[0].e===420&&p.loans[0].eManual,'塗銷的國泰列仍留著、手改的 420 不動');
  ok(p.loans[2].added&&p.loans[2].s==='0003-000','彰銀列帶 added 標記與登序 3');
  const t=run("loansToTotals(__p.loans)");
  ok(t.bank===667&&t.private===300,'總額只算彰銀 667＋民間乙 300（塗銷不計）',JSON.stringify(t));
  // 同登序設定額變：手改不動
  const p2={loans:[{n:'國泰世華商業銀行',a:600,t:'bank',s:'0001-000',e:420,eManual:true}]}; ctx.__p2=p2; ctx.__inc2=[{n:'國泰世華商業銀行',a:900,t:'bank',s:'0001-000',e:750}];
  const r2=run("smartMergeLoans(__p2, __inc2, '總檔', '2026-10-14')");
  ok(r2.changed===1&&p2.loans[0].a===900&&p2.loans[0].e===420&&p2.loans[0].aChanged,'同登序增貸：設定額 600→900、手改實貸 420 不動');
  // 再出現 → 取消塗銷
  ctx.__p3={loans:[{n:'X',a:100,t:'bank',s:'0001-000',e:83,x:{date:'2026-09-01',src:'總檔'}}]}; ctx.__inc3=[{n:'X',a:100,t:'bank',s:'0001-000',e:83}];
  run("smartMergeLoans(__p3, __inc3, '總檔', '2026-10-14')"); ok(!ctx.__p3.loans[0].x,'之前塗銷的筆這版又出現 → 取消塗銷');
  // 手動加的筆不碰
  ctx.__p4={loans:[{n:'手加',a:0,t:'private',s:'',e:50,manualAdd:true}]}; ctx.__inc4=[{n:'Y',a:100,t:'bank',s:'0001-000',e:83}];
  const r4=run("smartMergeLoans(__p4, __inc4, '總檔', '2026-10-14')"); ok(ctx.__p4.loans.length===2&&!ctx.__p4.loans[0].x&&r4.cancelled===0,'業主手動加的筆不會被標塗銷');

  // ── 2. 真正的二次匯入：同一份檔匯兩次。第一次全是新人（不記）；第二次全部是既有 → 每人一則「二次匯入」──
  console.log('— XLS 二次匯入記號 —');
  ctx.clients=JSON.parse(JSON.stringify(BK.clients)); ctx.nextId=BK.nextId||9999;
  const f='台北市中山區(1).xlsx'; const n=run('normalizeXlsRows')(FILES[f]);
  const start=ctx.nextId;
  ctx._importSource='XLS：'+f; run('processCompanyData')(n.rows); ctx._importSource='';
  const firstNew=ctx.clients.filter(c=>c.id>=start);
  ok(firstNew.length>0 && firstNew.every(c=>!c.reimports),'第一次匯入：新建 '+firstNew.length+' 人、都沒有記號');
  ctx._importSource='XLS：'+f; run('processCompanyData')(n.rows); ctx._importSource='';
  const marked=ctx.clients.filter(c=>c.reimports&&c.reimports.length);
  ok(marked.length===0,'第二次匯入同內容：沒變的人不再有記號（'+marked.length+'）');
  ok(ctx._lastImportInfo && ctx._lastImportInfo.mergedIds.size>=firstNew.length*0.9,'第二次匯入：併入名單有記到（'+(ctx._lastImportInfo?ctx._lastImportInfo.mergedIds.size:0)+'/'+firstNew.length+'）');

  ok(ctx.clients.length===BK.clients.length+firstNew.length,'第二次沒有多建任何人');
  // ── 3. 來源＝總檔、同內容重跑 → 不增加記號 ──
  console.log('— 總檔重貼同內容 → 不記號；他項有變 → 記號＋留舊版 —');
  const before=JSON.stringify(ctx.clients.map(c=>(c.reimports||[]).length));
  ctx._importSource='總檔'; run('processCompanyData')(n.rows); ctx._importSource='';
  const after=JSON.stringify(ctx.clients.map(c=>(c.reimports||[]).length));
  ok(before===after,'同內容再匯（來源＝總檔）不增加記號');
  if(before!==after){ const b1=JSON.parse(before), a1=JSON.parse(after); const diff=ctx.clients.filter((c,i)=>a1[i]!==b1[i]); console.log('    ↳ 多了記號的：'+diff.length+' 人，例：'+diff.slice(0,3).map(c=>c.name+' → '+JSON.stringify(c.reimports.slice(-1)[0])+' 不動產'+(c.properties||[]).length+' '+(c.properties||[]).map(p=>(p.col4BuildNo||'-')+'|'+(p.buildNo||'-')).join(';')).join(' ／ ')); }
  if(before!==after){
    const b=JSON.parse(before), a=JSON.parse(after);
    const grew=ctx.clients.filter((c,i)=>a[i]>b[i]);
    const kinds={}; grew.forEach(c=>{ const r=c.reimports[c.reimports.length-1]; const k=r.kind+'｜'+r.detail.slice(0,40); kinds[k]=(kinds[k]||0)+1; });
    console.log('   [debug] 多了記號的人數', grew.length, JSON.stringify(kinds).slice(0,600));
    const ex=grew[0]; if(ex) console.log('   [debug] 例：', JSON.stringify({name:String(ex.name).slice(0,1)+'*', props:(ex.properties||[]).map(p=>({label:p.label,b:p.col4BuildNo||p.buildNo,hist:(p.rawHistory||[]).length}))}).slice(0,500));
  }
  // ── 4. 把其中一列的他項權利部改掉再匯 → 該客戶記「他項權利部有變」且 rawHistory 多一版 ──
  const rows2=JSON.parse(JSON.stringify(n.rows));
  const idx=rows2.findIndex((r,i)=>i>=2 && ctx.clients.some(c=>(c.properties||[]).some(p=>p.companyRaw&&p.companyRaw.cols&&p.companyRaw.cols[4]===String(r[4]||'').trim()&&p.companyRaw.cols[13]===String(r[13]||'').trim())));
  ok(idx>=2,'找到一列確定已建檔的客戶（第 '+idx+' 列）');
  const target=rows2[idx]; target[13]=String(target[13]||'')+'\n0099-000 【私】 A999999999 測試債權人 新臺幣 1,000,000 元 民國 115 年 10 月 14 日';
  ctx._importSource='總檔'; run('processCompanyData')(rows2); ctx._importSource='';
  const hit=ctx.clients.find(c=>(c.properties||[]).some(p=>p.companyRaw&&p.companyRaw.cols&&String(p.companyRaw.cols[13]||'').includes('0099-000')));
  ok(!!hit,'找得到被改他項的那位');
  if(!hit){
    const addr=String(target[4]||'').trim();
    const cands=ctx.clients.filter(c=>(c.properties||[]).some(p=>p.companyRaw&&p.companyRaw.cols&&p.companyRaw.cols[4]===addr));
    console.log('   [debug] 同門牌客戶數', cands.length, JSON.stringify(cands.slice(0,2).map(c=>({id:c.id,name:String(c.name).slice(0,1)+'*',re:(c.reimports||[]).slice(-1),props:(c.properties||[]).map(p=>({label:p.label,c13tail:String((p.companyRaw&&p.companyRaw.cols&&p.companyRaw.cols[13])||'').slice(-30),hist:(p.rawHistory||[]).length}))}))));
    const s3=cap.summaries[cap.summaries.length-1]; console.log('   [debug] 小結：', s3.replace(/\n+/g,' / ').slice(0,200));
    console.log('   [debug] target[13] tail:', String(target[13]).slice(-40));
  }
  if(hit){
    const ri=hit.reimports[hit.reimports.length-1];
    ok(ri.src==='總檔'&&ri.kind.includes('他項權利部'),'記號：總檔更新：他項權利部有變',JSON.stringify(ri));
    const prop=hit.properties.find(p=>p.companyRaw&&p.companyRaw.cols&&String(p.companyRaw.cols[13]||'').includes('0099-000'));
    ok(prop.rawHistory&&prop.rawHistory.length===1&&prop.rawHistory[0].rights!==prop.companyRaw.rights,'rawHistory 留了上一版且他項不同');
    ok((prop.loans||[]).some(l=>l.added),'抵押列多了一筆帶 added 的新債權',JSON.stringify((prop.loans||[]).map(l=>[l.s,l.n,l.a,!!l.added,!!l.x])));
    const sum=cap.summaries[cap.summaries.length-1]; ok(/謄本內容有變 1 間/.test(sum),'小結有「謄本內容有變 1 間」',sum.slice(0,120));
  }
  console.log(`\n總結: 通過 ${pass} / 失敗 ${fail}`);
  process.exit(fail?1:0);
});
