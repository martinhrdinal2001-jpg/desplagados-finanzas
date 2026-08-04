# Publica los cambios del dashboard a GitHub (y por lo tanto a GitHub Pages).
#
# Uso:  .\publicar.ps1
#       .\publicar.ps1 "mensaje del commit"
#
# Antes de subir regenera el archivo compartible, asi la copia de un solo
# archivo nunca queda desincronizada de los datos.

param(
    [string]$Mensaje = ""
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# 1. Regenerar la version de un solo archivo
Write-Host "Regenerando el archivo compartible..." -ForegroundColor Cyan
python generar_compartible.py
if ($LASTEXITCODE -ne 0) {
    Write-Host "El generador fallo. No se sube nada." -ForegroundColor Red
    exit 1
}

# 2. Ver si hay algo que subir
$cambios = git status --porcelain
if (-not $cambios) {
    Write-Host "No hay cambios que publicar." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Cambios a publicar:" -ForegroundColor Cyan
git status --short

# 3. Commit
if (-not $Mensaje) {
    $Mensaje = "Actualizacion de datos " + (Get-Date -Format "yyyy-MM-dd")
}
git add -A
git commit -m $Mensaje

# 4. Push
$remoto = git remote
if (-not $remoto) {
    Write-Host ""
    Write-Host "Todavia no hay un remoto configurado." -ForegroundColor Yellow
    Write-Host "Crea el repo en https://github.com/new y despues corre:" -ForegroundColor Yellow
    Write-Host '  git remote add origin https://github.com/TU-USUARIO/TU-REPO.git' -ForegroundColor White
    Write-Host '  git push -u origin main' -ForegroundColor White
    exit 0
}

Write-Host ""
Write-Host "Subiendo a GitHub..." -ForegroundColor Cyan
git push
Write-Host ""
Write-Host "Listo. GitHub Pages tarda ~1 minuto en reflejar el cambio." -ForegroundColor Green
