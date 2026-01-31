import os
import re

def remove_css_from_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove <style> tags and their content
    content = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', content, flags=re.IGNORECASE)

    # Remove links to nav.css
    content = re.sub(r'<link[^>]*href=["\']nav\.css["\'][^>]*>', '', content, flags=re.IGNORECASE)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Get all HTML files in the current directory
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for html_file in html_files:
    remove_css_from_html(html_file)
    print(f"Removed CSS from {html_file}")
