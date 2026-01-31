// Firebase Admin Dashboard JS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ========== Firebase Config ========== */
const app = initializeApp({
    apiKey: "AIzaSyDQ2ZkGiIKE5odbXsZD03on_OcIuUbkJmg",
    authDomain: "pharmacy-store-bc240.firebaseapp.com",
    projectId: "pharmacy-store-bc240"
});
const db = getFirestore(app);

/* ========== صفحات المشروع الكبير ========== */
const pagesData = {
    "Index.html": "🏠",
    "Childrens-supplies": "👶",
    "Dental-care": "🦷",
    "Deodorants-perfumes": "🌸",
    "Diapers": "🧷",
    "Dyes": "🎨",
    "Good-supplies": "🛍️",
    "Hair": "💇‍♀️",
    "Offer": "🏷️",
    "Sensitive-area-care": "🧴",
    "Shaving-supplies": "🪒",
    "Skin": "🧴",
    "Sunscreen": "☀️"
};

let currentPage = "", products = [], editId = null;

window.addEventListener('DOMContentLoaded', () => {
    const pages = document.getElementById("pages");
    const productsDiv = document.getElementById("products");
    const popup = document.getElementById("popup");

    /* إنشاء أيقونات الصفحات */
    for (let p in pagesData) {
        pages.innerHTML += `
        <div class="page" onclick="openPage('${p}')">
            ${pagesData[p]}<br>${p}
        </div>`;
    }

    /* فتح صفحة */
    window.openPage = async (p) => {
        currentPage = p;
        pages.style.display = "none";
        document.getElementById("header").style.display = "flex";
        document.getElementById("searchBox").style.display = "flex";
        productsDiv.style.display = "grid";
        await loadProducts();
    }

    /* تحميل المنتجات */
    async function loadProducts() {
        products = [];
        const snap = await getDocs(collection(db, currentPage));
        snap.forEach(d => products.push({ id: d.id, ...d.data() }));
        render();
    }

    /* عرض المنتجات */
    function render() {
        productsDiv.innerHTML = "";
        products.forEach((p, i) => {
            productsDiv.innerHTML += `
            <div class="card">
                <div class="menu" onclick="this.children[0].style.display='block'">⋮
                    <div class="menu-content">
                        <button onclick="editProduct('${p.id}')">تعديل</button>
                        <button onclick="deleteProduct('${p.id}')">حذف</button>
                    </div>
                </div>
                <img src="${p.image || 'https://via.placeholder.com/100'}" alt="${p.name}">
                <h4>${p.name}</h4>
                <span>${p.price} ج</span>
            </div>`;
        });
    }

    /* إضافة منتج */
    document.getElementById("addBtn").onclick = () => {
        editId = null;
        document.getElementById("pName").value = "";
        document.getElementById("pPrice").value = "";
        document.getElementById("pImg").value = "";
        popup.style.display = "flex";
    }

    /* حفظ المنتج */
    window.saveProduct = async (e) => {
        e.preventDefault();
        const name = document.getElementById("pName").value;
        const price = +document.getElementById("pPrice").value;
        const image = document.getElementById("pImg").value;

        if (editId) {
            await updateDoc(doc(db, currentPage, editId), { name, price, image });
        } else {
            await addDoc(collection(db, currentPage), { name, price, image });
        }

        popup.style.display = "none";
        await loadProducts();
        alert("تم الحفظ بنجاح ✅");
    }

    /* تعديل المنتج */
    window.editProduct = (id) => {
        const p = products.find(x => x.id === id);
        if (!p) return;
        editId = id;
        document.getElementById("pName").value = p.name;
        document.getElementById("pPrice").value = p.price;
        document.getElementById("pImg").value = p.image || "";
        popup.style.display = "flex";
    }

    /* حذف المنتج */
    window.deleteProduct = async (id) => {
        if (!confirm("هل تريد حذف المنتج؟")) return;
        await deleteDoc(doc(db, currentPage, id));
        await loadProducts();
        alert("تم حذف المنتج ✅");
    }

    /* بحث */
    window.filterProducts = () => {
        const v = document.getElementById("searchInput").value.toLowerCase();
        const t = document.getElementById("searchType").value;
        document.querySelectorAll(".card").forEach((c, i) => {
            const ok = t === "name"
                ? products[i].name.toLowerCase().includes(v)
                : products[i].price.toString().includes(v);
            c.style.display = ok ? "block" : "none";
        });
    }

    /* رجوع */
    document.getElementById("backBtn").onclick = () => {
        pages.style.display = "grid";
        document.getElementById("header").style.display = "none";
        document.getElementById("searchBox").style.display = "none";
        productsDiv.style.display = "none";
    };
});