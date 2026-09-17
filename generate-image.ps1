$promptText = "Luxury boutique hotel mobile app home screen mockup, dark matte black background, bronze gold accents, symmetric 2-column grid of 10 large rounded service cards with icons, welcome header AMBAR logo, premium minimalist Uber-style UI, iPhone portrait mockup, high fidelity design"
$encoded = [Uri]::EscapeDataString($promptText)
$baseUri = "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=$encoded&image_size=portrait_16_9"

Write-Host "=== Iniciando generación de imagen ==="
Write-Host "URI: $baseUri"
Write-Host ""

Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Paso 1: Disparar generación (petición inicial sin cache)..."
try {
    $wr = Invoke-WebRequest -Uri $baseUri -UseBasicParsing -Headers @{"Cache-Control"="no-cache"; "Pragma"="no-cache"}
    Write-Host "  -> Respuesta recibida: $($wr.StatusCode), Content-Length: $($wr.Content.Length)"
} catch { Write-Host "  -> Error (ignorado): $_" }

Write-Host ""
Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Esperando 120 segundos (2 min)..."
Start-Sleep -Seconds 60
Write-Host "  [$((Get-Date).ToString('HH:mm:ss'))] ... 60s transcurridos"
Start-Sleep -Seconds 60
Write-Host "  [$((Get-Date).ToString('HH:mm:ss'))] ... 120s transcurridos"

Write-Host ""
Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Paso 2: Segunda descarga (con cache bust)..."
$uri2 = "$baseUri&t=$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())"
$out1 = "c:\Users\GRAJALES\Downloads\ambar-hotel-pwa\ambar-try1.png"
try {
    Invoke-WebRequest -Uri $uri2 -OutFile $out1 -UseBasicParsing -Headers @{"Cache-Control"="no-cache"; "Pragma"="no-cache"}
    $f1 = Get-Item $out1
    Write-Host "  -> Guardado en $out1 : $($f1.Length) bytes"
} catch { Write-Host "  -> Error: $_" }

Write-Host ""
Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Esperando 120 segundos adicionales..."
Start-Sleep -Seconds 60
Write-Host "  [$((Get-Date).ToString('HH:mm:ss'))] ... +60s"
Start-Sleep -Seconds 60
Write-Host "  [$((Get-Date).ToString('HH:mm:ss'))] ... +120s"

Write-Host ""
Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Paso 3: Tercera descarga (final)..."
$uri3 = "$baseUri&t=$([DateTimeOffset]::UtcNow.ToUnixTimeSeconds())-final"
$outFinal = "c:\Users\GRAJALES\Downloads\ambar-hotel-pwa\ambar-concept-home.png"
try {
    Invoke-WebRequest -Uri $uri3 -OutFile $outFinal -UseBasicParsing -Headers @{"Cache-Control"="no-cache"; "Pragma"="no-cache"}
    $fFinal = Get-Item $outFinal
    Write-Host "  -> Guardado en $outFinal : $($fFinal.Length) bytes"
} catch { Write-Host "  -> Error: $_" }

Write-Host ""
Write-Host "=== Proceso completado ==="
Write-Host "Archivos generados:"
Get-ChildItem "c:\Users\GRAJALES\Downloads\ambar-hotel-pwa\ambar-*.png" | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
