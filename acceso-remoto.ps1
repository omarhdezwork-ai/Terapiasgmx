$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$LocalUrl = "http://127.0.0.1:8080"
$ServerFile = Join-Path $Root "server.js"
$BundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

function Get-NodePath {
  $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
  if ($nodeCommand) {
    return $nodeCommand.Source
  }

  if (Test-Path -LiteralPath $BundledNode) {
    return $BundledNode
  }

  return $null
}

function Test-LocalSite {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $LocalUrl -TimeoutSec 3
    return ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500)
  }
  catch {
    return $false
  }
}

$cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cloudflared) {
  Write-Host ""
  Write-Host "Falta instalar Cloudflare Tunnel para crear la liga remota." -ForegroundColor Yellow
  Write-Host "Instalalo con este comando en PowerShell:" -ForegroundColor White
  Write-Host "  winget install --id Cloudflare.cloudflared -e" -ForegroundColor Cyan
  Write-Host ""
  Write-Host "Despues vuelve a ejecutar este archivo." -ForegroundColor White
  exit 1
}

$nodePath = Get-NodePath
if (-not $nodePath) {
  Write-Host ""
  Write-Host "No encontre Node.js para iniciar la pagina como servidor local." -ForegroundColor Yellow
  Write-Host "Instalalo con:" -ForegroundColor White
  Write-Host "  winget install OpenJS.NodeJS.LTS" -ForegroundColor Cyan
  Write-Host ""
  exit 1
}

$serverProcess = $null
$serverJob = $null
if (-not (Test-LocalSite)) {
  $serverJob = Start-Job -ScriptBlock {
    param($nodePath, $serverFile, $root)

    Set-Location -LiteralPath $root
    & $nodePath $serverFile
  } -ArgumentList $nodePath,$ServerFile,$Root

  Start-Sleep -Seconds 2
}

if (-not (Test-LocalSite)) {
  if ($serverProcess -and -not $serverProcess.HasExited) {
    Stop-Process -Id $serverProcess.Id -Force
  }
  if ($serverJob) {
    Stop-Job -Job $serverJob -ErrorAction SilentlyContinue
    Remove-Job -Job $serverJob -Force -ErrorAction SilentlyContinue
  }

  Write-Host ""
  Write-Host "No pude iniciar el servidor local en $LocalUrl." -ForegroundColor Red
  Write-Host "Prueba ejecutar primero .\servidor-local.ps1 y luego vuelve a intentar." -ForegroundColor White
  exit 1
}

Write-Host ""
Write-Host "Creando acceso remoto temporal para Terapias G..." -ForegroundColor Green
Write-Host "Cuando aparezca una URL parecida a https://algo.trycloudflare.com, abre esa liga en tu celular." -ForegroundColor White
Write-Host "Mientras esta ventana siga abierta, tu pagina seguira disponible." -ForegroundColor White
Write-Host "Para cerrar el acceso remoto, presiona Ctrl + C." -ForegroundColor Yellow
Write-Host ""

try {
  cloudflared tunnel --url $LocalUrl
}
finally {
  if ($serverProcess -and -not $serverProcess.HasExited) {
    Stop-Process -Id $serverProcess.Id -Force
  }
  if ($serverJob) {
    Stop-Job -Job $serverJob -ErrorAction SilentlyContinue
    Remove-Job -Job $serverJob -Force -ErrorAction SilentlyContinue
  }
}
