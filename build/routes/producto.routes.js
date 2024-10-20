"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//post
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(producto_controller_1.getproductos) // Obtención de productos disponible para todos
    .post(producto_controller_1.agregarproductos);
router.route('/:productoId')
    .get(producto_controller_1.obtenerProducto) // Obtener detalles de un producto, abierto a todos
    .delete(producto_controller_1.deleteProducto) // Solo usuarios autenticados pueden eliminar
    .put(producto_controller_1.editarProducto); //Revisar
exports.default = router;
