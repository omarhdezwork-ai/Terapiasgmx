$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ServerFile = Join-Path $Root "server.js"
$BundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$NodeCommand = Get-Command node -ErrorAction SilentlyContinue

if ($NodeCommand) {
  $NodePath = $NodeCommand.Source
}
elseif (Test-Path -LiteralPath $BundledNode) {
  $NodePath = $BundledNode
}
else {
  Write-Host ""
  Write-Host "No encontre Node.js para iniciar el servidor local." -ForegroundColor Yellow
  Write-Host "Instalalo con:" -ForegroundColor White
  Write-Host "  winget install OpenJS.NodeJS.LTS" -ForegroundColor Cyan
  Write-Host ""
  exit 1
}

if (-not $env:PORT) {
  $env:PORT = "8080"
}

& $NodePath $ServerFile
