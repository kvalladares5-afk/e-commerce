/* cart.js 
   Usa Flex utilities de Bootstrap (d-flex, justify-content-between) 
   para el layout de cada item en el modal.
*/

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
            total += item.price * item.quantity;
            count += item.quantity;
            
            const itemEl = document.createElement('div');
            // Usamos 'list-group-item' de Bootstrap
            itemEl.className = 'list-group-item py-3';
            
            itemEl.innerHTML = `
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <img src="${item.img}" alt="${item.name}" class="rounded shadow-sm" style="width: 60px; height: 60px; object-fit: cover;">
                        <div class="ms-3">
                            <h6 class="mb-0 fw-bold">${item.name}</h6>
                            <small class="text-muted">Cant: ${item.quantity} x ${formatPrice(item.price)}</small>
                        </div>
                    </div>
                    <div class="text-end">
                        <div class="fw-bold text-dark mb-1">${formatPrice(item.price * item.quantity)}</div>
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

    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        const product = products.find(p => p.id === productId);
        if(product) {
            cart.push({ ...product, quantity: quantity });
        }
    }
    
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    // Usamos la nueva función de Toast adaptada para Bootstrap
    showToast('Producto eliminado del carrito.');
}