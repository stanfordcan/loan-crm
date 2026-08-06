# CRM送件工具：掃描 案件_*/CRM匯入_*.json，未送過的 POST 進 GAS 收件匣
# 用法：雙擊 CRM送件.bat，或 powershell -File CRM送件.ps1（加 -DryRun 只驗證不入列）
# 送成功會在 JSON 旁邊建「xxx.json.已送.txt」標記，下次不重送
param([switch]$DryRun)
$ErrorActionPreference = 'Stop'
$GAS = 'https://script.google.com/macros/s/AKfycbyolBN-1JHQWsHyARSKrLuy4rafGI7_o_r9m7rkpS1-AIdTzBonk6vj2itQkDTYQc94xw/exec'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$files = Get-ChildItem -Path $root -Recurse -Filter 'CRM匯入_*.json' | Sort-Object FullName
$sent = 0; $skipped = 0; $failed = 0
foreach ($f in $files) {
  $marker = $f.FullName + '.已送.txt'
  if (Test-Path $marker) { $skipped++; continue }

  $raw = [IO.File]::ReadAllText($f.FullName, [Text.Encoding]::UTF8).Trim()
  if (-not $raw.StartsWith('[')) { $raw = '[' + $raw + ']' }   # 單筆物件也包成陣列
  $dry = ''
  if ($DryRun) { $dry = '"dryRun":true,' }
  $body = '{"token":"stanford87","action":"inbox",' + $dry + '"payload":' + $raw + '}'
  $bytes = [Text.Encoding]::UTF8.GetBytes($body)

  try {
    $r = Invoke-WebRequest -Uri $GAS -Method Post -Body $bytes -ContentType 'application/json; charset=utf-8' -UseBasicParsing
    $txt = $r.Content -replace '^callback\(', '' -replace '\)\s*$', ''
    $resp = $txt | ConvertFrom-Json
    if ($resp.status -eq 'ok') {
      if ($DryRun) {
        Write-Host ("[驗證] " + $f.Name + "  valid=" + $resp.valid + " invalid=" + $resp.invalid)
      } else {
        [IO.File]::WriteAllText($marker, ((Get-Date -Format 'yyyy-MM-dd HH:mm') + " queued=" + $resp.queued), [Text.Encoding]::UTF8)
        Write-Host ("[已送] " + $f.Name + "  queued=" + $resp.queued)
        $sent++
      }
    } else {
      Write-Host ("[失敗] " + $f.Name + "  " + $resp.message); $failed++
    }
  } catch {
    Write-Host ("[失敗] " + $f.Name + "  " + $_.Exception.Message); $failed++
  }
}
Write-Host ""
if ($DryRun) { Write-Host "驗證模式結束（沒有真的送出）" }
else { Write-Host ("完成：送出 " + $sent + " 檔、略過(已送過) " + $skipped + " 檔、失敗 " + $failed + " 檔") }
if ($sent -gt 0) { Write-Host "→ 開 CRM 看紅色「📥 待審」審核匯入" }
