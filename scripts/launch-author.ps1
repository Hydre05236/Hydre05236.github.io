$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$studioUrl = "http://127.0.0.1:4173/#/write"
$healthUrl = "http://127.0.0.1:4173/api/session"

function Test-AuthorService {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $healthUrl -TimeoutSec 1
    return $response.StatusCode -eq 200
  } catch {
    return $false
  }
}

if (-not (Test-AuthorService)) {
  $nodePath = (Get-Command node -ErrorAction Stop).Source
  Start-Process -FilePath $nodePath -ArgumentList @("scripts/serve.mjs") -WorkingDirectory $projectRoot -WindowStyle Hidden

  $ready = $false
  for ($attempt = 0; $attempt -lt 32; $attempt += 1) {
    Start-Sleep -Milliseconds 250
    if (Test-AuthorService) {
      $ready = $true
      break
    }
  }

  if (-not $ready) {
    exit 1
  }
}

Start-Process $studioUrl
