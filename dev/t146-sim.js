// t146 模擬：雲端分段儲存（dataParts／backupParts）＋本機快取壓縮版。純本機，用假的 Firestore，不碰雲端。
// 用法：node dev/t146-sim.js <備份.json>
// 假 Firestore 會強制「單一文件 1 MiB 上限」與「batch 原子性」，超過就丟錯，跟真的一樣。
const fs=require('fs'), path=require('path');
const HTML=fs.readFileSync(path.join(__dirname,'..','index-test.html'),'utf8');
const BK=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
function extFn(n){const s=HTML.indexOf('function '+n+'(');if(s<0)throw new Error('找不到 '+n);let j=HTML.indexOf('{',s),d=0;for(;j<HTML.length;j++){const c=HTML[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0){j++;break;}}}
  // 往前含 async
  const pre=HTML.slice(Math.max(0,s-6),s); return (pre.endsWith('async ')?'async ':'')+HTML.slice(s,j);}

// ── 假 Firestore ──
const LIMIT=1048576; const store=new Map(); let writes=0, failNextCommit=false;
const clone=o=>JSON.parse(JSON.stringify(o));
const sizeOf=o=>Buffer.byteLength(JSON.stringify(o),'utf8');
function applySet(p,obj,opt){ const cur=store.get(p); const next=(opt&&opt.merge&&cur)?{...cur,...clone(obj)}:clone(obj); if(sizeOf(next)>LIMIT) throw new Error('document too large: '+p+' '+sizeOf(next)); store.set(p,next); writes++; }
function docRef(p){ return { path:p, id:p.split('/').pop(), collection(n){ return colRef(p+'/'+n); },
  async get(){ const v=store.get(p); return { exists:!!v, id:p.split('/').pop(), data:()=>v?clone(v):undefined }; },
  async set(obj,opt){ applySet(p,obj,opt); }, onSnapshot(){ return ()=>{}; } }; }
function colRef(p){ return { path:p, doc(id){ return docRef(p+'/'+id); },
  async get(){ const docs=[]; for(const [k,v] of store){ if(!k.startsWith(p+'/')) continue; const rest=k.slice(p.length+1); if(rest.includes('/')) continue; docs.push({ id:rest, data:()=>clone(v) }); } return { size:docs.length, docs, forEach(f){ docs.forEach(f); } }; } }; }
const db={ collection(n){ return colRef(n); }, batch(){ const ops=[]; return {
  set(ref,obj,opt){ ops.push(['set',ref.path,clone(obj),opt]); }, delete(ref){ ops.push(['del',ref.path]); },
  async commit(){ if(failNextCommit){ failNextCommit=false; throw new Error('simulated network error'); } if(ops.length>500) throw new Error('batch >500 ops');
    const snap=new Map(store); try{ for(const op of ops){ if(op[0]==='set') applySet(op[1],op[2],op[3]); else { store.delete(op[1]); writes++; } } }
    catch(e){ store.clear(); for(const [k,v] of snap) store.set(k,v); throw e; } } }; } };
function partsOf(col){ return [...store.keys()].filter(k=>k.startsWith('users/u/'+col+'/')).length; }

// ── 全域環境（用 var，讓間接 eval 進全域）──
const toasts=[];
globalThis.toasts=toasts;
const base=`
var clients=[], nextId=1, currentUser={uid:'u'}, readOnlyMode=false, memos=[], nextMemoId=1, customDocs=[], GAS_URL='', COMPANY_URL='', CLAUDE_API_KEY='';
var _chunkCounts={dataParts:0,backupParts:0}, _saveWarned=false, _saveSeq=0, backupWarned=false, _cloudBytes=null;
var CLOUD_CHUNK=500000, LEGACY_DATA_MAX=900000, LOCAL_KEY='loan_crm_fb_v1';
var localStorage={_s:{},getItem(k){return k in this._s?this._s[k]:null;},setItem(k,v){this._s[k]=String(v);},removeItem(k){delete this._s[k];}};
function showToast(m){ toasts.push(String(m)); } function render(){} function renderMemos(){} function applyCloudCustomDocs(){} function closeUrlSettings(){}
function uiConfirm(){ return Promise.resolve(true); }
`;
globalThis.db=db;
const SRC=['packData','unpackData','splitChunks','stageChunks','readChunks','readCloudPacked','saveToFirestore','loadFromFirestore','syncFromFirestoreIfNewer','restoreBackup','saveLocal','loadLocal','migrateHeat','normalizeDate','normalizeTime'].map(extFn).join('\n');
(0,eval)(base+SRC);
const g=globalThis;
let pass=0,fail=0; const ok=(c,l,x)=>{ c?(pass++,console.log('  ✅ '+l)):(fail++,console.log('  ❌ '+l+(x?'  '+x:''))); };
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const names=cs=>cs.map(c=>c.id+':'+c.name).join('|');

