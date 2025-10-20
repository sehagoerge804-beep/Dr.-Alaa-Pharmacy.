$content = Get-Content 'skin.html' -Raw
$content = $content -replace '<h3><a href="[^"]*" target="_blank">(.*?)</a></h3>', '<h3>$1</h3>'
Set-Content 'skin.html' $content
