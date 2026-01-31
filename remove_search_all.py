import os
import re

# Get all HTML files in the current directory
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove search-bar div
    content = re.sub(r'\s*<div class="search-bar">\s*<input[^>]*>\s*<button[^>]*></button>\s*</div>', '', content)

    # Remove search script
    content = re.sub(r'\s*<script>\s*// Search functionality\s*const searchInput = document\.querySelector\(\'\.search-input\'\);\s*const products = document\.querySelectorAll\(\'\.product\'\);\s*searchInput\.addEventListener\(\'input\', \(e\) => \{\s*const searchTerm = e\.target\.value\.toLowerCase\(\);\s*products\.forEach\(product => \{\s*const productName = product\.getAttribute\(\'data-name\'\)\.toLowerCase\(\);\s*if \(productName\.includes\(searchTerm\)\) \{\s*product\.style\.display = \'block\';\s*\} else \{\s*product\.style\.display = \'none\';\s*\}\s*\}\);\s*\}\);\s*</script>', '', content, flags=re.MULTILINE | re.DOTALL)

    # Remove search.css link
    content = re.sub(r'\s*<link rel="stylesheet" href="search\.css" />', '', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Processed {file}")

# Delete search-related files
files_to_delete = [
    'js/search.js',
    'smart-search.css',
    'js/smart-search.js',
    'product-search.css',
    'js/product-search.js',
    'remove_search.py',
    'apply_search.py',
    'remove_search_bulk.py',
    'remove_search_all.py'
]

for file in files_to_delete:
    if os.path.exists(file):
        os.remove(file)
        print(f"Deleted {file}")
    else:
        print(f"File {file} not found")
