Get-ChildItem *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    # Replace old colors with new green colors
    $content = $content -replace '#3498db', '#27ae60'  # Blue to green
    $content = $content -replace '#2c3e50', '#1e8449'  # Dark blue to dark green
    $content = $content -replace '#0f0f0f', '#2c3e50'  # Black to dark green
    # Keep #7f8c8d and #333 as they are grays for text
    Set-Content $_.FullName $content
}
