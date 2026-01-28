// Firebase Service for Products
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQ2ZkGiIKE5odbXsZD03on_OcIuUbkJmg",
  authDomain: "pharmacy-store-bc240.firebaseapp.com",
  projectId: "pharmacy-store-bc240",
  storageBucket: "pharmacy-store-bc240.appspot.com",
  messagingSenderId: "328904695111",
  appId: "1:328904695111:web:4c4d8625e463d127af8062",
  measurementId: "G-FDCS1S483F"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

class ProductService {
  constructor() {
    this.db = db;
  }

  // Generate unique product ID from name
  generateProductId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
  }

  // Read all products
  async getAllProducts() {
    const productsRef = ref(this.db, 'products');
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {};
  }

  // Read products by category
  async getProductsByCategory(category) {
    const products = await this.getAllProducts();
    const categoryProducts = {};
    Object.keys(products).forEach(id => {
      if (products[id].category === category) {
        categoryProducts[id] = products[id];
      }
    });
    return categoryProducts;
  }

  // Write product
  async addProduct(product) {
    const id = this.generateProductId(product.name);
    const productRef = ref(this.db, `products/${id}`);
    await set(productRef, product);
    return id;
  }

  // Update product
  async updateProduct(id, updates) {
    const productRef = ref(this.db, `products/${id}`);
    await update(productRef, updates);
  }

  // Delete product
  async deleteProduct(id) {
    const productRef = ref(this.db, `products/${id}`);
    await remove(productRef);
  }

  // Real-time listener for products
  onProductsChange(callback) {
    const productsRef = ref(this.db, 'products');
    onValue(productsRef, (snapshot) => {
      const products = snapshot.exists() ? snapshot.val() : {};
      callback(products);
    });
  }

  // Real-time listener for category
  onCategoryChange(category, callback) {
    const productsRef = ref(this.db, 'products');
    onValue(productsRef, (snapshot) => {
      const allProducts = snapshot.exists() ? snapshot.val() : {};
      const categoryProducts = {};
      Object.keys(allProducts).forEach(id => {
        if (allProducts[id].category === category) {
          categoryProducts[id] = allProducts[id];
        }
      });
      callback(categoryProducts);
    });
  }
}

export default new ProductService();
