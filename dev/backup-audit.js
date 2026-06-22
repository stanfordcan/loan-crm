// 用真實備份檔壓測這次新增/修改的所有邏輯，找 crash 與錯誤
const fs=require('fs');
const HTML=fs.readFileSync('C:/Users/USER/OneDrive/桌面/claude/loan-crm/index-test.html','utf8');
const BK=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const clients=BK.clients; const TODAY='2026-06-22'; let nextId=BK.nextId||9999;

function ext(n){const s=HTML.indexOf('function '+n+'(');if(s<0)throw new Error('找不到函式 '+n);let j=HTML.indexOf('{',s),d=0;for(;j<HTML.length;j++){const c=HTML[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0){j++;break;}}}return HTML.slice(s,j);}
// 抽出純函式：先把所有原始碼串起來，在「最上層」一次 eval（在 callback 裡 eval 不會進到模組作用域）
let SRC='';
['normBuildNo','addrCore','addrHit','isFullId','surnameOf','isMaskedName','clearlyDifferentPerson',
 'normalizeAddr','genderFromId','dispName','parseShare','clientMatchesQuery','findAiMatch','linkRelation']
 .forEach(n=>{ try{ SRC+=ext(n)+'\n'; }catch(e){ console.log('⚠️ 抽取',n,'失敗:',e.message); } });
eval(SRC);
function calEsc(s){return String(s==null?'':s);}
function ensureSerials(){let used=new Set(clients.map(c=>c.serial).filter(Boolean));clients.forEach(c=>{if(!c.serial){let s;do{s=String(Math.floor(100000+Math.random()*900000));}while(used.has(s));c.serial=s;used.add(s);}});}

let problems=0; const bad=(m)=>{problems++;console.log('  ❌ '+m);};
const info=(m)=>console.log('  · '+m);

console.log('=== 基本健檢 (clients='+clients.length+') ===');
// 1. serial 唯一性
ensureSerials();
const ser={}; clients.forEach(c=>{ser[c.serial]=(ser[c.serial]||0)+1;});
const dupSer=Object.entries(ser).filter(([k,v])=>v>1);
dupSer.length?bad('流水編號重複: '+dupSer.map(x=>x[0]+'×'+x[1]).join(', ')):info('流水編號全唯一 ✓');

// 2. 電話搜尋：每個有電話的人,用去橫線數字應搜得到自己
let editId=null;
let phoneFail=0,phoneCrash=0;
clients.forEach(c=>{
  const dg=String(c.phone||'').replace(/\D/g,'');
  if(dg.length<7) return;
  try{ if(!clientMatchesQuery(c, dg.toLowerCase())) phoneFail++; }catch(e){ phoneCrash++; }
});
phoneFail?bad('電話去橫線搜不到自己: '+phoneFail+' 筆'):info('電話搜尋(去橫線)全數搜得到 ✓');
phoneCrash?bad('clientMatchesQuery crash: '+phoneCrash+' 次'):info('clientMatchesQuery 無 crash ✓');

console.log('\n=== 建物持分 parseShare ===');
let shareCnt=0,shareErr=0;
clients.forEach(c=>(c.properties||[]).forEach(p=>{
  if(p.buildShare||p.buildShareNum){ shareCnt++;
    try{ const r=parseShare(p.buildShare,p.buildShareNum,p.buildShareDen); if(r.num>r.den) shareErr++; }catch(e){shareErr++;}
  }
}));
info('有填建物持分的不動產: '+shareCnt+' 筆');
shareErr?bad('持分解析異常: '+shareErr):info('持分解析正常 ✓');

console.log('\n=== 共同持分人(同建號) ===');
function clientBuilds(c){const arr=[normBuildNo(c.buildNo),normBuildNo(c.col4BuildNo)];(c.properties||[]).forEach(p=>{arr.push(normBuildNo(p.buildNo));if(p.col4BuildNo)arr.push(normBuildNo(p.col4BuildNo));});return arr.filter(Boolean);}
const byBuild={};
clients.forEach(c=>{ new Set(clientBuilds(c)).forEach(b=>{ (byBuild[b]=byBuild[b]||[]).push(c); }); });
const coGroups=Object.entries(byBuild).filter(([b,arr])=>arr.length>1);
info('有 '+coGroups.length+' 個建號被多筆客戶共用(會顯示共同持分人)');
let mergeRisk=0;
coGroups.slice(0,8).forEach(([b,arr])=>{
  const names=arr.map(c=>c.name||'(無名)');
  // 檢查同建號群組裡,是否「明顯同一人」卻被當共有人(代表其實該合併卻沒合)
  console.log('    建號 '+b+' → '+names.join('、'));
});

console.log('\n=== AI 匯入比對(t64 持分共有不誤併) ===');

// 對每個「同建號群組」裡的不同人,模擬其中一人的謄本 rec,確認不會配對到另一個不同人
let wrongMerge=0, selfOk=0, checked=0;
coGroups.forEach(([b,arr])=>{
  if(arr.length<2) return;
  for(const c of arr){
    const rec={name:c.name,idno:'',phone:'',properties:[{buildNo:b,addr:(c.properties&&c.properties[0]&&c.properties[0].addr)||c.addr}]};
    let m; try{ m=findAiMatch(rec); }catch(e){ bad('findAiMatch crash @'+(c.name)+': '+e.message); continue; }
    checked++;
    if(m.client){
      // 配到的人若與 c 明顯不同人 → 誤併
      if(clearlyDifferentPerson(c.name, m.client.name)){ wrongMerge++; if(wrongMerge<=6) console.log('    ⚠️誤配:「'+c.name+'」配到不同人「'+m.client.name+'」(建號'+b+', '+m.confidence+')'); }
    }
  }
});
info('檢查同建號不同人 '+checked+' 次');
wrongMerge?bad('持分共有被誤配到不同人: '+wrongMerge+' 次'):info('同建號不同人不會誤併 ✓');

console.log('\n=== 舊「名字／名字」待拆分 ===');
const slash=clients.filter(c=>String(c.name||'').includes('／')&&String(c.name).split('／').filter(s=>s.trim()).length>=2);
info('名字含「／」待拆分: '+slash.length+' 筆');
slash.slice(0,15).forEach(c=>console.log('    '+c.name+(c.debtPhones&&c.debtPhones.length?'  debtPhones:'+c.debtPhones.join('|'):'')));

// 模擬拆分(純記憶體,不存檔),確認不 crash、能正確產生獨立筆+綁定
console.log('\n=== 模擬拆分共同借款人 ===');

let splitNew=0,splitErr=0;
try{
  slash.forEach(c=>{
    const parts=String(c.name).split('／').map(s=>s.trim()).filter(Boolean);
    parts.slice(1).forEach(coName=>{
      let co=clients.find(x=>x.name===coName);
      if(!co){ co={id:nextId++,name:coName,relations:[],serial:''}; clients.push(co); splitNew++; }
      ensureSerials();
      linkRelation(c,co,'共同借款人');
      if(!c.relations.some(r=>r.relation==='共同借款人')) splitErr++;
    });
  });
}catch(e){ bad('拆分模擬 crash: '+e.message); }
info('模擬拆分會新增 '+splitNew+' 位共同借款人');
splitErr?bad('拆分後關聯沒綁上: '+splitErr):info('拆分綁定正常 ✓');

console.log('\n==================================');
console.log(problems? ('❌ 發現 '+problems+' 類問題,需處理'):'✅ 全部通過,沒有發現問題');
process.exit(problems?1:0);
