Get-ChildItem *.html | ForEach-Object {
    $content = Get-Content $_ -Raw
    $newContent = $content -replace '</div><div class="quantity-selector"><input type="number" class="quantity-input" value="1" min="1" readonly></div><button class="add-to-cart">Add to Cart</button>', "                        <div class=""quantity-selector"">`n                            <button class=""quantity-btn"" onclick=""changeQuantity(this, -1)"">-</button>`n                            <input type=""number"" class=""quantity-input"" value=""1"" min=""1"" readonly>`n                            <button class=""quantity-btn"" onclick=""changeQuantity(this, 1)"">+</button>`n                        </div>`n                        <button class=""add-to-cart"">Add to Cart</button>"
    Set-Content $_ $newContent
}
