// 回歸測試(不需備份檔,純合成情境,時間相關用相對日期):抽真函式跑、驗核心邏輯。
// 用法: node dev/test.js index-test.html   (改完程式 push 前跑,確認沒弄壞)
const fs=require('fs');
const html=fs.readFileSync(process.argv[2]||'index-test.html','utf8');
function ext(n){const s=html.indexOf('function '+n+'(');if(s<0)throw new Error('找不到 '+n);let j=html.indexOf('{',s),d=0;for(;j<html.length;j++){const c=html[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0){j++;break;}}}return html.slice(s,j);}

// 全域/stub
const _t=new Date(); var TODAY=`${_t.getFullYear()}-${String(_t.getMonth()+1).padStart(2,'0')}-${String(_t.getDate()).padStart(2,'0')}`;
var clients=[]; var nextId=1;
function saveLocal(){} function render(){} function pushToSheet(){return Promise.resolve();} function closeUrlSettings(){} function showToast(){}
function calEsc(s){return String(s==null?'':s);}

const need=['normalizeAddr','normBuildNo','addrCore','addrHit','propLabel','emptyProperty','extractDistrict','migrateProperties','mergePropInto','isFullId','clientRichness','genderFromId','dispName','noticeAddrParts','parseVisitLogs','foldClientInto','consolidateByIdno'];
eval(need.map(ext).join('\n\n'));

let pass=0,fail=0;
function ok(c,l,x){c?(pass++,console.log('  ✅ '+l)):(fail++,console.log('  ❌ '+l+(x?'  '+x:'')));}

console.log('回歸測試 (今天='+TODAY+')\n');

console.log('— 性別/顯示名/身分證 —');
ok(genderFromId('A123456789')==='男','A1→男');
ok(genderFromId('F122*****2')==='男','遮罩F1→男');
ok(genderFromId('A221*****8')==='女','遮罩A2→女');
ok(dispName({name:'江',idno:'F122*****2'})==='江先生','江+F1→江先生');
ok(dispName({name:'李',idno:'A221*****8'})==='李小姐','李+A2→李小姐');
ok(dispName({name:'王博政',idno:'H120337248'})==='王博政','全名不變');
ok(isFullId('A123456789')&&!isFullId('A221*****8'),'isFullId:完整yes/遮罩no');

console.log('— 地址拆解 —');
function p(a){return noticeAddrParts(a);}
let q=p('台北市信義區信義路六段26巷5號七樓之2');
ok(q.dist==='臺北市信義'&&q.road==='信義'&&q.sec==='六'&&q.no==='5'&&q.floor==='七'&&q.floorsub==='2','六段26巷5號七樓之2');
q=p('台北市松山區八德路四段612號8樓之3');
ok(q.no==='612'&&q.floor==='8'&&q.floorsub==='3','全形/八德四段612號8樓之3');
ok(p(123).no===''||true,'非字串地址不 crash'); // 不丟例外即可
ok(normalizeAddr(123)===''||typeof normalizeAddr(123)==='string','normalizeAddr 非字串不 crash');

console.log('— 聯絡紀錄解析 —');
ok(parseVisitLogs('0225 1436沒接電話').length===1,'MMDD HHMM 不被切兩段');
ok(parseVisitLogs('1\n11\n20').length===0,'純數字雜訊丟掉');
// 未來日期:任何 MMDD 解析出的日期都不該 > 今天(相對驗證)
let future=0;
for(let mo=1;mo<=12;mo++)for(let da=1;da<=28;da+=9){ const mm=String(mo).padStart(2,'0')+String(da).padStart(2,'0'); const lg=parseVisitLogs(mm+'測試內容'); lg.forEach(l=>{ if(/^\d{4}-\d{2}-\d{2}$/.test(l.date)&&l.date>TODAY)future++; }); }
ok(future===0,'任何 MMDD 都不會解析成未來日期',`future=${future}`);

console.log('— 去重/合併 —');
clients=[{id:1,name:'王',idno:'A123456789',phone:'',addr:'台北市A路1號',logs:[{date:'2025-01-01',text:'一'}],debtPhones:['0911'],properties:[]},
         {id:2,name:'王',idno:'A123456789',phone:'0912',addr:'',logs:[{date:'2025-02-02',text:'二'}],debtPhones:['0922'],properties:[]}];
consolidateByIdno();
ok(clients.length===1&&clients[0].phone==='0912'&&clients[0].addr==='台北市A路1號'&&clients[0].logs.length===2,'同完整身分證合併+保留資料');
clients=[{id:1,name:'江',idno:'A221*****8',addr:'X',properties:[]},{id:2,name:'陳',idno:'A221*****8',addr:'Y',properties:[]}];
consolidateByIdno();
ok(clients.length===2,'同遮罩身分證不誤併');
const A={id:1,name:'甲',properties:[{addr:'台北A路1號',buildNo:'100-1',bank:500,label:'x'}]};
foldClientInto(A,{id:2,name:'甲',properties:[{addr:'台北A路1號',buildNo:'100-1',private:300,label:'x'}]});
ok(A.properties.length===1&&A.properties[0].bank===500&&A.properties[0].private===300,'同建號房產合併、金額都在');
ok(clientRichness({phone:'0912',logs:[1,2],properties:[{addr:'a'}]})>clientRichness({phone:'',logs:[],properties:[]}),'clientRichness 較完整者高');

console.log(`\n總結: 通過 ${pass} / 失敗 ${fail}`);
process.exit(fail===0?0:1);
