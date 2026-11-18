# Публикация примеров на GitHub Pages одной командой.
# Использование:  .\publish.ps1 "что изменил"
param([string]$Message = "Обновление примеров")
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) { Write-Host "Нет изменений для публикации."; exit 0 }
git commit -m $Message
git push
Write-Host "Готово. Сайт обновится через 1–2 минуты."
