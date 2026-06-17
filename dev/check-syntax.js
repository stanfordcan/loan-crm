// 本機語法檢查：把 HTML 裡每段內嵌 <script>(無 src) 用 vm 編譯一次,抓語法錯誤(不執行)。
// 用法(找到 node.exe 後)：node dev/check-syntax.js index-test.html
//   node 路徑(本機 winget 安裝)：C:\Users\USER\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_*\node-*-win-x64\node.exe
// 改完 index-test.html / index.html，push 前跑一次確認 0 語法錯誤。
const fs = require('fs');
const vm = require('vm');
const file = process.argv[2] || 'index-test.html';
const html = fs.readFileSync(file, 'utf8');
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
let m, i = 0, errors = 0, totalLines = 0;
while ((m = re.exec(html))) {
  i++;
  const code = m[1];
  totalLines += code.split('\n').length;
  try { new vm.Script(code, { filename: `inline-script-${i}` }); }
  catch (e) { errors++; console.log(`\n❌ 第 ${i} 段 <script> 語法錯誤: ${e.message}`); }
}
console.log(`\n${file}\n  內嵌 script 段數: ${i}  (約 ${totalLines} 行)  語法錯誤: ${errors}`);
console.log(errors === 0 ? '  ✅ 全部語法正確' : '  ⚠️ 有語法錯誤');
process.exit(errors === 0 ? 0 : 1);
