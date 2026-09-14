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

const need=['normalizeAddr','normBuildNo','addrCore','addrHit','propLabel','emptyProperty','extractDistrict','migrateProperties','mergePropInto','isFullId','clientRichness','genderFromId','dispName','noticeAddrParts','parseVisitLogs','normPhoneKey','mergeDebtPhones','mergeDebtPhonesInto','foldClientInto','consolidateByIdno','companyOwnerFromRaw','extractDebtPhones','defaultLoanE','cleanCreditorName','parseRightsLoans','samePropertyCard','ownBuildKeyFromBuildInfo'];
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
// 債電去重：總檔同步跑幾次都不該長出重複(t99)
let dp=[]; for(let i=0;i<5;i++) dp=mergeDebtPhones(dp,['0955728829','033278783']);
ok(dp.length===2,'債電同步5次仍2支(不重複)',JSON.stringify(dp));
ok(mergeDebtPhones(['0955-728-829'],['0955728829']).length===1,'債電有無「-」視為同一支');
// 手動刪過的債電：總檔更新永不再帶回來(t100)
ok(mergeDebtPhonesInto({debtPhones:[],deletedDebtPhones:['0223659585']},['0223659585','0228261376']).join()==='0228261376','刪過的債電不再被帶回,其餘照補');

console.log('— 總檔同步:公司戶＋債電(t110) —');
let co=companyOwnerFromRaw('80661538 捷迪實業有限公司\n全部1分之1\n民國113年10月08日 買賣\n');
ok(co&&co.name==='捷迪實業有限公司'&&co.taxId==='80661538','公司戶:統編＋公司名抓得到',JSON.stringify(co));
ok(companyOwnerFromRaw('94091405 犇新資產管理股份有限公司\n全部1分之1').name==='犇新資產管理股份有限公司','公司名超過8字不截斷');
ok(companyOwnerFromRaw('A123456789 王小明\n全部1分之1')===null,'個人戶不會被當公司');
ok(companyOwnerFromRaw('')===null&&companyOwnerFromRaw(null)===null,'空值不 crash');
let dph=extractDebtPhones('A222474641\n00223059393\n0227681515   \n02-25457362   ');
ok(!dph.includes('00223059393')&&dph.includes('0223059393'),'債電:00開頭多的0修掉',JSON.stringify(dph));
ok(!dph.some(x=>/^A/.test(x))&&dph.includes('0227681515')&&dph.includes('0225457362'),'債電:身分證濾掉、連字號去掉',JSON.stringify(dph));
dph=extractDebtPhones('T:27398282\nF:2738000\n0287321139#182\n7775839#');
ok(dph.includes('27398282')&&dph.includes('2738000'),'債電:T:/F:前綴的無區碼市話不再被丟掉',JSON.stringify(dph));
ok(dph.includes('0287321139#182')&&dph.includes('7775839'),'債電:分機保留成#182、空的#去掉',JSON.stringify(dph));
ok(extractDebtPhones('0225173365\n0225173365\n0225173365').length===1,'債電:同支重複只留一筆');
ok(extractDebtPhones('T:27398282 F:2738000').join()==='27398282,2738000','債電:同一行用空白隔開的兩支不會黏在一起');
ok(extractDebtPhones('02-25173365   \n0225173365#').join()==='0225173365','債電:同支不同寫法(連字號/尾巴#)只留一筆');

console.log('— 他項權利部:新台幣/元正 寫法(t110) —');
const rl=parseRightsLoans('1)【銀】民國113年12月05日0010-000第一商業銀行股份有限公司05052322新台幣 32,400,000元正最高限額抵押權設定\n2)【法】民國115年08月03日0011-000中租迪和股份有限公司05072925新台幣 15,000,000元正最高限額抵押權設定\n\n銀行：32,400,000  法人：15,000,000  民間：0  總計：47,400,000');
ok(rl.length===2&&rl[0].n==='第一商業銀行股份有限公司'&&rl[1].n==='中租迪和股份有限公司','「新台幣…元正」也解析出真實債權人(不再退到佔位名稱)',JSON.stringify(rl));
ok(rl[0].a===3240&&rl[1].a===1500&&rl[0].t==='bank'&&rl[1].t==='legal','金額/分類正確');
ok(rl[0].s==='0010-000'&&rl[0].d==='113/12/05'&&rl[1].d==='115/08/03','登序與設定日期都抓到');
ok(parseRightsLoans('1)【銀】民國105年01月01日0002-000臺灣銀行股份有限公司12345678新臺幣 5,000,000元整')[0].n==='臺灣銀行股份有限公司','原本「新臺幣…元整」寫法照常');

console.log('— 總檔同步:多間房是不是同一間(t110) —');
ok(samePropertyCard({buildNo:'03913-000',purpose:'中山段一小段',addr:'台北市中山區雙城街23巷18之1號'},'3913','中山段一小段','雙城街23巷18之1號')===true,'同建號→同一間');
ok(samePropertyCard({buildNo:'03913-000',purpose:'中山段一小段',addr:'台北市中山區雙城街23巷18之1號'},'3928','中山段一小段','雙城街23巷18之1號地下室')===false,'建號不同、門牌只是前綴相同→不同間(地下室不再被併掉)');
ok(samePropertyCard({buildNo:'03913-000',purpose:'中山段一小段',addr:'X'},'3913','金泰段','Y')===false,'同號不同段→不同間');
ok(samePropertyCard({buildNo:'',addr:'台北市中山區遼寧街139號'},'','','遼寧街139號3樓')===true,'沒建號時退用門牌前綴(舊資料相容)');
ok(samePropertyCard({buildNo:'03913-000',addr:'台北市中山區雙城街23巷18之1號'},'','','雙城街23巷18之1號')===true,'一邊沒建號→用門牌');

console.log('— 總檔同步:這一列自己的建號(t110) —');
ok(ownBuildKeyFromBuildInfo('台北市中山區中山段一小段03913-000建號\n民國069年07月28日 見使用執照')==='中山段一小段|3913','標示部→段名|建號');
ok(ownBuildKeyFromBuildInfo('台北市中山區金泰段06268-000建號 民國097年')==='金泰段|6268','沒有小段也可以');
ok(ownBuildKeyFromBuildInfo('台北市中山區中山段一小段03913-000建號')!==ownBuildKeyFromBuildInfo('台北市中山區中山段一小段03928-000建號'),'不同建號→不同識別(地下室不再被當同一間)');
ok(ownBuildKeyFromBuildInfo('沒有建號的文字')===''&&ownBuildKeyFromBuildInfo(null)==='','抓不到回空字串');

console.log(`\n總結: 通過 ${pass} / 失敗 ${fail}`);
process.exit(fail===0?0:1);
