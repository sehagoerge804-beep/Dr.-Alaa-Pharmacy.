/*********
 * MENU (HAMBURGER)
 *********/

// Toggle menu action
function toggleMenuAction() {
    const hamburger = document.getElementById('hamburger');
    const dropdownBackdrop = document.querySelector('.dropdown-backdrop');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (!hamburger || !dropdownBackdrop || !dropdownMenu) return;

    hamburger.classList.toggle('active');
    dropdownBackdrop.classList.toggle('active');
    dropdownMenu.classList.toggle('show');
}

// Make it global
window.toggleMenu = toggleMenuAction;

// Floating hamburger functionality to show section icons directly
function toggleNavBar() {
    const floatingHamburger = document.getElementById('floating-hamburger');
    const dropdownBackdrop = document.querySelector('.dropdown-backdrop');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (floatingHamburger) {
        floatingHamburger.addEventListener('click', function() {
            if (dropdownBackdrop && dropdownMenu) {
                dropdownBackdrop.classList.toggle('active');
                dropdownMenu.classList.toggle('show');
                floatingHamburger.classList.toggle('active');
            }
        });
    }
}

// Attach click to hamburger
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    if (!hamburger) return;

    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenuAction();
    });
}

// Close menu logic
function initCloseMenu() {
    const dropdownBackdrop = document.querySelector('.dropdown-backdrop');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const hamburger = document.getElementById('hamburger');

    if (!dropdownBackdrop || !dropdownMenu || !hamburger) return;

    // Click on backdrop
    dropdownBackdrop.addEventListener('click', () => {
        closeMenu();
    });

    // Click on link inside menu
    dropdownMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeMenu();
        }
    });

    // Click outside
    document.addEventListener('click', (e) => {
        if (
            !hamburger.contains(e.target) &&
            !dropdownMenu.contains(e.target)
        ) {
            closeMenu();
        }
    });
}

function closeMenu() {
    const dropdownBackdrop = document.querySelector('.dropdown-backdrop');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const hamburger = document.getElementById('hamburger');

    if (dropdownBackdrop) dropdownBackdrop.classList.remove('active');
    if (dropdownMenu) dropdownMenu.classList.remove('show');
    if (hamburger) hamburger.classList.remove('active');
}

/*********
 * CART
 *********/
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

function syncCartBetweenPages() {
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            cart = JSON.parse(e.newValue) || [];
            updateCartCount();
        }
    });
}

/*********
 * ADD TO CART
 *********/
function setupAddToCart() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            if (!product) return;

            const name = product.dataset.name;
            const price = product.querySelector('.discounted-price')?.textContent;
            const image = product.querySelector('img')?.src;
            const quantity = parseInt(product.querySelector('.quantity-input')?.value || 1);

            if (!name || !price) return;

            const existing = cart.find(item => item.name === name);

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({ name, price, image, quantity });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification();
        });
    });
}

/*********
 * SEARCH
 *********/
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            const name = card.querySelector('h4')?.textContent.toLowerCase() || '';
            card.style.display = name.includes(term) ? 'block' : 'none';
        });
    });
}

/*********
 * IMAGE MODAL
 *********/
function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');

    if (!modal || !modalImg || !closeBtn) return;

    document.querySelectorAll('.product img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

/*********
 * QUANTITY
 *********/
function changeQuantity(btn, delta) {
    const input = btn.parentElement.querySelector('.quantity-input');
    let value = parseInt(input.value) + delta;
    if (value < 1) value = 1;
    input.value = value;
}
window.changeQuantity = changeQuantity;

/*********
 * NOTIFICATION
 *********/
function showNotification() {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/*********
 * SHOP NOW
 *********/
function scrollToProducts() {
    const section = document.querySelector('.products') || document.getElementById('productsContainer');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}
window.scrollToProducts = scrollToProducts;

/*********
 * INIT
 *********/
document.addEventListener('DOMContentLoaded', () => {
    // Ensure menu closed on load
    closeMenu();

    initHamburger();
    toggleNavBar();
    initCloseMenu();
    updateCartCount();
    syncCartBetweenPages();
    setupAddToCart();
    setupSearch();
    setupImageModal();
});
