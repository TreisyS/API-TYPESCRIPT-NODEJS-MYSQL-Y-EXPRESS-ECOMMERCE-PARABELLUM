import { Request, Response } from "express";
import { connect } from '../routes/database';
//import { Productos } from '../interfaces/productinterface';

export async function crearOrden(req: Request, res: Response): Promise<void> {
    // Si no usas middleware de autenticación, necesitas pasar usuarioId desde el cuerpo de la solicitud.
    const { usuarioId, productos, total } = req.body;

    // Validar datos básicos
    if (!usuarioId || !productos || !total || productos.length === 0) {
        res.status(400).json({ message: 'Faltan datos necesarios para crear la orden.' });
        return;
    }

    try {
        const conn = await connect();

        // Crear nueva orden
        const newOrder = {
            usuario_id: usuarioId,
            total,
            estado: 'pendiente'
        };

        // Insertar la orden en la tabla 'orden'
        const [result] = await conn.query('INSERT INTO orden SET ?', [newOrder]);
        const orderId = (result as any).insertId;

        // Insertar productos en la tabla `orden_articulos`
        for (const producto of productos) {
            await conn.query('INSERT INTO orden_articulos SET ?', {
                orden_id: orderId,
                producto_id: producto.id,
                cantidad: producto.cantidad,
                precio: producto.precio
            });
        }

        res.status(201).json({ message: 'Orden creada con éxito', orderId });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ message: 'Error al crear la orden', error });
    }
}
