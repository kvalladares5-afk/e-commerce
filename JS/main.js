/* JS/main.js - Actualizado para Schema en Español */

let currentProductId = null;

// Utilidad de formato de precio (CLP)
const formatPrice = (price) => {
    // Aseguramos que el precio sea un número (la BD puede devolver string)
    const val = parseFloat(price);
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val);
};

// Utilidad de notificación (Bootstrap Toast)
const showToast = (message) => {
    const toastMsg = document.getElementById('toast-message');
    const toastEl = document.getElementById('liveToast');
    if(toastMsg && toastEl) {
        toastMsg.textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
};

// --- Navegación SPA ---
const showPage = (pageId) => {
    document.getElementById('page-home').classList.add('d-none');
    document.getElementById('page-detail').classList.add('d-none');
    
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('d-none');
        window.scrollTo(0, 0);
    }
};

// Mostrar detalle de producto
const showProductDetail = (productId) => {
    // Nota: Como los IDs de base de datos son INT, comparamos de forma flexible (==) 
    // o convertimos ambos a string/numero.
    currentProductId = productId;
    
    // 'products' es la variable global que llenamos en products.js con fetch
    const product = products.find(p => p.id == productId);
    
    if (!product) return;

    // Rellenamos el HTML con las propiedades EN ESPAÑOL de la BD
    document.getElementById('detail-img').src = product.imagen_url;
    document.getElementById('detail-img').alt = product.nombre;
    document.getElementById('detail-name').textContent = product.nombre;
    document.getElementById('detail-price').textContent = formatPrice(product.precio);
    document.getElementById('detail-desc').textContent = product.descripcion;
    document.getElementById('detail-quantity').value = 1;

    showPage('page-detail');
};

// Manejador del botón "Agregar al carrito"
const handleAddToCartClick = () => {
    const quantity = parseInt(document.getElementById('detail-quantity').value, 10);
    addToCart(currentProductId, quantity); 
    showToast('Producto agregado exitosamente 🌱');
    showPage('page-home');
};

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    // Importante: Llamamos a fetchProducts() en lugar de populateProductGrid()
    // para que primero descargue los datos de la BD
    if (typeof fetchProducts === 'function') {
        fetchProducts();
    }

    // Eventos
    const addBtn = document.getElementById('add-to-cart-btn');
    if(addBtn) addBtn.onclick = handleAddToCartClick;
});