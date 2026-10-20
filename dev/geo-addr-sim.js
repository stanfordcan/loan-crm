// 地址清洗乾跑：把備份裡每間不動產的門牌洗成「查座標用」的版本，預判準度，輸出 CSV 給業主看。
// 不呼叫 Google、不改資料。用法：node dev/geo-addr-sim.js <備份.json> <輸出.csv>
// 規則（＝index-test.html 的 addrForGeo，t173 起從那裡抽出來跑）：
//   1. 全形→半形、中文樓層→數字（沿用系統的 normalizeAddr）、台→臺、去空白
//   2. 樓層整段拿掉（樓／F／層 之後全部不要），室、戶也拿掉
//   3. 「292號之1」「292-1號」「292號-1」→ 官方寫法「292之1號」
//   4. 只留到「號」為止，號後面的備註、括號全丟
//   5. 沒縣市的，用客戶的區或地段（區）補；補不出來就標不準
// 準度預判：有號＝精準候選；有「之」＝估算候選（會退級再查）；只有路名／地號／兩個地址擠一格／空白＝不準
const fs=require('fs'), path=require('path');
const HTML=fs.readFileSync(path.join(__dirname,'..','index-test.html'),'utf8');
function extFn(n){const s=HTML.indexOf('function '+n+'(');if(s<0)throw new Error('找不到 '+n);let j=HTML.indexOf('{',s),d=0;for(;j<HTML.length;j++){const c=HTML[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0){j++;break;}}}return HTML.slice(s,j);}
eval(extFn('normalizeAddr'));

// t173 起 addrForGeo 已搬進 index-test.html，這裡直接抽真函式跑，不再另存一份規則
function extConst(n){const i=HTML.indexOf('const '+n+'=');if(i<0)throw new Error('找不到 '+n);const j=HTML.indexOf(';\n',i);return HTML.slice(i,j+1);}
eval([extConst('GEO_CITY_RE'),extConst('GEO_DIST_CITY'),extFn('addrForGeo')].join('\n'));

const BK=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const rows=[['客戶','分類','原始門牌','清洗後（查座標用）','預判準度','備註']];
const stat={};
BK.clients.forEach(c=>{
  const props=(c.properties&&c.properties.length)?c.properties:[{addr:c.addr,district:c.district}];
  props.forEach(p=>{
    const raw=p.addr||'';
    const r=addrForGeo(raw, p.district||c.district||'');
    stat[r.level]=(stat[r.level]||0)+1;
    rows.push([c.name||'',c.heat||'',raw,r.q,r.level,r.notes.join('；')]);
  });
});
const esc=v=>{ const s=String(v==null?'':v).replace(/"/g,'""'); return /[",\n]/.test(s)?'"'+s+'"':s; };
fs.writeFileSync(process.argv[3], '﻿'+rows.map(r=>r.map(esc).join(',')).join('\r\n'), 'utf8');
console.log('不動產筆數', rows.length-1); console.log(stat);
// 列出幾個每種狀況的例子
const seen={}; rows.slice(1).forEach(r=>{ const k=r[4]; if(!seen[k]) seen[k]=[]; if(seen[k].length<4) seen[k].push(r[2]+'  →  '+r[3]+(r[5]?'  ['+r[5]+']':'')); });
Object.entries(seen).forEach(([k,v])=>{ console.log('\n■ '+k); v.forEach(x=>console.log('  '+x)); });
// 「之」的寫法統計
let zhiA=0, zhiB=0, dash=0; rows.slice(1).forEach(r=>{ const a=r[2]; if(/\d號之\d/.test(a)) zhiA++; if(/\d之\d+號/.test(a)) zhiB++; if(/\d-\d+號|\d號-\d/.test(a)) dash++; });
console.log('\n原始寫法：「號之N」'+zhiA+' 筆、「之N號」'+zhiB+' 筆、「N-M號」'+dash+' 筆');
