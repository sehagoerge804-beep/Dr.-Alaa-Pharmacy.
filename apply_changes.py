import os
import re

def apply_changes_to_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change nav a style
    nav_a_pattern = r'(nav a \{[^}]*color: white;[^}]*text-decoration: none;[^}]*font-weight: 500;[^}]*padding: 10px 15px;[^}]*border-radius: 5px;[^}]*transition: background-color 0\.3s;[^}]*\})'
    nav_a_replacement = r'\1\ndisplay: flex;\nalign-items: center;\ngap: 6px;\nwhite-space: nowrap;'

    content = re.sub(nav_a_pattern, nav_a_replacement, content, flags=re.DOTALL)

    # Add nav a i style
    nav_a_hover_pattern = r'(nav a:hover \{[^}]*background-color: #229954;[^}]*\})'
    nav_a_i_style = r'\1\n\nnav a i {\nfont-size: 0.6rem;\n}'
    content = re.sub(nav_a_hover_pattern, nav_a_i_style, content, flags=re.DOTALL)

    # Change product img style
    product_img_pattern = r'(\.product img \{[^}]*width: 100%;[^}]*height: auto;[^}]*object-fit: cover;[^}]*cursor: pointer;[^}]*\})'
    product_img_replacement = r'.product img {\nwidth: 100%;\nheight: 200px;\nobject-fit: contain;\ncursor: pointer;\n}'
    content = re.sub(product_img_pattern, product_img_replacement, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Get all HTML files
html_files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['index.html', 'pharmacy_cart.html', 'cart.html']]

for file in html_files:
    apply_changes_to_file(file)
    print(f"Applied changes to {file}")
