/* JS/cart.js - Actualizado para Schema en Español */

let cart = [];

function updateCartDisplay() {
    const cartList = document.getElementById('cart-items-list');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountEl = document.getElementById('cart-count');
    
    cartList.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartList.innerHTML = `
            <div class="text-center py-5">
                <p class="text-muted mb-0">Tu carrito está vacío 🍃</p>
            </div>`;
    } else {
        cart.forEach(item => {
            // CUIDADO: La BD devuelve 'precio', no 'price'
            // Aseguramos conversión a float por si acaso
            const precio = parseFloat(item.precio);
            const cantidad = parseInt(item.quantity); // 'quantity' lo agregamos nosotros en JS, sigue en inglés o español según prefieras. Aquí mantuve quantity.

            total += precio * cantidad;
            count += cantidad;
            
            const itemEl = document.createElement('div');
            itemEl.className = 'list-group-item py-3';
            
            // Usamos item.imagen_url, item.nombre, item.precio
            itemEl.innerHTML = `
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <img src="${item.imagen_url}" alt="${item.nombre}" class="rounded shadow-sm" style="width: 60px; height: 60px; object-fit: cover;">
                        <div class="ms-3">
                            <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                            <small class="text-muted">Cant: ${cantidad} x ${formatPrice(precio)}</small>
                        </div>
                    </div>
                    <div class="text-end">
                        <div class="fw-bold text-dark mb-1">${formatPrice(precio * cantidad)}</div>
                        <button onclick="removeFromCart('${item.id}')" class="btn btn-outline-danger btn-sm p-1 px-2">
                            <small>Eliminar</small>
                        </button>
                    </div>
                </div>
            `;
            cartList.appendChild(itemEl);
        });
    }
    
    cartTotalEl.textContent = formatPrice(total);
    cartCountEl.textContent = count;
}

function addToCart(productId, quantity) {
    if (!productId || isNaN(quantity) || quantity < 1) return;

    // Buscamos si ya existe en el carrito usando ID flexible (==)
    const existingItemIndex = cart.findIndex(item => item.id == productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Buscamos en la lista maestra de productos descargados
        const product = products.find(p => p.id == productId);
        if(product) {
            // Creamos una copia del producto y le agregamos la propiedad 'quantity'
            // El resto de propiedades (nombre, precio, imagen_url) se copian igual
            cart.push({ ...product, quantity: quantity });
        }
    }
    
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId); // Comparación flexible por si ID es string/int
    updateCartDisplay();
    if(typeof showToast === 'function') {
        showToast('Producto eliminado del carrito.');
    }
}