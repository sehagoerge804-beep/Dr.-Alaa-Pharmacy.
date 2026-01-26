$files = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -notin @('index.html', 'pharmacy_cart.html', 'cart.html') }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Fix nav a styles - remove the incorrect `n and add proper newlines
    $content = $content -replace 'nav a \{[^}]*color: white;[^}]*text-decoration: none;[^}]*font-weight: 500;[^}]*padding: 10px 15px;[^}]*border-radius: 5px;[^}]*transition: background-color 0\.3s;[^}]*\}`ndisplay: flex;`nalign-items: center;`ngap: 6px;`nwhite-space: nowrap;', "nav a {`n            color: white;`n            text-decoration: none;`n            font-weight: 500;`n            padding: 10px 15px;`n            border-radius: 5px;`n            transition: background-color 0.3s;`n            display: flex;`n            align-items: center;`n            gap: 6px;`n            white-space: nowrap;`n        }"

    # Fix nav a i style
    $content = $content -replace 'nav a:hover \{[^}]*background-color: #229954;[^}]*\}`n`nnav a i \{`nfont-size: 0.6rem;`n\}', "nav a:hover {`n            background-color: #229954;`n        }`n`n        nav a i {`n            font-size: 0.6rem;`n        }"

    # Fix product img style
    $content = $content -replace '\.product img \{`nwidth: 100%;`nheight: 200px;`nobject-fit: contain;`ncursor: pointer;`n\}', ".product img {`n            width: 100%;`n            height: 200px;`n            object-fit: contain;`n            cursor: pointer;`n        }"

    Set-Content $file.FullName $content
    Write-Host "Fixed changes in $($file.Name)"
}
