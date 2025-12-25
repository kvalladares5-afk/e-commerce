<?php

header('Content-Type: application/json');


require 'db.php';

try {
    // Consultamos los productos
    $sql = "SELECT p.*, c.nombre as categoria_nombre 
            FROM productos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id";
            
    $stmt = $pdo->query($sql);
    $productos = $stmt->fetchAll();

    // Devolvemos el JSON al frontend
    echo json_encode($productos);

} catch (PDOException $e) {
    // En caso de error, devolvemos un JSON con el error
    echo json_encode(['error' => $e->getMessage()]);
}
?>