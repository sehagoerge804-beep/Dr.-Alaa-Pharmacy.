import os
import re

# Define the color replacements
replacements = {
    '#27ae60': '#ff6b6b',  # old green to new red/pink
    '#1e8449': '#4ecdc4',  # old dark green to new teal
    'rgba(39, 174, 96, 0.1)': 'rgba(255, 107, 107, 0.1)',  # rgba variant for old green
    'rgba(30, 132, 73, 1)': 'rgba(78, 205, 196, 1)'  # rgba variant for old dark green
}

# Function to replace colors in a file
def replace_colors_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()

    for old_color, new_color in replacements.items():
        content = re.sub(re.escape(old_color), new_color, content)

    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)

# Get all HTML files in the current directory
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for html_file in html_files:
    replace_colors_in_file(html_file)
    print(f"Replaced colors in {html_file}")
