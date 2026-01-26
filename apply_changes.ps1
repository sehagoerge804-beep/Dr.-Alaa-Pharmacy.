$files = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -notin @('index.html', 'pharmacy_cart.html', 'cart.html') }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Add nav a styles
    $content = $content -replace '(nav a \{[^}]*color: white;[^}]*text-decoration: none;[^}]*font-weight: 500;[^}]*padding: 10px 15px;[^}]*border-radius: 5px;[^}]*transition: background-color 0\.3s;[^}]*\})', '$1`ndisplay: flex;`nalign-items: center;`ngap: 6px;`nwhite-space: nowrap;'

    # Add nav a i style
    $content = $content -replace '(nav a:hover \{[^}]*background-color: #229954;[^}]*\})', '$1`n`nnav a i {`nfont-size: 0.6rem;`n}'

    # Change product img style
    $content = $content -replace '(\.product img \{[^}]*width: 100%;[^}]*height: auto;[^}]*object-fit: cover;[^}]*cursor: pointer;[^}]*\})', '.product img {`nwidth: 100%;`nheight: 200px;`nobject-fit: contain;`ncursor: pointer;`n}'

    Set-Content $file.FullName $content
    Write-Host "Applied changes to $($file.Name)"
}
