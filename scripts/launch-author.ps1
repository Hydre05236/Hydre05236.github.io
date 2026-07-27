$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$studioUrl = "http://127.0.0.1:4173/#/write"
$healthUrl = "http://127.0.0.1:4173/api/session"

function Test-AuthorService {
  try {
    $request = [System.Net.WebRequest]::Create($healthUrl)
    $request.Timeout = 800
    $response = $request.GetResponse()
    $response.Close()
    return $true
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
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show(
      "写作服务未能启动。请打开 Codex 并检查 math-blog 项目。",
      "Hydre05236 写作台"
    ) | Out-Null
    exit 1
  }
}

Start-Process $studioUrl
