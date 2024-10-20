import { Request, Response } from "express";
import {connect} from '../routes/database'
import {Productos} from '../interfaces/productinterface'

export async function getproductos(_req: Request, res: Response): Promise<void> {
    const page = parseInt(_req.query.page as string) || 1;
    const limit = parseInt(_req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const conn = await connect();

        const [productos] = await conn.query('SELECT * FROM productos LIMIT ? OFFSET ?', [limit, offset]);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
}

export async function agregarproductos(req: Request, res: Response): Promise<void> {
    try {
        const nuevoproducto:Productos = req.body;
       
        if (!nuevoproducto.nombre || !nuevoproducto.precio) {
            res.status(400).json({ message: 'Nombre y precio son campos obligatorios' });
           
            return; 
        }
       
        const conn = await connect();

        await conn.query('INSERT INTO productos SET ?', [nuevoproducto]);
        
        res.json({
            message: 'Producto agregado satisfactoriamente'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto', error });
    }
}


export async function obtenerProducto(req: Request, res: Response): Promise<void>
{
   const id= req.params.productoId;
   const conn = await connect();

const producto = await conn.query('SELECT * FROM productos WHERE idproductos = ?', [id]);

     res.json(producto[0]);

}


//delete
export async function deleteProducto(req:Request, res: Response): Promise<void>
 {
    const id = req.params.productoId;
    const conn = await connect();
    await conn.query('DELETE FROM productos where idproductos = ?', [id]);
    res.json(
        {
            message: 'PRODUCTO ELIMINADO'
        }
    );
}

//actualizar

export async function editarProducto(req:Request, res:Response):Promise<void> {
    const id = req.params.productoId;
    const updateProductos: Productos = req.body;

    // Verificar si el objeto updateProductos tiene algún dato
    if (!updateProductos || Object.keys(updateProductos).length === 0) {
        res.status(400).json({ message: 'No hay datos para actualizar' });
        return;
    }

    try {
        const conn = await connect();

        // Hacer la actualización de los campos proporcionados
        await conn.query('UPDATE productos SET ? WHERE idproductos = ?', [updateProductos, id]);

        res.json({
            message: 'Producto Actualizado'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
}
