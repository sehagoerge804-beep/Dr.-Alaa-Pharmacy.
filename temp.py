import re

# Read the file
with open('skin.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the incomplete quantity selector
pattern = r'(\s+)<div class="quantity-selector"><input type="number" class="quantity-input" value="1" min="1" readonly></div><button class="add-to-cart">Add to Cart</button>'

# Replacement
replacement = r'\1                        <div class="quantity-selector">\n\1                            <button class="quantity-btn" onclick="changeQuantity(this, -1)">-</button>\n\1                            <input type="number" class="quantity-input" value="1" min="1" readonly>\n\1                            <button class="quantity-btn" onclick="changeQuantity(this, 1)">+</button>\n\1                        </div>\n\1                        <button class="add-to-cart">Add to Cart</button>'

# Replace all occurrences
new_content = re.sub(pattern, replacement, content)

# Write back
with open('skin.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed quantity selectors")
