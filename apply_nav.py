import os
import re

# The new nav HTML
new_nav = '''    <nav>
        <div class="nav-container">
            <div class="logo">Dr. Alaa Pharmacy</div>
            <button class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-menu" id="nav-menu">
                <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="hair.html"><i class="fas fa-cut"></i> Hair Care</a></li>
                <li><a href="skin.html"><i class="fas fa-spa"></i> Skin Care</a></li>
                <li><a href="deodorants-perfumes.html"><i class="fas fa-wind"></i> Deodorants & Perfumes</a></li>
                <li><a href="sensitive-area-care.html"><i class="fas fa-shield-alt"></i> Sensitive Area Care</a></li>
                <li><a href="dental-care.html"><i class="fas fa-tooth"></i> Dental Care</a></li>
                <li><a href="dyes.html"><i class="fas fa-palette"></i> Dyes</a></li>
                <li><a href="nail-lip-care.html"><i class="fas fa-paint-brush"></i> Nail & Lip Care</a></li>
                <li><a href="sunscreen.html"><i class="fas fa-sun"></i> Sunscreen</a></li>
                <li><a href="childrens-supplies.html"><i class="fas fa-baby"></i> Children's Supplies</a></li>
                <li><a href="shaving-supplies.html"><i class="fas fa-cut"></i> Shaving Supplies</a></li>
                <li><a href="good-supplies.html"><i class="fas fa-user"></i> Good Supplies</a></li>
                <li><a href="diapers.html"><i class="fas fa-baby-carriage"></i> Diapers</a></li>
                <li><a href="offers.html"><i class="fas fa-tags"></i> Offers</a></li>
                <li><a href="pharmacy_cart.html"><i class="fas fa-shopping-cart"></i> Cart <span id="cart-count">0</span></a></li>
            </ul>
        </div>

        <!-- Dropdown Backdrop -->
        <div class="dropdown-backdrop"></div>

        <!-- Dropdown Menu -->
        <div class="dropdown-menu">
            <div class="icon-grid">
                <a href="index.html" class="icon-item" data-tooltip="Home">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </a>
                <a href="hair.html" class="icon-item" data-tooltip="Hair Care">
                    <i class="fas fa-cut"></i>
                    <span>Hair Care</span>
                </a>
                <a href="skin.html" class="icon-item" data-tooltip="Skin Care">
                    <i class="fas fa-spa"></i>
                    <span>Skin Care</span>
                </a>
                <a href="deodorants-perfumes.html" class="icon-item" data-tooltip="Deodorants & Perfumes">
                    <i class="fas fa-wind"></i>
                    <span>Deodorants & Perfumes</span>
                </a>
                <a href="sensitive-area-care.html" class="icon-item" data-tooltip="Sensitive Area Care">
                    <i class="fas fa-shield-alt"></i>
                    <span>Sensitive Area Care</span>
                </a>
                <a href="dental-care.html" class="icon-item" data-tooltip="Dental Care">
                    <i class="fas fa-tooth"></i>
                    <span>Dental Care</span>
                </a>
                <a href="dyes.html" class="icon-item" data-tooltip="Dyes">
                    <i class="fas fa-palette"></i>
                    <span>Dyes</span>
                </a>
                <a href="nail-lip-care.html" class="icon-item" data-tooltip="Nail & Lip Care">
                    <i class="fas fa-paint-brush"></i>
                    <span>Nail & Lip Care</span>
                </a>
                <a href="sunscreen.html" class="icon-item" data-tooltip="Sunscreen">
                    <i class="fas fa-sun"></i>
                    <span>Sunscreen</span>
                </a>
                <a href="childrens-supplies.html" class="icon-item" data-tooltip="Children's Supplies">
                    <i class="fas fa-baby"></i>
                    <span>Children's Supplies</span>
                </a>
                <a href="shaving-supplies.html" class="icon-item" data-tooltip="Shaving Supplies">
                    <i class="fas fa-cut"></i>
                    <span>Shaving Supplies</span>
                </a>
                <a href="good-supplies.html" class="icon-item" data-tooltip="Good Supplies">
                    <i class="fas fa-user"></i>
                    <span>Good Supplies</span>
                </a>
                <a href="diapers.html" class="icon-item" data-tooltip="Diapers">
                    <i class="fas fa-baby-carriage"></i>
                    <span>Diapers</span>
                </a>
                <a href="offers.html" class="icon-item" data-tooltip="Offers">
                    <i class="fas fa-tags"></i>
                    <span>Offers</span>
                </a>
                <a href="pharmacy_cart.html" class="icon-item" data-tooltip="Cart">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Cart</span>
                </a>
            </div>
        </div>
    </nav>'''

# The new script
new_script = '''        // Hamburger menu functionality
        const hamburger = document.getElementById('hamburger');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const dropdownBackdrop = document.querySelector('.dropdown-backdrop');

        hamburger.addEventListener('click', () => {
            dropdownMenu.classList.toggle('show');
            dropdownBackdrop.style.display = dropdownMenu.classList.contains('show') ? 'block' : 'none';
            hamburger.classList.toggle('active');
        });

        // Close dropdown when clicking backdrop
        dropdownBackdrop.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
            dropdownBackdrop.style.display = 'none';
            hamburger.classList.remove('active');
        });'''

def update_nav_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the nav section
    nav_pattern = r'<nav>.*?</nav>'
    content = re.sub(nav_pattern, new_nav, content, flags=re.DOTALL)

    # Add the script if not present
    if 'hamburger.addEventListener' not in content:
        # Find the existing script tag and add the new script
        script_pattern = r'(<script>.*?</script>)'
        def add_script(match):
            script_content = match.group(1)
            if 'hamburger.addEventListener' not in script_content:
                return script_content.replace('</script>', new_script + '\n    </script>')
            return match.group(1)
        content = re.sub(script_pattern, add_script, content, flags=re.DOTALL)

    # Ensure nav.css is linked
    if 'nav.css' not in content:
        head_pattern = r'(<head>.*?</head>)'
        def add_nav_css(match):
            head_content = match.group(1)
            if '<link rel="stylesheet" href="nav.css" />' not in head_content:
                return head_content.replace('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />',
                                            '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />\n    <link rel="stylesheet" href="nav.css" />')
            return head_content
        content = re.sub(head_pattern, add_nav_css, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# List of HTML files to update
html_files = [
    'index.html', 'hair.html', 'skin.html', 'deodorants-perfumes.html',
    'sensitive-area-care.html', 'dental-care.html', 'dyes.html',
    'nail-lip-care.html', 'sunscreen.html', 'childrens-supplies.html',
    'shaving-supplies.html', 'good-supplies.html', 'diapers.html',
    'offers.html', 'pharmacy_cart.html', 'axe.html'
]

for file in html_files:
    if os.path.exists(file):
        update_nav_in_file(file)
        print(f"Updated nav in {file}")
    else:
        print(f"File {file} not found")
