$content = Get-Content 'skin.html' -Raw

# Remove all existing quantity-selector divs
$content = $content -replace '<div class="quantity-selector">.*?</div>', ''

# Add a single quantity input after price, before add-to-cart
$pattern = '(?s)(<div class="price">.*?</div>)\s*(<button class="add-to-cart">Add to Cart</button>)'
$replacement = '$1<div class="quantity-selector"><input type="number" class="quantity-input" value="1" min="1" readonly></div>$2'
$content = $content -replace $pattern, $replacement

Set-Content 'skin.html' $content
