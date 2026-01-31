// UI Service for Products (Integrated with Firebase & Project)
import ProductService from './products.service.js';

class ProductUI {
  constructor() {
    this.productService = ProductService;
    this.currentCategory = this.getCurrentCategory();
    this.productsContainer = document.querySelector('.products');
    this.init();
  }

  getCurrentCategory() {
    const path = window.location.pathname.toLowerCase();
    const categories = [
      'hair', 'skin', 'deodorants-perfumes', 'sensitive-area-care', 
      'dental-care', 'dyes', 'nail-lip-care', 'sunscreen', 
      'childrens-supplies', 'shaving-supplies', 'good-supplies', 
      'diapers', 'offers'
    ];
    for (const cat of categories) {
      if (path.includes(cat)) return cat;
    }
    return 'index';
  }

  async init() {
    // Upload existing DOM products to Firebase if missing
    await this.uploadExistingProducts();

    // Setup real-time updates from Firebase
    this.setupRealTimeUpdates();

    // Setup search inputs
    this.setupSearch();

    // Setup quantity handlers
    this.setupQuantityHandlers();
  }

  async uploadExistingProducts() {
    const existingProducts = this.getExistingProductsFromDOM();
    const firebaseProducts = await this.productService.getAllProducts();

    for (const product of existingProducts) {
      const id = this.productService.generateProductId(product.name);
      if (!firebaseProducts[id]) {
        await this.productService.addProduct(product);
      }
    }
  }

  getExistingProductsFromDOM() {
    const products = [];
    document.querySelectorAll('.product').forEach(productEl => {
      const name = productEl.getAttribute('data-name');
      const priceEl = productEl.querySelector('.discounted-price');
      const price = priceEl ? priceEl.textContent : '';
      const imageEl = productEl.querySelector('img');
      const image = imageEl ? imageEl.src : '';
      const category = this.currentCategory;
      const quantity = 1;

      products.push({ name, price, image, category, quantity });
    });
    return products;
  }

  setupRealTimeUpdates() {
    this.productService.onCategoryChange(this.currentCategory, (products) => {
      this.renderProducts(products);
    });
  }

  renderProducts(products) {
    if (!this.productsContainer) return;
    this.productsContainer.innerHTML = '';
    Object.values(products).forEach(product => {
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
            <input type="number" class="quantity-input" value="${product.quantity || 1}" min="1" readonly aria-live="polite" aria-atomic="true" />
            <button class="quantity-btn" onclick="changeQuantity(this, 1)" aria-label="Increase quantity">+</button>
          </div>
          <button class="add-to-cart" aria-label="Add ${product.name} to cart">Add to cart</button>
        </div>
      `;
      this.productsContainer.appendChild(productDiv);
    });
  }

  setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(searchInput => {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
          const productName = product.getAttribute('data-name').toLowerCase();
          const productPriceEl = product.querySelector('.discounted-price');
          const productPrice = productPriceEl ? productPriceEl.textContent.toLowerCase() : '';
          if (productName.includes(searchTerm) || productPrice.includes(searchTerm)) {
            product.style.display = 'block';
          } else {
            product.style.display = 'none';
          }
        });
      });
    });
  }

  setupQuantityHandlers() {
    window.changeQuantity = (button, delta) => {
      const input = button.parentElement.querySelector('.quantity-input');
      let value = parseInt(input.value) + delta;
      if (value < 1) value = 1;
      input.value = value;

      // Update Firebase quantity
      const productEl = button.closest('.product');
      const productName = productEl.getAttribute('data-name');
      const id = this.productService.generateProductId(productName);
      this.productService.updateProduct(id, { quantity: value });
    };
  }

  async updateProduct(name, updates) {
    const id = this.productService.generateProductId(name);
    await this.productService.updateProduct(id, updates);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProductUI();
});

export default ProductUI;