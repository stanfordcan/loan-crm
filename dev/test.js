// 回歸測試(不需備份檔,純合成情境,時間相關用相對日期):抽真函式跑、驗核心邏輯。
// 用法: node dev/test.js index-test.html   (改完程式 push 前跑,確認沒弄壞)
const fs=require('fs');
const html=fs.readFileSync(process.argv[2]||'index-test.html','utf8');
function ext(n){const s=html.indexOf('function '+n+'(');if(s<0)throw new Error('找不到 '+n);let j=html.indexOf('{',s),d=0;for(;j<html.length;j++){const c=html[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0){j++;break;}}}return html.slice(s,j);}

// 全域/stub
const _t=new Date(); var TODAY=`${_t.getFullYear()}-${String(_t.getMonth()+1).padStart(2,'0')}-${String(_t.getDate()).padStart(2,'0')}`;
var clients=[]; var nextId=1;
var BATCH_SEP='、';
var EXTRA_FIELDS=['phone2','contactTime','company','income','incomeType','taxed','marital','spouse','loanWant','loanUse','loanWhen','creditBank','creditPrivate','creditBounce','closeReason','closeNote'];
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


console.log('— 畫面邏輯 (t116~t123)：清單篩選、地址縮短、版本短名、債務加總 —');
eval(['localDateStr','weekEndStr','applyListFilters','shortAddr','shortVersion','getLoanE','clientLoanTotals'].map(ext).join('\n\n'));
var curTab='all', curTime='';
const d=n=>{const t=new Date(); t.setDate(t.getDate()+n); return localDateStr(t);};
const L=[{id:1,name:'逾期',heat:'追很緊',remind:d(-2)},{id:2,name:'逾期已簽',heat:'已簽約',remind:d(-2)},{id:3,name:'今日',heat:'覆訪',remind:d(0)},
         {id:4,name:'本週',heat:'覆訪',remind:d(5)},{id:5,name:'未排',heat:'待分類'},{id:6,name:'未排無效',heat:'無效案件'},{id:7,name:'下月',heat:'覆訪',remind:d(20)}];
const names=l=>l.map(c=>c.name).join(',');
curTab='all'; curTime='';      ok(applyListFilters([...L]).length===7,'無篩選＝全部');
curTab='覆訪';                  ok(names(applyListFilters([...L]))==='今日,本週,下月','分類：只留覆訪');
curTab='all'; curTime='over';   ok(names(applyListFilters([...L]))==='逾期','逾期：排除已簽約');
curTime='today';                ok(names(applyListFilters([...L]))==='今日','今日');
curTime='week';                 ok(names(applyListFilters([...L]))==='今日,本週','本週：含今天、7天內，不含20天後');
curTime='noremind';             ok(names(applyListFilters([...L]))==='未排','未排程：排除無效案件');
curTab='追很緊'; curTime='over'; ok(names(applyListFilters([...L]))==='逾期','分類＋時間可疊加');
curTab='all'; curTime='';
ok(shortAddr('臺北市萬華區武成街51巷6號')==='萬華區武成街51巷6號','shortAddr 去掉臺北市');
ok(shortAddr('新北市板橋區')==='板橋區'&&shortAddr('')===''&&shortAddr(null)==='','shortAddr 新北市／空值');
ok(shortAddr('萬華區武成街')==='萬華區武成街','shortAddr 沒有縣市就不動');
ok(shortVersion("🧪測試版 t123 (一堆說明;含分號) 2026.10.14")==='🧪 t123','shortVersion 測試版→🧪 tNN');
ok(shortVersion('2026.10.13 #1')==='2026.10.13 #1','shortVersion 正式版不變');
const lt=clientLoanTotals({bank:'500',legal:0,private:300});
ok(lt.bank===500&&lt.legal===0&&lt.priv===300,'clientLoanTotals 舊欄位加總(字串也算)');
const lt2=clientLoanTotals({properties:[{bank:100,private:50},{bank:200,legal:30}]});
ok(lt2.bank===300&&lt2.legal===30&&lt2.priv===50,'clientLoanTotals 多筆不動產加總');

