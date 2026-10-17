# Deploys this Next.js app to Vercel using an access token (no interactive login).
#
# Usage:  npm run deploy            -> production deploy
#         npm run deploy:preview    -> preview deploy
#
# Reads settings from `.env.deploy` (see `.env.deploy.example`) or from real
# environment variables. VERCEL_TOKEN is required.

param(
  [switch]$Preview,
  [switch]$SkipEnvSync
)

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)

# --- load .env.deploy -------------------------------------------------------
$envFile = '.env.deploy'
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -eq '' -or $line.StartsWith('#')) { return }
    $i = $line.IndexOf('=')
    if ($i -lt 1) { return }
    $name = $line.Substring(0, $i).Trim()
    $value = $line.Substring($i + 1).Trim().Trim('"').Trim("'")
    if ($value -ne '') { Set-Item -Path "Env:$name" -Value $value }
  }
}

if (-not $env:VERCEL_TOKEN) {
  throw "VERCEL_TOKEN missing. Put it in .env.deploy (copy .env.deploy.example)."
}

# --- common CLI args --------------------------------------------------------
$common = @('--token', $env:VERCEL_TOKEN)
if ($env:VERCEL_SCOPE) { $common += @('--scope', $env:VERCEL_SCOPE) }

function Invoke-Vercel {
  param([string[]]$CliArgs)
  # Large uploads can drop with "fetch failed"; already-uploaded files are skipped on retry.
  $attempts = if ($CliArgs[0] -eq 'deploy') { 3 } else { 1 }
  for ($n = 1; $n -le $attempts; $n++) {
    & npx --yes vercel@latest @CliArgs
    if ($LASTEXITCODE -eq 0) { return }
    if ($n -lt $attempts) { Write-Warning "vercel $($CliArgs[0]) failed, retrying ($($n + 1)/$attempts)..."; Start-Sleep -Seconds 3 }
  }
  throw "vercel $($CliArgs[0]) failed (exit $LASTEXITCODE)"
}

# --- link project (creates it on first run) ---------------------------------
$projectName = if ($env:VERCEL_PROJECT_NAME) { $env:VERCEL_PROJECT_NAME } else { 'bhoomi-plots' }
Invoke-Vercel (@('link', '--yes', '--project', $projectName) + $common)

# --- sync app env vars ------------------------------------------------------
$target = if ($Preview) { 'preview' } else { 'production' }
$appVars = 'MONGO_URI', 'JWT_SECRET', 'JWT_EXPIRES_IN',
           'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'

# Preview env vars need a git branch on the CLI, so only production is synced.
if (-not $SkipEnvSync -and -not $Preview) {
  foreach ($name in $appVars) {
    $value = [Environment]::GetEnvironmentVariable($name)
    if (-not $value) { Write-Warning "$name not set - skipping"; continue }
    Write-Host "Setting $name ($target)"
    Invoke-Vercel (@('env', 'add', $name, $target, '--value', $value, '--force', '--yes') + $common)
  }
}

# --- deploy -----------------------------------------------------------------
$deployArgs = @('deploy', '--yes')
if (-not $Preview) { $deployArgs += '--prod' }
Invoke-Vercel ($deployArgs + $common)
