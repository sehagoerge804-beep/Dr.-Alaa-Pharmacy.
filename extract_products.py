import os
import re
from bs4 import BeautifulSoup

def extract_products_from_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    soup = BeautifulSoup(content, 'html.parser')
    products = []

    for product_div in soup.find_all('div', class_='product'):
        data_name = product_div.get('data-name')
        if data_name:
            img_tag = product_div.find('img')
            img_src = img_tag['src'] if img_tag else ''

            price_span = product_div.find('span', class_='discounted-price')
            price = price_span.text.strip() if price_span else ''

            products.append({
                'name': data_name,
                'price': price,
                'image': img_src
            })

    return products

def main():
    html_files = [
        'hair.html', 'skin.html', 'deodorants-perfumes.html', 'sunscreen.html',
        'sensitive-area-care.html', 'dental-care.html', 'dyes.html', 'nail-lip-care.html',
        'childrens-supplies.html', 'shaving-supplies.html', 'good-supplies.html', 'diapers.html', 'offers.html'
    ]

    all_products = {}

    for file in html_files:
        if os.path.exists(file):
            products = extract_products_from_html(file)
            category = file.replace('.html', '').replace('-', '_')
            all_products[category] = products
            print(f"Extracted {len(products)} products from {file}")
        else:
            print(f"File {file} not found")

    # Generate the JavaScript object
    js_output = "const initialProducts = {\n"
    for category, products in all_products.items():
        js_output += f"    {category}: [\n"
        for product in products:
            js_output += f"        {{ name: \"{product['name']}\", price: \"{product['price']}\", image: \"{product['image']}\" }},\n"
        js_output += "    ],\n"
    js_output += "};\n"

    with open('initial_products.js', 'w', encoding='utf-8') as f:
        f.write(js_output)

    print("Generated initial_products.js")

if __name__ == "__main__":
    main()
