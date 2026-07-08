Add-Type -AssemblyName System.Drawing

$iconSrc = 'C:\Users\Black Ferruzo\.gemini\antigravity-ide\brain\81144650-d53e-4df4-aee8-c9f8b4b63969\ccd_icon_512_1783530998969.png'
$destDir = 'public\icons'
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

$sizes = @(72, 96, 128, 144, 152, 192, 384, 512)
$srcBitmap = [System.Drawing.Bitmap]::new($iconSrc)

foreach ($size in $sizes) {
    $dst = Join-Path $destDir "icon-${size}x${size}.png"
    $resized = [System.Drawing.Bitmap]::new($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($resized)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($srcBitmap, 0, 0, $size, $size)
    $g.Dispose()
    $resized.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
    $resized.Dispose()
    Write-Host "Created: $dst"
}
$srcBitmap.Dispose()
Write-Host 'All icons created successfully!'
