// 產生 dev/MAP.md：index-test.html 的函式索引（名稱／行號／前一行註解）＋ 開發手冊.md 的章節目錄（標題／行號）。
// 目的：AI 開工先讀這份 6k token 的地圖，直接跳到行號，不用在 25 萬 token 的主程式裡反覆 grep。
// 用法：node dev/map.js   （改完程式、出測試版前跑一次，MAP.md 一起 commit）
const fs=require('fs');
const html=fs.readFileSync('index-test.html','utf8').split('\n');
const out=[];
out.push('# MAP — index-test.html 函式索引與開發手冊目錄（node dev/map.js 自動產生，勿手改）');
out.push('');
out.push('> 用法：先在這裡找名字/行號，再用 Read 的 offset/limit 只讀那一段。行號以 index-test.html 為準。');
out.push('');
// ── 區塊骨架 ──
out.push('## 檔案骨架');
html.forEach((l,i)=>{ if(/^<style>|^<\/style>|^<script>|^<\/script>|^<script src|<\/head>|<body>|<\/body>/.test(l.trim())) out.push(`- L${i+1}: ${l.trim().slice(0,60)}`); });
out.push('');
// ── 函式索引（含前一行的 // 註解當說明；同一區段用 // ── 標題 ── 分組）──
out.push('## 函式索引（行號｜名稱｜說明）');
let section='';
html.forEach((l,i)=>{
  const sec=l.match(/^\/\/ ── (.+?) ─+/); if(sec){ section=sec[1].trim(); out.push(`\n### ${section}  (L${i+1})`); return; }
  const m=l.match(/^(?:async\s+)?function\s+([A-Za-z0-9_$]+)\s*\(([^)]*)\)/);
  if(!m) return;
  let desc='';
  for(let k=i-1;k>=Math.max(0,i-3);k--){ const c=html[k].trim(); if(c.startsWith('//')){ desc=c.replace(/^\/\/\s*/,''); break; } if(c==='') continue; break; }
  out.push(`- L${i+1} \`${m[1]}(${m[2].replace(/\s+/g,'')})\`${desc?' — '+desc.slice(0,90):''}`);
});
// ── 重要 id（畫面元件）──
out.push('\n## 重要畫面元件 id（L 行號）');
const ids=['mainApp','statsBar','mainMenu','tabSelect','searchInput','cityFilterPanel','listWrap','batchBar','sheetBg','sheetTitle','saveStatus','sp0','sp1','sp2','sp3','sp4','sp5','heatChips','creditChips','docChips','finProofList','loanRowList','priceEvalPanel','urlSettingsBg','uiDlgBg','themePicker','cardModePicker'];
ids.forEach(id=>{ const i=html.findIndex(l=>l.includes(`id="${id}"`)); if(i>=0) out.push(`- #${id} L${i+1}`); });
// ── 開發手冊目錄 ──
if(fs.existsSync('開發手冊.md')){
  const md=fs.readFileSync('開發手冊.md','utf8').split('\n');
  out.push('\n## 開發手冊.md 目錄（只讀需要的章節：Read offset=行號）');
  md.forEach((l,i)=>{ const h=l.match(/^(#{1,3})\s+(.+)/); if(h) out.push(`${'  '.repeat(h[1].length-1)}- L${i+1} ${h[2].trim().slice(0,70)}`); });
}
fs.writeFileSync('dev/MAP.md', out.join('\n')+'\n', 'utf8');
console.log('dev/MAP.md 已更新：'+out.length+' 行');