(async()=>{
  const base937=BK.clients.filter(c=>c.name&&c.name!=='（未知）'); const N=base937.length;
  const sig937=names(base937);
  g.clients=clone(base937); g.nextId=BK.nextId||1;
  const packed937=await g.packData(JSON.stringify({clients:g.clients,nextId:g.nextId}));
  console.log(`— 備份 ${N} 筆，壓縮後 ${Math.round(packed937.length/1024)} KB —`);

  // 1. 正常存：分段＋舊欄位都在
  await g.saveToFirestore('2026-10-14T10:00:00.000Z');
  let main=store.get('users/u');
  ok(main && main.dataN===Math.ceil(packed937.length/500000) && main.dataTs==='2026-10-14T10:00:00.000Z' && main.updatedAt===main.dataTs,'主文件記段數 dataN 與 dataTs',JSON.stringify({dataN:main&&main.dataN}));
  ok(main.data===packed937,'放得下 → 舊欄位 data 照寫（正式版仍讀得到）');
  ok(partsOf('dataParts')===main.dataN && partsOf('backupParts')===main.dataN,'dataParts／backupParts 段數正確');
  const bl=store.get('users/u/backups/latest');
  ok(bl && bl.backupN===main.dataN && bl.backupTs===main.dataTs && bl.backup===packed937,'備份文件也分段＋舊欄位');

  // 2. 讀回
  g.clients=[]; g.nextId=1;
  ok(await g.loadFromFirestore()===true && g.clients.length===N && names(g.clients)===sig937 && g.nextId===(BK.nextId||1),'loadFromFirestore 讀回全部（用分段）');

  // 3. 背景同步＋本機快取壓縮版
  g.clients=[]; g.localStorage._s={};
  ok(await g.syncFromFirestoreIfNewer()===true && g.clients.length===N,'syncFromFirestoreIfNewer 本機空 → 從雲端載入');
  const ls=JSON.parse(g.localStorage.getItem('loan_crm_fb_v1'));
  ok(ls && ls.gz && ls.gz.startsWith('GZ:') && !ls.clients && ls.updatedAt===main.updatedAt,'同步後本機快取是壓縮版（gz）且時間戳同雲端');
  g.clients=[];
  ok(await g.loadLocal()===true && g.clients.length===N && names(g.clients)===sig937,'loadLocal 讀壓縮版快取');
  ok(await g.syncFromFirestoreIfNewer()===false,'本機已是最新 → 不重載');

  // 4. saveLocal：壓一次、本機＋雲端同 ts、連續兩次只送最後一次
  writes=0; g.clients=clone(base937);
  g.saveLocal(); g.saveLocal(); await sleep(300);
  const ls2=JSON.parse(g.localStorage.getItem('loan_crm_fb_v1')); main=store.get('users/u');
  ok(ls2.gz && ls2.updatedAt===main.updatedAt && main.dataTs===main.updatedAt,'saveLocal：本機與雲端同一個時間戳');
  ok(writes===(main.dataN*2+2),'連續兩次 saveLocal 只真的送一次（寫入數＝段數×2＋2）','writes='+writes);

  // 5. 超過 1 MB：3 倍資料
  const big=[]; for(let k=0;k<3;k++) base937.forEach(c=>big.push({...clone(c),id:c.id+k*100000}));
  g.clients=big; g.nextId=999999;
  const packedBig=await g.packData(JSON.stringify({clients:g.clients,nextId:g.nextId}));
  console.log(`— 3 倍資料 ${big.length} 筆，壓縮後 ${Math.round(packedBig.length/1024)} KB（超過 1 MB）—`);
  ok(packedBig.length>LIMIT,'壓縮後確實超過 1 MiB');
  toasts.length=0; await g.saveToFirestore('2026-10-14T11:00:00.000Z'); main=store.get('users/u');
  ok(main.dataTs==='2026-10-14T11:00:00.000Z' && main.data==='' && main.dataN===Math.ceil(packedBig.length/500000),'超過 1 MB：舊欄位寫空字串、分 '+main.dataN+' 段');
  ok(toasts.length===0,'沒有跳儲存失敗的提示');
  ok([...store.entries()].every(([k,v])=>sizeOf(v)<=LIMIT),'每份文件都在 1 MiB 內');
  g.clients=[]; ok(await g.loadFromFirestore()===true && g.clients.length===big.length,'超過 1 MB 讀回 '+big.length+' 筆');
  g.clients=[{id:1,name:'x'}]; await g.restoreBackup(); ok(g.clients.length===big.length,'restoreBackup 從分段備份還原 '+big.length+' 筆');

  // 6. 縮回去：多出來的舊段被刪
  g.clients=clone(base937); g.nextId=BK.nextId||1; await g.saveToFirestore('2026-10-14T12:00:00.000Z'); main=store.get('users/u');
  ok(partsOf('dataParts')===main.dataN && partsOf('backupParts')===main.dataN && main.data===packed937,'縮小後多出來的舊段刪掉、舊欄位又寫回');

  // 7. 只有舊格式（還沒升級前存的）
  store.clear(); g._chunkCounts={dataParts:0,backupParts:0};
  store.set('users/u',{data:packed937,updatedAt:'2026-01-01T00:00:00.000Z'});
  g.clients=[]; ok(await g.loadFromFirestore()===true && g.clients.length===N,'只有舊格式 data 欄 → 照讀');
  store.set('users/u/backups/latest',{backup:packed937,backupAt:'2026-01-01T00:00:00.000Z'});
  g.clients=[]; await g.restoreBackup(); ok(g.clients.length===N,'只有舊格式備份 → 照還原');

  // 8. 舊版正式版後來又寫過（updatedAt 比 dataTs 新）→ 用它的單欄位
  g.clients=clone(base937); await g.saveToFirestore('2026-10-14T13:00:00.000Z');
  const ten=clone(base937.slice(0,10)); const packed10=await g.packData(JSON.stringify({clients:ten,nextId:11}));
  applySet('users/u',{data:packed10,updatedAt:'2026-10-14T13:30:00.000Z'},{merge:true});
  g.clients=[]; ok(await g.loadFromFirestore()===true && g.clients.length===10,'舊版後來寫的單欄位比較新 → 用單欄位（10 筆）');
  g.clients=clone(base937); await g.saveToFirestore('2026-10-14T14:00:00.000Z');
  g.clients=[]; ok(await g.loadFromFirestore()===true && g.clients.length===N,'新版再存一次 → 又回到分段（'+N+' 筆）');

  // 9. 缺段：讀不到就回 false，資料絕不清空
  g.clients=big; await g.saveToFirestore('2026-10-14T15:00:00.000Z'); main=store.get('users/u');
  store.delete('users/u/dataParts/1');
  g.clients=[{id:1,name:'留著'}];
  ok(await g.loadFromFirestore()===false && g.clients.length===1 && g.clients[0].name==='留著','缺一段 → loadFromFirestore 回 false、現有資料不動');
  g.localStorage._s={};
  ok(await g.syncFromFirestoreIfNewer()===false && g.clients.length===1,'缺一段 → 背景同步回 false、不清空');

  // 10. 多出來的舊段（時間戳對不上）不影響
  g.clients=clone(base937); await g.saveToFirestore('2026-10-14T16:00:00.000Z');
  store.set('users/u/dataParts/7',{s:'junk',i:7,n:8,ts:'old'});
  g.clients=[]; ok(await g.loadFromFirestore()===true && g.clients.length===N,'多一段舊時間戳的垃圾段 → 忽略，照常讀回');

  // 11. 雲端寫失敗：不丟例外、跳提示、資料不變
  const before=store.get('users/u').dataTs; failNextCommit=true; toasts.length=0;
  g.clients=clone(base937); await g.saveToFirestore('2026-10-14T17:00:00.000Z');
  ok(store.get('users/u').dataTs===before && toasts.some(t=>t.includes('雲端儲存失敗')),'commit 失敗 → 雲端原樣、跳「雲端儲存失敗」提示');

  // 12. 舊格式本機快取（未壓縮 clients 陣列）仍可讀
  g.localStorage.setItem('loan_crm_fb_v1',JSON.stringify({clients:base937.slice(0,5),nextId:6,updatedAt:'x',uid:'u'}));
  g.clients=[]; ok(await g.loadLocal()===true && g.clients.length===5 && g.nextId===6,'舊格式本機快取照讀');

  console.log(`\n總結: 通過 ${pass} / 失敗 ${fail}`);
  process.exit(fail?1:0);
})().catch(e=>{ console.error('💥',e); process.exit(2); });
