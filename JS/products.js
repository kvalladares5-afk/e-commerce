let products = [];

// Función para obtener datos del servidor (Backend)
async function fetchProducts() {
    try {
        const response = await fetch('./php/get_products.php'); // Llama a nuestro archivo PHP
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        products = await response.json(); // Convierte la respuesta a JSON y la guarda en la variable global
        populateProductGrid(); // Renderiza la grilla
    } catch (error) {
        console.error('Error cargando productos:', error);
        document.getElementById('product-grid').innerHTML = `
            <div class="col-12 text-center text-danger">
                <p>Lo sentimos, no pudimos cargar los productos en este momento.</p>
            </div>`;
    }
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    
    col.innerHTML = `
        <div class="card h-100 shadow-sm border-0 product-card cursor-pointer" onclick="showProductDetail('${product.id}')">
            <div class="position-relative">
                <img src="${product.imagen_url}" class="card-img-top" alt="${product.nombre}">
            </div>
            <div class="card-body">
                <h5 class="card-title text-truncate" title="${product.nombre}">${product.nombre}</h5>
                <p class="card-text fw-bold text-success fs-5">${formatPrice(product.precio)}</p>
            </div>
            <div class="card-footer bg-white border-0 pt-0">
                <button class="btn btn-outline-success w-100 btn-sm">Ver Detalles</button>
            </div>
        </div>
    `;
    return col;
}

function populateProductGrid() {
    const grid = document.getElementById('product-grid');
    if(!grid) return; 
    
    grid.innerHTML = '';
    
    if(products.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center">Cargando productos...</div>';
        return;
    }

    products.forEach(product => {
        const cardCol = createProductCard(product);
        grid.appendChild(cardCol);
    });
}

// Inicializar la carga cuando el documento esté listo
// (Esto se llama desde main.js, pero por seguridad lo dejamos disponible)
// Si main.js llama a populateProductGrid(), necesitamos cambiarlo allá para que llame a fetchProducts()