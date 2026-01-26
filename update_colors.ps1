Get-ChildItem *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace 'background-color: #f8f9fa', 'background-color: white'
    $content = $content -replace 'background-color: #2c3e50', 'background-color: #27ae60'
    $content = $content -replace 'background-color: #34495e', 'background-color: #229954'
    $content = $content -replace 'padding: 15px;', 'padding: 10px;'
    $content = $content -replace 'gap: 20px;', 'gap: 15px;'
    $content = $content -replace 'border-radius: 8px;', ''
    Set-Content $_.FullName $content
}
