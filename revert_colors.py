import os
import re

# Define the replacements
replacements = {
    '#ff6b6b': '#27ae60',
    '#4ecdc4': '#1e8449',
    'rgba(255, 107, 107, 0.1)': 'rgba(39, 174, 96, 0.1)',
    'rgba(78, 205, 196, 1)': 'rgba(30, 132, 73, 1)'
}

# Function to replace in a file
def replace_in_file(file_path, replacements):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    for old, new in replacements.items():
        content = content.replace(old, new)
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

# Get all HTML files in the current directory
for file_name in os.listdir('.'):
    if file_name.endswith('.html'):
        replace_in_file(file_name, replacements)

print("Color replacements completed.")
