USE jardin_secreto;

-- 1. Insertar Categorias
INSERT INTO categorias (nombre, descripcion) VALUES 
('Bulbos', 'Bulbos de temporada listos para plantar'),
('Flores de Corte', 'Ramos y varas frescas para decoración'),
('Jardineria', 'Herramientas y fertilizantes para el cuidado del jardin');

-- 2. Insertar Productos
-- Nota: Usamos los nombres de columnas en español
INSERT INTO productos (nombre, precio, descripcion, imagen_url, categoria_id, stock) VALUES
('Bulbos Lilium', 12990, 'Pack de 5 bulbos de Lilium asiático, colores mixtos.', 'img/Bulbos Lilium.jpeg', 1, 50),
('Bulbos Tulipán', 9990, 'Pack de 10 bulbos de Tulipán holandés.', 'img/Bulbos Tulipán.jpg', 1, 50),
('Rosas de Corte', 15990, 'Una docena de rosas rojas frescas, calidad de exportación.', 'img/Rosas de Corte.jpg', 2, 30),
('Lilium de Corte', 4990, 'Vara de Lilium blanco con múltiples flores.', 'img/Lilium de Corte.jpg', 2, 40),
('Gladiolos (Mix)', 7990, 'Ramo de 5 varas de Gladiolos en colores variados.', 'img/Gladiolos (Mix).jpg', 2, 35),
('Tulipanes Corte', 10990, 'Ramo de 10 Tulipanes frescos en vibrantes colores.', 'img/Tulipanes Corte.jpg', 2, 25),
('Astromelias', 6990, 'Ramo de Astromelias, flores duraderas y coloridas.', 'img/Astromelias.jpg', 2, 40),
('Girasoles', 5990, 'Tres grandes Girasoles que iluminarán cualquier espacio.', 'img/Girasoles.jpg', 2, 20),
('Pala de Jardín', 8990, 'Pala de mano ergonómica con punta de acero inoxidable.', 'img/Pala de Jardín.jpg', 3, 15),
('Tijeras Podar', 11990, 'Tijeras de podar profesionales. Corte limpio y preciso.', 'img/Tijeras Podar.jpg', 3, 10),
('Fertilizante', 7990, 'Fertilizante líquido concentrado para floración abundante.', 'img/Fertilizante.jpg', 3, 60),
('Abono Orgánico', 9990, 'Abono 100% orgánico (5kg). Mejora la estructura del suelo.', 'img/Abono Orgánico.jpg', 3, 45);

-- 3. Insertar Clientes
INSERT INTO clientes (nombre, email, contrasena, direccion) VALUES
('Gino Amaro', 'gino@example.com', 'secreto123', 'Rancagua, Chile'),
('Karina V', 'karina@example.com', 'secreto456', 'Parral, Chile');

-- 4. Insertar una Orden de prueba
INSERT INTO ordenes (cliente_id, monto_total, estado) VALUES (1, 23980, 'completada');

-- 5. Insertar Detalles de esa Orden (2 Tijeras de Podar)
INSERT INTO detalles_orden (orden_id, producto_id, cantidad, precio_unitario) VALUES 
(1, 10, 2, 11990);