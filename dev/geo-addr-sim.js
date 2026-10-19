// 地址清洗乾跑：把備份裡每間不動產的門牌洗成「查座標用」的版本，預判準度，輸出 CSV 給業主看。
// 不呼叫 Google、不改資料。用法：node dev/geo-addr-sim.js <備份.json> <輸出.csv>
// 規則（跟之後 index-test.html 的 addrForGeo 同一套，定稿後搬進去）：
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

const CITY_RE=/^(臺北市|新北市|桃園市|臺中市|臺南市|高雄市|基隆市|新竹市|嘉義市|新竹縣|苗栗縣|彰化縣|南投縣|雲林縣|嘉義縣|屏東縣|宜蘭縣|花蓮縣|臺東縣|澎湖縣|金門縣|連江縣)/;
// 區→縣市（只收全台唯一的區名；信義、中山、中正、大安、東區、西區、北區、南區這種多縣市都有的不收，沒縣市就標不準）
const DIST_CITY={
  '松山區':'臺北市','內湖區':'臺北市','南港區':'臺北市','士林區':'臺北市','北投區':'臺北市','文山區':'臺北市','萬華區':'臺北市',
  '板橋區':'新北市','三重區':'新北市','中和區':'新北市','永和區':'新北市','新莊區':'新北市','新店區':'新北市','土城區':'新北市','蘆洲區':'新北市','汐止區':'新北市','樹林區':'新北市','淡水區':'新北市','三峽區':'新北市','林口區':'新北市','鶯歌區':'新北市','五股區':'新北市','泰山區':'新北市','八里區':'新北市','瑞芳區':'新北市','深坑區':'新北市','石碇區':'新北市','坪林區':'新北市','三芝區':'新北市','石門區':'新北市','金山區':'新北市','萬里區':'新北市','平溪區':'新北市','雙溪區':'新北市','貢寮區':'新北市','烏來區':'新北市',
  '桃園區':'桃園市','中壢區':'桃園市','平鎮區':'桃園市','八德區':'桃園市','楊梅區':'桃園市','蘆竹區':'桃園市','大溪區':'桃園市','龜山區':'桃園市','大園區':'桃園市','觀音區':'桃園市','新屋區':'桃園市','龍潭區':'桃園市','復興區':'桃園市',
  '七堵區':'基隆市','暖暖區':'基隆市','安樂區':'基隆市','仁愛區':'基隆市',
  '員林市':'彰化縣','彰化市':'彰化縣','鹿港鎮':'彰化縣','和美鎮':'彰化縣',
  '豐原區':'臺中市','大里區':'臺中市','太平區':'臺中市','西屯區':'臺中市','南屯區':'臺中市','北屯區':'臺中市','潭子區':'臺中市','烏日區':'臺中市','沙鹿區':'臺中市','清水區':'臺中市','大甲區':'臺中市','霧峰區':'臺中市','龍井區':'臺中市','大雅區':'臺中市','神岡區':'臺中市',
  '三民區':'高雄市','左營區':'高雄市','鼓山區':'高雄市','苓雅區':'高雄市','前鎮區':'高雄市','鳳山區':'高雄市','楠梓區':'高雄市','小港區':'高雄市','岡山區':'高雄市','前金區':'高雄市','新興區':'高雄市','鹽埕區':'高雄市','旗津區':'高雄市',
  '永康區':'臺南市','安南區':'臺南市','安平區':'臺南市','歸仁區':'臺南市','仁德區':'臺南市','新營區':'臺南市',
  '竹北市':'新竹縣','竹東鎮':'新竹縣','頭份市':'苗栗縣','苗栗市':'苗栗縣','南投市':'南投縣','草屯鎮':'南投縣','集集鎮':'南投縣',
};
function addrForGeo(raw, district){
  let s=normalizeAddr(raw).replace(/\s+/g,'').replace(/台/g,'臺');
  const notes=[];
  if(!s) return {q:'',level:'無地址',notes:['空白']};
  // 「14、14之1、14之2號」「13、15號」這種好幾個門牌共用一個「號」→ 取第一個並補上號
  if(/\d+(?:之\d+)?(?:[、，,]\d+(?:之\d+)?)+號/.test(s)){ s=s.replace(/(\d+(?:之\d+)?)(?:[、，,]\d+(?:之\d+)?)+號/,'$1號'); notes.push('多個門牌共用號，取第一個'); }
  if(/[、／/]|號.*號/.test(s)) notes.push('一格多個地址，只取第一個');
  s=s.split(/[、／/]/)[0];
  if(/地號|小段|段\d+地號|^\S+段\d/.test(s) && !/號/.test(s.replace(/地號/g,''))) return {q:s,level:'不準',notes:['是地號不是門牌']};
  // 樓層／室／戶之後全丟
  s=s.replace(/(\d+)(樓|層|F)[\s\S]*$/,'');
  s=s.replace(/(\d+)(室|戶)[\s\S]*$/,'');
  // 門牌「之」寫法統一成官方
  s=s.replace(/(\d+)號之(\d+)/g,'$1之$2號').replace(/(\d+)-(\d+)號/g,'$1之$2號').replace(/(\d+)號-(\d+)/g,'$1之$2號');
  // 只留到「號」
  const m=s.match(/^(.*?\d+(?:之\d+)?號)/);
  if(m) s=m[1]; else notes.push('沒有門牌號');
  // 補縣市
  if(!CITY_RE.test(s)){
    const d=String(district||'').replace(/台/g,'臺');
    if(d && !s.startsWith(d)) s=d+s;
    const dm=s.match(/^([一-鿿]{1,3}[區鄉鎮市])/);
    if(dm && DIST_CITY[dm[1]]){ s=DIST_CITY[dm[1]]+s; notes.push('縣市用區名補上'); }
    if(!CITY_RE.test(s)) notes.push('沒有縣市，Google 可能定到別縣市同名路');
  }
  let level = !/號/.test(s) ? '不準' : (/之\d+號/.test(s) ? '估算候選（會退級再查）' : '精準候選');
  if(notes.some(n=>n.includes('沒有縣市'))) level='不準';
  return {q:s,level,notes};
}

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
