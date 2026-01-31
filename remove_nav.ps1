$files = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -notin @('index.html', 'skin.html', 'hair.html', 'pharmacy_cart.html') }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Remove nav element
    $content = $content -replace '(?s)<nav>.*?</nav>', ''

    # Remove navigation script
    $content = $content -replace '(?s)// Navigation functionality.*?}\);', ''

    # Remove nav.css link if added
    $content = $content -replace '<link rel="stylesheet" href="nav\.css" />', ''

    Set-Content $file.FullName $content
    Write-Host "Removed nav from $($file.Name)"
}
