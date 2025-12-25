# 🌸 Vam (Una Empresa Familiar) - E-commerce DB

Este proyecto consiste en el desarrollo del Módulo 3 (Base de Datos Relacional) para el Bootcamp. Es un MVP (Producto Viable Mínimo) de una tienda en línea de jardinería que implementa un modelo de base de datos relacional completo, conectado a una interfaz web dinámica.

## Autora: Karina Valladares 

**Repositorio: https://github.com/kvalladares5-afk/e-commerce**

## 📋 Descripción del Proyecto

El sistema gestiona el catálogo de productos, usuarios y pedidos de la florería "Jardín Secreto". A diferencia de un sitio estático, este proyecto persiste la información en MySQL y utiliza PHP para servir los datos dinámicamente al Frontend.

### Alcance Funcional

**Catálogo Dinámico:** Los productos se cargan desde la base de datos jardin_secreto.

**Gestión de Clientes:** Registro de usuarios con validación de unicidad (email).

**Pedidos:** Estructura relacional para Cabecera de Orden y Detalle de Orden (1:N).

**Reglas de Negocio:** Restricciones a nivel de base de datos (precios positivos, stock no negativo).

## 🛠️ Tecnologías Utilizadas
**Base de Datos:** MySQL (Motor InnoDB).

**Backend:** PHP (PDO para conexión segura).

**Frontend:** HTML5, Bootstrap 5, JavaScript (Fetch API).

**Entorno:** XAMPP (Apache + MySQL).

## 🚀 Instrucciones de Instalación

### Sigue estos pasos para desplegar el proyecto en tu entorno local:

Clonar el repositorio (o descargar el .zip) en tu carpeta de servidor local (ej: C:/xampp/htdocs/VAM).

### **Base de Datos:**

Abre tu gestor de base de datos (ej: PHPMyAdmin o Workbench).

Ejecuta el script /sql/schema.sql: Esto creará la base de datos jardin_secreto y todas sus tablas.

Ejecuta el script /sql/seed.sql: Esto poblará las tablas con datos de prueba (productos, categorías y usuarios).

### **Conexión:**

Verifica el archivo db.php en la raíz.

Asegúrate de que las credenciales (user, pass) coincidan con tu configuración de MySQL (por defecto en XAMPP es usuario root y contraseña vacía).

Ejecución:

Abre tu navegador y ve a: http://localhost/VAM/index.html

### 🗂️ **Estructura de la Base de Datos**

El diseño cumple con la Tercera Forma Normal (3NF) e incluye las siguientes tablas principales:

**clientes:** Información de usuarios.

**categorias:** Clasificación de productos (Bulbos, Flores de corte, Herramientas).

**productos:** Inventario con FK a categorías y validaciones de precio.

**ordenes:** Cabecera del pedido (Cliente, Fecha, Total).

**detalles_orden:** Tabla intermedia que resuelve la relación N:M entre órdenes y productos.

### 📄 **Diagrama ER:** 

Puedes ver el diseño gráfico de la base de datos en la carpeta /docs/er.pdf.

### 🔍 **Consultas y Transacciones (KPIs)**
En la carpeta /sql/queries.sql encontrarás scripts listos para ejecutar que responden a preguntas de negocio como:

**Top 3 productos más vendidos.**

**Reporte de stock crítico (productos con menos de 10 unidades).**

**Ticket promedio de venta.**

**Transacción ACID:** Ejemplo de creación de orden completa con descuento de inventario y rollback en caso de error.

**Evidencias de Pruebas**

La carga de productos en el index.html confirma la conexión exitosa PHP -> MySQL.

Las restricciones CHECK (precio >= 0) impiden insertar datos erróneos.