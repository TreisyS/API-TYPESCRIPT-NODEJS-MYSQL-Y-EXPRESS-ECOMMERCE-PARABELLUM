"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getproductos = getproductos;
exports.agregarproductos = agregarproductos;
exports.obtenerProducto = obtenerProducto;
exports.deleteProducto = deleteProducto;
exports.editarProducto = editarProducto;
const database_1 = require("../routes/database");
function getproductos(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = parseInt(_req.query.page) || 1;
        const limit = parseInt(_req.query.limit) || 10;
        const offset = (page - 1) * limit;
        try {
            const conn = yield (0, database_1.connect)();
            const [productos] = yield conn.query('SELECT * FROM productos LIMIT ? OFFSET ?', [limit, offset]);
            res.json(productos);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving products', error });
        }
    });
}
function agregarproductos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nuevoproducto = req.body;
            if (!nuevoproducto.nombre || !nuevoproducto.precio) {
                res.status(400).json({ message: 'Nombre y precio son campos obligatorios' });
                return;
            }
            const conn = yield (0, database_1.connect)();
            yield conn.query('INSERT INTO productos SET ?', [nuevoproducto]);
            res.json({
                message: 'Producto agregado satisfactoriamente'
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error al agregar producto', error });
        }
    });
}
function obtenerProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.productoId;
        const conn = yield (0, database_1.connect)();
        const producto = yield conn.query('SELECT * FROM productos WHERE idproductos = ?', [id]);
        res.json(producto[0]);
    });
}
//delete
function deleteProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.productoId;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM productos where idproductos = ?', [id]);
        res.json({
            message: 'PRODUCTO ELIMINADO'
        });
    });
}
//actualizar
function editarProducto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.productoId;
        const updateProductos = req.body;
        // Verificar si el objeto updateProductos tiene algún dato
        if (!updateProductos || Object.keys(updateProductos).length === 0) {
            res.status(400).json({ message: 'No hay datos para actualizar' });
            return;
        }
        try {
            const conn = yield (0, database_1.connect)();
            // Hacer la actualización de los campos proporcionados
            yield conn.query('UPDATE productos SET ? WHERE idproductos = ?', [updateProductos, id]);
            res.json({
                message: 'Producto Actualizado'
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error al actualizar producto', error });
        }
    });
}
