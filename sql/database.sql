-- Crear la base de datos
CREATE DATABASE parabellumE_ecommerce_db;
USE parabellumE_ecommerce_db;

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    idusuario INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DESCRIBE usuarios;
-- Crear tabla de categorías
CREATE TABLE categorias (
     idcategorias INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DESCRIBE categorias;
-- Crear tabla de productos
CREATE TABLE productos (
   idproductos INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    image_url TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    categoria_id INT,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(idcategorias) ON DELETE SET NULL
);
DESCRIBE productos;
-- Crear tabla de órdenes
CREATE TABLE orden (
 idorden INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'completo', 'cancelado') DEFAULT 'pendiente',
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(idusuario) ON DELETE CASCADE
);
DESCRIBE orden;
-- Crear tabla de detalles de órdenes
CREATE TABLE orden_articulos (
 idorden_articulos INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    orden_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES orden(idorden) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(idproductos) ON DELETE CASCADE
);
DESCRIBE orden_articulos;
-- Crear tabla de carrito de compras (opcional)
CREATE TABLE cart_items (
    idcartitems INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(idusuario) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(idproductos) ON DELETE CASCADE
);
DESCRIBE cart_items;
