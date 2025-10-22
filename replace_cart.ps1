Get-ChildItem -Path . -Filter '*.html' | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace 'Cart\.html', 'pharmacy_cart.html'
    $content = $content -replace '\bCart\b', 'cart'
    Set-Content $_.FullName $content
}
