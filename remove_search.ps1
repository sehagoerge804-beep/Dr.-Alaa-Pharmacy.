# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter *.html

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw

    # Remove search-bar div
    $content = $content -replace '\s*<div class="search-bar">\s*<input[^>]*>\s*<button[^>]*></button>\s*</div>', ''

    # Remove search script
    $content = $content -replace '\s*<script>\s*// Search functionality\s*const searchInput = document\.querySelector\(\'''.search-input'''\);\s*const products = document\.querySelectorAll\(\'''.product'''\);\s*searchInput\.addEventListener\(\''input''', \(e\) => \{\s*const searchTerm = e\.target\.value\.toLowerCase\(\);\s*products\.forEach\(product => \{\s*const productName = product\.getAttribute\(\''data-name'''\)\.toLowerCase\(\);\s*if \(productName\.includes\(searchTerm\)\) \{\s*product\.style\.display = ''block'';\s*\} else \{\s*product\.style\.display = ''none'';\s*\}\s*\}\);\s*\}\);\s*</script>', ''

    # Remove search.css link
    $content = $content -replace '\s*<link rel="stylesheet" href="search\.css" />', ''

    Set-Content $file.FullName $content
    Write-Host "Processed $($file.Name)"
}

# Delete search-related files
$filesToDelete = @(
    'js\search.js',
    'smart-search.css',
    'js\smart-search.js',
    'product-search.css',
    'js\product-search.js',
    'remove_search.py',
    'apply_search.py',
    'remove_search_bulk.py',
    'remove_search_all.py'
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted $file"
    } else {
        Write-Host "File $file not found"
    }
}
