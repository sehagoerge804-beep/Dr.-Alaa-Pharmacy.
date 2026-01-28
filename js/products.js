// Shared products data structure
// Products are stored in localStorage under 'products' key as JSON object with categories as keys

const initialProducts = {
    hair: [
        { name: "Gk Hair Moisturizing Shampoo Color Protection 300 ml", price: "575 ج.م", image: "https://m.media-amazon.com/images/I/51uq-8Q0kFL._AC_SX679_.jpg" },
        { name: "GK Hair Balancing Shampoo For Women, 300 Ml", price: "575 ج.م", image: "https://m.media-amazon.com/images/I/71zM9+ytb4L._AC_SX679_.jpg" },
        // Add all hair products here
    ],
    skin: [
        { name: "CeraVe Hydrating Cleanser 236ml", price: "600 ج.م", image: "https://i.ebayimg.com/images/g/3UYAAOSwHK9lT-zq/s-l1600.webp" },
        { name: "Cerave Moisturizing Cleansing Foam, 8.1 fl oz (236 ml)", price: "600 ج.م", image: "https://m.media-amazon.com/images/I/51YGhCTOHbL._AC_SX679_.jpg" },
        // Add all skin products here
    ],
    // Add other categories
};

// Load products from localStorage or use initial
function loadProducts() {
    const stored = localStorage.getItem('products');
    if (stored) {
        return JSON.parse(stored);
    } else {
        localStorage.setItem('products', JSON.stringify(initialProducts));
        return initialProducts;
    }
}

// Save products to localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Get products for a category
function getProducts(category) {
    const products = loadProducts();
    return products[category] || [];
}

// Add a product to a category
function addProduct(category, product) {
    const products = loadProducts();
    if (!products[category]) {
        products[category] = [];
    }
    products[category].push(product);
    saveProducts(products);
}

// Update a product in a category
function updateProduct(category, index, updatedProduct) {
    const products = loadProducts();
    if (products[category] && products[category][index]) {
        products[category][index] = updatedProduct;
        saveProducts(products);
    }
}

// Delete a product from a category
function deleteProduct(category, index) {
    const products = loadProducts();
    if (products[category]) {
        products[category].splice(index, 1);
        saveProducts(products);
    }
}

// Render products in a container for a category
function renderProducts(category, containerSelector) {
    const products = getProducts(category);
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.setAttribute('data-name', product.name);
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div class="product-content">
                <h3>${product.name}</h3>
                <div class="price">
                    <span class="discounted-price">${product.price}</span>
                </div>
                <div class="quantity-selector" aria-label="Quantity selector">
                    <button class="quantity-btn" onclick="changeQuantity(this, -1)" aria-label="Decrease quantity">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" readonly aria-live="polite" aria-atomic="true" />
                    <button class="quantity-btn" onclick="changeQuantity(this, 1)" aria-label="Increase quantity">+</button>
                </div>
                <button class="add-to-cart" aria-label="Add ${product.name} to cart">Add to cart</button>
            </div>
        `;
        container.appendChild(productDiv);
    });
}

// Export functions for use in other scripts
window.ProductManager = {
    loadProducts,
    saveProducts,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    renderProducts
};