eval(ext('nextDocState'));
ok(nextDocState('')==='got'&&nextDocState('got')==='skip'&&nextDocState('skip')==='','文件清單三態循環 未收→已收→不需要→未收');
// t127：合併時新欄位不被洗掉
{
  const keep={id:1,name:'甲',phone:'0912',loanWant:'300',docs:{'身分證':'got'},properties:[],logs:[]};
  const drop={id:2,name:'甲',phone:'',company:'永利旺',loanWant:'999',docs:{'權狀':'skip','身分證':'skip'},properties:[],logs:[]};
  foldClientInto(keep,drop);
  ok(keep.loanWant==='300','合併：主這邊已填的想借金額不被覆蓋');
  ok(keep.company==='永利旺','合併：主這邊空白的公司名稱由副補上');
  ok(keep.docs['身分證']==='got'&&keep.docs['權狀']==='skip','合併：文件清單聯集、主已標的不動');
}
// t137：XLS 匯入格式自動辨識
eval(ext('normalizeXlsRows'));
{
  const exp=normalizeXlsRows([['建物標示\n建號','住址','面積'],['X段01234-000建號','臺北市A路1號','30'],['','','']]);
  ok(exp.format==='export'&&exp.count===1&&exp.rows.length===3&&exp.rows[2].length===25&&exp.rows[2][3]==='X段01234-000建號'&&exp.rows[2][4]==='臺北市A路1號','查詢匯出格式：左補3欄、補標題列、25欄、空白列丟掉');
  ok(normalizeXlsRows([['電話','拜訪過程'],['電話','拜訪過程'],['0911','x']]).format==='master','總檔格式照舊');
  ok(normalizeXlsRows([['姓名','電話'],['a','b'],['c','d']]).format==='unknown','不認得的格式→unknown');
}
// t139：所有權部抓建物持分
eval(ext('shareFromOwner'));
ok(JSON.stringify(shareFromOwner('A123456789 王小明\n台北市A路1號\n全部1分之1  27.88 坪'))==='{"num":1,"den":1}','全部1分之1 → 1/1');
ok(JSON.stringify(shareFromOwner('5分之1  20.42 平方公尺'))==='{"num":1,"den":5}','5分之1 → 1/5');
ok(JSON.stringify(shareFromOwner('持分 10000分之235'))==='{"num":235,"den":10000}','10000分之235 → 235/10000');
ok(JSON.stringify(shareFromOwner('全部 1 分之 1  26.17 坪'))==='{"num":1,"den":1}','有空白的 1 分之 1');
ok(JSON.stringify(shareFromOwner('沒有持分字樣'))==='{"num":0,"den":0}','抓不到 → 0/0');
// t141：多批次
eval(['batchList','batchJoin','batchAdd','batchSetAll','suggestBatchName'].map(ext).join(String.fromCharCode(10)));
{
  ok(JSON.stringify(batchList('A、B,，C ; A'))==='["A","B","C"]','batchList 拆「、,，;」並去重');
  const c={batch:'新鑫 115/03/18 (5)'};
  ok(batchAdd(c,'包區 115/10 大安區')===true && c.batch==='新鑫 115/03/18 (5)、包區 115/10 大安區' && c.firstBatch==='新鑫 115/03/18 (5)','batchAdd 加在後面、首次來源記第一個');
  ok(batchAdd(c,'包區 115/10 大安區')===false && batchList(c).length===2,'batchAdd 重複不再加');
  batchSetAll(c,'只剩這個'); ok(c.batch==='只剩這個' && c.firstBatch==='新鑫 115/03/18 (5)','batchSetAll 取代但首次來源不變');
  ok(suggestBatchName('1150318_資料 (5)')==='新鑫 115/03/18 (5)' && suggestBatchName('1150611_資料(6)')==='新鑫 115/06/11 (6)','新鑫批次改名建議');
  ok(suggestBatchName('115_03 松山區包區')==='包區 115/03 松山區','包區改名建議');
  ok(suggestBatchName('ACER中人件')==='中人 ACER' && suggestBatchName('kira案件')==='中人 kira','中人改名建議');
  ok(suggestBatchName('Ashley')==='Ashley','認不得的維持原名');
}
// t144：債電 → tel: 號碼
eval(ext('debtPhoneTel'));
ok(debtPhoneTel('0912-345-678（陳廣庠）')==='0912345678','債電去掉名字註記');
ok(debtPhoneTel('0223059393#123')==='0223059393,123','#分機 → ,分機');
ok(debtPhoneTel('（只有名字）')==='' && debtPhoneTel('')==='','沒號碼回空字串');
// t146：雲端分段
eval(ext('splitChunks'));
ok(JSON.stringify(splitChunks('abcdefg',3))==='["abc","def","g"]' && splitChunks('',3).length===0,'splitChunks 切段');
ok(splitChunks('x'.repeat(1200000),500000).length===3,'120 萬字 → 3 段');
// t150/t151：公司格式回填
eval(['logsToProcess','digitsOf','loansToRights','companyExportRows'].map(ext).join(String.fromCharCode(10)));
{
  const NL=String.fromCharCode(10);
  const r=companyExportRows([
    {id:1,name:'甲',phone:'0912-111-222',note:'新備註',heat:'覆訪',censusAddr:'戶籍地',debtPhones:['0988-000-111'],logs:[{date:'2026-10-14',text:'B'},{date:'2026-10-01',text:'A'}],
      properties:[
        {addr:'門牌A',area:30,buildShareNum:1,buildShareDen:3,loans:[{n:'國泰',a:600,t:'bank',s:'0001-000'}],companyRaw:{cols:['E'+NL+'甲'+NL+'0912111222','舊程','舊備','標','舊門牌','29坪','所有','舊住','','債','義','擔','0977','1)【銀】原文','權']}},
        {addr:'門牌B',area:20,loans:[{n:'民間乙',a:100,t:'private',s:'0002-000',manualAdd:true}],companyRaw:null}
      ]},
    {id:2,name:'乙',phone:'0933',addr:'地址乙',heat:'新鑫',logs:[],properties:[]}
  ]);
  ok(r.rows.length===3 && r.rows.every(x=>x.cols.length===25),'一間不動產一列、每列 25 欄');
  const A=r.rows[0].cols, B=r.rows[1].cols, C=r.rows[2].cols;
  ok(A[0]==='E'+NL+'甲'+NL+'0912111222' && A[4]==='門牌A' && A[5]==='30坪' && A[7]==='戶籍地','電話原值已含 CRM 電話就不動；門牌/面積/戶籍用 CRM');
  ok(A[1]==='1151001 A'+NL+'1151014 B' && A[2]==='新備註' && A[12]==='0988-000-111','拜訪過程/備註/債電用 CRM 現在的');
  ok(A[8]==='10 坪' && A[13]==='1)【銀】原文' && A[3]==='標' && A[6]==='所有','持分面積算出來；他項沒手改照原值；標示/所有權部照原值');
  ok(B[0]==='甲'+NL+'0912-111-222' && B[4]==='門牌B' && B[13]==='1)【私】 0002-000 民間乙 新臺幣1,000,000元' && B[14]==='1)民間乙','第二間沒原值：用 CRM 湊電話、門牌、他項、權利人');
  ok(r.rows[0].heat==='覆訪' && r.rows[2].heat==='新鑫' && C[0]==='乙'+NL+'0933' && C[4]==='地址乙' && r.noRaw===2,'分類帶出去；沒不動產的人一列');
  ok(loansToRights([{n:'國泰',a:600,t:'bank',s:'0001-000',d:'102/02/15',x:true}])==='1)【銀】 民國102年2月15日 0001-000 國泰 新臺幣6,000,000元 （塗銷）','抵押列重組含日期登序金額塗銷');
}
// t154：雲端子資料夾命名、民國日期
eval(['driveSubFolderName','rocShort'].map(ext).join(String.fromCharCode(10)));
ok(driveSubFolderName('張聖平','台北市中山區建國北路二段92號12樓','','','','2026-10-19')==='1151019_張聖平_台北市中山區建國北路二段92號12樓','子資料夾：民國日期_客戶名_門牌');
ok(driveSubFolderName('王小明','','松山區','延吉段三小段','0685-000','2026-10-19')==='1151019_王小明_松山區延吉段三小段0685-000','沒門牌 → 地段號＋地號');
ok(driveSubFolderName('王小明','','','','','2026-10-19')==='','門牌和地號都沒有 → 空字串');
ok(driveSubFolderName('A/B','台北市*路?1號','','','','2026-01-05')==='1150105_AB_台北市路1號','檔名不能用的符號去掉');
ok(rocShort('2026-10-19')==='115/10/19','民國短日期');
// t155：拜訪過程帶記錄類型
var LOG_KINDS=[['site','🏠 現場拜訪','現'],['phone','📞 電話','電'],['office','🏢 來公司','公'],['other','📝 其他','']];
eval(['logKindTag'].map(ext).join(String.fromCharCode(10)));
{
  const NL=String.fromCharCode(10);
  const r=logsToProcess([{date:'2026-10-19',text:'到現場',kind:'site'},{date:'2026-10-18',text:'電話',kind:'phone'},{date:'2026-10-17',text:'來公司',kind:'office'},{date:'2026-10-16',text:'舊的'}]);
  ok(r==='1151016 舊的'+NL+'1151017 【公】來公司'+NL+'1151018 【電】電話'+NL+'1151019 【現】到現場','有類型的加【現】【電】【公】，舊的沒類型照舊');
}
// t157：案源評估排版
eval(['fmtWan','priceRangeStr','regionFromAddr','evalReportText'].map(ext).join(String.fromCharCode(10)));
{
  const NL=String.fromCharCode(10);
  ok(regionFromAddr('台北市中山區建國北路二段92號12樓')==='台北市 中山區' && regionFromAddr('新北市三芝區X路')==='新北市 三芝區' && regionFromAddr('')==='','門牌抓區域');
  const pr=priceRangeStr(60,65,36.37,0);
  ok(pr.unit==='60～65' && pr.total==='2,182～2,364','行情與總價範圍');
  ok(priceRangeStr(0,65,36.37,100).total==='2,464' && priceRangeStr(0,65,36.37,100).unit===65,'只有行情價就單一數字，車位加進總價');
  const txt=evalReportText({name:'張聖平',idno:'A1',region:'台北市 中山區',section:'建國段',landNo:'0123-000',landArea:'12.5 坪',landzone:'住三',buildNo:'54',addr:'地址',community:'社區',building:'36.37 坪（含車位）',parking:'8.2 坪',floors:'12 層',age:'25 年',tax:'一般 35 萬、自用 12 萬＜共 2 筆＞',loanLines:['土地銀行：800 萬（已確認 115/10/19）','玉山銀行：300 萬（待確認）','新鑫：150 萬（待確認）'],privateLine:'200 萬／2.5 分',condition:'',resistance:'',jinzhai:'無',unitRange:'約 60～65 萬/坪',totalRange:'約 2,180～2,360 萬',job:'上班族',clientAge:'52 歲',purpose:'周轉',need:'300 萬 2 分（含清償前胎）',note:''});
  const lines=txt.split(NL);
  ok(lines.length===36,'共 36 行（含空行；三家銀行＋私人）','got '+lines.length);
  ok(lines[0]==='客戶名稱：張聖平' && lines[1]==='身分證字號：A1' && lines[2]==='','前兩行＋空行');
  ok(lines[8]==='' && lines[9]==='建號：54' && lines[16]==='' && lines[17].startsWith('土增稅'),'分區後空行、屋齡後空行');
  ok(lines[18]==='土地銀行：800 萬（已確認 115/10/19）' && lines[21]==='私人：200 萬／2.5 分' && lines[22]==='','銀行逐行、私人、空行');
  ok(lines[23]==='屋況：' && lines[26]==='' && lines[27]==='行情：約 60～65 萬/坪' && lines[29]==='','屋況三行、空行、行情總價、空行');
  ok(lines[30]==='客戶職業、收入：上班族' && lines[31]==='客戶年紀：52 歲' && lines[32]==='借款用途：周轉' && lines[33]==='' && lines[34]==='客戶需求：300 萬 2 分（含清償前胎）' && lines[35]==='備註：','職業三行、空行、需求備註');
}
// t158：建物標示抓樓層／完成年、職業收入組句
eval(['floorsFromBuildInfo','builtYearFromBuildInfo','jobSummary'].map(ext).join(String.fromCharCode(10)));
ok(floorsFromBuildInfo('A_01_0611_000 松山區延吉段 建號 住家用 012層 總面積（36.37坪） 88年05月12日')==='12' && floorsFromBuildInfo('')==='','總樓層 012層 → 12');
ok(builtYearFromBuildInfo('住家用 012層 88年05月12日 建築完成')==='88' && builtYearFromBuildInfo('109年05月19日 買賣')==='109' && builtYearFromBuildInfo('無')==='','建築完成年抓民國年');
ok(jobSummary({job:'上班族',company:'某公司',income:'6',incomeType:'薪轉',taxed:'有'})==='上班族（某公司），月收 6 萬，薪轉，有報稅','職業收入整句');
ok(jobSummary({job:'自營',income:''})==='自營' && jobSummary({})==='','缺的欄位不留逗號');
ok(jobSummary({company:'統一超商'})==='統一超商' && jobSummary({job:'家管',income:'0'})==='家管','只有公司名不加括號、月收 0 不寫');
// t162：久未聯絡
{
  var TODAY='2026-10-19'; var curTime=''; var localStorage={_s:{},getItem(k){return k in this._s?this._s[k]:null;},setItem(k,v){this._s[k]=String(v);}};
  var STALE_KEY='crm_stale_days';
  eval(['staleDays','lastLogDate','daysSince','isMuted','staleBase','isStale','isNever'].map(ext).join(String.fromCharCode(10)));
  const L=(d)=>({date:d,text:'x'});
  ok(isStale({heat:'覆訪',logs:[L('2026-08-01'),L('2026-07-01')]})===true,'最後一筆 79 天前 → 久未聯絡');
  ok(isStale({heat:'覆訪',logs:[L('2026-10-01')]})===false,'18 天前 → 不算');
  ok(isStale({heat:'覆訪',logs:[L('2026-08-01')],remind:'2026-11-01'})===false,'有未來提醒 → 不算');
  ok(isStale({heat:'覆訪',logs:[L('2026-08-01')],remind:'2026-10-01'})===true,'提醒已過期 → 還是算');
  ok(isStale({heat:'已簽約',logs:[L('2026-08-01')]})===false && isStale({heat:'無效案件',logs:[L('2026-01-01')]})===false,'已簽約／無效不算');
  ok(isStale({heat:'覆訪',logs:[L('2026-08-01')],staleMuteUntil:'2026-11-18'})===false && isStale({heat:'覆訪',logs:[L('2026-08-01')],staleMuteUntil:'2026-10-01'})===true,'暫停中不算、到期回來');
  ok(isNever({heat:'新鑫',logs:[]})===true && isNever({heat:'新鑫',logs:[L('2026-08-01')]})===false && isNever({heat:'無效案件',logs:[]})===false,'從未聯絡：沒記錄且非結案');
  localStorage.setItem(STALE_KEY,'90');
  ok(isStale({heat:'覆訪',logs:[L('2026-08-01')]})===false && isStale({heat:'覆訪',logs:[L('2026-06-01')]})===true,'改成 90 天後 79 天不算、140 天算');
}
// t164：重複不動產判斷
eval(['normBuildNo','addrCore','addrHit','samePropertyCard','propIdOf','propListOf','samePropPair'].map(ext).join(String.fromCharCode(10)));
{
  const inc=normBuildNo('A_01_0655_11508-000'), core=addrCore('臺北市松山區民生東路五段204號5樓之2');
  const oldCard={addr:'臺北市松山區民生東路五段２０４號五樓之２',buildNo:'11171-000、11508-000、11510-000、18382-000',col4BuildNo:'',purpose:'民生段'};
  ok(samePropertyCard(oldCard,inc,'民生段',core)===true,'舊卡只有共同擔保清單＋全形門牌 → 同一間（黃國洲）');
  const otherUnit={addr:'臺北市松山區民生東路五段204號5樓之1',buildNo:'11171、11508、11510、18382',col4BuildNo:'',purpose:'民生段'};
  ok(samePropertyCard(otherUnit,inc,'民生段',core)===false,'同棟不同戶（5樓之1）清單一樣但門牌不同 → 不是同一間');
  ok(samePropertyCard({addr:'x',col4BuildNo:'A_01_0655_11508-000',purpose:'民生段'},inc,'民生段',core)===true && samePropertyCard({addr:'x',col4BuildNo:'A_01_0655_11510-000',purpose:'民生段'},inc,'民生段',core)===false,'兩邊都有自己的建號：建號說了算');
  ok(addrCore('台北市大安區安和路二段６０號四樓')===addrCore('臺北市大安區安和路二段60號4樓'),'門牌核心：全形／中文樓層／台臺統一');
  ok(samePropPair({addr:'臺北市松山區民生東路五段２０４號五樓之２'},{addr:'臺北市松山區民生東路五段204號5樓之2'})===true,'整理工具：門牌正規化後一樣 → 重複');
  ok(samePropPair({addr:'臺北市松山區民生東路五段204號5樓'},{addr:'臺北市松山區民生東路五段204號5樓之1'})===false,'整理工具：5樓 跟 5樓之1 不併');
  ok(samePropPair({addr:'同址',buildNo:'457'},{addr:'同址',col4BuildNo:'F_07_0851_0458-0000'})===false,'整理工具：同門牌但各自建號不同（457 vs 458）不併');
  ok(samePropPair({addr:'同址',buildNo:'2015、2016',loans:[{s:'0001-000'}]},{addr:'同址',col4BuildNo:'F_03_0493_02016-000',buildNo:'2015、2016',loans:[{s:'0003-000'}]})===false,'整理工具：同址兩戶、清單一樣但登序對不上 → 不併');
  ok(samePropPair({addr:'同址',buildNo:'2015、2016',loans:[]},{addr:'同址',col4BuildNo:'F_03_0493_02016-000',buildNo:'2015、2016',loans:[{s:'0003-000'}]})===true,'整理工具：其中一張沒抵押列 → 可併');
  ok(samePropPair({addr:'同址',buildNo:'2015、2016',loans:[{s:'0003-000'}]},{addr:'同址',col4BuildNo:'F_03_0493_02016-000',buildNo:'2015、2016',loans:[{s:'0003-000'}]})===false,'整理工具：清單多個建號、兩張都有抵押列（登序還一樣） → 分不出，不併');
  ok(samePropPair({addr:'臺北市松山區民生東路五段２０４號五樓之２',buildNo:'11171-000、11508-000'},{addr:'臺北市松山區民生東路五段204號5樓之2',col4BuildNo:'A_01_0655_11508-000'})===true,'整理工具：舊卡只有清單且含對方建號 → 併');
  ok(samePropPair({col4BuildNo:'A_01_0655_11508-000',addr:'a'},{col4BuildNo:'A_01_0655_11508-000',addr:'b'})===true && samePropPair({col4BuildNo:'A_01_0655_11508-000',addr:'a'},{col4BuildNo:'A_01_0655_11510-000',addr:'a'})===false,'整理工具：有自己的建號就比建號');
}
// t165：門牌統一寫法
eval(['cleanAddr'].map(ext).join(String.fromCharCode(10)));
ok(cleanAddr('臺北市松山區民生東路五段２０４號五樓之２')==='臺北市松山區民生東路五段204號5樓之2','全形數字與中文樓層統一');
ok(cleanAddr('新北市五股區 成泰路三段２２１巷１０號')==='新北市五股區成泰路三段221巷10號','去空白');
ok(cleanAddr('新北市中和區壽德街２６號八樓之二')==='新北市中和區壽德街26號8樓之2' && cleanAddr('路1號之十二')==='路1號之12','之二→之2');
ok(cleanAddr('台北市大安區安和路二段60號')==='台北市大安區安和路二段60號','台不改、已經乾淨的不變');
// t167：設定日期（106-03-28 格式）與日期更新
eval(['parseRightsLoans','cleanCreditorName','classifyCreditor','defaultLoanE','isPlaceholderLoanName','getLoanE','loansToTotals','smartMergeLoans'].map(ext).join(String.fromCharCode(10)));
{
  const NL=String.fromCharCode(10);
  const ls=parseRightsLoans('1)【銀】106-03-28 0007000 最高 花旗（台灣） 28421312（新臺幣9600000元）'+NL+'3)【私】114-07-29 0009000 最高 新鑫股份有限 22764579（新臺幣1320000元）');
  ok(ls.length===2 && ls[0].d==='106/03/28' && ls[1].d==='114/07/29','他項條列的 106-03-28 抓成設定日期');
  const p={loans:[{n:'新鑫股份有限',a:132,t:'private',s:'0009000',e:132,d:'111/06/22'}]};
  const r=smartMergeLoans(p,[{n:'新鑫股份有限',a:132,t:'private',s:'0009000',e:132,d:'114/07/29'}],'總檔','2026-10-20',{});
  ok(r.dated===1 && p.loans[0].d==='114/07/29' && p.loans[0].dPrev==='111/06/22','同登序設定日期變了 → 更新並留舊日期');
}
// t168：重複聯絡記錄清理
eval(['parseVisitLogs','dedupeClientLogs'].map(ext).join(String.fromCharCode(10)));
{
  const L=(d,t)=>({date:d,text:t});
  const c={name:'劉',logs:[L('2026-08-06','單坪估好賣85萬 總價1450萬'),L('2026-07-03','單坪估好賣85萬 總價1450萬'),L('2026-05-25','單坪估好賣85萬 總價1450萬'),L('2026-06-10','單坪估好賣85萬 總價'),L('2025-09-14','新黨候選人'),L('2022-09-14','新黨候選人'),L('','萬'),L('2026-10-01','未接'),L('2026-10-02','未接，改天再打')],
    properties:[{companyRaw:{process:'單坪估好賣85萬 總價1450萬'+String.fromCharCode(10)+'1110914新黨候選人'}}]};
  const n=dedupeClientLogs(c,false);
  ok(n===5,'清掉 5 筆（兩筆重複句、一筆半句、一筆雜訊、一筆年份錯的）','n='+n);
  ok(c.logs.map(l=>l.date+'|'+l.text).join(';')==='2026-05-25|單坪估好賣85萬 總價1450萬;2022-09-14|新黨候選人;2026-10-01|未接;2026-10-02|未接，改天再打','留最早那筆、留總檔原文日期那筆、短句「未接」不會被當半句刪');
  ok(c.deletedLogKeys.length===5,'刪掉的記進 deletedLogKeys');
}
console.log(`\n總結: 通過 ${pass} / 失敗 ${fail}`);
process.exit(fail===0?0:1);
