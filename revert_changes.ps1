$files = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -notin @('index.html', 'pharmacy_cart.html', 'cart.html', 'deodorants-perfumes.html') }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Revert nav a styles
    $content = $content -replace "nav a \{`n            color: white;`n            text-decoration: none;`n            font-weight: 500;`n            padding: 10px 15px;`n            border-radius: 5px;`n            transition: background-color 0.3s;`n            display: flex;`n            align-items: center;`n            gap: 6px;`n            white-space: nowrap;`n        }", "nav a {`n            color: white;`n            text-decoration: none;`n            font-weight: 500;`n            padding: 10px 15px;`n            border-radius: 5px;`n            transition: background-color 0.3s;`n        }"

    # Revert nav a i style
    $content = $content -replace "`n        nav a i \{`n            font-size: 0.6rem;`n        }", ""

    # Revert product img style
    $content = $content -replace ".product img \{`n            width: 100%;`n            height: 200px;`n            object-fit: contain;`n            cursor: pointer;`n        }", ".product img {`n            width: 100%;`n            height: auto;`n            object-fit: cover;`n            cursor: pointer;`n        }"

    Set-Content $file.FullName $content
    Write-Host "Reverted changes in $($file.Name)"
}
