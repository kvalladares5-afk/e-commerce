
-- 1. Búsqueda de productos por nombre o categoría (Buscador)
-- Objetivo: Encontrar productos que coincidan con un término, por ejemplo "Lilium"
SELECT p.id, p.nombre, p.precio, c.nombre as categoria
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
WHERE p.nombre LIKE '%Lilium%' OR c.nombre LIKE '%Bulbos%';

-- 2. Top 3 Productos más vendidos
-- Objetivo: Ver qué productos tienen más salida (Ranking de ventas)
SELECT p.nombre, SUM(d.cantidad) as total_unidades_vendidas
FROM detalles_orden d
JOIN productos p ON d.producto_id = p.id
GROUP BY p.id, p.nombre
ORDER BY total_unidades_vendidas DESC
LIMIT 3;

-- 3. Productos con stock crítico (Alerta de Inventario)
-- Objetivo: Listar productos con menos de 10 unidades para reponer
SELECT nombre, stock, precio
FROM productos
WHERE stock < 10
ORDER BY stock ASC;

-- 4. Clientes Frecuentes (Mejores Clientes)
-- Objetivo: Identificar clientes que han hecho compras (aquí filtramos >= 1 compra)
SELECT c.nombre, c.email, COUNT(o.id) as cantidad_compras, SUM(o.monto_total) as total_gastado
FROM clientes c
JOIN ordenes o ON c.id = o.cliente_id
GROUP BY c.id, c.nombre, c.email
HAVING cantidad_compras >= 1
ORDER BY total_gastado DESC;

-- 5. Productos que NUNCA se han vendido (Inventario muerto)
-- Objetivo: Identificar productos que no tienen salida para ponerlos en oferta
SELECT p.nombre, p.precio, p.stock
FROM productos p
LEFT JOIN detalles_orden d ON p.id = d.producto_id
WHERE d.id IS NULL;

-- 6. Ticket Promedio (KPI Financiero)
-- Objetivo: Saber cuánto gasta en promedio un cliente por compra
SELECT AVG(monto_total) as ticket_promedio
FROM ordenes
WHERE estado = 'completada';


-- ==========================================
-- PARTE 2: TRANSACCIÓN DE VENTA (Ejemplo)
-- ==========================================
-- Esta transacción simula una compra real:
-- 1. Crea la orden.
-- 2. Inserta los detalles (productos comprados).
-- 3. Descuenta el stock del inventario.
-- Si algo falla, se hace ROLLBACK (nada se guarda).

START TRANSACTION;

-- Paso A: Insertar la cabecera de la Orden
INSERT INTO ordenes (cliente_id, monto_total, estado) 
VALUES (1, 19980, 'completada'); -- Supongamos cliente ID 1 compra total $19.980

-- Guardamos el ID de la orden recién creada en una variable
SET @orden_id = LAST_INSERT_ID();

-- Paso B: Insertar los items (Ej: Compra 2 unidades del Producto ID 2 "Bulbos Tulipán")
INSERT INTO detalles_orden (orden_id, producto_id, cantidad, precio_unitario)
VALUES (@orden_id, 2, 2, 9990);

-- Paso C: Descontar Stock del producto vendido
UPDATE productos 
SET stock = stock - 2 
WHERE id = 2;

-- Paso D: Verificar si hay error (opcional en script manual, vital en backend)
-- Si todo está bien:
COMMIT;

-- Si hubiera un error (ej: stock negativo), se ejecutaría:
-- ROLLBACK;