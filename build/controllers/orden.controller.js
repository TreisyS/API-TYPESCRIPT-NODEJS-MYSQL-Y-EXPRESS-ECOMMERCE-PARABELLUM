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
exports.crearOrden = crearOrden;
const database_1 = require("../routes/database");
//import { Productos } from '../interfaces/productinterface';
function crearOrden(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Si no usas middleware de autenticación, necesitas pasar usuarioId desde el cuerpo de la solicitud.
        const { usuarioId, productos, total } = req.body;
        // Validar datos básicos
        if (!usuarioId || !productos || !total || productos.length === 0) {
            res.status(400).json({ message: 'Faltan datos necesarios para crear la orden.' });
            return;
        }
        try {
            const conn = yield (0, database_1.connect)();
            // Crear nueva orden
            const newOrder = {
                usuario_id: usuarioId,
                total,
                estado: 'pendiente'
            };
            // Insertar la orden en la tabla 'orden'
            const [result] = yield conn.query('INSERT INTO orden SET ?', [newOrder]);
            const orderId = result.insertId;
            // Insertar productos en la tabla `orden_articulos`
            for (const producto of productos) {
                yield conn.query('INSERT INTO orden_articulos SET ?', {
                    orden_id: orderId,
                    producto_id: producto.id,
                    cantidad: producto.cantidad,
                    precio: producto.precio
                });
            }
            res.status(201).json({ message: 'Orden creada con éxito', orderId });
        }
        catch (error) {
            console.error('Error al crear la orden:', error);
            res.status(500).json({ message: 'Error al crear la orden', error });
        }
    });
}
