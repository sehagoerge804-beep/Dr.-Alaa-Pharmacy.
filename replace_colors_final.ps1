# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path . -Filter *.html

# Define the color replacements
$replacements = @{
    '#27ae60' = '#ff6b6b'  # old green to new red/pink
    '#1e8449' = '#4ecdc4'  # old dark green to new teal
    'rgba(39, 174, 96, 0.1)' = 'rgba(255, 107, 107, 0.1)'  # rgba variant for old green
    'rgba(30, 132, 73, 1)' = 'rgba(78, 205, 196, 1)'  # rgba variant for old dark green
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
