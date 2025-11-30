/* products.js
   Genera el HTML usando clases de Bootstrap (cols, cards, btns)
*/

const products = [
    { id: 'prod1', name: 'Bulbos Lilium', price: 12990, desc: 'Pack de 5 bulbos de Lilium asiático, colores mixtos.', img: 'img/Bulbos Lilium.jpg' },
    { id: 'prod2', name: 'Bulbos Tulipán', price: 9990, desc: 'Pack de 10 bulbos de Tulipán holandés.', img: 'img/Bulbos Tulipán.jpg' },
    { id: 'prod3', name: 'Rosas de Corte', price: 15990, desc: 'Una docena de rosas rojas frescas, calidad de exportación.', img: 'img/Rosas de Corte.jpg' },
    { id: 'prod4', name: 'Lilium de Corte', price: 4990, desc: 'Vara de Lilium blanco con múltiples flores.', img: 'img/Lilium de Corte.jpg' },
    { id: 'prod5', name: 'Gladiolos (Mix)', price: 7990, desc: 'Ramo de 5 varas de Gladiolos en colores variados.', img: 'img/Gladiolos (Mix).jpg' },
    { id: 'prod6', name: 'Tulipanes Corte', price: 10990, desc: 'Ramo de 10 Tulipanes frescos en vibrantes colores.', img: 'img/Tulipanes Corte.jpg' },
    { id: 'prod7', name: 'Astromelias', price: 6990, desc: 'Ramo de Astromelias, flores duraderas y coloridas.', img: 'img/Astromelias.jpg' },
    { id: 'prod8', name: 'Girasoles', price: 5990, desc: 'Tres grandes Girasoles que iluminarán cualquier espacio.', img: 'img/Girasoles.jpg' },
    { id: 'prod9', name: 'Pala de Jardín', price: 8990, desc: 'Pala de mano ergonómica con punta de acero inoxidable.', img: 'img/Pala de Jardín.jpg' },
    { id: 'prod10', name: 'Tijeras Podar', price: 11990, desc: 'Tijeras de podar profesionales. Corte limpio y preciso.', img: 'img/Tijeras Podar.jpg' },
    { id: 'prod11', name: 'Fertilizante', price: 7990, desc: 'Fertilizante líquido concentrado para floración abundante.', img: 'img/Fertilizante.jpg' },
    { id: 'prod12', name: 'Abono Orgánico', price: 9990, desc: 'Abono 100% orgánico (5kg). Mejora la estructura del suelo.', img: 'img/Abono Orgánico.jpg' }
];

function createProductCard(product) {
    // 1. Contenedor de columna (Bootstrap Grid)
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3'; // Responsive: 1 col en movil, 2 en tablet, 4 en desktop

    // 2. Tarjeta (Bootstrap Card)
    // Nota: 'product-card' es nuestra clase custom en styles.css para el hover
    col.innerHTML = `
        <div class="card h-100 shadow-sm border-0 product-card cursor-pointer" onclick="showProductDetail('${product.id}')">
            <div class="position-relative">
                <img src="${product.img}" class="card-img-top" alt="${product.name}">
            </div>
            <div class="card-body">
                <h5 class="card-title text-truncate" title="${product.name}">${product.name}</h5>
                <p class="card-text fw-bold text-success fs-5">${formatPrice(product.price)}</p>
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
    products.forEach(product => {
        const cardCol = createProductCard(product);
        grid.appendChild(cardCol);
    });
}