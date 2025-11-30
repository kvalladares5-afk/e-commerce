/* main.js
   Más limpio porque Bootstrap maneja la apertura del modal.
   Usamos Bootstrap Toast para las notificaciones.
*/

let currentProductId = null;

// Utilidad de formato de precio
const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

// Utilidad de notificación (Bootstrap Toast)
const showToast = (message) => {
    // 1. Actualizar el texto
    document.getElementById('toast-message').textContent = message;
    
    // 2. Obtener el elemento y crear la instancia de Bootstrap
    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl); // bootstrap viene del script CDN
    
    // 3. Mostrar
    toast.show();
};

// --- Navegación SPA ---
const showPage = (pageId) => {
    // Ocultar usando la clase de utilidad de Bootstrap 'd-none' (display: none)
    document.getElementById('page-home').classList.add('d-none');
    document.getElementById('page-detail').classList.add('d-none');
    
    // Mostrar quitando 'd-none'
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('d-none');
        window.scrollTo(0, 0);
    }
};

// Mostrar detalle de producto
const showProductDetail = (productId) => {
    currentProductId = productId;
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Rellenamos el HTML de la página de detalle
    document.getElementById('detail-img').src = product.img;
    document.getElementById('detail-img').alt = product.name;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-price').textContent = formatPrice(product.price);
    document.getElementById('detail-desc').textContent = product.desc;
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
    populateProductGrid();

    // Eventos
    document.getElementById('add-to-cart-btn').onclick = handleAddToCartClick;
    
    // NOTA: Ya no necesitamos asignar eventos para abrir/cerrar el modal
    // Bootstrap lo hace con los atributos data-bs-toggle en el HTML.
});