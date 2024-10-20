
//post
import { Router } from "express";
import {
  getproductos, 
  agregarproductos, 
  obtenerProducto, 
  deleteProducto, 
  editarProducto} 
  from '../controllers/producto.controller';

const router = Router();

router.route('/')
  .get(getproductos)  // Obtención de productos disponible para todos
  .post(agregarproductos);

router.route('/:productoId')
  .get(obtenerProducto)  // Obtener detalles de un producto, abierto a todos
  .delete(deleteProducto)  // Solo usuarios autenticados pueden eliminar
  .put(editarProducto);//Revisar

export default router;