// UI Service for Products
import ProductService from './products.service.js';

class ProductUI {
  constructor() {
    this.productService = ProductService;
    this.currentCategory = this.getCurrentCategory();
    this.init();
  }

  getCurrentCategory() {
    // Determine category from URL or page structure
    const path = window.location.pathname;
    if (path.includes('hair')) return 'hair';
    if (path.includes('skin')) return 'skin';
    if (path.includes('deodorants-perfumes')) return 'deodorants-perfumes';
    if (path.includes('sensitive-area-care')) return 'sensitive-area-care';
    if (path.includes('dental-care')) return 'dental-care';
    if (path.includes('dyes')) return 'dyes';
    if (path.includes('nail-lip-care')) return 'nail-lip-care';
    if (path.includes('sunscreen')) return 'sunscreen';
    if (path.includes('childrens-supplies')) return 'childrens-supplies';
    if (path.includes('shaving-supplies')) return 'shaving-supplies';
    if (path.includes('good-supplies')) return 'good-supplies';
    if (path.includes('diapers')) return 'diapers';
    if (path.includes('offers')) return 'offers';
    return 'index'; // Default for home page
  }

  async init() {
    await this.uploadExistingProducts();
    this.setupRealTimeUpdates();
    this.setupSearch();
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
      const price = productEl.querySelector('.discounted-price').textContent;
      const image = productEl.querySelector('img').src;
      const category = this.currentCategory;
      const quantity = 1; // Default quantity

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
    const containers = document.querySelectorAll('.products');
    containers.forEach(container => {
      container.innerHTML = '';
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
        container.appendChild(productDiv);
      });
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
          const productPrice = product.querySelector('.discounted-price').textContent.toLowerCase();
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
    // Quantity change handlers are already in HTML, but we can enhance them
    window.changeQuantity = (button, delta) => {
      const input = button.parentElement.querySelector('.quantity-input');
      let value = parseInt(input.value) + delta;
      if (value < 1) value = 1;
      input.value = value;

      // Update Firebase
      const productEl = button.closest('.product');
      const productName = productEl.getAttribute('data-name');
      const id = this.productService.generateProductId(productName);
      this.productService.updateProduct(id, { quantity: value });
    };
  }

  // Method to update product data
  async updateProduct(name, updates) {
    const id = this.productService.generateProductId(name);
    await this.productService.updateProduct(id, updates);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductUI();
});

export default ProductUI;
