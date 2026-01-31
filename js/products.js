import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===== Firebase Configuration ===== */
const firebaseConfig = {
    apiKey: "AIzaSyDQ2ZkGiIKE5odbXsZD03on_OcIuUbkJmg",
    authDomain: "pharmacy-store-bc240.firebaseapp.com",
    projectId: "pharmacy-store-bc240"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ===== Pages Mapping (Project Large) ===== */
const pagesData = {
    "hair": "Hair",
    "skin": "Skin",
    "dental-care": "Dental-care",
    "deodorants-perfumes": "Deodorants-perfumes",
    "diapers": "Diapers",
    "dyes": "Dyes",
    "good-supplies": "Good-supplies",
    "sunscreen": "Sunscreen",
    "shaving-supplies": "Shaving-supplies",
    "childrens-supplies": "Childrens-supplies",
    "sensitive-area-care": "Sensitive-area-care",
    "offers": "Offer"
};

/* ===== Current State ===== */
let currentCategory = "";
let products = [];
let editId = null;

/* ===== Load Products from Firebase ===== */
export async function loadProducts(category) {
    currentCategory = category;
    products = [];
    const snap = await getDocs(collection(db, category));
    snap.forEach(d => products.push({ id: d.id, ...d.data() }));
    renderProducts();
}

/* ===== Render Products ===== */
export function renderProducts(containerSelector = "#productsContainer") {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>لا توجد منتجات</p>";
        return;
    }

    products.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <div class="menu" onclick="this.children[0].style.display='block'">⋮
                <div class="menu-content">
                    <button onclick="ProductManager.editProduct(${i})">تعديل</button>
                    <button onclick="ProductManager.deleteProduct('${p.id}')">حذف</button>
                </div>
            </div>
            <img src="${p.image || 'https://via.placeholder.com/150'}" alt="${p.name}">
            <h4>${p.name}</h4>
            <div class="price">${p.price}</div>
        `;
        container.appendChild(div);
    });
}

/* ===== Add Product ===== */
export async function addProduct(product) {
    const docRef = await addDoc(collection(db, currentCategory), product);
    products.push({ id: docRef.id, ...product });
    renderProducts();
}

/* ===== Edit Product ===== */
export function editProduct(index) {
    const p = products[index];
    editId = p.id;
    // Populate form inputs (فرضاً عندك inputs بنفس الأسماء)
    document.getElementById("pName").value = p.name;
    document.getElementById("pPrice").value = p.price;
    document.getElementById("pImg").value = p.image || "";
    document.getElementById("popup").style.display = "flex";
}

/* ===== Update Product ===== */
export async function updateProduct(updatedProduct) {
    if (!editId) return;
    await updateDoc(doc(db, currentCategory, editId), updatedProduct);
    editId = null;
    await loadProducts(currentCategory);
}

/* ===== Delete Product ===== */
export async function deleteProduct(id) {
    if (!confirm("هل تريد حذف المنتج؟")) return;
    await deleteDoc(doc(db, currentCategory, id));
    await loadProducts(currentCategory);
}

/* ===== Save Product from Form ===== */
export async function saveProduct(e) {
    e.preventDefault();
    const product = {
        name: document.getElementById("pName").value,
        price: document.getElementById("pPrice").value,
        image: document.getElementById("pImg").value
    };
    if (editId) {
        await updateProduct(product);
    } else {
        await addProduct(product);
    }
    document.getElementById("popup").style.display = "none";
    alert("تم الحفظ بنجاح ✅");
}

/* ===== Search Filter ===== */
export function filterProducts(searchValue, type="name") {
    const container = document.querySelector("#productsContainer");
    container.querySelectorAll(".product-card").forEach((c, i) => {
        const ok = type === "name"
            ? products[i].name.toLowerCase().includes(searchValue.toLowerCase())
            : products[i].price.toString().includes(searchValue);
        c.style.display = ok ? "block" : "none";
    });
}

/* ===== Export to Window ===== */
window.ProductManager = {
    loadProducts,
    renderProducts,
    addProduct,
    editProduct,
    updateProduct,
    deleteProduct,
    saveProduct,
    filterProducts
};