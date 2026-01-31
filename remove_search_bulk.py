import os
import re

# List of HTML files to process
html_files = [
    'sunscreen.html',
    'shaving-supplies.html',
    'sensitive-area-care.html',
    'offers.html',
    'nail-lip-care.html',
    'index.html',
    'hair.html',
    'good-supplies.html',
    'dyes.html',
    'diapers.html',
    'deodorants-perfumes.html',
    'dental-care.html',
    'childrens-supplies.html'
]

# Pattern to match the search-bar div
search_bar_pattern = re.compile(r'\s*<div class="search-bar">\s*<input[^>]*>\s*<button[^>]*></button>\s*</div>', re.MULTILINE | re.DOTALL)

for file in html_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Remove the search-bar div
        new_content = search_bar_pattern.sub('', content)

        # Also remove any script src="js/search.js"
        new_content = re.sub(r'\s*<script src="js/search\.js"></script>', '', new_content)

        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"Processed {file}")
    else:
        print(f"File {file} not found")

# Delete the search-related files
files_to_delete = [
    'js/search.js',
    'smart-search.css',
    'js/smart-search.js',
    'product-search.css',
    'js/product-search.js',
    'remove_search.py',
    'apply_search.py'
]

for file in files_to_delete:
    if os.path.exists(file):
        os.remove(file)
        print(f"Deleted {file}")
    else:
        print(f"File {file} not found")
