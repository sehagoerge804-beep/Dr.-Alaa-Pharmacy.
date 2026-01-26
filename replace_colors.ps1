# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path . -Filter *.html

# Define the color replacements
$replacements = @{
    '#3498db' = '#1e8449'  # blue to green
    '#2c3e50' = '#2c3e50'  # keep as is (text color)
    '#7f8c8d' = '#666'     # gray to lighter gray
    '#333' = '#2c3e50'     # dark gray to text color
    '#0f0f0f' = '#2c3e50'  # black to text color
}

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw

    foreach ($oldColor in $replacements.Keys) {
        $newColor = $replacements[$oldColor]
        $content = $content -replace [regex]::Escape($oldColor), $newColor
    }

    Set-Content -Path $file.FullName -Value $content
    Write-Host "Replaced colors in $($file.Name)"
}
